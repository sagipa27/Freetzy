import express from "express";
import * as dotenv from 'dotenv';
dotenv.config({ path: "./config.env" });
import { connectDB } from './config/db.js'
import authRoute from "./routes/auth.js";
import privateRoute from "./routes/private.js";
import { errorHandler } from "./middlewares/error.js";



const app = express();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`server running at ${PORT}`));


// Conexion a la base datos
connectDB();

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/private', privateRoute);

//Manejo de errores

app.use(errorHandler);


process.on("unhandledRejection", () => {
    console.log(`El error es: ${err}`);
    server.close(() => process.exit(1));
});