import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Download, ArrowRight, Moon, Sparkles } from 'lucide-react';

interface ResultsScreenProps {
  result: 'anxiety' | 'burnout' | 'depression' | 'balanced';
}

export const ResultsScreen = ({ result }: ResultsScreenProps) => {
  const contentMap = {
    anxiety: {
      title: "Perfil Identificado: Ansiedade",
      description: "Sua mente está acelerada e isso está drenando sua energia. O medo do futuro está te impedindo de viver o presente.",
      boxTitle: "O que fazer agora?",
      boxText: "Você não precisa viver em alerta constante. Preparamos um protocolo prático para desacelerar sua mente em 7 dias.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: AlertCircle,
      ctaText: "Baixar Protocolo Zero Ansiedade",
      ctaLink: "#"
    },
    burnout: {
      title: "Perfil Identificado: Burnout",
      description: "Cuidado: Seu tanque de energia entrou na reserva. Seu corpo está gritando por descanso e você está ignorando.",
      boxTitle: "Plano de Recuperação:",
      boxText: "Dormir não está sendo suficiente. Você precisa de um descanso ativo e estratégico para recuperar sua vitalidade.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      icon: AlertCircle,
      ctaText: "Baixar Guia de Renovação Total",
      ctaLink: "#"
    },
    depression: {
      title: "Perfil Identificado: Depressão",
      description: "Identificamos um padrão de desmotivação profunda. Não é preguiça, é exaustão emocional.",
      boxTitle: "Um pequeno passo de cada vez:",
      boxText: "Você não precisa resolver tudo hoje. O importante é reacender pequenas faíscas de ânimo na sua rotina.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      icon: Moon,
      ctaText: "Baixar O Despertar",
      ctaLink: "#"
    },
    balanced: {
      title: "Perfil: Equilibrado / Zen",
      description: "Incrível! Seus níveis de saúde mental estão ótimos. Você faz parte de uma minoria que consegue gerenciar bem o estresse.",
      boxTitle: "Como manter esse estado?",
      boxText: "O segredo agora é a constância. Continue com seus bons hábitos e inspire outras pessoas.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: Sparkles,
      ctaText: "Receber Dicas Diárias no Instagram",
      ctaLink: "https://instagram.com/sabiamente_inspira"
    }
  };

  const content = contentMap[result];
  const Icon = content.icon;

  return (
    <div className="min-h-screen bg-gradient-calm flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 animate-fadeIn">
        
        {/* Result Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
          <div className={`${content.bgColor} p-8 text-center border-b ${content.borderColor}`}>
            {/* Icon reflecting the specific result color */}
            <div className={`w-20 h-20 mx-auto ${content.bgColor} rounded-full flex items-center justify-center mb-4 border-4 ${content.borderColor} shadow-sm`}>
              <Icon className={`w-10 h-10 ${content.color}`} />
            </div>
            <h1 className={`text-2xl font-bold ${content.color} mb-2`}>
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

              <Button 
                size="lg" 
                className="w-full text-lg shadow-lg hover:shadow-xl transition-all h-14 animate-pulse"
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

      </div>
    </div>
  );
};
