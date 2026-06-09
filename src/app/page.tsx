import { MenuBookProvider } from '@/components/ui/MenuBookProvider'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Story from '@/components/sections/Story'
import MenuHighlights from '@/components/sections/MenuHighlights'
import Ambiance from '@/components/sections/Ambiance'
import SpecialEvents from '@/components/sections/SpecialEvents'
import Reviews from '@/components/sections/Reviews'
import ReservationForm from '@/components/sections/ReservationForm'
import Contacts from '@/components/sections/Contacts'
import Footer from '@/components/sections/Footer'

export default function Page() {
  return (
    <MenuBookProvider>
      <main>
        <Navbar />
        <Hero />
        <Story />
        <MenuHighlights />
        <Ambiance />
        <SpecialEvents />
        <Reviews />
        <ReservationForm />
        <Contacts />
        <Footer />
      </main>
    </MenuBookProvider>
  )
}
