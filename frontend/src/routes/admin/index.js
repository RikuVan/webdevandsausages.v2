import { h, Component } from 'preact'
import styled, { css } from 'styled-components'
import { connect } from '../../preact-smitty'
import R from '../../helpers'
import darken from 'polished/lib/color/darken'

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
  margin-top: 200px;
  padding: 30px;
  background: #fff;
  color: black;
  ${({ theme }) =>
    css`
      color: ${darken(0.1, theme.iconsColor)};
    `};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
`

const LoginFormButton = styled(Button)`
  width: 100%;
  margin: 0;
`

const AdminPageWrapper = styled(PageWrapper)`
  ${({ theme, loggedOut }) =>
    loggedOut &&
    css`
      background: ${theme.paleGrey};
      min-height: 100vh;
    `};
`

class Admin extends Component {
  setInputValue = name => e =>
    this.props.actions.setAuth({ [name]: e.target.value.toLowerCase() })

  toggleCheckbox = e => {
    this.props.actions.setAuth({ bySms: !this.props.bySms })
  }

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

  loginWithPass = (e, name = this.props.name, pass = this.props.pass) => {
    if (e) {
      e.preventDefault()
    }
    if (pass && name) {
      this.props.actions.post({
        key: 'auth',
        resource: 'auth',
        values: { pass, name }
      })
    }
  }

  componentDidMount() {
    let name
    const { user, token } = this.props.matches
    const { actions } = this.props

    if (user) {
      name = user
    } else {
      name = storage.get('wds_name', null)
    }
    if (name && token) {
      actions.setAuth({
        name,
        pass: token
      })
      this.loginWithPass(null, name, token)
    } else if (name) {
      actions.setAuth({ name })
      actions.get({ key: 'auth', resource: 'auth' })
    } else {
      actions.get({ key: 'auth', resource: 'auth' })
    }
  }

  render({
    loading,
    pass,
    name,
    bySms,
    passSending,
    hasPass,
    loggedIn,
    matches,
    event,
    loadingEvent
  }) {
    if (loading) {
      return (
        <AdminPageWrapper loggedOut={!loggedIn}>
          <Spinner absolute />
        </AdminPageWrapper>
      )
    }
    return (
      <AdminPageWrapper loggedOut={!loggedIn}>
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
                    <LoginFormButton
                      primary
                      onClick={this.sendPassRequest}
                      loading={passSending}
                      disabled={hasPass}
                    >
                      Temporary password by Email
                    </LoginFormButton>
                  </div>
                  <div>
                    <Label onClick={this.toggleCheckbox}>
                      <Checkbox type="checkbox" value="true" checked={bySms} />
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
                <LoginFormButton primary onClick={this.loginWithPass}>
                  Login wih temporary password
                </LoginFormButton>
                <Notification
                  type="info"
                  id="authError"
                  defaultMessage="Login with a new pass"
                />
              </Cell>
            </Grid>
          </LoginWrapper>
        ) : (
          <AdminPanel
            matches={matches}
            event={event}
            loadingEvent={loadingEvent}
          />
        )}
      </AdminPageWrapper>
    )
  }
}

const mapStateToProps = state => ({
  ...R.propOr({}, 'auth', state),
  loading: R.pathEq(['api', 'auth', 'status'], 'started', state),
  hasPass: R.pathEq(['api', 'pass', 'status'], 200, state),
  passSending: R.pathEq(['api', 'pass', 'status'], 'started', state),
  loggedIn: R.compose(R.not, R.isNil, R.pathOr(null, ['auth', 'user']))(state),
  bySms: R.pathOr(false, ['auth', 'bySms'], state)
})

export default connect(mapStateToProps)(Admin)
