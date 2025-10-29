import type React from 'react';

import { useState } from 'react';

interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  ticks?: number[];
  onChange?: (value: number) => void;
}

export function RangeSlider({
  min = 100,
  max = 500,
  step = 1,
  ticks = [100, 200, 300, 400, 500],
  onChange,
}: RangeSliderProps) {
  const [value, setValue] = useState(125);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleTickClick = (tickValue: number) => {
    setValue(tickValue);
    onChange?.(tickValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className='flex flex-col items-center justify-center  gap-10'>
      <div className='w-full '>
        <div className='relative py-4'>
          <div className='absolute top-1/2 left-0 w-full h-[0.63rem] bg-[rgba(255,255,255,0.30)] rounded-full  -translate-y-1/2 opacity-50 border-2 border-white' />

          <div
            className='absolute top-1/2 left-0 h-[0.6rem] bg-white rounded-full transition-all -translate-y-1/2'
            style={{ width: `${percentage}%` }}
          />

          <div className='relative flex justify-between px-0'>
            {ticks.map((tick, index) => (
              <div key={index} className='flex flex-col items-center'>
                <div
                  className='w-[1rem] h-[1rem] bg-white rounded-full relative z-10 cursor-pointer hover:scale-110 transition-transform'
                  onClick={() => handleTickClick(tick)}
                />
              </div>
            ))}
          </div>

          <input
            type='range'
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className='absolute top-1/2 left-0 w-full h-full opacity-0 cursor-pointer z-20 -translate-y-1/2'
            style={{
              WebkitAppearance: 'none',
              appearance: 'none',
            }}
          />
        </div>

        <div className='flex justify-between px-0'>
          {ticks.map((tick, index) => (
            <div
              key={index}
              className='text-white text-sm font-medium hover:cursor-pointer'
              onClick={() => setValue(tick)}
            >
              {tick}
            </div>
          ))}
        </div>
      </div>

      <div className='text-white text-[3rem] font-[600] leading-[3.75rem]'>
        {value}
      </div>
    </div>
  );
}
