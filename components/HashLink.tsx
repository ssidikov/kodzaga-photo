'use client'

import Link from 'next/link'
import type { ComponentProps, MouseEvent } from 'react'
import { usePathname } from 'next/navigation'
import { isSamePageHashLink, scrollToHash } from '@/lib/scroll-to-hash'

type HashLinkProps = ComponentProps<typeof Link>

export default function HashLink({ href, onClick, ...props }: HashLinkProps) {
  const pathname = usePathname()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return

    const hash = isSamePageHashLink(pathname, href.toString())
    if (!hash) return

    event.preventDefault()
    scrollToHash(hash)
  }

  return <Link href={href} onClick={handleClick} {...props} />
}
