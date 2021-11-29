const { DynamicPool } = require("node-worker-threads-pool");

const dynamicPool = new DynamicPool(4);

dynamicPool
  .exec({
    task: (n) => n + 1,
    param: 1,
  })
  .then((result) => {
    console.log(result); // result will be 2.
    return;
  });

dynamicPool
  .exec({
    task: (n) => n + 2,
    param: 1,
  })
  .then((result) => {
    console.log(result); // result will be 3.
    return;
  });
