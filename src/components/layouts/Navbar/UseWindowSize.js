import { useState, useEffect } from 'react'

export default function useWindowSize() {
  const isClient = typeof window === 'object'

  function getSize() {
    const width = isClient ? window.innerWidth : undefined
    if (width >= 768) {
      return 'horizontal'
    }
    if (width < 767) {
      return 'vertical'
    }
    return undefined
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}
