# 🚀 Guia de Deploy - Sabiamente Zen

Este guia mostra como fazer o deploy da aplicação Sabiamente Zen em diferentes plataformas.

## 📋 Pré-requisitos

- Projeto buildado com `npm run build`
- Conta na plataforma de deploy escolhida

## 🚀 Deploy no Vercel

### Método 1: Via GitHub (Recomendado)

1. **Conectar ao GitHub**
   - Faça push do seu código para um repositório no GitHub
   - Acesse [vercel.com](https://vercel.com) e faça login
   - Clique em "New Project"
   - Importe seu repositório do GitHub

2. **Configurar o projeto**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy automático**
   - O Vercel fará o deploy automaticamente
   - Cada push na branch main gerará um novo deploy

### Método 2: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel --prod
```

## 🌐 Deploy no Netlify

### Via Interface Web

1. Acesse [netlify.com](https://netlify.com)
2. Clique em "New site from Git"
3. Conecte seu repositório GitHub
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Clique em "Deploy site"

### Via CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

## 🔥 Deploy no Firebase Hosting

1. **Instalar Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Inicializar projeto**
```bash
firebase login
firebase init hosting
```

3. **Configurar firebase.json**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

4. **Deploy**
```bash
npm run build
firebase deploy
```

## 📱 Configurações importantes

### Variáveis de ambiente

Se você usar variáveis de ambiente, configure-as na plataforma de deploy:

- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Firebase: Use Firebase Functions para variáveis sensíveis

### Domínio customizado

Todas as plataformas permitem configurar domínios customizados:

1. **Vercel**: Project Settings → Domains
2. **Netlify**: Site Settings → Domain Management
3. **Firebase**: Hosting → Connect Custom Domain

## 🔧 Troubleshooting

### Erro de build

- Verifique se todas as dependências estão no `package.json`
- Confirme que `npm run build` funciona localmente
- Verifique os logs de build na plataforma

### Erro 404 em rotas

- Configure redirects para SPA (Single Page Application)
- Adicione arquivo `_redirects` (Netlify) ou configure no `vercel.json`

### Performance

- Use `npm run build` para otimização automática
- Configure cache headers na plataforma de deploy
- Considere usar CDN para assets estáticos