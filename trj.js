// 热力图基本设置

// 本地CSV数据转换为geojson数据
function geojson(params) {
    let geojson = {
      type: "FeatureCollection",
      features: [],
    };
    let index = timeTransfer(tp_heat_infor_date);
    for (const [key, value] of cityData) {
      // console.log(value.lng,value.lat);
      let feature = {
        type: "feature",
        geometry: {
          type: "Point",
          coordinates: [],
        },
        properties: {
          value: parseFloat(value.TEMPERATURE[index]),
        },
      };
      // let latlng = L.CRS.EPSG4326.latLngToPoint(L.latLng(value.lng, value.lat));
      // console.log(latlng);
      feature.geometry.coordinates = [parseFloat(value.lng), parseFloat(value.lat)];
      let latlng = [value.lat, value.lng];
      // console.log(index);
      L.marker(latlng)
        .bindPopup(
          `
        城市：${key}<br>
        气温：${value.TEMPERATURE[index]}°<br>
        日期：${tp_heat_infor_date}`
        )
        .addTo(map);
      geojson.features.push(feature);
    }
    heatMapLayer.addFeatures(geojson);
    heatMapLayer.addTo(map);
    console.log(heatMapLayer);
  }
  
  // 

  function  addHeatMapLayer() {
      heatMapLayer = L.supermap.heatMapLayer(
        "heatMap", 
        //  ["blue", "cyan", "lime", "yellow", "white"],
        
          {
              loadWhileAnimating: false,
              colors:["rgb(0,0,255)", "rgb(0,255,255)", "rgb(0,255,0)", "yellow", "rgb(255,0,0)"],
          id: "heatmap",
          map: map,
          radius: 75,
          // useGeoUnit:true,
          opacity: 0.8,
          featureWeight: "value",
        }
      );
      geojson();
      // console.log(cityData.get("北京市"));
    }

  