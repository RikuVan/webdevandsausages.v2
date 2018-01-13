import { h } from 'preact'
import {
  TableWrapper,
  Table,
  TableHead,
  TableBody
} from '../../components/Table'

const columns = [
  {
    property: 'datetime',
    header: {
      label: 'When'
    }
  },
  {
    property: 'registrationOpens',
    header: {
      label: 'Registration Opens'
    }
  },
  {
    property: 'registrationCloses',
    header: {
      label: 'Registration Closes'
    }
  },
  {
    property: 'maxParticipants',
    header: {
      label: 'Max Participants'
    }
  }
]

const CurrentEvent = ({ events }) => (
  <TableWrapper>
    <Table columns={columns}>
      <TableHead />
      <TableBody rows={events} rowKey="datetime" />
    </Table>
  </TableWrapper>
)

export default CurrentEvent
