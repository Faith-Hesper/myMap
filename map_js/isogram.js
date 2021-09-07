// 等值线类
class Isogram {
  constructor() {
    this.isogramlayer;
    this.isolayer;
    // this.surfaceAnalystProcess();
  }

  surfaceAnalystProcess(zValueFieldName="temperature", attributeFilter="2021/4/30") {
    let region = L.polygon([
      [7095467.634838, 8014861.994943],
      [2007950.338151, 8014861.994943],
      [2007950.338151, 15191660.723731],
      [7095467.634838, 15191660.723731]
    ]);
    // 表面分析参数
    surfaceAnalystParameters = new SuperMap.DatasetSurfaceAnalystParameters({
      extractParameter: new SuperMap.SurfaceAnalystParametersSetting({
        datumValue: 0, //基准值
        interval: 2, // 等值距
        resampleTolerance: 0, // 采样容限
        smoothMethod: SuperMap.SmoothMethod.BSPLINE,
        smoothness: 3,
        clipRegion: region
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
          onEachFeature: (feature, layer) => {
            console.log(feature.geometry.coordinates);
            let latlng = [];
            // for (const iterator of feature.geometry.coordinates) {
            //   latlng.push(L.CRS.EPSG3857.unproject(L.point(iterator[0],iterator[1])));
            // //  console.log(latlng);
            // }
            // let polyline = L.polyline(latlng, {
            //   color: "#7879b0",
            // }).addTo(map);
            let polyline = L.polyline(feature.geometry.coordinates, {
              color: "#7879b0",
            });
            L.geoJSON(L.Util.transform(polyline, L.CRS.EPSG3857, L.CRS.EPSG4326)).addTo(map);
          },
          style: (feature) => {
          }
        })
          .addTo(map);
          this.isolayer = L.featureGroup(this.isogramlayer)
        console.log(this.isolayer);
        console.log(this.isogramlayer);
      } else {
        alert("图层未加载成功，请刷新重试");
      }
    });
  }
}

rain_isogram = new Isogram();
tp_isogram = new Isogram();

// surfaceAnalystProcess("temperature");


