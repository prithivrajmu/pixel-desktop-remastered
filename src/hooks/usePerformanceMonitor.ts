import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
  componentCount: number;
}

export const usePerformanceMonitor = (componentName?: string) => {
  const measurePerformance = useCallback((metricName: string, fn: () => void) => {
    const startTime = performance.now();
    fn();
    const endTime = performance.now();
    
    // Only log performance in development and if explicitly enabled
    if (process.env.NODE_ENV === 'development' && localStorage.getItem('debug.performance') === 'true') {
      console.log(`${metricName}: ${endTime - startTime}ms`);
    }
    
    // Report to performance API if available
    if ('PerformanceObserver' in window) {
      performance.mark(`${metricName}-end`);
      performance.measure(metricName, `${metricName}-start`, `${metricName}-end`);
    }
  }, []);

  const reportWebVitals = useCallback(() => {
    // Report Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (process.env.NODE_ENV === 'development' && localStorage.getItem('debug.performance') === 'true') {
          console.log('LCP:', lastEntry.startTime);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (process.env.NODE_ENV === 'development' && localStorage.getItem('debug.performance') === 'true' && entry.processingStart) {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        if (process.env.NODE_ENV === 'development' && localStorage.getItem('debug.performance') === 'true') {
          console.log('CLS:', clsValue);
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }, []);

  const trackMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      if (process.env.NODE_ENV === 'development' && localStorage.getItem('debug.performance') === 'true') {
        console.log('Memory Usage:', {
          used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)} MB`,
          total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)} MB`,
          limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)} MB`,
        });
      }
    }
  }, []);

  const optimizeImages = useCallback(() => {
    // Preload critical images
    const criticalImages = [
      '/icons/My Computer.ico',
      '/icons/Documents Folder.ico',
      '/icons/Recycle Bin with folder and document.ico',
    ];

    criticalImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    if (componentName) {
      performance.mark(`${componentName}-mount-start`);
    }

    // Initialize performance monitoring
    reportWebVitals();
    optimizeImages();

    // Track memory usage periodically in development (only if debug enabled)
    if (process.env.NODE_ENV === 'development' && localStorage.getItem('debug.performance') === 'true') {
      const memoryInterval = setInterval(trackMemoryUsage, 10000);
      return () => clearInterval(memoryInterval);
    }

    return () => {
      if (componentName) {
        performance.mark(`${componentName}-mount-end`);
        performance.measure(
          `${componentName}-mount`,
          `${componentName}-mount-start`,
          `${componentName}-mount-end`
        );
      }
    };
  }, [componentName, reportWebVitals, optimizeImages, trackMemoryUsage]);

  return {
    measurePerformance,
    trackMemoryUsage,
    reportWebVitals,
  };
}; 