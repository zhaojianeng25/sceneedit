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
* Avatar特效
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var EffectAvatar = /** @class */ (function (_super) {
            __extends(EffectAvatar, _super);
            function EffectAvatar() {
                var _this = _super.call(this) || this;
                _this.poolName = "EffectAvatar";
                return _this;
            }
            EffectAvatar.prototype.drawCalculate = function () {
                _super.prototype.drawCalculate.call(this);
                if (this._isInited) {
                    this._frameCount = this._item.getFrameLength(this._action, this._drawDirect);
                    if (!this._frameCount && this._toward != Direct.BOTTOM) {
                        // 如果这个方向没有数据的话就取下方向的数据进行绘制
                        var params = scene.AvatarData.IMAGE_TABLE[Direct.BOTTOM];
                        this._drawDirect = params[0];
                        this._frameCount = this._item.getFrameLength(this._action, this._drawDirect);
                    }
                    this._duration = this._frameCount * this._frameTime;
                }
            };
            EffectAvatar.prototype.updateTexture = function () {
                //如果还没初始化，说明素材还未下载
                if (!this._isInited) {
                    if (!this._item || this._item.isError || !this._item.isLoaded) {
                        return;
                    }
                    this._isInited = true;
                    this.drawCalculate();
                }
                //hold素材，不要被释放
                var currTimer = Laya.timer.currTimer;
                if (this._startTime > currTimer) {
                    return;
                }
                _super.prototype.updateTexture.call(this);
                if (this.isPlayEnd) {
                    return;
                }
                //帧位置
                var fd_address = scene.AvatarItem.getFrameDataAddress(this._action, this._drawDirect, this._curFrameIndex);
                this._texture = this._item.getBitmapData(fd_address);
                if (this._texture) {
                    this._regX = this._item.getFrameRegX(fd_address);
                    this._regY = this._item.getFrameRegY(fd_address);
                }
            };
            // 更新变换信息
            EffectAvatar.prototype.updateTransform = function (camera) {
                _super.prototype.updateTransform.call(this, camera);
                if (this.offSet && this.offSet.length >= 16) {
                    var toward_idx = this._toward * 2;
                    this._drawX += this.offSet[toward_idx];
                    this._drawY += this.offSet[toward_idx + 1];
                }
                //舞台绘制
                if (this._drawHorizonal) {
                    var mix = this._tempMix;
                    mix.identity();
                    mix.a = -1;
                    if (this._scale == 1) {
                        mix.tx = this._drawX * 2 - this._regX;
                        mix.ty = this._regY;
                    }
                    else {
                        this._drawW = this._drawW * this._scale;
                        this._drawH = this._drawH * this._scale;
                        mix.tx = this._drawX * 2 - this._regX * this._scale;
                        mix.ty = this._regY * this._scale;
                    }
                    this._drawMix = mix;
                }
                else {
                    if (this._scale == 1) {
                        this._drawX += this._regX;
                        this._drawY += this._regY;
                    }
                    else {
                        this._drawW = this._drawW * this._scale;
                        this._drawH = this._drawH * this._scale;
                        this._drawX = this._drawX + this._regX * this._scale;
                        this._drawY = this._drawY + this._regY * this._scale;
                    }
                    this._drawMix = null;
                }
            };
            /**
             * 进池 （相当于对象dispose函数）
             */
            EffectAvatar.prototype.intoPool = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                this.reset();
            };
            /**
             * 出池 （相当于对象初始化函数）
             */
            EffectAvatar.prototype.outPool = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
            };
            EffectAvatar.prototype.setData = function (name, fps) {
                if (fps === void 0) { fps = 12; }
                _super.prototype.setData.call(this, name, fps);
                if (this._item) {
                    if (this._item.itemName == name) {
                        return;
                    }
                    this._item.release();
                    this._item = null;
                }
                this._item = scene.AvatarItem.Get(name);
                this._item && this._item.retain();
            };
            // 释放 
            EffectAvatar.prototype.reset = function () {
                this._isInited = false;
                if (this._item) {
                    this._item.release();
                    this._item = null;
                }
                this.offSet = null;
                this._action = 0;
                _super.prototype.reset.call(this);
            };
            return EffectAvatar;
        }(scene.Effect));
        scene.EffectAvatar = EffectAvatar;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=EffectAvatar.js.map