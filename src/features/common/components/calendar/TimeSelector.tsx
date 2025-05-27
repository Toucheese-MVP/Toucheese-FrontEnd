import { CalendarDataItem } from "@/types/CalendarData.type";

interface TimeSelectorProps {
  selectedDate: string;
  calendarData: CalendarDataItem[];
  selectedTime: string | null;
  onTimeClick: (time: string) => void;
  isTimeDisabled: (time: string) => boolean;
}

const TimeSelector = ({
  selectedDate,
  calendarData,
  selectedTime,
  onTimeClick,
  isTimeDisabled,
}: TimeSelectorProps) => {
  const availableTimes =
    calendarData.find((item) => item.date === selectedDate)?.times || [];

  const morningTimes = availableTimes.filter(
    (time) => parseInt(time.split(":")[0]) < 12
  );
  const afternoonTimes = availableTimes.filter(
    (time) => parseInt(time.split(":")[0]) >= 12
  );

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-2">예약가능시간대</h3>
      {availableTimes.length === 0 ? (
        <p className="text-gray-500">예약날짜를 먼저 선택해주세요.</p>
      ) : (
        <div>
          {/* 오전 섹션 */}
          {morningTimes.length > 0 && (
            <div className="mb-4">
              <h4 className="text-md font-bold mb-2">오전</h4>
              <div className="flex gap-2 flex-wrap">
                {morningTimes.map((time) => (
                  <button
                    key={time}
                    className={`min-w-20 text-center px-4 py-2 rounded-md cursor-pointer border border-gray-100 ${
                      selectedTime === time
                        ? "bg-yellow-400 text-black"
                        : "bg-white"
                    } ${
                      isTimeDisabled(time)
                        ? "cursor-not-allowed bg-gray-300 text-gray-200"
                        : "bg-white"
                    }`}
                    onClick={() => !isTimeDisabled(time) && onTimeClick(time)}
                    disabled={isTimeDisabled(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 오후 섹션 */}
          {afternoonTimes.length > 0 && (
            <div>
              <h4 className="text-md font-bold mb-2">오후</h4>
              <div className="flex gap-2 flex-wrap">
                {afternoonTimes.map((time) => (
                  <button
                    key={time}
                    className={`min-w-20 text-center px-4 py-2 rounded-md cursor-pointer border border-gray-100 ${
                      selectedTime === time
                        ? "bg-yellow-400 text-black"
                        : "bg-white"
                    } ${
                      isTimeDisabled(time)
                        ? "cursor-not-allowed bg-gray-300 text-gray-200"
                        : "bg-white"
                    }`}
                    onClick={() => !isTimeDisabled(time) && onTimeClick(time)}
                    disabled={isTimeDisabled(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeSelector;
