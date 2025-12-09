import { ProfileQuiz } from '@/components/quiz/ProfileQuiz';
import type { ProfileType } from '@/components/quiz/ProfileQuiz';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const navigate = useNavigate();

  const handleQuizComplete = (profile: ProfileType, email?: string) => {
    console.log('Quiz completo:', { profile, email });

    // Aqui você pode:
    // 1. Enviar para API de email marketing (Mailchimp, ConvertKit, etc.)
    // 2. Salvar no localStorage para personalização
    // 3. Enviar analytics event
    // 4. Redirecionar para página de vendas

    if (email) {
      // TODO: Integrar com plataforma de email marketing
      // Exemplo: enviarParaMailchimp(email, profile);
      localStorage.setItem('user-profile', profile);
      localStorage.setItem('user-email', email);
    }

    // Redirecionar para página de vendas ou app
    // navigate('/landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Descubra Seu Perfil de Bem-Estar
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Responda 10 perguntas e receba um mini-guia personalizado com técnicas
            cientificamente comprovadas para o SEU perfil específico.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            ⏱️ Leva apenas 2-3 minutos
          </div>
        </div>

        <ProfileQuiz onComplete={handleQuizComplete} showEmailCapture={true} />

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            🔒 Seus dados são privados e protegidos pela LGPD.
            <br />
            📧 Enviaremos apenas o mini-guia personalizado, sem spam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
