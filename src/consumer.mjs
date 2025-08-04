import { Kafka } from 'kafkajs';

const groupIdArgv = process.argv.find(el => el.toLowerCase().includes('groupid='));
const groupId = groupIdArgv.split("=")[1];

console.log('groupId:', groupId);

const kafka = new Kafka({
  clientId: 'my-consumer-1',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: `test-group-${groupId}` });

const run = async () => {
  await consumer.connect();
 
  const topic = 'my-topic-1';

  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`${message.value.toString()} | ${partition} | ${topic}`);
    },
  });
};

run().catch(console.error);
