import * as React from "react"

// Enhanced breakpoints for better responsive design
const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
} as const

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.mobile - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.mobile)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < BREAKPOINTS.mobile)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS.mobile}px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`)
    const onChange = () => {
      const width = window.innerWidth
      setIsTablet(width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet)
    }
    mql.addEventListener("change", onChange)
    const width = window.innerWidth
    setIsTablet(width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isTablet
}

export function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState<{
    width: number
    height: number
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
    isLandscape: boolean
    isTouchDevice: boolean
  }>(() => {
    // Better initial values based on window if available
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      const height = window.innerHeight
      const isMobile = width < BREAKPOINTS.mobile
      const isTablet = width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet
      const isDesktop = width >= BREAKPOINTS.tablet
      const isLandscape = width > height
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      return {
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        isLandscape,
        isTouchDevice,
      }
    }
    // Fallback for SSR
    return {
      width: 1280,
      height: 720,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isLandscape: true,
      isTouchDevice: false,
    }
  })

  React.useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isMobile = width < BREAKPOINTS.mobile
      const isTablet = width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet
      const isDesktop = width >= BREAKPOINTS.tablet
      const isLandscape = width > height
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      setScreenSize({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        isLandscape,
        isTouchDevice,
      })
    }

    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)
    window.addEventListener("orientationchange", updateScreenSize)
    
    return () => {
      window.removeEventListener("resize", updateScreenSize)
      window.removeEventListener("orientationchange", updateScreenSize)
    }
  }, [])

  return screenSize
}
