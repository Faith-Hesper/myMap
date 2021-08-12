"use strict";

var selectId,
    selectLayerName,
    vectorLayer = L.supermap.tiledVectorLayer(url, {
  noWrap: true,
  cacheEnabled: true,
  returnAttributes: true,
  attribution: "Tile Data©SuperMap iServer with©SuperMap iClient" // transparent: true

}).addTo(map);
var id;
vectorLayer.on('click', function (evt) {
  id = evt.layer.properties.id;
  var layerName = evt.layer.layerName;
  clearHighlight(); // 判断是否有选中矢量数据，有则取消高亮

  selectId = id; // alert(id);
  // console.log(id)           

  selectLayerName = layerName;
  var selectStyle = {
    fillColor: '#800026',
    fillOpacity: 0.5,
    stroke: true,
    fill: true,
    color: 'red',
    opacity: 1,
    weight: 2
  };
  vectorLayer.setFeatureStyle(id, layerName, selectStyle); // query(id);
});

function clearHighlight() {
  if (selectId && selectLayerName) {
    vectorLayer.resetFeatureStyle(selectId, selectLayerName);
  }

  selectId = null;
  selectLayerName = null;
}

function query(id) {
  var idsParam = new SuperMap.GetFeaturesByIDsParameters({
    IDs: [id],
    // 查询ID
    datasetNames: ["ChinaClimate:China_Province_pg"] //数据源：数据集

  });
  L.supermap.featureService(dataurl).getFeaturesByIDs(idsParam, function (serviceResult) {
    console.log(serviceResult.result.features);
    resultLayer = L.geoJSON(serviceResult.result.features, {
      onEachFeature: function onEachFeature(feature, layer) {
        console.log(feature.properties.NAME);
        layer.bindPopup("ID: " + feature.properties.NAME + "<br>"); //将内容绑定到图层
      } // 新创建一个事件时调用的函数

    }).addTo(map); // var featuers = serviceResult.result.features；
  }); // ID查询
}