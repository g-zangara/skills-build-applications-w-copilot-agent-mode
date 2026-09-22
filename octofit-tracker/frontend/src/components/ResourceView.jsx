import { useCollection } from '../hooks/useCollection.js'

export function ResourceView({ eyebrow, title, description, resource, children }) {
  const { items, state } = useCollection(resource)

  return (
    <section className="resource-page">
      <p className="eyebrow">{eyebrow}</p>
      <div className="page-heading">
        <div>
          <h1>{title}</h1>
          <p className="intro-copy">{description}</p>
        </div>
        <span className="count-badge">{state === 'ready' ? items.length : '—'} records</span>
      </div>
      {state === 'loading' && <div className="notice">Loading {resource}...</div>}
      {state === 'error' && <div className="notice notice--error">Could not reach the API. Check the backend on port 8000.</div>}
      {state === 'ready' && items.length === 0 && <div className="notice">No records yet.</div>}
      {state === 'ready' && items.length > 0 && children(items)}
    </section>
  )
}