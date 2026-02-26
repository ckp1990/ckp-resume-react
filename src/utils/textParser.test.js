import { test } from 'node:test';
import assert from 'node:assert';
import { parseTextWithReact } from './textParser.js';

// Mock React-like instance for testing
const mockReact = {
  createElement: (type, props, ...children) => ({
    type,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children
    }
  })
};

test('parseTextWithReact returns null for null/empty input', () => {
  assert.strictEqual(parseTextWithReact(null, mockReact), null);
  assert.strictEqual(parseTextWithReact('', mockReact), null);
});

test('parseTextWithReact returns plain text as an array with one string', () => {
  const result = parseTextWithReact('Hello world', mockReact);
  assert.deepStrictEqual(result, ['Hello world']);
});

test('parseTextWithReact handles <strong> tags', () => {
  const result = parseTextWithReact('Hello <strong>world</strong>!', mockReact);
  assert.strictEqual(result.length, 3);
  assert.strictEqual(result[0], 'Hello ');
  assert.strictEqual(result[1].type, 'span');
  assert.strictEqual(result[1].props.className, 'font-semibold dark:text-red-500');
  assert.strictEqual(result[1].props.children, 'world');
  assert.strictEqual(result[2], '!');
});

test('parseTextWithReact handles <em> tags', () => {
  const result = parseTextWithReact('Hello <em>world</em>!', mockReact);
  assert.strictEqual(result.length, 3);
  assert.strictEqual(result[0], 'Hello ');
  assert.strictEqual(result[1].type, 'span');
  assert.strictEqual(result[1].props.className, 'text-gray-700 italic dark:text-red-400');
  assert.strictEqual(result[1].props.children, 'world');
});

test('parseTextWithReact handles <code> tags', () => {
  const result = parseTextWithReact('Hello <code>world</code>!', mockReact);
  assert.strictEqual(result.length, 3);
  assert.strictEqual(result[0], 'Hello ');
  assert.strictEqual(result[1].type, 'span');
  assert.strictEqual(result[1].props.className, 'font-mono font-semibold dark:text-red-500');
  assert.strictEqual(result[1].props.children, 'world');
});

test('parseTextWithReact handles mixed sequential tags', () => {
  const result = parseTextWithReact('<strong>Bold</strong> and <em>italic</em> and <code>code</code>', mockReact);
  assert.strictEqual(result.length, 5);
  assert.strictEqual(result[0].type, 'span');
  assert.strictEqual(result[0].props.children, 'Bold');
  assert.strictEqual(result[1], ' and ');
  assert.strictEqual(result[2].type, 'span');
  assert.strictEqual(result[2].props.children, 'italic');
  assert.strictEqual(result[3], ' and ');
  assert.strictEqual(result[4].type, 'span');
  assert.strictEqual(result[4].props.children, 'code');
});

test('parseTextWithReact handles multiple tags of the same type', () => {
  const result = parseTextWithReact('<strong>A</strong> and <strong>B</strong>', mockReact);
  assert.strictEqual(result.length, 3);
  assert.strictEqual(result[0].props.children, 'A');
  assert.strictEqual(result[1], ' and ');
  assert.strictEqual(result[2].props.children, 'B');
});

test('parseTextWithReact handles tags with spaces around content', () => {
  const result = parseTextWithReact('test <strong> bold </strong> test', mockReact);
  assert.strictEqual(result[1].props.children, ' bold ');
});

test('parseTextWithReact handles unclosed tags as plain text', () => {
    const result = parseTextWithReact('This is <strong>unclosed', mockReact);
    assert.deepStrictEqual(result, ['This is <strong>unclosed']);
});
