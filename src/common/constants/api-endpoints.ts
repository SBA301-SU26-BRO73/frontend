export const API_PREFIXES = {
  auth: '/auth',
  users: '/users',
  products: '/products',
  orders: '/orders',
  categories: '/categories',
} as const

function joinEndpoint(...segments: Array<string | number>) {
  return segments
    .map((segment) => String(segment).replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/')
    .replace(/^/, '/')
}

export const API_ENDPOINTS = {
  auth: {
    login: joinEndpoint(API_PREFIXES.auth, 'login'),
    register: joinEndpoint(API_PREFIXES.auth, 'register'),
    profile: joinEndpoint(API_PREFIXES.auth, 'profile'),
  },
  users: {
    list: joinEndpoint(API_PREFIXES.users),
    detail: (id: string | number) => joinEndpoint(API_PREFIXES.users, id),
  },
  products: {
    list: joinEndpoint(API_PREFIXES.products),
    detail: (id: string | number) => joinEndpoint(API_PREFIXES.products, id),
  },
  orders: {
    list: joinEndpoint(API_PREFIXES.orders),
    detail: (id: string | number) => joinEndpoint(API_PREFIXES.orders, id),
  },
  categories: {
    list: joinEndpoint(API_PREFIXES.categories),
  },
} as const
