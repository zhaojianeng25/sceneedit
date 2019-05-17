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
/**背包系统底板UI */
// import BagSystemUI = ui.common.BagSystemUI;
/**背包系统仓库UI */
// import BagStoreHouseUI = ui.common.BagStoreHouseUI;
/**背包UI */
// import BagsUI = ui.common.BagsUI;
/**选择仓库UI */
// import BagSelected = ui.common.BagSelectUI;
/**临时背包 */
// import TempBag = ui.common.BagTemporaryUI;
/**出售UI */
// import BagSaleUI = ui.common.BagSaleUI;
/**修改仓库名称UI*/
// import BagStoreHouseRenameUI = ui.common.BagStorehouseRenameUI;
/**背包Model */
var BagModel = game.modules.bag.models.BagModel;
/**背包类型 */
// import BagTypes = game.modules.bag.models
var game;
(function (game) {
    var modules;
    (function (modules) {
        var bag;
        (function (bag) {
            var ButtonType;
            (function (ButtonType) {
                ButtonType[ButtonType["BAGS_BTN"] = 0] = "BAGS_BTN";
                ButtonType[ButtonType["STOREHOUSE_BTN"] = 1] = "STOREHOUSE_BTN";
                ButtonType[ButtonType["SALE_BTN"] = 2] = "SALE_BTN";
            })(ButtonType || (ButtonType = {}));
            /**方框颜色资源图 */
            var FrameColor = [
                /**橙框 */
                { url: "common/ui/tongyong/jinkuang.png", nquality: 5 },
                /**紫框 */
                { url: "common/ui/tongyong/zikuang.png", nquality: 4 },
                /**蓝框 */
                { url: "common/ui/tongyong/lankuang.png", nquality: 3 },
                /**绿框 */
                { url: "common/ui/tongyong/lvkuang.png", nquality: 2 },
                /**白框 */
                { url: "common/ui/tongyong/baikuang.png", nquality: 1 },
            ];
            /**标题名称 */
            var TitleName = [
                /**背包界面 */
                { name: "背包" },
                /**仓库 */
                { name: "仓库" },
                /**出售 */
                { name: "出售" },
            ];
            var BagSystemModule = /** @class */ (function (_super) {
                __extends(BagSystemModule, _super);
                function BagSystemModule(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI = new ui.common.BagSystemUI();
                    _this._bagsViewMediator = new bag.BagsViewMediator(_this._viewUI, app);
                    _this._bagStoreHouseViewMediator = new bag.BagStoreHouseViewMediator(_this._viewUI, app);
                    _this._bagSaleViewMediator = new bag.BagSaleViewMediator(_this._viewUI, app);
                    return _this;
                }
                ////////////////
                ///业务逻辑
                ////////////////
                BagSystemModule.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.onLoad();
                };
                BagSystemModule.prototype.onShow = function (event) {
                    this._app.uiRoot.closeLoadProgress();
                    this.show();
                    //通知主界面打开蒙版
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                    //背包界面打开，设为false
                    bag.models.BagModel.getInstance().bagkey = false;
                };
                BagSystemModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                BagSystemModule.prototype.getView = function () {
                    return this._viewUI;
                };
                /**
                 * @describe  游戏开始加载
                 */
                BagSystemModule.prototype.onLoad = function () {
                    //显示bag界面
                    this.switchChildUI(ButtonType.BAGS_BTN);
                    this.registerEvent();
                };
                ////////////////
                ///事件
                ////////////////
                /**
                 * @describe  注册事件
                 */
                BagSystemModule.prototype.registerEvent = function () {
                    // 界面控件注册事件
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.clickCloseBtnEvent);
                    this._viewUI.bags_btn.on(LEvent.MOUSE_DOWN, this, this.clickBagsBtnEvent);
                    this._viewUI.storeHouse_btn.on(LEvent.MOUSE_DOWN, this, this.clickStoreHouseBtnEvent);
                    this._viewUI.sale_btn.on(LEvent.MOUSE_DOWN, this, this.clickSaleBtnEvent);
                };
                /**
                 * @describe  关闭背包系统事件
                 */
                BagSystemModule.prototype.clickCloseBtnEvent = function () {
                    // console.log("关闭窗口");
                    //通知主界面关闭蒙版
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    //背包界面关闭，设为true
                    bag.models.BagModel.getInstance().bagkey = true;
                    this.hide();
                    this._bagsViewMediator.hide();
                    this._bagStoreHouseViewMediator.hide();
                    this._bagSaleViewMediator.hide();
                };
                /**
                 * @describe  点击背包按钮事件
                 */
                BagSystemModule.prototype.clickBagsBtnEvent = function () {
                    if (!this._viewUI.bags_btn.selected) {
                        this.switchChildUI(ButtonType.BAGS_BTN);
                    }
                };
                /**
                 * @describe  点击仓库按钮事件
                 */
                BagSystemModule.prototype.clickStoreHouseBtnEvent = function () {
                    if (!this._viewUI.storeHouse_btn.selected) {
                        this.switchChildUI(ButtonType.STOREHOUSE_BTN);
                    }
                };
                /**
                 * @describe  点击出售按钮事件
                 */
                BagSystemModule.prototype.clickSaleBtnEvent = function () {
                    if (!this._viewUI.sale_btn.selected) {
                        this.switchChildUI(ButtonType.SALE_BTN);
                    }
                };
                /**
                 * @describe  切换子界面UI
                 * @param index   按钮类型
                 */
                BagSystemModule.prototype.switchChildUI = function (index) {
                    //初始化button的select状态
                    this._viewUI.bags_btn.selected = false;
                    this._viewUI.storeHouse_btn.selected = false;
                    this._viewUI.sale_btn.selected = false;
                    var tileName = "";
                    switch (index) {
                        case ButtonType.BAGS_BTN:
                            this._bagsViewMediator.show();
                            this._bagStoreHouseViewMediator.hide();
                            this._bagSaleViewMediator.hide();
                            this._viewUI.bags_btn.selected = true;
                            tileName = TitleName[ButtonType.BAGS_BTN].name;
                            break;
                        case ButtonType.STOREHOUSE_BTN:
                            this._bagsViewMediator.hide();
                            this._bagStoreHouseViewMediator.show();
                            this._bagSaleViewMediator.hide();
                            this._viewUI.storeHouse_btn.selected = true;
                            tileName = TitleName[ButtonType.STOREHOUSE_BTN].name;
                            break;
                        case ButtonType.SALE_BTN:
                            this._bagsViewMediator.hide();
                            this._bagStoreHouseViewMediator.hide();
                            this._bagSaleViewMediator.show();
                            this._viewUI.sale_btn.selected = true;
                            tileName = TitleName[ButtonType.SALE_BTN].name;
                            break;
                        default:
                            console.log("bagsystemModule.switchButton error");
                    }
                    this.setTileName(tileName);
                };
                ////////////////
                ///UI
                ////////////////
                /**
                 * @describe  设置标题名称
                 * @param name   标题名称
                 */
                BagSystemModule.prototype.setTileName = function (name) {
                    this._viewUI.title_lab.text = name;
                };
                ////////////////
                ///工具类
                ////////////////
                /**
                 * @describe  根据道具名颜色，改变方框的颜色
                 * @param nquality  品质颜色
                 * @return  string 方框资源位置
                 */
                BagSystemModule.getGameItemFrameColorResource = function (nquality) {
                    for (var _i = 0, FrameColor_1 = FrameColor; _i < FrameColor_1.length; _i++) {
                        var value = FrameColor_1[_i];
                        if (value.nquality == nquality) {
                            return value.url;
                        }
                    }
                    console.log("BagSystemModule getGameItemFrameColorResource");
                    return "error";
                };
                return BagSystemModule;
            }(game.modules.ModuleMediator));
            bag.BagSystemModule = BagSystemModule;
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BagSystemModule.js.map