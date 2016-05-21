import {
  SET_SCROLL_TOP,
  SET_WINDOW_DIMENSIONS,
  SET_LOADED_IMAGE
} from '../constants/actions.js';

export function setScrollTop(scrollTop) {
  return {
    type: SET_SCROLL_TOP,
    data: scrollTop
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
