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
* 骨骼动画特效层
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var EffectSKLayer = /** @class */ (function (_super) {
            __extends(EffectSKLayer, _super);
            function EffectSKLayer() {
                return _super.call(this) || this;
            }
            EffectSKLayer.prototype.addEffect = function (e) {
                _super.prototype.addEffect.call(this, e);
                if (e instanceof scene.EffectSkeleton) {
                    e.build();
                    e.parent = this;
                }
            };
            EffectSKLayer.prototype.removeEffect = function (e) {
                if (e instanceof scene.EffectSkeleton) {
                    e.parent = null;
                }
                _super.prototype.removeEffect.call(this, e);
            };
            EffectSKLayer.prototype.onDraw = function (camera) {
                // 绘制每一个特效
                this._dels.length = 0;
                for (var i = 0; i < this._effects.length; i++) {
                    var effect = this._effects[i];
                    if (effect.isPlayEnd) {
                        this._dels.push(effect);
                        continue;
                    }
                    effect.onDraw(this.graphics, camera);
                }
                this.clerDels();
            };
            return EffectSKLayer;
        }(scene.EffectLayer));
        scene.EffectSKLayer = EffectSKLayer;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=EffectSKLayer.js.map