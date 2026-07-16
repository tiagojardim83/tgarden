import type { VercelRequest, VercelResponse } from '@vercel/node'
import jwt from 'jsonwebtoken'

const SESSION_COOKIE = 'admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 48 // 2 days — short enough that a rotated
// ADMIN_PASSWORD invalidates old sessions reasonably quickly (there's no
// server-side revocation, so TTL is the only lever for that).
const FAILED_LOGIN_DELAY_MS = 800 // cheap brute-force deterrent; this is a
// single-secret login with no persistent store to do real rate-limiting in.

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { password } = (req.body ?? {}) as { password?: string }
  const adminPassword = process.env.ADMIN_PASSWORD
  const sessionSecret = process.env.SESSION_SECRET

  if (!adminPassword || !sessionSecret) {
    res.status(500).json({ error: 'Server not configured' })
    return
  }

  if (typeof password !== 'string' || password !== adminPassword) {
    await sleep(FAILED_LOGIN_DELAY_MS)
    res.status(401).json({ error: 'Senha incorreta' })
    return
  }

  const token = jwt.sign({ role: 'admin' }, sessionSecret, { expiresIn: SESSION_TTL_SECONDS })

  // `Secure` requires HTTPS — omit it for local `vercel dev` (plain HTTP),
  // otherwise the browser silently drops the cookie and login looks broken.
  const isLocalDev = process.env.VERCEL_ENV === 'development'
  const cookieFlags = isLocalDev ? 'HttpOnly; SameSite=Strict' : 'HttpOnly; Secure; SameSite=Strict'

  res.setHeader(
    'Set-Cookie',
    `${SESSION_COOKIE}=${token}; ${cookieFlags}; Path=/; Max-Age=${SESSION_TTL_SECONDS}`,
  )
  res.status(200).json({ ok: true })
}
