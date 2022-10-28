const host = window.isLocal ? window.server : 'http://localhost:8090'
let map, chinaMapLayer
// resultLayer,isogramlayer,heatMapLayer,
const serviceUrl = host + '/iserver/services/spatialAnalysis-China-3/restjsr/spatialanalyst',
  baseUrl = host + '/iserver/services/map-China/rest/maps/China',
  dataurl = host + '/iserver/services/data-China/rest/data'
// url = host + "/iserver/services/map-china400/rest/maps/China";

map = L.map('map', {
  //   crs: L.Proj.CRS("EPSG:4326", {
  //     origin: [0,0],
  //     // scaleDenominators: [200000000,20000000,1000000,50000,20000,10000],
  //     bounds: L.bounds([-180.0,-85.05],[180.0 , 83.62]),
  // }),
  crs: L.CRS.EPSG3857,
  center: [35, 110],
  // bounds: L.bounds([-180.0,-85.05],[180.0 , 83.62]),
  zoomSnap: 0.4,
  zoomDelta: 0.4,
  maxZoom: 10,
  minZoom: 3,
  zoom: 5,
  preferCanvas: true,
})

map.on('overlayadd', (e) => {
  console.log(e)
})

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

L.supermap
  .tiledMapLayer('http://localhost:8090/iserver/services/map-china400/rest/maps/China', {
    transparent: false,
  })
  .addTo(map)

// 地图加载
chinaMapLayer = L.supermap
  .tiledMapLayer(baseUrl, {
    noWrap: true,
    transparent: true,
  })
  .addTo(map)

let baseMap = {
  中国地图: chinaMapLayer,
}

const control = L.control.layers(baseMap).addTo(map)

// 图层替换
function layerRemove(params) {
  if (gnl_info.sqlResultLayer != null) {
    gnl_info.sqlResultLayer.remove()
  }
  if (tp_HeatMAP.markerGroup != null) {
    tp_HeatMAP.heatMapLayer.remove()
    tp_HeatMAP.markerGroup.remove()
  }
  if (rain_isogram.isolayer != null) {
    // rain_isogram.isogramlayer.remove()
    rain_isogram.isolayer.remove()
  }
  if (tp_isogram.isolayer != null) {
    // tp_isogram.isogramlayer.remove();
    tp_isogram.isolayer.remove()
  }
}

// 时间选择框
function initDate(params) {
  infoDate = L.control({ position: 'topleft' })
  infoDate.onAdd = function (params) {
    this._div = L.DomUtil.create('div', 'infoDate')
    infoDate.update()
    return this._div
  }
  infoDate.update = function (currentStatisticResult) {
    var dateSelectHtml = `<form action="" method="GET">
    <span>天气信息</span>
    <select id="wt_dateselect" class="select form-control">
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
    <select id="rain_isogram_dateselect" class="select form-control">
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
    <select id="tp_heat_dateselect" class="select form-control">
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
    <select id="tp_isogram_dateselect" class="select form-control">
        <option value="2021/4/30">2021/4/30</option>
        <option value="2021/5/1">2021/5/1</option>
        <option value="2021/5/2">2021/5/2</option>
        <option value="2021/5/3">2021/5/3</option>
        <option value="2021/5/4">2021/5/4</option>
        <option value="2021/5/5">2021/5/5</option>
        <option value="2021/5/6">2021/5/6</option>
    </select>
    <input id="day_tp_isogram_search" type="button" value="查询" />
</form>`
    this._div.innerHTML = dateSelectHtml
  }
  infoDate.addTo(map)
}
initDate()
