# practice-kafka

Kafka 이해를 위한 맛보기 프로젝트

```
docker-compose up -d
```

## 기술 스택
- Node.js 22
- Docker 27
- Kafka 7.6.0

## 실행 방법

```bash
# 의존성 설치
npm install

# 컨테이너 올리기
docker-compose up -d

# Consumer 테스터 실행
node test/consumerTester.mjs

# Producer 테스터 실행
node test/producerTester.mjs

# producerTester 프로세스에서 아무 키나 입력해서 메시지를 produce 할 수 있음
# consumerTester 프로세스에서 메시지 consume 확인
```

