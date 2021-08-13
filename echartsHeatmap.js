// 热力图基本设置
class HeatMap {
  constructor(params) {
    this.heatMapLayer;
    this.markerGroup;
    this.addHeatMapLayer();
  }
  addHeatMapLayer() {
    this.heatMapLayer = L.supermap.heatMapLayer("heatMap", {
      id: "heatmap",
      map: map,
      radius: 45,
      alwaysMapCRS:false,
      // useGeoUnit:true,
      opacity: 0.8,
      featureWeight: "value",
      loadWhileAnimating: false,
      colors: ["rgb(0,0,255)", "rgb(0,255,255)", "rgb(0,255,0)", "yellow", "rgb(255,0,0)"]
    });
    this.geojsonParse();
    // console.log(cityData.get("北京市"));
  }

  // 本地CSV数据转换为geojson数据
  geojsonParse(params) {
    let markers = [];
    let geojson = {
      "type": "FeatureCollection",
      "features": [],
    };
    let index = timeTransfer(tp_heat_infor_date);
    for (const [key, value] of cityData) {
      // console.log(value.lng,value.lat);
      let feature = {
        "type": "feature",
        "geometry": {
          "type": "Point",
          "coordinates": [],
        },
        "properties": {
          "value": parseFloat(value.TEMPERATURE[index]),
        },
      };
      // let latlng = L.CRS.EPSG4326.latLngToPoint(L.latLng(value.lng, value.lat));
      // console.log(latlng);
      /* fixme: 热力图 marker X为经度 Y为维度
      */
      feature.geometry.coordinates = [parseFloat(value.lng), parseFloat(value.lat)];
      console.log(key,feature.geometry.coordinates,value.TEMPERATURE[index]);
      let latlng = [value.lat, value.lng];
      console.log(latlng);
      markers.push(
        L.marker(latlng).bindPopup(
          `
      城市：${key}<br>
      气温：${value.TEMPERATURE[index]}°<br>
      日期：${tp_heat_infor_date}`
        )
      );
      geojson.features.push(feature);
    }
    this.markerGroup = L.layerGroup(markers);
    this.heatMapLayer.addFeatures(geojson);
    this.heatMapLayer.addTo(map);
  }
}
let tp_HeatMAP = new HeatMap();
// setTimeout(() => {
//   // tp_HeatMAP.addHeatMapLayer();
// }, 3000);
