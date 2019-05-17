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
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var sale;
        (function (sale) {
            var models;
            (function (models) {
                /**上架物品返回的推荐价格、摊位费等 */
                models.SGetMarketUpPrice = "SGetMarketUpPrice";
                /**摊位物品信息 */
                models.SMarketContainerBrowse = "onSMarketContainerBrowse";
                /**摊位宠物tips信息返回 */
                models.SMarketPetTips = "SMarketPetTips";
                /**摊位物品tips信息返回 */
                models.SOtherItemTips = "SOtherItemTips";
                /**购买界面获取物品*/
                models.SMarketBrowse = "SMarketBrowse";
                /**购买关注 */
                models.SAttentionGoods = "SAttentionGoods";
                /**公示关注 */
                models.SGongShiAttentionGoods = "SGongShiAttentionGoods";
                /**多个物品购买时的弹窗购买按钮*/
                models.buyItemTipsBtn = "buyItemTipsBtn";
                /**购买搜索 */
                models.buySearch = "buySearch";
                /**购买装备宠物搜索 */
                models.buyGemEguipPetSeek = "buyGemEguipPetSeek";
                /**关注搜索 */
                models.attentionSearch = "attentionSearch";
                /**关注装备宠物搜索 */
                models.attentionGemEguipPetSeekSearch = "attentionGemEguipPetSeekSearch";
                /**交易记录 */
                models.SMarketTradeLog = "SMarketTradeLog";
                models.onSaleListTipsbtn = "onSaleListTipsbtn";
                /**搜所装备等级 */
                models.onSaleListEqulevelbtn = "onSaleListEqulevelbtn";
                /**搜索装备基础属性 */
                models.onSaleListEquBastAttrbtn1 = "onSaleListEquBastAttrbtn1";
                /**搜索装备基础属性 */
                models.onSaleListEquBastAttrbtn2 = "onSaleListEquBastAttrbtn2";
                /**搜索装备基础属性 */
                models.onSaleListEquBastAttrbtn3 = "onSaleListEquBastAttrbtn3";
                /**搜所装备特效 */
                models.onSaleListEquTeXiao = "onSaleListEquTeXiao";
                /**搜索装备特技 */
                models.onSaleListEquTeJi = "onSaleListEquTeJi";
                /**搜索装备附加属性 */
                models.onSaleListEquAddAttr = "onSaleListEquAddAttr";
                /**搜索普通宠物 */
                models.onSaleListordinaryPet = "onSaleListordinaryPet";
                /**搜索灵宠列表 */
                models.onSaleListlingchong = "onSaleListlingchong";
                /***宠物技能 */
                models.onSalePetSkill = "onSalePetSkill";
                /***宠物资质1 */
                models.onSalePetZizhi1 = "onSalePetZizhi1";
                /***宠物资质2 */
                models.onSalePetZizhi2 = "onSalePetZizhi2";
                /***宠物资质3 */
                models.onSalePetZizhi3 = "onSalePetZizhi3";
                /***宠物基础属性1 */
                models.onSalePetBaseAttr1 = "onSalePetBaseAttr1";
                /***宠物基础属性2 */
                models.onSalePetBaseAttr2 = "onSalePetBaseAttr2";
                /***宠物基础属性3 */
                models.onSalePetBaseAttr3 = "onSalePetBaseAttr3";
                /**上架宠物 */
                models.SMarketUpSucc = "SMarketUpSucc";
                /**搜索结果 */
                models.SearchItemResult = "SearchItemResult";
                /**购买宠物 */
                models.butPet = "butPet";
                /**购买返回 */
                models.SMarketBuy = "SMarketBuy";
                /**通知主界面拍卖加载完毕 */
                models.SaleIsInit = "SaleIsInit";
                /**搜索返回的数据 */
                models.SMarketSearchResult = "SMarketSearchResult";
                var SaleProxy = /** @class */ (function (_super) {
                    __extends(SaleProxy, _super);
                    function SaleProxy() {
                        var _this = _super.call(this) || this;
                        SaleProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    SaleProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new SaleProxy();
                        }
                        return this._instance;
                    };
                    SaleProxy.prototype.init = function () {
                        LoginModel.getInstance();
                        this.addNetworkListener();
                        //三级摆摊表
                        Laya.loader.load("common/data/temp/shop.cmarketthreetable.bin", Handler.create(this, this.onloadedCMarketThreeTableComplete), null, Loader.BUFFER);
                        /**一级摆摊表 */
                        Laya.loader.load("common/data/temp/shop.cmarketfirsttable.bin", Handler.create(this, this.onloadedCMarketFirstTableComplete), null, Loader.BUFFER);
                        /**二级摆摊表 */
                        Laya.loader.load("common/data/temp/shop.cmarketsecondtable.bin", Handler.create(this, this.onloadedCMarketSecondTableComplete), null, Loader.BUFFER);
                        /**食品表 */
                        Laya.loader.load("common/data/temp/item.cfoodanddrugeffect.bin", Handler.create(this, this.onloadedFoodAndDrugEffectComplete), null, Loader.BUFFER);
                        /**食品公式表 */
                        Laya.loader.load("common/data/temp/item.cfoodanddrugformula.bin", Handler.create(this, this.onloadedFoodAndDrugFormulaComplete), null, Loader.BUFFER);
                    };
                    /**三级摆摊表(根据id、name与itemid作为字典key) */
                    SaleProxy.prototype.onloadedCMarketThreeTableComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmarketthreetable.bin");
                        var data = new Byte(arrayBuffer);
                        var size1 = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size1, models.SaleModel.getInstance().cMarketThreeTableData, game.data.template.CMarketThreeTableBaseVo, "id");
                        data.pos = 0;
                        var size2 = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size2, models.SaleModel.getInstance().cMarketThreeTableDataForName, game.data.template.CMarketThreeTableBaseVo, "name");
                        data.pos = 0;
                        var size3 = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size3, models.SaleModel.getInstance().cMarketThreeTableDataForItemid, game.data.template.CMarketThreeTableBaseVo, "itemid");
                    };
                    SaleProxy.prototype.onloadedCMarketFirstTableComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmarketfirsttable.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.SaleModel.getInstance().cMarketFirstTableData, game.data.template.CMarketFirstTableBaseVo, "id");
                    };
                    SaleProxy.prototype.onloadedCMarketSecondTableComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmarketsecondtable.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.SaleModel.getInstance().cMarketSecondTableData, game.data.template.CMarketSecondTableBaseVo, "id");
                    };
                    SaleProxy.prototype.onloadedFoodAndDrugEffectComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cfoodanddrugeffect.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.SaleModel.getInstance().foodAndDrugEffectData, game.data.template.FoodAndDrugEffectBaseVo, "id");
                    };
                    SaleProxy.prototype.onloadedFoodAndDrugFormulaComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cfoodanddrugformula.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.SaleModel.getInstance().foodAndDrugFormulaData, game.data.template.FoodAndDrugFormulaBaseVo, "id");
                    };
                    SaleProxy.prototype.addNetworkListener = function () {
                        /**摊位信息 */
                        Network._instance.addHanlder(ProtocolsEnum.SMarketContainerBrowse, this, this.onSMarketContainerBrowse);
                        /**上架物品价格返回 */
                        Network._instance.addHanlder(ProtocolsEnum.SGetMarketUpPrice, this, this.onSGetMarketUpPrice);
                        /**上架物品详细信息tips返回*/
                        Network._instance.addHanlder(ProtocolsEnum.SOtherItemTips, this, this.onSOtherItemTips);
                        /**上架宠物详细信息tips返回 */
                        Network._instance.addHanlder(ProtocolsEnum.SMarketPetTips, this, this.onSMarketPetTips);
                        /**上架宠物成功返回*/
                        Network._instance.addHanlder(ProtocolsEnum.SMarketUpSucc, this, this.onSMarketUpSucc);
                        /**购买界面筛选物品返回 */
                        Network._instance.addHanlder(ProtocolsEnum.SMarketBrowse, this, this.onSMarketBrowse);
                        /**关注 */
                        Network._instance.addHanlder(ProtocolsEnum.SAttentionGoods, this, this.onSAttentionGoods);
                        /**购买 */
                        Network._instance.addHanlder(ProtocolsEnum.SMarketBuy, this, this.onSMarketBuy);
                        /**交易记录 */
                        Network._instance.addHanlder(ProtocolsEnum.SMarketTradeLog, this, this.onSMarketTradeLog);
                        /**查询结果 */
                        Network._instance.addHanlder(ProtocolsEnum.SMarketSearchResult, this, this.onSMarketSearchResult);
                    };
                    /**拍卖行请求被关注的物品信息 */
                    SaleProxy.prototype.onSMarketContainerBrowse = function (optcode, msg) {
                        models.SaleModel._instance.GoodList.set(msg.actiontype, msg.goodslist);
                        models.SaleProxy._instance.event(models.SMarketContainerBrowse);
                    };
                    SaleProxy.prototype.onSGetMarketUpPrice = function (optcode, msg) {
                        var SGetMarketUpPriceDic = new Dictionary();
                        SGetMarketUpPriceDic.set("containertype", msg.containertype);
                        SGetMarketUpPriceDic.set("price", msg.price);
                        SGetMarketUpPriceDic.set("stallprice", msg.stallprice);
                        SGetMarketUpPriceDic.set("recommendations", msg.recommendations);
                        models.SaleProxy._instance.event(models.SGetMarketUpPrice, SGetMarketUpPriceDic);
                    };
                    SaleProxy.prototype.onSOtherItemTips = function (optcode, msg) {
                        var SOtherItemTipsDsc = new Dictionary();
                        SOtherItemTipsDsc.set("roleid", msg.roleid);
                        SOtherItemTipsDsc.set("packid", msg.packid);
                        SOtherItemTipsDsc.set("keyinpack", msg.keyinpack);
                        SOtherItemTipsDsc.set("tips", msg.tips);
                        models.SaleProxy._instance.event(models.SOtherItemTips, SOtherItemTipsDsc);
                    };
                    SaleProxy.prototype.onSMarketPetTips = function (optcode, msg) {
                        models.SaleModel.getInstance().SMarketPetTipsData.set("data", msg);
                        models.SaleProxy._instance.event(models.SMarketPetTips, msg.pettips);
                    };
                    SaleProxy.prototype.onSMarketUpSucc = function (optcode, msg) {
                        models.SaleProxy._instance.event(models.SMarketUpSucc, [msg.israrity]);
                    };
                    SaleProxy.prototype.onSMarketBrowse = function (optcode, msg) {
                        models.SaleModel._instance.currPage = msg.currpage;
                        models.SaleModel._instance.totalPage = msg.totalpage;
                        models.SaleModel._instance.bugGoodlist = msg.goodslist;
                        models.SaleProxy._instance.event(models.SMarketBrowse, actiontype.gongshi);
                    };
                    /**
                     * 关注服务器下发协议
                     * @param msg
                     */
                    SaleProxy.prototype.onSAttentionGoods = function (optcode, msg) {
                        if (msg.attentype == 1) {
                            models.SaleModel.getInstance().GoumaiGuanZhuData.set("data", msg);
                            models.SaleProxy._instance.event(models.SAttentionGoods);
                        }
                        else {
                            models.SaleModel.getInstance().GongshiGuanZhuData.set("data", msg);
                            models.SaleProxy._instance.event(models.SGongShiAttentionGoods);
                        }
                    };
                    SaleProxy.prototype.onSMarketBuy = function (optcode, msg) {
                        var goodslist = models.SaleModel._instance.bugGoodlist;
                        for (var i = 0; i < goodslist.length; i++) {
                            var goodId = goodslist[i].id;
                            if (goodId == msg.id) {
                                if (msg.surplusnum > 0) {
                                    goodslist[i].num = msg.surplusnum;
                                }
                                else {
                                    goodslist.splice(i, 1);
                                }
                            }
                        }
                        models.SaleModel._instance.bugGoodlist = goodslist;
                        models.SaleProxy._instance.event(models.SMarketBuy, actiontype.gongshi);
                    };
                    SaleProxy.prototype.onSMarketTradeLog = function (optcode, msg) {
                        if (msg.buylog[0] != undefined) {
                            models.SaleModel._instance.buyRecordArr = msg.buylog;
                        }
                        if (msg.salelog[0] != undefined) {
                            models.SaleModel._instance.saleRecordArr = msg.salelog;
                        }
                        models.SaleProxy._instance.event(models.SMarketTradeLog);
                    };
                    /** 珍品装备宠物搜索数据返回*/
                    SaleProxy.prototype.onSMarketSearchResult = function (optcode, msg) {
                        models.SaleModel._instance.SearchResultData.set("firstno", msg.firstno);
                        models.SaleModel._instance.SearchResultData.set("twono", msg.twono);
                        models.SaleModel._instance.SearchResultData.set("browsetype", msg.browsetype);
                        models.SaleModel._instance.SearchResultData.set("goodslist", msg.goodslist);
                        models.SaleProxy._instance.event(models.SMarketSearchResult);
                    };
                    return SaleProxy;
                }(hanlder.ProxyBase));
                models.SaleProxy = SaleProxy;
            })(models = sale.models || (sale.models = {}));
        })(sale = modules.sale || (modules.sale = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SaleProxy.js.map