"use strict";

option = {
  legend: {
    data: ["降雨量", "径流量"],
    align: 'left'
  },
  toolbox: {
    feature: {
      magicType: {
        type: ['stack', 'tiled']
      },
      saveAsImage: {
        pixelRatio: 2
      }
    }
  },
  tooltip: {},
  xAxis: {
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    silent: false,
    splitLine: {
      show: false
    }
  },
  yAxis: {},
  series: [{
    name: 'bar',
    type: 'bar',
    animationDelay: function animationDelay(idx) {
      return idx * 10;
    }
  }, {
    name: 'bar2',
    type: 'bar',
    animationDelay: function animationDelay(idx) {
      return idx * 10 + 100;
    }
  }],
  animationEasing: 'elasticOut',
  animationDelayUpdate: function animationDelayUpdate(idx) {
    return idx * 5;
  }
};
var div = L.DomUtil.create('div');
var chart = echarts.init(div, '', {
  width: 500,
  height: 300
});
chart.setOption(option);