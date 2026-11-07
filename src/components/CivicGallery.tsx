import React from 'react';
import { ArrowRight, MapPin, Users, HeartHandshake, Building2 } from 'lucide-react';

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
      badgeColor: 'bg-emerald-700'
    },
    {
      title: 'Civic Innovation & Real-Time Aggregation',
      subtitle: 'Lagos Tech & Financial Hub',
      description: 'Modern data visualization and cryptographic verification power transparent, tamper-proof civic sentiment analysis.',
      image: '/src/assets/images/lagos_civic_hub_1794058203250.jpg',
      stat: '100% Cryptographic Audit',
      icon: Users,
      badgeColor: 'bg-orange-600'
    },
    {
      title: 'Youth & Citizen Mobilization Ahead of 2027',
      subtitle: 'Nationwide Grassroots Engagement',
      description: 'Young Nigerians, professionals, and community leaders uniting to define priorities for economic growth and national progress.',
      image: '/src/assets/images/civic_rally_nigeria_1794058202546.jpg',
      stat: '149,800+ Verified Citizens',
      icon: MapPin,
      badgeColor: 'bg-amber-800'
    },
    {
      title: 'Social Stewardship & Community Impact',
      subtitle: 'Verified Nigerian Children Homes',
      description: '30% of platform contributions are directed to CAC-registered orphanages and motherless babies homes across the country.',
      image: '/src/assets/images/charity_outreach_1794058203228.jpg',
      stat: '₦18.45M Dedicated Fund',
      icon: HeartHandshake,
      badgeColor: 'bg-slate-900'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange-600">
              The Living Federation in Motion
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
              One Nation. 36 States. One Resolute Voice.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Explore how citizens across diverse regions, tech hubs, and grassroots communities are shaping public discourse ahead of 2027.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onExploreStates}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Explore State Maps
            </button>
            <button
              onClick={onCastVote}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-2"
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
                className="group rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden hover:border-orange-500 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                {/* Photo container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm">
                      {item.stat}
                    </span>
                    <div className={`w-7 h-7 rounded-lg ${item.badgeColor} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
                      {item.subtitle}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors font-heading leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
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
