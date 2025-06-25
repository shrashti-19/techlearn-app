import UserProgress from "../models/UserProgress";

export const addXP = async(req,res)=>{
    const {source, points} = req.body;
    const userId = req.user_.id;

    try{
        let progress = await UserProgress.findOne({userId});
        if(!progress){
            progress = new UserProgress({userId});
        }

        if(source === "learn") progress.xpFromLearn+=points;
        else if(source === "build") progress.xpFromBuild+=points;

        await progress.save();

        res.status(200).json({
            message: "XP added successfully",
            updatedXP:{
                xpFromLearn: progress.xpFromLearn,
                xpFromBuild: progress.xpFromBuild,
                totalXP: progress.xpFromLearn + progress.xpFromBuild,
            },
        });
    }catch(error){
        console.error("Error adding XP", error);
        res.status(500).json({message: "Server error"});
        
    }
};
