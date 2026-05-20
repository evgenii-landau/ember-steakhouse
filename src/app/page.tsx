import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Story from '@/components/sections/Story'
import MenuHighlights from '@/components/sections/MenuHighlights'
import Ambiance from '@/components/sections/Ambiance'
import SpecialEvents from '@/components/sections/SpecialEvents'
import Reviews from '@/components/sections/Reviews'

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Story />
      <MenuHighlights />
      <Ambiance />
      <SpecialEvents />
      <Reviews />
    </main>
  )
}
