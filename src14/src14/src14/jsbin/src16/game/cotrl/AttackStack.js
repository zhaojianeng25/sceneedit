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
* 攻击栈
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var AttackStack = /** @class */ (function (_super) {
            __extends(AttackStack, _super);
            function AttackStack(app, targetUnit) {
                var _this = _super.call(this, app) || this;
                _this._addDis = 0;
                _this.targetOid = 0;
                /*更新当前技能*/
                _this._spellid = 0;
                _this._tryCount = 0;
                _this._nextUpdateTime = 0;
                _this._targetUnit = targetUnit;
                _this._tryCount = 0;
                _this._addDis = 0.8;
                if (targetUnit) {
                    _this.targetOid = targetUnit.oid;
                    var flag = targetUnit.npcFlag;
                    switch (flag) {
                        case Unit.CREATURE_TYPE_ELITE:
                            _this._addDis = 2.8;
                            break;
                        case Unit.CREATURE_TYPE_BOSS:
                        case Unit.CREATURE_TYPE_SMALL_BOSS:
                            _this._addDis = 4.8;
                            break;
                    }
                }
                return _this;
            }
            AttackStack.prototype.initialize = function () {
                if (!_super.prototype.initialize.call(this)) {
                    return false;
                }
                var mUnit = this._sceneObjectMgr.mainUnit;
                if (!mUnit || mUnit.isDied) {
                    return false;
                }
                //校验能否攻击
                if (!this.isCanAttack()) {
                    return false;
                }
                return true;
            };
            /**
             * 心跳，返回是否退出堆栈
             * @param diff 心跳时差
             */
            AttackStack.prototype.update = function (diff) {
                // let cur_time:number = Laya.timer.currTimer;
                // if(this._nextUpdateTime && this._nextUpdateTime > cur_time) return false;
                // this._nextUpdateTime = cur_time + 100;
                //释放了 退出栈
                if (_super.prototype.update.call(this, diff)) {
                    return true;
                }
                //目标死了
                if (this._targetUnit && this._targetUnit.isDied) {
                    return true;
                }
                var mUnit = this._sceneObjectMgr.mainUnit;
                //传送了 | 自己挂了 退出栈
                if (!mUnit || mUnit.isDied) {
                    return true;
                }
                var mpx = mUnit.pos.x;
                var mpy = mUnit.pos.y;
                //选中目标
                if (this._targetUnit && this._sceneObjectMgr.selectOid != this._targetUnit.oid) {
                    this.stack(this._controller, new cotrl.SelectTargetSack(this._app, this._targetUnit));
                    this._tryCount++;
                    if (this._tryCount >= 3)
                        return true; //三次机会
                    return false;
                }
                //攻击
                if (this.isCanAttack()) {
                    if (this._spellTemp.need_target > 0 && !this._targetUnit) {
                        //需要目标但 没有目标
                        return true;
                    }
                    //判断是否处于公共cd 中
                    if (this._controller.getSpellCommonCD(200) > 0)
                        return false;
                    var dis = MathU.getDistance(mpx, mpy, this._dstX, this._dstY);
                    var spell_dis = this._spellTemp.distance + this._addDis;
                    if (dis > spell_dis) {
                        //logd("距离:",dis,spell_dis)
                        //是否使用瞬移
                        var sd = 15;
                        if (this._spellTemp.need_target > 0) {
                            if (dis <= sd) {
                                // if(dis >= 10){
                                // 	return false;
                                // } 
                                sd = spell_dis;
                            }
                        }
                        else {
                            sd = spell_dis;
                        }
                        this.stack(this._controller, new cotrl.TrackUnitStack(this._app, this._dstX, this._dstY, sd, this._spellTemp.need_target > 0 ? this._targetUnit : null));
                        return false;
                    }
                    return false;
                }
                return true;
            };
            //是否可以攻击
            AttackStack.prototype.isCanAttack = function () {
                //buff是否能攻击
                if (!this._controller.canAttack)
                    return false;
                //更新技能
                this.updateCurSpell();
                if (!this._spellTemp) {
                    //不应该啊
                    return false;
                }
                //主玩家对象
                var mUnit = this._sceneObjectMgr.mainUnit;
                if (this._spellTemp.need_target > 0) {
                    //需要目标 没死 并且可以攻击
                    if (!this._targetUnit || this._targetUnit.isDied || this._controller.isFriendly(this._targetUnit)) {
                        return false;
                    }
                    this._dstX = this._targetUnit.pos.x;
                    this._dstY = this._targetUnit.pos.y;
                }
                else {
                    this._dstX = mUnit.pos.x;
                    this._dstY = mUnit.pos.y;
                }
                //如果目标在障碍点
                var spell_dis = this._spellTemp.distance + this._addDis;
                if (this._targetUnit
                    && mUnit.Distance(this._targetUnit) > spell_dis
                    && this._sceneObjectMgr.mapAssetInfo.isObstacle(this._dstX, this._dstY)) {
                    return false;
                }
                return true;
            };
            //更新技能
            AttackStack.prototype.updateCurSpell = function () {
                var isNoUseSpell = false;
                //不使用技能了
                if (isNoUseSpell) {
                    this._spellid = 0;
                    this._spellTemp = null;
                }
                else {
                    //如果还是没有 那就默认1把
                    if (this._spellid <= 0) {
                        this._spellid = 2;
                    }
                    this._spellTemp = Template.getSkillsTempById(this._spellid);
                }
            };
            AttackStack.prototype.finalize = function () {
                this._targetUnit = null;
                this._sceneObjectMgr.selectOid = 0;
                this._nextUpdateTime = 0;
                _super.prototype.finalize.call(this);
            };
            return AttackStack;
        }(cotrl.BaseStack));
        cotrl.AttackStack = AttackStack;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=AttackStack.js.map