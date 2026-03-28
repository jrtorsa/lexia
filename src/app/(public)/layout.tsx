import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LaunchBanner from "@/components/LaunchBanner"
import Toaster from "@/components/Toaster"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LaunchBanner />
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </>
  )
}
