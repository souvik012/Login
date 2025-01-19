import Router from "express";
import {registerUser} from "../Controllers/User.controler.js";
import { loginuse } from "../Controllers/User.controler.js";
// import {upload} from "../Middlewares/multer.mddleware.js"
// //import { verifyJWT } from "../middlewares/auth.middleware.js";
import { loggout } from "../Controllers/User.controler.js";
import {verifyJWT} from "../Middlewares/auth.middleware.js"


const router = Router()

router.route("/register").post( registerUser);
console.log("Connected");
router.route("/login").post( loginuse);

router.route("/logout").post(verifyJWT, loggout)


// router.post("/register", (req, res) => {
//     console.log("Request Body:", req.body); // Log the incoming data
//     res.status(200).json({ message: "Register POST route works!" });
// });

  

// router.post('/register', upload.fields([{ name: 'avatar' }, { name: 'coverimage' }]), registerUser);

// router.route("/login").post(loginuse)

// //section-sequre routs
// router.route("/logout").post(verifyJWT, loggout)

// router.route("/refresh-token").post(refreashaccesstoken)

export default router