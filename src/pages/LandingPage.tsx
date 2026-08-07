import {
  Brain,
  Building2,
  Check,
  ChevronDown,
  Clock,
  FileSearch,
  GitCompare,
  ListChecks,
  RefreshCw,
  Search,
  Share2,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import {
  authoritativeSharePct,
  catalogueStats,
  programmes,
  universities,
} from '../data/catalogue'
import { LinkButton } from '../components/ui/Button'
import Card from '../components/ui/Card'

const FEATURES = [
  {
    icon: Search,
    title: 'Grade Matcher',
    desc: 'Enter your WASSCE grades and instantly see every programme you qualify for.',
  },
  {
    icon: Zap,
    title: 'What-if Simulator',
    desc: 'Adjust your grades and see how eligibility changes in real time.',
  },
  {
    icon: GitCompare,
    title: 'Programme Comparison',
    desc: 'Compare up to 3 programmes side-by-side across key metrics.',
  },
  {
    icon: Clock,
    title: 'Deadline Tracker',
    desc: 'Never miss an application deadline, with email reminders.',
  },
  {
    icon: Brain,
    title: 'Career Advisor',
    desc: 'Ask questions about admissions, cut-offs and careers — answered from the data.',
  },
  {
    icon: Share2,
    title: 'WhatsApp Sharing',
    desc: 'Share your results and eligible programmes directly via WhatsApp.',
  },
] as const

/**
 * Replaces the prototype's three fabricated student testimonials.
 *
 * Inventing named students at named schools and presenting them as real
 * endorsements is deceptive once the product is in front of actual applicants,
 * so the slot now explains how the product works instead. See spec §8.
 */
const HOW_IT_WORKS = [
  {
    icon: ListChecks,
    step: '1',
    title: 'Enter your grades',
    desc: 'Eight WASSCE subjects, or as many as you have. We compute your aggregate from the best six, the way universities do.',
  },
  {
    icon: FileSearch,
    step: '2',
    title: 'See every match, with reasons',
    desc: 'Not just a yes or no. Where you fall short, we show by how much and exactly which grade would change it.',
  },
  {
    icon: GitCompare,
    step: '3',
    title: 'Compare and track',
    desc: 'Shortlist programmes, compare them side by side, and keep every application deadline in view.',
  },
] as const

const FAQS = [
  {
    q: 'How accurate is the cut-off point data?',
    a: `Every programme shows where its cut-off came from and when it was last checked. ${catalogueStats.authoritativeCount} of ${catalogueStats.programmeCount} come directly from a university's own published admissions list; the rest are labelled "Unconfirmed" or "Estimate" so you know not to rely on them alone. Always confirm on the university's portal before you apply.`,
  },
  {
    q: 'Can I check eligibility before my results are out?',
    a: 'Yes. Use the What-if Simulator to enter projected grades and see which programmes they would reach, and what you would need to change to reach further.',
  },
  {
    q: 'Which universities does UniMatch cover?',
    a: `Right now ${catalogueStats.universityCount} institutions and ${catalogueStats.programmeCount} programmes, including KNUST, the University of Ghana, UCC, UDS, UEW, UHAS, UPSA and Accra Technical University. Coverage is being expanded — it is not yet every programme at every university.`,
  },
  {
    q: 'Is the platform free to use?',
    a: 'Completely free, and you do not need an account. Your grades stay on your own device unless you choose to create one.',
  },
  {
    q: 'How is my aggregate calculated?',
    a: 'The sum of your best six: English Language, Core Mathematics, the better of Integrated Science or Social Studies, plus your three strongest electives. A lower aggregate is stronger, and 6 is the best possible.',
  },
] as const

function TrustIndicators() {
  const items = [
    { icon: ShieldCheck, text: `${catalogueStats.authoritativeCount} cut-offs from official sources` },
    { icon: RefreshCw, text: `${catalogueStats.latestCycleYear} admissions cycle` },
    { icon: FileSearch, text: 'Every figure shows its source' },
  ]

  return (
    <div className="flex flex-wrap gap-6 text-sm">
      {items.map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-1.5 text-brand">
          <Icon size={16} aria-hidden="true" />
          <span className="text-ink-muted">{text}</span>
        </div>
      ))}
    </div>
  )
}

function Hero() {
  const topMatch = [...programmes].sort(
    (a, b) => a.requirements.minimumAggregate - b.requirements.minimumAggregate,
  )[0]

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 lg:px-6 lg:pb-28 lg:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-subtle px-4 py-1.5 text-sm font-medium text-brand">
            <Check size={14} aria-hidden="true" />
            {catalogueStats.latestCycleYear} cut-off data available
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-ink lg:text-6xl">
            Find Every University Programme <span className="text-brand">You Qualify For.</span>
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-ink-muted">
            Enter your WASSCE grades and instantly discover programmes across Ghana&apos;s public
            universities — no guessing, no stress.
          </p>

          <div className="mb-10 flex flex-wrap gap-3">
            <LinkButton
              to="/eligibility"
              size="lg"
              icon={<Search size={18} aria-hidden="true" />}
            >
              Check My Eligibility
            </LinkButton>
            <LinkButton
              to="/dashboard"
              variant="outline"
              size="lg"
              icon={<Building2 size={18} aria-hidden="true" />}
            >
              Explore Universities
            </LinkButton>
          </div>

          <TrustIndicators />
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/10 to-secondary/10" />
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=600&fit=crop&auto=format"
              alt="Students working together on a laptop"
              width={600}
              height={600}
              className="size-full rounded-3xl object-cover"
            />

            {topMatch && (
              <div className="absolute -right-4 -top-4 rounded-2xl border border-line bg-surface p-3 shadow-lg">
                <div className="text-xs text-ink-muted">Most competitive</div>
                <div className="text-sm font-semibold text-ink">{topMatch.name}</div>
                <div className="text-xs text-brand">
                  Cut-off: {topMatch.requirements.minimumAggregate}
                </div>
              </div>
            )}

            <div className="absolute -bottom-4 -left-4 max-w-[210px] rounded-2xl border border-line bg-surface p-4 shadow-lg">
              <div className="mb-1 text-xs text-ink-muted">Programmes tracked</div>
              <div className="text-2xl font-bold text-brand">{catalogueStats.programmeCount}</div>
              <div className="mt-1 text-xs font-medium text-success">
                across {catalogueStats.universityCount} universities
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="border-y border-line bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-ink">
            Everything you need to decide your future
          </h2>
          <p className="mx-auto max-w-xl text-ink-muted">
            Tools designed specifically for Ghanaian SHS graduates navigating university admissions.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="p-6" hover>
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-brand-subtle text-brand">
                <Icon size={20} aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-semibold text-ink">{title}</h3>
              <p className="text-sm leading-relaxed text-ink-muted">{desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function Universities() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-6">
      <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-ink-muted">
        Cut-off data from Ghana&apos;s leading universities
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {universities.map((university) => (
          <div
            key={university.id}
            className="flex items-center gap-2.5 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-ink shadow-sm"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
              {university.shortName.charAt(0)}
            </span>
            {university.shortName}
          </div>
        ))}
      </div>
    </section>
  )
}

function Stats() {
  /**
   * Counts are computed from the catalogue, not typed in. The prototype's
   * "78+ Programmes", "10 Universities", "50,000+ Students Helped" and
   * "99% Data Accuracy" were all untrue; the two unverifiable claims are gone
   * and the two countable ones can no longer drift. See spec §8.
   */
  const stats = [
    { value: String(catalogueStats.programmeCount), label: 'Programmes listed' },
    { value: String(catalogueStats.universityCount), label: 'Universities covered' },
    { value: `${authoritativeSharePct}%`, label: 'From official sources' },
    { value: String(catalogueStats.latestCycleYear), label: 'Latest cut-off cycle' },
  ]

  return (
    <section className="bg-brand py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="mb-1 text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-on-brand">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="border-y border-line bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-ink">How UniMatch works</h2>
          <p className="mx-auto max-w-xl text-ink-muted">
            Three steps, about two minutes, and no account required.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {HOW_IT_WORKS.map(({ icon: Icon, step, title, desc }) => (
            <Card key={step} className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {step}
                </span>
                <Icon size={20} className="text-brand" aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-semibold text-ink">{title}</h3>
              <p className="text-sm leading-relaxed text-ink-muted">{desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-20 lg:px-6">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold text-ink">Frequently asked questions</h2>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, index) => (
          <Card key={faq.q} className="overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(open === index ? null : index)}
              aria-expanded={open === index}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-sm font-medium text-ink">{faq.q}</span>
              <ChevronDown
                aria-hidden="true"
                className={`size-4 shrink-0 text-ink-muted transition-transform ${
                  open === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {open === index && (
              <div className="border-t border-line px-5 pb-4 pt-4 text-sm leading-relaxed text-ink-muted">
                {faq.a}
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}

function CallToAction() {
  return (
    <section className="mx-auto mb-16 max-w-7xl rounded-3xl bg-gradient-to-r from-brand to-secondary px-6 py-16 text-center lg:mx-6">
      <h2 className="mb-3 text-3xl font-bold text-white">Ready to find your programme?</h2>
      <p className="mx-auto mb-8 max-w-lg text-on-brand-bright">
        It takes less than 2 minutes. Enter your grades and see every programme you qualify for
        across Ghana.
      </p>
      <LinkButton to="/eligibility" variant="outline" size="lg">
        Check My Eligibility — It&apos;s Free
      </LinkButton>
    </section>
  )
}

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Universities />
      <Stats />
      <HowItWorks />
      <Faq />
      <CallToAction />
    </>
  )
}
