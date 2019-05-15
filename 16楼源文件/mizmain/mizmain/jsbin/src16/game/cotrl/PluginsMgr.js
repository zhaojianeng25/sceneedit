/**
* 挂机管理
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var PluginsMgr = /** @class */ (function () {
            function PluginsMgr(app) {
                ////////////状态//////////////
                /*是否挂机中*/
                this._isHangUp = false;
                //指定挂机怪
                this._attackUnitEntry = 0;
                /////////////////////////
                //上一次操作时间
                this.lastOptTime = 0;
                //栈空闲时间
                this._stackFreeTime = 0;
                //下一次捡东西时间
                this._nextPickTime = 0;
                //下次战斗时间
                this._nextFightTime = 0;
                //是否需要在无操作的时候去做些什么
                this.isNeedDoOnFreeTime = true;
                this._app = app;
            }
            Object.defineProperty(PluginsMgr.prototype, "attackUnitEntry", {
                get: function () {
                    return this._attackUnitEntry;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PluginsMgr.prototype, "isHangUp", {
                get: function () {
                    return this._isHangUp;
                },
                enumerable: true,
                configurable: true
            });
            //开始挂机
            PluginsMgr.prototype.start = function (attack_unit_entry) {
                if (attack_unit_entry === void 0) { attack_unit_entry = 0; }
                this._isHangUp = true;
                this._attackUnitEntry = attack_unit_entry;
                this._stackFreeTime = PluginsMgr.GUAJI_INTEL;
            };
            //停止挂机
            PluginsMgr.prototype.stop = function () {
                this._isHangUp = false;
                this._attackUnitEntry = 0;
            };
            //设置下次拾取检测时间
            PluginsMgr.prototype.setNextPickTime = function () {
                this._nextPickTime = Laya.timer.currTimer + PluginsMgr.PICK_TIME_LEN;
            };
            //心跳
            PluginsMgr.prototype.update = function (diff) {
                var cur_time = Laya.timer.currTimer;
                var contrller = this._app.aCotrller;
                var sceneObjectMgr = this._app.sceneObjectMgr;
                //是否在空閑狀態下
                if (!sceneObjectMgr.mapAssetInfo || !sceneObjectMgr.mapAssetInfo.isInited || contrller.isTeleporting ||
                    !contrller.canAttack || !contrller.canMove) {
                    this._stackFreeTime = 0;
                    return;
                }
                //如果还有栈 但是太久没捡东西了 那么看下有没有东西捡咯
                var jusPick = false;
                if (!contrller.isStackFree()) {
                    var diffPickTime = this._nextPickTime ? this._nextPickTime - cur_time : 0;
                    //但是如果现在是跟玩家在pk 那么当然不能捡啦
                    var attackPlayer = sceneObjectMgr.selectUnit ? sceneObjectMgr.selectUnit.isPlayer : false;
                    if (diffPickTime < 0 && !attackPlayer) {
                        jusPick = true;
                    }
                    else {
                        this._stackFreeTime = 0;
                        return;
                    }
                }
                //控制下频率
                this._stackFreeTime += diff;
                if (this._stackFreeTime < PluginsMgr.GUAJI_INTEL)
                    return;
                //挂机状态下
                if (this._isHangUp) {
                    this._nextFightTime += diff;
                    this.doHangUp(jusPick);
                }
                else if (this.isNeedDoOnFreeTime) {
                    //多久没动后就开始自动挂机
                    var diffTime = cur_time - this.lastOptTime;
                    if (diffTime > PluginsMgr.QUEST_NO_OPT_TIME) {
                        console.log("人物停止7");
                        contrller.pluginsStart();
                    }
                }
            };
            /**
             * 做挂机该做的事（捡东西或攻击）
             * @param justPick 只是要捡东西 默认false
             */
            PluginsMgr.prototype.doHangUp = function (justPick) {
                if (justPick === void 0) { justPick = false; }
                var sceneObjectMgr = this._app.sceneObjectMgr;
                //如果有战利品 就先捡战利品
                var needPickALl = false;
                var pick_dis = 40;
                // //时间到了就发起挑战
                // if(this._nextFightTime >= 50){
                // 	if(this._app.sceneObjectMgr.mapid != 27)
                // 		this._app.aCotrller.sendTeleport(27,20,20,true,false,false);
                // 	this._nextFightTime = 0;
                // 	return;
                // }
                this.autoMove();
            };
            //四处走动
            PluginsMgr.prototype.autoMove = function () {
                if (this._app.sceneObjectMgr.mapInfo && this._app.sceneObjectMgr.mapInfo.inWorldMap())
                    this.gotoRandomMovePoint();
            };
            //随机走动点
            PluginsMgr.prototype.gotoRandomMovePoint = function () {
                var mainUnit = this._app.sceneObjectMgr.mainUnit;
                if (!mainUnit)
                    return;
                var curMapid = this._app.sceneObjectMgr.mapid;
                var all_creatures = Template.data["tb_questpoint"];
                var arr = [];
                if (all_creatures) {
                    var a_c_len = all_creatures.length;
                    for (var i = 0; i < a_c_len; i++) {
                        var c_obj = all_creatures[i];
                        if (!c_obj || c_obj.map_id != curMapid)
                            continue;
                        arr.push(c_obj);
                    }
                }
                if (!arr.length)
                    return;
                var px = 0;
                var py = 0;
                var rand = MathU.randomRange(0, arr.length - 1);
                if (rand >= 0 && arr[rand]) {
                    var e_obj = arr[rand];
                    var e_pos = this._app.aCotrller.getRandomNearPos(e_obj.pos_x, e_obj.pos_y, 0, 5);
                    px = e_pos[0];
                    py = e_pos[1];
                }
                //跑到这个点后
                if (px > 0 && py > 0) {
                    this._app.aCotrller.moveToDst(px, py, curMapid);
                    // this._app.aCotrller.exec(new FindTouchUnitStack(this._app, curMapid, px, py, targer_id, target_type, null, true));
                }
            };
            //更新攻击对象
            PluginsMgr.prototype.updateFightTarget = function () {
                //只有挂机状态下才触发
                if (!this._isHangUp)
                    return;
                // logd("updateFightTarget")
                this.doHangUp(); //重新洗牌
            };
            //自动攻击
            PluginsMgr.prototype.autoAttack = function () {
                //获取攻击对象
                var targetUnit;
                var mapid = this._app.sceneObjectMgr.mapid;
                if (this._attackUnitEntry > 0) {
                    targetUnit = this._app.sceneObjectMgr.getUnitByEntry(this._app.sceneObjectMgr.mainUnit, this._attackUnitEntry);
                }
                else {
                    targetUnit = this._app.aCotrller.getAttackUnit();
                }
                if (targetUnit) {
                    this._app.aCotrller.attackUnit(targetUnit);
                }
            };
            //释放
            PluginsMgr.prototype.dispose = function () {
            };
            //无操作多长时间 单位毫秒
            PluginsMgr.GUAJI_NO_OPT_TIME = 60000;
            PluginsMgr.QUEST_NO_OPT_TIME = 3000;
            //拾取东西间隔检测时间 加保险
            PluginsMgr.PICK_TIME_LEN = 20000;
            //频率控制
            PluginsMgr.GUAJI_INTEL = 2000;
            return PluginsMgr;
        }());
        cotrl.PluginsMgr = PluginsMgr;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=PluginsMgr.js.map