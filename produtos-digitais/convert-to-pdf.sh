#!/bin/bash

# Script para converter todos os Markdowns para PDF
# Requer: pandoc instalado no sistema
# Windows: choco install pandoc
# Mac: brew install pandoc
# Linux: sudo apt-get install pandoc texlive-xetex

set -e

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Conversão de Markdown para PDF${NC}"
echo -e "${BLUE}  Sabiamente Zen - Produtos Digitais${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Verificar se pandoc está instalado
if ! command -v pandoc &> /dev/null; then
    echo -e "${RED}Erro: pandoc não está instalado!${NC}"
    echo -e "Instale com:"
    echo -e "  Windows: choco install pandoc"
    echo -e "  Mac: brew install pandoc"
    echo -e "  Linux: sudo apt-get install pandoc texlive-xetex"
    exit 1
fi

# Criar diretório de saída
OUTPUT_DIR="pdfs-finais"
mkdir -p "$OUTPUT_DIR"

# Função para converter MD para PDF
convert_to_pdf() {
    local input_file="$1"
    local output_name="$2"
    local output_file="$OUTPUT_DIR/$output_name"

    echo -e "${BLUE}Convertendo:${NC} $input_file"
    echo -e "${BLUE}Para:${NC} $output_file"

    pandoc "$input_file" \
        -o "$output_file" \
        --pdf-engine=xelatex \
        --toc \
        --toc-depth=2 \
        -V geometry:margin=1in \
        -V fontsize=11pt \
        -V documentclass=article \
        -V papersize=a4 \
        -V linkcolor=blue \
        -V urlcolor=blue \
        --highlight-style=tango \
        2>/dev/null

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Concluído!${NC}\n"
    else
        echo -e "${RED}✗ Erro na conversão${NC}\n"
    fi
}

# 1. MINI-GUIAS (6 PDFs)
echo -e "${BLUE}=== 1/9 Mini-Guias Personalizados ===${NC}\n"
convert_to_pdf "01-mini-guias/01-ansioso-produtivo.md" "01-Mini-Guia-Ansioso-Produtivo.pdf"
convert_to_pdf "01-mini-guias/02-esgotado-emocional.md" "02-Mini-Guia-Esgotado-Emocional.pdf"
convert_to_pdf "01-mini-guias/03-perfeccionista-tenso.md" "03-Mini-Guia-Perfeccionista-Tenso.pdf"
convert_to_pdf "01-mini-guias/04-desconectado-isolado.md" "04-Mini-Guia-Desconectado-Isolado.pdf"
convert_to_pdf "01-mini-guias/05-iniciante-consciente.md" "05-Mini-Guia-Iniciante-Consciente.pdf"
convert_to_pdf "01-mini-guias/06-crise-aguda.md" "06-Mini-Guia-Crise-Aguda.pdf"

# 2. PLAYBOOK 90 DIAS
echo -e "${BLUE}=== 2/9 Playbook 90 Dias ===${NC}\n"
convert_to_pdf "04-playbook-90-dias/PLAYBOOK-90-DIAS-COMPLETO.md" "Playbook-90-Dias-Transformacao-Ansiedade.pdf"

# 3. WORKBOOK INTERATIVO
echo -e "${BLUE}=== 3/9 Workbook Interativo ===${NC}\n"
convert_to_pdf "05-workbook-interativo/WORKBOOK-INTERATIVO.md" "Workbook-Interativo-Exercicios.pdf"

# 4. GUIA DE NUTRIÇÃO
echo -e "${BLUE}=== 4/9 Guia de Nutrição ===${NC}\n"
convert_to_pdf "06-bonus-nutricao/GUIA-NUTRICAO-ANSIEDADE.md" "Guia-Nutricao-Para-Ansiedade.pdf"

# 5. TEMPLATES DE COMUNICAÇÃO
echo -e "${BLUE}=== 5/9 Templates de Comunicação ===${NC}\n"
convert_to_pdf "06-bonus/templates-comunicacao/TEMPLATES-COMUNICACAO-CONSCIENTE.md" "Templates-Comunicacao-Consciente.pdf"

# 6-12. MEDITAÇÕES (mantém como MD, mas cria um PDF compilado)
echo -e "${BLUE}=== 6/9 Compilado de Meditações Guiadas ===${NC}\n"

# Criar arquivo temporário com todas as meditações
TEMP_MEDITATION="$OUTPUT_DIR/temp_all_meditations.md"
cat > "$TEMP_MEDITATION" << 'EOF'
# Meditações Guiadas - Sabiamente Zen

## Coleção Completa de 7 Meditações (83 minutos)

---

EOF

# Adicionar todas as meditações no arquivo temporário
cat "06-bonus/meditacoes-guiadas/01-RESPIRACAO-3MIN.md" >> "$TEMP_MEDITATION"
echo -e "\n\n---\n\n" >> "$TEMP_MEDITATION"
cat "06-bonus/meditacoes-guiadas/02-ANSIEDADE-5MIN.md" >> "$TEMP_MEDITATION"
echo -e "\n\n---\n\n" >> "$TEMP_MEDITATION"
cat "06-bonus/meditacoes-guiadas/03-SONO-10MIN.md" >> "$TEMP_MEDITATION"
echo -e "\n\n---\n\n" >> "$TEMP_MEDITATION"
cat "06-bonus/meditacoes-guiadas/04-STRESS-15MIN.md" >> "$TEMP_MEDITATION"
echo -e "\n\n---\n\n" >> "$TEMP_MEDITATION"
cat "06-bonus/meditacoes-guiadas/05-AUTOCOMPAIXAO-15MIN.md" >> "$TEMP_MEDITATION"
echo -e "\n\n---\n\n" >> "$TEMP_MEDITATION"
cat "06-bonus/meditacoes-guiadas/06-BODY-SCAN-20MIN.md" >> "$TEMP_MEDITATION"
echo -e "\n\n---\n\n" >> "$TEMP_MEDITATION"
cat "06-bonus/meditacoes-guiadas/07-LOVING-KINDNESS-15MIN.md" >> "$TEMP_MEDITATION"

convert_to_pdf "$TEMP_MEDITATION" "Scripts-Meditacoes-Guiadas-Compilado.pdf"
rm "$TEMP_MEDITATION"

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}  ✓ Conversão Concluída!${NC}"
echo -e "${GREEN}========================================${NC}\n"
echo -e "PDFs gerados em: ${BLUE}$OUTPUT_DIR/${NC}"
echo -e "\n${BLUE}Próximos passos:${NC}"
echo -e "1. Revise todos os PDFs para garantir formatação correta"
echo -e "2. Use Canva ou InDesign para design profissional (opcional)"
echo -e "3. Adicione capas e identidade visual"
echo -e "4. Teste os links e referências"
echo -e "\n${BLUE}Para design profissional:${NC}"
echo -e "- Canva: https://canva.com (templates prontos)"
echo -e "- Figma: https://figma.com (design customizado)"
echo -e "- InDesign: Adobe InDesign (qualidade editorial)"

ls -lh "$OUTPUT_DIR"
