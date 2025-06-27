import { lazy, Suspense, ComponentType } from 'react';

// Loading fallback component
const LoadingFallback = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center h-full bg-[#c0c0c0]" style={{ fontFamily: '"MS Sans Serif", sans-serif' }}>
    <div className="text-center">
      <div className="text-sm mb-2">Loading {name}...</div>
      <div className="w-6 h-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  </div>
);

// Lazy load application components
export const LazyMyComputer = lazy(() => 
  import('./applications/MyComputer').then(module => ({ default: module.MyComputer }))
);

export const LazyMyDocuments = lazy(() => 
  import('./applications/MyDocuments').then(module => ({ default: module.MyDocuments }))
);

export const LazyInternetExplorer = lazy(() => 
  import('./applications/InternetExplorer').then(module => ({ default: module.InternetExplorer }))
);

export const LazyRecycleBin = lazy(() => 
  import('./applications/RecycleBin').then(module => ({ default: module.RecycleBin }))
);

export const LazyWelcome = lazy(() => 
  import('./applications/Welcome').then(module => ({ default: module.Welcome }))
);

export const LazyContact = lazy(() => 
  import('./applications/Contact').then(module => ({ default: module.Contact }))
);

// Lazy load dialog components
export const LazyDisplayProperties = lazy(() => 
  import('./DisplayProperties').then(module => ({ default: module.DisplayProperties }))
);

export const LazyPropertiesDialog = lazy(() => 
  import('./PropertiesDialog').then(module => ({ default: module.PropertiesDialog }))
);

export const LazyShutdownDialog = lazy(() => 
  import('./ShutdownDialog').then(module => ({ default: module.ShutdownDialog }))
);

export const LazyShutdownScreen = lazy(() => 
  import('./ShutdownScreen').then(module => ({ default: module.ShutdownScreen }))
);

export const LazyWindowSwitcher = lazy(() => 
  import('./WindowSwitcher').then(module => ({ default: module.WindowSwitcher }))
);

// Higher-order component to wrap lazy components with Suspense
export const withLazyLoading = <P extends object>(
  LazyComponent: ComponentType<P>,
  componentName: string
) => {
  return (props: P) => (
    <Suspense fallback={<LoadingFallback name={componentName} />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Pre-wrapped components ready to use
export const MyComputer = withLazyLoading(LazyMyComputer, 'My Computer');
export const MyDocuments = withLazyLoading(LazyMyDocuments, 'My Documents');
export const InternetExplorer = withLazyLoading(LazyInternetExplorer, 'Internet Explorer');
export const RecycleBin = withLazyLoading(LazyRecycleBin, 'Recycle Bin');
export const Welcome = withLazyLoading(LazyWelcome, 'Welcome');
export const Contact = withLazyLoading(LazyContact, 'Contact');
export const DisplayProperties = withLazyLoading(LazyDisplayProperties, 'Display Properties');
export const PropertiesDialog = withLazyLoading(LazyPropertiesDialog, 'Properties');
export const ShutdownDialog = withLazyLoading(LazyShutdownDialog, 'Shutdown');
export const ShutdownScreen = withLazyLoading(LazyShutdownScreen, 'Shutdown Screen');
export const WindowSwitcher = withLazyLoading(LazyWindowSwitcher, 'Window Switcher'); 