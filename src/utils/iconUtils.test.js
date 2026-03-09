import { test } from 'node:test'
import assert from 'node:assert'
import { getIconFromMap } from './iconUtils.js'

test('getIconFromMap returns the correct icon from map', () => {
  const map = {
    'IconA': 'ComponentA',
    'IconB': 'ComponentB'
  }
  const defaultIcon = 'Default'

  assert.strictEqual(getIconFromMap('IconA', map, defaultIcon), 'ComponentA')
  assert.strictEqual(getIconFromMap('IconB', map, defaultIcon), 'ComponentB')
})

test('getIconFromMap returns default icon if name not in map', () => {
  const map = {
    'IconA': 'ComponentA'
  }
  const defaultIcon = 'Default'

  assert.strictEqual(getIconFromMap('IconUnknown', map, defaultIcon), 'Default')
})

test('getIconFromMap handles null or missing name', () => {
  const map = {
    'IconA': 'ComponentA'
  }
  const defaultIcon = 'Default'

  assert.strictEqual(getIconFromMap(null, map, defaultIcon), 'Default')
  assert.strictEqual(getIconFromMap(undefined, map, defaultIcon), 'Default')
})

test('getIconFromMap handles missing map', () => {
  const defaultIcon = 'Default'
  assert.strictEqual(getIconFromMap('IconA', null, defaultIcon), 'Default')
  assert.strictEqual(getIconFromMap('IconA', undefined, defaultIcon), 'Default')
})
