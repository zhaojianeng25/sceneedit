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
    var gui;
    (function (gui) {
        var page;
        (function (page) {
            /**
            * 加载界面
            */
            var Loading = /** @class */ (function (_super) {
                __extends(Loading, _super);
                function Loading(app, onOpenFunc, onCloseFunc) {
                    var _this = _super.call(this, app, onOpenFunc, onCloseFunc) || this;
                    _this._add = 0;
                    _this._max = -1;
                    _this._skin = game.Path.ui + 'load/loading' + Math.floor(Math.random() * 3) + '.jpg';
                    // this._skin = Path.ui + "load/Feige.png";
                    _this._asset = [
                        _this._skin,
                        game.Path.atlas_ui + "load.atlas"
                    ];
                    return _this;
                }
                // 页面初始化函数
                Loading.prototype.init = function () {
                    this._view = new ui.common.Loading_UI();
                    if (this._view instanceof ui.common.Loading_UI) {
                        this._view.label_txt.text = '';
                        this._view.progress_1.value = 0;
                        var box_TipsVisible = true;
                        this._view.box_Tips.visible = box_TipsVisible;
                    }
                    this.addChild(this._view);
                    this.resize(this._clientWidth, this._clientHeight);
                };
                Loading.prototype.onOpen = function () {
                    _super.prototype.onOpen.call(this);
                    if (this._view instanceof ui.common.Loading_UI) {
                        if (this._view.image_Bg.skin != this._skin) {
                            this._view.image_Bg.skin = this._skin;
                        }
                        if (this._view.txtAge) {
                            this._view.txtAge.text = "";
                        }
                    }
                    Laya.timer.loop(50, this, this.update);
                };
                Loading.prototype.setProgress = function (str, value, add, max) {
                    if (value === void 0) { value = -1; }
                    if (add === void 0) { add = 0; }
                    if (max === void 0) { max = -1; }
                    if (this._view instanceof ui.common.Loading_UI) {
                        this._view.label_txt.text = str;
                        this._view.label_txt.autoSize = true;
                        this._view.progress_1.value = value;
                        this._add = add;
                        this._max = max;
                    }
                };
                // 重新布局
                Loading.prototype.layout = function () {
                    _super.prototype.layout.call(this);
                    if (!this._view) {
                        return;
                    }
                    this.graphics.clear();
                    this.graphics.drawRect(0, 0, this._clientWidth, this._clientHeight, "#000");
                    this.drawWhite();
                };
                Loading.prototype.drawWhite = function () {
                    var _this = this;
                    if (this._view && this._view.image_Bg) {
                        var image = this._view.image_Bg;
                        if (!image.height) {
                            image.timerOnce(1, this, function () {
                                _this.drawWhite();
                            });
                            return;
                        }
                        var height = image.height + 2;
                        var top_1 = (this._clientHeight - height) / 2;
                        this.graphics.drawRect(0, top_1, this._clientWidth, height, "#000000");
                    }
                };
                Loading.prototype.update = function () {
                    if (this._add > 0 && this._view instanceof ui.common.Loading_UI) {
                        if (this._max != -1 && this._view.progress_1.value >= this._max) {
                            this._view.progress_1.value = 0;
                            return;
                        }
                        this._view.progress_1.value += this._add;
                    }
                };
                // 页面关闭
                Loading.prototype.close = function () {
                    Laya.timer.clear(this, this.update);
                    _super.prototype.close.call(this);
                };
                Loading.prototype.createdLoadEffect = function () {
                    // 不需要加载特效
                };
                return Loading;
            }(game.gui.base.Page));
            page.Loading = Loading;
        })(page = gui.page || (gui.page = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=Loading.js.map