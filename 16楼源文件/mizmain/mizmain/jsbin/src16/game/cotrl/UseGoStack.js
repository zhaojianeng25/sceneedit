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
* 使用游戏对象
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var UseGoStack = /** @class */ (function (_super) {
            __extends(UseGoStack, _super);
            function UseGoStack(app, target, turnToTarget, hasCollecting) {
                if (turnToTarget === void 0) { turnToTarget = true; }
                if (hasCollecting === void 0) { hasCollecting = true; }
                var _this = _super.call(this, app) || this;
                /*传输消耗*/
                _this._consume = 100;
                _this._entry = 0;
                _this._hasCollecting = false;
                _this._mapid = -1;
                _this._targetUnit = target;
                _this._turnToTarget = turnToTarget;
                _this._hasCollecting = hasCollecting;
                return _this;
            }
            UseGoStack.prototype.initialize = function () {
                if (!_super.prototype.initialize.call(this)) {
                    return false;
                }
                var mUnit = this._sceneObjectMgr.mainUnit;
                if (!mUnit || mUnit.isDied) {
                    return false;
                }
                if (!this._targetUnit || !this._targetUnit.isGameObject /*|| !this._target.canUse*/)
                    return false;
                this._mapid = -1;
                this._entry = this._targetUnit.entryid;
                var mpx = mUnit.pos.x;
                var mpy = mUnit.pos.y;
                var tpx = this._targetUnit.pos.x;
                var tpy = this._targetUnit.pos.y;
                //需要读条的 才需要延迟时间
                var delay = this.needDuTiaoTime();
                this._prepareTimeTemp = Laya.timer.currTimer + delay; //读条时间
                //停止移动
                this._controller.sendStopMoving();
                if (this._turnToTarget) {
                    //面对目标
                    mUnit.faceTarget(this._targetUnit);
                }
                return true;
            };
            //读条时间 有时间代表需要读条
            UseGoStack.prototype.needDuTiaoTime = function () {
                return 0;
            };
            /*目标被采集特效&采集进度条*/
            UseGoStack.prototype.collecting = function () {
                this._hasCollecting = false;
                this._prepareTime = this._prepareTimeTemp + this._consume;
                var need_time = this.needDuTiaoTime();
                if (this._prepareTime > 0 && need_time > 0) {
                    this._controller.collecting(cotrl.ACotrller.COLLECT_TYPE_COLLECT, need_time);
                }
            };
            UseGoStack.prototype.update = function (diff) {
                //释放了 退出栈
                if (_super.prototype.update.call(this, diff)) {
                    return true;
                }
                if (!this._targetUnit)
                    return true;
                if (this._cd > diff) {
                    //采集cd中
                    this._cd -= diff;
                    return false;
                }
                this._cd = 200;
                if (this._targetUnit.isDied) {
                    //下一个目标
                    this._controller.exec(new cotrl.FindTouchUnitStack(this._app, this._targetUnit.mapid, this._targetUnit.pos.x, this._targetUnit.pos.y, this._targetUnit.entryid, Unit.TYPE_GAMEOBJECT));
                    //清空
                    this.stack(this._controller, new cotrl.SelectTargetSack(this._app, null));
                    this._targetUnit = null;
                    return true;
                }
                if (this._hasCollecting && this._prepareTimeTemp > 0) {
                    if (this._mapid == -1)
                        this._mapid = this._sceneObjectMgr.mapAssetInfo.id;
                    else {
                        if (this._mapid != this._sceneObjectMgr.mapAssetInfo.id)
                            return true;
                    }
                    this.collecting();
                    return false;
                }
                //读条
                var cur_time = Laya.timer.currTimer;
                if (this._prepareTime > cur_time) {
                    return false;
                }
                return true;
            };
            UseGoStack.prototype.finalize = function () {
                //如果是选中的是本对象
                if (this._targetUnit && this._targetUnit.oid == this._sceneObjectMgr.selectOid) {
                    this._sceneObjectMgr.selectOid = 0;
                }
                _super.prototype.finalize.call(this);
                this._prepareTime = 0;
                this._controller.collectingEnd(cotrl.ACotrller.COLLECT_TYPE_COLLECT);
                this._targetUnit = null;
            };
            return UseGoStack;
        }(cotrl.BaseStack));
        cotrl.UseGoStack = UseGoStack;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=UseGoStack.js.map