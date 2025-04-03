import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorHandler";
import userRoutes from "./rotues/user.routes";
import cors from "cors";
const app: Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT;

app.use(cors());

app.use("/api", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
