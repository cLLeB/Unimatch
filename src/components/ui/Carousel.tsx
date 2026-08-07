import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface CarouselProps {
  children: ReactNode[]
  /** Accessible name for the scrolling region. */
  label: string
  /** Grid classes used from `sm` up, where everything is shown at once. */
  gridClassName?: string
}

/**
 * Horizontal snap carousel on phones, plain grid from `sm` up.
 *
 * Six stacked feature cards is a screen and a half of scrolling before a
 * student reaches anything actionable. Swiping through them keeps the section
 * one screen tall, and the dots make it obvious there is more than one.
 *
 * Scroll-snap does the paging natively, so there is no animation loop to run
 * and it stays smooth on a low-end phone.
 */
export default function Carousel({
  children,
  label,
  gridClassName = 'sm:grid-cols-2 lg:grid-cols-3',
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const handleScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const slideWidth = track.scrollWidth / children.length
    setActive(Math.round(track.scrollLeft / slideWidth))
  }, [children.length])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => track.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const goTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: (track.scrollWidth / children.length) * index, behavior: 'smooth' })
  }

  return (
    <div>
      <div
        ref={trackRef}
        role="group"
        aria-label={label}
        className={cn(
          // Phone: one card at a time, snapping.
          'flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2',
          '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          // From sm up it is an ordinary grid with no scrolling.
          'sm:grid sm:gap-6 sm:overflow-visible sm:pb-0',
          gridClassName,
        )}
      >
        {children.map((child, index) => (
          <div key={index} className="w-[85%] shrink-0 snap-center sm:w-auto sm:shrink">
            {child}
          </div>
        ))}
      </div>

      {/* Dots are a phone affordance only; the grid needs no pagination. */}
      <div className="mt-3 flex justify-center gap-1.5 sm:hidden">
        {children.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to item ${index + 1} of ${children.length}`}
            aria-current={active === index}
            onClick={() => goTo(index)}
            className={cn(
              'h-1.5 rounded-full transition-all',
              active === index ? 'w-5 bg-brand' : 'w-1.5 bg-line',
            )}
          />
        ))}
      </div>
    </div>
  )
}
