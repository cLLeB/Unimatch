import Button from './Button'

export default function CTASection() {
  return (
    <section className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#0d7a77] to-[#2563eb] px-6 py-14 text-center sm:px-12 sm:py-16 lg:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready to find your programme?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
          It takes less than 2 minutes. Enter your grades and see every
          programme you qualify for across Ghana.
        </p>
        <Button variant="white" className="mt-8 px-8 py-3.5 text-base">
          Check My Eligibility — It&apos;s Free
        </Button>
      </div>
    </section>
  )
}
