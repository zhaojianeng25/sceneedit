var game;
(function (game) {
    var modules;
    (function (modules) {
        var xianhui;
        (function (xianhui) {
            var models;
            (function (models) {
                var XianHuiModel = /** @class */ (function () {
                    function XianHuiModel() {
                        /** 3v3证道战战况 */
                        this.PvP3BattleInfos = new Laya.Dictionary;
                        /** 3v3证道战排行 */
                        this.PvP3Ranking = new Laya.Dictionary;
                        /** 3v3证道战战况 */
                        this.PvP5BattleInfos = new Laya.Dictionary;
                        /** 5v5证道战排行 */
                        this.roleScores1 = [];
                        this.roleScores2 = [];
                        XianHuiModel._instance = this;
                    }
                    XianHuiModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new XianHuiModel();
                        }
                        return this._instance;
                    };
                    XianHuiModel.clearModelData = function () {
                        xianhui.models.XianHuiModel._instance.PvP3MyInfo = null;
                        xianhui.models.XianHuiModel._instance.PvP3BattleInfos = new Laya.Dictionary;
                        xianhui.models.XianHuiModel._instance.PvP3Ranking = new Laya.Dictionary;
                        xianhui.models.XianHuiModel._instance.history = 0;
                        xianhui.models.XianHuiModel._instance._serviceid = 0;
                        xianhui.models.XianHuiModel._instance.PvP5MyInfo = null;
                        xianhui.models.XianHuiModel._instance.PvP5BattleInfos = new Laya.Dictionary;
                        xianhui.models.XianHuiModel._instance.roleScores1 = [];
                        xianhui.models.XianHuiModel._instance.roleScores2 = [];
                        xianhui.models.XianHuiModel._instance.myScore = null;
                    };
                    return XianHuiModel;
                }());
                models.XianHuiModel = XianHuiModel;
            })(models = xianhui.models || (xianhui.models = {}));
        })(xianhui = modules.xianhui || (modules.xianhui = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=XianHuiModel.js.map