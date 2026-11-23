'use client'

import { useEffect, useState } from 'react'

export interface RailItem {
  id: string
  label: string
}

/**
 * The page's navigation: one numbered stop per scene. It follows the scroll
 * on its own, so it works when the WebGL layer is off.
 */
export function SceneRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const centre = window.innerHeight / 2
      let found = 0
      for (let i = 0; i < items.length; i++) {
        const el = document.getElementById(items[i].id)
        if (el && el.getBoundingClientRect().top <= centre) found = i
      }
      setActive(found)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items])

  return (
    <nav className="rail" aria-label="Scenes">
      <ol>
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={'#' + item.id} aria-current={i === active ? 'true' : undefined}>
              <span className="rail-n">{'0' + i}</span>
              <span className="rail-t">{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
