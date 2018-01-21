import { h, Component } from 'preact'
import styled, { css } from 'styled-components'
import { Form, Field } from 'react-final-form'
import { route } from 'preact-router'

import { connect } from '../../preact-smitty'
import R from '../../helpers'
import darken from 'polished/lib/color/darken'

import Button from '../../components/Button'
import { Grid } from '../../components/layout'
import PopupNotification from '../../components/PopupNotification'
import LabeledField, { FieldWrapper } from '../../components/forms/LabeledField'

import { toRem } from '../../helpers/styleHelpers'
import { isEmail } from '../../helpers/validation'

import { theme } from '../../style/theme'

const CheckboxField = styled(Field)`
  border: none;
  height: 49px;
  padding: ${toRem(10)} ${toRem(15)};
  margin: 0;
  outline: 0;
  ${p =>
    p.width &&
    css`
      width: ${toRem(p.width)};
    `};
`

const CheckboxLabel = styled.label`
  font-size: ${toRem(18)};
  color: ${darken(0.2, theme.iconsColor)};
  margin-left: 10px;
`

export const Info = styled.p`
  color: ${theme.secondaryBlue};
  font-weight: 400;
  font-size: ${toRem(20)};
  margin: 0;
  padding: 20px 0;
  line-height: 150%;
  text-align: left;
`

export const FormWrapper = styled.div`
  width: 100%;
`

export const FormGrid = styled(Grid)`
  padding-top: 20px;
`

export const ButtonWrapper = styled.div`
  padding: 40px 0;
  & > button:last-of-type {
    margin-left: 15px;
  }
`

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid format'
  }
  return errors
}

class RegistrationForm extends Component {
  handleReset = reset => () => {
    reset()
    this.props.actions.resetApi({ key: 'registration' })
  }

  handleModalClose = (reset, success) => () => {
    this.handleReset(reset)()
    if (success) {
      route('/')
    }
  }

  onSubmit = (values, form) => {
    this.props.actions.post({
      key: 'registration',
      resource: 'registration',
      id: this.props.eventId,
      values: R.trimValues(values)
    })
    form.reset()
  }

  componentWillUnmount() {
    this.props.actions.resetApi({ key: 'registration' })
  }

  render({ hasStatus, loading, ...rest }) {
    return (
      <FormWrapper>
        <Form
          onSubmit={this.onSubmit}
          initialValues={{ receivesMail: true }}
          validate={validate}
          render={({ handleSubmit, valid, pristine, reset }) => (
            <form onSubmit={handleSubmit} id="registration">
              <Info>
                The following registration is for the event on{' '}
                {this.props.eventDate}. After registering, you should receive a
                unique verification token by email. Please save this in case you
                need to cancel or check your registration later.
              </Info>
              <PopupNotification
                id="registrationError"
                type="error"
                textResolver={({ status }) => {
                  if (status === 400)
                    return 'Your email is already among the registrations and you cannot register twice.'
                  return 'Oops, an error occurred. Please try again a bit later.'
                }}
                onClose={this.handleModalClose(reset, false)}
              />
              <PopupNotification
                id="registrationSuccess"
                type="success"
                text="You are registered. Confirmation should arrive by email soon. It may go to your SPAM folder."
                onClose={this.handleModalClose(reset, true)}
              />
              <FormGrid columns="repeat(auto-fit,minmax(300px,1fr))">
                <LabeledField
                  name="email"
                  label="Email (required)"
                  type="email"
                  placeholder="bob.smith@codeshop.com"
                />
                <LabeledField
                  name="affiliation"
                  label="Company / Affiliation"
                  placeholder="Bob's Code Shop"
                />
                <LabeledField
                  name="firstName"
                  label="First name"
                  placeholder="Bob"
                />
                <LabeledField
                  name="lastName"
                  label="Last name"
                  placeholder="Smith"
                />
              </FormGrid>
              <FieldWrapper row>
                <CheckboxField
                  name="receivesMail"
                  type="checkbox"
                  component="input"
                />
                <CheckboxLabel>
                  {' '}
                  Please send me emails about future events
                </CheckboxLabel>
              </FieldWrapper>
              <ButtonWrapper>
                <Button
                  type="submit"
                  loading={loading}
                  transparent
                  disabled={pristine || !valid || hasStatus}
                  valid={valid}
                  minWidth={123}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  light
                  disabled={pristine || loading}
                  valid={valid}
                  minWidth={123}
                  onClick={this.handleReset(reset)}
                >
                  Reset
                </Button>
              </ButtonWrapper>
            </form>
          )}
        />
      </FormWrapper>
    )
  }
}

const registrationPath = ['api', 'registration']
const registrationStatusPath = registrationPath.concat(['status'])

const mapStateToProps = state => {
  const hasStatus = R.compose(R.has('status'), R.pathOr({}, registrationPath))(
    state
  )
  const loading = R.pathEq(registrationStatusPath, 'started', state)
  return {
    hasStatus,
    loading
  }
}

export default connect(mapStateToProps)(RegistrationForm)
