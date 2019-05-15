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
 * 手机安全界面
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var setBasics;
        (function (setBasics) {
            var TelphoneSafeMediator = /** @class */ (function (_super) {
                __extends(TelphoneSafeMediator, _super);
                function TelphoneSafeMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.ShouJiAnQuanUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                TelphoneSafeMediator.prototype.show = function () {
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
                TelphoneSafeMediator.prototype.registerEvent = function () {
                    //UI事件
                    this._viewUI.close_btn.on(LEvent.CLICK, this, this.hide);
                    this._viewUI.bindTel_btn.on(LEvent.CLICK, this, this.controlBindTel);
                    this._viewUI.itemLock_btn.on(LEvent.CLICK, this, this.controlItemLock);
                };
                /**
                 * 控制道具安全锁
                 * @describe 进入设置道具安全锁界面
                 */
                TelphoneSafeMediator.prototype.controlItemLock = function () {
                    this._itemLockMediator = new setBasics.ItemLockMediator(this._app);
                    this._itemLockMediator.show();
                };
                /**
                 * 控制手机关联
                 * @describe 如果用户没有设置手机关联，按钮名字为“手机关联”；如果用户设置了手机关联，按钮名字为解除关联
                 *          被点击后，都出现手机关联窗口
                 */
                TelphoneSafeMediator.prototype.controlBindTel = function () {
                    //暂不知道如何去判断用户是否设置了手机关联
                    this._bindTelMediator = new modules.commonUI.BindTelMediator(this._app);
                    this._bindTelMediator.show();
                };
                /**
                 * 初始化界面
                 * @describe
                 */
                TelphoneSafeMediator.prototype._initUI = function () {
                };
                TelphoneSafeMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.removeEvent();
                };
                /**
                 * 移除事件
                 */
                TelphoneSafeMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.CLICK, this, this.hide);
                    this._viewUI.bindTel_btn.off(LEvent.CLICK, this, this.controlBindTel);
                    this._viewUI.itemLock_btn.off(LEvent.CLICK, this, this.controlItemLock);
                };
                TelphoneSafeMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return TelphoneSafeMediator;
            }(game.modules.UiMediator));
            setBasics.TelphoneSafeMediator = TelphoneSafeMediator;
        })(setBasics = modules.setBasics || (modules.setBasics = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TelphoneSafeMediator.js.map