
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
      weekday: 'short',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="bg-gray-200 border border-gray-400 px-2 py-1 text-xs leading-tight cursor-default"
      style={{ borderStyle: 'inset' }}
      title={formatDate(time)}
    >
      <div>{formatTime(time)}</div>
      <div className="text-xs opacity-75">{formatDate(time).split(',')[0]}</div>
      <div className="text-xs opacity-75">{formatDate(time).split(',')[1]?.trim()}</div>
    </div>
  );
};
