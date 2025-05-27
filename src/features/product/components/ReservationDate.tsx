import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  isBefore,
  parse,
  startOfDay,
} from "date-fns";
import useCalendarData from "../hooks/useCalendar";
import CalendarHeader from "@/features/common/components/calendar/CalendarHeader";
import CalendarGrid from "@/features/common/components/calendar/CalendarGrid";
import TimeSelector from "@/features/common/components/calendar/TimeSelector";
import ConfirmButton from "@/features/common/components/calendar/ConfirmButton";

interface ReservationDateProps {
  studioId: number;
  onDateTimeSelect: (date: string | null, time: string | null) => void;
  onCloseModal: () => void;
}

const ReservationDate = ({
  studioId,
  onDateTimeSelect,
  onCloseModal,
}: ReservationDateProps) => {
  const today = startOfDay(new Date());
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { calendarData, loading, error } = useCalendarData(
    studioId,
    currentMonth
  );

  const isDayDisabled = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const calendarItem = calendarData.find(
      (item) => item.date === formattedDate
    );

    return isBefore(date, today) || calendarItem?.status === false;
  };

  const isTimeDisabled = (time: string) => {
    if (!selectedDate) return true;

    const selectedDateTime = parse(selectedDate, "yyyy-MM-dd", today);
    const [hour, minute] = time.split(":").map(Number);
    const selectedTime = new Date(selectedDateTime);
    selectedTime.setHours(hour, minute, 0);

    if (
      format(selectedDateTime, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
    ) {
      return isBefore(selectedTime, new Date());
    }

    return false;
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("날짜와 시간을 선택해주세요.");
      return;
    }
    onDateTimeSelect(selectedDate, selectedTime);
    onCloseModal();
  };

  if (loading) {
    return (
      <div className="aspect-3/4 max-w-custom w-full bg-white p-4 flex flex-col rounded-lg">
        로딩 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="aspect-3/4 max-w-custom w-full bg-white text-red-500 p-4 flex flex-col rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-[500px] max-h-[90%] p-4 flex flex-col pb-24">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrevious={() => setCurrentMonth(subMonths(currentMonth, 1))}
        onNext={() => setCurrentMonth(addMonths(currentMonth, 1))}
      />
      <CalendarGrid
        currentMonth={currentMonth}
        today={today}
        selectedDate={selectedDate}
        onDateClick={setSelectedDate}
        isDayDisabled={isDayDisabled}
      />
      <TimeSelector
        selectedDate={selectedDate || ""}
        calendarData={calendarData}
        selectedTime={selectedTime}
        onTimeClick={setSelectedTime}
        isTimeDisabled={isTimeDisabled}
      />
      <div className="mt-auto flex gap-2">
        <div className="flex w-1/2 ">
          <button
            onClick={onCloseModal}
            className=" flex-1 py-4 rounded-lg bg-gray-200 border border-gray-300"
          >
            닫기
          </button>
        </div>
        <ConfirmButton onConfirm={handleConfirm} />
      </div>
    </div>
  );
};

export default ReservationDate;
