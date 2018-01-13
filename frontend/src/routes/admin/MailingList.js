import { h } from 'preact'
import {
  TableWrapper,
  Table,
  TableHead,
  TableBody
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
    property: 'joined',
    header: {
      label: 'Joined on'
    }
  },
  {
    property: 'active',
    header: {
      label: 'Active'
    }
  }
]

const MailingList = ({ participants }) => (
  <TableWrapper>
    <Table columns={columns}>
      <TableHead />
      <TableBody rows={participants} rowKey="email" />
    </Table>
  </TableWrapper>
)

export default MailingList
