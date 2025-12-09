// Google Analytics 4 Configuration and Helper Functions

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn("Google Analytics Measurement ID not found. Set VITE_GA_MEASUREMENT_ID in .env");
    return;
  }

  // Create script tag for gtag.js
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll track page views manually
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!window.gtag) return;

  window.gtag("event", "page_view", {
    page_path: url,
    page_title: title || document.title,
  });
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (!window.gtag) return;

  window.gtag("event", eventName, parameters);
};

// Predefined event tracking functions
export const analytics = {
  // Quiz events
  quizStarted: () => {
    trackEvent("quiz_start", {
      event_category: "engagement",
      event_label: "Profile Quiz",
    });
  },

  quizCompleted: (profileType: string, email?: string) => {
    trackEvent("quiz_complete", {
      event_category: "engagement",
      event_label: "Profile Quiz",
      profile_type: profileType,
      has_email: !!email,
    });
  },

  emailCaptured: (source: string) => {
    trackEvent("email_captured", {
      event_category: "lead_generation",
      event_label: source,
    });
  },

  // Assessment events
  assessmentCompleted: (assessmentType: string, score: number) => {
    trackEvent("assessment_complete", {
      event_category: "engagement",
      event_label: assessmentType,
      value: score,
    });
  },

  // Check-in events
  checkInCompleted: (day: number) => {
    trackEvent("checkin_complete", {
      event_category: "engagement",
      event_label: "Daily Check-in",
      value: day,
    });
  },

  // Product events
  productViewed: (productName: string) => {
    trackEvent("view_item", {
      event_category: "ecommerce",
      event_label: productName,
    });
  },

  addToCart: (productName: string, price: number) => {
    trackEvent("add_to_cart", {
      event_category: "ecommerce",
      currency: "BRL",
      value: price,
      items: [
        {
          item_name: productName,
          price: price,
        },
      ],
    });
  },

  purchase: (transactionId: string, value: number, items: any[]) => {
    trackEvent("purchase", {
      event_category: "ecommerce",
      transaction_id: transactionId,
      currency: "BRL",
      value: value,
      items: items,
    });
  },

  // Navigation events
  emergencyButtonClicked: () => {
    trackEvent("emergency_button_click", {
      event_category: "safety",
      event_label: "Emergency Resources",
    });
  },

  // Content engagement
  resourceDownloaded: (resourceName: string) => {
    trackEvent("download", {
      event_category: "engagement",
      event_label: resourceName,
    });
  },

  // Outbound links
  outboundLinkClicked: (url: string, label?: string) => {
    trackEvent("click", {
      event_category: "outbound",
      event_label: label || url,
      value: url,
    });
  },
};

// Hook for React Router integration
export const usePageTracking = () => {
  const trackPage = (pathname: string) => {
    trackPageView(pathname);
  };

  return { trackPage };
};
