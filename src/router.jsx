import { match } from 'path-to-regexp'
import React from 'react'

const RouteContext = React.createContext({ data: [], curPath: [] })

function parseRoutes (routes) {
  if (!routes) return null
  return React.Children.map(routes, child => {
    const { path, exact, element, to, children } = child.props
    return { path, exact, element, to, children: parseRoutes(children) }
  })
}

function RouteProvider ({ routes, children }) {
  React.Children.forEach(routes, child => {
    if (child.type !== Route) {
      throw new Error('<Routes> must only contain <Route> children')
    }
  })

  const data = parseRoutes(routes)

  return (
    <RouteContext.Provider value={{ data, curPath: [] }} children={children} />
  )
}

export const useRouter = () => {
  return {
    path: window.location.pathname,
    redirect: to => (window.location = to)
  }
}

export function Redirect ({ to }) {
  const { path, redirect } = useRouter()
  React.useEffect(() => {
    if (path !== to) redirect(to)
  }, [path, to, redirect])
  return null
}

export function Route ({ path, element }) {
  return null
}

function useRouteChanged () {
  const [, setState] = React.useState(null)
  React.useEffect(() => {
    document.addEventListener('hunter:router', () => {
      setState(Math.random())
    })
    window.addEventListener('popstate', () => {
      setState(Math.random())
    })
  }, [])
}

export function Routes ({ children }) {
  useRouteChanged()
  return (
    <RouteProvider routes={children}>
      <Outlet />
    </RouteProvider>
  )
}

export function NavLink ({ children, className, to, ...props }) {
  useRouteChanged()
  const { path } = useRouter()
  const { curPath } = React.useContext(RouteContext)

  let href = to
  if (!href.startsWith('/')) {
    href = `/${[...curPath.map(r => r.path), to].join('/')}`
  }

  const isActive = path.startsWith(href)
  const cn =
    typeof className === 'function' ? className({ isActive }) : className
  return (
    <a
      {...props}
      children={children}
      href={href}
      onClick={e => {
        e.preventDefault()
        window.history.pushState({}, '', href)
        const event = new CustomEvent('hunter:router')
        document.dispatchEvent(event)
      }}
      className={`${cn} ${isActive ? 'active' : ''}`}
    />
  )
}

export function Outlet ({ children }) {
  const { path } = useRouter()
  const { data, curPath } = React.useContext(RouteContext)

  const paths = curPath.map(r => r.path)

  const route = data.find(datum => {
    if (datum.path == null) return true
    const pathToCheck = `/${[...paths, datum.path].filter(Boolean).join('/')}`
    const matcher = match(pathToCheck, { end: !!datum.exact })
    return matcher(path)
  })

  if (route?.to) return <Redirect to={route.to} />
  if (!route?.element) return children ?? null
  return (
    <RouteContext.Provider
      value={{ data: route?.children, curPath: [...curPath, route] }}
      children={route.element}
    />
  )
}

export function useParams () {
  const { curPath } = React.useContext(RouteContext)
  const { path } = useRouter()
  const paths = curPath.map(r => r.path)

  const pathToCheck = `/${paths.join('/')}`
  const { params } = match(pathToCheck, { end: false })(path)
  return params
}
