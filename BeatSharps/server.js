const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI || "mongodb+srv://..."; // Вставишь из MongoDB Atlas
mongoose.connect(mongoUri);

const recordSchema = new mongoose.Schema({
  name: String,
  level: Number,
  percent: Number,
  stars: Number,
  createdAt: { type: Date, default: Date.now }
});

const Record = mongoose.model("Record", recordSchema);

app.post("/submit", async (req, res) => {
  const { name, level, percent, stars } = req.body;
  if (!name || level == null || percent == null || stars == null) {
    return res.status(400).send("Некорректные данные");
  }
  await Record.create({ name, level, percent, stars });
  res.send("Рекорд сохранён!");
});

app.get("/leaderboard/:level", async (req, res) => {
  const level = parseInt(req.params.level);
  const top = await Record.find({ level })
    .sort({ percent: -1, stars: -1, createdAt: 1 })
    .limit(10);
  res.json(top);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server on ${port}`));
