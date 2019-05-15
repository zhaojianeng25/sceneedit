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
 * 输入道具安全锁密码成功界面
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var setBasics;
        (function (setBasics) {
            var SetItemLockSuccessMediator = /** @class */ (function (_super) {
                __extends(SetItemLockSuccessMediator, _super);
                function SetItemLockSuccessMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 当前密码 */
                    _this.curr_password = "";
                    _this._viewUI = new ui.common.SetItemLockSuccessUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                SetItemLockSuccessMediator.prototype.onShow = function (password) {
                    this.curr_password = password;
                    this.show();
                };
                SetItemLockSuccessMediator.prototype.show = function () {
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
                SetItemLockSuccessMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.CLICK, this, this.hide);
                    this._viewUI.confirm_btn.on(LEvent.CLICK, this, this.hide);
                    this._viewUI.set_btn.on(LEvent.CLICK, this, this.goToSet);
                    //消息监听            
                    setBasics.models.SetBasicsProxy.getInstance().on(setBasics.models.SET_PASSWORD_SUCCESS_EVENT, this, this.show_currPassword);
                    setBasics.models.SetBasicsProxy.getInstance().on(setBasics.models.RESET_PASSWORD_SUCCESS_EVENT, this, this.show_currResetPassword);
                    setBasics.models.SetBasicsProxy.getInstance().on(setBasics.models.DEL_PASSWORD_SUCCESS_EVENT, this, this.show_remind);
                };
                /**
                 * 跳转设置安全锁
                 */
                SetItemLockSuccessMediator.prototype.goToSet = function () {
                    this._setItemLockMediator = new setBasics.SetItemLockMediator(this._app);
                    this._setItemLockMediator.show();
                };
                /**
                 * 显示提醒
                 */
                SetItemLockSuccessMediator.prototype.show_remind = function () {
                    this._viewUI.currPassword_textinput.visible = false;
                    this._viewUI.tip1_lab.visible = false;
                    this._viewUI.tip2_lab.visible = false;
                    this._viewUI.confirm_btn.visible = false;
                    this._viewUI.title_lab.text = "解除安全锁";
                    this._viewUI.tip3_lab.visible = true;
                    this._viewUI.remind_lab.visible = true;
                    this._viewUI.set_btn.visible = true;
                };
                /**
                 * 显示当前重置的密码
                 */
                SetItemLockSuccessMediator.prototype.show_currResetPassword = function () {
                    this._viewUI.currPassword_textinput.text = "当前的安全锁密码为：" + this.curr_password;
                    this._viewUI.currPassword_textinput.visible = true;
                    this._viewUI.tip1_lab.visible = false;
                    this._viewUI.tip2_lab.visible = true;
                    this._viewUI.title_lab.text = "重置安全锁";
                };
                /**
                 * 显示当前设置的密码
                 */
                SetItemLockSuccessMediator.prototype.show_currPassword = function () {
                    this._viewUI.currPassword_textinput.text = "当前的安全锁密码为：" + this.curr_password;
                };
                /**
                 * 初始化界面
                 * @describe
                 */
                SetItemLockSuccessMediator.prototype._initUI = function () {
                    this._viewUI.currPassword_textinput.visible = true;
                    this._viewUI.tip1_lab.visible = true;
                    this._viewUI.tip2_lab.visible = false;
                    this._viewUI.confirm_btn.visible = true;
                    this._viewUI.title_lab.text = "安全锁设置";
                    this._viewUI.tip3_lab.visible = false;
                    this._viewUI.remind_lab.visible = false;
                    this._viewUI.set_btn.visible = false;
                };
                SetItemLockSuccessMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this._itemLockMediator = new setBasics.ItemLockMediator(this._app);
                    this._itemLockMediator.show();
                    this.removeEvent();
                };
                /**
                 * 移除事件
                 */
                SetItemLockSuccessMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.CLICK, this, this.hide);
                    this._viewUI.confirm_btn.off(LEvent.CLICK, this, this.hide);
                    this._viewUI.set_btn.off(LEvent.CLICK, this, this.goToSet);
                    setBasics.models.SetBasicsProxy.getInstance().off(setBasics.models.SET_PASSWORD_SUCCESS_EVENT, this, this.show_currPassword);
                    setBasics.models.SetBasicsProxy.getInstance().off(setBasics.models.RESET_PASSWORD_SUCCESS_EVENT, this, this.show_currResetPassword);
                    setBasics.models.SetBasicsProxy.getInstance().off(setBasics.models.DEL_PASSWORD_SUCCESS_EVENT, this, this.show_remind);
                };
                SetItemLockSuccessMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return SetItemLockSuccessMediator;
            }(game.modules.UiMediator));
            setBasics.SetItemLockSuccessMediator = SetItemLockSuccessMediator;
        })(setBasics = modules.setBasics || (modules.setBasics = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SetItemLockSuccessMediator.js.map