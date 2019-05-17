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
             * 宠物
             */
            var TongYongAnNiu = /** @class */ (function (_super) {
                __extends(TongYongAnNiu, _super);
                function TongYongAnNiu(app, onOpenFunc, onCloseFunc) {
                    var _this = _super.call(this, app, onOpenFunc, onCloseFunc) || this;
                    _this._isNeedBlack = true;
                    _this._asset = [
                        game.Path.atlas_ui + "pet.atlas",
                        game.Path.atlas_ui + "tongyong.atlas"
                    ];
                    return _this;
                }
                // 页面初始化函数
                TongYongAnNiu.prototype.init = function () {
                    this._view = this._viewUI = new ui.common.PetGongYongDiBanUI();
                    // this._viewUI.mouseEnabled = false;
                    // this._viewUI.mouseThrough = true;
                    this.addChild(this._view);
                };
                // 页面打开时执行函数
                TongYongAnNiu.prototype.onOpen = function () {
                    _super.prototype.onOpen.call(this);
                    this.updateView();
                };
                //页面关闭函数
                // public close(): void {
                //     super.close();
                //     this.onExit();
                // }
                //添加事件侦听
                // protected set addListener(isAdd: boolean) {
                //     DisplayU.setMouseListener(this._viewUI.btnExit, isAdd, this, this.onClickHandler);
                // }
                //更新界面
                TongYongAnNiu.prototype.updateView = function () {
                };
                return TongYongAnNiu;
            }(game.gui.base.Page));
            page.TongYongAnNiu = TongYongAnNiu;
        })(page = gui.page || (gui.page = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=TongYongAnNiu.js.map