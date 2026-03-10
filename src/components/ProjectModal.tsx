import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from '@phosphor-icons/react'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    name: string
    url: string
  } | null
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
}

const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.96,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 25,
      delay: 0.05
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98,
    y: 10,
    transition: { 
      duration: 0.15,
      ease: 'easeIn'
    }
  }
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative flex h-[85vh] w-[90vw] max-w-6xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                Open in new tab
              </motion.a>
              <motion.button
                onClick={onClose}
                className="rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Iframe */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={project.url}
                title={project.name}
                className="h-full w-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
