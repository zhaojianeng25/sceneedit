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
/** 排行榜 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var ranKingList;
        (function (ranKingList) {
            /** 排行榜moudle*/
            var RanKingListModule = /** @class */ (function (_super) {
                __extends(RanKingListModule, _super);
                function RanKingListModule(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.RanKingListUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._ranKingListMediator = new ranKingList.RanKingListMediator(app);
                    return _this;
                }
                RanKingListModule.prototype.onShow = function (event) {
                    this._ranKingListMediator.show();
                    this._app.uiRoot.closeLoadProgress();
                };
                RanKingListModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                RanKingListModule.prototype.getView = function () {
                    return this._viewUI;
                };
                return RanKingListModule;
            }(game.modules.ModuleMediator));
            ranKingList.RanKingListModule = RanKingListModule;
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RanKingListModule.js.map