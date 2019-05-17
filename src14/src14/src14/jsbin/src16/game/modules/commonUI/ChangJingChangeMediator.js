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
/**
* 过图场景 界面
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var ChangJingChangeMediator = /** @class */ (function (_super) {
                __extends(ChangJingChangeMediator, _super);
                function ChangJingChangeMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.component.ChangJingChangeUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                ChangJingChangeMediator.prototype.onShow = function (flag) {
                    this.flag = flag;
                    this.show();
                };
                ChangJingChangeMediator.prototype.show = function () {
                    if (this.flag) {
                        this._viewUI.bg_img.skin = "common/ui/load/LoginBg.png";
                    }
                    else {
                        this._viewUI.bg_img.skin = "common/ui/tongyong/qiehuan.png";
                    }
                    _super.prototype.show.call(this);
                    this._viewUI.con_progre.value = 0;
                    Laya.timer.loop(140, this, this.progress);
                };
                ChangJingChangeMediator.prototype.progress = function () {
                    this._viewUI.con_progre.value += 0.1;
                    if (this._viewUI.con_progre.value >= 1) {
                        Laya.timer.clear(this, this.progress);
                        this.hide();
                        game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CHNANGJING_PRO);
                    }
                };
                ChangJingChangeMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    // if(!game.modules.createrole.models.LoginModel.getInstance().isMainInit)game.modules.createrole.models.LoginProxy.getInstance().event(game.modules.createrole.models.SHOW_MAIN);
                };
                ChangJingChangeMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ChangJingChangeMediator;
            }(game.modules.UiMediator));
            commonUI.ChangJingChangeMediator = ChangJingChangeMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ChangJingChangeMediator.js.map