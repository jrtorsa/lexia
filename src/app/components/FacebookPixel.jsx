'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function FacebookPixel() {
  const pathname = usePathname()

  useEffect(() => {
    import('react-facebook-pixel')
      .then((module) => module.default)
      .then((ReactPixel) => {
        ReactPixel.init('1656447345617200')
        ReactPixel.pageView()
      })
  }, [pathname])

  return null
}
