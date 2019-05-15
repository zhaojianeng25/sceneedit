/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene_1) {
        var WeatherBase = /** @class */ (function () {
            function WeatherBase(app) {
                //重置标记
                this._snowResetFlag = false;
                //是否启用
                this.isEnable = false;
                this._app = app;
            }
            WeatherBase.prototype.setQuadStartPos = function (quadID, x, y, rnd, disance) {
                if (disance === void 0) { disance = 0; }
                var vec = this._startPosVector;
                vec[quadID * 4] = x;
                vec[quadID * 4 + 1] = y;
                vec[quadID * 4 + 2] = rnd;
                vec[quadID * 4 + 3] = disance;
            };
            WeatherBase.prototype.setQuadStartPos2 = function (quadID, x, y) {
                var vec = this._startPosVector;
                vec[quadID * 4] = x;
                vec[quadID * 4 + 1] = y;
            };
            WeatherBase.prototype.getQuadStartX = function (quadID) {
                return this._startPosVector[quadID * 4];
            };
            WeatherBase.prototype.getQuadStartY = function (quadID) {
                return this._startPosVector[quadID * 4 + 1];
            };
            WeatherBase.prototype.getQuadRnd = function (quadID) {
                return this._startPosVector[quadID * 4 + 2];
            };
            WeatherBase.prototype.getQuadDisance = function (quadID) {
                return this._startPosVector[quadID * 4 + 3];
            };
            WeatherBase.prototype.onResComplete = function () {
            };
            /**
             * 启用天气
             *
             */
            WeatherBase.prototype.enable = function () {
                this.isEnable = true;
                //立刻重置
                this._snowResetFlag = true;
            };
            /**
             *  禁用天气
             *
             */
            WeatherBase.prototype.disable = function () {
                this.isEnable = false;
                //不再重置
                this._snowResetFlag = false;
            };
            WeatherBase.prototype.clear = function () {
                this.disable();
                if (this._assetsLoader) {
                    this._assetsLoader.clear(true);
                    this._assetsLoader = null;
                }
            };
            /**
             * 重置天气
             * @return 重置是否成功
             *
             */
            WeatherBase.prototype.onReset = function (camera) {
                //如果地图不存在，则退出初始化
                if (!this.TEXTURES_SETTING || !this.TEXTURES_SETTING[0])
                    return false;
                //可以重置咯
                this._snowResetFlag = false;
                //设置起始时间
                this._startTime = Laya.timer.currTimer;
                //摄像机
                //根据屏幕面积来设定雪花比率
                this._density = (camera.bufferWidth * camera.bufferHeight) / (1920 * 1080);
                //总数
                var makeCount = this.setTextureLens(camera);
                //位置数组
                this._startPosVector = new Array(makeCount * 4);
                //位置起点
                var quadID = 0;
                //初始化
                for (var imgId = 0; imgId < this.TEXTURES_SETTING.length; imgId++) {
                    //数量
                    var count = this._lens[imgId];
                    for (var i = 0; i < count; i++) {
                        var info = this.getInitInfo(camera, imgId, i);
                        //保存起始位置
                        this.setQuadStartPos(quadID, info[0], info[1], info[4]);
                        quadID++;
                    }
                }
                // logd("[WeatherLayer] 重置，粒子数量:", makeCount, "远中近分别：", this._lens);
                return true;
            };
            /**设置素材显示数量*/
            WeatherBase.prototype.setTextureLens = function (camera) {
                var makeCount = 0;
                for (var j = 0; j < this.LEN_SETTING.length; j++) {
                    //根据屏幕面积密度新设置数量
                    this._lens[j] = MathU.parseInt(this.LEN_SETTING[j] * this._density);
                    //累计数量
                    makeCount += this._lens[j];
                }
                return makeCount;
            };
            /**获取素材初始信息:x,y,scale,alpha,rnd*/
            WeatherBase.prototype.getInitInfo = function (camera, idxT, idxC) {
                var newX = MathU.randomRange(camera.bufferLeft, camera.bufferRight);
                var newY = MathU.randomRange(camera.bufferTop, camera.bufferBottom);
                return [newX, newY, 1, 1, Math.random()];
            };
            /**
             * 心跳
             *
             */
            WeatherBase.prototype.onDraw = function (scene, g) {
                if (!this.isEnable) {
                    return;
                }
                var camera = scene.camera;
                //没添加到显示列表，则退出
                if (!camera.bufferWidth || !camera.bufferHeight || isNaN(camera.bufferTop)
                    || isNaN(camera.bufferBottom) || isNaN(camera.bufferLeft) || isNaN(camera.bufferRight))
                    return;
                //有重置标记
                if (this._snowResetFlag || (!WeatherBase.LOCK_RESET && camera.isResize)) {
                    //初始化不成功则退出
                    if (!this.onReset(camera))
                        return;
                }
                this.onUpdate(scene, g);
            };
            /**
             * 开始更新
             *
             */
            WeatherBase.prototype.onUpdate = function (scene, g) {
                logd("WeatherBase.onUpdate 没有被子类覆盖");
            };
            WeatherBase.LOCK_RESET = false;
            return WeatherBase;
        }());
        scene_1.WeatherBase = WeatherBase;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=WeatherBase.js.map