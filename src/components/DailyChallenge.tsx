import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Challenge } from '@/types/wellness';
import { Target, Share2, CheckCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface DailyChallengeProps {
  challenge: Challenge;
  onComplete: () => void;
  onNewCheckIn: () => void;
  consecutiveDays: number;
}

export const DailyChallenge = ({ challenge, onComplete, onNewCheckIn, consecutiveDays }: DailyChallengeProps) => {
  const [completed, setCompleted] = useState(challenge.completed);

  const handleComplete = () => {
    setCompleted(true);
    onComplete();
    
    if (consecutiveDays >= 2) {
      toast.success('🏆 Badge Desbloqueado: Superador do Dia!', {
        description: `${consecutiveDays + 1} dias consecutivos de desafios!`,
      });
    } else {
      toast.success('Parabéns! Você é um superador! ✨');
    }
  };

  const handleShare = async () => {
    const shareText = `Completei meu desafio Zen hoje! 💪✨\n\n${challenge.title}\n\n#SabiamenteZen #Superação #BemEstar`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu Desafio Zen',
          text: shareText,
        });
        toast.success('Obrigado por compartilhar! 🙌');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          copyToClipboard(shareText);
        }
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Texto copiado! Cole nos seus Stories 📱');
  };

  const getCategoryEmoji = () => {
    const emojis = {
      sleep: '🌙',
      hydration: '💧',
      screen: '📱',
      food: '🍽️',
      anxiety: '🧘',
    };
    return emojis[challenge.category];
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 sm:p-8 shadow-zen animate-fadeIn">
        {/* Badge notification */}
        {consecutiveDays >= 2 && !completed && (
          <div className="bg-accent/10 border border-accent rounded-lg p-4 mb-6 animate-float">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-accent" />
              <div>
                <p className="font-medium">Você está em chamas! 🔥</p>
                <p className="text-sm text-muted-foreground">
                  {consecutiveDays} dias consecutivos. Complete este desafio para ganhar um badge!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Challenge Icon */}
        <div className="w-20 h-20 mx-auto bg-gradient-zen rounded-full flex items-center justify-center mb-6 shadow-zen animate-breathe">
          <span className="text-4xl">{getCategoryEmoji()}</span>
        </div>

        {/* Challenge Content */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {challenge.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {challenge.description}
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-muted/50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <p className="font-medium">
              {completed ? 'Desafio Concluído! 🎉' : 'Seu Desafio de Hoje'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {!completed ? (
            <>
              <Button 
                size="lg" 
                className="w-full shadow-zen"
                onClick={handleComplete}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Concluir Desafio
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5 mr-2" />
                Compartilhar nos Stories
              </Button>
            </>
          ) : (
            <>
              <Button 
                size="lg" 
                className="w-full shadow-zen"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5 mr-2" />
                Compartilhar Conquista
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={onNewCheckIn}
              >
                Voltar ao Início
              </Button>
            </>
          )}
        </div>

        {/* Reflection Prompt */}
        <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-center text-muted-foreground">
            💭 <strong>O que te motivou hoje?</strong> Compartilhe nos Stories e inspire outros!
          </p>
        </div>

        {/* Social Link */}
        <div className="mt-6 text-center">
          <a 
            href="https://tiktok.com/@sabiamente_inspira" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Inspire-se no TikTok @sabiamente_inspira
          </a>
        </div>
      </Card>
    </div>
  );
};
