import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAuthenticated } from './_lib/session.js'
import { mintInstallationToken } from './_lib/githubApp.js'

// Mints a short-lived (1h) GitHub App installation token, scoped only to
// this repo with contents:write. Used by the browser to commit VIDEO files
// directly to the GitHub API (bypassing Vercel's 4.5MB function body limit).
// Photos go through api/upload-image.ts instead, which enforces the
// editable-slot allowlist server-side — this endpoint cannot do that same
// path-level check, since GitHub App tokens are scoped per-repo, not per-file.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!isAuthenticated(req)) {
    res.status(401).json({ error: 'Não autenticado' })
    return
  }

  try {
    const token = await mintInstallationToken()
    res.status(200).json({ token })
  } catch (err) {
    console.error('github-token: failed to mint installation token', err)
    res.status(502).json({ error: 'Falha ao gerar token do GitHub' })
  }
}
