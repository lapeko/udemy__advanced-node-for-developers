import cluster from "cluster";
import express from "express";

const app = express();

const doWork = (duration: number) => {
  const start = Date.now();
  while (Date.now() < start + duration) {}
}

const runForks = (numberOfForks: number) => {
  for (let i = 0; i < numberOfForks; i++) cluster.fork();
};

cluster.isPrimary
  ? runForks(4)
  : main();

function main() {
  app.get("/", (req, res) => {
    doWork(10000);
    res.send("Ok");
  });

  app.get("/fast", (req, res) => {
    res.send("Fast");
  });

  app.listen(3000, () => console.log("Server is running on port 3000"));
}
