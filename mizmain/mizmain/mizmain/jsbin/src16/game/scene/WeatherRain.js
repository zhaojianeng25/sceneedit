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
        var WeatherRain = /** @class */ (function (_super) {
            __extends(WeatherRain, _super);
            function WeatherRain(app) {
                var _this = _super.call(this, app) || this;
                _this._assetsLoader = new AssetsLoader();
                _this._assetsLoader.load([game.Path.atlas_scene + "weather/rain.atlas"], Handler.create(_this, _this.onResComplete));
                return _this;
            }
            WeatherRain.prototype.onResComplete = function () {
                //雪素材
                this.TEXTURES_SETTING = new Array(4);
                this.TEXTURES_SETTING[0] = Laya.loader.getRes("scene/weather/rain/rain_far.png"); //远
                this.TEXTURES_SETTING[1] = Laya.loader.getRes("scene/weather/rain/rain_mid.png"); //中
                this.TEXTURES_SETTING[2] = Laya.loader.getRes("scene/weather/rain/rain_mid2.png"); //中2
                this.TEXTURES_SETTING[3] = Laya.loader.getRes("scene/weather/rain/rain_nearly.png"); //近
                //远景，中景，近景, 水滴数量定义
                this.LEN_SETTING = new Array(this.TEXTURES_SETTING.length);
                this.LEN_SETTING[0] = 100;
                this.LEN_SETTING[1] = 30;
                this.LEN_SETTING[2] = 70;
                this.LEN_SETTING[3] = 10;
                //远景，中景，近景速度定义
                this.SPEED_SETTING = new Array(this.TEXTURES_SETTING.length);
                this.SPEED_SETTING[0] = 0.5;
                this.SPEED_SETTING[1] = 0.7;
                this.SPEED_SETTING[2] = 0.9;
                this.SPEED_SETTING[3] = 0.32;
                //设置
                this._lens = this.LEN_SETTING.concat();
                this.enable();
                this.setNextThunderTime();
            };
            WeatherRain.prototype.enable = function () {
                _super.prototype.enable.call(this);
                //开始播放下雨
                this._app.playSound("sounds/s_rain.mp3", 0);
            };
            WeatherRain.prototype.disable = function () {
                _super.prototype.disable.call(this);
                //开始播放下雨
                this._app.stopSound("sounds/s_rain.mp3");
            };
            WeatherRain.prototype.setNextThunderTime = function () {
                //10秒到40秒
                this._nextThunder = Laya.timer.currTimer + MathU.randomRange(10000, 40000); //(10000, 40000);
                // this._nextThunder = Laya.timer.currTimer + 5000;
            };
            WeatherRain.prototype.onUpdate = function (scene, g) {
                var camera = scene.camera;
                //得出持续时间
                var durationMS = Laya.timer.currTimer - this._startTime;
                var cam = camera;
                //位置起点
                var quadID = 0;
                //循环4层雨滴
                for (var imgId = 0; imgId < this.TEXTURES_SETTING.length; imgId++) {
                    //选择贴图
                    var texture = this.TEXTURES_SETTING[imgId];
                    //移动量
                    var moveY = this.SPEED_SETTING[imgId] * durationMS;
                    //数量
                    var count = this._lens[imgId];
                    for (var i = 0; i < count; i++) {
                        var newX = this.getQuadStartX(quadID) - cam.bufferLeft;
                        var newY = this.getQuadStartY(quadID) - cam.bufferTop + moveY;
                        //循环的作用
                        newX %= cam.bufferWidth;
                        newY %= cam.bufferHeight;
                        if (newX < 0)
                            newX = cam.bufferWidth + newX;
                        //设置新位置
                        g.drawTexture(texture, newX, newY);
                        quadID++;
                    }
                }
                // 地面的雨滴效果
                // this.createRainOfLand(scene, camera);
                if (Laya.timer.currTimer > this._nextThunder) {
                    //随机打雷
                    this.setNextThunderTime();
                    scene.thunder();
                }
            };
            WeatherRain.prototype.createRainOfLand = function (scene, camera) {
                var effect = ObjectPools.malloc(scene_1.EffectFrame, null, 8, 12);
                effect.setFrames("scene/weather/rain/rain_l{0}.png", 1);
                var x = camera.logicLeft + Math.random() * (camera.logicRight - camera.logicLeft);
                var y = camera.logicTop + Math.random() * (camera.logicBottom - camera.logicTop);
                effect.anchorPostion = new Vector2(x, y);
                effect.scale = Math.random() * .4 + .6;
                effect.atBottom = true;
                scene.addEffect(effect);
                // //特效测试
                // if(this.a < 200){
                // 	this.a ++;
                // 	let effect1 = ObjectPools.malloc(EffectSkeleton) as EffectSkeleton;
                // 	effect1.setLoop(true);
                // 	effect1.setData("scene/sk/shengji");
                // 	let x = camera.logicLeft + Math.random() * (camera.logicRight - camera.logicLeft);
                // 	let y = camera.logicTop + Math.random() * (camera.logicBottom - camera.logicTop);
                // 	effect1.anchorPostion = new Vector2(x, y);
                // 	// effect1.anchorObject = scene.app.sceneObjectMgr.mainUnit;
                // 	// effect1.atBottom = true;
                // 	scene.addEffect(effect1);
                // }
            };
            return WeatherRain;
        }(scene_1.WeatherBase));
        scene_1.WeatherRain = WeatherRain;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=WeatherRain.js.map