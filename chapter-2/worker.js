const { parentPort } = require("worker_threads");

parentPort?.on("message", (data) => {
  console.log(data);
  parentPort?.postMessage(heavyCalculation());
});

function heavyCalculation() {
  for (let i = 0; i < 1e9; i++) {}
  return Math.random();
}