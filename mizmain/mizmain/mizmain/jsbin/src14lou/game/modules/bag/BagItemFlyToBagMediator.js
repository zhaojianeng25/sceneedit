/**
* by LJM
*/
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
    var modules;
    (function (modules) {
        var bag;
        (function (bag) {
            var BagItemFlyToBagMediator = /** @class */ (function (_super) {
                __extends(BagItemFlyToBagMediator, _super);
                function BagItemFlyToBagMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.BagItemFlyToBagUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                BagItemFlyToBagMediator.getInstance = function (app) {
                    if (!this._instance) {
                        this._instance = new BagItemFlyToBagMediator(app);
                    }
                    return this._instance;
                };
                /** 初始化UI */
                BagItemFlyToBagMediator.prototype.ItemSlide = function () {
                    this._viewUI.slideItemBg_img.visible = true;
                    var itemid = BagModel.getInstance().SlideItem[0];
                    var obj = BagModel.getInstance().getItemAttrData(itemid);
                    var quality = obj.nquality;
                    var icon = obj.icon;
                    var xpos = 630;
                    var ypos = 1005;
                    this._viewUI.slideItemBg_img.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(quality);
                    this._viewUI.ownGameItem_img.skin = "common/icon/item/" + icon + ".png";
                    Laya.Tween.to(this._viewUI.slideItemBg_img, { x: xpos, y: ypos }, 1000, Laya.Ease.linearIn, Laya.Handler.create(this, this.resetUI), null, true);
                };
                /** 重置新增物品飘窗的ui */
                BagItemFlyToBagMediator.prototype.resetUI = function () {
                    this._viewUI.slideItemBg_img.x = 279;
                    this._viewUI.slideItemBg_img.y = 1130;
                    this._viewUI.slideItemBg_img.visible = false;
                    BagModel.getInstance().SlideItem.splice(0, 1);
                    if (BagModel.getInstance().SlideItem.length != 0) {
                        this.ItemSlide();
                    }
                    else {
                        this.hide();
                    }
                };
                BagItemFlyToBagMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    /** 初始化事件 */
                    this.ItemSlide();
                };
                BagItemFlyToBagMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                BagItemFlyToBagMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return BagItemFlyToBagMediator;
            }(game.modules.UiMediator));
            bag.BagItemFlyToBagMediator = BagItemFlyToBagMediator;
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BagItemFlyToBagMediator.js.map