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
/** 天机仙令 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var tianjixianling;
        (function (tianjixianling) {
            /** 天机仙令moudle*/
            var TianJiXianLingModule = /** @class */ (function (_super) {
                __extends(TianJiXianLingModule, _super);
                function TianJiXianLingModule(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.TianXianJiLingUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._tianJiXianLingMediator = new tianjixianling.TianJiXianLingMediator(_this._app);
                    return _this;
                }
                TianJiXianLingModule.prototype.onShow = function (event) {
                    this.checkRounds();
                    this._app.uiRoot.closeLoadProgress();
                };
                /**
                 * 检查轮数
                 */
                TianJiXianLingModule.prototype.checkRounds = function () {
                    /** 首次参加天机仙令的时间 */
                    var _jointime = tianjixianling.models.TianJiXianLingModel._instance.tjxlInfoData.jointime;
                    if (!_jointime) {
                        var inTeamGroup = HudModel.getInstance().chargeInGroup();
                        if (!inTeamGroup) //未处于组队
                         {
                            /** 天机仙令使者所在的地图 */
                            var _mapId = modules.mainhud.models.HudModel.getInstance().cNPCConfigData[19030]["mapid"];
                            game.modules.mainhud.models.HudModel.getInstance().useapp = this._app;
                            game.modules.mainhud.models.HudModel.getInstance().useapp.sceneRoot.istask = 2;
                            //到天机仙令使者请求参加天机仙令任务
                            game.modules.mainhud.models.HudModel.getInstance().jumpmap(_mapId, 19030);
                        }
                        else if (inTeamGroup)
                            this.showDisappTips(PromptExplain.IN_TEAM_GROUP);
                    }
                    else {
                        this._tianJiXianLingMediator.show();
                        tianjixianling.models.TianJiXianLingProxy.getInstance().event(tianjixianling.models.ALREADY_JOIN_TJXL);
                    }
                };
                /** 弹窗飘字提示
                 * @param id 提示语句id
                 */
                TianJiXianLingModule.prototype.showDisappTips = function (id) {
                    var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[id];
                    var tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    tips.onShow(chattext.msg);
                };
                TianJiXianLingModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                TianJiXianLingModule.prototype.getView = function () {
                    return this._viewUI;
                };
                return TianJiXianLingModule;
            }(game.modules.ModuleMediator));
            tianjixianling.TianJiXianLingModule = TianJiXianLingModule;
        })(tianjixianling = modules.tianjixianling || (modules.tianjixianling = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TianJiXianLingModule.js.map