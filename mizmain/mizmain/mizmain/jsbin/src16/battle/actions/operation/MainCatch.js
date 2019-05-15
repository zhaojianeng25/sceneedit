var battle;
(function (battle_1) {
    var action;
    (function (action) {
        var operation;
        (function (operation) {
            /**
             * 捕捉
             */
            var MainCatch = /** @class */ (function () {
                function MainCatch(subresult, attacker_id, battle) {
                    this.bCatchOK = false;
                    this.subresult = subresult;
                    this.attacker_id = attacker_id;
                    this.battle = battle;
                }
                /**
                 * 播放逻辑
                 */
                MainCatch.prototype.doAction = function () {
                    var stage_actions = [];
                    var stage_action;
                    var pBattler = this.battle.findRoleByIndex(this.attacker_id);
                    if (!pBattler)
                        return stage_actions;
                    var bCatchOK = false;
                    var iTargetID = 0;
                    if (this.subresult.resultlist.length != 1)
                        return stage_actions;
                    else {
                        iTargetID = this.subresult.resultlist[0].targetID;
                        if (this.subresult.resultlist[0].target_result && 2048) //eBattleResult_Seized		= 1<<11,//目标被捕捉
                         {
                            bCatchOK = true;
                        }
                    }
                    this.bCatchOK = bCatchOK;
                    var pTarget = this.battle.findRoleByIndex(iTargetID);
                    if (!pTarget)
                        return stage_actions;
                    //获取当前捕捉者的坐标 以及获取目标的坐标 
                    var LocalPos = new Vector2(pBattler.fakeUnit.GetPosX(), pBattler.fakeUnit.GetPosY());
                    var TargetPos = new Vector2(pTarget.fakeUnit.GetPosX(), pTarget.fakeUnit.GetPosY());
                    // BuildCatchMove 方法
                    var iMoveOffsetX = (TargetPos.x - LocalPos.x) * 1000 / 2000;
                    var iMoveOffsetY = (TargetPos.y - LocalPos.y) * 1000 / 2000;
                    var attacker_units = [pBattler.fakeUnit];
                    var pTarget_units = [pTarget.fakeUnit];
                    //获取当前捕捉者的坐标 以及获取目标的坐标 
                    // LocalPos = new Vector2()
                    var stage_data = this.getSageInfo();
                    if (bCatchOK) { //bCatchOK
                        //自身位移
                        stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, pBattler, attacker_units, 0, 0, false, 1 /* MATCH_RUN */);
                        stage_actions.push(stage_action);
                        // this.subresult.resultlist[0].targetID =  pBattler.index;
                        var Demoresult = new game.scene.models.NewDemoResultVo();
                        Demoresult.targetID = pBattler.index;
                        // stage_data.delay = 0;
                        // stage_action.setDelayTicks(1200);
                        // stage_actions.push(new aciton.DelayPlay(this.battle, 1000));   
                        //自身转向返回
                        stage_action = new battle.aciton.stage.Move(this.battle, Demoresult, stage_data, pBattler, attacker_units, 0, 0, false, 2 /* MATCH_BACK */);
                        stage_actions.push(stage_action);
                        //目标跟着移动
                        stage_action = new battle.aciton.stage.Move(this.battle, Demoresult, stage_data, pTarget, pTarget_units, 0, 0, false, 1 /* MATCH_RUN */);
                        stage_actions.push(stage_action);
                        //复位
                        var stage_data1 = this.getSageInfo();
                        stage_action = new battle_1.Recover(this.battle, pBattler, attacker_units, stage_data1);
                        stage_actions.push(stage_action);
                        //弹窗提示捕捉成功
                        stage_action = new battle.aciton.stage.MessageTip(this.battle, 141172);
                        stage_actions.push(stage_action);
                        //增加结果stage
                        stage_action = new battle.aciton.CResultStage(this.battle, this.subresult.resultlist[0]);
                        stage_actions.push(stage_action);
                        //隐藏模型
                        stage_data = this.getSageInfo();
                        stage_data.phantomalpha = -1;
                        // stage_data.delay = 1500;
                        // stage_action.setDelayTicks(1500)
                        // stage_actions.push(new aciton.DelayPlay(this.battle, 1500));                
                        stage_action = new battle.aciton.stage.HideModel(this.battle, this.subresult.resultlist[0], stage_data, pTarget, attacker_units);
                        stage_actions.push(stage_action);
                    }
                    else //捕捉失败
                     {
                        //自身位移
                        stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, pBattler, attacker_units, 0, 0, false, 1 /* MATCH_RUN */);
                        stage_actions.push(stage_action);
                        // this.subresult.resultlist[0].targetID =  pBattler.index;
                        var Demoresult = new game.scene.models.NewDemoResultVo();
                        Demoresult.targetID = pBattler.index;
                        var pBattlerY = pBattler.fakeUnit.GetPosY();
                        var pTargetY = pTarget.fakeUnit.GetPosY();
                        var centerY = (pBattlerY + pTargetY) / 2;
                        var pBattlerX = pBattler.fakeUnit.GetPosX();
                        var pTargetX = pTarget.fakeUnit.GetPosX();
                        var centerX = (pBattlerX + pTargetX) / 2;
                        //自身转向返回
                        stage_action = new battle.aciton.stage.Move(this.battle, Demoresult, stage_data, pBattler, attacker_units, 0, 0, false, 2 /* MATCH_BACK */);
                        stage_actions.push(stage_action);
                        //目标移动=>中心点
                        stage_action = new battle.aciton.stage.Move(this.battle, Demoresult, stage_data, pTarget, pTarget_units, centerY, centerX, true, 1 /* MATCH_RUN */);
                        stage_actions.push(stage_action);
                        // this.subresult.resultlist[0].targetID =  pTarget.index;
                        //目标复位
                        stage_action = new battle_1.Recover(this.battle, pTarget, pTarget_units);
                        stage_actions.push(stage_action);
                        //自己复位
                        stage_actions.push(new battle_1.aciton.DelayPlay(this.battle, 750));
                        var stage_data1 = this.getSageInfo();
                        stage_action = new battle_1.Recover(this.battle, pBattler, attacker_units, stage_data1);
                        stage_actions.push(stage_action);
                        // //播放攻击动作
                        // let stage_data2 = this.getSageInfo();
                        // // stage_data2.delay = 800;
                        // stage_action.setDelayTicks(800)
                        // stage_action = new battle.aciton.stage.PlayAction(this.battle, this.subresult.resultlist[0], stage_data2, pBattler, attacker_units);
                        // stage_actions.push(stage_action);
                        // 播放特效
                        // stage_data.effectname = "buzhuoshibai";
                        // stage_action = new battle.aciton.stage.TextEffectStage(this.battle);
                        // stage_actions.push(stage_action);
                        //弹窗提示捕捉成功
                        stage_action = new battle.aciton.stage.MessageTip(this.battle, 141173);
                        stage_actions.push(stage_action);
                        //增加结果stage
                        stage_action = new battle.aciton.CResultStage(this.battle, this.subresult.resultlist[0]);
                        stage_actions.push(stage_action);
                    }
                    return stage_actions;
                };
                //组装stage 
                MainCatch.prototype.getSageInfo = function () {
                    // 组装stage
                    var stage_data = new StageInfoBaseVo();
                    stage_data.postype = 0 /* eMagicPos_Static */;
                    stage_data.actiontype = 5 /* RUN */;
                    stage_data.phantomid = 0;
                    return stage_data;
                };
                return MainCatch;
            }());
            operation.MainCatch = MainCatch;
        })(operation = action.operation || (action.operation = {}));
    })(action = battle_1.action || (battle_1.action = {}));
})(battle || (battle = {}));
//# sourceMappingURL=MainCatch.js.map