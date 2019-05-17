/**
* name z主任务配置
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var MissionCMainMissionInfoBaseVo = /** @class */ (function () {
                function MissionCMainMissionInfoBaseVo() {
                    this.RequestRoleIDList = new Array();
                    this.PostMissionList = new Array();
                    this.RewardItemIDList = new Array();
                    this.RewardItemNumList = new Array();
                    this.RewardItemShapeIDList = new Array();
                    this.RewardItemIsBindList = new Array();
                    this.QuestionInfoWrongAnswerList = new Array();
                    this.BattleInfoMonsterList = new Array();
                    this.ScenarioInfoNpcConversationList = new Array();
                    this.ScenarioInfoNpcID = new Array();
                    this.ScenarioInfoFinishConversationList = new Array();
                    this.ScenarioInfoFinishNpcID = new Array();
                    this.vTaskShowNpc = new Array();
                    this.BiaoQingA = new Array();
                    this.BiaoQingB = new Array();
                    this.vNpcChatSound = new Array();
                    this.vNpcChatSoundFinish = new Array();
                }
                MissionCMainMissionInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.AutoDo = data.getUint32();
                    this.MissionName = data.getUTFBytes(data.getUint32());
                    this.MissionTypeString = data.getUTFBytes(data.getUint32());
                    this.MinLevel = data.getUint32();
                    this.MaxLevel = data.getUint32();
                    this.CruiseId = data.getUint32();
                    this.TransMinLevel = data.getUint32();
                    this.TransMaxLevel = data.getUint32();
                    var listCount1 = data.getUint32();
                    for (var index = 0; index < listCount1; index++) {
                        this.RequestRoleIDList.push(data.getFloat64());
                    }
                    var listCount2 = data.getUint32();
                    for (var index = 0; index < listCount2; index++) {
                        this.PostMissionList.push(data.getUint32());
                    }
                    this.TransformID = data.getUint32();
                    this.FollowID = data.getUint32();
                    this.NoteInfo = data.getUTFBytes(data.getUint32());
                    this.ExpReward = data.getFloat64();
                    this.MoneyReward = data.getFloat64();
                    this.PetExpReward = data.getFloat64();
                    this.ShengWang = data.getUint32();
                    this.SMoney = data.getFloat64();
                    this.RewardMapJumpType = data.getUint32();
                    this.RewardMapID = data.getUint32();
                    this.RewardMapXPos = data.getUint32();
                    this.RewardMapYPos = data.getUint32();
                    this.ProcessBarTime = data.getUint32();
                    this.ProcessBarText = data.getUTFBytes(data.getUint32());
                    this.ProcessBarColor = data.getUTFBytes(data.getUint32());
                    this.RewardType = data.getUint32();
                    this.RewardOption = data.getUint32();
                    var listCount3 = data.getUint32();
                    for (var index = 0; index < listCount3; index++) {
                        this.RewardItemIDList.push(data.getUint32());
                    }
                    var listCount4 = data.getUint32();
                    for (var index = 0; index < listCount4; index++) {
                        this.RewardItemNumList.push(data.getUint32());
                    }
                    var listCount5 = data.getUint32();
                    for (var index = 0; index < listCount5; index++) {
                        this.RewardItemShapeIDList.push(data.getUint32());
                    }
                    var listCount6 = data.getUint32();
                    for (var index = 0; index < listCount6; index++) {
                        this.RewardItemIsBindList.push(data.getUint32());
                    }
                    this.MissionType = data.getUint32();
                    this.ActiveInfoNpcID = data.getUint32();
                    this.ActiveInfoMapID = data.getUint32();
                    this.ActiveInfoLeftPos = data.getUint32();
                    this.ActiveInfoTopPos = data.getUint32();
                    this.ActiveInfoRightPos = data.getUint32();
                    this.ActiveInfoBottomPos = data.getUint32();
                    this.ActiveInfoTargetID = data.getUint32();
                    this.ActiveInfoTargetNum = data.getUint32();
                    this.ActiveInfoMiniStep = data.getUint32();
                    this.ActiveInfoStepProbability = data.getUint32();
                    this.ActiveInfoMaxStep = data.getUint32();
                    this.ActiveInfoTeamState = data.getUint32();
                    this.ActiveInfoTimeLimit = data.getUint32();
                    this.ActiveInfoIsRestartTimer = data.getUint32();
                    this.ActiveInfoGiveBackMoney = data.getFloat64();
                    this.ActiveInfoGiveBackPetID = data.getUint32();
                    this.ActiveInfoUseItemID = data.getUTFBytes(data.getUint32());
                    this.ActiveInfoOtherType = data.getUint32();
                    this.QuestionInfoCorrectAnswer = data.getUTFBytes(data.getUint32());
                    var listCount7 = data.getUint32();
                    for (var index = 0; index < listCount7; index++) {
                        this.QuestionInfoWrongAnswerList.push(data.getUTFBytes(data.getUint32()));
                    }
                    this.QuestionInfoNpcID = data.getUint32();
                    this.QuestionInfoConversion = data.getUTFBytes(data.getUint32());
                    this.TaskInfoDescriptionListA = data.getUTFBytes(data.getUint32());
                    this.TaskInfoPurposeListA = data.getUTFBytes(data.getUint32());
                    this.TaskInfoTraceListA = data.getUTFBytes(data.getUint32());
                    this.AIInfoAIID = data.getUint32();
                    this.AIInfoBattleResult = data.getUint32();
                    this.AIInfoDeathPunish = data.getUint32();
                    this.AIInfoTeamSteate = data.getUint32();
                    this.AIInfoBattleLevel = data.getUTFBytes(data.getUint32());
                    this.BattleInfoBattleMapType = data.getUint32();
                    this.BattleInfoBattleZoneID = data.getUint32();
                    this.BattleInfoDrop = data.getUint32();
                    this.BattleInfoBattleTimes = data.getUint32();
                    var listCount8 = data.getUint32();
                    for (var index = 0; index < listCount8; index++) {
                        this.BattleInfoMonsterList.push(data.getUint32());
                    }
                    this.BattleInfoMonsterNum = data.getUint32();
                    this.BattleInfoDropItemID = data.getUint32();
                    this.BattleInfoDropItemNum = data.getUint32();
                    this.ScenarioInfoAnimationID = data.getUint32();
                    this.ScenarioInfoBranchNpcID = data.getUint32();
                    this.ScenarioInfoBranchNote = data.getUTFBytes(data.getUint32());
                    var listCount9 = data.getUint32();
                    for (var index = 0; index < listCount9; index++) {
                        this.ScenarioInfoNpcConversationList.push(data.getUTFBytes(data.getUint32()));
                    }
                    var listCount10 = data.getUint32();
                    for (var index = 0; index < listCount10; index++) {
                        this.ScenarioInfoNpcID.push(data.getUint32());
                    }
                    var listCount11 = data.getUint32();
                    for (var index = 0; index < listCount11; index++) {
                        this.ScenarioInfoFinishConversationList.push(data.getUTFBytes(data.getUint32()));
                    }
                    var listCount12 = data.getUint32();
                    for (var index = 0; index < listCount12; index++) {
                        this.ScenarioInfoFinishNpcID.push(data.getUint32());
                    }
                    var listCount13 = data.getUint32();
                    for (var index = 0; index < listCount13; index++) {
                        this.vTaskShowNpc.push(data.getUint32());
                    }
                    var listCount14 = data.getUint32();
                    for (var index = 0; index < listCount14; index++) {
                        this.BiaoQingA.push(data.getUTFBytes(data.getUint32()));
                    }
                    var listCount15 = data.getUint32();
                    for (var index = 0; index < listCount15; index++) {
                        this.BiaoQingB.push(data.getUTFBytes(data.getUint32()));
                    }
                    this.ProcessBarTeXiao = data.getUint32();
                    this.UnionSeekHelp = data.getUint32();
                    this.WorldSeekHelp = data.getUint32();
                    this.nopuitype = data.getUint32();
                    this.nuiid = data.getUint32();
                    var listCount16 = data.getUint32();
                    for (var index = 0; index < listCount16; index++) {
                        this.vNpcChatSound.push(data.getUTFBytes(data.getUint32()));
                    }
                    var listCount17 = data.getUint32();
                    for (var index = 0; index < listCount17; index++) {
                        this.vNpcChatSoundFinish.push(data.getUTFBytes(data.getUint32()));
                    }
                    this.BattlePreString = data.getUTFBytes(data.getUint32());
                    this.BattleVideo = data.getUint32();
                    this.Tipsid = data.getUint32();
                };
                return MissionCMainMissionInfoBaseVo;
            }());
            template.MissionCMainMissionInfoBaseVo = MissionCMainMissionInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=MissionCMainMissionInfoBaseVo.js.map