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
import { fetchDashboardData } from '../api/dashboardService';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Add this function definition
  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await fetchDashboardData();
        
        setUser({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email
        });
        
        setProgress({
          course: {
            title: data.courseProgress?.courseTitle || 'No active course',
            progressPercent: data.courseProgress?.progressPercent || 0
          },
          exercise: {
            completed: data.exerciseProgress?.completedExercises || 0,
            total: data.exerciseProgress?.totalExercises || 0
          },
          xp: data.xpPoints?.totalXP || 0,
          calendar: data.calendarActivity || {},
          recentExercises: data.recentExercises || []
        });
        
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
        setLoading(false);
      }
    };

    loadData();
  }, []);

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
    <div className={`flex min-h-screen w-full ${theme === 'dark' ? 'dark' : 'light'}`}>
      {/* Background gradient */}
      <div className={`fixed inset-0 -z-10 ${theme === 'dark' ? 
        'bg-gradient-to-br from-[#020b23] via-[#001233] to-[#0a1128]' : 
        'bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#daf0fa]'}`}
      />
      
      {/* Sidebar */}
      <Sidebar onToggle={handleSidebarToggle} />
      
      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-[10px]' : 'ml-[10px]'
      } p-6 overflow-auto`}>
        <div className="max-w-[1800px] mx-auto">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <UserGreeting name={`${user.firstName} ${user.lastName}`} />
            <ThemeToggle />
          </header>
          
          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1">
              <ProgressDonut 
                title="Course Progress" 
                progress={progress.course.progressPercent}
                subtitle={progress.course.title}
              />
            </div>
            
            {/* Middle Column */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <XPDisplay points={progress.xp} />
              <ProgressBar 
                title="Exercise Progress" 
                progress={Math.round((progress.exercise.completed / progress.exercise.total) * 100)}
                subtitle={`${progress.exercise.completed}/${progress.exercise.total}`}
              />
            </div>
            
            {/* Right Column */}
            <div className="lg:col-span-1">
              <Calendar activities={progress.calendar} />
            </div>
            
            {/* Full width section */}
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