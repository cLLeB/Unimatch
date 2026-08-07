import { Brain, Send, ShieldCheck } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { catalogue, catalogueStats, getProgramme, universityNameOf } from '../data/catalogue'
import { ask, type Answer } from '../domain/advisor/answer'
import { useStudent } from '../state/StudentProvider'

interface Message {
  id: number
  role: 'user' | 'assistant'
  text: string
  programmeIds?: string[]
}

const OPENING: Message = {
  id: 0,
  role: 'assistant',
  text: "Hi! I'm your UniMatch advisor. Ask me anything about admissions, cut-off points or career paths — every answer is computed from the programme data, so I won't guess.",
}

const STARTERS = [
  'What can I study with aggregate 12?',
  'Which university is easiest to enter?',
  'What grades do I need for Medicine?',
  'What careers fit my grades?',
] as const

export default function AdvisorPage() {
  const { state, recordSearch } = useStudent()
  const [messages, setMessages] = useState<Message[]>([OPENING])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [followUps, setFollowUps] = useState<readonly string[]>(STARTERS)
  const bottomRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  const send = useCallback(
    (text: string) => {
      const question = text.trim()
      if (!question || thinking) return

      setMessages((current) => [
        ...current,
        { id: nextId.current++, role: 'user', text: question },
      ])
      setInput('')
      setThinking(true)
      recordSearch(question)

      // The answer is computed synchronously; the short delay is purely so the
      // typing indicator reads as a considered reply rather than a flash.
      window.setTimeout(() => {
        const answer: Answer = ask(
          { catalogue, results: state.results, now: new Date() },
          question,
        )
        setMessages((current) => [
          ...current,
          {
            id: nextId.current++,
            role: 'assistant',
            text: answer.text,
            programmeIds: answer.programmeIds,
          },
        ])
        setFollowUps(answer.followUps)
        setThinking(false)
      }, 350)
    },
    [recordSearch, state.results, thinking],
  )

  return (
    // 4rem navbar, plus the 5rem the layout reserves for the bottom bar on
    // phones. Without accounting for it the composer sits under the tab bar.
    <div className="flex h-[calc(100vh-9rem)] flex-col lg:h-[calc(100vh-4rem)]">
      <div className="border-b border-line px-4 pb-3 pt-5 sm:px-6 sm:pt-6">
        <h1 className="text-xl font-bold text-ink">Career Advisor</h1>
        <p className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <span>
            Answers computed from {catalogueStats.programmeCount} programmes ·{' '}
            {catalogueStats.latestCycleYear} cut-off data
          </span>
          <Badge variant="info" icon={<ShieldCheck size={12} aria-hidden="true" />}>
            No guessing
          </Badge>
        </p>
      </div>

      <div className="flex-1 space-y-4 overflow-auto p-6" role="log" aria-live="polite">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="mr-2 mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand">
                <Brain size={16} className="text-white" aria-hidden="true" />
              </div>
            )}

            <div className="max-w-sm lg:max-w-xl">
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'rounded-tr-sm bg-brand text-white'
                    : 'rounded-tl-sm border border-line bg-surface text-ink shadow-sm'
                }`}
              >
                {message.text}
              </div>

              {message.programmeIds && message.programmeIds.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {message.programmeIds.slice(0, 6).map((id) => {
                    const programme = getProgramme(id)
                    if (!programme) return null
                    return (
                      <Link
                        key={id}
                        to={`/programme/${id}`}
                        className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink transition-colors hover:border-brand hover:text-brand"
                      >
                        {programme.name} · {universityNameOf(programme)}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex justify-start">
            <div className="mr-2 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand">
              <Brain size={16} className="text-white" aria-hidden="true" />
            </div>
            <div className="rounded-2xl rounded-tl-sm border border-line bg-surface px-4 py-3 shadow-sm">
              <div className="flex h-4 items-center gap-1">
                {[0, 1, 2].map((index) => (
                  <span
                    key={index}
                    className="size-1.5 animate-bounce rounded-full bg-brand"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {followUps.length > 0 && (
        <div className="flex flex-wrap gap-2 px-6 pb-3">
          {followUps.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => send(suggestion)}
              className="rounded-full border border-brand/20 bg-brand-subtle px-3 py-1.5 text-xs text-brand transition-colors hover:bg-brand/10"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="border-t border-line bg-surface p-4">
        <form
          className="flex gap-2"
          onSubmit={(event) => {
            event.preventDefault()
            send(input)
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            aria-label="Ask the advisor a question"
            placeholder="Ask about programmes, cut-offs, careers…"
            className="flex-1 rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
          <Button
            type="submit"
            disabled={!input.trim() || thinking}
            icon={<Send size={16} aria-hidden="true" />}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}
