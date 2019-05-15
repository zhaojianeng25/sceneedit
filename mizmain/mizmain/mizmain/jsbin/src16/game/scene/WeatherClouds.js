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
var game;
(function (game) {
    var scene;
    (function (scene_1) {
        /**
         * 云
         */
        var WeatherClouds = /** @class */ (function (_super) {
            __extends(WeatherClouds, _super);
            function WeatherClouds(app) {
                var _this = _super.call(this, app) || this;
                _this._assetsLoader = new AssetsLoader();
                _this._assetsLoader.load([game.Path.atlas_scene + "weather/clouds.atlas"], Handler.create(_this, _this.onResComplete));
                return _this;
            }
            WeatherClouds.prototype.onResComplete = function () {
                var path = 'scene/weather/clouds/';
                this.TEXTURES_SETTING = new Array(4);
                this.TEXTURES_SETTING[0] = Laya.loader.getRes(path + '10001.png'); //地面0
                this.TEXTURES_SETTING[1] = Laya.loader.getRes(path + '10002.png'); //地面1
                this.TEXTURES_SETTING[2] = Laya.loader.getRes(path + '10003.png'); //空中0
                this.TEXTURES_SETTING[3] = Laya.loader.getRes(path + '10004.png'); //空中1
                //远景，中景，近景数量定义
                this.LEN_SETTING = new Array(this.TEXTURES_SETTING.length);
                this.LEN_SETTING[0] = 2;
                this.LEN_SETTING[1] = 2;
                this.LEN_SETTING[2] = 4;
                this.LEN_SETTING[3] = 4;
                //远景，中景，近景速度定义
                this.SPEED_SETTING = new Array(this.TEXTURES_SETTING.length);
                this.SPEED_SETTING[0] = 0.31;
                this.SPEED_SETTING[1] = 0.32;
                this.SPEED_SETTING[2] = 0.33;
                this.SPEED_SETTING[3] = 0.35;
                //设置
                this._lens = this.LEN_SETTING.concat();
                this._lens = this.SPEED_SETTING.concat();
                this._windDirection = Math.PI / 180 * 140;
                this._groundSpacing = 1600;
                this._groundOverlapping = 400;
                this._fadeOutAlpha = 1.0;
                _super.prototype.enable.call(this);
            };
            /**
             * 重置天气
             * @return 重置是否成功
             */
            WeatherClouds.prototype.onReset = function (camera) {
                if (this.TEXTURES_SETTING) {
                    //底层整体偏移
                    this._groundOffsetX = -Math.max(this.TEXTURES_SETTING[0].width, this.TEXTURES_SETTING[3].width) * 2;
                    this._groundOffsetY = -Math.max(this.TEXTURES_SETTING[0].height, this.TEXTURES_SETTING[3].height) * 2;
                    //画布宽高
                    this._canvasWidth = camera.bufferWidth - this._groundOffsetX;
                    this._canvasHeight = camera.bufferHeight - this._groundOffsetY;
                    var diagonal = MathU.getDistance(0, 0, this._canvasWidth, this._canvasHeight); //对角线
                    this._groundRowCount = diagonal / this._groundOverlapping;
                }
                return _super.prototype.onReset.call(this, camera);
            };
            /**设置素材显示数量*/
            WeatherClouds.prototype.setTextureLens = function () {
                this._lens[0] = MathU.parseInt((this._canvasWidth / this._groundSpacing) * this._groundRowCount * this._density);
                this._lens[1] = this._lens[0];
                this._lens[2] = 1;
                this._lens[3] = 1;
                return this._lens[0] + this._lens[1] + this._lens[2] + this._lens[3];
            };
            /**获取素材初始信息:x,y,scale,alpha,rnd*/
            WeatherClouds.prototype.getInitInfo = function (camera, idxT, idxC) {
                var offsetRow = (idxT == 0) ? 0 : (this._groundSpacing / 2 + 300);
                var x, y, rand;
                if (idxT == 0 || idxT == 1) {
                    var distance = MathU.parseInt(idxC % this._groundRowCount) * this._groundOverlapping; //距离
                    x = distance * Math.cos(this._windDirection);
                    y = distance * Math.sin(this._windDirection);
                    x += MathU.parseInt(idxC / this._groundRowCount) * this._groundSpacing + offsetRow; //x偏移量
                    rand = 2 + Math.random() * 0.5; //随机尺寸
                }
                else {
                    x = MathU.randomRange(-200, camera.bufferWidth);
                    y = -200;
                    rand = 3;
                }
                return [camera.bufferLeft + x, camera.bufferTop + y, 1, this._fadeOutAlpha * 0.999, rand];
            };
            WeatherClouds.prototype.setQuadStartPos = function (quadID, x, y, rnd, disance) {
                if (disance === void 0) { disance = 0; }
                var vec = this._startPosVector;
                vec[quadID * 4] = x;
                vec[quadID * 4 + 1] = y;
                vec[quadID * 4 + 2] = rnd;
                vec[quadID * 4 + 3] = disance;
            };
            WeatherClouds.prototype.onUpdate = function (scene, g) {
                if (!this.isEnable) {
                    return;
                }
                var camera = scene.camera;
                //得出持续时间
                var durationMS = Laya.timer.currTimer - this._startTime;
                var breadthTime = durationMS / 1000;
                //位置起点
                var quadID = 0;
                //初始化
                for (var imgId = 0; imgId < this._lens.length; imgId++) {
                    //选择贴图
                    var texture = this.TEXTURES_SETTING[imgId];
                    //移动量
                    var moveY = this.SPEED_SETTING[imgId] * durationMS;
                    var moveX = moveY * -.8;
                    //数量
                    var count = this._lens[imgId];
                    for (var i = 0; i < count; i++) {
                        //速度
                        var rnd = this.getQuadRnd(quadID);
                        //震幅
                        var breadth = Math.cos(breadthTime * rnd) * 10;
                        var newX = this.getQuadStartX(quadID) - camera.bufferLeft + moveX + breadth;
                        var newY = this.getQuadStartY(quadID) - camera.bufferTop + moveY;
                        //循环的作用
                        newX %= camera.bufferWidth + texture.width;
                        newY %= camera.bufferHeight + texture.height;
                        if (newX < 0)
                            newX = camera.bufferWidth + newX;
                        if (newY < 0)
                            newY = camera.bufferHeight + newY;
                        //设置新位置,绘制点
                        g.drawTexture(texture, newX - texture.height, newY - texture.height);
                        quadID++;
                    }
                }
            };
            WeatherClouds.prototype.clear = function () {
                this._assetsLoader.clear();
                _super.prototype.clear.call(this);
            };
            return WeatherClouds;
        }(scene_1.WeatherBase));
        scene_1.WeatherClouds = WeatherClouds;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=WeatherClouds.js.map