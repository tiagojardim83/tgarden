import jwt from 'jsonwebtoken'

export const GITHUB_OWNER = 'tiagojardim83'
export const GITHUB_REPO = 'tgarden'
export const GITHUB_BRANCH = 'main'

export async function mintInstallationToken(): Promise<string> {
  const appId = process.env.GITHUB_APP_ID
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const installationId = process.env.GITHUB_APP_INSTALLATION_ID

  if (!appId || !privateKey || !installationId) {
    throw new Error('GitHub App env vars not configured')
  }

  const now = Math.floor(Date.now() / 1000)
  const appJwt = jwt.sign({ iat: now - 60, exp: now + 9 * 60, iss: appId }, privateKey, {
    algorithm: 'RS256',
  })

  const res = await fetch(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${appJwt}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  )

  if (!res.ok) {
    throw new Error(`Failed to mint installation token: ${res.status} ${await res.text()}`)
  }

  const data = (await res.json()) as { token: string }
  return data.token
}
