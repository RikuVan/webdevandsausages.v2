import { h, Component } from 'preact'
import styled from 'styled-components'
import { connect } from '../../preact-smitty'
import R from '../../helpers'

import { Grid, Cell } from '../../components/layout'
import storage from '../../helpers/storage'
import Button from '../../components/Button'
import PageWrapper from '../../components/PageWrapper'
import Spinner from '../../components/Spinner'
import Notification from '../../components/Notification'
import { Input, FieldWrapper } from '../../components/forms/LabeledField'

import AdminPanel from './AdminPanel'

import store from '../../store'

const Field = styled(FieldWrapper)`
  padding-bottom: 10px;
`

const Label = styled.label`
  font-weight: bold;
`

const Checkbox = styled.input`
  padding: 10px;
`

const LoginWrapper = styled.div`
  padding-top: 200px;
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

  loginWithPass = () => {
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
                    <Field>
                      <Label>Username:</Label>
                      <Input
                        value={name}
                        onInput={this.setInputValue('name')}
                      />
                    </Field>
                    <Button
                      primary
                      onClick={this.sendPassRequest}
                      loading={passSending}
                      disabled={hasPass}
                    >
                      Temporary password by Email
                    </Button>
                  </div>
                  <div>
                    <Label>
                      <Checkbox type="checkbox" value={bySms} />
                      Receive by SMS instead
                    </Label>
                  </div>
                </section>
              </Cell>
              <Cell>
                <Field>
                  <Label>Password:</Label>
                  <Input value={pass} onInput={this.setInputValue('pass')} />
                </Field>
                <Button primary onClick={this.loginWithPass}>
                  Login with temporary password
                </Button>
              </Cell>
            </Grid>
            <Notification
              type="success"
              id="passSuccess"
              defaultMessage="A password has been dispatched to your email or phone"
            />
            <Notification
              type="error"
              id="passError"
              defaultMessage="There was an error sending the password"
            />
          </LoginWrapper>
        ) : (
          <AdminPanel />
        )}
      </PageWrapper>
    )
  }
}

const mapStateToProps = state => ({
  ...R.propOr({}, 'auth', state),
  loading: R.pathEq(['auth', 'status'], 'started', state),
  hasPass: R.pathEq(['pass', 'status'], 200, state),
  passSending: R.pathEq(['pass', 'status'], 'started', state),
  loggedIn: R.compose(R.not, R.isNil, R.pathOr(null, ['auth', 'user']))(state)
})

export default connect(mapStateToProps)(Admin)
