import { h } from 'preact'

import {
  TableWrapper,
  Table,
  TableHead,
  TableBody,
  Cell,
  ColHead
} from '../../components/Table'

const columns = [
  {
    property: 'email',
    header: {
      label: 'Email'
    }
  },
  {
    property: 'firstName',
    header: {
      label: 'First Name'
    }
  },
  {
    property: 'lastName',
    header: {
      label: 'Last Name'
    }
  },
  {
    property: 'affiliation',
    header: {
      label: 'Affiliation'
    }
  },
  {
    property: 'insertedOn',
    header: {
      label: 'Joined on'
    }
  },
  {
    property: 'receivesMail',
    header: {
      label: 'Active'
    },
    cell: {
      formatters: [receivesMail => receivesMail && <span>&#10003;</span>]
    },
    props: {
      center: true,
      width: '80px'
    }
  }
]

const StyledCells = {
  body: {
    cell: Cell
  },
  header: {
    cell: ColHead
  }
}

const MailingList = ({ participants }) => (
  <TableWrapper>
    <Table columns={columns} components={StyledCells}>
      <TableHead />
      <TableBody rows={participants} rowKey="email" />
    </Table>
  </TableWrapper>
)

export default MailingList
