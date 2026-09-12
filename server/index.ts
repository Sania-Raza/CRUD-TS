import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns";
import userModel from "./models/User";

dotenv.config();
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI!)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
  });

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  cors({
    origin: "https://crud-ts-frontend.vercel.app",
    credentials: true,
  }),
);

app.use(express.json());

// GET all users
app.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userModel.find({});
    console.log(users);
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET user by ID
app.get("/getUser/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  userModel
    .findById(id)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

// CREATE user
app.post("/createUser", (req: Request, res: Response) => {
  userModel
    .create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

// UPDATE user
app.put("/updateUser/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  userModel
    .findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
      },
      { new: true },
    )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

// DELETE user
app.delete("/deleteUser/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  userModel
    .findByIdAndDelete({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

export default app;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
  });
}