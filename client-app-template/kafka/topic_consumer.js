const { Kafka } = require("kafkajs");
//const ip = require("ip");

const host = "localhost"; //process.env.HOST_IP || "localhost" || ip.address();

// arg[0] node
// arg[1] js file
//arg [2] thrird param
const msg = process.argv[2];

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [`${host}:9092`, `${host}:9093`, `${host}:9094`],
});

run();
async function run() {
  // Producing
  try {
    const consumer = kafka.consumer({ groupId: "PerformanceTest" });

    console.log("Connecting...");
    await consumer.connect();
    console.log("Connected");

    consumer.subscribe({
      topic: "correspondences",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Received Msg ${result.message.value} on Partition: ${result.partition}`,
        );
      },
    });
  } catch (ex) {
    console.log(`Something went wrong ${ex}`);
  } finally {
    // process.exit(0);
  }
}
