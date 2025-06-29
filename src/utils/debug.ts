// Debug utilities for development
export const debug = {
  // Enable all debugging
  enableAll: () => {
    localStorage.setItem('debug.performance', 'true');
    localStorage.setItem('debug.sounds', 'true');
    console.log('🔧 All debugging enabled. Refresh page to see debug logs.');
  },

  // Disable all debugging
  disableAll: () => {
    localStorage.removeItem('debug.performance');
    localStorage.removeItem('debug.sounds');
    console.log('🔇 All debugging disabled. Refresh page to stop debug logs.');
  },

  // Enable performance monitoring only
  enablePerformance: () => {
    localStorage.setItem('debug.performance', 'true');
    console.log('📊 Performance debugging enabled. Refresh page to see performance logs.');
  },

  // Enable sound debugging only
  enableSounds: () => {
    localStorage.setItem('debug.sounds', 'true');
    console.log('🔊 Sound debugging enabled. Refresh page to see sound logs.');
  },

  // Check current debug status
  status: () => {
    const performance = localStorage.getItem('debug.performance') === 'true';
    const sounds = localStorage.getItem('debug.sounds') === 'true';
    
    console.log('🔍 Debug Status:', {
      performance: performance ? '✅ Enabled' : '❌ Disabled',
      sounds: sounds ? '✅ Enabled' : '❌ Disabled'
    });
    
    return { performance, sounds };
  },

  // Helper to show available debug commands
  help: () => {
    console.log(`
🔧 Windows 95 Portfolio Debug Commands:

debug.enableAll()       - Enable all debugging
debug.disableAll()      - Disable all debugging
debug.enablePerformance() - Enable performance monitoring only
debug.enableSounds()    - Enable sound debugging only
debug.status()          - Show current debug status
debug.help()            - Show this help message

Performance metrics include:
- LCP (Largest Contentful Paint)
- FID (First Input Delay) 
- CLS (Cumulative Layout Shift)
- Memory usage tracking
- Component load times

Note: Refresh the page after enabling/disabling debug modes.
    `);
  }
};

// Make debug available globally in development
if (process.env.NODE_ENV === 'development') {
  (window as any).debug = debug;
  console.log('🔧 Debug utilities available! Type "debug.help()" for commands.');
} 