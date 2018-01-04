import { h, Component } from 'preact'
import styled, { css } from 'styled-components'
import { Form, Field } from 'react-final-form'
import { connect } from '../../preact-smitty'
import { pathEq } from 'ramda'
import transparentize from 'polished/lib/color/transparentize'

import Button from '../../components/Button'
import Notification from '../../components/Notification'
import store from '../../store'
import { toRem, phone, tablet } from '../../helpers/styleHelpers'
import { isEmail } from '../../helpers/validation'

import { theme } from '../../style/theme'

const Input = styled.input`
  border: 2px solid ${theme.secondaryBlue};
  background: ${transparentize(0.8, theme.secondaryBlue)};
  border-radius: 3px;
  color: white;
  width: 30%;
  font-size: ${toRem(20)};
  font-weight: 400;
  height: 52px;
  padding: ${toRem(10)} ${toRem(15)};
  vertical-align: middle;
  box-sizing: border-box;
  margin: 0;
  outline: 0;
  &:hover,
  &:readonly,
  &:focus {
    outline: 0;
    background: #0b7ebc;
    color: white;
  }
  ${tablet(css`
    width: 60%;
  `)};
  ${phone(css`
    width: 70%;
  `)};
  ${p =>
    p.valid &&
    css`
      background-color: ${theme.secondaryBlue};
    `};
`

const FieldWrapper = styled.div`
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
  return errors
}

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Title = styled.h2`
  color: #fff;
  font-weight: 400;
  font-size: 20px;
  margin: 0;
  padding: 0;
`

const FormWrapper = styled.div`
  padding: 20px;
`

class MailingListForm extends Component {
  onSubmit = values =>
    store.actions.post({ key: 'mailingList', resource: 'participants', values })
  render({ loading }) {
    return (
      <FormWrapper>
        <Form
          id="mailingList"
          onSubmit={this.onSubmit}
          initialValues={{ receivesMail: true }}
          validate={validate}
          render={({
            handleSubmit,
            reset,
            submitting,
            pristine,
            values,
            valid
          }) => (
            <form onSubmit={handleSubmit}>
              <TitleWrapper>
                <Title>
                  Join our mailing list to hear about upcoming events:
                </Title>
              </TitleWrapper>
              <Field name="email">
                {({ input, meta }) => (
                  <div>
                    <FieldWrapper>
                      <Input type="type" {...input} valid={meta.valid} />
                      <Button
                        type="submit"
                        loading={loading}
                        primary
                        disabled={!valid}
                        valid={meta.valid}
                        whiteSpinner
                      >
                        {'+'}
                      </Button>
                    </FieldWrapper>
                    <Notification
                      type="success"
                      id="mailingListSuccess"
                      defaultMessage="Cool, now you are in the loop"
                    />
                    <Notification
                      type="error"
                      id="mailingListError"
                      defaultMessage="Oops, something didn't work as planned"
                    />
                    <Notification type="info" id="mailingListInfo" />
                  </div>
                )}
              </Field>
            </form>
          )}
        />
      </FormWrapper>
    )
  }
}

export default connect(state => ({
  loading: pathEq(['api', 'mailingList', 'status'], 'started', state)
}))(MailingListForm)
