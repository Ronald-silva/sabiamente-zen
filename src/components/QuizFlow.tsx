import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { calculateClinicalResults } from '@/utils/clinicalAnalysis';

interface QuizFlowProps {
  onComplete: (result: 'anxiety' | 'burnout' | 'depression' | 'balanced', clinicalResult?: any) => void;
}

interface Question {
  id: number;
  text: string;
  type: 'anxiety' | 'burnout' | 'depression';
  protocol: 'GAD-7' | 'PHQ-9' | 'MBI';
}

/**
 * Perguntas baseadas em protocolos clínicos validados:
 * - GAD-7: 7 perguntas sobre ansiedade (Spitzer et al., 2006)
 * - PHQ-9: 9 perguntas sobre depressão (Kroenke et al., 2001)
 * - MBI: 6 perguntas sobre burnout (Maslach & Jackson, 1981) - versão simplificada
 */
const questions: Question[] = [
  // GAD-7 - Ansiedade (7 perguntas)
  { id: 1, text: "Nas últimas 2 semanas, com que frequência você se sentiu nervoso(a), ansioso(a) ou com os nervos à flor da pele?", type: 'anxiety', protocol: 'GAD-7' },
  { id: 2, text: "Nas últimas 2 semanas, com que frequência você não conseguiu parar de se preocupar ou controlar a preocupação?", type: 'anxiety', protocol: 'GAD-7' },
  { id: 3, text: "Nas últimas 2 semanas, com que frequência você se preocupou demais com coisas diferentes?", type: 'anxiety', protocol: 'GAD-7' },
  { id: 4, text: "Nas últimas 2 semanas, com que frequência você teve dificuldade para relaxar?", type: 'anxiety', protocol: 'GAD-7' },
  { id: 5, text: "Nas últimas 2 semanas, com que frequência você ficou tão inquieto(a) que ficou difícil ficar sentado(a) parado(a)?", type: 'anxiety', protocol: 'GAD-7' },
  { id: 6, text: "Nas últimas 2 semanas, com que frequência você se irritou ou ficou incomodado(a) facilmente?", type: 'anxiety', protocol: 'GAD-7' },
  { id: 7, text: "Nas últimas 2 semanas, com que frequência você sentiu medo, como se algo terrível fosse acontecer?", type: 'anxiety', protocol: 'GAD-7' },
  
  // PHQ-9 - Depressão (9 perguntas)
  { id: 8, text: "Nas últimas 2 semanas, com que frequência você teve pouco interesse ou prazer em fazer as coisas?", type: 'depression', protocol: 'PHQ-9' },
  { id: 9, text: "Nas últimas 2 semanas, com que frequência você se sentiu para baixo, deprimido(a) ou sem esperança?", type: 'depression', protocol: 'PHQ-9' },
  { id: 10, text: "Nas últimas 2 semanas, com que frequência você teve dificuldade para pegar no sono ou permanecer dormindo, ou dormiu demais?", type: 'depression', protocol: 'PHQ-9' },
  { id: 11, text: "Nas últimas 2 semanas, com que frequência você se sentiu cansado(a) ou com pouca energia?", type: 'depression', protocol: 'PHQ-9' },
  { id: 12, text: "Nas últimas 2 semanas, com que frequência você teve pouco apetite ou comeu demais?", type: 'depression', protocol: 'PHQ-9' },
  { id: 13, text: "Nas últimas 2 semanas, com que frequência você se sentiu mal consigo mesmo(a) - ou sentiu que é um(a) fracassado(a) ou que decepcionou a si mesmo(a) ou sua família?", type: 'depression', protocol: 'PHQ-9' },
  { id: 14, text: "Nas últimas 2 semanas, com que frequência você teve dificuldade para se concentrar em coisas como ler o jornal ou assistir televisão?", type: 'depression', protocol: 'PHQ-9' },
  { id: 15, text: "Nas últimas 2 semanas, com que frequência você se moveu ou falou tão devagar que outras pessoas poderiam ter notado? Ou o contrário - você ficou tão inquieto(a) ou agitado(a) que se moveu muito mais do que o habitual?", type: 'depression', protocol: 'PHQ-9' },
  { id: 16, text: "Nas últimas 2 semanas, com que frequência você pensou que seria melhor estar morto(a) ou pensou em se machucar de alguma forma?", type: 'depression', protocol: 'PHQ-9' },
  
  // MBI - Burnout (6 perguntas - versão simplificada)
  { id: 17, text: "Nas últimas 2 semanas, com que frequência você se sentiu emocionalmente esgotado(a) pelo seu trabalho ou atividades?", type: 'burnout', protocol: 'MBI' },
  { id: 18, text: "Nas últimas 2 semanas, com que frequência você se sentiu 'acabado(a)' ao final de um dia de trabalho?", type: 'burnout', protocol: 'MBI' },
  { id: 19, text: "Nas últimas 2 semanas, com que frequência você se sentiu cansado(a) quando se levantou pela manhã e teve que encarar outro dia de trabalho?", type: 'burnout', protocol: 'MBI' },
  { id: 20, text: "Nas últimas 2 semanas, com que frequência você sentiu que está trabalhando demais?", type: 'burnout', protocol: 'MBI' },
  { id: 21, text: "Nas últimas 2 semanas, com que frequência você se sentiu frustrado(a) com seu trabalho ou atividades?", type: 'burnout', protocol: 'MBI' },
  { id: 22, text: "Nas últimas 2 semanas, com que frequência você sentiu que está trabalhando muito duro?", type: 'burnout', protocol: 'MBI' },
];

const options = [
  { label: "Nunca", value: 0 },
  { label: "Vários dias", value: 1 },
  { label: "Mais da metade dos dias", value: 2 },
  { label: "Quase todos os dias", value: 3 }
];

export const QuizFlow = ({ onComplete }: QuizFlowProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<number[]>(new Array(22).fill(0));

  const handleAnswer = (points: number) => {
    const newResponses = [...responses];
    newResponses[currentQuestionIndex] = points;
    setResponses(newResponses);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Todas as perguntas respondidas - calcular resultados clínicos
      const anxietyResponses = newResponses.slice(0, 7); // GAD-7: primeiras 7
      const depressionResponses = newResponses.slice(7, 16); // PHQ-9: próximas 9
      const burnoutResponses = newResponses.slice(16, 22); // MBI: últimas 6

      try {
        const clinicalResult = calculateClinicalResults(
          anxietyResponses,
          depressionResponses,
          burnoutResponses
        );

        // Passa o resultado primário e o resultado clínico completo
        onComplete(clinicalResult.primaryCondition, clinicalResult);
      } catch (error) {
        console.error('Erro ao calcular resultados clínicos:', error);
        // Fallback para balanced em caso de erro
        onComplete('balanced');
      }
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Mostrar qual protocolo está sendo usado
  const getProtocolInfo = () => {
    if (currentQuestionIndex < 7) return 'GAD-7 - Ansiedade';
    if (currentQuestionIndex < 16) return 'PHQ-9 - Depressão';
    return 'MBI - Burnout';
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 animate-fadeIn">
        {/* Progress Bar */}
        <div className="w-full bg-secondary/20 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Counter and Protocol */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
            Pergunta {currentQuestionIndex + 1} de {questions.length}
          </div>
          <div className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">
            {getProtocolInfo()}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-soft min-h-[160px] flex items-center justify-center text-center">
          <h2 className="text-xl sm:text-2xl font-medium leading-relaxed">
            {currentQuestion.text}
          </h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {options.map((option) => (
            <Button
              key={option.label}
              variant="outline"
              size="lg"
              className="h-14 text-lg justify-start px-6 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all"
              onClick={() => handleAnswer(option.value)}
            >
              <span className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 mr-4 flex items-center justify-center text-xs font-medium text-muted-foreground group-hover:border-primary group-hover:text-primary">
                {option.value}
              </span>
              {option.label}
            </Button>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(prev => prev - 1);
              }
            }}
            className={`text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-2 mx-auto transition-colors ${currentQuestionIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para anterior
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center text-muted-foreground/70 mt-4">
          Este questionário é baseado em protocolos clínicos validados (GAD-7, PHQ-9, MBI) e não substitui avaliação profissional.
        </p>
      </div>
    </div>
  );
};
