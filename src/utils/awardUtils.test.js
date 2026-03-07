import { test } from 'node:test';
import assert from 'node:assert';
import { getAwardItemProps } from './awardUtils.js';

test('getAwardItemProps returns correct props for string award', () => {
  const result = getAwardItemProps('Best Developer Award', 'FaStar');

  assert.deepStrictEqual(result, {
    text: 'Best Developer Award',
    iconName: 'FaStar',
    url: null
  });
});

test('getAwardItemProps returns correct props for object award with only text', () => {
  const result = getAwardItemProps({ text: 'Innovation Prize' }, 'FaMedal');

  assert.deepStrictEqual(result, {
    text: 'Innovation Prize',
    iconName: 'FaMedal',
    url: undefined
  });
});

test('getAwardItemProps returns correct props for object award with custom icon', () => {
  const result = getAwardItemProps({ text: 'Top Contributor', icon: 'FaTrophy' }, 'FaMedal');

  assert.deepStrictEqual(result, {
    text: 'Top Contributor',
    iconName: 'FaTrophy',
    url: undefined
  });
});

test('getAwardItemProps returns correct props for object award with url', () => {
  const result = getAwardItemProps(
    { text: 'Certified Expert', url: 'https://example.com/cert' },
    'FaCertificate'
  );

  assert.deepStrictEqual(result, {
    text: 'Certified Expert',
    iconName: 'FaCertificate',
    url: 'https://example.com/cert'
  });
});

test('getAwardItemProps handles falsy URL correctly', () => {
  const result = getAwardItemProps(
    { text: 'Local Award', url: '' },
    'FaStar'
  );

  assert.deepStrictEqual(result, {
    text: 'Local Award',
    iconName: 'FaStar',
    url: ''
  });
});

test('getAwardItemProps handles missing icon properly, falling back to default', () => {
  const result = getAwardItemProps(
    { text: 'Missing Icon Award' },
    'FaAward'
  );

  assert.deepStrictEqual(result, {
    text: 'Missing Icon Award',
    iconName: 'FaAward',
    url: undefined
  });
});
