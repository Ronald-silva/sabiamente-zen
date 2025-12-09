import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Headphones, MessageSquare, BookOpen, Target, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProdutosPage = () => {
  const navigate = useNavigate();

  const produtos = [
    {
      icon: <Target className="h-12 w-12 text-blue-600" />,
      title: 'Quiz de Perfil',
      description: 'Descubra seu perfil de bem-estar em 2 minutos e receba um mini-guia personalizado',
      action: 'Fazer Quiz',
      route: '/quiz',
      status: '✅ Disponível',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      icon: <FileText className="h-12 w-12 text-green-600" />,
      title: '6 Mini-Guias Personalizados',
      description: '110 páginas de conteúdo específico para cada perfil com técnicas validadas',
      items: [
        'Ansioso Produtivo',
        'Esgotado Emocional',
        'Perfeccionista Tenso',
        'Desconectado Isolado',
        'Iniciante Consciente',
        'Crise Aguda'
      ],
      status: '✅ Completo',
      color: 'bg-green-50 border-green-200'
    },
    {
      icon: <BookOpen className="h-12 w-12 text-purple-600" />,
      title: 'Playbook 90 Dias',
      description: 'Guia completo passo-a-passo para transformação em 90 dias',
      items: [
        '200+ páginas de conteúdo',
        '3 Fases progressivas',
        '12 Semanas estruturadas',
        '8 Protocolos de suporte'
      ],
      status: '✅ Completo',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      icon: <MessageSquare className="h-12 w-12 text-orange-600" />,
      title: 'Templates de Comunicação',
      description: 'Scripts para dizer não, estabelecer limites e comunicação não-violenta',
      items: [
        '25 páginas de templates',
        '8 scripts práticos',
        'Comunicação CNV',
        'Gerenciamento de conflitos'
      ],
      status: '✅ Completo',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      icon: <Headphones className="h-12 w-12 text-indigo-600" />,
      title: 'Meditações Guiadas',
      description: '7 meditações profissionais com scripts prontos para gravação',
      items: [
        'Respiração (3 min)',
        'Ansiedade (5 min)',
        'Sono (10 min)',
        'Stress (15 min)',
        'Auto-compaixão (15 min)',
        'Body Scan (20 min)',
        'Loving-Kindness (15 min)'
      ],
      status: '✅ Scripts completos',
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      icon: <Gift className="h-12 w-12 text-pink-600" />,
      title: 'Guia de Nutrição',
      description: 'Conexão intestino-cérebro e alimentação para reduzir ansiedade',
      items: [
        '30 páginas científicas',
        'Alimentos que acalmam',
        'Suplementação baseada em evidências',
        'Planos de refeição'
      ],
      status: '✅ Completo',
      color: 'bg-pink-50 border-pink-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ecossistema Completo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Sistema baseado em 70+ estudos científicos para transformação em ansiedade e stress
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span>570+ páginas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎧</span>
              <span>83 min de meditações</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧠</span>
              <span>6 perfis personalizados</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span>100% completo</span>
            </div>
          </div>
        </div>

        {/* Produtos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {produtos.map((produto, index) => (
            <Card key={index} className={`${produto.color} border-2 hover:shadow-lg transition-all`}>
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    {produto.icon}
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-white rounded-full">
                    {produto.status}
                  </span>
                </div>
                <CardTitle className="text-xl">{produto.title}</CardTitle>
                <CardDescription className="text-sm">
                  {produto.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {produto.items && (
                  <ul className="space-y-1 text-sm text-gray-700 mb-4">
                    {produto.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {produto.action && produto.route && (
                  <Button
                    className="w-full mt-4"
                    onClick={() => navigate(produto.route)}
                  >
                    {produto.action}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estatísticas */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="py-8">
            <h2 className="text-2xl font-bold text-center mb-8">Base Científica Sólida</h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">70+</div>
                <div className="text-blue-100">Estudos Científicos</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">150k+</div>
                <div className="text-blue-100">Participantes em Pesquisas</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50-70%</div>
                <div className="text-blue-100">Redução em Ansiedade</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">90</div>
                <div className="text-blue-100">Dias de Transformação</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="text-lg px-8 py-6"
            onClick={() => navigate('/')}
          >
            Voltar ao App
          </Button>
        </div>

        {/* Valor */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-lg mb-2">
            <span className="line-through">Valor Total: R$ 289+</span>
          </p>
          <p className="text-3xl font-bold text-green-600 mb-2">
            Investimento: R$ 67
          </p>
          <p className="text-sm text-gray-500">
            Menos que 1 sessão de terapia • ROI: 4.3x • Acesso vitalício
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProdutosPage;
