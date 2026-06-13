import { useState, useEffect } from "react";
import DetailedBranchCard from "../../../components/ui/detailed-branch-card";
import SkeletonCard from "../../../components/ui/skeleton-card";

// Định nghĩa kiểu dữ liệu cho Branch (Dùng TypeScript cho chuẩn)
interface BranchData {
  id: string;
  imageSrc: string;
  title: string;
  address: string;
  price: string;
  rating: string;
  distance: string;
  tags: { label: string; isHighlight?: boolean }[];
}

export default function BranchList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [branches, setBranches] = useState<BranchData[]>([]);

  // Giả lập gọi API lấy dữ liệu từ Backend
  useEffect(() => {
    // Bật trạng thái loading
    setIsLoading(true);

    const timer = setTimeout(() => {
      // Dữ liệu trả về sau 2 giây
      setBranches([
        {
          id: "velocity-westside-hub",
          imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCixMWLwvgosiwYViy13L4fCQ7VFkcQXOODOJU_s1mkUAlElpUHrRvspI1ApBDtkkj1Alhpzkyi_nXa2g-xSCNOSZFUB8QjowFo517vq7t3w8pt2Ei9Nmoc5ZAWzNO9A0HQYTjLV-bCQfqxtkjdqoLO_AsZx9KLZRWrGKUIYHtJj3knvtfjAv44HncnbLf-ivyJkfSPsSuOrqO_ksbUUAxG8HHMkBf7YumW3mDpUHH_bv38vIIbgNLj-RrIR0AhwjVjVxNsqU7XuzA",
          title: "Velocity Westside Hub",
          address: "522 W 57th St, New York",
          price: "45",
          rating: "4.9",
          distance: "1.2 miles away",
          tags: [{ label: "Tennis" }, { label: "Pickleball" }, { label: "Free Parking", isHighlight: true }],
        },
        {
          id: "velocity-riverside",
          imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg05MoiYM96btcYfzLQDzqWZA_c-QhtZyEVuS5ICgm8XbKZCXmGYNgdlIyxZBbKjjvk4jHZuHJCpIG4wlxo0KWq1xxIKdkG-j6-j1mKbLFeb5nluo9gAj9KgCsAwHWe4I9A1RCh0L_nkRI5XdoVjAiXCo9NxNI4kXcyF-7A4t94b51i0KR_nPvENN3y1N1Z2XtmG066bb4mlTvzf0uLSJS5E9XuPw6hjYMjE1ciaAZWjTpuFyY_nzpwDvU3tW-ZiWgJ4V7i5u4Ziw",
          title: "Velocity Riverside",
          address: "700 Riverside Dr, NY",
          price: "32",
          rating: "4.7",
          distance: "2.5 miles away",
          tags: [{ label: "Badminton" }, { label: "Squash" }],
        },
        {
          id: "velocity-chelsea-sky",
          imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC5OQ0DAQHmrIKYOYtF-9y9axg2zmi-hnhrzOtl1fgz70ME4G7J9mUU0WNaL5LqAhy1neMoYUyrhoVWIFq1nzM7xccji-zR62ZvByw1zktUUEw3H2uER3mryBK2g0pnJd3RWy-8lIFHkLElmZJox4-s-zA1N2IF4WK2co44sgNfSOdAclXleTbdYnt_iP6CrNoh7UduXlYzfWF28BxGy8Jo_HvSu_6z-ZYcapYM9oDks_ZccjX004o9aEddABErbyFH4LJADLLP74",
          title: "Velocity Chelsea Sky",
          address: "Chelsea Piers, NY",
          price: "60",
          rating: "5.0",
          distance: "0.8 miles away",
          tags: [{ label: "Pickleball" }, { label: "Premium", isHighlight: true }],
        },
      ]);
      
      // Tắt trạng thái loading
      setIsLoading(false);
    }, 2000); // 2000ms = 2 giây

    // Dọn dẹp timer nếu component bị unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex-1 pb-24">
      <div className="flex justify-between items-end mb-stack-lg">
        <div className="flex flex-col gap-1">
          <h1 className="font-headline-lg text-headline-lg">Featured Venues</h1>
          <p className="text-body-md text-on-surface-variant">Showing 24 locations near Manhattan, NY</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-surface-container-low border border-outline-variant px-3 py-1.5 rounded-lg">
          <span className="text-label-sm text-on-surface-variant">Sort by:</span>
          <select className="bg-transparent text-label-sm font-bold text-on-surface outline-none cursor-pointer border-none focus:ring-0">
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Nearest to Me</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
        {/* Logic hiển thị theo trạng thái */}
        {isLoading ? (
          // Đang load: Render 6 cái Skeleton để lấp đầy không gian
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          // Đã load xong: Render dữ liệu thật
          branches.map((branch) => (
            <DetailedBranchCard key={branch.id} {...branch} />
          ))
        )}
      </div>

      {/* Pagination (Chỉ hiển thị khi đã load xong dữ liệu) */}
      {!isLoading && (
        <div className="mt-stack-xl flex justify-center items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors">3</button>
          <span className="mx-2 text-on-surface-variant">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors">12</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      )}
    </section>
  );
}