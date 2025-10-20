import React from 'react';

const CircularProgress = ({ progress = 75, size = 100, stroke = 8 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className='flex items-center justify-center' style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className='-rotate-90' // rotate entire circle to start from top
      >
        <circle
          stroke='#e5e7eb' // gray-200
          fill='transparent'
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke='#8e4ec6' // blue-500
          fill='transparent'
          strokeWidth={stroke}
          strokeLinecap='round'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className='transition-all duration-500 ease-out'
        />
      </svg>
      {/* overlay the text without rotation */}
      <div className='absolute text-[10px]'>{progress}%</div>
    </div>
  );
};

export default CircularProgress;
