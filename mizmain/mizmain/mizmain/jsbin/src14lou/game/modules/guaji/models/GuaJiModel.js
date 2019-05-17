/**
 * 是否自动战斗
 */
var IsAutoFight;
(function (IsAutoFight) {
    /** 否 */
    IsAutoFight[IsAutoFight["NO"] = 0] = "NO";
    /** 是 */
    IsAutoFight[IsAutoFight["YES"] = 1] = "YES";
})(IsAutoFight || (IsAutoFight = {}));
;
/**
 * 是否选中智能设置中选项
 */
var isSelect;
(function (isSelect) {
    /** 否 */
    isSelect[isSelect["NO"] = 0] = "NO";
    /** 是 */
    isSelect[isSelect["YES"] = 1] = "YES";
})(isSelect || (isSelect = {}));
;
/**
 * 挂机设置操作类型
 */
var GuaJiOpeType;
(function (GuaJiOpeType) {
    /** 普通攻击 */
    GuaJiOpeType[GuaJiOpeType["ATTACK"] = 1] = "ATTACK";
    /** 施放技能 */
    GuaJiOpeType[GuaJiOpeType["FIRESKILL"] = 2] = "FIRESKILL";
    /** 防御 */
    GuaJiOpeType[GuaJiOpeType["DEFENSE"] = 4] = "DEFENSE";
})(GuaJiOpeType || (GuaJiOpeType = {}));
;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var guaji;
        (function (guaji) {
            var models;
            (function (models) {
                /** 挂机系统的model */
                var GuaJiModel = /** @class */ (function () {
                    function GuaJiModel() {
                        /** 练功区怪物表（挂机区域怪物表） */
                        this.monstersDic = {};
                        /** 挂机设置配置表 */
                        this.roleFightAIDic = {};
                        /** 死亡提醒表 */
                        this.deatNote = {};
                        /** 挂机系统宠物技能选择窗口是否改变过 */
                        this.isChangeFlag = false;
                        /** 自动辅助挂机 */
                        this.fuzhuGuaji = false;
                        GuaJiModel._instance = this;
                    }
                    GuaJiModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new GuaJiModel();
                        }
                        return this._instance;
                    };
                    GuaJiModel.clearModelData = function () {
                        guaji.models.GuaJiModel._instance.autoFightData = [];
                        guaji.models.GuaJiModel._instance.hookBattleData = new models.HookBattleDataVo();
                        guaji.models.GuaJiModel._instance.isChangeFlag = false;
                        guaji.models.GuaJiModel._instance.fuzhuGuaji = false;
                    };
                    return GuaJiModel;
                }());
                models.GuaJiModel = GuaJiModel;
            })(models = guaji.models || (guaji.models = {}));
        })(guaji = modules.guaji || (modules.guaji = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=GuaJiModel.js.map