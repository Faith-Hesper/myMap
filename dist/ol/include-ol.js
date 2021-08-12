/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 (function () {
    var r = new RegExp("(^|(.*?\\/))(include-ol\.js)(\\?|$)"),
        s = document.getElementsByTagName('script'), targetScript;
    for (var i = 0; i < s.length; i++) {
        var src = s[i].getAttribute('src');
        if (src) {
            var m = src.match(r);
            if (m) {
                targetScript = s[i];
                break;
            }
        }
    }

    function inputScript(url) {
        var script = '<script type="text/javascript" src="' + url + '"><' + '/script>';
        document.writeln(script);
    }

    function inputCSS(url) {
        var css = '<link rel="stylesheet" href="' + url + '">';
        document.writeln(css);
    }

    function inArray(arr, item) {
        for (i in arr) {
            if (arr[i] == item) {
                return true;
            }
        }
        return false;
    }

    function supportES6() {
        var code = "'use strict'; class Foo {}; class Bar extends Foo {};";
        try {
            (new Function(code))();
        } catch (err) {
            return false;
        }
        if (!Array.from) {
            return false;
        }
        return true;
    }


    //加载类库资源文件
    function load() {
        var includes = (targetScript.getAttribute('include') || "").split(",");
        var excludes = (targetScript.getAttribute('exclude') || "").split(",");
        if (!inArray(includes, 'ol-debug') && !inArray(includes, 'ol@4.6.5') && !inArray(excludes, 'ol')) {
            inputCSS("libs/openlayers/6.4.3/ol.css");
            inputScript("libs/openlayers/6.4.3/ol.js");
        }
        if (inArray(includes, 'ol@4.6.5')){
            inputCSS("openlayers/4.6.5/ol.css");
            inputScript("openlayers/4.6.5/ol.js");
        }
        if (inArray(includes, 'ol-debug')) {
            inputCSS("openlayers/4.6.5/ol-debug.css");
            inputScript("openlayers/4.6.5/ol-debug.js");
        }
        if (inArray(includes, 'mapv')) {
            inputScript("../../web/libs/mapv/2.0.56/mapv.min.js");
        }
        if (inArray(includes, 'turf')) {
            inputScript("../../web/libs/turf/5.1.6/turf.min.js");
        }
        if (inArray(includes, 'echarts')) {
            inputScript("../../web/libs/echarts/4.9.0/echarts.min.js");
        }
        if (inArray(includes, 'proj4')) {
            inputScript("../../web/libs/proj4/2.6.2/proj4.js");
        }
        if (inArray(includes, 'ol3-echarts')) {
            inputScript("openlayers/ol3-echarts/2.0.3/ol3Echarts.min.js");
        }
        if (inArray(includes, 'ol3-echarts@1.3.6')) {
            inputScript("openlayers/ol3-echarts/1.3.6/ol3Echarts.min.js");
        }
        if (inArray(includes, 'ol-mapbox-style')) {
            inputScript("openlayers/plugins/ol-mapbox-style/2.11.2-2/olms.js");
        }
        if (inArray(includes, 'deck')) {
            inputScript("../../web/libs/deck.gl/5.1.3/deck.gl.min.js");
        }
        if (inArray(includes, 'osmbuildings')) {
            inputScript("../../web/libs/osmbuildings/OSMBuildings-OL3.js");
        }
        if (inArray(includes, 'animatedclusterlayer')) {
            inputScript("openlayers/plugins/animatedclusterlayer/animatedclusterlayer.js");
        }
        if (inArray(includes, 'layerswitcher')) {
            inputCSS("openlayers/plugins/ol-layerswitcher/3.6.0/ol-layerswitcher.css");
            inputScript("openlayers/plugins/ol-layerswitcher/3.6.0/ol-layerswitcher.js");
        }
        if (inArray(includes, 'jsonsql')) {
            inputScript("../../web/libs/jsonsql/jsonsql.js");
        }
        if (inArray(includes, 'geostats')) {
            inputScript("../../web/libs/geostats/geostats.js");
        }
        if (inArray(includes, 'canvg')) {
            inputScript("../../web/libs/canvg/3.0.6/canvg.min.js");
        }
        if (!inArray(excludes, 'iclient-ol')) {
          if (supportES6()) {
              inputScript("dist/ol/iclient-ol-es6.min.js");
          } else {
              inputScript("dist/ol/iclient-ol.min.js");
          }
        }
        if (!inArray(excludes, 'iclient-ol-css')) {
            inputCSS("dist/ol/iclient-ol.min.css");
        }
    }

    load();
    window.isLocal = true;
    window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8090" : document.location.protocol + "//" + document.location.host;
})();
