import {SET_URL} from '../constants/actions';

export default function urlReducer(state = '', {type, data}) {

  switch(type) {
    case SET_URL:
      return data;
    default:
      return state;
  }

}
