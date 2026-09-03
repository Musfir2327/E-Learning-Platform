import { useMemo, useState } from 'react'
import type { TutorialTopic } from '../types'
import { Code, BookOpen, Award, Terminal } from 'lucide-react'

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
    <section className="grid gap-6 lg:grid-cols-[340px_1fr] py-2">
      {/* Left Sidebar Topics List */}
      <aside className="brand-card p-6 shadow-sm flex flex-col space-y-5">
        <div className="rounded-2xl border border-[#4F39F6]/20 bg-[#EEF0FF] p-4.5 text-[#0F172B]">
          <p className="text-xs font-black uppercase tracking-wider text-[#4F39F6]">Tutorial Progress</p>
          <p className="mt-1 text-3xl font-black tracking-tight text-[#0F172B]">
            {completedCount} <span className="text-base text-[#64748B] font-bold">/ {topics.length}</span>
          </p>
          <p className="mt-1 text-xs text-[#334155] font-semibold">Complete all topics to master interactive skills.</p>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-black uppercase tracking-wider text-[#334155]" htmlFor="tutorial-search">
            Search Tutorials
          </label>
          <div className="relative">
            {/* <Search className="absolute left-3.5 top-3 h- w-4 text-[#64748B]" /> */}
            <input
              id="tutorial-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full brand-input pl-10 text-xs"
              placeholder="Search HTML, CSS, React, Python..."
              type="search"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((category) => (
            <span key={category} className="rounded-xl bg-[#EEF0FF] px-2.5 py-1 text-[10px] font-black text-[#4F39F6] border border-[#4F39F6]/20">
              {category}
            </span>
          ))}
        </div>

        <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1 pt-1">
          {filteredTopics.map((topic) => {
            const isSelected = selectedTopic.id === topic.id
            const isDone = completedTopicIds.includes(topic.id)

            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-[#4F39F6] bg-[#EEF0FF] shadow-xs'
                    : 'border-[#E2E8F0] bg-white hover:bg-[#EEF0FF]/40 hover:border-[#4F39F6]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`block text-sm font-black transition-colors ${
                    isSelected ? 'text-[#4F39F6]' : 'text-[#0F172B]'
                  }`}>
                    {topic.title}
                  </span>
                  {isDone && (
                    <span className="badge-success text-[10px] py-0.5 px-2">
                      ✓ Done
                    </span>
                  )}
                </div>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-wider text-[#64748B]">
                  {topic.category} • {topic.language} • {topic.difficulty}
                </span>
              </button>
            )
          })}
        </div>
      </aside>

      {/* Main Workspace Right */}
      <div className="space-y-6">
        <article className="brand-card p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-[#E2E8F0] pb-5">
            <div className="space-y-1">
              <span className="badge-purple text-xs">{selectedTopic.category}</span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172B]">{selectedTopic.title}</h2>
              <p className="text-xs sm:text-sm leading-relaxed text-[#334155] font-semibold max-w-2xl">{selectedTopic.description}</p>
            </div>
            <span className="rounded-xl bg-[#EEF0FF] border border-[#4F39F6]/20 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-[#4F39F6] shrink-0">
              {selectedTopic.language}
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Code Editor Preview */}
            <div className="rounded-2xl bg-[#0F172B] border border-slate-800 p-5 text-white shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-[#CBD5E1] flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-[#4F39F6]" />
                  Code Workspace
                </span>
                <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-black uppercase text-purple-400">{selectedTopic.difficulty}</span>
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap text-xs font-mono leading-relaxed text-emerald-400 p-2">
                <code>{selectedTopic.example}</code>
              </pre>
            </div>

            {/* Practice Task Panel */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#4F39F6]">Practice Task</span>
                <h3 className="text-base font-black text-[#0F172B]">Try It Yourself</h3>
                <p className="text-xs leading-relaxed text-[#334155] font-semibold">
                  Run this syntax test in the interactive browser emulator to log progress and verify checkpoints.
                </p>
              </div>
              
              <button
                type="button"
                onClick={() => onCompleteTopic(selectedTopic.id)}
                disabled={selectedTopicCompleted}
                className={`w-full rounded-2xl py-3 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedTopicCompleted
                    ? 'cursor-not-allowed bg-[#ECFDF5] text-[#10B981] border border-[#10B981]/30 font-black'
                    : 'btn-primary btn-shimmer'
                }`}
              >
                {selectedTopicCompleted ? '✓ Topic Completed' : 'Complete Topic'}
              </button>
            </div>
          </div>
        </article>

        {/* Feature Cards Grid */}
        <section className="grid gap-4 md:grid-cols-3">
          {[
            { title: 'Examples', icon: Code, desc: 'Short, practical learning blocks designed for repeat practice and measurable progress.' },
            { title: 'Exercises', icon: BookOpen, desc: 'Interactive coding exercises designed to reinforce core programming concepts.' },
            { title: 'Certificates', icon: Award, desc: 'Verified course completion credentials ready for download in PDF format.' }
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="brand-card p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#4F39F6]" />
                  <h3 className="text-xs font-black text-[#0F172B] uppercase tracking-wider">{item.title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-[#334155] font-semibold">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </section>
      </div>
    </section>
  )
}
