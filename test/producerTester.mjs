import { produce } from '../src/producer.mjs';

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', (key) => {
  if (key === '\u0003') process.exit(); // Ctrl + C

  const keyString = JSON.stringify(key);
  
  console.log(`입력: ${keyString}`);

  produce(keyString);
});
