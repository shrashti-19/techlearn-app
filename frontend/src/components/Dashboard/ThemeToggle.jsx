import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 rounded-full transition-all duration-300
        ${theme === 'light' ? 
          'bg-gray-200 hover:bg-gray-300 text-yellow-500' : 
          'bg-gray-700 hover:bg-gray-600 text-yellow-300'}
        shadow-md hover:shadow-lg
      `}
    >
      {theme === 'light' ? (
        <span className="text-xl">🌙</span>
      ) : (
        <span className="text-xl">☀️</span>
      )}
    </button>
  );
};

export default ThemeToggle;