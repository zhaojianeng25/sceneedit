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
* 一般ui
*/
var game;
(function (game) {
    var gui;
    (function (gui) {
        var GeneralUI = /** @class */ (function (_super) {
            __extends(GeneralUI, _super);
            function GeneralUI(app) {
                return _super.call(this, app) || this;
            }
            //显示提示
            GeneralUI.prototype.showTip = function (mess) {
                // this.open(PageDef.ALERT_TIP, (page: AlertTip) => {
                // 	page.setInfo(mess);
                // });
            };
            return GeneralUI;
        }(game.gui.base.PageContainer));
        gui.GeneralUI = GeneralUI;
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=GeneralUI.js.map