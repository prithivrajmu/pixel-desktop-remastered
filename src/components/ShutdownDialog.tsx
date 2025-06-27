import React, { useState } from 'react';

interface ShutdownDialogProps {
  isOpen: boolean;
  onConfirm: (action: 'shutdown' | 'restart' | 'msdos' | 'logoff') => void;
  onCancel: () => void;
}

export const ShutdownDialog: React.FC<ShutdownDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const [selectedAction, setSelectedAction] = useState<'shutdown' | 'restart' | 'msdos' | 'logoff'>('shutdown');

  const radioClass = "flex items-center space-x-2 mb-1 text-sm";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-gray-300 border-2 border-gray-400 p-4 shadow-lg" style={{ borderStyle: 'outset', minWidth: 340 }}>
        {/* Title */}
        <div className="font-bold text-sm mb-3" style={{ fontFamily: 'MS Sans Serif, sans-serif' }}>
          Are you sure you want to:
        </div>

        {/* Radio options */}
        <div className="pl-4 mb-4">
          <label className={radioClass}>
            <input
              type="radio"
              name="shutdown-action"
              checked={selectedAction === 'shutdown'}
              onChange={() => setSelectedAction('shutdown')}
            />
            Shut down the computer?
          </label>
          <label className={radioClass}>
            <input
              type="radio"
              name="shutdown-action"
              checked={selectedAction === 'restart'}
              onChange={() => setSelectedAction('restart')}
            />
            Restart the computer?
          </label>
          <label className={radioClass}>
            <input
              type="radio"
              name="shutdown-action"
              checked={selectedAction === 'msdos'}
              onChange={() => setSelectedAction('msdos')}
            />
            Restart the computer in MS-DOS mode?
          </label>
          <label className={radioClass}>
            <input
              type="radio"
              name="shutdown-action"
              checked={selectedAction === 'logoff'}
              onChange={() => setSelectedAction('logoff')}
            />
            Close all programs and log on as a different user?
          </label>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="px-6 py-1 bg-gray-300 border-2 border-gray-400 text-sm hover:bg-gray-200"
            style={{ borderStyle: 'outset' }}
            onClick={() => onConfirm(selectedAction)}
          >
            Yes
          </button>
          <button
            className="px-6 py-1 bg-gray-300 border-2 border-gray-400 text-sm hover:bg-gray-200"
            style={{ borderStyle: 'outset' }}
            onClick={onCancel}
          >
            No
          </button>
          <button
            className="px-6 py-1 bg-gray-300 border-2 border-gray-400 text-sm hover:bg-gray-200"
            style={{ borderStyle: 'outset' }}
            onClick={onCancel}
          >
            Help
          </button>
        </div>
      </div>
    </div>
  );
};
