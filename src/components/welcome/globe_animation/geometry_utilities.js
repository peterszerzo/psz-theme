export function subtractAngles(angle1, angle2) {
  if (angle1 < 90 && angle2 > 270) {
    return Math.abs(angle1 + 360 - angle2);
  }
  if (angle2 < 90 && angle1 > 270) {
    return Math.abs(angle2 + 360 - angle1);
  }
  return Math.abs(angle1 - angle2);
}


export function sphericalToCartesian(long, lat, r = 1) {
  const {PI, sin, cos} = Math;
  const degToRad = PI / 180;
  return [cos(long * degToRad) * cos(lat * degToRad) * r, sin(long * degToRad) * cos(lat * degToRad) * r, sin(lat * degToRad) * r];
}


export function getLongLatDistance(longLat1, longLat2) {
  const pos1 = sphericalToCartesian(longLat1[0], longLat1[1]);
  const pos2 = sphericalToCartesian(longLat2[0], longLat2[1]);
  const distance = getDistance(pos1, pos2);
  return distance;
}


export function getDistance(pos1, pos2) {
  return ((pos2[0] - pos1[0]) ** 2 + (pos2[1] - pos1[1]) ** 2 + ((pos2[2] || 0) - (pos1[2] || 0)) ** 2) ** 0.5;
}

export function crossProduct2D(vector1, vector2) {
  return vector1[0] * vector2[1] - vector1[1] * vector2[0];
}

// Works for triangle only.
export function contains(polygonPoints, point) {
  const p1 = polygonPoints[0];
  const p2 = polygonPoints[1];
  const p3 = polygonPoints[2];
  const v1 = [p2[0] - p1[0], p2[1] - p1[1]];
  const v2 = [p3[0] - p2[0], p3[1] - p2[1]];
  const v3 = [p1[0] - p3[0], p1[1] - p3[1]];
  const r1 = [point[0] - p1[0], point[1] - p1[1]];
  const r2 = [point[0] - p2[0], point[1] - p2[1]];
  const r3 = [point[0] - p3[0], point[1] - p3[1]];
  const cp1 = crossProduct2D(r1, v1);
  const cp2 = crossProduct2D(r2, v2);
  const cp3 = crossProduct2D(r3, v3);
  return (cp1 < 0 && cp2 < 0 && cp3 < 0) || (cp1 > 0 && cp2 > 0 && cp3 > 0);
}
