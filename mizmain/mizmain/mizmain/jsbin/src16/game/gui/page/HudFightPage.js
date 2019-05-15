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
var game;
(function (game) {
    var gui;
    (function (gui) {
        var page;
        (function (page) {
            /**
             * HUD战斗界面
             * name 王谦
             */
            var HudFightPage = /** @class */ (function (_super) {
                __extends(HudFightPage, _super);
                function HudFightPage() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return HudFightPage;
            }(game.gui.base.Page));
            page.HudFightPage = HudFightPage;
        })(page = gui.page || (gui.page = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=HudFightPage.js.map