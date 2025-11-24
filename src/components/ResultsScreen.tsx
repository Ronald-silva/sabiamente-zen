import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Download, ArrowRight, Moon, Sparkles, Info } from 'lucide-react';
import { ClinicalResult } from '@/types/wellness';

interface ResultsScreenProps {
  result: 'anxiety' | 'burnout' | 'depression' | 'balanced';
  clinicalResult?: ClinicalResult | null;
}

const getSeverityLabel = (severity: string): string => {
  const labels: Record<string, string> = {
    minimal: 'Mínima',
    mild: 'Leve',
    moderate: 'Moderada',
    moderately_severe: 'Moderadamente Severa',
    severe: 'Severa',
  };
  return labels[severity] || severity;
};

const getSeverityColor = (severity: string): { color: string; bgColor: string; borderColor: string } => {
  const colors: Record<string, { color: string; bgColor: string; borderColor: string }> = {
    minimal: { color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    mild: { color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
    moderate: { color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
    moderately_severe: { color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    severe: { color: 'text-red-700', bgColor: 'bg-red-100', borderColor: 'border-red-300' },
  };
  return colors[severity] || colors.moderate;
};

export const ResultsScreen = ({ result, clinicalResult }: ResultsScreenProps) => {
  // Se temos resultado clínico, usa ele; senão usa o resultado básico
  const primaryCondition = clinicalResult?.primaryCondition || result;
  const overallSeverity = clinicalResult?.overallSeverity || 'minimal';
  const severityColors = getSeverityColor(overallSeverity);

  const contentMap = {
    anxiety: {
      title: clinicalResult 
        ? `Ansiedade - ${getSeverityLabel(clinicalResult.anxiety.severity)}`
        : "Perfil Identificado: Ansiedade",
      description: clinicalResult 
        ? getAnxietyDescription(clinicalResult.anxiety.severity, clinicalResult.anxiety.score, clinicalResult.anxiety.maxScore)
        : "Identificamos sinais de ansiedade nas suas respostas. Sua mente pode estar acelerada e isso pode estar drenando sua energia. O medo do futuro pode estar te impedindo de viver o presente plenamente.",
      boxTitle: "O que fazer agora?",
      boxText: clinicalResult 
        ? getAnxietyRecommendation(clinicalResult.anxiety.severity)
        : "Você não precisa viver em alerta constante. Preparamos um protocolo prático baseado em evidências científicas para desacelerar sua mente e gerenciar a ansiedade de forma eficaz.",
      icon: AlertCircle,
      ctaText: "Baixar Protocolo Zero Ansiedade",
      ctaLink: "#"
    },
    burnout: {
      title: clinicalResult 
        ? `Burnout - ${getSeverityLabel(clinicalResult.burnout.severity)}`
        : "Perfil Identificado: Burnout",
      description: clinicalResult 
        ? getBurnoutDescription(clinicalResult.burnout.severity, clinicalResult.burnout.score, clinicalResult.burnout.maxScore)
        : "Identificamos sinais de esgotamento profissional (burnout) nas suas respostas. Seu tanque de energia pode estar na reserva e seu corpo pode estar pedindo descanso que você está ignorando.",
      boxTitle: "Plano de Recuperação:",
      boxText: clinicalResult 
        ? getBurnoutRecommendation(clinicalResult.burnout.severity)
        : "Dormir sozinho não está sendo suficiente. Você precisa de um descanso ativo e estratégico para recuperar sua vitalidade. Preparamos um guia completo de renovação baseado em evidências científicas.",
      icon: AlertCircle,
      ctaText: "Baixar Guia de Renovação Total",
      ctaLink: "#"
    },
    depression: {
      title: clinicalResult 
        ? `Depressão - ${getSeverityLabel(clinicalResult.depression.severity)}`
        : "Perfil Identificado: Depressão",
      description: clinicalResult 
        ? getDepressionDescription(clinicalResult.depression.severity, clinicalResult.depression.score, clinicalResult.depression.maxScore)
        : "Identificamos um padrão de sintomas depressivos nas suas respostas. Não é preguiça, é exaustão emocional que merece atenção e cuidado. Você não está sozinho(a) nisso.",
      boxTitle: "Um pequeno passo de cada vez:",
      boxText: clinicalResult 
        ? getDepressionRecommendation(clinicalResult.depression.severity)
        : "Você não precisa resolver tudo hoje. O importante é reacender pequenas faíscas de ânimo na sua rotina. Preparamos um guia completo baseado em evidências para te ajudar nessa jornada.",
      icon: Moon,
      ctaText: "Baixar O Despertar",
      ctaLink: "#"
    },
    balanced: {
      title: "Perfil: Equilibrado / Zen",
      description: clinicalResult
        ? `Parabéns! Seus níveis de ansiedade (${clinicalResult.anxiety.score}/${clinicalResult.anxiety.maxScore}), depressão (${clinicalResult.depression.score}/${clinicalResult.depression.maxScore}) e burnout (${clinicalResult.burnout.score}/${clinicalResult.burnout.maxScore}) estão todos em níveis mínimos. Você está gerenciando bem o estresse e mantendo um equilíbrio saudável.`
        : "Incrível! Seus níveis de saúde mental estão ótimos. Você faz parte de uma minoria que consegue gerenciar bem o estresse e manter o equilíbrio emocional.",
      boxTitle: "Como manter esse estado?",
      boxText: "O segredo agora é a constância. Continue com seus bons hábitos de sono, exercícios, alimentação e gestão de estresse. Pratique prevenção com check-ins regulares de bem-estar e inspire outras pessoas com seu exemplo.",
      icon: Sparkles,
      ctaText: "Receber Dicas Diárias no Instagram",
      ctaLink: "https://instagram.com/sabiamente_inspira"
    }
  };

  const content = contentMap[primaryCondition];
  const Icon = content.icon;

  // Usa cores baseadas na severidade se temos resultado clínico
  const finalColors = clinicalResult ? severityColors : {
    color: primaryCondition === 'anxiety' ? 'text-blue-600' : 
           primaryCondition === 'burnout' ? 'text-orange-600' :
           primaryCondition === 'depression' ? 'text-purple-600' : 'text-green-600',
    bgColor: primaryCondition === 'anxiety' ? 'bg-blue-50' : 
             primaryCondition === 'burnout' ? 'bg-orange-50' :
             primaryCondition === 'depression' ? 'bg-purple-50' : 'bg-green-50',
    borderColor: primaryCondition === 'anxiety' ? 'border-blue-200' : 
                 primaryCondition === 'burnout' ? 'border-orange-200' :
                 primaryCondition === 'depression' ? 'border-purple-200' : 'border-green-200',
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 animate-fadeIn">
        
        {/* Result Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
          <div className={`${finalColors.bgColor} p-8 text-center border-b ${finalColors.borderColor}`}>
            {/* Icon reflecting the specific result color */}
            <div className={`w-20 h-20 mx-auto ${finalColors.bgColor} rounded-full flex items-center justify-center mb-4 border-4 ${finalColors.borderColor} shadow-sm`}>
              <Icon className={`w-10 h-10 ${finalColors.color}`} />
            </div>
            <h1 className={`text-2xl font-bold ${finalColors.color} mb-2`}>
              {content.title}
            </h1>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/50 text-sm font-medium text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Análise Concluída
            </div>
          </div>

          <div className="p-8 space-y-6">
            <p className="text-center text-gray-600 leading-relaxed">
              {content.description}
            </p>

            {/* Mostrar scores clínicos se disponível */}
            {clinicalResult && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-medium text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Resultados Detalhados
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ansiedade (GAD-7):</span>
                    <span className="font-medium">{clinicalResult.anxiety.score}/{clinicalResult.anxiety.maxScore} - {getSeverityLabel(clinicalResult.anxiety.severity)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Depressão (PHQ-9):</span>
                    <span className="font-medium">{clinicalResult.depression.score}/{clinicalResult.depression.maxScore} - {getSeverityLabel(clinicalResult.depression.severity)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Burnout (MBI):</span>
                    <span className="font-medium">{clinicalResult.burnout.score}/{clinicalResult.burnout.maxScore} - {getSeverityLabel(clinicalResult.burnout.severity)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-medium mb-2 flex items-center gap-2 text-gray-900">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  {content.boxTitle}
                </h3>
                <p className="text-sm text-gray-600">
                  {content.boxText}
                </p>
              </div>

              {/* Mostrar recomendações clínicas se disponível */}
              {clinicalResult && clinicalResult.recommendations.length > 0 && (
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="font-medium mb-2 text-sm text-primary">Recomendações Baseadas em Evidências:</h3>
                  <ul className="space-y-1 text-xs text-gray-700">
                    {clinicalResult.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button 
                size="lg" 
                className="w-full text-lg shadow-lg hover:shadow-xl transition-all h-14"
                onClick={() => window.open(content.ctaLink, '_blank')}
              >
                <Download className="w-5 h-5 mr-2" />
                {content.ctaText}
              </Button>
              
              <p className="text-xs text-center text-gray-400">
                Acesso imediato • Garantia de 7 dias
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer clínico */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800 text-center">
            <strong>Importante:</strong> Este questionário é baseado em protocolos clínicos validados (GAD-7, PHQ-9, MBI) 
            mas não substitui avaliação profissional. Em caso de emergência, ligue 188 (CVV).
          </p>
        </div>
      </div>
    </div>
  );
};

// Funções auxiliares para descrições baseadas em severidade
function getAnxietyDescription(severity: string, score: number, maxScore: number): string {
  const descriptions: Record<string, string> = {
    minimal: `Sua ansiedade está em níveis mínimos (${score}/${maxScore}). Você está gerenciando bem o estresse do dia a dia e não apresenta sinais significativos de ansiedade patológica.`,
    mild: `Sua ansiedade está em nível leve (${score}/${maxScore}). Algumas preocupações podem estar afetando sua qualidade de vida, mas ainda são gerenciáveis.`,
    moderate: `Sua ansiedade está em nível moderado (${score}/${maxScore}). Sua mente está acelerada e isso está drenando sua energia. As preocupações estão interferindo mais significativamente no seu dia a dia.`,
    moderately_severe: `Sua ansiedade está em nível moderadamente severo (${score}/${maxScore}). Os sintomas estão impactando significativamente sua vida diária e merecem atenção profissional.`,
    severe: `Sua ansiedade está em nível severo (${score}/${maxScore}). É fundamental buscar avaliação profissional para desenvolver estratégias de enfrentamento adequadas. A ansiedade está causando impacto significativo na sua qualidade de vida.`,
  };
  return descriptions[severity] || descriptions.moderate;
}

function getDepressionDescription(severity: string, score: number, maxScore: number): string {
  const descriptions: Record<string, string> = {
    minimal: `Sua depressão está em níveis mínimos (${score}/${maxScore}). Você está mantendo bem seu bem-estar emocional e não apresenta sinais significativos de depressão.`,
    mild: `Sua depressão está em nível leve (${score}/${maxScore}). Alguns sintomas podem estar afetando seu dia a dia, mas ainda são gerenciáveis com autocuidado.`,
    moderate: `Sua depressão está em nível moderado (${score}/${maxScore}). Identificamos um padrão de desmotivação e sintomas depressivos que merecem atenção e cuidado.`,
    moderately_severe: `Sua depressão está em nível moderadamente severo (${score}/${maxScore}). Os sintomas estão impactando significativamente sua vida. É importante buscar apoio profissional para desenvolver estratégias de enfrentamento.`,
    severe: `Sua depressão está em nível severo (${score}/${maxScore}). Recomendamos buscar avaliação profissional imediatamente. Os sintomas estão causando impacto grave na sua qualidade de vida. Em caso de pensamentos autolesivos ou ideação suicida, ligue 188 (CVV) imediatamente.`,
  };
  return descriptions[severity] || descriptions.moderate;
}

function getBurnoutDescription(severity: string, score: number, maxScore: number): string {
  const descriptions: Record<string, string> = {
    minimal: `Seu nível de burnout está mínimo (${score}/${maxScore}). Você está gerenciando bem sua carga de trabalho e mantendo um equilíbrio saudável entre trabalho e descanso.`,
    mild: `Seu nível de burnout está leve (${score}/${maxScore}). Alguns sinais de esgotamento podem estar aparecendo, mas ainda são gerenciáveis com ajustes na rotina.`,
    moderate: `Seu nível de burnout está moderado (${score}/${maxScore}). Seu tanque de energia está na reserva e seu corpo está pedindo descanso. O esgotamento está começando a impactar sua qualidade de vida.`,
    moderately_severe: `Seu nível de burnout está moderadamente severo (${score}/${maxScore}). Você está experimentando esgotamento significativo que está afetando sua capacidade de funcionar adequadamente. É importante priorizar descanso e considerar reduzir carga de trabalho.`,
    severe: `Seu nível de burnout está severo (${score}/${maxScore}). Você precisa urgentemente priorizar descanso e reduzir sua carga de trabalho. O esgotamento está causando impacto grave na sua saúde física e mental. Considere buscar apoio profissional.`,
  };
  return descriptions[severity] || descriptions.moderate;
}

function getAnxietyRecommendation(severity: string): string {
  const recommendations: Record<string, string> = {
    minimal: "Você está gerenciando bem o estresse. Continue com práticas preventivas para manter esse equilíbrio.",
    mild: "Algumas preocupações podem estar afetando sua qualidade de vida. Com pequenos ajustes e técnicas simples, você pode melhorar significativamente.",
    moderate: "A ansiedade está impactando seu dia a dia. Com estratégias adequadas e apoio profissional, é possível reduzir significativamente os sintomas.",
    moderately_severe: "Os sintomas de ansiedade estão significativamente impactando sua vida. É importante buscar tratamento profissional para desenvolver estratégias eficazes.",
    severe: "A ansiedade está causando impacto grave na sua qualidade de vida. É fundamental buscar avaliação profissional imediatamente. Em caso de crise, ligue 188 (CVV).",
  };
  return recommendations[severity] || recommendations.moderate;
}

function getDepressionRecommendation(severity: string): string {
  const recommendations: Record<string, string> = {
    minimal: "Você está mantendo um bom equilíbrio emocional. Continue com seus hábitos saudáveis e pratique prevenção.",
    mild: "Alguns sintomas leves foram identificados. Com pequenos ajustes na rotina e autocuidado, você pode melhorar significativamente seu bem-estar.",
    moderate: "Os sintomas identificados merecem atenção. Com o suporte adequado e estratégias baseadas em evidências, é possível melhorar sua qualidade de vida.",
    moderately_severe: "Os sintomas estão impactando significativamente sua vida. É importante buscar ajuda profissional para desenvolver estratégias de enfrentamento eficazes.",
    severe: "Os sintomas são graves e requerem atenção profissional urgente. Você não está sozinho(a) e há ajuda disponível. Em caso de emergência, ligue 188 (CVV) imediatamente.",
  };
  return recommendations[severity] || recommendations.moderate;
}

function getBurnoutRecommendation(severity: string): string {
  const recommendations: Record<string, string> = {
    minimal: "Você está mantendo um bom equilíbrio entre trabalho e descanso. Continue priorizando seu bem-estar.",
    mild: "Alguns sinais de esgotamento podem estar aparecendo. Com ajustes na rotina e limites claros, você pode prevenir o agravamento.",
    moderate: "O esgotamento está começando a impactar sua qualidade de vida. É importante priorizar descanso e estabelecer limites no trabalho.",
    moderately_severe: "O esgotamento está significativamente impactando sua capacidade de funcionar. É essencial reduzir carga de trabalho e buscar apoio profissional.",
    severe: "O burnout está em nível crítico e pode levar a complicações graves se não tratado. É urgente priorizar descanso e buscar ajuda profissional imediatamente.",
  };
  return recommendations[severity] || recommendations.moderate;
}
