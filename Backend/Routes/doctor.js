import express from "express";
import { updateDoctor, deleteDoctor, getAllDoctor, getSingleDoctor, getDoctorProfile } from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./review.js";
import bookingRouter from "./booking.js"

const router = express.Router();

//sous router
router.use("/:doctorId/reviews", reviewRouter)//permet de gerer les review associees a un docteur identifie par le id

router.use("/:doctorId/booking", bookingRouter) 

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.put("/:id", authenticate, restrict(['doctor']), updateDoctor);
router.delete("/:id", authenticate, restrict(['doctor']), deleteDoctor);
router.get("/profile/me", authenticate, restrict(['doctor']), getDoctorProfile)

export default router;