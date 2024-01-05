import express from "express";
import { Worker } from "worker_threads";

const app = express();

app.get("/", (req, res) => {
  const worker = new Worker("./chapter-2/worker.js", {workerData: "Hello world"});

  worker.on("message", (data) => {
    res.json({data});
  });

  worker.on("error", (err) => {
    res.send("error");
  });

  worker.postMessage("Some message");
});

app.listen(3000, () => console.log("Server is running on port 3000"));