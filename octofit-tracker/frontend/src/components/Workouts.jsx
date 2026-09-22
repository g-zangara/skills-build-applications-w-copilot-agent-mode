import { ResourceView } from './ResourceView.jsx'

function Workouts() {
  return (
    <ResourceView
      description="Focused sessions matched to your current energy."
      eyebrow="LIBRARY / TRAINING"
      resource="workouts"
      title="Workouts"
    >
      {(workouts) => <div className="record-grid">{workouts.map((workout) => <article className="record-card workout-card" key={workout._id || workout.id || workout.title}><div className="workout-top"><span className="level-tag">{workout.level || 'all levels'}</span><span>{workout.durationMinutes || '—'} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><div className="exercise-list">{(workout.exercises || []).slice(0, 3).map((exercise) => <span key={exercise}>{exercise}</span>)}</div></article>)}</div>}
    </ResourceView>
  )
}

export default Workouts