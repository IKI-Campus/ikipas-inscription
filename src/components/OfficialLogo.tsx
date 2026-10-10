import React from 'react';
import ikipasLogoImg from '../assets/images/ikipas_logo_1791468523824.jpg';
import ikipasOfficialStampImg from '../assets/images/ikipas_official_stamp_1791628936035.jpg';
import ikipasStampCircleImg from '../assets/images/ikipas_stamp_circle_1791628990163.jpg';

export { ikipasLogoImg, ikipasOfficialStampImg, ikipasStampCircleImg };

interface OfficialLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'emblem' | 'full' | 'stamp' | 'stamp-circle' | 'badge' | 'image';
  monochrome?: boolean;
  withText?: boolean;
}

/**
 * Official IKIPAS Logo Component
 * IKIPAS - Le premier pas vers votre passion
 */
export const OfficialLogo: React.FC<OfficialLogoProps> = ({
  className = '',
  size = 64,
  variant = 'image',
}) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  // Stamp variant using the official uploaded IKIPAS administrative stamp with signature
  if (variant === 'stamp') {
    return (
      <div
        className={`inline-flex items-center justify-center select-none overflow-hidden shrink-0 ${className}`}
        style={{
          width: typeof size === 'number' ? `${size * 1.5}px` : dimension,
          height: dimension,
          maxWidth: '100%',
        }}
      >
        <img
          src={ikipasOfficialStampImg}
          alt="Cachet officiel IKIPAS et signature"
          className="w-full h-full object-contain"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'block',
          }}
          loading="eager"
        />
      </div>
    );
  }

  // Stamp circle variant
  if (variant === 'stamp-circle') {
    return (
      <div
        className={`inline-flex items-center justify-center select-none overflow-hidden shrink-0 ${className}`}
        style={{
          width: dimension,
          height: dimension,
          maxWidth: '100%',
        }}
      >
        <img
          src={ikipasStampCircleImg}
          alt="Cachet officiel IKIPAS circulaire"
          className="w-full h-full object-contain"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'block',
          }}
          loading="eager"
        />
      </div>
    );
  }

  // The actual official uploaded IKIPAS logo image
  return (
    <div
      className={`inline-flex items-center justify-center select-none overflow-hidden shrink-0 ${className}`}
      style={{
        width: dimension,
        height: dimension,
      }}
    >
      <img
        src={ikipasLogoImg}
        alt="IKIPAS - Le premier pas vers votre passion"
        className="w-full h-full object-contain rounded-lg"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          display: 'block',
        }}
        loading="eager"
      />
    </div>
  );
};

/**
 * Colored IKIPAS Typography Component with Tagline
 */
export const IkipasBrandTypography: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  showSlogan?: boolean;
  className?: string;
}> = ({ size = 'md', showSlogan = true, className = '' }) => {
  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
  };

  const sloganSizes = {
    sm: 'text-[8.5px]',
    md: 'text-[10px] sm:text-[11px]',
    lg: 'text-xs',
  };

  return (
    <div className={`flex flex-col leading-tight select-none ${className}`}>
      {/* Colored Letters IKIPAS */}
      <div className={`font-black tracking-wider flex items-center ${titleSizes[size]}`}>
        <span style={{ color: '#102A6B' }}>I</span>
        <span style={{ color: '#8831B7' }}>K</span>
        <span style={{ color: '#DE2528' }}>I</span>
        <span style={{ color: '#EF7C12' }}>P</span>
        <span style={{ color: '#259F4E' }}>A</span>
        <span style={{ color: '#102A6B' }}>S</span>
      </div>

      {/* Colorful Gradient Underline */}
      <div
        className="h-0.5 rounded-full my-0.5"
        style={{
          background: 'linear-gradient(90deg, #102A6B 0%, #8831B7 20%, #DE2528 40%, #EF7C12 60%, #259F4E 80%, #102A6B 100%)',
          width: '100%',
        }}
      />

      {/* Slogan */}
      {showSlogan && (
        <span
          className={`font-semibold tracking-wide text-[#374151] dark:text-[#CBD7C7] uppercase ${sloganSizes[size]}`}
          style={{ letterSpacing: '0.04em' }}
        >
          Le premier pas vers votre passion
        </span>
      )}
    </div>
  );
};

// Aliases for compatibility
export const EquipasBrandTypography = IkipasBrandTypography;
