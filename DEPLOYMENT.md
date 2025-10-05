# 🧘 Sabiamente Zen - Guia de Implantação

## 📋 Visão Geral

Este documento explica como implantar o **Sabiamente Zen** no Vercel (plano gratuito) e conectá-lo ao seu perfil do TikTok/Instagram.

## 🚀 Implantação no Vercel

### Método 1: Via Lovable (Recomendado)

1. No Lovable, clique em **Share** → **Publish**
2. Seu app será automaticamente publicado e você receberá uma URL
3. Copie a URL para adicionar à bio das suas redes sociais

### Método 2: Via GitHub + Vercel

1. **Conectar ao GitHub**
   - No Lovable, clique em **GitHub** → **Connect to GitHub**
   - Autorize o Lovable GitHub App
   - Clique em **Create Repository**

2. **Conectar ao Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em **New Project**
   - Selecione o repositório do Sabiamente Zen
   - Clique em **Deploy**

3. **Configurar o Projeto** (automático)
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Aguardar Deploy**
   - O Vercel automaticamente fará o build e deploy
   - Você receberá uma URL como: `sabiamente-zen.vercel.app`

## 🔗 Conectar às Redes Sociais

### TikTok

1. Acesse seu perfil no TikTok
2. Toque em **Editar perfil**
3. No campo **Site**, cole a URL do seu app
4. Salve as alterações

### Instagram

1. Acesse seu perfil no Instagram
2. Toque em **Editar perfil**
3. No campo **Site**, cole a URL do seu app
4. Salve as alterações

### Bio Sugerida

```
✨ Seu refúgio diário de bem-estar
🎯 Check-ins + Desafios Zen
👇 Comece agora:
[sua-url-aqui]
```

## 📱 Configurar PWA (Progressive Web App)

O app já está configurado como PWA. Seus usuários podem:

### No Android (Chrome)
1. Abrir o app no navegador
2. Tocar no menu (⋮)
3. Selecionar "Adicionar à tela inicial"

### No iOS (Safari)
1. Abrir o app no Safari
2. Tocar no botão Compartilhar
3. Selecionar "Adicionar à Tela de Início"

## 🎨 Personalização

### Alterar Cores

Edite o arquivo `src/index.css` nas variáveis CSS:

```css
:root {
  --primary: 204 70% 53%;  /* Azul principal */
  --secondary: 174 62% 47%; /* Verde-água */
  --accent: 24 95% 68%;     /* Laranja pôr do sol */
}
```

### Alterar Link do TikTok

Edite os componentes:
- `src/components/WelcomeScreen.tsx` (linha ~71)
- `src/components/DailyChallenge.tsx` (linha ~125)

Substitua `https://tiktok.com/@sabiamente_inspira` pelo seu perfil.

### Adicionar Google Analytics

1. Adicione o script no `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 Conformidade LGPD

✅ O app já está em conformidade:
- Pop-up de consentimento ao primeiro acesso
- Dados salvos apenas localmente (localStorage)
- Disclaimer sobre não substituir atendimento profissional
- Link para CVV (188) em casos de emergência

## 📊 Otimizações para Engajamento

### Horários de Pico
- Publique conteúdo relacionado às **12h-14h** e **18h-22h**
- O app ativa modo noturno automaticamente entre 18h-6h

### Hashtags Sugeridas
- #SabiamenteZen
- #BemEstar
- #Superação
- #Autocuidado
- #SaúdeMental
- #Motivação

### Calls-to-Action (CTAs)
- "Complete seu check-in diário!"
- "Qual foi seu desafio zen hoje?"
- "Compartilhe sua jornada de bem-estar!"

## 🐛 Solução de Problemas

### O app não carrega
- Verifique o console do navegador (F12)
- Confirme que o build foi bem-sucedido no Vercel
- Limpe o cache do navegador

### PWA não instala
- Certifique-se de que está usando HTTPS
- Verifique se o `manifest.json` está acessível
- Teste em modo anônimo primeiro

### Dados não salvam
- Verifique se o usuário aceitou o pop-up LGPD
- Confirme que o navegador permite localStorage
- Teste em navegador diferente

## 📈 Métricas para Acompanhar

1. **Taxa de Compartilhamento** (objetivo: >1,52%)
   - Quantos usuários compartilham nos Stories

2. **Retenção Diária**
   - Usuários que voltam no dia seguinte

3. **Desafios Completados**
   - Taxa de conclusão dos Desafios Zen

4. **Dias Consecutivos**
   - Quantos usuários mantêm streak de 3+ dias

## 🎯 Próximos Passos (Pós-MVP)

1. **Monetização**
   - eBook de bem-estar
   - Plano premium com desafios exclusivos
   - Consultoria personalizada

2. **Features Futuras**
   - Histórico de check-ins
   - Gráficos de progresso
   - Comunidade de superadores
   - Integração com calendário

3. **Marketing**
   - Anúncios no TikTok/Instagram
   - Parcerias com influencers de bem-estar
   - Conteúdo semanal motivacional

## 📞 Suporte

Para dúvidas ou problemas:
- 📧 Email: [seu-email]
- 📱 Instagram: @sabiamente_inspira
- 🎵 TikTok: @sabiamente_inspira

---

Desenvolvido com 💙 por Sabiamente Inspira
