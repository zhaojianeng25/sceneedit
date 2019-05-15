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
 *  by : cwp
 * 系统设置模块
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var setBasics;
        (function (setBasics) {
            var SetBasicsModule = /** @class */ (function (_super) {
                __extends(SetBasicsModule, _super);
                function SetBasicsModule(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.SetJiChuUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._setBasicsMediator = new setBasics.SetBasicsMediator(app);
                    return _this;
                }
                SetBasicsModule.prototype.onShow = function (event) {
                    this._setBasicsMediator.show();
                    this._app.uiRoot.closeLoadProgress();
                };
                SetBasicsModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                SetBasicsModule.prototype.getView = function () {
                    return this._viewUI;
                };
                return SetBasicsModule;
            }(game.modules.ModuleMediator));
            setBasics.SetBasicsModule = SetBasicsModule;
        })(setBasics = modules.setBasics || (modules.setBasics = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SetBasicsModule.js.map