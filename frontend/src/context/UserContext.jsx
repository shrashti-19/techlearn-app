import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'; // or your preferred HTTP client

// 1. Create the context
const UserContext = createContext();

// 2. Create the provider component
export const UserProvider = ({ children }) => {
  // User data state
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // User progress data (for ProgressBar/Donut)
  const [progress, setProgress] = useState({
    courseProgress: 0,
    goalsProgress: 0,
  });

  // XP points
  const [xp, setXp] = useState(0);

  // Recent exercises
  const [recentExercises, setRecentExercises] = useState([]);

  // Calendar activities
  const [activities, setActivities] = useState({});

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        // Example API calls (adjust endpoints as needed)
        const [userRes, xpRes, exercisesRes, progressRes, activitiesRes] = await Promise.all([
          axios.get('/api/user'),
          axios.get('/api/user/xp'),
          axios.get('/api/exercises/recent'),
          axios.get('/api/user/progress'),
          axios.get('/api/user/activities'),
        ]);

        setUser(userRes.data);
        setXp(xpRes.data.points);
        setRecentExercises(exercisesRes.data.exercises);
        setProgress({
          courseProgress: progressRes.data.courseProgress,
          goalsProgress: progressRes.data.goalsProgress,
        });
        setActivities(activitiesRes.data.activities);

      } catch (err) {
        setError(err.message || 'Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Value provided to consuming components
  const value = {
    user,
    isLoading,
    error,
    xp,
    recentExercises,
    progress,
    activities,
    // Methods to update state if needed
    updateXp: (newXp) => setXp(newXp),
    markActivity: (date, status) => setActivities(prev => ({
      ...prev,
      [date]: status
    })),
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Create a custom hook for easy access
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};