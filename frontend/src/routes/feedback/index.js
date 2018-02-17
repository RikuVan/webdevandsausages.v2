import { h, Component } from 'preact'
import styled, { css } from 'styled-components'
import { Form } from 'react-final-form'
import { route } from 'preact-router'

import R from '../../helpers'
import { connect } from '../../preact-smitty'
import { toRem, tablet } from '../../helpers/styleHelpers'

import PageWrapper from '../../components/PageWrapper'
import Footer from '../../components/Footer'

import PageTitle from '../../components/PageTitle'
import Spinner from '../../components/Spinner'
import Section from '../../components/Section'
import LabeledTextarea from '../../components/forms/LabeledTextarea'
import FormButtons from '../../components/forms/FormButtons'
import SectionTitle from '../../components/SectionTitle'
import PopupNotification from '../../components/PopupNotification'

const FeedbackFormWrapper = styled.section`
  width: 100%;
  background: white;
  margin: 0;
  padding: 3rem 0;
  margin-top: ${toRem(100)};
  box-shadow: inset 0 2px 20px rgba(0, 0, 0, 0.17);
  min-height: 40vh;
`

const FeedbackForm = styled.form`
  width: 60%;
  margin: auto;
  ${tablet(css`
    width: 95%;
  `)};
  padding-top: 2rem;
`

const validate = ({ verification, feedback }) => {
  const errors = {}
  if (!feedback || feedback.length < 1) {
    errors.feedback = 'Required'
  }
  return errors
}

const ClosedMessage = styled(SectionTitle)`
  padding-top: 4rem;
`

class Feedback extends Component {
  handleReset = reset => () => {
    reset()
    this.props.actions.resetApi({ key: 'feedback' })
  }

  onSubmit = (values, form) => {
    this.props.actions.post({
      key: 'feedback',
      resource: 'feedback',
      id: this.props.event.id,
      values: R.trimValues(values)
    })
    form.reset()
  }

  handleModalClose = (reset, success) => () => {
    this.handleReset(reset)()
    if (success) {
      route('/')
    }
  }

  renderFormOrClosedMessage = (isOpen, event, loading, hasStatus) =>
    isOpen ? (
      <Form
        onSubmit={this.onSubmit}
        validate={validate}
        render={({ handleSubmit, valid, pristine, reset }) => (
          <FeedbackForm onSubmit={handleSubmit} id="feedback">
            <PopupNotification
              id="feedbackError"
              type="error"
              textResolver={({ status }) => {
                if (status === 403) {
                  return 'Sorry, feedback is currently closed.'
                }
                return 'Oops, an error occurred. Please try again a bit later.'
              }}
              onClose={this.handleModalClose(reset, false)}
            />
            <PopupNotification
              id="feedbackSuccess"
              type="success"
              text="Your feedback was received. Thanks!"
              onClose={this.handleModalClose(reset, true)}
            />
            <LabeledTextarea name="feedback" />
            <FormButtons
              loading={loading}
              submitDisabled={pristine || !valid || hasStatus}
              resetDisabled={pristine || loading}
              valid={valid}
              handleReset={this.handleReset(reset)}
            />
          </FeedbackForm>
        )}
      />
    ) : (
      <ClosedMessage>Closed</ClosedMessage>
    )

  render({
    isExpandedMobileNav,
    event,
    loadingEvent,
    isOpen,
    loading,
    hasStatus
  }) {
    return (
      <PageWrapper>
        <Section isExpandedMobileNav={isExpandedMobileNav}>
          <PageTitle>Feedback</PageTitle>
          <FeedbackFormWrapper>
            {loadingEvent ? (
              <Spinner marginTop={80} />
            ) : (
              this.renderFormOrClosedMessage(isOpen, event, loading, hasStatus)
            )}
          </FeedbackFormWrapper>
        </Section>
        <Footer color="primaryOrange" />
      </PageWrapper>
    )
  }
}

const feedbackPath = ['api', 'feedback']

export default connect(state => ({
  hasStatus: R.compose(
    R.has('status'),
    R.pathOr({}, feedbackPath.concat(['status']))
  )(state),
  isExpandedMobileNav: R.pathOr(false, ['ui', 'showMobileNav'], state),
  loading: R.pathEq(feedbackPath, 'started', state)
}))(Feedback)
