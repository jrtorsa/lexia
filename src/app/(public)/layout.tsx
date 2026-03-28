import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LaunchBanner from "@/components/LaunchBanner"
import Toaster from "@/components/Toaster"
import { getLugaresRestantes } from "@/app/actions/getLugares"

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const lugaresRestantes = await getLugaresRestantes()

  return (
    <>
      <LaunchBanner lugaresRestantes={lugaresRestantes} />
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </>
  )
}
