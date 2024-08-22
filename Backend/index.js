import express from "express"
import cookieParser from "cookie-parser"//Middleware pour analyser les cookies attaches aux requetes
import cors from "cors"//Middleware permet de contrôler les accès de domaines externes à l'API
import mongoose from "mongoose"//Biblio pour interagir avec MongoDB
import dotenv from "dotenv"//permet de charger les variables d'environnement depuis un fichier
import authRoute from "./Routes/auth.js"
import userRoute from "./Routes/user.js"
import doctorRoute from "./Routes/doctor.js"
import reviewRoute from "./Routes/review.js"
import bookingRoute from "./Routes/booking.js"



dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
    origin: "http://localhost:5173", // Origine explicite de votre frontend
    credentials: true, // Si vous utilisez des cookies ou des en-têtes d'autorisation
    optionsSuccessStatus: 200 // Pour les navigateurs anciens qui renvoient parfois 204
};

app.get('/',(req,res)=>{
    res.send('Api is working')
})

//database connection
mongoose.set('strictQuery', false)
const connectDB = async()=> {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB database is connected')
    } catch(err) {
        console.log('MongoDB database is connection failed')
    }
};

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors', doctorRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/bookings', bookingRoute);


app.listen(port, () => {
    connectDB();
    console.log("Server is running on port " + port);
})