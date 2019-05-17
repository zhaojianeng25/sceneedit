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
* 弹劾会长
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var FamilyImpeachmentViewMediator = /** @class */ (function (_super) {
                __extends(FamilyImpeachmentViewMediator, _super);
                function FamilyImpeachmentViewMediator(app) {
                    var _this = _super.call(this) || this;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.FamilyTanHeUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.closeThisView);
                    _this._viewUI.faqitanhe_btn.on(LEvent.MOUSE_DOWN, _this, _this.impeachment);
                    family.models.FamilyProxy._instance.on(family.models.SRequestImpeachMentView, _this, _this.showImpeachView);
                    game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.TIPS_ON_OK, _this, _this.okTips);
                    return _this;
                }
                /**弹劾界面 */
                FamilyImpeachmentViewMediator.prototype.showImpeachView = function (RequestImpeachMent) {
                    var maxnum = RequestImpeachMent.get("maxnum");
                    var rulehtml = this.cstringResConfigData[11608].msg;
                    var m_rulehtml = rulehtml.replace("$parameter1$", maxnum);
                    this._viewUI.rule_html.innerHTML = m_rulehtml;
                    var tishiHtml = this.cstringResConfigData[11609].msg;
                    this._viewUI.tishi_html.innerHTML = tishiHtml;
                };
                /**弹劾 */
                FamilyImpeachmentViewMediator.prototype.impeachment = function () {
                    var param = new Dictionary();
                    param.set("contentId", 172049);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, param);
                };
                /**关闭当前界面 */
                FamilyImpeachmentViewMediator.prototype.closeThisView = function () {
                    this.hide();
                    modules.ModuleManager.show(modules.ModuleNames.haveFamily, this._app);
                };
                /**
                 * 请求弹劾
                 * @param cmdtype 0请求弹劾界面   1发起弹劾   2响应弹劾
                 */
                FamilyImpeachmentViewMediator.prototype.CRequestImpeachMentView = function (cmdtype) {
                    RequesterProtocols._instance.c2s_CRequestImpeachMentView(cmdtype);
                };
                /**移除弹劾tips监听 */
                FamilyImpeachmentViewMediator.prototype.offEvent = function () {
                    game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_OK, this, this.okTips);
                };
                /**确定弹劾 */
                FamilyImpeachmentViewMediator.prototype.okTips = function () {
                    this.CRequestImpeachMentView(Cmdtype.requestImp);
                };
                FamilyImpeachmentViewMediator.prototype.show = function () {
                    this.CRequestImpeachMentView(Cmdtype.requestView);
                    _super.prototype.show.call(this);
                };
                FamilyImpeachmentViewMediator.prototype.hide = function () {
                    this.offEvent();
                    _super.prototype.hide.call(this);
                };
                FamilyImpeachmentViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilyImpeachmentViewMediator;
            }(game.modules.ModuleMediator));
            family.FamilyImpeachmentViewMediator = FamilyImpeachmentViewMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyImpeachmentViewMediator.js.map