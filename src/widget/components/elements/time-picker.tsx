'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';

interface TimePickerProps {
  onConfirm?: (time: {
    hours: number;
    minutes: number;
    period: 'AM' | 'PM';
  }) => void;
  onCancel?: () => void;
  defaultHours?: number;
  defaultMinutes?: number;
  defaultPeriod?: 'AM' | 'PM';
}

export function TimePicker({
  onConfirm,
  onCancel,
  defaultHours = 7,
  defaultMinutes = 0,
  defaultPeriod = 'AM',
}: TimePickerProps) {
  const [hours, setHours] = useState(defaultHours);
  const [minutes, setMinutes] = useState(defaultMinutes);
  const [period, setPeriod] = useState<'AM' | 'PM'>(defaultPeriod);
  const [mode, setMode] = useState<'hours' | 'minutes'>('hours');
  const [isDragging, setIsDragging] = useState(false);
  const clockRef = useRef<HTMLDivElement>(null);

  const handleClockInteraction = (e: React.MouseEvent | MouseEvent) => {
    if (!clockRef.current) return;

    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    let angle = Math.atan2(y, x) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360;

    if (mode === 'hours') {
      const hour = Math.round(angle / 30);
      setHours(hour === 0 ? 12 : hour);
    } else {
      const minute = Math.round(angle / 6);
      setMinutes(minute === 60 ? 0 : minute);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleClockInteraction(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleClockInteraction(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const getClockHandAngle = () => {
    if (mode === 'hours') {
      return (hours % 12) * 30 - 90;
    } else {
      return minutes * 6 - 90;
    }
  };

  const getClockHandPosition = () => {
    const angle = getClockHandAngle();
    const radius = 75;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  const handleConfirm = () => {
    onConfirm?.({ hours, minutes, period });
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const position = getClockHandPosition();

  return (
    <div className='w-[15rem] h-fit bg-[#2a2a2a] rounded-lg p-3 select-none'>
      {/* <h3 className='text-[0.6rem] font-medium text-gray-400 mb-2 tracking-wider'>
        SELECT TIME
      </h3> */}

      <div className='flex items-center gap-2 mb-4 ml-4'>
        <button
          onClick={() => setMode('hours')}
          className={`w-[3.02656rem] h-[3.02656rem] rounded-lg flex items-center justify-center text-[1.9rem] font-[400] transition-colors ${
            mode === 'hours'
              ? 'bg-[#3a3a3a] text-white'
              : 'bg-transparent text-gray-500 hover:bg-[#333]'
          }`}
        >
          {hours}
        </button>
        <span className='text-4xl text-gray-500 font-light'>:</span>
        <button
          onClick={() => setMode('minutes')}
          className={`w-[3.02656rem] h-[3.02656rem] rounded-lg flex items-center justify-center text-[1.9rem] font-[400] transition-colors  ${
            mode === 'minutes'
              ? 'bg-[#3a3a3a] text-white'
              : 'bg-transparent text-gray-500 hover:bg-[#333]'
          }`}
        >
          {minutes.toString().padStart(2, '0')}
        </button>

        {/* AM/PM Toggle */}
        <div className='ml-auto flex flex-col border border-gray-600 rounded-md overflow-hidden'>
          <button
            onClick={() => setPeriod('AM')}
            className={`px-3 py-1 text-sm transition-colors font-[600] ${
              period === 'AM'
                ? 'bg-[#3a3a3a] text-[#9041ff]'
                : 'bg-transparent text-gray-500 hover:bg-[#333]'
            }`}
          >
            AM
          </button>
          <div className='h-px bg-gray-600' />
          <button
            onClick={() => setPeriod('PM')}
            className={`px-3 py-1 text-sm transition-colors font-[600] ${
              period === 'PM'
                ? 'bg-[#3a3a3a] text-[#9041ff]'
                : 'bg-transparent text-gray-500 hover:bg-[#333]'
            }`}
          >
            PM
          </button>
        </div>
      </div>

      {/* Clock Face */}
      <div className='relative w-[11.7rem] h-[11.7rem] mx-auto '>
        <div
          ref={clockRef}
          onMouseDown={handleMouseDown}
          className='absolute inset-0 rounded-full bg-[#1a1a1a] cursor-pointer'
        >
          {/* Clock Numbers */}
          {mode === 'hours'
            ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const radius = 75;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <div
                    key={num}
                    className='absolute text-gray-400 text-sm, font-light'
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {num}
                  </div>
                );
              })
            : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((num, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const radius = 75;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <div
                    key={num}
                    className='absolute text-gray-400 text-sm, font-light'
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {num.toString().padStart(2, '0')}
                  </div>
                );
              })}

          {/* Clock Hand */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div
              className='absolute w-1 bg-[#6200EE] origin-bottom'
              style={{
                height: '60px',
                transform: `rotate(${getClockHandAngle() + 90}deg)`,
                bottom: '50%',
              }}
            />
            {/* Center Dot */}
            <div className='absolute w-2 h-2 bg-[#6200EE] rounded-full' />
            {/* Handle */}
            <div
              className='absolute w-8 h-8 bg-[#6200EE] rounded-full flex items-center justify-center text-white font-medium cursor-grab active:cursor-grabbing'
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
              }}
            >
              {mode === 'hours' ? hours : minutes}
            </div>
          </div>
        </div>
      </div>

      {/* <div className='flex items-center justify-between'>
        <button className='text-gray-400 hover:text-white hover:bg-[#3a3a3a]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='13'
            height='13'
            viewBox='0 0 13 13'
            fill='none'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M10.0884 2.52246H2.01764C1.46277 2.52246 1.01383 2.97644 1.01383 3.53131L1.00879 8.57554C1.00879 9.13041 1.46277 9.58439 2.01764 9.58439H10.0884C10.6433 9.58439 11.0973 9.13041 11.0973 8.57554V3.53131C11.0973 2.97644 10.6433 2.52246 10.0884 2.52246ZM10.0884 3.53131V8.57554H2.01764V3.53131H10.0884ZM6.55745 4.03573H5.5486V5.04458H6.55745V4.03573ZM5.5486 5.549H6.55745V6.55785H5.5486V5.549ZM5.04418 4.03573H4.03533V5.04458H5.04418V4.03573ZM4.03533 5.549H5.04418V6.55785H4.03533V5.549ZM3.53091 5.549H2.52206V6.55785H3.53091V5.549ZM2.52206 4.03573H3.53091V5.04458H2.52206V4.03573ZM8.07072 7.06227H4.03533V8.07112H8.07072V7.06227ZM7.06187 5.549H8.07072V6.55785H7.06187V5.549ZM8.07072 4.03573H7.06187V5.04458H8.07072V4.03573ZM8.57514 5.549H9.58399V6.55785H8.57514V5.549ZM9.58399 4.03573H8.57514V5.04458H9.58399V4.03573Z'
              fill='white'
              fill-opacity='0.6'
            />
          </svg>
        </button>
        <div className='flex gap-4'>
          <button
            onClick={handleCancel}
            className='text-gray-300 hover:text-white hover:bg-[#3a3a3a] text-[0.8rem]'
          >
            CANCEL
          </button>
          <button
            onClick={handleConfirm}
            className='text-gray-300 hover:text-white hover:bg-[#3a3a3a] text-[0.8rem]'
          >
            OK
          </button>
        </div>
      </div> */}
    </div>
  );
}
