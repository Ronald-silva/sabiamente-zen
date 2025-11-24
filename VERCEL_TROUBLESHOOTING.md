# 🔧 Troubleshooting - Vercel Deploy

## Problema: Tela Branca / CSS não carrega (404)

### Soluções:

#### 1. Verificar Configuração do Projeto no Vercel

No painel do Vercel, vá em **Project Settings** → **General** e verifique:

- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm ci` ou `npm install`

#### 2. Limpar Cache e Fazer Novo Deploy

1. No painel do Vercel, vá em **Deployments**
2. Clique nos três pontos do último deploy
3. Selecione **Redeploy** → **Use existing Build Cache** (desmarque)
4. Ou delete o projeto e recrie

#### 3. Verificar se os arquivos estão sendo gerados

Execute localmente:
```bash
npm run build
ls -la dist/assets/
```

Você deve ver:
- `index-*.css`
- `index-*.js`

#### 4. Verificar Build Logs no Vercel

1. Vá em **Deployments**
2. Clique no último deploy
3. Verifique se há erros no build
4. Verifique se os arquivos foram gerados corretamente

#### 5. Forçar Novo Build

No terminal do projeto:
```bash
# Limpar cache local
rm -rf node_modules package-lock.json
npm install

# Fazer build local para testar
npm run build

# Verificar se dist/assets/ tem os arquivos
ls dist/assets/
```

#### 6. Verificar vercel.json

O arquivo `vercel.json` deve estar na raiz do projeto com:
```json
{
  "buildCommand": "npm ci && npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm ci",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### 7. Problema com Service Worker

Se o service worker estiver causando problemas, você pode desabilitá-lo temporariamente comentando o código em `src/main.tsx`:

```typescript
// Comentar temporariamente para testar
// if ('serviceWorker' in navigator) {
//   ...
// }
```

#### 8. Verificar Console do Navegador

Abra o DevTools (F12) e verifique:
- **Console**: erros JavaScript
- **Network**: se os arquivos CSS/JS estão sendo carregados
- Se houver 404, verifique o caminho completo

#### 9. Limpar Cache do Navegador

- **Chrome/Edge**: Ctrl+Shift+Delete → Limpar cache
- **Firefox**: Ctrl+Shift+Delete → Limpar cache
- Ou use modo anônimo para testar

#### 10. Verificar se o domínio está correto

Certifique-se de que está acessando a URL correta do Vercel (ex: `seu-projeto.vercel.app`)

### Se nada funcionar:

1. Delete o projeto no Vercel
2. Faça push do código atualizado para o GitHub
3. Crie um novo projeto no Vercel
4. Importe o repositório novamente
5. Configure manualmente:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Contato

Se o problema persistir, verifique os logs de build no Vercel e compartilhe os erros específicos.

