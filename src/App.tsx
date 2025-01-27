import React, { useEffect, useRef, useState } from "react";
import L, { Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css"
import { useFeatureData2025 } from "./hooks/useFeatureData2025";
import { fixedViewMap } from "./utils/fixedViewMap";
import { setBaseLayer } from "./utils/setBaseLayerMap";
import { setFeatureData } from "./utils/setFeatureData";

const MapView: React.FC = () => {
  const mapRef = useRef<Map>();
  const [currentMap, setMap] = useState<Map | null>(null);
  const [{
    geojsonData
  }, {
    onEachFeature,
    setStyle
  }] = useFeatureData2025(mapRef.current);

  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView([16.047079, 108.20623], 9);

    // Add base tile layer
    setBaseLayer(map);

    // Fixed view
    fixedViewMap(map)


    mapRef.current = map;
    setMap(map)

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (currentMap) {
      setFeatureData(currentMap, geojsonData, {
        onEachFeature,
        setStyle
      })
    }
  }, [currentMap])

  return <div id="map" style={{ height: "100vh", width: "100vw" }}></div>;
};

export default MapView;
