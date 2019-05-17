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
        var MapLayer = /** @class */ (function (_super) {
            __extends(MapLayer, _super);
            function MapLayer(app) {
                var _this = _super.call(this) || this;
                /**
                 * 层总宽度
                 */
                _this._layerRect = new Rectangle();
                _this._app = app;
                _this._viewPort = new Rectangle();
                return _this;
            }
            /**
             * 初始化
             * @param lw 层总宽度
             * @param lh 层总高度
             * @param urlFormat 下载mappart的url格式
             * @param thumb 总缩略图
             *
             */
            MapLayer.prototype.init = function (x, y, lw, lh, cellWidth, cellHeight) {
                this._layerRect.x = x;
                this._layerRect.y = y;
                this._layerRect.width = lw;
                this._layerRect.height = lh;
                this._cellWidth = cellWidth;
                this._cellHeight = cellHeight;
            };
            /**
             * 设置视口大小
             * @param pwidth
             * @param pheight
             *
             */
            MapLayer.prototype.setViewPort = function (pX, pY, pwidth, pheight) {
                if (pX != this._viewPort.x || pY != this._viewPort.y) {
                    this._viewPort.x = pX;
                    this._viewPort.y = pY;
                }
                if (pwidth != this._viewPort.width || pheight != this._viewPort.height) {
                    this._viewPort.width = pwidth;
                    this._viewPort.height = pheight;
                }
            };
            /**
             * 通过摄像机设置窗口位置
             * @param camera
             *
             */
            MapLayer.prototype.setViewPortByCamera = function (camera) {
                this.setViewPort(camera.bufferLeft, camera.bufferTop, camera.bufferWidth, camera.bufferHeight);
            };
            /**
             * 设置层级的坐标
             * @param newX 新位置x
             * @param newY 新位置y
             *
             */
            MapLayer.prototype.setLayerLocation = function (newX, newY) {
                if (this._layerRect.x == newX && this._layerRect.y == newY)
                    return;
                this._layerRect.x = newX;
                this._layerRect.y = newY;
            };
            /*绘制底图*/
            MapLayer.prototype.update = function () {
                //绘制前
                this.onBeforDraw();
                //1.得到窗口的起始索引位置
                var vLeft = -(this._layerRect.x - this._viewPort.x);
                var vTop = -(this._layerRect.y - this._viewPort.y);
                //2.定位在哪一个cell索引位置
                var vStartIndexX = MathU.parseInt(vLeft / this._cellWidth);
                var vStartIndexY = MathU.parseInt(vTop / this._cellHeight);
                //3.得出a端，绘图区域的前段的邻居
                var v_aWidth = vLeft % this._cellWidth;
                var v_aHeight = vTop % this._cellHeight;
                //4.得到层的索引宽度
                var l_idxWidth = MathU.parseInt(this._layerRect.width / this._cellWidth);
                var l_idxHeight = MathU.parseInt(this._layerRect.height / this._cellHeight);
                if (this._layerRect.width % this._cellWidth != 0)
                    l_idxWidth++;
                if (this._layerRect.height % this._cellHeight != 0)
                    l_idxHeight++;
                //5.得出偏移量
                l_idxWidth -= vStartIndexX;
                l_idxHeight -= vStartIndexY;
                //6.起始位置负数则跳过
                var scw = 0;
                var sch = 0;
                if (vStartIndexX < 0)
                    scw = Math.abs(vStartIndexX);
                if (vStartIndexY < 0)
                    sch = Math.abs(vStartIndexY);
                //7.结束位置超过就跳过
                var right = this._viewPort.x > 0 ? this._viewPort.right : this._viewPort.width; //修正右侧位置
                var bottom = this._viewPort.y > 0 ? this._viewPort.bottom : this._viewPort.height; //修正下侧位置
                var endIndexX = MathU.parseInt((this._layerRect.right - right) / this._cellWidth);
                var endIndexY = MathU.parseInt((this._layerRect.bottom - bottom) / this._cellHeight);
                if (endIndexX > 0)
                    l_idxWidth -= endIndexX;
                if (endIndexY > 0)
                    l_idxHeight -= endIndexY;
                /////////// 这个位置铺的是面对视口的铺装方式 ////////////
                var cw = scw;
                var ch = sch;
                while (ch < l_idxHeight) {
                    while (cw < l_idxWidth) {
                        var tx = vStartIndexX + cw;
                        var ty = vStartIndexY + ch;
                        var tpx = cw * this._cellWidth - v_aWidth;
                        var tpy = ch * this._cellHeight - v_aHeight;
                        this.onCellEach(tx, ty, tpx, tpy);
                        cw++; //列数自增
                        tpx += this._cellWidth; //累积列宽的定位
                    }
                    ch++; //行数自增
                    cw = scw; //列数归零	
                }
                this.onAtferDrow();
            };
            /**
             * 绘制前
             *
             */
            MapLayer.prototype.onBeforDraw = function () {
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
            MapLayer.prototype.onCellEach = function (tx, ty, tpx, tpy) {
                throw new Error("子类未实现");
            };
            MapLayer.prototype.onAtferDrow = function () {
            };
            //清理地图切片
            MapLayer.prototype.clear = function () {
            };
            return MapLayer;
        }(Laya.Sprite));
        scene.MapLayer = MapLayer;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=MapLayer.js.map