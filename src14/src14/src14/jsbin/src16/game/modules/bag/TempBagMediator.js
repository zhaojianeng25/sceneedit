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
            /** 临时背包最大格子数 */
            bag_1.Temp_BAG_MAX_NUM = 15;
            var TempBagMediator = /** @class */ (function (_super) {
                __extends(TempBagMediator, _super);
                function TempBagMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    // 仓库按钮是否解锁，名称等数据
                    _this._tempBagListData = [];
                    /**临时背包中道具数据*/
                    _this._bagGameItemListData = [];
                    _this._viewUI = new ui.common.BagTemporaryUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this._app = app;
                    return _this;
                }
                TempBagMediator.prototype.onLoad = function () {
                    this.controlTempBagList();
                    this.registBtnEvent();
                };
                // 实现的接口
                TempBagMediator.prototype.show = function () {
                    this.onLoad();
                    _super.prototype.show.call(this);
                };
                /** 初始化点击事件 */
                TempBagMediator.prototype.registBtnEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.oneKeyBack_btn.on(LEvent.MOUSE_DOWN, this, this.oneKeyBack);
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.REFRESH_BAG_COUNT, this, this.controlTempBagList);
                };
                /** 一键取回 */
                TempBagMediator.prototype.oneKeyBack = function () {
                    /** 物品key,-1表示所有物品 */
                    var srckey = 1;
                    /** 数量,-1表示全部 */
                    var number = 1;
                    /** 目标位置,-1,自动选择 */
                    var dstpos = 1;
                    /**  */
                    var npcid = 1;
                    RequesterProtocols._instance.c2s_COneKeyMoveTempTo_Bag(srckey, number, dstpos, npcid);
                    bag.models.BagProxy.getInstance().once(bag.models.REFRESH_TEMP_BAG, this, this.hide);
                };
                TempBagMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                TempBagMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                //UI 特效控制 获取UI中属性
                /**
                 * @describe  控制滚动列表
                 */
                TempBagMediator.prototype.controlTempBagList = function () {
                    this._viewUI.tempbag_list.spaceX = 5;
                    this._viewUI.tempbag_list.spaceY = 5;
                    this.getTempBagistData();
                    this._viewUI.tempbag_list.repeatX = 5;
                    this._viewUI.tempbag_list.repeatY = 3;
                    this.listScroll(this._viewUI.tempbag_list);
                };
                /**
                 * @describe  获取临时背包list数据
                 */
                TempBagMediator.prototype.getTempBagistData = function () {
                    var bag = BagModel.getInstance().getBagGameItemData(BagTypes.TEMP);
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
                    this._bagGameItemListPos = new Laya.Dictionary();
                    //插入Item到arr数组
                    for (var index = 0; index < items.length; index++) {
                        // let id = bag.getItem(index).id;
                        var id = items[index].id;
                        this._bagGameItemListPos.set(id, items[index].key);
                        var obj = BagModel.getInstance().getItemAttrData(id);
                        try {
                            var equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
                        }
                        catch (error) {
                            equipType = -1;
                        }
                        var icon = obj.icon;
                        var nquality = obj.nquality;
                        var outbattleuse = obj.outbattleuse;
                        var number = items[index].number;
                        var pos_1 = items[index].position;
                        var key = bag.items[index].key;
                        var shopId = obj.bCanSaleToNpc;
                        // equipType = typeof(equipType) == "undefined"?-1:equipType;
                        listItem = {
                            ID: id,
                            icon: icon,
                            number: number,
                            position: pos_1,
                            nquality: nquality,
                            isLock: false,
                            key: key,
                            equipType: equipType,
                            outbattleuse: outbattleuse,
                            shopId: shopId,
                        };
                        arr.push(listItem);
                        posArray.push(pos_1);
                    }
                    for (var index = 0; index < bag_1.Temp_BAG_MAX_NUM; index++) {
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
                                equipType: -1,
                                outbattleuse: -1,
                                shopId: -1,
                            };
                        }
                        this._bagGameItemListData.push(listItem);
                    }
                    this._viewUI.tempbag_list.array = this._bagGameItemListData;
                };
                /**
                 * @describe  List控件的滚动回弹效果
                 * @param list  list控件
                 */
                TempBagMediator.prototype.listScroll = function (list) {
                    list.selectEnable = true;
                    list.renderHandler = new Handler(this, this.onRenderListItem);
                    list.selectHandler = new Handler(this, this.onSelectedListItem);
                };
                /**
                 * @describe 渲染List中的单元格
                 * @param cell  Laya.Box
                 * @param index  number
                 */
                TempBagMediator.prototype.onRenderListItem = function (cell, index) {
                    if (index >= this._tempBagListDataLength)
                        return;
                    var itemData = this._bagGameItemListData[index];
                    var gameItemBgImg = cell.getChildByName("gameItemBg_img");
                    var gameItemImg = cell.getChildByName("gameItem_Img");
                    var gameItemNumberLabel = cell.getChildByName("gameItemNumber_lab");
                    var zhenpin_img = cell.getChildByName("zhenpin_img");
                    if (itemData.ID != -1) {
                        gameItemNumberLabel.visible = true;
                        var str = itemData.number > 1 ? itemData.number.toString() : "";
                        gameItemBgImg.skin = bag_1.BagSystemModule.getGameItemFrameColorResource(itemData.nquality);
                        gameItemImg.skin = "common/icon/item/" + itemData.icon + ".png";
                        gameItemNumberLabel.changeText(str);
                        zhenpin_img.visible = false;
                        // if(itemData.equipType != -1) gameItemImg.on(LEvent.DOUBLE_CLICK,this,this.opEquip,[OpEquip.PUTON,itemData.key,itemData.equipType]);
                    }
                    else {
                        gameItemBgImg.skin = "common/ui/tongyong/kuang94.png";
                        gameItemImg.skin = "";
                        gameItemNumberLabel.visible = false;
                        zhenpin_img.visible = false;
                    }
                };
                /**
                 * @describe 选中仓库下标时判断事件
                 * @param cell  Laya.Box
                 * @param index  number
                 */
                TempBagMediator.prototype.onSelectedListItem = function (index) {
                    if (index == -1)
                        return;
                    var itemData = this._bagGameItemListData[index];
                    if (itemData.ID != -1) {
                        var parame = new Dictionary();
                        parame.set("itemId", itemData.ID);
                        parame.set("key", itemData.key);
                        parame.set("packid", BagTypes.TEMP);
                        parame.set("outbattleuse", itemData.outbattleuse); //("packid",1)
                        parame.set("shopid", itemData.shopId);
                        parame.set("number", itemData.number);
                        parame.set("equiptype", itemData.equipType);
                        parame.set("purposetype", ItemPurpose.ITEM_TRANSFER);
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame);
                    }
                    this._viewUI.tempbag_list.selectedIndex = -1;
                };
                return TempBagMediator;
            }(game.modules.UiMediator));
            bag_1.TempBagMediator = TempBagMediator;
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TempBagMediator.js.map