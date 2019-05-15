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
* 灯光
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var LightBase = /** @class */ (function () {
            function LightBase(app) {
                //是否启用
                this._isEnable = false;
                this._app = app;
            }
            /**
             * 启用
             */
            LightBase.prototype.enable = function () {
                this._isEnable = true;
            };
            /**
             *  禁用
             */
            LightBase.prototype.disable = function () {
                this._isEnable = false;
            };
            LightBase.prototype.clear = function () {
                this.disable();
                if (this._assetsLoader) {
                    this._assetsLoader.clear(true);
                    this._assetsLoader = null;
                }
            };
            LightBase.prototype.onResComplete = function () {
            };
            /**
             * 心跳
             */
            LightBase.prototype.onDraw = function (camera, g) {
                //没添加到显示列表，则退出
                if (!this._isEnable) {
                    return;
                }
                if (!camera.bufferWidth || !camera.bufferHeight)
                    return;
                this.onUpdate(camera, g);
            };
            /**
             * 开始更新
             */
            LightBase.prototype.onUpdate = function (camera, g) {
                logd("WeatherBase.onUpdate 没有被子类覆盖");
            };
            return LightBase;
        }());
        scene.LightBase = LightBase;
        // 蜡烛
        var LightCandle = /** @class */ (function (_super) {
            __extends(LightCandle, _super);
            function LightCandle(app) {
                var _this = _super.call(this, app) || this;
                _this._matrix = new Matrix();
                _this._scale = 0;
                _this._scaleAdd = 0;
                _this._black = "#000000";
                var assets = ["scene/light/light_lz1.png", "scene/light/light_lz2.png"];
                _this._assetsLoader = new AssetsLoader();
                _this._assetsLoader.load(assets, Handler.create(_this, _this.onResComplete));
                return _this;
            }
            LightCandle.prototype.onResComplete = function () {
                //贴图集
                this._textTures = new Array(1);
                var textTure = Laya.loader.getRes("scene/light/light_lz1.png");
                this._textTures[0] = Texture.createFromTexture(textTure, 1, 1, textTure.width - 2, textTure.height - 2);
                textTure = Laya.loader.getRes("scene/light/light_lz2.png");
                this._textTures[1] = Texture.createFromTexture(textTure, 1, 1, textTure.width - 2, textTure.height - 2);
                _super.prototype.enable.call(this);
            };
            LightCandle.prototype.onUpdate = function (camera, g) {
                this._scale += this._scaleAdd;
                if (!this._scale) {
                    this._scale = 1.3;
                }
                else if (this._scale > 1.5) {
                    this._scaleAdd = -0.005;
                }
                else if (!this._scaleAdd || this._scale < 1.3) {
                    this._scaleAdd = 0.005;
                }
                var texture = this._textTures[0];
                var unit = this._app.sceneObjectMgr.mainUnit;
                var pos = unit.pos;
                var offsetY = 0;
                if (unit.userData instanceof scene.AvatarBase) {
                    offsetY = -unit.userData.headHeight / 2;
                }
                var parseInt = MathU.parseInt;
                var drawW = parseInt(texture.width * this._scale);
                var drawH = parseInt(texture.sourceHeight * this._scale);
                var drawX = parseInt(camera.getScenePxByCellX(pos.x) - drawW / 2);
                var drawY = parseInt(camera.getScenePxByCellY(pos.y) - drawH / 2 + offsetY);
                var alpha = 0.5;
                g.drawTexture(texture, drawX, drawY, drawW, drawH, null, alpha);
                texture = this._textTures[1];
                g.drawTexture(texture, 0, 0, camera.width, drawY, null, alpha);
                g.drawTexture(texture, 0, drawY + drawH, camera.width, camera.height - drawY - drawH, null, alpha);
                g.drawTexture(texture, 0, drawY, drawX, drawH, null, alpha);
                g.drawTexture(texture, drawX + drawW, drawY, camera.width - drawX - drawW, drawH, null, alpha);
            };
            return LightCandle;
        }(LightBase));
        scene.LightCandle = LightCandle;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=Light.js.map