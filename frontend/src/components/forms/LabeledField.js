import { h } from 'preact'
import styled, { css } from 'styled-components'
import { Field } from 'react-final-form'
import darken from 'polished/lib/color/darken'

import { toRem } from '../../helpers/styleHelpers'
import { Cell } from '../layout'
import SausageIcon from '../SausageIcon'

export const Input = styled.input`
  border: none;
  ${({ theme }) =>
    css`
      background: ${theme.secondaryBlue};
    `};
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

export const FieldWrapper = styled.div`
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

export const LabelWrapper = styled.label`
  font-size: ${toRem(24)};
  font-weight: bold;
  ${({ theme }) =>
    css`
      color: ${darken(0.2, theme.iconsColor)};
    `};
`

const InputCell = styled(Cell)`
  padding-bottom: 15px;
`

export const Label = ({ text }) => (
  <LabelWrapper>
    <SausageIcon /> {text}
  </LabelWrapper>
)

const Error = styled.div`
  text-align: left;
  font-weight: 700;
  color: ${darken(0.2, 'red')};
`

const LabeledField = ({ name, label, type = 'text', placeholder, ...rest }) => {
  // Why does this need to be reassigned to work?
  const text = label
  return (
    <InputCell {...rest}>
      <Field name={name}>
        {({ input, meta }) => (
          <div>
            <FieldWrapper>
              <Label text={text} />
              <Input
                type={type}
                {...input}
                valid={meta.valid}
                placeholder={placeholder}
              />
            </FieldWrapper>
            {meta.touched && meta.error && <Error>{meta.error}</Error>}
          </div>
        )}
      </Field>
    </InputCell>
  )
}

export default LabeledField
