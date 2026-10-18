"use client"

import { useCallback, useEffect, useState } from "react"

export function useHashSection<T extends string>(ids: readonly T[], fallback: T) {
  const [active, setActive] = useState<T>(fallback)

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1) as T
      if (ids.includes(id)) setActive(id)
    }
    fromHash()
    window.addEventListener("hashchange", fromHash)
    return () => window.removeEventListener("hashchange", fromHash)
  }, [ids])

  const go = useCallback((id: T) => {
    setActive(id)
    history.replaceState(null, "", id === fallback ? window.location.pathname : `#${id}`)
  }, [fallback])

  return [active, go] as const
}
