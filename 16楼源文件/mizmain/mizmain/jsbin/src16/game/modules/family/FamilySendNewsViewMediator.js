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
* 群发消息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var FamilySendNewsViewMediator = /** @class */ (function (_super) {
                __extends(FamilySendNewsViewMediator, _super);
                function FamilySendNewsViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    _this._viewUI = new ui.common.FamilyQunFaInfoUI();
                    _this._app = app;
                    _this.isCenter = false;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this._viewUI.fasong_btn.on(LEvent.MOUSE_DOWN, _this, _this.sendNews);
                    return _this;
                }
                /**发送消息 */
                FamilySendNewsViewMediator.prototype.sendNews = function () {
                    var message = this._viewUI.text_input.text;
                    if (message != "") {
                        this.CClanMessage(message);
                        this.hide();
                    }
                    else {
                        this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        this.DisappearMessageTipsMediator.onShow(this.cstringResConfigData[11531].msg);
                    }
                };
                /**
                 * 发布公会群消息
                 * @param message
                 */
                FamilySendNewsViewMediator.prototype.CClanMessage = function (message) {
                    RequesterProtocols._instance.c2s_CClanMessage(message);
                };
                FamilySendNewsViewMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                FamilySendNewsViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                FamilySendNewsViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilySendNewsViewMediator;
            }(game.modules.UiMediator));
            family.FamilySendNewsViewMediator = FamilySendNewsViewMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilySendNewsViewMediator.js.map