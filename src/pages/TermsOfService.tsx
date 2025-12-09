import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
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
            <CardTitle className="text-3xl">Termos de Uso</CardTitle>
            <p className="text-sm text-gray-600">Última atualização: 09 de dezembro de 2025</p>
          </CardHeader>
          <CardContent className="prose prose-blue max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-700 leading-relaxed">
                Ao acessar e usar o Sabiamente Zen ("Aplicativo", "Serviço", "nós" ou "nosso"),
                você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não
                concordar com qualquer parte destes termos, não use o Aplicativo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Descrição do Serviço</h2>
              <p className="text-gray-700 leading-relaxed">
                O Sabiamente Zen é um aplicativo de bem-estar que oferece:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Questionários de avaliação (GAD-7, PHQ-9, MBI)</li>
                <li>Check-ins diários de bem-estar</li>
                <li>Quiz de perfil personalizado</li>
                <li>Conteúdo educacional sobre ansiedade e saúde mental</li>
                <li>Produtos digitais (playbooks, workbooks, meditações guiadas)</li>
              </ul>
            </section>

            <section className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
              <h2 className="text-2xl font-semibold mb-4 text-red-800">⚠️ 3. Aviso Médico Importante</h2>
              <div className="space-y-3 text-gray-800">
                <p className="font-semibold">
                  ESTE APLICATIVO NÃO FORNECE ACONSELHAMENTO MÉDICO OU PSICOLÓGICO.
                </p>
                <p className="leading-relaxed">
                  O conteúdo fornecido pelo Sabiamente Zen é apenas para fins informativos e educacionais.
                  NÃO deve ser usado como substituto para:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Consultas com profissionais de saúde mental (psicólogos, psiquiatras)</li>
                  <li>Diagnóstico médico profissional</li>
                  <li>Tratamento ou terapia profissional</li>
                  <li>Prescrição de medicamentos</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  Os questionários (GAD-7, PHQ-9, MBI) são ferramentas de <strong>triagem</strong>, não de diagnóstico.
                  Resultados preocupantes devem ser discutidos com um profissional qualificado.
                </p>
                <div className="bg-white p-4 rounded mt-4 border border-red-200">
                  <p className="font-semibold mb-2">🚨 EM CASO DE EMERGÊNCIA:</p>
                  <ul className="list-none space-y-1">
                    <li>📞 <strong>CVV:</strong> 188 (24h, gratuito)</li>
                    <li>📞 <strong>SAMU:</strong> 192</li>
                    <li>🏥 <strong>Procure UPA/Pronto Socorro imediatamente</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Elegibilidade</h2>
              <p className="text-gray-700 leading-relaxed">
                Você deve ter pelo menos 18 anos de idade para usar este Aplicativo. Ao usar o Serviço,
                você declara que tem idade legal para celebrar um contrato vinculativo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Registro e Conta</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Você é responsável por manter a confidencialidade do seu email e dados de acesso</li>
                <li>Você é responsável por todas as atividades que ocorrem através do seu acesso</li>
                <li>Você deve fornecer informações precisas e atualizadas</li>
                <li>Você deve notificar-nos imediatamente sobre qualquer uso não autorizado</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Uso Aceitável</h2>
              <p className="text-gray-700 leading-relaxed mb-2">Você concorda em NÃO:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Usar o Aplicativo para qualquer propósito ilegal ou não autorizado</li>
                <li>Violar direitos de propriedade intelectual</li>
                <li>Transmitir vírus, malware ou código malicioso</li>
                <li>Tentar obter acesso não autorizado aos nossos sistemas</li>
                <li>Usar bots, scrapers ou ferramentas automatizadas sem permissão</li>
                <li>Assediar, abusar ou prejudicar outros usuários</li>
                <li>Copiar, reproduzir ou redistribuir o conteúdo sem autorização</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Propriedade Intelectual</h2>
              <p className="text-gray-700 leading-relaxed">
                Todo o conteúdo do Sabiamente Zen (textos, imagens, código, design, logos, meditações, exercícios)
                é propriedade exclusiva da Sabiamente Zen ou de seus licenciadores e está protegido por leis de
                direitos autorais e propriedade intelectual.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                <strong>Licença de Uso:</strong> Concedemos a você uma licença limitada, não exclusiva, intransferível
                e revogável para uso pessoal e não comercial do Aplicativo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Produtos Digitais e Pagamentos</h2>

              <h3 className="text-xl font-semibold mb-3 mt-4">8.1 Compra de Produtos</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Os preços estão em Reais (BRL) e podem mudar sem aviso prévio</li>
                <li>O pagamento é processado através de plataformas seguras (Hotmart, Stripe)</li>
                <li>Você receberá acesso imediato aos produtos digitais após confirmação do pagamento</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-4">8.2 Política de Reembolso</h3>
              <p className="text-gray-700 leading-relaxed">
                Oferecemos garantia de 7 dias. Se você não estiver satisfeito com sua compra,
                pode solicitar reembolso total dentro de 7 dias da data da compra, sem necessidade
                de justificativa.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Para solicitar reembolso: <strong>suporte@sabiamentezen.com.br</strong>
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-4">8.3 Entrega de Produtos</h3>
              <p className="text-gray-700 leading-relaxed">
                Produtos digitais são entregues eletronicamente via email ou área de membros.
                Você é responsável por fornecer um email válido e acessível.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Privacidade e Proteção de Dados</h2>
              <p className="text-gray-700 leading-relaxed">
                Sua privacidade é importante para nós. Consulte nossa{" "}
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  Política de Privacidade
                </Link>{" "}
                para entender como coletamos, usamos e protegemos seus dados pessoais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Limitação de Responsabilidade</h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>O APLICATIVO É FORNECIDO "COMO ESTÁ" E "CONFORME DISPONÍVEL".</strong>
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                Na máxima extensão permitida pela lei, nós NÃO garantimos:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Que o Aplicativo será ininterrupto ou livre de erros</li>
                <li>Que os resultados obtidos serão precisos ou confiáveis</li>
                <li>Que o Aplicativo atenderá às suas necessidades específicas</li>
                <li>Resultados específicos de saúde ou bem-estar</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                <strong>Não somos responsáveis por:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Danos diretos, indiretos, incidentais ou consequenciais</li>
                <li>Perda de dados ou lucros</li>
                <li>Decisões tomadas com base no conteúdo do Aplicativo</li>
                <li>Ações ou omissões de terceiros (provedores de pagamento, email, etc.)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Indenização</h2>
              <p className="text-gray-700 leading-relaxed">
                Você concorda em indenizar e isentar o Sabiamente Zen de quaisquer reivindicações,
                perdas, responsabilidades, danos, custos e despesas (incluindo honorários advocatícios)
                decorrentes do seu uso do Aplicativo ou violação destes Termos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Modificações do Serviço</h2>
              <p className="text-gray-700 leading-relaxed">
                Reservamos o direito de modificar ou descontinuar o Serviço (ou qualquer parte dele)
                temporária ou permanentemente, com ou sem aviso prévio. Não seremos responsáveis por
                qualquer modificação, suspensão ou descontinuação do Serviço.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Rescisão</h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos encerrar ou suspender seu acesso imediatamente, sem aviso prévio, por qualquer
                motivo, incluindo violação destes Termos. Após rescisão, seu direito de usar o Aplicativo
                cessará imediatamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Lei Aplicável e Jurisdição</h2>
              <p className="text-gray-700 leading-relaxed">
                Estes Termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa
                relacionada a estes Termos será resolvida nos tribunais brasileiros, com jurisdição na
                comarca de [SUA CIDADE].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">15. Alterações nos Termos</h2>
              <p className="text-gray-700 leading-relaxed">
                Reservamos o direito de modificar estes Termos a qualquer momento. Alterações significativas
                serão notificadas por email ou através de aviso no Aplicativo. O uso continuado após alterações
                constitui aceitação dos novos Termos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">16. Contato</h2>
              <p className="text-gray-700 leading-relaxed">
                Para dúvidas sobre estes Termos de Uso:
              </p>
              <ul className="list-none space-y-1 text-gray-700 mt-2">
                <li><strong>Email:</strong> suporte@sabiamentezen.com.br</li>
                <li><strong>Atendimento:</strong> Segunda a sexta, 9h-18h (horário de Brasília)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">17. Disposições Gerais</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Integralidade:</strong> Estes Termos constituem o acordo completo entre você e nós</li>
                <li><strong>Divisibilidade:</strong> Se alguma cláusula for inválida, as demais permanecem em vigor</li>
                <li><strong>Renúncia:</strong> Falha em exercer direitos não constitui renúncia</li>
                <li><strong>Cessão:</strong> Você não pode transferir estes Termos sem nossa permissão</li>
              </ul>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg mt-8">
              <p className="text-gray-700 leading-relaxed">
                <strong>Ao usar o Sabiamente Zen, você reconhece que leu, compreendeu e concorda
                em estar vinculado a estes Termos de Uso e à nossa Política de Privacidade.</strong>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
