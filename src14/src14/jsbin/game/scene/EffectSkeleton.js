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
* 骨骼动画特效（龙骨）
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var EffectSkeleton = /** @class */ (function (_super) {
            __extends(EffectSkeleton, _super);
            function EffectSkeleton() {
                var _this = _super.call(this) || this;
                _this.poolName = "EffectSkeleton";
                return _this;
            }
            /**
             * 进池 （相当于对象dispose函数）
             */
            EffectSkeleton.prototype.intoPool = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                this.reset();
            };
            /**
             * 出池 （相当于对象初始化函数）
             */
            EffectSkeleton.prototype.outPool = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
            };
            Object.defineProperty(EffectSkeleton.prototype, "parent", {
                set: function (v) {
                    this._parent = v;
                    if (this._armature) {
                        this._parent ? this._parent.addChild(this._armature) : this._armature.removeSelf();
                    }
                },
                enumerable: true,
                configurable: true
            });
            // 尽量在设置动画数据时先设置
            EffectSkeleton.prototype.setLoop = function (v) {
                _super.prototype.setLoop.call(this, v);
                if (this._armature) {
                    this._armature.play(0, this._loop);
                }
            };
            // 设置数据 fps动画播放速率1为标准速率
            EffectSkeleton.prototype.setData = function (ani, fps) {
                if (fps === void 0) { fps = 1; }
                _super.prototype.setData.call(this, ani, fps);
            };
            EffectSkeleton.prototype.build = function () {
                if (this._refTemplet) {
                    return;
                }
                this._refTemplet = RefTemplet.Get(this._data);
                this._refTemplet.retain();
                if (this._refTemplet.parseComplete) {
                    Laya.timer.callLater(this, this.buildArmature);
                }
                else {
                    this._refTemplet.on(LEvent.COMPLETE, this, this.buildArmature);
                }
            };
            EffectSkeleton.prototype.buildArmature = function () {
                if (!this._refTemplet) {
                    return;
                }
                this._refTemplet.off(LEvent.COMPLETE, this, this.buildArmature);
                this._armature = this._refTemplet.buildArmature(0);
                this._armature.playbackRate(this._fps);
                this._armature.scale(this._drawHorizonal ? this._scale * -1 : this._scale, this._scale);
                var nameOrIndex;
                if (this._armature.getAnimNum() > 1) {
                    nameOrIndex = EffectSkeleton.ANI_NAMES[this._drawDirect];
                }
                else {
                    nameOrIndex = 0;
                }
                this._armature.play(nameOrIndex, this._loop, false, Laya.timer.currTimer - this._startTime);
                this.parent = this._parent;
            };
            // 绘制
            EffectSkeleton.prototype.onDraw = function (g, camera) {
                if (this.isPlayEnd || !this._armature) {
                    return;
                }
                if (!this._loop && this._armature.player.state == 0) {
                    this.isPlayEnd = true;
                    return;
                }
                this.updateTransform(camera);
                this._armature.x = this._drawX;
                this._armature.y = this._drawY;
            };
            EffectSkeleton.prototype.reset = function () {
                parent = null;
                if (this._refTemplet) {
                    this._refTemplet.off(LEvent.COMPLETE, this, this.buildArmature);
                    this._refTemplet.release();
                    this._refTemplet = null;
                }
                if (this._armature) {
                    this._armature.destroy(true);
                    this._armature = null;
                }
                Laya.timer.clear(this, this.buildArmature);
                _super.prototype.reset.call(this);
            };
            // 方向对应的动作索引
            EffectSkeleton.ANI_NAMES = ["1", "2", "3", "2", "1", "8", "7", "8"];
            return EffectSkeleton;
        }(scene.Effect));
        scene.EffectSkeleton = EffectSkeleton;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=EffectSkeleton.js.map