    function object(o){
        function TF(){}
        TF.prototype = o;
        return new TF();
    }

    var util = {
        inheritPrototype: function(subType, parentType){
            var prototypeObj = object(parentType.prototype);
            prototypeObj.constructor = subType;
            subType.prototype = prototypeObj;
        },

        // 函数去抖
        debounce: function(idle, action){
            var last;
            return function(){
                var handle = this, args = arguments;
                clearTimeout(last);
                last = setTimeout(function(){
                    action.apply(handle, args);
                }, idle);
            }
        },

        /**
         * 函数节流
         * 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
         * @param delay  {number}    延迟时间，单位毫秒
         * @param action {function}  请求关联函数，实际应用需要调用的函数
         * @return {[type]}        [description]
         */
        throttle: function(delay, action){
            var last = 0;
            return function(){
                var curr = +new Date()
                if (curr - last > delay){
                    action.apply(this, arguments);
                    last = curr;
                }
            }
        },

        // 动态加载js脚本文件
        loadScript: function(url) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            document.body.appendChild(script);
        },

        // 判断浏览器
        client: function(){
            var ua = navigator.userAgent;
            var platform = navigator.platform;

            var andriodVersion = 0;
            var ieVersion = 0;
            var level = {
                pcSenior:0,
                pcLow:0,
                moveSenior:0,
                moveLow:0
            };
            // 浏览器标记
            var browser = {
                chrome:0,
                uc:0,
                // 指pc
                safari:0
            };

            // if return ture : 代表不是ie8 及以下浏览器
            // xp:  IE8 IE7 IE6 Chrome
            function hasCreateElement(){
                return typeof document.createElement == "function";
            }
            var ieNotLow = hasCreateElement();


            if(!ieNotLow){
                level.pcLow = 1;
            }else if(/MSIE ([^;]+)/.test(ua)){
                ieVersion = RegExp["$1"]>>0;
                if(ieVersion>8){
                    level.pcSenior = 1;
                }
            }else if(/Android (\d+\.\d+)/.test(ua)){
                if (/UCBrowser/.test(ua)) {
                    browser.uc = 1;
                };
                andriodVersion = parseFloat(RegExp.$1);
                if (andriodVersion>2.3) {
                    level.moveSenior = 1;
                }else{
                    level.moveLow = 1;
                };
            }else if(ua.indexOf("iPhone") > -1 ||(ua.indexOf("iPad") > -1)){
                level.moveSenior = 1;
            }else if(/Gecko?(:AppleWebKit)?/.test(ua)){
                level.pcSenior = 1;
                if (/Chrome\/(\S+)/.test(ua)) {
                    browser.chrome = 1;
                } else if(/Version\/(\S+)/.test(ua)){
                    browser.safari = 1;
                };
            }else{
                level.pcLow = 1;
            }

            return{
                level:level,
                browser:browser
            }
        }()

    };
    
    module.exports = util;