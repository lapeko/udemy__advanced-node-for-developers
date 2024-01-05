process.env.UV_THREADPOOL_SIZE = "1";

import cluster from "cluster";
import express from "express";
import crypto from "crypto";

const app = express();

const doWork = (duration: number) => {
  const start = Date.now();
  while (Date.now() < start + duration) {}
}

const runForks = (numberOfForks: number) => {
  for (let i = 0; i < numberOfForks; i++) cluster.fork();
};

cluster.isPrimary
  ? runForks(8)
  : main();

function main() {
  app.get("/", (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, derivedKey) => {
      if (err) throw err;
      res.send("Ok");
    });
  });

  app.get("/fast", (req, res) => {
    res.send("Fast");
  });

  app.listen(3000, () => console.log("Server is running on port 3000"));
}
