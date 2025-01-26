import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import geojsonData from "./assets/data/vietnam_history.json";

const VietnamHistoryMap: React.FC = () => {
  useEffect(() => {
    // Khởi tạo bản đồ
    const map = L.map("map").setView([16.047079, 108.206230], 6);

    // Thêm layer chỉ hiển thị khu vực Việt Nam
    L.tileLayer("https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Thêm GeoJSON hiển thị bản đồ lịch sử
    const historyLayer = L.geoJSON(geojsonData as any, {
      style: (feature: any) => ({
        color: feature.properties.color || "#3388ff",
        weight: 2,
      }),
      onEachFeature: (feature, layer) => {
        const { name, period } = feature.properties;
        layer.bindPopup(`<b>${name}</b><br>Thời kỳ: ${period}`);
      },
    });

    historyLayer.addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100vw" }}></div>;
};

export default VietnamHistoryMap;
