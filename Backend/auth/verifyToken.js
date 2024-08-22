import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

//middleware verifie et authentifie un utilisateur base sur le jeton JWT
export const authenticate = async(req, res, next) => {
    
    //Recuperer le token des en-tetes
    const authToken = req.headers.authorization;

    //verifie si le token existe 
    if(!authToken || !authToken.startsWith("Bearer ")){
        return res.status(401).json({ success: false, message: "No token, authorization denied"});
    }

    try {
       

        const token = authToken.split(" ")[1];

        // verifie le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.userId = decoded.id
        req.role = decoded.role

        
        next(); // must be call the next function
    } catch (err) {

        if(err.name=='TokenExpiredError'){
            return res.status(401).json({message: 'Token is expired'})
        }

        return res.status(401).json({ success:false, message: 'Invalid token'})
    }
}

//middleware restreint l'acces a certaines routes en fonction de role d'user
export const restrict = roles=> async(req,res,next)=>{

    const userId = req.userId

    let user;

    const patient = await User.findById(userId)
    const doctor = await Doctor.findById(userId)

    if(patient) {
        user = patient
    }
    if(doctor){
        user = doctor
    }

    //verifier si le role d'user est inclus dans les roles autorises
    if(!roles.includes(user.role)){

        return res.status(401).json({ success: false, message: "You're not authorized"})
    }

    next();
}