import { h, Component } from 'preact'
import styled, { css } from 'styled-components'
import { Form, Field } from 'react-final-form'
import { connect } from '../../preact-smitty'
import { pathOr } from 'ramda'
import darken from 'polished/lib/color/darken'

import Button from '../Button'
import Notification from '../Notification'
import store from '../../store'
import { toRem, phone, tablet } from '../../helpers/styleHelpers'
import { isEmail } from '../../helpers/validation'

import { theme } from '../../style/theme'
import { Grid, Cell } from '../layout'

import SausageIcon from '../SausageIcon'

const Input = styled.input`
  border: none;
  background: ${theme.secondaryBlue};
  color: white;
  width: 100%;
  font-size: ${toRem(20)};
  font-weight: 400;
  height: 52px;
  padding: ${toRem(10)} ${toRem(15)};
  vertical-align: middle;
  box-sizing: border-box;
  margin: 0;
  outline: 0;
  ::placeholder {
    color: #52bdf6;
  }
  &:hover,
  &:readonly,
  &:focus {
    outline: 0;
    background: #0b7ebc;
    color: white;
  }
  ${p =>
    p.touched &&
    p.valid &&
    css`
      background-color: #4b4b4b;
      color: #00caff;
    `};
  ${p =>
    p.width &&
    css`
      width: ${toRem(p.width)};
    `};
`

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  ${p =>
    p.row &&
    css`
      flex-direction: row;
      align-items: flex-start;
      justify-content: start;
    `};
`

const Label = styled.label`
  font-size: ${toRem(24)};
  font-weight: bold;
  color: ${darken(0.2, theme.iconsColor)};
`

const CheckboxLabel = styled.label`
  font-size: ${toRem(18)};
  color: ${darken(0.2, theme.iconsColor)};
`

const Info = styled.p`
  color: ${darken(0.2, theme.iconsColor)};
  font-weight: 400;
  font-size: ${toRem(24)};
  margin: 0;
  padding: 20px 0;
  line-height: 150%;
  text-align: left;
`

const FormWrapper = styled.div`
  width: 100%;
`

const InputCell = styled(Cell)`
  padding-bottom: 15px;
`

const FormGrid = styled(Grid)`
  padding-top: 20px;
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

const InnerForm = styled.form`
  display: block;
  overflow: none;
`

const Error = styled.div`
  text-align: left;
  color: ${theme.subduedTexTColor};
`

class RegistrationForm extends Component {
  onSubmit = values =>
    store.actions.post({ key: 'mailingList', resource: 'participants', values })
  render({ status }) {
    const loading = status && status === 'started'
    return (
      <FormWrapper>
        <Form
          id="registration"
          onSubmit={this.onSubmit}
          initialValues={{ receivesMail: true }}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <InnerForm onSubmit={handleSubmit}>
              <Info>
                The following registration is for the event on{' '}
                {this.props.eventDate}. After registering, you should receive a
                unique token by email. Please save this in case you need to
                cancel or verify your registration later.
              </Info>
              <FormGrid columns="repeat(auto-fit,minmax(330px,1fr))">
                <InputCell>
                  <Field name="email">
                    {({ input, meta }) => (
                      <div>
                        <FieldWrapper>
                          <Label>
                            <SausageIcon /> Email (required)
                          </Label>
                          <Input
                            type="type"
                            {...input}
                            valid={meta.valid}
                            placeholder="bob.smith@codeshop.com"
                          />
                        </FieldWrapper>
                        {meta.touched &&
                          meta.error && <Error>{meta.error}</Error>}
                      </div>
                    )}
                  </Field>
                </InputCell>
                <InputCell middle>
                  <Field name="affiliaton">
                    {({ input, meta }) => (
                      <div>
                        <FieldWrapper>
                          <Label>
                            <SausageIcon /> Company / Affiliation
                          </Label>
                          <Input
                            type="type"
                            {...input}
                            placeholder="Bob's Code Shop"
                          />
                        </FieldWrapper>
                      </div>
                    )}
                  </Field>
                </InputCell>
                <InputCell>
                  <Field name="firstName">
                    {({ input, meta }) => (
                      <div>
                        <FieldWrapper>
                          <Label>
                            <SausageIcon /> First name
                          </Label>
                          <Input type="type" {...input} placeholder="Bob" />
                        </FieldWrapper>
                      </div>
                    )}
                  </Field>
                </InputCell>
                <InputCell>
                  <Field name="lastName">
                    {({ input, meta }) => (
                      <div>
                        <FieldWrapper>
                          <Label>
                            <SausageIcon /> Last name
                          </Label>
                          <Input
                            type="type"
                            {...input}
                            valid={meta.valid}
                            placeholder="Smith"
                          />
                        </FieldWrapper>
                      </div>
                    )}
                  </Field>
                </InputCell>
              </FormGrid>
              <Field name="receivesMail">
                {({ input, meta }) => (
                  <div>
                    <FieldWrapper row>
                      <Input type="checkbox" {...input} width={30} />
                      <CheckboxLabel>
                        {' '}
                        I do not want email reminders about future events
                      </CheckboxLabel>
                    </FieldWrapper>
                  </div>
                )}
              </Field>
            </InnerForm>
          )}
        />
      </FormWrapper>
    )
  }
}

export default connect(state => ({
  status: pathOr(null, ['api', 'mailingList'], state)
}))(RegistrationForm)
