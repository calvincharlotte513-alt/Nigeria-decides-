import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className = ''
}) => {
  // Dimensions for the icon mark
  const iconSize = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;

  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none ${className}`}>
      {/* World-Class Playful Icon Mark */}
      <div
        className="relative shrink-0 flex items-center justify-center group w-9 h-9 sm:w-11 sm:h-11"
      >
        {/* Soft outer glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#10b981] via-[#8b2fc9] to-[#f59e0b] blur-sm opacity-60 group-hover:opacity-90 transition-opacity" />

        {/* Vector SVG Emblem */}
        <svg
          viewBox="0 0 100 100"
          className="relative w-full h-full drop-shadow-md transition-transform group-hover:scale-105 duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1035" />
              <stop offset="100%" stopColor="#2e1250" />
            </linearGradient>

            <linearGradient id="naijaGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <linearGradient id="purplePinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#8b2fc9" />
              <stop offset="100%" stopColor="#e040fb" />
            </linearGradient>

            <linearGradient id="sunGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Rounded Squircle Background */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="24"
            fill="url(#logoBgGrad)"
            stroke="url(#purplePinkGrad)"
            strokeWidth="3"
          />

          {/* Playful Nigerian Green-White-Green Accent Ribbon */}
          <path
            d="M 14 38 Q 28 28, 48 34 T 86 30"
            stroke="url(#naijaGreenGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M 14 44 Q 28 34, 48 40 T 86 36"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M 14 50 Q 28 40, 48 46 T 86 42"
            stroke="url(#naijaGreenGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* 3D Isometric Playful Ballot Box */}
          <g transform="translate(18, 38)">
            {/* Box Base Front Face */}
            <path
              d="M 10 26 L 32 38 L 54 26 L 32 14 Z"
              fill="#3b1b68"
              stroke="url(#purplePinkGrad)"
              strokeWidth="1.8"
            />
            {/* Left Face */}
            <path
              d="M 10 26 L 32 38 L 32 54 L 10 42 Z"
              fill="url(#purplePinkGrad)"
            />
            {/* Right Face */}
            <path
              d="M 32 38 L 54 26 L 54 42 L 32 54 Z"
              fill="#6b21a8"
            />
            {/* Slot Opening */}
            <ellipse cx="32" cy="26" rx="10" ry="2.8" fill="#130726" />

            {/* Joyful Golden Ballot Card / Heart Rising with Wings of Hope */}
            <g transform="translate(22, 6) rotate(-8)">
              <rect
                x="0"
                y="0"
                width="20"
                height="24"
                rx="4"
                fill="url(#sunGoldGrad)"
                stroke="#ffffff"
                strokeWidth="1.5"
                filter="url(#logoGlow)"
              />
              {/* Checkmark in card */}
              <path
                d="M 5 12 L 8.5 15.5 L 15 8"
                stroke="#1e1035"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Playful Floating Heart */}
            <path
              d="M 44 8 C 44 4, 47 2, 50 4 C 53 2, 56 4, 56 8 C 56 13, 50 17, 50 17 C 50 17, 44 13, 44 8 Z"
              fill="#e040fb"
              filter="url(#logoGlow)"
            />

            {/* Sparkle Star */}
            <path
              d="M 14 10 L 16 15 L 21 16 L 16 18 L 14 23 L 13 18 L 8 16 L 13 15 Z"
              fill="#fde047"
            />
          </g>

          {/* Tiny Nigeria Flag Heart in top right corner */}
          <circle cx="80" cy="20" r="7" fill="#10b981" />
          <circle cx="80" cy="20" r="4" fill="#ffffff" />
          <circle cx="80" cy="20" r="2" fill="#10b981" />
        </svg>
      </div>

      {/* Typography (for Full and Compact variants) */}
      {variant !== 'icon' && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-black tracking-tight text-[#1e1035] font-heading truncate ${
                size === 'sm' ? 'text-base sm:text-lg' : size === 'lg' ? 'text-xl sm:text-3xl' : 'text-base sm:text-2xl'
              }`}
            >
              Nigeria<span className="text-[#10b981]">.</span>Decides
            </span>

            {/* 2027 Game Pill Badge */}
            <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] text-white text-[9px] sm:text-[11px] font-mono font-black shadow-xs tracking-wider shrink-0">
              <span>2027</span>
              <span className="text-amber-300 text-[9px]">★</span>
            </span>
          </div>

          {variant === 'full' && (
            <div className="hidden sm:flex items-center gap-1.5 mt-1">
              <span className="text-[10px] uppercase font-mono tracking-[0.16em] text-[#8b2fc9] font-extrabold">
                THE PEOPLE'S CHOICE GAME
              </span>
              <span className="text-[#d8c5f5] text-[10px]" aria-hidden="true">•</span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#10b981] font-bold">
                100% FOR CHARITY ❤️
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
