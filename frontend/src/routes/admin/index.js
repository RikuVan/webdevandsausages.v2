import { h, Component } from 'preact'
import styled from 'styled-components'

import { endpoints } from '../../api'
import { auth } from '../../firebaseAuth'
import { Grid, Cell } from '../../components/layout'
import storage from '../../helpers/storage'
import Button from '../../components/Button'

const TextInput = styled.input`
  padding: 5px;
  width: 80%;
`

const Checkbox = styled.input`
  padding: 10px;
`

export default class Admin extends Component {
  state = {
    loggedIn: false,
    name: '',
    pass: '',
    bySms: false,
    awaitingPass: false,
    token: null
  }

  componentDidMount() {
    const name = storage.get('admin_name', null)
    if (name) {
      this.setState({ name, awaitingPass: true })
    }
  }

  signInFirebase = token =>
    auth.signInWithCustomToken(token).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // ...
    })

  setInputValue = name => e => this.setState({ [name]: e.target.value })

  sendPassRequest = () => {
    const { name, bySms } = this.state
    if (this.state.name) {
      const params = bySms ? { params: 'sms' } : null
      return fetch(endpoints.getPass(name, params)).then(res => {
        this.setState({ awaitingPass: true })
      })
    }
  }

  sendTokenRequestWithPass = () => {
    const { pass, name } = this.state
    if (pass && name) {
      const data = JSON.stringify({ pass, name })
      return fetch(endpoints.auth(), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: data
      }).then(res => {
        this.setState({ token })
      })
    }
  }

  render({}, { awaitingPass, pass, name, bySms }) {
    return (
      <Grid columns={3}>
        <Cell left={3}>
          <h1>Login</h1>
        </Cell>
        <Cell left={2} top={2}>
          {awaitingPass ? (
            <section>
              <div>
                <p>Name: {name}</p>
                <Button onClick={this.sendPassRequest}>
                  Temporary password by Email
                </Button>
              </div>
              <div>
                <label>
                  <Checkbox type="checkbox" value={bySms} />
                  Receive by SMS instead
                </label>
              </div>
            </section>
          ) : (
            <TextInput value={name} onInput={this.setInputValue('name')} />
          )}
        </Cell>
        <Cell left={2} top={4}>
          {awaitingPass ? (
            <TextInput value={pass} onInput={this.setInputValue('pass')} />
          ) : (
            <TextInput value={name} onInput={this.setInputValue('name')} />
          )}
          {awaitingPass && (
            <Button onClick={this.sendTokenRequestWithPass}>
              Login with temporary password
            </Button>
          )}
        </Cell>
      </Grid>
    )
  }
}
