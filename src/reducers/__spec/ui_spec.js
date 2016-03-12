import 'babel-polyfill'
import assert from 'assert'
import uiReducer from './../ui.js'

console.log(uiReducer)

describe('uiReducer', () => {

	var state = {
		windowHeight: 100,
		windowWidth: 200,
		scrollTop: 20
	}

	it('sets scroll top', () => {
		var action = { type: 'SET_SCROLL_TOP', data: 20 }
		var newState = uiReducer(state, action)
		assert.equal(newState.scrollTop, 20)
	})

	it('sets window height', () => {
		var action = { type: 'SET_WINDOW_DIMENSIONS', data: { height: 15 } }
		var newState = uiReducer(state, action)
		assert.equal(newState.windowHeight, 15)
	})

	it('does not mutate state', () => {
		var action = { type: 'SET_SCROLL_TOP', data: 20 }
		var newState = uiReducer(state, action)
		assert.notEqual(state, newState)
	})

})