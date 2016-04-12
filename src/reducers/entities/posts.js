export default function postEntitiesReducer(state = {}, action) {

  const {type, data} = action

  switch(type) {

    case 'FETCH_ALL_POST_SUMMARIES_SUCCESS':
      const summaries = {
        status: 'success',
        data: data
      }
      return Object.assign({}, state, {summaries: summaries})

    case 'FETCH_SINGLE_POST_SUCCESS':
      const singleEntity = {
        status: 'success',
        data: data
      }
      // Use this change object to create a new version of state.byId without mutating.
      let change = {}
      const {slug} = data
      change[slug] = singleEntity
      const bySlug = Object.assign({}, state.bySlug, change)
      return Object.assign({}, state, {bySlug: bySlug})

    default:
      return state

  }

}
