import { ResourceView } from './ResourceView.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  return (
    <ResourceView
      description="The people powering the OctoFit rhythm."
      eyebrow="PEOPLE / DIRECTORY"
      endpoint={usersEndpoint}
      resource="users"
      title="Members"
    >
      {(users) => (
        <div className="record-grid">
          {users.map((user) => (
            <article className="record-card" key={user._id || user.id || user.email}>
              <div className="avatar avatar--coral">{user.avatar || user.name?.slice(0, 2).toUpperCase()}</div>
              <div><h2>{user.name}</h2><p>{user.email}</p></div>
              <span className="card-meta">Goal / {user.weeklyGoal || '—'} sessions</span>
            </article>
          ))}
        </div>
      )}
    </ResourceView>
  )
}

export default Users