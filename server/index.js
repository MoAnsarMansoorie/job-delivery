import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connectDb.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.send("Hello server!!!")
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`)
})