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
var MapModel = game.modules.mapworld.models.MapModel;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var mapworld;
        (function (mapworld) {
            var MapViewMediator = /** @class */ (function (_super) {
                __extends(MapViewMediator, _super);
                //private _viewUI:ui.common.MapWorldUI;
                function MapViewMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.isCenter = true;
                    return _this;
                }
                MapViewMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                MapViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                return MapViewMediator;
            }(game.modules.UiMediator));
            mapworld.MapViewMediator = MapViewMediator;
        })(mapworld = modules.mapworld || (modules.mapworld = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MapViewMediator.js.map