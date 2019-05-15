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
        var EffectLayer = /** @class */ (function (_super) {
            __extends(EffectLayer, _super);
            function EffectLayer() {
                var _this = _super.call(this) || this;
                _this._effects = new Array();
                _this._dels = new Array();
                // 最大数量
                _this._maxCount = -1;
                return _this;
            }
            Object.defineProperty(EffectLayer.prototype, "maxCount", {
                get: function () {
                    return this._maxCount;
                },
                set: function (v) {
                    this._maxCount = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EffectLayer.prototype, "isFull", {
                get: function () {
                    return this._maxCount != -1 && this._maxCount <= this._effects.length;
                },
                enumerable: true,
                configurable: true
            });
            EffectLayer.prototype.addEffect = function (e) {
                this._effects.push(e);
            };
            EffectLayer.prototype.removeEffect = function (e) {
                var idx = this._effects.indexOf(e);
                if (idx >= 0) {
                    this._effects.splice(idx, 1);
                }
                var obj = e;
                if (obj["intoPool"]) {
                    ObjectPools.free(obj);
                }
            };
            EffectLayer.prototype.clerDels = function () {
                for (var i = 0; i < this._dels.length; i++) {
                    this.removeEffect(this._dels[i]);
                }
                this._dels.length = 0;
            };
            EffectLayer.prototype.onDraw = function (camera) {
                // 绘制每一个特效
                this._dels.length = 0;
                for (var i = 0; i < this._effects.length; i++) {
                    var effect = this._effects[i];
                    if (effect.isPlayEnd) {
                        this._dels.push(effect);
                        continue;
                    }
                    effect.updateTexture();
                }
                this.clerDels();
                //性能优化：减少批次渲染
                this._effects.sort(this.effectRootTextureID_Cmp);
                //清理绘制
                this.graphics.clear();
                //绘制每一个特效
                for (var i = 0; i < this._effects.length; i++) {
                    var effect = this._effects[i];
                    effect.onDraw(this.graphics, camera);
                }
            };
            /*深度比较排序*/
            EffectLayer.prototype.effectRootTextureID_Cmp = function (a, b) {
                return b.__ROOT_ID - a.__ROOT_ID;
            };
            return EffectLayer;
        }(Laya.Sprite));
        scene.EffectLayer = EffectLayer;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=EffectLayer.js.map