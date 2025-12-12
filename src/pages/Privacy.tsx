import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Política de Privacidade</CardTitle>
            <p className="text-sm text-gray-600">Última atualização: Dezembro 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Informações que Coletamos</h2>
              <p className="text-gray-700">
                Coletamos apenas as informações necessárias para fornecer nossos serviços:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Respostas do quiz de perfil (para personalizar sua experiência)</li>
                <li>Dados de uso do aplicativo (páginas visitadas, tempo de uso)</li>
                <li>Informações técnicas (tipo de dispositivo, navegador)</li>
              </ul>
              <p className="text-gray-700">
                <strong>Importante:</strong> Todas as suas respostas aos questionários (GAD-7, PHQ-9, MBI)
                e check-ins são armazenadas APENAS localmente no seu dispositivo. Não enviamos esses
                dados para nossos servidores.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. Como Usamos Seus Dados</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Personalizar sua experiência no aplicativo</li>
                <li>Melhorar nossos serviços</li>
                <li>Analisar como os usuários interagem com o app</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. Compartilhamento de Dados</h2>
              <p className="text-gray-700">
                <strong>NÃO vendemos seus dados pessoais.</strong>
              </p>
              <p className="text-gray-700">
                Podemos compartilhar dados apenas com prestadores de serviço necessários
                para operar o aplicativo (hospedagem, analytics).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. Seus Direitos (LGPD)</h2>
              <p className="text-gray-700">Você tem direito a:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incorretos</li>
                <li>Solicitar exclusão dos seus dados</li>
                <li>Revogar consentimento a qualquer momento</li>
              </ul>
              <p className="text-gray-700">
                Para exercer seus direitos: privacidade@sabiamentezen.com.br
              </p>
            </section>

            <section className="bg-red-50 p-6 rounded-lg border border-red-200 space-y-4">
              <h2 className="text-xl font-semibold text-red-900">⚠️ Aviso Importante - Saúde Mental</h2>
              <p className="text-gray-800 font-semibold">
                Este aplicativo NÃO substitui atendimento médico ou psicológico profissional.
              </p>
              <p className="text-gray-800">
                Os questionários são ferramentas de <strong>triagem</strong>, não de diagnóstico.
                Resultados preocupantes devem ser discutidos com um profissional qualificado.
              </p>
              <div className="bg-white p-4 rounded border border-red-300">
                <p className="font-semibold mb-2">🚨 EM CASO DE EMERGÊNCIA:</p>
                <ul className="space-y-1 text-sm">
                  <li>📞 <strong>CVV:</strong> 188 (24h, gratuito)</li>
                  <li>📞 <strong>SAMU:</strong> 192</li>
                  <li>🏥 <strong>Procure UPA/Pronto Socorro imediatamente</strong></li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. Contato</h2>
              <p className="text-gray-700">
                Dúvidas sobre privacidade: privacidade@sabiamentezen.com.br
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
