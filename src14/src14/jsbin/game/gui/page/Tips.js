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
             * 飘字提示
             */
            var Tips = /** @class */ (function (_super) {
                __extends(Tips, _super);
                function Tips(app, onOpenFunc, onCloseFunc) {
                    var _this = _super.call(this, app, onOpenFunc, onCloseFunc) || this;
                    _this._asset = [];
                    return _this;
                }
                // 页面初始化函数
                Tips.prototype.init = function () {
                    // this._view = new ui.common.Tips_1UI();
                    this.addChild(this._view);
                };
                //提示的信息
                Tips.prototype.setText = function (message) {
                    // TextFieldU.setHtmlEmName(this._view.txt_desc,message);
                    // this._view.txt_desc.text = message;
                    if (!this._tween)
                        this._tween = new Laya.Tween();
                    this._tween.clear();
                    // this._view.alpha = 1;
                    // this._tween.to(this._view,{alpha:0},2000,null,Handler.create(this,this.close));
                };
                // 页面打开时执行函数
                Tips.prototype.onOpen = function () {
                    _super.prototype.onOpen.call(this);
                };
                Tips.prototype.close = function () {
                    this._tween.clear();
                    this._tween = null;
                    // if(this._view)
                    //   TextFieldU.setHtmlEmName(this._view.txt_desc,null);
                    _super.prototype.close.call(this);
                };
                return Tips;
            }(game.gui.base.Page));
            page.Tips = Tips;
        })(page = gui.page || (gui.page = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=Tips.js.map