import { h } from 'preact'
import styled, { css } from 'styled-components'
import { Field } from 'react-final-form'

import {
  baseInput,
  activeInput,
  validInput,
  FieldWrapper,
  Label,
  Error,
  InputCell
} from './LabeledField'
import { toRem } from '../../helpers/styleHelpers'

export const Textarea = styled.textarea`
  ${props => baseInput(props)};
  ${props => activeInput(props)};
  ${props => validInput(props)};
  ${({ width }) =>
    width &&
    css`
      width: ${toRem(width)};
    `};
`

const LabeledTextarea = ({
  name,
  label,
  type = 'text',
  placeholder,
  rows = 10,
  cols,
  ...rest
}) => {
  // Why does this need to be reassigned to work?
  const text = label
  return (
    <InputCell {...rest}>
      <Field name={name}>
        {({ input, meta }) => (
          <div>
            <FieldWrapper>
              {text && <Label text={text} />}
              <Textarea
                {...input}
                valid={meta.valid}
                placeholder={placeholder}
                active={!!input.value.length}
                cols={cols}
                rows={rows}
              />
            </FieldWrapper>
            {meta.touched && meta.error && <Error>{meta.error}</Error>}
          </div>
        )}
      </Field>
    </InputCell>
  )
}

export default LabeledTextarea
