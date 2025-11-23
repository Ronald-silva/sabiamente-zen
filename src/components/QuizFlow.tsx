import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface QuizFlowProps {
  onComplete: (result: 'anxiety' | 'burnout' | 'depression' | 'balanced') => void;
}

interface Question {
  id: number;
  text: string;
  type: 'anxiety' | 'burnout' | 'depression';
}

const questions: Question[] = [
  // Anxiety (1-4)
  { id: 1, text: "Você se sente nervoso(a), ansioso(a) ou com os nervos à flor da pele?", type: 'anxiety' },
  { id: 2, text: "Você não consegue parar de se preocupar ou controlar a preocupação?", type: 'anxiety' },
  { id: 3, text: "Você se preocupa muito com coisas diferentes?", type: 'anxiety' },
  { id: 4, text: "Você tem dificuldade para relaxar?", type: 'anxiety' },
  
  // Burnout (5-8)
  { id: 5, text: "Você se sente exausto(a) emocionalmente pelo seu trabalho ou atividades?", type: 'burnout' },
  { id: 6, text: "Você se sente 'acabado(a)' ao final de um dia de trabalho?", type: 'burnout' },
  { id: 7, text: "Você se sente cansado(a) quando se levanta pela manhã e tem que encarar outro dia de trabalho?", type: 'burnout' },
  { id: 8, text: "Você sente que está trabalhando demais no seu emprego?", type: 'burnout' },

  // Depression (9-12)
  { id: 9, text: "Você tem pouco interesse ou prazer em fazer as coisas?", type: 'depression' },
  { id: 10, text: "Você se sente para baixo, deprimido(a) ou sem esperança?", type: 'depression' },
  { id: 11, text: "Você tem dificuldade para pegar no sono ou permanecer dormindo, ou dorme demais?", type: 'depression' },
  { id: 12, text: "Você se sente cansado(a) ou com pouca energia?", type: 'depression' }
];

const options = [
  { label: "Nunca", value: 0 },
  { label: "Raramente", value: 1 },
  { label: "Às vezes", value: 2 },
  { label: "Frequentemente", value: 3 }
];

export const QuizFlow = ({ onComplete }: QuizFlowProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ anxiety: 0, burnout: 0, depression: 0 });

  const handleAnswer = (points: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Update score for current question type
    const newScores = {
      ...scores,
      [currentQuestion.type]: scores[currentQuestion.type] + points
    };
    setScores(newScores);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate winner
      const { anxiety, burnout, depression } = newScores;
      const totalScore = anxiety + burnout + depression;

      // Logic Fix: Check for "Balanced" profile first (Total < 12)
      // User requested threshold increase to avoid pathologizing low scores
      if (totalScore < 12) {
        onComplete('balanced');
        return;
      }

      // Find maximum score
      const maxScore = Math.max(anxiety, burnout, depression);
      
      // Tie-breaking Logic: Priority is Depression > Burnout > Anxiety
      let result: 'anxiety' | 'burnout' | 'depression' = 'anxiety';

      if (depression === maxScore) {
        result = 'depression';
      } else if (burnout === maxScore) {
        result = 'burnout';
      } else {
        result = 'anxiety';
      }

      onComplete(result);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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

        {/* Question Counter */}
        <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
          Pergunta {currentQuestionIndex + 1} de {questions.length}
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
            onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(prev => prev - 1)}
            className={`text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-2 mx-auto transition-colors ${currentQuestionIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para anterior
          </button>
        </div>
      </div>
    </div>
  );
};
