/*
 * @Author: Faith
 * @Date: 2022-10-28 14:42
 * @LastAuthor: Faith
 * @LastEditTime: 2022-10-28 14:42
 * @Description:
 */

const customIcon = L.Icon.extend({
  options: {
    iconUrl: './assets/weather.svg',
    iconSize: [40, 40],
  },
})
const defaultIcon = new customIcon({
  iconUrl: './assets/weather.svg',
})
const sun = new customIcon({
  iconUrl: './assets/weather_qing.svg',
})
const rain = new customIcon({
  iconUrl: './assets/weather_zhongyu.svg',
})
const yun = new customIcon({
  iconUrl: './assets/weather.svg',
})
const fog = new customIcon({
  iconUrl: './assets/weather-fog.svg',
})
const windy = new customIcon({
  iconUrl: './assets/weatherwindy.svg',
})
const sink = new customIcon({
  iconUrl: './assets/weather_wu.svg',
})
