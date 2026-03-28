import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LaunchBanner from "@/components/LaunchBanner"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LaunchBanner />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
