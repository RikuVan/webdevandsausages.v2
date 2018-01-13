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
    property: 'name',
    header: {
      label: 'Property'
    },
    props: {
      width: '200px'
    }
  },
  {
    property: 'value',
    header: {
      label: 'Value'
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

const CurrentEvent = ({ currentEvent }) => (
  <TableWrapper>
    <Table columns={columns} components={StyledCells}>
      <TableHead />
      <TableBody rows={currentEvent} rowKey="name" />
    </Table>
  </TableWrapper>
)

export default CurrentEvent
