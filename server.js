import express from "express";
import * as dotenv from 'dotenv';
dotenv.config({ path: "./config.env" });

import { connectDB } from './config/db.js'

// Conexion a la base datos

connectDB();

const app = express();

import authRoute from "./routes/auth.js";

app.use(express.json());

app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`server running at ${PORT}`));

process.on("unhandledRejection", () => {
    console.log(`El error es: ${err}`);
    server.close(() => process.exit(1));
});