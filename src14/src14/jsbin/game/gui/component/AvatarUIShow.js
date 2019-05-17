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
* ui形象展示
*/
var game;
(function (game) {
    var gui;
    (function (gui) {
        var component;
        (function (component) {
            var AvatarUIShow = /** @class */ (function (_super) {
                __extends(AvatarUIShow, _super);
                function AvatarUIShow() {
                    var _this = _super.call(this) || this;
                    //绘制的透明度
                    _this.drawAlpha = 1;
                    _this.drawX = 0;
                    _this.drawY = 0;
                    /**
                     * 是否循环播放
                     */
                    _this.Loop = true;
                    _this.isImageType = false; //是否为单图片类型
                    /*最后一次绘制到现在的时间*/
                    _this._runTime = 0;
                    /*帧率*/
                    _this._frameRate = 1;
                    /*帧时间 帧/ms*/
                    _this._frameTime = 0;
                    /*帧数量*/
                    _this._frameCount = 0;
                    /*动画最后一帧索引*/
                    _this._frameLastIdx = 0;
                    /*动画总时间*/
                    _this._totalTime = 0;
                    /*速度*/
                    _this._animationSpeed = 1.0;
                    //资源连接对象
                    _this._linkage = new game.scene.AvatarLinkage();
                    //面部最终朝向
                    _this._targetFaceTo = -1;
                    //面部当前朝向
                    _this._faceto = 0;
                    /*动作姿态*/
                    _this._actionStatus = 0;
                    /*坐骑状态*/
                    _this.isRiding = false;
                    _this.mouseEnabled = false;
                    return _this;
                }
                Object.defineProperty(AvatarUIShow.prototype, "faceto", {
                    /**
                     * 脸部朝向 8方向
                     */
                    get: function () {
                        return this._faceto;
                    },
                    /**
                     * @private
                     */
                    set: function (value) {
                        if (this._faceto == value)
                            return;
                        this._faceto = value;
                        this.invaliDrawInfo();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AvatarUIShow.prototype, "animationSpeed", {
                    /**
                     * 获取和设置速度，当前速度的倍速，数值越大，速度越快
                     * @return
                     *
                     */
                    get: function () {
                        return this._animationSpeed;
                    },
                    set: function (value) {
                        this._animationSpeed = value;
                        //计算出每帧的消耗时间
                        this._frameTime = this._singleItem && (this.actionStatus == AvatarData.STATE_RUNNING) ? 100 : 1000 / Math.round(this._frameRate * this._animationSpeed);
                        //完整动画时长
                        this._totalTime = this._frameTime * this._frameCount;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AvatarUIShow.prototype, "actionStatus", {
                    /**
                     * 动作
                     * @return
                     *
                     */
                    get: function () {
                        return this._actionStatus;
                    },
                    set: function (value) {
                        if (this._actionStatus == value)
                            return;
                        this._actionStatus = value;
                        //绘制信息失效
                        this.invaliDrawInfo();
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 加载
                 * @param fullName 完整名称
                 */
                AvatarUIShow.prototype.loadItem = function (fullName) {
                    if (this._singleItem) {
                        // 处理老的
                        if (this._singleItem.itemName == fullName) {
                            return;
                        }
                        this._singleItem.release();
                        this._singleItem = null;
                    }
                    if (fullName && fullName.length > 0) {
                        // 加载新的
                        this._singleItem = AvatarItem.Get(fullName);
                        this._singleItem.retain();
                        this._itemInvalided = true;
                    }
                };
                /*是否播放进行中*/
                AvatarUIShow.prototype.isActionPlaying = function () {
                    return this._runTime < this._totalTime || this._drawInfoInvalided;
                };
                /**
                 * 绘制信息计算
                 *
                 */
                AvatarUIShow.prototype.drawInfoCalculate = function () {
                    var pos;
                    //有效
                    this._drawInfoInvalided = false;
                    //镜像表里检索
                    this._singleItem && this._singleItem.itemName;
                    var params = game.scene.AvatarData.IMAGE_TABLE[this.faceto];
                    //设置方向
                    this._direct = params[0];
                    //设置是否镜像
                    this.horizontalFlip = params[1];
                    //通过动作状态获得动作枚举
                    this._action = AvatarData.ConvertAction(this.actionStatus, this.isRiding);
                    //重置绘制时间
                    this._runTime = 0;
                    ///////////// 怪物类和变身换肤类 /////////////////
                    if (this._singleItem) {
                        //判断动作是否存在
                        if (this._singleItem.isNonentityAction(this._action)) {
                            //取不到攻击准备动作，则直接使用站立动作
                            if (this.actionStatus == AvatarData.STATE_ATTCKREADY)
                                this._action = AvatarData.ACTION_STAND;
                        }
                        /*获取当前动作*/
                        var frameCount = this._singleItem.getFrameLength(this._action, this._direct);
                        //				if(frameCount ==0)
                        //					trace("AvatarSprite.drawInfoCalculate函数中，变量frameCount:"+_frameCount+"，名字"+(this as Object).unit.getName());
                        if (frameCount != 0) {
                            //设置帧长
                            this._frameCount = frameCount;
                            //设置帧速
                            this._frameRate = 5;
                            //循环与否直接拿任意一个角色数据来用即可
                            pos = AvatarData.GetFrameInfoPos(1, this._action);
                            //是否循环播放
                            this.Loop = (AvatarData.GetFrameInfo(pos + AvatarData.FRAMEINFO_LOOP) == 1);
                            //一组动画移动像素
                            // this._ani_move_Speed = 40;
                        }
                    }
                    //最后一帧
                    this._frameLastIdx = this._frameCount - 1;
                    //默认速度为1
                    this.animationSpeed = 1;
                };
                /*获得当前帧*/
                AvatarUIShow.prototype.getCurrentIdx = function () {
                    if (this.actionStatus == AvatarData.STATE_DIED)
                        return this._frameLastIdx;
                    //如果不循环，并且时间超过了动画总长，则直接给出最后一张图x
                    if (this.Loop || (this._runTime < this._totalTime)) {
                        //获得无限完整动画循环之后剩余的时间
                        var frameYu = this._runTime % this._totalTime;
                        //定位到帧位置
                        var idx = Math.floor(frameYu / this._frameTime);
                        if (idx >= this._frameCount)
                            return this._frameLastIdx;
                        return idx;
                    }
                    else {
                        return this._frameLastIdx;
                    }
                };
                /*让显示失效*/
                AvatarUIShow.prototype.invaliDrawInfo = function () {
                    this._drawInfoInvalided = true;
                };
                /**
                 * 追加动作状态
                 * @param atnStus
                 */
                AvatarUIShow.prototype.attachActionStatus = function (atnStus) {
                    //如果想改为受击动作，但是当前还处于物理攻击或者魔法攻击(或割草动作)中动作的，忽略受击
                    if (atnStus == AvatarData.STATE_BEATEN) {
                        if (this.actionStatus == AvatarData.STATE_ATTACKGO || this.actionStatus == AvatarData.STATE_ATTACKGO2 ||
                            this.actionStatus == AvatarData.STATE_ATTACKGO3 ||
                            this.actionStatus == AvatarData.STATE_MACGO ||
                            this.actionStatus == AvatarData.STATE_GECAO ||
                            this.actionStatus == AvatarData.STATE_ATTCKREADY || //此动作已做为戳戳戳技能动作
                            this.actionStatus == AvatarData.STATE_GECAO_2)
                            return;
                    }
                    this.actionStatus = atnStus;
                };
                AvatarUIShow.prototype.onDraw = function (diff) {
                    //画布清空
                    this.graphics.clear();
                    //item为空，下载错误，下载完成，都可以视为变动结束
                    if (this._itemInvalided && (!this._singleItem || this._singleItem.isError || this._singleItem.isLoaded)) {
                        this._itemInvalided = false;
                        this.invaliDrawInfo();
                    }
                    //运行时间累计
                    this._runTime += diff;
                    //绘制信息是否失效
                    if (this._drawInfoInvalided) {
                        this.drawInfoCalculate();
                    }
                    if (this._singleItem) {
                        var idx = this.getCurrentIdx();
                        if (idx >= 0 && idx < this._singleItem.getFrameLength(this._action, this._direct)) {
                            //帧位置
                            var fd_address = AvatarItem.getFrameDataAddress(this._action, this._direct, idx);
                            var texture = this.drawTexture = this._singleItem.getBitmapData(fd_address);
                            this.drawTextureRegX = this._singleItem.getFrameRegX(fd_address);
                            this.drawTextureRegY = this._singleItem.getFrameRegY(fd_address);
                            if (texture) {
                                //舞台绘制
                                if (this.horizontalFlip) {
                                    var mix = this._singleItem_mix;
                                    if (!mix)
                                        this._singleItem_mix = mix = new Matrix();
                                    mix.a = -1;
                                    mix.tx = this.drawX * 2 - this.drawTextureRegX;
                                    mix.ty = this.drawTextureRegY;
                                    this.graphics.drawTexture(texture, this.drawX, this.drawY, texture.width, texture.height, mix, this.drawAlpha);
                                }
                                else {
                                    var dx = this.drawX + this.drawTextureRegX;
                                    var dy = this.drawY + this.drawTextureRegY;
                                    this.graphics.drawTexture(texture, dx, dy, texture.width, texture.height, null, this.drawAlpha);
                                }
                            }
                        }
                    }
                };
                AvatarUIShow.prototype.clear = function () {
                    if (this._singleItem) {
                        this._singleItem.release();
                        this._singleItem = null;
                    }
                };
                AvatarUIShow.prototype.destroy = function (destroyChild) {
                    this.clear();
                    _super.prototype.destroy.call(this, destroyChild);
                };
                return AvatarUIShow;
            }(Laya.Sprite));
            component.AvatarUIShow = AvatarUIShow;
        })(component = gui.component || (gui.component = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=AvatarUIShow.js.map