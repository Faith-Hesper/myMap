// icon
function weaherIcon(point, latlng) {
  let temp = point.properties.WEATHER
  if (temp.indexOf("晴") !== -1) {
    return L.marker(latlng, { icon: sun })
  } else if (temp.indexOf("雨") !== -1) {
    return L.marker(latlng, { icon: rain })
  } else if (temp.indexOf("云") !== -1) {
    return L.marker(latlng, { icon: yun })
  } else if (temp.indexOf("浮") !== -1) {
    return L.marker(latlng, { icon: sink })
  } else if (temp.indexOf("风") !== -1) {
    return L.marker(latlng, { icon: windy })
  } else if (temp.indexOf("雾") !== -1) {
    return L.marker(latlng, { icon: fog })
  } else {
    return L.marker(latlng, { icon: defaultIcon })
  }
}

// 图层绑定
function featureBind(feature, layer) {
  layer.bindPopup(layer => {
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
    .on("mouseover", e => {
      // console.log(e)
      e.sourceTarget.openPopup()
    })
    .on("mouseout", e => e.sourceTarget.closePopup())
    .on("click", e => map.flyTo(e.latlng, 7))
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
async function queryBySql(attributeFilter, datasetNames, toIndex = 238) {
  let param = {
    queryParameter: {
      name: "",
      attributeFilter: attributeFilter,
    },
    datasetNames: datasetNames,
    toIndex: toIndex,
  }

  Object.assign(param, ...arguments)

  const sqlParam = new SuperMap.GetFeaturesBySQLParameters(param)

  return await new Promise(resolve => {
    L.supermap.featureService(dataurl).getFeaturesBySQL(sqlParam, serviceResult => {
      resolve(serviceResult)
    })
  })
}
let themeLayer
function initThemeLayer() {
  themeLayer = new L.supermap.RangeThemeLayer("ThemeLayer", {
    // 开启 hover 高亮效果
    isHoverAble: true,
    opacity: 0.8,
    alwaysMapCRS: true,
  }).addTo(map)

  themeLayer.style = new L.supermap.ThemeStyle({
    shadowBlur: 16,
    shadowColor: "#000000",
    fillColor: "#FFFFFF",
  })

  // hover 高亮样式
  themeLayer.highlightStyle = new L.supermap.ThemeStyle({
    stroke: true,
    strokeWidth: 4,
    strokeColor: "blue",
    fillColor: "#00EEEE",
    fillOpacity: 0.8,
  })

  // 用于单值专题图的属性字段名称
  themeLayer.themeField = "TEMPERATURE"
  // 风格数组，设定值对应的样式
  themeLayer.styleGroups = [
    {
      start: 10,
      end: 15,
      style: {
        color: "#eddda3",
      },
    },
    {
      start: 15,
      end: 20,
      style: {
        color: "#f0c98a",
      },
    },
    {
      start: 20,
      end: 25,
      style: {
        color: "#f3b478",
      },
    },
    {
      start: 25,
      end: 30,
      style: {
        color: "#f98766",
      },
    },
    {
      start: 30,
      end: 40,
      style: {
        color: "#f67166",
      },
    },
  ]

  // themeLayer.on('mousemove', highLightLayer);
  // addThemeFeatures();
}
initThemeLayer()

async function sql(attributeFilter, datasetNames, toIndex = 238) {
  let param = {
    queryParameter: {
      name: "",
      attributeFilter: attributeFilter,
    },
    datasetNames: datasetNames,
    toIndex: toIndex,
  }

  Object.assign(param, ...arguments)

  const sqlParam = new SuperMap.GetFeaturesBySQLParameters(param)

  return await new Promise(resolve => {
    L.supermap.featureService(dataurl).getFeaturesBySQL(
      sqlParam,
      serviceResult => {
        resolve(serviceResult)
      },
      L.supermap.DataFormat.ISERVER
    )
  })
}
// sql("", ["ChinaClimate:China_Province_pg"]).then(resultLayer => {
//   console.log(resultLayer.result.features)
//   themeLayer.addFeatures(resultLayer.result.features)
// })

class GnlInfoQuery {
  constructor() {
    this.sqlResultLayer
  }

  // SQL查询要素
  async sqlQuery(attributeFilter = "2021/4/30", datasetNames = [], toIndex = 238) {
    // sql查询参数
    const sqlParam = new SuperMap.GetFeaturesBySQLParameters({
      queryParameter: {
        name: "",
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
    this.sqlResultLayer = await new Promise(resolve => {
      L.supermap.featureService(dataurl).getFeaturesBySQL(sqlParam, serviceResult => {
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
let rain_isogram = new Isogram("rainfall")
let tp_isogram = new Isogram("temperature")

// 默认展示第一天的天气信息地图
gnl_info.sqlQuery(gnl_info_date, ["ChinaClimate:weather"]).then(layer => {
  control.addOverlay(layer, gnl_info_date + "天气信息")
  messageBox("查询成功")
})

gnl_search.addEventListener("click", () => {
  // layerRemove()
  gnl_info.sqlQuery(gnl_info_date, ["ChinaClimate:weather"]).then(layer => {
    control.addOverlay(layer, gnl_info_date + "天气信息")
    messageBox("查询成功")
  })
})

day_tp_heat_search.addEventListener("click", () => {
  // layerRemove()
  tp_HeatMAP.getData().then(layer => {
    control.addOverlay(layer, "热力图")
    messageBox("查询成功")
  })
})

day_rain_isogram_search.addEventListener("click", () => {
  // layerRemove()
  messageBox("查询中")
  rain_isogram.surfaceAnalystProcess(rain_isogram_info_date).then(layer => {
    control.addOverlay(layer, rain_isogram_info_date + "降雨量等值线图")
  })
})

day_tp_isogram_search.addEventListener("click", () => {
  // layerRemove()
  messageBox("查询中")
  tp_isogram.surfaceAnalystProcess(tp_isogram_info_date).then(layer => {
    control.addOverlay(layer, tp_isogram_info_date + "温度等值线图")
  })
})
