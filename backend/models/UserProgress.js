import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
        unique:true
    },
      xpFromLearn: {
          type: Number,
          default: 0,
      },
      xpFromBuild: {
          type: Number,
          default: 0,
      },
      calendarActivity: {
          type: Map,
          of: String, 
          default: {},
      },
      courseProgress:{
       courseTitle: { type: String },
       progressPercent: { type: Number, default: 0 },
       estimatedTimeRemaining: { type: String, default: "0min" }
      },
      exerciseProgress:{
        totalExercises: { type: Number, default: 0 },
        completedExercises: { type: Number, default: 0 },
      },
      recentActivity: {
        course: String,
        module: String,
        status: [String],
     },
    enrolledCourses: [
    {
      title: String,
      progressPercent: Number,
    },
],
  }, { timestamps: true });

  const UserProgress = mongoose.model("UserProgress", userProgressSchema);
  export default UserProgress;