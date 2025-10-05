import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Frown } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-calm p-4">
      <div className="text-center max-w-md animate-fadeIn">
        <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
          <Frown className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-2 text-2xl font-medium">Página não encontrada</p>
        <p className="mb-8 text-muted-foreground">
          Ops! Parece que você se perdeu no caminho da paz interior.
        </p>
        <Button asChild size="lg" className="shadow-zen">
          <Link to="/">
            <Home className="w-5 h-5 mr-2" />
            Voltar ao Início
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
