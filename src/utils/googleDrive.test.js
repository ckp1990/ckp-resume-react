import { test } from 'node:test'
import assert from 'node:assert'
import { fetchGoogleDriveMediaInternal } from './googleDrive.js'

test('fetchGoogleDriveMediaInternal returns data when array is not empty', () => {
  const mockData = [
    { id: '1', title: 'Media 1', type: 'image', googleDriveId: 'id1' },
    { id: '2', title: 'Media 2', type: 'video', googleDriveId: 'id2' }
  ]
  const result = fetchGoogleDriveMediaInternal(mockData)
  assert.deepStrictEqual(result, mockData)
})

test('fetchGoogleDriveMediaInternal returns null when array is empty', () => {
  const mockData = []
  const result = fetchGoogleDriveMediaInternal(mockData)
  assert.strictEqual(result, null)
})

test('fetchGoogleDriveMediaInternal returns null when data is null or undefined', () => {
  assert.strictEqual(fetchGoogleDriveMediaInternal(null), null)
  assert.strictEqual(fetchGoogleDriveMediaInternal(undefined), null)
})
