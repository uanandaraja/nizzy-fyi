import { createFileRoute } from '@tanstack/react-router'
import Lander from '../components/Lander'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <Lander />
}
