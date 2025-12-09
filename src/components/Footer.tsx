import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Sobre */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Sabiamente Zen</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Seu aplicativo de bem-estar baseado em ciência para transformar ansiedade
              e estresse em equilíbrio e paz interior.
            </p>
          </div>

          {/* Links Legais */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos de Emergência */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Emergência</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="font-semibold">CVV:</span> 188 (24h)
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold">SAMU:</span> 192
              </li>
              <li className="text-xs text-red-600 mt-2">
                Em crise? Procure ajuda imediata!
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-200 pt-6 pb-4">
          <p className="text-xs text-gray-500 text-center mb-4 leading-relaxed max-w-3xl mx-auto">
            <strong>Aviso Médico:</strong> Este aplicativo não substitui atendimento profissional de saúde mental.
            Os questionários são ferramentas de triagem, não de diagnóstico. Consulte sempre um profissional qualificado.
          </p>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <p className="flex items-center gap-1">
              © {currentYear} Sabiamente Zen. Todos os direitos reservados.
            </p>
            <p className="flex items-center gap-1">
              Feito com <Heart className="w-4 h-4 text-red-500 fill-current" /> para seu bem-estar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
