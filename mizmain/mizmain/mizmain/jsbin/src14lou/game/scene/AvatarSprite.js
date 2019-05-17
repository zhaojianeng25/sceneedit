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
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene_1) {
        var AvatarSprite = /** @class */ (function (_super) {
            __extends(AvatarSprite, _super);
            function AvatarSprite(scene3d, pUnit) {
                var _this = _super.call(this, scene3d) || this;
                _this._multi_items_mix = new Array();
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
                _this._linkage = new scene_1.AvatarLinkage();
                /*启用休闲动作*/
                _this._enableLeisureAction = false;
                //面部最终朝向
                _this._targetFaceTo = -1;
                //面部当前朝向
                _this._faceto = 0;
                /*动作姿态*/
                _this._actionStatus = 0;
                /*坐骑状态*/
                _this._isRiding = false;
                // 坐骑的高度
                _this._rideHeight = 0;
                // 死亡时间
                _this._dieTimer = 0;
                //开启绘制残影
                _this._openDrawGhost = false;
                //老坐标地址
                _this._oldUnitPos = new Vector2(0, 0);
                _this._whiteTime = 0;
                // 碰撞信息
                _this._hitRect = new Rectangle();
                _this._imitateMoveType = 0;
                /*模拟移动阶段进度*/
                _this.imitateMoveProgress = 0;
                /*真正的x位置*/
                _this._realPosX = 0;
                /*真正的y位置*/
                _this._realPosY = 0;
                _this.unit = pUnit;
                _this._oid = pUnit.oid;
                _this._pos.set(_this.unit.pos);
                _this._singleItem_mix = new Matrix();
                //生存状态发生改变
                _this.unit.onLiveStatusChange = function (liveStatus) {
                    _this.updateLiveStatus(liveStatus);
                };
                _this.updateLiveStatus();
                return _this;
            }
            Object.defineProperty(AvatarSprite.prototype, "faceto", {
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
            Object.defineProperty(AvatarSprite.prototype, "animationSpeed", {
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
                    this._frameTime = this._singleItem && (this.actionStatus == scene_1.AvatarData.STATE_RUNNING) ? 100 : 1000 / Math.round(this._frameRate * this._animationSpeed);
                    //完整动画时长
                    this._totalTime = this._frameTime * this._frameCount;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarSprite.prototype, "actionStatus", {
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
            Object.defineProperty(AvatarSprite.prototype, "isRiding", {
                get: function () {
                    return this._isRiding;
                },
                set: function (v) {
                    this._isRiding = v;
                    // this.unit.isRiding = v;
                    this._rideHeight = v ? 80 : 0;
                    this.updateSortScore();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarSprite.prototype, "rideHeight", {
                //获取坐骑高度
                get: function () {
                    return this._rideHeight;
                },
                enumerable: true,
                configurable: true
            });
            //升空多高
            AvatarSprite.prototype.flyToSky = function (value) {
                this._rideHeight = value;
            };
            Object.defineProperty(AvatarSprite.prototype, "oid", {
                get: function () {
                    return this._oid;
                },
                enumerable: true,
                configurable: true
            });
            //更新生成状态
            AvatarSprite.prototype.updateLiveStatus = function (liveStatus) {
                if (liveStatus === void 0) { liveStatus = null; }
                if (this.unit.isDied) {
                    if (liveStatus && !this.unit.isGameObject) {
                        this._dieTimer = Laya.timer.currTimer + AvatarSprite.DIE_DELATTIMER;
                    }
                    else {
                        this._dieTimer = 0;
                        this.setVisible(false);
                    }
                }
                else {
                    this._dieTimer = 0;
                    this.setVisible(true);
                    this.stopImitateMove();
                }
                //深度排序
                this.updateSortScore();
            };
            Object.defineProperty(AvatarSprite.prototype, "openDrawGhost", {
                set: function (v) {
                    this._openDrawGhost = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarSprite.prototype, "ghostPosX", {
                get: function () {
                    return this._ghostPosX;
                },
                set: function (v) {
                    this._pos.x = v;
                    this._ghostPosX = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarSprite.prototype, "ghostPosY", {
                get: function () {
                    return this._ghostPosY;
                },
                set: function (v) {
                    this._pos.y = v;
                    this._ghostPosY = v;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 加载
             * @param fullName 完整名称
             *
             */
            AvatarSprite.prototype.loadItem = function (fullName) {
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
                    this._singleItem = scene_1.AvatarItem.Get(fullName);
                    this._singleItem.retain();
                    this._itemInvalided = true;
                }
            };
            /*是否播放进行中*/
            AvatarSprite.prototype.isActionPlaying = function () {
                return this._runTime < this._totalTime || this._drawInfoInvalided;
            };
            /**
             * 获得血量百分比，如果-1，则不显示。0-1之间显示
             */
            AvatarSprite.prototype.GetHealthViewPI = function () {
                var pi = -1;
                var unit = this.unit;
                if (!unit.isDied) {
                    if (unit.isMonster || unit.isPet || unit instanceof FakeUnit) {
                        pi = unit.hp / unit.maxHp;
                        if ((unit instanceof FakeUnit && unit.isBattleRole) || pi != 1)
                            return pi;
                    }
                    else if (unit.isPlayer) {
                        pi = unit.hp / unit.maxHp;
                        pi = pi > 1 ? 1 : pi < 0 ? 0 : pi;
                        return pi;
                    }
                }
                return -1;
            };
            /**
             * 获得怒气百分比，如果-1，则不显示。0-1之间显示
             */
            AvatarSprite.prototype.GetAngerViewPI = function () {
                var pi = -1;
                var unit = this.unit;
                if (!unit.isDied) {
                    if (unit.isMonster || unit.isPet || unit instanceof FakeUnit) {
                        pi = unit.anger / unit.maxAnger;
                        pi = pi > 1 ? 1 : pi < 0 ? 0 : pi;
                        if ((unit instanceof FakeUnit && unit.isBattleRole) || pi != 1)
                            return pi;
                    }
                    else if (unit.isPlayer) {
                        pi = unit.anger / unit.maxAnger;
                        pi = pi > 1 ? 1 : pi < 0 ? 0 : pi;
                        return pi;
                    }
                }
                return -1;
            };
            /*让显示失效*/
            AvatarSprite.prototype.invaliDrawInfo = function () {
                this._drawInfoInvalided = true;
            };
            // 追加动作状态 
            AvatarSprite.prototype.attachActionStatus = function (atnStus) {
                if (atnStus == scene_1.AvatarData.STATE_BEATEN) {
                    if (this.actionStatus == scene_1.AvatarData.STATE_ATTACKGO || this.actionStatus == scene_1.AvatarData.STATE_ATTACKGO2 ||
                        this.actionStatus == scene_1.AvatarData.STATE_ATTACKGO3 ||
                        this.actionStatus == scene_1.AvatarData.STATE_MACGO ||
                        this.actionStatus == scene_1.AvatarData.STATE_GECAO ||
                        this.actionStatus == scene_1.AvatarData.STATE_ATTCKREADY ||
                        this.actionStatus == scene_1.AvatarData.STATE_GECAO_2)
                        return;
                }
                this.actionStatus = atnStus;
            };
            // 受击
            AvatarSprite.prototype.onBeaten = function (scene, toward, type, data, isbottom) {
                if (isbottom === void 0) { isbottom = false; }
                //if (hp <= 0) {
                //this._dieTimer = Laya.timer.currTimer + 850;
                // if (this.unit.isMonster) {
                // 	// 有几率击飞
                // 	Random.scand(values * this.unit.oid);
                // 	let randNun = Random.randFloat();
                // 	// randNun = 0
                // 	if (randNun < 0.4) {
                // 击飞了
                //this.beatBackFly(toward);
                //}
                //}
                //	}
                // Laya.timer.once(230, this, this.__onBeaten, [scene, toward, atk_type, values, hp]);
                this.__onBeaten(scene, toward, type, data, isbottom);
            };
            AvatarSprite.prototype.__onBeaten = function (scene, toward, type, data, isbottom) {
                if (isbottom === void 0) { isbottom = false; }
                if (!this.unit) {
                    return;
                }
                // 追加动作
                // this.attachActionStatus(AvatarData.STATE_BEATEN);
                if (this.unit instanceof FakeUnit && !this.unit.needBeatenEffect)
                    return; //假的不需要受击特效
                var effect;
                if (!this.unit.isPlayer) {
                    switch (type) {
                        case UnitField.HIT_MISS:
                            break;
                        default:
                            effect = ObjectPools.malloc(scene_1.EffectFrame, null, 4, 12);
                            effect.setData('beaten');
                            // effect.anchorObject = this.unit;
                            effect.anchorPostion = this.unit.pos;
                            effect.scale = this._scale;
                            effect.setOffset(0, -this.headHeight / 5 * 4);
                            break;
                    }
                    if (effect) {
                        scene.addEffect(effect);
                    }
                }
            };
            // 绘制之前数据更新 
            AvatarSprite.prototype.onDrawBefore = function (diff, scene) {
                // 更新变换信息
                this.updateTransform(scene, diff);
                var x = this._pos.x;
                var y = this._pos.y;
                //绘制位置运算
                this._drawX = scene.camera.getScenePxByCellX(x);
                this._drawY = scene.camera.getScenePxByCellY(y);
                //深度排序
                if (x != this._oldUnitPos.x || y != this._oldUnitPos.y) {
                    //重置变量
                    this._oldUnitPos.x = x;
                    this._oldUnitPos.y = y;
                    //是否处于透明层
                    var mapData = scene.app.sceneObjectMgr.mapAssetInfo;
                    var __x = MathU.parseInt(x);
                    var __y = MathU.parseInt(y);
                    // 是否在水上
                    this._atWaterLayer = mapData.isWater(__x, __y);
                    // 是否在透明点上
                    this._atTranLayer = mapData.isTran(__x, __y);
                    this.updateSortScore();
                }
                // 动作更新
                this.updateActionStatus();
                // 更新面部朝向
                this.updateFaceTo(diff);
            };
            // 更新变换信息
            AvatarSprite.prototype.updateTransform = function (scene, diff) {
                // 模拟移动进行的百分比
                var imitateMoveRate = -1;
                if (this.imitateMoving) {
                    // 模拟移动中
                    var tempTime = Laya.timer.currTimer - this._imitateMoveDelayTime - this._imitateMoveStarTime;
                    if (tempTime < 0)
                        tempTime = 0;
                    if (tempTime >= this._imitateMoveTotalTime) {
                        if (this.isBeatFlying) {
                            // 击飞还得等下死亡才能真正结束
                            if (tempTime - this._imitateMoveTotalTime > 1500) {
                                this.stopImitateMove();
                            }
                            else {
                                imitateMoveRate = 0.99;
                            }
                        }
                        else {
                            this.stopImitateMove();
                        }
                    }
                    else {
                        imitateMoveRate = tempTime / this._imitateMoveTotalTime;
                        switch (this.imitateMoveProgress) {
                            case AvatarSprite.IMITATEMOVE_PROGRESS_0:
                                if (imitateMoveRate > 13 / 21) {
                                    // 第一阶段完成
                                    this.imitateMoveProgress = AvatarSprite.IMITATEMOVE_PROGRESS_2;
                                }
                                break;
                            case AvatarSprite.IMITATEMOVE_PROGRESS_2:
                                // 触发坠落
                                this.imitateMoveProgress = AvatarSprite.IMITATEMOVE_PROGRESS_3;
                                this.dropGround(scene);
                                break;
                        }
                    }
                }
                // 更新位置
                this.updatePostion(imitateMoveRate);
                // 更新缩放信息
                this.updateScale(scene, imitateMoveRate);
                // 更新透明度
                this.updateAlpha();
                // 更新发光特性
                this.enableWhiteFilter = this._whiteTime > 0;
                this.enableWhiteFilter && (this._whiteTime -= diff);
            };
            // 更新位置
            AvatarSprite.prototype.updatePostion = function (imitateMoveRate) {
                if (this._imitateMoveType == AvatarSprite.IMITATE_MOVE_TYPE_JUMP)
                    return;
                if (imitateMoveRate != -1) {
                    if (this._imitateMoveOffsetX && this._imitateMoveOffsetX.length) {
                        var pos_1 = Math.floor(imitateMoveRate * this._imitateMoveOffsetX.length);
                        this._pos.x = this._imitateMoveStartX + this._imitateMoveOffsetX[pos_1] / 1.5;
                    }
                    else {
                        this._pos.x = this._imitateMoveStartX + imitateMoveRate * this._imitateMoveGapX;
                    }
                    if (this._imitateMoveOffsetY && this._imitateMoveOffsetY.length) {
                        var pos_2 = Math.floor(imitateMoveRate * this._imitateMoveOffsetX.length);
                        this._pos.y = this._imitateMoveStartY + this._imitateMoveOffsetY[pos_2] / 1.5;
                    }
                    else {
                        this._pos.y = this._imitateMoveStartY + imitateMoveRate * this._imitateMoveGapY;
                    }
                }
                else if (this._ghostPosX && this._ghostPosX > 0 && this._ghostPosY && this._ghostPosY > 0) {
                }
                else {
                    this._pos.set(this.unit.pos);
                }
            };
            // 更新缩放
            AvatarSprite.prototype.updateScale = function (scene, imitateMoveRate) {
                this._scale = 1;
                if (imitateMoveRate != -1) {
                    if (this._imitateMoveCorrectScale) {
                        var len = this._imitateMoveCorrectScale.length;
                        var pos = Math.floor(imitateMoveRate * len);
                        this._scale *= this._imitateMoveCorrectScale[pos];
                    }
                }
            };
            // 更新透明度
            AvatarSprite.prototype.updateAlpha = function () {
                var currTimer = Laya.timer.currTimer;
                var dispearIng = false;
                if (this._dieTimer > 0 && this._dieTimer < currTimer) {
                    dispearIng = this._dieTimer + 800 < currTimer;
                    if (dispearIng) {
                        //消失
                        this._drawAlpha -= 0.02;
                        if (this._drawAlpha < 0) {
                            this._drawAlpha = 0;
                            this.setVisible(false);
                        }
                    }
                }
                if (!dispearIng) {
                    this._drawAlpha = this._atTranLayer ? 0.3 : 1;
                }
                return dispearIng;
            };
            // 深度排序
            AvatarSprite.prototype.updateSortScore = function () {
                if (this._isLand) {
                    this._sortStateScore = scene_1.AvatarBase._landScore;
                }
                else if (this.unit.isDied) {
                    this._sortStateScore = scene_1.AvatarBase._diedScore;
                }
                else if (this._isRiding) {
                    this._sortStateScore = scene_1.AvatarBase._floatingScore;
                }
                else {
                    this._sortStateScore = scene_1.AvatarBase._noneScore;
                }
                _super.prototype.updateSortScore.call(this);
            };
            // 更新动作状态
            AvatarSprite.prototype.updateActionStatus = function () {
                var status;
                if (this.isBeatFlying && this.imitateMoveProgress == AvatarSprite.IMITATEMOVE_PROGRESS_0) {
                    // 击飞初始阶段 播放受击动作（没有受击动作）
                    // status = AvatarData.STATE_BEATEN;
                }
                else if (this.unit.isDied) {
                    //游戏对象 侠侣没有死亡动作
                    if (!this.unit.isGameObject) {
                        if (!this._dieTimer) {
                            //死了
                            status = scene_1.AvatarData.STATE_DIED;
                        }
                        else if (this._dieTimer < Laya.timer.currTimer) {
                            //正在死了
                            status = scene_1.AvatarData.STATE_DIING;
                        }
                    }
                }
                else {
                    // 优先动作要播放完毕才能播放其他
                    switch (this.actionStatus) {
                        case scene_1.AvatarData.STATE_DIING: //死亡ing
                        case scene_1.AvatarData.STATE_ATTACKGO: //攻击出击
                        case scene_1.AvatarData.STATE_ATTACKGO2: //攻击出击
                        case scene_1.AvatarData.STATE_ATTACKGO3: //攻击出击
                            if (this.isActionPlaying()) //还在播放则不执行下面的语句
                                return;
                    }
                    // 移动优先
                    if (this.unit.isMoving || this._ghost) {
                        status = scene_1.AvatarData.STATE_RUNNING;
                    }
                    else {
                        // 优先动作要播放完毕才能播放其他
                        switch (this.actionStatus) {
                            case scene_1.AvatarData.STATE_BEATEN: //受击
                            case scene_1.AvatarData.STATE_LEISURE: //休闲
                                if (this.isActionPlaying()) //还在播放则不执行下面的语句
                                    return;
                        }
                        // 如果不能执行休闲动作 那就是站立动作
                        status = this.ranLeisureAction() ? scene_1.AvatarData.STATE_LEISURE : scene_1.AvatarData.STATE_STAND;
                    }
                }
                this.actionStatus = status;
            };
            // 随机播放休闲动作
            AvatarSprite.prototype.ranLeisureAction = function () {
                //启用休闲动作，则随机时间+ 随机动作，随机方向
                if (Laya.timer.currTimer > this._nextLeisureStartTime) {
                    //随机下一次启动的时间
                    this._nextLeisureStartTime = MathU.randomRange(5000, 10000) + Laya.timer.currTimer;
                    return true;
                }
                return false;
            };
            // 更新面部朝向
            AvatarSprite.prototype.updateFaceTo = function (diff) {
                //脸部朝向
                if (this._targetFaceTo == -1) {
                    this.faceto = this.unit.faceToward;
                }
                this.targetFaceTo = this.unit.faceToward;
                /*转身补间*/
                this.turnRoundTween(diff);
            };
            Object.defineProperty(AvatarSprite.prototype, "targetFaceTo", {
                // 面部最终朝向
                set: function (v) {
                    if (this._targetFaceTo == v) {
                        return;
                    }
                    this._targetFaceTo = v;
                },
                enumerable: true,
                configurable: true
            });
            // 面部朝向补间
            AvatarSprite.prototype.turnRoundTween = function (diff) {
                if (this._targetFaceTo == -1 || this._faceto == this._targetFaceTo) {
                    return;
                }
                // 步长
                var step = diff * AvatarSprite.ROTATION_SPEED;
                // 增量
                var add = step;
                // 距离
                var distance = 0;
                if (this._targetFaceTo > this._faceto) {
                    distance = this._targetFaceTo - this._faceto;
                }
                else {
                    distance = this._faceto - this._targetFaceTo;
                    // 增量取反
                    add = -add;
                }
                if (distance > 180) {
                    // 取短边
                    distance = 360 - distance;
                    // 增量取反
                    add = -add;
                }
                if (distance < step) {
                    // 到了
                    this._faceto = this._targetFaceTo;
                }
                else {
                    this._faceto += add;
                }
            };
            // 绘制
            AvatarSprite.prototype.onDraw = function (diff, g, scene) {
                //运行时间累计
                this._runTime += diff;
                // this.onDrawBefore(diff, scene);
                //不显示
                if (!this.isNeedDrawView)
                    return;
                var singleItem = this._singleItem;
                //item为空，下载错误，下载完成，都可以视为变动结束
                if (this._itemInvalided && (!singleItem || singleItem.isLoaded || singleItem.isError)) {
                    this._itemInvalided = false;
                    this.invaliDrawInfo();
                }
                //绘制信息是否失效
                if (this._drawInfoInvalided) {
                    this.drawInfoCalculate();
                }
                if (singleItem) {
                    var texture = void 0;
                    var idx = this.getCurrentIdx();
                    if (idx >= 0 && idx < singleItem.getFrameLength(this._action, this._direct)) {
                        //帧位置
                        var fd_address = scene_1.AvatarItem.getFrameDataAddress(this._action, this._direct, idx);
                        texture = singleItem.getBitmapData(fd_address);
                        this.drawTextureRegX = singleItem.getFrameRegX(fd_address);
                        this.drawTextureRegY = singleItem.getFrameRegY(fd_address) - this._rideHeight;
                    }
                    if (!texture) {
                        texture = scene_1.AvatarBase._unloadTexture;
                        this.drawTextureRegX = -texture.sourceWidth / 2;
                        this.drawTextureRegY = -(texture.height - 5);
                    }
                    this._curRenderMatrix = this._singleItem_mix;
                    this.renderTexture(g, texture, true, scene);
                }
                // //绘制实时影子
                // drawRealShadow();			
                //处水层控制
                this.updateAtWater(scene);
            };
            AvatarSprite.prototype.renderTexture = function (g, texture, isHit, scene) {
                var avatarScale = this._scale;
                var dw = texture.width;
                var dh = texture.height;
                var dx = this._drawX;
                var dy = this._drawY;
                //舞台绘制
                var mix;
                if (this.horizontalFlip) {
                    mix = this._curRenderMatrix;
                    mix.a = -1;
                    if (avatarScale == 1) {
                        mix.tx = this._drawX * 2 - this.drawTextureRegX;
                        mix.ty = this.drawTextureRegY;
                    }
                    else {
                        dw = dw * avatarScale;
                        dh = dh * avatarScale;
                        mix.tx = this._drawX * 2 - this.drawTextureRegX * avatarScale;
                        mix.ty = this.drawTextureRegY * avatarScale;
                    }
                    g.drawTexture(texture, dx, dy, dw, dh, mix, this._drawAlpha);
                }
                else {
                    if (avatarScale == 1) {
                        dx += this.drawTextureRegX;
                        dy += this.drawTextureRegY;
                    }
                    else {
                        dw = dw * avatarScale;
                        dh = dh * avatarScale;
                        dx = this._drawX + this.drawTextureRegX * avatarScale;
                        dy = this._drawY + this.drawTextureRegY * avatarScale;
                    }
                    g.drawTexture(texture, dx, dy, dw, dh, null, this._drawAlpha);
                }
                isHit && this.updateHitRect(texture);
                // this._openDrawGhost = (this.unit == scene.app.sceneObjectMgr.mainUnit);
                if (this._openDrawGhost) {
                    var camera = scene.camera;
                    if (!this._ghost) {
                        this._ghost = new scene_1.Ghost(camera);
                        this._ghost.setting();
                    }
                    var ghostMatrix = void 0;
                    if (mix) {
                        ghostMatrix = mix.clone();
                        ghostMatrix.tx -= this._drawX * 2;
                    }
                    this._ghost.input(camera.getCellXByScene(dx), camera.getCellYByScene(dy), texture, ghostMatrix, this._drawAlpha);
                    this._ghost.output(g);
                }
                else if (this._ghost) {
                    this._ghost.free();
                    this._ghost = null;
                }
            };
            AvatarSprite.prototype.updateHitRect = function (texture) {
                var rect = this._hitRect;
                rect.setTo(0, 0, 0, 0);
                if (!texture) {
                    return;
                }
                rect.width = texture.width * this._scale;
                rect.height = texture.height * this._scale;
                rect.x = this._drawX + this.drawTextureRegX * this._scale;
                rect.y = this._drawY + this.drawTextureRegY * this._scale;
            };
            AvatarSprite.prototype.hitTest = function (xMouse, yMouse, scene, hit3DPos) {
                if (!this._hitRect.width || this._hitRect.height) {
                    this._hitRect.x = ((this._pos.x - scene.camera.logicLeft) * scene_1.SceneRes.CELL_WIDTH - 40);
                    this._hitRect.y = ((this._pos.y - scene.camera.logicTop) * scene_1.SceneRes.CELL_HEIGHT - 160);
                    this._hitRect.width = 80;
                    this._hitRect.height = 160;
                }
                return this._hitRect.contains(xMouse, yMouse);
                /*
                ////////////////// 像素级别碰撞 //////////////////
                let pxX:number = xMouse - left;
                //如果水平翻转
                if(this.horizontalFlip)
                    pxX = rdWidth - pxX;
                
                let pxY:number = yMouse - top;
                let colors:Array<any> = this.drawTexture.getPixels(MathU.parseInt(pxX), MathU.parseInt(pxY), 1, 1);
                //取出透明值
                //logd(colors);
                return colors[3] > 10;*/
                // return true;
            };
            // 绘制信息计算 
            AvatarSprite.prototype.drawInfoCalculate = function () {
                var pos;
                //有效
                this._drawInfoInvalided = false;
                //镜像表里检索
                var params = scene_1.AvatarData.IMAGE_TABLE[this._faceto];
                if (!params)
                    return;
                //设置方向
                this._direct = params[0];
                //设置是否镜像
                this.horizontalFlip = params[1];
                //通过动作状态获得动作枚举
                this._action = scene_1.AvatarData.ConvertAction(this.actionStatus, this.isRiding);
                //重置绘制时间
                this._runTime = 0;
                ///////////// 怪物类和变身换肤类 /////////////////
                if (this._singleItem) {
                    //判断动作是否存在
                    if (this._singleItem.isNonentityAction(this._action)) {
                        //取不到攻击准备动作，则直接使用站立动作
                        if (this.actionStatus == scene_1.AvatarData.STATE_ATTCKREADY)
                            this._action = scene_1.AvatarData.ACTION_STAND;
                    }
                    /*获取当前动作*/
                    var frameCount = this._singleItem.getFrameLength(this._action, this._direct);
                    //				if(frameCount ==0)
                    //					trace("AvatarSprite.drawInfoCalculate函数中，变量frameCount:"+_frameCount+"，名字"+(this as Object).unit.getName());
                    if (frameCount != 0) {
                        //设置帧长
                        this._frameCount = frameCount;
                        //设置帧速
                        this._frameRate = 7;
                        //循环与否直接拿任意一个角色数据来用即可
                        pos = scene_1.AvatarData.GetFrameInfoPos(1, this._action);
                        //是否循环播放
                        this.Loop = (scene_1.AvatarData.GetFrameInfo(pos + scene_1.AvatarData.FRAMEINFO_LOOP) == 1);
                        //一组动画移动像素
                        this._ani_move_Speed = 40;
                    }
                }
                //////////////////////// 装备混合类 ///////////////////////////
                else {
                    ///////////////// 获取动作信息 ////////////////
                    //帧起始位置
                    var a_stuas = scene_1.AvatarData.ConvertActionSort(this.actionStatus, this.isRiding);
                    pos = scene_1.AvatarData.GetFrameInfoPos(this.unit.sex, a_stuas);
                    //帧是否存在
                    if (scene_1.AvatarData.GetFrameInfo(pos + scene_1.AvatarData.FRAMEINFO_EXITS) == 0)
                        return;
                    //设置帧长
                    this._frameCount = scene_1.AvatarData.GetFrameInfo(pos + scene_1.AvatarData.FRAMEINFO_COUNT);
                    if (this._frameCount == 0)
                        loge("_frameCount:" + this._frameCount);
                    //设置帧速
                    this._frameRate = scene_1.AvatarData.GetFrameInfo(pos + scene_1.AvatarData.FRAMEINFO_RATE);
                    //最后帧索引
                    this._frameLastIdx = this._frameCount - 1;
                    //是否循环播放
                    this.Loop = (scene_1.AvatarData.GetFrameInfo(pos + scene_1.AvatarData.FRAMEINFO_LOOP) == 1);
                    //动画对应移动的基础速度
                    this._ani_move_Speed = scene_1.AvatarData.GetFrameInfo(pos + scene_1.AvatarData.FRAMEINFO_MOVESPEED);
                }
                //最后一帧
                this._frameLastIdx = this._frameCount - 1;
                /*重置速度为未加速*/
                if (this.actionStatus == scene_1.AvatarData.STATE_RUNNING) {
                    // if(this._ani_move_Speed==0)
                    // 	this._ani_move_Speed = 40;
                    this.animationSpeed = this.unit.speed / this._ani_move_Speed;
                }
                else {
                    //默认速度为1
                    this.animationSpeed = 1;
                }
            };
            // 获得当前帧
            AvatarSprite.prototype.getCurrentIdx = function () {
                if (this.actionStatus == scene_1.AvatarData.STATE_DIED || (this._ghost && this.actionStatus == scene_1.AvatarData.STATE_RUNNING))
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
            // 处水层控制
            AvatarSprite.prototype.updateAtWater = function (scene) { };
            Object.defineProperty(AvatarSprite.prototype, "imitateMoving", {
                // 是否模拟移动	
                get: function () {
                    return this._imitateMoveType != AvatarSprite.IMITATE_MOVE_TYPE_NONE;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarSprite.prototype, "isBeatFlying", {
                // 是否处于被击飞过程中
                get: function () {
                    return this._imitateMoveType == AvatarSprite.IMITATE_MOVE_TYPE_BEATFLY;
                },
                enumerable: true,
                configurable: true
            });
            // 坠地
            AvatarSprite.prototype.dropGround = function (scene) {
            };
            // 执行模拟移动
            AvatarSprite.prototype.doImitateMove = function (dstx, dsty, type, totalTime, delay) {
                if (delay === void 0) { delay = 0; }
                this.endAll();
                this._imitateMoveType = type;
                // //调整朝向
                // switch(type){
                // 	case AvatarSprite.IMITATE_MOVE_TYPE_BEATBACK:
                // 	case AvatarSprite.IMITATE_MOVE_TYPE_BEATFLY:
                // 	case AvatarSprite.IMITATE_MOVE_TYPE_XUANYUN:
                // 		this.turnReversePoint(dstx, dsty);
                // 		break;
                // 	case AvatarSprite.IMITATE_MOVE_TYPE_ASSAULT:
                // 		break;
                // 	default:
                // 		this.turnPoint(dstx, dsty);
                // 		break
                // }
                //时间
                this._imitateMoveStarTime = Laya.timer.currTimer;
                this._imitateMoveTotalTime = totalTime;
                this._imitateMoveDelayTime = delay;
                //位置
                this._imitateMoveStartX = this._pos.x;
                this._imitateMoveStartY = this._pos.y;
                this._imitateMoveEndX = dstx;
                this._imitateMoveEndY = dsty;
                this._imitateMoveGapX = this._imitateMoveEndX - this._imitateMoveStartX;
                this._imitateMoveGapY = this._imitateMoveEndY - this._imitateMoveStartY;
                this._realPosX = this._imitateMoveEndX; //最后位置
                this._realPosY = this._imitateMoveEndY; //最后位置
                switch (type) {
                    case AvatarSprite.IMITATE_MOVE_TYPE_JUMP:
                        //播放跳的声音
                        //					currentDomain.soundMgr.play(Config.soundPath + "jump.mp3", postion);
                        //					display.ghostCounter++;
                        //					display.ghost.setting();
                        break;
                    case AvatarSprite.IMITATE_MOVE_TYPE_BEATBACK:
                        break;
                    case AvatarSprite.IMITATE_MOVE_TYPE_BEATFLY:
                        break;
                    case AvatarSprite.IMITATE_MOVE_TYPE_ASSAULT:
                        //					display.ghostCounter++;
                        //					display.ghost.setting();
                        break;
                    case AvatarSprite.IMITATE_MOVE_TYPE_SUNYI:
                        break;
                }
                return false;
            };
            /**
             * 结束所有行为动作
             */
            AvatarSprite.prototype.endAll = function () {
                // //移动停止
                // if(isMoving)
                // 	stopExec();
                //虚拟移动停止
                if (this.imitateMoving)
                    this.stopImitateMove();
            };
            /*结束模拟移动*/
            AvatarSprite.prototype.stopImitateMove = function () {
                // 			switch(this._imitateMoveType){
                // //				case AvatarSprite.IMITATE_MOVE_TYPE_JUMP:		//跳
                // //					//维护残影计数
                // //					//					display.ghostCounter--;	
                // //					break;
                // 				case AvatarSprite.IMITATE_MOVE_TYPE_ASSAULT:		//冲锋
                // 					//维护残影计数
                // //					display.ghostCounter--;	
                // //					if(spellProxy) spellProxy.onStop();
                // 					break;
                // 				case AvatarSprite.IMITATE_MOVE_TYPE_BEATFLY:		//击飞
                // 					//刷下生存状态
                // 					this.onDeathStateChange(getDeathState());
                // 					break;
                // 			}
                this._imitateMoveType = AvatarSprite.IMITATE_MOVE_TYPE_NONE;
                this._imitateMoveOffsetX = null;
                this._imitateMoveOffsetY = null;
                this._imitateMoveCorrectScale = null;
                // this._scale = 
                this.imitateMoveProgress = AvatarSprite.IMITATEMOVE_PROGRESS_0;
                // todo
                this._pos.x = this._realPosX;
                this._pos.y = this._realPosY;
                this._openDrawGhost = false;
                // logd("位移技能结束")
            };
            //  击飞
            AvatarSprite.prototype.beatBackFly = function (index) {
                //路径
                var flyPaths = scene_1.SceneRes.BEAT_FLY_NORMAL;
                //var direct: number = toward == 35? 0 : 1;		//方向
                var offx = flyPaths[index - 1]; //偏移x[SceneRes.BEAT_FLY_NORMAL 1-28
                var offy = flyPaths[28 /* MAX_ROLE */ + index - 1]; //偏移y[SceneRes.BEAT_FLY_NORMAL 29-56]
                var offscale = flyPaths[28 /* MAX_ROLE */ * 2 + index - 1]; //缩放[SceneRes.BEAT_FLY_NORMAL 57-84]
                //结束位置
                var dstX = this._pos.x + offx[offx.length - 1];
                var dstY = this._pos.y + offy[offy.length - 1];
                // var pt:Point = scene.mapData.getCanTransitPoint(postion.x, postion.y, dstX, dstY);
                // if(pt){
                // 	//更新位置和时间
                // 	var long:Number = postion.getDistance(dstX, dstY);
                // 	_imitateMovePerX = Math.abs((pt.x - postion.x) / (Math.cos(toward) * long));
                // 	_imitateMovePerY = Math.abs((pt.y - postion.y) / (Math.sin(toward) * long));
                // 	dstX = pt.x;
                // 	dstY = pt.y;
                // }
                var totalTime = 33 * offx.length;
                this.doImitateMove(dstX, dstY, AvatarSprite.IMITATE_MOVE_TYPE_BEATFLY, totalTime);
                this._imitateMoveOffsetX = offx;
                this._imitateMoveOffsetY = offy;
                this._imitateMoveCorrectScale = offscale;
            };
            /**
             * 受击后退
             * @param index 站位
             */
            AvatarSprite.prototype.beatBack = function (index) {
                console.log("-------------受击移动", index);
                //路径
                var flyPaths = scene_1.SceneRes.BEATEN_NORMAL;
                // 计算x路径
                index = index < 14 /* MAX_POS */ ? 2 : 0;
                var offx = flyPaths[index]; //偏移x
                var offy = flyPaths[index + 1]; //偏移y
                //结束位置
                var dstX = this._pos.x + offx[offx.length - 1];
                var dstY = this._pos.y + offy[offy.length - 1];
                var totalTime = 90 * offx.length;
                this.doImitateMove(dstX, dstY, AvatarSprite.IMITATE_MOVE_TYPE_BEATBACK, totalTime);
                this._imitateMoveOffsetX = offx;
                this._imitateMoveOffsetY = offy;
            };
            /**
             * 瞬移
             * @param posX
             * @param posY
             * @param time 指定时间 没有就自己算
             */
            AvatarSprite.prototype.shunYi = function (posX, posY, time) {
                if (time === void 0) { time = 0; }
                //需要处理特效表现 绘制残影
                this.openDrawGhost = true;
                var speed = 30;
                var dst = MathU.getDistance(this._pos.x, this._pos.y, posX, posY);
                if (!time)
                    time = dst / speed * 1000;
                // logd("瞬移时间",time)
                this.doImitateMove(posX, posY, AvatarSprite.IMITATE_MOVE_TYPE_SUNYI, time);
                return time;
            };
            AvatarSprite.prototype.jump = function (posX, posY, time) {
                if (time === void 0) { time = 0; }
                this.doImitateMove(posX, posY, AvatarSprite.IMITATE_MOVE_TYPE_JUMP, time);
            };
            AvatarSprite.prototype.clear = function (checkNow) {
                this.stopImitateMove();
                if (this._singleItem) {
                    this._singleItem.release(checkNow);
                    this._singleItem = null;
                }
                if (this._multi_items) {
                    for (var _i = 0, _a = this._multi_items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        item && item.release(checkNow);
                    }
                    this._multi_items.length = 0;
                    this._multi_items = null;
                }
                this._dieTimer = 0;
                this.unit.onLiveStatusChange = null;
                this.unit = null;
                _super.prototype.clear.call(this, checkNow);
            };
            // 死亡延迟时间
            AvatarSprite.DIE_DELATTIMER = 270;
            /*旋转速度*/
            AvatarSprite.ROTATION_SPEED = 1;
            AvatarSprite.IMITATE_MOVE_TYPE_NONE = 0; //没有定义
            AvatarSprite.IMITATE_MOVE_TYPE_BEATBACK = 1; //击退
            AvatarSprite.IMITATE_MOVE_TYPE_BEATFLY = 2; //击飞
            AvatarSprite.IMITATE_MOVE_TYPE_ASSAULT = 3; //冲锋
            AvatarSprite.IMITATE_MOVE_TYPE_ROTATE = 4; //旋转（无相戒指）
            AvatarSprite.IMITATE_MOVE_TYPE_RUN = 5; //跑动
            AvatarSprite.IMITATE_MOVE_TYPE_MOVE = 6; //移动
            AvatarSprite.IMITATE_MOVE_TYPE_XUANYUN = 7; //眩晕后退
            AvatarSprite.IMITATE_MOVE_TYPE_SUNYI = 8; //瞬移
            AvatarSprite.IMITATE_MOVE_TYPE_JUMP = 9; //跳
            /*暂时分4个阶段*/
            AvatarSprite.IMITATEMOVE_PROGRESS_0 = 0; //刚被击飞
            AvatarSprite.IMITATEMOVE_PROGRESS_1 = 1; //要死了
            AvatarSprite.IMITATEMOVE_PROGRESS_2 = 2; //落地
            AvatarSprite.IMITATEMOVE_PROGRESS_3 = 3; //		
            return AvatarSprite;
        }(scene_1.AvatarBase));
        scene_1.AvatarSprite = AvatarSprite;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=AvatarSprite.js.map