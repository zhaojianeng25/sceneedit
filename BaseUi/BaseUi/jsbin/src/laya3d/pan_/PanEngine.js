/**
* name
*/
var pan;
(function (pan) {
    var PanEngine = /** @class */ (function () {
        function PanEngine() {
        }
        PanEngine.update = function () {
        };
        PanEngine.init = function (canvas, callback) {
        };
        // 重写方法
        PanEngine.overrideMethods = function () {
        };
        // 初始化SceneData
        PanEngine.initSceneData = function (canvas) {
        };
        // 初始化ui相关
        PanEngine.initUIConf = function (callback) {
        };
        PanEngine.resetSize = function (width, height, scale) {
            if (scale === void 0) { scale = 1; }
        };
        PanEngine.htmlScale = 0.5;
        return PanEngine;
    }());
    pan.PanEngine = PanEngine;
})(pan || (pan = {}));
//# sourceMappingURL=PanEngine.js.map