import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAuthenticated } from './_lib/session.js'

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ authenticated: isAuthenticated(req) })
}
