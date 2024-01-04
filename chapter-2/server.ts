import express from "express";

const app = express();

const doWork = (duration: number) => {
  const start = Date.now();
  while (Date.now() < start + duration) {}
}

app.get("/", (req, res) => {
  doWork(10000);
  res.send("Ok");
});

app.listen(3000, () => console.log("Server is running on port 3000"));
