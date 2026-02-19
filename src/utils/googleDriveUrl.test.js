import { test } from 'node:test'
import assert from 'node:assert'
import { getGoogleDriveUrl } from './googleDriveUrl.js'

test('getGoogleDriveUrl returns null if fileId is missing', () => {
  assert.strictEqual(getGoogleDriveUrl(null, 'image'), null)
  assert.strictEqual(getGoogleDriveUrl('', 'image'), null)
  assert.strictEqual(getGoogleDriveUrl(undefined, 'image'), null)
})

test('getGoogleDriveUrl returns correct thumbnail URL for images', () => {
  const fileId = '12345abcde'
  const expected = `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`
  assert.strictEqual(getGoogleDriveUrl(fileId, 'image'), expected)
})

test('getGoogleDriveUrl returns correct preview URL for videos', () => {
  const fileId = 'v12345video'
  const expected = `https://drive.google.com/file/d/${fileId}/preview`
  assert.strictEqual(getGoogleDriveUrl(fileId, 'video'), expected)
})

test('getGoogleDriveUrl returns null for unknown media types', () => {
  const fileId = '12345'
  assert.strictEqual(getGoogleDriveUrl(fileId, 'unknown'), null)
  assert.strictEqual(getGoogleDriveUrl(fileId, null), null)
  assert.strictEqual(getGoogleDriveUrl(fileId, ''), null)
})
