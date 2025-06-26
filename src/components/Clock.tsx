
import React, { useState, useEffect } from 'react';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit'
    });
  };

  return (
    <div 
      className="bg-gray-200 border border-gray-400 px-1 py-1 text-xs leading-tight cursor-default text-center min-w-0"
      style={{ 
        borderStyle: 'inset',
        fontSize: '10px',
        width: '50px'
      }}
      title={`${formatTime(time)} ${formatDate(time)}`}
    >
      <div className="truncate">{formatTime(time)}</div>
      <div className="truncate">{formatDate(time)}</div>
    </div>
  );
};
