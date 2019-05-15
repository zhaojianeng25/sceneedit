/** 下战书所选择的类型 */
var LiveDeadSelectType;
(function (LiveDeadSelectType) {
    /** 单人 */
    LiveDeadSelectType[LiveDeadSelectType["OnePerson"] = 0] = "OnePerson";
    /** 组队 */
    LiveDeadSelectType[LiveDeadSelectType["MultiplePerson"] = 1] = "MultiplePerson";
})(LiveDeadSelectType || (LiveDeadSelectType = {}));
/** 生死决斗榜类型 */
var LDmodelType;
(function (LDmodelType) {
    /** 本日生死战排行 */
    LDmodelType[LDmodelType["DAY_FIGHT"] = 1] = "DAY_FIGHT";
    /** 本周生死战排行 */
    LDmodelType[LDmodelType["WEEK_FIGHT"] = 2] = "WEEK_FIGHT";
    /** 历史生死战排行 */
    LDmodelType[LDmodelType["HIS_FIGHT"] = 3] = "HIS_FIGHT";
    /** 自己 */
    LDmodelType[LDmodelType["SELF_FIGHT"] = 4] = "SELF_FIGHT";
})(LDmodelType || (LDmodelType = {}));
/** 生死斗的结果 */
var LDBattleResult;
(function (LDBattleResult) {
    /** 胜利 */
    LDBattleResult[LDBattleResult["victory"] = 1] = "victory";
    /** 失败 */
    LDBattleResult[LDBattleResult["failure"] = -1] = "failure";
    /** 平局 */
    LDBattleResult[LDBattleResult["draw"] = 0] = "draw";
})(LDBattleResult || (LDBattleResult = {}));
/** 是否可以点赞 */
var RoseFlag;
(function (RoseFlag) {
    /** 可以 */
    RoseFlag[RoseFlag["can"] = 0] = "can";
    /** 不可以 */
    RoseFlag[RoseFlag["no"] = 1] = "no";
})(RoseFlag || (RoseFlag = {}));
/** 是否接受生死战 */
var isAccept;
(function (isAccept) {
    /** 拒绝 */
    isAccept[isAccept["refuse"] = 0] = "refuse";
    /** 确认接受 */
    isAccept[isAccept["confirm"] = 1] = "confirm";
})(isAccept || (isAccept = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var aliveordead;
        (function (aliveordead) {
            var models;
            (function (models) {
                /** 战仙会（生死战）数据存放 model */
                var AliveOrDeadModel = /** @class */ (function () {
                    function AliveOrDeadModel() {
                        AliveOrDeadModel._instance = this;
                    }
                    AliveOrDeadModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new AliveOrDeadModel();
                        }
                        return this._instance;
                    };
                    return AliveOrDeadModel;
                }());
                models.AliveOrDeadModel = AliveOrDeadModel;
            })(models = aliveordead.models || (aliveordead.models = {}));
        })(aliveordead = modules.aliveordead || (modules.aliveordead = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=AliveOrDeadModel.js.map