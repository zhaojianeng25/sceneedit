/**
* 寻路
*/
var game;
(function (game) {
    var data;
    (function (data) {
        var TrunkPath = /** @class */ (function () {
            function TrunkPath(aStar) {
                this._aStar = aStar;
            }
            Object.defineProperty(TrunkPath.prototype, "aStar", {
                /**
                 * A*
                 */
                get: function () {
                    return this._aStar;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TrunkPath.prototype, "trunkPoints", {
                /**	干道点 */
                set: function (v) {
                    this._trunkPoints = v;
                    this._dijkstra_map = [];
                    if (!this._trunkPoints) {
                        return;
                    }
                    for (var i = 0; i < this._trunkPoints.length; i++) {
                        var part = this.createdDistanceArr();
                        this._dijkstra_map[this._dijkstra_map.length] = part;
                        for (var j = 0; j < this._trunkPoints[i].nextPoints.length; j++) {
                            var trunkPoint = this.findTrunkPointId(this._trunkPoints[i].nextPoints[j]);
                            if (trunkPoint && trunkPoint != this._trunkPoints[i]) {
                                var distance = MathU.getDistance(this._trunkPoints[i].x, this._trunkPoints[i].y, trunkPoint.x, trunkPoint.y);
                                part[trunkPoint.id] = distance;
                            }
                        }
                    }
                    // logd('--------------------------------------------')
                    // for(let i = 0; i < this._dijkstra_map.length; i ++){
                    // 	logd(this._dijkstra_map[i])
                    // }
                    // logd('--------------------------------------------')
                    // logd('this.find(130, 250, 272, 150)')
                    // logd(this.find(130, 250, 272, 150))
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 创建dijkstra_map需要的距离数组
             * @return
             */
            TrunkPath.prototype.createdDistanceArr = function () {
                var arr = [];
                for (var i = 0; i < this._trunkPoints.length; i++) {
                    arr[arr.length] = Dijkstra.NO_PATH;
                }
                return arr;
            };
            /**
             * 找到关键点
             * @param p
             * @return
             */
            TrunkPath.prototype.findTrunkPointId = function (p) {
                for (var i = 0; i < this._trunkPoints.length; i++) {
                    if (this._trunkPoints[i].equals(p))
                        return this._trunkPoints[i];
                }
                return null;
            };
            /**
             * 查找线段两端最近的点
             * @param x
             * @param y
             * @param refPath 返回x，y 到 该点的路径
             * @return
             */
            TrunkPath.prototype.nearyPoint = function (x, y, refPath) {
                if (!this._trunkPoints)
                    return null;
                var list = this._trunkPoints.concat();
                var len = list.length;
                //算出距离
                for (var i = 0; i < len; i++) {
                    var cur = list[i];
                    cur.distance = MathU.getDistance(x, y, cur.x, cur.y);
                }
                //按距离从小到大有序的排列
                list = list.sort(this.nearyPointCompare);
                this._aStar.maxTry = 300;
                len = len > 5 ? 5 : len; //最多尝试5次
                for (i = 0; i < len; i++) {
                    //必须可到达
                    var path = this._aStar.findByStraightLine(x, y, list[i].x, list[i].y);
                    if (AStar.isInvalidPath(path))
                        continue;
                    var len_1 = path.length;
                    refPath.length = len_1;
                    for (var j = 0; j < len_1; j++) {
                        refPath[j] = path[j];
                    }
                    return list[i];
                }
                //执行到这一句，就是悲剧的时候，说明无法到达，所以只能随便给第一点了
                return list[0];
            };
            TrunkPath.prototype.nearyPointCompare = function (a, b) {
                return a.distance - b.distance;
            };
            /**
             * 获得路径总里程
             * @param path 路径
             * @return
             */
            TrunkPath.prototype.getPathMileage = function (path) {
                var len = path.length / 2;
                if (len <= 1)
                    return 0;
                var nodeX = path[0];
                var nodeY = path[1];
                var total = 0;
                for (var i = 1; i < len; i++) {
                    var idx = i * 2;
                    total += MathU.getDistance(path[idx], path[idx + 1], nodeX, nodeY);
                    nodeX = path[idx];
                    nodeY = path[idx + 1];
                }
                return total;
            };
            /**
             * 查找路径
             * @param startX
             * @param startY
             * @param endX
             * @param endY
             * @return
             */
            TrunkPath.prototype.find = function (startX, startY, endX, endY, NEAREST_ASTART_DISTANCE) {
                if (NEAREST_ASTART_DISTANCE === void 0) { NEAREST_ASTART_DISTANCE = 15; }
                ///////////////////// 1.如果射线直接可以到达，何苦走干道/////////////////////////////
                var path;
                path = this._aStar.findByStraightLine(startX, startY, endX, endY);
                if (path != null)
                    return path;
                ////////////////////// 2.寻找最近干道入口点 ///////////////////////////////
                var entrAStatPath = new Array();
                var exitAStatPath = new Array();
                //寻找离起点最近干道入口点
                var entrRamp = this.nearyPoint(startX, startY, entrAStatPath);
                //寻找离终点最近干道出口点
                var exitRamp = this.nearyPoint(endX, endY, exitAStatPath);
                //找不到入口点或出口点则返回null
                if (!entrRamp || !exitRamp)
                    return null;
                /////////////////////// 3.获得入口和出口的干道路径 //////////////////////////
                //干道的中间路径
                path = new Array();
                //从干道入口到干道出口的路径
                var dijkResult = Dijkstra.getShortedPath(this._dijkstra_map, entrRamp.id, exitRamp.id); //地图数组,起点,终点
                //转换到干道中间路径
                var drltLen = dijkResult["path"].length;
                for (var i = 0; i < drltLen; i++) {
                    path.push(this._trunkPoints[dijkResult["path"][i]].x, this._trunkPoints[dijkResult["path"][i]].y);
                }
                //从干道入口到干道出口是否有效
                if (!path.length)
                    return null;
                //////////////////////// 4.寻找最佳干道入口点 //////////////////////////////
                //////////////////////// 有可能会绕远了，所以有时候可以从干道节点第二点开始查
                //起点不是入口才需要判断干道入口那一段
                if (startX != entrRamp.x || startY != entrRamp.y) {
                    if (path.length >= 4) {
                        var secondX = path[2];
                        var secondY = path[3];
                        var secondPath = this._aStar.findByStraightLine(startX, startY, secondX, secondY);
                        if (!AStar.isInvalidPath(secondPath)) {
                            var secondDist = this.getPathMileage(secondPath);
                            var fristDist = this.getPathMileage(entrAStatPath) + MathU.getDistance(path[0], path[1], secondX, secondY);
                            if (secondDist < fristDist) {
                                path.splice(0, 2); // 去掉干道第一点
                                entrAStatPath = secondPath; // 启用备选更短路径
                            }
                        }
                    }
                    //开始连接在一起
                    path.splice(0, 2);
                    path = entrAStatPath.concat(path);
                }
                //////////////////////// 5.寻找最佳干道出口点 //////////////////////////////
                //////////////////////// 有可能会绕远了，所以有时候可以从干道节点倒数第二点开始查
                if (endX != exitRamp.x || endY != exitRamp.y) {
                    if (path.length >= 4) {
                        var pathSize = path.length;
                        var secondX = path[pathSize - 4];
                        var secondY = path[pathSize - 3];
                        var secondPath = this._aStar.findByStraightLine(endX, endY, secondX, secondY);
                        if (!AStar.isInvalidPath(secondPath)) {
                            var secondDist = this.getPathMileage(secondPath);
                            var fristDist = this.getPathMileage(exitAStatPath) + MathU.getDistance(path[pathSize - 2], path[pathSize - 1], secondX, secondY);
                            if (secondDist < fristDist) {
                                // 去掉干道第最后一点
                                if (path.length > 2) {
                                    path.length = path.length - 2;
                                }
                                exitAStatPath = secondPath; // 启用备选更短路径
                            }
                        }
                    }
                    //开始连接在一起
                    if (path.length > 2) {
                        path.length = path.length - 2;
                    }
                    var count = exitAStatPath.length / 2;
                    for (var i_1 = 0; i_1 < count; i_1++) {
                        var index = (count - i_1 - 1) * 2;
                        path.push(exitAStatPath[index], exitAStatPath[index + 1]);
                    }
                }
                return path;
            };
            return TrunkPath;
        }());
        data.TrunkPath = TrunkPath;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=TrunkPath.js.map