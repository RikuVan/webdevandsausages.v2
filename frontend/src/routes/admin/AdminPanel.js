import { h, Component } from 'preact'
import { connect } from '../../preact-smitty'
import R from '../../helpers'

import PageWrapper from '../../components/PageWrapper'

class AdminPanel extends Component {
  componentDidMount() {
    this.props.actions.get({ key: 'allParticipants', resource: 'participants' })
  }

  render({ participants, loading }) {
    return (
      <PageWrapper>
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <pre>{JSON.stringify(participants, null, 2)}</pre>
        )}
      </PageWrapper>
    )
  }
}

const mapStateToProps = state => ({
  loading: R.pathEq(false, ['allParticipants', 'status'], 'started', state),
  participants: R.pathOr({}, ['allParticipants', 'data'], state)
})

export default connect(mapStateToProps)(AdminPanel)
