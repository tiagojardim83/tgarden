# Configurar o painel de admin (/admin)

Passo a passo único (uns 5 minutos). Depois disso o painel fica no ar em `tgarden.com.br/admin` — só funciona nesse domínio (Vercel), não no `github.io`, já que o GitHub Pages não roda backend.

## 1. Criar o GitHub App

1. Acesse **github.com/settings/apps/new** (logado como `tiagojardim83`).
2. **GitHub App name**: `tgarden-admin` (ou qualquer nome).
3. **Homepage URL**: `https://www.tgarden.com.br`.
4. **Webhook**: desmarque "Active" (não precisamos).
5. Em **Permissions → Repository permissions**, mude **Contents** para **Read and write**. Não mexa em mais nenhuma permissão.
6. Em **Where can this GitHub App be installed?**, deixe "Only on this account".
7. Clique em **Create GitHub App**.
8. Na página do App que abrir, anote o **App ID** (número no topo).

## 2. Gerar a chave privada

1. Ainda na página do App, desça até **Private keys** → **Generate a private key**.
2. Um arquivo `.pem` vai baixar. Abra ele num editor de texto — vai usar o conteúdo inteiro (incluindo as linhas `-----BEGIN...` e `-----END...`) no passo 4.

## 3. Instalar o App no repositório

1. No menu lateral do App, clique em **Install App**.
2. Escolha a conta `tiagojardim83` → **Only select repositories** → selecione **tgarden**.
3. Confirme a instalação.
4. Depois de instalado, a URL da página vai ser algo como `github.com/settings/installations/12345678` — o número no final é o **Installation ID**, anote também.

## 4. Configurar as variáveis na Vercel

No painel da Vercel → projeto **site-tgarden** → **Settings** → **Environment Variables**, adicione (Production + Preview + Development, ou só Production se preferir):

| Nome | Valor |
|---|---|
| `ADMIN_PASSWORD` | A senha que o cliente vai usar pra entrar no `/admin` (escolha algo razoavelmente forte). |
| `SESSION_SECRET` | `6f7664f6491ac7d80d18b506951f89fb5b18d639c3871f08e4d97d994e97a66d` (já gerei essa aleatória pra você — pode usar direto, ou gerar outra). |
| `GITHUB_APP_ID` | O App ID do passo 1. |
| `GITHUB_APP_PRIVATE_KEY` | O conteúdo inteiro do arquivo `.pem` do passo 2. |
| `GITHUB_APP_INSTALLATION_ID` | O Installation ID do passo 3. |

## 5. Redeploy

Depois de salvar as variáveis, force um novo deploy na Vercel (qualquer commit novo já resolve, ou use "Redeploy" no dashboard) — as variáveis de ambiente só valem a partir do próximo build.

## Pronto

Acesse `https://www.tgarden.com.br/admin`, entre com a senha, e teste trocando uma foto pequena primeiro pra confirmar que está tudo certo antes de usar de verdade.
