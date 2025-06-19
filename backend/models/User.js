import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required:true,
            trim: true
        },
        lastName:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique: true,
            lowercase:true
        },
        password:{
            type:String,
            // password required only if not google user
            required: function(){
                return !this.isGoogleUser;
            },
        },
        isGoogleUser:{
            type: Boolean,
            default: false
        }
    },
    {timestamps:true}
);

// hashing the input password before saving
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

//comparing entered password with hashed password

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

const User = mongoose.model("User", userSchema);
export default User;