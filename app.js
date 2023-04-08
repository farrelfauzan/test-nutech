/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import express from "express";
import dotenv from "dotenv";

import bodyParser from "body-parser";
import cors from "cors";

import publicRoutes from "./src/routes/public";
import apiRoutes from "./src/routes/api";
import adminRoutes from "./src/routes/admin";
import apiMiddleware from "./src/middleware/apiAuth";
import adminMiddleware from "./src/middleware/adminAuth";
import errorHandler from "./src/middleware/errorHandler";

dotenv.config();
require("./src/config/sequelize");

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // specify the allowed origin(s)
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // specify the allowed headers
  credentials: true, // enable sending cookies and other credentials
};
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static("./public"));
app.use("/pub", publicRoutes);
app.use("/api", apiMiddleware, apiRoutes);
app.use("/api/admin", apiMiddleware, adminMiddleware, adminRoutes);
app.use(errorHandler);

module.exports = app;
