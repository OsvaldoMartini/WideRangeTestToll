const { Kafka } = require("kafkajs");

const host = "localhost"; //process.env.HOST_IP || "localhost" || ip.address();

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [`${host}:9092`, `${host}:9093`, `${host}:9094`],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello KafkaJS user!" }],
  });

  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);