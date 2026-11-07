import React, { useState } from 'react';
import { StatePollData } from '../types';

interface NigeriaMapProps {
  states: StatePollData[];
  selectedStateCode: string | null;
  onSelectState: (stateCode: string) => void;
}

interface StateGeoItem {
  code: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zone: string;
  abbr: string;
}

const STATE_COORDINATES: StateGeoItem[] = [
  // North West
  { code: 'SO', name: 'Sokoto', x: 80, y: 40, width: 90, height: 70, zone: 'North West', abbr: 'SOK' },
  { code: 'ZA', name: 'Zamfara', x: 180, y: 70, width: 85, height: 65, zone: 'North West', abbr: 'ZAM' },
  { code: 'KT', name: 'Katsina', x: 275, y: 45, width: 80, height: 75, zone: 'North West', abbr: 'KAT' },
  { code: 'KN', name: 'Kano', x: 365, y: 70, width: 85, height: 70, zone: 'North West', abbr: 'KAN' },
  { code: 'JI', name: 'Jigawa', x: 440, y: 40, width: 85, height: 65, zone: 'North West', abbr: 'JIG' },
  { code: 'KE', name: 'Kebbi', x: 60, y: 120, width: 85, height: 80, zone: 'North West', abbr: 'KEB' },
  { code: 'KD', name: 'Kaduna', x: 260, y: 140, width: 100, height: 85, zone: 'North West', abbr: 'KAD' },

  // North East
  { code: 'YO', name: 'Yobe', x: 535, y: 55, width: 95, height: 80, zone: 'North East', abbr: 'YOB' },
  { code: 'BO', name: 'Borno', x: 640, y: 65, width: 120, height: 110, zone: 'North East', abbr: 'BOR' },
  { code: 'BA', name: 'Bauchi', x: 455, y: 130, width: 90, height: 85, zone: 'North East', abbr: 'BAU' },
  { code: 'GO', name: 'Gombe', x: 555, y: 145, width: 75, height: 65, zone: 'North East', abbr: 'GOM' },
  { code: 'AD', name: 'Adamawa', x: 635, y: 185, width: 95, height: 105, zone: 'North East', abbr: 'ADA' },
  { code: 'TA', name: 'Taraba', x: 530, y: 245, width: 115, height: 110, zone: 'North East', abbr: 'TAR' },

  // North Central
  { code: 'NI', name: 'Niger', x: 135, y: 195, width: 115, height: 95, zone: 'North Central', abbr: 'NIG' },
  { code: 'FC', name: 'FCT (Abuja)', x: 285, y: 240, width: 65, height: 50, zone: 'North Central', abbr: 'FCT' },
  { code: 'NA', name: 'Nasarawa', x: 360, y: 245, width: 85, height: 60, zone: 'North Central', abbr: 'NAS' },
  { code: 'PL', name: 'Plateau', x: 445, y: 220, width: 80, height: 75, zone: 'North Central', abbr: 'PLA' },
  { code: 'KW', name: 'Kwara', x: 105, y: 285, width: 95, height: 65, zone: 'North Central', abbr: 'KWA' },
  { code: 'KO', name: 'Kogi', x: 250, y: 305, width: 95, height: 65, zone: 'North Central', abbr: 'KOG' },
  { code: 'BE', name: 'Benue', x: 405, y: 310, width: 110, height: 70, zone: 'North Central', abbr: 'BEN' },

  // South West
  { code: 'OY', name: 'Oyo', x: 80, y: 355, width: 80, height: 65, zone: 'South West', abbr: 'OYO' },
  { code: 'OS', name: 'Osun', x: 165, y: 365, width: 65, height: 50, zone: 'South West', abbr: 'OSU' },
  { code: 'EK', name: 'Ekiti', x: 220, y: 355, width: 55, height: 45, zone: 'South West', abbr: 'EKI' },
  { code: 'ON', name: 'Ondo', x: 200, y: 405, width: 75, height: 60, zone: 'South West', abbr: 'OND' },
  { code: 'OG', name: 'Ogun', x: 95, y: 420, width: 80, height: 50, zone: 'South West', abbr: 'OGU' },
  { code: 'LA', name: 'Lagos', x: 85, y: 470, width: 85, height: 40, zone: 'South West', abbr: 'LAG' },

  // South South & South East
  { code: 'ED', name: 'Edo', x: 250, y: 410, width: 70, height: 65, zone: 'South South', abbr: 'EDO' },
  { code: 'AN', name: 'Anambra', x: 320, y: 430, width: 55, height: 45, zone: 'South East', abbr: 'ANA' },
  { code: 'EN', name: 'Enugu', x: 380, y: 400, width: 60, height: 48, zone: 'South East', abbr: 'ENU' },
  { code: 'EB', name: 'Ebonyi', x: 440, y: 410, width: 50, height: 45, zone: 'South East', abbr: 'EBO' },
  { code: 'DE', name: 'Delta', x: 240, y: 480, width: 75, height: 65, zone: 'South South', abbr: 'DEL' },
  { code: 'IM', name: 'Imo', x: 330, y: 480, width: 50, height: 45, zone: 'South East', abbr: 'IMO' },
  { code: 'AB', name: 'Abia', x: 385, y: 465, width: 50, height: 45, zone: 'South East', abbr: 'ABI' },
  { code: 'CR', name: 'Cross River', x: 480, y: 420, width: 70, height: 100, zone: 'South South', abbr: 'CRS' },
  { code: 'RI', name: 'Rivers', x: 320, y: 530, width: 65, height: 50, zone: 'South South', abbr: 'RIV' },
  { code: 'BY', name: 'Bayelsa', x: 250, y: 545, width: 65, height: 45, zone: 'South South', abbr: 'BAY' },
  { code: 'AK', name: 'Akwa Ibom', x: 395, y: 520, width: 60, height: 45, zone: 'South South', abbr: 'AKW' }
];

export const NigeriaMap: React.FC<NigeriaMapProps> = ({
  states,
  selectedStateCode,
  onSelectState
}) => {
  const [hoveredState, setHoveredState] = useState<StateGeoItem | null>(null);

  const stateDataMap = new Map<string, StatePollData>();
  states.forEach((s) => stateDataMap.set(s.stateCode, s));

  // Color generator based on leading candidate by AMOUNT
  const getStateColor = (item: StateGeoItem) => {
    const data = stateDataMap.get(item.code);
    const isSelected = selectedStateCode === item.code;
    const isHovered = hoveredState?.code === item.code;

    if (isSelected) {
      return '#8b2fc9'; // Deep Violet selection
    }
    if (isHovered) {
      return '#a855f7'; // Purple hover
    }

    if (!data) return '#f3e8ff';

    switch (data.leadingCandidateId) {
      case 'obi-peter':
        return '#10b981'; // Emerald Green
      case 'tinubu-bola':
        return '#0284c7'; // Sky Blue
      case 'atiku-abubakar':
        return '#ef4444'; // Red
      case 'kwankwaso-rabiu':
        return '#f97316'; // Orange
      case 'sowore-omoyele':
        return '#8b5cf6'; // Violet
      default:
        return '#64748b';
    }
  };

  return (
    <div className="relative w-full bg-white rounded-[32px] p-5 sm:p-7 border border-[#eadcfa] shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#8b2fc9] font-bold block mb-1">
            GEOSPATIAL PUBLIC OPINION
          </span>
          <h3 className="text-lg font-black text-[#1e1035] tracking-tight font-heading">
            Federation Polling Map (36 States + FCT)
          </h3>
          <p className="text-xs text-[#6b5887]">
            Click any state or the Federal Capital Territory to inspect financial support volume
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#6b5887] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span>LP Lead</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-600"></span>
            <span>APC Lead</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span>PDP Lead</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            <span>NNPP Lead</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Map Canvas */}
      <div className="relative w-full aspect-[4/3] max-h-[520px] bg-[#faf8fe] rounded-[24px] border border-[#eadcfa] overflow-hidden shadow-2xs">
        <svg
          viewBox="0 0 800 620"
          className="w-full h-full select-none"
        >
          {/* Subtle grid background */}
          <defs>
            <pattern id="lightGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1e6fc" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="800" height="620" fill="url(#lightGrid)" />

          {/* Render State Polygons / Rounded Rectangles */}
          {STATE_COORDINATES.map((item) => {
            const isSelected = selectedStateCode === item.code;
            const data = stateDataMap.get(item.code);
            const fillColor = getStateColor(item);

            return (
              <g
                key={item.code}
                onClick={() => onSelectState(item.code)}
                onMouseEnter={() => setHoveredState(item)}
                onMouseLeave={() => setHoveredState(null)}
                className="cursor-pointer transition-transform duration-200"
              >
                <rect
                  x={item.x}
                  y={item.y}
                  width={item.width}
                  height={item.height}
                  rx="12"
                  fill={fillColor}
                  stroke={isSelected ? '#1e1035' : '#ffffff'}
                  strokeWidth={isSelected ? 3 : 1.5}
                  className="transition-all duration-200 hover:brightness-110 drop-shadow-2xs"
                />

                {/* State Label */}
                <text
                  x={item.x + item.width / 2}
                  y={item.y + item.height / 2 - 4}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="system-ui, sans-serif"
                  className="pointer-events-none drop-shadow-sm"
                >
                  {item.abbr}
                </text>

                {/* Contribution amount tag */}
                {data && (
                  <text
                    x={item.x + item.width / 2}
                    y={item.y + item.height / 2 + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="monospace"
                    className="pointer-events-none drop-shadow-sm opacity-95"
                  >
                    ₦{(data.totalAmountNgn / 1000000).toFixed(1)}M
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover State Tooltip HUD */}
        {hoveredState && (
          <div className="absolute top-4 left-4 p-3.5 rounded-[18px] bg-[#1e1035] text-white shadow-xl pointer-events-none text-xs space-y-1 z-20">
            <div className="font-extrabold text-sm">{hoveredState.name} State</div>
            <div className="text-[11px] text-[#eadcfa]">{hoveredState.zone} Zone</div>
            {stateDataMap.get(hoveredState.code) && (
              <div className="text-[#e040fb] font-mono font-bold">
                ₦{(stateDataMap.get(hoveredState.code)!.totalAmountNgn).toLocaleString()} Backing
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 text-xs text-[#8c7da3]">
        <span>Click on any regional tile to open detailed state voting telemetry.</span>
        <span className="font-mono text-[11px]">36 States + FCT Polled</span>
      </div>
    </div>
  );
};
