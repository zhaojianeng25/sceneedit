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
* 假的Unit对象
*/
var game;
(function (game) {
    var object;
    (function (object) {
        var FakeUnit = /** @class */ (function (_super) {
            __extends(FakeUnit, _super);
            function FakeUnit() {
                var _this = _super.call(this) || this;
                //是否需要受击特效
                _this.needBeatenEffect = false;
                _this.isNeedDrawView = true;
                _this.isBattleRole = false;
                _this.isSelfRole = false;
                _this.isDieSpecial = false;
                _this.needShowName = false;
                return _this;
            }
            // 去哪儿
            FakeUnit.prototype.goto = function (x, y) {
                this.SetTargetPosX(x);
                this.SetTargetPosY(y);
                if (this.onTargetPosChange)
                    this.onTargetPosChange(this, x, y);
                return true;
            };
            // 武器
            FakeUnit.prototype.SetShowWeapon = function (val) {
                _super.prototype.SetShowWeapon.call(this, val);
                if (this.onAvatarChange)
                    this.onAvatarChange();
            };
            // 衣服
            FakeUnit.prototype.SetShowCoat = function (val) {
                _super.prototype.SetShowCoat.call(this, val);
                if (this.onAvatarChange)
                    this.onAvatarChange();
            };
            Object.defineProperty(FakeUnit, "tempMask", {
                get: function () {
                    if (!this._tempMask) {
                        this._tempMask = new UpdateMask();
                    }
                    return this._tempMask;
                },
                enumerable: true,
                configurable: true
            });
            FakeUnit.prototype.fristUpdate = function () {
                this.onUpdate(core.obj.OBJ_OPT_NEW, FakeUnit.tempMask, FakeUnit.tempMask);
            };
            // 释放
            FakeUnit.prototype.dispose = function () {
                _super.prototype.dispose.call(this);
            };
            return FakeUnit;
        }(object.Unit));
        object.FakeUnit = FakeUnit;
    })(object = game.object || (game.object = {}));
})(game || (game = {}));
//# sourceMappingURL=FakeUnit.js.map