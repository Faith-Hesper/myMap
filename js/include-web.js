(function () {
    var r = new RegExp("(^|(.*?\\/))(include-web\.js)(\\?|$)"),
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

    //加载类库资源文件
    function load() {
        var includes = (targetScript.getAttribute('include') || "").split(",");
        var excludes = (targetScript.getAttribute('exclude') || "").split(",");
        inputScript("js/tokengenerator.js");
        var jQueryInclude = false;
        if (!inArray(excludes, 'example-i18n')) {
            inputScript("libs/jquery/jquery.min.js");

            inputScript("libs/i18next/i18next.min.js");
            inputScript("libs/jquery-i18next/jquery-i18next.min.js");

            inputScript("js/utils.js");
            // inputScript("js/localization.js");
            // document.writeln("<script> Localization.initializeI18N('../', function () {Localization.localize();Localization.initGlobal();});</script>");
            jQueryInclude = true;
        }

        if (inArray(includes, 'jquery') && !jQueryInclude) {
            inputScript("libs/jquery/jquery.min.js");
        }

        if (inArray(includes, 'bootstrap')) {
            inputScript("libs/jquery/jquery.min.js");
            inputCSS("libs/bootstrap/css/bootstrap.min.css");
            inputScript("libs/bootstrap/js/bootstrap.min.js");
        }
        if (inArray(includes, 'bootstrap-css')) {
            inputCSS("libs/bootstrap/css/bootstrap.min.css")
        }

        if (inArray(includes, 'bootstrap-js')) {
            inputScript("libs/bootstrap/js/bootstrap.min.js");
        }

        if (inArray(includes, 'jquery-ui')) {
            inputCSS("libs/jquery-ui/1.12.1/jquery-ui.css");
            inputScript("libs/jquery-ui/1.12.1/jquery-ui.min.js");
        }

        if (inArray(includes, 'template')) {
            inputScript("libs/art-template/template-web.js");
        }

        if (inArray(includes, 'randomcolor')) {
            inputScript("libs/randomcolor/randomColor.min.js");
        }
        if (inArray(includes, 'papaparse')) {
            inputScript("libs/papaparse/papaparse.min.js");
        }

        if (inArray(includes, 'moment')) {
            inputScript("libs/moment.js/moment.min.js");
            inputScript("libs/moment.js/zh-cn.js");
        }

        if (inArray(includes, 'bootstrap-datetimepicker')) {
            inputCSS("libs/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css");
            inputScript("libs/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js");
        }
        if (inArray(includes, 'bootstrap-select')) {
            inputCSS("libs/bootstrap-select/bootstrap-select.min.css");
            inputScript("libs/bootstrap-select/bootstrap-select.min.js");
        }
        if (inArray(includes, 'geohash')) {
            inputScript("libs/geohash/geohash.js");
        }
        if (inArray(includes, 'dat-gui')) {
            inputScript("libs/dat-gui/0.7.6/dat.gui.min.js");
            datGuiI18N();
        }
        if (inArray(includes, 'admin-lte')) {
            inputCSS("libs/admin-lte/css/AdminLTE.min.css");
            inputCSS("libs/admin-lte/css/skins/skin-blue.min.css");
            inputCSS("libs/font-awesome/css/font-awesome.min.css");
            inputScript("libs/admin-lte/js/app.min.js");
        }
        if (inArray(includes, 'jquery.scrollto')) {
            inputScript("libs/jquery.scrollto/jquery.scrollTo.min.js");
        }
        if (inArray(includes, 'ace')) {
            inputScript("libs/ace/ace.js");
        }

        if (inArray(includes, 'widgets.alert')) {
            inputScript("js/widgets.js");
        }

        if (inArray(includes, 'widgets')) {
            inputCSS("libs/css-loader/css-loader.css");
            inputScript("js/widgets.js");
        }
        if (inArray(includes, 'zTree')) {
            inputCSS("libs/iclient8c/examples/js/plottingPanel/zTree/css/zTreeStyle.css");
            inputScript("libs/iclient8c/examples/js/plottingPanel/zTree/jquery.ztree.core.js");
        }
        if (inArray(includes, 'jquery-scontextMenu')) {
            inputCSS("libs/jquery.contextMenu/jquery.contextMenu.min.css");
            inputScript("libs/jquery.contextMenu/jquery.contextMenu.min.js");
        }
        if (inArray(includes, 'colorpicker')) {
            inputScript("libs/iclient8c/examples/js/jquery.js");
            inputScript("libs/iclient8c/examples/js/jquery.colorpicker.js");
        }
        if (inArray(includes, 'fileupLoad')) {
            inputScript("libs/iclient8c/examples/js/jquery.js");
            inputScript("libs/iclient8c/examples/js/fileupLoad.js");
        }
        if (inArray(includes, 'sticklr')) {
            inputCSS("libs/iclient8c/examples/css/jquery-sticklr.css");
            inputCSS("libs/iclient8c/examples/css/icon.css");
        }
        if (inArray(includes, 'responsive')) {
            inputCSS("libs/iclient8c/examples/css/bootstrap-responsive.min.css");
        }
        if (inArray(includes, 'lazyload')) {
            inputScript("libs/lazyload/jquery.lazyload.min.js");
        }
        if (inArray(includes, 'i18n')) {
            inputScript("libs/i18next/i18next.min.js");
            inputScript("libs/jquery-i18next/jquery-i18next.min.js");
        }
        if (inArray(includes, 'react')) {
            inputScript("libs/react/16.4.2/react.production.min.js");
            inputScript("libs/react/16.4.2/react-dom.production.min.js");
            inputScript("libs/babel/6.26.0/babel.min.js");
        }
        if (inArray(includes, 'vue')) {
            inputScript("libs/vue/2.5.17/vue.min.js");
        }
        if (inArray(includes, 'ionRangeSlider')) {
            inputCSS("libs/ionRangeSlider/2.2.0/css/ion.rangeSlider.css");
            inputCSS("libs/ionRangeSlider/2.2.0/css/normalize.css");
            inputCSS("libs/ionRangeSlider/2.2.0/css/ion.rangeSlider.skinHTML5.css");
            inputScript("libs/ionRangeSlider/2.2.0/js/ion.rangeSlider.min.js");
        }
        if (inArray(includes, 'plottingPanel')) {
            inputScript("libs/iclient8c/examples/js/plottingPanel/zTree/jquery.ztree.core.js");
            inputCSS("libs/iclient8c/examples/js/plottingPanel/zTree/css/zTreeStyle.css");
            inputScript("libs/iclient8c/examples/js/plottingPanel/jquery-easyui-1.4.4/jquery.easyui.min.js");
            inputCSS("libs/iclient8c/examples/js/plottingPanel/jquery-easyui-1.4.4/css/easyui.css");
            inputScript("libs/iclient8c/examples/js/plottingPanel/colorpicker/js/colorpicker.js");
            inputCSS("libs/iclient8c/examples/js/plottingPanel/colorpicker/css/colorpicker.css");
        }

    }

    function datGuiI18N() {
        document.writeln("<script>function registerEventListener(evt,fn){" +
            "if(window.attachEvent){window.attachEvent('on'+evt,fn);}" +
            "else{window.addEventListener(evt,fn,false);}" +
            "}</script>");
        document.writeln("<script>registerEventListener('load',function() { " +
            "dat.GUI.TEXT_CLOSED=resources.text_close;dat.GUI.TEXT_OPEN=resources.text_open;" +
            "})</script>")
    }


    load();
    window.isLocal = true;
    window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8090" : document.location.protocol + "//" + document.location.host;
    window.isSite = true;//i18n相关设置
    window.version = "10.1.1";
    window.preRelease = "";
})();
