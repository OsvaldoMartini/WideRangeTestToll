const dynamicPool = new DynamicPool(4);

const buf = Buffer.alloc(1024 * 1024);

dynamicPool
  .createExecutor((buf) => {
    // do something with buf.
  })
  .setTimeout(1000) // set timeout for task.
  .setTransferList([buf.buffer]) // set transferList.
  .exec(buf) // execute!
  .then(() => console.log("done!"));
