const ProgressBar = ({ title, progress, subtitle }) => {
  return (
    <div className="glass-panel p-6 flex flex-col rounded-xl h-full text-light-text dark:text-dark-text">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-4">
        {title}
      </h3>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-4xl font-bold text-center text-light-text dark:text-dark-text mb-4">
          {progress}%
        </div>
        
        <div className="space-y-2">
          <div className="w-full h-6 bg-blue-900/30 dark:bg-blue-800/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-light-text/70 dark:text-dark-text/70">
            <span>0</span>
            <span>{subtitle} completed</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;