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
* 选择目标栈
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var SelectTargetSack = /** @class */ (function (_super) {
            __extends(SelectTargetSack, _super);
            function SelectTargetSack(app, target) {
                var _this = _super.call(this, app) || this;
                /*超时时间*/
                _this._timeout = 0;
                _this._target = target;
                return _this;
            }
            SelectTargetSack.prototype.initialize = function () {
                if (!_super.prototype.initialize.call(this)) {
                    return false;
                }
                //选中对象
                if (!this._target) {
                    this._controller.select_target(0);
                    return false;
                }
                this._timeout = 1000;
                var mUnit = this._sceneObjectMgr.mainUnit;
                //传送了 | 自己挂了 退出攻击栈
                if (!mUnit || mUnit.isDied) {
                    return false;
                }
                //gameObj不用选中
                if (this._target.isGameObject)
                    return false;
                this._controller.select_target(this._target.oid);
                return true;
            };
            SelectTargetSack.prototype.update = function (diff) {
                this._timeout -= diff;
                if (!this._target)
                    return true;
                var mUnit = this._sceneObjectMgr.mainUnit;
                //传送了 | 自己挂了 退出攻击栈
                if (!mUnit || mUnit.isDied) {
                    return true;
                }
                var bool = this._sceneObjectMgr.selectOid == this._target.oid;
                return bool || this._timeout <= 0;
            };
            SelectTargetSack.prototype.finalize = function () {
                this._target = null;
                _super.prototype.finalize.call(this);
            };
            return SelectTargetSack;
        }(cotrl.BaseStack));
        cotrl.SelectTargetSack = SelectTargetSack;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=SelectTargetSack.js.map