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
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var QieChuoJieMianMediator = /** @class */ (function (_super) {
                __extends(QieChuoJieMianMediator, _super);
                function QieChuoJieMianMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.QieChuoJieMianUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    return _this;
                }
                QieChuoJieMianMediator.prototype.init = function (tabid) {
                    this._viewUI.select_tab.selectedIndex = tabid;
                    this.show();
                };
                QieChuoJieMianMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                QieChuoJieMianMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                QieChuoJieMianMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return QieChuoJieMianMediator;
            }(game.modules.UiMediator));
            commonUI.QieChuoJieMianMediator = QieChuoJieMianMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=QieChuoJieMianMediator.js.map