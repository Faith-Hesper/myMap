/*
 * @Author: Faith
 * @Date: 2021-09-10 21:22
 * @LastAuthor: Faith
 * @LastEditTime: 2022-10-30 11:32
 * @Description:
 */

// 等值线类
class Isogram {
  constructor(zValueFieldName = 'temperature') {
    this.isolayer
    this.zValueFieldName = zValueFieldName
    this.surfaceAnalystService = L.supermap.spatialAnalystService(serviceUrl)

    // this.surfaceAnalystProcess();
  }
  interpolationAnalyst(points) {
    // 差值分析参数
    const interpolationAnalystParameters = new L.supermap.InterpolationIDWAnalystParameters({
      // 插值分析类型,geometry类型表示对离散点插值分析,默认为“dataset”
      InterpolationAnalystType: 'geometry',
      // 插值分析结果数据集的名称
      outputDatasetName: 'IDWcretePoints_result',
      // 插值分析结果数据源的名称
      outputDatasourceName: 'Interpolation',
      // 结果栅格数据集存储的像素格式
      pixelFormat: L.supermap.PixelFormat.BIT16,
      // 用于做插值分析的离散点集合
      inputPoints: points,
      // 属性过滤条件
      filterQueryParameter: {
        attributeFilter: '',
      },
      // 采取定长查找参与运算点的方式
      searchMode: 'KDTREE_FIXED_RADIUS',
      // 查找半径,与点数据单位相同
      searchRadius: 200,
      resolution: 9000,
      bounds: L.bounds([-2640403.63, 1873792.1], [3247669.39, 5921501.4]),
    })
  }
  async surfaceAnalystProcess(attributeFilter = '2021/4/30') {
    let region = map.getBounds()
    //   L.polygon([
    //   [7095467.634838, 8014861.994943],
    //   [2007950.338151, 8014861.994943],
    //   [2007950.338151, 15191660.723731],
    //   [7095467.634838, 15191660.723731],
    // ])
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

    // 表面分析
    let coords = await new Promise((resolve, reject) => {
      this.surfaceAnalystService.surfaceAnalysis(
        surfaceAnalystParameters,
        function (serviceResult) {
          console.log(serviceResult)
          let result = serviceResult.result
          let features = result.recordset.features
          resolve(features)
        }
      )
    })

    this.removeLayer()

    this.isolayer = L.geoJson(coords, {
      onEachFeature: (feature, layer) => {
        // console.log(feature)
        layer.on({
          mouseover: (e) => {
            let layer = e.target
            layer.setStyle({
              weight: 5,
              color: '#ff7373',
              dashArray: '',
              fillOpacity: 0.7,
            })
            layer.bindPopup(`温度：${feature.properties.dZvalue}`).openPopup()
            layer.bringToFront()
          },
          mouseout: (e) => {
            this.isolayer.resetStyle(e.target)
          },
        })
      },
      coordsToLatLng: function (coords) {
        // console.log(L.point(coords[0], coords[1]));
        // FIXME: 3857坐标系单位为米 (数值较大) 4326坐标系单位为度 (经纬度坐标)
        let latlng = L.CRS.EPSG3857.unproject(L.point(coords[0], coords[1]))
        return latlng
      },
    })
    this.isolayer.addTo(map)
    return this.isolayer
  }
  removeLayer() {
    if (this.isolayer) {
      map.removeLayer(this.isolayer)
      // this.isolayer.remove()
    }
  }
}
