export default function BranchCourts() {
    return (
      <section className="space-y-stack-lg">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md">Available Courts</h2>
          <div className="flex gap-unit">
            <button className="px-stack-md py-unit bg-primary text-on-primary rounded-full font-label-sm text-label-sm">All</button>
            <button className="px-stack-md py-unit hover:bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant">Tennis</button>
            <button className="px-stack-md py-unit hover:bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant">Pickleball</button>
          </div>
        </div>
        
        <div className="space-y-stack-md">
          {/* Court 1 */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl overflow-hidden flex flex-col md:flex-row hover:border-primary transition-all hover:shadow-lg group">
            <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
              <img alt="Court 1" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkf1-dSdwtoABJkWeg8R_dEK6FxEDzKiL2xWYUVxhTLeiLg0TJOcxu0LTobNbkpWaPhhCFNcXwEtjckUaTiV9duWZVJnJIwqinb8kyiDyEBNy59ffqH4pY-MgnwHVwChqQi7dCGYoPV6NQ3x6jdZizWiifMKP-taxp_2DQyxSqWRj8eZ7KtIZVLqFULfyD4m_FYr18YJWSQBm3KtkEKJr7w2uKo7TLWBEy8HR9KVjjr_GTLewEHo-d6uJdI7vpUtHJuMwWKaS3m8Y" />
            </div>
            <div className="p-stack-lg flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-secondary font-label-sm text-label-sm uppercase tracking-widest">Pickleball</span>
                  <h3 className="font-headline-md text-headline-md mt-unit">Court 1 - Indoor Hub</h3>
                  <div className="flex items-center gap-stack-sm mt-unit">
                    <span className="bg-surface-container text-on-surface-variant px-stack-sm py-xs rounded font-label-sm text-label-sm">Indoor</span>
                    <span className="bg-surface-container text-on-surface-variant px-stack-sm py-xs rounded font-label-sm text-label-sm">Hard Surface</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-headline-md text-primary">$45</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">per hour</div>
                </div>
              </div>
              <div className="mt-stack-lg flex gap-stack-md">
                <button className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-label-md text-label-md hover:scale-[1.02] transition-transform">View Availability</button>
                <button className="p-3 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant">favorite</span>
                </button>
              </div>
            </div>
          </div>
  
          {/* Court 2 */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl overflow-hidden flex flex-col md:flex-row hover:border-primary transition-all hover:shadow-lg group">
            <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
              <img alt="Court 2" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCixMWLwvgosiwYViy13L4fCQ7VFkcQXOODOJU_s1mkUAlElpUHrRvspI1ApBDtkkj1Alhpzkyi_nXa2g-xSCNOSZFUB8QjowFo517vq7t3w8pt2Ei9Nmoc5ZAWzNO9A0HQYTjLV-bCQfqxtkjdqoLO_AsZx9KLZRWrGKUIYHtJj3knvtfjAv44HncnbLf-ivyJkfSPsSuOrqO_ksbUUAxG8HHMkBf7YumW3mDpUHH_bv38vIIbgNLj-RrIR0AhwjVjVxNsqU7XuzA" />
            </div>
            <div className="p-stack-lg flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-secondary font-label-sm text-label-sm uppercase tracking-widest">Tennis</span>
                  <h3 className="font-headline-md text-headline-md mt-unit">Court 7 - Sunset View</h3>
                  <div className="flex items-center gap-stack-sm mt-unit">
                    <span className="bg-surface-container text-on-surface-variant px-stack-sm py-xs rounded font-label-sm text-label-sm">Outdoor</span>
                    <span className="bg-surface-container text-on-surface-variant px-stack-sm py-xs rounded font-label-sm text-label-sm">Clay</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-headline-md text-primary">$60</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">per hour</div>
                </div>
              </div>
              <div className="mt-stack-lg flex gap-stack-md">
                <button className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-label-md text-label-md hover:scale-[1.02] transition-transform">View Availability</button>
                <button className="p-3 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant">favorite</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }