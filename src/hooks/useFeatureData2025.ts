
import { useMemo } from "react";
import L, { Map } from "leaflet";
import geojsonData1 from "../assets/data/vietnam-2025-part-1.json";
import geojsonData2 from "../assets/data/vietnam-2025-part-2.json";
import geojsonData3 from "../assets/data/vietnam-2025-part-3.json";
import geojsonData4 from "../assets/data/vietnam-2025-part-4.json";
import geojsonData5 from "../assets/data/vietnam-2025-part-5.json";
import geojsonData6 from "../assets/data/vietnam-2025-part-6.json";

import districtData from "../assets/data/diaphanhuyen.json";

const provinceData = geojsonData1;
provinceData.features = [
  ...provinceData.features,
  ...geojsonData2.features,
  ...geojsonData3.features,
  ...geojsonData4.features,
  ...geojsonData5.features,
  ...geojsonData6.features,
]

export const useFeatureData2025 = (map?: Map) => {

  const province = useMemo(() => {
    return {
      ...provinceData,
      features: provinceData.features.map((feature: any) => ({
        ...feature,
        wikiSrc: `https://vi.wikipedia.org/wiki/${(feature.properties?.name || "").split(" ").join("_")}`
      }))
    }
  }, [])

  if (!map) {
    return [{
      geojsonData: province
    }, {} as any]
  }

  const selectedLayerGroup = L.layerGroup().addTo(map);

  // Function to display only the selected feature
  const showSelectedFeature = (feature: any) => {
    selectedLayerGroup.clearLayers();
    const selectedFeatureLayer = L.geoJSON(feature, {
      style: {
        color: feature.properties.color || "#ff0000",
        weight: 3,
      },
    });
    selectedLayerGroup.addLayer(selectedFeatureLayer);
    map.fitBounds(selectedFeatureLayer.getBounds());
  };

  return [{
    geojsonData: province,
    province,
    districtData: districtData,
  }, {
    onEachFeature: (feature: any, layer: any) => {
      layer.on("click", () => {
        console.log("feature", feature)
        showSelectedFeature(feature);
      });
    },
    setStyle: (feature: any) => ({
      color: feature.properties.color || "#3388ff",
      weight: 2,
    })
  }];
}