'use client'

import { useEffect } from 'react'
import { scrollToHash } from '@/lib/scroll-to-hash'

export default function HashScrollOnLoad() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const id = hash.slice(1).split('?')[0]
    if (!id) return

    requestAnimationFrame(() => {
      scrollToHash(id)
    })
  }, [])

  return null
}
