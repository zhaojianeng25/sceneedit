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
        var commonUI;
        (function (commonUI) {
            /** 神兽兑换 */
            var ShopYaoHunYuMediator = /** @class */ (function (_super) {
                __extends(ShopYaoHunYuMediator, _super);
                function ShopYaoHunYuMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 存放神兽列表数据的数组 */
                    _this.shenShouLstDataArr = [];
                    /** 存放购买神兽所需消耗的道具数量 */
                    _this.costItemNumDic = new Laya.Dictionary();
                    /** 存放购买神兽所对应的商品id */
                    _this.shenshouShopIdDic = new Laya.Dictionary();
                    /** 被选中选项 */
                    _this.selectedIndex = -1;
                    _this._viewUI = new ui.common.ShopYaoHunYuUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this._modelConfig = modules.createrole.models.LoginModel.getInstance().cnpcShapeInfo;
                    return _this;
                }
                ShopYaoHunYuMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.registEvent();
                    this.init();
                };
                /** 初始化 */
                ShopYaoHunYuMediator.prototype.init = function () {
                    this._viewUI.shenShou_btn.selected = true;
                    this._viewUI.spendMoney_img.skin = "common/icon/item/20073.png";
                    this._viewUI.haveMoney_img.skin = "common/icon/item/20073.png";
                    this.showHaveMoney();
                    this._viewUI.haveYaoHunYu_lab.stroke = 0;
                    //神兽数据初始化
                    this.shenshouDataInit();
                    //神兽列表初始化
                    this.shenShouLstInit();
                };
                /** 显示身上所持有的妖魂玉道具数量 */
                ShopYaoHunYuMediator.prototype.showHaveMoney = function () {
                    var _haveYaoHunYu = BagModel.getInstance().chargeItemNum(101422); //获取人物身上持有的妖魂玉的数量
                    this._viewUI.haveYaoHunYu_lab.text = _haveYaoHunYu.toString();
                };
                /** 神兽数据初始化 */
                ShopYaoHunYuMediator.prototype.shenshouDataInit = function () {
                    var _cShenShouShop = ShopModel.getInstance().cShenShouShop; //神兽商店表
                    var _GoodsBinDic = ShopModel.getInstance().GoodsBinDic; //商品表
                    var _goodsids = _cShenShouShop[1]["goodsids"]; //现阶段只有一行数据，直接写死
                    var _petAttrData = PetModel.getInstance().petCPetAttrData; //宠物数据表
                    for (var i = 0; i < _goodsids.length; i++) {
                        var _shenshouId = _GoodsBinDic[_goodsids[i]]["itemId"];
                        this.shenShouLstDataArr.push(_petAttrData[_shenshouId]);
                        this.costItemNumDic.set(_shenshouId, _GoodsBinDic[_goodsids[i]]["prices"][0]);
                        this.shenshouShopIdDic.set(_shenshouId, _goodsids[i]);
                    }
                };
                /** 神兽列表初始化  */
                ShopYaoHunYuMediator.prototype.shenShouLstInit = function () {
                    this._viewUI.shenShou_lst.vScrollBarSkin = "";
                    this._viewUI.shenShou_lst.scrollBar.elasticBackTime = 100;
                    this._viewUI.shenShou_lst.scrollBar.elasticDistance = 100;
                    this._viewUI.shenShou_lst.array = this.shenShouLstDataArr;
                    this._viewUI.shenShou_lst.renderHandler = new Laya.Handler(this, this.shenShouLstRender);
                    this._viewUI.shenShou_lst.selectHandler = new Laya.Handler(this, this.shenShouLstSelect);
                };
                /** 神兽列表被点击 */
                ShopYaoHunYuMediator.prototype.shenShouLstSelect = function (index) {
                    var ditu_img = this._viewUI.shenShou_lst.getCell(index).getChildByName("ditu_img");
                    ditu_img.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    if (this.shenshouSelectedImg) {
                        this.shenshouSelectedImg.skin = "common/ui/tongyong/common_list_3textbg.png";
                    }
                    this.selectedIndex = index;
                    this.shenshouSelectedImg = ditu_img;
                    this.changeUI(index);
                };
                /** 改变界面UI */
                ShopYaoHunYuMediator.prototype.changeUI = function (index) {
                    var _shenshouData = this.shenShouLstDataArr[index];
                    this._viewUI.spendYaoHunYu_lab.text = this.costItemNumDic.get(_shenshouData.id).toString();
                    var needMoney = Number(this._viewUI.spendYaoHunYu_lab.text);
                    var haveMoney = Number(this._viewUI.haveYaoHunYu_lab.text);
                    if (haveMoney < needMoney) {
                        this._viewUI.haveYaoHunYu_lab.strokeColor = "#ff0000";
                        this._viewUI.haveYaoHunYu_lab.stroke = 3;
                    }
                };
                /** 神兽列表的渲染 */
                ShopYaoHunYuMediator.prototype.shenShouLstRender = function (cell, index) {
                    var petName_lab = cell.getChildByName("petName_lab");
                    var cost_lab = cell.getChildByName("cost_lab");
                    var petIcon_img = cell.getChildByName("petIcon_img");
                    var petFrame_img = cell.getChildByName("petFrame_img");
                    var ditu_img = cell.getChildByName("ditu_img");
                    ditu_img.skin = "common/ui/tongyong/common_list_3textbg.png";
                    if (this.selectedIndex == index) {
                        ditu_img.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    }
                    var money_img = cell.getChildByName("money_img");
                    money_img.skin = "common/icon/item/20073.png";
                    var _shenshouData = this.shenShouLstDataArr[index];
                    petName_lab.text = _shenshouData.name;
                    petName_lab.color = "#" + _shenshouData.colour;
                    cost_lab.text = this.costItemNumDic.get(_shenshouData.id).toString();
                    var _shapeId = this._modelConfig[_shenshouData.modelid]["littleheadID"];
                    petIcon_img.skin = "common/icon/avatarpet/" + _shapeId + ".png";
                    petFrame_img.skin = modules.bag.BagSystemModule.getGameItemFrameColorResource(_shenshouData.quality);
                };
                /** 注册事件 */
                ShopYaoHunYuMediator.prototype.registEvent = function () {
                    this._viewUI.buy_btn.on(LEvent.CLICK, this, this.buyShenShou);
                };
                /** 购买选中的神兽 */
                ShopYaoHunYuMediator.prototype.buyShenShou = function () {
                    if (-1 != this.selectedIndex) {
                        if (this._viewUI.haveYaoHunYu_lab.stroke != 0) { //若身上妖魂玉数量不足
                            var _msg = ChatModel.getInstance().chatMessageTips[140638]["msg"];
                            var _itemName = BagModel.getInstance().itemAttrData[101422]["name"];
                            _msg = _msg.replace("$parameter1$", _itemName);
                            game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, _msg);
                            return;
                        }
                        // else{//若身上妖魂玉道具数量足够，弹出二次确认框
                        // }
                        var _cShenShouShop = ShopModel.getInstance().cShenShouShop;
                        var _shopid = _cShenShouShop[1]["shopid"];
                        var _shenshouData = this.shenShouLstDataArr[this.selectedIndex];
                        var _goodId = this.shenshouShopIdDic.get(_shenshouData.id);
                        modules.bag.models.BagProxy.getInstance().once(modules.bag.models.ITEMADD_OR_DEL, this, this.reChangeUI);
                        RequesterProtocols._instance.c2s_buy_npcshop(_shopid, _goodId, 1, ShopBuyType.SHENSHOU_SHOP);
                    }
                };
                /** 重新更改身上所持有的妖魂玉 */
                ShopYaoHunYuMediator.prototype.reChangeUI = function () {
                    this.showHaveMoney();
                    this.changeUI(this.selectedIndex);
                };
                /** 移除事件 */
                ShopYaoHunYuMediator.prototype.removeEvent = function () {
                    this._viewUI.buy_btn.off(LEvent.CLICK, this, this.buyShenShou);
                };
                ShopYaoHunYuMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.selectedIndex = -1;
                    this.shenshouSelectedImg = undefined;
                };
                ShopYaoHunYuMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ShopYaoHunYuMediator;
            }(game.modules.UiMediator));
            commonUI.ShopYaoHunYuMediator = ShopYaoHunYuMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ShopYaoHunYuMediator.js.map