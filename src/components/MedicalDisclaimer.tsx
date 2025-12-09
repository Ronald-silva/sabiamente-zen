import { AlertCircle, Phone } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const MedicalDisclaimer = () => {
  return (
    <Alert variant="destructive" className="border-red-300 bg-red-50">
      <AlertCircle className="h-5 w-5 text-red-600" />
      <AlertTitle className="text-red-800 font-semibold">Aviso Importante</AlertTitle>
      <AlertDescription className="text-red-700 space-y-2">
        <p>
          <strong>Este aplicativo NÃO substitui atendimento médico ou psicológico profissional.</strong>
        </p>
        <p className="text-sm">
          Os questionários fornecidos são ferramentas de triagem, não de diagnóstico.
          Se você identificar sintomas preocupantes, consulte um profissional de saúde mental qualificado.
        </p>
        <div className="flex items-start gap-2 mt-3 p-3 bg-white rounded border border-red-200">
          <Phone className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold mb-1">Em caso de emergência ou risco de autoagressão:</p>
            <ul className="space-y-1">
              <li><strong>CVV (Centro de Valorização da Vida):</strong> 188 (24h, gratuito)</li>
              <li><strong>SAMU:</strong> 192</li>
              <li><strong>Procure UPA/Pronto Socorro imediatamente</strong></li>
            </ul>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};
