/**
* LJM
*/
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
var game;
(function (game) {
    var modules;
    (function (modules) {
        var achievent;
        (function (achievent) {
            var AchieventModule = /** @class */ (function (_super) {
                __extends(AchieventModule, _super);
                function AchieventModule(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.AchievementUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    //this.isCenter = true;
                    _this._achieventMediator = new achievent.AchieventMediator(_this._viewUI, app);
                    console.log("成就Module.....初始化");
                    Network._instance.addHanlder(ProtocolsEnum.SGetArchiveInfo, _this, _this.onOpArchi);
                    return _this;
                }
                AchieventModule.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this._achieventMediator.show();
                };
                AchieventModule.prototype.onShow = function (event) {
                    this.show();
                };
                AchieventModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                AchieventModule.prototype.getView = function () {
                    return this._viewUI;
                };
                /** 同步数据刷新 */
                AchieventModule.prototype.onOpArchi = function (optcode, msg) {
                    console.log("AchieventModule--监听到服务端下发的成就数据...开始刷新数据...");
                    if (msg.archiveinfos.length == 0)
                        return;
                    this._achieventMediator.refreshData();
                };
                return AchieventModule;
            }(game.modules.ModuleMediator));
            achievent.AchieventModule = AchieventModule;
        })(achievent = modules.achievent || (modules.achievent = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=AchieventModule.js.map