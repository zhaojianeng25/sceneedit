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
* 修改宗旨界面
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var FamilyChangeAimViewMediator = /** @class */ (function (_super) {
                __extends(FamilyChangeAimViewMediator, _super);
                function FamilyChangeAimViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this._viewUI = new ui.common.FamilyXiuGaiZongZhiUI();
                    _this._app = app;
                    _this.isCenter = false;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this._viewUI.enter_btn.on(LEvent.MOUSE_DOWN, _this, _this.ChangeAim);
                    _this._viewUI.exit_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    return _this;
                }
                /**修改公会宗旨,显示老宗旨 */
                FamilyChangeAimViewMediator.prototype.changeClanAim = function (oldAim) {
                    this._viewUI.zongZhi_input.text = oldAim;
                };
                /**修改公会宗旨 */
                FamilyChangeAimViewMediator.prototype.ChangeAim = function () {
                    var newAim = this._viewUI.zongZhi_input.text;
                    this.hide();
                    this.CChangeClanAim(newAim);
                };
                /**x修改宗旨请求 */
                FamilyChangeAimViewMediator.prototype.CChangeClanAim = function (newAim) {
                    RequesterProtocols._instance.c2s_CChangeClanAim(newAim);
                };
                FamilyChangeAimViewMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                FamilyChangeAimViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                FamilyChangeAimViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilyChangeAimViewMediator;
            }(game.modules.UiMediator));
            family.FamilyChangeAimViewMediator = FamilyChangeAimViewMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyChangeAimViewMediator.js.map