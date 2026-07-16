import type { VercelRequest } from '@vercel/node'
import jwt from 'jsonwebtoken'

const SESSION_COOKIE = 'admin_session'

function parseCookie(cookieHeader: string | undefined, name: string): string | undefined {
  if (!cookieHeader) return undefined
  const match = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`))
  return match?.slice(name.length + 1)
}

export function isAuthenticated(req: VercelRequest): boolean {
  const sessionSecret = process.env.SESSION_SECRET
  if (!sessionSecret) return false

  const token = parseCookie(req.headers.cookie, SESSION_COOKIE)
  if (!token) return false

  try {
    jwt.verify(token, sessionSecret)
    return true
  } catch {
    return false
  }
}
