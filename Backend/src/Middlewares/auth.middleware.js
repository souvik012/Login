import { asincHandler } from "../Utils/asyncHandlers.js"
import { Apierror } from "../Utils/apierror.js"
import jwt from "jsonwebtoken"
import {User} from "../Models/User.models.js"

export const verifyJWT = asincHandler(async (req, _, next) => {
    try {
      console.log("Cookies:", req.cookies);
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace(/Bearer\s+/i, "").trim();

      console.log("Retrieved Token:", token);
  
      if (!token) {
        console.log("Unauthorized: No token provided");
        throw new Apierror(401, "Unauthorized");
      }
  
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
  
      if (!user) {
        throw new Apierror(401, "Invalid Access Token");
      }
  
      req.user = user;
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      throw new Apierror(401, error?.message || "Invalid Access Token");
    }
  });
  