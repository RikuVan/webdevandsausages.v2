import { h, Component } from 'preact'
import styled, { css } from 'styled-components'
import { Form, Field } from 'react-final-form'
import { route } from 'preact-router'

import R from '../../helpers'
import { connect } from '../../preact-smitty'
import { toRem, tablet, phone } from '../../helpers/styleHelpers'

import PageWrapper from '../../components/PageWrapper'
import Footer from '../../components/Footer'
import LabeledField, { FieldWrapper } from '../../components/forms/LabeledField'

import PageTitle from '../../components/PageTitle'
import Spinner from '../../components/Spinner'
import Section from '../../components/Section'
import LabeledTextarea from '../../components/forms/LabeledTextarea'
import FormButtons from '../../components/forms/FormButtons'

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
  width: 50%;
  margin: auto;
  ${tablet(css`
    width: 95%;
  `)};
`

const validate = ({ password, feedback }) => {
  const errors = {}
  if (!password || password.length < 1) {
    errors.password = 'Required'
  }
  if (!feedback || feedback.length < 1) {
    errors.feedback = 'Required'
  }
  return errors
}

class Feedback extends Component {
  handleReset = reset => () => {
    reset()
    this.props.actions.resetApi({ key: 'feedback' })
  }

  onSubmit = (values, form) => {
    this.props.actions.post({
      key: 'feedback',
      resource: 'feedback',
      id: this.props.eventId,
      values: R.trimValues(values)
    })
    form.reset()
  }

  render({ isExpandedMobileNav, eventId, loadingEvent }) {
    return (
      <PageWrapper>
        <Section isExpandedMobileNav={isExpandedMobileNav}>
          <PageTitle>Feedback</PageTitle>
          <FeedbackFormWrapper>
            {loadingEvent ? (
              <Spinner marginTop={80} />
            ) : (
              <Form
                onSubmit={this.onSubmit}
                validate={validate}
                render={({ handleSubmit, valid, pristine, reset, loading }) => (
                  <FeedbackForm onSubmit={handleSubmit} id="feedback">
                    <LabeledField
                      name="code"
                      label="Who invented the internet?"
                      type="email"
                      placeholder="bob.smith@codeshop.com"
                    />
                    <LabeledTextarea name="feedback" label="Feedback" />
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
            )}
          </FeedbackFormWrapper>
        </Section>
        <Footer color="primaryOrange" />
      </PageWrapper>
    )
  }
}

export default connect(state => ({
  isExpandedMobileNav: R.pathOr(false, ['ui', 'showMobileNav'], state),
  loading: R.pathEq(['api', 'feedback'], 'started', state)
}))(Feedback)
