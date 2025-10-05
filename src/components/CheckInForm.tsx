import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { CheckInData } from '@/types/wellness';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface CheckInFormProps {
  onComplete: (data: CheckInData) => void;
  onBack: () => void;
}

export const CheckInForm = ({ onComplete, onBack }: CheckInFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CheckInData>>({
    energy: 3,
    sleep: '5-7h',
    hydration: false,
    screenTime: '2-4h',
    anxiety: 3,
    motivation: '',
  });

  const questions = [
    {
      id: 1,
      question: "Como sua energia está hoje, considerando sua rotina?",
      type: 'slider',
      field: 'energy' as keyof CheckInData,
      labels: ['Muito baixa', 'Baixa', 'Média', 'Boa', 'Excelente'],
    },
    {
      id: 2,
      question: "Quantas horas você dormiu na última noite?",
      type: 'radio',
      field: 'sleep' as keyof CheckInData,
      options: [
        { value: '<5h', label: 'Menos de 5 horas' },
        { value: '5-7h', label: '5 a 7 horas' },
        { value: '>7h', label: 'Mais de 7 horas' },
      ],
    },
    {
      id: 3,
      question: "Você bebeu pelo menos 1,5L de água hoje?",
      type: 'radio',
      field: 'hydration' as keyof CheckInData,
      options: [
        { value: 'true', label: 'Sim, estou bem hidratado(a)' },
        { value: 'false', label: 'Não, preciso beber mais água' },
      ],
    },
    {
      id: 4,
      question: "Quantas horas passou em telas (celular, TV, etc.) hoje?",
      type: 'radio',
      field: 'screenTime' as keyof CheckInData,
      options: [
        { value: '<2h', label: 'Menos de 2 horas' },
        { value: '2-4h', label: '2 a 4 horas' },
        { value: '>4h', label: 'Mais de 4 horas' },
      ],
    },
    {
      id: 5,
      question: "Você se sentiu ansioso ou sobrecarregado hoje?",
      type: 'slider',
      field: 'anxiety' as keyof CheckInData,
      labels: ['Nada', 'Pouco', 'Moderado', 'Bastante', 'Muito'],
    },
    {
      id: 6,
      question: "O que te motivou ou desafiou esta semana? (Opcional)",
      type: 'text',
      field: 'motivation' as keyof CheckInData,
      placeholder: 'Compartilhe seus pensamentos...',
    },
  ];

  const currentQuestion = questions[step - 1];
  const progress = (step / questions.length) * 100;

  const handleNext = () => {
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      onComplete({
        ...formData,
        date: new Date().toISOString(),
      } as CheckInData);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const updateFormData = (field: keyof CheckInData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 sm:p-8 shadow-zen animate-fadeIn">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Pergunta {step} de {questions.length}
            </span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-zen transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <Label className="text-xl sm:text-2xl font-medium mb-6 block">
            {currentQuestion.question}
          </Label>

          {currentQuestion.type === 'slider' && (
            <div className="space-y-6">
              <Slider
                value={[formData[currentQuestion.field] as number]}
                onValueChange={([value]) => updateFormData(currentQuestion.field, value)}
                min={1}
                max={5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                {currentQuestion.labels?.map((label, i) => (
                  <span 
                    key={i} 
                    className={formData[currentQuestion.field] === i + 1 ? 'text-primary font-medium' : ''}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {currentQuestion.type === 'radio' && (
            <RadioGroup
              value={String(formData[currentQuestion.field])}
              onValueChange={(value) => updateFormData(
                currentQuestion.field, 
                currentQuestion.field === 'hydration' ? value === 'true' : value
              )}
              className="space-y-3"
            >
              {currentQuestion.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-smooth">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer text-base">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQuestion.type === 'text' && (
            <Textarea
              value={formData[currentQuestion.field] as string}
              onChange={(e) => updateFormData(currentQuestion.field, e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="min-h-32 text-base"
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {step === 1 ? 'Voltar' : 'Anterior'}
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1"
          >
            {step === questions.length ? 'Ver Resultado' : 'Próxima'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
