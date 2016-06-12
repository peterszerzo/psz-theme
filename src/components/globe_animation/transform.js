import * as geoUtil from './geometry_utilities.js';

import {GRAPHICS_SIZE} from './constants.js';

function getTransformedCoordinates(coordinates, lightCentroid, dimensions) {
  return coordinates.map((point) => {
    const {width, height} = dimensions;
    const scale = Math.max(width, height * 1.5) / 180 * 2;
    const x0 = width / 2;
    const y0 = height / 2;
    return [
      (point[0] + lightCentroid[0]) * scale + x0,
      (point[1] + lightCentroid[1]) * scale + y0
    ];
  });
}

function getOpacity(coordinates, lightCentroid) {
  const centroid = coordinates.slice(0, 3).reduce((previousValue, coord) => {
    return [
      previousValue[0] + coord[0] / 3,
      previousValue[1] + coord[1] / 3
    ];
  }, [0, 0]);
  const dx = centroid[0] + lightCentroid[0];
  const dy = centroid[1] + lightCentroid[1];
  let opacity = (dx ** 2 + dy ** 2) ** 0.5 / GRAPHICS_SIZE;
  const maxOpacity = 0.3;
  if (opacity > maxOpacity) {
    opacity = maxOpacity;
  }
  return ((maxOpacity - opacity) / maxOpacity) ** 3;
}

function getIsHovered(transformedCoordinates, mouse) {
  return geoUtil.contains(transformedCoordinates, mouse);
}

function transformPolygon(coordinates, lightCentroid, dimensions, mouse) {
  const transformedCoordinates = getTransformedCoordinates(coordinates, lightCentroid, dimensions);
  const isHovered = getIsHovered(transformedCoordinates, mouse);
  return {
    transformedCoordinates: transformedCoordinates,
    opacity: getOpacity(coordinates, lightCentroid),
    isHovered
  };
}

export default function transformPolygons(polygons, lightCentroid, dimensions, mouse) {
  return polygons.map((polygon) => (transformPolygon(polygon, lightCentroid, dimensions, mouse)));
}
