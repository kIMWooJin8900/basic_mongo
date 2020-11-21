import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import Lecture from "./models/Lecture";
import Snack from "./models/Snack";
import path from "path";

// 192.168.219.191/admin

const PORT = 7000;

const app = express();
app.use(morgan(`dev`));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "/assets")));

mongoose.connect(
  `mongodb://4leaf:fourleaf0309@192.168.219.149:27017/admin`,
  {
    dbName: `EDU_1`,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (error) => {
    if (error) {
      console.log("❌Failed To DB Connect");
    } else {
      console.log("✅ CUNNECT TO DB! ✅");
    }
  }
);
app.get("/", async (req, res) => {
  console.log("🐶CALLED BY USER");

  const result = await Lecture.find({}, {});

  return res.render("home", { lectureList: result });
});

app.get("/snack", async (req, res) => {
  const result = await Snack.find({}, {});

  console.log(result);
});
app.get("/lecture", async (req, res) => {
  const result = await Lecture.find({}, {});
  res.render("lecture", { dataList: result });
});

app.get("/board", (req, res) => {
  res.render("board");
});

app.get("/test", (req, res) => {
  res.render("layouts/main");
});
app.get("/test1", (req, res) => {
  res.render("screens/test1");
});
app.get("/test2", (req, res) => {
  res.render("screens/test2");
});
app.listen(PORT, () => {
  console.log(`${PORT} server start`);
});