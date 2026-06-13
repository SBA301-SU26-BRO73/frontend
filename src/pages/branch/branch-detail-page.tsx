import BranchGallery from "./components/branch-gallery";
import BranchInfo from "./components/branch-info";
import BranchCourts from "./components/branch-courts";
import BranchReviews from "./components/branch-reviews";
import BookingPanel from "./components/booking-panel";

export default function BranchDetailPage() {
  return (
    <div className="pb-stack-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto lg:grid lg:grid-cols-12 lg:gap-gutter pt-8">
      
      {/* Khu vực nội dung chính bên trái (8 Cột) */}
      <div className="lg:col-span-8 space-y-stack-xl">
        
        {/* Breadcrumbs & Title */}
        <header className="space-y-stack-sm">
          <nav className="flex items-center gap-unit text-on-surface-variant font-label-sm text-label-sm">
            <a className="hover:text-primary" href="#">Locations</a>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <a className="hover:text-primary" href="#">Los Angeles</a>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-on-surface">Westside Hub</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Velocity Westside Hub</h1>
              <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-unit mt-unit">
                <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                12400 Wilshire Blvd, Los Angeles, CA 90025
              </p>
            </div>
            <div className="flex items-center gap-stack-sm">
              <span className="bg-secondary-container text-on-secondary-container px-stack-md py-unit rounded-full font-label-sm text-label-sm flex items-center gap-unit">
                <span className="w-2 h-2 rounded-full bg-secondary"></span> Open Now
              </span>
              <div className="flex items-center gap-unit text-on-surface">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-label-md text-label-md">4.9 (124 reviews)</span>
              </div>
            </div>
          </div>
        </header>

        {/* Ráp các khối Component vào */}
        <BranchGallery />
        <BranchInfo />
        <BranchCourts />
        <BranchReviews />
        
      </div>

      {/* Khu vực đặt sân dính bên phải (4 Cột) */}
      <BookingPanel />

    </div>
  );
}