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
var ChatMessageVo = game.modules.chat.models.ChatMessageVo;
var battle;
(function (battle) {
    var action;
    (function (action) {
        var ai;
        (function (ai) {
            var AiAction = /** @class */ (function (_super) {
                __extends(AiAction, _super);
                function AiAction() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                AiAction.prototype.onInit = function (actionMoment, actionFighterId, actionId) {
                    _super.prototype.onInit.call(this);
                    this.actionMoment = actionMoment;
                    this.actionFighterId = actionFighterId;
                    this.actionId = actionId;
                    //const GameTable::battle::CBattleAIConfig& BattleAI = GameTable::battle::GetCBattleAIConfigTableInstance().getRecorder(pAction->AIActionID);
                };
                AiAction.prototype.onStart = function () {
                    this.dealAiAction();
                };
                AiAction.prototype.sendChatMessage = function (battleAI, battler, message, messagetype) {
                    var chatMessageVo = new ChatMessageVo;
                    chatMessageVo.shapeid = battler.shape;
                    chatMessageVo.roleid = battler.dataID;
                    chatMessageVo.rolename = battler.fighterName;
                    chatMessageVo.titleid = battler.titleId;
                    chatMessageVo.messagetype = messagetype;
                    chatMessageVo.message = message;
                    ChatModel._instance.insertChatMessage(chatMessageVo);
                };
                AiAction.prototype.dealAiAction = function () {
                    var battleAI = this.battle.battleProxy.BattleAIConfigData[this.actionId];
                    var battler = this.battle.findRoleByIndex(this.actionFighterId);
                    if (battleAI.id != -1) {
                        //说话信息
                        if (battleAI.talkinfo != "" && battler) {
                            var talkstr;
                            // 查看是否是富文本
                            if (battleAI.talkinfo.search("<T") > 0) {
                                var stream = "<span style='color:#693F00;fontSize:24'>" + battleAI.talkinfo + "</span>";
                                this.battle.showTips(stream);
                            }
                            else {
                                talkstr = battleAI.talkinfo;
                                this.battle.showTips(talkstr);
                                // pAIExecutor -> AddTalk(BattleAI.talkinfo, false);
                            }
                        }
                        // 聊天频道发消息
                        if (battleAI.talkshow != 0)
                            this.sendChatMessage(battleAI, battler, battleAI.talkinfo, ChannelType.CHANNEL_TEAM);
                        if (battleAI.tipsinfo != "") //提示框信息
                            this.battle.showTips(battleAI.tipsinfo);
                        if (battleAI.appearchange != 0 && battler) //换造型
                         {
                            battler.shape = battleAI.appearchange;
                            this.battle._scene.removeFakeUint(battler.fakeUnit);
                            this.battle._scene.createFakeUnit(battler);
                        }
                        // TODO 改变战场地图
                        if (battleAI.changeground != 0) {
                            // GetBattleManager() -> ChangeBattleGround(BattleAI.changeground);
                        }
                        if (battleAI.playsound != 0)
                            this.battle.playBattleGroundMusic(battleAI.playsound);
                        if (battleAI.playeffect != "" && battler)
                            this.battle.scene.showFrameEffect(battler.fakeUnit, battleAI.playeffect, []);
                        if (battleAI.speak != "" && battler) {
                            var speak;
                            var mID = battler.shape;
                            if (1010101 <= mID && mID <= 1010110) {
                                var sexfile = battleAI.speak;
                                var sex = mID % 2;
                                // TODO 这段根据性别替换字符
                                if (sex == 1)
                                    sexfile = sexfile.replace(".", "m.");
                                else if (sex == 0)
                                    sexfile = sexfile.replace(".", "w.");
                                this.battle.PlayAISpeak(sexfile, battler);
                                speak = sexfile;
                            }
                            else {
                                speak = battleAI.speak;
                                this.battle.PlayAISpeak(speak, battler);
                            }
                            if (battleAI.speakshow != 0) {
                                if (battler) {
                                    var talkstr;
                                    if (battleAI.talkinfo.search("<T") > 0)
                                        talkstr = "<span style='color:#693F00;fontSize:24'>" + battleAI.talkinfo + "</span>";
                                    else
                                        talkstr = battleAI.talkinfo;
                                    var stime = battleAI.speaktime;
                                    if (stime == "")
                                        stime = "5";
                                    // 组装聊天
                                    var sinfo = "file=\"" + speak + "\" text=\"" + talkstr + "&\" time=" + stime;
                                    this.sendChatMessage(battleAI, battler, sinfo, battleAI.speakshow);
                                    this.sendChatMessage(battleAI, battler, talkstr, battleAI.speakshow);
                                }
                            }
                        }
                    }
                };
                return AiAction;
            }(battle.ActionMgr));
            ai.AiAction = AiAction;
            var DieAiAction = /** @class */ (function (_super) {
                __extends(DieAiAction, _super);
                function DieAiAction() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                DieAiAction.prototype.onInit = function (actionMoment, actionFighterId, actionId) {
                    _super.prototype.onInit.call(this, actionMoment, actionFighterId, actionId);
                    battle.NotifyMgr.register(7 /* FighterDie */, this, this.onDieNotify);
                };
                DieAiAction.prototype.onStart = function () {
                };
                DieAiAction.prototype.onDestroy = function () {
                    battle.NotifyMgr.clean(this);
                    _super.prototype.onDestroy.call(this);
                };
                DieAiAction.prototype.onDieNotify = function (id) {
                    if (this.is_die) {
                        return;
                    }
                    if (this.actionMoment === id) {
                        this.is_die = true;
                        this.dealAiAction();
                    }
                };
                DieAiAction.prototype.isEnd = function () {
                    return this.is_die && _super.prototype.isEnd.call(this);
                };
                return DieAiAction;
            }(AiAction));
            ai.DieAiAction = DieAiAction;
        })(ai = action.ai || (action.ai = {}));
    })(action = battle.action || (battle.action = {}));
})(battle || (battle = {}));
//# sourceMappingURL=AiAction.js.map