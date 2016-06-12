import assert from 'assert'
import mocha from 'mocha'
import * as geomUtil from './../geometry_utilities.js'

describe('geomUtil', () => {

	describe('sphericalToCartesian', () => {

		it('converts spherical to cartesian', () => {
			var coordinates = geomUtil.sphericalToCartesian(0, 0, 1)
			assert.deepEqual(coordinates, [ 1, 0, 0 ])
		})

		it('converts spherical to cartesian', () => {
			var coordinates = geomUtil.sphericalToCartesian(0, 90, 1)
			assert.equal(Math.abs(coordinates[0] - 0) < 0.0001, true)
			assert.equal(coordinates[1], 0);
			assert.equal(coordinates[2], 1);
		})

	})

	describe('getDistance', () => {

		it('finds distance between two points', () => {
			var distance = geomUtil.getDistance([ 5, 0, 0 ], [ 0, 12, 0 ]);
			assert.deepEqual(distance, 13)
		})

	})

	describe('contains', () => {

		it('contains point', () => {
			assert.equal(geomUtil.contains([ [0, 0], [0, 3], [3, 0] ], [ 1, 1 ]), true)
		})

		it('does not contain point', () => {
			assert.equal(geomUtil.contains([ [0, 0], [0, 3], [3, 0] ], [ 5, 5 ]), false)
		})

	})

})
