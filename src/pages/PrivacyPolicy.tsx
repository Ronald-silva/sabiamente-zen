import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Política de Privacidade</CardTitle>
            <p className="text-sm text-gray-600">Última atualização: 09 de dezembro de 2025</p>
          </CardHeader>
          <CardContent className="prose prose-blue max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
              <p className="text-gray-700 leading-relaxed">
                O Sabiamente Zen ("nós", "nosso" ou "aplicativo") respeita sua privacidade e está
                comprometido em proteger seus dados pessoais. Esta Política de Privacidade explica
                como coletamos, usamos, armazenamos e protegemos suas informações quando você usa
                nosso aplicativo de bem-estar e saúde mental.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Dados Coletados</h2>

              <h3 className="text-xl font-semibold mb-3 mt-4">2.1 Dados Fornecidos por Você</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Email:</strong> Coletado através do quiz de perfil para envio de conteúdos personalizados</li>
                <li><strong>Respostas do Quiz:</strong> Suas respostas são usadas para identificar seu perfil de bem-estar</li>
                <li><strong>Avaliações Clínicas:</strong> Respostas aos questionários GAD-7, PHQ-9 e MBI (armazenadas localmente no seu dispositivo)</li>
                <li><strong>Check-ins Diários:</strong> Informações sobre sono, hidratação, energia e humor</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-4">2.2 Dados Coletados Automaticamente</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Dados de Uso:</strong> Páginas visitadas, tempo de uso, interações com o aplicativo</li>
                <li><strong>Dados Técnicos:</strong> Tipo de dispositivo, navegador, endereço IP, localização aproximada</li>
                <li><strong>Cookies:</strong> Usados para melhorar a experiência e analytics (Google Analytics)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Como Usamos Seus Dados</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Personalização:</strong> Enviar mini-guias e conteúdos personalizados baseados no seu perfil</li>
                <li><strong>Comunicação:</strong> Enviar emails com dicas, exercícios e ofertas de produtos relacionados</li>
                <li><strong>Melhoria do Serviço:</strong> Analisar como os usuários interagem com o app para melhorias</li>
                <li><strong>Segurança:</strong> Detectar e prevenir fraudes ou uso indevido</li>
                <li><strong>Obrigações Legais:</strong> Cumprir com requisitos legais quando necessário</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Base Legal (LGPD)</h2>
              <p className="text-gray-700 leading-relaxed">
                Processamos seus dados pessoais com base nas seguintes justificativas legais:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li><strong>Consentimento:</strong> Você consente ao fornecer seu email no quiz</li>
                <li><strong>Execução de Contrato:</strong> Para fornecer os serviços que você solicitou</li>
                <li><strong>Legítimo Interesse:</strong> Para melhorar nossos serviços e segurança</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Compartilhamento de Dados</h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>Não vendemos seus dados pessoais.</strong> Podemos compartilhar dados apenas com:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li><strong>Prestadores de Serviço:</strong> Email marketing (Mailchimp/ConvertKit), analytics (Google Analytics), pagamento (Hotmart/Stripe)</li>
                <li><strong>Obrigações Legais:</strong> Quando exigido por lei ou ordem judicial</li>
                <li><strong>Com Seu Consentimento:</strong> Em outras situações, apenas com sua permissão explícita</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Armazenamento e Segurança</h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>Armazenamento Local:</strong> Dados sensíveis (avaliações clínicas, check-ins) são armazenados
                localmente no seu navegador (localStorage) e não são enviados para nossos servidores.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                <strong>Armazenamento em Nuvem:</strong> Email e respostas do quiz são armazenadas em servidores
                seguros com criptografia SSL/TLS.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                <strong>Retenção:</strong> Mantemos seus dados enquanto você usar o serviço ou conforme exigido por lei.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Seus Direitos (LGPD)</h2>
              <p className="text-gray-700 leading-relaxed">Você tem os seguintes direitos:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li><strong>Acesso:</strong> Solicitar cópia dos seus dados pessoais</li>
                <li><strong>Correção:</strong> Corrigir dados incompletos ou incorretos</li>
                <li><strong>Exclusão:</strong> Solicitar exclusão dos seus dados</li>
                <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                <li><strong>Revogação:</strong> Revogar consentimento a qualquer momento</li>
                <li><strong>Oposição:</strong> Opor-se ao processamento dos seus dados</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Para exercer seus direitos, entre em contato: <strong>privacidade@sabiamentezen.com.br</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Cookies e Tecnologias Similares</h2>
              <p className="text-gray-700 leading-relaxed">
                Usamos cookies para:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>Lembrar suas preferências</li>
                <li>Analisar o uso do aplicativo (Google Analytics)</li>
                <li>Melhorar a experiência do usuário</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-2">
                Você pode desabilitar cookies nas configurações do seu navegador, mas isso pode afetar a funcionalidade.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Transferência Internacional de Dados</h2>
              <p className="text-gray-700 leading-relaxed">
                Alguns de nossos prestadores de serviço (Google, Mailchimp) podem estar localizados fora do Brasil.
                Garantimos que essas transferências estejam em conformidade com a LGPD e que seus dados sejam protegidos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Menores de Idade</h2>
              <p className="text-gray-700 leading-relaxed">
                Nosso serviço não é direcionado a menores de 18 anos. Não coletamos intencionalmente dados de menores.
                Se você é pai/mãe e acredita que seu filho forneceu dados, entre em contato conosco.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Alterações nesta Política</h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas por email
                ou através de aviso no aplicativo. A data da última atualização sempre estará no topo desta página.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Contato</h2>
              <p className="text-gray-700 leading-relaxed">
                Para dúvidas sobre esta política ou seus dados pessoais:
              </p>
              <ul className="list-none space-y-1 text-gray-700 mt-2">
                <li><strong>Email:</strong> privacidade@sabiamentezen.com.br</li>
                <li><strong>Encarregado de Dados (DPO):</strong> dpo@sabiamentezen.com.br</li>
              </ul>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-semibold mb-4">13. Aviso Importante - Saúde Mental</h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>Este aplicativo NÃO substitui atendimento médico ou psicológico profissional.</strong>
                Se você está em crise ou risco de autoagressão, procure ajuda imediata:
              </p>
              <ul className="list-none space-y-2 text-gray-700 mt-4 font-semibold">
                <li>📞 <strong>CVV - Centro de Valorização da Vida:</strong> 188 (24h, gratuito)</li>
                <li>📞 <strong>SAMU:</strong> 192</li>
                <li>🏥 <strong>UPA/Pronto Socorro</strong> mais próximo</li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
