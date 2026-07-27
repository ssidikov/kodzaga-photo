export function scrollToHash(hash: string): boolean {
  const id = hash.replace(/^#/, '').split('?')[0]
  if (!id) return false

  const el = document.getElementById(id)
  if (!el) return false

  el.scrollIntoView({ behavior: 'smooth' })
  window.history.pushState(null, '', `#${id}`)
  return true
}

export function isSamePageHashLink(pathname: string, href: string): string | null {
  const [pathPart, hash] = href.split('#')
  if (!hash) return null

  const targetPath = pathPart || '/'
  const onTargetPage =
    pathname === targetPath || (pathname === '/' && (targetPath === '/' || targetPath === ''))

  return onTargetPage ? hash : null
}
