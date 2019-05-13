var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scene2d;
(function (scene2d) {
    var me;
    (function (me) {
        var Override2dEngine = /** @class */ (function (_super) {
            __extends(Override2dEngine, _super);
            function Override2dEngine() {
                return _super.call(this) || this;
            }
            Override2dEngine.initConfig = function () {
                var _this = this;
                Pan3d.me.Engine.update = function () { _this.update(); }; //更换update
                Pan3d.me.Engine.init = function ($caves) { _this.init($caves); }; //更换引擎初始化
                Pan3d.me.Engine.resetSize = function (width, height) { _this.resetSize(width, height); }; //更尺寸变化
                Pan3d.me.Engine.resetViewMatrx3D = function () { _this.resetViewMatrx3D(); };
            };
            Override2dEngine.resetSize = function (width, height) {
                if (isNaN(width)) {
                    width = document.body.clientWidth;
                }
                if (isNaN(height)) {
                    height = document.body.clientHeight;
                }
                Pan3d.me.Scene_data.stageWidth = width;
                Pan3d.me.Scene_data.stageHeight = height;
                Pan3d.me.Scene_data.context3D.resetSize(Pan3d.me.Scene_data.stageWidth, Pan3d.me.Scene_data.stageHeight);
                Pan3d.me.UIManager.getInstance().resize();
                Pan3d.me.BloodManager.getInstance().resize();
                Pan3d.me.Engine.resetViewMatrx3D();
                me.CanvasPostionModel.getInstance().resetSize();
            };
            Override2dEngine.init = function ($caves) {
                scene3d.me.OverrideEngine.init($caves);
                Pan3d.me.Scene_data.focus3D.x = 0;
                Pan3d.me.Scene_data.focus3D.y = 0;
                Pan3d.me.Scene_data.focus3D.z = 0;
                Pan3d.me.Scene_data.focus3D.rotationY = 0;
                Pan3d.me.Scene_data.focus3D.rotationX = -45;
                Pan3d.me.Scene_data.cam3D.distance = 250;
            };
            Override2dEngine.resetViewMatrx3D = function () {
                if (Pan3d.me.Scene_data.viewMatrx3D) {
                    Pan3d.me.Scene_data.viewMatrx3D.identity();
                }
                else {
                    Pan3d.me.Scene_data.viewMatrx3D = new Pan3d.me.Matrix3D;
                }
                var fovw = Pan3d.me.Scene_data.stageWidth;
                var fovh = Pan3d.me.Scene_data.stageHeight;
                Pan3d.me.Scene_data.sceneViewHW = Math.max(fovw, fovh);
                Pan3d.me.Scene_data.viewMatrx3D.appendScale(1 / Pan3d.me.Scene_data.sceneViewHW * 2, 1 / Pan3d.me.Scene_data.sceneViewHW * 2, 1 / 1000);
                Pan3d.me.Scene_data.viewMatrx3D.appendScale(1 * (Pan3d.me.Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (Pan3d.me.Scene_data.sceneViewHW / fovw * 2), 1);
                Pan3d.me.Scene_data.viewMatrx3D.appendScale(2 * this.htmlScale, 2 * this.htmlScale, 1);
            };
            Override2dEngine.htmlScale = 0.5;
            return Override2dEngine;
        }(scene3d.me.OverrideEngine));
        me.Override2dEngine = Override2dEngine;
    })(me = scene2d.me || (scene2d.me = {}));
})(scene2d || (scene2d = {}));
//# sourceMappingURL=Override2dEngine.js.map