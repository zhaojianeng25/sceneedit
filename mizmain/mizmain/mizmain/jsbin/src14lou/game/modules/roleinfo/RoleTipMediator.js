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
* 人物提示类
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var roleinfo;
        (function (roleinfo) {
            var RoleTipMediator = /** @class */ (function (_super) {
                __extends(RoleTipMediator, _super);
                function RoleTipMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this._viewUI = new ui.common.RoleTipUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this._viewUI.tip_box.on(LEvent.MOUSE_DOWN, _this, _this.swap);
                    return _this;
                }
                RoleTipMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                RoleTipMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                RoleTipMediator.prototype.swap = function () {
                    _super.prototype.swap.call(this);
                };
                RoleTipMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return RoleTipMediator;
            }(game.modules.UiMediator));
            roleinfo.RoleTipMediator = RoleTipMediator;
        })(roleinfo = modules.roleinfo || (modules.roleinfo = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleTipMediator.js.map