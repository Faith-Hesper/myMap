"use strict";

heatMapLayer = L.supermap.heatMapLayer("heatMap", {
  id: "heatmap",
  map: map,
  radius: 10,
  featureWeight: "value"
});
$.get('data/weather.csv', function (response) {
  var dataObj = Papa.parse(response, {
    skipEmptyLines: true,
    header: true
  });
  console.log(dataObj);
  var data = dataObj.date_User;
  var geojson = {
    "type": "FeatureCollection",
    "features": []
  };

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var date = new Date(item.date);
    var year = date.getFullYear();
    var feature = {
      "type": "feature",
      "geometry": {
        "type": "Point",
        "cordinates": []
      },
      "properties": {
        "value": parseFloat(item.temperature)
      }
    };
    feature.geometry.cordinates = [parseFloat(item.X), parseFloat(item.Y)];
    geojson.features.push(feature);
  }

  heatMapLayer.addFeatures(geojson);
  heatMapLayer.addTo(map);
});