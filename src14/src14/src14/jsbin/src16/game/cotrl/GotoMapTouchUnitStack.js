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
        var GotoMapTouchUnitStack = /** @class */ (function (_super) {
            __extends(GotoMapTouchUnitStack, _super);
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
             * @param isGotoPos			需要走着去
             */
            function GotoMapTouchUnitStack(app, mapid, dstX, dstY, tid, type, guid, intoPlugins, isloot, isGotoPos) {
                if (guid === void 0) { guid = ""; }
                if (intoPlugins === void 0) { intoPlugins = false; }
                if (isloot === void 0) { isloot = false; }
                if (isGotoPos === void 0) { isGotoPos = false; }
                var _this = _super.call(this, app) || this;
                _this._touchGuid = "";
                _this._nextUpdateTime = 0;
                /*如果是打怪是否进入挂机*/
                _this._intoPlugins = false;
                _this._isGotoPos = false;
                _this._mapid = mapid;
                _this._dstX = dstX;
                _this._dstY = dstY;
                _this._touchEntry = tid;
                _this._touchType = type;
                _this._touchGuid = guid;
                _this._intoPlugins = intoPlugins;
                _this._isLoot = isloot;
                _this._isGotoPos = isGotoPos;
                return _this;
            }
            /**
             * 初始化
             */
            GotoMapTouchUnitStack.prototype.initialize = function () {
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
            GotoMapTouchUnitStack.prototype.doReady = function () {
            };
            GotoMapTouchUnitStack.prototype.update = function (diff) {
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
                //地图数据下载中
                if (!this._sceneObjectMgr.mapAssetInfo)
                    return false;
                //是否处于等待传送
                if (this._controller.isTeleporting)
                    return false;
                var mpx = mUnit.pos.x;
                var mpy = mUnit.pos.y;
                var mpMapid = mUnit.mapid;
                //不在这地图里的
                if (mpMapid != this._mapid) {
                    //传送
                    if (this._isGotoPos) {
                        if (this._controller.teleToMapTeleportPos(this._mapid))
                            return false;
                    }
                    this._controller.sendTeleport(this._mapid, this._dstX, this._dstY);
                    return false;
                }
                //直接传送到目的 就算在本地图
                else if (!this._isGotoPos) {
                    var dis = MathU.getDistance(mUnit.pos.x, mUnit.pos.y, this._dstX, this._dstY);
                    //不在附近
                    if (dis > 30) {
                        this._controller.sendTeleport(this._mapid, this._dstX, this._dstY);
                        return false;
                    }
                }
                return this._controller.stack(new cotrl.FindTouchUnitStack(this._app, this._mapid, this._dstX, this._dstY, this._touchEntry, this._touchType, null, this._intoPlugins, this._isLoot));
            };
            GotoMapTouchUnitStack.prototype.finalize = function () {
                this._target = null;
                this._nextUpdateTime = 0;
                _super.prototype.finalize.call(this);
            };
            GotoMapTouchUnitStack.MAX_NPCTOUCH_DISTANCE = 6; //npc 触碰 最大距离
            return GotoMapTouchUnitStack;
        }(cotrl.BaseStack));
        cotrl.GotoMapTouchUnitStack = GotoMapTouchUnitStack;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=GotoMapTouchUnitStack.js.map