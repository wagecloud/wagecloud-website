import { clsx, type ClassValue } from 'clsx'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const genericMemo: <T>(component: T) => T = memo
