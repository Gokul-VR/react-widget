import { useEffect, useState } from 'react';

// interface DatePickerProps {
//   onDateSelect?: (date: Date) => void;
//   initialDate?: Date;
// }
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function DatePicker({}) {
  const [currentMonth, setCurrentMonth] = useState(8);
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [today, setToday] = useState({ year: 0, month: 0, date: 0 });

  useEffect(() => {
    const now = new Date();
    setToday({
      year: now.getFullYear(),
      month: now.getMonth(),
      date: now.getDate(),
    });
  }, []);
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = (getFirstDayOfMonth(currentMonth, currentYear) + 6) % 7;
    const daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentYear);
    const days = [];
    // Previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          className='flex h-[1.8rem] w-[1.8rem]  items-center justify-center rounded-full bg-[#3E3E3E]'
        >
          <span className='text-xs text-[#6E6E6E]'>{daysInPrevMonth - i}</span>
        </div>,
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate
        ? selectedDate.getFullYear() === currentYear &&
          selectedDate.getMonth() === currentMonth &&
          selectedDate.getDate() === day
        : false;

      const isToday =
        currentYear === today.year &&
        currentMonth === today.month &&
        day === today.date;

      days.push(
        <button
          key={day}
          onClick={() =>
            setSelectedDate(new Date(currentYear, currentMonth, day))
          }
          className={`flex h-[1.8rem] w-[1.8rem]  items-center justify-center rounded-full transition-all ${
            isSelected
              ? 'bg-[#6200EE]'
              : isToday
                ? 'border border-white bg-[#3E3E3E]'
                : 'bg-[#3E3E3E] hover:bg-[#4E4E4E]'
          }`}
        >
          <span
            className={`text-xs  ${
              isSelected || isToday ? 'text-white' : 'text-[#FFF9F9]'
            }`}
          >
            {day}
          </span>
        </button>,
      );
    }
    let nextDay = 1;
    let minimumTotal = firstDay >= 6 ? days.length + 4 : days.length + 6;
    while (days.length < minimumTotal) {
      days.push(
        <div
          key={`next-${nextDay}`}
          className='flex h-[1.8rem] w-[1.8rem] items-center justify-center rounded-full bg-[#3E3E3E]'
        >
          <span className='text-xs text-[#6E6E6E]'>{nextDay}</span>
        </div>,
      );
      nextDay++;
    }
    return days;
  };

  return (
    <div className='mx-auto w-[19.75rem]  rounded-[1rem] border border-white bg-[rgba(62,62,62,0.5)] p-3 shadow-[0_0_11.412px_2.282px_rgba(191,191,191,0.25)] backdrop-blur-sm '>
      <div className='mb-4 flex items-center justify-between'>
        <button
          onClick={handlePrevMonth}
          className='flex h-5 w-5 items-center justify-center rounded-full bg-[#3E3E3E] transition-colors hover:bg-[#4E4E4E]'
          aria-label='Previous month'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
          >
            <path
              d='M8.36278 3.59046C8.13995 3.36763 7.77867 3.36763 7.55584 3.59046L4.73157 6.41473C4.50875 6.63756 4.50875 6.99883 4.73157 7.22166L7.55584 10.0459C7.77867 10.2688 8.13995 10.2688 8.36278 10.0459C8.5856 9.8231 8.5856 9.46182 8.36278 9.239L5.94197 6.8182L8.36278 4.39739C8.5856 4.17457 8.5856 3.81329 8.36278 3.59046Z'
              fill='#FFF9F9'
            />
          </svg>
        </button>
        <span className='font-inter text-xs text-white sm:text-sm'>
          {MONTHS[currentMonth]} {currentYear}
        </span>
        <button
          onClick={handleNextMonth}
          className='flex h-5 w-5 items-center justify-center rounded-full bg-[#3E3E3E] transition-colors hover:bg-[#4E4E4E]'
          aria-label='Next month'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
          >
            <path
              d='M5.90187 10.0463C6.1247 10.2691 6.48598 10.2691 6.70881 10.0463L9.53307 7.22199C9.7559 6.99916 9.7559 6.63788 9.53307 6.41506L6.70881 3.59079C6.48598 3.36796 6.1247 3.36796 5.90187 3.59079C5.67904 3.81362 5.67904 4.17489 5.90187 4.39772L8.32267 6.81852L5.90187 9.23932C5.67904 9.46215 5.67904 9.82343 5.90187 10.0463Z'
              fill='#FFF9F9'
            />
          </svg>
        </button>
      </div>

      {/* Day Headers */}
      <div className='mb-1 grid grid-cols-7 gap-[0.7rem] justify-items-center '>
        {DAYS.map((day, index) => (
          <div
            key={index}
            className='flex h-5 w-5 items-center justify-center sm:h-6 sm:w-6'
          >
            <span className='font-inter text-[0.6rem] text-[#EEE] '>
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className='grid grid-cols-7 gap-2 justify-items-center'>{renderCalendar()}</div>
    </div>
  );
}
