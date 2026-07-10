import { useEffect, useState } from 'react'

export function useCanHover() {
  const [canHover, setCanHover] = useState(true)

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  return canHover
}
