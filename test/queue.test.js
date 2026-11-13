import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Queue } from '../src/structures/Queue.js';

test('empty queue', () => {
  const q = new Queue();
  assert.equal(q.isEmpty(), true);
  assert.equal(q.dequeue(), undefined);
});

test('FIFO order', () => {
  const q = new Queue();
  [1, 2, 3].forEach(x => q.enqueue(x));
  assert.equal(q.dequeue(), 1);
  assert.equal(q.dequeue(), 2);
  assert.equal(q.size, 1);
});