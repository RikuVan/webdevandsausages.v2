import { h, Component } from 'preact'
import styled from 'styled-components'
import { Form } from 'react-final-form'
import { connect } from '../../preact-smitty'
import { route } from 'preact-router'
import R from '../../helpers'

import Button from '../../components/Button'
import PopupNotification from '../../components/PopupNotification'
import LabeledField from '../../components/forms/LabeledField'
import FormButtons from '../../components/forms/FormButtons'
import { FormWrapper, Info, ButtonWrapper, FormGrid } from './RegistrationForm'

import { isEmail } from '../../helpers/validation'

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
`

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid format'
  }
  if (!values.verificationToken) {
    errors.verificationToken = 'Required'
  }
  return errors
}

class CancellationForm extends Component {
  handleReset = reset => () => {
    reset()
    this.props.actions.resetApi({ key: 'cancellation' })
  }

  handleModalClose = (reset, success) => () => {
    this.handleReset(reset)()
    if (success) {
      route('/')
    }
  }

  onSubmit = (values, form) => {
    this.props.actions.delete({
      key: 'cancellation',
      resource: 'registration',
      id: this.props.eventId,
      values: R.trimValues(values)
    })
    form.reset()
  }

  componentWillUnmount() {
    this.props.actions.resetApi({ key: 'cancellation' })
  }

  render({ hasStatus, loading, showErrorMsg, showSuccessMsg, valid }) {
    return (
      <FormWrapper>
        <Form
          onSubmit={this.onSubmit}
          validate={validate}
          render={({ handleSubmit, valid, pristine, reset }) => (
            <form onSubmit={handleSubmit} id="cancellation">
              <Info>
                To cancel your registration for the event on{' '}
                {this.props.eventDate}, submit the token sent you by email. It
                should consist of two silly words joined by a hyphen.
              </Info>
              <PopupNotification
                id="cancellationError"
                type="error"
                text="Oops, an error occurred. Are you sure you entered the correct token?"
                onClose={this.handleModalClose(reset, false)}
              />
              <PopupNotification
                id="cancellationSuccess"
                type="success"
                text="Your registration is cancelled. Please check your email (SPAM folder?) for confirmation."
                onClose={this.handleModalClose(reset, true)}
              />
              <GridContainer>
                <FormGrid
                  columns="500px"
                  columnsTablet="400px"
                  columnsPhone="330px"
                >
                  <LabeledField
                    name="email"
                    label="Email (required)"
                    type="email"
                    placeholder="bob.smith@codeshop.com"
                  />
                  <LabeledField
                    name="verificationToken"
                    label="Verification token (required)"
                    type="text"
                    placeholder="word1-word2"
                  />
                </FormGrid>
              </GridContainer>
              <FormButtons
                loading={loading}
                submitDisabled={pristine || !valid || hasStatus}
                resetDisabled={loading}
                valid={valid}
                handleReset={this.handleReset(reset)}
              />
            </form>
          )}
        />
      </FormWrapper>
    )
  }
}

const cancellationPath = ['api', 'cancellation']
const cancellationStatusPath = cancellationPath.concat(['status'])

const mapStateToProps = state => {
  const hasStatus = R.compose(R.has('status'), R.pathOr({}, cancellationPath))(
    state
  )
  const loading = R.pathEq(cancellationStatusPath, 'started', state)

  return {
    hasStatus,
    loading
  }
}

export default connect(mapStateToProps)(CancellationForm)
