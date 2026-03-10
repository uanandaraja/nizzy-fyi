import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

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

function ImageWithSkeleton({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-pulse rounded-full bg-muted-foreground/20" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

export default function WorksGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

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
          {/* Desktop: Buttons outside image */}
          <div className="hidden sm:flex sm:items-center sm:gap-4">
            <motion.button
              onClick={prevImage}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CaretLeft size={20} />
            </motion.button>
            
            {/* Main image display */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <ImageWithSkeleton
                    src={allImages[currentIndex]}
                    alt={`Work ${currentIndex + 1}`}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            <motion.button
              onClick={nextImage}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CaretRight size={20} />
            </motion.button>
          </div>

          {/* Mobile: Buttons overlay at bottom */}
          <div className="relative sm:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <ImageWithSkeleton
                  src={allImages[currentIndex]}
                  alt={`Work ${currentIndex + 1}`}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons - bottom overlay for mobile */}
            <div className="absolute inset-x-4 bottom-4 flex justify-between">
              <motion.button
                onClick={prevImage}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm"
                whileTap={{ scale: 0.95 }}
              >
                <CaretLeft size={20} />
              </motion.button>
              <motion.button
                onClick={nextImage}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm"
                whileTap={{ scale: 0.95 }}
              >
                <CaretRight size={20} />
              </motion.button>
            </div>
          </div>

          {/* Image indicators */}
          <div className="mt-6 flex justify-center gap-2">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-foreground'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
