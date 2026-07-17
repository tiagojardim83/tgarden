const GITHUB_OWNER = 'tiagojardim83'
const GITHUB_REPO = 'tgarden'
const GITHUB_BRANCH = 'main'

const loginScreen = document.getElementById('login-screen')
const panelScreen = document.getElementById('panel-screen')
const loginForm = document.getElementById('login-form')
const loginError = document.getElementById('login-error')
const groupsEl = document.getElementById('groups')

function extOf(path) {
  const dot = path.lastIndexOf('.')
  return dot === -1 ? '' : path.slice(dot + 1).toLowerCase()
}

function encodedPath(path) {
  return path.split('/').map(encodeURIComponent).join('/')
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '')
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function fetchEditableCopy() {
  // Public read, no auth needed — same trust model as the site's own
  // (publicly visible) content. Used only to pre-fill the PT/EN textareas.
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/src/data/editableCopy.json?ref=${GITHUB_BRANCH}`
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
  if (!res.ok) return {}
  const data = await res.json()
  try {
    return JSON.parse(atob(data.content.replace(/\n/g, '')))
  } catch {
    return {}
  }
}

async function showPanel() {
  loginScreen.hidden = true
  panelScreen.hidden = false
  const [assets, editableCopy] = await Promise.all([
    fetch('assets.json').then((r) => r.json()),
    fetchEditableCopy(),
  ])
  renderGroups(assets, editableCopy)
}

function showLogin() {
  loginScreen.hidden = false
  panelScreen.hidden = true
}

function renderGroups(assets, editableCopy) {
  const byProject = new Map()
  for (const item of assets) {
    if (!byProject.has(item.project)) byProject.set(item.project, [])
    byProject.get(item.project).push(item)
  }

  groupsEl.innerHTML = ''
  for (const [project, items] of byProject) {
    const group = document.createElement('div')
    group.className = 'group'

    const h2 = document.createElement('h2')
    h2.textContent = project
    group.appendChild(h2)

    for (const item of items) {
      group.appendChild(item.type === 'text' ? renderTextItem(item, editableCopy[item.slug]) : renderItem(item))
    }
    groupsEl.appendChild(group)
  }
}

function renderTextItem(item, current) {
  const row = document.createElement('div')
  row.className = 'item item-text'

  const icon = document.createElement('div')
  icon.className = 'item-icon'
  icon.textContent = '📝'
  row.appendChild(icon)

  const body = document.createElement('div')
  body.className = 'item-body'
  const label = document.createElement('div')
  label.className = 'item-label'
  label.textContent = item.label
  body.appendChild(label)

  const ptField = document.createElement('label')
  ptField.className = 'text-field'
  ptField.innerHTML = '<span class="label">PT</span>'
  const ptArea = document.createElement('textarea')
  ptArea.value = current ? current.pt : ''
  ptField.appendChild(ptArea)
  body.appendChild(ptField)

  const enField = document.createElement('label')
  enField.className = 'text-field'
  enField.innerHTML = '<span class="label">EN</span>'
  const enArea = document.createElement('textarea')
  enArea.value = current ? current.en : ''
  enField.appendChild(enArea)
  body.appendChild(enField)

  const status = document.createElement('div')
  status.className = 'item-status'
  body.appendChild(status)

  const saveBtn = document.createElement('button')
  saveBtn.type = 'button'
  saveBtn.textContent = 'Salvar'
  saveBtn.className = 'save-btn'
  saveBtn.addEventListener('click', async () => {
    const pt = ptArea.value.trim()
    const en = enArea.value.trim()
    if (!pt || !en) {
      status.textContent = 'Preencha os dois campos (PT e EN).'
      status.className = 'item-status error'
      return
    }

    saveBtn.disabled = true
    status.textContent = 'Salvando...'
    status.className = 'item-status'

    try {
      const res = await fetch('/api/upload-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: item.slug, pt, en }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Falha ao salvar o texto')
      }
      status.textContent = 'Salvo! O site atualiza sozinho em alguns minutos.'
      status.className = 'item-status ok'
    } catch (err) {
      status.textContent = 'Não deu certo: ' + (err && err.message ? err.message : String(err))
      status.className = 'item-status error'
    } finally {
      saveBtn.disabled = false
    }
  })
  body.appendChild(saveBtn)

  row.appendChild(body)
  return row
}

function renderItem(item) {
  const row = document.createElement('div')
  row.className = 'item'

  const icon = document.createElement('div')
  icon.className = 'item-icon'
  icon.textContent = item.type === 'video' ? '🎬' : '📷'
  row.appendChild(icon)

  const body = document.createElement('div')
  body.className = 'item-body'
  const label = document.createElement('div')
  label.className = 'item-label'
  label.textContent = item.label
  const status = document.createElement('div')
  status.className = 'item-status'
  status.textContent = `Arquivo esperado: .${extOf(item.path)}`
  body.appendChild(label)
  body.appendChild(status)
  row.appendChild(body)

  const uploadBtn = document.createElement('label')
  uploadBtn.className = 'upload-btn'
  const btn = document.createElement('button')
  btn.type = 'button'
  btn.textContent = 'Trocar arquivo'
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = item.type === 'video' ? 'video/*' : 'image/*'
  uploadBtn.appendChild(btn)
  uploadBtn.appendChild(input)
  row.appendChild(uploadBtn)

  input.addEventListener('change', async () => {
    const file = input.files && input.files[0]
    if (!file) return

    const expectedExt = extOf(item.path)
    const gotExt = extOf(file.name)
    if (gotExt !== expectedExt) {
      status.textContent = `O arquivo precisa ser .${expectedExt} (você enviou .${gotExt})`
      status.className = 'item-status error'
      input.value = ''
      return
    }

    // GitHub's Contents API caps the base64-encoded payload at 100MB, which
    // works out to ~70MB of raw file. Catch oversized videos up front
    // instead of letting the client sit through a long encode+upload that
    // fails right at the end.
    const MAX_FILE_BYTES = 70 * 1024 * 1024
    if (file.size > MAX_FILE_BYTES) {
      status.textContent = `Arquivo muito grande (${(file.size / 1024 / 1024).toFixed(0)}MB). Máximo: 70MB.`
      status.className = 'item-status error'
      input.value = ''
      return
    }

    btn.disabled = true
    icon.innerHTML = ''
    const preview = document.createElement(item.type === 'video' ? 'video' : 'img')
    preview.src = URL.createObjectURL(file)
    icon.appendChild(preview)
    status.textContent = 'Enviando...'
    status.className = 'item-status'

    try {
      if (item.type === 'image') {
        await uploadImage(item.path, file)
      } else {
        await uploadVideo(item.path, file)
      }
      status.textContent = 'Enviado! O site atualiza sozinho em alguns minutos.'
      status.className = 'item-status ok'
    } catch (err) {
      status.textContent = 'Não deu certo: ' + (err && err.message ? err.message : String(err))
      status.className = 'item-status error'
    } finally {
      btn.disabled = false
      input.value = ''
    }
  })

  return row
}

async function uploadImage(path, file) {
  const contentBase64 = await fileToBase64(file)
  const res = await fetch('/api/upload-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, contentBase64 }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || 'Falha ao enviar a foto')
  }
}

async function uploadVideo(path, file) {
  const tokenRes = await fetch('/api/github-token', { method: 'POST' })
  if (!tokenRes.ok) throw new Error('Falha ao autenticar com o GitHub')
  const { token } = await tokenRes.json()

  const contentsUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodedPath(path)}`

  const currentRes = await fetch(`${contentsUrl}?ref=${GITHUB_BRANCH}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
  })
  if (!currentRes.ok) throw new Error('Não achei o vídeo atual no GitHub')
  const current = await currentRes.json()

  const contentBase64 = await fileToBase64(file)
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
    const data = await putRes.json().catch(() => ({}))
    throw new Error(data.message || 'Falha ao enviar o vídeo')
  }
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  loginError.hidden = true
  const password = document.getElementById('password').value
  const submitBtn = loginForm.querySelector('button')
  submitBtn.disabled = true
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) throw new Error('Senha incorreta')
    await showPanel()
  } catch (err) {
    loginError.textContent = err.message || 'Não foi possível entrar'
    loginError.hidden = false
  } finally {
    submitBtn.disabled = false
  }
})
;(async function init() {
  try {
    const res = await fetch('/api/session')
    const data = await res.json()
    if (data.authenticated) {
      await showPanel()
      return
    }
  } catch {
    // ignore, fall through to login
  }
  showLogin()
})()
