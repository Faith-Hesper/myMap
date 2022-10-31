/*
 * @Author: Faith
 * @Date: 2022-10-28 14:42
 * @LastAuthor: Faith
 * @LastEditTime: 2022-10-31 11:28
 * @Description:
 */
/*
 *                   江城子 . 程序员之歌
 *
 *               十年生死两茫茫，写程序，到天亮。
 *                   千行代码，Bug何处藏。
 *               纵使上线又怎样，朝令改，夕断肠。
 *
 *               领导每天新想法，天天改，日日忙。
 *                   相顾无言，惟有泪千行。
 *               每晚灯火阑珊处，夜难寐，加班狂。
 *
 */

const customIcon = L.Icon.extend({
  options: {
    iconUrl: "./assets/weather.svg",
    iconAnchor: [20, 10],
    iconSize: [40, 40],
    html: "22",
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
    return `
    <div class = "weather"><img class="img-icon" src="${options.iconUrl}"></div>
    <div class = "temprature">${options.html}℃</div>
    `
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

const defaultIconUrl = "./assets/weather.svg"
const sunIconUrl = "./assets/weather_qing.svg"
const rainIconUrl = "./assets/weather_zhongyu.svg"
const yunIconUrl = "./assets/weather.svg"
const fogIconUrl = "./assets/weather-fog.svg"
const windyIconUrl = "./assets/weatherwindy.svg"
const sinkIconUrl = "./assets/weather_fuchen.svg"

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
