const { StaticPool } = require("node-worker-threads-pool");

const filePath =
  "C:/Martini/Projects/WideRangeTestToll/client-app-template/thread_pool/worker_1.js";

const pool = new StaticPool({
  size: 4,
  task: filePath,
  workerData: "workerData!",
});

for (let task = 0; task < 40; task++) {
  (async () => {
    const res = await pool.exec(task);

    console.log(`Called (${task}) result:`, res);
  })();
}
