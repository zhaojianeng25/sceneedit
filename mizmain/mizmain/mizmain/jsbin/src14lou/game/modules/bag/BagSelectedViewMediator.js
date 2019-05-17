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
            var BagSelectedViewMediator = /** @class */ (function (_super) {
                __extends(BagSelectedViewMediator, _super);
                function BagSelectedViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    // 仓库按钮是否解锁，名称等数据
                    _this._storeHousListData = [];
                    _this._viewUI = new ui.common.BagSelectUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this._app = app;
                    return _this;
                }
                BagSelectedViewMediator.prototype.onLoad = function () {
                    this.controlStoreHouseBtnList();
                    this.registBtnEvent();
                };
                // 实现的接口
                BagSelectedViewMediator.prototype.show = function () {
                    this.onLoad();
                    _super.prototype.show.call(this);
                };
                /** 初始化点击事件 */
                BagSelectedViewMediator.prototype.registBtnEvent = function () {
                    this._viewUI.mask_img.on(LEvent.MOUSE_DOWN, this, this.clickStoreHouseBtnEvent);
                };
                BagSelectedViewMediator.prototype.clickStoreHouseBtnEvent = function () {
                    bagModel.getInstance()._isStoreHouseBtnOpen = false;
                    this.hide();
                };
                BagSelectedViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                BagSelectedViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                //UI 特效控制 获取UI中属性
                /**
                 * @describe  控制滚动列表
                 */
                BagSelectedViewMediator.prototype.controlStoreHouseBtnList = function () {
                    this._viewUI.storeHouseBtn_list.spaceX = 5;
                    this._viewUI.storeHouseBtn_list.spaceY = 5;
                    if (true) {
                        this.getStoreHouseBtnListData();
                    }
                    this._viewUI.storeHouseBtn_list.repeatX = 2;
                    // let repeatY = Math.ceil(this._storeHousListData.length/2);
                    this._viewUI.storeHouseBtn_list.repeatY = this._storeHousListData.length / 2;
                    this._viewUI.bg_img.height = this._storeHousListData.length / 2 * 75;
                    this.listScroll(this._viewUI.storeHouseBtn_list);
                };
                /**
                 * @describe  获取仓库按钮list数据
                 */
                BagSelectedViewMediator.prototype.getStoreHouseBtnListData = function () {
                    var num = bag.models.BagModel.getInstance().getDepotNumber();
                    this._storeHousListData = bag.models.BagModel.getInstance().storeHouseBtnName;
                    this._viewUI.storeHouseBtn_list.array = this._storeHousListData;
                    this._storeHousListDataLength = this._storeHousListData.length;
                };
                /**
                 * @describe  List控件的滚动回弹效果
                 * @param list  list控件
                 */
                BagSelectedViewMediator.prototype.listScroll = function (list) {
                    list.selectEnable = true;
                    list.renderHandler = new Handler(this, this.onRenderListItem);
                    list.selectHandler = new Handler(this, this.onSelectedListItem);
                };
                /**
                 * @describe 渲染List中的单元格
                 * @param cell  Laya.Box
                 * @param index  number
                 */
                BagSelectedViewMediator.prototype.onRenderListItem = function (cell, index) {
                    if (index > this._storeHousListDataLength)
                        return;
                    var label = this._storeHousListData[index].label;
                    var lockImg = cell.getChildByName("lock_img");
                    if (label != "") {
                        var lockBtn = cell.getChildByName("lock_btn");
                        lockBtn.label = label;
                        lockImg.visible = false;
                    }
                    else {
                        lockImg.visible = true;
                    }
                };
                /**
                 * @describe 选中仓库下标时判断事件
                 * @param cell  Laya.Box
                 * @param index  number
                 */
                BagSelectedViewMediator.prototype.onSelectedListItem = function (index) {
                    console.log("-----------------------------------------------onSelectedListItem: ", index);
                    if (index == -1)
                        return;
                    var depotNum = bag.models.BagModel.getInstance().depotnameinfo.keys.length + 2;
                    if (index < depotNum && index > -1) {
                        var pageId = index;
                        bag.models.BagProxy.getInstance().event(bag.models.CLOSE_SELETED_STOREHOUSE_EVENT, pageId);
                    }
                    else if (index >= depotNum) {
                        bag.models.BagProxy.getInstance().event(bag.models.DEBLOCKING_EVENT);
                        // this._viewUI.storeHouseBtn_list.selectedIndex = -1;
                    }
                    this._viewUI.storeHouseBtn_list.selectedIndex = -1;
                };
                return BagSelectedViewMediator;
            }(game.modules.UiMediator));
            bag.BagSelectedViewMediator = BagSelectedViewMediator;
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BagSelectedViewMediator.js.map