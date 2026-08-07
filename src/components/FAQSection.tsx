import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { faqs } from '../data/landing'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-sm font-semibold text-slate-800 sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-5 pb-4 pt-1">
                    <p className="text-sm leading-relaxed text-slate-500">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
