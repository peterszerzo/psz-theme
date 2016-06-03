import transformPolygons from './transform.js';

global.onmessage = ({data}) => {
  global.postMessage(transformPolygons(
    data.coordinates,
    data.lightCentroid,
    data.dimensions,
    data.mouse
  ));
};
