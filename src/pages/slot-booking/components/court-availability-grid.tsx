import type { DailySlotResponse } from '@/services/branch/branch.api';
import type { SelectedSlot } from './booking-panel';

export interface Court {
  id: number;
  name: string;
  type: string;
}

interface CourtAvailabilityGridProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  selectedSlots: SelectedSlot[];
  onSlotClick: (court: Court, timeStr: string, price: number, isPeak: boolean) => void;
  courtSchedules: Record<number, DailySlotResponse[]>;
  courts: Court[];
  timeSlots: string[];
}

export default function CourtAvailabilityGrid({
  selectedDate,
  onDateChange,
  selectedSlots,
  onSlotClick,
  courtSchedules,
  courts,
  timeSlots,
}: CourtAvailabilityGridProps) {

  // Generate 8 days starting from today
  const dates = getNext8Days();

  // Peak times helper
  const isPeakHour = (time: string) => {
    return ['09:00', '09:30', '10:00', '10:30'].includes(time);
  };

  // Check if a slot is selected
  const isSelected = (courtId: number, timeStr: string) => {
    return selectedSlots.some(s => s.courtId === courtId && s.startTime === timeStr && s.date === selectedDate);
  };

  return (
    <div className="space-y-6">
      {/* Date Selector */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
        {dates.map((d) => {
          const active = d.dateStr === selectedDate;
          return (
            <button
              key={d.dateStr}
              onClick={() => onDateChange(d.dateStr)}
              className={`flex flex-col items-center justify-center min-w-[76px] h-[76px] rounded-2xl border transition-all duration-200 cursor-pointer ${
                active
                  ? 'bg-primary text-white border-primary shadow-lg scale-105'
                  : 'bg-white text-on-surface border-outline-variant/40 hover:border-primary/50'
              }`}
            >
              <span className={`text-[11px] font-bold tracking-wider uppercase ${active ? 'text-white/80' : 'text-on-surface-variant'}`}>
                {d.dayName}
              </span>
              <span className="text-xl font-bold mt-0.5">
                {d.dayNum}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid Container */}
      <div className="bg-white border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto no-scrollbar relative">
          <div className="min-w-max">
            {/* Grid Header */}
            <div className="flex border-b border-outline-variant/30">
              {/* Sticky Top-Left Corner */}
              <div className="sticky left-0 z-30 bg-white border-r border-outline-variant/30 w-[180px] h-16 flex items-center px-4">
                <span className="font-bold text-on-surface text-body-md">Courts</span>
              </div>

              {/* Time Headers */}
              {timeSlots.map((time) => {
                const peak = isPeakHour(time);
                return (
                  <div
                    key={time}
                    className="w-[96px] h-16 flex flex-col items-center justify-center shrink-0 border-r border-outline-variant/10 select-none"
                  >
                    <span className="font-bold text-on-surface text-body-sm">{time}</span>
                    {peak && (
                      <span className="text-[10px] font-bold text-[#008096] tracking-widest mt-0.5 uppercase">
                        PEAK
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Grid Body */}
            <div className="divide-y divide-outline-variant/30">
              {courts.map((court) => {
                const schedule = courtSchedules[court.id] || [];

                return (
                  <div key={court.id} className="flex">
                    {/* Sticky Court Info Column */}
                    <div className="sticky left-0 z-20 bg-white border-r border-outline-variant/30 w-[180px] h-20 flex flex-col justify-center px-4 shrink-0">
                      <span className="font-bold text-on-surface text-body-md">{court.name}</span>
                      <span className="text-[10px] font-medium text-on-surface-variant/70 tracking-wider uppercase mt-0.5">
                        {court.type}
                      </span>
                    </div>

                    {/* Time Cells */}
                    {timeSlots.map((time) => {
                      // Find API schedule slot
                      const timeWithSec = `${time}:00`;
                      const apiSlot = schedule.find(s => s.startTime === timeWithSec);
                      
                      // Status and pricing details
                      const status = apiSlot ? apiSlot.status : 'AVAILABLE';
                      const price = apiSlot ? apiSlot.price : (isPeakHour(time) ? 22.50 : 18.75);
                      const selected = isSelected(court.id, time);

                      let cellStyle = '';
                      let content = null;
                      let disabled = false;

                      if (status === 'EXPIRED') {
                        cellStyle = 'bg-surface-container/20 border-outline-variant/5 text-on-surface-variant/20 cursor-not-allowed';
                        disabled = true;
                      } else if (status === 'BOOKED') {
                        cellStyle = 'bg-surface-container-high/40 border-outline-variant/10 text-on-surface-variant/30 cursor-not-allowed';
                        disabled = true;
                      } else {
                        // AVAILABLE
                        if (selected) {
                          cellStyle = 'primary-gradient text-white border-primary/20 shadow-inner scale-[0.98]';
                          content = (
                            <span className="material-symbols-outlined text-white text-[20px] font-bold animate-scale-in">
                              check
                            </span>
                          );
                        } else {
                          cellStyle = 'bg-white hover:bg-primary/5 hover:border-primary/20 border-outline-variant/10 cursor-pointer';
                        }
                      }

                      return (
                        <div
                          key={time}
                          className="w-[96px] h-20 p-1.5 shrink-0 border-r border-outline-variant/10 flex items-center justify-center"
                        >
                          <button
                            disabled={disabled}
                            onClick={() => onSlotClick(court, time, price, isPeakHour(time))}
                            className={`w-full h-full rounded-xl border flex items-center justify-center transition-all duration-150 select-none ${cellStyle}`}
                          >
                            {content}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-surface-container-lowest border-t border-outline-variant/30 px-6 py-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-on-surface-variant">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-outline-variant/40 bg-white"></div>
            <span>Available (30m)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded primary-gradient"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-surface-container-high border border-outline-variant/20"></div>
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-[#008096]/30 bg-[#008096]/10 flex items-center justify-center">
              <span className="text-[9px] font-bold text-[#008096]">Peak</span>
            </div>
            <span>Peak Hour (+20%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getNext8Days() {
  const dates = [];
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  for (let i = 0; i < 8; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dayName = daysOfWeek[d.getDay()];
    const dayNum = d.getDate();
    const formattedDate = d.toISOString().split('T')[0]; // YYYY-MM-DD
    dates.push({
      dateStr: formattedDate,
      dayName,
      dayNum,
    });
  }
  return dates;
}
