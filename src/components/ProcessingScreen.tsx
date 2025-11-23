import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface ProcessingScreenProps {
  onComplete: () => void;
}

export const ProcessingScreen = ({ onComplete }: ProcessingScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-calm flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-6 animate-fadeIn">
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <Loader2 className="w-10 h-10 text-primary animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Processando Resultados...
          </h2>
          <p className="text-muted-foreground animate-pulse">
            Analisando suas respostas com base em protocolos clínicos
          </p>
        </div>
      </div>
    </div>
  );
};
