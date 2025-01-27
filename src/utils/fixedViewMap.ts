import { Map } from "leaflet";

export const fixedViewMap = (map: Map, bounds?: any) => {
  const currentBounds: any = bounds || [
    [23.393395, 102.14441], // Top-left corner
    [8.179066, 109.464367], // Bottom-right corner
  ];
  map.setMaxBounds(currentBounds);
  map.on("drag", function () {
    map.panInsideBounds(currentBounds, { animate: false });
  });
}