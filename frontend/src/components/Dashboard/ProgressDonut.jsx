const ProgressDonut = ({ title, progress, subtitle }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="glass-panel p-6 flex flex-col items-center rounded-xl h-full min-h-[300px] text-light-text dark:text-dark-text">
      <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-4">
        {title}
      </h3>
      
      {/* Donut chart container */}
      <div className="relative w-64 h-64 my-2 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            strokeWidth="12"
            className="stroke-blue-900/30 dark:stroke-blue-800/40"
            fill="none"
          />
          {/* Progress circle - using your emerald-500 color */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 100 100)"
            className="stroke-emerald-500" // Using your defined color
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        {/* Center percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-light-text dark:text-dark-text">
            {progress}%
          </span>
        </div>
      </div>
      
      <p className="text-md text-light-text/70 dark:text-dark-text/70 text-center mt-2">
        {subtitle}
      </p>
    </div>
  );
};

export default ProgressDonut;