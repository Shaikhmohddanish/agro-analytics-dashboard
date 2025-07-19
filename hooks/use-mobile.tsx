import * as React from "react"

// Breakpoint definitions
const BREAKPOINTS = {
  xs: 475,  // Extra small devices
  sm: 640,  // Small devices
  md: 768,  // Medium devices (tablets)
  lg: 1024, // Large devices (desktops)
  xl: 1280, // Extra large devices
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.md)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < BREAKPOINTS.md)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.xs) return setBreakpoint('xxs')
      if (width < BREAKPOINTS.sm) return setBreakpoint('xs')
      if (width < BREAKPOINTS.md) return setBreakpoint('sm')
      if (width < BREAKPOINTS.lg) return setBreakpoint('md')
      if (width < BREAKPOINTS.xl) return setBreakpoint('lg')
      return setBreakpoint('xl')
    }

    // Update breakpoint on resize
    window.addEventListener('resize', updateBreakpoint)
    
    // Initial call
    updateBreakpoint()
    
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return {
    breakpoint,
    isXxs: breakpoint === 'xxs',
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    isMobile: breakpoint === 'xxs' || breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl',
    isSmallScreen: breakpoint === 'xxs' || breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md',
    isLargeScreen: breakpoint === 'lg' || breakpoint === 'xl',
  }
}

// Export breakpoints for use in components
export const SCREEN_BREAKPOINTS = BREAKPOINTS
