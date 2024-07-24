import React from 'react';

interface StatBarProps {
  statName: string;
  statValue: number;
}

const StatBar: React.FC<StatBarProps> = ({ statName, statValue }) => {
  const maxStatValue = 255; 
  const barWidth = (statValue / maxStatValue) * 100;

  return (
    <div className="mb-2">
      <div className="flex justify-between">
        <span className="capitalize font-medium">{statName}</span>
        <span>{statValue}</span>
      </div>
      <div className="w-full bg-gray-300 dark:bg-gray-700 rounded h-4">
        <div
          className="bg-red-500 dark:bg-red-600 h-4 rounded"
          style={{ width: `${barWidth}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatBar;
