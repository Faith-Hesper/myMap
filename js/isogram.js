/*
 * @Author: Faith
 * @Date: 2021-09-10 21:22
 * @LastAuthor: Faith
 * @LastEditTime: 2022-10-28 14:37
 * @Description:
 */

// 等值线类
class Isogram {
  constructor(zValueFieldName = 'temperature') {
    this.isolayer
    this.zValueFieldName = zValueFieldName
    // this.surfaceAnalystProcess();
  }

  surfaceAnalystProcess(attributeFilter = '2021/4/30') {
    let region = L.polygon([
      [7095467.634838, 8014861.994943],
      [2007950.338151, 8014861.994943],
      [2007950.338151, 15191660.723731],
      [7095467.634838, 15191660.723731],
    ])
    // 表面分析参数
    const surfaceAnalystParameters = new SuperMap.DatasetSurfaceAnalystParameters({
      extractParameter: new SuperMap.SurfaceAnalystParametersSetting({
        datumValue: 0, //基准值
        interval: 2, // 等值距
        resampleTolerance: 2, // 采样容限
        smoothMethod: SuperMap.SmoothMethod.BSPLINE,
        smoothness: 3,
        clipRegion: region,
      }),
      dataset: 'weather@ChinaClimate',
      resolution: 9000, // 分辨率
      zValueFieldName: this.zValueFieldName,
      filterQueryParameter: new SuperMap.FilterParameter({
        attributeFilter: "date_User='" + attributeFilter + " 0:00:00'",
      }),
    })

    // 空间分析服务
    let surfaceAnalystService = L.supermap.spatialAnalystService(serviceUrl)

    // 表面分析
    new Promise((resolve, reject) => {
      surfaceAnalystService.surfaceAnalysis(surfaceAnalystParameters, function (serviceResult) {
        let result = serviceResult.result
        let features = result.recordset.features
        resolve(features)
      })
    }).then((coords) => {
      this.removeLayer()
      this.isolayer = L.geoJson(coords, {
        onEachFeature: (feature) => {
          // console.log(feature)
        },
        coordsToLatLng: function (coords) {
          // console.log(L.point(coords[0], coords[1]));
          // FIXME: 3857坐标系单位为米 (数值较大) 4326坐标系单位为度 (经纬度坐标)
          let latlng = L.CRS.EPSG3857.unproject(L.point(coords[0], coords[1]))
          // latlng.alt = coords[2]
          // console.log(latlng);
          return latlng
        },
      })
      this.isolayer.addTo(map)
    })
    // this.isolayer = L.featureGroup(this.isogramlayer)
  }
  removeLayer() {
    if (this.isolayer) {
      this.isolayer.remove()
    }
  }
}
