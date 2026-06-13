import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, type FormEvent } from "react";
import type { BranchFilterRequest } from "@/services/branch/branch.api";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState<keyof BranchFilterRequest>("name");
  const [globalFilters, setGlobalFilters] = useState<BranchFilterRequest>({});

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    
    const newFilters: BranchFilterRequest = {};
    if (searchInput.trim()) {
      newFilters[searchType] = searchInput.trim();
    }
    
    setGlobalFilters(newFilters);

    if (location.pathname !== "/branches") {
      navigate('/branches');
    }
  };

  const handleGoHome = () => {
    setSearchInput("");
    setGlobalFilters({});
    navigate('/');
  };

  const isHomePage = location.pathname === "/";
  const isBranchListPage = location.pathname === "/branches" || location.pathname === "/branches/";

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-primary/20 selection:text-primary min-h-screen flex flex-col">
      {isBranchListPage ? (
        <header className="fixed top-0 left-0 w-full z-50 flex flex-col md:flex-row justify-between items-stretch md:items-center px-margin-mobile md:px-margin-desktop py-3 md:py-4 glass-nav border-b border-outline-variant/30 shadow-md gap-2 md:gap-0">
          <div className="flex justify-between items-center w-full md:w-auto">
            {/* Đã xóa thẻ img logo */}
            <div className="flex items-center gap-4 cursor-pointer" onClick={handleGoHome}>
              <span className="text-headline-md font-bold tracking-tight text-primary">Velocity</span>
            </div>
            
            <div className="flex items-center gap-2 md:hidden">
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high/50 rounded-lg">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high/50 rounded-lg">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            </div>
          </div>

          <div className="flex flex-1 max-w-xl md:mx-gutter gap-2 w-full">
            <form onSubmit={handleSearch} className="relative flex-1 flex items-center bg-surface-container-low border border-outline-variant rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary overflow-hidden pr-2">
              {/* Biến icon Search thành button type="submit" để có thể click */}
              <button type="submit" className="pl-3 pr-1 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors outline-none focus:outline-none">
                <span className="material-symbols-outlined">search</span>
              </button>
              
              {/* Đã thêm focus:ring-0 để diệt tận gốc cái viền xanh mặc định */}
              <input
                className="w-full pl-2 pr-2 py-2 bg-transparent border-none outline-none focus:ring-0 focus:outline-none text-body-sm"
                placeholder={`Search by ${searchType}...`}
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <select 
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as keyof BranchFilterRequest)}
                className="bg-surface-container-high text-label-sm font-bold text-on-surface outline-none focus:ring-0 cursor-pointer border-none py-1 px-2 rounded-lg"
              >
                <option value="name">Name</option>
                <option value="city">City</option>
                <option value="address">Address</option>
                <option value="ward">Ward</option>
              </select>
            </form>
            
            <div className="hidden sm:flex bg-surface-container-high rounded-xl p-1 shrink-0">
              <button className="px-4 py-1.5 rounded-lg bg-surface-container-lowest shadow-sm flex items-center gap-2 text-label-md font-bold text-primary">
                <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span> List
              </button>
              <button className="px-4 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-colors flex items-center gap-2 text-label-md">
                <span className="material-symbols-outlined text-[18px]">map</span> Map
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-gutter">
            <nav className="hidden xl:flex items-center gap-stack-lg">
              <a className="font-label-md text-primary border-b-2 border-primary pb-1" href="#">All Courts</a>
              <a className="font-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Pickleball</a>
              <a className="font-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Tennis</a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
              </button>
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant">account_circle</span>
              </button>
            </div>
          </div>
        </header>
      ) : (
        <header className={`fixed top-0 left-0 w-full z-50 ${isHomePage ? 'bg-surface/80 shadow-sm' : 'glass-nav shadow-md'} backdrop-blur-md border-b border-outline-variant/30`}>
          <div className={`flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 mx-auto w-full ${isHomePage ? 'max-w-container-max' : 'max-w-[1440px]'}`}>
            {/* Đã xóa thẻ img logo */}
            <div className="flex items-center gap-stack-md cursor-pointer" onClick={handleGoHome}>
              <span className="text-headline-md font-bold tracking-tight text-primary">Velocity</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-gutter">
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Pickleball</a>
              <a className="font-label-md text-label-md text-primary border-b-2 border-primary pb-1" href="#">Tennis</a>
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Badminton</a>
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
      )}

      <main className={`flex-1 ${isBranchListPage ? 'pt-32 md:pt-24' : 'pt-24'}`}>
        <Outlet context={{ globalFilters }} />
      </main>

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

      <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-t border-outline-variant/20 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] flex justify-around items-center pt-2 pb-safe px-6 md:hidden">
        <a className="flex flex-col items-center justify-center text-on-surface-variant" href="#" onClick={handleGoHome}>
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-sm text-label-sm mt-1">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1" href="#" onClick={() => navigate('/branches')}>
          <span className="material-symbols-outlined">search</span>
          <span className="font-label-sm text-label-sm mt-1">Search</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">event_available</span>
          <span className="font-label-sm text-label-sm mt-1">Bookings</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-sm text-label-sm mt-1">Profile</span>
        </a>
      </nav>

      {isHomePage && (
        <div className="fixed bottom-24 right-4 lg:bottom-stack-lg lg:right-stack-lg z-40 flex">
          <button 
            onClick={() => navigate('/branches')}
            className="primary-gradient text-white flex items-center justify-center rounded-full shadow-2xl hover:scale-105 transition-all group p-4 lg:pl-6 lg:pr-8 lg:py-4"
          >
            <span className="material-symbols-outlined group-hover:rotate-12 transition-transform text-[28px] lg:text-[24px]">bolt</span>
            <span className="hidden lg:block font-label-md font-bold ml-0 lg:ml-3">Quick Book Now</span>
          </button>
        </div>
      )}
    </div>
  );
}