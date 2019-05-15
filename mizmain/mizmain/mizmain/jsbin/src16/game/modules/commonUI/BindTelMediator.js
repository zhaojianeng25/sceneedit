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
 * 手机关联界面
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var BindTelMediator = /** @class */ (function (_super) {
                __extends(BindTelMediator, _super);
                function BindTelMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.component.PhoneAssociationUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                BindTelMediator.prototype.show = function () {
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
                BindTelMediator.prototype.registerEvent = function () {
                    //UI事件
                    this._viewUI.close_btn.on(LEvent.CLICK, this, this.hide);
                };
                /**
                 * 初始化界面
                 * @describe
                 */
                BindTelMediator.prototype._initUI = function () {
                };
                BindTelMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.removeEvent();
                };
                /**
                 * 移除事件
                 */
                BindTelMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.CLICK, this, this.hide);
                };
                BindTelMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return BindTelMediator;
            }(game.modules.UiMediator));
            commonUI.BindTelMediator = BindTelMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BindTelMediator.js.map