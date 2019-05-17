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
 * 设置道具安全锁选项界面
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var setBasics;
        (function (setBasics) {
            var ItemLockMediator = /** @class */ (function (_super) {
                __extends(ItemLockMediator, _super);
                function ItemLockMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.ItemSecurityLockUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                ItemLockMediator.prototype.show = function () {
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
                ItemLockMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.CLICK, this, this.hide);
                    this._viewUI.lockSet_btn.on(LEvent.CLICK, this, this.controlLockSet);
                    this._viewUI.resetPassword_btn.on(LEvent.CLICK, this, this.controlResetPassword);
                    this._viewUI.lockRelease_btn.on(LEvent.CLICK, this, this.controlLockRelease);
                    this._viewUI.lockReleaseForce_btn.on(LEvent.CLICK, this, this.controlLockReleaseForce);
                };
                /**
                 * 设置道具安全锁
                 * @describe 进入输入道具安全锁界面
                 *          如果已经有安全锁，则弹出提示“已设置好安全锁”飘窗
                 *
                 */
                ItemLockMediator.prototype.controlLockSet = function () {
                    this._setItemLockMediator = new setBasics.SetItemLockMediator(this._app);
                    this._setItemLockMediator.show();
                    this.hide();
                };
                /**
                 * 重置道具安全锁
                 * @describe 进入重新输入道具安全锁界面
                 *          如果没安全锁，则弹出提示“请先设置安全锁”飘窗
                 */
                ItemLockMediator.prototype.controlResetPassword = function () {
                    this._resetItemLockMediator = new setBasics.ResetItemLockMediator(this._app);
                    this._resetItemLockMediator.show();
                    this.hide();
                };
                /**
                 * 解除道具安全锁
                 * @describe 进入输入道具安全锁界面
                 *          如果没安全锁，则弹出提示“请先设置安全锁”飘窗
                 */
                ItemLockMediator.prototype.controlLockRelease = function () {
                    this._delItemLockMediator = new setBasics.DelItemLockMediator(this._app);
                    this._delItemLockMediator.show();
                    this.hide();
                };
                /**
                 * 强制解除道具安全锁
                 * @describe 进入强制解除道具安全锁界面
                 *          如果没安全锁，则弹出提示“请先设置安全锁”飘窗
                 */
                ItemLockMediator.prototype.controlLockReleaseForce = function () {
                };
                /**
                 * 初始化界面
                 * @describe
                 */
                ItemLockMediator.prototype._initUI = function () {
                };
                ItemLockMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.removeEvent();
                };
                /**
                 * 移除事件
                 */
                ItemLockMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.CLICK, this, this.hide);
                    this._viewUI.lockSet_btn.off(LEvent.CLICK, this, this.controlLockSet);
                    this._viewUI.resetPassword_btn.off(LEvent.CLICK, this, this.controlResetPassword);
                    this._viewUI.lockRelease_btn.off(LEvent.CLICK, this, this.controlLockRelease);
                    this._viewUI.lockReleaseForce_btn.off(LEvent.CLICK, this, this.controlLockReleaseForce);
                };
                ItemLockMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ItemLockMediator;
            }(game.modules.UiMediator));
            setBasics.ItemLockMediator = ItemLockMediator;
        })(setBasics = modules.setBasics || (modules.setBasics = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ItemLockMediator.js.map