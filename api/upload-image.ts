import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAuthenticated } from './_lib/session.js'
import { mintInstallationToken, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH } from './_lib/githubApp.js'
import assets from '../public/admin/assets.json'

// Photos only (always well under Vercel's 4.5MB function body limit). Unlike
// api/github-token.ts (used for videos), this endpoint keeps the GitHub
// token server-side and validates the target path against the same curated
// allowlist the admin UI renders — the client can only overwrite one of
// these known image slots, nothing else in the repo.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!isAuthenticated(req)) {
    res.status(401).json({ error: 'Não autenticado' })
    return
  }

  const { path, contentBase64 } = (req.body ?? {}) as { path?: string; contentBase64?: string }

  if (typeof path !== 'string' || typeof contentBase64 !== 'string') {
    res.status(400).json({ error: 'Requisição inválida' })
    return
  }

  const slot = (assets as { path: string; type: string }[]).find(
    (a) => a.path === path && a.type === 'image',
  )
  if (!slot) {
    res.status(403).json({ error: 'Esse arquivo não está na lista de itens editáveis' })
    return
  }

  try {
    const token = await mintInstallationToken()
    const encodedPath = path.split('/').map(encodeURIComponent).join('/')
    const contentsUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodedPath}`

    const currentRes = await fetch(`${contentsUrl}?ref=${GITHUB_BRANCH}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
    })
    if (!currentRes.ok) {
      console.error('upload-image: GET contents failed', currentRes.status, await currentRes.text())
      res.status(502).json({ error: 'Não achei o arquivo atual no GitHub' })
      return
    }
    const current = (await currentRes.json()) as { sha: string }

    const putRes = await fetch(contentsUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Admin: atualizar ${path}`,
        content: contentBase64,
        sha: current.sha,
        branch: GITHUB_BRANCH,
      }),
    })

    if (!putRes.ok) {
      console.error('upload-image: PUT contents failed', putRes.status, await putRes.text())
      res.status(502).json({ error: 'Falha ao salvar no GitHub' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('upload-image: unexpected error', err)
    res.status(502).json({ error: 'Falha inesperada' })
  }
}
