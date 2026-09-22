import { ResourceView } from './ResourceView.jsx'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  return (
    <ResourceView
      description="Focused sessions matched to your current energy."
      eyebrow="LIBRARY / TRAINING"
      endpoint={workoutsEndpoint}
      resource="workouts"
      title="Workouts"
    >
      {(workouts) => <div className="record-grid">{workouts.map((workout) => <article className="record-card workout-card" key={workout._id || workout.id || workout.title}><div className="workout-top"><span className="level-tag">{workout.level || 'all levels'}</span><span>{workout.durationMinutes || '—'} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><div className="exercise-list">{(workout.exercises || []).slice(0, 3).map((exercise) => <span key={exercise}>{exercise}</span>)}</div></article>)}</div>}
    </ResourceView>
  )
}

export default Workouts