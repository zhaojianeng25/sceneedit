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
* 触碰生物对象
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var TouchUnitStack = /** @class */ (function (_super) {
            __extends(TouchUnitStack, _super);
            function TouchUnitStack(app, guid) {
                var _this = _super.call(this, app) || this;
                _this._timeOut = 2000;
                _this._nextUpdatTime = 0;
                _this._touchGuid = guid;
                return _this;
            }
            TouchUnitStack.prototype.initialize = function () {
                if (!_super.prototype.initialize.call(this)) {
                    return false;
                }
                //没有目标
                if (!this._touchGuid || !this._touchGuid.length) {
                    return false;
                }
                var mUnit = this._sceneObjectMgr.mainUnit;
                //传送了 | 自己挂了 退出攻击栈
                if (!mUnit || mUnit.isDied) {
                    return false;
                }
                this._controller.sendStopMoving();
                return true;
            };
            TouchUnitStack.prototype.doReady = function () {
            };
            TouchUnitStack.prototype.update = function (diff) {
                //释放了 退出栈
                if (_super.prototype.update.call(this, diff)) {
                    return true;
                }
                var cur_time = Laya.timer.currTimer;
                if (this._nextUpdatTime > 0 && this._nextUpdatTime > cur_time)
                    return false;
                this._nextUpdatTime = cur_time + 200;
                //找显示对象
                var targetUnit = this._sceneObjectMgr.getUnitByGuid(this._touchGuid);
                if (!targetUnit) {
                    if (this._timeOut > diff) {
                        this._timeOut -= diff;
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                var mUnit = this._sceneObjectMgr.mainUnit;
                //传送了 | 自己挂了 退出攻击栈
                if (!mUnit || mUnit.isDied) {
                    return true;
                }
                //选中对象
                if (!targetUnit.isGameObject && this._sceneObjectMgr.selectOid != targetUnit.oid) {
                    if (!(this._sceneObjectMgr.selectOid == null || this._sceneObjectMgr.selectOid == 0)) {
                        this._controller.stack(new cotrl.SelectTargetSack(this._app, null));
                        return false;
                    }
                    this._controller.stack(new cotrl.SelectTargetSack(this._app, targetUnit));
                    return false;
                }
                var targetEntry = targetUnit.entryid;
                if (targetUnit.isGameObject) {
                    //距离太远
                    var dis_1 = mUnit.Distance(targetUnit);
                    var minDis = TouchUnitStack.COLLECT_DIS_QUEST;
                    if (dis_1 > minDis) {
                        this._controller.setIsAutoMoving(true, dis_1);
                        this._controller.stack(new cotrl.GotoDstStack(this._app, targetUnit.pos.x, targetUnit.pos.y, minDis));
                        return false;
                    }
                    this._controller.stack(new cotrl.UseGoStack(this._app, targetUnit));
                    return true;
                }
                //如果是npc就直接弄npc，如果不是就砍
                else if (targetUnit.isNpc) {
                    //距离太远了，就退出吧。
                    var dis = mUnit.Distance(targetUnit);
                    var need_dis = mUnit.isRiding ? cotrl.FindTouchUnitStack.MAX_NPCTOUCH_MOUNT_DISTANCE : cotrl.FindTouchUnitStack.MAX_NPCTOUCH_DISTANCE;
                    if (Math.floor(dis) > need_dis) {
                        // logd("touch unit stack far:",dis);
                        return true;
                    }
                    //如果还在移动 那就停止
                    if (mUnit.isMoving) {
                        this._controller.sendStopMoving();
                    }
                    //朝向处理下
                    mUnit.faceTarget(targetUnit);
                }
                return true;
            };
            TouchUnitStack.COLLECT_DIS_QUEST = 2;
            TouchUnitStack.COLLECT_DIS_OTHER = 5;
            return TouchUnitStack;
        }(cotrl.BaseStack));
        cotrl.TouchUnitStack = TouchUnitStack;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=TouchUnitStack.js.map