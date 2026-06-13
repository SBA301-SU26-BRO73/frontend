import { useNavigate } from 'react-router-dom';

export default function BookingPanel() {
    const navigate = useNavigate();

    const handleBookNow = () => {
      navigate('/slot-booking');
    };

    return (
      <>
        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-24 space-y-stack-lg">
            {/* Panel Đặt Sân */}
            <div className="bg-surface-container-lowest border border-outline-variant shadow-xl rounded-2xl p-stack-lg">
              <h3 className="font-headline-md text-headline-md mb-stack-md">Quick Book</h3>
              <div className="space-y-stack-md">
                <div className="p-stack-sm bg-surface-container rounded-lg border border-outline-variant/20">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-unit uppercase tracking-wider">Court Type</label>
                  <select className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md p-0 outline-none">
                    <option>Pickleball - Indoor</option>
                    <option>Tennis - Outdoor</option>
                    <option>Badminton - ProHub</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-stack-sm">
                  <div className="p-stack-sm bg-surface-container rounded-lg border border-outline-variant/20">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-unit uppercase tracking-wider">Date</label>
                    <input className="w-full bg-transparent border-none focus:ring-0 font-body-sm text-body-sm p-0 outline-none" type="date" defaultValue="2024-05-24" />
                  </div>
                  <div className="p-stack-sm bg-surface-container rounded-lg border border-outline-variant/20">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-unit uppercase tracking-wider">Time</label>
                    <select className="w-full bg-transparent border-none focus:ring-0 font-body-sm text-body-sm p-0 outline-none">
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>02:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="border-t border-outline-variant/30 pt-stack-md mt-stack-md space-y-stack-xs">
                  <div className="flex justify-between font-body-sm text-body-sm">
                    <span>1 Hour Court Hire</span>
                    <span className="font-medium">$45.00</span>
                  </div>
                  <div className="flex justify-between font-body-sm text-body-sm">
                    <span>Service Fee</span>
                    <span className="font-medium">$2.50</span>
                  </div>
                  <div className="flex justify-between font-headline-md text-headline-md pt-stack-sm border-t border-outline-variant/10">
                    <span>Total</span>
                    <span className="text-primary">$47.50</span>
                  </div>
                </div>
                <button 
                  onClick={handleBookNow}
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-headline-md text-headline-md hover:scale-[1.01] transition-transform shadow-lg shadow-primary/20 cursor-pointer"
                >
                  Book Now
                </button>
                <p className="text-center font-label-sm text-label-sm text-on-surface-variant">Cancel up to 24h before for full refund</p>
              </div>
            </div>
    
            {/* Bản đồ Widget */}
            <div className="bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/30 h-64 relative">
              <img alt="Location Map" className="w-full h-full object-cover grayscale opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMkrvVby7kQYEJp5pWMsPOmygwCErh6VUhvJ5MVZaY7CGn6hFWIZOeQ21xkTtoMJWkphNjKR9spdruuA7rVRB9nZk8Zy5HwkC6pKS4Z4Tf-BmV44ce-iEOCS23IEdEpRDiY_3dd9fz1v1Gh7Um74d0KTUem9CLYMkZS7UySoYaz_yot32zbzgbg3ocpGBXohiVqzC71jna5FQ5f6N1zQhopPdK5HxEnP41OaSu4RwjIcnOSMQAxbCuXTVWSFbW4jfAv-yHHTlreGg" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent flex items-end p-stack-md">
                <button className="w-full bg-surface-container-lowest text-on-surface py-2 rounded-lg font-label-md text-label-md flex items-center justify-center gap-unit shadow-sm hover:bg-surface-container-highest transition-colors">
                  <span className="material-symbols-outlined text-primary">directions</span>
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Floating Booking Button */}
        <div className="fixed bottom-24 right-4 lg:hidden z-40 flex">
          <button 
            onClick={handleBookNow}
            className="primary-gradient text-white flex items-center justify-center rounded-full shadow-2xl hover:scale-[1.05] transition-all p-4 px-6 gap-2 font-bold cursor-pointer"
          >
            <span className="material-symbols-outlined">bolt</span>
            <span>Book Now</span>
          </button>
        </div>
      </>
    );
  }