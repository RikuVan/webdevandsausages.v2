import { h, Component } from 'preact'
import styled from 'styled-components'
import { connect } from '../../preact-smitty'
import { propOr, pathOr, pathEq, compose, isNil, not } from 'ramda'

import { endpoints } from '../../api'
import { Grid, Cell } from '../../components/layout'
import storage from '../../helpers/storage'
import Button from '../../components/Button'
import PageWrapper from '../../components/PageWrapper'
import Spinner from '../../components/Spinner'
import AdminPanel from './AdminPanel'

import store from '../../store'

const TextInput = styled.input`
  padding: 5px;
  width: 80%;
`

const Checkbox = styled.input`
  padding: 10px;
`

const LoginWrapper = styled.div`
  padding-top: 50px;
  color: black;
`

class Admin extends Component {
  setInputValue = name => e =>
    store.actions.setAuth({ [name]: e.target.value.toLowerCase() })

  saveInStorage = name => {
    if (!storage.get('wds_name', null)) {
      storage.set(
        'wds_name',
        name,
        //expiration
        new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).getTime()
      )
    }
  }

  sendPassRequest = () => {
    const { name, bySms } = this.props
    this.saveInStorage(name)
    if (this.props.name) {
      const params = bySms ? { method: 'sms' } : null
      store.actions.get({ key: 'pass', resource: 'pass', id: name, params })
    }
  }

  sendTokenRequestWithPass = () => {
    const { pass, name } = this.props
    if (pass && name) {
      store.actions.post({
        key: 'auth',
        resource: 'auth',
        values: { pass, name }
      })
    }
  }

  componentDidMount() {
    const name = storage.get('wds_name', null)
    if (name) {
      store.actions.setAuth({ name })
    }
    store.actions.get({ key: 'auth', resource: 'auth' })
  }

  render({ loading, pass, name, bySms, passSending, hasPass, loggedIn }) {
    if (loading) return <Spinner />
    return (
      <PageWrapper>
        {!loggedIn ? (
          <LoginWrapper>
            <h1>Login</h1>
            <Grid columns={1}>
              <Cell>
                <section>
                  <div>
                    <p>
                      Name:{' '}
                      <TextInput
                        value={name}
                        onInput={this.setInputValue('name')}
                      />
                    </p>
                    <Button
                      onClick={this.sendPassRequest}
                      loading={passSending}
                      disabled={hasPass}
                    >
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
              </Cell>
              <Cell>
                <p>
                  Pass:{' '}
                  <TextInput
                    value={pass}
                    onInput={this.setInputValue('pass')}
                  />
                </p>
                <Button onClick={this.sendTokenRequestWithPass}>
                  Login with temporary password
                </Button>
              </Cell>
            </Grid>
          </LoginWrapper>
        ) : (
          <AdminPanel />
        )}
      </PageWrapper>
    )
  }
}

const mapStateToProps = state => ({
  ...propOr({}, 'auth', state),
  loading: pathEq(['auth', 'status'], 'started', state),
  hasPass: pathEq(['pass', 'status'], 200, state),
  passSending: pathEq(['pass', 'status'], 'started', state),
  loggedIn: compose(not, isNil, pathOr(null, ['auth', 'user']))(state)
})

export default connect(mapStateToProps)(Admin)
