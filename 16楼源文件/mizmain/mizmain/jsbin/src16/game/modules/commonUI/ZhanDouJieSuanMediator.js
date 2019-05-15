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
* 特殊副本战斗结算-摇骰子
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var ZhanDouJieSuanMediator = /** @class */ (function (_super) {
                __extends(ZhanDouJieSuanMediator, _super);
                function ZhanDouJieSuanMediator(app, rollMelon) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.JieHunHuoDongUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.rollMelon = rollMelon;
                    _this._viewUI.cancel_img.on(LEvent.MOUSE_DOWN, _this, _this.cancel);
                    _this._viewUI.ok_img.on(LEvent.MOUSE_DOWN, _this, _this.ok);
                    return _this;
                }
                ZhanDouJieSuanMediator.prototype.jieSuanView = function () {
                    this._viewUI.item_box.visible = true;
                    this._viewUI.xieZhu_img.visible = false;
                    this._viewUI.cancel_img.x = 306;
                    this._viewUI.ok_img.x = 478;
                    this._viewUI.name_img.x = 315;
                    this._viewUI.name_lab.x = 327;
                    var skinArr = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                        "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                        "common/ui/tongyong/jinkuang.png"];
                    var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
                    this._viewUI.name_lab.text = _itemAttrBinDic[this.rollMelon.itemid].name;
                    this._viewUI.icon_img.skin = game.modules.shop.models.ShopModel.getInstance().getSrc(_itemAttrBinDic[this.rollMelon.itemid].icon);
                    this._viewUI.diban_img.skin = skinArr[_itemAttrBinDic[this.rollMelon.itemid].nquality - 1];
                    this._viewUI.num_lab.text = this.rollMelon.itemnum + "";
                    this.show();
                    this.time = 0;
                    Laya.timer.loop(1000, this, this.cancel);
                };
                ZhanDouJieSuanMediator.prototype.jieHunView = function () {
                    this._viewUI.item_box.visible = false;
                    this._viewUI.xieZhu_img.visible = true;
                    this._viewUI.xieZhu_img.x = 145;
                    this._viewUI.cancel_img.x = 318;
                    this._viewUI.ok_img.x = 498;
                    this._viewUI.name_img.x = 255;
                    this._viewUI.name_lab.x = 268;
                    this.show();
                };
                ZhanDouJieSuanMediator.prototype.timeLoop = function () {
                    this.time++;
                    this._viewUI.time_pro.value = this.time / 10;
                    if (this.time >= 5) {
                        this.cancel();
                    }
                };
                ZhanDouJieSuanMediator.prototype.cancel = function () {
                    this.hide();
                    Laya.timer.clear(this, this.timeLoop);
                    modules.team.models.TeamProxy.getInstance().event(modules.team.models.JS_CANCEL);
                };
                ZhanDouJieSuanMediator.prototype.ok = function () {
                    this.hide();
                    Laya.timer.clear(this, this.timeLoop);
                    modules.team.models.TeamProxy.getInstance().event(modules.team.models.JS_OK);
                };
                ZhanDouJieSuanMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                ZhanDouJieSuanMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                ZhanDouJieSuanMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ZhanDouJieSuanMediator;
            }(game.modules.UiMediator));
            commonUI.ZhanDouJieSuanMediator = ZhanDouJieSuanMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ZhanDouJieSuanMediator.js.map