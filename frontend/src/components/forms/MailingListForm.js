import { h, Component } from 'preact'
import styled, { css } from 'styled-components'
import darken from 'polished/lib/color/darken'
import { Form, Field } from 'react-final-form'
import { connect } from '../../preact-smitty'
import { pathOr } from 'ramda'

import Button from '../Button'
import store from '../../store'
import { toRem, phone, tablet } from '../../helpers/styleHelpers'
import { isEmail } from '../../helpers/validation'

import { theme } from '../../style/theme'

const Svg = styled.svg`
  svg {
    display: inline-block;
    path {
      fill: currentColor;
    }
  }
`

const PlusIcon = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-plus"
    color="black"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Svg>
)

const Input = styled.input`
  border: 1px solid #00caff;
  box-shadow: inset 0 1px 3px ${darken(0.5, theme.secondaryBlue)};
  border-radius: 2px;
  background: #0b7ebc;
  color: white;
  width: 30%;
  font-size: ${toRem(20)};
  font-weight: 400;
  height: 62px;
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
      background-color: #4b4b4b;
      color: #00caff;
    `};
`

const FieldWrapper = styled.div`
  display: flex;
  padding: 20px 0;
  justify-content: center;
`

const Error = styled.span`
  margin: 0;
  flex: ;
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

class MailingListForm extends Component {
  onSubmit = values =>
    store.actions.post({ key: 'mailingList', resource: 'participants', values })
  render({ status }) {
    const loading = status && status === 'started'
    return (
      <Form
        id="mailingList"
        onSubmit={this.onSubmit}
        initialValues={{ receivesMail: true }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <label>Keep in the loop and join our mailing list!</label>
            <Field name="email">
              {({ input, meta }) => (
                <div>
                  <FieldWrapper>
                    <Input type="type" {...input} valid={meta.valid} />
                    <Button
                      type="submit"
                      loading={loading}
                      primary
                      disabled={!meta.touched || meta.error}
                      valid={meta.valid}
                    >
                      <PlusIcon />
                    </Button>
                  </FieldWrapper>
                  {meta.error && meta.touched && <Error>{meta.error}</Error>}
                </div>
              )}
            </Field>
          </form>
        )}
      />
    )
  }
}

export default connect(state => ({
  status: pathOr(null, ['api', 'mailingList', 'status'], state)
}))(MailingListForm)
