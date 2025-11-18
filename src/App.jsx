import { useMemo, useState, useEffect } from 'react'
import RECIPES from './data/recipes'

function RecipeCard({ r, onClick }) {
  return (
    <article
      onClick={() => onClick?.(r)}
      className="cursor-pointer hover:scale-[1.01] transform-gpu transition-all bg-slate-800/60 backdrop-blur rounded-lg p-4 shadow-md border border-slate-700"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(r) }}
    >
      <h3 className="text-lg font-semibold">{r.title}</h3>
      <p className="text-sm text-slate-300 mt-1">{r.desc}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {r.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-1 bg-slate-700/40 rounded-full text-slate-200"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  )
}

export default function App() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('')
  const [selected, setSelected] = useState(null)

  const tags = useMemo(() => {
    const s = new Set()
    RECIPES.forEach((r) => r.tags.forEach((t) => s.add(t)))
    return Array.from(s)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return RECIPES.filter((r) => {
      if (tag && !r.tags.includes(tag)) return false
      if (!q) return true
      return (
        r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q)
      )
    })
  }, [query, tag])

  useEffect(() => {
    if (!selected) return
    function onKey(e) {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <header className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">Recipe Finder</h1>
            <p className="text-slate-300 mt-1">Search quick, tasty recipes — Tailwind only.</p>
          </div>
          <div className="text-sm text-slate-400">Vite + React</div>
        </header>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-slate-300 mb-1">Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. pasta, garlic, quick"
              className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Filter tag</label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-100"
            >
              <option value="">All</option>
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <main className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((r) => (
              <RecipeCard key={r.id} r={r} onClick={(rec) => setSelected(rec)} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-8 text-center text-slate-300">
              No recipes found. Try a different search or tag.
            </div>
          )}
        </main>

        <footer className="mt-8 text-sm text-slate-500">Made with TailwindCSS • Local demo data</footer>
      </div>
    </div>
    {/* Modal */}
    {selected && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setSelected(null)}
        />

        <div className="relative z-10 max-w-lg w-full mx-4">
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl border border-slate-700">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selected.title}</h2>
                <p className="text-slate-300 mt-2">{selected.desc}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="ml-4 text-slate-400 hover:text-slate-200"
                aria-label="Close details"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {selected.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 bg-slate-700/40 rounded-full text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 text-sm text-slate-400">More details can go here (ingredients, steps, etc.)</div>
          </div>
        </div>
      </div>
    )}
  </>
  )
}
