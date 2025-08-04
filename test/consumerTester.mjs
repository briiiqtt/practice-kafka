import { poll } from '../src/consumer.mjs';

const run = () => {
  poll('log-1', 'partition-test', 'logger');
  poll('log-2', 'partition-test', 'logger');
  poll('log-3', 'partition-test', 'logger');
  poll('store-1', 'partition-test', 'data-store');
  poll('store-2', 'partition-test', 'data-store');
  poll('store-3', 'partition-test', 'data-store');
};

run();