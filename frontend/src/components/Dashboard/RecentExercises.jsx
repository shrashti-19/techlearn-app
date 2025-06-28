const RecentExercises = ({ exercises }) => {
  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-4">
        Recent Exercises
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.slice(0, 3).map((exercise, index) => (
          <div 
            key={index} 
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-all hover:shadow-md flex flex-col h-full"
          >
            <h4 className="text-md font-semibold text-gray-800 dark:text-white">
              {exercise.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 flex-grow">
              {exercise.description}
            </p>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 mb-3">
              <span>{exercise.count} Exercises</span>
              <span>{exercise.xp} XP</span>
              <span className={exercise.free ? 'text-green-500' : 'text-purple-400'}>
                {exercise.free ? 'Free' : 'Premium'}
              </span>
            </div>
            <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded-md text-sm transition-colors">
              Start Practicing
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentExercises;