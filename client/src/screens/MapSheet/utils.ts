export function getBoundingBoxCorners(coordinates: number[][]) {
  let minLat = coordinates[0][0];
  let minLng = coordinates[0][1];
  let maxLat = coordinates[0][0];
  let maxLng = coordinates[0][1];

  for (const coordinate of coordinates) {
    const [lat, lng] = coordinate;
    minLat = Math.min(minLat, lat);
    minLng = Math.min(minLng, lng);
    maxLat = Math.max(maxLat, lat);
    maxLng = Math.max(maxLng, lng);
  }

  const sw = [minLat, minLng];
  const ne = [maxLat, maxLng];

  return { sw, ne };
}
