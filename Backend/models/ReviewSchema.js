import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

//pre middleware Avant toute opération find* ce middleware rempli le champ user avec name et photo
reviewSchema.pre(/^find/, function(next){
  this.populate({path: "user", select: "name photo"});
  next();
});

//fonction qui calcule la moyenne des notes et le nombre total de reviews pour un docteur.
reviewSchema.statics.calclAverageRatings = async function(doctorId){

  
  const stats = await this.aggregate([{
    $match:{doctor:doctorId} //filter le review qui correspent au docteur
  },
  {
    $group:{
      _id:'$doctor',
      numOfRating:{$sum:1},
      avgRating:{$avg:'$rating'}
    }
  }
  ])
  
  await Doctor.findByIdAndUpdate(doctorId, {
    totalRating: stats[0].numOfRating,
    averageRating: stats[0].avgRating,
  })
}
// apres chaque review ce middleware va appeler la fonction calclAverageRatings pour recalculer leur note
reviewSchema.post("save", function() {
  this.constructor.calclAverageRatings(this.doctor);
});

export default mongoose.model("Review", reviewSchema);
