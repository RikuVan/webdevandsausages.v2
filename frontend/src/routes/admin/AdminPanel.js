import { h, Component } from 'preact'
import { connect } from '../../preact-smitty'
import { pathOr, pathEq } from 'ramda'

import { endpoints } from '../../api'
import PageWrapper from '../../components/PageWrapper'

import store from '../../store'

class AdminPanel extends Component {
  componentDidMount() {
    store.actions.get({ key: 'allParticipants', resource: 'participants' })
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
  loading: pathEq(false, ['allParticipants', 'status'], 'started', state),
  participants: pathOr({}, ['allParticipants', 'data'], state)
})

export default connect(mapStateToProps)(AdminPanel)
