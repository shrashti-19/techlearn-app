import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/Dashboard/Sidebar';
import UserGreeting from '../components/Dashboard/UserGreeting';
import ProgressDonut from '../components/Dashboard/ProgressDonut';
import Calendar from '../components/Dashboard/Calendar';
import XPDisplay from '../components/Dashboard/XPDisplay';
import RecentExercises from '../components/Dashboard/RecentExercises';
import ThemeToggle from '../components/Dashboard/ThemeToggle';
import ProgressBar from '../components/Dashboard/ProgressBar';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data (same as before)
        const mockUser = { 
          firstName: 'John', 
          lastName: 'Doe',
          email: 'john.doe@example.com'
        };
        
        const mockProgress = {
          course: { 
            title: 'Introduction to HTML', 
            progressPercent: 75 
          },
          exercise: { 
            completed: 3, 
            total: 4 
          },
          xp: 84,
          calendar: {
            '2025-06-27': 'completed',
            '2025-06-26': 'attempted',
            '2025-06-25': 'inactive'
          },
          recentExercises: [
            { 
              title: 'JavaScript Basics', 
              description: 'Practice coding exercises and improve your skills',
              count: 10, 
              xp: 100, 
              free: true 
            },
            { 
              title: 'CSS Layouts', 
              description: 'Master flexbox and grid layouts',
              count: 8, 
              xp: 80, 
              free: true 
            },
            { 
              title: 'React Hooks', 
              description: 'Learn useState and useEffect',
              count: 5, 
              xp: 120, 
              free: false 
            }
          ]
        };

        setUser(mockUser);
        setProgress(mockProgress);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Failed to load dashboard data:', err);
      }
    };

    fetchData();
  }, []);

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <div className="text-xl animate-pulse text-gray-800 dark:text-gray-200">
          Loading your dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <div className="text-xl text-red-500 dark:text-red-400">
          Error loading dashboard: {error}
        </div>
      </div>
    );
  }

  if (!user || !progress) return null;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className={`absolute inset-0 -z-10 ${theme === 'dark' ? 
        'bg-gradient-to-br from-[#020b23] via-[#001233] to-[#0a1128]' : 
        'bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[[#daf0fa]'}`}
      />
      <Sidebar onToggle={handleSidebarToggle} />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-56'} p-6`}>
        <div className={`max-w-[1800px] mx-auto ${sidebarCollapsed ? 'pl-8' : ''}`}>
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <UserGreeting name={`${user.firstName} ${user.lastName}`} />
            <ThemeToggle />
          </header>
          
          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Course Progress */}
            <div className="lg:col-span-1">
              <ProgressDonut 
                title="Course Progress" 
                progress={progress.course.progressPercent}
                subtitle={progress.course.title}
              />
            </div>
            
            {/* Middle Column - XP Points and Exercise Progress stacked */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <XPDisplay points={progress.xp} />
              <ProgressBar 
                title="Exercise Progress" 
                progress={Math.round((progress.exercise.completed / progress.exercise.total) * 100)}
                subtitle={`${progress.exercise.completed}/${progress.exercise.total}`}
              />
            </div>
            
            {/* Right Column - Calendar */}
            <div className="lg:col-span-1">
              <Calendar activities={progress.calendar} />
            </div>
            
            {/* Exercises Section - Full width below */}
            <div className="col-span-full mt-6">
              <RecentExercises exercises={progress.recentExercises} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;