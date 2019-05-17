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
* 查找并使用生物对象栈
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var FindTouchUnitStack = /** @class */ (function (_super) {
            __extends(FindTouchUnitStack, _super);
            /**
             * 查找并接触生物对象
             * @param scene
             * @param dstMapid 			目标地图id
             * @param dstX				目标x
             * @param dstY				目标y
             * @param tid				生物对象模板id
             * @param guid				生物对象guid
             * @param intoPlugins		是否进入挂机
             * @param isLoot			是否时战利品
             */
            function FindTouchUnitStack(app, mapid, dstX, dstY, tid, type, guid, intoPlugins, isloot) {
                if (guid === void 0) { guid = ""; }
                if (intoPlugins === void 0) { intoPlugins = false; }
                if (isloot === void 0) { isloot = false; }
                var _this = _super.call(this, app) || this;
                _this._touchGuid = "";
                _this._nextUpdateTime = 0;
                /*如果是打怪是否进入挂机*/
                _this._intoPlugins = false;
                /*初始寻找AvatarUnit距离*/
                _this._longDistance = 12;
                /*渐进寻找AvatarUnit距离*/
                _this._gradualDistance = 3;
                _this._mapid = mapid;
                _this._dstX = dstX;
                _this._dstY = dstY;
                _this._touchEntry = tid;
                _this._touchType = type;
                _this._touchGuid = guid;
                _this._intoPlugins = intoPlugins;
                _this._isLoot = isloot;
                return _this;
            }
            /**
             * 初始化
             */
            FindTouchUnitStack.prototype.initialize = function () {
                if (!_super.prototype.initialize.call(this)) {
                    return false;
                }
                if ((!this._touchGuid || !this._touchGuid.length) && !this._touchEntry) {
                    return false;
                }
                var mUnit = this._sceneObjectMgr.mainUnit;
                if (!mUnit || mUnit.isDied) {
                    return false;
                }
                return true;
            };
            FindTouchUnitStack.prototype.doReady = function () {
            };
            FindTouchUnitStack.prototype.update = function (diff) {
                //释放了 退出栈
                if (_super.prototype.update.call(this, diff)) {
                    return true;
                }
                var cur_time = Laya.timer.currTimer;
                if (this._nextUpdateTime && this._nextUpdateTime > cur_time)
                    return false;
                this._nextUpdateTime = cur_time + 200;
                var mUnit = this._sceneObjectMgr.mainUnit;
                //传送了 | 自己挂了 退出栈
                if (!mUnit || mUnit.isDied) {
                    return true;
                }
                var mpx = mUnit.pos.x;
                var mpy = mUnit.pos.y;
                var mpMapid = mUnit.mapid;
                //不在这地图里的
                if (mpMapid != this._mapid) {
                    this._controller.setIsAutoMoving(true, 999);
                    //插入移动栈
                    return !this.stack(this._controller, new cotrl.GotoMapStack(this._app, this._mapid));
                }
                //距离太远的 暂时用12码
                var dis = MathU.getDistance(mpx, mpy, this._dstX, this._dstY);
                if (dis > this._longDistance) {
                    this._controller.setIsAutoMoving(true, dis);
                    //插入移动栈
                    return !this.stack(this._controller, new cotrl.GotoDstStack(this._app, this._dstX, this._dstY, this._longDistance));
                }
                if (!this._target) {
                    //寻找目标
                    if (this._touchGuid && this._touchGuid.length) {
                        //Guid优先
                        this._target = this._sceneObjectMgr.getUnitByGuid(this._touchGuid);
                    }
                    else {
                        if (!this._target && this._touchEntry)
                            this._target = this._sceneObjectMgr.getUnitByEntry(mUnit, this._touchEntry);
                    }
                }
                if (!this._target) {
                    //没找到  再渐进寻找
                    if (MathU.getDistance(mpx, mpy, this._dstX, this._dstY) > 2) {
                        this._longDistance = this._longDistance > this._gradualDistance ? this._longDistance - this._gradualDistance : 0;
                        return false;
                    }
                    return true; //已经距离这么近了 还找不到 就退出
                }
                var target_map_id = this._target.mapid;
                if (mpMapid != target_map_id) {
                    this._target = null;
                    //清空
                    this.stack(this._controller, new cotrl.SelectTargetSack(this._app, null));
                    return false;
                }
                if (this._sceneObjectMgr.selectOid != this._target.oid) {
                    //插如选择目标栈
                    this.stack(this._controller, new cotrl.SelectTargetSack(this._app, this._target));
                }
                //触发unit的距离
                if (this._controller.isFriendly(this._target)) {
                    //距离太远的
                    var dx = this._dstX;
                    var dy = this._dstY;
                    var touchDistance = mUnit.isRiding ? 2.5 : 1.5;
                    if (Math.floor(dis) > touchDistance) {
                        this._controller.setIsAutoMoving(true, dis);
                        this.stack(this._controller, new cotrl.GotoDstStack(this._app, dx, dy, touchDistance));
                        return false;
                    }
                    else {
                        //切换触发栈
                        this._controller.exec(new cotrl.TouchUnitStack(this._app, this._target.guid));
                    }
                }
                else {
                    if (this._intoPlugins) {
                        console.log("人物停止3");
                        this._controller.pluginsStart(true, true, this._touchEntry);
                    }
                    if (!this._target)
                        return true;
                    var targetEntry = this._target.entryid;
                    if (!this._target.isDied) {
                        //敌对的切换成攻击栈
                        this._controller.exec(new cotrl.AttackStack(this._app, this._target));
                    }
                }
                return true;
            };
            FindTouchUnitStack.prototype.finalize = function () {
                this._target = null;
                this._nextUpdateTime = 0;
                _super.prototype.finalize.call(this);
            };
            FindTouchUnitStack.MAX_NPCTOUCH_DISTANCE = 6; //npc 触碰 最大距离
            FindTouchUnitStack.MAX_NPCTOUCH_MOUNT_DISTANCE = 12; //npc 触碰 最大距离 坐骑
            return FindTouchUnitStack;
        }(cotrl.BaseStack));
        cotrl.FindTouchUnitStack = FindTouchUnitStack;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=FindTouchUnitStack.js.map