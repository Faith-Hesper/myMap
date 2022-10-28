/*
 * @Author: Faith
 * @Date: 2021-09-10 21:22
 * @LastAuthor: Faith
 * @LastEditTime: 2022-10-27 14:14
 * @Description:
 */
/**
 * 日期选择设置
 */

const dateselect = document.querySelectorAll('.select')

// 综合信息
const wt_dateselect = document.getElementById('wt_dateselect')
const gnl_search = document.getElementById('gnl_search')
let gnl_info_date = '2021/4/30'

// 气温热力图
const tp_heat_dateselect = document.getElementById('tp_heat_dateselect')
const day_tp_heat_search = document.getElementById('day_tp_heat_search')
let tp_heat_info_date = '2021/4/30'

// 降雨量等值线图
const rain_isogram_dateselect = document.getElementById('rain_isogram_dateselect')
const day_rain_isogram_search = document.getElementById('day_rain_isogram_search')
let rain_isogram_info_date = '2021/4/30'

// 气温等值线图
const tp_isogram_dateselect = document.getElementById('tp_isogram_dateselect')
const day_tp_isogram_search = document.getElementById('day_tp_isogram_search')
let tp_isogram_info_date = '2021/4/30'

function wt_dateselect_time() {
  let index = wt_dateselect.selectedIndex
  gnl_info_date = wt_dateselect.options[index].value
}

function tp_heat_dateselect_time() {
  let index = tp_heat_dateselect.selectedIndex
  tp_heat_info_date = tp_heat_dateselect.options[index].value
}

function rain_isogram_dateselect_time() {
  let index = rain_isogram_dateselect.selectedIndex
  rain_isogram_info_date = rain_isogram_dateselect.options[index].value
}

function tp_isogram_dateselect_time() {
  let index = tp_isogram_dateselect.selectedIndex
  tp_isogram_info_date = tp_isogram_dateselect.options[index].value
}

wt_dateselect.addEventListener('change', wt_dateselect_time)
tp_heat_dateselect.addEventListener('click', tp_heat_dateselect_time)
rain_isogram_dateselect.addEventListener('click', rain_isogram_dateselect_time)
tp_isogram_dateselect.addEventListener('click', tp_isogram_dateselect_time)
