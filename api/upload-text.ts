import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAuthenticated } from './_lib/session.js'
import { mintInstallationToken, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH } from './_lib/githubApp.js'
import assets from '../public/admin/assets.json'

const COPY_PATH = 'src/data/editableCopy.json'
const MAX_LENGTH = 300

// Text edits (hero statement per project, pt+en). Same allowlist-then-commit
// shape as api/upload-image.ts, but the target is always the single
// src/data/editableCopy.json file — this endpoint reads it, updates one
// slug's entry, and writes the whole file back.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!isAuthenticated(req)) {
    res.status(401).json({ error: 'Não autenticado' })
    return
  }

  const { slug, pt, en } = (req.body ?? {}) as { slug?: string; pt?: string; en?: string }

  if (typeof slug !== 'string' || typeof pt !== 'string' || typeof en !== 'string') {
    res.status(400).json({ error: 'Requisição inválida' })
    return
  }

  const trimmedPt = pt.trim()
  const trimmedEn = en.trim()
  if (!trimmedPt || !trimmedEn) {
    res.status(400).json({ error: 'Os dois campos (PT e EN) precisam de texto' })
    return
  }
  if (trimmedPt.length > MAX_LENGTH || trimmedEn.length > MAX_LENGTH) {
    res.status(400).json({ error: `Texto muito longo (máximo ${MAX_LENGTH} caracteres)` })
    return
  }

  const slot = (assets as { slug?: string; type: string }[]).find(
    (a) => a.slug === slug && a.type === 'text',
  )
  if (!slot) {
    res.status(403).json({ error: 'Esse texto não está na lista de itens editáveis' })
    return
  }

  try {
    const token = await mintInstallationToken()
    const contentsUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${COPY_PATH}`

    const currentRes = await fetch(`${contentsUrl}?ref=${GITHUB_BRANCH}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
    })
    if (!currentRes.ok) {
      console.error('upload-text: GET contents failed', currentRes.status, await currentRes.text())
      res.status(502).json({ error: 'Não achei o arquivo de textos no GitHub' })
      return
    }
    const current = (await currentRes.json()) as { sha: string; content: string }
    const parsed = JSON.parse(Buffer.from(current.content, 'base64').toString('utf-8')) as Record<
      string,
      { pt: string; en: string }
    >

    parsed[slug] = { pt: trimmedPt, en: trimmedEn }
    const newContent = Buffer.from(JSON.stringify(parsed, null, 2) + '\n', 'utf-8').toString('base64')

    const putRes = await fetch(contentsUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Admin: atualizar texto de ${slug}`,
        content: newContent,
        sha: current.sha,
        branch: GITHUB_BRANCH,
      }),
    })

    if (!putRes.ok) {
      console.error('upload-text: PUT contents failed', putRes.status, await putRes.text())
      res.status(502).json({ error: 'Falha ao salvar no GitHub' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('upload-text: unexpected error', err)
    res.status(502).json({ error: 'Falha inesperada' })
  }
}
