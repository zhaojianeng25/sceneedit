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
        var sale;
        (function (sale) {
            /** 拍卖行模块module */
            var SaleModule = /** @class */ (function (_super) {
                __extends(SaleModule, _super);
                function SaleModule(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.SaleSystemUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._AuctionViewMediator = new sale.SaleViewMediator(_this._viewUI, _this._app);
                    _this._AuctionSellViewMediator = new sale.SaleSellViewMediator(_this._viewUI, _this._app);
                    _this._AuctionGongshiViewMediator = new sale.SaleGongshiViewMediator(_this._viewUI, _this._app);
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.clickCloseBtn);
                    _this._viewUI.m_tab.selectHandler = new Handler(_this, _this.onMtab);
                    return _this;
                }
                /**选择购买界面、出售界面、公示界面 */
                SaleModule.prototype.onMtab = function (index) {
                    switch (index) {
                        case 0:
                            this.onGoumai();
                            break;
                        case 1:
                            this.onSell();
                            break;
                        case 2:
                            this.onGongshi();
                            break;
                    }
                };
                /**购买 */
                SaleModule.prototype.onGoumai = function () {
                    this._AuctionViewMediator.show();
                    this._AuctionSellViewMediator.hide();
                    this._AuctionGongshiViewMediator.hide();
                };
                /**公示 */
                SaleModule.prototype.onGongshi = function () {
                    this._AuctionViewMediator.hide();
                    this._AuctionSellViewMediator.hide();
                    this._AuctionGongshiViewMediator.show();
                };
                /**出售 */
                SaleModule.prototype.onSell = function () {
                    this._AuctionViewMediator.hide();
                    this._AuctionSellViewMediator.show();
                    this._AuctionGongshiViewMediator.hide();
                };
                /**点击关闭按钮 */
                SaleModule.prototype.clickCloseBtn = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    this.hide();
                };
                SaleModule.prototype.onShow = function (event) {
                    this.show();
                    this._viewUI.m_tab.selectedIndex = sale.models.SaleModel._instance.tiaozhuanid;
                    this.onMtab(sale.models.SaleModel._instance.tiaozhuanid);
                    this._app.uiRoot.closeLoadProgress();
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                SaleModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                SaleModule.prototype.getView = function () {
                    return this._viewUI;
                };
                return SaleModule;
            }(game.modules.ModuleMediator));
            sale.SaleModule = SaleModule;
        })(sale = modules.sale || (modules.sale = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SaleModule.js.map