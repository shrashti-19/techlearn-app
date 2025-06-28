const XPDisplay = ({ points }) => {
  return (
    <div className="glass-panel p-6 flex flex-col items-center justify-center rounded-xl h-full text-light-text dark:text-dark-text">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
        XP Points
      </h3>
      <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent mt-2">
        {points}
      </div>
      <p className="text-sm text-light-text/70 dark:text-dark-text/70 mt-1">
        Points collected
      </p>
    </div>
  );
};

export default XPDisplay;