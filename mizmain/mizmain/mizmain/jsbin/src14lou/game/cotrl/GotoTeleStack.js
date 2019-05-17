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
* 走到传送点 传送栈
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var GotoTeleStack = /** @class */ (function (_super) {
            __extends(GotoTeleStack, _super);
            function GotoTeleStack(app, srcX, srcY, toMapid, toX, toY, showTip) {
                var _this = _super.call(this, app) || this;
                /*目的地地图id*/
                _this._toMapid = 0;
                _this._toX = 0;
                _this._toY = 0;
                _this._srcX = 0;
                _this._srcY = 0;
                _this._nextUpdateTime = 0;
                _this._showTip = false;
                _this._srcX = srcX;
                _this._srcY = srcY;
                _this._toMapid = toMapid;
                _this._toX = toX;
                _this._toY = toY;
                _this._showTip = showTip;
                return _this;
            }
            GotoTeleStack.prototype.initialize = function () {
                if (!_super.prototype.initialize.call(this)) {
                    return false;
                }
                var mUnit = this._sceneObjectMgr.mainUnit;
                if (!mUnit || mUnit.isDied || this._controller.isTeleporting || this._toMapid <= 0) {
                    return false;
                }
                return true;
            };
            GotoTeleStack.prototype.update = function (diff) {
                //释放了 退出栈
                if (_super.prototype.update.call(this, diff)) {
                    return true;
                }
                var cur_time = Laya.timer.currTimer;
                if (this._nextUpdateTime > 0 && this._nextUpdateTime > cur_time)
                    return false;
                this._nextUpdateTime = cur_time + 100;
                var mUnit = this._sceneObjectMgr.mainUnit;
                //自己挂了 退出栈
                if (!mUnit || mUnit.isDied) {
                    return true;
                }
                var mpMapid = mUnit.mapid;
                var mpx = mUnit.pos.x;
                var mpy = mUnit.pos.y;
                //已经到这张图了
                if (mpMapid == this._toMapid)
                    return true;
                //先走到传送点
                var dis = MathU.getDistance(mpx, mpy, this._srcX, this._srcY);
                if (dis > 2) {
                    this.stack(this._controller, new cotrl.GotoDstStack(this._app, this._srcX, this._srcY, 2));
                    return false;
                }
                var gotoPar = "";
                //走到了 发起传送
                this._controller.sendTeleport(this._toMapid, this._toX, this._toY, this._showTip, true, false);
                return true;
            };
            return GotoTeleStack;
        }(cotrl.BaseStack));
        cotrl.GotoTeleStack = GotoTeleStack;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=GotoTeleStack.js.map