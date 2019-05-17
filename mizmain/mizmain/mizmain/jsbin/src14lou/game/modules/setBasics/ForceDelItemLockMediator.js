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
 * 强制解除道具安全锁界面
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var setBasics;
        (function (setBasics) {
            var ForceDelItemLockMediator = /** @class */ (function (_super) {
                __extends(ForceDelItemLockMediator, _super);
                function ForceDelItemLockMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 当前验证码 */
                    _this.curr_code = '';
                    _this._viewUI = new ui.common.ForceDelItemLockUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                ForceDelItemLockMediator.prototype.show = function () {
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
                ForceDelItemLockMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.CLICK, this, this.goBack);
                    this._viewUI.getPin_btn.on(LEvent.CLICK, this, this.getPin);
                    this._viewUI.confirm_btn.on(LEvent.CLICK, this, this.confirmForce);
                    //消息事件监听
                };
                /**
                 * 确认强制解除道具安全锁
                 */
                ForceDelItemLockMediator.prototype.confirmForce = function () {
                    this.curr_code = this._viewUI.pin_textinput.text;
                    RequesterProtocols._instance.c2s_CForceDelPassword(this.curr_code);
                };
                /**
                 * 获取验证码
                 * @describe 根据手机号码，向服务器发起请求，获取验证码
                 */
                ForceDelItemLockMediator.prototype.getPin = function () {
                    RequesterProtocols._instance.c2s_CGetCheckCode(110); //110是临时填写号码，后续修正
                };
                /* 初始化界面
                * @describe
                */
                ForceDelItemLockMediator.prototype._initUI = function () {
                };
                ForceDelItemLockMediator.prototype.goBack = function () {
                    this.hide();
                    this._itemLockMediator = new setBasics.ItemLockMediator(this._app);
                    this._itemLockMediator.show();
                };
                ForceDelItemLockMediator.prototype.hide = function () {
                    this.removeEvent();
                    _super.prototype.hide.call(this);
                };
                /**
                 * 移除事件
                 */
                ForceDelItemLockMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.CLICK, this, this.goBack);
                };
                ForceDelItemLockMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ForceDelItemLockMediator;
            }(game.modules.UiMediator));
            setBasics.ForceDelItemLockMediator = ForceDelItemLockMediator;
        })(setBasics = modules.setBasics || (modules.setBasics = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ForceDelItemLockMediator.js.map