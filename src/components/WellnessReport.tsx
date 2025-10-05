import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { WellnessReport as WellnessReportType } from '@/types/wellness';
import { Sparkles, AlertCircle, TrendingUp, Heart } from 'lucide-react';

interface WellnessReportProps {
  report: WellnessReportType;
  onGenerateChallenge: () => void;
  onNewCheckIn: () => void;
}

export const WellnessReport = ({ report, onGenerateChallenge, onNewCheckIn }: WellnessReportProps) => {
  const getIcon = () => {
    switch (report.level) {
      case 'excellent':
        return <Sparkles className="w-12 h-12 text-primary" />;
      case 'good':
        return <TrendingUp className="w-12 h-12 text-secondary" />;
      case 'attention':
        return <AlertCircle className="w-12 h-12 text-accent" />;
      case 'stress':
        return <Heart className="w-12 h-12 text-destructive" />;
    }
  };

  const getGradient = () => {
    switch (report.level) {
      case 'excellent':
        return 'bg-gradient-zen';
      case 'good':
        return 'bg-gradient-sunrise';
      case 'attention':
        return 'bg-accent/10';
      case 'stress':
        return 'bg-destructive/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 sm:p-8 shadow-zen animate-fadeIn">
        {/* Icon */}
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${getGradient()} mb-6 animate-breathe`}>
          {getIcon()}
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          {report.message}
        </h2>

        {/* Insight */}
        <div className="bg-muted/50 rounded-lg p-6 mb-6">
          <p className="text-base sm:text-lg text-center leading-relaxed">
            {report.insight}
          </p>
        </div>

        {/* Quote */}
        <blockquote className="border-l-4 border-primary pl-4 py-2 mb-8 italic text-muted-foreground">
          {report.quote}
        </blockquote>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            size="lg" 
            className="w-full shadow-zen"
            onClick={onGenerateChallenge}
          >
            Receber Meu Desafio Zen 🎯
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full"
            onClick={onNewCheckIn}
          >
            Fazer Novo Check-in
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          Este app não substitui atendimento profissional. Em caso de emergência emocional, 
          ligue <strong>188</strong> (CVV - Centro de Valorização da Vida).
        </p>
      </Card>
    </div>
  );
};
