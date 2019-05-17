/** 成就前往逻辑 */
var AchieventGoLogic;
(function (AchieventGoLogic) {
    /** 打开界面 */
    AchieventGoLogic[AchieventGoLogic["OPEN_INTERFACE"] = 1] = "OPEN_INTERFACE";
    /** 找NPC */
    AchieventGoLogic[AchieventGoLogic["FIND_NPC"] = 2] = "FIND_NPC";
    /** 继续主线任务（根据主线不同变化） */
    AchieventGoLogic[AchieventGoLogic["CONTAIN_MAIN_TASK"] = 3] = "CONTAIN_MAIN_TASK";
    /** 找师傅NPC（不同职业不同NPC） */
    AchieventGoLogic[AchieventGoLogic["FIND_NPC_MASTER"] = 4] = "FIND_NPC_MASTER";
    /** 帮会。判断是否加入帮会？  是，打开帮会聊天频道  否，打开申请帮会界面*/
    AchieventGoLogic[AchieventGoLogic["FAMILY_EVENT"] = 5] = "FAMILY_EVENT";
    /** 领取任务 */
    AchieventGoLogic[AchieventGoLogic["GET_REWARD"] = 6] = "GET_REWARD";
})(AchieventGoLogic || (AchieventGoLogic = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var achievent;
        (function (achievent) {
            var models;
            (function (models) {
                var AchieventModel = /** @class */ (function () {
                    function AchieventModel() {
                        /** 成就指引等级标签 */
                        this.guideCourseLabelDic = {};
                        this.guideCourseDic = {};
                        this.AchieventInfo = [];
                        /** 师傅职业Npc配置表 */
                        this.MasterNpcDic = {};
                        /**成就map */
                        this.achieventDic = new Laya.Dictionary();
                        AchieventModel._instance = this;
                    }
                    AchieventModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new AchieventModel();
                        }
                        return this._instance;
                    };
                    AchieventModel.clearModelData = function () {
                        achievent.models.AchieventModel._instance.userLoginAccount = "";
                        achievent.models.AchieventModel._instance.AchieventInfo = [];
                        achievent.models.AchieventModel._instance.achieventDic = new Laya.Dictionary();
                    };
                    return AchieventModel;
                }());
                models.AchieventModel = AchieventModel;
            })(models = achievent.models || (achievent.models = {}));
        })(achievent = modules.achievent || (modules.achievent = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=AchieventModel.js.map