import { displayName } from '../lib/api.js'
import { ResourceView } from './ResourceView.jsx'

function Leaderboard() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'

  return (
    <ResourceView
      description="Celebrate the effort that keeps the whole crew moving."
      endpoint={endpoint}
      eyebrow="RANKINGS / MOMENTUM"
      resource="leaderboard"
      title="Leaderboard"
    >
      {(entries) => <div className="leaderboard-list">{entries.sort((a, b) => (a.rank || 99) - (b.rank || 99)).map((entry, index) => <article className={`leader-row leader-row--${index + 1}`} key={entry._id || entry.id}><span className="rank">{entry.rank || index + 1}</span><div className="avatar avatar--blue">{displayName(entry.user).slice(0, 2).toUpperCase()}</div><strong>{displayName(entry.user)}</strong><span className="streak">{entry.streakDays || 0} day streak</span><b>{entry.points || 0} pts</b></article>)}</div>}
    </ResourceView>
  )
}

export default Leaderboard