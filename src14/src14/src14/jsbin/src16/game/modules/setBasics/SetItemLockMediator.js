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
 * 输入道具安全锁密码界面
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var setBasics;
        (function (setBasics) {
            var SetItemLockMediator = /** @class */ (function (_super) {
                __extends(SetItemLockMediator, _super);
                function SetItemLockMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.SetItemLockPasswordUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                SetItemLockMediator.prototype.show = function () {
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
                SetItemLockMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.CLICK, this, this.goBack);
                    this._viewUI.confirm_btn.on(LEvent.CLICK, this, this.confirmSet);
                    this._viewUI.password_textinput.on(LEvent.CLICK, this, this.controlInput);
                    this._viewUI.password2_textinput.on(LEvent.CLICK, this, this.controlInput2);
                    //消息事件监听
                    modules.chat.models.ChatProxy.getInstance().on(modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, this, this.show_Msg);
                    setBasics.models.SetBasicsProxy.getInstance().on(setBasics.models.SET_PASSWORD_SUCCESS_EVENT, this, this.show_successUI);
                };
                /**
                 * 设置密码成功后的界面
                 * @describe
                 */
                SetItemLockMediator.prototype.show_successUI = function () {
                    this._setItemLockSuccessMediator = new setBasics.SetItemLockSuccessMediator(this._app);
                    this._setItemLockSuccessMediator.onShow(this.password);
                    this.hide();
                };
                /**
                 * 消息弹窗
                 * @describe 接受服务器下发回来的消息，弹出消息气泡
                 */
                SetItemLockMediator.prototype.show_Msg = function (msg) {
                    this._disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                    this._disappearMessageTipsMediator.onShow(msg);
                };
                /**
                 * 控制输入密码
                 * @describe
                 */
                SetItemLockMediator.prototype.controlInput = function () {
                    this._viewUI.password_textinput.align = "left";
                    this._viewUI.password_textinput.text = " ";
                    this._viewUI.password_textinput.prompt = "";
                };
                /**
                 * 控制再次输入密码
                 * @describe
                 */
                SetItemLockMediator.prototype.controlInput2 = function () {
                    this._viewUI.password2_textinput.align = "left";
                    this._viewUI.password2_textinput.text = " ";
                    this._viewUI.password2_textinput.prompt = "";
                };
                /**
                 * 确认设置密码
                 * @describe 向服务器发起请求
                 *          服务器会进行判定密码是否符合要求进行了输入
                 *          成功设置即进入设置成功的界面
                 */
                SetItemLockMediator.prototype.confirmSet = function () {
                    this.password = this._viewUI.password_textinput.text;
                    this.repeatPassword = this._viewUI.password2_textinput.text;
                    RequesterProtocols._instance.c2s_CSetPassword(this.password, this.repeatPassword);
                    this.hide();
                };
                /**
                 * 初始化界面
                 * @describe
                 */
                SetItemLockMediator.prototype._initUI = function () {
                };
                SetItemLockMediator.prototype.goBack = function () {
                    this.hide();
                    this._itemLockMediator = new setBasics.ItemLockMediator(this._app);
                    this._itemLockMediator.show();
                };
                SetItemLockMediator.prototype.hide = function () {
                    this.removeEvent();
                    _super.prototype.hide.call(this);
                };
                /**
                 * 移除事件
                 */
                SetItemLockMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.CLICK, this, this.goBack);
                    this._viewUI.confirm_btn.off(LEvent.CLICK, this, this.confirmSet);
                    this._viewUI.password_textinput.off(LEvent.CLICK, this, this.controlInput);
                    this._viewUI.password2_textinput.off(LEvent.CLICK, this, this.controlInput2);
                    modules.chat.models.ChatProxy.getInstance().off(modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, this, this.show_Msg);
                    setBasics.models.SetBasicsProxy.getInstance().off(setBasics.models.SET_PASSWORD_SUCCESS_EVENT, this, this.show_successUI);
                };
                SetItemLockMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return SetItemLockMediator;
            }(game.modules.UiMediator));
            setBasics.SetItemLockMediator = SetItemLockMediator;
        })(setBasics = modules.setBasics || (modules.setBasics = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SetItemLockMediator.js.map