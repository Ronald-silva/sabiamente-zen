# 🧠 QUIZ DE PERFIL INTERATIVO

## Componente React para Identificação de Perfil de Ansiedade/Bem-Estar

**Status:** ✅ Completo e funcional
**Tecnologia:** React + TypeScript + Shadcn/ui
**Integração:** Pronto para email marketing

---

## 📋 VISÃO GERAL

Este quiz identifica qual dos 6 perfis de ansiedade/bem-estar o usuário se encaixa melhor e entrega um mini-guia personalizado.

### 6 Perfis Identificados:

1. **Ansioso Produtivo** 🔥
   - Alta energia, mente acelerada, tensão constante
   - Mini-guia: 01-ANSIOSO-PRODUTIVO.md

2. **Esgotado Emocional** 😓
   - Burnout, exaustão, sem motivação
   - Mini-guia: 02-ESGOTADO-EMOCIONAL.md

3. **Perfeccionista Tenso** 🎯
   - Padrões irrealistas, autocrítica feroz
   - Mini-guia: 03-PERFECCIONISTA-TENSO.md

4. **Desconectado e Isolado** 💙
   - Sinais de depressão, isolamento social
   - Mini-guia: 04-DESCONECTADO-ISOLADO.md

5. **Iniciante Consciente** ✨
   - Sintomas leves, proativo, preventivo
   - Mini-guia: 05-INICIANTE-CONSCIENTE.md

6. **Crise Aguda** 🆘
   - Sintomas severos, necessita suporte imediato
   - Mini-guia: 06-CRISE-AGUDA.md + Recursos de emergência

---

## 🎯 COMO USAR

### Opção 1: Página Standalone (Lead Magnet)

```tsx
// src/pages/Quiz.tsx
import { ProfileQuiz } from '@/components/quiz/ProfileQuiz';

const QuizPage = () => {
  const handleComplete = (profile, email) => {
    // Enviar para email marketing
    // Salvar no banco de dados
    // Redirecionar para landing page
  };

  return (
    <div>
      <h1>Descubra Seu Perfil</h1>
      <ProfileQuiz
        onComplete={handleComplete}
        showEmailCapture={true}
      />
    </div>
  );
};
```

### Opção 2: Integrado ao App Principal

```tsx
// src/pages/Index.tsx
import { ProfileQuiz } from '@/components/quiz/ProfileQuiz';

const Index = () => {
  return (
    <div>
      {/* Botão para abrir modal do quiz */}
      <Button onClick={() => setShowQuiz(true)}>
        Fazer Quiz de Perfil
      </Button>

      {showQuiz && (
        <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
          <ProfileQuiz onComplete={handleComplete} />
        </Dialog>
      )}
    </div>
  );
};
```

---

## 🔗 INTEGRAÇÃO COM EMAIL MARKETING

### Mailchimp

```typescript
const enviarParaMailchimp = async (email: string, profile: ProfileType) => {
  const response = await fetch('/api/mailchimp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      profile,
      tags: [profile, 'quiz-completo'],
      merge_fields: {
        FNAME: '', // Capturar nome opcionalmente
        PROFILE: profile
      }
    })
  });

  if (response.ok) {
    // Enviar email automatizado com mini-guia
    await enviarEmailAutomatizado(email, profile);
  }
};
```

### ConvertKit

```typescript
const enviarParaConvertKit = async (email: string, profile: ProfileType) => {
  const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
  const FORM_ID = process.env.CONVERTKIT_FORM_ID;

  await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: CONVERTKIT_API_KEY,
      email,
      tags: [profile],
      fields: {
        perfil: profile
      }
    })
  });
};
```

### Hotmart / Monetizze (Webhook)

```typescript
const enviarParaHotmart = async (email: string, profile: ProfileType) => {
  // Webhook personalizado
  await fetch('https://webhook.hotmart.com/custom-webhook', {
    method: 'POST',
    body: JSON.stringify({
      email,
      custom_field_profile: profile,
      tag: `quiz-${profile}`
    })
  });
};
```

---

## 🎨 PERSONALIZAÇÃO

### Mudar Cores dos Perfis

```tsx
// src/components/quiz/ProfileQuiz.tsx
const profileResults: Record<ProfileType, ProfileResult> = {
  'ansioso-produtivo': {
    // ...
    color: 'bg-yellow-500' // Alterar para sua paleta
  }
};
```

### Adicionar/Remover Perguntas

```tsx
// src/components/quiz/ProfileQuiz.tsx
const questions: Question[] = [
  {
    id: 1,
    text: "Sua pergunta aqui?",
    options: [
      {
        text: "Opção A",
        scores: { 'ansioso-produtivo': 3 } // Pontuação por perfil
      },
      // ... mais opções
    ]
  }
];
```

### Personalizar Textos dos Resultados

```tsx
const profileResults: Record<ProfileType, ProfileResult> = {
  'ansioso-produtivo': {
    title: 'Seu Título',
    description: 'Sua descrição personalizada...',
    // ...
  }
};
```

---

## 📊 ANALYTICS E TRACKING

### Google Analytics 4

```typescript
const handleQuizComplete = (profile: ProfileType, email?: string) => {
  // Enviar evento para GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_complete', {
      event_category: 'engagement',
      event_label: profile,
      value: 1
    });
  }
};
```

### Facebook Pixel

```typescript
const handleQuizComplete = (profile: ProfileType, email?: string) => {
  // Enviar evento para Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'CompleteRegistration', {
      content_name: 'Profile Quiz',
      content_category: profile,
      status: 'completed'
    });
  }
};
```

---

## 🚀 FLUXO DE CONVERSÃO

### Estratégia Recomendada:

```
1. Visitante chega no site
   ↓
2. Vê CTA: "Descubra seu perfil em 2 minutos"
   ↓
3. Faz o quiz (10 perguntas)
   ↓
4. Captura de email para receber resultado
   ↓
5. Resultado imediato na tela + Promessa de envio por email
   ↓
6. Email 1 (imediato): Mini-guia em PDF
   ↓
7. Email 2 (24h): Educação sobre o problema
   ↓
8. Email 3 (48h): Case de sucesso
   ↓
9. Email 4 (72h): 3 Erros fatais
   ↓
10. Email 5 (96h): Oferta do Sistema Completo (R$ 67)
    ↓
11. Emails 6-7: Urgência e prova social
```

---

## 🔐 LGPD E PRIVACIDADE

### Consentimento Obrigatório:

```tsx
<ProfileQuiz
  onComplete={handleComplete}
  showEmailCapture={true}
  consentText="Ao fornecer seu email, você concorda em receber o mini-guia
  e comunicações da Sabiamente Zen. Seus dados são protegidos pela LGPD."
/>
```

### Política de Privacidade:

Incluir link visível:
- Como os dados serão usados
- Direito de solicitar exclusão
- Não compartilhamento com terceiros
- Segurança dos dados

---

## 📱 RESPONSIVIDADE

O quiz é totalmente responsivo:
- ✅ Desktop (1024px+)
- ✅ Tablet (768px-1023px)
- ✅ Mobile (320px-767px)

Testes realizados em:
- Chrome, Firefox, Safari
- iOS Safari, Android Chrome

---

## ♿ ACESSIBILIDADE

- ✅ Navegação por teclado (Tab, Enter, Arrows)
- ✅ Screen reader friendly (ARIA labels)
- ✅ Contraste adequado (WCAG AA)
- ✅ Focus indicators visíveis

---

## 🧪 TESTES

### Testar Manualmente:

1. Responder quiz completo
2. Verificar cálculo de pontuação
3. Testar todos os 6 perfis
4. Captura de email funcional
5. Botão "Voltar" e "Refazer Quiz"

### Casos de Teste:

```typescript
// Teste 1: Ansioso Produtivo
// Respostas: Opção 1 em todas as perguntas de ansiedade
// Esperado: Perfil "Ansioso Produtivo"

// Teste 2: Crise Aguda
// Respostas: Opções mais severas
// Esperado: Perfil "Crise Aguda" + Banner de emergência

// Teste 3: Iniciante Consciente
// Respostas: Opções mais leves
// Esperado: Perfil "Iniciante Consciente"
```

---

## 🎯 MÉTRICAS DE SUCESSO

### Acompanhar:

1. **Taxa de Início:** Visitantes que começam o quiz
2. **Taxa de Conclusão:** % que terminam o quiz (meta: >70%)
3. **Taxa de Captura de Email:** % que fornecem email (meta: >60%)
4. **Distribuição de Perfis:** Qual perfil é mais comum
5. **Tempo Médio:** Quanto tempo leva para completar (meta: 2-4 min)

### Dashboard (Google Analytics):

```
Evento: quiz_start
Evento: quiz_complete
Evento: email_captured
Custom Dimension: profile_type
```

---

## 🛠️ DEPENDÊNCIAS

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "lucide-react": "^0.263.1",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-progress": "^1.0.3"
  }
}
```

Todos já incluídos no projeto Sabiamente Zen.

---

## 📦 ESTRUTURA DE ARQUIVOS

```
src/
├── components/
│   └── quiz/
│       ├── ProfileQuiz.tsx          # Componente principal
│       └── README.md                # Esta documentação
├── pages/
│   └── Quiz.tsx                     # Página standalone do quiz
└── types/
    └── quiz.ts                      # Tipos TypeScript (opcional)
```

---

## 🔄 PRÓXIMAS MELHORIAS

### Roadmap:

- [ ] Salvar respostas intermediárias (localStorage)
- [ ] Permitir retomar quiz incompleto
- [ ] Adicionar animações de transição
- [ ] Versão A/B testing de perguntas
- [ ] Quiz adaptativo (perguntas mudam baseadas em respostas)
- [ ] Relatório PDF gerado dinamicamente
- [ ] Integração com CRM (HubSpot, Pipedrive)
- [ ] Dashboard admin para ver estatísticas

---

## 💡 DICAS DE OTIMIZAÇÃO

### Aumentar Taxa de Conclusão:

1. **Barra de progresso visível** ✅ (já implementado)
2. **Permitir voltar** ✅ (já implementado)
3. **Perguntas curtas e diretas** ✅
4. **10 perguntas max** ✅ (não ultrapassar)
5. **Mobile-first** ✅

### Aumentar Captura de Email:

1. **Mostrar prévia do resultado antes de pedir email**
2. **"Receba seu mini-guia personalizado"** (valor claro)
3. **Confiança: "Sem spam, apenas 1 email"**
4. **Social proof: "7.523 pessoas já fizeram"**

---

## 📧 TEMPLATES DE EMAIL

### Email Imediato (Entrega do Mini-Guia):

**Assunto:** Seu mini-guia personalizado está aqui! 📖

```
Olá!

Você foi identificado como: [PERFIL]

Como prometido, aqui está seu mini-guia personalizado com
3 técnicas cientificamente comprovadas + plano de 7 dias.

[BOTÃO: BAIXAR MEU GUIA]

Este guia foi criado especificamente para seu perfil com base
em 70+ estudos científicos.

Nos próximos dias, vou te enviar mais conteúdo sobre como
vencer [problema principal do perfil].

Abraço,
Equipe Sabiamente Zen

P.S.: Se tiver dúvidas, é só responder este email.
```

---

## 🎬 EXEMPLO DE IMPLEMENTAÇÃO COMPLETA

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuizPage from '@/pages/Quiz';
import Index from '@/pages/Index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 📞 SUPORTE

**Dúvidas técnicas:**
Consultar documentação do Shadcn/ui e React

**Integração com email marketing:**
Ver documentação específica de cada plataforma

---

**🌱 SABIAMENTE ZEN** | *Seu Bem-Estar, Nossa Ciência*

---

**📄 Criado:** Dezembro 2025
**✅ Status:** Pronto para produção
**🚀 Próximo Passo:** Integrar com email marketing e publicar
