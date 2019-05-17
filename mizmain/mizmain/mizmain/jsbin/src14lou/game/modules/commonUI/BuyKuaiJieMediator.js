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
* 快捷购买
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var BuyKuaiJieMediator = /** @class */ (function (_super) {
                __extends(BuyKuaiJieMediator, _super);
                function BuyKuaiJieMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this.currentlimitNum = -1;
                    _this.huobiicon = ["common_yinb.png", "common_jinb.png", "yuanbao.png"];
                    _this.textlab = ["银币", "金币", "元宝"];
                    _this.totalNum = "";
                    _this._viewUI = new ui.common.component.FastTransactionUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                BuyKuaiJieMediator.prototype.show = function (sale) {
                    _super.prototype.show.call(this);
                    if (sale) { //快捷出售
                        this.initSaleUI();
                    }
                    this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
                    this._viewUI.add_btn.clickHandler = new Laya.Handler(this, this.addcount, [sale]);
                    this._viewUI.reduce_btn.clickHandler = new Laya.Handler(this, this.reducecount, [sale]);
                    this._viewUI.showXiaojianpan_btn.on(LEvent.CLICK, this, this.ShowXiaoJianpan);
                    game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.SHOPPRICE_EVENT, this, this.refreshprice);
                };
                BuyKuaiJieMediator.prototype.init = function (index) {
                    this.show();
                    if (index >= 1000 && index <= 1142)
                        this.itemshopid = 5;
                    this.currentitemid = index;
                    var cGoodsData = ShopModel.getInstance().GoodsBinDic[index];
                    if (cGoodsData.limitNum <= 0) {
                        this.currentlimitNum = 99;
                    }
                    else {
                        var goodslimitsBinDic = modules.shop.models.ShopModel._instance.goodslimitsBinDic.get(index);
                        this.currentlimitNum = cGoodsData.limitNum - goodslimitsBinDic;
                    }
                    var item = BagModel.getInstance().itemAttrData[cGoodsData.itemId];
                    this._viewUI.itemBuyName_lab.changeText(item.name);
                    this._viewUI.itemBuyEffect_lab.changeText(item.effectdes);
                    this._viewUI.number_lab.text = 1 + "";
                    this._viewUI.itemBuyIcon_img.skin = "common/icon/item/" + item.icon + ".png";
                    this.currentprice = cGoodsData.prices[0];
                    this._viewUI.huobiicon_img.skin = "common/ui/tongyong/" + this.huobiicon[cGoodsData.currencys[0] - 1];
                    this._viewUI.huobiicon_img1.skin = "common/ui/tongyong/" + this.huobiicon[cGoodsData.currencys[0] - 1];
                    this._viewUI.text_lab.text = "我的" + this.textlab[cGoodsData.currencys[0] - 1];
                    this._viewUI.totalPrice_lab.text = this.currentprice + "";
                    this._viewUI.buyTips_lab.changeText("身上的" + item.name + "不足，你可以快捷购买");
                    this._viewUI.transaction_btn.clickHandler = new Laya.Handler(this, this.buyitem, [cGoodsData.currencys[0]]);
                    this._viewUI.sale_box.visible = false;
                    this._viewUI.buy_box.visible = true;
                    if (cGoodsData.currencys[0] - 1 == 0) { //使用银币
                        if (HudModel.getInstance().sliverNum != null) {
                            this._viewUI.haveMoney_lab.text = HudModel.getInstance().sliverNum + "";
                        }
                        else {
                            this._viewUI.haveMoney_lab.text = 0 + "";
                        }
                    }
                    else if (cGoodsData.currencys[0] == 3) {
                        //使用符石
                        this._viewUI.haveMoney_lab.text = HudModel.getInstance().fuShiNum.toString();
                    }
                    else {
                        if (HudModel.getInstance().goldNum != null) {
                            this._viewUI.haveMoney_lab.text = HudModel.getInstance().goldNum + "";
                        }
                        else {
                            this._viewUI.haveMoney_lab.text = 0 + "";
                        }
                    }
                };
                BuyKuaiJieMediator.prototype.buyitem = function (currencys) {
                    // models.PetProxy.getInstance().event(models.BUYPETFEED_EVENT);
                    //刷新物品数量并关闭购买窗口
                    if (parseInt(this._viewUI.totalPrice_lab.text) <= parseInt(this._viewUI.haveMoney_lab.text)) {
                        if (this.itemshopid == 5) {
                            RequesterProtocols._instance.c2s_chamber_ofcommerceshop(this.itemshopid, 0, this.currentitemid, parseInt(this._viewUI.number_lab.text), 4);
                        }
                        else {
                            RequesterProtocols._instance.c2s_buy_mallshop(this.itemshopid, 0, this.currentitemid, parseInt(this._viewUI.number_lab.text));
                        }
                        _super.prototype.hide.call(this);
                    }
                    else {
                        if (currencys - 1 == 0) { //银币
                            console.log("--------------显示银币");
                            var totalPrice = parseInt(this._viewUI.totalPrice_lab.text);
                            var haveMoney = parseInt(this._viewUI.haveMoney_lab.text);
                            this.jinbiduihuan = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
                            var yinbi = totalPrice - haveMoney;
                            var yuanbao = yinbi / 10000;
                            var jinbi = yinbi / 100;
                            if (yuanbao > parseInt(yuanbao.toFixed(0))) {
                                yuanbao = parseInt(yuanbao.toFixed(0)) + 1;
                            }
                            else {
                                yuanbao = parseInt(yuanbao.toFixed(0));
                            }
                            if (jinbi > parseInt(jinbi.toFixed(0))) {
                                jinbi = parseInt(jinbi.toFixed(0)) + 1;
                            }
                            else {
                                jinbi = parseInt(jinbi.toFixed(0));
                            }
                            this.jinbiduihuan.onShow(false, yinbi + "", yuanbao + "", jinbi + "");
                            this.jinbiduihuan.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [yuanbao]);
                            this.jinbiduihuan.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [yuanbao]);
                            this.jinbiduihuan.once(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.hide);
                        }
                        else if (currencys == 3) {
                            this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                            this._TipsMessageMediator.show();
                            var param = new Dictionary();
                            param.set("contentId", 150506);
                            this._TipsMessageMediator.showContent(param);
                            game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                        }
                    }
                };
                /**仙晶兑换 */
                BuyKuaiJieMediator.prototype.goCharge = function (yuanbao) {
                    console.log("_------------仙晶不足，前往充值 需要的元宝:", yuanbao);
                    var yuanbaoIcon = game.modules.bag.models.BagModel._instance.yuanbaoIcon;
                    if (yuanbaoIcon < yuanbao) {
                        this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                        this._TipsMessageMediator.show();
                        var param = new Dictionary();
                        param.set("contentId", 150506);
                        this._TipsMessageMediator.showContent(param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        RequesterProtocols._instance.c2s_exchange_currency(3, 2, yuanbao);
                        this.hide();
                    }
                };
                /**通过元宝购买物品 */
                BuyKuaiJieMediator.prototype.buySliverFromYuanBao = function (yuanbao) {
                    var yuanbaoIcon = game.modules.bag.models.BagModel._instance.yuanbaoIcon;
                    if (yuanbaoIcon < yuanbao) {
                        this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                        this._TipsMessageMediator.show();
                        var param = new Dictionary();
                        param.set("contentId", 150506);
                        this._TipsMessageMediator.showContent(param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        RequesterProtocols._instance.c2s_exchange_currency(3, 1, yuanbao);
                        this.hide();
                    }
                };
                BuyKuaiJieMediator.prototype.goRecharge = function () {
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                    game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge); //前往充值界面。关闭当前界面
                    this.hide();
                };
                BuyKuaiJieMediator.prototype.refreshprice = function (e) {
                    // console.log("价格："+PetModel._instance.shopinfo);
                    for (var index = 0; index < PetModel._instance.shopinfo.length; index++) {
                        // console.log("价格：+"+PetModel._instance.shopinfo[0]);				
                        var goods = PetModel._instance.shopinfo[index];
                        if (goods.goodsid == this.currentitemid) {
                            this._viewUI.totalPrice_lab.text = goods.price + "";
                            this.currentprice = goods.price;
                            break;
                        }
                    }
                };
                BuyKuaiJieMediator.prototype.hide = function () {
                    game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.ON_KRYBOARD, this, this.getNumber);
                    _super.prototype.hide.call(this);
                };
                BuyKuaiJieMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                BuyKuaiJieMediator.prototype.addcount = function (sale) {
                    var num = parseInt(this._viewUI.number_lab.text);
                    if (!sale) { /** 购买 */
                        var cGoodsData = ShopModel.getInstance().GoodsBinDic[this.currentitemid];
                        if (cGoodsData.limitType == 0 || num < cGoodsData.limitNum) {
                            num = num + 1;
                            if (num > this.currentlimitNum) {
                                var promoto = HudModel.getInstance().promptAssembleBack(PromptExplain.UPLIMIT_SH);
                                var disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                                disappearMessageTipsMediator.onShow(promoto);
                                return;
                            }
                            this._viewUI.number_lab.changeText(num + "");
                            this._viewUI.totalPrice_lab.text = this.currentprice * num + "";
                        }
                    }
                    else { /** 出售 */
                        if (num < this.maxNum) { /** 小于创库存在的最大值才做操作 */
                            this._viewUI.number_lab.changeText(num + 1 + "");
                            num = num + 1;
                            this._viewUI.totalPrice_lab.text = this.currentprice * num + "";
                        }
                    }
                };
                BuyKuaiJieMediator.prototype.reducecount = function (sale) {
                    var num = parseInt(this._viewUI.number_lab.text);
                    if (!sale) { /** 购买 */
                        if (num > 1) {
                            num = num - 1;
                            this._viewUI.number_lab.changeText(num + "");
                            this._viewUI.totalPrice_lab.text = this.currentprice * num + "";
                        }
                    }
                    else { /** 出售 */
                        if (num > 1) {
                            this._viewUI.number_lab.changeText(num - 1 + "");
                            num = num - 1;
                            this._viewUI.totalPrice_lab.text = this.currentprice * num + "";
                        }
                    }
                };
                /** 初始化出售界面的UI */
                BuyKuaiJieMediator.prototype.initSaleUI = function () {
                    this._viewUI.fastTransaction_lab.text = "快捷出售";
                    this._viewUI.buy_box.visible = false;
                    this._viewUI.sale_box.visible = true;
                };
                /** 初始化出售界面的数据 */
                BuyKuaiJieMediator.prototype.initSaleData = function (itemId, itemNum, shopId, key) {
                    var itemcishu = ShopModel.getInstance().goodsSaleLimit.get(shopId);
                    if (itemcishu == null)
                        RequesterProtocols._instance.c2s_query_limit(2, [shopId]);
                    this.itemshopid = shopId;
                    this._viewUI.transaction_btn.clickHandler = new Laya.Handler(this, this.onSeleItem, [itemId, shopId, key]);
                    var item = BagModel.getInstance().getItemAttrData(itemId);
                    this._viewUI.itemSaleEffect_lab.changeText("功能:" + item.effectdes);
                    this._viewUI.itemSaleName_lab.changeText(item.name);
                    this._viewUI.itemSaleIcon_img.skin = "common/icon/item/" + item.icon + ".png";
                    this._viewUI.transaction_btn.label = "出售";
                    var saleLab = "出售数量";
                    //匹配一下Id，读出对应的价格
                    var Goods = bagModel.getInstance().getGoods.get(shopId);
                    var price;
                    if (Goods == null) {
                        var data_1 = ShopModel.getInstance().GoodsBinDic[shopId];
                        price = data_1.prices[0];
                    }
                    else
                        price = Goods.price;
                    if (typeof (price) != "undefined") {
                        price = SELLING_RATIO * price;
                    }
                    this.currentprice = parseInt(price.toString());
                    this._viewUI.itemEquality_img.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(item.nquality);
                    this._viewUI.totalPrice_lab.changeText(this.currentprice.toString());
                    this._viewUI.haveMoney_lab.changeText(HudModel.getInstance().sliverNum.toString());
                    this._viewUI.itemSaleDetails_html.innerHTML = "<span style='font:25px ;color:#99ff99; SimHei'>" + item.destribe + "</span>";
                    this.maxNum = itemNum;
                    this._viewUI.transactionNumber_lab.changeText(saleLab);
                    this._viewUI.number_lab.changeText("1");
                    this._viewUI.huobiicon_img.skin = "common/ui/tongyong/" + this.huobiicon[0];
                    this._viewUI.huobiicon_img1.skin = "common/ui/tongyong/" + this.huobiicon[0];
                };
                /** 快捷出售点击 */
                BuyKuaiJieMediator.prototype.onSeleItem = function (item, shopId, key) {
                    var selectNum = parseInt(this._viewUI.number_lab.text);
                    var itemcishu = ShopModel.getInstance().goodsSaleLimit.get(shopId); // 商会已出售的次数
                    var baoshibiao = ShopModel.getInstance().GoodsBinDic[shopId].limitSaleNum; // 物品只能出售的次数
                    if (selectNum > baoshibiao)
                        return; // 如果输入框里面的值大于能出售的次数 return
                    if (itemcishu >= baoshibiao) {
                        var promptarr = [baoshibiao];
                        var prompt_1 = HudModel.getInstance().promptAssembleBack(150505, promptarr);
                        var disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        disappearMsgTips.onShow(prompt_1);
                    }
                    else {
                        RequesterProtocols._instance.c2s_chamber_ofcommerceshop(5, key, shopId, selectNum, 5);
                    }
                    this.hide();
                };
                /**显示小键盘 */
                BuyKuaiJieMediator.prototype.ShowXiaoJianpan = function () {
                    this.XiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
                    this.totalNum = "";
                    this.XiaoJianPanMediator.onShow(200, 520);
                    /** 每次打开小键盘判断剩余出售数量 */
                    var itemcishu = ShopModel.getInstance().goodsSaleLimit.get(this.itemshopid);
                    if (itemcishu) // 商会已出售的次数
                     {
                        var limitSaleNum = void 0;
                        var GoodsBinDic = ShopModel.getInstance().GoodsBinDic[this.itemshopid]; // 物品只能出售的次数
                        if (GoodsBinDic)
                            limitSaleNum = ShopModel.getInstance().GoodsBinDic[this.itemshopid].limitSaleNum;
                        this.currentlimitNum = Math.abs(limitSaleNum - itemcishu);
                    }
                    game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, this, this.getNumber);
                };
                /** 点击键盘数字*/
                BuyKuaiJieMediator.prototype.getNumber = function (num) {
                    if (num == -2) { //点击了ok
                        if (this.totalNum == "" || this.totalNum.charAt(0) == "0") {
                            this.totalNum = "1";
                        }
                        // if(parseInt(this.totalNum) > this.currentlimitNum){
                        // 	label.text = this.currentlimitNum + "";
                        // 	this.totalNum = this.currentlimitNum + "";
                        // }
                    }
                    if (num == -1) { //点击了删除
                        this.totalNum = this.totalNum.substring(0, this.totalNum.length - 1);
                        if (this.totalNum.length <= 0) {
                            this.totalNum = "0";
                        }
                    }
                    var label = this._viewUI.number_lab;
                    if (num >= 0) {
                        if (this.totalNum == "")
                            this.totalNum = "0";
                        var oneChar = this.totalNum.charAt(0);
                        if (oneChar != '0') {
                            this.totalNum += num;
                        }
                        else if (oneChar == '0') {
                            this.totalNum = num;
                        }
                    }
                    if (this.currentlimitNum && this.currentlimitNum != -1) {
                        if (parseInt(this.totalNum) <= this.currentlimitNum) {
                            label.text = "";
                            label.text = this.totalNum == "0" ? "1" : this.totalNum;
                        }
                        else {
                            label.text = this.currentlimitNum + "";
                            this.totalNum = this.currentlimitNum + "";
                            var prompt_2 = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                            var disappearMessageTipsMediator = new commonUI.DisappearMessageTipsMediator(this._app);
                            disappearMessageTipsMediator.onShow(prompt_2);
                            // this.totalNum = this.totalNum.substring(0, this.totalNum.length - 1);
                            this._viewUI.totalPrice_lab.text = this.currentprice * parseInt(this._viewUI.number_lab.text) + "";
                            return;
                        }
                    }
                    else {
                        if (parseInt(this.totalNum) > this.maxNum) {
                            var prompt_3 = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                            var disappearMessageTipsMediator = new commonUI.DisappearMessageTipsMediator(this._app);
                            disappearMessageTipsMediator.onShow(prompt_3);
                            this.totalNum = this.totalNum.substring(0, this.totalNum.length - 1);
                            return;
                        }
                        label.text = this.totalNum;
                        if (label.text == "0")
                            label.text = "1";
                        // this.totalNum = this.currentlimitNum + "";
                    }
                    this._viewUI.totalPrice_lab.text = this.currentprice * parseInt(this._viewUI.number_lab.text) + "";
                };
                return BuyKuaiJieMediator;
            }(game.modules.UiMediator));
            commonUI.BuyKuaiJieMediator = BuyKuaiJieMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BuyKuaiJieMediator.js.map