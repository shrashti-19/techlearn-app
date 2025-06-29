const XPDisplay = ({ points = 0, loading = false, error = null }) => {
  return (
    <div className="glass-panel p-6 flex flex-col items-center justify-center rounded-xl h-full text-light-text dark:text-dark-text">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
        XP Points
      </h3>
      
      {loading ? (
        <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent mt-2 animate-pulse">
          ...
        </div>
      ) : error ? (
        <div className="text-4xl font-bold text-red-500 mt-2">Error</div>
      ) : (
        <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent mt-2">
          {points.toLocaleString()} {/* Formats number with commas */}
        </div>
      )}
      
      <p className="text-sm text-light-text/70 dark:text-dark-text/70 mt-1">
        {error ? 'Failed to load points' : 'Points collected'}
      </p>
    </div>
  );
};

export default XPDisplay;