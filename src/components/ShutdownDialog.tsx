
import React from 'react';

interface ShutdownDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ShutdownDialog: React.FC<ShutdownDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-gray-300 border-2 border-gray-400 p-4 shadow-lg min-w-80" style={{ borderStyle: 'outset' }}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="text-2xl">⚠️</div>
          <div>
            <div className="font-bold text-sm mb-1">Shut Down Windows</div>
            <div className="text-sm">
              Are you sure you want to shut down your computer?
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-1 bg-gray-300 border-2 border-gray-400 text-sm hover:bg-gray-200"
            style={{ borderStyle: 'outset' }}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 bg-gray-300 border-2 border-gray-400 text-sm hover:bg-gray-200"
            style={{ borderStyle: 'outset' }}
            onClick={onConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
