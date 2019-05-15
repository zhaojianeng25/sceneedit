var battle;
(function (battle_1) {
    var BattleScene = /** @class */ (function () {
        function BattleScene(_app, battle) {
            this._app = _app;
            this.battle = battle;
            /**缩放比 */
            this.battleScale = 1;
            /**战斗单元 */
            this._unit_list = {};
            this._frameEffectInfo = [];
            this._objMgr = this._app.sceneObjectMgr;
            this._scene = this._app.sceneRoot;
            this._effectInfo = [];
            var main = this._objMgr.mainUnit.pos;
            this._center = new Vector2(); //阵列中心点
            var tw = this._scene.camera.look_logicRight - this._scene.camera.look_logicLeft;
            var th = this._scene.camera.look_logicBottom - this._scene.camera.look_logicTop;
            this._center.x = this._scene.camera.look_logicLeft + tw / 2 + battle_1.SceneBattleRes.CENTER_OFFSETX;
            this._center.y = this._scene.camera.look_logicTop + th / 2 + battle_1.SceneBattleRes.CENTER_OFFSETY;
        }
        BattleScene.prototype.exit = function () {
            this._scene.showBack(false);
            this.clearBuffEffectOnBattleExit();
            /** 判断战斗结果 */
            var iswin = false;
            for (var roleIndex = 1; roleIndex < 15; roleIndex++) {
                var model = this.battle.findRoleByIndex(roleIndex);
                if (model == null)
                    continue;
                if (model.hp > 0)
                    iswin = true;
            }
            this.battle = null;
            if (this._effectInfo) {
                for (var i = 0; i < this._effectInfo.length; i++) {
                    this.clearEffect(this._effectInfo[i].target, this._effectInfo[i].effect);
                }
                this._effectInfo = null;
                this._effectWait = null;
            }
            Laya.timer.once(50, this, this.exitTeleport, [iswin]);
        };
        //退出传送
        BattleScene.prototype.exitTeleport = function (iswin) {
            if (iswin === void 0) { iswin = true; }
            if (!this)
                return;
            Laya.timer.clear(this, this.exitTeleport);
            this._app.sceneObjectMgr.mainUnit.buffMgr.subHidingCount();
            var pos = game.modules.mainhud.models.HudModel.getInstance().pos;
            var mapid = game.modules.mainhud.models.HudModel.getInstance().sceneid;
            var levelNum = HudModel.getInstance().levelNum;
            if (!iswin && levelNum >= 10) { //输掉战斗
                var battlefaikd = new game.modules.commonUI.BattleFaildMediator(this._app);
                battlefaikd.show();
                HudModel.getInstance().HangUpWin = false;
            }
            else {
                if (game.modules.mainhud.models.HudModel.getInstance().sceneid >= 1801 && game.modules.mainhud.models.HudModel.getInstance().sceneid <= 1830)
                    HudModel.getInstance().taskxl = 1;
                HudModel.getInstance().HangUpWin = true;
            }
            this._app.sceneObjectMgr.joinFakeMap(mapid, pos.x, pos.y);
            this._app.aCotrller.sendTeleport(mapid, pos.x, pos.y);
            ModuleManager.show(ModuleNames.MAIN_MENU, this._app);
            this._InBattleTip();
        };
        /** 战斗结束后判断是否有弹窗 */
        BattleScene.prototype._InBattleTip = function () {
            if (ChatModel.getInstance().battleEndTips.keys.length <= 0)
                return;
            var keys = ChatModel.getInstance().battleEndTips.keys;
            for (var _index = 0; _index < keys.length; _index++) {
                var str = ChatModel.getInstance().battleEndTips.get(keys[_index]);
                var disappearmediators = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                disappearmediators.onShow(str);
                ChatModel.getInstance().battleEndTips.remove(keys[_index]);
                if (ChatModel.getInstance().battleEndTips.keys.length >= 1) {
                    Laya.timer.once(500, this, this._InBattleTip);
                }
            }
        };
        //添加角色特效
        BattleScene.prototype.showEffects = function (target, effect, x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (!target || !effect)
                return;
            if (target instanceof Unit) { //单个对象
                if (this.battle.operate_type != 3 /* ACTION_USEITEM */ && target.hp <= 0)
                    return;
                this.showEffect(target, effect, x, y, z);
                this._effectInfo.push({ effect: effect, target: target });
                return;
            }
            for (var i = 0; i < target.length; i++) {
                if (!target[i])
                    continue;
                if (target[i].hp <= 0 && this.battle.operate_type != 3 /* ACTION_USEITEM */)
                    continue;
                this.showEffect(target[i], effect, x, y, z);
                this._effectInfo.push({ effect: effect, target: target[i] });
            }
        };
        //移除角色特效
        BattleScene.prototype.clearEffects = function (effect, isSingle) {
            if (isSingle === void 0) { isSingle = true; }
            if (!effect)
                return;
            if (typeof (this._effectInfo) == "undefined" || this._effectInfo == null)
                return;
            for (var i = 0; i < this._effectInfo.length; i++) {
                if (this._effectInfo[i].effect != effect)
                    continue;
                this.clearEffect(this._effectInfo[i].target, this._effectInfo[i].effect);
                this._effectInfo.splice(i, 1);
                if (isSingle)
                    return;
                i--;
            }
        };
        //显示特效
        BattleScene.prototype.showEffect = function (target, name, x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this._scene.showEffect(target, name, x, y, z);
        };
        //清理图集特效
        BattleScene.prototype.clearFrameEffect = function (target, name) {
            this._scene.clearFrameEffect(target, name);
        };
        // 清理玩家的所有特效用于死亡，清理战场等
        BattleScene.prototype.clearAllFrameEffect = function (target) {
            this._scene.clearAllFeameEffect(target);
        };
        //清理特效
        BattleScene.prototype.clearEffect = function (target, name) {
            this._scene.clearEffect(target, name);
        };
        //显示图集特效
        BattleScene.prototype.showFrameEffect = function (target, name, info, x, y, z) {
            if (info === void 0) { info = []; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this._scene.showFrameEffect(target, name, info, x, y, z);
            if (info.isbuff) {
                console.log("--------------_frameEffectInfo增加buff", target.name, name);
                this._frameEffectInfo.push({ effect: name, target: target, info: info, x: x, y: y, z: z }); //存储当前特效所有信息以便变身能够利用
            }
        };
        /**
         * 战场退出清除buf特效
         */
        BattleScene.prototype.clearBuffEffectOnBattleExit = function () {
            for (var i = 0; i < 28; i++) {
                var fiightModel = this.battle.findRoleByIndex(i);
                if (fiightModel)
                    this.clearAllFrameEffect(fiightModel.fakeUnit);
            }
        };
        /**
         * 战斗场景动作
         * @param target 模型
         * @param atnStus 动作枚举
         * @param func 播放结束回调
         * @param completeState 动作完成状态:0 循环,1 最后一幀,2 默认动作
         */
        BattleScene.prototype.battleAction = function (target, atnStus, func, completeState) {
            if (completeState === void 0) { completeState = 2; }
            this._scene.battleAction(target, atnStus, func, completeState);
        };
        //是否有指定特效
        BattleScene.prototype.isHasEffect = function (target, effect) {
            if (!target || !effect)
                return false;
            for (var i = 0; i < this._effectInfo.length; i++) {
                if (this._effectInfo[i].target == target && this._effectInfo[i].effect == effect)
                    return true;
            }
            return false;
        };
        //点击地面
        BattleScene.prototype.onSceneTouch = function (cellx, celly, hitObject) {
            if (!hitObject) {
                this.battle.judgehideSkillPanel();
                return false; //未选中
            }
            var index = this.indexOf(hitObject);
            if (index == -1) {
                return false;
            }
            this.battle.touchFightRole(index);
            this.clearEffects(this._effectWait, false);
            this._effectWait = null;
            return true;
        };
        //长按地面
        BattleScene.prototype.onSceneLongTouch = function (hitObject) {
            var index = this.indexOf(hitObject);
            if (index == -1) {
                return false;
            }
            //模拟显示buff
            this.battle.onforBuffer(index);
        };
        BattleScene.prototype.indexOf = function (obj) {
            var index = -1;
            for (var key in this._unit_list) {
                if (this._unit_list.hasOwnProperty(key)) {
                    var unit = this._unit_list[key];
                    if (unit === obj) {
                        index = Number(key);
                        break;
                    }
                }
            }
            return index;
        };
        /**
         * 增加战斗单元
         */
        BattleScene.prototype.addUnit = function (model) {
            var fakeUnit = this.createFakeUnit(model);
            console.log(">>>> addUnit: ", fakeUnit, " index", model.index);
            this._unit_list[model.index] = fakeUnit;
            if (model.fighterType == 4 /* FIGHTER_MONSTER_HIDE */ || model.fighterType == 5 /* FIGHTER_MONSTER_NPC */) {
                if (model.subtype == 2) //精英 
                    Laya.timer.once(500, this, this.showEffects, [model.fakeUnit, battle_1.SceneBattleRes.EFFECT_BLOOD_SILVER_EDGE, -19, -1, 0]); //this.showEffects(model.fakeUnit, SceneBattleRes.EFFECT_BLOOD_SILVER_EDGE, -19, -1, 0);
            }
        };
        /**
         * 创建模型对象
         */
        BattleScene.prototype.createFakeUnit = function (model, fake) {
            var fakeUnit = this._objMgr.CreateFakeObject();
            fakeUnit.SetTypeId(UnitField.TYPE_ID_CREATURE);
            fakeUnit.SetEntry(model.shape);
            var oname = model.fighterName;
            if (oname && oname.length) {
                fakeUnit.SetName(oname);
            }
            else if (model.dataID || model.shape) {
                var CMonsterConfigBaseVo = game.modules.guaji.models.GuaJiModel.getInstance().monstersDic[model.dataID];
                if (CMonsterConfigBaseVo) {
                    fakeUnit.SetName(CMonsterConfigBaseVo.name);
                }
                else if (model.shape) {
                    var cNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[model.shape + ""];
                    if (cNpcShapeBaseVo) {
                        fakeUnit.SetName(cNpcShapeBaseVo.name);
                    }
                }
            }
            if (model.fighterType == 1 /* FIGHTER_ROLE */) //人物职业
             {
                for (var key in game.scene.models.SceneModel.getInstance().rolelist.keys) {
                    var role = game.scene.models.SceneModel.getInstance().rolelist.get(game.scene.models.SceneModel.getInstance().rolelist.keys[key]);
                    if (role.rolebasicOctets.roleid == model.dataID) {
                        model.school = fakeUnit.School = 10 + (role.rolebasicOctets.dirandschool & 0x0F);
                        fakeUnit.Shape = model.shape;
                    }
                }
            }
            fakeUnit.isBattleRole = true;
            fakeUnit.needShowAnger = false;
            fakeUnit.scale = 1;
            fakeUnit.SetLevel(model.level);
            this.setComponent(model, fakeUnit);
            fakeUnit.SetSpeed(200);
            var is_bottom = model.isBottom;
            // console.log("------------name = ", oname, "  pos = ", p.x, "  p.y = ", p.y, "  is_bottom =  ", is_bottom);
            var toward;
            var p;
            if (model.index <= 28 /* MAX_ROLE */) {
                fakeUnit.needShowName = true;
                p = this.getMapPoint(model.pos - 1, is_bottom);
                // 朝向
                toward = -155;
                if (!is_bottom) {
                    toward = 58;
                }
            }
            else if (model.index <= 35 /* WATCHER_MIDDLE_POS */) //观战上阵位朝向
             {
                p = this.getMapPoint(model.index, is_bottom);
                fakeUnit.needShowName = false;
                toward = 155;
            }
            else //观战下阵位朝向
             {
                fakeUnit.needShowName = false;
                p = this.getMapPoint(model.index, is_bottom);
                toward = -58;
            }
            fakeUnit.SetPos(p.x, p.y);
            fakeUnit.toward = toward;
            fakeUnit.hp = model.hp;
            fakeUnit.maxHp = model.maxhp;
            fakeUnit.maxAnger = 4;
            fakeUnit.isSelfRole = is_bottom;
            fakeUnit.battle = 1;
            fakeUnit.fristUpdate();
            if (!fake) {
                model.fakeUnit = fakeUnit;
            }
            if (model.is_self_role && game.scene.models.SceneModel.getInstance().kuileiOccupation.indexOf(LoginModel.getInstance().roleDetail.school) != -1)
                this._addKuiLei(fakeUnit);
            return fakeUnit;
        };
        /** 职业附带傀儡 */
        BattleScene.prototype._addKuiLei = function (unit) {
            var fakeUnit = this._objMgr.CreateFakeObject();
            fakeUnit.needShowName = false;
            fakeUnit.toward = unit.toward;
            fakeUnit.battle = unit.battle;
            fakeUnit.scale = unit.scale;
            fakeUnit.isBattleRole = true;
            fakeUnit.SetSpeed(unit.speed);
            fakeUnit.SetTypeId(UnitField.TYPE_ID_CREATURE);
            fakeUnit.SetEntry(1010101);
            fakeUnit.SetPos(unit.pos.x + 2, unit.pos.y);
            fakeUnit.hp = 100;
            fakeUnit.fristUpdate();
        };
        /** 设置造型数据
         * @param model 创建模型  @param unit Unit对象
         */
        BattleScene.prototype.setComponent = function (model, unit) {
            if (!model || !unit || !model.components || model.components.keys.length == 0)
                return;
            for (var _index = 0; _index < model.components.keys.length; _index++) {
                if (model.components.keys[_index] == SpriteComponents.SPRITE_WEAPON) {
                    var weaponId = model.components.get(model.components.keys[_index]);
                    var equip = StrengTheningModel.getInstance().equipEffectData[weaponId];
                    if (equip) {
                        unit.Weapon = equip.weaponid;
                        //    unit.Shape = LoginModel.getInstance().roleDetail.shape;
                        //    unit.School = LoginModel.getInstance().roleDetail.school;
                        return;
                    }
                }
            }
        };
        /** 移除战斗单元
         * @param FakeUnit 模型
        */
        BattleScene.prototype.removeFakeUint = function (FakeUnit) {
            this._objMgr.ReleaseObject(FakeUnit);
        };
        /**
         * 获取站位
         */
        BattleScene.prototype.getMapPoint = function (index, is_bottom, offestX, offestY) {
            if (offestX === void 0) { offestX = 0; }
            if (offestY === void 0) { offestY = 0; }
            var x;
            var y;
            if (index <= 28 /* MAX_ROLE */) {
                if (is_bottom) {
                    x = battle_1.SceneBattleRes.BOTTOM_POSX[index];
                    y = battle_1.SceneBattleRes.BOTTOM_POSY[index];
                }
                else {
                    x = battle_1.SceneBattleRes.TOP_POSX[index];
                    y = battle_1.SceneBattleRes.TOP_POSY[index];
                }
            }
            else //观战位置
             {
                var _index = (index - 31 /* WATCHER_START_POS */);
                x = battle_1.SceneBattleRes.MIDDLE_POX[_index];
                y = battle_1.SceneBattleRes.MIDDLE_POY[_index];
            }
            // console.log("----------x = ", x, "------------y = ", y);
            x = this._center.x + x / (this.battleScale * SceneRes.CELL_WIDTH);
            y = this._center.y + y / (this.battleScale * SceneRes.CELL_HEIGHT);
            //console.log("----------------------index = ", index, "   x = ", x, "  y = ", y, " _center.x = ", this._center.x, "  _center.y = ", this._center.y);
            return new Vector2(x, y);
        };
        BattleScene.prototype.getV3DByMapPos = function (posX, posY) {
            var x = (posX - this._scene.camera.logicLeft) * SceneRes.CELL_WIDTH * this._scene.scaleX;
            var y = (posY - this._scene.camera.logicTop) * SceneRes.CELL_HEIGHT * this._scene.scaleY;
            var nScale = 0.25 / scene2d.Override2dEngine.htmlScale;
            x = x * nScale;
            y = y * nScale / (Math.sin(45 * Math.PI / 180)) * -1;
            return new Vector3D(x, 0, y);
        };
        /**
         * 战将普攻前往
         * @param target 指定战将
         * @param index 目标阵位下标
         */
        BattleScene.prototype.moveForward = function (target, index, isBottom) {
            var time = 25;
            var delay = 10;
            var p = this.getMapPoint(index, isBottom);
            if (isBottom) {
                p.x -= 3.5;
                p.y -= 3;
            }
            else {
                p.x += 3.5;
                p.y += 3;
            }
            this._scene.doImitateMove(target, p.x, p.y, AvatarSprite.IMITATE_MOVE_TYPE_MOVE, time, delay);
            this.battleAction(target, AvatarData.ACTION_WALK, function () { });
            return time + delay;
        };
        /**
         * 战将普攻回阵位
         * @param target 指定战将
         * @param index 目标阵位下标
         */
        BattleScene.prototype.moveBack = function (target, index, isBottom) {
            var time = 25;
            var delay = 10;
            var p = this.getMapPoint(index, isBottom);
            // if (Math.abs(target.GetPosX() - p.x) < 1 && Math.abs(target.GetPosY() - p.y) < 1) return 0; //返回原地奔跑动作需要复位
            this._scene.doImitateMove(target, p.x, p.y, AvatarSprite.IMITATE_MOVE_TYPE_MOVE, time, delay);
            this.battleAction(target, AvatarData.STATE_RETREAT, function () {
            });
            return time + delay;
        };
        /** 战将中心点返回 */
        BattleScene.prototype.moveHalfForward = function (target, ypos, xpos) {
            var time = 750;
            var delay = 10;
            // let p = this.getMapPoint(index, isBottom);
            this._scene.doImitateMove(target, xpos, ypos, AvatarSprite.IMITATE_MOVE_TYPE_RUN, time, delay);
            this.battleAction(target, AvatarData.STATE_RUNNING, function () { }, 0);
            return time + delay;
        };
        /** 战将逃跑移动 */
        BattleScene.prototype.moveRun = function (target, ypos, xpos, time, delay, continued) {
            var _this = this;
            if (time === void 0) { time = 1500; }
            if (delay === void 0) { delay = 0; }
            if (continued === void 0) { continued = 1500; }
            // let time = 1500;
            // let delay = 1000;
            //调整朝向
            target.toward = 58;
            this._scene.doImitateMove(target, xpos, ypos, AvatarSprite.IMITATE_MOVE_TYPE_RUN, time, delay);
            this.battleAction(target, AvatarData.STATE_RUNNING, function () { }, 0);
            Laya.timer.once(continued, this, function () { if (_this && target)
                target.toward = -155; });
            return (time + delay);
        };
        /** 战将捕捉移动 */
        BattleScene.prototype.moveCatchRun = function (target, index, isBottom) {
            var time = 1500;
            var delay = 10;
            var p = this.getMapPoint(index, isBottom);
            if (isBottom) {
                p.x -= 3.5;
                p.y -= 3;
            }
            else {
                p.x += 3.5;
                p.y += 3;
            }
            this.battleAction(target, AvatarData.STATE_RUNNING, function () { }, 0);
            this._scene.doImitateMove(target, p.x, p.y, AvatarSprite.IMITATE_MOVE_TYPE_RUN, time, delay);
            return time + delay;
        };
        return BattleScene;
    }());
    battle_1.BattleScene = BattleScene;
})(battle || (battle = {}));
//# sourceMappingURL=BattleScene.js.map