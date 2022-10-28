// icon
function weaherIcon(point, latlng) {
  let temp = point.properties.WEATHER
  if (temp.indexOf('晴') !== -1) {
    return L.marker(latlng, { icon: sun })
  } else if (temp.indexOf('雨') !== -1) {
    return L.marker(latlng, { icon: rain })
  } else if (temp.indexOf('云') !== -1) {
    return L.marker(latlng, { icon: yun })
  } else if (temp.indexOf('浮') !== -1) {
    return L.marker(latlng, { icon: sink })
  } else if (temp.indexOf('风') !== -1) {
    return L.marker(latlng, { icon: windy })
  } else if (temp.indexOf('雾') !== -1) {
    return L.marker(latlng, { icon: fog })
  } else {
    return L.marker(latlng, { icon: defaultIcon })
  }
}

// 图层绑定
function featureBind(feature, layer) {
  layer.bindPopup((layer) => {
    return `<b>城市:</b>${feature.properties.NAME}<br>
    <b>相对湿度:</b>${feature.properties.HUMIDITY}<br>
    <b>本日降雨量:</b>${feature.properties.RAINFALL}<br>
    <b>AQI:</b>${feature.properties.AQI}<br>
    <b>PM2.5浓度:</b>${feature.properties.PM25}<br>
    <b>温度:</b>${feature.properties.TEMPERATURE}<br>
    <b>天气:</b>${feature.properties.WEATHER}<br>
    <b>日期:</b>${feature.properties.DATE_USER}<br>
    `
  })
  layer
    .on('mouseover', (e) => {
      // console.log(e)
      e.sourceTarget.openPopup()
    })
    .on('mouseout', (e) => e.sourceTarget.closePopup())
    .on('click', (e) => map.flyTo(e.latlng))
}

// 查询结果解析
function sqlResult(serviceResult) {
  // console.log(serviceResult)

  /*geoJSON数据解析*/
  return L.geoJSON(serviceResult.result.features, {
    coordsToLatLng: function (coords) {
      // console.log(L.point(coords[0], coords[1]));
      // FIXME: 3857坐标系单位为米 (数值较大) 4326坐标系单位为度 (经纬度坐标)
      let latlng = L.CRS.EPSG3857.unproject(L.point(coords[0], coords[1]))
      latlng.alt = coords[2]
      // console.log(latlng);
      return latlng
    },
    pointToLayer: weaherIcon,
    onEachFeature: featureBind,
  })
}

// sql查询
async function queryBySql(attributeFilter = '2021/4/30', datasetNames = [], toIndex = 238) {
  const sqlParam = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: {
      name: '',
      attributeFilter: "date_User='" + attributeFilter + " 0:00:00'",
    },
    datasetNames: datasetNames,
    toIndex: toIndex,
  })

  return await new Promise((resolve) => {
    L.supermap.featureService(dataurl).getFeaturesBySQL(sqlParam, (serviceResult) => {
      resolve(serviceResult)
    })
  })
}

class GnlInfoQuery {
  constructor() {
    this.sqlResultLayer
  }

  // SQL查询要素
  async sqlQuery(attributeFilter = '2021/4/30', datasetNames = [], toIndex = 238) {
    // sql查询参数
    const sqlParam = new SuperMap.GetFeaturesBySQLParameters({
      queryParameter: {
        name: '',
        attributeFilter: "date_User='" + attributeFilter + " 0:00:00'",
      },
      datasetNames: datasetNames,
      toIndex: toIndex,
    })

    if (this.sqlResultLayer) {
      map.removeLayer(this.sqlResultLayer)
      this.sqlResultLayer = null
    }

    // sql查询服务
    this.sqlResultLayer = await new Promise((resolve) => {
      L.supermap.featureService(dataurl).getFeaturesBySQL(sqlParam, (serviceResult) => {
        let tempLayer = sqlResult(serviceResult)
        resolve(tempLayer)
      })
    })

    this.sqlResultLayer.addTo(map)
    return this.sqlResultLayer
  }
}

let gnl_info = new GnlInfoQuery()
let tp_HeatMAP = new HeatMap()
let rain_isogram = new Isogram('rainfall')
let tp_isogram = new Isogram('temperature')

// 默认展示第一天的天气信息地图
gnl_info.sqlQuery(gnl_info_date, ['ChinaClimate:weather'])

gnl_search.addEventListener('click', () => {
  layerRemove()
  gnl_info.sqlQuery(gnl_info_date, ['ChinaClimate:weather']).then((layer) => {
    control.addOverlay(layer, '天气信息')
    messageBox('查询成功')
  })
})

day_tp_heat_search.addEventListener('click', () => {
  layerRemove()
  tp_HeatMAP.getData().then((layer) => {
    // control.addOverlay(layer, '热力图')
    messageBox('查询成功')
  })
})

day_rain_isogram_search.addEventListener('click', () => {
  layerRemove()
  messageBox('查询中')
  rain_isogram.surfaceAnalystProcess(rain_isogram_info_date)
})

day_tp_isogram_search.addEventListener('click', () => {
  layerRemove()
  messageBox('查询中')
  tp_isogram.surfaceAnalystProcess(tp_isogram_info_date)
})
