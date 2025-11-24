import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Phone, Heart, MapPin, ExternalLink, AlertCircle } from 'lucide-react';

export const EmergencyButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCallCVV = () => {
    window.location.href = 'tel:188';
  };

  const emergencyResources = [
    {
      title: 'CVV - Centro de Valorização da Vida',
      description: 'Atendimento 24h, gratuito e confidencial',
      phone: '188',
      action: handleCallCVV,
      icon: Phone,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'SAMU - Serviço de Atendimento Móvel de Urgência',
      description: 'Emergências médicas e de saúde mental',
      phone: '192',
      action: () => window.location.href = 'tel:192',
      icon: Phone,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Polícia Militar',
      description: 'Emergências e situações de risco imediato',
      phone: '190',
      action: () => window.location.href = 'tel:190',
      icon: Phone,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Buscar CAPS Próximo',
      description: 'Centros de Atenção Psicossocial - Atendimento gratuito',
      link: 'https://www.google.com/maps/search/CAPS+near+me',
      action: () => window.open('https://www.google.com/maps/search/CAPS+near+me', '_blank'),
      icon: MapPin,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Buscar UBS Próxima',
      description: 'Unidades Básicas de Saúde - Atendimento SUS',
      link: 'https://www.google.com/maps/search/UBS+near+me',
      action: () => window.open('https://www.google.com/maps/search/UBS+near+me', '_blank'),
      icon: MapPin,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <>
      {/* Botão Flutuante */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all bg-red-600 hover:bg-red-700 text-white animate-pulse hover:animate-none"
        size="icon"
        aria-label="Preciso de Ajuda"
      >
        <Heart className="h-6 w-6" />
      </Button>

      {/* Dialog de Recursos de Emergência */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Preciso de Ajuda - Recursos de Emergência
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground pt-2">
              Você não está sozinho(a). Há ajuda disponível 24 horas por dia. Escolha o recurso mais adequado para sua situação.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {emergencyResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div
                  key={index}
                  className={`${resource.bgColor} border-2 border-transparent hover:border-current rounded-lg p-4 transition-all cursor-pointer`}
                  onClick={resource.action}
                >
                  <div className="flex items-start gap-3">
                    <div className={`${resource.color} p-2 rounded-full bg-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${resource.color} mb-1`}>
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-700 mb-2">
                        {resource.description}
                      </p>
                      {resource.phone && (
                        <Button
                          size="sm"
                          className={`${resource.color.replace('text-', 'bg-').replace('-600', '-600')} hover:opacity-90 text-white`}
                          onClick={(e) => {
                            e.stopPropagation();
                            resource.action();
                          }}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Ligar {resource.phone}
                        </Button>
                      )}
                      {resource.link && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            resource.action();
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Abrir no Mapa
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mensagem de Apoio */}
          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-center text-gray-700">
              <strong className="text-primary">Lembre-se:</strong> Pedir ajuda é um ato de coragem. 
              Sua vida importa e há pessoas prontas para te ajudar.
            </p>
          </div>

          {/* Informação Importante */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800 text-center">
              <strong>Importante:</strong> Em caso de pensamentos autolesivos ou ideação suicida, 
              ligue <strong>188 (CVV)</strong> imediatamente ou procure o pronto-socorro mais próximo.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

