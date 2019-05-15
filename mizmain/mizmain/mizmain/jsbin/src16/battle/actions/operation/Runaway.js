var battle;
(function (battle_1) {
    var action;
    (function (action) {
        var operation;
        (function (operation) {
            /**
             * 逃跑效果
             */
            var Runaway = /** @class */ (function () {
                function Runaway(subresult, attacker_id, battle) {
                    this.subresult = subresult;
                    this.attacker_id = attacker_id;
                    this.battle = battle;
                }
                /**
                 * 播放逻辑
                 */
                Runaway.prototype.doAction = function () {
                    var stage_actions = [];
                    var stage_action;
                    var pSender = this.battle.findRoleByIndex(this.attacker_id);
                    if (!pSender)
                        return;
                    var pBattlerPet;
                    if (pSender.fighterType === 1 /* FIGHTER_ROLE */) {
                        pBattlerPet = this.battle.findRoleByIndex(pSender.index + 5);
                    }
                    var iTarget = 0;
                    if (this.subresult.resultlist.length > 0) {
                        iTarget = this.subresult.resultlist[0].targetID;
                    }
                    // 组装stage
                    var stage_data = new StageInfoBaseVo();
                    stage_data.postype = 0 /* eMagicPos_Static */;
                    stage_data.actiontype = 5 /* RUN */;
                    stage_data.phantomid = 0;
                    stage_data.delay = 0;
                    if (this.subresult.resultlist[0].target_result == 0) //逃跑失败 
                     {
                        pSender.fakeUnit.toward = 58;
                        //人物动作
                        stage_action = new battle.aciton.stage.PlayAction(this.battle, this.subresult.resultlist[0], stage_data, pSender, [pSender.fakeUnit]);
                        stage_actions.push(stage_action);
                        //播放音效
                        stage_action = new battle.aciton.stage.SoundEffectStage(this.battle, "sounds/skill/mt3-taopaoshibai.ogg");
                        stage_actions.push(stage_action);
                        Laya.timer.once(1800, this, function () { pSender.fakeUnit.toward = -155; });
                        /** 逃跑失败弹出提示框 */
                        if (pSender.is_self_role || (pBattlerPet && pBattlerPet.is_pet)) {
                            stage_action = new battle.aciton.stage.MessageTip(this.battle, 144760);
                            stage_actions.push(stage_action);
                        }
                    }
                    else //逃跑成功
                     {
                        //动作的集合
                        stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, pSender, [pSender.fakeUnit], pSender.fakeUnit.GetPosY(), pSender.fakeUnit.GetPosX());
                        stage_actions.push(stage_action);
                        stage_action = new battle.aciton.stage.SoundEffectStage(this.battle, "sounds/skill/mt3-taopaochenggong.ogg");
                        stage_actions.push(stage_action);
                        if (pBattlerPet && pBattlerPet.is_pet) {
                            stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, pBattlerPet, [pBattlerPet.fakeUnit], pBattlerPet.fakeUnit.GetPosY(), pBattlerPet.fakeUnit.GetPosX());
                            stage_actions.push(stage_action);
                        }
                    }
                    // for (var _index = 0; _index < this.subresult.resultlist.length; _index++) {
                    // stage_action = new battle.aciton.CResultStage(this.battle, this.subresult.resultlist[0], this.attacker_id);
                    // stage_actions.push(stage_action);
                    // }
                    return stage_actions;
                };
                return Runaway;
            }());
            operation.Runaway = Runaway;
        })(operation = action.operation || (action.operation = {}));
    })(action = battle_1.action || (battle_1.action = {}));
})(battle || (battle = {}));
//# sourceMappingURL=Runaway.js.map