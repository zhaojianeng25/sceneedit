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
 * 重新设置道具安全锁界面
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var setBasics;
        (function (setBasics) {
            var ResetItemLockMediator = /** @class */ (function (_super) {
                __extends(ResetItemLockMediator, _super);
                function ResetItemLockMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.ResetItemLockPasswordUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                ResetItemLockMediator.prototype.show = function () {
                    this._initUI();
                    this.registerEvent();
                    _super.prototype.show.call(this);
                };
                ////////////////
                ///事件
                ////////////////
                /**注册事件
                 * @describe  UI的事件监听注册
                 */
                ResetItemLockMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.CLICK, this, this.goBack);
                    this._viewUI.oldPassword_textinput.on(LEvent.CLICK, this, this.controlOldInput);
                    this._viewUI.newPassword_textinput.on(LEvent.CLICK, this, this.controlNewInput);
                    this._viewUI.newPassword2_textinput.on(LEvent.CLICK, this, this.controlNewInput2);
                    this._viewUI.confirmReset_btn.on(LEvent.CLICK, this, this.confirmReset);
                    //消息监听
                    modules.chat.models.ChatProxy.getInstance().on(modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, this, this.show_Msg);
                    setBasics.models.SetBasicsProxy.getInstance().on(setBasics.models.RESET_PASSWORD_SUCCESS_EVENT, this, this.show_resetSuccessUI);
                };
                /**
                 * 重置密码成功后界面
                 */
                ResetItemLockMediator.prototype.show_resetSuccessUI = function () {
                    this._setItemLockSuccessMediator = new setBasics.SetItemLockSuccessMediator(this._app);
                    this._setItemLockSuccessMediator.onShow(this.reset_pd);
                    this.hide();
                };
                /**
                 * 消息弹窗
                 * @describe 接受服务器下发回来的消息，弹出消息气泡
                 */
                ResetItemLockMediator.prototype.show_Msg = function (msg) {
                    this._disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                    this._disappearMessageTipsMediator.onShow(msg);
                };
                /**
                 * 确认重置密码
                 */
                ResetItemLockMediator.prototype.confirmReset = function () {
                    this.old_pd = this._viewUI.oldPassword_textinput.text;
                    this.reset_pd = this._viewUI.newPassword_textinput.text;
                    this.reset_repeatpd = this._viewUI.newPassword2_textinput.text;
                    RequesterProtocols._instance.c2s_CResetPassword(this.old_pd, this.reset_pd, this.reset_repeatpd);
                    this.hide();
                };
                ResetItemLockMediator.prototype.controlNewInput2 = function () {
                };
                ResetItemLockMediator.prototype.controlNewInput = function () {
                };
                ResetItemLockMediator.prototype.controlOldInput = function () {
                };
                ResetItemLockMediator.prototype._initUI = function () {
                };
                ResetItemLockMediator.prototype.goBack = function () {
                    this.hide();
                    this._itemLockMediator = new setBasics.ItemLockMediator(this._app);
                    this._itemLockMediator.show();
                };
                ResetItemLockMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.removeEvent();
                };
                /**
                 * 移除事件
                 */
                ResetItemLockMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.CLICK, this, this.hide);
                    this._viewUI.oldPassword_textinput.on(LEvent.CLICK, this, this.controlOldInput);
                    this._viewUI.newPassword_textinput.off(LEvent.CLICK, this, this.controlNewInput);
                    this._viewUI.newPassword2_textinput.off(LEvent.CLICK, this, this.controlNewInput2);
                    this._viewUI.confirmReset_btn.off(LEvent.CLICK, this, this.confirmReset);
                    modules.chat.models.ChatProxy.getInstance().off(modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, this, this.show_Msg);
                    setBasics.models.SetBasicsProxy.getInstance().off(setBasics.models.RESET_PASSWORD_SUCCESS_EVENT, this, this.show_resetSuccessUI);
                };
                ResetItemLockMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ResetItemLockMediator;
            }(game.modules.UiMediator));
            setBasics.ResetItemLockMediator = ResetItemLockMediator;
        })(setBasics = modules.setBasics || (modules.setBasics = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ResetItemLockMediator.js.map