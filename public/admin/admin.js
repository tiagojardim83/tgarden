const GITHUB_OWNER = 'tiagojardim83'
const GITHUB_REPO = 'tgarden'
const GITHUB_BRANCH = 'main'

// Same computation as the <base> tag in index.html: this admin page can be
// served at the domain root (Vercel/production) or under /tgarden/ (GitHub
// Pages, local dev) — the site itself lives one level above wherever /admin
// is mounted.
const SITE_ROOT = location.pathname.slice(0, location.pathname.indexOf('/admin')) + '/'

// Clients accessing this panel are Brazilian and American, so the panel
// itself (not just the site content) needs both languages. Defaults to
// English, same convention as the main site's own lang toggle
// (src/lib/lang.tsx), with no persistence — just an in-memory toggle.
let lang = 'en'

const STRINGS = {
  pt: {
    topbarLabel: '©TGarden — Painel de mídia',
    loginHeading: 'Entrar',
    loginHint: 'Digite a senha que o TGarden te passou.',
    passwordLabel: 'Senha',
    loginButton: 'Entrar →',
    loginErrorFallback: 'Não foi possível entrar',
    panelKicker: 'Conteúdo do site',
    panelHeading: 'Trocar fotos, vídeos e textos',
    panelHint: 'Navegue pelo site abaixo e clique no ✏️ que aparece em cima de cada foto, vídeo ou texto que dá pra trocar.',
    tabPreview: 'Pré-visualização',
    tabList: 'Ver como lista',
    expectedFile: (ext) => `Arquivo esperado: .${ext}`,
    replaceFile: 'Trocar arquivo',
    wrongExt: (expected, got) => `O arquivo precisa ser .${expected} (você enviou .${got})`,
    tooLarge: (mb) => `Arquivo muito grande (${mb}MB). Máximo: 70MB.`,
    uploading: 'Enviando...',
    uploaded: 'Enviado! O site atualiza sozinho em alguns minutos.',
    failed: (msg) => `Não deu certo: ${msg}`,
    save: 'Salvar',
    fillBoth: 'Preencha os dois campos (PT e EN).',
    saving: 'Salvando...',
    saved: 'Salvo! O site atualiza sozinho em alguns minutos.',
    closing: 'Você não precisa de ninguém pra trocar uma foto. Aqui, você faz sozinho.',
    genericUploadImageFail: 'Falha ao enviar a foto',
    genericAuthFail: 'Falha ao autenticar com o GitHub',
    genericVideoNotFound: 'Não achei o vídeo atual no GitHub',
    genericUploadVideoFail: 'Falha ao enviar o vídeo',
    genericTextSaveFail: 'Falha ao salvar o texto',
    refreshPreview: '🔄 Atualizar pré-visualização',
    closePanel: 'Fechar',
    editingLabel: (label) => `Editando: ${label}`,
  },
  en: {
    topbarLabel: '©TGarden — Media Panel',
    loginHeading: 'Log in',
    loginHint: 'Enter the password TGarden gave you.',
    passwordLabel: 'Password',
    loginButton: 'Log in →',
    loginErrorFallback: 'Could not log in',
    panelKicker: 'Site content',
    panelHeading: 'Swap photos, videos and text',
    panelHint: 'Browse the site below and click the ✏️ that appears over any photo, video or text you can swap.',
    tabPreview: 'Preview',
    tabList: 'View as list',
    expectedFile: (ext) => `Expected file: .${ext}`,
    replaceFile: 'Replace file',
    wrongExt: (expected, got) => `The file needs to be .${expected} (you uploaded .${got})`,
    tooLarge: (mb) => `File too large (${mb}MB). Maximum: 70MB.`,
    uploading: 'Uploading...',
    uploaded: 'Uploaded! The site updates itself within a few minutes.',
    failed: (msg) => `Something went wrong: ${msg}`,
    save: 'Save',
    fillBoth: 'Fill in both fields (PT and EN).',
    saving: 'Saving...',
    saved: 'Saved! The site updates itself within a few minutes.',
    closing: "You don't need anyone to swap a photo. Here, you do it yourself.",
    genericUploadImageFail: 'Failed to upload the photo',
    genericAuthFail: 'Failed to authenticate with GitHub',
    genericVideoNotFound: 'Could not find the current video on GitHub',
    genericUploadVideoFail: 'Failed to upload the video',
    genericTextSaveFail: 'Failed to save the text',
    refreshPreview: '🔄 Refresh preview',
    closePanel: 'Close',
    editingLabel: (label) => `Editing: ${label}`,
  },
}

// Only server error strings actually need translating (client-side fallback
// strings above already have their own pt/en pair) — the API responds in
// Portuguese by default, so this maps the exact known strings to English.
const SERVER_ERROR_EN = {
  'Não autenticado': 'Not authenticated',
  'Requisição inválida': 'Invalid request',
  'Senha incorreta': 'Incorrect password',
  'Esse arquivo não está na lista de itens editáveis': 'This file is not in the list of editable items',
  'Não achei o arquivo atual no GitHub': "Couldn't find the current file on GitHub",
  'Falha ao salvar no GitHub': 'Failed to save on GitHub',
  'Falha inesperada': 'Unexpected failure',
  'Os dois campos (PT e EN) precisam de texto': 'Both fields (PT and EN) need text',
  'Texto muito longo (máximo 1000 caracteres)': 'Text too long (maximum 1000 characters)',
  'Esse texto não está na lista de itens editáveis': 'This text is not in the list of editable items',
  'Não achei o arquivo de textos no GitHub': "Couldn't find the text file on GitHub",
  'Falha ao gerar token do GitHub': 'Failed to generate GitHub token',
}

function t() {
  return STRINGS[lang]
}

function serverMessage(msg) {
  if (lang === 'en' && SERVER_ERROR_EN[msg]) return SERVER_ERROR_EN[msg]
  return msg
}

const loginScreen = document.getElementById('login-screen')
const panelScreen = document.getElementById('panel-screen')
const loginForm = document.getElementById('login-form')
const loginError = document.getElementById('login-error')
const groupsEl = document.getElementById('groups')
const langToggle = document.getElementById('lang-toggle')
const previewFrame = document.getElementById('site-preview')
const previewView = document.getElementById('preview-view')
const tabPreviewBtn = document.getElementById('tab-preview')
const tabListBtn = document.getElementById('tab-list')
const editOverlay = document.getElementById('edit-overlay')
const editPanel = document.getElementById('edit-panel')

let cachedAssets = null
let cachedEditableCopy = null
const decorated = new WeakSet()

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

function applyStaticText() {
  const s = t()
  document.getElementById('topbar-label').textContent = s.topbarLabel
  document.getElementById('login-heading').textContent = s.loginHeading
  document.getElementById('login-hint').textContent = s.loginHint
  document.getElementById('password-label').textContent = s.passwordLabel
  loginForm.querySelector('button').textContent = s.loginButton
  document.getElementById('panel-kicker').textContent = s.panelKicker
  document.getElementById('panel-heading').textContent = s.panelHeading
  document.getElementById('panel-hint').textContent = s.panelHint
  document.getElementById('closing-text').textContent = s.closing
  tabPreviewBtn.textContent = s.tabPreview
  tabListBtn.textContent = s.tabList
  langToggle.textContent = lang === 'pt' ? 'EN' : 'PT'
}

langToggle.addEventListener('click', () => {
  lang = lang === 'pt' ? 'en' : 'pt'
  applyStaticText()
  if (cachedAssets) renderGroups(cachedAssets, cachedEditableCopy || {})
})

tabPreviewBtn.addEventListener('click', () => showView('preview'))
tabListBtn.addEventListener('click', () => showView('list'))

function showView(view) {
  previewView.hidden = view !== 'preview'
  groupsEl.hidden = view !== 'list'
  tabPreviewBtn.classList.toggle('active', view === 'preview')
  tabListBtn.classList.toggle('active', view === 'list')
}

async function showPanel() {
  loginScreen.hidden = true
  panelScreen.hidden = false
  document.getElementById('app').classList.add('wide')
  const [assets, editableCopy] = await Promise.all([
    fetch('assets.json').then((r) => r.json()),
    fetchEditableCopy(),
  ])
  cachedAssets = assets
  cachedEditableCopy = editableCopy
  renderGroups(assets, editableCopy)
  showView('preview')
  if (!previewFrame.src) previewFrame.src = SITE_ROOT
}

function showLogin() {
  loginScreen.hidden = false
  panelScreen.hidden = true
  document.getElementById('app').classList.remove('wide')
}

// ---------- List view (unchanged form-list, kept as a fallback tab) ----------

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
      group.appendChild(item.type === 'text' ? renderTextItem(item, editableCopy[textKey(item)]) : renderItem(item))
    }
    groupsEl.appendChild(group)
  }
}

function renderTextItem(item, current) {
  const s = t()
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
  label.textContent = item.label[lang]
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
  saveBtn.textContent = s.save
  saveBtn.className = 'save-btn'
  saveBtn.addEventListener('click', async () => {
    const pt = ptArea.value.trim()
    const en = enArea.value.trim()
    if (!pt || !en) {
      status.textContent = t().fillBoth
      status.className = 'item-status error'
      return
    }

    saveBtn.disabled = true
    status.textContent = t().saving
    status.className = 'item-status'

    try {
      const res = await fetch('/api/upload-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.adminId, pt, en }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(serverMessage(data.error) || t().genericTextSaveFail)
      }
      showSaved(status)
    } catch (err) {
      status.textContent = t().failed(err && err.message ? err.message : String(err))
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
  label.textContent = item.label[lang]
  const status = document.createElement('div')
  status.className = 'item-status'
  status.textContent = t().expectedFile(extOf(item.path))
  body.appendChild(label)
  body.appendChild(status)
  row.appendChild(body)

  const uploadBtn = document.createElement('label')
  uploadBtn.className = 'upload-btn'
  const btn = document.createElement('button')
  btn.type = 'button'
  btn.textContent = t().replaceFile
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
      status.textContent = t().wrongExt(expectedExt, gotExt)
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
      status.textContent = t().tooLarge((file.size / 1024 / 1024).toFixed(0))
      status.className = 'item-status error'
      input.value = ''
      return
    }

    btn.disabled = true
    icon.innerHTML = ''
    const preview = document.createElement(item.type === 'video' ? 'video' : 'img')
    preview.src = URL.createObjectURL(file)
    icon.appendChild(preview)
    status.textContent = t().uploading
    status.className = 'item-status'

    try {
      if (item.type === 'image') {
        await uploadImage(item.path, file)
      } else {
        await uploadVideo(item.path, file)
      }
      showSaved(status)
    } catch (err) {
      status.textContent = t().failed(err && err.message ? err.message : String(err))
      status.className = 'item-status error'
    } finally {
      btn.disabled = false
      input.value = ''
    }
  })

  return row
}

// After a successful save, show the usual confirmation plus a button to
// reload the preview iframe — the underlying site still takes its normal
// ~20-60s to rebuild/redeploy, so we don't reload automatically (that would
// just show the same pre-edit content and read as broken).
function showSaved(status) {
  status.innerHTML = ''
  status.className = 'item-status ok'
  status.appendChild(document.createTextNode(t().saved))
  const refreshBtn = document.createElement('button')
  refreshBtn.type = 'button'
  refreshBtn.className = 'refresh-btn'
  refreshBtn.textContent = t().refreshPreview
  refreshBtn.addEventListener('click', () => {
    previewFrame.contentWindow.location.reload()
  })
  status.appendChild(document.createElement('br'))
  status.appendChild(refreshBtn)
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
    throw new Error(serverMessage(data.error) || t().genericUploadImageFail)
  }
}

async function uploadVideo(path, file) {
  const tokenRes = await fetch('/api/github-token', { method: 'POST' })
  if (!tokenRes.ok) throw new Error(t().genericAuthFail)
  const { token } = await tokenRes.json()

  const contentsUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodedPath(path)}`

  const currentRes = await fetch(`${contentsUrl}?ref=${GITHUB_BRANCH}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
  })
  if (!currentRes.ok) throw new Error(t().genericVideoNotFound)
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
    throw new Error(data.message || t().genericUploadVideoFail)
  }
}

// ---------- Preview view: live site in an iframe, click-to-edit overlay ----------

function findAsset(adminId) {
  return cachedAssets && cachedAssets.find((a) => a.adminId === adminId)
}

// A text asset's editableCopy.json key is its adminId with the "text:" prefix
// stripped (e.g. "text:maoka:s0:heading" -> "maoka:s0:heading"), so many
// distinct text fields per project can share the same `project`/`slug`
// grouping metadata while still saving to their own JSON entry.
function textKey(item) {
  return item.adminId.replace(/^text:/, '')
}

previewFrame.addEventListener('load', () => {
  injectBadgeStyles()
  scanForEditables()
  observeFrame()
})

let frameObserver = null
function observeFrame() {
  const doc = previewFrame.contentDocument
  if (!doc || !doc.body) return
  if (frameObserver) frameObserver.disconnect()
  frameObserver = new MutationObserver(debounce(scanForEditables, 150))
  // childList only — NOT attributes — so we don't re-scan on every frame of
  // the site's own looping animations (PanCoverImage/GlitchImage mutate
  // inline styles ~60x/sec; only real navigation adds/removes DOM nodes).
  frameObserver.observe(doc.body, { childList: true, subtree: true })
}

function debounce(fn, ms) {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

function injectBadgeStyles() {
  const doc = previewFrame.contentDocument
  if (!doc || doc.getElementById('admin-badge-styles')) return
  const style = doc.createElement('style')
  style.id = 'admin-badge-styles'
  style.textContent = `
    .admin-edit-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 999999;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: hsl(0, 85%, 49%);
      color: #fff;
      border-radius: 999px;
      font-size: 15px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.35);
      border: 2px solid #fff;
    }
    .admin-edit-badge:hover { transform: scale(1.08); }
  `
  doc.head.appendChild(style)
}

function scanForEditables() {
  const doc = previewFrame.contentDocument
  if (!doc) return
  const nodes = doc.querySelectorAll('[data-admin-id]')
  for (const node of nodes) {
    const adminId = node.getAttribute('data-admin-id')
    if (!adminId || decorated.has(node)) continue
    const asset = findAsset(adminId)
    if (!asset) continue // not one of the curated items — ignore

    decorated.add(node)
    const computedPosition = doc.defaultView.getComputedStyle(node).position
    if (computedPosition === 'static') node.style.position = 'relative'

    const badge = doc.createElement('button')
    badge.type = 'button'
    badge.className = 'admin-edit-badge'
    badge.textContent = '✏️'
    badge.setAttribute('aria-label', asset.label[lang])
    badge.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      openEditPanel(asset)
    })
    node.appendChild(badge)
  }
}

function openEditPanel(item) {
  editPanel.innerHTML = ''

  const head = document.createElement('div')
  head.className = 'edit-panel-head'
  const title = document.createElement('span')
  title.textContent = t().editingLabel(item.label[lang])
  const closeBtn = document.createElement('button')
  closeBtn.type = 'button'
  closeBtn.className = 'edit-panel-close'
  closeBtn.textContent = '✕'
  closeBtn.setAttribute('aria-label', t().closePanel)
  closeBtn.addEventListener('click', closeEditPanel)
  head.appendChild(title)
  head.appendChild(closeBtn)
  editPanel.appendChild(head)

  const row = item.type === 'text' ? renderTextItem(item, cachedEditableCopy[textKey(item)]) : renderItem(item)
  row.classList.add('edit-panel-row')
  editPanel.appendChild(row)

  editOverlay.hidden = false
  editPanel.hidden = false
}

function closeEditPanel() {
  editOverlay.hidden = true
  editPanel.hidden = true
}

editOverlay.addEventListener('click', closeEditPanel)

// ---------- Login ----------

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
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(serverMessage(data.error) || t().loginErrorFallback)
    }
    await showPanel()
  } catch (err) {
    loginError.textContent = err.message || t().loginErrorFallback
    loginError.hidden = false
  } finally {
    submitBtn.disabled = false
  }
})
;(async function init() {
  applyStaticText()
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
