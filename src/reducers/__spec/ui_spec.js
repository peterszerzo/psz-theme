import assert from 'assert';
import uiReducer from './../ui.js';

describe('uiReducer', () => {

  const state = {
    windowHeight: 100,
    windowWidth: 200,
    scrollTop: 20
  };

  it('sets scroll top', () => {
    const action = {type: 'SET_SCROLL_TOP', data: 20};
    const newState = uiReducer(state, action);
    assert.equal(newState.scrollTop, 20);
  });

  it('sets window height', () => {
    const action = {type: 'SET_WINDOW_DIMENSIONS', data: {height: 15}};
    const newState = uiReducer(state, action);
    assert.equal(newState.windowHeight, 15);
  });

  it('does not mutate state', () => {
    const action = {type: 'SET_SCROLL_TOP', data: 20};
    const newState = uiReducer(state, action);
    assert.notEqual(state, newState);
  });

});
