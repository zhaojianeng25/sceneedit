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
/** 出售比 */
var SELLING_RATIO = 535 / 642;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var bag;
        (function (bag_1) {
            var BagSaleViewMediator = /** @class */ (function (_super) {
                __extends(BagSaleViewMediator, _super);
                function BagSaleViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**是否选中需要出售的道具 */
                    _this._isSelectedGameItem = false;
                    /**出售道具的List控件数据 */
                    _this._saleGameItemListData = [];
                    _this._viewUI = new ui.common.BagSaleUI;
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this.keyNumDic = new Dictionary();
                    _this.GoodsData = new Laya.Dictionary();
                    _this._app = app;
                    for (var key in ShopModel.getInstance().GoodsBinDic) {
                        _this.GoodsData.set(key, ShopModel.getInstance().GoodsBinDic[key].limitSaleNum);
                    }
                    _this._XiaoJianPanMediator = new modules.tips.XiaoJianPanMediator(_this._viewUI);
                    _this.ani = new Laya.Animation();
                    return _this;
                }
                BagSaleViewMediator.prototype.show = function () {
                    // 等待商城模块的完成
                    // Protocols._instance.c2s_requst_shopprice()
                    this.onLoad();
                    _super.prototype.show.call(this);
                };
                BagSaleViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                //属性的设置和获取
                BagSaleViewMediator.prototype.getOwnSliverNumber = function () {
                    return this._ownSliverNumber;
                };
                BagSaleViewMediator.prototype.onLoad = function () {
                    this.zeroSaleNumberAndGetSilver();
                    this.registerEvent();
                    this.showMoney();
                    //初始化小键盘map
                    this.keyNumDic.set(1, "");
                    //通过事件的形式，接受到价格的数据才调用该函数
                    this.controlGameItemList();
                    /** 播放选中特效 */
                    if (this._saleGameItemListData.length != 0) {
                        this._viewUI.gameItem_list.selectedIndex = 0;
                        this.PlayEffect(this._viewUI.gameItem_list, 0); //默认选中第一个物品
                    }
                };
                /**
                 * @describe  计算并显示获得的银币数量
                 * @param num  出售数量
                 */
                BagSaleViewMediator.prototype.calculateAndShowSilverNumber = function (num) {
                    var total = num * parseInt(this._gameItemPrice.toFixed(0));
                    this.setSaleGameItemNumber(num);
                    this.setSilverNumber(total);
                };
                // /**
                //  * @describe  出售后的该玩家拥有的银币数量
                //  */
                // private calculateAndShowOwnSilverNumber() {
                //     this._viewUI.gameItem_list.selectedIndex = -1;
                //     this._ownSliverNumber += this._getSilverNumber;
                //     this.setOwnSilverNumber(this._ownSliverNumber); 
                //     //置空
                // }
                /**
                 * @describe  List控件的滚动回弹效果
                 * @param list  list控件
                 */
                BagSaleViewMediator.prototype.listScroll = function (list) {
                    list.vScrollBarSkin = "";
                    list.scrollBar.elasticBackTime = 200;
                    list.scrollBar.elasticDistance = 50;
                    list.selectEnable = true;
                    list.renderHandler = new Handler(this, this.onRenderListItem);
                    //list.selectHandler = new Handler(this,this.onSelectListItem);
                    list.selectHandler = new Handler(this, this.onShowSelectEffect);
                };
                /** 播放选中特效 */
                BagSaleViewMediator.prototype.onShowSelectEffect = function (index) {
                    if (index != -1) {
                        this.PlayEffect(this._viewUI.gameItem_list, index);
                    }
                };
                /**
                 * @describe  获取出售的道具内容
                 */
                BagSaleViewMediator.prototype.getSaleGameItemListData = function () {
                    var bag = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
                    if (!bag)
                        return;
                    this._saleGameItemListData = [];
                    this._saleGameItemListLength = bag.items.length;
                    var listItem;
                    this._bagGameItemListPos = new Laya.Dictionary();
                    for (var index = 0; index < this._saleGameItemListLength; index++) {
                        var id = bag.items[index].id;
                        this._bagGameItemListPos.set(id, bag.items[index].key);
                        var obj = BagModel.getInstance().getItemAttrData(id);
                        if (obj.bCanSaleToNpc != 0) {
                            var icon = obj.icon;
                            var shopId = obj.bCanSaleToNpc;
                            var nquality = obj.nquality;
                            var number = bag.items[index].number;
                            var key = bag.items[index].key;
                            var outbattleuse = obj.outbattleuse;
                            try {
                                var equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
                            }
                            catch (error) {
                                equipType = -1;
                            }
                            //匹配一下Id，读出对应的价格
                            var Goods = bagModel.getInstance().getGoods.get(shopId);
                            var price = void 0;
                            if (Goods == null) {
                                var data_1 = ShopModel.getInstance().GoodsBinDic[shopId];
                                price = data_1.prices[0];
                            }
                            else
                                price = Goods.price;
                            if (typeof (price) != "undefined") {
                                price = SELLING_RATIO * price;
                            }
                            var position = bag.items[index].position;
                            listItem = {
                                ID: id,
                                icon: icon,
                                number: number,
                                position: position,
                                shopId: shopId,
                                nquality: nquality,
                                price: price,
                                key: key,
                                outbattleuse: outbattleuse,
                                equipType: equipType,
                            };
                            this._saleGameItemListData.push(listItem);
                        }
                    }
                    this._viewUI.gameItem_list.array = this._saleGameItemListData;
                };
                /**
                 * @describe 渲染List中的单元格
                 * @param cell  Laya.Box
                 * @param index  number
                 */
                BagSaleViewMediator.prototype.onRenderListItem = function (cell, index) {
                    if (index > this._saleGameItemListLength)
                        return;
                    var itemData = this._saleGameItemListData[index];
                    var gameItemBgImg = cell.getChildByName("gameItemBg_img");
                    var gameItemImg = cell.getChildByName("gameItem_Img");
                    var gameItemNumberLabel = cell.getChildByName("gameItemNumber_lab");
                    if (itemData != null) {
                        var str = itemData.number > 1 ? itemData.number.toString() : "";
                        gameItemNumberLabel.visible = true;
                        gameItemBgImg.skin = bag_1.BagSystemModule.getGameItemFrameColorResource(itemData.nquality);
                        gameItemImg.skin = "common/icon/item/" + itemData.icon + ".png";
                        // gameItemImg.on(LEvent.MOUSE_DOWN,this,this.downSelect,[cell]);
                        gameItemNumberLabel.changeText(str);
                        gameItemImg.on(LEvent.CLICK, this, this.onSelectListItem, [index]);
                    }
                    else {
                        gameItemBgImg.skin = "";
                        gameItemImg.skin = "";
                        gameItemNumberLabel.visible = false;
                    }
                };
                /** 选中物品 */
                BagSaleViewMediator.prototype.downSelect = function (cell) {
                    this.listScroll(this._viewUI.gameItem_list);
                    var flagImg = cell.getChildByName("selectFlag_img");
                    flagImg.visible = true;
                };
                /**
                 * @describe  选择到List中的单元格
                 * @param cell  Laya.Box
                 * @param index  number
                 */
                BagSaleViewMediator.prototype.onSelectListItem = function (index, e) {
                    if (index == -1)
                        return;
                    this._isSelectedGameItem = true;
                    // 点击道具，显示对应的价格
                    var itemData = this._saleGameItemListData[index];
                    this._isCanSaleGameItemNumber = itemData.number;
                    this._gameItemPrice = itemData.price;
                    this._gameItemId = itemData.ID;
                    this._gameItemShopId = itemData.shopId;
                    this._selectedGameItemPosition = itemData.position;
                    // 出售数量1
                    this.calculateAndShowSilverNumber(1);
                    var arr = [];
                    arr.push(this._gameItemShopId);
                    var type = queryType.SHOP_SALE_TIMES;
                    /** 请求商品限购数 */
                    this._XiaoJianPanMediator.getgoodsLimit(type, arr);
                    if (itemData.ID != -1) {
                        var parame = new Dictionary();
                        parame.set("itemId", itemData.ID);
                        parame.set("key", itemData.key);
                        parame.set("packid", 1);
                        parame.set("outbattleuse", itemData.outbattleuse); //("packid",1)
                        parame.set("shopid", itemData.shopId);
                        parame.set("number", itemData.number);
                        parame.set("equiptype", itemData.equipType);
                        var ratiox = (index + 1) % 5;
                        ratiox = ratiox == 0 ? 5 : ratiox;
                        var radioy = (index + 1) / 5;
                        if (index <= 4) {
                            radioy = 1;
                        }
                        else if (radioy == 0) {
                            radioy = ratiox;
                        }
                        else
                            radioy += 1;
                        parame.set("xpos", (e.currentTarget.mouseX + (ratiox * 30)));
                        parame.set("ypos", (e.currentTarget.mouseY + (radioy * 90) + 130));
                        new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, true);
                    }
                    this._viewUI.gameItem_list.selectedIndex = -1;
                };
                /** 播放特效 */
                BagSaleViewMediator.prototype.PlayEffect = function (list, index) {
                    var cell = list.getCell(index);
                    var selectItem = cell.getChildByName("gameItemBg_img");
                    this.ani.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onCreateFrame));
                    selectItem.addChild(this.ani);
                    this.ani.scaleX = 0.9;
                    this.ani.scaleY = 0.9;
                };
                /** 创建动画 */
                BagSaleViewMediator.prototype.onCreateFrame = function () {
                    var effecthPath = bagModel.getInstance().getEffectUrls("xuanzhong", 9);
                    Laya.Animation.createFrames(effecthPath, "xuanzhong");
                    this.ani.play(0, true, "xuanzhong");
                    this.ani.interval = 112;
                };
                /**
                 * @describe  置空数量、获得的银币
                 */
                BagSaleViewMediator.prototype.zeroSaleNumberAndGetSilver = function () {
                    // this._isSelectedGameItem = false;
                    this.setSaleGameItemNumber(0);
                    this.setSilverNumber(0);
                };
                /**
                 * @describe  拥有的银币初始值
                 */
                BagSaleViewMediator.prototype.showMoney = function () {
                    var money = bag_1.models.BagModel.getInstance().sliverIcon;
                    if (isNaN(money)) {
                        money = 0;
                    }
                    this.setOwnSilverNumber(money);
                };
                /**
                 * @describe  注册事件
                 */
                BagSaleViewMediator.prototype.registerEvent = function () {
                    this._viewUI.add_btn.on(LEvent.MOUSE_DOWN, this, this.clickAddBtnEvent);
                    this._viewUI.less_btn.on(LEvent.MOUSE_DOWN, this, this.clickLessBtnEvent);
                    this._viewUI.inputSaleNumber_btn.on(LEvent.MOUSE_DOWN, this, this.clickInputSaleNumberBtnEvent);
                    this._viewUI.saleGameItem_btn.on(LEvent.MOUSE_DOWN, this, this.clickSaleGameItemBtnEvent);
                    this._viewUI.inputSaleNumber_btn.on(LEvent.MOUSE_DOWN, this, this._opXiaoJianPan);
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.REFRESH_CURRENCY_EVENT, this, this.showMoney);
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.REFRESH_SALE_COUNT, this, this.controlGameItemList);
                };
                /** 打开小键盘事件 */
                BagSaleViewMediator.prototype._opXiaoJianPan = function () {
                    if (!this._isSelectedGameItem)
                        return;
                    this._XiaoJianPanMediator.show();
                    modules.tips.models.TipsProxy.getInstance().on(modules.tips.models.ON_KRYBOARD, this, this.onKeyInNum);
                };
                /**
                 * describe 接收小键盘输入
                 * @param num  接收的小键盘值
                 */
                BagSaleViewMediator.prototype.onKeyInNum = function (num) {
                    if (num != -2) {
                        //点击清除按钮
                        if (num == -1) {
                            var str = this.keyNumDic.get(1);
                            if (str.length == 1) {
                                str = (num + 2).toString();
                                this.keyNumDic.set(1, "");
                            }
                            else if (str.length == 2) {
                                str = str.substring(0, str.length - 1);
                                this.keyNumDic.set(1, str);
                            }
                            else
                                return;
                            this._viewUI.saleGameItemNumber_lab.text = str;
                        }
                        else {
                            //输入两位数
                            var str = this.keyNumDic.get(1);
                            var goodsSaleNum = ShopModel.getInstance().goodsSaleLimit.get(this._gameItemShopId);
                            /** 剩余出售数 */
                            goodsSaleNum = this.GoodsData.get(this._gameItemShopId) - goodsSaleNum;
                            // if(str.length<1)
                            // {/** 个位数 */
                            if (num == 0 && str.length == 0)
                                return;
                            str += num.toString();
                            if (parseInt(str) >= goodsSaleNum && goodsSaleNum <= this._isCanSaleGameItemNumber) { /** 限售数最小 */
                                if (goodsSaleNum == 0)
                                    goodsSaleNum = 1;
                                this._saleGameItemNumber = goodsSaleNum;
                                str = goodsSaleNum.toString();
                                /** 飘窗提醒 */
                                var prompt_1 = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                                this.disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                                this.disappearMessageTipsMediator.onShow(prompt_1);
                            }
                            else if (parseInt(str) >= this._isCanSaleGameItemNumber) { /** 物品数最小 */
                                this._saleGameItemNumber = this._isCanSaleGameItemNumber;
                                str = this._saleGameItemNumber.toString();
                                /** 飘窗提醒 */
                                var prompt_2 = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                                this.disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                                this.disappearMessageTipsMediator.onShow(prompt_2);
                            }
                            else { /** 输入值最小 */
                                this._saleGameItemNumber = parseInt(str);
                            }
                            this.keyNumDic.set(1, str);
                            var unitPrice = this._gameItemPrice.toFixed(0);
                            this._viewUI.silverNumber_lab.text = (parseInt(str) * parseInt(unitPrice)).toString();
                            this._viewUI.saleGameItemNumber_lab.text = str;
                        }
                    }
                    else {
                        //关闭小键盘，清空记录
                        this.keyNumDic.set(1, "");
                    }
                };
                /**
                 * @describe  增加1个出售道具的事件
                 */
                BagSaleViewMediator.prototype.clickAddBtnEvent = function () {
                    if (this._isSelectedGameItem && (this._saleGameItemNumber < this._isCanSaleGameItemNumber)) {
                        this._saleGameItemNumber = this._saleGameItemNumber + 1;
                        this.setSaleGameItemNumber(this._saleGameItemNumber);
                        this.calculateAndShowSilverNumber(this._saleGameItemNumber);
                    }
                };
                /**
                 * @describe  减少1ge出售道具的事件
                 */
                BagSaleViewMediator.prototype.clickLessBtnEvent = function () {
                    if (this._isSelectedGameItem && this._saleGameItemNumber > 1) {
                        this._saleGameItemNumber = this._saleGameItemNumber - 1;
                        this.setSaleGameItemNumber(this._saleGameItemNumber);
                        this.calculateAndShowSilverNumber(this._saleGameItemNumber);
                    }
                };
                /**
                 * @describe  点击出售数量按钮，数字键盘输入
                 */
                BagSaleViewMediator.prototype.clickInputSaleNumberBtnEvent = function () {
                };
                /**
                 * @describe  出售道具事件
                 */
                BagSaleViewMediator.prototype.clickSaleGameItemBtnEvent = function () {
                    var goodsSaleNum = ShopModel.getInstance().goodsSaleLimit.get(this._gameItemShopId);
                    goodsSaleNum = this.GoodsData.get(this._gameItemShopId) - goodsSaleNum;
                    if (this._isSelectedGameItem && this._saleGameItemNumber > 0 && goodsSaleNum > 0) {
                        var shopid = 5;
                        var itemkey = this._bagGameItemListPos.get(this._gameItemId); //背包中的位置
                        //goodlist的数值要从商城模块读取
                        /** 商品ID不是物品Id = = */
                        var goodsid = this._gameItemShopId;
                        var num = this._saleGameItemNumber;
                        var buytype = 5;
                        RequesterProtocols._instance.c2s_chamber_ofcommerceshop(shopid, itemkey, goodsid, num, buytype);
                        // 置空
                        this.zeroSaleNumberAndGetSilver();
                        // this._isSelectedGameItem = false;
                        this._viewUI.gameItem_list.selectedIndex = -1;
                        // this.calculateAndShowOwnSilverNumber();
                    }
                    else if (goodsSaleNum == 0 && this._isSelectedGameItem) { /** 商品出售达到上限 */
                        this.disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        var param = [];
                        param.push(this.GoodsData.get(this._gameItemShopId));
                        var prompt_3 = HudModel.getInstance().promptAssembleBack(PromptExplain.SALE_FULL_TIMES, param);
                        this.disappearMessageTipsMediator.onShow(prompt_3);
                        console.log("商品出售达到上限...................................");
                    }
                };
                ////////////////
                ///UI
                ////////////////
                /**
                 * @describe  控制GameItem_list
                 */
                BagSaleViewMediator.prototype.controlGameItemList = function () {
                    var itemNumber = 1;
                    this._viewUI.gameItem_list.spaceX = 5;
                    this._viewUI.gameItem_list.spaceY = 5;
                    this.getSaleGameItemListData();
                    this.listScroll(this._viewUI.gameItem_list);
                };
                /**
                 * @describe  设置出售道具的数量
                 * @param saleNumber   数量
                 */
                BagSaleViewMediator.prototype.setSaleGameItemNumber = function (saleNumber) {
                    this._saleGameItemNumber = saleNumber;
                    this._viewUI.saleGameItemNumber_lab.text = saleNumber.toString();
                };
                /**
                 * @describe  获得的银币
                 * @param coinNumber  数量
                 */
                BagSaleViewMediator.prototype.setSilverNumber = function (coinNumber) {
                    this._getSilverNumber = coinNumber;
                    this._viewUI.silverNumber_lab.text = game.utils.MoneyU.number2Thousands(coinNumber);
                };
                /**
                 * @describe
                 * @param coinNumber   拥有的银币
                 */
                BagSaleViewMediator.prototype.setOwnSilverNumber = function (coinNumber) {
                    this._ownSliverNumber = coinNumber;
                    this._viewUI.ownSilverNumber_lab.text = game.utils.MoneyU.number2Thousands(coinNumber);
                };
                BagSaleViewMediator.prototype.hide = function () {
                    /** 移除通讯事件 */
                    _super.prototype.hide.call(this);
                    if (this.ani)
                        this.ani.clear();
                };
                return BagSaleViewMediator;
            }(game.modules.UiMediator));
            bag_1.BagSaleViewMediator = BagSaleViewMediator;
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BagSaleViewMediator.js.map