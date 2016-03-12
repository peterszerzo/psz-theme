import 'babel-polyfill'

import assert from 'assert'

import postEntitiesReducer from './../posts.js'

describe('postEntitiesReducer', () => {

	it('adds new post summaries on successful fetch', () => {
		var action = {
			type: 'FETCH_ALL_POST_SUMMARIES_SUCCESS',
			data: [ { id: '1', name: '1' }, { id: '2', name: '2' } ]
		}
		assert.deepEqual(postEntitiesReducer({}, action), {
			summaries: {
				status: 'success',
				data: [ { id: '1', name: '1' }, { id: '2', name: '2' } ]
			}
		})
	})

	it('adds new single post on successful fetch', () => {
		var action = {
			type: 'FETCH_SINGLE_POST_SUCCESS',
			data: { slug: '1', name: '1' }
		}
		assert.deepEqual(postEntitiesReducer({ bySlug: { '2': { status: 'success', data: { slug: '2', name: '2' } } } }, action), {
			bySlug: {
				'1': {
					status: 'success',
					data: { slug: '1', name: '1' }
				},
				'2': {
					status: 'success',
					data: { slug: '2', name: '2' }
				}
			}
		})
	})

})
