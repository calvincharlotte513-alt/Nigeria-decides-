import React from 'react';
import { Zap } from 'lucide-react';

interface LiveTickerProps {
  candidates?: Array<{ name: string; partyAcronym: string; totalAmountNgn: number; partyColor: string }>;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ candidates = [] }) => {
  const defaultItems = [
    { text: '🏆 Peter Obi (NDC) leads with ₦64.8M in crowd backing', color: '#10b981' },
    { text: '❤️ 100% of all proceeds donated to verified Nigerian orphanages', color: '#e040fb' },
    { text: '🎮 149,800+ citizens have participated from all 36 states + FCT', color: '#f59e0b' },
    { text: '⚡ Not owned by federal government or INEC but owned by Democratic Nigerians · 100% Charity!', color: '#8b2fc9' },
    { text: '🇳🇬 Back your candidate from ₦1,000 · Every Naira funds children\u2019s homes', color: '#10b981' },
    { text: '📊 Live board updated in real-time — South East + Lagos showing surge!', color: '#f59e0b' },
    { text: '🌟 New: State-level standings now live for all 36 States & FCT!', color: '#e040fb' },
    { text: '💚 OTP-verified deduplication — one genuine citizen, one ballot', color: '#10b981' },
  ];

  // Add live candidate data if available
  const tickerItems = candidates.length > 0
    ? [
        ...candidates.map(c => ({
          text: `${c.partyAcronym}: ${c.name} — ₦${(c.totalAmountNgn / 1_000_000).toFixed(1)}M backed`,
          color: c.partyColor
        })),
        ...defaultItems
      ]
    : defaultItems;

  // Duplicate for seamless loop
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div
      className="w-full overflow-hidden bg-[#1e1035]/90 backdrop-blur-md border-b border-purple-900/40 py-2"
      role="marquee"
      aria-label="Live game updates"
    >
      <div className="flex items-center gap-3 px-3">
        {/* Static LIVE badge */}
        <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8b2fc9] text-white text-[10px] font-mono font-black uppercase tracking-widest shadow-sm">
          <Zap className="w-2.5 h-2.5 text-amber-300" />
          <span>LIVE</span>
        </div>

        {/* Scrolling ticker track */}
        <div className="flex-1 overflow-hidden">
          <div
            className="flex items-center gap-8 whitespace-nowrap"
            style={{
              animation: 'ticker-scroll 50s linear infinite',
              width: 'max-content'
            }}
          >
            {doubled.map((item, idx) => (
              <span
                key={idx}
                className="text-[11px] font-semibold text-white/90 inline-flex items-center gap-2 shrink-0"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                {item.text}
                <span className="text-purple-500 ml-4">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
