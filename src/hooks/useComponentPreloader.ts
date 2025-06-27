import { useEffect, useCallback } from 'react';

// Preload components based on user interaction patterns
export const useComponentPreloader = () => {
  const preloadComponent = useCallback((componentPath: string) => {
    // Use dynamic import with prefetch
    import(/* webpackPrefetch: true */ componentPath).catch((error) => {
      // Only log errors in development for debugging
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Failed to preload component: ${componentPath}`, error);
      }
    });
  }, []);

  const preloadApplications = useCallback(() => {
    // Preload most commonly used applications
    preloadComponent('../components/applications/MyComputer');
    preloadComponent('../components/applications/Welcome');
  }, [preloadComponent]);

  const preloadDialogs = useCallback(() => {
    // Preload dialog components when user starts interacting
    preloadComponent('../components/DisplayProperties');
    preloadComponent('../components/PropertiesDialog');
    preloadComponent('../components/ShutdownDialog');
  }, [preloadComponent]);

  const preloadOnIdle = useCallback(() => {
    // Use requestIdleCallback to preload during idle time
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        preloadComponent('../components/applications/MyDocuments');
        preloadComponent('../components/applications/InternetExplorer');
        preloadComponent('../components/applications/RecycleBin');
        preloadComponent('../components/applications/Contact');
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        preloadComponent('../components/applications/MyDocuments');
        preloadComponent('../components/applications/InternetExplorer');
        preloadComponent('../components/applications/RecycleBin');
        preloadComponent('../components/applications/Contact');
      }, 2000);
    }
  }, [preloadComponent]);

  return {
    preloadApplications,
    preloadDialogs,
    preloadOnIdle,
    preloadComponent
  };
};

// Hook to preload components on user interactions
export const useSmartPreloader = () => {
  const { preloadApplications, preloadDialogs, preloadOnIdle } = useComponentPreloader();

  useEffect(() => {
    // Preload critical components after initial render
    const timer = setTimeout(() => {
      preloadApplications();
    }, 1000);

    return () => clearTimeout(timer);
  }, [preloadApplications]);

  useEffect(() => {
    // Preload remaining components during idle time
    preloadOnIdle();
  }, [preloadOnIdle]);

  const handleUserInteraction = useCallback(() => {
    // Preload dialogs on first user interaction
    preloadDialogs();
  }, [preloadDialogs]);

  useEffect(() => {
    // Listen for first user interaction
    const events = ['mousedown', 'touchstart', 'keydown'];
    const handleFirstInteraction = () => {
      handleUserInteraction();
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    };

    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, [handleUserInteraction]);
}; 