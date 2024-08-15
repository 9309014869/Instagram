import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
{
    username:{
         type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar: {
        type: String,      
        default:null,
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    refreshToken:{
        type:String,
    }
},
{
    timestamps:true,
}
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    
    this.password= await bcrypt.hash(this.password,12)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        username:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }// "15m"
    )
}


userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
    
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    } 
    )
}



export const User = mongoose.model("User",userSchema);