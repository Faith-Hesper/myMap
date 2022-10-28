/*
 * @Author: Faith
 * @Date: 2022-10-27 16:31
 * @LastAuthor: Faith
 * @LastEditTime: 2022-10-28 08:59
 * @Description:
 */

const polyline = document.querySelector('.tool .polyline')
const polygon = document.querySelector('.tool .polygon')
const clear = document.querySelector('.tool .clear')

function draw() {
  const layer = L.polyline([]).addTo(map)
  const tempMarker = L.marker([0, 0]).bindTooltip().addTo(map)
  const tempLayer = L.polyline([]).addTo(map)
  const popup = L.tooltip({
    permanent: true,
  })
  let tempPoints = []
  function clickHandler(e) {
    layer.addLatLng(e.latlng)
    tempPoints[0] = e.latlng
    if (tempPoints.length > 1) {
      popup.setLatLng(e.latlng).setContent('aaa').openTooltip().addTo(map)
    }
  }
  function mousemoveHandler(e) {
    // console.log(e.latlng)
    // tempMarker.setLatLng(e.latlng).setTooltipContent('简历').openTooltip()
    // L.marker(e.latlng).addTo(map)
    if (tempPoints.length) {
      tempPoints[1] = e.latlng
      tempLayer.setLatLngs(tempPoints)
    }
    if (tempPoints.length > 1) {
    }
  }
  function dblclickHandler(e) {
    tempPoints = null
    tempLayer.remove()
    tempMarker.remove()
    map.doubleClickZoom.disable()
    map.off('click', clickHandler)
    map.off('mousemove', mousemoveHandler)
    map.off('dblclick', dblclickHandler)
  }
  function cancelHandler() {
    dblclickHandler()
  }

  map.on('click', clickHandler)
  map.on('mousemove', mousemoveHandler)
  map.on('dblclick', dblclickHandler)
  map.on('contextmenu', cancelHandler)
}

polyline.addEventListener('click', draw)
