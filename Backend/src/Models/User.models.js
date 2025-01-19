import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    // username:{
    //     type:String,
    //     required:true,
    //     unique:true,
    //     lowercase:true,
    //     trim:true,
    //     index:true

    // },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email",
          ]
       
    },
    name:{
        type:String,
        required:true,
        trim:true,
        index:true

    },

    // avatar:{
    //     type:String,//cloudnary
    //     require:true,

    // },
    // coverimage:{
    //     type:String,//cloudnary

    // },
    // watchHistory:[
    //     {
    //         type:Schema.Types.ObjectId,
    //         ref:"Video"
    //     }
    // ],
    password:{
        type:String,
        required:[true , 'Password is required']
    },

    refreshToken:{
        typr:String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
{
    timestamps:true
}

) 

userSchema.pre("save",async function(next) {
    console.log("Password before hashing:",this.password)
    if(!this.isModified("password")){
        return next();
    } 
    //const bcrypt = await import("bcrypt");
    //console.log("Password before hashing:",password)
    this.password = await bcrypt.hash(this.password, 10)
    console.log("Hashed during saving the password :",this.password);
    
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    console.log("PasswordS to compare:", password);
    console.log("Password to compare:", this.password);
    console.log("Hashed password in database:", this.password);
    return await bcrypt.compare(password,this.password)
}




userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            //username: this.username,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User",userSchema)
