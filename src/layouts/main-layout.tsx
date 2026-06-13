import { NavLink, Outlet, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/docs', label: 'Docs' },
  { to: '/branches', label: 'Branches' },
  { to: '/courts', label: 'Courts' },
]

export function MainLayout() {
  const location = useLocation()
  const isManagementPage =
    location.pathname.startsWith('/branches') || location.pathname.startsWith('/courts')

  return (
    <div className="min-h-screen text-slate-900">
      {!isManagementPage && <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-600">
              BRO73
            </p>
            <h1 className="text-lg font-semibold">Frontend Workspace</h1>
          </div>

          <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'text-slate-950' : 'hover:text-slate-950'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>}

      <main>
        <Outlet />
      </main>
    </div>
  )
}
