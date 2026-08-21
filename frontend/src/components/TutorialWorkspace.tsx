import { useMemo, useState } from 'react'
import type { TutorialTopic } from '../types'

type TutorialWorkspaceProps = {
  topics: TutorialTopic[]
  completedTopicIds: string[]
  onCompleteTopic: (topicId: string) => void
}

export function TutorialWorkspace({ topics, completedTopicIds, onCompleteTopic }: TutorialWorkspaceProps) {
  const [query, setQuery] = useState('')
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0].id)

  const filteredTopics = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return topics
    }

    return topics.filter((topic) =>
      [topic.title, topic.description, topic.category, topic.language, topic.difficulty]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [query, topics])

  const selectedTopic = topics.find((topic) => topic.id === selectedTopicId) ?? topics[0]
  const selectedTopicCompleted = completedTopicIds.includes(selectedTopic.id)
  const categories = Array.from(new Set(topics.map((topic) => topic.category)))
  const completedCount = completedTopicIds.length

  return (
    <section className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <aside className="glass-panel rounded-2xl p-5 shadow-md flex flex-col">
        <div className="rounded-xl bg-slate-950/50 border border-white/5 p-4.5 text-white">
          <p className="text-xs font-black uppercase tracking-wider text-slate-400">Tutorial progress</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-emerald-400">
            {completedCount}/{topics.length}
          </p>
          <p className="mt-1 text-xs text-slate-400 font-medium">Complete all topics to unlock quizzes.</p>
        </div>

        <label className="mt-5 block text-xs font-extrabold uppercase tracking-wider text-slate-300" htmlFor="tutorial-search">
          Search tutorials
        </label>
        <input
          id="tutorial-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/5 bg-slate-900/60 px-4 py-3 text-xs font-semibold text-slate-200 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25 placeholder:text-slate-500"
          placeholder="HTML, CSS, React, Python..."
          type="search"
        />

        <div className="mt-4 flex flex-wrap gap-1.5">
          {categories.map((category) => (
            <span key={category} className="rounded-lg bg-slate-800/80 px-2.5 py-0.5 text-[10px] font-bold text-slate-300 border border-slate-700/50">
              {category}
            </span>
          ))}
        </div>

        <div className="mt-5 space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {filteredTopics.map((topic) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => setSelectedTopicId(topic.id)}
              className={`w-full rounded-xl border p-4.5 text-left transition-all duration-200 ${
                selectedTopic.id === topic.id
                  ? 'border-emerald-500/40 bg-emerald-500/10 shadow-sm'
                  : 'border-white/5 bg-slate-900/30 hover:border-slate-850 hover:bg-slate-900/60'
              }`}
            >
              <span className="block text-sm font-bold text-white transition-colors duration-200">{topic.title}</span>
              <span className="mt-1 block text-[10px] font-bold tracking-wider uppercase text-slate-400">
                {topic.category} - {topic.language} - {topic.difficulty}
              </span>
              {completedTopicIds.includes(topic.id) ? (
                <span className="mt-2.5 inline-flex rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-400">
                  Completed
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </aside>

      <div className="space-y-6">
        <article className="glass-panel rounded-2xl p-6 shadow-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-white/5 pb-5">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-emerald-400">{selectedTopic.category}</p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-white">{selectedTopic.title}</h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 font-medium max-w-2xl">{selectedTopic.description}</p>
            </div>
            <span className="w-fit rounded-lg bg-slate-800 border border-slate-700/50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-300">
              {selectedTopic.language}
            </span>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-xl bg-slate-950/80 border border-white/5 p-5 text-slate-100 shadow-inner">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">Code Workspace</span>
                <span className="rounded-lg bg-slate-800 px-2 py-0.5 text-[10px] font-extrabold uppercase text-slate-300">{selectedTopic.difficulty}</span>
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap text-xs font-mono leading-relaxed text-emerald-300">
                <code>{selectedTopic.example}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-white/5 bg-slate-900/35 p-5 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Practice Task</p>
                <h3 className="mt-1.5 text-base font-black text-white">Try it yourself</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 font-medium">
                  Run this syntax test in the interactive browser emulator to log progress and verify checkpoints.
                </p>
              </div>
              
              <button
                type="button"
                onClick={() => onCompleteTopic(selectedTopic.id)}
                disabled={selectedTopicCompleted}
                className={`mt-5 rounded-xl py-3 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  selectedTopicCompleted
                    ? 'cursor-not-allowed bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/20 btn-shimmer hover:brightness-110'
                }`}
              >
                {selectedTopicCompleted ? 'Topic Completed' : 'Complete'}
              </button>
            </div>
          </div>
        </article>

        <section className="grid gap-4 md:grid-cols-3">
          {['Examples', 'Exercises', 'Certificates'].map((item) => (
            <div key={item} className="glass-panel rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">{item}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 font-medium">
                Short, practical learning blocks designed for repeat practice and measurable progress.
              </p>
            </div>
          ))}
        </section>
      </div>
    </section>
  )
}
