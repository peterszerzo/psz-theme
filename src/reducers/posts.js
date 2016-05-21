import {
  FETCH_POST,
  FETCH_POST_SUMMARIES
} from '../constants/actions.js';
import {empty} from '../constants/strings.js';

const defaultState = {
  bySlug: {},
  summaries: {
    status: empty,
    data: []
  }
};

export default function postEntitiesReducer(state = defaultState, action) {

  const {type, data, status} = action;

  switch(type) {

    case FETCH_POST_SUMMARIES:
      return Object.assign({}, state, {
        summaries: {
          status,
          data: data
        }
      });

    case FETCH_POST:
      // Use this change object to create a new version of state.byId without mutating.
      return Object.assign({}, state, {
        bySlug: Object.assign({}, state.bySlug, {
          [data.slug]: {
            status,
            data: data
          }
        })
      });

    default:
      return state;

  }

}
