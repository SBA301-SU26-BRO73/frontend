import { useState, useEffect } from 'react';
import CourtAvailabilityGrid from './components/court-availability-grid';
import type { Court } from './components/court-availability-grid';
import BookingPanel from './components/booking-panel';
import type { SelectedSlot } from './components/booking-panel';
import { branchApi } from '@/services/branch/branch.api';
import type { DailySlotResponse } from '@/services/branch/branch.api';

const COURTS: Court[] = [
  { id: 1, name: 'Court 01', type: 'INDOOR • HARD' },
  { id: 2, name: 'Court 02', type: 'INDOOR • HARD' },
  { id: 3, name: 'Court 03', type: 'OUTDOOR • GRASS' },
];

const EXTENDED_TIMESLOTS = [
  '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
];

export default function SlotBookingPage() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [courtSchedules, setCourtSchedules] = useState<Record<number, DailySlotResponse[]>>({});
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([
    // Pre-populate to match the screenshot
    {
      courtId: 1,
      courtName: 'Court 01',
      startTime: '09:00',
      endTime: '09:30',
      price: 22.50,
      date: todayStr,
    },
    {
      courtId: 1,
      courtName: 'Court 01',
      startTime: '09:30',
      endTime: '10:00',
      price: 22.50,
      date: todayStr,
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [venueName] = useState<string>('Downtown Sports Hub');

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      const newSchedules: Record<number, DailySlotResponse[]> = {};

      try {
        await Promise.all(
          COURTS.map(async (court) => {
            try {
              // Try fetching from actual backend endpoint
              const data = await branchApi.getDailyCourtSchedule(court.id, selectedDate);
              if (data && Array.isArray(data)) {
                newSchedules[court.id] = data;
              } else {
                newSchedules[court.id] = generateMockSchedule(court.id, selectedDate);
              }
            } catch (err) {
              // Fallback to mock schedule if backend isn't running or endpoint doesn't exist
              newSchedules[court.id] = generateMockSchedule(court.id, selectedDate);
            }
          })
        );
        setCourtSchedules(newSchedules);
      } catch (err) {
        console.error('Error in fetching schedules:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, [selectedDate]);

  const handleSlotClick = (court: Court, timeStr: string, price: number) => {
    const [hh, mm] = timeStr.split(':').map(Number);
    let endH = hh;
    let endM = mm + 30;
    if (endM >= 60) {
      endH += 1;
      endM = 0;
    }
    const endTimeStr = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;

    const isAlreadySelected = selectedSlots.some(
      (s) => s.courtId === court.id && s.startTime === timeStr && s.date === selectedDate
    );

    if (isAlreadySelected) {
      setSelectedSlots(
        selectedSlots.filter(
          (s) => !(s.courtId === court.id && s.startTime === timeStr && s.date === selectedDate)
        )
      );
    } else {
      setSelectedSlots([
        ...selectedSlots,
        {
          courtId: court.id,
          courtName: court.name,
          startTime: timeStr,
          endTime: endTimeStr,
          price,
          date: selectedDate,
        },
      ]);
    }
  };

  const handleBook = () => {
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setSelectedSlots([]); // Clear selection on booking success
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 py-8 md:px-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-headline-lg font-bold text-on-surface">Court Availability</h1>
          <p className="text-on-surface-variant mt-1 text-body-md">Find and book your perfect match time.</p>
        </div>
        <div className="relative shrink-0">
          <div className="flex items-center gap-2 px-4 py-2 border border-outline-variant/60 rounded-xl bg-white text-on-surface text-label-md font-bold shadow-sm select-none cursor-pointer">
            <span>{venueName}</span>
            <span className="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-on-surface-variant font-medium text-body-md">Loading schedules...</span>
        </div>
      ) : (
        <CourtAvailabilityGrid
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          selectedSlots={selectedSlots}
          onSlotClick={handleSlotClick}
          courtSchedules={courtSchedules}
          courts={COURTS}
          timeSlots={EXTENDED_TIMESLOTS}
        />
      )}

      <BookingPanel
        selectedSlots={selectedSlots}
        venueName={venueName}
        onBook={handleBook}
      />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-secondary-container/20 rounded-full flex items-center justify-center text-secondary mb-4">
              <span className="material-symbols-outlined text-[40px] font-bold">check_circle</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface">Booking Confirmed!</h3>
            <p className="text-on-surface-variant text-sm mt-2">
              Your court reservation at <strong>{venueName}</strong> has been successfully booked.
            </p>
            
            <div className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 my-6 text-left space-y-2 text-sm">
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="text-on-surface-variant font-medium">Selected Date:</span>
                <span className="font-bold text-on-surface">{selectedDate}</span>
              </div>
              <div className="max-h-36 overflow-y-auto pr-1 space-y-1">
                {selectedSlots.map((s, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-on-surface-variant">{s.courtName} ({s.startTime} - {s.endTime})</span>
                    <span className="font-bold text-on-surface">${s.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between border-t border-outline-variant/20 pt-2 font-bold text-base">
                <span>Total Paid:</span>
                <span className="text-primary">${selectedSlots.reduce((sum, s) => sum + s.price, 0).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCloseModal}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/95 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Mock Schedule generator
const generateMockSchedule = (courtId: number, dateStr: string): DailySlotResponse[] => {
  const slots: DailySlotResponse[] = [];
  let currentHour = 7;
  let currentMinute = 0;
  
  const todayStr = new Date().toISOString().split('T')[0];
  const now = new Date();
  const currentHH = now.getHours();
  const currentMM = now.getMinutes();

  while (currentHour < 17 || (currentHour === 17 && currentMinute === 0)) {
    const hh = currentHour.toString().padStart(2, '0');
    const mm = currentMinute.toString().padStart(2, '0');
    const startTimeStr = `${hh}:${mm}:00`;
    
    let endHour = currentHour;
    let endMinute = currentMinute + 30;
    if (endMinute >= 60) {
      endHour += 1;
      endMinute = 0;
    }
    const endHH = endHour.toString().padStart(2, '0');
    const endMM = endMinute.toString().padStart(2, '0');
    const endTimeStr = `${endHH}:${endMM}:00`;

    const isPeak = ['09:00', '09:30', '10:00', '10:30'].includes(`${hh}:${mm}`);
    const price = isPeak ? 22.50 : 18.75;

    let status: 'AVAILABLE' | 'BOOKED' | 'EXPIRED' = 'AVAILABLE';
    
    if (dateStr === todayStr) {
      if (currentHour < currentHH || (currentHour === currentHH && currentMinute < currentMM)) {
        status = 'EXPIRED';
      }
    }

    if (courtId === 1) {
      if (startTimeStr === '11:30:00' || startTimeStr === '12:00:00' || startTimeStr === '15:00:00') {
        status = 'BOOKED';
      }
    } else if (courtId === 2) {
      if (startTimeStr === '08:00:00' || startTimeStr === '10:30:00' || startTimeStr === '14:00:00') {
        status = 'BOOKED';
      }
    } else if (courtId === 3) {
      if (startTimeStr === '09:30:00' || startTimeStr === '13:00:00' || startTimeStr === '16:30:00') {
        status = 'BOOKED';
      }
    }

    slots.push({
      startTime: startTimeStr,
      endTime: endTimeStr,
      price,
      status,
    });

    currentMinute += 30;
    if (currentMinute >= 60) {
      currentHour += 1;
      currentMinute = 0;
    }
  }

  return slots;
};
