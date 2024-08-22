import express from "express";
import { createBooking, deleteBooking} from "../Controllers/bookingController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router({ mergeParams: true});
 
router.route("/").post(authenticate,restrict(["patient"]),createBooking);
router.delete("/:id", authenticate,restrict(["patient"]),deleteBooking);

export default router;