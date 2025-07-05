import React from 'react';
import { useScreenSize } from '../hooks/use-mobile';

interface DateTimeDialogProps {
  date: Date;
  onClose: () => void;
  position: { left: number; top: number; bottom: number };
}

// Helper functions for calendar
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const DateTimeDialog: React.FC<DateTimeDialogProps> = ({ date, onClose, position }) => {
  const screenSize = useScreenSize();
  const [tab, setTab] = React.useState<'datetime' | 'timezone'>('datetime');
  const [selectedDate, setSelectedDate] = React.useState(date);
  const [calendarMonth, setCalendarMonth] = React.useState(date.getMonth());
  const [calendarYear, setCalendarYear] = React.useState(date.getFullYear());

  // Analog clock calculations
  const hours = selectedDate.getHours() % 12;
  const minutes = selectedDate.getMinutes();
  const seconds = selectedDate.getSeconds();
  const hourAngle = (hours + minutes / 60) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = seconds * 6;

  // Calendar grid
  const daysInMonth = getDaysInMonth(calendarYear, calendarMonth);
  const firstDay = getFirstDayOfMonth(calendarYear, calendarMonth);
  const today = new Date();

  // Position relative to trigger, but render on top of taskbar
  const dialogWidth = screenSize.isMobile ? Math.min(350, window.innerWidth - 16) : 340;
  const dialogHeight = screenSize.isMobile ? Math.min(400, window.innerHeight - 100) : 320;
  
  let left, top;
  if (screenSize.isMobile) {
    // Center on mobile
    left = (window.innerWidth - dialogWidth) / 2;
    top = Math.max(8, (window.innerHeight - dialogHeight) / 2);
  } else {
    left = window.innerWidth - dialogWidth;
    top = Math.max(8, position.bottom - dialogHeight - 45);
  }

  return (
    <div
      className="fixed z-[110]"
      style={{ left, top, position: 'fixed' }}
      onClick={onClose}
    >
      <div
        className="bg-gray-200 border-2 border-gray-400 shadow-lg max-w-[98vw] z-[110]"
        style={{ 
          borderStyle: 'outset', 
          fontFamily: 'MS Sans Serif, sans-serif', 
          width: dialogWidth,
          maxHeight: screenSize.isMobile ? '90vh' : 'auto'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between bg-[#000080] text-white px-2 py-1 border-b border-gray-400" style={{ borderStyle: 'inset', fontSize: 13 }}>
          <span className="font-bold">Date/Time Properties</span>
          <button className="text-white px-1" onClick={onClose}>✕</button>
        </div>
        {/* Tabs */}
        <div className="flex border-b border-gray-400 bg-gray-100" style={{ borderStyle: 'inset', fontSize: 12 }}>
          <button className={`px-3 py-1 ${tab === 'datetime' ? 'bg-white font-bold border-t-2 border-l-2 border-r-2 border-gray-400' : ''}`} onClick={() => setTab('datetime')}>Date & Time</button>
          <button className={`px-3 py-1 ${tab === 'timezone' ? 'bg-white font-bold border-t-2 border-l-2 border-r-2 border-gray-400' : ''} text-gray-500`} disabled>Time Zone</button>
        </div>
        {/* Content */}
        <div className={`p-3 min-h-[180px] ${
          screenSize.isMobile ? 'flex flex-col gap-3' : 'flex gap-4'
        }`}>
          {/* Date group box */}
          <fieldset 
            className="border border-gray-400 p-2" 
            style={{ 
              borderStyle: 'inset', 
              minWidth: screenSize.isMobile ? 'auto' : 150, 
              position: 'relative',
              flex: screenSize.isMobile ? 'none' : '1'
            }}
          >
            <legend className="px-1 text-xs" style={{ color: '#222', fontWeight: 600, fontSize: 12, marginLeft: 8 }}>Date</legend>
            <div className="flex items-center mb-1">
              <select
                className="border border-gray-400 bg-white text-xs mr-1"
                style={{ borderStyle: 'inset' }}
                value={calendarMonth}
                onChange={e => setCalendarMonth(Number(e.target.value))}
              >
                {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
              </select>
              <input
                type="number"
                className="border border-gray-400 bg-white text-xs w-12 text-center"
                style={{ borderStyle: 'inset' }}
                value={calendarYear}
                onChange={e => setCalendarYear(Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {daysShort.map((d, i) => <div key={d + i} className="text-center text-xs font-bold">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {Array(firstDay).fill(null).map((_, i) => <div key={'empty'+i} />)}
              {Array(daysInMonth).fill(null).map((_, i) => {
                const day = i + 1;
                const isToday =
                  day === today.getDate() &&
                  calendarMonth === today.getMonth() &&
                  calendarYear === today.getFullYear();
                return (
                  <div
                    key={day}
                    className={`text-center text-xs px-0.5 py-0.5 rounded ${isToday ? 'bg-blue-300 font-bold' : ''}`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </fieldset>
          {/* Time group box */}
          <fieldset 
            className="border border-gray-400 p-2"
            style={{ 
              borderStyle: 'inset', 
              minWidth: screenSize.isMobile ? 'auto' : 150, 
              position: 'relative',
              flex: screenSize.isMobile ? 'none' : '1'
            }}
          >
            <legend className="px-1 text-xs" style={{ color: '#222', fontWeight: 600, fontSize: 12, marginLeft: 8 }}>Time</legend>
            <div className="flex flex-col items-center justify-center">
              <svg 
                width={screenSize.isMobile ? 90 : 110} 
                height={screenSize.isMobile ? 90 : 110} 
                viewBox="0 0 100 100" 
                className="mb-2"
              >
                <circle cx={50} cy={50} r={48} fill="#e5e7eb" stroke="#888" strokeWidth={2} />
                {/* Hour marks */}
                {Array(12).fill(null).map((_, i) => {
                  const angle = (i * 30) * Math.PI / 180;
                  const x1 = 50 + 40 * Math.sin(angle);
                  const y1 = 50 - 40 * Math.cos(angle);
                  const x2 = 50 + 45 * Math.sin(angle);
                  const y2 = 50 - 45 * Math.cos(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#008080" strokeWidth={2} />;
                })}
                {/* Hour hand */}
                <line x1={50} y1={50} x2={50 + 22 * Math.sin(hourAngle * Math.PI / 180)} y2={50 - 22 * Math.cos(hourAngle * Math.PI / 180)} stroke="#333" strokeWidth={4} />
                {/* Minute hand */}
                <line x1={50} y1={50} x2={50 + 32 * Math.sin(minuteAngle * Math.PI / 180)} y2={50 - 32 * Math.cos(minuteAngle * Math.PI / 180)} stroke="#333" strokeWidth={2} />
                {/* Second hand */}
                <line x1={50} y1={50} x2={50 + 36 * Math.sin(secondAngle * Math.PI / 180)} y2={50 - 36 * Math.cos(secondAngle * Math.PI / 180)} stroke="#c00" strokeWidth={1} />
                {/* Center dot */}
                <circle cx={50} cy={50} r={2.5} fill="#333" />
              </svg>
              <div className="border border-gray-400 bg-white px-2 py-1 text-xs mb-2" style={{ borderStyle: 'inset', minWidth: 90, textAlign: 'center' }}>
                {selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
              </div>
            </div>
          </fieldset>
        </div>
        {/* Timezone and info */}
        <div className="px-4 pb-2 text-xs text-gray-700">Current time zone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
        {/* Buttons */}
        <div className="flex justify-end gap-2 px-4 pb-3">
          <button className="px-4 py-1 bg-gray-300 border-2 border-gray-400 text-sm hover:bg-gray-200" style={{ borderStyle: 'outset' }} onClick={onClose}>OK</button>
          <button className="px-4 py-1 bg-gray-300 border-2 border-gray-400 text-sm hover:bg-gray-200" style={{ borderStyle: 'outset' }} onClick={onClose}>Cancel</button>
          <button className="px-4 py-1 bg-gray-300 border-2 border-gray-400 text-sm text-gray-500" style={{ borderStyle: 'outset' }} disabled>Apply</button>
        </div>
      </div>
    </div>
  );
}; 