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
* 移动到指定地图栈
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var GotoMapStack = /** @class */ (function (_super) {
            __extends(GotoMapStack, _super);
            function GotoMapStack(app, toMapid, isTeleNow) {
                if (isTeleNow === void 0) { isTeleNow = false; }
                var _this = _super.call(this, app) || this;
                //是否直接传送
                _this._isTeleNow = false;
                _this._nextUpdateTime = 0;
                _this._toMapid = toMapid;
                _this._isTeleNow = isTeleNow;
                return _this;
            }
            GotoMapStack.prototype.initialize = function () {
                if (!_super.prototype.initialize.call(this)) {
                    return false;
                }
                var mUnit = this._sceneObjectMgr.mainUnit;
                if (!mUnit || mUnit.isDied) {
                    return false;
                }
                var mpMapid = mUnit.mapid;
                if (mpMapid != this._toMapid) {
                    //找出跨地图路径点
                    this._telePorts = MapTeleportIndex.inst.find(mpMapid, this._toMapid);
                    if (!this._telePorts)
                        return false;
                }
                return true;
            };
            GotoMapStack.prototype.update = function (diff) {
                //释放了 退出栈
                if (_super.prototype.update.call(this, diff)) {
                    return true;
                }
                var cur_time = Laya.timer.currTimer;
                if (this._nextUpdateTime > 0 && this._nextUpdateTime > cur_time)
                    return false;
                this._nextUpdateTime = cur_time + 100;
                var mUnit = this._sceneObjectMgr.mainUnit;
                //传送了 | 自己挂了 退出栈
                if (!mUnit || mUnit.isDied) {
                    return true;
                }
                var mpMapid = mUnit.mapid;
                var mpx = mUnit.pos.x;
                var mpy = mUnit.pos.y;
                //如果在同一张地图，不需要跨地图寻路，则直接调用本地干道寻路
                if (mpMapid == this._toMapid) {
                    return true;
                }
                //地图数据下载中
                if (!this._sceneObjectMgr.mapAssetInfo)
                    return false;
                //是否处于等待传送
                if (this._controller.isTeleporting)
                    return false;
                //继续寻找下一个传送点
                if (!this._nextTelePort && this._telePorts)
                    this._nextTelePort = this._telePorts.shift();
                //如果找不到下一个传送点退出
                if (!this._nextTelePort)
                    return true;
                //如果是直接传送
                if (this._isTeleNow) {
                    //直接发起传送协议
                    if (!this._controller.teleToMapTeleportPos(this._toMapid))
                        this._controller.sendTeleport(this._nextTelePort.dstMapid, this._nextTelePort.dstPortX, this._nextTelePort.dstPortY);
                    return true;
                }
                else {
                    //如果距离太小了，就直接传送
                    var distance = MathU.getDistance(mpx, mpy, this._nextTelePort.srcPortX, this._nextTelePort.srcPortY);
                    if (distance < 2) {
                        //直接发起传送协议
                        this._controller.sendTeleport(this._nextTelePort.dstMapid, this._nextTelePort.dstPortX, this._nextTelePort.dstPortY);
                        return true;
                    }
                    else {
                        //加入新栈，干道寻路
                        return !this.stack(this._controller, new cotrl.GotoDstStack(this._app, this._nextTelePort.srcPortX, this._nextTelePort.srcPortY, 1.5));
                    }
                }
            };
            GotoMapStack.prototype.finalize = function () {
                this._nextTelePort = null;
                this._telePorts = null;
                this._nextUpdateTime = 0;
                _super.prototype.finalize.call(this);
            };
            return GotoMapStack;
        }(cotrl.BaseStack));
        cotrl.GotoMapStack = GotoMapStack;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=GotoMapStack.js.map