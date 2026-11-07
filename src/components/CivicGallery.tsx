import React from 'react';
import { ArrowRight, MapPin, Users, HeartHandshake, Building2, ChevronRight } from 'lucide-react';

interface CivicGalleryProps {
  onCastVote: () => void;
  onExploreStates: () => void;
}

export const CivicGallery: React.FC<CivicGalleryProps> = ({
  onCastVote,
  onExploreStates
}) => {
  const galleryItems = [
    {
      title: 'Federal Capital Territory & National Sovereignty',
      subtitle: 'Abuja & North Central',
      description: 'From the foot of Aso Rock to regional councils, public opinion data reflects the shared aspirations of the Nigerian federation.',
      image: '/src/assets/images/abuja_landmark_civic_1794058202166.jpg',
      stat: '36 States + FCT Connected',
      icon: Building2,
      badgeGradient: 'from-[#8b2fc9] to-[#a238f5]'
    },
    {
      title: 'Civic Innovation & Real-Time Aggregation',
      subtitle: 'Lagos Tech & Financial Hub',
      description: 'Modern data visualization and cryptographic verification power transparent, tamper-proof civic sentiment analysis.',
      image: '/src/assets/images/lagos_civic_hub_1794058203250.jpg',
      stat: '100% Cryptographic Audit',
      icon: Users,
      badgeGradient: 'from-[#a238f5] to-[#e040fb]'
    },
    {
      title: 'Youth & Citizen Mobilization Ahead of 2027',
      subtitle: 'Nationwide Grassroots Engagement',
      description: 'Young Nigerians, professionals, and community leaders uniting to define priorities for economic growth and national progress.',
      image: '/src/assets/images/civic_rally_nigeria_1794058202546.jpg',
      stat: '149,800+ Verified Citizens',
      icon: MapPin,
      badgeGradient: 'from-[#ec4899] to-[#8b2fc9]'
    },
    {
      title: 'Social Stewardship & Community Impact',
      subtitle: 'Verified Nigerian Children Homes',
      description: '30% of platform contributions are directed to CAC-registered orphanages and motherless babies homes across the country.',
      image: '/src/assets/images/charity_outreach_1794058203228.jpg',
      stat: '₦18.45M Dedicated Fund',
      icon: HeartHandshake,
      badgeGradient: 'from-[#8b2fc9] to-[#ec4899]'
    }
  ];

  return (
    <section className="py-16 bg-[#faf7fd] border-b border-[#ebdffa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#ebdffa]">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#8b2fc9]">
              <span>Snapshots of Support</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              <span className="text-[#6b5887]">Living Federation in Motion</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e1035] font-heading tracking-tight">
              One Nation. 36 States. One Resolute Voice.
            </h2>
            <p className="text-sm text-[#6b5887] leading-relaxed">
              Explore how citizens across diverse regions, tech hubs, and grassroots communities are shaping public discourse ahead of 2027.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onExploreStates}
              className="px-5 py-2.5 rounded-full border border-[#eadcfa] hover:border-[#d9c4f7] bg-white hover:bg-[#faf5ff] text-[#1e1035] text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              Explore State Maps
            </button>
            <button
              onClick={onCastVote}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white text-xs font-bold transition-all cursor-pointer shadow-[0_4px_16px_rgba(162,56,245,0.3)] flex items-center gap-2"
            >
              <span>Back a Candidate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4-Card Photorealistic Visual Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group rounded-[28px] bg-white border border-[#eadcfa] overflow-hidden hover:border-[#8b2fc9] hover:shadow-[0_12px_36px_rgba(162,56,245,0.15)] transition-all flex flex-col justify-between"
              >
                {/* Photo container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#faf5ff]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1035]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                      {item.stat}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.badgeGradient} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#8b2fc9] uppercase tracking-wider block">
                      {item.subtitle}
                    </span>
                    <h3 className="text-base font-extrabold text-[#1e1035] group-hover:text-[#8b2fc9] transition-colors font-heading leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6b5887] leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
