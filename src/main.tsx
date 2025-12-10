import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for PWA (optional - won't block app if it fails)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  try {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('✅ Service Worker registered successfully:', registration);
        })
        .catch((registrationError) => {
          console.warn('⚠️ Service Worker registration failed (app will continue):', registrationError);
          // App continua funcionando normalmente mesmo se o SW falhar
        });
    });
  } catch (error) {
    console.warn('⚠️ Service Worker not supported or failed to initialize:', error);
    // App continua funcionando normalmente
  }
}
