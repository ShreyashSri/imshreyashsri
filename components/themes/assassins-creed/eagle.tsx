"use client"

import { createContext, useContext } from "react"

type EagleApi = { eagle: boolean; toggle: (x: number, y: number) => void }

export const EagleContext = createContext<EagleApi>({ eagle: false, toggle: () => {} })

export const useEagle = () => useContext(EagleContext)
