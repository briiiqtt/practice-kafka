import { Kafka } from 'kafkajs';

export const poll = async (clientId, topic, groupId) => {
  const kafka = new Kafka({
    clientId, // 이건 그냥 디버깅용 식별자
    brokers: ['localhost:9092'],
  });

  const consumer = kafka.consumer({ groupId });
  /*
   * group의 역할
   * 1. 중복을 방지함. (한 그룹 내에서 한 개의 consumer만 메시지를 가져감)
   * 2. 그룹 id를 다르게 주면 한 메시지에 대해 분리된 여러 처리가 가능
   * 3. offset(메시지 어디까지 읽었는 지)은 그룹별로 관리됨.
   */
  await consumer.connect();

  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`${topic}/${partition}/${clientId}: ${message.value.toString()}`);
    },
  });
};
