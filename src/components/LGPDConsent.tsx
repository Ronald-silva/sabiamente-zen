import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export const LGPDConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lgpd-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lgpd-consent', 'accepted');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4 animate-fadeIn">
      <Card className="w-full max-w-md p-6 shadow-zen">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2">Seus Dados Protegidos</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Usamos <strong>localStorage</strong> para salvar suas respostas localmente no seu dispositivo. 
              Nenhum dado é enviado para servidores externos. Você pode apagar tudo a qualquer momento.
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              <strong>Importante:</strong> Este app não substitui atendimento médico ou psicológico. 
              Em caso de emergência, ligue 188 (CVV - Centro de Valorização da Vida).
            </p>
            <Button onClick={handleAccept} className="w-full">
              Entendi e Aceito
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
