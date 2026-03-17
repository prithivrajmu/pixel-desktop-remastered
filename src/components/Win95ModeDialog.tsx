import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Monitor } from 'lucide-react';

const STORAGE_KEY = 'win95-mode-preference';
const STORAGE_KEY_SHOWN = 'win95-dialog-shown';

interface Win95ModeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectMode: (mode: 'modern' | 'win95') => void;
}

export const Win95ModeDialog: React.FC<Win95ModeDialogProps> = ({
  open,
  onOpenChange,
  onSelectMode,
}) => {
  const handleYes = () => {
    localStorage.setItem(STORAGE_KEY, 'win95');
    onSelectMode('win95');
    onOpenChange(false);
  };

  const handleNo = () => {
    localStorage.setItem(STORAGE_KEY, 'modern');
    onSelectMode('modern');
    onOpenChange(false);
  };

  const handleLater = () => {
    localStorage.setItem(STORAGE_KEY_SHOWN, 'true');
    onSelectMode('modern');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Monitor className="w-6 h-6 text-blue-600" />
            <DialogTitle>Experience Windows 95 Mode?</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            Would you like to visit the nostalgic Windows 95 style experience?
            <br />
            <br />
            You can always switch between modes using the toggle button.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <button
            onClick={handleYes}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Yes, Take Me There
          </button>
          <button
            onClick={handleNo}
            className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Stay Here
          </button>
          <button
            onClick={handleLater}
            className="w-full sm:w-auto px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
          >
            Maybe Later
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const useWin95ModePreference = () => {
  const [mode, setMode] = useState<'modern' | 'win95'>('modern');
  const [showDialog, setShowDialog] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const preference = localStorage.getItem(STORAGE_KEY) as 'modern' | 'win95' | null;
    const dialogShown = localStorage.getItem(STORAGE_KEY_SHOWN) === 'true';

    if (preference) {
      setMode(preference);
      setIsInitialized(true);
    } else if (!dialogShown) {
      // First visit - show dialog
      setShowDialog(true);
      setMode('modern'); // Default to modern
      setIsInitialized(true);
    } else {
      // Dialog shown before but no preference saved
      setMode('modern');
      setIsInitialized(true);
    }
  }, []);

  const handleModeSelect = (selectedMode: 'modern' | 'win95') => {
    setMode(selectedMode);
    localStorage.setItem(STORAGE_KEY, selectedMode);
    localStorage.setItem(STORAGE_KEY_SHOWN, 'true');
  };

  const toggleMode = () => {
    const newMode = mode === 'modern' ? 'win95' : 'modern';
    setMode(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  return {
    mode,
    showDialog,
    setShowDialog,
    handleModeSelect,
    toggleMode,
    isInitialized,
  };
};
