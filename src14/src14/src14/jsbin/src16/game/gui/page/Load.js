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
             * 等待数据界面,带进度条的
             */
            var Load = /** @class */ (function (_super) {
                __extends(Load, _super);
                function Load(app, onOpenFunc, onCloseFunc) {
                    var _this = _super.call(this, app, onOpenFunc, onCloseFunc) || this;
                    //当前进度
                    _this._curJindu = -1;
                    _this._asset = [
                        game.Path.atlas_ui + "hud.atlas"
                    ];
                    return _this;
                }
                // 页面初始化函数
                Load.prototype.init = function () {
                    var _this = this;
                    var loadImg = game.Path.ui_tongyong + "load.png";
                    if (!Laya.loader.getRes(loadImg)) {
                        return;
                    }
                    this._loadImg = new LImage(loadImg);
                    this._loadImg.anchorX = this._loadImg.anchorY = .5;
                    this._loadImg.centerX = this._loadImg.centerY = 0;
                    this._loadImg.scale(1.5, 1.5);
                    this.addChild(this._loadImg);
                    this._loadImg.timerLoop(33, this._loadImg, function () {
                        _this._loadImg && (_this._loadImg.rotation += 5);
                    });
                };
                // 清理下页面
                Load.prototype.clear = function () {
                    if (this._loadImg) {
                        this._loadImg.destroy(true);
                        this._loadImg = null;
                    }
                    if (this._loadJindu) {
                        for (var _i = 0, _a = this._loadJindu; _i < _a.length; _i++) {
                            var loadjindu = _a[_i];
                            if (loadjindu)
                                loadjindu.destroy(true);
                        }
                        this._loadJindu = null;
                    }
                };
                // 显示进度
                Load.prototype.showJindu = function (step) {
                    if (!this._loadImg)
                        return;
                    if (step > this._curJindu)
                        this._curJindu = step;
                    else
                        return;
                    if (!this._loadJindu)
                        this._loadJindu = [];
                    var loadjindu = new LImage();
                    loadjindu.skin = game.Path.ui + "hud/image_ts.png";
                    loadjindu.scale(0.4, 0.4);
                    loadjindu.pos(this._loadImg.x - loadjindu.width + 15 * step, this._loadImg.y - this._loadImg.height / 2 + 20);
                    this._loadJindu.push(loadjindu);
                    this.addChild(loadjindu);
                };
                return Load;
            }(game.gui.base.Page));
            page.Load = Load;
        })(page = gui.page || (gui.page = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=Load.js.map