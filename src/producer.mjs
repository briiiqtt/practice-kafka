import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-producer-1',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

export const produce = async (msg) => {
  await producer.connect();

  const topic = 'my-topic-1';
  
  const key = 'someKey';
  /*
  * key의 역할?
  * 1. 어느 파티션으로 갈 지를 결정함 (key 없으면 round-robin, 있으면 hash(key) % partition 수)
  * 2. 같은 key는 항상 같은 파티션으로 가기 때문에 순서가 보장됨
  *     -> user 로그의 순서를 보장하고 싶으면 key를 userId로 지정하면 되것지요
  */
  const messages = [{ key, value: msg }];

  await producer.send({ topic, messages });

  console.log(messages.length, 'messages sent.');

  await producer.disconnect();
};
