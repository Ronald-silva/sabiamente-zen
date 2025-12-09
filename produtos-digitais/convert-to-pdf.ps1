# Script PowerShell para converter Markdowns para PDF
# Requer: pandoc instalado
# Instalar: choco install pandoc (ou baixar de https://pandoc.org/installing.html)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Blue
Write-Host "  Conversão de Markdown para PDF" -ForegroundColor Blue
Write-Host "  Sabiamente Zen - Produtos Digitais" -ForegroundColor Blue
Write-Host "========================================`n" -ForegroundColor Blue

# Verificar se pandoc está instalado
$pandocInstalled = Get-Command pandoc -ErrorAction SilentlyContinue
if (-not $pandocInstalled) {
    Write-Host "Erro: pandoc não está instalado!" -ForegroundColor Red
    Write-Host "`nInstale pandoc com uma das opções:"
    Write-Host "  1. Chocolatey: choco install pandoc"
    Write-Host "  2. Download: https://pandoc.org/installing.html"
    Write-Host "  3. Winget: winget install pandoc"
    exit 1
}

Write-Host "✓ Pandoc encontrado: $($pandocInstalled.Version)`n" -ForegroundColor Green

# Criar diretório de saída
$outputDir = "pdfs-finais"
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

# Função para converter MD para PDF
function Convert-ToPdf {
    param(
        [string]$inputFile,
        [string]$outputName
    )

    $outputFile = Join-Path $outputDir $outputName

    Write-Host "Convertendo: " -NoNewline -ForegroundColor Blue
    Write-Host $inputFile
    Write-Host "Para: " -NoNewline -ForegroundColor Blue
    Write-Host $outputFile

    try {
        pandoc $inputFile `
            -o $outputFile `
            --pdf-engine=xelatex `
            --toc `
            --toc-depth=2 `
            -V geometry:margin=1in `
            -V fontsize=11pt `
            -V documentclass=article `
            -V papersize=a4 `
            -V linkcolor=blue `
            -V urlcolor=blue `
            --highlight-style=tango `
            2>$null

        Write-Host "✓ Concluído!`n" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Erro na conversão: $_`n" -ForegroundColor Red
    }
}

# 1. MINI-GUIAS (6 PDFs)
Write-Host "=== 1/9 Mini-Guias Personalizados ===`n" -ForegroundColor Blue
Convert-ToPdf "01-mini-guias/01-ansioso-produtivo.md" "01-Mini-Guia-Ansioso-Produtivo.pdf"
Convert-ToPdf "01-mini-guias/02-esgotado-emocional.md" "02-Mini-Guia-Esgotado-Emocional.pdf"
Convert-ToPdf "01-mini-guias/03-perfeccionista-tenso.md" "03-Mini-Guia-Perfeccionista-Tenso.pdf"
Convert-ToPdf "01-mini-guias/04-desconectado-isolado.md" "04-Mini-Guia-Desconectado-Isolado.pdf"
Convert-ToPdf "01-mini-guias/05-iniciante-consciente.md" "05-Mini-Guia-Iniciante-Consciente.pdf"
Convert-ToPdf "01-mini-guias/06-crise-aguda.md" "06-Mini-Guia-Crise-Aguda.pdf"

# 2. PLAYBOOK 90 DIAS
Write-Host "=== 2/9 Playbook 90 Dias ===`n" -ForegroundColor Blue
Convert-ToPdf "04-playbook-90-dias/PLAYBOOK-90-DIAS-COMPLETO.md" "Playbook-90-Dias-Transformacao-Ansiedade.pdf"

# 3. WORKBOOK INTERATIVO
Write-Host "=== 3/9 Workbook Interativo ===`n" -ForegroundColor Blue
Convert-ToPdf "05-workbook-interativo/WORKBOOK-INTERATIVO.md" "Workbook-Interativo-Exercicios.pdf"

# 4. GUIA DE NUTRIÇÃO
Write-Host "=== 4/9 Guia de Nutrição ===`n" -ForegroundColor Blue
Convert-ToPdf "06-bonus-nutricao/GUIA-NUTRICAO-ANSIEDADE.md" "Guia-Nutricao-Para-Ansiedade.pdf"

# 5. TEMPLATES DE COMUNICAÇÃO
Write-Host "=== 5/9 Templates de Comunicação ===`n" -ForegroundColor Blue
Convert-ToPdf "06-bonus/templates-comunicacao/TEMPLATES-COMUNICACAO-CONSCIENTE.md" "Templates-Comunicacao-Consciente.pdf"

# 6. MEDITAÇÕES - Criar PDF compilado
Write-Host "=== 6/9 Compilado de Meditações Guiadas ===`n" -ForegroundColor Blue

$tempMeditation = Join-Path $outputDir "temp_all_meditations.md"

@"
# Meditações Guiadas - Sabiamente Zen

## Coleção Completa de 7 Meditações (83 minutos)

---

"@ | Out-File -FilePath $tempMeditation -Encoding UTF8

# Adicionar todas as meditações
$meditationFiles = @(
    "06-bonus/meditacoes-guiadas/01-RESPIRACAO-3MIN.md",
    "06-bonus/meditacoes-guiadas/02-ANSIEDADE-5MIN.md",
    "06-bonus/meditacoes-guiadas/03-SONO-10MIN.md",
    "06-bonus/meditacoes-guiadas/04-STRESS-15MIN.md",
    "06-bonus/meditacoes-guiadas/05-AUTOCOMPAIXAO-15MIN.md",
    "06-bonus/meditacoes-guiadas/06-BODY-SCAN-20MIN.md",
    "06-bonus/meditacoes-guiadas/07-LOVING-KINDNESS-15MIN.md"
)

foreach ($file in $meditationFiles) {
    Get-Content $file | Out-File -FilePath $tempMeditation -Append -Encoding UTF8
    "`n`n---`n`n" | Out-File -FilePath $tempMeditation -Append -Encoding UTF8
}

Convert-ToPdf $tempMeditation "Scripts-Meditacoes-Guiadas-Compilado.pdf"
Remove-Item $tempMeditation

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  ✓ Conversão Concluída!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "PDFs gerados em: " -NoNewline
Write-Host $outputDir -ForegroundColor Blue

Write-Host "`nPróximos passos:" -ForegroundColor Blue
Write-Host "1. Revise todos os PDFs para garantir formatação correta"
Write-Host "2. Use Canva ou InDesign para design profissional (opcional)"
Write-Host "3. Adicione capas e identidade visual"
Write-Host "4. Teste os links e referências"

Write-Host "`nPara design profissional:" -ForegroundColor Blue
Write-Host "- Canva: https://canva.com (templates prontos)"
Write-Host "- Figma: https://figma.com (design customizado)"
Write-Host "- InDesign: Adobe InDesign (qualidade editorial)"

Write-Host "`nArquivos gerados:" -ForegroundColor Blue
Get-ChildItem $outputDir | ForEach-Object {
    $sizeInMB = [math]::Round($_.Length / 1MB, 2)
    Write-Host "  $($_.Name) - $sizeInMB MB"
}
