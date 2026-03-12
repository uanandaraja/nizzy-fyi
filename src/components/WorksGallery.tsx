import { useState, useEffect, useCallback, useRef } from 'react'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'motion/react'
import { CaretLeft, CaretRight, SpinnerGap } from '@phosphor-icons/react'

const allImages = [
  '/works/ruangringkas-1.webp',
  '/works/ruangringkas-2.webp',
  '/works/presenteazy-1.webp',
  '/works/presenteazy-2.webp',
  '/works/tulis-1.webp',
  '/works/tulis-2.webp',
  '/works/personalbrand-1.webp',
  '/works/personalbrand-2.webp',
  '/works/roticanai-1.webp',
  '/works/roticanai-2.webp',
  '/works/cpbroodstock-1.webp',
  '/works/mdec-1.webp',
  '/works/mded-2.webp',
  '/works/mdec-3.webp',
  '/works/svelting-1.webp',
]

const AUTO_SLIDE_INTERVAL = 3000 // 3 seconds

function GalleryImage({ src, alt, isLoaded }: { src: string; alt: string; isLoaded: boolean }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md">
      {/* Skeleton - shown until image is loaded */}
      <AnimatePresence>
        {!isLoaded && (
          <m.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <SpinnerGap size={32} className="animate-spin text-muted-foreground/40" />
          </m.div>
        )}
      </AnimatePresence>

      {/* Image - always rendered, opacity transitions, object-contain preserves borders */}
      <m.img
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 h-full w-full object-contain"
      />
    </div>
  )
}

export default function WorksGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Preload all images silently in the background
  useEffect(() => {
    allImages.forEach((src) => {
      const img = new Image()
      img.onload = () => {
        setLoadedImages((prev) => {
          const next = new Set(prev)
          next.add(src)
          return next
        })
      }
      img.src = src
    })
  }, [])

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % allImages.length)
    }, AUTO_SLIDE_INTERVAL)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused])

  const nextImage = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % allImages.length)
  }, [])

  const prevImage = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }, [])

  const jumpToImage = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  const handleUserInteraction = useCallback(() => {
    setIsPaused(true)
    // Resume after 6 seconds of no interaction
    const timeout = setTimeout(() => setIsPaused(false), 6000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section id="works-section" className="relative overflow-hidden py-20">
      {/* Background base image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/base.webp"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
        {/* Gallery container */}
        <div className="relative">
        <LazyMotion features={domAnimation}>
          {/* Desktop: Buttons outside image */}
          <div 
            className="hidden sm:flex sm:items-center sm:gap-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <m.button
              onClick={() => {
                handleUserInteraction()
                prevImage()
              }}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CaretLeft size={20} />
            </m.button>
            
            {/* Main image display - fixed container prevents layout shift */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <m.div
                  key={currentIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <GalleryImage
                    src={allImages[currentIndex]}
                    alt={`Work ${currentIndex + 1}`}
                    isLoaded={loadedImages.has(allImages[currentIndex])}
                  />
                </m.div>
              </AnimatePresence>
            </div>
            
            <m.button
              onClick={() => {
                handleUserInteraction()
                nextImage()
              }}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CaretRight size={20} />
            </m.button>
          </div>

          {/* Mobile: Buttons overlay at bottom */}
          <div 
            className="relative sm:hidden overflow-hidden"
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 6000)}
          >
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <m.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <GalleryImage
                  src={allImages[currentIndex]}
                  alt={`Work ${currentIndex + 1}`}
                  isLoaded={loadedImages.has(allImages[currentIndex])}
                />
              </m.div>
            </AnimatePresence>

            {/* Navigation buttons - bottom overlay for mobile */}
            <div className="absolute inset-x-4 bottom-4 flex justify-between">
              <m.button
                onClick={() => {
                  handleUserInteraction()
                  prevImage()
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm"
                whileTap={{ scale: 0.95 }}
              >
                <CaretLeft size={20} />
              </m.button>
              <m.button
                onClick={() => {
                  handleUserInteraction()
                  nextImage()
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm"
                whileTap={{ scale: 0.95 }}
              >
                <CaretRight size={20} />
              </m.button>
            </div>
          </div>

          {/* Image indicators */}
          <div 
            className="mt-6 flex justify-center gap-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {allImages.map((src, index) => (
              <button
                key={src}
                onClick={() => {
                  handleUserInteraction()
                  jumpToImage(index)
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-foreground'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </LazyMotion>
        </div>
      </div>
    </section>
  )
}
