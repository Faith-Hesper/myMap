// 等值线类
class Isogram {
  constructor() {
    this.isogramlayer;
    // this.surfaceAnalystProcess;
  }

  surfaceAnalystProcess(zValueFieldName, attributeFilter) {
    let region = L.polygon([
      [7095467.634838, 8014861.994943],
      [2007950.338151, 8014861.994943],
      [2007950.338151, 15191660.723731],
      [7095467.634838, 15191660.723731],
    ]);
    // 表面分析参数
    surfaceAnalystParameters = new SuperMap.DatasetSurfaceAnalystParameters({
      extractParameter: new SuperMap.SurfaceAnalystParametersSetting({
        datumValue: 0, //基准值
        interval: 2, // 等值距
        resampleTolerance: 0, // 采样容限
        smoothMethod: SuperMap.SmoothMethod.BSPLINE,
        smoothness: 3,
        clipRegion: region,
      }),
      dataset: "weather@ChinaClimate",
      resolution: 9000, // 分辨率
      zValueFieldName: zValueFieldName,
      filterQueryParameter: new SuperMap.FilterParameter({
        attributeFilter: "date_User='" + attributeFilter + " 0:00:00'",
      }),
    });
    // 空间分析服务
    surfaceAnalystService = L.supermap.spatialAnalystService(serviceUrl);
    // 表面分析
    surfaceAnalystService.surfaceAnalysis(surfaceAnalystParameters, function (serviceResult) {
      let result = serviceResult.result;
      console.log(result);
      if (result && result.recordset && result.recordset.features) {
        this.isogramlayer = L.geoJSON(result.recordset.features, {
          weight: 3,
          style: (feature) => {
            console.log(feature.properties.dZvalue);
            if (feature.properties.dZvalue > 0 && feature.properties.dZvalue < 10) {
              L.polyline(feature.geometry.coordinates, {
                color: "#7879b0",
              })
                .bindPopup(feature.properties.dZvalue)
                .addTo(map);
              return {
                color: "#f1e0ab",
              };
            } else if (feature.properties.dZvalue >= 10 && feature.properties.dZvalue < 25) {
              return {
                color: "#b0cda1",
              };
            } else if (feature.properties.dZvalue >= 25 && feature.properties.dZvalue < 50) {
              return {
                color: "#a5ba81",
              };
            } else if (feature.properties.dZvalue >= 50 && feature.properties.dZvalue < 100) {
              return {
                color: "#8dc4e1",
              };
            } else if (feature.properties.dZvalue >= 100 && feature.properties.dZvalue < 250) {
              return {
                color: "#8eacd6",
              };
            } else {
              return {
                color: "#7879b0",
              };
            }
          },
        })
          // .addTo(map);
      } else {
        alert("图层未加载成功，请刷新重试");
      }
    });
  }
}

rain_isogram = new Isogram();
tp_isogram = new Isogram();

// surfaceAnalystProcess("temperature");

day_rain_isogram_search.addEventListener("click", () => {
  layerRemove();
  rain_isogram.surfaceAnalystProcess("rainfall", rain_isogram_infor_date);
});

day_tp_isogram_search.addEventListener("click", () => {
  layerRemove();
  tp_isogram.surfaceAnalystProcess("temperature", tp_isogram_infor_date);
  setTimeout(() => {
    // tp_isogram.isogramlayer.addTo(map);
    console.log(tp_isogram);
    
  }, 5000);
});
