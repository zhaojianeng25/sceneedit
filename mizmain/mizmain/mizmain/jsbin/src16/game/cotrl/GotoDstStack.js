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
* 直线行走行为栈
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var GotoDstStack = /** @class */ (function (_super) {
            __extends(GotoDstStack, _super);
            function GotoDstStack(app, dstX, dstY, distance) {
                var _this = _super.call(this, app, dstX, dstY, distance) || this;
                _this._hasSend = true;
                _this._prevX = 0;
                _this._prevY = 0;
                _this._stopTimer = 0;
                return _this;
            }
            /**
             * 执行并返回子类是否有继续执行的必要
             *
             */
            GotoDstStack.prototype.initialize = function () {
                if (!_super.prototype.initialize.call(this)) {
                    return false;
                }
                this._hasSend = true;
                return true;
            };
            GotoDstStack.prototype.update = function (diff) {
                if (_super.prototype.update.call(this, diff)) {
                    this._controller.pluginsMgr.lastOptTime = Laya.timer.currTimer;
                    // logd("退出栈GotoLineStack", this._distance);
                    return true;
                }
                //中了技能buff不能动
                if (!this._controller.canMove)
                    return true;
                if (this._controller.moveDelay > 0) {
                    // 移动延迟
                    return true;
                }
                var mUnit = this._sceneObjectMgr.mainUnit;
                if (!mUnit || mUnit.isDied) {
                    return true;
                }
                //非法数据
                if (this._dstX == 0 || this._dstY == 0) {
                    logd("GotoDstStack:非法数据 dstX=", this._dstX, ",dstY=", this._dstY);
                    return true;
                }
                var mpx = mUnit.pos.x;
                var mpy = mUnit.pos.y;
                if (this._hasSend) {
                    //已经在这边了就算了不走了 
                    if (Math.floor(mpx) == Math.floor(this._dstX) && Math.floor(mpy) == Math.floor(this._dstY)) {
                        this._controller.pluginsMgr.lastOptTime = Laya.timer.currTimer;
                        return true;
                    }
                    //如果距离小于0.5 就不进行移动了--很重要，不能改为 == 0，否则会有放技能出现回拉的情况
                    var distance = MathU.getDistance(mpx, mpy, this._dstX, this._dstY);
                    if (distance <= 0.5) {
                        this._controller.pluginsMgr.lastOptTime = Laya.timer.currTimer;
                        return true;
                    }
                    //执行路径
                    this._controller.sendMoveTo(this._dstX, this._dstY);
                    this._hasSend = false;
                }
                else {
                    if (this._prevX == mpx && this._prevY == mpy) {
                        this._stopTimer += diff;
                        if (this._stopTimer > 2000) {
                            this._stopTimer = 0;
                            //需要重新执行路径
                            this._hasSend = true;
                        }
                    }
                    else {
                        this._prevX = mpx;
                        this._prevY = mpy;
                        this._stopTimer = 0;
                    }
                }
                return false;
            };
            return GotoDstStack;
        }(cotrl.BaseMoveStack));
        cotrl.GotoDstStack = GotoDstStack;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=GotoDstStack.js.map