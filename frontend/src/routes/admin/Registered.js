import { h, Component } from 'preact'

import {
  TableWrapper,
  Table,
  TableHead,
  TableBody
} from '../../components/Table'

const columns = [
  {
    property: 'id',
    header: {
      label: '#'
    }
  },
  {
    property: 'email',
    header: {
      label: 'Email'
    }
  },
  {
    property: 'verificationToken',
    header: {
      label: 'Token'
    }
  },
  {
    header: {
      label: 'Remove'
    },
    cell: {
      formatters: [
        () => <button onClick={() => console.log('called')}>Remove</button>
      ]
    }
  }
]

class Registered extends Component {
  render({ registered }) {
    return (
      <TableWrapper>
        <Table columns={columns}>
          <TableHead />
          <TableBody rows={registered} rowKey="id" />
        </Table>
      </TableWrapper>
    )
  }
}

export default Registered
