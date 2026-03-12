import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { PROJECTS } from '../data/projects'

// ─── Small Icon components ───────────────────────────────────────────
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-5 h-5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
  </svg>
)
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
)

// Weather options with emoji for visual clarity
const WEATHER_OPTIONS = [
  { value: '', label: 'Select weather condition' },
  { value: 'sunny', label: '☀️  Sunny', color: 'text-yellow-400' },
  { value: 'cloudy', label: '☁️  Cloudy', color: 'text-steel-300' },
  { value: 'rainy', label: '🌧️  Rainy', color: 'text-sky-400' },
  { value: 'stormy', label: '⛈️  Stormy', color: 'text-purple-400' },
  { value: 'foggy', label: '🌫️  Foggy', color: 'text-steel-400' },
]

// ─── Field wrapper component for consistent form layout ───────────────
function FormField({ label, required, error, children }) {
  return (
    <div>
      <label className="input-label">
        {label}
        {required && <span className="text-amber-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-400 font-mono animate-slide-in">{error}</p>
      )}
    </div>
  )
}

// ─── Success screen shown after submit ────────────────────────────────
function SuccessScreen({ onBack, formData }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-up">
      <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-6 cut-corner">
        <CheckIcon />
      </div>
      <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
        Report Filed Successfully
      </div>
      <h2 className="font-display font-700 text-3xl uppercase tracking-wide text-white mb-2">
        DPR Submitted
      </h2>
      <p className="text-steel-400 text-sm mb-2">
        Daily Progress Report for <span className="text-white">{formData.projectName}</span>
      </p>
      <p className="text-steel-500 text-xs font-mono mb-8">
        {formData.date} · {WEATHER_OPTIONS.find(w => w.value === formData.weather)?.label}
      </p>

      {/* Summary box */}
      <div className="bg-steel-800 border border-steel-700 p-4 mb-8 text-left w-full max-w-sm cut-corner-sm">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-xs text-steel-500 font-mono uppercase tracking-wider mb-0.5">Workers</div>
            <div className="text-white font-display font-600">{formData.workerCount}</div>
          </div>
          <div>
            <div className="text-xs text-steel-500 font-mono uppercase tracking-wider mb-0.5">Photos</div>
            <div className="text-white font-display font-600">{formData.photos.length}</div>
          </div>
          <div className="col-span-2">
            <div className="text-xs text-steel-500 font-mono uppercase tracking-wider mb-0.5">Work Done</div>
            <div className="text-steel-300 text-xs line-clamp-2">{formData.description}</div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate('/projects')}
          className="btn-secondary text-sm"
        >
          ← Back to Projects
        </button>
        <button
          onClick={onBack}
          className="btn-primary text-sm"
        >
          New DPR
        </button>
      </div>
    </div>
  )
}

// ─── Main DPR Form Page ───────────────────────────────────────────────
export default function DPRFormPage() {
  const { projectId } = useParams()
  const navigate = useNavigate()

  // Find the current project from URL param
  const currentProject = PROJECTS.find((p) => p.id === projectId) || PROJECTS[0]

  // ── Form state ──
  const [formData, setFormData] = useState({
    projectId: currentProject.id,
    projectName: currentProject.name,
    date: new Date().toISOString().split('T')[0], // Today's date as default
    weather: '',
    description: '',
    workerCount: '',
    photos: [],
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ── Handlers ──
  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  function handlePhotoUpload(e) {
    const files = Array.from(e.target.files)
    const remaining = 3 - formData.photos.length
    const toAdd = files.slice(0, remaining)

    toAdd.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setFormData((prev) => ({
          ...prev,
          photos: [...prev.photos, { url: ev.target.result, name: file.name }],
        }))
      }
      reader.readAsDataURL(file)
    })
    // Reset input so same file can be re-selected
    e.target.value = ''
    if (errors.photos) setErrors((prev) => ({ ...prev, photos: '' }))
  }

  function removePhoto(index) {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  // ── Validation ──
  function validate() {
    const newErrors = {}
    if (!formData.projectId) newErrors.projectId = 'Please select a project.'
    if (!formData.date) newErrors.date = 'Date is required.'
    if (!formData.weather) newErrors.weather = 'Please select the weather condition.'
    if (!formData.description.trim()) {
      newErrors.description = 'Work description is required.'
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Please provide at least 20 characters of description.'
    }
    if (!formData.workerCount) {
      newErrors.workerCount = 'Worker count is required.'
    } else if (parseInt(formData.workerCount) < 1) {
      newErrors.workerCount = 'Worker count must be at least 1.'
    }
    if (formData.photos.length === 0) {
      newErrors.photos = 'Please upload at least 1 site photo.'
    }
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0]
      document.getElementById(firstErrorKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setIsSubmitting(true)
    // Simulate API submit delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1000)
  }

  function resetForm() {
    setFormData({
      projectId: currentProject.id,
      projectName: currentProject.name,
      date: new Date().toISOString().split('T')[0],
      weather: '',
      description: '',
      workerCount: '',
      photos: [],
    })
    setErrors({})
    setIsSubmitted(false)
  }

  // ── Render ──
  return (
    <div className="page-container grid-bg">
      <Navbar projectName={currentProject.name} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {isSubmitted ? (
          <SuccessScreen onBack={resetForm} formData={formData} />
        ) : (
          <>
            {/* Page header */}
            <div className="mb-8 animate-fade-up">
              <button
                onClick={() => navigate('/projects')}
                className="flex items-center gap-2 text-xs text-steel-500 hover:text-amber-500 transition-colors font-mono uppercase tracking-wider mb-4"
              >
                <BackIcon /> All Projects
              </button>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-0.5 stripe-accent" />
                <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
                  Daily Progress Report
                </span>
              </div>
              <h1 className="font-display font-800 text-3xl sm:text-4xl uppercase tracking-wide text-white">
                {currentProject.name}
              </h1>
              <p className="text-steel-500 text-sm mt-1 font-mono">{currentProject.id} · {currentProject.location}</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6 animate-fade-up" style={{ animationDelay: '100ms' }}>

              {/* ── Section 1: Project Details ── */}
              <section className="bg-steel-900 border border-steel-700 p-5 sm:p-6 cut-corner">
                <h2 className="font-display font-600 text-sm uppercase tracking-widest text-steel-400 mb-5 pb-3 border-b border-steel-700">
                  01 — Project Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Project selector */}
                  <FormField label="Project" required error={errors.projectId}>
                    <select
                      id="projectId"
                      value={formData.projectId}
                      onChange={(e) => {
                        const p = PROJECTS.find(p => p.id === e.target.value)
                        handleChange('projectId', e.target.value)
                        handleChange('projectName', p?.name || '')
                      }}
                      className="input-field cut-corner-sm appearance-none cursor-pointer"
                    >
                      {PROJECTS.map((p) => (
                        <option key={p.id} value={p.id}>{p.id} — {p.name}</option>
                      ))}
                    </select>
                  </FormField>

                  {/* Date picker */}
                  <FormField label="Report Date" required error={errors.date}>
                    <input
                      id="date"
                      type="date"
                      value={formData.date}
                      max={new Date().toISOString().split('T')[0]}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className="input-field cut-corner-sm"
                    />
                  </FormField>

                  {/* Weather */}
                  <FormField label="Weather Condition" required error={errors.weather}>
                    <select
                      id="weather"
                      value={formData.weather}
                      onChange={(e) => handleChange('weather', e.target.value)}
                      className="input-field cut-corner-sm appearance-none cursor-pointer"
                    >
                      {WEATHER_OPTIONS.map((w) => (
                        <option key={w.value} value={w.value}>{w.label}</option>
                      ))}
                    </select>
                  </FormField>

                  {/* Worker count */}
                  <FormField label="Worker Count on Site" required error={errors.workerCount}>
                    <input
                      id="workerCount"
                      type="number"
                      min="1"
                      max="9999"
                      value={formData.workerCount}
                      onChange={(e) => handleChange('workerCount', e.target.value)}
                      placeholder="e.g. 24"
                      className="input-field cut-corner-sm"
                    />
                  </FormField>
                </div>
              </section>

              {/* ── Section 2: Work Description ── */}
              <section className="bg-steel-900 border border-steel-700 p-5 sm:p-6 cut-corner">
                <h2 className="font-display font-600 text-sm uppercase tracking-widest text-steel-400 mb-5 pb-3 border-b border-steel-700">
                  02 — Work Description
                </h2>
                <FormField label="Work Carried Out Today" required error={errors.description}>
                  <textarea
                    id="description"
                    rows={5}
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Describe the work carried out today. Include tasks completed, materials used, equipment deployed, and any notable observations..."
                    className="input-field cut-corner-sm resize-y min-h-28"
                  />
                  <div className="flex justify-end mt-1">
                    <span className={`text-xs font-mono ${formData.description.length < 20 ? 'text-steel-600' : 'text-emerald-500'}`}>
                      {formData.description.length} chars
                    </span>
                  </div>
                </FormField>
              </section>

              {/* ── Section 3: Photo Upload ── */}
              <section className="bg-steel-900 border border-steel-700 p-5 sm:p-6 cut-corner">
                <h2 className="font-display font-600 text-sm uppercase tracking-widest text-steel-400 mb-5 pb-3 border-b border-steel-700">
                  03 — Site Photos
                  <span className="ml-2 text-steel-600 normal-case tracking-normal font-body font-400 text-xs">
                    ({formData.photos.length}/3 uploaded)
                  </span>
                </h2>

                {errors.photos && (
                  <p className="mb-3 text-xs text-red-400 font-mono animate-slide-in">{errors.photos}</p>
                )}

                {/* Photo previews */}
                {formData.photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {formData.photos.map((photo, idx) => (
                      <div key={idx} className="relative group aspect-square">
                        <img
                          src={photo.url}
                          alt={`Site photo ${idx + 1}`}
                          className="w-full h-full object-cover border border-steel-700 group-hover:border-amber-500/50 transition-colors"
                        />
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove photo"
                        >
                          <XIcon />
                        </button>
                        {/* Photo number badge */}
                        <div className="absolute bottom-1 left-1 bg-steel-950/70 text-xs font-mono text-steel-400 px-1.5 py-0.5">
                          #{idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload area - only show if less than 3 photos */}
                {formData.photos.length < 3 && (
                  <label
                    id="photos"
                    htmlFor="photoInput"
                    className="flex flex-col items-center justify-center w-full py-10 border-2 border-dashed border-steel-700 hover:border-amber-500/50 hover:bg-amber-500/5 cursor-pointer transition-all group"
                  >
                    <div className="text-steel-600 group-hover:text-amber-500/60 transition-colors mb-2">
                      <UploadIcon />
                    </div>
                    <p className="text-sm text-steel-400 group-hover:text-steel-300 transition-colors font-display uppercase tracking-wider">
                      Click to upload photos
                    </p>
                    <p className="text-xs text-steel-600 font-mono mt-1">
                      JPG, PNG, WEBP · Max 3 photos · {3 - formData.photos.length} remaining
                    </p>
                    <input
                      id="photoInput"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </section>

              {/* ── Submit ── */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/projects')}
                  className="btn-secondary flex-1 text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex-1 sm:flex-2 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-base py-4"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Submitting Report...
                    </>
                  ) : (
                    'Submit DPR →'
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-steel-600 font-mono">
                Fields marked with <span className="text-amber-500">*</span> are required
              </p>
            </form>
          </>
        )}
      </main>
    </div>
  )
}
