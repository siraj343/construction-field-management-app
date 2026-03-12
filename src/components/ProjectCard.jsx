import { useNavigate } from 'react-router-dom'
import { STATUS_CONFIG } from '../data/projects'

// Format date from YYYY-MM-DD to readable string
function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

// Location pin icon
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

export default function ProjectCard({ project, index }) {
  const navigate = useNavigate()
  const status = STATUS_CONFIG[project.status]

  return (
    <div
      className="card cursor-pointer group animate-fade-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
      onClick={() => navigate(`/dpr/${project.id}`)}
    >
      {/* Top bar with project ID and status */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-steel-700">
        <span className="font-mono text-xs text-steel-500 tracking-widest">{project.id}</span>
        <span className={`status-badge border ${status.bg} ${status.border} ${status.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

      {/* Main content */}
      <div className="p-4">
        {/* Project type tag */}
        <div className="mb-2">
          <span className="text-xs font-display font-600 uppercase tracking-widest text-amber-500/80">
            {project.type}
          </span>
        </div>

        {/* Project name */}
        <h3 className="font-display font-700 text-lg leading-tight text-white group-hover:text-amber-400 transition-colors mb-3">
          {project.name}
        </h3>

        {/* Meta info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-steel-400">
            <PinIcon />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-steel-400">
            <CalendarIcon />
            <span>Started {formatDate(project.startDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-steel-400">
            <UserIcon />
            <span>{project.manager}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-mono text-steel-500 uppercase tracking-wider">Progress</span>
            <span className="text-xs font-mono text-amber-500 font-bold">{project.progress}%</span>
          </div>
          <div className="h-1 bg-steel-700 w-full">
            <div
              className="h-full bg-amber-500 transition-all duration-700"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-steel-500 font-mono">
            Due: {formatDate(project.endDate)}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-amber-500 group-hover:gap-2.5 transition-all">
            File DPR <ArrowIcon />
          </div>
        </div>
      </div>

      {/* Bottom hover accent */}
      <div className="h-0.5 bg-amber-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
    </div>
  )
}
