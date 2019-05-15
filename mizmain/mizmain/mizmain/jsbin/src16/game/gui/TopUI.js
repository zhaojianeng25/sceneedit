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
* 顶层ui
*/
var game;
(function (game) {
    var gui;
    (function (gui) {
        var TopUI = /** @class */ (function (_super) {
            __extends(TopUI, _super);
            function TopUI(app) {
                return _super.call(this, app) || this;
            }
            //显示等待
            TopUI.prototype.showLoading = function () {
                if (!this.getPage(PageDef.LOAD)) {
                    this.open(PageDef.LOAD);
                }
            };
            //关闭等待
            TopUI.prototype.closeLoading = function () {
                if (this.getPage(PageDef.LOAD)) {
                    this.close(PageDef.LOAD);
                }
            };
            return TopUI;
        }(game.gui.base.PageContainer));
        gui.TopUI = TopUI;
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=TopUI.js.map