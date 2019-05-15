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
        var AvatarUnit = /** @class */ (function (_super) {
            __extends(AvatarUnit, _super);
            function AvatarUnit(scene3d, pUnit) {
                var _this = _super.call(this, scene3d, pUnit) || this;
                /*装备显示失效 */
                _this._invalidItems = false;
                /*法宝显示失效 */
                _this._invalidFaBao = false;
                /*aura布局失效*/
                _this._invalidAuraLayout = false;
                /*是否检查装备下载情况*/
                _this._ischecking = false;
                _this._unitLevel = 0;
                // buff特效
                _this._avatarBuffs = [];
                //记录当前御剑状态
                _this._oldYuJianId = 0;
                //是否播放上御剑特效
                _this._isChangYuJianStatus = false;
                //是否播放卧底变换皮肤特效
                _this._isChangeWuDiStatus = false;
                //旧动作
                _this._oldAtnStatus = -1;
                _this._showWingTime = 0;
                _this._oldWodiSkinId = 0; //存储就得卧底皮肤id
                // 闲聊文本
                _this._gossipText = "";
                _this._gossipTexts = [];
                _this._gossipTextFontSize = 0;
                _this._gossipTextWidth = 0;
                _this._gossipTextHeight = 0;
                // 闲聊结束时间
                _this._gossipEndTime = 0;
                // 下次随机判断是否显示时间
                _this._gossipNextTime = 0;
                _this._isNeedRandomGossip = true;
                _this._drawAHeight = 100; // 默认高度
                pUnit.userData = _this;
                //装备or坐骑显示发生变化
                _this.unit.onAvatarChange = function () {
                    _this._invalidItems = true;
                    _this._invalidFaBao = true;
                    //是否播放上御剑特效
                    var curYujianId = _this.unit.mountid;
                    if (_this._oldYuJianId != curYujianId && curYujianId > 0) {
                        _this._isChangYuJianStatus = true;
                    }
                    _this._oldYuJianId = curYujianId;
                };
                _this.unit.onRedWaring = function (flag) {
                    _this._redWaring = flag;
                };
                //初始化视图
                _this.initView();
                // buff显示控制
                var buffs = pUnit.buffMgr.buffs;
                for (var i = 0; i < buffs.length; i++) {
                    _this._avatarBuffs.push(new scene_1.AvatarBuff(_this, pUnit, buffs[i]));
                }
                pUnit.buffMgr.on(LEvent.CHANGED, _this, _this.updateBuffIcons);
                _this.updateBuffIcons();
                return _this;
            }
            Object.defineProperty(AvatarUnit.prototype, "char3d", {
                get: function () {
                    return this._char3d;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarUnit.prototype, "guid", {
                get: function () {
                    return this.unit ? this.unit.guid : "";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarUnit.prototype, "name", {
                get: function () {
                    return this.unit.name;
                },
                enumerable: true,
                configurable: true
            });
            //根据部位获取机器人装备id
            AvatarUnit.prototype.getRobotEquipIdByPos = function (equip_pos) {
                if (!this.unit)
                    return null;
                var robot_lv = this.unit.level;
                var robot_sex = this.unit.sex;
                var item_temp_arr = Template.data["tb_item"];
                if (!item_temp_arr)
                    return null;
                var len = item_temp_arr.length;
                for (var i = 0; i < len; i++) {
                    var itemTemp = item_temp_arr[i];
                    if (!itemTemp || itemTemp.pos != equip_pos || itemTemp.level > robot_lv || itemTemp.sex != robot_sex)
                        continue;
                    return itemTemp.avatar;
                }
                return null;
            };
            //获取衣服
            AvatarUnit.prototype.getCoatAvatar = function () {
                //如果是机器人
                // if (this.unit.isRobot) {
                // 	return this.getRobotEquipIdByPos(ItemField.EQUIPMENT_TYPE_COAT);
                // }
                return null;
            };
            //获取武器
            AvatarUnit.prototype.getWeaponAvatar = function () {
                //如果是机器人
                // if (this.unit.isRobot) {
                // 	return this.getRobotEquipIdByPos(ItemField.EQUIPMENT_TYPE_WEAPON);
                // }
                return null;
            };
            //获取翅膀
            AvatarUnit.prototype.getWingAvatar = function () {
                return null;
                // let wing_lv: number = this.unit.showWings;
                // if (wing_lv < 1) return null;
                // let temp: any = Template.getYuyiTempById(wing_lv);
                // if (!temp) return null;
                // let show_id = temp.show_id;
                // let show_temp: any = Template.getYuyi_showTempById(show_id);
                // return show_temp ? show_temp.avatar : null;
            };
            AvatarUnit.prototype.getWingEffect = function (oldAtnStus) {
                // let wing_lv: number = this.unit.showWings;
                // if (wing_lv < 1) return null;
                // let temp: any = Template.getYuyiTempById(wing_lv);
                // if (!temp) return null;
                // let show_id = temp.show_id;
                // let show_temp: any = Template.getYuyi_showTempById(show_id);
                // if (!show_temp) return null;
                // if (oldAtnStus == AvatarData.STATE_STAND) {
                // 	return show_temp.avatar_stand;
                // }
                // else if (oldAtnStus == AvatarData.STATE_RUNNING) {
                // 	return show_temp.avatar_run;
                // }
                return null;
            };
            //获取坐骑
            AvatarUnit.prototype.getMountAvatar = function () {
                return null;
                // let yujian_id: number = this.unit.mountid;
                // if (yujian_id < 1) return null;
                // let show_temp: any = Template.getYujian_showTempById(yujian_id);
                // return show_temp ? show_temp.avatar : null;
            };
            Object.defineProperty(AvatarUnit.prototype, "headHeight", {
                get: function () {
                    return this._drawAHeight * this._scale + this._rideHeight;
                },
                enumerable: true,
                configurable: true
            });
            AvatarUnit.prototype.initView = function () {
                if (!this.unit)
                    return;
                this._unitLevel = 0;
                this._unitType = this.unit.typeid;
                this._npcFlag = this.unit.npcFlag;
                var uEntry = this.unit.entryid;
                if (this.unit.entryid == 180607 || this.unit.entryid == 180606) {
                    console.log("----精英副本npc");
                }
                switch (this._unitType) {
                    //////////////////// 生物类 /////////////////////////
                    case UnitField.TYPE_ID_CREATURE:
                    case UnitField.TYPE_ID_GAMEOBJ:
                        // this._invalidItems = false;
                        //判断下是否机器人
                        if (Unit.ROBOT_TEMP_ID_LIST.indexOf(uEntry) >= 0) { //机器人特殊处理
                            this._unitType = UnitField.TYPE_ID_PLAYER;
                            this._invalidItems = true;
                        }
                        else {
                            if (this.unit.isMonster)
                                this._unitLevel = this.unit.level;
                            var creatureT_1 = Template.getCreatureTempById(uEntry);
                            // this._npcFlag = creatureT.npc_flag;
                            if (creatureT_1) {
                                this._drawAHeight = creatureT_1.avatar_high;
                                this._linkage.kind = scene_1.AvatarLinkage.KIND_CREATURE;
                                this._linkage.shortName = creatureT_1.avatar || "npc_0001";
                                this.loadItem(this._linkage.getName());
                                console.log("AvatarUnit initView this._linkage.getName()", this._linkage, this._linkage.getName());
                            }
                            else {
                                //loge("AvatarWujiang:AvatarWujiang cant find template:[name=" + this.unit.GetName() + ",id=" + uEntry + "]");
                                this._drawAHeight = 100;
                                this._linkage.kind = 2;
                                this._linkage.shortName = "npc_0001";
                                this.loadItem("npc_0001");
                            }
                        }
                        break;
                    ///////////////// 游戏玩家类的 //////////////////////
                    case UnitField.TYPE_ID_PLAYER:
                        this._oldYuJianId = this.unit.mountid;
                        //装备失效
                        this._invalidItems = true;
                        this._invalidFaBao = true;
                        break;
                    default:
                        logd("AvatarUnit.initView:(未知的Unit.TypeID),值" + this._unitType);
                        break;
                }
                // 名字颜色
                this._nameColor = "FFFFFF"; // 默认白色
                if (this._unitType == UnitField.TYPE_ID_CREATURE) {
                    switch (this._npcFlag) {
                        case Unit.CREATURE_TYPE_NPC:
                            this._nameColor = "FFFF00"; // 黄色
                            break;
                        case Unit.CREATURE_TYPE_ELITE:
                            this._nameColor = "e84bff"; // 紫色
                            break;
                        case Unit.CREATURE_TYPE_BOSS:
                        case Unit.CREATURE_TYPE_SMALL_BOSS:
                            this._nameColor = "FF0000"; //红色
                            break;
                        default:
                            if (this.unit instanceof FakeUnit && this.unit.isSelfRole)
                                this._nameColor = "FFFF00";
                            break;
                    }
                }
                this._char3d = new SceneChar();
                this._char3d.tittleHeight = 0;
                // this._char3d.shadow = !this._scene3d.is2D;
                this._char3d.isCamera2D = this._scene3d.is2D;
                var charid = this.unit.entryid || 1;
                // if (this.unit.isPlayer || this.unit.isRobot) {
                // 	charid = 1;
                // }
                // else {
                // const ids = [1,2, 3, 4,5, 6,7,8,9];
                // charid = ids[this.unit.entryid % ids.length];
                // charid = this.unit.entryid;
                // }
                var creatureT = Template.getCreatureTempById(charid);
                // charid = 5;
                //console.log("AvatarUnit initView this.unit.entryid", this.unit.entryid);
                //console.log("AvatarUnit initView creatureT.avatar", creatureT["avatar"]);
                //console.log("AvatarUnit initView getRoleUrl(creatureT.avatar)", getRoleUrl(creatureT?(creatureT["avatar"]||"npc_0001"):""));
                //this._char3d.setRoleUrl(getRoleUrl(creatureT?(creatureT["avatar"]||"npc_0001"):""));
                // this._char3d.setRoleUrl(getRoleUrl('50001'));
                ////////////////////根据新表格加载模型////////////////////////////
                if (this.unit.entryid == 0) {
                    this.unit.entryid = 1;
                }
                var cNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[this.unit.entryid + ""];
                console.log("AvatarUnit initView cNpcShapeBaseVo", cNpcShapeBaseVo);
                if (cNpcShapeBaseVo) {
                    var url = getRoleUrl(cNpcShapeBaseVo.shape);
                    this._char3d.setRoleUrl(url);
                    //this._char3d.setRoleUrl(getRoleUrl("role_000" + this.unit.entryid));
                    //this._char3d.setRoleUrl(getRoleUrl("4012"));
                    // console.log("AvatarUnit initView entryid, url;", this.unit.entryid, url);
                    console.log("AvatarUnit initView getRoleUrl(cNpcShapeBaseVo.shape)", getRoleUrl(cNpcShapeBaseVo.shape));
                }
                ///////////////////////////////////////////////////////////////
                if (this.unit.isPlayer || this.unit.isRobot) {
                    // // this._char3d.setWeapon(1);
                    // this.unit.SetName(creatureT.name, true);
                    // let mount = Template.getCreatureTempById(10);
                    // this._char3d.setMount(mount["avatar"]);
                    // this._char3d.setWing('ms_0008');
                }
                if (this.unit instanceof FakeUnit && this.unit.isBattleRole) {
                    if (this.unit.hp <= 0) {
                        this.actionStatus = !this.unit.isDieSpecial ? scene_1.AvatarData.STATE_DIING : scene_1.AvatarData.STATE_DIING1;
                        this._char3d.showActionEnd(CharAction.ConvertAction(this.actionStatus, this._isRiding));
                    }
                }
                // this._char3d.charName = this.unit.name;
                // this._char3d.hpRatio = 100;
                // this._char3d.showBlood();
                // this._char3d.angerRatio = 100;
                // this._char3d.showAnger();
                // Laya.timer.loop(3000, this, ()=>{
                // 	this._scene3d.flyText('3625', 1, this._char3d.x, this._char3d.y, this._char3d.z);
                // });
            };
            // 更新缩放
            AvatarUnit.prototype.updateScale = function (scene, imitateMoveRate) {
                if (!this.unit)
                    return;
                _super.prototype.updateScale.call(this, scene, imitateMoveRate);
                if (this._unitType == UnitField.TYPE_ID_CREATURE) {
                    switch (this._npcFlag) {
                        case Unit.CREATURE_TYPE_ELITE:
                            this._scale *= 1.3; // 精英怪放大1.5倍
                            break;
                        case Unit.CREATURE_TYPE_BOSS:
                        case Unit.CREATURE_TYPE_SMALL_BOSS:
                            this._scale *= 1.5; // BOSS放大2倍
                            break;
                    }
                }
                else if (this._unitType == UnitField.TYPE_ID_GAMEOBJ) {
                    var uEntry = this.unit.entryid;
                }
                else if (this._unitType == UnitField.TYPE_ID_PLAYER) {
                }
                // if (this._isRiding) {
                // 	this._scale *= scene.app.avatarFloatingScale;
                // }
            };
            /**
             * 变身
             * @param skinName 皮肤 有值则变身 空值则还原变身
             */
            AvatarUnit.prototype.shapeShift = function (skinName) {
                if (this._skinName == skinName)
                    return;
                this._skinName = skinName;
                this.loadItem(skinName);
                if (!skinName || !skinName.length) {
                    this.invaliDrawInfo();
                }
                else {
                    // this.isRiding = false;//一般变身都没上坐骑资源
                }
            };
            /**
             * 鼠标碰撞检测
             */
            AvatarUnit.prototype.hitTest = function (xMouse, yMouse, scene, hit3DPos) {
                //如果是主玩家自己
                if (!this._hitTestEnabled) {
                    return false;
                }
                // if (this._char3d) {
                // 	return this._char3d.mouseClik(null, hit3DPos);
                // }
                return _super.prototype.hitTest.call(this, xMouse, yMouse, scene, hit3DPos);
            };
            AvatarUnit.prototype.setMount = function (v) {
                if (this._char3d) {
                    this.isRiding = this._char3d.setMount(v);
                }
                else {
                    this.isRiding = false;
                }
            };
            //更新生成状态
            AvatarUnit.prototype.updateLiveStatus = function (liveStatus) {
                if (liveStatus === void 0) { liveStatus = null; }
                if (this.unit.isDied) {
                    if (this._char3d)
                        this._char3d.shadow = false;
                }
                _super.prototype.updateLiveStatus.call(this, liveStatus);
            };
            AvatarUnit.prototype.setVisible = function (v) {
                _super.prototype.setVisible.call(this, v);
                if (this._char3d) {
                    this._char3d.visible = this.visible;
                }
            };
            //播放技能
            AvatarUnit.prototype.playSkill = function (fileName, effectName, hitPosLis) {
                this._scene3d.playSkillByChar(this._char3d, fileName, effectName, null, hitPosLis);
            };
            //播放弹道技能
            AvatarUnit.prototype.playTrajectory = function (target, fileName, effectName) {
                this._scene3d.playTrajectoryByChar(this._char3d, target, fileName, effectName);
            };
            //旋转
            AvatarUnit.prototype.spin = function (offset, time) {
                if (!this._char3d)
                    return;
                Laya.Tween.to(this._char3d, { pRotationY: this._char3d.pRotationY + offset }, time);
            };
            /*是否播放进行中*/
            AvatarUnit.prototype.isActionPlaying = function () {
                return this._char3d && !this._char3d.isMount && this._char3d.isPlaying();
            };
            //显示特效
            AvatarUnit.prototype.showEffect = function (name, x, y, z) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                var index = this.searchEffect(name);
                if (index != -1) { //已存在
                    this._particleInfos[index].x = x;
                    this._particleInfos[index].y = y;
                    this._particleInfos[index].z = z;
                    return;
                }
                if (!this._particleInfos)
                    this._particleInfos = [];
                var url = 'model/' + name + '.txt';
                index = this._particleInfos.length;
                var data = this._particleInfos[index] = { name: name, x: x, y: y, z: z, particle: null };
                this._scene3d.addParticle(url, this._char3d.pScale / 0.73, function (v) {
                    data.particle = v;
                });
            };
            // 图集特效
            AvatarUnit.prototype.showFrameEffect = function (name, info, x, y, z) {
                if (info === void 0) { info = []; }
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                var index = this.searchFrameEffect(name);
                if (index != -1) { //已存在
                    // this._frameEffects[index].x = x;
                    // this._frameEffects[index].y = y;
                    // this._frameEffects[index].z = z;
                    return;
                }
                if (!this._frameEffects)
                    this._frameEffects = [];
                info.loop = info.loop == null ? false : info.loop; //是否循环;
                info.frameScale = (info.frameScale == null ? 0.2 : info.frameScale); //整体缩放比例;
                info.isShow = info.isShow == null ? true : info.isShow; //是否为最上层显示;
                info.x = info.x == null ? 0 : info.x;
                info.y = info.y == null ? 0 : info.y;
                info.z = info.z == null ? 0 : info.z;
                //10601/10601_zhuangtaishifa
                var names = name.split("/");
                var url;
                var baseName;
                if (!info.isbuff) {
                    url = "common/res_3d/frameskill/" + names[0] + "/";
                    baseName = names[1];
                }
                else {
                    url = "common/res_3d/frameskill/buff/" + name + "/";
                    baseName = name;
                    info.frameScale = info.frameScale == null ? 0.3 : info.frameScale;
                }
                var combineParticle = layapan.Frame3DAtlasParticle.getFrameParticle(url, baseName, info);
                combineParticle.x = this._char3d.x + info.x;
                combineParticle.y = this._char3d.y + info.y;
                combineParticle.z = this.char3d.z;
                index = this._frameEffects.length;
                this._frameEffects[index] = { name: name, combineParticle: combineParticle, x: info.x, y: info.y, z: info.z };
                this._scene3d.particleManager.addParticle(combineParticle);
            };
            // 移除图集特效
            AvatarUnit.prototype.clearFrameEffect = function (name) {
                var index = this.searchFrameEffect(name);
                if (index == -1)
                    return; // 不存在
                if (this._frameEffects[index].combineParticle)
                    this._scene3d.particleManager.removeParticle(this._frameEffects[index].combineParticle);
                this._frameEffects.splice(index, 1);
            };
            //清理玩家的所有特效用于死亡，清理战场等
            AvatarUnit.prototype.clearAllFrameEffect = function () {
                this._scene3d.particleManager.removeAllParticle();
            };
            //清理特效
            AvatarUnit.prototype.clearEffect = function (name) {
                var index = this.searchEffect(name);
                if (index == -1)
                    return; //不存在
                if (this._particleInfos[index].particle)
                    this._scene3d.removeParticle(this._particleInfos[index].particle);
                this._particleInfos.splice(index, 1);
            };
            //搜索特效
            AvatarUnit.prototype.searchEffect = function (value) {
                if (!this._particleInfos)
                    return -1;
                for (var i = 0; i < this._particleInfos.length; i++) {
                    if (this._particleInfos[i].name == value)
                        return i;
                }
                return -1;
            };
            //搜索图集特效
            AvatarUnit.prototype.searchFrameEffect = function (value) {
                if (!this._frameEffects)
                    return -1;
                for (var i = 0; i < this._frameEffects.length; i++) {
                    if (this._frameEffects[i].name == value)
                        return i;
                }
                return -1;
            };
            //绘制3d特效
            AvatarUnit.prototype.onDrawEffect = function () {
                if (!this._particleInfos)
                    return;
                for (var i = 0; i < this._particleInfos.length; i++) {
                    if (!this._particleInfos[i].particle)
                        continue;
                    this._particleInfos[i].particle.x = this._char3d.x + this._particleInfos[i].x;
                    this._particleInfos[i].particle.z = this._char3d.z + this._particleInfos[i].z;
                    this._particleInfos[i].particle.y = this._char3d.y + this._particleInfos[i].y;
                }
            };
            // 绘制之前数据更新 
            AvatarUnit.prototype.onDrawBefore = function (diff, scene) {
                _super.prototype.onDrawBefore.call(this, diff, scene);
                if (this.unit.isDied)
                    this.clearAllFrameEffect();
                if (this._char3d) {
                    //console.log("@@@@@@@@@@@绘制 ", this.unit.name, " isbattle", this.unit.battle, " isVisible", this.unit.getVisible());
                    //隐藏非战斗模型
                    if (scene.app.sceneObjectMgr.mapInfo.inBattle && !this.unit.battle) {
                        scene.showBack(true);
                        this._char3d.visible = false;
                        this._char3d.stopMove;
                    }
                    else
                        this._char3d.visible = this.unit.isVisible();
                    this.setVisible(this._char3d.visible);
                    // 特效跟随	
                    for (var key in this._frameEffects) {
                        this._frameEffects[key].combineParticle.x = this._char3d.x + this._frameEffects[key].x;
                        this._frameEffects[key].combineParticle.y = this._char3d.y + this._frameEffects[key].y;
                        this._frameEffects[key].combineParticle.z = this._char3d.z + +this._frameEffects[key].z;
                    }
                    // 刷新一下3d形象位置						
                    if (this._scene3d.is2D) {
                        var x = (this._pos.x - scene.camera.logicLeft) * scene_1.SceneRes.CELL_WIDTH * scene.scaleX;
                        var y = (this._pos.y - scene.camera.logicTop) * scene_1.SceneRes.CELL_HEIGHT * scene.scaleY;
                        // this._char3d.px = x / (PanEngine.htmlScale * 4) * scene.scaleX;
                        // this._char3d.pz = y / (PanEngine.htmlScale * 4) * scene.scaleY / (Math.sin(45 * Math.PI / 180));
                        // this._char3d.py = 0;
                        this._char3d.set2dPos(x, y);
                    }
                    else {
                        // this._char3d.px = this._pos.x;
                        // this._char3d.pz = this._pos.y;
                        //形象所处高度
                        // this._char3d.py = this.unit.high+1;
                    }
                    // 缩放
                    this._char3d.pScale = this._scale = this.unit.scale;
                    // 方向
                    this._char3d.pRotationY = this.faceto + 90;
                    if (!this._char3d.onStage) {
                        // 添加到场景
                        this._scene3d.addMovieDisplay(this._char3d);
                    }
                    this.unit.count = 0;
                    if (this.unit.captain == 1 && this.unit.isaddeffect == 0) {
                        this.unit.isaddeffect = 1;
                        this._char3d.removePart("duizhang");
                        this._char3d.addPart("duizhang", Pan3d.SceneChar.NONE_SLOT, getModelUrl("buff_lyf"));
                    }
                    else if ((this.unit.captain == -1 || this.unit.captain == 0 || !this._char3d.visible) && this.unit.isaddeffect == 1) {
                        this._char3d.removePart("duizhang");
                        this.unit.isaddeffect = 0;
                    }
                    //战斗标志特效
                    if (this.unit.roleState == 1 && this._char3d.visible) {
                        this.unit.roleState = -1;
                        this._char3d.removePart("InBattle");
                        this._char3d.addPart("InBattle", Pan3d.SceneChar.NONE_SLOT, getModelUrl("watchbattle_lyf"));
                    }
                    else if (this.unit.roleState == 0 || !this._char3d.visible) {
                        this._char3d.removePart("InBattle");
                        this.unit.roleState = -1;
                    }
                    /**副本*/
                    if (this.unit.carbon == 1) {
                        this.unit.carbon = 0;
                        this._char3d.removePart("fuben");
                        this.unit.count = this.unit.count + 1;
                        this._char3d.addPart("fuben", Pan3d.SceneChar.NONE_SLOT, getModelUrl("fuben_lyf"));
                    }
                    /**帮派副本*/
                    if (this.unit.familyfuben == 1) {
                        this.unit.familyfuben = 0;
                        this._char3d.removePart("familyfuben");
                        this._char3d.addPart("familyfuben", Pan3d.SceneChar.NONE_SLOT, getModelUrl("bangpaifuben_lyf"));
                        this.unit.count = this.unit.count + 1;
                    }
                    /**商店NPC */
                    if (this.unit.shop == 1) {
                        this.unit.shop = 0;
                        this._char3d.removePart("shop");
                        this._char3d.addPart("shop", Pan3d.SceneChar.NONE_SLOT, getModelUrl("shop_lyf"));
                        this.unit.count = this.unit.count + 1;
                    }
                    //自动寻路
                    if (this.unit.autowalk == 1) {
                        this.unit.autowalk = 3;
                        this._char3d.removePart("autowalk");
                        this._char3d.addPart("autowalk", Pan3d.SceneChar.NONE_SLOT, getModelUrl("autowalk_lyf"));
                        this.unit.count = this.unit.count + 1;
                    }
                    //自动巡逻
                    if (this.unit.xunluo == 1) {
                        this.unit.xunluo = 3;
                        this._char3d.removePart("xunluo");
                        this._char3d.addPart("xunluo", Pan3d.SceneChar.NONE_SLOT, getModelUrl("autorun_lyf"));
                        this.unit.count = this.unit.count + 1;
                    }
                    else if (this.unit.xunluo == 2) {
                        this.unit.xunluo = -1;
                        this._char3d.removePart("xunluo");
                    }
                    /**宠物商店 */
                    if (this.unit.petshop == 1) {
                        this.unit.petshop = 0;
                        this._char3d.removePart("petshop");
                        this._char3d.addPart("petshop", Pan3d.SceneChar.NONE_SLOT, getModelUrl("petshop_lyf"));
                        this.unit.count = this.unit.count + 1;
                    }
                    /**掌门*/
                    if (this.unit.chief == 1) {
                        this.unit.chief = 3;
                        this._char3d.removePart("zhangmen");
                        this._char3d.addPart("zhangmen", Pan3d.SceneChar.NONE_SLOT, getModelUrl("zhangmen_lyf"));
                        this.unit.count = this.unit.count + 1;
                    }
                    /**屠魔试炼*/
                    if (this.unit.tumo == 1) {
                        this.unit.tumo = 0;
                        this._char3d.removePart("tumo");
                        this._char3d.addPart("tumo", Pan3d.SceneChar.NONE_SLOT, getModelUrl("tumoshilian_lyf"));
                        this.unit.count = this.unit.count + 1;
                    }
                    /**比武场*/
                    if (this.unit.biwu == 1) {
                        this.unit.biwu = 0;
                        this._char3d.removePart("biwu");
                        this._char3d.addPart("biwu", Pan3d.SceneChar.NONE_SLOT, getModelUrl("biwuchang_lyf"));
                        this.unit.count = this.unit.count + 1;
                    }
                    /**悬赏*/
                    if (this.unit.xuanshang == 1) {
                        this.unit.xuanshang = 0;
                        this._char3d.removePart("xuanshang");
                        this._char3d.addPart("xuanshang", Pan3d.SceneChar.NONE_SLOT, getModelUrl("xuanshang_lyf"));
                        this.unit.count = this.unit.count + 1;
                    }
                    /**乱世降妖*/
                    if (this.unit.welfare == 1) {
                        this.unit.welfare = 0;
                        this._char3d.removePart("welfare");
                        this._char3d.addPart("welfare", Pan3d.SceneChar.NONE_SLOT, getModelUrl("luanshixianyao_lyf"));
                        this.unit.count = this.unit.count + 1;
                    }
                    /**藏宝图*/
                    if (this.unit.baotu == 1) {
                        this.unit.baotu = 0;
                        this._char3d.removePart("cangbaotu");
                        this._char3d.addPart("cangbaotu", Pan3d.SceneChar.NONE_SLOT, getModelUrl("cangbaotu_lyf"));
                        this.unit.count = this.unit.count + 1;
                    }
                    /** 福利*/
                    if (this.unit.demon == 1) {
                        this.unit.demon = 0;
                        this._char3d.removePart("fuli");
                        this._char3d.addPart("fuli", Pan3d.SceneChar.NONE_SLOT, getModelUrl("fuli_lyf"));
                        this.unit.count = this.unit.count + 1;
                    }
                    /**升级特效*/
                    if (this.unit.levelup == 1) {
                        this.unit.levelup = 0;
                        this._char3d.removePart("leveup");
                        this._char3d.addPart("leveup", Pan3d.SceneChar.NONE_SLOT, getModelUrl("levelup_lyf"));
                    }
                    /**关闭特效 */
                    if (this.unit.levelup == 2) {
                        this.unit.levelup = 0;
                        this._char3d.removePart("leveup");
                    }
                    // /**染色*/
                    // if (this.unit.ranse == 1) {
                    // 	this.unit.ranse = 0
                    // 	this._char3d.removePart("ranse")
                    // 	this._char3d.addPart("ranse", Pan3d.SceneChar.NONE_SLOT, getModelUrl("ranse_lyf"));
                    // 	this.unit.count = this.unit.count + 1
                    // }
                    /**NPC选择特效 */
                    if (this.unit.npcselect == 1) {
                        this.unit.npcselect = 3;
                        this._char3d.removePart("npc");
                        this._char3d.addPart("npc", Pan3d.SceneChar.NONE_SLOT, getModelUrl("npcxuanzhon_lyf"));
                    }
                    else if (this.unit.npcselect == 0) {
                        this.unit.npcselect = -1;
                        this._char3d.removePart("npc");
                    }
                    /**主线*/
                    if (this.unit.zhuxian == 1) {
                        this.unit.zhuxian = 3;
                        this._char3d.removePart("zhuxian");
                        this._char3d.addPartToPos("zhuxian", getModelUrl("zhuxian_lyf"), new Pan3d.Vector3D(0, 20 * this.unit.count, 0));
                        this.unit.count = this.unit.count + 1;
                    }
                    else if (this.unit.zhuxian == 2) {
                        this.unit.zhuxian = -1;
                        this._char3d.removePart("zhuxian");
                    }
                    else if (this.unit.zhuxian == 6) { /**战斗主线 */
                        this.unit.zhuxian = 3;
                        this._char3d.removePart("zhuxian");
                        this._char3d.addPartToPos("zhuxian", getModelUrl("zhandou_lyf"), new Pan3d.Vector3D(0, 20 * this.unit.count, 0));
                        this.unit.count = this.unit.count + 1;
                    }
                    /**任务状态 */
                    if (this.unit.accpet == -1) {
                        this.unit.accpet = 5;
                        this._char3d.removePart("accpet");
                        this._char3d.addPartToPos("accpet", getModelUrl("maohao_lyf"), new Pan3d.Vector3D(0, 20 * this.unit.count, 0));
                    }
                    else if (this.unit.accpet == 2 || this.unit.accpet == 0) {
                        this.unit.accpet = 5;
                        this._char3d.removePart("accpet");
                    }
                    else if (this.unit.accpet == 3) { /**已完成图标 */
                        this.unit.accpet = 5;
                        this._char3d.removePart("accpet");
                        this._char3d.addPartToPos("accpet", getModelUrl("wenhao_lyf"), new Pan3d.Vector3D(0, 20 * this.unit.count, 0));
                    }
                    else if (this.unit.accpet == 4) { /**未完成图标*/
                        this.unit.accpet = 5;
                        this._char3d.removePart("accpet");
                        this._char3d.addPartToPos("accpet", getModelUrl("wenhao_hui_lyf"), new Pan3d.Vector3D(0, 20 * this.unit.count, 0));
                    }
                    /**停止移动 */
                    if (this.unit.stopwalk == 1 || !this.visible) {
                        this.unit.stopwalk = 0;
                        this.unit.xunluo = 0;
                        this.unit.autowalk = 0;
                        this._char3d.removePart("autowalk");
                        this._char3d.removePart("xunluo");
                        this._char3d.removePart("npc");
                        this._char3d.removePart("zhuxian");
                    }
                    if (this.unit.appellation && this.unit.appellation != "") {
                        this._char3d.tittleHeight = -22;
                    }
                    else
                        this._char3d.tittleHeight = -10;
                    // this._char3d.tittleHeight = -10
                    //绘制3d特效
                    this.onDrawEffect();
                    if (this._buffIcons) {
                        this._buffIcons.pos.x = this._char3d.x + this._buffPos.x;
                        this._buffIcons.pos.y = this._char3d.y + this._buffPos.y;
                        this._buffIcons.pos.z = this._char3d.z + this._buffPos.z;
                    }
                    if (!this._char3d.isSinging) {
                        // 动作	
                        var completeState = 0; // 循环播放
                        switch (this.actionStatus) {
                            case scene_1.AvatarData.STATE_DIING: //死亡ing
                            case scene_1.AvatarData.STATE_DIING1: //死亡ing
                            case scene_1.AvatarData.STATE_ATTACKGO: //攻击出击
                            case scene_1.AvatarData.STATE_ATTACKGO2: //攻击出击
                            case scene_1.AvatarData.STATE_ATTACKGO3: //攻击出击
                            case scene_1.AvatarData.STATE_BEATEN: //受击
                            case scene_1.AvatarData.STATE_LEISURE: //休闲
                                completeState = 1; // 只播放一次
                                break;
                        }
                        if (!scene.app.sceneObjectMgr.mapInfo.inBattle)
                            this._char3d.play(CharAction.ConvertAction(this.actionStatus, this._isRiding), completeState);
                    }
                    this._char3d._isBattle = scene.app.sceneObjectMgr.mapInfo.inBattle ? true : false;
                }
            };
            AvatarUnit.prototype.onDraw = function (diff, g, scene) {
                _super.prototype.onDraw.call(this, diff, g, scene);
                //不显示
                if (!this.isNeedDrawView)
                    return;
                // buff
                for (var i = 0; i < this._avatarBuffs.length; i++) {
                    this._avatarBuffs[i].onDraw(diff, scene);
                }
                //检查是否要求换装
                if (this._invalidItems) {
                    this._invalidItems = false;
                    this.updateAvatarItemData();
                    //是否播放御剑特效
                    if (this._isChangYuJianStatus) {
                        this._isChangYuJianStatus = false;
                        this.playYuJianUpEffect(scene);
                    }
                    //是否播放卧底特效
                    if (this._isChangeWuDiStatus) {
                        this._isChangeWuDiStatus = false;
                        this.playYuJianUpEffect(scene);
                    }
                }
                //检查装备
                if (this._ischecking && this._multi_items) {
                    this.checkItems();
                }
                var thisTime = Laya.timer.currTimer;
                //帧索引
                var frameIdx = this.getCurrentIdx();
                //帧位置
                var fd_address = scene_1.AvatarItem.getFrameDataAddress(this._action, this._direct, frameIdx);
                if (!this.isImageType && !this._singleItem) {
                    ////////////// 多层 ////////////////////
                    var unloadBoyd = false;
                    if (!this._multi_items) {
                        unloadBoyd = true;
                    }
                    if (!unloadBoyd) {
                        var item = this._multi_items[scene_1.AvatarData.IDX_CLOTHES];
                        if (!item || !item.isLoaded || item.isError) {
                            unloadBoyd = true;
                        }
                    }
                    if (unloadBoyd) {
                        var texture = scene_1.AvatarBase._unloadTexture;
                        this.drawTextureRegX = -texture.sourceWidth / 2;
                        this.drawTextureRegY = -(texture.height - 5);
                        this._curRenderMatrix = this._singleItem_mix;
                        this.renderTexture(g, texture, true, scene);
                        return;
                    }
                    //针起始地址
                    var a_stuas = scene_1.AvatarData.ConvertActionSort(this.actionStatus, this.isRiding);
                    var frameSortPos = scene_1.AvatarData.getSortStartPos(this.unit.sex, a_stuas, this._direct, frameIdx);
                    //查找所有
                    for (var i = 0; i < scene_1.AvatarData.MAX_ITEMS; i++) {
                        var itemID = void 0;
                        itemID = scene_1.AvatarData.Get(frameSortPos + i);
                        if (itemID < 0)
                            break;
                        //获得装备项对象
                        var item = this._multi_items[itemID];
                        //还未下载好
                        if (!item)
                            continue;
                        //如果是翅膀 判断是否到显示时间了
                        if (itemID == scene_1.AvatarData.IDX_WINGS && this._showWingTime > thisTime) {
                            continue;
                        }
                        // logd("装备",i,itemID)
                        //查找素材内存地址
                        //贴图变量
                        var texture = item.getBitmapData(fd_address);
                        //贴图未准备好
                        if (!texture)
                            continue;
                        this.drawTextureRegX = item.getFrameRegX(fd_address);
                        this.drawTextureRegY = item.getFrameRegY(fd_address) - this._rideHeight;
                        var mix = this._multi_items_mix[itemID];
                        if (!mix)
                            this._multi_items_mix[itemID] = mix = new Matrix(-1);
                        this._curRenderMatrix = mix;
                        //衣服类型需要特殊处理，鼠标碰撞专用
                        this.renderTexture(g, texture, itemID == scene_1.AvatarData.IDX_CLOTHES, scene);
                    }
                    //是否需要播放翅膀消失特效
                    if (this._oldAtnStatus >= 0) {
                        var flyDisapperEffectName = this.getWingEffect(this._oldAtnStatus);
                        if (flyDisapperEffectName) {
                            var wingEffect = ObjectPools.malloc(scene_1.EffectAvatar);
                            wingEffect.setData("0000" + flyDisapperEffectName);
                            wingEffect.anchorObject = this.unit;
                            wingEffect.toward = this.unit.toward;
                            wingEffect.atBottom = false;
                            if (this.rideHeight > 0)
                                wingEffect.setOffset(0, -this.rideHeight);
                            scene.addEffect(wingEffect);
                            this._oldAtnStatus = -1;
                        }
                    }
                }
                this.updateRedWaring(scene);
            };
            // 更新透明度
            AvatarUnit.prototype.updateAlpha = function () {
                var dispearIng = _super.prototype.updateAlpha.call(this);
                if (!dispearIng && this.unit.isBuffAlpha) {
                    //如果有buff 需要透明的
                    this._drawAlpha = this._char3d.alpha;
                    this._char3d.isBuff = true;
                    this.unit.isBuffAlpha = false;
                }
                this._char3d && (this._char3d.alpha = this._drawAlpha);
                return dispearIng;
            };
            // 绘制底下部分
            AvatarUnit.prototype.onDrawBottom = function (g, scene) {
                if (!this.unit || this.unit.isDied || !this.isNeedDrawView)
                    return;
                //游戏对象 处于水层 不需要影子
                if (this.unit.isGameObject && this._atWaterLayer)
                    return;
                //影子
                var texture = scene_1.AvatarBase._shadowTexture;
                var dw = texture.width;
                var dh = texture.height;
                var dx = this._drawX - scene_1.AvatarBase._shadow_offsetX;
                var dy = this._drawY - scene_1.AvatarBase._shadow_offsetY;
                var avatarScale = this._scale;
                if (avatarScale != 1) {
                    dw = dw * avatarScale;
                    dh = dh * avatarScale;
                    dx = dx - (dw - texture.width) / 2;
                    dy = dy - (dh - texture.height) / 2;
                }
                g.drawTexture(texture, dx, dy, dw, dh);
            };
            // 绘制怒气部分
            AvatarUnit.prototype.onDrawAnger = function (g, scene, offsetY) {
                var unit = this.unit;
                if (!unit || !unit.needShowAnger || unit.isDied || !this.isNeedDrawView) {
                    this._char3d.angerEnable = false;
                    return offsetY;
                }
                var anger_pi = this.GetAngerViewPI();
                if (anger_pi >= 0) {
                    this._char3d.angerEnable = true;
                    this._char3d.angerRatio = 100 * anger_pi;
                }
                else {
                    this._char3d.angerEnable = false;
                }
                return offsetY;
            };
            // 绘制名字部分
            AvatarUnit.prototype.onDrawName = function (g, scene, offsetY) {
                var unit = this.unit;
                if (!unit || unit.isDied || !this.isNeedDrawView || !unit.needShowName || (unit instanceof FakeUnit && unit.isBattleRole && unit.hp <= 0)) {
                    this._char3d.nameEnable = false;
                    this._char3d.bloodEnable = false;
                    this._char3d.titleEnable = false;
                    return offsetY;
                }
                var h_pi = this.GetHealthViewPI();
                if (h_pi >= 0) {
                    this._char3d.bloodEnable = true;
                    this._char3d.hpRatio = 100 * h_pi;
                    if (!(unit instanceof FakeUnit) || unit.isSelfRole)
                        this._char3d.bloodColor = layapan.LayaSceneChar.BLOOD_COLOR_HP;
                    else
                        this._char3d.bloodColor = layapan.LayaSceneChar.BLOOD_COLOR_ANGER;
                }
                else if (this._unitType == UnitField.TYPE_ID_CREATURE && this._npcFlag == Unit.CREATURE_TYPE_MONSTER) {
                    // 普通怪物在没受到攻击时不显示名字
                    this._char3d.bloodEnable = false;
                    return offsetY;
                }
                var name = unit.name;
                // name += "," + this.unit.guid + "[" + Math.floor(this.unit.pos.x * 10) / 10 + "," + Math.floor(this.unit.pos.y * 10) / 10 + "]"
                // + "[" + Math.floor(this.unit.GetTargetPosX() * 10) / 10 + "," + Math.floor(this.unit.GetTargetPosY() * 10) / 10 + "]"
                // + "[" + Math.floor(this.unit.target.x * 10) / 10 + "," + Math.floor(this.unit.target.y * 10) / 10 + "] (" + this.unit.moveStatus + ")" + this.unit.movePath;
                if (name) {
                    this._char3d.nameEnable = true;
                    //如果是玩家
                    if (unit.isPlayer) {
                        //pk模式
                        this._nameColor = this.getPlayerNameColor(scene);
                    }
                    this._char3d.charName = "[" + this._nameColor + "]" + name;
                }
                else {
                    this._char3d.nameEnable = false;
                }
                //刷新称谓
                var appellation = unit.appellation;
                if (appellation) {
                    this._char3d.titleEnable = true;
                    this._char3d.charTitle = appellation;
                    // this._char3d.setWeaponSlotByAvatar(5001010,"weapon_dao"); 
                }
                else {
                    this._char3d.titleEnable = false;
                }
                //刷新模型武器
                if (unit.Weapon > 0 && unit.School != -1 && unit.School != -1) {
                    var school = unit.School;
                    var shape = unit.Shape;
                    var sex = shape % 2 == 0 ? Sex.woman : Sex.man;
                    var weaponName = LoginModel.getweaponBySchool(school, sex);
                    this._char3d.setWeaponSlotByAvatar(unit.Weapon, weaponName);
                    unit.Weapon = 0;
                }
                else if (unit.Weapon == -1) {
                    this._char3d.setWeapon(-1);
                    unit.Weapon = 0;
                }
                return offsetY;
            };
            /** 获取玩家名字颜色
             * 1、玩家看到自身为黄色
             * 2、正常情况下，玩家看到其他人为白色
             * 3、灰名状态下，名字显示灰色
             * 4、善恶值超过10点后，名字显示红色
             * 5、特殊，在仙道大会、斗仙台中，己方所有成员显示蓝色，敌方所有成员显示红色
             */
            AvatarUnit.prototype.getPlayerNameColor = function (scene) {
                var unit = this.unit;
                if (!unit)
                    return "FFFFFF";
                // 自己黄色
                if (unit == scene.app.sceneObjectMgr.mainUnit || (this.unit instanceof FakeUnit && this.unit.isSelfRole)) {
                    return "40ea02"; //00FF00
                }
                //其他人默认白色
                return "00FF00";
            };
            AvatarUnit.prototype.setGossipMess = function (value, fontSize, delay) {
                if (delay === void 0) { delay = 0; }
                var cur_time = Laya.timer.currTimer;
                if (this._gossipText == value) {
                    return;
                }
                this._gossipText = value;
                this._gossipTexts.length = 0;
                if (!this._gossipText || this._gossipText == "") {
                    this._gossipEndTime = cur_time - 1;
                    return;
                }
                this._gossipTextFontSize = fontSize;
                var tempText = AvatarUnit._tempText;
                if (!tempText) {
                    tempText = new laya.display.Text();
                    AvatarUnit._tempText = tempText;
                    tempText.fontSize = this._gossipTextFontSize;
                    tempText.font = "SimHei";
                    tempText.color = "#FFFFFf";
                    tempText.width = 160 / 14 * this._gossipTextFontSize;
                    tempText.wordWrap = true;
                    tempText.leading = 2;
                    tempText.bold = true;
                }
                tempText.text = this._gossipText;
                this._gossipTextWidth = tempText.textWidth;
                this._gossipTextHeight = tempText.textHeight;
                this._gossipTexts = tempText.lines.concat();
                this._gossipEndTime = cur_time + (delay > 0 ? delay : 5000);
            };
            AvatarUnit.prototype.onDrawGossip = function (g, scene, offsetY) {
                if (!this.isNeedDrawView
                    || !this._isNeedRandomGossip
                    || !this.unit
                    || this.unit.isDied) {
                    return offsetY;
                }
                var cur_time = Laya.timer.currTimer;
                if (cur_time > this._gossipNextTime) {
                    this._gossipNextTime = cur_time + 7000 + Math.floor(Math.random() * 3000);
                    if (Math.random() < 0.1) {
                        // this.setGossipMess(GossipData.randGossip(this.unit.entryid), scene.sceneFontSize);
                    }
                }
                if (cur_time > this._gossipEndTime) {
                    this._gossipTexts.length = 0;
                    return offsetY;
                }
                var textHeight = this._gossipTextHeight;
                var dh = textHeight + 10;
                offsetY += dh;
                var lineHeight = this._gossipTextFontSize + 2;
                var textsCount = this._gossipTexts.length;
                var dx = Math.floor(this._drawX - 76);
                var dy = Math.floor(this._drawY - offsetY - 1);
                g.drawTexture(scene_1.AvatarBase._gossTexture, dx - 6, dy - 6, this._gossipTextWidth + 10, dh);
                for (var i = 0; i < textsCount; i++) {
                    g.fillBorderText(this._gossipTexts[i], dx, dy + i * lineHeight, this._gossipTextFontSize + "px SimHei", '#FFFFFf', "#000000", 2, "left");
                }
                return offsetY;
            };
            // 绘制头顶标识部分
            AvatarUnit.prototype.onDrawMask = function (g, scene, offsetY) {
                if (!this.unit || this.unit.isDied || !this.isNeedDrawView)
                    return offsetY;
                var avatarScale = this._scale;
                avatarScale = 1; // 不放大
                var texture;
                //如果是任务npc
                if (this.unit.isNpc) {
                    var npcHeadMask = 0;
                    var dw = void 0, dh = void 0;
                    var config = void 0;
                    var effectMask = void 0;
                    if (npcHeadMask == 2) {
                        if (this._npcYellowAni) {
                            this._npcYellowAni.isPlayEnd = true;
                            ObjectPools.free(this._npcYellowAni);
                            this._npcYellowAni = null;
                        }
                        config = EffectMgr.EFFECT_NPC_BLUE;
                        if (!this._npcBlueAni) {
                            this._npcBlueAni = ObjectPools.malloc(scene_1.EffectFrame, null, config.frameCount, config.interval);
                            this._npcBlueAni.setAssetPath(config.sourcePath);
                            this._npcBlueAni.anchorObject = this.unit;
                            this._npcBlueAni.setLoop(true);
                            this._npcBlueAni.setData(config.source, config.interval, config.fileName, 10000);
                        }
                        effectMask = this._npcBlueAni;
                    }
                    else if (npcHeadMask == 1) {
                        if (this._npcBlueAni) {
                            this._npcBlueAni.isPlayEnd = true;
                            ObjectPools.free(this._npcBlueAni);
                            this._npcBlueAni = null;
                        }
                        config = EffectMgr.EFFECT_NPC_YELLOW;
                        if (!this._npcYellowAni) {
                            this._npcYellowAni = ObjectPools.malloc(scene_1.EffectFrame, null, config.frameCount, config.interval);
                            this._npcYellowAni.setAssetPath(config.sourcePath);
                            this._npcYellowAni.anchorObject = this.unit;
                            this._npcYellowAni.setLoop(true);
                            this._npcYellowAni.setData(config.source, config.interval, config.fileName, 10000);
                        }
                        effectMask = this._npcYellowAni;
                    }
                    else {
                        this.clearNpcMask();
                    }
                    if (effectMask && !effectMask.isPlayEnd) {
                        offsetY -= 30;
                        dw = effectMask.width;
                        dh = effectMask.height;
                        var dx = void 0, dy = void 0;
                        dw = dw * avatarScale;
                        dh = dh * avatarScale;
                        offsetY += dh / 2;
                        // logd("npc mask",dx,dy,dw,dh,avatarScale,this._drawX,this._drawY,AvatarBase.npcBuleAni.index,AvatarBase.npcYellowAni.index);
                        effectMask.setOffset(0, -offsetY);
                        effectMask.updateTexture();
                        effectMask.onDraw(g, scene.camera);
                    }
                }
                else if (this._unitType == UnitField.TYPE_ID_CREATURE) {
                    switch (this._npcFlag) {
                        case Unit.CREATURE_TYPE_BOSS:
                            texture = scene_1.AvatarBase.HEAD_MASK_BOSS;
                            break;
                        case Unit.CREATURE_TYPE_SMALL_BOSS:
                            texture = scene_1.AvatarBase.HEAD_MASK_BOSS_WORLD;
                            break;
                        case Unit.CREATURE_TYPE_ELITE:
                            //texture = AvatarBase.HEAD_MASK_JINGYING;
                            break;
                    }
                }
                else if (this._unitType == UnitField.TYPE_ID_PLAYER) {
                }
                if (texture) {
                    offsetY += scene_1.AvatarBase.HEAD_NODE_INTERVAL;
                    var dx = void 0, dy = void 0, dw = void 0, dh = void 0;
                    dw = texture.width * avatarScale;
                    dh = texture.height * avatarScale;
                    offsetY += dh;
                    dx = this._drawX - dw / 2;
                    dy = this._drawY - offsetY;
                    g.drawTexture(texture, dx, dy, dw, dh);
                }
                return offsetY;
            };
            //清理npc标志
            AvatarUnit.prototype.clearNpcMask = function () {
                if (this._npcBlueAni) {
                    this._npcBlueAni.isPlayEnd = true;
                    ObjectPools.free(this._npcBlueAni);
                    this._npcBlueAni = null;
                }
                if (this._npcYellowAni) {
                    this._npcYellowAni.isPlayEnd = true;
                    ObjectPools.free(this._npcYellowAni);
                    this._npcYellowAni = null;
                }
            };
            AvatarUnit.prototype.updateRedWaring = function (scene) {
                if (this._redWaring && !this._circleData && !this.unit.isDied) {
                    this._circleData = new game.data.Circle(this.unit.pos.x, this.unit.pos.y, 15);
                    scene.UnSafeArea = this._circleData;
                }
                else if (!this._redWaring && this._circleData) {
                    this._circleData = null;
                    scene.UnSafeArea = null;
                }
                else if (this._circleData && this.unit.isDied) {
                    this._circleData = null;
                    scene.UnSafeArea = null;
                }
            };
            //检查装备更新
            AvatarUnit.prototype.checkItems = function () {
                //检查是否avatarItems下载好了
                var isComplete = true;
                for (var i = 0; i < this._multi_items.length; i++) {
                    var item = this._multi_items[i];
                    if (item && !(item.isError || item.isLoaded)) {
                        isComplete = false;
                    }
                }
                if (isComplete) {
                    if (this._multi_items[scene_1.AvatarData.IDX_RIDE]) {
                        this._multi_items[scene_1.AvatarData.IDX_RIDE].setActionCopy(scene_1.AvatarData.ACTION_STAND, scene_1.AvatarData.ACTION_RUNNING);
                        this._multi_items[scene_1.AvatarData.IDX_RIDE].setActionCopy(scene_1.AvatarData.ACTION_STAND, scene_1.AvatarData.ACTION_BEATEN);
                        this._multi_items[scene_1.AvatarData.IDX_RIDE].setActionCopy(scene_1.AvatarData.ACTION_STAND, scene_1.AvatarData.ACTION_ATTACKGO);
                    }
                    this._ischecking = false;
                    //视图失效
                    this.invaliDrawInfo();
                }
            };
            // 追加动作状态 
            AvatarUnit.prototype.attachActionStatus = function (atnStus) {
                var oldAtnStus = this.actionStatus;
                _super.prototype.attachActionStatus.call(this, atnStus);
                this._oldAtnStatus = -1;
                //转为攻击动作
                if (this.actionStatus == scene_1.AvatarData.STATE_ATTACKGO
                    || this.actionStatus == scene_1.AvatarData.STATE_ATTACKGO2
                    || this.actionStatus == scene_1.AvatarData.STATE_ATTACKGO3) {
                    //加技能消失特效
                    var cur_time = Laya.timer.currTimer;
                    if (oldAtnStus == scene_1.AvatarData.STATE_STAND || oldAtnStus == scene_1.AvatarData.STATE_RUNNING) {
                        if (this._showWingTime < cur_time)
                            this._oldAtnStatus = oldAtnStus;
                        this._showWingTime = cur_time + 2500;
                    }
                }
            };
            /**
         * 战斗场景动作
         * @param atnStus 动作枚举
         * @param completeState 动作完成状态:0 循环,1 最后一幀,2 默认动作
         * @param func 回调
         */
            AvatarUnit.prototype.battleAction = function (atnStus, completeState, func) {
                if (completeState === void 0) { completeState = 2; }
                this.actionStatus = atnStus;
                // console.log("----------------unit = ",this.name, "  战斗场景动作 ", atnStus, "  动作完成状态 ",completeState);
                this._char3d.playBfun(CharAction.ConvertAction(this.actionStatus, this._isRiding), completeState, func);
            };
            //检查是否要求换装
            AvatarUnit.prototype.updateAvatarItemData = function () {
                //不存在才构建
                if (!this._multi_items)
                    this._multi_items = new Array(scene_1.AvatarData.MAX_ITEMS);
                var aItem;
                var newItemName = null;
                ///////////////// 初始化一下 //////////////
                this._linkage.kind = scene_1.AvatarLinkage.KIND_PLAYER;
                this._linkage.occ = this.unit.sex;
                ///////////////////////// 人物衣服 ///////////////////
                //装备类型：身体
                aItem = this._multi_items[scene_1.AvatarData.IDX_CLOTHES];
                //装备类型：身体
                this._linkage.equip = scene_1.AvatarLinkage.EQUIP_BODY;
                this._linkage.direct = scene_1.AvatarLinkage.DIRECT_NONE;
                newItemName = this.getCoatAvatar();
                //不穿衣服送身体
                if (!newItemName) {
                    newItemName = "body00";
                }
                this._linkage.shortName = newItemName;
                newItemName = this._linkage.getName();
                if (aItem) {
                    if (newItemName != aItem.itemName) {
                        aItem.release();
                        this._multi_items[scene_1.AvatarData.IDX_CLOTHES] = null;
                        this._ischecking = true;
                    }
                    else {
                        newItemName = null;
                    }
                }
                if (newItemName) {
                    var item = scene_1.AvatarItem.Get(newItemName);
                    item.retain();
                    this._multi_items[scene_1.AvatarData.IDX_CLOTHES] = item;
                    this._ischecking = true;
                }
                ///////////////////////// 翅膀 ///////////////////
                aItem = this._multi_items[scene_1.AvatarData.IDX_WINGS];
                this._linkage.equip = scene_1.AvatarLinkage.EQUIP_WINGS;
                this._linkage.direct = scene_1.AvatarLinkage.DIRECT_NONE;
                newItemName = this.getWingAvatar();
                this._linkage.shortName = newItemName;
                newItemName = this._linkage.getName();
                if (aItem) {
                    if (newItemName != aItem.itemName) {
                        aItem.release();
                        this._multi_items[scene_1.AvatarData.IDX_WINGS] = null;
                        this._ischecking = true;
                    }
                    else {
                        newItemName = null;
                    }
                }
                if (newItemName) {
                    var item = scene_1.AvatarItem.Get(newItemName);
                    item.retain();
                    this._multi_items[scene_1.AvatarData.IDX_WINGS] = item;
                    this._ischecking = true;
                }
                ////////////////////// 坐骑 ///////////////////////
                aItem = this._multi_items[scene_1.AvatarData.IDX_RIDE];
                this._linkage.kind = scene_1.AvatarLinkage.KIND_MOUNT;
                newItemName = this.getMountAvatar();
                this._linkage.shortName = newItemName;
                newItemName = this._linkage.getName1(newItemName);
                if (aItem) {
                    if (newItemName != aItem.itemName) {
                        aItem.release();
                        this._multi_items[scene_1.AvatarData.IDX_RIDE] = null;
                        this._ischecking = true;
                        this.isRiding = false;
                    }
                    else {
                        newItemName = null;
                        this.isRiding = true;
                    }
                }
                if (newItemName) {
                    var item = scene_1.AvatarItem.Get(newItemName);
                    item.retain();
                    this._multi_items[scene_1.AvatarData.IDX_RIDE] = item;
                    this.isRiding = true;
                    this._ischecking = true;
                }
            };
            // 受击
            AvatarUnit.prototype.onBeaten = function (scene, toward, type, data, isbottom) {
                if (isbottom === void 0) { isbottom = false; }
                _super.prototype.onBeaten.call(this, scene, toward, type, data, isbottom);
                if (this.unit instanceof FakeUnit)
                    return; //假的不需要飘血
                // if (this._unitType == UnitField.TYPE_ID_CREATURE)
                // 	this._whiteTime = 200;
                //飘战斗信息
                scene.createdFightxt(this.unit, type, data, isbottom);
            };
            // 击飞
            AvatarUnit.prototype.beatBackFly = function (index) {
                _super.prototype.beatBackFly.call(this, index);
            };
            //飘战斗信息
            AvatarUnit.prototype.onDrawFightxt = function (scene, type, data, isbottom) {
                if (isbottom === void 0) { isbottom = false; }
                var scene3d = scene.avatarLayer.scene3d;
                scene3d.flyText(type, data, isbottom);
            };
            //buff图标
            AvatarUnit.prototype.updateBuffIcons = function () {
                if (this._buffIcons) {
                    this._scene3d.removeBuff(this._buffIcons);
                    this._buffIcons = null;
                    this._buffPos = null;
                }
                var buffIds = this.unit.buffMgr.buffIds;
                if (!buffIds || !buffIds.length)
                    return;
                var types = [];
                for (var i = 0; i < buffIds.length; i++) {
                    switch (buffIds[i]) {
                        case 1:
                            types.push(pan.PanBuffManager.TYPE_TRAP);
                            break;
                        case 2:
                            types.push(pan.PanBuffManager.TYPE_BREAK);
                            break;
                        case 3:
                            types.push(pan.PanBuffManager.TYPE_ARMOR);
                            break;
                        case 4:
                            types.push(pan.PanBuffManager.TYPE_MOCKERY);
                            break;
                        // case 5: types.push(pan.PanBuffManager.TYPE_MOCKERY_HP); break;
                    }
                }
                this._buffIcons = this._scene3d.showBuff(types);
                this._buffPos = new Vector3D(66, 175, 0);
            };
            // 坠地
            AvatarUnit.prototype.dropGround = function (scene) {
                // let effect = ObjectPools.malloc(EffectFrame, null, 8, 24) as EffectFrame;
                // effect.setData('smoke');
                // effect.anchorObject = this.unit;
                // effect.atBottom = true;
                // if (this.rideHeight > 0) {
                // 	effect.setOffset(0, -this.rideHeight);
                // }
                // scene.addEffect(effect);
            };
            //播放上御剑特效
            AvatarUnit.prototype.playYuJianUpEffect = function (scene) {
                var effect = ObjectPools.malloc(scene_1.EffectSkeleton);
                effect.setData('yujian');
                effect.anchorObject = this.unit;
                effect.atBottom = false;
                // effect.setOffset(0,-this._rideHeight);
                scene.addEffect(effect);
            };
            //播放卧底特效
            AvatarUnit.prototype.playWoDiEffect = function (scene) {
                var effect = ObjectPools.malloc(scene_1.EffectAvatar);
                effect.setData("0000upgrade");
                effect.toward = Direct.BOTTOM;
                effect.anchorObject = this.unit;
                scene.addEffect(effect);
            };
            //处于水层控制
            AvatarUnit.prototype.updateAtWater = function (scene) {
                if (this._isRiding || !this._atWaterLayer || this.unit.isDied || !this.isNeedDrawView) {
                    this.clearWaterStandEffect();
                    return;
                }
                //处于水层，并且是站立
                if (!this.unit.isMoving) {
                    this.createWaterStandEffect(scene);
                }
                else {
                    this.clearWaterStandEffect();
                    //根据移动速度来定义触发的水花次数
                    var currTimer = Laya.timer.currTimer;
                    var interval = 1 / this.unit.speed * 1400;
                    if ((currTimer - this._lastWaterEffectTime) < interval)
                        return;
                    this._lastWaterEffectTime = currTimer;
                    this.createWaterRunEffect(scene);
                }
            };
            // 创建水上站立特效
            AvatarUnit.prototype.createWaterStandEffect = function (scene) {
                if (this._waterStandEffect) {
                    return;
                }
                this._waterStandEffect = ObjectPools.malloc(scene_1.EffectAvatar);
                this._waterStandEffect.setData("0000water_flower");
                this._waterStandEffect.anchorPostion = this._pos;
                this._waterStandEffect.atBottom = true;
                this._waterStandEffect.setLoop(true);
                scene.addEffect(this._waterStandEffect);
            };
            // 清理水上站立特效
            AvatarUnit.prototype.clearWaterStandEffect = function () {
                if (!this._waterStandEffect) {
                    return;
                }
                this._waterStandEffect.isPlayEnd = true;
                this._waterStandEffect = null;
            };
            // 创建水上跑动特效
            AvatarUnit.prototype.createWaterRunEffect = function (scene) {
                var waterEffect = ObjectPools.malloc(scene_1.EffectAvatar);
                waterEffect.setData("0000water_run");
                waterEffect.scale = 0.6;
                waterEffect.anchorPostion = this._pos.clone();
                waterEffect.atBottom = true;
                scene.addEffect(waterEffect);
            };
            AvatarUnit.prototype.clear = function (checkNow) {
                this.clearWaterStandEffect();
                this._oldWodiSkinId = 0;
                this.unit.buffMgr.off(LEvent.CHANGED, this, this.updateBuffIcons);
                this.unit.userData = null;
                //装备or坐骑显示发生变化
                this.unit.onAvatarChange = null;
                this.unit.onRedWaring = null;
                // buff
                for (var i = 0; i < this._avatarBuffs.length; i++) {
                    this._avatarBuffs[i].dispose();
                }
                this._skinName = null;
                this._avatarBuffs = null;
                this.clearNpcMask();
                this._gossipTexts.length = 0;
                if (this._char3d) {
                    this._char3d.shadow = false;
                    this._char3d.destory();
                    this._char3d = null;
                }
                if (this._particleInfos) {
                    for (var i = 0; i < this._particleInfos.length; i++) {
                        if (!this._particleInfos[i].particle)
                            continue;
                        this._scene3d.removeParticle(this._particleInfos[i].particle);
                    }
                    this._particleInfos = null;
                }
                if (this._buffIcons) {
                    this._scene3d.removeBuff(this._buffIcons);
                    this._buffIcons = null;
                    this._buffPos = null;
                }
                _super.prototype.clear.call(this, checkNow);
            };
            /**小宠物飞行高度 */
            AvatarUnit.LITTLE_PET_HEIGHT = 80;
            return AvatarUnit;
        }(scene_1.AvatarSprite));
        scene_1.AvatarUnit = AvatarUnit;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=AvatarUnit.js.map