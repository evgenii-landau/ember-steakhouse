import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Story from '@/components/sections/Story'
import MenuHighlights from '@/components/sections/MenuHighlights'

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Story />
      <MenuHighlights />
    </main>
  )
}
