var game;
(function (game) {
    var utils;
    (function (utils) {
        /**
        * 最短路径算法
        */
        var Dijkstra = /** @class */ (function () {
            function Dijkstra() {
            }
            //从某一源点出发，找到到某一结点的最短路径
            Dijkstra.getShortedPath = function (G, star, end, maxlong) {
                if (maxlong === void 0) { maxlong = Dijkstra.NO_PATH; }
                var len = G.length;
                var s = new Array();
                var min;
                var curNode = 0;
                var dist = new Array();
                var prev = new Array();
                var path = new Array();
                for (var v = 0; v < len; v++) {
                    s[v] = false;
                    dist[v] = G[star][v];
                    if (dist[v] >= maxlong) {
                        prev[v] = 0;
                    }
                    else {
                        prev[v] = star;
                    }
                }
                path[0] = end;
                dist[star] = 0;
                s[star] = true;
                for (var i = 1; i < len; i++) {
                    min = maxlong;
                    for (var w = 0; w < len; w++) {
                        if ((!s[w]) && (dist[w] < min)) {
                            curNode = w;
                            min = dist[w];
                        }
                    }
                    s[curNode] = true;
                    for (var j = 0; j < len; j++) {
                        if ((!s[j]) && ((min + G[curNode][j]) < dist[j])) {
                            dist[j] = min + G[curNode][j];
                            prev[j] = curNode;
                        }
                    }
                }
                ;
                var e = end;
                var step = 0;
                var maxTitl = 3000;
                var curTitl = 0;
                while (e != star) {
                    curTitl++;
                    if (curTitl > maxTitl) {
                        return { dist: dist[end], path: [] };
                    }
                    step++;
                    path[step] = prev[e];
                    e = prev[e];
                }
                for (var q = step; q > (step / 2); q--) {
                    var temp = path[step - q];
                    path[step - q] = path[q];
                    path[q] = temp;
                }
                return { dist: dist[end], path: path };
            };
            //从某一源点出发,找出到所有节点的最短路径
            Dijkstra.getShortedPathList = function (G, star, maxlong) {
                if (maxlong === void 0) { maxlong = Dijkstra.NO_PATH; }
                var len = G.length;
                var pathID = new Array(len);
                var s = new Array(len);
                var max;
                var curNode = 0;
                var dist = new Array(len);
                var prev = new Array(len);
                var path = new Array(len);
                for (var n = 0; n < len; n++) {
                    path[path.length] = [];
                }
                for (var v = 0; v < len; v++) {
                    s[v] = false;
                    dist[v] = G[star][v];
                    if (dist[v] > maxlong) {
                        prev[v] = 0;
                    }
                    else {
                        prev[v] = star;
                    }
                    path[v][0] = v;
                }
                dist[star] = 0;
                s[star] = true;
                for (var i = 1; i < len; i++) {
                    max = maxlong;
                    for (var w = 0; w < len; w++) {
                        if ((!s[w]) && (dist[w] < max)) {
                            curNode = w;
                            max = dist[w];
                        }
                    }
                    s[curNode] = true;
                    for (var j = 0; j < len; j++) {
                        if ((!s[j]) && ((max + G[curNode][j]) < dist[j])) {
                            dist[j] = max + G[curNode][j];
                            prev[j] = curNode;
                        }
                    }
                }
                for (var k = 0; k < len; k++) {
                    var e = k;
                    var step = 0;
                    var maxTitl = 3000;
                    var curTitl = 0;
                    while (e != star) {
                        curTitl++;
                        if (curTitl > maxTitl) {
                            return { dist: dist, path: [] };
                        }
                        step++;
                        path[k][step] = prev[e];
                        e = prev[e];
                    }
                    for (var p = step; p > (step / 2); p--) {
                        var temp = path[k][step - p];
                        path[k][step - p] = path[k][p];
                        path[k][p] = temp;
                    }
                }
                return { dist: dist, path: path };
            };
            //无法通过的距离;
            Dijkstra.NO_PATH = 1000000;
            return Dijkstra;
        }());
        utils.Dijkstra = Dijkstra;
        /**
        * A*寻路算法
        */
        var AStar = /** @class */ (function () {
            function AStar(p_mapTileModel, p_maxTry) {
                if (p_maxTry === void 0) { p_maxTry = 300; }
                //====================================
                //    Constants
                //====================================
                //横或竖向移动一格的路径评分
                this.COST_STRAIGHT = 10;
                //斜向移动一格的路径评分
                this.COST_DIAGONAL = 14;
                //(单个)节点数组 节点ID 索引
                this.NOTE_ID = 0;
                //(单个)节点数组 是否在开启列表中 索引
                this.NOTE_OPEN = 1;
                //(单个)节点数组 是否在关闭列表中 索引
                this.NOTE_CLOSED = 2;
                this.m_mapTileModel = p_mapTileModel;
                this.m_maxTry = p_maxTry;
            }
            Object.defineProperty(AStar.prototype, "maxTry", {
                /**
                 * 最大寻路步数，限制超时返回
                 */
                get: function () {
                    return this.m_maxTry;
                },
                set: function (p_value) {
                    this.m_maxTry = p_value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 是否为无效的路径
             * @param path 路径数据
             * @return
             */
            AStar.isInvalidPath = function (path) {
                return !path || path.length < 2 || (path.length & 0x01) == 1;
            };
            /**
             * 开始寻路，返回关键点路径, 根据射线返回
             * @param p_startX      起点X坐标
             * @param p_startY      起点Y坐标
             * @param p_endX        终点X坐标
             * @param p_endY        终点Y坐标
             * @return              找到的路径(二维数组 : [p_startX, p_startY, direct], ... , [p_endX, p_endY, direct])
             */
            AStar.prototype.find3 = function (p_startX, p_startY, p_endX, p_endY) {
                var result = this.find(p_startX, p_startY, p_endX, p_endY);
                if (!result || result.length < 2) {
                    return null;
                }
                //路径
                var path = new Array();
                path.push(p_startX, p_startY);
                //开始筛选出关键点
                var index = 1;
                var fromX = p_startX;
                var fromY = p_startY;
                //允许最大的过期次数
                var maxTTL = 20000;
                //过期次数
                var ttl = 0;
                while (true) /* loop */ {
                    if (ttl >= maxTTL) {
                        loge("AStar.find3，TTL超过最大次数：" + maxTTL.toString());
                        return null;
                    }
                    ttl++;
                    index++;
                    if (index >= result.length)
                        break;
                    if (this.m_mapTileModel.canTransit(fromX, fromY, result[index][0], result[index][1])) {
                        continue;
                    }
                    else {
                        //插入到路径里
                        // var pt:[] = result[index - 1];
                        fromX = result[index - 1][0];
                        fromY = result[index - 1][1];
                        path.push(fromX, fromY);
                    }
                }
                path.push(p_endX, p_endY);
                return path;
            };
            /**
             * 开始寻路
             *
             * @param p_startX        起点X坐标
             * @param p_startY        起点Y坐标
             * @param p_endX        终点X坐标
             * @param p_endY        终点Y坐标
             *
             * @return                 找到的路径(二维数组 : [p_startX, p_startY, direct], ... , [p_endX, p_endY, direct])
             */
            AStar.prototype.find = function (p_startX, p_startY, p_endX, p_endY) {
                if (!this.m_mapTileModel.isBlock(p_startX, p_startY, p_endX, p_endY)) {
                    //logd("[AStart.find] 目标点为路障 " + p_endX + "," + p_endY);
                }
                this.initLists();
                this.m_openCount = 0;
                this.m_openId = -1;
                this.openNote(p_startX, p_startY, 9, 0, 0, 0);
                var currTry = 0;
                var currId;
                var currNoteX;
                var currNoteY;
                var aroundNotes;
                var checkingId;
                var cost;
                var score;
                var maxTTL = 20000;
                var ttl = 0;
                while (this.m_openCount > 0) {
                    ttl++;
                    if (ttl > maxTTL)
                        loge("循环次数超过最大值：" + maxTTL);
                    //超时返回
                    if (++currTry > this.m_maxTry) {
                        this.destroyLists();
                        return null;
                    }
                    //每次取出开放列表最前面的ID
                    currId = this.m_openList[0];
                    //将编码为此ID的元素列入关闭列表
                    this.closeNote(currId);
                    currNoteX = this.m_xList[currId];
                    currNoteY = this.m_yList[currId];
                    //如果终点被放入关闭列表寻路结束，返回路径
                    if (currNoteX == p_endX && currNoteY == p_endY) {
                        return this.getPath(p_startX, p_startY, currId);
                    }
                    //获取周围节点，排除不可通过和已在关闭列表中的
                    aroundNotes = this.getArounds(currNoteX, currNoteY);
                    //对于周围的每一个节点
                    for (var _i = 0, aroundNotes_1 = aroundNotes; _i < aroundNotes_1.length; _i++) {
                        var note = aroundNotes_1[_i];
                        //计算F和G值
                        cost = this.m_movementCostList[currId] + ((note[0] == currNoteX || note[1] == currNoteY) ? this.COST_STRAIGHT : this.COST_DIAGONAL);
                        score = cost + (Math.abs(p_endX - note[0]) + Math.abs(p_endY - note[1])) * this.COST_STRAIGHT;
                        //                    score = cost;
                        if (this.isOpen(note[0], note[1])) //如果节点已在播放列表中
                         {
                            checkingId = this.m_noteMap[note[1]][note[0]][this.NOTE_ID];
                            //如果新的G值比节点原来的G值小,修改F,G值，换父节点
                            if (cost < this.m_movementCostList[checkingId]) {
                                this.m_movementCostList[checkingId] = cost;
                                this.m_pathScoreList[checkingId] = score;
                                this.m_fatherList[checkingId] = currId;
                                //获取某ID节点在开放列表中的索引(去掉先前函数使用数组api查询可使效率提高1/4左右)
                                this.aheadNote(this.m_openList.indexOf(checkingId));
                            }
                        }
                        else //如果节点不在开放列表中
                         {
                            //将节点放入开放列表
                            this.openNote(note[0], note[1], note[2], score, cost, currId);
                        }
                    }
                }
                //开放列表已空，找不到路径
                this.destroyLists();
                return null;
            };
            //====================================
            //    Private Methods
            //====================================
            /**
             * @private
             * 将节点加入开放列表
             *
             * @param p_x        节点在地图中的x坐标
             * @param p_y        节点在地图中的y坐标
             * @param P_score    节点的路径评分
             * @param p_cost    起始点到节点的移动成本
             * @param p_fatherId    父节点
             */
            AStar.prototype.openNote = function (p_x, p_y, p_d, p_score, p_cost, p_fatherId) {
                this.m_openCount++;
                this.m_openId++;
                if (this.m_noteMap[p_y] == null) {
                    this.m_noteMap[p_y] = [];
                }
                this.m_noteMap[p_y][p_x] = [];
                this.m_noteMap[p_y][p_x][this.NOTE_OPEN] = true;
                this.m_noteMap[p_y][p_x][this.NOTE_ID] = this.m_openId;
                this.m_xList[this.m_xList.length] = p_x;
                this.m_yList[this.m_yList.length] = p_y;
                this.m_dList[this.m_dList.length] = p_d;
                this.m_pathScoreList[this.m_pathScoreList.length] = p_score;
                this.m_movementCostList[this.m_movementCostList.length] = p_cost;
                this.m_fatherList[this.m_fatherList.length] = p_fatherId;
                this.m_openList[this.m_openList.length] = this.m_openId;
                this.aheadNote(this.m_openCount);
            };
            /**
             * @private
             * 将节点加入关闭列表
             */
            AStar.prototype.closeNote = function (p_id) {
                this.m_openCount--;
                var noteX = this.m_xList[p_id];
                var noteY = this.m_yList[p_id];
                this.m_noteMap[noteY][noteX][this.NOTE_OPEN] = false;
                this.m_noteMap[noteY][noteX][this.NOTE_CLOSED] = true;
                if (this.m_openCount <= 0) {
                    this.m_openCount = 0;
                    this.m_openList = [];
                    return;
                }
                this.m_openList[0] = this.m_openList.pop();
                this.backNote();
            };
            /**
             * @private
             * 将(新加入开放别表或修改了路径评分的)节点向前移动
             */
            AStar.prototype.aheadNote = function (p_index) {
                var father;
                var change;
                while (p_index > 1) {
                    //父节点的位置
                    father = Math.floor(p_index / 2);
                    //如果该节点的F值小于父节点的F值则和父节点交换
                    if (this.getScore(p_index) <= this.getScore(father)) {
                        change = this.m_openList[p_index - 1];
                        this.m_openList[p_index - 1] = this.m_openList[father - 1];
                        this.m_openList[father - 1] = change;
                        p_index = father;
                    }
                    else {
                        break;
                    }
                }
            };
            /**
             * @private
             * 将(取出开启列表中路径评分最低的节点后从队尾移到最前的)节点向后移动
             */
            AStar.prototype.backNote = function () {
                //尾部的节点被移到最前面
                var checkIndex = 1;
                var tmp;
                var change;
                var maxTitl = 5000;
                var curTitl = 0;
                while (true) {
                    curTitl++;
                    if (curTitl > maxTitl) {
                        loge("AStar.backNote异常，超过了循环最大限制。");
                        // return;
                    }
                    tmp = checkIndex;
                    //如果有子节点
                    if (2 * tmp <= this.m_openCount) {
                        //如果子节点的F值更小
                        if (this.getScore(checkIndex) > this.getScore(2 * tmp)) {
                            //记节点的新位置为子节点位置
                            checkIndex = 2 * tmp;
                        }
                        //如果有两个子节点
                        if (2 * tmp + 1 <= this.m_openCount) {
                            //如果第二个子节点F值更小
                            if (this.getScore(checkIndex) > this.getScore(2 * tmp + 1)) {
                                //更新节点新位置为第二个子节点位置
                                checkIndex = 2 * tmp + 1;
                            }
                        }
                    }
                    //如果节点位置没有更新结束排序
                    if (tmp == checkIndex) {
                        break;
                    }
                    //反之和新位置交换，继续和新位置的子节点比较F值
                    else {
                        change = this.m_openList[tmp - 1];
                        this.m_openList[tmp - 1] = this.m_openList[checkIndex - 1];
                        this.m_openList[checkIndex - 1] = change;
                    }
                }
            };
            /**
             * @private
             * 判断某节点是否在开放列表
             */
            AStar.prototype.isOpen = function (p_x, p_y) {
                if (this.m_noteMap[p_y] == null)
                    return false;
                if (this.m_noteMap[p_y][p_x] == null)
                    return false;
                return this.m_noteMap[p_y][p_x][this.NOTE_OPEN];
            };
            /**
             * @private
             * 判断某节点是否在关闭列表中
             */
            AStar.prototype.isClosed = function (p_x, p_y) {
                if (this.m_noteMap[p_y] == null)
                    return false;
                if (this.m_noteMap[p_y][p_x] == null)
                    return false;
                return this.m_noteMap[p_y][p_x][this.NOTE_CLOSED];
            };
            /**
             * @private
             * 获取某节点的周围节点，排除不能通过和已在关闭列表中的
             */
            AStar.prototype.getArounds = function (p_x, p_y) {
                var arr = new Array();
                var checkX;
                var checkY;
                var canDiagonal;
                //右
                checkX = p_x + 1;
                checkY = p_y;
                var canRight = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
                if (canRight && !this.isClosed(checkX, checkY)) {
                    arr.push([checkX, checkY, utils.Direct.RIGHT]);
                }
                //下
                checkX = p_x;
                checkY = p_y + 1;
                var canDown = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
                if (canDown && !this.isClosed(checkX, checkY)) {
                    arr.push([checkX, checkY, utils.Direct.BOTTOM]);
                }
                //左
                checkX = p_x - 1;
                checkY = p_y;
                var canLeft = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
                if (canLeft && !this.isClosed(checkX, checkY)) {
                    arr.push([checkX, checkY, utils.Direct.LEFT]);
                }
                //上
                checkX = p_x;
                checkY = p_y - 1;
                var canUp = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
                if (canUp && !this.isClosed(checkX, checkY)) {
                    arr.push([checkX, checkY, utils.Direct.UP]);
                }
                //右下
                checkX = p_x + 1;
                checkY = p_y + 1;
                canDiagonal = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
                if (canDiagonal && !this.isClosed(checkX, checkY)) {
                    arr.push([checkX, checkY, utils.Direct.BOTTOM_RIGHT]);
                }
                //左下
                checkX = p_x - 1;
                checkY = p_y + 1;
                canDiagonal = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
                if (canDiagonal && !this.isClosed(checkX, checkY)) {
                    arr.push([checkX, checkY, utils.Direct.BOTTOM_LEFT]);
                }
                //左上
                checkX = p_x - 1;
                checkY = p_y - 1;
                canDiagonal = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
                if (canDiagonal && !this.isClosed(checkX, checkY)) {
                    arr.push([checkX, checkY, utils.Direct.UPPER_LEFT]);
                }
                //右上
                checkX = p_x + 1;
                checkY = p_y - 1;
                canDiagonal = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
                if (canDiagonal && !this.isClosed(checkX, checkY)) {
                    arr.push([checkX, checkY, utils.Direct.UPPER_RIGHT]);
                }
                return arr;
            };
            /**
             * @private
             * 获取路径
             *
             * @param p_startX    起始点X坐标
             * @param p_startY    起始点Y坐标
             * @param p_id        终点的ID
             *
             * @return             路径坐标(Point)数组
             */
            AStar.prototype.getPath = function (p_startX, p_startY, p_id) {
                var arr = new Array();
                var noteX = this.m_xList[p_id];
                var noteY = this.m_yList[p_id];
                var prve_p_id = p_id;
                //允许最大的过期次数
                var maxTTL = 20000;
                //过期次数
                var ttl = 0;
                while (noteX != p_startX || noteY != p_startY) {
                    ttl++;
                    if (ttl >= maxTTL) {
                        loge("AStar.find3，TTL超过最大次数：" + maxTTL.toString());
                        return null;
                    }
                    arr.unshift([noteX, noteY, this.m_dList[prve_p_id]]);
                    prve_p_id = p_id;
                    p_id = this.m_fatherList[p_id];
                    noteX = this.m_xList[p_id];
                    noteY = this.m_yList[p_id];
                }
                arr.unshift([p_startX, p_startY, this.m_dList[prve_p_id]]);
                this.destroyLists();
                return arr;
            };
            /**
             * @private
             * 获取某节点的路径评分
             *
             * @param p_index    节点在开启列表中的索引(从1开始)
             */
            AStar.prototype.getScore = function (p_index) {
                return this.m_pathScoreList[this.m_openList[p_index - 1]];
            };
            /**
             * @private
             * 初始化数组
             */
            AStar.prototype.initLists = function () {
                this.m_openList = [];
                this.m_xList = [];
                this.m_yList = [];
                this.m_dList = [];
                this.m_pathScoreList = [];
                this.m_movementCostList = [];
                this.m_fatherList = [];
                this.m_noteMap = [];
            };
            /**
             * @private
             * 销毁数组
             */
            AStar.prototype.destroyLists = function () {
                this.m_openList = null;
                this.m_xList = null;
                this.m_yList = null;
                this.m_dList = null;
                this.m_pathScoreList = null;
                this.m_movementCostList = null;
                this.m_fatherList = null;
                this.m_noteMap = null;
            };
            AStar.prototype.findByStraightLine = function (startX, startY, endX, endY) {
                if (startX == endX && startY == endY) {
                    //都到了就不处理了
                    return null;
                }
                if (this.m_mapTileModel.canTransit(startX, startY, endX, endY)) {
                    var path = new Array();
                    path.push(startX);
                    path.push(startY);
                    path.push(endX);
                    path.push(endY);
                    return path;
                }
                return null;
            };
            /**
            * 直线寻路，并转为八方向路线
            * @param startX
            * @param startY
            * @param endX
            * @param endY
            * @return
            */
            AStar.prototype.findByLine = function (x0, y0, x1, y1) {
                if (x0 == x1 && y0 == y1) {
                    //都到了就不处理了
                    return null;
                }
                var path = new Array();
                var dx = Math.abs(x1 - x0);
                var dy = -Math.abs(y1 - y0);
                var sx = x0 < x1 ? 1 : -1;
                var sy = y0 < y1 ? 1 : -1;
                var sx1 = sx, sy1 = sy;
                var err = dx + dy;
                var e2; /* error value e_xy */
                //允许最大的过期次数
                var maxTTL = 3000;
                //过期次数
                var ttl = 0;
                //朝向判断，先给一个不可能的值，这样才会压入第一点
                var x_change = 3, y_change = 3;
                while (true) /* loop */ {
                    if (ttl >= maxTTL) {
                        loge("MapData:MapData.canTransit,TTL more than MAX:" + maxTTL.toString());
                        return null;
                    }
                    ttl++;
                    //如果是路障，表示两点直线不可通过
                    if (!this.m_mapTileModel.isBlock(0, 0, x0, y0))
                        return null;
                    if (x0 == x1 && y0 == y1)
                        break;
                    e2 = 2 * err;
                    var xx = x0, yy = y0;
                    if (e2 >= dy) {
                        err += dy;
                        x0 += sx;
                    } /* e_xy+e_x > 0 */
                    if (e2 <= dx) {
                        err += dx;
                        y0 += sy;
                    } /* e_xy+e_y < 0 */
                    //朝向发生该表，压入点
                    if (x_change != x0 - xx || y_change != y0 - yy) {
                        path.push(xx);
                        path.push(yy);
                        x_change = x0 - xx;
                        y_change = y0 - yy;
                    }
                }
                path.push(x1);
                path.push(y1);
                return path;
            };
            return AStar;
        }());
        utils.AStar = AStar;
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=PathAlgorithm.js.map