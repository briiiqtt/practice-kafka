import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-producer-1', // 이건 그냥 디버깅용 식별자
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

export const produce = async (msg) => {
  await producer.connect();

  const topic = 'partition-test';
  /*
  * key의 역할?
  * 1. 어느 파티션으로 갈 지를 결정함 (key 없으면 round-robin, 있으면 hash(key) % partition 수)
  * 2. 같은 key는 항상 같은 파티션으로 가기 때문에 순서가 보장됨
  *     -> user 로그의 순서를 보장하고 싶으면 key를 userId로 지정하면 되것지요
  */
  const messages = [{ value: msg }];

  await producer.send({ topic, messages });

  console.log('sent message:', msg);

  await producer.disconnect();
};
