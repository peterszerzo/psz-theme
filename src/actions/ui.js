import {
  SET_SCROLL,
  SET_WINDOW_DIMENSIONS,
  SET_LOADED_IMAGE
} from '../constants/actions.js';

export function setScroll(scrollTop, scrollDirection) {
  return {
    type: SET_SCROLL,
    data: {
      scrollTop,
      scrollDirection
    }
  };
}

export function setWindowDimensions({width, height}) {
  return {
    type: SET_WINDOW_DIMENSIONS,
    data: {
      width,
      height
    }
  };
}

export function setLoadedImage(url) {
  return {
    type: SET_LOADED_IMAGE,
    data: url
  };
}
