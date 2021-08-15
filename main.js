// 图表初始化
option = {
  legend: {
    data: ["降雨量", "径流量"],
    align: "left",
  },
  toolbox: {
    feature: {
      magicType: {
        type: ["stack", "tiled"],
      },
      saveAsImage: {
        pixelRatio: 2,
      },
    },
  },
  tooltip: {},
  xAxis: {
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    silent: false,
    splitLine: {
      show: false,
    },
  },
  yAxis: {},
  series: [
    {
      name: "bar",
      type: "bar",
      animationDelay: function (idx) {
        return idx * 10;
      },
    },
    {
      name: "bar2",
      type: "bar",
      animationDelay: function (idx) {
        return idx * 10 + 100;
      },
    },
  ],
  animationEasing: "elasticOut",
  animationDelayUpdate: function (idx) {
    return idx * 5;
  },
};
var div = L.DomUtil.create("div");
var chart = echarts.init(div, "", {
  width: 500,
  height: 300,
});
chart.setOption(option);

//  数据绑定
function chartSet(layer) {
  // function (layer) {
  let city = layer.feature.properties.NAME;
  console.log(myMap);
  let data1 = cityData.get(city).HUMIDITY;
  let data2 = cityData.get(city).RAINFALL;
  chart.setOption({
    title: {
      text: city,
      subtext: "",
    },
    series: [
      {
        name: "降雨量",
        data: data1,
      },
      {
        name: "径流量",
        data: data2,
      },
    ],
  });
  return chart.getDom();
  // }
}



function resultBind(resultLayer,selecTime) {
  resultLayer
  .bindPopup(
    function (layer) {
      let city = layer.feature.properties.NAME;
      // let time=layer.feature.properties.DATE_USER;
      time=timeTransfer(selecTime);
      // console.log(selecTime); //time
      // let data1 = cityData.get(city).HUMIDITY;
      // let data2 = cityData.get(city).RAINFALL;
      return `<b>城市:</b>${city}<br>
      <b>相对湿度:</b>${cityData.get(city).HUMIDITY[time]}<br>
      <b>本日降雨量:</b>${cityData.get(city).RAINFALL[time]}<br>
      <b>AQI:</b>${cityData.get(city).AQI[time]}<br>
      <b>PM2.5浓度:</b>${cityData.get(city).PM25[time]}<br>
      <b>温度:</b>${cityData.get(city).TEMPERATURE[time]}<br>
      <b>天气:</b>${cityData.get(city).WEATHER[time]}<br>
      <b>日期:</b>${cityData.get(city).DATE_USER[time]}<br>
      `;
    },
    { maxWidth: 700 }
  )
  .addTo(map);
}

// 查询结果解析
function sqlResult(serviceResult) {
  // console.log(serviceResult);

  /*geoJSON数据解析*/
  resultLayer = L.geoJSON(serviceResult.result.features, {
    onEachFeature: (feature, layer) => {
      // if (feature.geometry.coordinates[0] > 10000) {
        // let latlng = L.CRS.EPSG3857.unproject(
        //   L.point(
        //     feature.geometry.coordinates[0],
        //     feature.geometry.coordinates[1]
        //   )
        // );
      //   latlng.alt = feature.geometry.coordinates[2];
        //  marker = L.marker(latlng).addTo(map);
        //  return latlng;
      //   // marker.bindPopup(`<b>SMID:</b> ${feature.properties.SMID}`).openPopup().addTo(map)
      // } 
      //else {
      //   layer.bindPopup(`<b>SMID:</b> ${feature.properties.SMID}`).addTo(map);
      // }

      // console.log(layer);
      // 创建对象

    },
    style: {
      
        weight: 10,
        color: "#fff",
        opacity:0.5
      
    },

    coordsToLatLng: function (coords) {
      // console.log(L.point(coords[0], coords[1]));
      // FIXME: 3857坐标系单位为米 (数值较大) 4326坐标系单位为度 (经纬度坐标)
      let latlng = L.CRS.EPSG3857.unproject(L.point(coords[0], coords[1]));
      latlng.alt = coords[2];
        console.log(latlng);
      return latlng;
    },
  });
  // 图表数据绑定
  resultBind(resultLayer,gnl_infor_date);

    // console.log(resultLayer);
}

// SQL查询要素
function sqlQuery(attributeFilter, datasetNames = [],toIndex=238) {
  // sql查询参数
  var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: {
      name: "",
      attributeFilter: "date_User='" + attributeFilter + " 0:00:00'",
    },
    datasetNames: datasetNames,
    toIndex: toIndex,
  });
  
  // sql查询服务
  L.supermap.featureService(dataurl).getFeaturesBySQL(sqlParam, sqlResult);
}

// 默认展示第一天的天气信息地图
sqlQuery(gnl_infor_date, ["ChinaClimate:weather"])

gnl_search.addEventListener('click', () => {
  layerRemove();
  resultBind(resultLayer, gnl_infor_date);
  // sqlQuery(gnl_infor_date, ["ChinaClimate:weather"]);
  setTimeout(() => {
    // var n =L.layerGroup(resultLayer)
    // console.log(resultLayer);
  }, 3000);
});

day_tp_heat_search.addEventListener('click',()=>{
  layerRemove();
  //  console.log(index);
  tp_HeatMAP.addHeatMapLayer();
  tp_HeatMAP.heatMapLayer.addTo(map);
  tp_HeatMAP.markerGroup.addTo(map); 
  // console.log(tp_HeatMAP);
})

day_rain_isogram_search.addEventListener("click", () => {
  layerRemove();
  rain_isogram.surfaceAnalystProcess("rainfall", rain_isogram_infor_date);
});

day_tp_isogram_search.addEventListener("click", () => {
  layerRemove();
  tp_isogram.surfaceAnalystProcess("temperature", tp_isogram_infor_date);
  setTimeout(() => {
    // tp_isogram.isogramlayer.addTo(map);
    console.log(tp_isogram);
  }, 5000);
});

// let layer=L.layerGroup(heatMapLayer)
// let baseMap = {
//   chinaMapLayer: chinaMapLayer,
// };
// let overMap = {
//   layer: layer,
//   // heatMapLayer:heatMapLayer
// };
// L.control.layers(baseMap, overMap).addTo(map);
// console.log(myMap)
