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
            var TextTipsMediator = /** @class */ (function (_super) {
                __extends(TextTipsMediator, _super);
                function TextTipsMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.component.TextTipsUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                TextTipsMediator.prototype.init = function (textstr, x, y) {
                    this.show();
                    this._viewUI.tips_lab.text = textstr;
                    this._viewUI.tips_img.height = this._viewUI.tips_lab.height + 12;
                    if (textstr.length * 20 < 282) {
                        this._viewUI.tips_box.width = textstr.length * 20 + 12;
                    }
                    else {
                        this._viewUI.tips_box.width = 297;
                    }
                    if (x - this._viewUI.tips_box.width < 0) {
                        this._viewUI.tips_box.x = x + 20;
                    }
                    else {
                        this._viewUI.tips_box.x = x - this._viewUI.tips_box.width - 20;
                    }
                    this._viewUI.tips_box.y = y - this._viewUI.tips_img.height / 2;
                };
                TextTipsMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                TextTipsMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                TextTipsMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return TextTipsMediator;
            }(game.modules.UiMediator));
            commonUI.TextTipsMediator = TextTipsMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TextTipsMediator.js.map