import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Kiểm tra route hiện tại
  const isHomePage = location.pathname === "/";
  const isBranchListPage = location.pathname === "/branches"; // Thêm biến này

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-primary/20 selection:text-primary min-h-screen flex flex-col">
      
      {/* HEADER ĐỘNG DỰA THEO ROUTE */}
      {isHomePage ? (
        // HEADER 1: TRANG CHỦ
        <header className="fixed top-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
          <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto w-full">
            <div className="flex items-center gap-stack-md cursor-pointer" onClick={() => navigate('/')}>
              <span className="text-headline-md font-bold tracking-tight text-primary">
                Velocity
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-gutter">
              <a className="font-label-md text-label-md text-primary border-b-2 border-primary pb-1" href="#">
                Pickleball
              </a>
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                Tennis
              </a>
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                Badminton
              </a>
            </nav>
            <div className="flex items-center gap-stack-md">
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high/50 rounded-lg transition-all active:scale-95">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high/50 rounded-lg transition-all active:scale-95">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            </div>
          </div>
        </header>
      ) : (
        // HEADER 2: CÁC TRANG KHÁC
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 glass-nav border-b border-outline-variant/30 shadow-md">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
            <span className="hidden lg:block text-headline-md font-bold tracking-tight text-primary">
              Velocity
            </span>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-gutter gap-4">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="Search courts, areas, or sports..."
                type="text"
              />
            </div>
            <div className="flex bg-surface-container-high rounded-xl p-1">
              <button className="px-4 py-1.5 rounded-lg bg-surface-container-lowest shadow-sm flex items-center gap-2 text-label-md font-bold text-primary">
                <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                List
              </button>
              <button className="px-4 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-colors flex items-center gap-2 text-label-md">
                <span className="material-symbols-outlined text-[18px]">map</span>
                Map
              </button>
            </div>
          </div>

          <div className="flex items-center gap-gutter">
            <nav className="hidden xl:flex items-center gap-stack-lg">
              <a className="font-label-md text-primary border-b-2 border-primary pb-1" href="#">
                All Courts
              </a>
              <a className="font-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                Pickleball
              </a>
              <a className="font-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                Tennis
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors relative">
                <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant">account_circle</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pt-24">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full pt-stack-xl pb-margin-mobile px-margin-mobile md:px-margin-desktop bg-surface-container-highest border-t border-outline-variant">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between gap-gutter mb-stack-xl">
          <div className="space-y-4 max-w-xs">
            <div className="flex items-center gap-2">
              <span className="font-headline-md text-on-surface font-bold">Velocity Sports</span>
            </div>
            <p className="text-on-surface-variant font-body-sm font-label-md">
              The world's most advanced booking engine for performance sports venues.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-stack-lg">
            <div className="flex flex-col gap-3">
              <a className="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">About Velocity</a>
              <a className="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            </div>
            <div className="flex flex-col gap-3">
              <a className="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Help Center</a>
            </div>
            <div className="flex flex-col gap-3">
              <a className="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Partner With Us</a>
            </div>
          </div>
        </div>
        <div className="max-w-container-max mx-auto pt-stack-md border-t border-outline-variant/30">
          <p className="font-label-sm text-on-surface-variant opacity-80 text-center md:text-left">
            © 2024 Velocity Sports. All rights reserved.
          </p>
        </div>
      </footer>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-2 pb-safe px-6 md:hidden glass-nav border-t border-outline-variant/20 shadow-lg">
        <a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="font-label-sm text-label-sm">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">search</span>
          <span className="font-label-sm text-label-sm">Search</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">event_available</span>
          <span className="font-label-sm text-label-sm">Bookings</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-sm text-label-sm">Profile</span>
        </a>
      </nav>

      {isHomePage && (
        <div className="fixed bottom-24 right-4 lg:bottom-stack-lg lg:right-stack-lg z-40 flex">
          <button 
            onClick={() => navigate('/branches')}
            className="primary-gradient text-white flex items-center justify-center rounded-full shadow-2xl hover:scale-105 transition-all group p-4 lg:pl-6 lg:pr-8 lg:py-4"
          >
            <span className="material-symbols-outlined group-hover:rotate-12 transition-transform text-[28px] lg:text-[24px]">
              bolt
            </span>
            <span className="hidden lg:block font-label-md font-bold ml-0 lg:ml-3">
              Quick Book Now
            </span>
          </button>
        </div>
      )}
      
    </div>
  );
}