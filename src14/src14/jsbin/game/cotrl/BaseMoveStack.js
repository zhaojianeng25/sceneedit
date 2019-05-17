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
* 移动栈基类
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var BaseMoveStack = /** @class */ (function (_super) {
            __extends(BaseMoveStack, _super);
            function BaseMoveStack(app, dstX, dstY, distance) {
                var _this = _super.call(this, app) || this;
                _this._nextUpdateTime = 0;
                _this._dstX = dstX;
                _this._dstY = dstY;
                _this._distance = distance;
                return _this;
            }
            /**
             * 执行并返回子类是否有继续执行的必要
             */
            BaseMoveStack.prototype.initialize = function () {
                if (!_super.prototype.initialize.call(this)) {
                    return false;
                }
                var mapAssetInfo = this._sceneObjectMgr.mapAssetInfo;
                if (!mapAssetInfo) {
                    return false;
                }
                //如果目标点在障碍里 就不执行了
                if (mapAssetInfo.isObstacle(this._dstX, this._dstY)) {
                    return false;
                }
                if (!this._controller.canMove) {
                    return false;
                }
                return true;
            };
            BaseMoveStack.prototype.doReady = function () {
            };
            /**
             * 释放
             */
            BaseMoveStack.prototype.finalize = function () {
                this._nextUpdateTime = 0;
                _super.prototype.finalize.call(this);
            };
            /**
             * 心跳
             * @param diff
             */
            BaseMoveStack.prototype.update = function (diff) {
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
                if (MathU.getDistance(mpx, mpy, this._dstX, this._dstY) <= this._distance) {
                    return true;
                }
                return false;
            };
            /**
             * 地图内部传送点中，最靠近指定点的传送点
             * @param dstX 指定点x
             * @param dstY 指定点y
             * @return
             *
             */
            BaseMoveStack.prototype.findNearyTelePort = function (dstX, dstY) {
                var mUnit = this._sceneObjectMgr.mainUnit;
                //传送了 | 自己挂了 退出栈
                if (!mUnit || mUnit.isDied) {
                    return null;
                }
                //地图传送点列表和id
                var mpx = mUnit.pos.x;
                var mpy = mUnit.pos.y;
                var id = 1; //this._objectMgr.mainPlayerData.GetMapID();
                var teleports = this._sceneObjectMgr.mapAssetInfo.teleports;
                if (!teleports)
                    return null;
                var shortTkP;
                var shortdistance = Number.MAX_VALUE;
                var len = teleports.length;
                for (var i = 0; i < len; i++) {
                    var teleP = teleports[i];
                    //必须目标本地图的才行
                    if (teleP.dstMapid != id)
                        continue;
                    //距离比以前短，太优越了，这点比以前更近更好
                    var distance = MathU.getDistance(teleP.dstPortX, teleP.dstPortY, dstX, dstY);
                    if (distance < shortdistance) {
                        //自己的位置 -> 传送点是否有路可走
                        if (!this.canArrive(mpx, mpy, teleP.srcPortX, teleP.srcPortY))
                            continue;
                        //传送点之后的点 -> 目的地有路可走
                        if (!this.canArrive(teleP.dstPortX, teleP.dstPortY, dstX, dstY))
                            continue;
                        //经过了苛刻的筛选，成功突破
                        shortTkP = teleP;
                        shortdistance = distance;
                    }
                }
                return shortTkP;
            };
            /**
             * 同张地图里面，目标起点X，Y是否能到达dstX，dstY
             * @param srcX 起点X
             * @param srcY 起点Y
             * @param dstX 目标X
             * @param dstY 目标Y
             * @return
             */
            BaseMoveStack.prototype.canArrive = function (srcX, srcY, dstX, dstY) {
                var mapData = this._sceneObjectMgr.mapAssetInfo;
                //校验起点是否能到达
                // var path:Array<number> = mapData.trukPath.find(srcX, srcY, dstX, dstY);
                // if(game.utils.AStar.isInvalidPath(path)) return false;
                // //是否得到靠近的标准
                // //路径的最后端距离实际的点是否够近
                // var dis:number = MathU.getDistance(path[path.length-2],  path[path.length-1], dstX, dstY);
                // if(dis > BaseMoveStack.MAX_TRUNKGOTO_DIS)
                // 	return false;
                return true;
            };
            /**
             * 能否直线到达
             * @param srcX
             * @param srcY
             * @param dstX
             * @param dstY
             */
            BaseMoveStack.prototype.canLineArrive = function (mapData, srcX, srcY, dstX, dstY) {
                var temp_x;
                var temp_y;
                //得到以自己为圆心的角度
                var angle = MathU.getAngle(srcX, srcY, dstX, dstY);
                //要求站的位置距离
                var dis = MathU.getDistance(srcX, srcY, dstX, dstY);
                if (dis < 1)
                    return false;
                for (var i = 1; i < dis; i++) {
                    temp_x = srcX + Math.cos(angle) * i;
                    temp_y = srcY + Math.sin(angle) * i;
                    if (mapData.isObstacle(temp_x, temp_y)) {
                        break;
                    }
                }
                return temp_x == dstX && temp_y == dstY;
            };
            /**
             * 干道寻路完成后，路径的最后一点和要到达的点允许最大的距离
             */
            BaseMoveStack.MAX_TRUNKGOTO_DIS = 5;
            return BaseMoveStack;
        }(cotrl.BaseStack));
        cotrl.BaseMoveStack = BaseMoveStack;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=BaseMoveStack.js.map