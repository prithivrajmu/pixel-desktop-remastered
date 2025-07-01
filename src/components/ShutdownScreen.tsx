import React from 'react';

interface ShutdownScreenProps {
  isVisible: boolean;
  onRestart: () => void;
}

export const ShutdownScreen: React.FC<ShutdownScreenProps> = ({
  isVisible,
  onRestart,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-orange-400 font-mono z-[200]">
      <div className="text-center space-y-4">
        <div className="text-xl md:text-2xl mb-8">Windows 95</div>
        <div className="text-base md:text-lg text-center px-4">It's now safe to turn off your computer.</div>
        <div className="mt-8">
          <button
            onClick={onRestart}
            className="text-sm text-orange-600 hover:text-orange-400 underline opacity-50 hover:opacity-75"
          >
            restart
          </button>
        </div>
      </div>
    </div>
  );
};
