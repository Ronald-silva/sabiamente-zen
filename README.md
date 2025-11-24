# Sabiamente Zen - Seu Bem-Estar Diário

Um aplicativo web para cuidar do seu bem-estar mental com avaliação clínica baseada em protocolos validados, check-ins diários e desafios personalizados.

## 🎯 Sobre o Projeto

O **Sabiamente Zen** é uma plataforma de saúde mental que utiliza protocolos clínicos validados (GAD-7, PHQ-9, MBI) para identificar e acompanhar ansiedade, depressão e burnout. O aplicativo oferece:

- ✅ **Avaliação Clínica Precisa**: Baseada em protocolos validados internacionalmente
- ✅ **Check-ins Diários**: Acompanhamento de bem-estar (energia, sono, hidratação, ansiedade)
- ✅ **Desafios Personalizados**: Micro-hábitos baseados nos seus resultados
- ✅ **Recursos de Emergência**: Acesso rápido a CVV, SAMU e serviços de saúde
- ✅ **Análise Científica**: Resultados baseados em evidências e thresholds clínicos

## 🚀 Como executar o projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone git@github.com:Ronald-silva/sabiamente-zen-daily.git
cd sabiamente-zen-daily
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:8080](http://localhost:8080) no seu navegador.

## 📦 Scripts disponíveis

- `npm run dev` - Executa o app em modo de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run build:dev` - Cria a build em modo desenvolvimento
- `npm run preview` - Visualiza a build de produção localmente
- `npm run lint` - Executa o linter

## 🛠️ Tecnologias utilizadas

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Componentes de UI reutilizáveis (Radix UI)
- **React Router** - Roteamento
- **TanStack Query** - Gerenciamento de estado
- **Zod** - Validação de dados
- **React Hook Form** - Gerenciamento de formulários

## 📁 Estrutura do projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de UI (Shadcn)
│   ├── QuizFlow.tsx    # Questionário clínico (GAD-7, PHQ-9, MBI)
│   ├── CheckInForm.tsx # Formulário de check-in diário
│   ├── ResultsScreen.tsx # Tela de resultados clínicos
│   ├── EmergencyButton.tsx # Botão de emergência flutuante
│   └── ...
├── pages/              # Páginas da aplicação
├── hooks/              # Custom hooks (useLocalStorage)
├── lib/                # Utilitários e configurações
├── types/              # Definições de tipos TypeScript
└── utils/              # Utilitários
    ├── clinicalAnalysis.ts  # Análise baseada em protocolos clínicos
    └── wellnessAnalysis.ts  # Análise de bem-estar
```

## 🔬 Protocolos Clínicos Utilizados

O aplicativo utiliza protocolos validados internacionalmente:

### GAD-7 (Generalized Anxiety Disorder 7-item)
- **7 perguntas** sobre ansiedade
- **Escala**: 0-21 pontos
- **Thresholds**: Mínima (0-4), Leve (5-9), Moderada (10-14), Severa (15-21)
- **Referência**: Spitzer et al. (2006)

### PHQ-9 (Patient Health Questionnaire 9-item)
- **9 perguntas** sobre depressão
- **Escala**: 0-27 pontos
- **Thresholds**: Mínima (0-4), Leve (5-9), Moderada (10-14), Moderadamente Severa (15-19), Severa (20-27)
- **Referência**: Kroenke et al. (2001)

### MBI (Maslach Burnout Inventory - versão simplificada)
- **6 perguntas** sobre burnout
- **Escala**: 0-18 pontos
- **Thresholds**: Mínimo (0-5), Leve (6-10), Moderado (11-14), Severo (15-18)
- **Referência**: Maslach & Jackson (1981)

## 🚨 Recursos de Emergência

O aplicativo inclui um botão de emergência sempre visível com acesso rápido a:

- **CVV (188)** - Centro de Valorização da Vida - 24h
- **SAMU (192)** - Serviço de Atendimento Móvel de Urgência
- **Polícia Militar (190)** - Emergências
- **CAPS** - Centros de Atenção Psicossocial (busca por localização)
- **UBS** - Unidades Básicas de Saúde (busca por localização)

## 🚀 Deploy

### Vercel (Recomendado)

O projeto está configurado para deploy no Vercel. O arquivo `vercel.json` contém as configurações necessárias.

1. Conecte seu repositório ao Vercel
2. O deploy será automático a cada push
3. Configurações:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Outras Plataformas

Para fazer o deploy em outras plataformas:

- **Netlify**: Configure build command `npm run build` e publish directory `dist`
- **Firebase Hosting**: Configure `public: dist` no `firebase.json`
- **GitHub Pages**: Execute `npm run build` e faça upload da pasta `dist`

Consulte `DEPLOYMENT.md` para instruções detalhadas.

## 🔒 Privacidade e LGPD

- ✅ Todos os dados são armazenados **localmente** no navegador (localStorage)
- ✅ **Nenhum dado** é enviado para servidores externos
- ✅ Consentimento LGPD implementado
- ✅ Usuário pode apagar todos os dados a qualquer momento

## ⚠️ Aviso Importante

Este aplicativo **não substitui** atendimento médico ou psicológico profissional. Os resultados são baseados em protocolos clínicos validados, mas devem ser interpretados por profissionais qualificados.

**Em caso de emergência ou pensamentos autolesivos, ligue 188 (CVV) imediatamente.**

## 📄 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

**Desenvolvido com ❤️ para promover bem-estar e qualidade de vida**
