import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import ProjectModal from './ProjectModal'
import WorksGallery from './WorksGallery'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 18,
    },
  },
}

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
}

const listItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 18,
    },
  },
}

export default function Lander() {
  const [selectedProject, setSelectedProject] = useState<{ name: string; url: string } | null>(null)

  const companies = [
    { name: 'xAI', url: 'https://x.ai' },
    { name: 'meeting.ai', url: 'https://meeting.ai' },
    { name: 'transkrip.xyz', url: 'https://transkrip.xyz' },
  ]

  const projects = [
    { name: 'Ruang Ringkas', url: 'https://ruangringkas.com' },
    { name: 'Personalbranding.id', url: 'https://personalbranding.id' },
    { name: 'Presenteazy', url: 'https://presenteazy.com' },
    { name: 'Tulis', url: 'https://tulis.up.railway.app' },
    { name: 'Rotican.ai', url: 'https://rotican.ai' },
  ]

  return (
    <>
      <main className="mx-auto max-w-screen-2xl px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
        {/* Hero section */}
        <motion.section
          className="flex min-h-[70vh] flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-6">
            <motion.p className="text-base text-foreground sm:text-lg" variants={itemVariants}>
              Hi, I'm Nizzy.
            </motion.p>

            <motion.p className="text-base text-muted-foreground sm:text-lg" variants={itemVariants}>
              I build products and tinker with design.
            </motion.p>

            <motion.p className="text-base text-muted-foreground sm:text-lg" variants={itemVariants}>
              Based in Jakarta, ID.
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div className="mt-12 flex flex-wrap gap-3" variants={itemVariants}>
            <motion.a
              href="https://x.com/nizzyhussle"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Contact
            </motion.a>
            <motion.button
              onClick={() => {
                const worksSection = document.getElementById('works-section')
                if (worksSection) {
                  worksSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="inline-flex items-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              See works
            </motion.button>
          </motion.div>
        </motion.section>

        {/* Projects & Work section */}
        <motion.section
          id="works"
          className="mt-20 grid gap-12 sm:grid-cols-2 lg:gap-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Projects (personal and commissioned)
            </h3>
            <motion.div className="flex flex-wrap gap-3" variants={listContainerVariants} initial="hidden" animate="visible">
              {projects.map((project) => (
                <motion.button
                  key={project.name}
                  onClick={() => setSelectedProject(project)}
                  className="group inline-flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-sm text-foreground transition hover:bg-muted"
                  variants={listItemVariants}
                  whileTap={{ scale: 0.98 }}
                >
                  {project.name}
                  <ArrowUpRight
                    size={14}
                    className="text-muted-foreground opacity-0 transition group-hover:opacity-100"
                  />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">Where I worked before</h3>
            <motion.div className="flex flex-wrap gap-3" variants={listContainerVariants} initial="hidden" animate="visible">
              {companies.map((company) => (
                <motion.a
                  key={company.name}
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-foreground transition hover:bg-muted"
                  variants={listItemVariants}
                  whileTap={{ scale: 0.98 }}
                >
                  {company.name}
                  <ArrowUpRight
                    size={14}
                    className="text-muted-foreground opacity-0 transition group-hover:opacity-100"
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>
      </main>

      <WorksGallery />

      <ProjectModal isOpen={selectedProject !== null} onClose={() => setSelectedProject(null)} project={selectedProject} />
    </>
  )
}
