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
* 顶层下面的ui
*/
var game;
(function (game) {
    var gui;
    (function (gui) {
        var TopunderUI = /** @class */ (function (_super) {
            __extends(TopunderUI, _super);
            function TopunderUI(app) {
                var _this = _super.call(this, app) || this;
                _this._tipQueue = [];
                return _this;
            }
            TopunderUI.prototype.checkQueue = function () {
                if (this._tipQueue.length != 0) {
                    var message_1 = this._tipQueue.shift();
                    var page_1 = this.getPage(PageDef.TIPS);
                    if (page_1) {
                        page_1.setText(message_1);
                    }
                    else
                        this.open(PageDef.TIPS, function (page) {
                            page.setText(message_1);
                        }, null, null, true);
                }
            };
            //显示提示
            TopunderUI.prototype.showTips = function (value) {
                if (!value || value.length <= 0)
                    return;
                if (this._tipQueue)
                    this._tipQueue.push(value);
            };
            //加载条置顶
            TopunderUI.prototype.setLoadingTop = function () {
                //判断下是否有加载条
                var haveLoading = this.getPage(PageDef.LOADING) ? true : false;
                //把加载条置顶
                if (haveLoading) {
                    this.open(PageDef.LOADING);
                }
            };
            TopunderUI.prototype.resize = function (w, h) {
                _super.prototype.resize.call(this, w, h);
                //重置一下广播的位置
                var broadcast = this.getChildByName("broadcast");
                if (broadcast)
                    broadcast.centerX = 0;
            };
            return TopunderUI;
        }(game.gui.base.PageContainer));
        gui.TopunderUI = TopunderUI;
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=TopunderUI.js.map