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
* 栈控制器
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var ACotrller = /** @class */ (function (_super) {
            __extends(ACotrller, _super);
            function ACotrller(app) {
                var _this = _super.call(this) || this;
                //是否进行挂机
                _this.ishangup = false;
                /** 当前行为状态*/
                _this._curBehaviorState = 0;
                /*模式*/
                _this._isLocked = false;
                /*传送中*/
                _this._isTeleporting = false;
                /**
                 * 是否自动寻路中
                 */
                _this._isAutoMoving = false;
                _this._isNeedMountUp = false; //是否需要上坐骑
                // 移动延迟
                _this.moveDelay = 0;
                /*行走、攻击、游戏对象使用、NPC碰触分类行为码*/
                _this._moveStacks = new Array();
                /**
                 * 最后插入攻击栈的时间(防止挂机停止,干道寻路有bug)
                 */
                _this.lastStackAttack = 0;
                _this._selectTimeOut = 0;
                //上一次移动转向
                _this._lastMoveToward = -1;
                //最后的攻击者oid
                _this._lastAttackerOid = 0;
                _this.lastAttackerName = "";
                _this.lastAttackerType = "";
                _this.lastAttackerLv = 0;
                //最后被攻击时间
                _this._lastAttackedTime = 0;
                _this.lastAttackedTimeByPlayer = 0;
                _this._isDied = false;
                //点击停止挂机次数
                _this._clickStopGuaJiCount = 0;
                //点击时效性
                _this._clickStopGuaJiLoseTime = 0;
                _this._isFightStart = false;
                //当前使用群体技能索引
                _this._useQunSpellIdx = 0;
                //当前使用群体技能id
                _this._curUseQunId = 0;
                //下一使用群体技能id
                _this._nextUseQunId = 0;
                //技能cd 
                _this._spellCDArr = [];
                //公共cd
                _this._commonSpellCd = 0;
                _this._app = app;
                _this._pluginsMgr = new cotrl.PluginsMgr(app);
                // this.addMainUnitLiveEvent();
                var sceneObjMgr = _this._app.sceneObjectMgr;
                sceneObjMgr.on(SceneObjectMgr.MAINUNIT_UPDATE, _this, _this.onMainUnitUpdate);
                sceneObjMgr.on(SceneObjectMgr.MAP_TELEPORT, _this, _this.intoMap);
                sceneObjMgr.on(SceneObjectMgr.DELETE_OBJECT, _this, _this.onDeleteObject);
                _this.onMainUnitUpdate();
                return _this;
            }
            Object.defineProperty(ACotrller.prototype, "isLocked", {
                get: function () {
                    return this._isLocked;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ACotrller.prototype, "isTeleporting", {
                get: function () {
                    return this._isTeleporting;
                },
                set: function (value) {
                    this._isTeleporting = value;
                    this.event(ACotrller.TELEPORT_STATE_CHANGE);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ACotrller.prototype, "isAutoMoving", {
                get: function () {
                    return this._isAutoMoving;
                },
                enumerable: true,
                configurable: true
            });
            ACotrller.prototype.setIsAutoMoving = function (value, dis) {
                //寻路超过15码 才需要上坐骑 并且不在pk地图里
                var mapInfo = this._app.sceneObjectMgr.mapInfo;
                this._isNeedMountUp = value && dis > 15 && mapInfo && !mapInfo.inPkMap();
                if (this._isAutoMoving == value)
                    return;
                this._isAutoMoving = value;
                this.event(ACotrller.UPDATE_AUTOWALK_STATE);
            };
            Object.defineProperty(ACotrller.prototype, "pluginsMgr", {
                /**
                 * 挂机管理器
                 */
                get: function () {
                    return this._pluginsMgr;
                },
                enumerable: true,
                configurable: true
            });
            //主玩家
            ACotrller.prototype.onMainUnitUpdate = function () {
                var mainUnit = this._app.sceneObjectMgr.mainUnit;
            };
            //对象移除
            ACotrller.prototype.onDeleteObject = function (obj) {
                if (!obj)
                    return;
                //检验下 如果是缓存的攻击对象被移除了 那么久释放重新选择
                if (this._attackedUnit && this._attackedUnit.oid == obj.oid) {
                    this._attackedUnit = null;
                }
            };
            //进入新地图
            ACotrller.prototype.intoMap = function (newMapid) {
                if (!newMapid)
                    return;
            };
            /**
             * 挂起模式
             */
            ACotrller.prototype.lock = function () {
                this._isLocked = true;
            };
            /**
             * 取消挂起模式
             */
            ACotrller.prototype.unLock = function () {
                this._isLocked = false;
            };
            Object.defineProperty(ACotrller.prototype, "isHangUp", {
                //是否挂机中
                get: function () {
                    return this._curBehaviorState == ACotrller.BEHAVIOR_STATE_HANGUP;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ACotrller.prototype, "inFighting", {
                //是否战斗中
                get: function () {
                    return this.lastAttackedTime > 0 && this.lastAttackedTime + 5000 > Laya.timer.currTimer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ACotrller.prototype, "lastAttackedTime", {
                //最后一次攻击时间
                get: function () {
                    return this._lastAttackedTime;
                },
                set: function (v) {
                    //触发进入战斗中
                    if (!this.inFighting)
                        this.event(ACotrller.UPDATE_FIGHT_STATE, 1);
                    this._lastAttackedTime = v;
                    this._isFightStart = true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ACotrller.prototype, "curBehaviorState", {
                /**
                 * 获取当前行为状态
                 */
                get: function () {
                    return this._curBehaviorState;
                },
                /**
                 * 设置当前行为状态
                 */
                set: function (value) {
                    var oldState = this._curBehaviorState;
                    if (value == oldState)
                        return;
                    //更新状态
                    this._curBehaviorState = value;
                    switch (value) {
                        case ACotrller.BEHAVIOR_STATE_QUEST: //做任务中
                            if (oldState == ACotrller.BEHAVIOR_STATE_HANGUP) {
                                //如果是挂机中  那么就停止
                                this.pluginsStop(true, true, true, value);
                            }
                            break;
                        case ACotrller.BEHAVIOR_STATE_NONE: //无状态
                            if (oldState == ACotrller.BEHAVIOR_STATE_HANGUP) {
                                //如果是挂机中  那么就停止
                                this.pluginsStop();
                            }
                            else if (oldState != value) { //跟现在状态不一样
                                this.stop();
                            }
                            break;
                        case ACotrller.BEHAVIOR_STATE_HANGUP: //挂机中
                            console.log("人物停止2");
                            this.pluginsStart();
                            break;
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 开始挂机
             * @param isAuto 是否需要抛事件  true 抛  false 不抛
             * @param callStopMove 是否需要发包停止移动
             * @param unit_entry 指定怪模板id
             *
             */
            ACotrller.prototype.pluginsStart = function (isAuto, callStopMove, unit_entry) {
                if (isAuto === void 0) { isAuto = true; }
                if (callStopMove === void 0) { callStopMove = true; }
                if (unit_entry === void 0) { unit_entry = 0; }
                //挂起模式
                if (this._isLocked)
                    return;
                //if(this._pluginsMgr.isHangUp && this._pluginsMgr.attackUnitEntry == unit_entry){
                //	return;
                //}
                //释放所有栈
                console.log("停止状态2");
                this.stop(callStopMove);
                this._curBehaviorState = ACotrller.BEHAVIOR_STATE_HANGUP;
                this._pluginsMgr.start(unit_entry);
                //需要抛事件
                if (isAuto) {
                    this.event(ACotrller.UPDATE_HANGUP_STATE);
                }
            };
            /**
             * 停止挂机
             * @param isAuto	是否是 主动的 需要抛事件
             * @param callStopMove 是否需要停止移动
             * @param isNeedFinaStack 是否需要释放所有栈
             * @param state 指定状态
             */
            ACotrller.prototype.pluginsStop = function (isAuto, callStopMove, isNeedFinaStack, state) {
                if (isAuto === void 0) { isAuto = true; }
                if (callStopMove === void 0) { callStopMove = true; }
                if (isNeedFinaStack === void 0) { isNeedFinaStack = true; }
                if (state === void 0) { state = 0; }
                this._curBehaviorState = state;
                this._pluginsMgr.stop();
                if (state == 0) {
                    this._clickStopGuaJiCount = 0;
                    this._clickStopGuaJiLoseTime = 0;
                }
                //释放所有栈
                if (isNeedFinaStack) {
                    this.stop(callStopMove);
                }
                //需要抛事件
                if (isAuto) {
                    this.event(ACotrller.UPDATE_HANGUP_STATE);
                }
            };
            /**
             * 执行新动作栈，返回是否执行成功
             * @param newActionStack 动作栈
             */
            ACotrller.prototype.exec = function (newActionStack) {
                if (this._isLocked)
                    return false;
                this.stacksFinalize(this._moveStacks);
                return this.stack(newActionStack);
            };
            /**
             * 加入新的动作栈， 返回是否插入成功
             * 栈，直接堆积在后面
             * @param newActionStack
             */
            ACotrller.prototype.stack = function (newActionStack) {
                //先插入再说
                this._moveStacks[this._moveStacks.length] = newActionStack;
                //如果初始化失败，则移除
                if (!newActionStack.initialize()) {
                    this._moveStacks.pop();
                    if (!newActionStack.isFinalize)
                        newActionStack.finalize();
                    return false;
                }
                if (newActionStack instanceof cotrl.AttackStack) {
                    this.lastStackAttack = Laya.timer.currTimer;
                }
                else if (newActionStack instanceof cotrl.WaitTeleteportStack) {
                    //如果是等待传送栈 则清理攻击栈
                    this.finalizeAttackStack();
                }
                return true;
            };
            /**
             * 停止所有行为栈
             * @param callStopMove 是否需要发包停止移动
             *
             */
            ACotrller.prototype.stop = function (callStopMove) {
                if (callStopMove === void 0) { callStopMove = true; }
                this.stacksFinalize(this._moveStacks);
                console.log("选择停止4");
                if (callStopMove)
                    this.sendStopMoving();
            };
            /*释放栈*/
            ACotrller.prototype.stacksFinalize = function (list) {
                var teleteportStacks = new Array();
                var len = list.length;
                for (var i = 0; i < len; i++) {
                    if (list[i] instanceof cotrl.WaitTeleteportStack) {
                        teleteportStacks[teleteportStacks.length] = list[i];
                    }
                    else {
                        if (!list[i].isFinalize)
                            list[i].finalize();
                    }
                }
                list.length = 0;
                len = teleteportStacks.length;
                for (i = 0; i < len; i++) {
                    list[list.length] = teleteportStacks[i];
                }
            };
            /**
             *清除移动栈 (慎用)
             *
             */
            ACotrller.prototype.finalizeMoveStack = function () {
                for (var i = 0; i < this._moveStacks.length; i++) {
                    if (!this._moveStacks[i].isFinalize && !(this._moveStacks[i] instanceof cotrl.WaitTeleteportStack)
                        && !(this._moveStacks[i] instanceof cotrl.AttackStack) && !(this._moveStacks[i] instanceof cotrl.SelectTargetSack)) {
                        this._moveStacks[i].finalize();
                        this._moveStacks.splice(i, 1);
                        i--;
                    }
                }
            };
            /**
             *清除攻击栈 (慎用)
             *
             */
            ACotrller.prototype.finalizeAttackStack = function () {
                for (var i = 0; i < this._moveStacks.length; i++) {
                    if (!this._moveStacks[i].isFinalize && this._moveStacks[i] instanceof cotrl.AttackStack) {
                        this._moveStacks[i].finalize();
                        this._moveStacks.splice(i, 1);
                        i--;
                    }
                }
            };
            /**
             *清除其他栈 除了转向栈 (慎用)
             *
             */
            ACotrller.prototype.finalizeStackExceptMoveToward = function () {
                for (var i = 0; i < this._moveStacks.length; i++) {
                    if (!this._moveStacks[i].isFinalize && !(this._moveStacks[i] instanceof cotrl.MoveTowardStack)) {
                        this._moveStacks[i].finalize();
                        this._moveStacks.splice(i, 1);
                        i--;
                    }
                }
            };
            /**
             * 当前栈类型
             */
            ACotrller.prototype.lastStackIsType = function (cc) {
                if (this._moveStacks.length)
                    return this._moveStacks[this._moveStacks.length - 1] instanceof cc;
                return false;
            };
            /**
             *栈里面是否有指定的类型
             * @param c
             * @return
             *
             */
            ACotrller.prototype.haveStack = function (c) {
                for (var i = 0; i < this._moveStacks.length; i++) {
                    if (this._moveStacks[i] instanceof c)
                        return true;
                }
                return false;
            };
            /**
             *栈里面是否有传送栈
             * @param c
             * @return
             *
             */
            ACotrller.prototype.haveTeleStack = function () {
                for (var i = 0; i < this._moveStacks.length; i++) {
                    if (this._moveStacks[i] instanceof cotrl.GotoMapPosStack || this._moveStacks[i] instanceof cotrl.GotoMapStack || this._moveStacks[i] instanceof cotrl.GotoTeleStack)
                        return true;
                }
                return false;
            };
            /**
             *栈里面是否有移动栈
             * @param c
             * @return
             *
             */
            ACotrller.prototype.haveMoveStack = function () {
                for (var i = 0; i < this._moveStacks.length; i++) {
                    if (this._moveStacks[i] instanceof cotrl.FindTouchUnitStack || this._moveStacks[i] instanceof cotrl.BaseMoveStack)
                        return true;
                }
                return false;
            };
            /**
             * 获取某种栈
             * @param c
             * @return
             *
             */
            ACotrller.prototype.getSomeStack = function (c) {
                for (var i = 0; i < this._moveStacks.length; i++) {
                    if (this._moveStacks[i] instanceof c)
                        return this._moveStacks[i];
                }
                return null;
            };
            /**
             * 栈空闲的
             */
            ACotrller.prototype.isStackFree = function () {
                return this._moveStacks.length == 0;
            };
            /**
             * 只有攻击栈
             */
            ACotrller.prototype.justHaveAttackStack = function () {
                var haveAttack = false;
                for (var i = 0; i < this._moveStacks.length; i++) {
                    if (!this._moveStacks[i])
                        continue;
                    if (this._moveStacks[i] instanceof cotrl.AttackStack)
                        haveAttack = true;
                    else
                        return false;
                }
                return haveAttack;
            };
            ACotrller.prototype.traceStack = function () {
                var str = "";
                for (var i = 0; i < this._moveStacks.length; i++) {
                    str += typeof (this._moveStacks[i]) + "----\r";
                }
                return str;
            };
            /**
             * 心跳
             */
            ACotrller.prototype.update = function (diff) {
                if (this.moveDelay > 0) {
                    this.moveDelay -= diff;
                    // logd('_moveDelay', this.moveDelay);
                }
                var mainUnit = this._app.sceneObjectMgr.mainUnit;
                mainUnit && (mainUnit.moveDelay = this.moveDelay > 0);
                //移动栈
                this.moveStacksUpdate(diff);
                //挂机
                if (this.ishangup) {
                    console.log("进入挂机");
                    this._pluginsMgr.update(diff);
                }
                var cur_time = Laya.timer.currTimer;
                //检查移动状态
                if (this._isAutoMoving) {
                    var isMoveing = this.haveMoveStack();
                    if (!isMoveing) { //没有移动栈了 自动寻路停止
                        this.setIsAutoMoving(false);
                    }
                }
                //检测战斗状态
                if (this._isFightStart && !this.inFighting) {
                    this._isFightStart = false;
                    //触发脱离战斗
                    this.event(ACotrller.UPDATE_FIGHT_STATE, 2);
                }
                //清理点击挂机操作 时效性
                if (this._clickStopGuaJiLoseTime > 0 && this._clickStopGuaJiLoseTime < cur_time) {
                    this._clickStopGuaJiCount = 0;
                    this._clickStopGuaJiLoseTime = 0;
                }
                //打印栈
                // logd("----trace stacd------\r",this.traceStack());
            };
            Object.defineProperty(ACotrller.prototype, "curStack", {
                // 获取当前栈
                get: function () {
                    return this._moveStacks[this._moveStacks.length - 1];
                },
                enumerable: true,
                configurable: true
            });
            /*移动栈更新*/
            ACotrller.prototype.moveStacksUpdate = function (diff) {
                var udDiff = diff;
                //移动栈
                var startLen = this._moveStacks.length;
                if (startLen > 0) {
                    var lastStack = this._moveStacks[startLen - 1];
                    while (lastStack) {
                        var len_begin = this._moveStacks.length;
                        if (lastStack.update(udDiff)) {
                            if (!lastStack.isFinalize)
                                lastStack.finalize();
                            //产生了新栈
                            var hasNewStack = len_begin != this._moveStacks.length;
                            //有可能产生新栈
                            var idx = this._moveStacks.lastIndexOf(lastStack);
                            if (idx != -1)
                                this._moveStacks.splice(idx, 1);
                            lastStack = null;
                            if (!hasNewStack) {
                                //刷新下一个栈
                                var curLen = this._moveStacks.length;
                                if (curLen > 0) {
                                    lastStack = this._moveStacks[curLen - 1];
                                    if (curLen < startLen) {
                                        //老栈使用diff
                                        udDiff = diff;
                                    }
                                    else {
                                        //新栈
                                        udDiff = 0;
                                    }
                                }
                            }
                        }
                        else {
                            lastStack = null;
                        }
                    }
                }
                if (this.moveDelay <= 0) {
                    //如果没有任何栈行为了 并且还处于遥感控制中 那么就激活遥感
                    var mLen = this._moveStacks.length;
                    if (mLen == 0) {
                        //没有就插入
                        this.continueMoveToward();
                    }
                    else {
                        //判断下是否有遥感栈存在 有的话 就更新下朝向
                        var moveTowardStack = this._moveStacks[mLen - 1];
                        if (moveTowardStack instanceof cotrl.MoveTowardStack) {
                            moveTowardStack.setToward(this._lastMoveToward);
                        }
                    }
                }
            };
            /**
             * 移动到目的（移动 请调用此接口）
             * @param dstX 目标坐标x
             * @param dstY 目标坐标y
             * @param dstMapid 目标地图
             * @param state	指定状态
             *
             */
            ACotrller.prototype.moveToDst = function (dstX, dstY, dstMapid, state) {
                //停止其他栈 先这样
                if (dstMapid === void 0) { dstMapid = 0; }
                if (state === void 0) { state = 0; }
                this.pluginsStop(true, false, true, state);
                this._pluginsMgr.lastOptTime = Laya.timer.currTimer;
                var mainUnit = this._app.sceneObjectMgr.mainUnit;
                if (!mainUnit || mainUnit.isDied)
                    return;
                var mapid = mainUnit.mapid;
                //如果有设地图了			
                if (dstMapid > 0)
                    this.setIsAutoMoving(true, MathU.getDistance(mainUnit.pos.x, mainUnit.pos.y, dstX, dstY));
                if (dstMapid <= 0 || mapid == dstMapid) {
                    return this.exec(new cotrl.GotoDstStack(this._app, dstX, dstY, 1.5));
                }
                else {
                    return this.exec(new cotrl.GotoMapPosStack(this._app, dstMapid, dstX, dstY));
                }
            };
            /**
             * 直接传送到某地图的某传送点
             * @param mapid
             */
            ACotrller.prototype.teleToMapTeleportPos = function (mapid) {
                if (!Template.data)
                    return false;
                var tox = 0;
                var toy = 0;
                if (mapid == 1) {
                    tox = 54;
                    toy = 26;
                }
                else {
                    var teles = Template.data["tb_teleport"];
                    if (teles && teles.length) {
                        for (var i = 0; i < teles.length; i++) {
                            var tele_data = teles[i];
                            if (!tele_data)
                                continue;
                            if (tele_data.dst_map_id == mapid) {
                                tox = tele_data.dst_pos_x;
                                toy = tele_data.dst_pos_y;
                                break;
                            }
                        }
                    }
                }
                if (tox > 0 && toy > 0) {
                    this.sendTeleport(mapid, tox, toy);
                    return true;
                }
                return false;
            };
            /**
             * 直接传送到指定地图，并寻路到该地图的某点
             * @param dstX 目标坐标x
             * @param dstY 目标坐标y
             *
             */
            ACotrller.prototype.telAndMoveToDst = function (dstX, dstY, dstMapid) {
                if (dstMapid === void 0) { dstMapid = 0; }
                //停止其他栈 先这样
                this.pluginsStop(true, false);
                this._pluginsMgr.lastOptTime = Laya.timer.currTimer;
                var mainUnit = this._app.sceneObjectMgr.mainUnit;
                if (!mainUnit || mainUnit.isDied)
                    return false;
                this.exec(new cotrl.GotoMapPosStack(this._app, dstMapid, dstX, dstY, false, true));
                // let mapid: number = mainUnit.getMapId();
                // if (dstMapid > 0 && mapid != dstMapid) {
                // 	let px = 0;
                // 	let py = 0;
                // 	let teles: any[] = Template.data["tb_teleport"];
                // 	if (teles && teles.length) {
                // 		for (let i: number = 0; i < teles.length; i++) {
                // 			let tele_data: any = teles[i];
                // 			if (!tele_data) continue;
                // 			if (tele_data.dst_map_id == dstMapid) {
                // 				px = tele_data.dst_pos_x;
                // 				py = tele_data.dst_pos_y;
                // 				break;
                // 			}
                // 		}
                // 	}
                // 	this._app.aCotrller.sendTeleport(dstMapid, px, py, true, true, true)
                // }
                // else{
                // 	this.exec(new GotoDstStack(this._app, dstX, dstY, 1.5));
                // }
                return true;
            };
            // 真正执行移动 (发包 栈调用的 慎用)
            ACotrller.prototype.sendMoveTo = function (dstX, dstY) {
                var mainUnit = this._app.sceneObjectMgr.mainUnit;
                if (mainUnit && !mainUnit.isDied) {
                    dstX = MathU.parseInt(dstX);
                    dstY = MathU.parseInt(dstY);
                    //检验下 是否已经在朝目标移动了
                    if (mainUnit.targetPosX == dstX && mainUnit.targetPosY == dstY && mainUnit.isMoving) {
                        return;
                    }
                    //发移动协议
                    // this.network.call_move_to(dstX, dstY);
                    mainUnit.SetTargetPosX(dstX);
                    mainUnit.SetTargetPosY(dstY);
                    //  console.log("移动坐标:"+dstX+","+dstY);
                    this._app.sceneObjectMgr.onUnitTargetPosChange(mainUnit, dstX, dstY);
                }
            };
            /**
             * 移动转向	 进栈
             * @param toward 朝向
             */
            ACotrller.prototype.moveToward = function (toward) {
                //被锁定了
                if (this._isLocked || this.isTeleporting)
                    return;
                this._pluginsMgr.lastOptTime = Laya.timer.currTimer;
                if (this._lastMoveToward == toward)
                    return; //同一个方向的
                this._lastMoveToward = toward;
                var mainUnit = this._app.sceneObjectMgr.mainUnit;
                if (!mainUnit || mainUnit.isDied)
                    return;
                this.pluginsStop(true, false);
                if (this.moveDelay > 0)
                    return;
                //添加一个新栈
                // logd("-------------------------------------开始 转向栈");
                this.stack(new cotrl.MoveTowardStack(this._app, toward, this.curBehaviorState == ACotrller.BEHAVIOR_STATE_HANGUP));
            };
            ACotrller.prototype.continueMoveToward = function () {
                //被锁定了
                if (this._isLocked || this.isTeleporting || this._lastMoveToward < 0) {
                    // this.showErrorTips("怎么回事");
                    return;
                }
                this.stack(new cotrl.MoveTowardStack(this._app, this._lastMoveToward, this.curBehaviorState == ACotrller.BEHAVIOR_STATE_HANGUP));
            };
            ACotrller.prototype.stopMoveToward = function () {
                this._lastMoveToward = -1;
            };
            //是否在遥感控制中
            ACotrller.prototype.inYaoGanControl = function () {
                return this._lastMoveToward >= 0;
            };
            /**
             * 移动转向(发包 )
             * @param toward 朝向
             */
            ACotrller.prototype.sendMoveToward = function (toward) {
                if (this._isLocked || this.isTeleporting)
                    return;
                var mainUnit = this._app.sceneObjectMgr.mainUnit;
                if (!mainUnit || mainUnit.isDied)
                    return;
            };
            /**
             * 停止移动
             */
            ACotrller.prototype.stopMoving = function () {
                var mainUnit = this._app.sceneObjectMgr.mainUnit;
                if (!mainUnit)
                    return;
                this.finalizeMoveStack();
                this.sendStopMoving();
            };
            /**
             * 停止移动(发包)
             */
            ACotrller.prototype.sendStopMoving = function () {
                this.setIsAutoMoving(false);
                var mainUnit = this._app.sceneObjectMgr.mainUnit;
                if (!mainUnit || !mainUnit.isMoving)
                    return;
                this._pluginsMgr.lastOptTime = Laya.timer.currTimer;
                console.log("停止移动1");
                mainUnit.MoveStop();
                //发停止移动协议
                // this.network.call_move_stop(mainUnit.oid, mainUnit.pos.x, mainUnit.pos.y);
                //关闭定时器
                // logd("----------------------------------------停止移动发包", mainUnit.pos.x, mainUnit.pos.y, mainUnit.GetTargetPosX(), mainUnit.GetTargetPosY());
            };
            //选中某个对象
            ACotrller.prototype.select_target = function (oid) {
                if (!this._app.sceneObjectMgr.mainUnit)
                    return;
                var select_oid = this._app.sceneObjectMgr.selectOid;
                //已经选中
                if (select_oid == oid) {
                    return;
                }
                //选中这个人的过期时间，如果超过一秒了还没选中，继续选中这个对象
                //选择的对象不一样可以直接选中
                var curTime = Laya.timer.currTimer;
                if (select_oid == oid && this._selectTimeOut > curTime)
                    return;
                this._selectTimeOut = curTime + 1000;
                //当前正在选中谁
                this._app.sceneObjectMgr.selectOid = oid;
            };
            //获取可攻击unit
            ACotrller.prototype.getAttackUnit = function () {
                var targetUnit;
                var sceneObjMgr = this._app.sceneObjectMgr;
                var maxDis = 10; //最大距离
                var mapInfo = sceneObjMgr.mapAssetInfo;
                //不能攻击
                if (!this.canAttack) {
                    this._attackedUnit = null;
                    return null;
                }
                //优先击杀已选择的目标
                if (sceneObjMgr.selectOid > 0) {
                    if (this._attackedUnit && !this.isFriendly(this._attackedUnit) && this._attackedUnit.oid == sceneObjMgr.selectOid
                        && !mapInfo.isObstacle(this._attackedUnit.pos.x, this._attackedUnit.pos.y)) {
                        return this._attackedUnit;
                    }
                    targetUnit = sceneObjMgr.getUnitByOid(sceneObjMgr.selectOid);
                    if (targetUnit && this.isFriendly(targetUnit)) {
                        targetUnit = null;
                    }
                }
                if (!targetUnit) { //没有选择目标的情况
                    //如果有在攻击的对象
                    if (this._attackedUnit && !this.isFriendly(this._attackedUnit) && sceneObjMgr.mainUnit.Distance(this._attackedUnit) <= maxDis
                        && !mapInfo.isObstacle(this._attackedUnit.pos.x, this._attackedUnit.pos.y)) {
                        return this._attackedUnit;
                    }
                    //在非和平模式下，被玩家攻击时，优先选择玩家
                    if (this._lastAttackerOid > 0) {
                        targetUnit = sceneObjMgr.getUnitByOid(this._lastAttackerOid);
                        //如果距离过大 是否友好
                        if (targetUnit && (this.isFriendly(targetUnit) || sceneObjMgr.mainUnit.Distance(targetUnit) > maxDis)) {
                            targetUnit = null;
                        }
                    }
                    if (!targetUnit || targetUnit.isDied) {
                        targetUnit = this.selectNearUnit();
                    }
                }
                this._attackedUnit = targetUnit;
                return targetUnit;
            };
            /**
             * 选择附近unit
             * @param excepId 除了某id
             */
            ACotrller.prototype.selectNearUnit = function (excepId) {
                var _this = this;
                if (excepId === void 0) { excepId = 0; }
                var targetUnit;
                var sceneObjMgr = this._app.sceneObjectMgr;
                var mapAssetInfo = sceneObjMgr.mapAssetInfo;
                var mapinfo = sceneObjMgr.mapInfo;
                if (!mapinfo || !mapAssetInfo)
                    return null;
                //当前玩家没有目标情况下，BOSS > 任务怪 > 其他怪
                var misDis = MapInfo.MAP_WORLDS.indexOf(sceneObjMgr.mapid) >= 0 ? 80 : Number.MAX_VALUE; //设置最大范围
                var inPkMap = MapInfo.MAP_PKS.indexOf(sceneObjMgr.mapid) >= 0; //在pk地图里 也可锁定玩家攻击
                var mainUnit = sceneObjMgr.mainUnit;
                var curQuestCreaterId = 0;
                sceneObjMgr.ForEachObject(function (other) {
                    if (!(other instanceof Unit) || (!inPkMap && other.isPlayer) || mapAssetInfo.isObstacle(other.pos.x, other.pos.y)
                        || _this.isFriendly(other, mainUnit) || other.oid == excepId)
                        return;
                    var dis = sceneObjMgr.mainUnit.Distance(other);
                    //任务怪
                    if (targetUnit && targetUnit.entryid == curQuestCreaterId) {
                        if (other.entryid == curQuestCreaterId && dis < misDis) {
                            misDis = dis;
                            targetUnit = other;
                        }
                    }
                    else if (other.entryid == curQuestCreaterId) {
                        misDis = dis;
                        targetUnit = other;
                    }
                    //其他怪 如果在pk地图里 机器人也是可以攻击的
                    else if (dis < misDis && (inPkMap || !other.isRobot)) {
                        misDis = dis;
                        targetUnit = other;
                    }
                });
                return targetUnit;
            };
            /**
             * 根据某生物模板id攻击某个对象
             * @param spellid 使用哪个技能攻击
             * @param 生物模板id 生物模板id
             */
            ACotrller.prototype.attackUnitByEntry = function (entry) {
                var targetUnit = this._app.sceneObjectMgr.getUnitByEntry(this._app.sceneObjectMgr.mainUnit, entry);
                if (!targetUnit)
                    return;
                this.attackUnit(targetUnit);
            };
            /**
             * 攻击某个对象
             * @param spellid 使用哪个技能攻击
             * @param targetUnit 攻击对象
             * @param showTip 是否显示路面特效
             */
            ACotrller.prototype.attackUnit = function (targetUnit, showTip) {
                if (showTip === void 0) { showTip = false; }
                //不能攻击  友好对象
                if (!this.canAttack || this.isFriendly(targetUnit))
                    return;
                var sceneObjMgr = this._app.sceneObjectMgr;
                //有攻击对象 并且 已经选中了  在攻击中 就不用再弄攻击栈了
                if (sceneObjMgr.selectOid > 0 && sceneObjMgr.selectOid == targetUnit.oid) {
                    var atkStack = this.getSomeStack(cotrl.AttackStack);
                    if (atkStack && atkStack.targetOid == targetUnit.oid) {
                        return;
                    }
                }
                this._pluginsMgr.lastOptTime = Laya.timer.currTimer;
                this.exec(new cotrl.AttackStack(this._app, targetUnit));
            };
            /**
             * 地图id
             * @param map
             * @return
             */
            ACotrller.prototype.isMapOpen = function (mapid) {
                return true;
            };
            // 是否友好
            ACotrller.prototype.isFriendly = function (unit, mainUnit, showTip) {
                if (showTip === void 0) { showTip = false; }
                if (!unit || !unit.guid || unit.isDied)
                    return true;
                if (!mainUnit && this._app)
                    mainUnit = this._app.sceneObjectMgr.mainUnit;
                if (!mainUnit
                    || unit == mainUnit //对自己友好
                ) {
                    return true;
                }
                if (!unit.isCanAttackType) {
                    //npc友好 gameobject友好 宠物一律友好
                    if (unit.isPet && showTip && !unit.isPet)
                        this.showErrorTips("不可攻击宠物");
                    return true;
                }
                //如果是被锁定选中了
                if (unit.buffMgr && unit.buffMgr.lockSelect) {
                    return true;
                }
                //在全模式pk地图了 一定是可以攻击的
                var uMapid = unit.mapid;
                if (MapInfo.MAP_PK_ALL_MODES.indexOf(uMapid) >= 0) {
                    return false;
                }
                if (unit.isPlayer || unit.isRobot) {
                    if (mainUnit.level < ACotrller.NEW_BIRD_LEVEL
                        || unit.level < ACotrller.NEW_BIRD_LEVEL) {
                        //自己或对方是新手
                        if (showTip)
                            this.showErrorTips("您或对方处于新手保护状态");
                        return true;
                    }
                    //判断对方是否在挂机保护中
                    if (unit.isGuajibaohu) {
                        if (showTip)
                            this.showErrorTips("挂机保护中无法攻击");
                        return true;
                    }
                    var attackMode = mainUnit.attackMode;
                    //攻击模式
                    switch (attackMode) {
                        case UnitField.ATTACK_MODE_HEPING: //和平模式
                            return true;
                        case UnitField.ATTACK_MODE_ALL: //全体模式
                            break;
                    }
                }
                return false;
            };
            /**
             * 获取某点附近随机点
             * @param px
             * @param py
             * @param rangeMin
             * @param rangeMax
             */
            ACotrller.prototype.getRandomNearPos = function (px, py, rangeMin, rangeMax) {
                if (rangeMin === void 0) { rangeMin = 2; }
                if (rangeMax === void 0) { rangeMax = 3; }
                var dpx = px;
                var dpy = py;
                var ry = MathU.randomRange(rangeMin, rangeMax);
                var rx = MathU.randomRange(rangeMin, rangeMax);
                dpx += MathU.randomBoolen() ? rx : -rx;
                dpy += MathU.randomBoolen() ? ry : -ry;
                return [dpx, dpy];
            };
            //场景触碰
            ACotrller.prototype.onSceneTouch = function (cellx, celly, hitObject, showTip) {
                if (showTip === void 0) { showTip = false; }
                //挂起模式 或者传送中
                if (this._isLocked || this.isTeleporting) {
                    // if (showTip) this.showErrorTips("场景挂起了");
                    return;
                }
                // if (showTip) this.showErrorTips("触碰场景");
                // 战斗中
                if (this._app.battleProxy.battle && this._app.battleProxy.battle.onSceneTouch(cellx, celly, hitObject)) {
                    return;
                }
                //是否被劫持了
                if (this._app.sceneObjectMgr.sceneStoryMgr && this._app.sceneObjectMgr.sceneStoryMgr.onSceneTouch(cellx, celly, hitObject))
                    return;
                var cur_time = Laya.timer.currTimer;
                this._pluginsMgr.lastOptTime = cur_time;
                //如果是挂机状态
                var isGuaJi = false;
                if (this.isHangUp) {
                    isGuaJi = true;
                    this._clickStopGuaJiCount++;
                    this._clickStopGuaJiLoseTime = cur_time + 5000;
                    if (this._clickStopGuaJiCount <= 1) {
                        if (showTip)
                            this.showErrorTips("再点击一次停止挂机");
                        return;
                    }
                }
                //这里搞
                if (hitObject) { //如果有触碰对象
                    if (hitObject instanceof game.object.Unit) {
                        //先判断下是否npc 游戏对象 雕像
                        if (hitObject.isNpc || hitObject.isGameObject) {
                            this._app.sceneObjectMgr.selectOid = hitObject.oid;
                            //停止挂机
                            if (isGuaJi)
                                this.pluginsStop();
                            var hit_entry = hitObject.entryid;
                            var dpy = hitObject.pos.y;
                            var dpx = hitObject.pos.x;
                            this.exec(new cotrl.FindTouchUnitStack(this._app, hitObject.mapid, dpx, dpy, hit_entry, hitObject.typeid, hitObject.guid));
                        }
                        //判断下是否友好
                        else if (!this.isFriendly(hitObject, null, showTip)) {
                            this.attackUnit(hitObject, true);
                            this.setIsAutoMoving(false);
                        }
                        else if (!hitObject.isDied && !hitObject.isPet) {
                            this._app.sceneObjectMgr.selectOid = hitObject.oid;
                        }
                    }
                }
                else { //没有  那就是触碰场景地图了
                    if (!this.checkTeleportCtrl(cellx, celly)) //检查是否点击了传送点
                        this.moveToDst(cellx, celly);
                    this._app.sceneObjectMgr.selectOid = 0;
                    this.setIsAutoMoving(false);
                }
            };
            //长按场景触碰
            ACotrller.prototype.onLongSceneTouch = function (hitObject) {
                if (this._app.battleProxy.battle && this._app.battleProxy.battle.onSceneLongTouch(hitObject)) {
                    return;
                }
            };
            //检查是否点击了传送点
            ACotrller.prototype.checkTeleportCtrl = function (cellx, celly) {
                //判断下 是否需要传送
                if (this.isTeleporting)
                    return false;
                var mainUnit = this._app.sceneObjectMgr.mainUnit;
                var mapid = this._app.sceneObjectMgr.mapid;
                if (!mainUnit || mapid <= 0)
                    return false;
                var mpx = mainUnit.pos.x;
                var mpy = mainUnit.pos.y;
                var teleDatas = MapTeleportIndex.inst.getTeleportsByMapid(mapid);
                if (!teleDatas)
                    return false;
                var len = teleDatas.length;
                for (var i = 0; i < len; i++) {
                    var tele = teleDatas[i];
                    if (!tele)
                        continue;
                    if (MathU.getDistance(cellx, celly, tele.srcPortX, tele.srcPortY) < 2) {
                        //停止其他栈 先这样
                        this.pluginsStop(true, false);
                        this._pluginsMgr.lastOptTime = Laya.timer.currTimer;
                        this.stack(new cotrl.GotoTeleStack(this._app, tele.srcPortX, tele.srcPortY, tele.dstMapid, tele.dstPortX, tele.dstPortY, true));
                        return true;
                    }
                }
                return false;
            };
            /**
             * 传送发包
             * @param dstMapid 目标地图
             * @param dstX 目标坐标x
             * @param dstY 目标坐标y
             * @param showTip 错误提示
             *
             */
            ACotrller.prototype.sendTeleport = function (dstMapid, dstX, dstY, isBattleEnd, showTip, needCheckInstance, needCheckMap, par) {
                if (isBattleEnd === void 0) { isBattleEnd = false; }
                if (showTip === void 0) { showTip = false; }
                if (needCheckInstance === void 0) { needCheckInstance = true; }
                if (needCheckMap === void 0) { needCheckMap = false; }
                if (par === void 0) { par = ""; }
                if (dstMapid <= 0 || (dstX <= 0 && dstY <= 0))
                    return false; //目标地图不对 目标位置不对
                // 战斗中不能跳地图 除非是服务器通知离开战场
                if (this._app.sceneObjectMgr.mapInfo.inBattle && !isBattleEnd)
                    return;
                if (!this.checkTeleport(needCheckInstance, dstMapid, showTip, needCheckMap))
                    return false;
                //如果挂机中
                if (this._pluginsMgr.isHangUp) {
                    this.pluginsStop(true, true, true);
                }
                this.stack(new cotrl.WaitTeleteportStack(this._app, dstMapid, dstX, dstY, par));
                this.pluginsMgr.lastOptTime = Laya.timer.currTimer;
                return true;
            };
            /**
             * 传送发包（其他副本）
             * @param dstMapid 目标地图
             * @param dstX 目标坐标x
             * @param dstY 目标坐标y
             * @param showTip 是否错误提示
             * @param par 预留参数
             */
            ACotrller.prototype.sendTeleInstance = function (dstMapid, dstX, dstY, showTip, par) {
                if (showTip === void 0) { showTip = false; }
                if (par === void 0) { par = ""; }
                if (dstMapid <= 0 || (dstX <= 0 && dstY <= 0))
                    return false; //目标地图不对 目标位置不对
                if (!this.checkTeleport(false, dstMapid, showTip))
                    return false;
                var mainUnit = this._app.sceneObjectMgr.mainUnit;
                if (!mainUnit)
                    return false;
                this.pluginsStop(true, true, true);
                this.stack(new cotrl.WaitTeleteportStack(this._app, dstMapid, dstX, dstY, par));
                this.pluginsMgr.lastOptTime = Laya.timer.currTimer;
                logd("----------sendTeleInstance", dstMapid, dstX, dstY);
                return true;
            };
            //退出副本
            ACotrller.prototype.instanceExit = function (value_work, closePanel) {
                if (closePanel === void 0) { closePanel = true; }
                //判断是否在副本中了
                var objMgr = this._app.sceneObjectMgr;
                if (this.isTeleporting || !objMgr.mapAssetInfo /**|| !objMgr.mapAssetInfo.isInstance*/)
                    return; //不在副本
                //原图位置
                var mapid = 0;
                var pox_x = 0;
                var pox_y = 0;
                if (!mapid) { //找不到 回主城
                    mapid = MapInfo.MAP_MAIN_CITY_ID;
                    pox_x = MapInfo.MAP_MAIN_CITY_POSX;
                    pox_y = MapInfo.MAP_MAIN_CITY_POSY;
                }
                if (mapid <= 0 || pox_x <= 0 || pox_x <= 0)
                    return;
                this.pluginsStop(true, true, true);
                this.stack(new cotrl.WaitTeleteportStack(this._app, mapid, pox_x, pox_y, ""));
                logd("副本退出发包", mapid, pox_x, pox_y);
                this.pluginsMgr.lastOptTime = Laya.timer.currTimer - (cotrl.PluginsMgr.QUEST_NO_OPT_TIME - 3000);
                //触发关闭窗口
                if (closePanel)
                    this.closePanelById(0);
            };
            /**
             *传送前的校验
             * @param needCheckInstance 是否需要验证当前是否副本中(踩传送点和退出活动的不需要验证)
             * @param toMap	目标地图
             * @return 返回能否传送
             * @param showTip 是否错误提示
             */
            ACotrller.prototype.checkTeleport = function (needCheckInstance, toMap, showTip, needCheckMap) {
                if (needCheckInstance === void 0) { needCheckInstance = true; }
                if (toMap === void 0) { toMap = 0; }
                if (showTip === void 0) { showTip = false; }
                if (needCheckMap === void 0) { needCheckMap = false; }
                var sceneObjMgr = this._app.sceneObjectMgr;
                var mainUnit = sceneObjMgr.mainUnit;
                //死亡状态不能传送
                if (!mainUnit || mainUnit.isDied)
                    return false;
                //地图未开启
                if (needCheckMap && (!toMap || !this.isMapOpen(toMap))) {
                    //提示
                    if (showTip)
                        this.showErrorTips("地图未开启");
                    return false;
                }
                var mapTemp = Template.getMapTempById(toMap);
                var toInstanceMap = mapTemp && mapTemp["map_type"] != 1;
                //在副本中无法进入另一个副本 
                if (needCheckInstance && sceneObjMgr.mapInfo && sceneObjMgr.mapAssetInfo && ((sceneObjMgr.mapAssetInfo.isInstance && toInstanceMap)
                    || (MapInfo.MAP_WORLDS.indexOf(toMap) < 0 && !sceneObjMgr.mapInfo.inWorldMap()))) { //已经在副本
                    //提示
                    if (showTip)
                        this.showErrorTips("请先退出副本");
                    return false;
                }
                var mUnit = sceneObjMgr.mainUnit;
                //传送中不能传送
                if (this.isTeleporting) {
                    //提示
                    if (showTip)
                        this.showErrorTips("传送中");
                    return false;
                }
                return true;
            };
            Object.defineProperty(ACotrller.prototype, "canMove", {
                /**
                 * 是否允许移动
                 */
                get: function () {
                    var mainUnit = this._app.sceneObjectMgr.mainUnit;
                    if (!mainUnit || mainUnit.isDied || mainUnit.buffMgr.lockMove)
                        return false;
                    // if(this._lockMoveTime > 0)
                    // 	return false;
                    // if(this.scene.mainPlayer.buffNotMove)
                    // 	return false;
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ACotrller.prototype, "canAttack", {
                /**
                 * 是否允许攻击他人
                 */
                get: function () {
                    var mainUnit = this._app.sceneObjectMgr.mainUnit;
                    if (!mainUnit || mainUnit.isDied || mainUnit.buffMgr.lockAttack)
                        return false;
                    // if(this._lockAttackTime > 0)
                    // 	return false;
                    // if(this.scene.mainPlayer.buffNotAttack)
                    // 	return false;
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ACotrller.prototype, "canShowRoadEffect", {
                /**
                 * 是否显示路面特效
                 */
                get: function () {
                    return !this.isAutoMoving && !this.isHangUp && !this.inYaoGanControl() && !this._app.sceneObjectMgr.selectOid; //!this.haveStack(MoveTowardStack);
                },
                enumerable: true,
                configurable: true
            });
            // 准备完成任务
            ACotrller.prototype.readyQuestComplete = function (npcid) {
                this.event(ACotrller.READY_QUEST_COMPLETE, npcid);
            };
            // 采集
            ACotrller.prototype.collecting = function (type, delay) {
                if (delay === void 0) { delay = 0; }
                this.event(ACotrller.COLLECTING, [type, delay]);
            };
            // 结束采集
            ACotrller.prototype.collectingEnd = function (type) {
                if (type === void 0) { type = 0; }
                this.event(ACotrller.COLLECTING_END, type);
            };
            //从副本退出
            ACotrller.prototype.doInstanceExitEvent = function () {
                this.event(ACotrller.INSTACNE_EXIT_EVENT);
            };
            //错误提示
            ACotrller.prototype.showErrorTips = function (mess) {
                this.event(ACotrller.SHOW_ERROR_TIPS, mess);
            };
            /**
             * 打开窗口
             * @param pageid 窗口id
             * @param page_type 窗口类型 0二级 1顶层 2HUD 默认二级
             */
            ACotrller.prototype.openPanelById = function (pageid, page_type, openFunc) {
                if (page_type === void 0) { page_type = 0; }
                this.event(ACotrller.OPEN_PANEL, [pageid, page_type, openFunc]);
            };
            /**
             * 关闭窗口
             * @param pageid 窗口id 如果id 0关闭所有窗口
             * @param page_type 窗口类型 0二级 1顶层 2HUD 默认二级
             */
            ACotrller.prototype.closePanelById = function (pageid, page_type) {
                if (page_type === void 0) { page_type = 0; }
                this.event(ACotrller.CLOSE_PANEL, [pageid, page_type]);
            };
            /**
             * 调用某个页面的函数
             * @param pageid 页面ID
             * @param func
             * @param args
             */
            ACotrller.prototype.usePanelFunc = function (container, pageid, func, args) {
                this.event(ACotrller.USE_PANEL_FUNC, [container, pageid, func, args]);
            };
            //是否挂机技能
            ACotrller.prototype.isHandUpSpell = function (spellid) {
                return ACotrller.SPELL_HANDUP_CONFIG.indexOf(spellid) >= 0;
            };
            //获取挂机技能索引
            ACotrller.prototype.getHandUpSpellIdx = function (spellid) {
                return ACotrller.SPELL_HANDUP_CONFIG.indexOf(spellid);
            };
            //获取技能公共cd
            ACotrller.prototype.getSpellCommonCD = function (delay) {
                if (delay === void 0) { delay = 0; }
                var c_cd = this._commonSpellCd + delay - this._app.sync.serverTimeBys * 1000;
                return c_cd < 0 ? 0 : c_cd;
            };
            //获取客户端某技能cd 剩余时间 毫秒
            ACotrller.prototype.getClientSpellCDByID = function (spellid, needCommonCd, needCheck) {
                if (needCommonCd === void 0) { needCommonCd = true; }
                if (needCheck === void 0) { needCheck = true; }
                //如果改技能还没激活 cd为0
                if (needCheck)
                    return 0;
                var cur_time = this._app.sync.serverTimeBys * 1000;
                var s_cd;
                var cd_len = this._spellCDArr.length;
                for (var i = 0; i < cd_len; i = i + 2) {
                    var s_spell_id = this._spellCDArr[i];
                    if (s_spell_id == spellid) {
                        s_cd = this._spellCDArr[i + 1];
                        break;
                    }
                }
                s_cd = s_cd ? s_cd : 0;
                s_cd = s_cd - cur_time;
                //是否需要公共cd
                if (needCommonCd) {
                    var c_cd = this._commonSpellCd - cur_time;
                    //自己cd 跟公共cd 谁大取谁的
                    if (s_cd < c_cd) {
                        s_cd = c_cd;
                    }
                }
                return s_cd < 0 ? 0 : s_cd;
            };
            //客户端存储某技能cd 时间戳毫秒
            ACotrller.prototype.setClientSpellCDByID = function (spellid, commodCd) {
                //群体技能共用一个cd
                // if(this.isQunSpell(spellid)){
                // 	this.GetSex() == PlayerDataField.SEX_MAN? spellid = PlayerData.SPELL_QUN_FIRST_ID_NAN : spellid = PlayerData.SPELL_QUN_FIRST_ID_NV;
                // }
                if (commodCd === void 0) { commodCd = 0; }
                var spellcd = this._app.sync.serverTimeBys * 1000;
                //公共cd处理
                if (commodCd == 0)
                    this._commonSpellCd = spellcd + 500;
                else
                    this._commonSpellCd = spellcd + commodCd;
                var spell_temp = Template.getSkillsTempById(spellid);
                if (spell_temp) {
                    spellcd += spell_temp.cd;
                }
                var isHave = false;
                var cd_len = this._spellCDArr.length;
                for (var i = 0; i < cd_len; i = i + 2) {
                    if (this._spellCDArr[i] == spellid) {
                        this._spellCDArr[i + 1] = spellcd;
                        isHave = true;
                        break;
                    }
                }
                //没有 补进
                if (!isHave) {
                    this._spellCDArr.push(spellid);
                    this._spellCDArr.push(spellcd);
                }
                this.event(ACotrller.UPDATE_SPELL_CD);
            };
            /****************************技能cd end******************************************/
            //释放
            ACotrller.prototype.dispose = function () {
                this.stop();
                this._moveStacks = null;
                this._lastMoveToward = -1;
                if (this._pluginsMgr) {
                    this._pluginsMgr.dispose();
                    this._pluginsMgr = null;
                }
            };
            ///////////////////// 自定义事件 //////////////////////////////////////
            ACotrller.READY_QUEST_COMPLETE = 'READY_QUEST_COMPLETE'; //准备完成任务
            ACotrller.COLLECTING = 'COLLECTING'; //采集事件
            ACotrller.COLLECTING_END = 'COLLECTING_END'; //结束采集事件
            ACotrller.UPDATE_HANGUP_STATE = "update_hangup_state"; //更新挂机状态
            ACotrller.UPDATE_AUTOWALK_STATE = "update_autowalk_state"; //更新自动寻路状态
            ACotrller.TELEPORT_STATE_CHANGE = 'TELEPORT_STATE_CHANGE'; //传送状态发生变化
            ACotrller.INSTACNE_EXIT_EVENT = "INSTACNE_EXIT_DO"; //退出副本
            ACotrller.SHOW_ERROR_TIPS = "SHOW_ERROR_TIPS"; //显示错误提示
            ACotrller.BEATEN_BY_PLAYER = "BEATEN_BY_PLAYER"; //受玩家攻击
            ACotrller.OPEN_PANEL = "OPEN_PANEL"; //打开某界面
            ACotrller.CLOSE_PANEL = "CLOSE_PANEL"; //关闭某界面
            ACotrller.UPDATE_FIGHT_STATE = "update_fight_state"; //更新战斗状态
            //技能cd 更新事件
            ACotrller.UPDATE_SPELL_CD = "update_spell_cd";
            ACotrller.USE_PANEL_FUNC = "use_panel_func"; //调用某个界面的方法
            //采集条类型
            ACotrller.COLLECT_TYPE_COLLECT = 0; //采集中
            //采集类型时间延迟
            ACotrller.COLLECT_QUEST_TIME = 1000; //任务
            /**
             * 允许pk的等级
             */
            ACotrller.NEW_BIRD_LEVEL = 20;
            /**
             * 新手保护地图
             */
            ACotrller.NEW_BIRD_MAP = 2;
            //行为状态
            ACotrller.BEHAVIOR_STATE_NONE = 0; //无行为
            ACotrller.BEHAVIOR_STATE_QUEST = 1; //做任务中
            ACotrller.BEHAVIOR_STATE_HANGUP = 2; //挂机中
            /*******************************************************************************
             ****************************技能cd**********************************************
             ********************************************************************************/
            //挂机技能配置
            ACotrller.SPELL_HANDUP_CONFIG = [2, 3, 4]; //[[], [3, 4], [8, 9]];
            ACotrller.SPELL_ID_NORMAL = 1; //普攻
            ACotrller.SPELL_SHUNYI_CONFIG = [6, 11, 51];
            //默认激活技能
            ACotrller.SPELL_DEFAULT_JIHUO = [2, 3, 4, 6, 11];
            return ACotrller;
        }(Laya.EventDispatcher));
        cotrl.ACotrller = ACotrller;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=ACotrller.js.map