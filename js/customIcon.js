/*
 * @Author: Faith
 * @Date: 2022-10-28 14:42
 * @LastAuthor: Faith
 * @LastEditTime: 2022-10-30 22:54
 * @Description:
 */

const customIcon = L.Icon.extend({
  options: {
    iconUrl: "./assets/weather.svg",
    iconAnchor: [20, 10],
    iconSize: [40, 40],
    html: "",
  },
  initialize: function (options) {
    options = L.Util.setOptions(this, options)
  },
  createIcon: function () {
    let div = document.createElement("div"),
      options = this.options

    div.innerHTML = this._setIcon()
    this._setIconStyle(div)
    return div
  },
  _setIcon: function () {
    let options = this.options
    return `<img class="img-icon" src="${options.iconUrl}">`
  },
  _setIconStyle: function (div) {
    let options = this.options
    let iconSize = L.point(options.iconSize)
    let anchor = L.point(options.iconAnchor)

    div.className = "leaflet-marker-icon custom-icon"

    div.style.marginLeft = -anchor.x + "px"
    div.style.marginTop = -anchor.y + "px"

    div.style.width = iconSize.x + "px"
    div.style.height = iconSize.y + "px"
  },
})
const defaultIcon = new customIcon({
  iconUrl: "./assets/weather.svg",
})
const sun = new customIcon({
  iconUrl: "./assets/weather_qing.svg",
})
const rain = new customIcon({
  iconUrl: "./assets/weather_zhongyu.svg",
})
const yun = new customIcon({
  iconUrl: "./assets/weather.svg",
})
const fog = new customIcon({
  iconUrl: "./assets/weather-fog.svg",
})
const windy = new customIcon({
  iconUrl: "./assets/weatherwindy.svg",
})
const sink = new customIcon({
  iconUrl: "./assets/weather_fuchen.svg",
})
