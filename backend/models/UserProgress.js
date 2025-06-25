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
      }
  }, { timestamps: true });

  const UserProgress = mongoose.model("UserProgress", userProgressSchema);
  export default UserProgress;