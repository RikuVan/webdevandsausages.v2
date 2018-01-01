import { h, Component } from 'preact'
import styled, { css } from 'styled-components'
import { Form, Field } from 'react-final-form'
import { connect } from '../../preact-smitty'
import { pathOr, pathEq, compose, has } from 'ramda'
import darken from 'polished/lib/color/darken'
import transparentize from 'polished/lib/color/transparentize'

import Button from '../../components/Button'
import { Grid } from '../../components/layout'
import LabeledField, { FieldWrapper } from '../../components/forms/LabeledField'

import store from '../../store'
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
  color: ${darken(0.2, theme.iconsColor)};
  font-weight: 400;
  font-size: ${toRem(24)};
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

const Message = styled.div`
  color: ${darken(0.2, theme.iconsColor)};
  font-weight: 400;
  font-size: ${toRem(24)};
  width: 100%;
  margin: 30px 0;
  ${({ type }) => {
    switch (type) {
      case 'error': {
        return css`
          background: ${transparentize(0.2, theme.notificationError)};
        `
      }
      case 'success': {
        return css`
          background: ${transparentize(0.2, theme.notificationSuccess)};
        `
      }
      case 'info': {
        return css`
          background: ${transparentize(0.2, theme.notificationError)};
        `
      }
      default: {
        return css`
          background: ${transparentize(0.2, theme.notificationDefault)};
        `
      }
    }
  }};
`

export const ResultMessage = ({ type, message }) => (
  <Message type={type}>{message}</Message>
)

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
    store.actions.resetApi({ key: 'registration' })
  }
  onSubmit = values =>
    store.actions.post({
      key: 'registration',
      resource: 'registration',
      id: this.props.eventId,
      values
    })
  render({
    hasStatus,
    loading,
    showErrorMsg,
    showSuccessMsg,
    showAlreadyRegisteredMsg,
    ...rest
  }) {
    return (
      <FormWrapper>
        <Form
          id="registration"
          onSubmit={this.onSubmit}
          initialValues={{ receivesMail: true }}
          validate={validate}
          render={({ handleSubmit, valid, pristine, reset }) => (
            <form onSubmit={handleSubmit}>
              <Info>
                The following registration is for the event on{' '}
                {this.props.eventDate}. After registering, you should receive a
                unique token by email. Please save this in case you need to
                cancel or verify your registration later.
              </Info>
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
                  disabled={pristine || !valid || loading}
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
        {showSuccessMsg && (
          <ResultMessage
            type="success"
            message="Done. Please check your email for confirmation of your registration."
          />
        )}
        {showErrorMsg && (
          <ResultMessage
            type="info"
            message="Oops, something went wrong. Please try again a bit later."
          />
        )}
        {showAlreadyRegisteredMsg && (
          <ResultMessage
            type="error"
            message="Your email is already among the registrations."
          />
        )}
      </FormWrapper>
    )
  }
}

const registrationPath = ['api', 'registration']
const registrationStatusPath = registrationPath.concat(['status'])

const mapStateToProps = state => {
  const hasStatus = compose(has('status'), pathOr({}, registrationPath))(state)
  const loading = pathEq(registrationStatusPath, 'started', state)
  const showSuccessMsg = pathEq(registrationStatusPath, 201, state)
  const showAlreadyRegisteredMsg = pathEq(registrationStatusPath, 400, state)
  const showErrorMsg =
    hasStatus && !loading && !showSuccessMsg && !showAlreadyRegisteredMsg

  return {
    hasStatus,
    loading,
    showSuccessMsg,
    showErrorMsg,
    showAlreadyRegisteredMsg
  }
}

export default connect(mapStateToProps)(RegistrationForm)
