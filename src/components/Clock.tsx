import React, { useState, useEffect, useRef } from 'react';
import { DateTimeDialog } from './DateTimeDialog';
import { useGlobalDialog } from '../hooks/useGlobalDialog';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [dialogPos, setDialogPos] = useState<{ left: number; top: number; bottom: number } | null>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const { activeDialog, openDialog, closeDialog } = useGlobalDialog();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDay = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'short' });
  };

  const handleClockClick = () => {
    if (clockRef.current) {
      const rect = clockRef.current.getBoundingClientRect();
      setDialogPos({
        left: window.innerWidth, // align right edge of dialog to window
        top: rect.top,
        bottom: rect.bottom
      });
    }
    openDialog('datetime');
  };

  return (
    <>
      <div 
        ref={clockRef}
        className="bg-gray-300 border border-gray-400 text-xs leading-tight muted cursor-default text-center flex items-center justify-center select-none"
        style={{ 
          borderStyle: 'inset',
          fontSize: '11px',
          width: '64px',
          height: '22px',
          padding: 0,
          margin: 0
        }}
        title={formatDay(time) + ' ' + formatTime(time)}
        onClick={handleClockClick}
      >
        {formatDay(time)} {formatTime(time)}
      </div>
      {activeDialog === 'datetime' && dialogPos && (
        <DateTimeDialog 
          date={time} 
          onClose={() => closeDialog()} 
          position={dialogPos}
        />
      )}
    </>
  );
};
