import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: { type: Array },
  },
  { timestamps: true }
);


bookingSchema.pre(/^find/, function(next){
  this.populate({path: "user", select: "name photo gender email"})
      .populate({path: "doctor", select: "_id name photo gender email"});
  next();
});
export default mongoose.model("Booking", bookingSchema);
