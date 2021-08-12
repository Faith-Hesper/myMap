// 综合信息
const wt_dateselect = document.getElementById("wt_dateselect");
let gnl_search = document.getElementById("gnl_search");
let gnl_infor_date = "2021/4/30";

// 气温热力图
const tp_heat_dateselect = document.getElementById("tp_heat_dateselect");
let day_tp_heat_search = document.getElementById("day_tp_heat_search");
let tp_heat_infor_date = "2021/4/30";

// 降雨量等值线图
const rain_isogram_dateselect = document.getElementById("rain_isogram_dateselect");
let day_rain_isogram_search = document.getElementById("day_rain_isogram_search");
let rain_isogram_infor_date = "2021/4/30";

// 气温等值线图
const tp_isogram_dateselect = document.getElementById("tp_isogram_dateselect");
let day_tp_isogram_search = document.getElementById("day_tp_isogram_search");
let tp_isogram_infor_date = "2021/4/30";

function init_dateselect(params) {}
// console.log(selectdate);
function gnl_infor_time(params) {
  let index = wt_dateselect.selectedIndex;
  gnl_infor_date = wt_dateselect.options[index].value;
  // console.log(gnl_infor_date);
}

function tp_heat_infor_time(params) {
  let index = tp_heat_dateselect.selectedIndex;
  tp_heat_infor_date = tp_heat_dateselect.options[index].value;
  // console.log(tp_heat_infor_date);
}

function rain_isogram_infor_time(params) {
  let index = rain_isogram_dateselect.selectedIndex;
  rain_isogram_infor_date = rain_isogram_dateselect.options[index].value;
  // console.log(rain_isogram_infor_date);
}

function tp_isogram_infor_time(params) {
  let index = tp_isogram_dateselect.selectedIndex;
  tp_isogram_infor_date = tp_isogram_dateselect.options[index].value;
  // console.log(tp_isogram_infor_date);
}

wt_dateselect.addEventListener("click", gnl_infor_time);
tp_heat_dateselect.addEventListener("click", tp_heat_infor_time);
rain_isogram_dateselect.addEventListener("click", rain_isogram_infor_time);
tp_isogram_dateselect.addEventListener("click", tp_isogram_infor_time);
