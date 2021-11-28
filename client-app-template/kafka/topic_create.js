const { Kafka } = require("kafkajs");
const ip = require("ip");

const host = process.env.HOST_IP || "localhost" || ip.address();

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [`${host}:9092`],
});

run();
async function run() {
  // Producing
  try {
    const admin = kafka.admin();
    console.log("Connecting...");
    await admin.connect();
    console.log("Connected");
    // Creatting Topic
    //A-M, N-Z
    await admin.createTopics({
      topics: [
        {
          topic: "correspondences",
          numPartitions: 2,
        },
      ],
    });
    console.log("Created Successfully a topic");
    await admin.disconnect();
  } catch (ex) {
    console.log(`Something went wrong ${ex}`);
  } finally {
    process.exit(0);
  }
}
