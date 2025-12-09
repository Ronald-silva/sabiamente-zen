# 📄 Guia de Conversão para PDF - Produtos Digitais

## 🎯 Objetivo

Este guia explica como converter todos os arquivos Markdown dos produtos digitais para PDF profissionais, prontos para distribuição.

---

## 🚀 Método 1: Script Automatizado (Recomendado)

### Windows (PowerShell)

```powershell
# 1. Instalar Pandoc (escolha uma opção)
choco install pandoc           # Com Chocolatey
winget install pandoc          # Com Winget
# Ou baixe de: https://pandoc.org/installing.html

# 2. Navegar para a pasta
cd produtos-digitais

# 3. Executar script
.\convert-to-pdf.ps1
```

### Mac/Linux (Bash)

```bash
# 1. Instalar Pandoc
brew install pandoc            # Mac
sudo apt-get install pandoc texlive-xetex  # Linux

# 2. Navegar para a pasta
cd produtos-digitais

# 3. Dar permissão de execução
chmod +x convert-to-pdf.sh

# 4. Executar script
./convert-to-pdf.sh
```

### Resultado

Todos os PDFs serão gerados na pasta `produtos-digitais/pdfs-finais/`:

- ✅ 01-Mini-Guia-Ansioso-Produtivo.pdf
- ✅ 02-Mini-Guia-Esgotado-Emocional.pdf
- ✅ 03-Mini-Guia-Perfeccionista-Tenso.pdf
- ✅ 04-Mini-Guia-Desconectado-Isolado.pdf
- ✅ 05-Mini-Guia-Iniciante-Consciente.pdf
- ✅ 06-Mini-Guia-Crise-Aguda.pdf
- ✅ Playbook-90-Dias-Transformacao-Ansiedade.pdf
- ✅ Workbook-Interativo-Exercicios.pdf
- ✅ Guia-Nutricao-Para-Ansiedade.pdf
- ✅ Templates-Comunicacao-Consciente.pdf
- ✅ Scripts-Meditacoes-Guiadas-Compilado.pdf

---

## 🎨 Método 2: Canva (Visual Profissional)

### Vantagens
- ✅ Templates prontos e profissionais
- ✅ Fácil de usar (drag-and-drop)
- ✅ Identidade visual consistente
- ✅ Exportação em alta qualidade

### Passo a Passo

1. **Criar conta no Canva**
   - Acesse: https://canva.com
   - Crie conta gratuita (ou Pro para mais recursos)

2. **Escolher template**
   - Busque: "Ebook", "Guia Digital", "Workbook"
   - Escolha template com 20-200 páginas
   - Filtre por estilo: Minimalista, Profissional, Wellness

3. **Importar conteúdo**
   - Copie o texto do Markdown
   - Cole no template do Canva
   - Ajuste formatação e espaçamento

4. **Adicionar identidade visual**
   - Logo: Sabiamente Zen
   - Cores principais: Azul (#3498db), Verde (#2ecc71)
   - Fontes: Montserrat (títulos), Open Sans (corpo)

5. **Exportar**
   - Download → PDF (Impressão)
   - Qualidade: Alta
   - Incluir sangria: Não (para digital)

### Custos
- **Canva Free:** R$ 0 (limitado)
- **Canva Pro:** R$ 54/mês (recomendado, 30 dias grátis)

### Templates Recomendados
```
Buscar no Canva:
- "Ebook Wellness"
- "Mental Health Guide"
- "Workbook Template"
- "Meditation Guide"
- "Nutrition eBook"
```

---

## 📐 Método 3: Adobe InDesign (Qualidade Editorial)

### Quando Usar
- ✅ Precisa de qualidade editorial premium
- ✅ Layout complexo com gráficos
- ✅ Venda de produtos > R$ 100

### Requisitos
- Adobe Creative Cloud (R$ 99/mês ou R$ 349/ano)
- Conhecimento básico de diagramação

### Processo
1. Criar novo documento A4 (210x297mm)
2. Configurar margens: 2,5cm (todas)
3. Criar master pages (página mestre)
4. Importar texto do Markdown
5. Aplicar estilos de parágrafo
6. Adicionar imagens e gráficos
7. Exportar como PDF/X-1a:2001

---

## 🆓 Método 4: Ferramentas Online Gratuitas

### Markdown to PDF (Simples e Rápido)

**Dillinger** (https://dillinger.io/)
- Cole o Markdown
- Export as → PDF
- Download

**Pandoc Online** (https://pandoc.org/try/)
- Cole o Markdown
- Escolha: PDF
- Convert

**CloudConvert** (https://cloudconvert.com/md-to-pdf)
- Upload arquivo .md
- Convert to PDF
- Download

### Vantagens
- ✅ Gratuito
- ✅ Sem instalação
- ✅ Rápido

### Desvantagens
- ❌ Formatação básica
- ❌ Sem customização visual
- ❌ Limite de tamanho de arquivo

---

## 🎨 Diretrizes de Design

### Identidade Visual

**Cores Principais:**
```
Azul Serenidade: #3498db (rgb(52, 152, 219))
Verde Equilíbrio: #2ecc71 (rgb(46, 204, 113))
Cinza Texto: #2c3e50 (rgb(44, 62, 80))
Cinza Claro: #ecf0f1 (rgb(236, 240, 241))
```

**Fontes:**
- **Títulos:** Montserrat Bold (18-24pt)
- **Subtítulos:** Montserrat SemiBold (14-16pt)
- **Corpo:** Open Sans Regular (10-11pt)
- **Citações:** Open Sans Italic (10pt)

### Estrutura de Páginas

**Capa:**
- Título centralizado e grande
- Subtítulo explicativo
- Logo Sabiamente Zen
- Imagem de fundo (opcional)
- Disclaimer: "Baseado em 70+ estudos científicos"

**Páginas Internas:**
- Cabeçalho: Logo + Nome do produto
- Rodapé: Número da página + "© 2025 Sabiamente Zen"
- Margens: 2-2,5cm
- Espaçamento entre linhas: 1,5

**Última Página:**
- CTA: "Transforme sua ansiedade em 90 dias"
- Link para app: sabiamentezen.com.br
- Recursos de emergência (CVV 188)
- Copyright completo

---

## ✅ Checklist de Qualidade

Antes de considerar um PDF "pronto para distribuição":

### Conteúdo
- [ ] Todos os textos estão corretos (sem typos)
- [ ] Links funcionam (testar clicando)
- [ ] Referências científicas estão completas
- [ ] Disclaimer médico está presente
- [ ] Recursos de emergência (CVV 188) estão visíveis

### Design
- [ ] Capa profissional e atraente
- [ ] Logo em alta resolução
- [ ] Cores consistentes com identidade visual
- [ ] Fontes legíveis (tamanho adequado)
- [ ] Imagens em alta qualidade (mínimo 300 DPI)
- [ ] Espaçamento adequado (não poluído)

### Técnico
- [ ] Arquivo em PDF/A ou PDF/X (arquivamento)
- [ ] Tamanho otimizado (< 10 MB por arquivo)
- [ ] Índice clicável (bookmarks)
- [ ] Metadados preenchidos (autor, título, keywords)
- [ ] Proteção contra cópia (opcional)

### Legal
- [ ] Copyright presente em todas as páginas
- [ ] Disclaimer: "Não substitui atendimento profissional"
- [ ] Política de uso/redistribuição
- [ ] Contato para suporte

---

## 📊 Tamanhos de Arquivo Esperados

| Produto | Páginas | Tamanho Esperado |
|---------|---------|------------------|
| Mini-Guias (cada) | 15-20 | 1-2 MB |
| Playbook 90 Dias | 200+ | 8-12 MB |
| Workbook | 60+ | 3-5 MB |
| Guia Nutrição | 30 | 2-3 MB |
| Templates | 25 | 2-3 MB |
| Meditações Compilado | 40 | 3-4 MB |

**Total aproximado:** 25-35 MB (todos os PDFs)

---

## 🔐 Proteção de PDFs (Opcional)

### Por que proteger?
- Evitar pirataria
- Controlar redistribuição
- Rastrear uso

### Como proteger

**Adobe Acrobat Pro:**
1. Abrir PDF
2. Tools → Protect
3. Configurar senha ou restrições
4. Desabilitar: Impressão, Edição, Cópia de texto

**PDFtk (Gratuito):**
```bash
pdftk input.pdf output protected.pdf user_pw SENHA allow printing
```

**Alternativa:** Adicionar marca d'água com email do comprador

---

## 🚀 Próximos Passos Após Conversão

1. **Revisar todos os PDFs** (qualidade + typos)
2. **Criar capas profissionais** no Canva
3. **Hospedar os arquivos:**
   - Google Drive (compartilhamento)
   - Dropbox (links diretos)
   - AWS S3 (entrega automática via Hotmart)
4. **Integrar com plataforma de vendas** (Hotmart/Stripe)
5. **Testar entrega automática** após compra
6. **Beta testing** com 10-20 usuários

---

## 💡 Dicas Pro

### Otimização de Tamanho
```bash
# Reduzir tamanho do PDF (Mac/Linux)
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
   -dNOPAUSE -dQUIET -dBATCH \
   -sOutputFile=output-compressed.pdf input.pdf
```

### Adicionar Marca D'Água
Use Canva ou Adobe Acrobat para adicionar:
- "© 2025 Sabiamente Zen"
- "Uso pessoal - Não redistribuir"
- Email do comprador (personalizado)

### Criar Índice Clicável
No Pandoc, use:
```bash
pandoc input.md -o output.pdf --toc --toc-depth=2
```

---

## 📞 Suporte

**Problemas com conversão?**
- Verifique se Pandoc está instalado corretamente
- Teste com um arquivo pequeno primeiro
- Veja logs de erro para diagnóstico

**Dúvidas de design?**
- Busque inspiração: Behance, Dribbble
- Contrate designer freelancer: 99designs, Workana
- Use templates prontos: Canva, Creative Market

---

## 📚 Recursos Adicionais

**Pandoc Documentation:**
- https://pandoc.org/MANUAL.html

**Canva Templates:**
- https://www.canva.com/templates/

**Fonts Gratuitas:**
- Google Fonts: https://fonts.google.com/
- Font Squirrel: https://www.fontsquirrel.com/

**Imagens Gratuitas:**
- Unsplash: https://unsplash.com/
- Pexels: https://www.pexels.com/
- Freepik: https://www.freepik.com/ (com atribuição)

---

**Boa sorte com a conversão! 🎉**

*Qualquer dúvida, consulte a documentação ou peça ajuda.*
