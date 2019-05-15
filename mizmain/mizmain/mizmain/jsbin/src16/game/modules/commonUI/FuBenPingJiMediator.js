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
* 副本评级
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var FuBenPingJiMediator = /** @class */ (function (_super) {
                __extends(FuBenPingJiMediator, _super);
                /**
                 * 评级系统
                 * @param rate 评分等级
                 * @param items 抽奖物品
                 * @param time 消失时间
                 */
                function FuBenPingJiMediator(app, rate, items, time) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this.items = [];
                    /** 是否已经选中奖励 */
                    _this.isGetReward = false;
                    /** 选中物品后评分系统的关闭时间 */
                    _this.colseTime = 2;
                    _this._viewUI = new ui.common.TuiChuFuBenUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.rate = rate;
                    _this.items = items;
                    _this.time = time;
                    _this._viewUI.items_list.renderHandler = new Handler(_this, _this.onSelect);
                    return _this;
                }
                FuBenPingJiMediator.prototype.init = function () {
                    modules.activity.models.ActivityModel._instance.isShowPingJi = true;
                    this._viewUI.ditu_img.visible = false;
                    Laya.timer.loop(1000, this, this.timerLoop);
                    var data = [];
                    for (var i = 0; i < this.items.length; i++) {
                        data.push({
                            diban_img: { visible: false },
                            icon_img: { visible: false },
                            libao_img: { visible: true },
                        });
                    }
                    this._viewUI.items_list.repeatX = this.items.length;
                    this._viewUI.items_list.repeatY = 1;
                    this._viewUI.items_list.spaceX = 40;
                    this._viewUI.items_list.array = data;
                    this._viewUI.items_list.x = 339 - (this.items.length - 1) * 60;
                    this._viewUI.daojishi_lab.text = this.time + "s";
                };
                /** 评分系统的关闭时间显示 */
                FuBenPingJiMediator.prototype.timerLoop = function () {
                    if (this.time <= 0)
                        this.btnHandler(0);
                    this.time -= 1;
                    this._viewUI.daojishi_lab.text = (this.time <= 0 ? 0 : this.time) + "s";
                };
                /** list渲染 */
                FuBenPingJiMediator.prototype.onSelect = function (cell, index) {
                    var btn = cell.getChildByName("getItem_btn");
                    btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [index]);
                };
                /** 选中监听 */
                FuBenPingJiMediator.prototype.btnHandler = function (index) {
                    this.index = index;
                    Laya.timer.clear(this, this.timerLoop);
                    RequesterProtocols._instance.c2s_done_fortune_wheel(0, 0, 1, 1);
                    modules.bag.models.BagProxy.getInstance().once(modules.bag.models.SHOW_PINGJIITEM_EVENT, this, this.onAddItem);
                };
                /** 显示选中的物品 */
                FuBenPingJiMediator.prototype.onAddItem = function (items) {
                    this.isGetReward = true;
                    var rateSkins = ["common/ui/fuben/s.png", "common/ui/fuben/a.png",
                        "common/ui/fuben/b.png", "common/ui/fuben/c.png"];
                    var dibanSkins = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                        "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                        "common/ui/tongyong/jinkuang.png"];
                    var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
                    this._viewUI.pingjia_img.skin = rateSkins[this.rate - 1];
                    for (var i = 0; i < this.items.length; i++) {
                        if (items.itemid == this.items[i] && i != this.index) {
                            var temp = this.items[i];
                            this.items[i] = this.items[this.index];
                            this.items[this.index] = temp;
                        }
                    }
                    for (var j = 0; j < this.items.length; j++) {
                        var diban_img = this._viewUI.items_list.getCell(j).getChildByName("diban_img");
                        var icon_img = this._viewUI.items_list.getCell(j).getChildByName("icon_img");
                        var libao_img = this._viewUI.items_list.getCell(j).getChildByName("libao_img");
                        diban_img.skin = dibanSkins[_itemAttrBinDic[this.items[j]].nquality - 1];
                        icon_img.skin = game.modules.shop.models.ShopModel.getInstance().getSrc(_itemAttrBinDic[this.items[j]].icon);
                        diban_img.visible = true;
                        icon_img.visible = true;
                        libao_img.visible = false;
                    }
                    Laya.timer.loop(1000, this, this.colseView);
                };
                /** 选中物品2秒后关闭界面 */
                FuBenPingJiMediator.prototype.colseView = function () {
                    if (this.colseTime == 0) {
                        Laya.timer.clear(this, this.colseView);
                        this.hide();
                    }
                    this.colseTime -= 1;
                    this._viewUI.daojishi_lab.text = (this.colseTime <= 0 ? 0 : this.colseTime) + "s";
                };
                FuBenPingJiMediator.prototype.show = function () {
                    this.init();
                    _super.prototype.show.call(this);
                    game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.OPEN_EVENT);
                };
                FuBenPingJiMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    if (!this.isGetReward) {
                        RequesterProtocols._instance.c2s_done_fortune_wheel(0, 0, 1, 1);
                    }
                    modules.activity.models.ActivityModel.getInstance().isOver = false;
                    modules.activity.models.ActivityModel._instance.isShowPingJi = false;
                    this._viewUI.ditu_img.offAll(LEvent.CLICK);
                    this._viewUI.pingji_box.offAll(LEvent.CLICK);
                    Laya.timer.clear(this, this.timerLoop);
                    game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                FuBenPingJiMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FuBenPingJiMediator;
            }(game.modules.UiMediator));
            commonUI.FuBenPingJiMediator = FuBenPingJiMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FuBenPingJiMediator.js.map