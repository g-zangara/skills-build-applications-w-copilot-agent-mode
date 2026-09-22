import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'

const navigation = [
  { path: '/users', label: 'Members', icon: '◎' },
  { path: '/activities', label: 'Activities', icon: '↗' },
  { path: '/teams', label: 'Teams', icon: '◌' },
  { path: '/leaderboard', label: 'Leaderboard', icon: '✦' },
  { path: '/workouts', label: 'Workouts', icon: '▣' },
]

function Overview() {
  return (
    <section className="overview-page">
      <p className="eyebrow">OCTOFIT / COMMAND CENTER</p>
      <h1>Move with intent.</h1>
      <p className="intro-copy">
        Your team&apos;s rhythm, progress, and next good decision in one place.
      </p>
      <div className="overview-grid">
        <article className="feature-panel feature-panel--dark">
          <span className="panel-kicker">TODAY&apos;S FOCUS</span>
          <strong>Build a repeatable win.</strong>
          <p>Check the leaderboard, log your movement, and keep your streak alive.</p>
          <NavLink className="panel-link" to="/activities">View activities <span>↗</span></NavLink>
        </article>
        <article className="feature-panel feature-panel--lime">
          <span className="panel-kicker">QUICK START</span>
          <strong>Find your next workout.</strong>
          <p>Short sessions, clear effort, no guesswork.</p>
          <NavLink className="panel-link" to="/workouts">Browse workouts <span>↗</span></NavLink>
        </article>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/">
          <img alt="OctoFit logo" className="brand-mark" src={octofitLogo} />
          <span>OCTOFIT</span>
        </NavLink>
        <p className="sidebar-label">Workspace</p>
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink end className="nav-item" to="/">
            <span className="nav-icon">⌂</span> Overview
          </NavLink>
          {navigation.map((item) => (
            <NavLink className="nav-item" key={item.path} to={item.path}>
              <span className="nav-icon">{item.icon}</span> {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <span className="topbar-caption">SEPTEMBER 22, 2026</span>
          <span className="profile-chip"><span className="profile-avatar">AM</span> Alex Morgan</span>
        </header>
        <Routes>
          <Route element={<Overview />} path="/" />
          <Route element={<Users />} path="/users" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Workouts />} path="/workouts" />
        </Routes>
      </main>
    </div>
  )
}

export default App
