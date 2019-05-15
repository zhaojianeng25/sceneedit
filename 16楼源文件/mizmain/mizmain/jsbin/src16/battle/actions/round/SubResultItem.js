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
        var SubResultItem = /** @class */ (function (_super) {
            __extends(SubResultItem, _super);
            function SubResultItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SubResultItem.prototype.onInit = function (subresult, attacker_id, operation, operationId, msgID, isFaShuLianJi, subIndex) {
                _super.prototype.onInit.call(this);
                this.subresult = subresult;
                this.attacker_id = attacker_id;
                this.operation = operation;
                this.operstionID = operationId;
                this.msgID = msgID;
                this.isFaShuLianJi = isFaShuLianJi;
                this.subIndex = subIndex;
            };
            SubResultItem.prototype.onStart = function () {
                //  console.log("-----------SubResultItem opt=", this.operation, "  attacker_id=", this.attacker_id, "  subresult=", this.subresult);
                var stage_actions = [];
                var stage_action;
                var attacker = this.battle.findRoleByIndex(this.attacker_id);
                var subSkillID = this.subresult.subskillid;
                var stage_data = new StageInfoBaseVo();
                if (this.operation == 1 /* ACTION_ATTACK */) // 普攻
                    stage_actions = new battle.action.operation.SelectNormalAttack(this.subresult, this.attacker_id, this.battle, this.msgID).doAction();
                else if (this.operation == 2 /* ACTION_SKILL */ || this.operation == 11 /* ACTION_SPECIAL_SKILL */ || this.operation == 3 /* ACTION_USEITEM */) // 技能和使用道具
                    stage_actions = new battle.action.operation.SelectSkill(this.subresult, this.attacker_id, this.battle, this.operstionID, this.isFaShuLianJi).doAction();
                else if (this.operation == 6 /* ACTION_SUMMON */) { // 召唤
                    if (this.subresult.subskillid != 0) // 有技能ID
                        stage_actions = new battle.action.operation.SelectSkill(this.subresult, this.attacker_id, this.battle, this.operstionID, this.isFaShuLianJi).doAction();
                    else {
                        stage_data.actiontype = 9 /* MAGIC */;
                        stage_data.phantomid = 0;
                        stage_action = new aciton.stage.PlayAction(this.battle, this.subresult.resultlist[this.subIndex], stage_data, attacker, [attacker.fakeUnit]);
                    }
                }
                else if (this.operation == 8 /* ACTION_CATHCH */) { // 捕捉
                    var MainCatch = new battle.action.operation.MainCatch(this.subresult, this.attacker_id, this.battle);
                    stage_actions = MainCatch.doAction();
                }
                else if (this.operation == 9 /* ACTION_ESCAPE */) { // 逃跑
                    stage_actions = new battle.action.operation.Runaway(this.subresult, this.attacker_id, this.battle).doAction();
                }
                else if (this.operation == 10 /* ACTION_REST */) { // 休息
                    if (attacker.is_self_role || attacker.is_pet)
                        stage_action = new battle.aciton.stage.MessageTip(this.battle, 150123);
                }
                else if (this.operation == 12 /* ACTION_SUMMON_INSTANT */) { //瞬间召唤
                    // var stage_data: StageInfoBaseVo = new StageInfoBaseVo();
                    // stage_data.actiontype = ActionType.MAGIC;
                    // stage_data.phantomid = 0;
                    // stage_action = new stage.PlayAction(this.battle, this.subresult.resultlist[this.subIndex], stage_data, attacker, [attacker.fakeUnit]);
                    // stage_actions.push(stage_action);
                    stage_action = stage_action = new battle.aciton.CResultStage(this.battle, this.subresult.resultlist[this.subIndex], this.attacker_id);
                    stage_actions.push(stage_action);
                }
                else if (this.operation == 21 /* ACTION_REPLACE */) { // 替换
                    //新增战斗单位在resultitem处理了
                    // GetBattleMagicControl()->AddNewBattler(false);
                    // ParallelSkillStage* pParStage = new ParallelSkillStage(600);
                    var battleAI = this.battle.battleProxy.BattleAIConfigData[this.operstionID];
                    var effectid = battleAI.effectid;
                    // 新来的人加特效？？
                    // ParallelSkillStage* pParStage = new ParallelSkillStage(600);
                    // for (unsigned i = 0; i < aScript.listBattler.size(); i++)
                    // 	pParStage->AddStage(new CPetSummonStage(aScript.listBattler[i].iBattleID, 100, effectID));
                    stage_action = stage_action = new battle.aciton.CResultStage(this.battle, this.subresult.resultlist[this.subIndex], this.attacker_id);
                    stage_actions.push(stage_action);
                }
                else if (this.operation == 14 /* ACTION_FAILURE */ || this.operation == 20 /* ACTION_FAILURE_NO_WONDER */) { // 操作失败 || 操作失败不带感叹号的
                    stage_action = new battle.aciton.stage.MessageTip(this.battle, this.msgID);
                }
                else if (this.operation == 18 /* ACTION_ROUNDENDDEMO */) { // 战场未结算demo
                    // c++这个更新属性，我们在ResultItem就处理了
                    // GetBattleManager() ->ProcessRoundEndScript(aScript.listResults[SubSkillIndex].listResults);
                    // //处理主角和宠物属性改变
                    // if (!aScript.RoleAttribute.empty()) {
                    //     std::map<int, int>::iterator it = aScript.RoleAttribute.find(fire::pb::attr::AttrType::SP);
                    //     if (it != aScript.RoleAttribute.end()) {
                    //         int spchange = aScript.RoleAttribute[fire::pb::attr::AttrType::SP] - GetMainRoleDataAttr(fire::pb::attr::AttrType::SP);
                    //         cocos2d::gGetScriptEngine() ->executeGlobalFunctionWithIntegerData("MainRoleData_UpdateSpChange", spchange);
                    //         aScript.RoleAttribute.erase(it);
                    //     }
                    //     CMainRoleDataManager::UpdateMainBattlerAttribute(aScript.RoleAttribute);
                    //     aScript.RoleAttribute.clear();
                    // }
                    // if (!aScript.PetAttribute.empty()) {
                    //     CMainRoleDataManager::UpdateMainPetAttribute(aScript.PetAttribute);
                    //     aScript.PetAttribute.clear();
                    // }
                }
                // 动作增加到队列
                if (stage_actions && stage_actions.length > 0) {
                    for (var i = 0; i < stage_actions.length; i++) {
                        var action_1 = stage_actions[i];
                        this.addQueue(action_1);
                    }
                }
            };
            SubResultItem.prototype.onLogic = function (delay) {
                if (this.start_time > 0) {
                    this.start_time -= delay;
                    return;
                }
                _super.prototype.onLogic.call(this, delay);
            };
            return SubResultItem;
        }(battle.ActionMgr));
        aciton.SubResultItem = SubResultItem;
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=SubResultItem.js.map