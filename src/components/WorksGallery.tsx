import { useState, useEffect } from 'react'
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

function ImageWithSkeleton({ src, alt, isPreloaded }: { src: string; alt: string; isPreloaded: boolean }) {
  const [loaded, setLoaded] = useState(false)
  const showImage = isPreloaded || loaded

  if (!showImage) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <SpinnerGap size={32} className="animate-spin text-muted-foreground/40" />
        </div>
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover opacity-0"
          onLoad={() => setLoaded(true)}
        />
      </div>
    )
  }

  return (
    <m.img
      src={src}
      alt={alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-auto w-full object-cover"
    />
  )
}

export default function WorksGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  // Preload all images silently in the background
  useEffect(() => {
    allImages.forEach((src) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(src))
      }
    })
  }, [])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

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
          <div className="hidden sm:flex sm:items-center sm:gap-4">
            <m.button
              onClick={prevImage}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CaretLeft size={20} />
            </m.button>
            
            {/* Main image display */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <m.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <ImageWithSkeleton
                    src={allImages[currentIndex]}
                    alt={`Work ${currentIndex + 1}`}
                    isPreloaded={loadedImages.has(allImages[currentIndex])}
                  />
                </m.div>
              </AnimatePresence>
            </div>
            
            <m.button
              onClick={nextImage}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CaretRight size={20} />
            </m.button>
          </div>

          {/* Mobile: Buttons overlay at bottom */}
          <div className="relative sm:hidden">
            <AnimatePresence mode="wait">
              <m.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <ImageWithSkeleton
                  src={allImages[currentIndex]}
                  alt={`Work ${currentIndex + 1}`}
                  isPreloaded={loadedImages.has(allImages[currentIndex])}
                />
              </m.div>
            </AnimatePresence>

            {/* Navigation buttons - bottom overlay for mobile */}
            <div className="absolute inset-x-4 bottom-4 flex justify-between">
              <m.button
                onClick={prevImage}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm"
                whileTap={{ scale: 0.95 }}
              >
                <CaretLeft size={20} />
              </m.button>
              <m.button
                onClick={nextImage}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm"
                whileTap={{ scale: 0.95 }}
              >
                <CaretRight size={20} />
              </m.button>
            </div>
          </div>

          {/* Image indicators */}
          <div className="mt-6 flex justify-center gap-2">
            {allImages.map((src, index) => (
              <button
                key={src}
                onClick={() => setCurrentIndex(index)}
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
