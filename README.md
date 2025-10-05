# Sabiamente Zen - Seu Bem-Estar Diário

Um aplicativo web para cuidar do seu bem-estar com check-ins diários e desafios motivacionais.

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
- `npm run preview` - Visualiza a build de produção localmente
- `npm run lint` - Executa o linter

## 🛠️ Tecnologias utilizadas

- **React** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Componentes de UI reutilizáveis

## 📁 Estrutura do projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── hooks/         # Custom hooks
├── lib/           # Utilitários e configurações
└── types/         # Definições de tipos TypeScript
```

## 🚀 Deploy

Para fazer o deploy da aplicação, você pode usar qualquer plataforma de hospedagem estática como:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

Basta executar `npm run build` e fazer upload da pasta `dist` gerada.

## 📄 Licença

Este projeto está sob a licença MIT.