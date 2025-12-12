import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Brain, Heart, Sparkles, Shield, Zap, Target } from 'lucide-react';

// Tipos de perfil baseados nos mini-guias
export type ProfileType =
  | 'ansioso-produtivo'
  | 'esgotado-emocional'
  | 'perfeccionista-tenso'
  | 'desconectado-isolado'
  | 'iniciante-consciente'
  | 'crise-aguda';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    scores: Partial<Record<ProfileType, number>>;
  }[];
}

interface ProfileResult {
  type: ProfileType;
  title: string;
  description: string;
  icon: React.ReactNode;
  miniGuide: string;
  color: string;
}

// Perguntas do quiz (10 perguntas estratégicas)
const questions: Question[] = [
  {
    id: 1,
    text: "Como você descreveria seu nível de energia no dia a dia?",
    options: [
      {
        text: "Alta energia, mas sempre tenso e acelerado",
        scores: { 'ansioso-produtivo': 3 }
      },
      {
        text: "Extremamente baixa, me sinto esgotado constantemente",
        scores: { 'esgotado-emocional': 3 }
      },
      {
        text: "Variável, depende do meu desempenho",
        scores: { 'perfeccionista-tenso': 2 }
      },
      {
        text: "Baixa, não tenho motivação para nada",
        scores: { 'desconectado-isolado': 3 }
      },
      {
        text: "Boa, quero manter assim preventivamente",
        scores: { 'iniciante-consciente': 3 }
      }
    ]
  },
  {
    id: 2,
    text: "Qual é a sua relação com o sono?",
    options: [
      {
        text: "Durmo pouco, minha mente não desliga à noite",
        scores: { 'ansioso-produtivo': 3, 'crise-aguda': 2 }
      },
      {
        text: "Durmo muito mas acordo cansado, sem disposição",
        scores: { 'esgotado-emocional': 3, 'desconectado-isolado': 2 }
      },
      {
        text: "Tenho dificuldade para dormir quando erro algo",
        scores: { 'perfeccionista-tenso': 3 }
      },
      {
        text: "Sono irregular, acordo várias vezes com pensamentos negativos",
        scores: { 'crise-aguda': 3, 'desconectado-isolado': 2 }
      },
      {
        text: "Durmo bem na maioria das noites",
        scores: { 'iniciante-consciente': 3 }
      }
    ]
  },
  {
    id: 3,
    text: "Como você lida com erros ou falhas?",
    options: [
      {
        text: "Fico ansioso, mas sigo em frente rapidamente",
        scores: { 'ansioso-produtivo': 2 }
      },
      {
        text: "Me culpo intensamente, rumino por dias",
        scores: { 'perfeccionista-tenso': 3, 'desconectado-isolado': 1 }
      },
      {
        text: "Sinto que não tenho energia nem para me importar",
        scores: { 'esgotado-emocional': 3 }
      },
      {
        text: "Entro em espiral de pensamentos muito negativos",
        scores: { 'crise-aguda': 3 }
      },
      {
        text: "Aceito como parte do processo de aprendizado",
        scores: { 'iniciante-consciente': 3 }
      }
    ]
  },
  {
    id: 4,
    text: "Qual frase mais se conecta com você?",
    options: [
      {
        text: "Minha mente está sempre planejando, antecipando problemas",
        scores: { 'ansioso-produtivo': 3 }
      },
      {
        text: "Não consigo mais... estou no meu limite",
        scores: { 'esgotado-emocional': 3, 'crise-aguda': 2 }
      },
      {
        text: "Nunca é bom o suficiente, sempre posso fazer melhor",
        scores: { 'perfeccionista-tenso': 3 }
      },
      {
        text: "Me sinto vazio, desconectado de mim e dos outros",
        scores: { 'desconectado-isolado': 3 }
      },
      {
        text: "Estou bem, mas quero ferramentas para me manter assim",
        scores: { 'iniciante-consciente': 3 }
      }
    ]
  },
  {
    id: 5,
    text: "Como está sua vida social atualmente?",
    options: [
      {
        text: "Ativa, mas às vezes evito por ansiedade social",
        scores: { 'ansioso-produtivo': 2, 'perfeccionista-tenso': 1 }
      },
      {
        text: "Muito isolado, não tenho energia para socializar",
        scores: { 'desconectado-isolado': 3, 'esgotado-emocional': 2 }
      },
      {
        text: "Só saio quando sinto que vou performar bem",
        scores: { 'perfeccionista-tenso': 3 }
      },
      {
        text: "Tenho evitado pessoas, me sinto um fardo",
        scores: { 'crise-aguda': 3, 'desconectado-isolado': 2 }
      },
      {
        text: "Equilibrada, tenho relações saudáveis",
        scores: { 'iniciante-consciente': 3 }
      }
    ]
  },
  {
    id: 6,
    text: "Qual é sua principal dificuldade no dia a dia?",
    options: [
      {
        text: "Não consigo relaxar, sempre tenso",
        scores: { 'ansioso-produtivo': 3 }
      },
      {
        text: "Tudo parece pesado demais, sem energia",
        scores: { 'esgotado-emocional': 3 }
      },
      {
        text: "Procrastino por medo de não fazer perfeito",
        scores: { 'perfeccionista-tenso': 3 }
      },
      {
        text: "Não sinto prazer em nada que costumava gostar",
        scores: { 'desconectado-isolado': 3, 'crise-aguda': 2 }
      },
      {
        text: "Pequenos desafios normais, nada crítico",
        scores: { 'iniciante-consciente': 3 }
      }
    ]
  },
  {
    id: 7,
    text: "Como você se sente em relação ao futuro?",
    options: [
      {
        text: "Ansioso, sempre antecipando problemas",
        scores: { 'ansioso-produtivo': 3, 'crise-aguda': 1 }
      },
      {
        text: "Sem esperança, parece que nada vai melhorar",
        scores: { 'crise-aguda': 3, 'desconectado-isolado': 2 }
      },
      {
        text: "Preocupado se vou conseguir manter padrões altos",
        scores: { 'perfeccionista-tenso': 3 }
      },
      {
        text: "Indiferente, não consigo me importar",
        scores: { 'desconectado-isolado': 3, 'esgotado-emocional': 2 }
      },
      {
        text: "Otimista e preparado",
        scores: { 'iniciante-consciente': 3 }
      }
    ]
  },
  {
    id: 8,
    text: "Você tem pensamentos intrusivos ou ruminação?",
    options: [
      {
        text: "Sim, constantes, sobre coisas que podem dar errado",
        scores: { 'ansioso-produtivo': 3, 'crise-aguda': 2 }
      },
      {
        text: "Sim, sobre meus erros e inadequações",
        scores: { 'perfeccionista-tenso': 3, 'desconectado-isolado': 1 }
      },
      {
        text: "Sim, muito negativos, difíceis de controlar",
        scores: { 'crise-aguda': 3 }
      },
      {
        text: "Às vezes, mas consigo gerenciar",
        scores: { 'esgotado-emocional': 1, 'ansioso-produtivo': 1 }
      },
      {
        text: "Raramente, tenho controle sobre meus pensamentos",
        scores: { 'iniciante-consciente': 3 }
      }
    ]
  },
  {
    id: 9,
    text: "Qual é o seu nível de autocrítica?",
    options: [
      {
        text: "Alta, me cobro muito por produtividade",
        scores: { 'ansioso-produtivo': 2, 'perfeccionista-tenso': 2 }
      },
      {
        text: "Extremamente alta, sou muito duro comigo",
        scores: { 'perfeccionista-tenso': 3 }
      },
      {
        text: "Nem me importo mais, estou anestesiado",
        scores: { 'esgotado-emocional': 3 }
      },
      {
        text: "Devastadora, me odeio às vezes",
        scores: { 'crise-aguda': 3, 'desconectado-isolado': 2 }
      },
      {
        text: "Equilibrada, sei reconhecer meus pontos fortes",
        scores: { 'iniciante-consciente': 3 }
      }
    ]
  },
  {
    id: 10,
    text: "Se pudesse mudar uma coisa agora, seria:",
    options: [
      {
        text: "Aprender a desacelerar e relaxar",
        scores: { 'ansioso-produtivo': 3 }
      },
      {
        text: "Recuperar minha energia e motivação",
        scores: { 'esgotado-emocional': 3 }
      },
      {
        text: "Aceitar imperfeições e parar de me cobrar",
        scores: { 'perfeccionista-tenso': 3 }
      },
      {
        text: "Sentir emoções novamente, reconectar com a vida",
        scores: { 'desconectado-isolado': 3 }
      },
      {
        text: "Ter ferramentas preventivas para manter meu equilíbrio",
        scores: { 'iniciante-consciente': 3 }
      }
    ]
  }
];

// Resultados dos perfis
const profileResults: Record<ProfileType, ProfileResult> = {
  'ansioso-produtivo': {
    type: 'ansioso-produtivo',
    title: 'Ansioso Produtivo',
    description: 'Você tem alta energia e produtividade, mas vive em estado de tensão constante. Sua mente não desliga e você antecipa problemas o tempo todo.',
    icon: <Zap className="h-8 w-8" />,
    miniGuide: '01-ANSIOSO-PRODUTIVO.md',
    color: 'bg-yellow-500'
  },
  'esgotado-emocional': {
    type: 'esgotado-emocional',
    title: 'Esgotado Emocional',
    description: 'Você está em burnout ou próximo disso. Sem energia, desmotivado, sentindo que chegou no limite. Precisa urgentemente de recuperação.',
    icon: <AlertCircle className="h-8 w-8" />,
    miniGuide: '02-ESGOTADO-EMOCIONAL.md',
    color: 'bg-red-500'
  },
  'perfeccionista-tenso': {
    type: 'perfeccionista-tenso',
    title: 'Perfeccionista Tenso',
    description: 'Padrões altíssimos, autocrítica feroz. Nunca é bom o suficiente. Procrastina por medo de imperfeição e rumina sobre erros.',
    icon: <Target className="h-8 w-8" />,
    miniGuide: '03-PERFECCIONISTA-TENSO.md',
    color: 'bg-purple-500'
  },
  'desconectado-isolado': {
    type: 'desconectado-isolado',
    title: 'Desconectado e Isolado',
    description: 'Sinais de depressão. Isolamento social, anedonia (perda de prazer), sentimento de vazio. Desconexão de si mesmo e dos outros.',
    icon: <Heart className="h-8 w-8" />,
    miniGuide: '04-DESCONECTADO-ISOLADO.md',
    color: 'bg-blue-500'
  },
  'iniciante-consciente': {
    type: 'iniciante-consciente',
    title: 'Iniciante Consciente',
    description: 'Você está bem! Sintomas leves ou inexistentes, mas é proativo e quer ferramentas preventivas. Quer construir uma base sólida.',
    icon: <Sparkles className="h-8 w-8" />,
    miniGuide: '05-INICIANTE-CONSCIENTE.md',
    color: 'bg-green-500'
  },
  'crise-aguda': {
    type: 'crise-aguda',
    title: 'Crise Aguda',
    description: 'Sintomas severos de ansiedade ou depressão. Pensamentos muito negativos, desesperança. Precisa de suporte imediato.',
    icon: <Shield className="h-8 w-8" />,
    miniGuide: '06-CRISE-AGUDA.md',
    color: 'bg-orange-600'
  }
};

interface ProfileQuizProps {
  onComplete?: (profile: ProfileType, email?: string) => void;
  showEmailCapture?: boolean;
}

export const ProfileQuiz: React.FC<ProfileQuizProps> = ({
  onComplete,
  showEmailCapture = false
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<ProfileType | null>(null);
  const [showResult, setShowResult] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const hasAnswer = answers[currentQ.id] !== undefined;

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQ.id]: optionIndex });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    // Calcular pontuação de cada perfil
    const scores: Record<ProfileType, number> = {
      'ansioso-produtivo': 0,
      'esgotado-emocional': 0,
      'perfeccionista-tenso': 0,
      'desconectado-isolado': 0,
      'iniciante-consciente': 0,
      'crise-aguda': 0
    };

    Object.entries(answers).forEach(([questionId, optionIndex]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        const option = question.options[optionIndex];
        Object.entries(option.scores).forEach(([profile, score]) => {
          scores[profile as ProfileType] += score;
        });
      }
    });

    // Encontrar perfil com maior pontuação
    const topProfile = (Object.entries(scores) as [ProfileType, number][])
      .sort((a, b) => b[1] - a[1])[0][0];

    setResult(topProfile);
    setShowResult(true);

    if (onComplete) {
      onComplete(topProfile, showEmailCapture ? email : undefined);
    }
  };

  if (showResult && result) {
    const profileData = profileResults[result];

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${profileData.color} flex items-center justify-center text-white`}>
            {profileData.icon}
          </div>
          <CardTitle className="text-2xl">Seu Perfil: {profileData.title}</CardTitle>
          <CardDescription className="text-base mt-2">
            {profileData.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                ⚠️ Importante
              </h3>
              <p className="text-sm text-yellow-800">
                Este é um resultado de <strong>triagem</strong>, não um diagnóstico médico.
                Consulte sempre um profissional de saúde mental qualificado.
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">🎁 Seu Mini-Guia Personalizado GRÁTIS</h3>
              <p className="text-sm text-blue-800 mb-3">
                Criamos um guia específico para o seu perfil com 3 técnicas cientificamente
                comprovadas e um plano de ação de 7 dias.
              </p>
              <p className="text-sm text-blue-900 font-semibold">
                📱 Para receber o PDF gratuito:
              </p>
              <ol className="text-sm text-blue-800 ml-4 mt-2 space-y-1">
                <li>1. Siga @sabiamentezen no Instagram</li>
                <li>2. O link do PDF está na BIO</li>
                <li>3. Lá você também recebe dicas diárias!</li>
              </ol>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Ao usar este quiz, você concorda com nossa{' '}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Política de Privacidade
                </a>
              </p>
            </div>

            {showEmailCapture && !email && (
              <div className="space-y-2">
                <Label htmlFor="email">Receber o mini-guia por email:</Label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    id="email"
                    placeholder="seu@email.com"
                    className="flex-1 px-3 py-2 border rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button onClick={() => onComplete?.(result, email)}>
                    Enviar
                  </Button>
                </div>
              </div>
            )}

            {result === 'crise-aguda' && (
              <div className="p-4 bg-red-50 border border-red-300 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Recursos de Emergência
                </h3>
                <div className="text-sm text-red-800 space-y-1">
                  <p><strong>CVV (188)</strong> - Centro de Valorização da Vida - 24h</p>
                  <p><strong>SAMU (192)</strong> - Emergências médicas</p>
                  <p><strong>Polícia Militar (190)</strong> - Situações de risco</p>
                  <p className="mt-2 font-semibold">
                    Se você está tendo pensamentos de autolesão, ligue 188 imediatamente.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => {
                  setShowResult(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                  setResult(null);
                }}
                variant="outline"
              >
                Refazer Quiz
              </Button>
              <Button
                className="flex-1"
                onClick={() => window.location.href = '/'}
              >
                Ir para o App
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl">Quiz de Perfil</CardTitle>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} de {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">{currentQ.text}</h3>
            <RadioGroup
              value={answers[currentQ.id]?.toString()}
              onValueChange={(value) => handleAnswer(parseInt(value))}
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
                  <RadioGroupItem value={index.toString()} id={`q${currentQ.id}-opt${index}`} />
                  <Label
                    htmlFor={`q${currentQ.id}-opt${index}`}
                    className="flex-1 cursor-pointer text-sm leading-relaxed"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="flex-1"
            >
              Voltar
            </Button>
            <Button
              onClick={handleNext}
              disabled={!hasAnswer}
              className="flex-1"
            >
              {currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileQuiz;
