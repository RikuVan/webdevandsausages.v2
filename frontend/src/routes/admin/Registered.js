import { h, Component } from 'preact'
import styled, { css } from 'styled-components'
import R from '../../helpers'

import {
  TableWrapper,
  Table,
  TableHead,
  TableBody,
  Cell,
  ColHead
} from '../../components/Table'
import { connect } from '../../preact-smitty'
import Notification from '../../components/Notification'
import Spinner from '../../components/Spinner'

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-x-circle"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
)

const Remover = styled.div`
  ${p =>
    css`
      color: ${p.theme.notificationError};
    `};
  &:hover {
    cursor: pointer;
  }
`

const StyledCells = {
  body: {
    cell: Cell
  },
  header: {
    cell: ColHead
  }
}

class Registered extends Component {
  removeRegistration = values => {
    this.props.actions.delete({
      key: 'cancellation',
      resource: 'registration',
      id: this.props.eventId,
      values: R.omit(['id'], values),
      cb: () => {
        this.props.actions.get({
          key: 'allParticipants',
          resource: 'participants'
        })
        this.props.actions.get({ key: 'allEvents', resource: 'events' })
      }
    })
  }
  getColumns = () => [
    {
      property: 'id',
      header: {
        label: '#'
      },
      props: {
        width: '50px'
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
          (_, { rowData }) => (
            <Remover onClick={() => this.removeRegistration(rowData)}>
              <DeleteIcon />
            </Remover>
          )
        ]
      },
      props: {
        center: true,
        width: '100px'
      }
    }
  ]
  render({ registered, loading }) {
    return (
      <div>
        <TableWrapper>
          <Table columns={this.getColumns()} components={StyledCells}>
            <TableHead />
            {loading ? (
              <Spinner small />
            ) : (
              <TableBody rows={registered} rowKey="id" />
            )}
          </Table>
        </TableWrapper>
        <Notification
          type="success"
          id="cancellationSuccess"
          defaultMessage="The registration was removed"
        />
        <Notification
          type="error"
          id="cancellationError"
          defaultMessage="There was an error"
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: R.pathEq(['api', 'cancellation', 'status'], 'started', state)
})

export default connect(mapStateToProps)(Registered)
