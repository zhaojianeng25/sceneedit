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
var battle;
(function (battle) {
    var aciton;
    (function (aciton) {
        var CResultStage = /** @class */ (function (_super) {
            __extends(CResultStage, _super);
            function CResultStage() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            CResultStage.prototype.onInit = function (result, attacker_id) {
                _super.prototype.onInit.call(this);
                this.result = result;
                this.attacker_id = attacker_id;
                //console.log("-----------CResultStage start");
            };
            CResultStage.prototype.onStart = function () {
                if (this.battle) {
                    var pBtl = this.battle.findRoleByIndex(this.attacker_id);
                    //定义在NewDemoResult里的一个变量 默认为false更新完成设置为true 我们根据情况看是否需要加上这个值
                    var it = this.result;
                    var pProtecter = this.battle.findRoleByIndex(it.protecter_id);
                    if (!it.bgeneresult) {
                        var pTarget = this.battle.findRoleByIndex(it.targetID);
                        if (it.resultType != 1) { //结果类型 0普通 1反击 2连击 3追击 4溅射 5战斗结束 6破隐形
                            this.doResult(pTarget);
                            if (pTarget) {
                                // stage_action = new battle.aciton.NewDemoResult(this.battle, it, pTarget);
                                // 更换模型
                                if (it.shape_change != 0) {
                                    var mid = it.shape_change == -1 ? 0 : it.shape_change;
                                    var stage_action = new battle.aciton.stage.ChangeModel(this.battle, this.result);
                                    this.addQueue(stage_action);
                                }
                                //更新 受击者效果点变化，为正是加效果点，为负是扣效果点
                                if (it.ep_change != 0)
                                    pTarget.changEp(it.ep_change);
                            }
                            //let pProtecters = this.battle.findRoleByIndex(it.protecter_id);
                            //if (pProtecters) this.doResult();//stage_actions.push(new battle.aciton.NewDemoResult(this.battle, it, pProtecters));
                            if (pBtl) {
                                //更新 ProcessResultAction
                                // if (it.steal_hp != 0 || it.steal_mp != 0) {
                                //stage_actions.push(new battle.aciton.NewDemoResult(this.battle, it, pBtl));
                                //   this.doResult();
                                // }
                                if (it.return_hurt != 0) {
                                    //eBattleResult_Hit			= 1<<5,	//目标受伤 32
                                    it.attacker_result = it.attacker_result || 32;
                                    //stage_actions.push(new battle.aciton.NewDemoResult(this.battle, it, pBtl));
                                    // this.doResult();
                                    //保护者ID
                                    var data = [];
                                    data.name = "fantan";
                                    if (pProtecter)
                                        //如果有保护者 飘字体 反震enumHPMPChangeType.eFanZhen
                                        this.battle._scene._scene.createdFightxt(pProtecter.fakeUnit, 3 /* PIC */, data, false);
                                    else if (pTarget)
                                        this.battle._scene._scene.createdFightxt(pTarget.fakeUnit, 3 /* PIC */, data, false);
                                }
                            }
                        }
                        // 结果等于反击且反击值不等于0 
                        if (it.resultType == 1) {
                            var data = [];
                            data.name = "fanji";
                            if (pProtecter)
                                //如果有保护者 飘字体 反震enumHPMPChangeType.eFanZhen
                                this.battle._scene._scene.createdFightxt(pProtecter.fakeUnit, 3 /* PIC */, data, false);
                            else if (pTarget)
                                this.battle._scene._scene.createdFightxt(pTarget.fakeUnit, 3 /* PIC */, data, false);
                            this.doResult(pBtl);
                        }
                        //更新完毕后 生成结果改为true
                        it.bgeneresult = true;
                        // console.log("-----------CResultStage end");
                    }
                }
            };
            CResultStage.prototype.doResult = function (target) {
                var resultVO = this.result;
                var list = [];
                //const target: FightModel = this.battle.findRoleByIndex(resultVO.targetID);
                var stage_action;
                if (!target)
                    return;
                // 每一个demo的属性变化
                for (var i = 0; i < resultVO.demoattrs.length; i++) {
                    var attr = resultVO.demoattrs[i];
                    var fightId = attr.fighterid;
                    // 属性ID和数值
                    this.battle.updateAttr(attr.fighterid, attr.attrid, attr.value);
                }
                // 每一个demo的buff变化
                for (var i = 0; i < resultVO.demobuffs.length; i++) {
                    var buff_1 = resultVO.demobuffs[i];
                    this.battle.updateBuff(buff_1.fighterid, buff_1.buffid, buff_1.round);
                }
                // console.log("--------------------CResultStage resultVO.targetID=", resultVO.targetID);
                // console.log("--------------------CResultStage target=", target.fighterName);
                // 判断神佑值
                if (resultVO.hp_godbless != 0) {
                    // 漂数字
                    this.battle.page.updateHp(target, resultVO.hp_godbless);
                    // 飘字 涅槃
                    console.log(" CResultStage 神佑血量变化", resultVO.hp_godbless, "站位:", target.index);
                }
                var dealULHP = false; //是否已经处理了血上限变化
                var result = 1 /* eBattleResult_HPChange */; //(int)eBattleResult_HPChange;
                while (result < 8388609 /* eBattleResultMax */) {
                    if (result & resultVO.target_result) {
                        switch (result) {
                            case 1 /* eBattleResult_HPChange */: //血量变化
                                {
                                    if (resultVO.hp_change != 0) {
                                        dealULHP = true;
                                        if (resultVO.ul_hp_change > 0) {
                                            // TODO 更新最大血量的血条
                                            target.maxhp += resultVO.ul_hp_change;
                                        }
                                        // 目标被暴击
                                        if (resultVO.target_result & 64 /* eBattleResult_Critic */) {
                                            console.log("CResultStage 目标被暴击", resultVO.flagtype);
                                            // 飘字
                                            this.battle.page.updateHp(target, resultVO.hp_change, resultVO.flagtype, true);
                                        }
                                        else
                                            // 普通飘字
                                            this.battle.page.updateHp(target, resultVO.hp_change, resultVO.flagtype, false);
                                        console.log("CResultStage 血量变化", resultVO.hp_change, target.fakeUnit.name, "剩余血:", target.hp, "站位:", target.index);
                                        // if (target.fakeUnit.hp <= 0 )
                                        // {
                                        //      target.hp = 0;
                                        //      var stage_data: StageInfoBaseVo = new StageInfoBaseVo();
                                        //      stage_data.actiontype = ActionType.DEATH;
                                        //      stage_data.phantomid = 0;
                                        //      stage_action = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, target, [target.fakeUnit]);
                                        //      this.addQueue(stage_action);
                                        //      console.log("CResultStage 血量变化 死亡", resultVO.hp_change, target.fakeUnit.name,"剩余血:", target.hp,  "站位:",target.index);
                                        // }
                                    }
                                }
                                break;
                            case 2 /* eBattleResult_MPChange */: // 魔法值变化
                                {
                                    console.log("CResultStage 魔法值变化", resultVO.mp_change);
                                    if (resultVO.mp_change != 0)
                                        // 漂蓝
                                        this.battle.page.updateMp(target, resultVO.mp_change);
                                }
                                break;
                            case 4 /* eBattleResult_SPChange */: // 目标怒气变化
                                {
                                    console.log("CResultStage 目标怒气变化", resultVO.sp_change);
                                    // 如果是当前玩家的怒气值，那么更新属性数据 TODO
                                    if (resultVO.sp_change != 0 && target.is_self_role) {
                                    }
                                }
                                break;
                            case 32 /* eBattleResult_Hit */: // 目标受伤
                                {
                                    console.log("CResultStage 目标受伤", target.fakeUnit.name, "站位:", target.index);
                                    if (!(resultVO.target_result & 128 /* eBattleResult_Defence */) && !(resultVO.target_result & 256 /* eBattleResult_Parry */)) {
                                        // 播放被击特效 没有这个特效，策划说不做表现
                                        //PlayEffect(L"geffect/skill/mt3_beiji/mt3_beiji");
                                        // 获取这个cnpcshape中这个造型数据的hitmove是否位移
                                        if (!target.shape)
                                            return;
                                        var shapeInfo = LoginModel.getInstance().cnpcShapeInfo[target.shape];
                                        if (shapeInfo && shapeInfo.hitmove != 0) {
                                            // 受击移动时间
                                            // BeginHitMove(90);
                                            var stage_data = new StageInfoBaseVo();
                                            stage_data.actiontype = 7 /* ATTACKED */;
                                            stage_data.phantomid = 0;
                                            stage_action = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, target, [target.fakeUnit]);
                                            this.addQueue(stage_action);
                                        }
                                        else {
                                            // 受击后仰
                                            var stage_data = new StageInfoBaseVo();
                                            stage_data.actiontype = 7 /* ATTACKED */;
                                            stage_data.phantomid = 0;
                                            stage_action = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, target, [target.fakeUnit]);
                                            this.addQueue(stage_action);
                                        }
                                    }
                                }
                                break;
                            case 256 /* eBattleResult_Parry */: // 目标招架、格挡
                                {
                                    console.log("CResultStage 目标招架、格挡", target.fighterName, "站位:", target.index);
                                    // 播放特效
                                    // var data: any = [];
                                    // data.name = "gedang";
                                    // this.battle.ShowFightxt(target, FlyTextType.PIC, data, false);
                                    this.addQueue(new battle.aciton.stage.TextEffectStage(this.battle, "gedang", target));
                                    // 设置防御动作
                                    var stage_data = new StageInfoBaseVo();
                                    stage_data.actiontype = 11 /* DEFEND */;
                                    stage_data.phantomid = 0;
                                    var stage_action_1 = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, target, [target.fakeUnit]);
                                    this.addQueue(stage_action_1);
                                    // 执行动作
                                    // NewPlayAction(eActionDefence, 1.0f, true, eActionNull, true, true);
                                    // 设置位移参数
                                    // m_iOnhitDelay *= 1.75;
                                    // 防御移动时间
                                    // BeginHitMove(65);
                                }
                                break;
                            case 128 /* eBattleResult_Defence */: //目标防御
                                {
                                    console.log("CResultStage 目标防御", target.fighterName, "站位:", target.index);
                                    // 设置防御动作	
                                    var stage_data = new StageInfoBaseVo();
                                    stage_data.actiontype = 11 /* DEFEND */;
                                    stage_data.phantomid = 0;
                                    stage_action = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, target, [target.fakeUnit]);
                                    this.addQueue(stage_action);
                                    // SetDefaultAction(eActionDefence);
                                    // 执行防御
                                    // @(eActionDefence, 1.0f, true, eActionNull, true, true);
                                    // 设置位移参数
                                    // m_iOnhitDelay *= 1.75;
                                    // 移动时间
                                    // BeginHitMove(65);
                                }
                                break;
                            case 512 /* eBattleResult_Dodge */: //目标闪避
                                {
                                    console.log("CResultStage 目标闪避", target.fighterName, "站位:", target.index);
                                    // 计算位置速度时间
                                    // float time = 150.0f / m_fDemoSpeedRate;
                                    // float time1 = 50.0f / m_fDemoSpeedRate;
                                    // GetSprite() ->TeleportWithBlur(GetDodgePosition(), static_cast<int>(time), static_cast<int>(time1));
                                    // 执行闪避动作
                                    // PlayAction(eActionDodge);
                                    // 播放特效
                                    // var data: any = [];
                                    // data.name = "shanbi";
                                    // this.battle.ShowFightxt(target, FlyTextType.PIC, data, false);
                                    this.addQueue(new battle.aciton.stage.TextEffectStage(this.battle, "shanbi", target));
                                    var stage_data = new StageInfoBaseVo();
                                    stage_data.actiontype = 12 /* DODGE */;
                                    stage_data.phantomid = 0;
                                    stage_action = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, target, [target.fakeUnit]);
                                    this.addQueue(stage_action);
                                }
                                break;
                            case 8192 /* eBattleResult_Death */: //目标死亡,倒在原地
                                {
                                    console.log("CResultStage 目标死亡,倒在原地", target.fakeUnit.name, "站位:", target.index);
                                    // 设置人为死亡状态
                                    //m_bDeath = true;
                                    // 设置hp
                                    //SetHPValue(0);
                                    target.hp = 0;
                                    var stage_data = new StageInfoBaseVo();
                                    stage_data.actiontype = 14 /* DEATH */;
                                    stage_data.phantomid = 0;
                                    stage_action = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, target, [target.fakeUnit]);
                                    this.addQueue(stage_action);
                                }
                                break;
                            case 4096 /* eBattleResult_Summonback */: //目标被召回
                                {
                                    console.log("CResultStage 目标被召回", target.fighterName, "站位:", target.index);
                                }
                                break;
                            case 1024 /* eBattleResult_Runaway */: //目标逃跑
                                {
                                    console.log("CResultStage 目标逃跑", target.fighterName);
                                    var stage_data = new StageInfoBaseVo();
                                    stage_data.actiontype = 5 /* RUN */;
                                    stage_data.phantomid = 0;
                                    stage_action = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, target, [target.fakeUnit]);
                                    this.addQueue(stage_action);
                                }
                                break;
                            case 2048 /* eBattleResult_Seized */: //目标被捕捉
                                {
                                    console.log("CResultStage 目标被捕捉", target.fighterName, "站位:", target.index);
                                }
                                break;
                            case 65536 /* eBattleResult_Relive */: //目标被复活
                                {
                                    console.log("CResultStage 目标被复活", target.fighterName, "站位:", target.index);
                                    this.addQueue(new battle.aciton.stage.TextEffectStage(this.battle, "niepan", target));
                                    var stage_data = new StageInfoBaseVo();
                                    stage_data.actiontype = 1 /* STAND */;
                                    stage_data.phantomid = 0;
                                    stage_action = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, target, [target.fakeUnit]);
                                    this.addQueue(stage_action);
                                }
                                break;
                            case 131072 /* eBattleResult_Summon */: // 目标被召唤
                                {
                                    console.log("CResultStage 目标被召唤", target.fighterName, "站位:", target.index);
                                }
                                break;
                            case 16 /* eBattleResult_Rest */: //目标休息
                                {
                                    console.log("CResultStage 目标休息", target.fighterName);
                                }
                                break;
                            case 8 /* eBattleResult_ULHPChange */: //目标当前血上限变化
                                {
                                    if (!dealULHP && resultVO.ul_hp_change > 0) {
                                        console.log("CResultStage 目标当前血上限变化", target.fighterName, "站位:", target.index);
                                        // 更新血量上限变化
                                        // target.maxhp += resultVO.ul_hp_change;
                                        target.changeUpLimitHp(resultVO.ul_hp_change);
                                        this.battle.page.updateHp(target, resultVO.ul_hp_change, resultVO.flagtype, false);
                                    }
                                }
                                break;
                            case 16384 /* eBattleResult_FlyOut */:
                                {
                                    console.log("CResultStage 目标击飞", target.fighterName, "站位:", target.index);
                                    // 如果造型id是以下范围的，不击飞设置死亡闪烁消失
                                    // if (target.shape < 1000 || target.shape == 6100 || target.shape == 6126) {
                                    //     //m_bDieVanish = true;
                                    // }
                                    // else {
                                    if (target.subtype == 2)
                                        this.battle.scene.clearEffect(target.fakeUnit, battle.SceneBattleRes.EFFECT_BLOOD_SILVER_EDGE);
                                    this.battle.cleanBuff(target);
                                    var stage_data = new StageInfoBaseVo();
                                    stage_data.actiontype = 15 /* ROLL */;
                                    stage_data.phantomid = 0;
                                    var stage_action_2 = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, target, [target.fakeUnit]);
                                    this.addQueue(stage_action_2);
                                    // }
                                }
                                break;
                            case 32768 /* eBattleResult_Ghost */: //目标进入鬼魂状态
                                {
                                    console.log("CResultStage 目标进入鬼魂状态", target.fighterName, "站位:", target.index);
                                    target.hp = 0;
                                }
                                break;
                            case 262144 /* eBattleResult_NotDefence */: // 忽略防御
                                {
                                    console.log("CResultStage 忽略防御", target.fighterName, "站位:", target.index);
                                }
                            case 524288 /* eBattleResult_Absorb */: // 吸收
                                {
                                    console.log("CResultStage 吸收", target.fighterName, "站位:", target.index);
                                    // var data: any = [];
                                    // data.name = "xishou";
                                    // this.battle.ShowFightxt(target, FlyTextType.PIC, data, false);
                                    this.addQueue(new battle.aciton.stage.TextEffectStage(this.battle, "xishou", target));
                                    break;
                                }
                            case 1048576 /* eBattleResult_DestroyMP */: // 打蓝
                                {
                                    console.log("CResultStage 打蓝", target.fighterName, "站位:", target.index);
                                    // 播放特效
                                    // var data: any = [];
                                    // data.name = "tuimo";
                                    // this.battle.ShowFightxt(target, FlyTextType.PIC, data, false);
                                    this.addQueue(new battle.aciton.stage.TextEffectStage(this.battle, "tuimo", target));
                                    break;
                                }
                        }
                    }
                    result = result << 1;
                }
                //处理逃跑
                if (result == 10 /* RUNAWAY */ && !(resultVO.target_result & 1024 /* eBattleResult_Runaway */)) {
                    console.log("CResultStage 处理逃跑", target.fighterName, "站位:", target.index);
                    // 如果是玩家
                    if (target.is_self_role) {
                        //  获取宠物
                        var pet = this.battle.findRoleByIndex(target.index + 5 /* PET_INDEX */);
                        // 如果宠物没有死亡
                        if (pet && pet.hp > 0) {
                            // 播放BATTLE_STAND
                            var stage_data = new StageInfoBaseVo();
                            stage_data.actiontype = 11 /* DEFEND */;
                            stage_data.phantomid = 0;
                            stage_action = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, pet, [pet.fakeUnit]);
                            this.addQueue(stage_action);
                        }
                    }
                    //处理玩家的逃跑动作
                    var stage_data = new StageInfoBaseVo();
                    stage_data.actiontype = 11 /* DEFEND */;
                    stage_data.phantomid = 0;
                    stage_action = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, target, [target.fakeUnit]);
                    this.addQueue(stage_action);
                }
            };
            return CResultStage;
        }(battle.ActionMgr));
        aciton.CResultStage = CResultStage;
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=CResultStage.js.map