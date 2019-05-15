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
        (function (bag_1) {
            var ButtonType;
            (function (ButtonType) {
                ButtonType[ButtonType["UP_BTN"] = 1] = "UP_BTN";
                ButtonType[ButtonType["DOWN_BTN"] = 2] = "DOWN_BTN";
            })(ButtonType || (ButtonType = {}));
            /**免费仓库个数 */
            var FREE_STOREHOUSE_NUMBER = 2;
            /**仓库中可存储的道具个数 */
            var STOREHOUSE_GAMEITEM_NUMBER = 25;
            var BagStoreHouseViewMediator = /** @class */ (function (_super) {
                __extends(BagStoreHouseViewMediator, _super);
                function BagStoreHouseViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**当前所在仓库id */
                    _this._nowPage = 1;
                    /**仓库List数据 */
                    _this._storeHouseListData = [];
                    /** bagGameItemList的数据*/
                    _this._bagGameItemListData = [];
                    /**记录提示界面出现，1：解锁背包，2：解锁仓库 */
                    _this._recordRemindViewMediator = -1;
                    /** 背包格子达到上限 */
                    _this.bagLatticereachUpperLimit = false;
                    _this._viewUI = new ui.common.BagStoreHouseUI();
                    _this._app = app;
                    _this._bagSelectedViewMediator = new bag_1.BagSelectedViewMediator(_this._viewUI, app);
                    _this._bagStoreHouseRenameViewMediator = new bag_1.BagStoreHouseRenameViewMediator(_this._viewUI, _this._app);
                    // this._remindViewMediator = new commonUI.RemindViewMediator(app.uiRoot.topUnder,app);
                    _this._remindViewMediator = modules.commonUI.RemindViewMediator.getInstance(app.uiRoot.topUnder, app);
                    _this._jinBiBuZuViewMediator = new modules.commonUI.JinBiBuZuViewMediator(app.uiRoot.topUnder, app);
                    _this.ani = new Laya.Animation();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    return _this;
                }
                ///////////////////////////
                //////业务逻辑
                ///////////////////////////
                BagStoreHouseViewMediator.prototype.show = function () {
                    this.onLoad();
                    _super.prototype.show.call(this);
                };
                BagStoreHouseViewMediator.prototype.hide = function () {
                    /** 移除通讯事件 */
                    this._remindViewMediator.off(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.clickEnSureBtnEvent);
                    this._remindViewMediator.off(modules.commonUI.LEFT_BUTTON_EVENT, this, this.clickCancelBtnEvent);
                    this._remindViewMediator.off(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                    this._remindViewMediator.off(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    _super.prototype.hide.call(this);
                };
                BagStoreHouseViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                BagStoreHouseViewMediator.prototype.onLoad = function () {
                    this.initStoreHouse();
                    this.initUI();
                    this.registerEvent();
                    this.controlBagGameItemList();
                    if (this.ani) {
                        this.ani.clear();
                    }
                };
                /**
                 * @describe  初始化仓库
                 */
                BagStoreHouseViewMediator.prototype.initStoreHouse = function () {
                    this._storeHouseGameItemNumber = STOREHOUSE_GAMEITEM_NUMBER;
                    /** 初始化倉庫 */
                    game.modules.bag.models.BagModel.getInstance().getDepotNumber();
                    //初始化仓库总个数
                    var depotNumber = game.modules.bag.models.BagModel.getInstance().depotnameinfo.keys.length; //0
                    this._totalPage = depotNumber > 0 ? depotNumber + FREE_STOREHOUSE_NUMBER : FREE_STOREHOUSE_NUMBER;
                    RequesterProtocols._instance.c2s_CGetDepot_Info(this._nowPage);
                };
                /**
                 * @describe  初始化UI界面
                 */
                BagStoreHouseViewMediator.prototype.initUI = function () {
                    this.setNowPage(this._nowPage);
                    this.setStoreHouseBtnName(bagModel.getInstance().storeHouseBtnName[this._nowPage - 1].label);
                    this.setTotalPage(this._totalPage);
                };
                /**
                 * @describe  List控件的滚动回弹效果
                 * @param list  list控件
                 */
                BagStoreHouseViewMediator.prototype.listScrollOfBagGameItem = function (list) {
                    list.vScrollBarSkin = "";
                    list.scrollBar.elasticBackTime = 200;
                    list.scrollBar.elasticDistance = 50;
                    list.selectEnable = true;
                    list.renderHandler = new Handler(this, this.onRenderListItemOfBagGameItem);
                    list.selectHandler = new Handler(this, this.onSeletListItemOfBagItem);
                };
                /**
                * @describe  List控件的滚动回弹效果
                * @param list  list控件
                */
                BagStoreHouseViewMediator.prototype.listScrollOfStoreHouse = function (list) {
                    list.selectEnable = true;
                    list.renderHandler = new Handler(this, this.onRenderListItemOfStoreHouse);
                    list.selectHandler = new Handler(this, this.onSeletListItemOfStoreHouseItem);
                };
                /**
                 * @describe  获取bagGameItemList背包数据
                 */
                BagStoreHouseViewMediator.prototype.getBagGameItemListData = function (bagType) {
                    var bag = BagModel.getInstance().getBagGameItemData(bagType);
                    // 数据为空则返回
                    if (!bag)
                        return;
                    // 置空
                    this._bagGameItemListData = [];
                    var items = bag.items;
                    /**临时存储服务端发送的道具数组 */
                    var arr = [];
                    var posArray = [];
                    var listItem;
                    //插入Item到arr数组
                    for (var index = 0; index < items.length; index++) {
                        // let id = bag.getItem(index).id;
                        var id = items[index].id;
                        var obj = BagModel.getInstance().getItemAttrData(id);
                        var icon = obj.icon;
                        var nquality = obj.nquality;
                        var number = items[index].number;
                        var posKey = items[index].key;
                        var pos_1 = items[index].position;
                        var flags = items[index].flags;
                        listItem = {
                            ID: id,
                            icon: icon,
                            number: number,
                            position: pos_1,
                            nquality: nquality,
                            isLock: false,
                            key: posKey,
                            flags: flags
                        };
                        arr.push(listItem);
                        // 1，4，5，7，12
                        // 0, 1, 2, 3, 4
                        posArray.push(pos_1);
                    }
                    // let listItem: ListItem;
                    for (var index = 0; index < this._bagGameItemListLength; index++) {
                        /** 背包格子未达到上限并且位置在后十个格子 */
                        if (!this.bagLatticereachUpperLimit && index >= this._bagGameItemListLength - 10) {
                            listItem = {
                                ID: -1,
                                icon: -1,
                                number: -1,
                                position: -1,
                                nquality: -1,
                                isLock: true,
                                key: -1,
                                flags: -1
                            };
                        }
                        else {
                            var tempIndex = posArray.indexOf(index);
                            // 找到
                            if (tempIndex != -1) {
                                listItem = arr[tempIndex];
                            }
                            else {
                                listItem = {
                                    ID: -1,
                                    icon: -1,
                                    number: -1,
                                    position: -1,
                                    nquality: -1,
                                    isLock: false,
                                    key: -1,
                                    flags: -1
                                };
                            }
                        }
                        this._bagGameItemListData.push(listItem);
                    }
                    this._viewUI.bagGameItem_list.array = this._bagGameItemListData;
                };
                /**
             * @describe  获得仓库数据
             */
                BagStoreHouseViewMediator.prototype.getStoreHoustGameItemListData = function (pageId) {
                    var bag = BagModel.getInstance().getDepotData(pageId);
                    if (!bag)
                        return;
                    // 置空
                    this._storeHouseListData = [];
                    var items = bag.items;
                    /**临时存储服务端发送的道具数组 */
                    var arr = [];
                    var posArray = [];
                    var listItem;
                    //插入Item到arr数组
                    for (var index = 0; index < items.length; index++) {
                        // let id = bag.getItem(index).id;
                        var id = items[index].id;
                        var obj = BagModel.getInstance().getItemAttrData(id);
                        var icon = obj.icon;
                        var nquality = obj.nquality;
                        var posKey = items[index].key;
                        var number = items[index].number;
                        // 服务器发回的postion
                        // 比如第一个仓库有25个道具，position[1-25]
                        // 第二个发回2个道具，position[26-27]
                        var pos_2 = items[index].position % 25;
                        var flags = items[index].flags;
                        listItem = {
                            ID: id,
                            icon: icon,
                            number: number,
                            position: pos_2,
                            nquality: nquality,
                            key: posKey,
                            flags: flags
                        };
                        arr.push(listItem);
                        posArray.push(pos_2);
                    }
                    for (var index = 0; index < this._storeHouseGameItemNumber; index++) {
                        var tempIndex = posArray.indexOf(index);
                        // 找到
                        if (tempIndex != -1) {
                            listItem = arr[tempIndex];
                        }
                        else {
                            listItem = {
                                ID: -1,
                                icon: -1,
                                number: -1,
                                position: -1,
                                nquality: -1,
                                key: -1,
                                flags: -1
                            };
                        }
                        this._storeHouseListData.push(listItem);
                    }
                    this._viewUI.storeHouse_list.array = this._storeHouseListData;
                };
                /**
                 * @describe 渲染Bag List中的单元格
                 * @param cell  Laya.Box
                 * @param index  number
                 */
                BagStoreHouseViewMediator.prototype.onRenderListItemOfBagGameItem = function (cell, index) {
                    if (index >= this._bagGameItemListLength)
                        return;
                    var itemData = this._bagGameItemListData[index];
                    var lockImg = cell.getChildByName("gameItemLock_Img");
                    lockImg.skin = "";
                    var lockImg2 = cell.getChildByName("lockimg_img");
                    lockImg2.visible = false;
                    var gameItemBgImg = cell.getChildByName("gameItemBg_img");
                    var gameItemImg = cell.getChildByName("gameItem_Img");
                    var gameItemNumberLabel = cell.getChildByName("gameItemNumber_lab");
                    if (itemData.ID != -1) {
                        var str = itemData.number > 1 ? itemData.number.toString() : "";
                        gameItemBgImg.skin = bag_1.BagSystemModule.getGameItemFrameColorResource(itemData.nquality);
                        gameItemImg.skin = "common/icon/item/" + itemData.icon + ".png";
                        gameItemNumberLabel.changeText(str);
                        gameItemImg.on(LEvent.DOUBLE_CLICK, this, this.cTranceItem, [BagTypes.BAG, itemData.key, -1, BagTypes.DEPOT, -1, this._nowPage, -1, index]);
                        if (itemData.flags != -1 && BagModel.getInstance().itemIsBind(itemData.flags)) {
                            lockImg2.visible = true;
                        }
                    }
                    else if (itemData.isLock) {
                        lockImg.skin = "common/ui/tongyong/suo.png";
                    }
                    else {
                        gameItemBgImg.skin = "common/ui/tongyong/kuang94.png";
                        gameItemImg.skin = "";
                        gameItemNumberLabel.changeText("");
                    }
                };
                /**
                 * @describe 渲染仓库 List中的单元格
                 * @param cell  Laya.Box
                 * @param index  number
                 */
                BagStoreHouseViewMediator.prototype.onRenderListItemOfStoreHouse = function (cell, index) {
                    if (index > this._storeHouseGameItemNumber)
                        return;
                    var itemData = this._storeHouseListData[index];
                    var gameItemBgImg = cell.getChildByName("gameItemBg_img");
                    var gameItemImg = cell.getChildByName("gameItem_Img");
                    var lockimg_img = cell.getChildByName("lockimg_img");
                    lockimg_img.visible = false;
                    var gameItemNumberLabel = cell.getChildByName("gameItemNumber_lab");
                    if (itemData.ID != -1) {
                        var str = itemData.number > 1 ? itemData.number.toString() : "";
                        gameItemBgImg.skin = bag_1.BagSystemModule.getGameItemFrameColorResource(itemData.nquality);
                        gameItemImg.skin = "common/icon/item/" + itemData.icon + ".png";
                        gameItemNumberLabel.changeText(str);
                        gameItemImg.on(LEvent.DOUBLE_CLICK, this, this.cTranceItem, [BagTypes.DEPOT, itemData.key, -1, BagTypes.BAG, -1, this._nowPage, -1, index]);
                        if (itemData.flags != -1 && BagModel.getInstance().itemIsBind(itemData.flags)) {
                            lockimg_img.visible = true;
                        }
                    }
                    else {
                        gameItemBgImg.skin = "common/ui/tongyong/kuang94.png";
                        gameItemImg.skin = "";
                        gameItemNumberLabel.changeText("");
                    }
                };
                /**
                 * @describe  修改当前仓库的名称
                 * @param text 修改的名称
                 */
                BagStoreHouseViewMediator.prototype.refreshStoreHouseName = function () {
                };
                /**
                 * @describe  显示提示窗口
                 */
                BagStoreHouseViewMediator.prototype.showRemindViewMediatorEvent = function () {
                    var prompt = this.calculateNeedSilverNumber();
                    var rightButtonName = "确定";
                    //关闭选择仓库界面
                    bagModel.getInstance()._isStoreHouseBtnOpen = false;
                    this._bagSelectedViewMediator.hide();
                    this.skewStroeHouseSign(false);
                    // 显示提示界面
                    this._recordRemindViewMediator = 2;
                    this._remindViewMediator.onShow(prompt, rightButtonName);
                    // 公共界面
                    this._remindViewMediator.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.clickEnSureBtnEvent);
                    this._remindViewMediator.once(modules.commonUI.LEFT_BUTTON_EVENT, this, this.clickCancelBtnEvent);
                    /** 银币兑换界面使用金币兑换 */
                    this._jinBiBuZuViewMediator.once(modules.commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.onClickUseGoldBtnEvent);
                    /** 银币兑换界面使用元宝兑换 */
                    this._jinBiBuZuViewMediator.once(modules.commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.onClickUseYuanBaoOfSilverBtnEvent); //onClickUseYuanBaoOfSilverBtnEvent
                    /** 金币兑换界面使用元宝兑换 */
                    this._jinBiBuZuViewMediator.once(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.onClickUseYuanBaoBtnEvent);
                };
                /**
                 * @describe  计算解锁一个仓库需要的银币
                 * @return 提示信息
                 */
                BagStoreHouseViewMediator.prototype.calculateNeedSilverNumber = function () {
                    var depotItem = this._totalPage * 25;
                    this._deblockingSilverNumber = BagModel.getInstance().getDeblockingDepotSilverNumber(depotItem);
                    this._deblockingGoldNumber = this._deblockingSilverNumber / 100;
                    this._deblockingFuShiNumber = this._deblockingSilverNumber / 10000;
                    var prompt = "解锁一个仓库，需要话费" + this._deblockingSilverNumber + "银币";
                    return prompt;
                };
                /**
                 * @describe  计算解锁一个背包格子（5个）需要多少银币
                 * @return  提示信息
                 */
                BagStoreHouseViewMediator.prototype.calculateNeedOfLockBagSilverNumber = function () {
                    //有10格是锁着的
                    var bagItem = this._bagGameItemListLength - 10;
                    this._deblockingBagSilverNumber = BagModel.getInstance().getDeblockingBagSilverNumber(bagItem);
                    this._deblockingBagGoldNumber = this._deblockingBagSilverNumber / 100;
                    this._deblockingBagFuShiNumber = this._deblockingBagSilverNumber / 10000;
                    var prompt = "增加5个包裹格，需要花费" + this._deblockingBagSilverNumber + "银币";
                    return prompt;
                };
                /**
                 * @describe  选择背包中的单元格
                 * @param index   下标
                 */
                BagStoreHouseViewMediator.prototype.onSeletListItemOfBagItem = function (index) {
                    if (index == -1)
                        return;
                    var itemData = this._bagGameItemListData[index];
                    //锁
                    if (itemData.isLock) {
                        var prompt_1 = this.calculateNeedOfLockBagSilverNumber();
                        this._recordRemindViewMediator = 1;
                        this._remindViewMediator.onShow(prompt_1, "确定");
                        // 公共界面
                        this._remindViewMediator.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.clickEnSureBtnEvent);
                        this._remindViewMediator.once(modules.commonUI.LEFT_BUTTON_EVENT, this, this.clickCancelBtnEvent);
                        /** 银币兑换界面使用金币兑换 */
                        this._jinBiBuZuViewMediator.once(modules.commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.onClickUseGoldBtnEvent);
                        /** 银币兑换界面使用元宝兑换 */
                        this._jinBiBuZuViewMediator.once(modules.commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.onClickUseYuanBaoOfSilverBtnEvent); //onClickUseYuanBaoOfSilverBtnEvent
                        /** 金币兑换界面使用元宝兑换 */
                        this._jinBiBuZuViewMediator.once(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.onClickUseYuanBaoBtnEvent);
                    }
                    else {
                        /** 播放选中特效 */
                        this.PlayEffect(this._viewUI.bagGameItem_list, index);
                    }
                    if (itemData.ID != -1) {
                        var parame = new Dictionary();
                        parame.set("itemId", itemData.ID);
                        parame.set("key", itemData.key);
                        parame.set("packid", 1);
                        parame.set("outbattleuse", itemData.outbattleuse); //("packid",1)
                        parame.set("shopid", itemData.shopId);
                        parame.set("number", itemData.number);
                        parame.set("equiptype", itemData.equipType);
                        parame.set("currdepot", this._nowPage);
                        var notShow = true;
                        var access = true;
                        //gameItemImg.on(LEvent.DOUBLE_CLICK,this,this.cTranceItem,[BagTypes.BAG,itemData.key,-1,BagTypes.DEPOT,-1,this._nowPage,-1]);
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, notShow, access);
                    }
                    this._viewUI.bagGameItem_list.selectedIndex = -1;
                };
                BagStoreHouseViewMediator.prototype.onSeletListItemOfStoreHouseItem = function (index) {
                    if (index == -1)
                        return;
                    var itemData = this._storeHouseListData[index];
                    if (itemData.ID != -1) {
                        var parame = new Dictionary();
                        parame.set("itemId", itemData.ID);
                        parame.set("key", itemData.key);
                        parame.set("packid", BagTypes.DEPOT);
                        parame.set("outbattleuse", itemData.outbattleuse); //("packid",1)
                        parame.set("shopid", itemData.shopId);
                        parame.set("number", itemData.number);
                        parame.set("equiptype", itemData.equipType);
                        parame.set("currdepot", this._nowPage);
                        var notShow = true;
                        var access = false;
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, notShow, access);
                    }
                    /** 播放选中特效 */
                    this.PlayEffect(this._viewUI.storeHouse_list, index);
                    this._viewUI.storeHouse_list.selectedIndex = -1;
                };
                ////////////////
                ///事件
                ////////////////
                /**
                 * @describe  注册事件
                 */
                BagStoreHouseViewMediator.prototype.registerEvent = function () {
                    // 界面UI事件
                    this._viewUI.StoreHouse_btn.on(LEvent.MOUSE_DOWN, this, this.clickStoreHouseBtnEvent);
                    this._viewUI.changeStoreHouseName_btn.on(LEvent.MOUSE_DOWN, this, this.clickChangeStoreHouseNameBtnEvent);
                    this._viewUI.upPage_btn.on(LEvent.MOUSE_DOWN, this, this.clickUpPageBtnEvent);
                    this._viewUI.downPage_btn.on(LEvent.MOUSE_DOWN, this, this.clickDownPageEvent);
                    this._viewUI.arrangeBag_btn.on(LEvent.MOUSE_DOWN, this, this.clickArrangeBagEvent);
                    this._viewUI.arrangeStoreHouse_btn.on(LEvent.MOUSE_DOWN, this, this.clickArrangeStoreHouseBtnEvent);
                    // 通讯事件
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.ACCPET_STOREHOUSE_DATA_EVENT, this, this.controlStoreHouseList); //原this.controlStoreHouseList
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.ACCPET_STOREHOUSE_NUM_EVENT, this, this.refreshDepotNum);
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.STOREHOUSE_RENAME_EVENT, this, this.closeStoreHouseViewMediatorEvent);
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.CLOSE_SELETED_STOREHOUSE_EVENT, this, this.seletedStoreHouseEvent);
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.ARRANGE_BAG, this, this.controlBagGameItemList);
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.DEBLOCKING_EVENT, this, this.showRemindViewMediatorEvent);
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.DEPOTNAME_EVENT, this, this.setStoreHouseBtnName);
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.REFRESH_BAG_COUNT, this, this.controlBagGameItemList);
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.REFRESH_BAG_DEPOT_COUNT, this, this.RefreshBagAndDepot);
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.ACCPET_CURRENT_EVENT, this, this.accpetCurrent);
                };
                /**
                 * @describe  点击仓库按钮的事件
                 */
                BagStoreHouseViewMediator.prototype.clickStoreHouseBtnEvent = function () {
                    if (!bagModel.getInstance()._isStoreHouseBtnOpen) {
                        bagModel.getInstance()._isStoreHouseBtnOpen = true;
                        this._bagSelectedViewMediator.show();
                        this.skewStroeHouseSign(true);
                    }
                    else {
                        bagModel.getInstance()._isStoreHouseBtnOpen = false;
                        this._bagSelectedViewMediator.hide();
                        this.skewStroeHouseSign(false);
                    }
                    // this._viewUI.once(LEvent.MOUSE_DOWN,this,this.closeSelectedStoreHouse)
                };
                /**
                 * @describe  修改仓库名称事件
                 */
                BagStoreHouseViewMediator.prototype.clickChangeStoreHouseNameBtnEvent = function () {
                    // 派发事件
                    this._bagStoreHouseRenameViewMediator.onShow(this._nowPage);
                };
                /**
                 * @describe  跳转到上个仓库
                 */
                BagStoreHouseViewMediator.prototype.clickUpPageBtnEvent = function () {
                    this.switchNowPage(ButtonType.UP_BTN);
                };
                /**
                 * @describe  跳转到下一个仓库
                 */
                BagStoreHouseViewMediator.prototype.clickDownPageEvent = function () {
                    this.switchNowPage(ButtonType.DOWN_BTN);
                };
                /**
                 * @describe  整理背包
                 */
                BagStoreHouseViewMediator.prototype.clickArrangeBagEvent = function () {
                    RequesterProtocols._instance.c2s_CList_Pack(BagTypes.BAG, 0);
                };
                /**
                 * @describe  整理仓库事件
                 */
                BagStoreHouseViewMediator.prototype.clickArrangeStoreHouseBtnEvent = function () {
                    // Protocols._instance.c2s_CGetDepot_Info(this._nowPage);
                    // 如果连续点击多次则会有相应的提示
                    //发送当前的编号
                    RequesterProtocols._instance.c2s_CList_Depot(this._nowPage);
                };
                /**
                 * 仓库重命名UI关闭的回调事件
                 * @param storeHouseName 修改仓库的名称
                 * @param isPanel 判断是否关闭修改界面
                 */
                BagStoreHouseViewMediator.prototype.closeStoreHouseViewMediatorEvent = function (isPanel) {
                    //获取服务端传回的消息，修改对应的仓库名称
                    //this.refreshStoreHouseName();
                    if (isPanel == false)
                        return;
                    this._bagStoreHouseRenameViewMediator.hide();
                };
                /**
                 * @describe  选中仓库按钮的回调事件
                 * @describe  选中并加仓库数据
                 * @param pageId   仓库id
                 */
                BagStoreHouseViewMediator.prototype.seletedStoreHouseEvent = function (pageId) {
                    // 传回的List控件下标从0开始
                    pageId += 1;
                    // 关闭seletedUI
                    this.clickStoreHouseBtnEvent();
                    if (this._nowPage != pageId && pageId <= this._totalPage) {
                        this._nowPage = pageId;
                        RequesterProtocols._instance.c2s_CGetDepot_Info(this._nowPage);
                        this.setNowPage(this._nowPage);
                        this.setStoreHouseBtnName(bagModel.getInstance().storeHouseBtnName[this._nowPage - 1].label);
                    }
                };
                /**
                 * @describe  在提示界面(解锁仓库时候)时候的确定按钮事件
                 */
                BagStoreHouseViewMediator.prototype.clickEnSureBtnEvent = function () {
                    if (this._recordRemindViewMediator == BagTypes.DEPOT) {
                        this.clickEnSureBtnOfDeblockingDepotEvnt(BagTypes.DEPOT);
                    }
                    else if (this._recordRemindViewMediator == BagTypes.BAG) {
                        // this.clickEnSureBtnOfDeblockingBagEvnt();
                        this.clickEnSureBtnOfDeblockingDepotEvnt(BagTypes.BAG);
                    }
                    // this._recordRemindViewMediator = -1;
                    /** 移除取消事件 */
                    this._remindViewMediator.off(modules.commonUI.LEFT_BUTTON_EVENT, this, this.clickCancelBtnEvent);
                };
                /**
                 * @describe  解锁仓库和背包按钮时,判断银币是否足够
                 */
                BagStoreHouseViewMediator.prototype.clickEnSureBtnOfDeblockingDepotEvnt = function (type) {
                    var sliverIcon = bag_1.models.BagModel.getInstance().sliverIcon;
                    if (type == BagTypes.BAG) {
                        var diff = this._deblockingBagSilverNumber - sliverIcon;
                    }
                    else if (type == BagTypes.DEPOT) {
                        var diff = this._deblockingSilverNumber - sliverIcon;
                    }
                    if (typeof (diff) == "undefined")
                        return;
                    this._remindViewMediator.hide();
                    // 银币足够
                    if (diff <= 0) {
                        RequesterProtocols._instance.c2s_CExtpack_Size(type);
                        //银币不够，调用银币补助界面
                    }
                    else {
                        var isShowGold = false;
                        var needSilverNumber = game.utils.MoneyU.number2Thousands(diff); //银币500000
                        var needGoldNumber = Math.ceil(diff / bag_1.models.BagModel.getInstance().exchangeRateOfGold).toString(); //game.utils.MoneyU.number2Thousands(diff / models.BagModel.getInstance().exchangeRateOfGold);//金币5000
                        var needYuanBaoNumber = this._deblockingFuShiNumber.toString(); //game.utils.MoneyU.number2Thousands(diff / models.BagModel.getInstance().exchangeRateOfYuanBao);//元宝50
                        this._jinBiBuZuViewMediator.onShow(isShowGold, needSilverNumber, needYuanBaoNumber, needGoldNumber);
                    }
                };
                /**
                 * @describe  刷新背包和仓库数据交互
                 */
                BagStoreHouseViewMediator.prototype.RefreshBagAndDepot = function () {
                    this.controlStoreHouseList(this._nowPage);
                    this.controlBagGameItemList();
                };
                /**
                 * @describe
                 */
                BagStoreHouseViewMediator.prototype.clickCancelBtnEvent = function () {
                    /** 移除右键事件 */
                    this._remindViewMediator.off(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.clickEnSureBtnEvent);
                    this._remindViewMediator.hide();
                };
                /**
                 * @describe  银币补助界面，点击使用金币代替按钮事件
                 */
                BagStoreHouseViewMediator.prototype.onClickUseGoldBtnEvent = function () {
                    /** 玩家拥有的金币 */
                    var Gold = bag_1.models.BagModel.getInstance().globalIcon;
                    switch (this._recordRemindViewMediator) {
                        case BagTypes.BAG:
                            var isEnough = this._deblockingBagGoldNumber - Gold;
                            break;
                        case BagTypes.DEPOT:
                            var isEnough = this._deblockingGoldNumber - Gold;
                            break;
                        default:
                            break;
                    }
                    this._jinBiBuZuViewMediator.hide();
                    if (typeof (isEnough) == "undefined")
                        return;
                    if (isEnough <= 0) /** 金币足够 */ {
                        /** 先请求钱币兑换 -->金币转银币 */
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_GoldCoin, MoneyTypes.MoneyType_SilverCoin, this._deblockingGoldNumber);
                        RequesterProtocols._instance.c2s_CExtpack_Size(this._recordRemindViewMediator);
                    }
                    else {
                        var isShowGold = true;
                        var needSilverNumber = game.utils.MoneyU.number2Thousands(isEnough);
                        var needGoldNumber = Math.ceil(isEnough / bag_1.models.BagModel.getInstance().exchangeRateOfGold).toString(); //game.utils.MoneyU.number2Thousands(isEnough / models.BagModel.getInstance().exchangeRateOfGold);
                        var needYuanBaoNumber = this._deblockingFuShiNumber.toString(); //game.utils.MoneyU.number2Thousands(isEnough / models.BagModel.getInstance().exchangeRateOfYuanBao * 100);
                        this._jinBiBuZuViewMediator.onShow(isShowGold, needSilverNumber, needYuanBaoNumber, needGoldNumber);
                    }
                };
                /**
                 * 金币补足界面，点击使用元宝代替按钮事件
                 */
                BagStoreHouseViewMediator.prototype.onClickUseYuanBaoBtnEvent = function () {
                    /** 玩家拥有的符石数 */
                    var FuShi_Num = bag_1.models.BagModel.getInstance().yuanbaoIcon;
                    switch (this._recordRemindViewMediator) {
                        case BagTypes.BAG:
                            var isEnough = this._deblockingBagFuShiNumber - FuShi_Num;
                            break;
                        case BagTypes.DEPOT:
                            var isEnough = this._deblockingFuShiNumber - FuShi_Num;
                            break;
                        default:
                            break;
                    }
                    this._jinBiBuZuViewMediator.hide();
                    if (typeof (isEnough) == "undefined")
                        return;
                    if (isEnough <= 0) /** 符石足够 */ {
                        /** 先请求钱币兑换 -->符石转金币 */
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, this._deblockingFuShiNumber);
                        // RequesterProtocols._instance.c2s_CExtpack_Size(this._recordRemindViewMediator);
                    }
                    else {
                        var prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                        this._remindViewMediator.onShow(prompto);
                        this._remindViewMediator.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                        this._remindViewMediator.once(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    }
                };
                /**
                 * @describe  银币补足界面，点击使用符石兑换按钮事件
                 */
                BagStoreHouseViewMediator.prototype.onClickUseYuanBaoOfSilverBtnEvent = function () {
                    /** 玩家拥有的符石数 */
                    var FuShi_Num = bag_1.models.BagModel.getInstance().yuanbaoIcon;
                    switch (this._recordRemindViewMediator) {
                        case BagTypes.BAG:
                            var isEnough = this._deblockingBagFuShiNumber - FuShi_Num;
                            break;
                        case BagTypes.DEPOT:
                            var isEnough = this._deblockingFuShiNumber - FuShi_Num;
                            break;
                        default:
                            break;
                    }
                    this._jinBiBuZuViewMediator.hide();
                    if (typeof (isEnough) == "undefined")
                        return;
                    if (isEnough <= 0) /** 符石足够 */ {
                        /** 先请求钱币兑换 -->符石转银币 */
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_SilverCoin, this._deblockingFuShiNumber);
                        RequesterProtocols._instance.c2s_CExtpack_Size(this._recordRemindViewMediator);
                    }
                    else {
                        var prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                        this._remindViewMediator.onShow(prompto);
                        this._remindViewMediator.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                        this._remindViewMediator.once(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    }
                };
                /**
                 * 点击进行仓库和背包里的数据交换请求
                 */
                BagStoreHouseViewMediator.prototype.cTranceItem = function (Id, itemKey, num, saveType, dstPos, depotId, npcId, index) {
                    /** 加一层判断 从仓库来数据可能是错的*/
                    if (Id == BagTypes.DEPOT) {
                        var itemId = this._storeHouseListData[index].ID;
                        /**当前仓库没有所选道具  */
                        if (itemId == -1)
                            return;
                    }
                    /** 将当前所在的仓库存入Model中 */
                    bagModel.getInstance().currDepotId = this._nowPage;
                    depotId = this._nowPage;
                    if (Id == BagTypes.DEPOT)
                        depotId == -1;
                    RequesterProtocols._instance.c2s_CTrans_Item(Id, itemKey, num, saveType, dstPos, depotId, npcId);
                };
                /** 跳到充值界面 */
                BagStoreHouseViewMediator.prototype.jumpToCharge = function () {
                    /** 移除左键事件 */
                    this._remindViewMediator.off(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    /** 跳转到充值界面 */
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                    modules.ModuleManager.hide(modules.ModuleNames.BAG);
                    LoginModel.getInstance().CommonPage = "Bag";
                };
                /** 取消不跳转 */
                BagStoreHouseViewMediator.prototype.cancleToJump = function () {
                    /** 移除右键事件 */
                    this._remindViewMediator.off(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                    this._remindViewMediator.hide();
                };
                ////////////////
                ///UI
                ////////////////
                /**
                  * @describe  控制storeHouse_list
                  */
                BagStoreHouseViewMediator.prototype.controlStoreHouseList = function (pageId) {
                    this.refreshDepotNum(false);
                    this._viewUI.storeHouse_list.spaceX = 5;
                    this._viewUI.storeHouse_list.spaceY = 5;
                    this._viewUI.storeHouse_list.repeatX = 5;
                    this._viewUI.storeHouse_list.repeatY = this._storeHouseGameItemNumber / this._viewUI.storeHouse_list.repeatX;
                    this.getStoreHoustGameItemListData(pageId);
                    this.listScrollOfStoreHouse(this._viewUI.storeHouse_list);
                };
                /**
                 * @describe  控制myGameItem_list
                 */
                BagStoreHouseViewMediator.prototype.controlBagGameItemList = function () {
                    if (bag_1.models.BagModel.getInstance().actBagNum < 100)
                        this._bagGameItemListLength = bag_1.models.BagModel.getInstance().actBagNum + 10;
                    else {
                        this._bagGameItemListLength = bag_1.models.BagModel.getInstance().actBagNum;
                        this.bagLatticereachUpperLimit = true;
                    }
                    this._viewUI.bagGameItem_list.spaceX = 5;
                    this._viewUI.bagGameItem_list.spaceY = 5;
                    //每次滑动，系统会自行计算
                    this._viewUI.bagGameItem_list.repeatX = 5;
                    this._viewUI.bagGameItem_list.repeatY = this._bagGameItemListLength / this._viewUI.bagGameItem_list.repeatX;
                    this.getBagGameItemListData(BagTypes.BAG);
                    this.listScrollOfBagGameItem(this._viewUI.bagGameItem_list);
                };
                /**
                 * @describe  设置当前总共的仓库数量
                 * @param num 总共的仓库数量
                 */
                BagStoreHouseViewMediator.prototype.setTotalPage = function (num) {
                    this._viewUI.pages_lab.text = num.toString();
                };
                /**
                 * @describe  设置当前的仓库数
                 * @param num   当前的仓库
                 */
                BagStoreHouseViewMediator.prototype.setNowPage = function (num) {
                    this._viewUI.nowPage_lab.text = num.toString();
                };
                /**
                 * @describe  仓库按钮上的三角形图片翻转
                 * @param bool   是否翻，转默认false为down状态
                 */
                BagStoreHouseViewMediator.prototype.skewStroeHouseSign = function (bool) {
                    if (bool) {
                        this._viewUI.stroeHouseSign_img.skewX = 180;
                    }
                    else {
                        this._viewUI.stroeHouseSign_img.skewX = 0;
                    }
                };
                /**
                 * @describe  设置当前所在仓库
                 * @param type 按钮类型
                 */
                BagStoreHouseViewMediator.prototype.switchNowPage = function (type) {
                    switch (type) {
                        case ButtonType.UP_BTN:
                            this._nowPage -= 1;
                            break;
                        case ButtonType.DOWN_BTN:
                            this._nowPage += 1;
                            break;
                        default:
                            console.log("BagsStoreHouseViewMediator file setNowPageNumber function error ");
                            break;
                    }
                    if (this._nowPage > this._totalPage) {
                        this._nowPage = 1;
                    }
                    else if (this._nowPage < 1) {
                        this._nowPage = this._totalPage;
                    }
                    RequesterProtocols._instance.c2s_CGetDepot_Info(this._nowPage);
                    //切换list
                    // this.controlStoreHouseList(this._nowPage-1)
                    this.setNowPage(this._nowPage);
                    this.setStoreHouseBtnName(bagModel.getInstance().storeHouseBtnName[this._nowPage - 1].label);
                };
                /**
                 * @describe  设置仓库名称
                 * @param name   仓库名
                 */
                BagStoreHouseViewMediator.prototype.setStoreHouseBtnName = function (name) {
                    this._viewUI.StoreHouse_btn.label = name;
                };
                /**
                 * 刷新倉庫數量
                 * @param isTips 是否弹窗刷新仓库
                 */
                BagStoreHouseViewMediator.prototype.refreshDepotNum = function (isTips) {
                    if (isTips === void 0) { isTips = true; }
                    var depotNumber = game.modules.bag.models.BagModel.getInstance().depotnameinfo.keys.length; //0
                    this._totalPage = depotNumber > 0 ? depotNumber + FREE_STOREHOUSE_NUMBER : FREE_STOREHOUSE_NUMBER;
                    this.setTotalPage(this._totalPage);
                    /** 初始化倉庫 */
                    game.modules.bag.models.BagModel.getInstance().getDepotNumber();
                    if (!isTips)
                        return;
                    var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[PromptExplain.DEPOT_HOUSE_UNLOCK];
                    // let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    // disappearMsgTips.onShow(chattext.msg);
                    modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, chattext.msg);
                };
                /** 播放特效 */
                BagStoreHouseViewMediator.prototype.PlayEffect = function (list, index) {
                    var cell = list.getCell(index);
                    var selectItem = cell.getChildByName("gameItemBg_img");
                    this.ani.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onCreateFrame));
                    selectItem.addChild(this.ani);
                    this.ani.scaleX = 0.9;
                    this.ani.scaleY = 0.9;
                };
                /** 创建动画 */
                BagStoreHouseViewMediator.prototype.onCreateFrame = function () {
                    var effecthPath = bagModel.getInstance().getEffectUrls("xuanzhong", 9);
                    Laya.Animation.createFrames(effecthPath, "xuanzhong");
                    this.ani.play(0, true, "xuanzhong");
                    this.ani.interval = 112;
                };
                /**修改完成仓库名字飘窗 */
                BagStoreHouseViewMediator.prototype.accpetCurrent = function () {
                    var prompt = HudModel.getInstance().promptAssembleBack(162176);
                    var disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    disappearMsgTips.onShow(prompt);
                };
                return BagStoreHouseViewMediator;
            }(game.modules.UiMediator));
            bag_1.BagStoreHouseViewMediator = BagStoreHouseViewMediator;
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BagStoreHouseViewMediator.js.map