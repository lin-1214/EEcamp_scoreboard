import express from "express";
import cors from "cors";
import routes from "./routes";
import mongoose from "mongoose";
import path from "path";

require("dotenv").config();
const app = express();

// init middleware
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
}

app.use(cors());

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const port = process.env.PORT || 4000;
const dboptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (!process.env.MONGO_URL) {
  console.error("Missing MONGO_URL!!!");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, dboptions).then(async (res) => {
  console.log("mongo db connection created");
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected!");
});

routes(app);
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
