const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 3001;

const userModel = require("./models/User");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173",
       "https://your-frontend.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());
//localhost =
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  userModel
    .find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findById(id)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.post("/createUser", (req, res) => {
  userModel
    .create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.put("/updateUser/:id", (req, res) => {
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

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
