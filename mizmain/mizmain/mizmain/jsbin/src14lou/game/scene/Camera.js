/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Camera = /** @class */ (function () {
            /**
             * 场景对应的摄像机
             * @param scene
             *
             */
            function Camera() {
                /*地震*/
                this._earthShock = new scene.Shock();
                /*摄像头跟随模式*/
                this._mode = Camera.MODE_MANUAL;
                /*摄像机位置*/
                this._worldPostion = new Vector2();
                /**
                 * 手动坐标x和手动坐标y
                 */
                this._manualX = 0;
                this._manualY = 0;
                /**
                 * viewPort宽度
                 */
                this.width = 800;
                /**
                 * viewPort高度
                 */
                this.height = 600;
                /**
                 * 地图像素总宽度
                 */
                this.map_width_px = 0;
                /**
                 * 地图像素总高度
                 */
                this.map_height_px = 0;
                /**
                 * 摄像头的位置x，y,z
                 */
                this._x = 0;
                this._y = 0;
                /**
                 * 是否启用滤镜
                 */
                this.enableFilter = true;
                this.centerPointYOffset = 85;
            }
            Object.defineProperty(Camera.prototype, "isFollow", {
                // 是否跟随模式
                get: function () {
                    return this._mode == Camera.MODE_FOLLOW;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "mode", {
                //设置摄像头模式
                set: function (v) {
                    this._mode = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "worldPostion", {
                get: function () {
                    return this._worldPostion;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "x", {
                get: function () {
                    return this._x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "y", {
                get: function () {
                    return this._y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "isResize", {
                // /**
                //  * 镜头产生移动 
                //  * @return 
                //  * 
                //  */		
                // public get isMove():boolean{
                // 	return this._moveFlag >= Laya.timer.currFrame;
                // }
                /**
                 * 镜头产生移动
                 * @return
                 *
                 */
                get: function () {
                    return this._sizeFlag >= Laya.timer.currFrame;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 设置摄像机可视大小
             * @param newWidth 新高
             * @param newHeight 新宽
             *
             */
            Camera.prototype.setSize = function (newWidth, newHeight) {
                this.width = newWidth;
                this.height = newHeight;
                /*
                enableFilter =
                    Starling.current.viewPort.width <= 1920 &&
                    Starling.current.viewPort.height <= 1080 &&
                    bufferWidth < Starling.current.maxTextureSize &&
                    bufferHeight < Starling.current.maxTextureSize;
                    */
            };
            /**
             * 设置地图像素总大小
             * @param newWidth 新高
             * @param newHeight 新宽
             *
             */
            Camera.prototype.setMapSize = function (newWidth, newHeight) {
                this.map_width_px = newWidth;
                this.map_height_px = newHeight;
            };
            // 切换到跟随模式 
            Camera.prototype.follow = function (pos) {
                //logd('follow', pos)
                this._mode = Camera.MODE_FOLLOW;
                if (this._followPostion != pos) {
                    this._followPostion = pos;
                }
            };
            // 取消跟随点
            Camera.prototype.unFollow = function (pos) {
                if (this._mode != Camera.MODE_FOLLOW) {
                    return;
                }
                if (this._followPostion == pos) {
                    this._followPostion = null;
                }
            };
            /**
             * 摄像头位置的定位中心点位置
             * @param newX 新的x
             * @param newY 新的y
             *
             */
            Camera.prototype.setLeftTopLocation = function (newX, newY) {
                this._mode = Camera.MODE_MANUAL;
                this._manualX = this.centerPointX + newX;
                this._manualY = this.centerPointY + newY;
                this.__location(this._manualX, this._manualY);
            };
            Camera.prototype.setCenterLocation = function (newX, newY) {
                this._mode = Camera.MODE_MANUAL;
                this._manualX = newX;
                this._manualY = newY;
                this.__location(this._manualX, this._manualY);
            };
            /**
             * 设置摄像头的位置，通过逻辑坐标
             * @param newX 逻辑坐标x
             * @param newY 逻辑坐标y
             *
             */
            Camera.prototype.setWorldPostion = function (newX, newY) {
                this._worldPostion.x = newX;
                this._worldPostion.y = newY;
            };
            /*内部函数，设置位置*/
            Camera.prototype.__location = function (newX, newY) {
                this._x = newX;
                this._y = newY;
                //震动效果
                // if(this._earthShock.update()){
                // 	this._x += this._earthShock.offsetX;
                // 	this._y += this._earthShock.offsetY;
                // }
                //震动效果
                if (Pan3d.Scene_data.cam3D.offset.x || Pan3d.Scene_data.cam3D.offset.y) {
                    this._x += 2 * Pan3d.Scene_data.cam3D.offset.x;
                    this._y += 2 * Pan3d.Scene_data.cam3D.offset.y;
                }
                //得出视口的大小
                var bw = Math.min(this.width, this.map_width_px);
                var bh = Math.min(this.height, this.map_height_px);
                //判断窗口是否发生改变
                if (bw != this.bufferWidth || bh != this.bufferHeight)
                    this._sizeFlag = Laya.timer.currFrame;
                //设置窗口大小
                this.bufferWidth = bw;
                this.bufferHeight = bh;
                this.centerPointX = Math.round(this.bufferWidth / 2);
                this.centerPointY = Math.round(this.bufferHeight / 2) + this.centerPointYOffset;
                //左线
                this.bufferLeft = this._x - this.centerPointX;
                //右线
                this.bufferRight = this.bufferLeft + this.bufferWidth;
                //上线
                this.bufferTop = this._y - this.centerPointY;
                //下线
                this.bufferBottom = this.bufferTop + this.bufferHeight;
                //修正
                this.isCorrection = false;
                //控制画面不得超过地图区域
                if (this.bufferLeft < 0) {
                    this.bufferLeft = 0;
                    this.bufferRight = this.bufferWidth;
                    this.isCorrection = true;
                }
                if (this.bufferTop < 0) {
                    this.bufferTop = 0;
                    this.bufferBottom = this.bufferHeight;
                    this.isCorrection = true;
                }
                if (this.width > this.map_width_px) {
                    this.bufferLeft = -(this.width - this.map_width_px) / 2;
                    this.bufferRight = this.bufferLeft + this.map_width_px;
                    this.isCorrection = true;
                }
                else if (this.bufferRight > this.map_width_px) {
                    this.bufferRight = this.map_width_px;
                    this.bufferLeft = this.bufferRight - this.bufferWidth;
                    this.isCorrection = true;
                }
                if (this.height > this.map_height_px) {
                    this.bufferTop = -(this.height - this.map_height_px) / 2;
                    this.bufferBottom = this.bufferTop + this.map_height_px;
                    this.isCorrection = true;
                }
                else if (this.bufferBottom > this.map_height_px) {
                    this.bufferBottom = this.map_height_px;
                    this.bufferTop = this.bufferBottom - this.bufferHeight;
                    this.isCorrection = true;
                }
                if (this.isCorrection) {
                    // 镜头有调整需要重算一下 位置
                    this._x = this.bufferLeft + this.centerPointX;
                    this._y = this.bufferTop + this.centerPointY;
                }
            };
            /**
             * 更新摄像机
             * @param diff 时差
             * @param width 摄像机宽度
             * @param height 摄像机高度
             *
             */
            Camera.prototype.update = function () {
                switch (this._mode) {
                    //跟随模式
                    case Camera.MODE_FOLLOW:
                        this.updateModeFollow();
                        break;
                    //移动模式
                    case Camera.MODE_MOVE:
                        this.updateModeMove();
                        break;
                    //手动模式,直接调用location设置位置
                    case Camera.MODE_MANUAL:
                        this.__location(this._manualX, this._manualY);
                        break;
                }
                if (this.bufferLeft < 0)
                    this.bufferRight = this.bufferWidth;
                if (this.bufferTop < 0)
                    this.bufferBottom = this.bufferHeight;
                //逻辑坐标范围
                this.logicLeft = this.bufferLeft / scene.SceneRes.CELL_WIDTH;
                this.logicRight = this.bufferRight / scene.SceneRes.CELL_WIDTH;
                this.logicTop = this.bufferTop / scene.SceneRes.CELL_HEIGHT;
                this.logicBottom = this.bufferBottom / scene.SceneRes.CELL_HEIGHT;
                //更新逻辑范围，用于lookIn函数
                this.look_logicLeft = this.logicLeft - Camera.LOGIC_INNER_LOOK;
                this.look_logicRight = this.logicRight + Camera.LOGIC_INNER_LOOK;
                this.look_logicTop = this.logicTop - Camera.LOGIC_INNER_LOOK;
                this.look_logicBottom = this.logicBottom + Camera.LOGIC_INNER_LOOK;
            };
            /*移动模式*/
            Camera.prototype.updateModeMove = function () {
                if (this._move_endTime < Laya.timer.currTimer) {
                    this.__location(this._moveDstX, this._moveDstY);
                    return;
                }
                //移动量
                var pi = (Laya.timer.currTimer - this._move_StartTime) / this._move_duration;
                var x = this._moveSrcX + ((this._moveDstX - this._moveSrcX) * pi);
                var y = this._moveSrcY + ((this._moveDstY - this._moveSrcY) * pi);
                //设置摄像头位置
                this.__location(x, y);
            };
            /**
             * 获得基于屏幕的X像素位置，通过逻辑X
             * @param x 逻辑x
             * @return
             */
            Camera.prototype.getScenePxByCellX = function (x) {
                return x * scene.SceneRes.CELL_WIDTH - this.bufferLeft;
            };
            /**
             * 获得基于屏幕的Y像素位置，通过逻辑Y
             * @param y 逻辑y
             * @return
             */
            Camera.prototype.getScenePxByCellY = function (y) {
                return y * scene.SceneRes.CELL_HEIGHT - this.bufferTop;
            };
            /*通过实际像素获得相对于屏幕的位置*/
            Camera.prototype.getSceneX = function (xPX) {
                return xPX - this.bufferLeft;
            };
            /*通过实际像素获得相对于屏幕的位置*/
            Camera.prototype.getSceneY = function (yPX) {
                return yPX - this.bufferTop;
            };
            /**
             * 通过当前屏幕的像素x获得逻辑位置x
             * @param x
             * @return
             *
             */
            Camera.prototype.getCellXByScene = function (x) {
                var v = x + this.bufferLeft;
                return v / scene.SceneRes.CELL_WIDTH;
            };
            /**
             * 通过当前屏幕的像素y获得逻辑位置y
             * @param y
             * @return
             *
             */
            Camera.prototype.getCellYByScene = function (y) {
                var v = y + this.bufferTop;
                return v / scene.SceneRes.CELL_HEIGHT;
            };
            /**
             * 移动到指定的逻辑坐标
             * @param dstLogicX
             * @param dstLogicY
             * @param duration
             *
             */
            Camera.prototype.moveto2 = function (dstLogicX, dstLogicY, duration) {
                this.moveto(scene.SceneRes.CELL_WIDTH * dstLogicX, scene.SceneRes.CELL_HEIGHT * dstLogicY, duration);
            };
            /**
             * 移动到指定的位置
             * @param dstX 目标x 像素单位
             * @param dstY 目标y 像素单位
             * @param duration 时长
             * @param srcX 目标x
             * @param srcY 目标y
             *
             */
            Camera.prototype.moveto = function (dstX, dstY, duration, srcX, srcY) {
                if (srcX === void 0) { srcX = -1; }
                if (srcY === void 0) { srcY = -1; }
                if (srcX == -1 || srcY == -1) {
                    srcX = this._x;
                    srcY = this._y;
                }
                /*记录位置*/
                this._moveSrcX = srcX;
                this._moveSrcY = srcY;
                this._moveDstX = dstX;
                this._moveDstY = dstY;
                this._move_duration = duration;
                //获得角度
                this._move_toward = MathU.getAngle(srcX, srcY, dstX, dstY);
                // //获得距离
                // var distance:Number = MathU.getDistance(srcX, srcY, dstX, dstY);
                //启动时间
                this._move_StartTime = Laya.timer.currTimer;
                //获取停止时间
                this._move_endTime = this._move_StartTime + duration;
                //设置为移动模式
                this._mode = Camera.MODE_MOVE;
            };
            /*更新跟随模式*/
            Camera.prototype.updateModeFollow = function () {
                if (!this._followPostion) {
                    //逻辑坐标范围
                    this.bufferLeft = NaN;
                    this.bufferRight = NaN;
                    this.bufferTop = NaN;
                    this.bufferBottom = NaN;
                    //logd('!this._followPostion', this._worldPostion.x, this._worldPostion.y)
                    return;
                }
                this._worldPostion.x = this._followPostion.x;
                this._worldPostion.y = this._followPostion.y;
                //通过主玩家的实际坐标位置，得到屏幕中央偏移及格子中央偏移			
                var srX = this._worldPostion.x * scene.SceneRes.CELL_WIDTH;
                var srY = this._worldPostion.y * scene.SceneRes.CELL_HEIGHT;
                //设置窗口位置
                this.__location(srX, srY);
            };
            Camera.prototype.lookIn = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var look = false;
                var postionX, postionY;
                switch (args.length) {
                    case 1:
                        if (args[0] instanceof Vector2) {
                            postionX = args[0].x;
                            postionY = args[0].y;
                            look = !(this.look_logicLeft > postionX || this.look_logicRight < postionX || this.look_logicTop > postionY || this.look_logicBottom < postionY);
                        }
                        break;
                    case 2:
                        if (args[0] instanceof Number && args[1] instanceof Number) {
                            postionX = args[0];
                            postionY = args[1];
                            look = !(this.look_logicLeft > postionX || this.look_logicRight < postionX || this.look_logicTop > postionY || this.look_logicBottom < postionY);
                        }
                        break;
                }
                return look;
            };
            Camera.prototype.lookInBuffer = function (x1, y1, width, height) {
                // 判断两矩形是否相交、原理狠简单、如果相交、肯定其中一个矩形的顶点在另一个顶点内、
                var x2 = x1 + width;
                var y2 = y1 + height;
                var x3 = this.bufferLeft;
                var y3 = this.bufferTop;
                var x4 = this.bufferRight;
                var y4 = this.bufferBottom;
                return (((x1 >= x3 && x1 < x4) || (x3 >= x1 && x3 <= x2)) &&
                    ((y1 >= y3 && y1 < y4) || (y3 >= y1 && y3 <= y2))) ? true : false;
            };
            /**
             * 屏幕震动
             * @param duration 持续时间，默认500ms
             *
             */
            Camera.prototype.shock = function (duration) {
                if (duration === void 0) { duration = 250; }
                this._earthShock.start(duration);
            };
            /**
             * 停止屏幕震动
             *
             */
            Camera.prototype.shockStop = function () {
                this._earthShock.stop();
            };
            /*查看范围扩充*/
            Camera.LOGIC_INNER_LOOK = 4;
            /**
             * 摄像头跟随模式
             */
            Camera.MODE_FOLLOW = 0;
            /**
             * 手动模式
             */
            Camera.MODE_MANUAL = 1;
            /**
             * 移动模式 （缓动）
             */
            Camera.MODE_MOVE = 2;
            return Camera;
        }());
        scene.Camera = Camera;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=Camera.js.map