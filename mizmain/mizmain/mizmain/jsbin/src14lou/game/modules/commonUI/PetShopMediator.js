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
* 宠物商店
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var PetShopMediator = /** @class */ (function (_super) {
                __extends(PetShopMediator, _super);
                function PetShopMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**宠物等级类型*/
                    _this.idlist = [0, 15, 25, 35, 45, 55, 65, 75, 80, 85, 90, 95];
                    /**当前选择级别*/
                    _this.currentselect = 0;
                    /**上次选择级别*/
                    _this.lastbox = null;
                    /**商品id列表*/
                    _this.goodsidlist = [];
                    /**购买的宠物id*/
                    _this.selectbuypet = -1;
                    /**上次选择的宠物*/
                    _this.lastpetbox = null;
                    /**当前选择的宠物*/
                    _this.currentpetselect = -1;
                    /**任务宠物id*/
                    _this.taskpetid = null;
                    /**第几个宠物*/
                    _this.nums = null;
                    _this._viewUI = new ui.common.PetShopUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.CLICK, _this, _this.hide);
                    _this._viewUI.buy_btn.on(LEvent.CLICK, _this, _this.buypet);
                    _this.model = new ModelsCreate();
                    _this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(_this._app);
                    return _this;
                }
                PetShopMediator.prototype.modelcreate = function (modelid, pos) {
                    this.model.modelcreate(modelid + "", -100, -110, -80, 90);
                    this.model.mouseEnabled = false;
                    this.model.mouseThrough = true;
                    this._viewUI.addChild(this.model);
                };
                PetShopMediator.prototype.init = function (petid, nums) {
                    this.show();
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                    if (petid) { //若有任务宠则设置
                        this.taskpetid = petid;
                        this.nums = nums;
                        this.setcurrentselect(petid);
                    }
                    this._viewUI.havemoney_lab.text = game.modules.bag.models.BagModel.getInstance().sliverIcon + "";
                    var levellist = [];
                    for (var index = 0; index < this.idlist.length; index++) {
                        var petdata = game.modules.pet.models.PetModel.getInstance().cPetShopData[this.idlist[index]];
                        if (petdata.limitLookLv > game.modules.mainhud.models.HudModel.getInstance().levelNum)
                            break;
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[3];
                        levellist.push({ petlevel_btn: petdata.showLv + chattext.msg });
                    }
                    this._viewUI.petlevel_list.array = levellist;
                    this._viewUI.petlevel_list.vScrollBarSkin = "";
                    this._viewUI.petlevel_list.repeatY = levellist.length / 2;
                    this._viewUI.petlevel_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.petlevel_list.scrollBar.elasticDistance = 50;
                    this._viewUI.petlevel_list.renderHandler = new Laya.Handler(this, this.selectlevel);
                    this._viewUI.petlevel_list.scrollBar.setScroll(0, 91 * levellist.length / 2, 91 * (this.currentselect - 1) / 2);
                    if (AutoHangUpModels.getInstance().autotask == 1) { //自动任务
                        this.delaytimer = 0;
                        Laya.timer.loop(1000, this, this.delaybuypet);
                    }
                    ;
                };
                /**当前任务的宠物ID*/
                PetShopMediator.prototype.setcurrentselect = function (petid) {
                    var petinfo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[petid];
                    for (var index = 0; index < this.idlist.length; index++) {
                        if (petinfo.uselevel == this.idlist[index]) {
                            this.currentselect = index;
                            break;
                        }
                    }
                };
                PetShopMediator.prototype.selectlevel = function (cell, index) {
                    var btn = cell.getChildByName("petlevel_btn");
                    if (index == this.currentselect) {
                        this.showpet(cell, index);
                        this.currentselect = -1;
                    }
                    btn.on(LEvent.MOUSE_DOWN, this, this.showpet, [cell, index]);
                };
                /**选择要购买的宠物*/
                PetShopMediator.prototype.showpet = function (cell, index) {
                    this.selectbuypet = -1;
                    var petinfo = [];
                    this._viewUI.cosmoney_lab.text = 0 + "";
                    if (this.lastpetbox) {
                        var lastbtn = this.lastpetbox.getChildByName("pet_btn");
                        lastbtn.selected = false;
                        this.lastpetbox = null;
                    }
                    if (this.lastbox) {
                        var lastbtn = this.lastbox.getChildByName("petlevel_btn");
                        lastbtn.selected = false;
                    }
                    var btn = cell.getChildByName("petlevel_btn");
                    btn.selected = true;
                    this.lastbox = cell;
                    var shopinfo = game.modules.pet.models.PetModel.getInstance().cPetShopData[this.idlist[index]];
                    this.goodsidlist = shopinfo.goodsids;
                    for (var num = 0; num < shopinfo.goodsids.length; num++) {
                        var goodsinfo = ShopModel.getInstance().GoodsBinDic[shopinfo.goodsids[num]];
                        var petdata = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[goodsinfo.itemId];
                        if (goodsinfo.itemId == this.taskpetid) {
                            if (this.currentselect != -1) {
                                this.currentpetselect = num;
                            }
                            if (this.nums)
                                petinfo.push({ petname_lab: petdata.name, cos_lab: goodsinfo.prices[0], needpet_img: "common/ui/tongyong/shop_xuqiu.png" });
                            else
                                petinfo.push({ petname_lab: petdata.name, cos_lab: goodsinfo.prices[0], needpet_img: "" });
                        }
                        else {
                            petinfo.push({ petname_lab: petdata.name, cos_lab: goodsinfo.prices[0], needpet_img: "" });
                        }
                        this._viewUI.pet_list.addChild(this.model);
                    }
                    this._viewUI.pet_list.array = petinfo;
                    this._viewUI.pet_list.hScrollBarSkin = "";
                    this._viewUI.pet_list.repeatX = petinfo.length;
                    this._viewUI.pet_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.pet_list.scrollBar.elasticDistance = 50;
                    this._viewUI.pet_list.renderHandler = new Laya.Handler(this, this.selectpetinit);
                    this._viewUI.pet_list.scrollBar.setScroll(0, 216 * petinfo.length, 216 * this.currentpetselect);
                };
                /**响应事件处理*/
                PetShopMediator.prototype.selectpetinit = function (cell, index) {
                    var btn = cell.getChildByName("pet_btn");
                    if (index == this.currentpetselect) { //是否是当前选择
                        this.selectpet(cell, index);
                        this.currentpetselect = -1;
                    }
                    btn.on(LEvent.MOUSE_DOWN, this, this.selectpet, [cell, index]);
                };
                /**按钮响应*/
                PetShopMediator.prototype.selectpet = function (cell, index) {
                    if (this.lastpetbox) {
                        var lastbtn = this.lastpetbox.getChildByName("pet_btn");
                        lastbtn.selected = false;
                    }
                    var btn = cell.getChildByName("pet_btn");
                    btn.selected = true;
                    this.lastpetbox = cell;
                    this.selectbuypet = index;
                    var goodsinfo = ShopModel.getInstance().GoodsBinDic[this.goodsidlist[index]];
                    this._viewUI.cosmoney_lab.text = goodsinfo.prices[0] + "";
                };
                /**购买宠物*/
                PetShopMediator.prototype.buypet = function () {
                    if (this.selectbuypet == undefined || this.selectbuypet == -1) {
                        var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150500];
                        this.tips.onShow(chattext.msg);
                        return;
                    }
                    var goodsinfo = ShopModel.getInstance().GoodsBinDic[this.goodsidlist[this.selectbuypet]];
                    var petdata = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[goodsinfo.itemId];
                    if (HudModel.getInstance().levelNum < petdata.uselevel) {
                        var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[160250];
                        this.tips.onShow(chattext.msg);
                    }
                    else if (parseInt(this._viewUI.cosmoney_lab.text) <= parseInt(this._viewUI.havemoney_lab.text) && parseInt(this._viewUI.havemoney_lab.text) != 0) { //可以购买
                        if (this.taskpetid) {
                            this.hide();
                        }
                        game.modules.pet.models.PetProxy.getInstance().off(game.modules.pet.models.ADD_EVENT, this, this.refresh);
                        game.modules.pet.models.PetProxy.getInstance().once(game.modules.pet.models.ADD_EVENT, this, this.refresh);
                        RequesterProtocols._instance.c2s_buy_npcshop(4, this.goodsidlist[this.selectbuypet], 1, 2);
                    }
                    else { //银币不够需跳转到银币兑换界面
                        this.change = new game.modules.commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
                        var duihuanMoney = parseInt(this._viewUI.cosmoney_lab.text) - parseInt(this._viewUI.havemoney_lab.text);
                        this.change.onShow(false, duihuanMoney.toString(), Math.ceil(duihuanMoney / 10000).toString(), Math.ceil(duihuanMoney / 100).toString());
                        this.change.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [Math.ceil(duihuanMoney / 10000)]);
                        this.change.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [Math.ceil(duihuanMoney / 10000)]);
                        this.change.once(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.jinbiDuihuan);
                    }
                };
                /**刷新*/
                PetShopMediator.prototype.refresh = function () {
                    var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150501];
                    var goodsinfo = ShopModel.getInstance().GoodsBinDic[this.goodsidlist[this.selectbuypet]];
                    var petdata = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[goodsinfo.itemId];
                    this.tips.onShow(game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(chattext.msg, petdata.name, 11));
                    this._viewUI.havemoney_lab.text = game.modules.bag.models.BagModel.getInstance().sliverIcon + "";
                };
                /**金币兑换银币成功 */
                PetShopMediator.prototype.jinbiDuihuan = function () {
                    //直接购买宠物		
                    RequesterProtocols._instance.c2s_buy_npcshop(4, this.goodsidlist[this.selectbuypet], 1, 2);
                };
                /**仙晶兑换 */
                PetShopMediator.prototype.goCharge = function (yuanbao) {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
                    if (fuShiNum < yuanbao) {
                        this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                        this._TipsMessageMediator.show();
                        var param = new Dictionary();
                        param.set("contentId", 150506);
                        this._TipsMessageMediator.showContent(param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        RequesterProtocols._instance.c2s_exchange_currency(3, 2, yuanbao);
                    }
                };
                /**通过元宝购买物品 */
                PetShopMediator.prototype.buySliverFromYuanBao = function (yuanbao) {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
                    if (fuShiNum < yuanbao) {
                        this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                        this._TipsMessageMediator.show();
                        var param = new Dictionary();
                        param.set("contentId", 150506);
                        this._TipsMessageMediator.showContent(param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        RequesterProtocols._instance.c2s_exchange_currency(3, 1, yuanbao);
                        //直接购买宠物			
                        RequesterProtocols._instance.c2s_buy_npcshop(4, this.goodsidlist[this.selectbuypet], 1, 2);
                    }
                };
                /**充值 */
                PetShopMediator.prototype.goRecharge = function () {
                    this.change.hide();
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                    game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge); //前往充值界面。关闭当前界
                };
                PetShopMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                PetShopMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
                    this.taskpetid = null;
                    if (game.modules.createrole.models.LoginModel.getInstance().CommonPage) {
                        modules.ModuleManager.show(game.modules.createrole.models.LoginModel.getInstance().CommonPage, this._app);
                        game.modules.createrole.models.LoginModel.getInstance().CommonPage = "";
                    }
                    else {
                        if (AutoHangUpModels.getInstance().autotask == 0) {
                            AutoHangUpModels.getInstance().notaketimer = 0;
                            AutoHangUpModels.getInstance().istaskwalk = 0;
                        }
                        game.modules.mainhud.models.HudModel.getInstance().autobatt.init();
                    }
                };
                PetShopMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                PetShopMediator.prototype.delaybuypet = function () {
                    this.delaytimer++;
                    if (this.delaytimer >= 2) {
                        Laya.timer.clear(this, this.delaybuypet);
                        this.buypet();
                    }
                };
                return PetShopMediator;
            }(game.modules.UiMediator));
            commonUI.PetShopMediator = PetShopMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetShopMediator.js.map