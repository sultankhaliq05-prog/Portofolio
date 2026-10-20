import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import Container from './Container'
import SmoothLink from './SmoothLink'
import ThemeToggle from './ThemeToggle'

/**
 * Navbar sticky SPA.
 * brand: { name, href? }
 * links: [{ label, href }]
 */
function Navbar({ brand = { name: 'Portfolio' }, links = [] }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`navbar sticky top-0 z-50 transition-shadow ${
        scrolled
          ? 'bg-base-100/90 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] backdrop-blur-lg'
          : 'bg-base-100/70 backdrop-blur-md'
      }`}
    >
      <Container className="flex min-h-16 items-center justify-between gap-3">
        {/* Brand */}
        <SmoothLink href={brand.href ?? '#home'} className="text-lg font-bold tracking-tight">
          {brand.name}
        </SmoothLink>

        {/* Navigasi utama (horizontal di md ke atas) */}
        <nav className="hidden md:flex items-center" aria-label="Navigasi utama">
          <ul className="flex space-x-6 font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <SmoothLink
                  href={link.href}
                  className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {link.label}
                </SmoothLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bagian kanan: theme toggle + dropdown mobile */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Dropdown untuk mobile */}
          <div className="dropdown dropdown-end md:hidden">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost btn-square"
              aria-label="Buka menu"
            >
              <Menu className="size-5" />
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg"
            >
              {links.map((link) => (
                <li key={link.href}>
                  <SmoothLink
                    href={link.href}
                    onClick={() => document.activeElement?.blur()}
                  >
                    {link.label}
                  </SmoothLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Navbar
