import L, { Map } from "leaflet";

export const setBaseLayer = (map: Map
  , titleLayer: string = "https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  , options: any = {}
) => {

  L.tileLayer(titleLayer, {
    maxZoom: 12,
    minZoom: 6,
    attribution: "©taitran.dev",
    ...options
  }).addTo(map);
}