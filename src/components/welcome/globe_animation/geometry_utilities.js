export function subtractAngles(angle1, angle2) {
        if (angle1 < 90 && angle2 > 270) {
            return Math.abs(angle1 + 360 - angle2);
        }
        if (angle2 < 90 && angle1 > 270) {
            return Math.abs(angle2 + 360 - angle1);
        }
        return Math.abs(angle1 - angle2);
    }


export function sphericalToCartesian(long, lat, r=1) {
        var degToRad = Math.PI / 180;
        return [Math.cos(long * degToRad) * Math.cos(lat * degToRad) * r, Math.sin(long * degToRad) * Math.cos(lat * degToRad) * r, Math.sin(lat * degToRad) * r];
    }


export function getLongLatDistance(longLat1, longLat2) {
        var distance, pos1, pos2;
        pos1 = geomUtil.sphericalToCartesian(longLat1[0], longLat1[1]);
        pos2 = geomUtil.sphericalToCartesian(longLat2[0], longLat2[1]);
        distance = geomUtil.getDistance(pos1, pos2);
        return distance;
    }


export function getDistance(pos1, pos2) {
  return Math.pow(Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2) + Math.pow((pos2[2] || 0) - (pos1[2] || 0), 2), 0.5)
}

export function crossProduct2D(vector1, vector2) {
  return vector1[0] * vector2[1] - vector1[1] * vector2[0]
}

// Works for triangle only.
export function contains(polygonPoints, point) {
  const p1 = polygonPoints[0]
  const p2 = polygonPoints[1]
  const p3 = polygonPoints[2]
  const v1 = [ p2[0] - p1[0], p2[1] - p1[1] ]
  const v2 = [ p3[0] - p2[0], p3[1] - p2[1] ]
  const v3 = [ p1[0] - p3[0], p1[1] - p3[1] ]
  const r1 = [ point[0] - p1[0], point[1] - p1[1] ]
  const r2 = [ point[0] - p2[0], point[1] - p2[1] ]
  const r3 = [ point[0] - p3[0], point[1] - p3[1] ]
  const cp1 = crossProduct2D(r1, v1)
  const cp2 = crossProduct2D(r2, v2)
  const cp3 = crossProduct2D(r3, v3)
  return (cp1 < 0 && cp2 < 0 && cp3 < 0) || (cp1 > 0 && cp2 > 0 && cp3 > 0)
}
