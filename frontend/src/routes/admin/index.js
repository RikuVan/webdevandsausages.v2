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
    this.props.actions.setAuth({ [name]: e.target.value.toLowerCase() })

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
    const { name, bySms, actions } = this.props
    this.saveInStorage(name)
    if (this.props.name) {
      const params = bySms ? { method: 'sms' } : null
      actions.get({
        key: 'pass',
        resource: 'pass',
        id: name,
        params,
        notificationTime: 10000
      })
    }
  }

  loginWithPass = () => {
    const { pass, name, actions } = this.props
    if (pass && name) {
      actions.post({
        key: 'auth',
        resource: 'auth',
        values: { pass, name }
      })
    }
  }

  componentDidMount() {
    const name = storage.get('wds_name', null)
    const { actions } = this.props
    if (name) {
      actions.setAuth({ name })
    }
    actions.get({ key: 'auth', resource: 'auth' })
  }

  render({
    loading,
    pass,
    name,
    bySms,
    passSending,
    hasPass,
    loggedIn,
    matches
  }) {
    if (loading) {
      return (
        <PageWrapper>
          <LoginWrapper>
            <Spinner />
          </LoginWrapper>
        </PageWrapper>
      )
    }
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
                  <Notification
                    type="success"
                    id="passSuccess"
                    defaultMessage="A password was dispatched"
                  />
                  <Notification
                    type="error"
                    id="passError"
                    defaultMessage="There was an error sending the password"
                  />
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
                <Notification
                  type="info"
                  id="authError"
                  defaultMessage="Login with a new pass"
                />
              </Cell>
            </Grid>
          </LoginWrapper>
        ) : (
          <AdminPanel matches={matches} />
        )}
      </PageWrapper>
    )
  }
}

const mapStateToProps = state => ({
  ...R.propOr({}, 'auth', state),
  loading: R.pathEq(['api', 'auth', 'status'], 'started', state),
  hasPass: R.pathEq(['api', 'pass', 'status'], 200, state),
  passSending: R.pathEq(['api', 'pass', 'status'], 'started', state),
  loggedIn: R.compose(R.not, R.isNil, R.pathOr(null, ['auth', 'user']))(state)
})

export default connect(mapStateToProps)(Admin)
