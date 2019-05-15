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
 * 挂机系统
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var guaji;
        (function (guaji) {
            var GuaJiModule = /** @class */ (function (_super) {
                __extends(GuaJiModule, _super);
                function GuaJiModule(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._guaJiMediator = new guaji.GuaJiMediator(_this._app);
                    return _this;
                }
                GuaJiModule.prototype.onShow = function (event) {
                    this._guaJiMediator.show();
                    this._app.uiRoot.closeLoadProgress();
                };
                GuaJiModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                GuaJiModule.prototype.getView = function () {
                    return this._viewUI;
                };
                return GuaJiModule;
            }(game.modules.ModuleMediator));
            guaji.GuaJiModule = GuaJiModule;
        })(guaji = modules.guaji || (modules.guaji = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=GuaJiModule.js.map