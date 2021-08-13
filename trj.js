// 热力图基本设置
function addHeatMapLayer() {
  heatMapLayer = L.supermap.heatMapLayer("heatMap", {
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
  geojson();
  // console.log(cityData.get("北京市"));
}

// 本地CSV数据转换为geojson数据
function geojson(params) {
  $.get("data/weather.csv", function (response) {
    let dataObj = Papa.parse(response, {
      skipEmptyLines: true,
      header: true,
    });

    // console.log(dataObj);
    let data = dataObj.data;
    // geojson数据
    let geojson = {
      type: "FeatureCollection",
      features: [],
    };
    // console.log(data)
    // console.log(cityData);   //data
    for (let i = 0; i < (data.length)/7; i++) {
      let item = data[i];
      // console.log(item);
      let feature = {
        type: "feature",
        geometry: {
          type: "Point",
          coordinates: [],
        },
        properties: {
          value: parseFloat(item.temperature),
        },
      };
      let latlng = L.CRS.EPSG3857.unproject(L.point(item.X, item.Y));

      // console.log(parseFloat(latlng.lat), parseFloat(latlng.lng));
      feature.geometry.coordinates = [
        parseFloat(latlng.lng),
        parseFloat(latlng.lat),
      ];
      geojson.features.push(feature);
      // console.log(geojson);
    }
    console.log(geojson);
    heatMapLayer.addFeatures(geojson);
    heatMapLayer.addTo(map);
  });
}
setTimeout(() => {
  addHeatMapLayer();
  
}, 3000);