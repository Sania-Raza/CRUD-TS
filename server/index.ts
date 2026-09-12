import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns";
import userModel from "./models/User";

dotenv.config();
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const MONGO_URI = process.env.MONGO_URI as string;

// ---- Connection caching (serverless-safe) ----
let cached = (global as any).mongooseConn;
if (!cached) {
  cached = (global as any).mongooseConn = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, { bufferCommands: false })
      .then((m) => {
        console.log("MongoDB connected successfully");
        return m;
      })
      .catch((err) => {
        console.log("MongoDB connection failed:", err);
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

async function ensureDBConnected(req: Request, res: Response, next: NextFunction) {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
}

const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: "https://crud-ts-frontend.vercel.app",
    credentials: true,
  }),
);

app.use(express.json());
app.use(ensureDBConnected); 

// GET all users
app.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userModel.find({});
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
    .catch((err) => res.status(500).json(err));
});

// CREATE user
app.post("/createUser", (req: Request, res: Response) => {
  userModel
    .create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

// UPDATE user
app.put("/updateUser/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  userModel
    .findByIdAndUpdate(
      id,
      { name: req.body.name, email: req.body.email, age: req.body.age },
      { new: true },
    )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

// DELETE user
app.delete("/deleteUser/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

export default app;

if (process.env.NODE_ENV !== "production") {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at port ${PORT}`);
    });
  });
}
