var battle;
(function (battle) {
    var Battle = /** @class */ (function () {
        function Battle(_app, msg) {
            this._app = _app;
            /**当前回合数 */
            this._cur_round = 0;
            /**战斗单位列表 key=index value=fightmodel*/
            this._models = new Dictionary;
            /**战场流程 */
            this.battle_step = 0 /* Inint */;
            /** 出战宠物key */
            this.battlePetKey = new Dictionary;
            /** 药品 */
            this.drugkey = -1;
            /** 当前操作菜单不能被选中的目标 */
            this.cantSelectTarget = [];
            /** 战斗物品使用次数 */
            this.item_usetimes = new Laya.Dictionary();
            /** 是否处于观战状态 */
            this.inWatch = false;
            this.cur_operate_type = 1 /* ACTION_ATTACK */;
            this.cur_operate_role_type = -1 /* None */;
            this.initNetHandler();
            this.SSendBattleStart = msg;
            this._cur_round = msg.roundnum < 0 ? 0 : msg.roundnum;
            this.start();
            this._app = _app;
            if (msg instanceof hanlder.s2c_SSendWatchBattleStart)
                this.inWatch = true;
        }
        Object.defineProperty(Battle.prototype, "battleProxy", {
            get: function () {
                return this._app.battleProxy;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Battle.prototype, "isWatch", {
            get: function () {
                return this.inWatch;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Battle.prototype, "getApp", {
            get: function () {
                return this._app;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Battle.prototype, "models", {
            /**
             * 返回所有战斗单元
             */
            get: function () {
                return this._models.values;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Battle.prototype, "page", {
            get: function () {
                return this._page;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Battle.prototype, "scene", {
            get: function () {
                return this._scene;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Battle.prototype, "battle_stepe", {
            get: function () {
                return this.battle_step;
            },
            enumerable: true,
            configurable: true
        });
        Battle.prototype.initNetHandler = function () {
            // 793455: 服务器发给客户端，进战斗时主角的二级属性
            Network._instance.addHanlder(ProtocolsEnum.SSendRoleInitAttrs, this, this.onSSendRoleInitAttrs);
            // 793456: 服务器发给客户端，进战斗时宠物的二级属性
            Network._instance.addHanlder(ProtocolsEnum.SSendPetInitAttrs, this, this.onSSendPetInitAttrs);
            // 799432: 刷新人物属性的消息
            Network._instance.addHanlder(ProtocolsEnum.SRefreshRoleData, this, this.onSRefreshRoleData);
            // 793458: 服务器向客户端发送已经使用过的道具列表，baseid
            Network._instance.addHanlder(ProtocolsEnum.SSendAlreadyUseItem, this, this.onSSendAlreadyUseItem);
            // 793434: 服务器向客户端发送战斗单元
            Network._instance.addHanlder(ProtocolsEnum.SSendAddFighters, this, this.onSSendAddFighters);
            // 793435: 服务器向客户端发送 开始回合操作选择
            Network._instance.addHanlder(ProtocolsEnum.SSendRoundStart, this, this.onSSendRoundStart);
            // 793457: 服务器向客户端发送剧本
            Network._instance.addHanlder(ProtocolsEnum.SSendRoundScript, this, this.onSSendRoundScript);
            // 793462: 服务器广播给战斗内所有人，某个角色已经播放动画完毕了
            Network._instance.addHanlder(ProtocolsEnum.SSendRoundPlayEnd, this, this.onSSendRoundPlayEnd);
            // 793439: 服务器向客户端发送结束战斗消息   
            Network._instance.addHanlder(ProtocolsEnum.SSendBattleEnd, this, this.onSSendBattleEnd);
            /**刷新出战宠物*/
            Network._instance.addHanlder(ProtocolsEnum.SSetFightPet, this, this.currentfightpet);
            /** 发送人物操作状态（准备中，请等待，掉线） */
            Network._instance.addHanlder(ProtocolsEnum.SSendBattlerOperateState, this, this.SSendBattlerOperateState);
            /** 将观战玩家移出战场 */
            Network._instance.addHanlder(ProtocolsEnum.SRemoveWatcher, this, this.SRemoveWatcher);
        };
        Battle.prototype.start = function () {
            this.loadSkills();
            this._scene = new battle.BattleScene(this._app, this);
            this._action_mgr = new battle.ActionMgr(this);
        };
        //点击地面
        Battle.prototype.onSceneTouch = function (cellx, celly, hitObject) {
            return this.scene && this.scene.onSceneTouch(cellx, celly, hitObject);
        };
        //长按地面
        Battle.prototype.onSceneLongTouch = function (hitObject) {
            return this.scene && this.scene.onSceneLongTouch(hitObject);
        };
        /** 查看buffer */
        Battle.prototype.onforBuffer = function (fighterid) {
            this.findRoleByIndex(fighterid);
            var fightmodel = this._models.get(fighterid);
            this.page.showBuffer(fightmodel);
        };
        Object.defineProperty(Battle.prototype, "skills", {
            get: function () {
                return this._skills;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Battle.prototype, "battledrug", {
            /** 战斗药品使用次数 */
            get: function () {
                return this.item_usetimes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Battle.prototype, "operate_type", {
            get: function () {
                return this.cur_operate_type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Battle.prototype, "SendBattleStart", {
            get: function () {
                return this.SSendBattleStart;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化玩家已学的主动技能
         */
        Battle.prototype.loadSkills = function () {
            this._skills = [];
            var data = game.modules.createrole.models.LoginModel.getInstance().SSendInbornsData.get("data"); //未升级之前的等级数据
            // let _skillArr  = game.modules.skill.models.SkillModel.getInstance().skillArr;
            var _skillArr = game.modules.skill.models.SkillModel.getInstance().skillLevelDic;
            var dic = data.inborns;
            for (var index = 0; index < _skillArr.keys.length; index++) {
                // const id = _skillArr.keys[index];
                // const skill = game.modules.skill.models.SkillModel.getInstance().AcupointInfoBinDic[id] as game.data.template.AcupointInfoBaseVo;
                var real_id = _skillArr.keys[index]; //skill.pointToSkillList[0];
                var skill_type = this.battleProxy.SkillTypeData[real_id];
                // 被动技能不可显示给玩家选择
                if (skill_type.skilltype == 10 /* UNACTIVE */ || skill_type.skilltype == 11 /* EQUIP_ENCHANTING */)
                    continue;
                var real_skill = game.modules.skill.models.SkillModel.getInstance().CSchoolSkillitemBinDic[real_id];
                this._skills.push(real_skill);
            }
            // 按id排序
            this._skills.sort(function (a, b) {
                return a.id - b.id;
            });
            this.checkInitEnd();
        };
        Battle.prototype._logic = function () {
            if (this._action_mgr) {
                this._action_mgr.logic(Laya.timer.delta);
            }
        };
        Battle.prototype.exit = function () {
            //console.log("----------------------------清理战场");
            if (this._action_mgr) {
                this._action_mgr.cleanAll();
                this._action_mgr = null;
            }
            this._app.uiRoot.HUD.close(PageDef.HUD_FIGHT_PAGE);
            this._page = null;
            /** 战斗结束移除 */
            LocalStorage.removeItem(LoginModel.getInstance().roleDetail.roleid + "_callPetTimes");
            if (this._scene) {
                this._scene.exit();
                this._scene = null;
            }
            /** 清除战斗中属性值改变 */
            game.modules.roleinfo.models.RoleInfoModel.getInstance().battleRoleAttr.clear();
            game.modules.pet.models.PetModel.getInstance().battlePetAttr.clear();
            Laya.timer.clear(this, this._logic);
            // 793455: 服务器发给客户端，进战斗时主角的二级属性
            Network._instance.removeHanlder(ProtocolsEnum.SSendRoleInitAttrs, this, this.onSSendRoleInitAttrs);
            // 793456: 服务器发给客户端，进战斗时主角宠物的二级属性
            Network._instance.removeHanlder(ProtocolsEnum.SSendPetInitAttrs, this, this.onSSendPetInitAttrs);
            // 799432: 刷新人物属性的消息
            Network._instance.removeHanlder(ProtocolsEnum.SRefreshRoleData, this, this.onSRefreshRoleData);
            // 793458: 服务器向客户端发送已经使用过的道具列表，baseid
            Network._instance.removeHanlder(ProtocolsEnum.SSendAlreadyUseItem, this, this.onSSendAlreadyUseItem);
            // 793434: 服务器向客户端发送战斗信息
            Network._instance.removeHanlder(ProtocolsEnum.SSendAddFighters, this, this.onSSendAddFighters);
            // 793435: 服务器向客户端发送 开始回合操作选择
            Network._instance.removeHanlder(ProtocolsEnum.SSendRoundStart, this, this.onSSendRoundStart);
            // 793457: 服务器向客户端发送剧本
            Network._instance.removeHanlder(ProtocolsEnum.SSendRoundScript, this, this.onSSendRoundScript);
            // 793462: 服务器广播给战斗内所有人，某个角色已经播放动画完毕了
            Network._instance.removeHanlder(ProtocolsEnum.SSendRoundPlayEnd, this, this.onSSendRoundPlayEnd);
            // 793439: 服务器向客户端发送结束战斗消息   
            Network._instance.removeHanlder(ProtocolsEnum.SSendBattleEnd, this, this.onSSendBattleEnd);
        };
        /**
         *
         * @param index 根据索引返回战斗单位
         */
        Battle.prototype.findRoleByIndex = function (index) {
            return this._models.get(index);
        };
        /** 根据索引移除战斗单元 */
        Battle.prototype.removeRoleByIndex = function (index) {
            if (this._models.get(index)) {
                this._models.remove(index);
            }
        };
        /** 根据id返回战斗单元 */
        Battle.prototype.findeRoleById = function (id) {
            for (var _index in this._models) {
                var model = this._models.get(_index);
                if (model && model.dataID == id)
                    return model;
            }
            return null;
        };
        Object.defineProperty(Battle.prototype, "selfRoleAlive", {
            /**
             * 判断当前玩家是否还活着
             */
            get: function () {
                if (!this.self_role) {
                    return false;
                }
                return this.self_role.hp > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Battle.prototype, "selfPetAlive", {
            /**
             * 判断当前出战宠物是否还活着
             */
            get: function () {
                if (!this.self_pet) {
                    return false;
                }
                return this.self_pet.hp > 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 加入战斗单元
         * @param fighter
         */
        Battle.prototype.addNewFighter = function (fighter) {
            //console.log("----------------加入战斗单元 qqqqqqqq");
            var model = new battle.FightModel(this._app, fighter);
            // 是当前玩家
            if (model.is_self_role) {
                this.self_role = model;
            }
            // 判断是否是宠物，宠物服务端没发造型id
            if (fighter.fighterType == 2 /* FIGHTER_PET */) {
                var modelid = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[model.dataID].modelid;
                model.shape = LoginModel.getInstance().cnpcShapeInfo[modelid].shape;
                model.baseShape = model.shape;
            }
            // 判断是否是当前玩家的出战宠物
            if (fighter.fighterType == 2 /* FIGHTER_PET */ && fighter.index == this.self_role.index + 5 /* PET_INDEX */) {
                /** 移除原宠物的模型 */
                if (this.self_pet)
                    this._scene.removeFakeUint(this.self_pet.fakeUnit);
                else {
                    this.battlePetKey.set(LoginModel.getInstance().roleDetail.petIndex, LoginModel.getInstance().roleDetail.petIndex);
                    this._callPetCount();
                }
                this.self_pet = model;
            }
            this._models.set(model.index, model);
            if (this._scene) {
                this._scene.addUnit(model);
            }
        };
        /** 计算召唤宠物次数 作用于断线重连 */
        Battle.prototype._callPetCount = function () {
            var callPets = LocalStorage.getJSON(LoginModel.getInstance().roleDetail.roleid + "_callPetTimes");
            if (callPets && callPets instanceof Object) { /** 如果有缓存的召唤数据 先更新防止覆盖 */
                for (var _index = 0; _index < callPets._keys.length; _index++) {
                    this.battlePetKey.set(callPets._keys[_index], callPets._values[_index]);
                }
            }
            LocalStorage.setJSON(LoginModel.getInstance().roleDetail.roleid + "_callPetTimes", this.battlePetKey);
        };
        /** 七星观职业显示连击点特效 */
        Battle.prototype.schoolCombo_Point = function (model) {
            if (!this.scene)
                return;
            var school = this._GetSchoolByModel(model);
            if (!school)
                return;
            this.SchoolIconEffect(school, model);
            if (school == zhiye.qixing) { //七星观的职业
                this.scene.clearEffect(model.fakeUnit, battle.SceneBattleRes.EFFECT_COMBO_POINT_1);
                this.scene.clearEffect(model.fakeUnit, battle.SceneBattleRes.EFFECT_COMBO_POINT_2);
                this.scene.clearEffect(model.fakeUnit, battle.SceneBattleRes.EFFECT_COMBO_POINT_3);
                this.scene.clearEffect(model.fakeUnit, battle.SceneBattleRes.EFFECT_COMBO_POINT_4);
                this.scene.clearEffect(model.fakeUnit, battle.SceneBattleRes.EFFECT_COMBO_POINT_5);
                switch (model.ep) {
                    case 1:
                        this.scene.showEffects(model.fakeUnit, battle.SceneBattleRes.EFFECT_COMBO_POINT_1, 0, -7, 0);
                        break;
                    case 2:
                        this.scene.showEffects(model.fakeUnit, battle.SceneBattleRes.EFFECT_COMBO_POINT_2, 0, -7, 0);
                        break;
                    case 3:
                        this.scene.showEffects(model.fakeUnit, battle.SceneBattleRes.EFFECT_COMBO_POINT_3, 0, -7, 0);
                        break;
                    case 4:
                        this.scene.showEffects(model.fakeUnit, battle.SceneBattleRes.EFFECT_COMBO_POINT_4, 0, -7, 0);
                        break;
                    case 5:
                        this.scene.showEffects(model.fakeUnit, battle.SceneBattleRes.EFFECT_COMBO_POINT_5, 0, -7, 0);
                        break;
                    default:
                        break;
                }
            }
        };
        /** 门派图标
         * @param school 职业
         * @param model 模型
        */
        Battle.prototype.SchoolIconEffect = function (school, model) {
            if (!this.scene)
                return;
            if (!school || school == -1)
                return;
            var _namelen = model.fighterType == 3 /* FIGHTER_PARTNER */ ? 40 : 45;
            switch (school) {
                case zhiye.yunxiao:
                    this.scene.showEffects(model.fakeUnit, battle.SceneBattleRes.EFFECT_YUNXIAO, _namelen, -113, 0);
                    break;
                case zhiye.dahuang:
                    this.scene.showEffects(model.fakeUnit, battle.SceneBattleRes.EFFECT_YUNXIAO, _namelen, -113, 0);
                    break;
                case zhiye.cangyu:
                    this.scene.showEffects(model.fakeUnit, battle.SceneBattleRes.EFFECT_CANGYU, _namelen, -113, 0);
                    break;
                case zhiye.feixue:
                    this.scene.showEffects(model.fakeUnit, battle.SceneBattleRes.EFFECT_FEIXUE, _namelen, -113, 0);
                    break;
                case zhiye.tianlei:
                    this.scene.showEffects(model.fakeUnit, battle.SceneBattleRes.EFFECT_TIANLEI, _namelen, -113, 0);
                    break;
                case zhiye.wuliang:
                    this.scene.showEffects(model.fakeUnit, battle.SceneBattleRes.EFFECT_WULIANG, _namelen, -113, 0);
                    break;
                case zhiye.xuanming:
                    this.scene.showEffects(model.fakeUnit, battle.SceneBattleRes.EFFECT_YOUMING, _namelen, -113, 0);
                    break;
                case zhiye.qixing:
                    this.scene.showEffects(model.fakeUnit, battle.SceneBattleRes.EFFECT_QIXING, _namelen, -113, 0);
                    break;
                case zhiye.danyang:
                    this.scene.showEffects(model.fakeUnit, battle.SceneBattleRes.EFFECT_DANYANG, _namelen, -113, 0);
                    break;
                default:
                    break;
            }
        };
        /** 根据模型判断职业 */
        Battle.prototype._GetSchoolByModel = function (model) {
            var school = -1;
            if (model.is_self_role) {
                school = LoginModel.getInstance().roleDetail.school;
            }
            else if (model.fighterType == 3 /* FIGHTER_PARTNER */) {
                var baseId = model.dataID;
                var huobanbaseinfo = HuoBanModel.getInstance().cheroBaseInfoData[baseId];
                school = huobanbaseinfo.school;
            }
            return school;
        };
        /**
         * 是否能选择角色
         * @param index 选中目标
         */
        Battle.prototype.canSelectRole = function (index) {
            if (this.battle_step != 1 /* Opera */) {
                console.error("不能选中目标原因是==当前操作菜单处于======》" + this.battle_step);
                return false;
            }
            else if (index <= 14 /* MAX_POS */) {
                if (this.cur_operate_type === 1 /* ACTION_ATTACK */ || this.cur_operate_type === 8 /* ACTION_CATHCH */
                    || this.cur_operate_type === 19 /* ACTION_UNIQUE_SKILL */) {
                    console.error("不能选中目标原因是==选中目标是自己方==当前指令类型====》" + this.cur_operate_type);
                    return false;
                }
                else if (this.cantSelectTarget.indexOf(index) != -1) {
                    console.error("不能选中目标原因是1===this.cantSelectTarget===》");
                    return false;
                }
            }
            else {
                if (this.cantSelectTarget.indexOf(index) != -1) {
                    console.error("不能选中目标原因是1===this.cantSelectTarget===》");
                    return false;
                }
            }
            return true;
        };
        /**
         * 回合开始
         * @param round 回合数
         * @param delay 倒计时
         */
        Battle.prototype.roundStart = function (round, delay) {
            console.log("#############################################回合开始 round=", round);
            if (!this.inWatch) {
                // this._page.setRoundDelay(delay);
                this.battle_step = 1 /* Opera */;
                this.cur_operate_role_type = -1 /* None */;
            }
            this._page.setRound(round);
            this.startRoundOperate();
        };
        /**
         * 显示回合操作菜单
         */
        Battle.prototype.startRoundOperate = function () {
            if (this.inWatch) //如果处于观战状态
             {
                this.page.showWatch();
                return;
            }
            /** 如果处于自动挂机状态 */
            var HookBattleData = game.modules.guaji.models.GuaJiModel.getInstance().hookBattleData;
            if (HookBattleData.isautobattle === 0 /* Manual_Fight */) //手动操作
             {
                // 如果玩家还没操作，并且玩家还活着，那么显示操作菜单
                if (this.cur_operate_role_type === -1 /* None */) {
                    this.cur_operate_role_type = 1 /* Role */;
                    /** 不管是否死亡人物操作菜单都存在 */
                    this._page.showMainOpera();
                    return;
                    // 如果玩家已经操作，并且宠物还活着，那么显示操作菜单	
                }
                else if (this.cur_operate_role_type === 1 /* Role */) {
                    this._scene.clearEffect(this.self_role.fakeUnit, battle.SceneBattleRes.EFFECT_READY);
                    this.cur_operate_role_type = 0 /* Pet */;
                    if (this.selfPetAlive) {
                        this._page.showPetOpera();
                        return;
                    }
                    this.startRoundOperate();
                    // 如果人宠都操作完毕，显示等待
                }
            }
            else if (HookBattleData.isautobattle === 1 /* Auto_Fight */) //自动操作
             {
                this.page.showAutoBattle([]);
                this.showInReadyEffect();
            }
            if (this.cur_operate_role_type === 0 /* Pet */) {
                console.log("自己角色和宠物都已经死亡或者已经操作完，进入等待");
                this._page.showWait();
                if (this.self_pet)
                    this._scene.clearEffect(this.self_pet.fakeUnit, battle.SceneBattleRes.EFFECT_READY);
                this.battle_step = 2 /* Wait */;
                this.cur_operate_role_type = -1 /* None */;
            }
        };
        /**
         * 技能，目标显示待选择特效光圈
         */
        Battle.prototype.selectSkill = function (skill) {
            this.cur_skill = skill;
            this.cur_operate_type = 2 /* ACTION_SKILL */;
            this.getSelectTarget(this.cur_skill.targettype);
            // 根据技能类型，决定是选择我方还是敌方
            this.showSelectEffects(this.cur_skill.targettype == 480 /* ENEMY */);
        };
        /** 选中特技 */
        Battle.prototype.selectEquipStunt = function (skill) {
            this.cur_skill = skill;
            this.cur_operate_type = 11 /* ACTION_SPECIAL_SKILL */;
            this.getSelectTarget(this.cur_skill.targettype);
            // 根据技能类型，决定是选择我方还是敌方
            this.showSelectEffects(this.cur_skill.targettype == 480 /* ENEMY */);
        };
        /**
         * 普攻，目标显示待选择特效光圈
         */
        Battle.prototype.selectNormalAttack = function () {
            this.cur_skill = null;
            this.cur_operate_type = 1 /* ACTION_ATTACK */;
            this.showSelectEffects();
        };
        /** 准备中的特效 */
        Battle.prototype.showInReadyEffect = function () {
            // if (type == FighterType.FIGHTER_PET && typeof (this.self_pet) != "undefined")
            // 	this.scene.showEffects(this.self_pet.fakeUnit, SceneBattleRes.EFFECT_READY,0,12,0);
            // else if (type == FighterType.FIGHTER_ROLE && typeof (this.self_role) != "undefined")
            // 	this.scene.showEffects(this.self_role.fakeUnit, SceneBattleRes.EFFECT_READY,0,12,0);
            for (var _index in this.models) {
                if (this.models[_index].fighterType == 1 /* FIGHTER_ROLE */ || this.models[_index].fighterType == 2 /* FIGHTER_PET */) {
                    this.scene.showEffects(this.models[_index].fakeUnit, battle.SceneBattleRes.EFFECT_READY, 0, 12, 0);
                }
            }
        };
        /** 移除准备中的特效 */
        Battle.prototype.clearInReadyEffect = function () {
            // 清除我方选择目标特效
            this.scene.clearEffects(battle.SceneBattleRes.EFFECT_READY, false);
        };
        /**
         * 显示待选择目标特效光圈
         * @param isAttack 是否是攻击技能
         */
        Battle.prototype.showSelectEffects = function (isAttack) {
            if (isAttack === void 0) { isAttack = true; }
            var units = [];
            var max_pos = 28 /* MAX_ROLE */;
            var min_pos = 14 /* MAX_POS */;
            // 非攻击技能，则是对我方选择目标 敌方15-28 我方1-14
            if (!isAttack) {
                min_pos = 0;
                max_pos = 14 /* MAX_POS */;
            }
            // 筛选目标	
            for (var i = 0; i < this.models.length; i++) {
                var element = this.models[i];
                if (element.index > min_pos && element.index <= max_pos && this.cantSelectTarget.indexOf(element.index) == -1) {
                    units.push(element.fakeUnit);
                }
            }
            // 显示特效
            // if (isAttack)
            this.scene.showEffects(units, battle.SceneBattleRes.EFFECT_WAIT1);
            // else
            // {
            // 	this.scene.clearEffects(SceneBattleRes.EFFECT_WAIT1, false);
            // this.scene.showEffects(units, SceneBattleRes.EFFECT_WAIT0);	
            // }
        };
        /**
         * 选择目标
         * @param index 站位
         */
        Battle.prototype.touchFightRole = function (index) {
            var _this = this;
            // 是否是回合菜单可操作状态
            if (!this.canSelectRole(index)) {
                return;
            }
            //选中对象清除显示技能flag
            if (this.page.show_skill_list)
                this.page.show_skill_list = false;
            // 清除待选择目标特效
            this.scene.clearEffects(battle.SceneBattleRes.EFFECT_WAIT1, false);
            // 清除我方选择目标特效
            this.scene.clearEffects(battle.SceneBattleRes.EFFECT_WAIT0, false);
            // 给被选择目标新增特效
            if (index > 14 /* MAX_POS */ && index <= 28 /* MAX_ROLE */) {
                var unit = this._models.get(index).fakeUnit;
                this.scene.showEffects(unit, battle.SceneBattleRes.EFFECT_SELECT);
            }
            // 组装指令
            var operate_info = {
                operationType: this.cur_operate_type,
                aim: index,
                operationID: 0
            };
            // 指令逻辑
            switch (this.cur_operate_type) {
                case 1 /* ACTION_ATTACK */:
                    operate_info.operationID = 1000010 /* Normal_Attack_Skill_id */;
                    break;
                case 2 /* ACTION_SKILL */:
                    if (this.cur_skill) {
                        operate_info.operationID = this.cur_skill.id;
                        this.cur_skill = null;
                    }
                    break;
                case 11 /* ACTION_SPECIAL_SKILL */:
                    if (this.cur_skill) {
                        operate_info.operationID = this.cur_skill.id;
                        this.cur_skill = null;
                    }
                    break;
                case 3 /* ACTION_USEITEM */:
                    operate_info.operationID = this.drugkey;
                    this.drugkey = -1;
                    this.cur_operate_type = 1 /* ACTION_ATTACK */;
                    break;
            }
            //如果当前操作对象是主角并且操作类型不是技能 选中技能退回 -1
            if (this.cur_operate_role_type == 1 /* Role */ && this.cur_operate_type != 2 /* ACTION_SKILL */)
                HudModel.getInstance().battleSkill = -1;
            else if (this.cur_operate_role_type == 0 /* Pet */ && this.cur_operate_type != 2 /* ACTION_SKILL */)
                HudModel.getInstance().battleSkill_pet = -1;
            this.saveAttaclSelection();
            // 如果是自动，目标由服务器控制
            if (this.is_auto) {
                operate_info.aim = 0;
            }
            var autooperate = this.is_auto ? 1 : 0;
            console.log("玩家操作选择:", this.cur_operate_role_type, autooperate, operate_info);
            // 该特效是循环特效，战斗中只能定时清理
            Laya.timer.once(1000, null, function () {
                if (_this.scene)
                    _this.scene.clearEffects(battle.SceneBattleRes.EFFECT_SELECT, false);
            });
            RequesterProtocols._instance.c2s_CSendAction(operate_info, this.cur_operate_role_type, autooperate);
            this.cantSelectTarget = []; //清空不可操作目标
            // NotifyMgr.notify(NotifyType.RoundOprateEnd);
            this.startRoundOperate();
        };
        /** 存储攻击指令 */
        Battle.prototype.saveAttaclSelection = function () {
            if (this.cur_operate_type != 2 /* ACTION_SKILL */ && this.cur_operate_type != 4 /* ACTION_DEFEND */ && this.cur_operate_type != 1 /* ACTION_ATTACK */)
                return;
            var hookBattleData = game.modules.guaji.models.GuaJiModel.getInstance().hookBattleData;
            if (!this.cur_skill)
                return;
            if (this.cur_operate_role_type == 1 /* Role */) //存储玩家选择
             {
                if (this.cur_operate_type == 2 /* ACTION_SKILL */) //使用技能
                 {
                    RequesterProtocols._instance.c2s_CSetCharOpt(GuaJiOpeType.FIRESKILL, this.cur_skill.id);
                    hookBattleData.charoptype = 2 /* ACTION_SKILL */;
                    hookBattleData.charopid = this.cur_skill.id;
                }
                else if (this.cur_operate_type == 1 /* ACTION_ATTACK */) {
                    RequesterProtocols._instance.c2s_CSetCharOpt(GuaJiOpeType.ATTACK, 0);
                    hookBattleData.charoptype = 1 /* ACTION_ATTACK */;
                    hookBattleData.charopid = 0;
                }
                else if (this.cur_operate_type == 4 /* ACTION_DEFEND */) {
                    RequesterProtocols._instance.c2s_CSetCharOpt(GuaJiOpeType.DEFENSE, 0);
                    hookBattleData.charoptype = 4 /* ACTION_DEFEND */;
                    hookBattleData.charopid = 0;
                }
            }
            else if (this.cur_operate_role_type == 0 /* Pet */) //存储宠物选择
             {
                if (this.cur_operate_type == 2 /* ACTION_SKILL */) //使用技能
                 {
                    RequesterProtocols._instance.c2s_CSetPetOpt(GuaJiOpeType.FIRESKILL, this.cur_skill.id);
                    hookBattleData.petoptype = 2 /* ACTION_SKILL */;
                    hookBattleData.petopid = this.cur_skill.id;
                }
                else if (this.cur_operate_type == 1 /* ACTION_ATTACK */) {
                    RequesterProtocols._instance.c2s_CSetPetOpt(GuaJiOpeType.ATTACK, 0);
                    hookBattleData.petoptype = 1 /* ACTION_ATTACK */;
                    hookBattleData.petopid = 0;
                }
                else if (this.cur_operate_type == 4 /* ACTION_DEFEND */) {
                    RequesterProtocols._instance.c2s_CSetPetOpt(GuaJiOpeType.DEFENSE, 0);
                    hookBattleData.petoptype = 4 /* ACTION_DEFEND */;
                    hookBattleData.petopid = 0;
                }
            }
        };
        /** 发送自动战斗指令
         * @param operationType 操作类型
         * @param operationer 操作对象 1 主角 0 宠物 -1 没有出战宠物
         * @param spectialType 如果是技能的话就是技能Id
        */
        Battle.prototype.autoFightCommand = function (operationType, operationer, spectialType) {
            if (spectialType === void 0) { spectialType = -1; }
            this.cur_operate_role_type = operationer;
            if (operationer != -1 /* None */) {
                // 组装指令
                var operate_info_1 = {
                    operationType: operationType,
                    aim: 0,
                    operationID: spectialType
                };
                if (operate_info_1.operationID == 0) {
                    operate_info_1.operationID = -1;
                }
                var autooperate_1 = this.is_auto ? 1 : 0;
                //存在自动状态下 刷新人物操作状态优先于回合开始的准备特效 故这里需要延迟发送
                Laya.timer.once(1000, this, function () { RequesterProtocols._instance.c2s_CSendAction(operate_info_1, operationer, autooperate_1); }, null, false);
            }
            if (operationer == 0 /* Pet */ || operationer == -1 /* None */) {
                var inTeamGroup = HudModel.getInstance().chargeInGroup(false);
                //不处于组队状态关闭计时器
                if (!inTeamGroup)
                    battle.NotifyMgr.notify(4 /* RoundOprateEnd */);
                this._page.showWait();
                this.battle_step = 2 /* Wait */;
                this.cur_operate_role_type = -1 /* None */;
            }
        };
        /** 无选中对象隐藏技能框 */
        Battle.prototype.judgehideSkillPanel = function () {
            if (this.page)
                this.page.judgehideSkillPanel();
        };
        /**逃跑 */
        Battle.prototype.runaway = function () {
            this.scene.clearEffects(battle.SceneBattleRes.EFFECT_WAIT1, false);
            var operate_info = {
                operationType: 9 /* ACTION_ESCAPE */,
                aim: this.self_role.index,
                operationID: 0
            };
            var autooperate = this.is_auto ? 1 : 0;
            if (this.cur_operate_role_type == 1 /* Role */)
                HudModel.getInstance().battleSkill = -1;
            HudModel.getInstance().battleSkill_pet = -1;
            console.log("玩家操作选择:", this.cur_operate_role_type, autooperate, operate_info);
            RequesterProtocols._instance.c2s_CSendAction(operate_info, this.cur_operate_role_type, autooperate);
            // NotifyMgr.notify(NotifyType.RoundOprateEnd);
            this.startRoundOperate();
        };
        /**防御 */
        Battle.prototype.defense = function () {
            this.scene.clearEffects(battle.SceneBattleRes.EFFECT_WAIT1, false);
            this.cur_operate_type = 4 /* ACTION_DEFEND */;
            var operate_info = {
                operationType: this.cur_operate_type,
                aim: -1,
                operationID: 0
            };
            var autooperate = this.is_auto ? 1 : 0;
            if (this.cur_operate_role_type == 1 /* Role */) //如果操作对象是主角清空上次使用的技能
                HudModel.getInstance().battleSkill = -1;
            HudModel.getInstance().battleSkill_pet = -1;
            operate_info.aim = this.cur_operate_role_type == 1 /* Role */ ? this.self_role.index : this.self_pet.index;
            console.log("玩家操作选择:", this.cur_operate_role_type, autooperate, operate_info);
            RequesterProtocols._instance.c2s_CSendAction(operate_info, this.cur_operate_role_type, autooperate);
            this.saveAttaclSelection();
            // NotifyMgr.notify(NotifyType.RoundOprateEnd);
            this.startRoundOperate();
        };
        /**保护
         * @param cantTar 不能被选中的目标
        */
        Battle.prototype.protect = function (cantTar) {
            this.cantSelectTarget = [];
            this.cantSelectTarget.push(cantTar);
            for (var _index = 15; _index <= 28 /* MAX_ROLE */; _index++) {
                var tarModel = this.findRoleByIndex(_index);
                if (tarModel)
                    this.cantSelectTarget.push(_index);
            }
            this.cur_operate_type = 5 /* ACTION_PROTECT */;
            this.scene.clearEffects(battle.SceneBattleRes.EFFECT_WAIT1, false);
        };
        /** 捕捉 */
        Battle.prototype.mainCatch = function () {
            this.cur_operate_type = 8 /* ACTION_CATHCH */;
            this.showSelectEffects();
        };
        /**召唤宠物
         * @param callKey 召唤宠物key
        */
        Battle.prototype.summonPet = function (callKey) {
            var operate_info = {
                operationType: 6 /* ACTION_SUMMON */,
                aim: this.self_role.index,
                operationID: callKey
            };
            var autooperate = this.is_auto ? 1 : 0;
            console.log("玩家操作选择:", this.cur_operate_role_type, autooperate, operate_info);
            HudModel.getInstance().battleSkill = -1;
            RequesterProtocols._instance.c2s_CSendAction(operate_info, this.cur_operate_role_type, autooperate);
            // NotifyMgr.notify(NotifyType.RoundOprateEnd);
            this.startRoundOperate();
        };
        /** 清除特效 */
        Battle.prototype.clearTargetEffect = function () {
            this.scene.clearEffects(battle.SceneBattleRes.EFFECT_WAIT1, false);
            this.scene.clearEffects(battle.SceneBattleRes.EFFECT_WAIT0, false);
        };
        /**
         * 初始化战场战斗单位, 观战玩家添加
         * @param optcode
         * @param msg
         */
        Battle.prototype.onSSendAddFighters = function (optcode, msg) {
            var _this = this;
            console.log(">>>> Battle.onSSendAddFighters");
            if (!this._models) {
                this._models = new Dictionary();
            }
            var fighterList = msg.fighterList;
            for (var index = 0; index < fighterList.length; index++) {
                this.addNewFighter(fighterList[index]);
            }
            ModuleManager.hide(ModuleNames.MAIN_MENU);
            this._app.uiRoot.HUD.open(PageDef.HUD_FIGHT_PAGE);
            //等不到avatarUnit被初始化已经执行，故此次延迟
            Laya.timer.once(1000, this, function () {
                //加入战斗单元判断职业显示
                for (var _index in _this.models) {
                    _this.schoolCombo_Point(_this.models[_index]);
                }
            });
        };
        /**
         * 进战斗时主角的二级属性
         * @param optcode
         * @param msg
         */
        Battle.prototype.onSSendRoleInitAttrs = function (optcode, msg) {
            console.log(">>>> Battle.onSSendRoleInitAttrs", msg);
        };
        /**
         * 进战斗时宠物的二级属性
         * @param optcode
         * @param msg
         */
        Battle.prototype.onSSendPetInitAttrs = function (optcode, msg) {
            console.log(">>>> Battle.onSSendPetInitAttrs", msg);
        };
        /**
         * 刷新人物属性的消息
         * @param optcode
         * @param msg
         */
        Battle.prototype.onSRefreshRoleData = function (optcode, msg) {
            console.log(">>>> Battle.onSRefreshRoleData");
            //this._page.pettest();
        };
        /**
         * 服务器向客户端发送已经使用过的道具列表，baseid
         * @param optcode
         * @param msg
         */
        Battle.prototype.onSSendAlreadyUseItem = function (optcode, msg) {
            this.item_usetimes.clear();
            this.item_usetimes = msg.itemlist;
        };
        /**
         * 服务器通知客户端回合开始
         * @param optcode
         * @param msg
         */
        Battle.prototype.onSSendRoundStart = function (optcode, msg) {
            console.log(">>>> Battle.onSSendRoundStart", msg.time, msg.environment, msg.aiactions);
            this._cur_round++;
            if (this._cur_round == 1 && !this.isWatch)
                this._action_mgr.addQueue(new battle.aciton.DelayPlay(this, 100));
            if (!this.isWatch)
                this._action_mgr.addQueue(new battle.aciton.ShowRoundDelay(this, this._cur_round, msg.time));
            else
                this._page.setRound(this._cur_round);
        };
        /*
        * 服务器通知客户端播放剧本
        * @param optcode
        * @param msg
        */
        Battle.prototype.onSSendRoundScript = function (optcode, msg) {
            var _a, _b;
            console.log(">>>> Battle.onSSendRoundScript");
            if (this._cur_round == 0) {
                return;
            }
            // 防止玩家点击了技能，没选择目标，蓝圈特效未清除
            this.scene.clearEffects(battle.SceneBattleRes.EFFECT_WAIT1, false);
            this.scene.clearEffects(battle.SceneBattleRes.EFFECT_WAIT0, false);
            this.scene.clearEffects(battle.SceneBattleRes.EFFECT_READY, false);
            /** 播放脚本的时候关闭战斗背包界面 */
            var BattleBagViewMediator = game.modules.bag.BattleBagViewMediator.getInstance(this._app);
            BattleBagViewMediator.hide();
            this.battle_step = 3 /* Play */;
            if (!this.page)
                return;
            this.page.startPlay();
            console.log(">>>>> playItem");
            for (var i = 0, len = msg.playItem.length; i < len; i++) {
                var playItem = msg.playItem[i];
                var lastPlayItem = msg.playItem[len - 1];
                var isFaShulianJi = false;
                if (len > 1 && playItem.demoExecuteVo.attackerID == lastPlayItem.demoExecuteVo.attackerID
                    && playItem.demoExecuteVo.operationID == lastPlayItem.demoExecuteVo.operationID)
                    isFaShulianJi = true;
                console.log("第", i, "个出手者脚本 攻击者：", playItem.demoExecuteVo.attackerID);
                /** 加个判断如果是召唤动作 刷新宠物数据 */
                if (playItem.demoExecuteVo.operationType === 6 /* ACTION_SUMMON */)
                    this.page.updatePetAttr();
                // 组装aiaction
                var beforeAiActions = []; //攻击行动前
                var afterAiActions = []; //攻击行动后
                var dieAiActions = []; //对应id死亡时
                for (var i_1 = 0; i_1 < msg.aiactions.length; i_1++) {
                    var element = msg.aiactions[i_1];
                    if (element.actionSeq === i_1) {
                        if (element.actionMoment === -1) {
                            beforeAiActions.push(new battle.action.ai.AiAction(this, element.actionMoment, element.actionFighterId, element.actionId));
                        }
                        else if (element.actionMoment === 0) {
                            afterAiActions.push(new battle.action.ai.AiAction(this, element.actionMoment, element.actionFighterId, element.actionId));
                        }
                        else if (element.actionMoment > 0) {
                            dieAiActions.push(new battle.action.ai.DieAiAction(this, element.actionMoment, element.actionFighterId, element.actionId));
                        }
                    }
                }
                // 攻击行动之前aiactions
                if (beforeAiActions.length > 0) {
                    (_a = this._action_mgr).addQueue.apply(_a, beforeAiActions);
                }
                var isLastaction = i == (len - 1);
                // 攻击行动
                this._action_mgr.addQueue(new battle.aciton.ResultItem(this, playItem, isFaShulianJi, dieAiActions, isLastaction));
                // 攻击行动之后 aiactons
                if (beforeAiActions.length > 0) {
                    (_b = this._action_mgr).addQueue.apply(_b, afterAiActions);
                }
                if (i < len && !this.isWatch) {
                    this._action_mgr.addQueue(new battle.aciton.DelayPlay(this, 100));
                }
            }
            console.log(">>>>> 主角属性变化", msg.roleChangedAttrs);
            console.log(">>>>> 宠物属性的变化", msg.petChangedAttrs);
            // 回合结束血量
            this._action_mgr.addQueue(new battle.aciton.ModelFinalStaus(this, msg.fighterfinallyhps, msg.fighterfinallymps));
            console.log("-------------battle onSSendRoundScript end");
            /** 手动操作情况判断 */
            if (!this.inWatch)
                this._page.ManualFightPerformance();
        };
        /**
         * 服务器广播给战斗内所有人，某个角色已经播放动画完毕了
         * @param optcode
         * @param msg
         */
        Battle.prototype.onSSendRoundPlayEnd = function (optcode, msg) {
            console.log(">>>> Battle.onSSendRoundPlayEnd, fighterId: " + msg.fighterId);
        };
        /**
         * 服务器广播战斗结束
         * @param optcode
         * @param msg
         */
        Battle.prototype.onSSendBattleEnd = function (optcode, msg) {
            console.log("============ 战斗结束");
            if (!this.isWatch)
                this._action_mgr.addQueue(new battle.aciton.BattleEnd(this));
            else {
                this.exit();
                battle.NotifyMgr.notify(0 /* BattleEnd */);
            }
        };
        /**
         * 战斗界面初始化完成
         * @param page
         */
        Battle.prototype.onBattlePageInitSuccess = function (page) {
            this._page = page;
            this.checkInitEnd();
        };
        /** 战斗药品使用选择目标
         * @param target 目标对象
         * @param itemkey 药品key
         * @param itemName 药品名称
        */
        Battle.prototype.drugOnSelectTarget = function (target, itemkey, itemName) {
            this.page.showBackOperate(itemName);
            this.drugkey = itemkey;
            this.cur_operate_type = 3 /* ACTION_USEITEM */;
            var numstart = target == 480 /* ENEMY */ ? 15 : 1;
            var numend = target == 480 /* ENEMY */ ? 28 : 14;
            this.getSelectTarget(target);
            this.showSelectEffects(target == 480 /* ENEMY */);
        };
        /** 存储非选中目标 */
        Battle.prototype.getSelectTarget = function (target) {
            this.cantSelectTarget = [];
            if (target == 480 /* ENEMY */) { // 如果目标是敌人 己方所有角色不能被选中
                for (var index = 1; index <= 14 /* MAX_POS */; index++) {
                    var tarModel = this.findRoleByIndex(index);
                    if (tarModel)
                        this.cantSelectTarget.push(index);
                }
            }
            else //目标是己方 敌方和部分己方不能被选中 
             {
                this.scene.clearEffects(battle.SceneBattleRes.EFFECT_WAIT1, false);
                for (var _index = 1; _index <= 28 /* MAX_ROLE */; _index++) {
                    var tarModel = this.findRoleByIndex(_index);
                    if (target == 1 /* OWN */) //主角
                     {
                        if (tarModel && tarModel.fighterType != 1 /* FIGHTER_ROLE */)
                            this.cantSelectTarget.push(_index);
                    }
                    else if (target == 2 /* OWN_PET */) //宠物
                     {
                        if (tarModel && tarModel.fighterType != 2 /* FIGHTER_PET */)
                            this.cantSelectTarget.push(_index);
                    }
                    else if (target == 4126 /* FRIEND_NOT_OWN */) //除主角
                     {
                        if (tarModel && tarModel.fighterType == 1 /* FIGHTER_ROLE */)
                            this.cantSelectTarget.push(_index);
                    }
                    else if (target == 4117 /* FRIEND_NOT_PET */) //死亡对象使用
                     {
                        if (tarModel && tarModel.hp > 0)
                            this.cantSelectTarget.push(_index);
                    }
                    else if (target == 8192 /* FRIEND_FLOOR */) //友方地面
                     {
                        if (tarModel && _index > 14 /* MAX_POS */)
                            this.cantSelectTarget.push(_index);
                    }
                    else if (target == 4127 /* FRIEND */) //选取自己方
                     {
                        if (tarModel && _index > 14 /* MAX_POS */)
                            this.cantSelectTarget.push(_index);
                    }
                }
            }
        };
        /**
         * 检查是否初始化完成
         */
        Battle.prototype.checkInitEnd = function () {
            if (!this._page) {
                return;
            }
            if (!this._scene) {
                return;
            }
            if (!this._skills) {
                return;
            }
            if (!this.isWatch) {
                // 通知服务器准备完成 空回合
                RequesterProtocols._instance.c2s_CSendRoundPlayEnd([1, 1, 1]);
            }
            else {
                this._page.showWatch();
                // NotifyMgr.notify(NotifyType.RoundOprateEnd);
            }
            Laya.timer.frameLoop(1, this, this._logic);
        };
        /** 出战宠物次数限制 */
        Battle.prototype.currentfightpet = function (optcode, msg) {
            if (msg.isinbattle == 1) //0=战斗外设置参战 1=战斗中召唤
             {
                this.battlePetKey.set(msg.petkey, msg.petkey);
                this._callPetCount();
            }
        };
        /** 刷新角色操作状态 */
        Battle.prototype.SSendBattlerOperateState = function (optcode, msg) {
            var idnex = msg.battleid;
            var opstate = msg.state;
            var model = this.findRoleByIndex(idnex);
            // this.scene.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_READY,0,12,0);
            if (opstate == 2 && this._scene)
                this._scene.clearEffect(model.fakeUnit, battle.SceneBattleRes.EFFECT_READY);
        };
        /** 移除观战玩家
         * @param  index 站位标记
        */
        Battle.prototype.SRemoveWatcher = function (index) {
            var role = this.findRoleByIndex(index);
            if (role) {
                if (role.is_self_role)
                    this.exit();
                else {
                    this._scene.removeFakeUint(role.fakeUnit);
                    this.removeRoleByIndex(index);
                }
            }
        };
        /**
         * 战斗系统提示
         * @param msgID 提示ID
         */
        Battle.prototype.showTipsByMsgID = function (msgID) {
            var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[msgID];
            if (!chattext)
                return;
            console.log('showTipsByMsgID==========', msgID, "   ", chattext);
            var tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
            tips.onShow(chattext.msg);
        };
        /**
         * 战斗系统提示
         * @param msg 提示
         */
        Battle.prototype.showTips = function (msg) {
            console.log('showTips==========' + msg);
            var tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
            tips.onShow(msg);
        };
        /**
         * TODO 喊字飘字
         * @param msg
         */
        Battle.prototype.createFightPicTxt = function (target, msg) {
            this._app.sceneRoot.createFightPicTxt(target.fakeUnit, msg);
        };
        /**
         * 更新buff
         * @param fighterid 目标
         * @param buffID
         * @param round  -1为删除该buff，0为没有回合数的buff，>0为回合数
         */
        Battle.prototype.updateBuff = function (fighterid, buffID, round) {
            var fighter = this.findRoleByIndex(fighterid);
            // 获取对应的buf
            var buffVo = this.battleProxy.BuffConfigData[buffID];
            if (!buffVo.effect) {
                console.log("---------------------找不到特效 bufvo id ", buffVo.id, " buffVo.name", buffVo.name);
                return;
            }
            // 配置表存在这个buf且允许战斗中播放
            if (buffVo.id && buffVo.inbattle) {
                // -1为删除该buff，0为没有回合数的buff，>0为回合数
                if (round == -1)
                    this._scene.clearFrameEffect(fighter.fakeUnit, buffVo.effect);
                else {
                    // 播放特效
                    var info = {};
                    info.loop = true; //是否循环;
                    // buff释放位置
                    info.x = buffVo.x;
                    info.y = buffVo.y;
                    info.frameScale = buffVo.scale;
                    info.isbuff = true;
                    info.isShow = buffVo.floor == 0 ? true : false;
                    this._scene.showFrameEffect(fighter.fakeUnit, buffVo.effect, info);
                }
                var specialshowType;
                var alpha = 0.85;
                //specialshow == 1 受体透明度设置为0.5 specialshow == 2 受体播放跳动效果
                for (var i = 0; i < buffVo.specialshow.length; i++) {
                    specialshowType = buffVo.specialshow[i];
                    if (specialshowType == 1) {
                        alpha = round == -1 ? 1 : alpha;
                        this._scene._scene.updateAlpha(fighter.fakeUnit, alpha);
                    }
                    else if (specialshowType == 2) {
                        var info = {};
                        info.loop = true; //是否循环;
                        // buff释放位置
                        info.x = buffVo.x;
                        info.y = buffVo.y;
                        info.frameScale = buffVo.scale;
                        info.isbuff = true;
                        info.isShow = buffVo.floor == 0 ? true : false;
                        this._scene.showFrameEffect(fighter.fakeUnit, buffVo.effect, info);
                    }
                }
                // 存储buf    
                fighter.addBuffer(buffID, round);
            }
        };
        /**
         * 清除buff
         * @param fighterid 站位
         */
        Battle.prototype.cleanBuff = function (target) {
            for (var i = 0; i < target.buffs.keys.length; i++) {
                var buffid = target.buffs.keys[i];
                var buffVo = this.battleProxy.BuffConfigData[buffid];
                this._scene.clearFrameEffect(target.fakeUnit, buffVo.effect);
            }
        };
        /**
         * 检查buff
         * @param fighter 攻击者
         * @param eBattleOperate 指令
         */
        Battle.prototype.CheckBuffBeforeOperate = function (fighter, eBattleOperate) {
            var buffs = fighter.buffs;
            for (var i = 0; i < buffs.values.length; i++) {
                var buffid = buffs.keys[i];
                var buffVo = this.battleProxy.BuffConfigData[buffid];
                if (buffVo.cleartype == 4 || buffVo.cleartype == 5) {
                    for (var i = 0; i < buffVo.specialshow.length; i++) {
                        if (buffVo.specialshow[i] == 1) {
                            if (eBattleOperate == 1 /* ACTION_ATTACK */
                                || eBattleOperate == 2 /* ACTION_SKILL */ && buffVo.cleartype == 5) {
                                this._scene._scene.updateAlpha(fighter.fakeUnit, 255);
                                return;
                            }
                        }
                    }
                }
            }
        };
        /**
         * 更新属性 TODO
         * @param fighterid 目标
         * @param attrID 属性ID
         * @param value 值
         */
        Battle.prototype.updateAttr = function (fighterid, attrID, value) {
            var _this = this;
            var fighterType = this.findRoleByIndex(fighterid).fighterType;
            if (fighterType == 1 /* FIGHTER_ROLE */) {
                game.modules.roleinfo.models.RoleInfoModel.getInstance().battleRoleAttr.set(attrID, value);
                if (attrID == 120) //刷新怒气值
                 {
                    var fighter_1 = this.findRoleByIndex(fighterid);
                    Laya.timer.once(800, this, function () { if (_this._page)
                        _this._page.updateSp(fighter_1, value); });
                }
            }
            else if (fighterType == 2 /* FIGHTER_PET */)
                game.modules.pet.models.PetModel.getInstance().battlePetAttr.set(attrID, value);
        };
        /**
         * 飘字
         * @param text_type 类型
         * @param num 数值
         * @param toward 朝向
         * @param target 目标
         */
        Battle.prototype.ShowFightxt = function (target, type, data, isbottom) {
            if (isbottom === void 0) { isbottom = false; }
            if (!target)
                return;
            this._app.sceneRoot.createdFightxt(target.fakeUnit, type, data, isbottom);
        };
        /**
         * 播放战斗背景音乐
         * @param musicID 音乐ID
         */
        Battle.prototype.playBattleGroundMusic = function (musicID) {
            // TODO 背景音乐加载没写好
            //BattleBackGroundBaseVo = this.battleProxy.BattleBackGroundMusicData[musicID];
            this._app.playMusic("");
        };
        /**
         * ai语音
         */
        Battle.prototype.PlayAISpeak = function (sexfile, battler) {
            this._app.playSound(sexfile);
        };
        return Battle;
    }());
    battle.Battle = Battle;
})(battle || (battle = {}));
//# sourceMappingURL=Battle.js.map