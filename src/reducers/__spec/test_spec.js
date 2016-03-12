import testReducer from './../test.js'
import assert from 'assert'

describe('testReducer', () => {

	it('sets default property', () => {
		assert.equal(testReducer(null, { type: 'UNREGISTERED_ACTION_TYPE' }), 'not set')
	})

	it('sets test property', () => {
		assert.equal(testReducer(null, { type: 'SET_TEST_PROP' }), 'set')
	})

})