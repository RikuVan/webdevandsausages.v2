import { h, Component } from 'preact'

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
    },
    props: {
      center: true
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

class WaitListed extends Component {
  render({ waitListed }) {
    return (
      <TableWrapper>
        <Table columns={columns} components={StyledCells}>
          <TableHead />
          <TableBody rows={waitListed} rowKey="id" />
        </Table>
      </TableWrapper>
    )
  }
}

export default WaitListed
