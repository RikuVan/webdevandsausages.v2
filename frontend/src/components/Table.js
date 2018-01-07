import { h } from 'preact'
import styled, { css } from 'styled-components'

import { toRem } from '../helpers/styleHelpers'

export const TableWrapper = styled.table`
  width: 100%;
  text-align: left;
  margin: ${toRem(40)} 0;
  ${({ theme }) => css`
    color: ${theme.primaryGrey};
  `};
`

const TableHead = styled.thead`
  ${({ theme }) =>
    css`
      border-bottom: 2px solid ${theme.lightGrey};
    `};
`

export const Row = styled.tr`
  padding: 0 ${toRem(20)};
  padding-left: 0;
  ${({ theme }) => css`
    &:not(:last-child) {
      border-bottom: 1px solid ${theme.lightGrey};
    }
  `};
`

export const Column = styled.th`
  font-weight: normal;
  padding: ${toRem(10)} ${toRem(12)};
  padding-left: 0;
`

const TableHeadColumn = styled(Column)`
  text-transform: uppercase;
  font-size: 85%;
  opacity: 0.8;
`

const Table = ({ head, children }) => (
  <TableWrapper>
    <TableHead>
      <tr>
        {head.map((text, i) => (
          <TableHeadColumn key={i} title={text}>
            {text}
          </TableHeadColumn>
        ))}
      </tr>
    </TableHead>

    <tbody>{children[0]}</tbody>
  </TableWrapper>
)

export default Table
