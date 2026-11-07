import React from 'react';
import { ArrowRight, MapPin, Users, Heart, Building2, ChevronRight, Gamepad2, Sparkles } from 'lucide-react';

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
      description: 'From the foot of Aso Rock to regional grassroots councils, see what citizens across the Nigerian federation are thinking before 2027.',
      image: '/images/abuja_landmark_civic_1794058202166.jpg',
      stat: '36 States + FCT Connected',
      icon: Building2,
      badgeGradient: 'from-[#8b2fc9] to-[#a238f5]'
    },
    {
      title: 'Civic Game Analytics & Real-Time Aggregation',
      subtitle: 'Lagos Tech & Financial Hub',
      description: 'Modern data visualization and verified citizen deduplication power a joyful, live, tamper-proof national sentiment board.',
      image: '/images/lagos_civic_hub_1794058203250.jpg',
      stat: 'Live Crowd Standings',
      icon: Users,
      badgeGradient: 'from-[#a238f5] to-[#e040fb]'
    },
    {
      title: 'Youth & Citizen Mobilization Ahead of 2027',
      subtitle: 'Nationwide Grassroots Excitement',
      description: 'Young Nigerians, students, professionals, and community builders joining a fun civic game to decide their champion before election day.',
      image: '/images/civic_rally_nigeria_1794058202546.jpg',
      stat: '149,800+ Verified Citizens',
      icon: MapPin,
      badgeGradient: 'from-[#ec4899] to-[#8b2fc9]'
    },
    {
      title: '100% Charity Stewardship & Children Impact',
      subtitle: 'Verified Nigerian Children Homes',
      description: '100% of all contributions are donated to CAC-registered orphanages, motherless babies homes, and youth empowerment NGOs.',
      image: '/images/charity_outreach_1794058203228.jpg',
      stat: '100% Proceeds to Charity ❤️',
      icon: Heart,
      badgeGradient: 'from-[#8b2fc9] to-[#ec4899]'
    }
  ];

  return (
    <section className="py-14 border-b border-[#ebdffa]/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#ebdffa]/80">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 text-xs font-bold text-[#8b2fc9]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>THE GAME IN MOTION</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              <span className="text-[#6b5887]">Living Federation in Action</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e1035] font-heading tracking-tight">
              One Nation. 36 States. One Joyful Voice! 🇳🇬
            </h2>
            <p className="text-sm text-[#55456e] leading-relaxed">
              Explore how citizens across diverse regions, tech hubs, and grassroots communities are deciding their 2027 leader in a fun, non-governmental game.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={onExploreStates}
              className="px-5 py-2.5 rounded-full border border-[#eadcfa] hover:border-[#8b2fc9] bg-white/90 hover:bg-white text-[#1e1035] text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              Explore 36 States Map
            </button>
            <button
              onClick={onCastVote}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white text-xs font-black transition-all cursor-pointer shadow-[0_4px_16px_rgba(162,56,245,0.3)] flex items-center gap-2 font-heading uppercase"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Play & Vote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4-Card Photorealistic Visual Bento Grid with Frosted Glass */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group rounded-[28px] bg-white/85 backdrop-blur-md border border-[#eadcfa] overflow-hidden hover:border-[#8b2fc9] hover:shadow-[0_16px_40px_rgba(162,56,245,0.16)] transition-all flex flex-col justify-between"
              >
                {/* Photo container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-purple-50">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1035]/75 via-transparent to-transparent" />
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
                    <span className="text-[11px] font-black text-[#8b2fc9] uppercase tracking-wider block">
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
