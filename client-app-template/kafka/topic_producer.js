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
    const producer = kafka.producer();
    console.log("Connecting...");
    await producer.connect();
    console.log("Connected");
    // Creatting Topic
    //A-M -> 0, N-Z -> 1
    const partition = msg[0] < "N" ? 0 : 1;
    const getRandomNumber = () => Math.round(Math.random(10) * 1000);
    const num = getRandomNumber();

    // const result = await producer.send({
    //   topic: "correspondences",
    //   messages: [
    //     { key: `key-${num}`, value: "hello world", partition: partition },
    //     { key: `key-${num}`, value: "hey hey!", partition: partition },
    //   ],
    // });

    const result = await producer.send({
      topic: "correspondences",
      messages: [
        {
          key: `key-${num}`,
          value: `value-${num}-${new Date().toISOString()}-${msg}`,

          partition: partition,
        },
      ],
    });

    console.log(`Send Successfully! ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (ex) {
    console.log(`Something went wrong ${ex}`);
  } finally {
    process.exit(0);
  }
}
