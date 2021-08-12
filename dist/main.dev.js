"use strict";

var host = window.isLocal ? window.server : "https://iserver.supermap.io";
var map,
    resultLayer,
    baseUrl = host + "/iserver/services/map-China/rest/maps/China",
    // baseurl = host + "/iserver/services/map-world/rest/maps/世界地图_Gray",
dataurl = host + "/iserver/services/data-China/rest/data",
    url = host + "/iserver/services/map-china400/rest/maps/China";
map = L.map('map', {
  crs: L.CRS.EPSG3857,
  center: [35, 100],
  zoomSnap: 0.4,
  zoomDelta: 0.4,
  maxZoom: 18,
  zoom: 4,
  preferCanvas: true // 

}); // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);
// 地图加载

L.supermap.tiledMapLayer(baseUrl, {
  noWrap: true,
  transparent: true
}).addTo(map);
option = {
  legend: {
    data: ["降雨量", "径流量"],
    align: 'left'
  },
  toolbox: {
    feature: {
      magicType: {
        type: ['stack', 'tiled']
      },
      saveAsImage: {
        pixelRatio: 2
      }
    }
  },
  tooltip: {},
  xAxis: {
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    silent: false,
    splitLine: {
      show: false
    }
  },
  yAxis: {},
  series: [{
    name: 'bar',
    type: 'bar',
    animationDelay: function animationDelay(idx) {
      return idx * 10;
    }
  }, {
    name: 'bar2',
    type: 'bar',
    animationDelay: function animationDelay(idx) {
      return idx * 10 + 100;
    }
  }],
  animationEasing: 'elasticOut',
  animationDelayUpdate: function animationDelayUpdate(idx) {
    return idx * 5;
  }
};
var div = L.DomUtil.create('div');
var chart = echarts.init(div, '', {
  width: 500,
  height: 300
});
chart.setOption(option);
var myMap = [];

function Data(NAME, AQI, SMID) {
  this.NAME = NAME;
  this.AQI = AQI;
  this.SMID = SMID;
}

var i = 0;

function getData(myMap) {
  for (var index = 0; index < myMap.length - 1; index++) {
    var tmp = myMap[index].NAME;

    if (myMap[index + 1].NAME == tmp) {}
  }
} // // 数据绑定
// function chartSet(layer) {
//     let data1 = [];
//     let data2 = [];
//     chart.setOption({
//         title: {
//             text: city,
//             subtext: "",
//         },
//         series: [{
//             name: "降雨量",
//             data: data1
//         },
//         {
//             name: "径流量",
//             data: data2
//         }
//         ]
//     });
//     return chart.getDom();
// }
// 查询结果解析


function sqlResult(serviceResult) {
  console.log(serviceResult);
  resultLayer = L.geoJSON(serviceResult.result.features, {
    onEachFeature: function onEachFeature(feature, layer) {
      if (feature.geometry.coordinates[0] > 10000) {
        var latlng = L.CRS.EPSG3857.unproject(L.point(feature.geometry.coordinates[0], feature.geometry.coordinates[1]));
        latlng.alt = feature.geometry.coordinates[2];
        var marker = L.marker(latlng).addTo(map); // marker.bindPopup(`<b>SMID:</b> ${feature.properties.SMID}`).openPopup().addTo(map)
      } else {
        layer.bindPopup("<b>SMID:</b> ".concat(feature.properties.SMID)).addTo(map);
      }

      myMap[i] = new Data(feature.properties.NAME, feature.properties.AQI, feature.properties.SMID);
      i++;
    },
    style: function style(feature) {
      return {
        weight: 2,
        color: "#ff0000"
      };
    },
    coordsToLatLng: function coordsToLatLng(coords) {
      var latlng = L.CRS.EPSG3857.unproject(L.point(coords[0], coords[1]));
      latlng.alt = coords[2];
      return latlng;
    }
  });
  getData(myMap); // 图表数据绑定

  resultLayer.bindPopup(function (layer) {
    var city = layer.feature.properties.SMID;
    console.log(myMap);
    var data1 = [];
    var data2 = [];
    chart.setOption({
      title: {
        text: city,
        subtext: ""
      },
      series: [{
        name: "降雨量",
        data: data1
      }, {
        name: "径流量",
        data: data2
      }]
    });
    return chart.getDom();
  }, {
    maxWidth: 700
  }).addTo(map);
} // SQL查询要素


function sqlQuery() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var datasetNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: {
      name: name,
      attributeFilter: ""
    },
    datasetNames: datasetNames,
    toIndex: 88
  });
  L.supermap.featureService(dataurl).getFeaturesBySQL(sqlParam, sqlResult);
}

sqlQuery("", ["ChinaClimate:monday", "ChinaClimate:tuesday"]);