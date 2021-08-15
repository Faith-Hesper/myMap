const host = window.isLocal ? window.server : "https://iserver.supermap.io";
let map, chinaMapLayer,  resultLayer, surfaceAnalystService, surfaceAnalystParameters;
// isogramlayer,heatMapLayer,
let serviceUrl =
    "http://localhost:8090" + "/iserver/services/spatialAnalysis-China-3/restjsr/spatialanalyst";
  baseUrl = "http://localhost:8090" + "/iserver/services/map-China/rest/maps/China",
  // baseurl = host + "/iserver/services/map-world/rest/maps/世界地图_Gray",
  dataurl = "http://localhost:8090" + "/iserver/services/data-China/rest/data",
  url = "http://localhost:8090" + "/iserver/services/map-china400/rest/maps/China";
let myMap = [];
  // 各个城市每日天气信息
let cityData = new Map();
map = L.map("map", {
  crs: L.CRS.EPSG3857,
  center: [116, 60],
  zoomSnap: 0.4,
  zoomDelta: 0.4,
  // maxZoom: 10,
  // minZoom: 2,
  zoom: 2,
  preferCanvas: true,
});

/*note: 软件
 */
// fixme: L.Proj.CRS("EPSG:3857"
// map = L.map("map", {
//   crs: L.CRS.NonEarthCRS({
//     bounds: L.bounds([-20037508.34 , -20037508.34], [20037508.34, 18418382.33]),
//     origin: L.point(-20037508.34, 18418382.33),
//   }),
//   center: [4204077.121, 12289903.813],
//   zoomSnap: 0.4,
//   zoomDelta: 0.4,
//   maxZoom: 10,
//   minZoom: 2,
//   zoom: 4,
//   preferCanvas: true,
// });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 地图加载
chinaMapLayer = L.supermap
  .tiledMapLayer(baseUrl, {
    noWrap: true,
    transparent: true,
  })
  .addTo(map);

function timeTransfer(time) {
  switch (time) {
    case "2021/4/30 0:00:00":
    case "2021/4/30":
      time = 0;
      break;
    case "2021/5/1 0:00:00":
    case "2021/5/1":
      time = 1;
      break;
    case "2021/5/2 0:00:00":
    case "2021/5/2":
      time = 2;
      break;
    case "2021/5/3 0:00:00":
    case "2021/5/3":
      time = 3;
      break;
    case "2021/5/4 0:00:00":
    case "2021/5/4":
      time = 4;
      break;
    case "2021/5/5 0:00:00":
    case "2021/5/5":
      time = 5;
      break;
    case "2021/5/6 0:00:00":
    case "2021/5/6":
      time = 6;
      break;
  }
  return time;
}


function layerRemove(params) {
  if (resultLayer != null) {
    resultLayer.remove();
  }
  if (tp_HeatMAP.heatMapLayer != null) {
    // tp_HeatMAP.heatMapLayer.remove()
    // console.log(tp_HeatMAP.heatMapLayer);
    tp_HeatMAP.heatMapLayer.remove();
    tp_HeatMAP.markerGroup.remove();
  }
  if(rain_isogram.isogramlayer!=null)
  {
    rain_isogram.isogramlayer.remove();
  }
  if(tp_isogram.isogramlayer!=null)
  {
    console.log(true);
    tp_isogram.isogramlayer.remove();
  }
}

// 整理SQL查询到的数据
function getData(myMap) {
  // 临时存储对象
  function tmpObj(AQI, HUMIDITY, RAINFALL, WEATHER, TEMPERATURE, PM25, DATE_USER, lat, lng) {
    this.AQI = AQI;
    this.HUMIDITY = HUMIDITY;
    this.RAINFALL = RAINFALL;
    this.WEATHER = WEATHER;
    this.TEMPERATURE = TEMPERATURE;
    this.PM25 = PM25;
    this.DATE_USER = DATE_USER;
    this.lat = lat;
    this.lng = lng;
  }
  // 

  for (let index = 0; index < myMap.length / 7; index++) {
    let tmp = myMap[index].NAME;
    let temp = index;
    let AQI = [],
      HUMIDITY = [],
      RAINFALL = [],
      WEATHER = [],
      TEMPERATURE = [],
      PM25 = [],
      DATE_USER = [];
    let dx;
    for (temp; temp < myMap.length; temp++) {
      if (myMap[temp].NAME == tmp) {
        AQI.push(myMap[temp].weaher.AQI);
        HUMIDITY.push(myMap[temp].weaher.HUMIDITY);
        RAINFALL.push(myMap[temp].weaher.RAINFALL);
        WEATHER.push(myMap[temp].weaher.WEATHER);
        TEMPERATURE.push(myMap[temp].weaher.TEMPERATURE);
        PM25.push(myMap[temp].weaher.PM25);
        DATE_USER.push(myMap[temp].weaher.DATE_USER);
        // dt.push(myMap[temp])
        // console.log(myMap[temp].NAME);
      }
    }
    // 临时对象存储每个城市每天的天气信息
    dx = new tmpObj(
      AQI,
      HUMIDITY,
      RAINFALL,
      WEATHER,
      TEMPERATURE,
      PM25,
      DATE_USER,
      myMap[index].lat,
      myMap[index].lng
    );
    // dt.push(new Jsl(tmp, AQI, HUMIDITY));
    cityData.set(tmp, dx);
  }

  // console.log(cityData.get("北京市"));
}

function sql1Result(serviceResult) {
  // 存储SQL查询到的数据
  function sqlData(NAME, AQI, HUMIDITY, RAINFALL, WEATHER, TEMPERATURE, PM25, DATE_USER, lat, lng) {
    this.NAME = NAME;
    this.lat = lat;
    this.lng = lng;
    this.weaher = {
      AQI: AQI,
      HUMIDITY: HUMIDITY,
      RAINFALL: RAINFALL,
      WEATHER: WEATHER,
      TEMPERATURE: TEMPERATURE,
      PM25: PM25,
      DATE_USER: DATE_USER,
    };
  }
  // console.log(serviceResult);
  let i = 0;
  /*geoJSON数据解析*/
  L.geoJSON(serviceResult.result.features, {
    onEachFeature: (feature, layer) => {
      let latlng = L.CRS.EPSG3857.unproject(
        L.point(feature.geometry.coordinates[0], feature.geometry.coordinates[1])
      );
      // console.table(latlng.lat,latlng.lng);
      myMap[i] = new sqlData(
        feature.properties.NAME,
        feature.properties.AQI,
        feature.properties.HUMIDITY,
        feature.properties.RAINFALL,
        feature.properties.WEATHER,
        feature.properties.TEMPERATURE,
        feature.properties.PM25,
        feature.properties.DATE_USER,
        latlng.lat,
        latlng.lng
      );
      i++;
    },
    // filter: (feature) => {
    //   if (feature.geometry.coordinates[0] > 10000 && feature.properties.SMID <= 34) {
    //     let latlng = L.CRS.EPSG3857.unproject(
    //       L.point(feature.geometry.coordinates[0], feature.geometry.coordinates[1])
    //     );
    //     latlng.alt = feature.geometry.coordinates[2];
    //     //  marker = L.marker(latlng).toGeoJSON();
    //     //  console.log(marker);
    //     //  console.log(marker.toGeoJSON());
    //   }
    //   return true;
    // },
  });
  getData(myMap);
}

function sql1Query(datasetNames = []) {
  // sql查询参数
  var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: {
      name: "",
      attributeFilter: "",
    },
    datasetNames: datasetNames,
    toIndex: 238,
  });

  // sql查询服务
  L.supermap.featureService(dataurl).getFeaturesBySQL(sqlParam, sql1Result);
}
sql1Query(["ChinaClimate:weather"]);
// setTimeout(() => {
//   // console.log(myMap);
//   // console.log(cityData);
// }, 2000);

// 时间选择框
function initDate(params) {
  info = L.control({ position: "topleft" });
  info.onAdd = function (params) {
    this._div = L.DomUtil.create("div", "resultinfo");
    info.update();
    return this._div;
  };
  info.update = function (currentStatisticResult) {
    var dateSelectHtml = `<form action="" method="GET">
    <span>天气信息</span>
    <select id="wt_dateselect" class="form-control">
        <option value="2021/4/30">2021/4/30</option>
        <option value="2021/5/1">2021/5/1</option>
        <option value="2021/5/2">2021/5/2</option>
        <option value="2021/5/3">2021/5/3</option>
        <option value="2021/5/4">2021/5/4</option>
        <option value="2021/5/5">2021/5/5</option>
        <option value="2021/5/6">2021/5/6</option>
    </select>
    <input id="gnl_search" type="button" value="查询" />
</form>
<form action="" method="GET">
    <span>降雨量等值线图</span>
    <select id="rain_isogram_dateselect" class="form-control">
        <option value="2021/4/30">2021/4/30</option>
        <option value="2021/5/1">2021/5/1</option>
        <option value="2021/5/2">2021/5/2</option>
        <option value="2021/5/3">2021/5/3</option>
        <option value="2021/5/4">2021/5/4</option>
        <option value="2021/5/5">2021/5/5</option>
        <option value="2021/5/6">2021/5/6</option>
    </select>
    <input id="day_rain_isogram_search" type="button" value="查询" />
</form>
<form action="" method="GET">
    <span>气温热力图</span>
    <select id="tp_heat_dateselect" class="form-control">
        <option value="2021/4/30">2021/4/30</option>
        <option value="2021/5/1">2021/5/1</option>
        <option value="2021/5/2">2021/5/2</option>
        <option value="2021/5/3">2021/5/3</option>
        <option value="2021/5/4">2021/5/4</option>
        <option value="2021/5/5">2021/5/5</option>
        <option value="2021/5/6">2021/5/6</option>
    </select>
    <input id="day_tp_heat_search" type="button" value="查询" />
</form>
<form action="" method="GET">
    <span>气温等值线图</span>
    <select id="tp_isogram_dateselect" class="form-control">
        <option value="2021/4/30">2021/4/30</option>
        <option value="2021/5/1">2021/5/1</option>
        <option value="2021/5/2">2021/5/2</option>
        <option value="2021/5/3">2021/5/3</option>
        <option value="2021/5/4">2021/5/4</option>
        <option value="2021/5/5">2021/5/5</option>
        <option value="2021/5/6">2021/5/6</option>
    </select>
    <input id="day_tp_isogram_search" type="button" value="查询" />
</form>`;
    this._div.innerHTML = dateSelectHtml;
  };
  info.addTo(map);
}
initDate();
