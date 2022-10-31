/*
 * @Author: Faith
 * @Date: 2022-10-27 16:31
 * @LastAuthor: Faith
 * @LastEditTime: 2022-10-31 21:18
 * @Description:
 */

const polyline = document.querySelector(".tool .polyline")
const polygon = document.querySelector(".tool .polygon")
const clear = document.querySelector(".tool .clear")

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
      popup.setLatLng(e.latlng).setContent("aaa").openTooltip().addTo(map)
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
    map.off("click", clickHandler)
    map.off("mousemove", mousemoveHandler)
    map.off("dblclick", dblclickHandler)
  }
  function cancelHandler() {
    dblclickHandler()
  }

  map.on("click", clickHandler)
  map.on("mousemove", mousemoveHandler)
  map.on("dblclick", dblclickHandler)
  map.on("contextmenu", cancelHandler)
}

polyline.addEventListener("click", () => drawEvent("polyline"))
polygon.addEventListener("click", () => drawEvent("polygon"))
clear.addEventListener("click", () => {
  layer.clearLayers()
  clear.className = "tool-btn clear clear-disable"
})

const options = {
  polygon: {
    allowIntersection: false, // Restricts shapes to simple polygons
    drawError: {
      color: "#e1e100", // Color the shape will turn when intersects
      message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
    },
    shapeOptions: {
      color: "#bada55",
    },
  },
  rectangle: {
    metric: false,
    showArea: false,
    shapeOptions: {
      stroke: true,
      color: "#0000FF",
      weight: 4,
      opacity: 0.5,
      fill: true,
      fillColor: null,
      fillOpacity: 0.2,
      clickable: true,
    },
  },
  marker: {
    icon: defaultIcon,
  },
  polyline: {
    shapeOptions: {
      color: "#f357a1",
      weight: 10,
    },
  },
}

let index = 0
let layer = L.featureGroup()
function watchDraw(type, drawControl) {
  // 监听绘制事件 vue3Proxy原因
  map.on("draw:created", drawCallBack)
  map.on("draw:drawstop", () => {
    if (index) {
      // 取消前面 绘制、dbclick事件监听
      map.off("draw:created", drawCallBack)
      map.off("dblclick", complete)
      // map.off("draw:drawstop")
      drawControl.disable()
      clear.className = "tool-btn clear clear-enable"
      console.log(drawControl)
      if (type === "marker") {
        cancel.value = false
      }
      index = 0
      map.off("draw:drawstop")
      map.off("contextmenu")
    }
  })
  map.on("contextmenu", () => {
    // map.off("contextmenu")
    if (type === "marker") {
      cancel.value = false
    }
    drawControl.disable()
  })
}

function drawEvent(type) {
  if (type === "marker") {
    cancel.value = true
  }
  let drawControl = enableDraw(type)
  // draw.drawControl = this.enableDraw(type)
  watchDraw(type, drawControl)

  // draw.type = type
  if (type === "polygon") {
    map.on("dblclick", complete(drawControl))
  }
}

// draw 开启对应绘制
const enableDraw = type => {
  let drawControl = null
  switch (type) {
    case "Polyline":
      drawControl = new L.Draw.Polyline(map, options.polyline)
      break
    case "rectangle":
      drawControl = new L.Draw.Rectangle(map, options.rectangle)
      break
    case "polygon":
      drawControl = new L.Draw.Polygon(map, options.polygon)
      break
    case "marker":
      drawControl = new L.Draw.Marker(map, options.marker)
      break
    default:
      drawControl = new L.Draw.Polyline(map)
      break
  }
  drawControl.enable()

  return drawControl
}

// 将绘制的图层添加到绘制图层中，并保存图层信息
function drawCallBack(e) {
  index++
  // draw.type = e.layerType
  let drawLayer = e.layer
  console.log(e)
  drawLayer.bindPopup("1")
  // draw.editableLayers = e.layer
  layer.addLayer(drawLayer).addTo(map)
  return e.layer
  // const bounds = L.Util.transform(e.layer._bounds,L.CRS.EPSG3857,L.CRS.EPSG4326)
}

// 双击完成绘制
function complete(drawControl) {
  drawControl.completeShape()
}
