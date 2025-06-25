// import UserProgress from "../models/UserProgress.js";
// import User from "../models/User.js";

// export const getDashboardData = async(req,res)=>{
//     try{
//         const userId = req.user._id;
//         //fetching user progress

//         let progress = await UserProgress.findOne({userId});

//         if(!progress){
//             //no progress found then 0
//             progress = {
//                 xpFromLearn: 0,
//                 xpFromBuild: 0,
//             };
//         }

//         //dummy data
//         const courseProgress = {
//             courseTitle: 'HTML',
//             progressPercent: 25,
//             estimatedTimeRemaining: '39min'
//         };

//           const exerciseProgress = {
//       totalExercises: 10,
//       completedExercises: 4,
//     };

//     const calendarActivity = {
//       '2025-06-05': 'Completed',
//       '2025-06-06': 'Completed',
//     };

//     const recentActivity = {
//       course: 'HTML',
//       module: 'Headings',
//       status: ['Solved'],
//     };

//     const enrolledCourses = [
//       { title: 'HTML', progressPercent: 75 },
//       { title: 'React', progressPercent: 45 },
//     ];

//     res.status(200).json({
//         courseProgress,
//         exerciseProgress,
//         calendarActivity,
//         recentActivity,
//         enrolledCourses,
//         xpPoints:{
//             xpFromLearn: progress.xpFromLearn,
//             xpFromBuild: progress.xpFromBuild,
//             totalXP: progress.xpFromLearn + progress.xpFromBuild,
//         },
//     });
// }catch(error){
//     console.error("Dashboard data fetch from error:",error);
//     res.status(500).json({message: 'Server Error'});
    
// }
// };

//real fetching 
import UserProgress from "../models/UserProgress.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    let progress = await UserProgress.findOne({ userId });

    if (!progress) {
      // If no progress, send defaults or empty data
      return res.status(200).json({
        courseProgress: {},
        exerciseProgress: { totalExercises: 0, completedExercises: 0 },
        calendarActivity: {},
        recentActivity: {},
        enrolledCourses: [],
        xpPoints: {
          xpFromLearn: 0,
          xpFromBuild: 0,
          totalXP: 0,
        },
      });
    }

    res.status(200).json({
      courseProgress: progress.courseProgress || {},
      exerciseProgress: progress.exerciseProgress || { totalExercises: 0, completedExercises: 0 },
      calendarActivity: progress.calendarActivity || {},
      recentActivity: progress.recentActivity || {},
      enrolledCourses: progress.enrolledCourses || [],
      xpPoints: {
        xpFromLearn: progress.xpFromLearn,
        xpFromBuild: progress.xpFromBuild,
        totalXP: progress.xpFromLearn + progress.xpFromBuild,
      },
    });
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    res.status(500).json({ message: "Server error fetching dashboard data" });
  }
};
