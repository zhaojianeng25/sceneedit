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
* 移动转向栈
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var MoveTowardStack = /** @class */ (function (_super) {
            __extends(MoveTowardStack, _super);
            function MoveTowardStack(app, toward, isHangUp) {
                if (isHangUp === void 0) { isHangUp = false; }
                var _this = _super.call(this, app) || this;
                _this._curToward = 0;
                _this._isSend = false;
                _this._isHangUp = false;
                _this._attackOid = 0;
                _this._moveStatus = false;
                _this._nextUpdateTime = 0;
                _this._tryCount = 0;
                _this._curToward = toward;
                _this._isSend = false;
                _this._isHangUp = isHangUp;
                return _this;
            }
            //更新下朝向
            MoveTowardStack.prototype.setToward = function (toward) {
                //如果遥感方向不一致
                if (this._curToward == toward)
                    return;
                this._curToward = toward;
                this._isSend = false;
                this._tryCount = 0;
            };
            MoveTowardStack.prototype.initialize = function () {
                if (!_super.prototype.initialize.call(this)) {
                    return false;
                }
                var mUnit = this._sceneObjectMgr.mainUnit;
                if (this._curToward < 0 || !mUnit || mUnit.isDied || !this._controller.canMove) {
                    return false;
                }
                this._attackOid = this._sceneObjectMgr.selectOid; //记录下当前选择的攻击对象
                this._isSend = false;
                return true;
            };
            /**
             * 心跳
             * @param diff
             */
            MoveTowardStack.prototype.update = function (diff) {
                //释放了 退出栈
                if (_super.prototype.update.call(this, diff)) {
                    return true;
                }
                var mUnit = this._sceneObjectMgr.mainUnit;
                //传送了 | 自己挂了 退出栈
                if (!mUnit || mUnit.isDied) {
                    return true;
                }
                var curTime = Laya.timer.currTimer;
                var mpx = mUnit.pos.x;
                var mpy = mUnit.pos.y;
                if (!this._isSend && this._curToward >= 0) {
                    this._controller.sendMoveToward(this._curToward);
                    this._tryCount++;
                    this._isSend = true;
                    // logd("------------zzzzzz------send toward",this._curToward,mUnit.isMoving);
                    this._nextUpdateTime = curTime + 1000;
                    return false;
                }
                else if (this._nextUpdateTime > 0 && this._nextUpdateTime <= curTime) {
                    if (this._isSend && !this._moveStatus && this._tryCount < 3) {
                        //再发一次  不超过3次
                        if (!mUnit.isMoving) {
                            this._controller.sendMoveToward(this._curToward);
                            this._tryCount++;
                        }
                        this._moveStatus = mUnit.isMoving;
                        this._nextUpdateTime = curTime + 1000;
                        // logd("------------zzzzzz------ _tryCount",this._curToward,mUnit.isMoving,this._tryCount);
                        return false;
                    }
                    else if (this._isSend && this._moveStatus) {
                        //判断玩家是否停止移动了
                        if (!mUnit.isMoving) {
                            //判断当前是否有选择的对象  如果有 判断选择的对象与自己的距离 太远 另外选择
                            if (this._attackOid > 0) {
                                var targetUnit = this._sceneObjectMgr.getUnitByOid(this._attackOid);
                                if (targetUnit && !targetUnit.isDied) {
                                    var dis = mUnit.Distance(targetUnit);
                                    if (dis >= MoveTowardStack.MAX_DISTANC) {
                                        this._sceneObjectMgr.selectOid = 0;
                                        this._controller.stop(false);
                                    }
                                    else {
                                        this._sceneObjectMgr.selectOid = this._attackOid; // 则还原原本的攻击对象
                                    }
                                }
                            }
                            // logd("------------restart hangup");
                            //重新开启挂机
                            if (this._isHangUp) {
                                console.log("人物停止6");
                                this._controller.pluginsStart();
                            }
                            return true;
                        }
                    }
                }
                return false;
            };
            /**
             * 释放
             */
            MoveTowardStack.prototype.finalize = function () {
                this._curToward = -1;
                this._isSend = false;
                this._isHangUp = false;
                this._moveStatus = false;
                this._attackOid = 0;
                _super.prototype.finalize.call(this);
            };
            MoveTowardStack.MAX_DISTANC = 20;
            return MoveTowardStack;
        }(cotrl.BaseStack));
        cotrl.MoveTowardStack = MoveTowardStack;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=MoveTowardStack.js.map