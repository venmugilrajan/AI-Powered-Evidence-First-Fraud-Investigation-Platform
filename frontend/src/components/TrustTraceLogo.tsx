import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  withText?: boolean;
  subtitle?: string;
}

export const TrustTraceLogo: React.FC<LogoProps> = ({
  className = '',
  size = 36,
  withText = true,
  subtitle = 'EVIDENCE-FIRST FORENSICS',
}) => {
  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Precision Forensic Mark */}
      <div 
        className="relative flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          <defs>
            {/* Deep rich navy base gradient */}
            <linearGradient id="tt-base-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E2E42" />
              <stop offset="100%" stopColor="#0B131D" />
            </linearGradient>

            {/* Premium cyan-emerald forensic pulse gradient */}
            <linearGradient id="tt-accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            {/* Subtle glow filter */}
            <filter id="tt-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Precision Outer Shield / Hexagonal Vault */}
          <path
            d="M24 3.5 L41.5 9.5 V22.5 C41.5 33.2 33.8 41.8 24 44.5 C14.2 41.8 6.5 33.2 6.5 22.5 V9.5 L24 3.5 Z"
            fill="url(#tt-base-grad)"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.2"
          />

          {/* Sleek Inner Dynamic Trace / Geometry */}
          <path
            d="M24 7.5 L37.5 12.2 V22.5 C37.5 30.8 31.6 37.6 24 39.8 C16.4 37.6 10.5 30.8 10.5 22.5 V12.2 L24 7.5 Z"
            stroke="rgba(52, 211, 153, 0.25)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />

          {/* Primary Stylized Forensic Monogram "T" Beam */}
          <path
            d="M16 16.5 H32 M24 16.5 V33"
            stroke="url(#tt-accent-grad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Secondary Interlocking Forensic Trace Angle (Representing Proof / Verification) */}
          <path
            d="M17.5 24.5 L24 31 L30.5 24.5"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.85"
          />

          {/* Central Target / Evidence Core Node */}
          <circle
            cx="24"
            cy="16.5"
            r="2"
            fill="#FFFFFF"
            filter="url(#tt-glow)"
          />
          <circle
            cx="24"
            cy="33"
            r="1.75"
            fill="#34D399"
          />
        </svg>
      </div>

      {/* Professional Brand Typography */}
      {withText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center space-x-1.5 leading-none">
            <span className="font-sans text-[17px] font-bold tracking-tight text-[#0F172A]">
              Trust<span className="text-[#059669]">Trace</span>
            </span>
          </div>
          {subtitle && (
            <span className="text-[8.5px] font-mono font-medium tracking-[0.16em] uppercase text-[#64748B] mt-1">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
