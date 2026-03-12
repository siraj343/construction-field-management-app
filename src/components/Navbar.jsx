import { useNavigate } from 'react-router-dom'

// Icons as simple SVG components — no extra library needed
const HardHatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M2 18h20v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2z" />
    <path d="M12 2a8 8 0 018 8H4a8 8 0 018-8z" />
    <path d="M4 18v-4" />
    <path d="M20 18v-4" />
  </svg>
)

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default function Navbar({ onLogout, currentPage = 'projects', projectName = null }) {
  const navigate = useNavigate()

  return (
    <header className="bg-steel-900 border-b border-steel-700 sticky top-0 z-50">
      {/* Top accent stripe */}
      <div className="h-0.5 stripe-accent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo */}
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2.5 group"
          >
            <div className="bg-amber-500 p-1.5 cut-corner-sm group-hover:bg-amber-400 transition-colors">
              <HardHatIcon />
            </div>
            <span className="font-display font-800 text-xl tracking-widest uppercase text-white hidden sm:block">
              Site<span className="text-amber-500">Sync</span>
            </span>
          </button>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs font-mono text-steel-400">
            <span
              className="hover:text-amber-500 cursor-pointer transition-colors uppercase tracking-wider"
              onClick={() => navigate('/projects')}
            >
              Projects
            </span>
            {projectName && (
              <>
                <ChevronIcon />
                <span className="text-steel-300 uppercase tracking-wider truncate max-w-32 sm:max-w-none">
                  {projectName}
                </span>
              </>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-steel-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow inline-block" />
              test@test.com
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 text-steel-400 hover:text-amber-500 transition-colors text-xs uppercase tracking-wider font-display border border-steel-700 hover:border-amber-500/50 px-3 py-1.5"
              >
                <LogoutIcon />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
