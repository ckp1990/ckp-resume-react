import { test } from 'node:test';
import assert from 'node:assert';
import { getIcon } from './iconMap.js';
import { FaTrophy, FaAward, FaMedal, FaStar, FaCertificate } from 'react-icons/fa/index.js';

test('getIcon returns correct icon component for valid names', () => {
  assert.strictEqual(getIcon('FaTrophy'), FaTrophy);
  assert.strictEqual(getIcon('FaAward'), FaAward);
  assert.strictEqual(getIcon('FaMedal'), FaMedal);
  assert.strictEqual(getIcon('FaStar'), FaStar);
  assert.strictEqual(getIcon('FaCertificate'), FaCertificate);
});

test('getIcon returns FaTrophy for unknown icon names', () => {
  assert.strictEqual(getIcon('UnknownIcon'), FaTrophy);
  assert.strictEqual(getIcon(''), FaTrophy);
});

test('getIcon returns FaTrophy for null or undefined input', () => {
  assert.strictEqual(getIcon(null), FaTrophy);
  assert.strictEqual(getIcon(undefined), FaTrophy);
});
