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
 * 解除道具安全锁界面
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var setBasics;
        (function (setBasics) {
            var DelItemLockMediator = /** @class */ (function (_super) {
                __extends(DelItemLockMediator, _super);
                function DelItemLockMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.DelItemLockPasswordUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                DelItemLockMediator.prototype.show = function () {
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
                DelItemLockMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.CLICK, this, this.goBack);
                    this._viewUI.oldPassword_textinput.on(LEvent.CLICK, this, this.controlInput);
                    this._viewUI.oldPassword2_textinput.on(LEvent.CLICK, this, this.controlInput2);
                    this._viewUI.confirmDel_btn.on(LEvent.CLICK, this, this.confirmDel);
                    setBasics.models.SetBasicsProxy.getInstance().on(setBasics.models.RESET_PASSWORD_SUCCESS_EVENT, this, this.show_delSuccessUI);
                };
                /**
                 * 重置密码成功后界面
                 */
                DelItemLockMediator.prototype.show_delSuccessUI = function () {
                    this._setItemLockSuccessMediator = new setBasics.SetItemLockSuccessMediator(this._app);
                    this._setItemLockSuccessMediator.onShow();
                    this.hide();
                };
                /**
                 * 确认解除
                 */
                DelItemLockMediator.prototype.confirmDel = function () {
                    this.old_pd = this._viewUI.oldPassword_textinput.text;
                    this.old_repeatpd = this._viewUI.oldPassword2_textinput.text;
                    RequesterProtocols._instance.c2s_CDelPassword(this.old_pd, this.old_repeatpd);
                    this.hide();
                };
                DelItemLockMediator.prototype.controlInput = function () {
                };
                DelItemLockMediator.prototype.controlInput2 = function () {
                };
                /**
                 * 初始化界面
                 * @describe
                 */
                DelItemLockMediator.prototype._initUI = function () {
                };
                DelItemLockMediator.prototype.goBack = function () {
                    this.hide();
                    this._itemLockMediator = new setBasics.ItemLockMediator(this._app);
                    this._itemLockMediator.show();
                };
                DelItemLockMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.removeEvent();
                };
                /**
                 * 移除事件
                 */
                DelItemLockMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.CLICK, this, this.hide);
                };
                DelItemLockMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return DelItemLockMediator;
            }(game.modules.UiMediator));
            setBasics.DelItemLockMediator = DelItemLockMediator;
        })(setBasics = modules.setBasics || (modules.setBasics = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=DelItemLockMediator.js.map