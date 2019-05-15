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
        var shop;
        (function (shop) {
            var models;
            (function (models) {
                models.REGCHARGE_EVENT = "reqChargeEvent";
                models.CHARGESTATE_EVENT = "chargeStateEvent";
                models.FUSHINUM_EVENT = "fushiNumEvent";
                models.SHANGHUIBUYSUCCESS_EVENT = "notifyBuySuccessEvent";
                models.BUYSUCCESS_EVENT = "refreshCurrencyEvent";
                models.ITEMNUM_EVENT = "itemNumEvent";
                models.QUERYLIMIT_EVENT = "QueryLimitEvent";
                models.Go_Charge = "Go_Charge";
                var ShopProxy = /** @class */ (function (_super) {
                    __extends(ShopProxy, _super);
                    function ShopProxy() {
                        var _this = _super.call(this) || this;
                        ShopProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    ShopProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new ShopProxy();
                        }
                        return this._instance;
                    };
                    ShopProxy.prototype.init = function () {
                        models.ShopModel.getInstance();
                        this.addNetworkListener();
                        //vip奖励
                        Laya.loader.load("common/data/temp/fushi.cvipinfo.bin", Handler.create(this, this.onloadedVipInfoComplete), null, Loader.BUFFER);
                        //商品配置表
                        Laya.loader.load("common/data/temp/shop.cmallshop.bin", Handler.create(this, this.onloadedMallShop), null, Loader.BUFFER);
                        //商品表
                        Laya.loader.load("common/data/temp/shop.cgoods.bin", Handler.create(this, this.onloadedGoods), null, Loader.BUFFER);
                        //商会一级菜单
                        Laya.loader.load("common/data/temp/shop.ccommercefirstmenu.bin", Handler.create(this, this.onloadedCommerceFirstMenu), null, Loader.BUFFER);
                        //商会二级菜单
                        Laya.loader.load("common/data/temp/shop.ccommercesecondmenu.bin", Handler.create(this, this.onloadedCommerceSecondMenu), null, Loader.BUFFER);
                        //充值配置表
                        Laya.loader.load("common/data/temp/fushi.caddcashlua.bin", Handler.create(this, this.onloadedAddCashlua), null, Loader.BUFFER);
                        //加载妖魂玉商店（神兽商店）的商品配置表
                        Laya.loader.load("common/data/temp/shop.cshenshoushop.bin", Handler.create(this, this.onloadcShenShouShop), null, Loader.BUFFER);
                    };
                    /** 加载妖魂玉商店（神兽商店）的商品配置表 */
                    ShopProxy.prototype.onloadcShenShouShop = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cshenshoushop.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ShopModel._instance.cShenShouShop, game.data.template.CShenShouShopBaseVo, "id");
                    };
                    ShopProxy.prototype.onloadedAddCashlua = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.caddcashlua.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ShopModel._instance.CashluaBinDic, game.data.template.AddCashluaBaseVo, "id");
                        // console.log("onloadedAddCashlua:", ShopModel._instance.CashluaBinDic);
                    };
                    ShopProxy.prototype.onloadedCommerceSecondMenu = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.ccommercesecondmenu.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ShopModel._instance.CommerceSecondMenuBinDic, game.data.template.CCommerceSecondMenuBaseVo, "id");
                        // console.log("onloadedCommerceSecondMenu:", ShopModel._instance.CommerceSecondMenuBinDic);
                    };
                    ShopProxy.prototype.onloadedCommerceFirstMenu = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.ccommercefirstmenu.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ShopModel._instance.CommerceFirstMenuBinDic, game.data.template.CCommerceFirstMenuBaseVo, "id");
                        // console.log("onloadedCommerceFirstMenu:", ShopModel._instance.CommerceFirstMenuBinDic);
                    };
                    ShopProxy.prototype.onloadedGoods = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cgoods.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ShopModel._instance.GoodsBinDic, game.data.template.CGoodsBaseVo, "id");
                        data.pos = 0;
                        size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ShopModel.getInstance().cGoodsDataForItemId, game.data.template.CGoodsBaseVo, "itemId");
                        data.pos = 0;
                        size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillMap(data, size, models.ShopModel._instance.GoodsAtLimitType, game.data.template.CGoodsBaseVo, "limitType");
                        models.ShopModel.getInstance().setShopArr();
                        // console.log("onloadedGoods:", ShopModel._instance.GoodsBinDic);
                    };
                    ShopProxy.prototype.onloadedMallShop = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmallshop.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ShopModel._instance.MallShopBinDic, game.data.template.CMallShopBaseVo, "id");
                        data.pos = 0;
                        size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillMap(data, size, models.ShopModel._instance.MallShopAtType, game.data.template.CMallShopBaseVo, "type");
                        // console.log("onloadedMallShop:", ShopModel._instance.MallShopAtType);
                    };
                    ShopProxy.prototype.onloadedVipInfoComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cvipinfo.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ShopModel.getInstance().VipInfoBinDic, game.data.template.VipInfoBaseVo, "id");
                        // console.log("onloadedVipInfoComplete:",ShopModel._instance.VipInfoBinDic);
                    };
                    /**添加监听*/
                    ShopProxy.prototype.addNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.SReqCharge, this, this.onReqCharge);
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshChargeState, this, this.onRefreshChargeState);
                        Network._instance.addHanlder(ProtocolsEnum.SReqFushiNum, this, this.onReqFushiNum);
                        Network._instance.addHanlder(ProtocolsEnum.SRequestChargeReturnProfit, this, this.onRequestChargeReturnProfit);
                        Network._instance.addHanlder(ProtocolsEnum.SNotifyBuySuccess, this, this.onNotifyBuySuccess);
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshCurrency, this, this.onRefreshCurrency);
                        Network._instance.addHanlder(ProtocolsEnum.SItemNumChange, this, this.onItemNumChange);
                        Network._instance.addHanlder(ProtocolsEnum.SQueryLimit, this, this.onQueryLimit);
                    };
                    /*移除监听*/
                    ShopProxy.prototype.removeNetworkListener = function () {
                        Network._instance.removeHanlder(ProtocolsEnum.SReqCharge, this, this.onReqCharge);
                        Network._instance.removeHanlder(ProtocolsEnum.SRefreshChargeState, this, this.onRefreshChargeState);
                        Network._instance.removeHanlder(ProtocolsEnum.SReqFushiNum, this, this.onReqFushiNum);
                        Network._instance.removeHanlder(ProtocolsEnum.SRequestChargeReturnProfit, this, this.onRequestChargeReturnProfit);
                        Network._instance.removeHanlder(ProtocolsEnum.SNotifyBuySuccess, this, this.onNotifyBuySuccess);
                        Network._instance.removeHanlder(ProtocolsEnum.SRefreshCurrency, this, this.onRefreshCurrency);
                        Network._instance.removeHanlder(ProtocolsEnum.SItemNumChange, this, this.onItemNumChange);
                        Network._instance.removeHanlder(ProtocolsEnum.SQueryLimit, this, this.onQueryLimit);
                    };
                    /**限购返回*/
                    ShopProxy.prototype.onQueryLimit = function (optcode, msg) {
                        if (msg.querytype == queryType.SHOP_BUY_TIMES) {
                            if (models.ShopModel.getInstance().goodslimitsBinDic != null) {
                                for (var i = 0; i < msg.goodslimits.length; i++) {
                                    models.ShopModel.getInstance().goodslimitsBinDic.set(msg.goodslimits[i].goodsid, msg.goodslimits[i].number);
                                }
                            }
                            else {
                                var _goodslimit = new Laya.Dictionary();
                                for (var i = 0; i < msg.goodslimits.length; i++) {
                                    _goodslimit.set(msg.goodslimits[i].goodsid, msg.goodslimits[i].number);
                                }
                                models.ShopModel.getInstance().goodslimitsBinDic = _goodslimit;
                            }
                            ShopProxy.getInstance().event(models.QUERYLIMIT_EVENT);
                        }
                        else if (msg.querytype == queryType.SHOP_SALE_TIMES) { /** 限售数据 */
                            var _goodslimits = new Laya.Dictionary();
                            for (var i = 0; i < msg.goodslimits.length; i++) {
                                _goodslimits.set(msg.goodslimits[i].goodsid, msg.goodslimits[i].number);
                            }
                            models.ShopModel.getInstance().goodsSaleLimit = _goodslimits;
                        }
                    };
                    /**商会物品购买成功返回*/
                    ShopProxy.prototype.onItemNumChange = function (optcode, msg) {
                        var itemNumVo = new models.ItemNumVo();
                        itemNumVo.packid = msg.packid;
                        itemNumVo.keyinpack = msg.keyinpack;
                        itemNumVo.curnum = msg.curnum;
                        models.ShopModel.getInstance().itemNumVo = itemNumVo;
                        ShopProxy.getInstance().event(models.ITEMNUM_EVENT);
                    };
                    /**商会物品购买成功返回*/
                    ShopProxy.prototype.onRefreshCurrency = function (optcode, msg) {
                        models.ShopModel.getInstance().currency = msg.currency;
                        ShopProxy.getInstance().event(models.SHANGHUIBUYSUCCESS_EVENT);
                    };
                    /**商城购买成功返回*/
                    ShopProxy.prototype.onNotifyBuySuccess = function (optcode, msg) {
                        var notifyBuySuccessVo = new models.NotifyBuySuccessVo();
                        notifyBuySuccessVo.notifytype = msg.notifytype;
                        notifyBuySuccessVo.name = msg.name;
                        notifyBuySuccessVo.number = msg.number;
                        notifyBuySuccessVo.money = msg.money;
                        notifyBuySuccessVo.currency = msg.currency;
                        notifyBuySuccessVo.itemorpet = msg.itemorpet;
                        notifyBuySuccessVo.units = msg.units;
                        models.ShopModel.getInstance().notifyBuySuccessVo = notifyBuySuccessVo;
                        ShopProxy.getInstance().event(models.BUYSUCCESS_EVENT);
                    };
                    /**充值成功后的返回*/
                    ShopProxy.prototype.onRequestChargeReturnProfit = function (optcode, msg) {
                        models.ShopModel.getInstance().listchargereturnprofit = msg.listchargereturnprofit;
                    };
                    /**充值成功后-浮石数量刷新返回*/
                    ShopProxy.prototype.onReqFushiNum = function (optcode, msg) {
                        var fushiNumVo = new models.FushiNumVo();
                        fushiNumVo.num = msg.num;
                        fushiNumVo.bindNum = msg.bindNum;
                        fushiNumVo.totalnum = msg.totalnum;
                        models.ShopModel.getInstance().fushiNumVo = fushiNumVo;
                        ShopProxy.getInstance().event(models.FUSHINUM_EVENT);
                    };
                    /**充值成功后返回*/
                    ShopProxy.prototype.onRefreshChargeState = function (optcode, msg) {
                        var chargeStateVo = new models.ChargeStateVo();
                        chargeStateVo.state = msg.state;
                        chargeStateVo.flag = msg.flag;
                        models.ShopModel.getInstance().chargeStateVo = chargeStateVo;
                        ShopProxy.getInstance().event(models.CHARGESTATE_EVENT);
                    };
                    /**点击充值返回可购买的种类*/
                    ShopProxy.prototype.onReqCharge = function (optcode, msg) {
                        models.ShopModel.getInstance().goods = msg.goods;
                        ShopProxy.getInstance().event(models.REGCHARGE_EVENT);
                    };
                    return ShopProxy;
                }(hanlder.ProxyBase));
                models.ShopProxy = ShopProxy;
            })(models = shop.models || (shop.models = {}));
        })(shop = modules.shop || (modules.shop = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ShopProxy.js.map