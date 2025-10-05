import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Sun } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-calm flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-fadeIn">
        {/* Logo/Icon */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-gradient-zen rounded-full flex items-center justify-center shadow-zen animate-breathe">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-zen bg-clip-text text-transparent">
            Sabiamente Zen
          </h1>
          <p className="text-lg text-muted-foreground">
            Seu refúgio diário de bem-estar
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-3 text-left p-4 bg-card rounded-lg shadow-soft">
            <div className="p-2 bg-primary/10 rounded-full">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Check-in Diário</h3>
              <p className="text-sm text-muted-foreground">Avalie seu bem-estar em 2 minutos</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left p-4 bg-card rounded-lg shadow-soft">
            <div className="p-2 bg-secondary/10 rounded-full">
              <Sun className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-medium">Desafios Zen</h3>
              <p className="text-sm text-muted-foreground">Micro-hábitos para transformar seu dia</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left p-4 bg-card rounded-lg shadow-soft">
            <div className="p-2 bg-accent/10 rounded-full">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-medium">Insights Motivacionais</h3>
              <p className="text-sm text-muted-foreground">Reflexões inspiradas na cultura brasileira</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button 
          size="lg" 
          className="w-full text-lg shadow-zen hover:shadow-soft transition-smooth"
          onClick={onStart}
        >
          Começar Meu Check-in ✨
        </Button>

        {/* Social Link */}
        <a 
          href="https://tiktok.com/@sabiamente_inspira" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block text-sm text-muted-foreground hover:text-primary transition-smooth"
        >
          Inspire-se no TikTok @sabiamente_inspira
        </a>
      </div>
    </div>
  );
};
