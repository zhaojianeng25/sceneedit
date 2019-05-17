/**
* 特效基类
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Effect = /** @class */ (function () {
            function Effect() {
                // 每帧时长 (直接固定死)
                this._frameTime = 83;
                // 延迟时间
                this._delayTimer = 0;
                this.anchorPosX = 0;
                this.anchorPosY = 0;
                this._regX = 0;
                this._regY = 0;
                this._scale = 1;
                this._offsetX = 0;
                this._offsetY = 0;
                this._tempMix = new Matrix();
                this.reset();
            }
            Object.defineProperty(Effect.prototype, "__ROOT_ID", {
                //根贴图编码
                get: function () {
                    return this._texture ? this._texture["__ROOT_ID"] : 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Effect.prototype, "toward", {
                get: function () {
                    return this._toward;
                },
                set: function (value) {
                    if (this._toward == value)
                        return;
                    this._toward = value;
                    this.drawCalculate();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Effect.prototype, "delayTimer", {
                set: function (v) {
                    this._delayTimer = v;
                    this._startTime = Laya.timer.currTimer + this._delayTimer;
                },
                enumerable: true,
                configurable: true
            });
            Effect.prototype.setLoop = function (v) {
                this._loop = v;
            };
            Object.defineProperty(Effect.prototype, "data", {
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Effect.prototype, "width", {
                get: function () {
                    return this._drawW;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Effect.prototype, "height", {
                get: function () {
                    return this._drawH;
                },
                enumerable: true,
                configurable: true
            });
            Effect.prototype.drawCalculate = function () {
                //获取绘制相关
                var params = scene.AvatarData.IMAGE_TABLE[this._toward];
                //设置方向
                this._drawDirect = params[0];
                //设置是否镜像
                this._drawHorizonal = params[1];
            };
            Effect.prototype.setData = function (data, fps) {
                if (fps === void 0) { fps = 12; }
                this._data = data;
                this.setFps(fps);
            };
            // 设置数据
            Effect.prototype.setFps = function (v) {
                this._fps = v;
                this._frameTime = Math.floor(1000 / v);
                this._startTime = Laya.timer.currTimer + this._delayTimer;
            };
            Object.defineProperty(Effect.prototype, "scale", {
                set: function (v) {
                    this._scale = v;
                },
                enumerable: true,
                configurable: true
            });
            // 设置偏移
            Effect.prototype.setOffset = function (x, y) {
                this._offsetX = x;
                this._offsetY = y;
            };
            Effect.prototype.updateTexture = function () {
                //hold素材，不要被释放
                var currTimer = Laya.timer.currTimer;
                if (this._startTime > currTimer) {
                    return;
                }
                //判断播放时间是否结束，循环的除外
                if (!this._loop && (currTimer - this._startTime) >= this._duration) {
                    this.isPlayEnd = true;
                    return;
                }
                //获得无限完整动画循环之后剩余的时间
                var totalTime = this._frameTime * this._frameCount;
                var frameYu = (currTimer - this._startTime) % totalTime;
                //定位到帧位置
                this._curFrameIndex = MathU.parseInt(frameYu / this._frameTime);
                if (this._curFrameIndex >= this._frameCount) {
                    this._curFrameIndex = this._frameCount - 1;
                }
            };
            // 更新变换信息
            Effect.prototype.updateTransform = function (camera) {
                var pos;
                var posX, posY;
                if (this.anchorObject) {
                    if (this.anchorObject.userData instanceof scene.AvatarBase) {
                        posX = this.anchorObject.userData.pos.x;
                        posY = this.anchorObject.userData.pos.y;
                    }
                    else {
                        posX = this.anchorObject.pos.x;
                        posY = this.anchorObject.pos.y;
                    }
                }
                else if (this.anchorPostion) {
                    posX = this.anchorPostion.x;
                    posY = this.anchorPostion.y;
                }
                else if (this.anchorPosX > 0 && this.anchorPosY > 0) {
                    posX = this.anchorPosX;
                    posY = this.anchorPosY;
                }
                this._drawX = camera.getScenePxByCellX(posX) + this._offsetX;
                this._drawY = camera.getScenePxByCellY(posY) + this._offsetY;
                if (this._texture) {
                    this._drawW = this._texture.sourceWidth;
                    this._drawH = this._texture.sourceHeight;
                }
            };
            // 绘制
            Effect.prototype.onDraw = function (g, camera) {
                if (!this._texture || this._startTime > Laya.timer.currTimer) {
                    return;
                }
                this.updateTransform(camera);
                g.drawTexture(this._texture, this._drawX, this._drawY, this._drawW, this._drawH, this._drawMix);
                this._texture = null;
                this._drawMix = null;
            };
            // 释放 
            Effect.prototype.reset = function () {
                this.toward = Direct.BOTTOM;
                this.anchorObject = null;
                this.anchorPostion = null;
                this.atBottom = false;
                this._loop = false;
                this.isPlayEnd = false;
                this._duration = 600000;
                this._startTime = 0;
                this._delayTimer = 0;
                this._frameCount = 0;
                this._curFrameIndex = 0;
                this._regX = 0;
                this._regY = 0;
                this._scale = 1;
                this._offsetX = 0;
                this._offsetY = 0;
                this._texture = null;
                this._drawMix = null;
                this._data = null;
            };
            return Effect;
        }());
        scene.Effect = Effect;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=Effect.js.map