// 책임분리

import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  parseISO,
  isBefore,
} from "date-fns";

interface WeekCalendarProps {
  createDate: string | null;
  selectedDate: string | null;
  onChange: (date: string) => void;
}

const WeekCalendar = ({
  createDate,
  selectedDate,
  onChange,
}: WeekCalendarProps) => {
  const createDateObject = createDate ? parseISO(createDate) : new Date();
  const weekStart = startOfWeek(createDateObject, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(createDateObject, { weekStartsOn: 0 });

  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const today = new Date();

  const isDisabled = (date: Date) => isBefore(date, today); // 오늘 이전은 비활성화

  return (
    <div className="grid grid-cols-7 gap-2 justify-between">
      {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
        <div key={day} className="text-center font-semibold text-gray-600">
          {day}
        </div>
      ))}

      {weekDays.map((day) => {
        const dateFormatted = format(day, "yyyy-MM-dd");
        const selected = selectedDate === dateFormatted;
        const disabled = isDisabled(day);

        return (
          <button
            key={dateFormatted}
            onClick={() => onChange(dateFormatted)}
            disabled={disabled}
            className={`rounded-full w-10 h-10 mx-auto transition-all
              ${selected ? "bg-yellow-300 text-black font-bold" : ""}
              ${disabled ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}
            `}
          >
            {format(day, "d")}
          </button>
        );
      })}
    </div>
  );
};

export default WeekCalendar;
