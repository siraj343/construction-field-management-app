import { useState } from 'react'
import Navbar from '../components/Navbar'
import ProjectCard from '../components/ProjectCard'
import { PROJECTS, STATUS_CONFIG } from '../data/projects'

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)

export default function ProjectListPage({ onLogout }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Filter projects based on search and status
  const filteredProjects = PROJECTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Stats summary
  const stats = {
    total: PROJECTS.length,
    active: PROJECTS.filter((p) => p.status === 'active').length,
    onHold: PROJECTS.filter((p) => p.status === 'on-hold').length,
    completed: PROJECTS.filter((p) => p.status === 'completed').length,
  }

  return (
    <div className="page-container grid-bg">
      <Navbar onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Page header */}
        <div className="mb-8 animate-fade-up">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-0.5 stripe-accent" />
                <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
                  Field Operations
                </span>
              </div>
              <h1 className="font-display font-800 text-4xl sm:text-5xl uppercase tracking-wide text-white">
                Active Projects
              </h1>
              <p className="text-steel-400 text-sm mt-1">
                Select a project to file your Daily Progress Report
              </p>
            </div>

            {/* Stats strip */}
            <div className="flex gap-4 flex-wrap">
              {[
                { label: 'Total', value: stats.total, color: 'text-white' },
                { label: 'Active', value: stats.active, color: 'text-emerald-400' },
                { label: 'On Hold', value: stats.onHold, color: 'text-amber-400' },
                { label: 'Done', value: stats.completed, color: 'text-sky-400' },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center bg-steel-800/50 border border-steel-700 px-4 py-2 cut-corner-sm">
                  <div className={`font-display font-700 text-2xl ${color}`}>{value}</div>
                  <div className="text-xs font-mono text-steel-500 uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-500">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search by name, location, or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9 cut-corner-sm text-sm"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2 bg-steel-800 border border-steel-700 px-3 py-2">
            <FilterIcon />
            <div className="flex gap-1.5">
              {[
                { key: 'all', label: 'All' },
                { key: 'active', label: 'Active' },
                { key: 'on-hold', label: 'On Hold' },
                { key: 'completed', label: 'Done' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setStatusFilter(key)}
                  className={`px-3 py-1 text-xs font-display uppercase tracking-widest transition-colors ${
                    statusFilter === key
                      ? 'bg-amber-500 text-steel-950'
                      : 'text-steel-400 hover:text-amber-500'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-steel-600">
            <div className="text-5xl font-display font-700 uppercase tracking-widest mb-2">404</div>
            <p className="font-mono text-sm">No projects match your search</p>
          </div>
        )}
      </main>
    </div>
  )
}
