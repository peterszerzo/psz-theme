import {
  SET_URL
} from '../constants/actions.js';

export function setUrl(url) {
  return {
    type: SET_URL,
    data: url
  };
}
