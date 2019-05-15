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
/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var MapObsLayer = /** @class */ (function (_super) {
            __extends(MapObsLayer, _super);
            function MapObsLayer(app) {
                return _super.call(this, app) || this;
            }
            /**
             * 初始化
             * @param lx 层位置x
             * @param lx 层位置y
             * @param lw 层总宽度
             * @param lh 层总高度
             * @param urlFormat 下载mappart的url格式
             * @param thumb 总缩略图
             *
             */
            MapObsLayer.prototype.initObsLayer = function (lw, lh) {
                _super.prototype.init.call(this, 0, 0, lw, lh, scene.SceneRes.CELL_WIDTH, scene.SceneRes.CELL_HEIGHT);
                this.mapData = this._app.sceneObjectMgr.mapAssetInfo;
                this.alpha = 0.3;
            };
            /**
             * 通过摄像机设置窗口位置
             * @param camera
             *
             */
            MapObsLayer.prototype.setViewPortByCamera = function (camera) {
                this.setViewPort(camera.bufferLeft, camera.bufferTop, camera.bufferWidth, camera.bufferHeight);
            };
            //绘制
            MapObsLayer.prototype.onBeforDraw = function () {
                _super.prototype.onBeforDraw.call(this);
                this.graphics.clear();
            };
            /**
             * 每个格子循环到达时都触发
             * @param tx 单元格子x
             * @param ty 单元格子y
             * @param tpx 新的格子坐标x
             * @param tpy 新的格子坐标y
             * @param sysFrameFlag 帧标记
             *
             */
            MapObsLayer.prototype.onCellEach = function (tx, ty, tpx, tpy) {
                //开始绘制
                if (this.mapData.isObstacle(tx, ty))
                    this.graphics.drawRect(tpx, tpy, scene.SceneRes.CELL_WIDTH, scene.SceneRes.CELL_HEIGHT, "#FF0000");
            };
            /**
             * 绘制圆
             * @param cx 中心点x
             * @param cy 中心点y
             * @param radius 半径
             *
             */
            MapObsLayer.prototype.drawCircle = function (cx, cy, radius, camera) {
                this.graphics.clear();
                this.setViewPortByCamera(camera);
                this.graphics.drawCircle(cx * scene.SceneRes.CELL_WIDTH - this._viewPort.x, cy * scene.SceneRes.CELL_HEIGHT - this._viewPort.y, radius * scene.SceneRes.CELL_WIDTH, "#FF0000", "#FF0000", 2);
            };
            return MapObsLayer;
        }(scene.MapPartLayer));
        scene.MapObsLayer = MapObsLayer;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=MapObsLayer.js.map