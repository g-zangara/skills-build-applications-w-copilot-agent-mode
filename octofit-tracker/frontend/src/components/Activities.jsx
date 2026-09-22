import { displayName } from '../lib/api.js'
import { ResourceView } from './ResourceView.jsx'

function Activities() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'

  return (
    <ResourceView
      description="A living log of movement, effort, and momentum."
      endpoint={endpoint}
      eyebrow="TRACKING / MOVEMENT"
      resource="activities"
      title="Activities"
    >
      {(activities) => (
        <div className="table-wrap"><table className="data-table"><thead><tr><th>Activity</th><th>Member</th><th>Duration</th><th>Points</th></tr></thead><tbody>
          {activities.map((activity) => <tr key={activity._id || activity.id}><td><strong>{activity.type}</strong><small>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Recent'}</small></td><td>{displayName(activity.user)}</td><td>{activity.durationMinutes || '—'} min</td><td><span className="points">+{activity.points || 0}</span></td></tr>)}
        </tbody></table></div>
      )}
    </ResourceView>
  )
}

export default Activities