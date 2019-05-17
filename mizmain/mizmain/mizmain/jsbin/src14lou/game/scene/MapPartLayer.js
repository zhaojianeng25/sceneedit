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
        var MapPartLayer = /** @class */ (function (_super) {
            __extends(MapPartLayer, _super);
            function MapPartLayer(app) {
                var _this = _super.call(this, app) || this;
                /*地图切片*/
                _this._mapParts = new Object();
                //是否需要排序
                _this._needSort = true;
                //是否所有素材都加载完毕
                _this._isNoAction = false;
                return _this;
            }
            Object.defineProperty(MapPartLayer.prototype, "isNoAction", {
                /**
                 * 所有素材加载完毕
                 * @return
                 *
                 */
                get: function () {
                    return this._isNoAction;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapPartLayer.prototype, "urlFormat", {
                /**
                 * 路径格式
                 * @return
                 *
                 */
                get: function () {
                    return this._urlFormat;
                },
                enumerable: true,
                configurable: true
            });
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
            MapPartLayer.prototype.initMapPartLayer = function (lx, ly, lw, lh, urlFormat, thumb) {
                _super.prototype.init.call(this, lx, ly, lw, lh, scene.MapPart.mapPartWidth, scene.MapPart.mapPartHeight);
                this._urlFormat = urlFormat;
                var r = MapPartLayer.THUM_RADIO;
                if (thumb)
                    this._thumb = Texture.createFromTexture(thumb, lx / r, ly / r, lw / r, lh / r);
            };
            MapPartLayer.prototype.update = function () {
                //检查地图
                this.checkMapPart();
                _super.prototype.update.call(this);
            };
            //检测地图切片是否释放
            MapPartLayer.prototype.checkMapPart = function () {
                //时间在检测间隔内，则退出
                if ((Laya.timer.currTimer - this._lastCheckMapPartTime) < MapPartLayer.INTERVAL_TIME) {
                    return;
                }
                //重置时间
                this._lastCheckMapPartTime = Laya.timer.currTimer;
                //开始检查
                for (var key in this._mapParts) {
                    if (this._mapParts.hasOwnProperty(key)) {
                        var mp = this._mapParts[key];
                        //超过默认15秒过期时间，则释放
                        if ((Laya.timer.currTimer - mp.lastVisiTime) > MapPartLayer.EXPIRATION_TIME) {
                            mp.clear(false);
                            delete this._mapParts[mp.key];
                        }
                    }
                }
            };
            //绘制
            MapPartLayer.prototype.onBeforDraw = function () {
                _super.prototype.onBeforDraw.call(this);
                this.graphics.clear();
            };
            MapPartLayer.prototype.onAtferDrow = function () {
                _super.prototype.onAtferDrow.call(this);
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
            MapPartLayer.prototype.onCellEach = function (tx, ty, tpx, tpy) {
                var src = this.getMapPart(tx, ty);
                //保持访问
                src.lastVisiTime = Laya.timer.currTimer;
                //开始绘制
                if (src.texture) {
                    this.graphics.drawTexture(src.texture, tpx, tpy);
                }
                else if (src.thumTexture) {
                    this.graphics.drawTexture(src.thumTexture, tpx, tpy, scene.MapPart.mapPartWidth, scene.MapPart.mapPartHeight);
                }
            };
            /**
             * 获得地图切片
             * @param x 切片x
             * @param y 切片y
             * @return
             *
             */
            MapPartLayer.prototype.getMapPart = function (x, y) {
                var key = (x << 6) + y;
                var mapPart = this._mapParts[key];
                if (!mapPart) {
                    //先搞定缩略图
                    var th;
                    if (this._thumb) {
                        th = Texture.createFromTexture(this._thumb, x * scene.MapPart.mapPartWidth / MapPartLayer.THUM_RADIO, //x
                        y * scene.MapPart.mapPartHeight / MapPartLayer.THUM_RADIO, //y
                        scene.MapPart.mapPartWidth / MapPartLayer.THUM_RADIO, //width
                        scene.MapPart.mapPartHeight / MapPartLayer.THUM_RADIO); //height
                    }
                    //获取素材路径
                    var url = game.utils.StringU.substitute(this._urlFormat, x, y);
                    //构造地图切片
                    mapPart = new scene.MapPart(th, url, key);
                    this._mapParts[key] = mapPart;
                }
                mapPart.lastVisiTime = Laya.timer.currTimer;
                return mapPart;
            };
            //清理资源
            MapPartLayer.prototype.clear = function () {
                //清理地图切片
                for (var key in this._mapParts) {
                    if (this._mapParts.hasOwnProperty(key)) {
                        var mp = this._mapParts[key];
                        if (mp) {
                            mp.clear(true);
                        }
                        delete this._mapParts[key];
                    }
                }
                _super.prototype.clear.call(this);
            };
            MapPartLayer.prototype.destroy = function (destroyChild) {
                this.clear();
                _super.prototype.destroy.call(this, destroyChild);
            };
            /**
             * 缩略图比例
             */
            MapPartLayer.THUM_RADIO = 10;
            //轮询检查地图切片时间间隔
            MapPartLayer.INTERVAL_TIME = 1000;
            //释放时间
            MapPartLayer.EXPIRATION_TIME = 2000;
            return MapPartLayer;
        }(game.scene.MapLayer));
        scene.MapPartLayer = MapPartLayer;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=MapPartLayer.js.map