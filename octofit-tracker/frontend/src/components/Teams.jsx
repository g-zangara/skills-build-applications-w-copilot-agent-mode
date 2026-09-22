import { displayName } from '../lib/api.js'
import { ResourceView } from './ResourceView.jsx'

function Teams() {
  return (
    <ResourceView
      description="Small groups make consistency more visible."
      eyebrow="COMMUNITY / GROUPS"
      resource="teams"
      title="Teams"
    >
      {(teams) => <div className="record-grid">{teams.map((team) => <article className="record-card team-card" key={team._id || team.id || team.name}><div className="team-symbol">+</div><h2>{team.name}</h2><p>{team.description}</p><div className="team-footer"><span>{team.members?.map(displayName).join(', ') || 'No members'}</span><strong>{team.points || 0} pts</strong></div></article>)}</div>}
    </ResourceView>
  )
}

export default Teams