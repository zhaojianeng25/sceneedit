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
* 移动到指定地图坐标栈
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var GotoMapPosStack = /** @class */ (function (_super) {
            __extends(GotoMapPosStack, _super);
            function GotoMapPosStack(app, toMapid, toX, toY, intoPlugins, isTeleNow) {
                if (intoPlugins === void 0) { intoPlugins = false; }
                if (isTeleNow === void 0) { isTeleNow = false; }
                var _this = _super.call(this, app) || this;
                _this._intoPlugins = false;
                _this._nextUpdateTime = 0;
                //是否直接传送
                _this._isTeleNow = false;
                _this._toMapid = toMapid;
                _this._toX = toX;
                _this._toY = toY;
                _this._intoPlugins = intoPlugins;
                _this._isTeleNow = isTeleNow;
                return _this;
            }
            GotoMapPosStack.prototype.initialize = function () {
                if (!_super.prototype.initialize.call(this)) {
                    return false;
                }
                var mUnit = this._sceneObjectMgr.mainUnit;
                if (!mUnit || mUnit.isDied) {
                    return false;
                }
                if (!this.stack(this._controller, new cotrl.GotoMapStack(this._app, this._toMapid, this._isTeleNow))) {
                    return false;
                }
                return true;
            };
            GotoMapPosStack.prototype.update = function (diff) {
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
                //如果地图id0  则默认与主玩家同一张地图
                if (this._toMapid == 0) {
                    this._toMapid = mpMapid;
                }
                if (mpMapid != this._toMapid) {
                    return !this.stack(this._controller, new cotrl.GotoMapStack(this._app, this._toMapid, this._isTeleNow));
                }
                if (this._toX < 0 || this._toY < 0) {
                    return true;
                }
                if (mpx == this._toX && mpy == this._toY) {
                    //到达指定点需要挂机
                    if (this._intoPlugins) {
                        console.log("人物停止4");
                        this._controller.pluginsStart();
                    }
                    return true;
                }
                var mapData = this._sceneObjectMgr.mapAssetInfo;
                if (!mapData) {
                    return true;
                }
                //目标为障碍
                if (mapData.isObstacle(this._toX, this._toY)) {
                    var tempPoint = new game.data.point(this._toX, this._toY);
                    //查找以目标点为轴心的圆形非障碍点
                    mapData.getRoundNotObs(tempPoint, 15);
                    if (tempPoint.x == this._toX && tempPoint.y == this._toY)
                        return true;
                    //如果已经到达能到达的点了
                    if (mpx == tempPoint.x && mpy == tempPoint.y) {
                        //到达指定点需要挂机
                        if (this._intoPlugins) {
                            console.log("人物停止5");
                            this._controller.pluginsStart();
                        }
                        return true;
                    }
                }
                return !this.stack(this._controller, new cotrl.GotoDstStack(this._app, this._toX, this._toY, 1.5));
            };
            return GotoMapPosStack;
        }(cotrl.BaseStack));
        cotrl.GotoMapPosStack = GotoMapPosStack;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=GotoMapPosStack.js.map