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
* 自适应黑底
*/
var game;
(function (game) {
    var BlackBorder = /** @class */ (function (_super) {
        __extends(BlackBorder, _super);
        // private 
        function BlackBorder(app) {
            return _super.call(this, app) || this;
        }
        BlackBorder.prototype.update = function (diff) {
        };
        BlackBorder.prototype.resize = function (w, h) {
            _super.prototype.resize.call(this, w, h);
            if (!main)
                return;
            var cl = ColorU.COLOR_BLACK;
            var borderWidth = (w - main.widthDesginPixelw) / 2;
            var borderHeight = (h - main.heightDesginPixelw) / 2;
            this.graphics.clear();
            if (borderWidth) {
                this.graphics.drawRect(0, 0, borderWidth, main.heightDesginPixelw, cl);
                this.graphics.drawRect(w - borderWidth, 0, w, h, cl);
            }
            if (borderHeight) {
                this.graphics.drawRect(0, 0, w, borderHeight, cl);
                this.graphics.drawRect(0, h - borderHeight, w, h, cl);
            }
        };
        return BlackBorder;
    }(game.gui.base.Container));
    game.BlackBorder = BlackBorder;
})(game || (game = {}));
//# sourceMappingURL=BlackBorder.js.map