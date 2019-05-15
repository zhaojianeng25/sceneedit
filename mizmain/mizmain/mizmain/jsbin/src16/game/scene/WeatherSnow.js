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
    (function (scene_1) {
        var WeatherSnow = /** @class */ (function (_super) {
            __extends(WeatherSnow, _super);
            function WeatherSnow(app) {
                var _this = _super.call(this, app) || this;
                _this._assetsLoader = new AssetsLoader();
                _this._assetsLoader.load([game.Path.atlas_scene + "weather/snow.atlas"], Handler.create(_this, _this.onResComplete));
                return _this;
            }
            WeatherSnow.prototype.onResComplete = function () {
                //贴图集
                //雪素材
                this.TEXTURES_SETTING = new Array(4);
                this.TEXTURES_SETTING[0] = Laya.loader.getRes("scene/weather/snow/snow_far.png"); //远
                this.TEXTURES_SETTING[1] = Laya.loader.getRes("scene/weather/snow/snow_far2.png"); //远2
                this.TEXTURES_SETTING[2] = Laya.loader.getRes("scene/weather/snow/snow_mid.png"); //中
                this.TEXTURES_SETTING[3] = Laya.loader.getRes("scene/weather/snow/snow_nearly.png"); //近
                //远景，中景，近景数量定义
                this.LEN_SETTING = new Array(this.TEXTURES_SETTING.length);
                this.LEN_SETTING[0] = 100;
                this.LEN_SETTING[1] = 100;
                this.LEN_SETTING[2] = 80;
                this.LEN_SETTING[3] = 10;
                //远景，中景，近景速度定义
                this.SPEED_SETTING = new Array(this.TEXTURES_SETTING.length);
                this.SPEED_SETTING[0] = 0.08;
                this.SPEED_SETTING[1] = 0.16;
                this.SPEED_SETTING[2] = 0.24;
                this.SPEED_SETTING[3] = 0.32;
                //设置
                this._lens = this.LEN_SETTING.concat();
                this.enable();
            };
            WeatherSnow.prototype.enable = function () {
                _super.prototype.enable.call(this);
                //开始播放下雨
                this._app.playMusic("sounds/s_snow.mp3", 0);
            };
            WeatherSnow.prototype.disable = function () {
                _super.prototype.disable.call(this);
                //开始播放下雨
                this._app.stopMusic();
            };
            WeatherSnow.prototype.onUpdate = function (scene, g) {
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
                    var moveX = moveY * .4;
                    //数量
                    var count = this._lens[imgId];
                    for (var i = 0; i < count; i++) {
                        //速度
                        var rnd = this.getQuadRnd(quadID);
                        //震幅
                        var breadth = Math.cos(breadthTime * rnd) * 80;
                        var newX = this.getQuadStartX(quadID) - camera.bufferLeft + moveX + breadth;
                        var newY = this.getQuadStartY(quadID) - camera.bufferTop + moveY;
                        //循环的作用
                        newX %= camera.bufferWidth;
                        newY %= camera.bufferHeight;
                        if (newX < 0)
                            newX = camera.bufferWidth + newX;
                        //设置新位置,绘制点
                        g.drawTexture(texture, newX, newY);
                        quadID++;
                    }
                }
            };
            return WeatherSnow;
        }(scene_1.WeatherBase));
        scene_1.WeatherSnow = WeatherSnow;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=WeatherSnow.js.map