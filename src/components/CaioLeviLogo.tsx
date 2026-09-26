import React from 'react';

interface CaioLeviLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'mono';
  showSubtitle?: boolean;
  subtitleText?: string;
}

export const CaioLeviLogo: React.FC<CaioLeviLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
  subtitleText = 'DE JAÚ/SP · DIRETO DA FÁBRICA',
}) => {
  const strokeColor = variant === 'light' ? '#FFFFFF' : '#000000';
  const textColor = variant === 'light' ? 'text-white' : 'text-black';
  const subColor = variant === 'light' ? 'text-neutral-300' : 'text-neutral-600';

  const iconSizes = {
    xs: 'w-6 h-7',
    sm: 'w-8 h-10',
    md: 'w-12 h-14',
    lg: 'w-24 h-28',
    xl: 'w-36 h-44',
  };

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Handcrafted Vector Monogram matching watermarked_img_7665015341942842964.jpg */}
      <svg
        viewBox="0 0 160 200"
        className={`${iconSizes[size]} transition-transform`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer C shape - bold, organic, rounded loop */}
        <path
          d="M 103 54 C 103 40, 93 25, 76 25 C 57 25, 47 43, 47 75 L 47 135 C 47 167, 57 185, 76 185 C 93 185, 103 170, 103 156"
          stroke={strokeColor}
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner L - Left spine and bottom arm */}
        <path
          d="M 59 66 L 59 152 L 86 152"
          stroke={strokeColor}
          strokeWidth="4.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner E - Nested above the L foot */}
        <path
          d="M 66 73 L 83 73"
          stroke={strokeColor}
          strokeWidth="4.2"
          strokeLinecap="round"
        />
        <path
          d="M 66 73 L 66 135 L 81 135"
          stroke={strokeColor}
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 66 103 L 79 103"
          stroke={strokeColor}
          strokeWidth="4.2"
          strokeLinecap="round"
        />

        {/* Inner V - Slanted lines */}
        <path
          d="M 85 71 L 102 147 L 118 73"
          stroke={strokeColor}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner i - Stem & Dot */}
        <path
          d="M 120 73 L 120 146"
          stroke={strokeColor}
          strokeWidth="4.2"
          strokeLinecap="round"
        />
        <circle
          cx="120"
          cy="60"
          r="3"
          fill={strokeColor}
        />
      </svg>

      {/* Brand Name "Caio Levi" matching logomark drawing */}
      <span
        className={`font-brand-caio text-base sm:text-lg tracking-wider mt-1 ${textColor}`}
      >
        Caio Levi
      </span>

      {/* Subtitle */}
      {showSubtitle && (
        <span className={`text-[8px] sm:text-[9px] uppercase tracking-wider font-medium mt-0.5 ${subColor}`}>
          {subtitleText}
        </span>
      )}
    </div>
  );
};
