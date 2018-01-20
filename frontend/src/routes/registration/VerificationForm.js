import { h, Component } from 'preact'
import styled from 'styled-components'
import { Form } from 'react-final-form'
import { connect } from '../../preact-smitty'
import { route } from 'preact-router'
import R from '../../helpers'

import Button from '../../components/Button'
import LabeledField from '../../components/forms/LabeledField'
import PopupNotification from '../../components/PopupNotification'
import { FormWrapper, Info, ButtonWrapper, FormGrid } from './RegistrationForm'
import { toOrdinal } from '../../helpers/ordinal'

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
    this.props.actions.resetApi({ key: 'verification' })
  }

  handleModalClose = (reset, success) => () => {
    this.handleReset(reset)()
    if (success) {
      route('/')
    }
  }

  onSubmit = (values, form) => {
    const { email, verificationToken } = R.trimValues(values)
    this.props.actions.get({
      key: 'verification',
      resource: 'registration',
      id: this.props.eventId,
      params: { e: email, t: verificationToken }
    })
    form.reset()
  }

  componentWillUnmount() {
    this.props.actions.resetApi({ key: 'verification' })
  }

  render({
    hasStatus,
    loading,
    showErrorMsg,
    showSuccessMsg,
    valid,
    waitListPosition
  }) {
    return (
      <FormWrapper>
        <Form
          id="verification"
          onSubmit={this.onSubmit}
          validate={validate}
          render={({ handleSubmit, valid, pristine, reset }) => (
            <form onSubmit={handleSubmit}>
              <Info>
                To check your registration or your position in the wait list for
                the event on {this.props.eventDate}, submit the token sent you
                by email. It should consist of two silly words joined by a
                hyphen.
              </Info>
              <PopupNotification
                id="verificationError"
                type="error"
                text="Oops, an error occurred. Are you sure you entered the correct token?"
                onClose={this.handleModalClose(reset, false)}
              />
              <PopupNotification
                id="verificationSuccess"
                type="success"
                textResolver={({ api }) => {
                  const waitListPosition = R.compose(
                    R.propOr(false, 'waitListed'),
                    R.pathOr({}, ['verification', 'data'])
                  )(api)
                  return waitListPosition &&
                    R.compose(R.is(Number), v => Number(v))(waitListPosition)
                    ? `You are ${toOrdinal(
                        waitListPosition
                      )} in the waiting list for this event.`
                    : 'Yes, you are registered for this event.'
                }}
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
                  disabled={loading}
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

const verificationPath = ['api', 'verification']
const verificationStatusPath = verificationPath.concat(['status'])

const mapStateToProps = state => {
  const hasStatus = R.compose(R.has('status'), R.pathOr({}, verificationPath))(
    state
  )
  const loading = R.pathEq(verificationStatusPath, 'started', state)

  return {
    hasStatus,
    loading
  }
}

export default connect(mapStateToProps)(CancellationForm)
