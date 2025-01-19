import {User} from "../Models/User.models.js"
import {Apierror} from "../Utils/apierror.js"
import {asincHandler} from "../Utils/asyncHandlers.js"
import {apirsponse} from "../Utils/apiresponse.js"
import jwt from "jsonwebtoken"
//import { User } from "../Models/User.models.js"
import bcrypt from "bcryptjs"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Apierror(404, "User not found");
      }
  
      // Generate tokens using instance methods
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
  
      // Store the refresh token in the user record
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      console.error("Error generating tokens:", error.message);
      throw new Apierror(500, "Unable to generate tokens. Please try again.");
    }
  };
  

const registerUser = asincHandler(async (req, res) => {
    try {
        const { name, email, password ,confirmpassword} = req.body;

        // Validation: Check for empty fields
        if ([name, email, password,confirmpassword].some((field) => !field?.trim())) {
            throw new Apierror(400, "All fields are required");
        }

        //check password===confirmpassword
        if(password!==confirmpassword){
            throw new Apierror(400,"Passwords are not same")
        }

        // Check if user already exists (username or email)
        const existedUser = await User.findOne({ $or: [{ name }, { email }] });
        if (existedUser) {
            throw new Apierror(409, "User with this email or username already exists");
        }

          // Hash the password
        //const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password before saving

        // Check for uploaded files
        // console.log('Uploaded files:', req.files);

        // const avatarlocalpath = req.files?.avatar?.[0]?.path;
        //const coverimagelocalpath = req.files?.coverimage?.[0]?.path || null;
        
        // let coverimagelocalpath;
        // if(req.files && Array.isArray(req.files.coverImage)&&req.files.coverimage.length>0){
        //     coverimagelocalpath = req.files.coverimage[0].path
        // }


        // console.log('Avatar file path:', avatarlocalpath);
        // console.log('Cover image file path:', coverimagelocalpath);

        // // Ensure avatar is provided
        // if (!avatarlocalpath) {
        //     console.error('Avatar file missing:', req.files);
        //     throw new Apierror(400, "Avatar file is required");
        // }

        // // Upload files to Cloudinary
        // const avatar = await uploadoncl(avatarlocalpath);
        // let coverImage = null;

        // if (coverimagelocalpath) {
        //     coverImage = await uploadoncl(coverimagelocalpath);
        // }

        // // Ensure avatar upload is successful
        // if (!avatar?.url) {
        //     throw new Apierror(400, "Failed to upload avatar file");
        // }

        // Create the user
        const user = await User.create({
            name,
            //avatar: avatar.url,
            //coverimage: coverImage?.url || "", // Cover image is optional
            email,
            password
            //username: username.toLowerCase(),dfbn8e
        });

        // Fetch the created user without sensitive fields
        const createdUser = await User.findById(user._id)
            .select("-password -refreshToken")
            .lean();

        if (!createdUser) {
            throw new Apierror(500, "Error occurred while registering the user");
        }

        // Return success response
        res.status(201).json(new apirsponse(200, createdUser, "User registered successfully"));
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: error.message });
    }
});


const loginuse =  asincHandler(async (req,res)=>{

    //req body->data
    //username or email
    //find the usr
    //password check
    //access and refresh token
    //send cookie
  
 
    const {email,password}=req.body
     console.log("from loginfunc",email)
    if(!(email)){
     throw new Apierror(400,"email or password is required")
 
    }
 
    const user = await User.findOne({ email });
 
    if(!user){
     throw new Apierror(404 ,"User does not exist")
    }
 
    const ispasswordvalid = await user.isPasswordCorrect(password)
    console.log("password comparison result: ",ispasswordvalid);
    


    if(!ispasswordvalid){
     throw new Apierror(401 ,"password is not correct")
    }
 
    const{accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
 
    const options = {
        httpOnly:true,
        secure:true,
        sameSite: "lax",
      }
      console.log("Setting cookies:", { accessToken, refreshToken });
    
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
     new apirsponse(
         200,
         {
             user: loggedInUser,accessToken,refreshToken
         },
         "user logged in successfully"
     )
    )
 })


 const loggout= asincHandler(async(req,res)=>{
   
 
     try {
        const options = {
            httpOnly:true,
            secure:true
          }
         
    
        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new apirsponse(200,{},"User logged out"))
     } catch (error) {
        return res.status(500).json({ message: "Logout failed" });
     }
     
 })

// const registerUser = asincHandler( async(req,res) => {
//     res.status(200).json({
//         message:"ok"
//     })
// })

export{
    registerUser,
    loginuse,
    loggout
}
