import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connectDb.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

// api endpoints
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
    res.send("Hello server!!!")
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`)
})