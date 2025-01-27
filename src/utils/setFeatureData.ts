import L, { Map } from "leaflet";

export const setFeatureData = (map: Map, geojsonData: any, options: any = {}) => {

  // Add GeoJSON data with a click event to show selected feature
  const mapLayer = L.geoJSON(geojsonData, {
    style: options?.setStyle,
    onEachFeature: options?.onEachFeature,
  });

  map.fitBounds(mapLayer.getBounds());
  mapLayer.addTo(map);
}