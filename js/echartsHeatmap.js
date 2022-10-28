/*
 * @Author: Faith
 * @Date: 2021-09-10 21:22
 * @LastAuthor: Faith
 * @LastEditTime: 2022-10-28 15:38
 * @Description:
 */
/**
 * 热力图基本设置
 */
class HeatMap {
  constructor(params) {
    this.heatMapLayer
    this.layer = L.featureGroup()
    this.markerGroup
    this.addHeatMapLayer()
  }
  addHeatMapLayer() {
    this.heatMapLayer = L.supermap.heatMapLayer('heatMap', {
      id: 'heatmap',
      map: map,
      radius: 80,
      alwaysMapCRS: false,
      // useGeoUnit:true,
      colors: ['blue', 'cyan', 'lime', 'yellow', 'red'],
      opacity: 0.8,
      featureWeight: 'TEMPERATURE',
      loadWhileAnimating: false,
    })
    // this.layer.addLayer(this.heatMapLayer)
    // control.addOverlay(this.layer, '热力图')
  }
  removeLayer() {
    if (this.markerGroup) {
      this.heatMapLayer.removeAllFeatures()
      this.heatMapLayer.refresh()
      this.markerGroup.remove()
    }
  }
  async getData() {
    this.removeLayer()
    let serviceResult = await queryBySql(tp_heat_info_date, ['ChinaClimate:weather'])
    this.markerGroup = sqlResult(serviceResult)
    // console.log(layer)
    this.heatMapLayer.addFeatures(this.markerGroup.toGeoJSON())
    this.markerGroup.addTo(map)
    this.heatMapLayer.addTo(map)
    return this.heatMapLayer
  }
}
