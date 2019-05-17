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
* 序列帧特效
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var EffectFrame = /** @class */ (function (_super) {
            __extends(EffectFrame, _super);
            function EffectFrame() {
                var _this = _super.call(this) || this;
                _this.poolName = 'EffectFrame';
                _this._total = 0;
                _this._assetsLoader = new AssetsLoader();
                _this.setAssetPath(PathConst.scene_sf);
                return _this;
            }
            /**
             * 进池 （相当于对象dispose函数）
             */
            EffectFrame.prototype.intoPool = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                this.reset();
            };
            /**
             * 出池 （相当于对象初始化函数）
             */
            EffectFrame.prototype.outPool = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                this.setAssetPath(PathConst.scene_sf);
                this._total = arg[0];
                this._fps = arg[1];
                this.setFps(this._fps);
            };
            EffectFrame.prototype.setAssetPath = function (value) {
                this._assetPath = value;
            };
            // 设置数据
            EffectFrame.prototype.setData = function (data, fps, dataFix, start) {
                if (fps === void 0) { fps = 12; }
                if (dataFix === void 0) { dataFix = ""; }
                if (start === void 0) { start = 10000; }
                _super.prototype.setData.call(this, data, fps);
                this._assetsLoader.load(['res/atlas/' + this._assetPath + data + '.atlas'], Handler.create(this, this.onAssetsLoaded, [data, dataFix, start]));
            };
            EffectFrame.prototype.onAssetsLoaded = function (data, dataFix, start) {
                if (dataFix === void 0) { dataFix = ""; }
                if (start === void 0) { start = 10000; }
                this.setFrames(this._assetPath + data + '/' + dataFix + "{0}.png", start);
            };
            EffectFrame.prototype.setFrames = function (img, start) {
                if (start === void 0) { start = 0; }
                var frames = PathConst.getSeqFrames(img, this._total, start);
                var empty = true;
                this._textures = [];
                for (var i = 0; i < frames.length; i++) {
                    var texture = Loader.getRes(frames[i]);
                    if (texture) {
                        empty = false;
                        if (!this.centrePoint) {
                            // 没有设置中心点的话默认首张图的中心点为特效中心点
                            this.centrePoint = new Vector2();
                            this.centrePoint.x = -texture.sourceWidth / 2;
                            this.centrePoint.y = -texture.sourceHeight / 2;
                        }
                    }
                    this._textures.push(Loader.getRes(frames[i]));
                }
                if (empty) {
                    this.isPlayEnd = true;
                }
                else {
                    this._frameCount = this._textures.length;
                    this._duration = this._frameCount * this._frameTime;
                }
            };
            EffectFrame.prototype.updateTexture = function () {
                var currTimer = Laya.timer.currTimer;
                if (this._startTime > currTimer) {
                    return;
                }
                if (!this._textures) {
                    // 没有数据
                    return;
                }
                _super.prototype.updateTexture.call(this);
                if (this.isPlayEnd) {
                    return;
                }
                this._texture = this._textures[this._curFrameIndex];
                var point;
                this._centrePoints && (point = this._centrePoints[this._curFrameIndex]);
                if (point) {
                    this._regX = point.x;
                    this._regY = point.y;
                }
                else {
                    this._regX = this.centrePoint.x;
                    this._regY = this.centrePoint.y;
                }
            };
            // 更新变换信息
            EffectFrame.prototype.updateTransform = function (camera) {
                _super.prototype.updateTransform.call(this, camera);
                if (this._scale == 1) {
                    this._drawX += this._regX;
                    this._drawY += this._regY;
                }
                else {
                    this._drawW = this._drawW * this._scale;
                    this._drawH = this._drawH * this._scale;
                    this._drawX += this._regX * this._scale;
                    this._drawY += this._regY * this._scale;
                }
            };
            // 绘制
            EffectFrame.prototype.onDraw = function (g, camera) {
                if (!this._texture || this._startTime > Laya.timer.currTimer) {
                    return;
                }
                this.updateTransform(camera);
                g.drawTexture(this._texture, this._drawX, this._drawY, this._drawW, this._drawH, this._drawMix);
                this._texture = null;
                this._drawMix = null;
            };
            EffectFrame.prototype.reset = function () {
                this._textures = null;
                this._centrePoints = null;
                this.centrePoint = null;
                this._total = 0;
                this._assetsLoader && this._assetsLoader.clear();
                _super.prototype.reset.call(this);
            };
            return EffectFrame;
        }(scene.Effect));
        scene.EffectFrame = EffectFrame;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=EffectFrame.js.map