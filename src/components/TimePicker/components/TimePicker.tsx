import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type TimePickerProps = {
  startDate: string | null;
  endDate: string | null;
  setDateRange: (range: [string | null, string | null]) => void;
};

export const TimePicker: React.FC<TimePickerProps> = ({
  startDate,
  endDate,
  setDateRange,
}) => {
  const [localStart, setLocalStart] = useState<Date | null>(
    startDate ? new Date(startDate) : null,
  );
  const [localEnd, setLocalEnd] = useState<Date | null>(
    endDate ? new Date(endDate) : null,
  );

  const handleStartChange = (date: Date | null) => {
    setLocalStart(date);

    if (date) {
      const localISOString = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .slice(0, 16); // Обрезаем секунды и миллисекунды

      setDateRange([localISOString, endDate]);
    } else {
      setDateRange([null, endDate]);
    }
  };

  const handleEndChange = (date: Date | null) => {
    setLocalEnd(date);

    if (date) {
      const localISOString = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .slice(0, 16);

      setDateRange([startDate, localISOString]);
    } else {
      setDateRange([startDate, null]);
    }
  };

  const clearDates = () => {
    setLocalStart(null);
    setLocalEnd(null);
    setDateRange([null, null]);
  };

  return (
    <div className="flex items-center gap-4">
      <DatePicker
        selected={localStart}
        onChange={handleStartChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={1}
        dateFormat="yyyy-MM-dd HH:mm"
        placeholderText="Начало"
        className="custom-datepicker"
        popperPlacement="bottom-end"
      />
      <span className="text-2xl font-medium text-surface-400">—</span>
      <DatePicker
        selected={localEnd}
        onChange={handleEndChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={1}
        dateFormat="yyyy-MM-dd HH:mm"
        placeholderText="Конец"
        className="custom-datepicker"
        popperPlacement="bottom-end"
      />
      <button
        onClick={clearDates}
        style={{ cursor: 'pointer', padding: '5px' }}
      >
        ❌ Очистить
      </button>

      <style>
        {`
          .custom-datepicker {
            width: 200px;
            height: 34px;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 14px;
          }

          .custom-datepicker:focus {
            border-color: #007bff;
            outline: none;
          }
        `}
      </style>
    </div>
  );
};
