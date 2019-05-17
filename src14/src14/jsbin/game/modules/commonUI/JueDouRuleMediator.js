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
        var commonUI;
        (function (commonUI) {
            /** 战仙会（生死斗）的决斗规则 */
            var JueDouRuleMediator = /** @class */ (function (_super) {
                __extends(JueDouRuleMediator, _super);
                function JueDouRuleMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.ChallengeRuleUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                JueDouRuleMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this._viewUI.close_btn.once(LEvent.MOUSE_DOWN, this, this.hide);
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                JueDouRuleMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                JueDouRuleMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return JueDouRuleMediator;
            }(game.modules.UiMediator));
            commonUI.JueDouRuleMediator = JueDouRuleMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=JueDouRuleMediator.js.map