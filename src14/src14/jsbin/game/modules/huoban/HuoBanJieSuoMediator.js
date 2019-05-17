/**
* 伙伴解锁
*/
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
        var huoban;
        (function (huoban) {
            var HuoBanJieSuoMediator = /** @class */ (function (_super) {
                __extends(HuoBanJieSuoMediator, _super);
                function HuoBanJieSuoMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.HuoBanJieSuoUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                /**初始化数据伙伴ID */
                HuoBanJieSuoMediator.prototype.init = function (huobanid) {
                    _super.prototype.show.call(this);
                    this._viewUI.rongyu_img.skin = "common/icon/item/20107.png";
                    this._viewUI.msgTips1_img.visible = false;
                    this.huobanid = huobanid;
                    var data = [];
                    var rongyudata = [];
                    var huobanalldata = HuoBanModel.getInstance().cheroBaseInfoData[huobanid];
                    this.huobanname = huobanalldata.name;
                    var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11821];
                    data.push({ huobanico_img: "common/icon/avatarpartner/" + huobanalldata.headid + ".png", spendMoney_lab: huobanalldata.day7_money[1], dayMoney_lab: chattext.msg });
                    rongyudata.push({ huobanico_img: "common/icon/avatarpartner/" + huobanalldata.headid + ".png", spendRongYu_lab: huobanalldata.day7_money[0], dayRongYu_lab: chattext.msg, tubiaoicon_img: "common/icon/item/20107.png" });
                    chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11822];
                    data.push({ huobanico_img: "common/icon/avatarpartner/" + huobanalldata.headid + ".png", spendMoney_lab: huobanalldata.day30_money[1], dayMoney_lab: chattext.msg });
                    rongyudata.push({ huobanico_img: "common/icon/avatarpartner/" + huobanalldata.headid + ".png", spendRongYu_lab: huobanalldata.day30_money[0], dayRongYu_lab: chattext.msg, tubiaoicon_img: "common/icon/item/20107.png" });
                    chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11823];
                    data.push({ huobanico_img: "common/icon/avatarpartner/" + huobanalldata.headid + ".png", spendMoney_lab: huobanalldata.forever_money[1], dayMoney_lab: chattext.msg });
                    rongyudata.push({ huobanico_img: "common/icon/avatarpartner/" + huobanalldata.headid + ".png", spendRongYu_lab: huobanalldata.forever_money[0], dayRongYu_lab: chattext.msg, tubiaoicon_img: "common/icon/item/20107.png" });
                    this._viewUI.yinbijiesuo_list.array = data;
                    this._viewUI.rongyujiesuo_list.array = rongyudata;
                    this._viewUI.yinbijiesuo_list.renderHandler = new Laya.Handler(this, this.jiesuodate);
                    this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
                    this._viewUI.rongyujiesuo_list.renderHandler = new Laya.Handler(this, this.rongyu);
                    this._viewUI.money_lab.text = BagModel.getInstance().sliverIcon + "";
                    this._viewUI.rongyu_lab.text = BagModel.getInstance().honnorIcon + "";
                    this.yinbinumber = BagModel.getInstance().sliverIcon;
                    this.rongyunumber = BagModel.getInstance().honnorIcon;
                };
                /**解锁数据*/
                HuoBanJieSuoMediator.prototype.jiesuodate = function (cell, index) {
                    var yinbi = cell.getChildByName("spendMoney_lab");
                    if (parseInt(yinbi.text) < this.yinbinumber) //银币是否足够
                        yinbi.color = "#ffffff";
                    else
                        yinbi.color = "#ff0000";
                    var selectbtn = cell.getChildByName("selectjiesuo_btn");
                    selectbtn.clickHandler = new Laya.Handler(this, this.selectjiesuo, [cell, index]);
                };
                /**选择解锁的伙伴*/
                HuoBanJieSuoMediator.prototype.selectjiesuo = function (cell, index) {
                    // this.commonui = new commonUI.RemindViewMediator(this._viewUI, this._app);
                    // this.commonui.once(commonUI.RIGHT_BUTTON_EVENT, this, this.jiesuohuoban);
                    var yinbi = cell.getChildByName("spendMoney_lab");
                    var unlockCostText = "<br/><span style='color:#50321A;fontSize:24'>" + yinbi.text + "</span>";
                    this.needyinbi = parseInt(yinbi.text);
                    var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11122];
                    var right = game.modules.tips.models.TipsModel._instance.cstringResConfigData[1556];
                    this.currentselect = index;
                    var parameArr = [];
                    parameArr.push(this.huobanname);
                    parameArr.push(chattext.msg);
                    parameArr.push(unlockCostText);
                    var contentId;
                    switch (index) { //0为七天 1为1个月 2为永久
                        case 0:
                            contentId = 150122;
                            // var cstring: string
                            // cstring = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150122, arr)
                            // console.log("----------伙伴数据：", arr);
                            // console.log("----------伙伴数据：", cstring);
                            // this.commonui.onhtmlShow(cstring, right.msg);
                            break;
                        case 1:
                            contentId = 150145;
                            // var cstring: string
                            // cstring = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150145, arr)
                            // this.commonui.onhtmlShow(cstring, right.msg);
                            break;
                        case 2:
                            contentId = 150146;
                            // var cstring: string
                            // cstring = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150146, arr)
                            // this.commonui.onhtmlShow(cstring, right.msg);
                            break;
                        default:
                            break;
                    }
                    this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                    this._TipsMessageMediator.show();
                    var param = new Dictionary();
                    param.set("contentId", contentId);
                    param.set("parame", parameArr);
                    this._TipsMessageMediator.showContent(param);
                    game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.jiesuohuoban);
                };
                /**荣誉解锁响应事件初始化*/
                HuoBanJieSuoMediator.prototype.rongyu = function (cell, index) {
                    var rongyu = cell.getChildByName("spendRongYu_lab");
                    if (parseInt(rongyu.text) < this.rongyunumber) //荣誉是否足够
                        rongyu.color = "#ffffff";
                    else
                        rongyu.color = "#ff0000";
                    var selectbtn = cell.getChildByName("selectrongyu_btn");
                    selectbtn.clickHandler = new Laya.Handler(this, this.rongyujiesuo, [cell, index]);
                };
                /**荣誉解锁*/
                HuoBanJieSuoMediator.prototype.rongyujiesuo = function (cell, index) {
                    // this.commonui = new commonUI.RemindViewMediator(this._viewUI, this._app);
                    // this.commonui.once(commonUI.RIGHT_BUTTON_EVENT, this, this.rongyujiesuohuoban);
                    var rongyu = cell.getChildByName("spendRongYu_lab");
                    var unlockCostText = "<br/><span style='color:#50321A;fontSize:24'>" + rongyu.text + "</span>";
                    this.needrongyu = parseInt(rongyu.text);
                    this.currentselect = index;
                    var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11123];
                    var right = game.modules.tips.models.TipsModel._instance.cstringResConfigData[1556];
                    var parameArr = [];
                    parameArr.push(this.huobanname);
                    parameArr.push(chattext.msg);
                    parameArr.push(unlockCostText);
                    var contentId;
                    switch (index) { //0为七天 1为1个月 2为永久
                        case 0:
                            contentId = 150122;
                            // var cstring: string
                            // cstring = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150122, arr)
                            // this.commonui.onhtmlShow(cstring, right.msg);
                            break;
                        case 1:
                            contentId = 150145;
                            // var cstring: string
                            // cstring = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150145, arr)
                            // this.commonui.onhtmlShow(cstring, right.msg);
                            break;
                        case 2:
                            contentId = 150146;
                            // var cstring: string
                            // cstring = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150146, arr)
                            // this.commonui.onhtmlShow(cstring, right.msg);
                            break;
                        default:
                            break;
                    }
                    this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                    this._TipsMessageMediator.show();
                    var param = new Dictionary();
                    param.set("contentId", contentId);
                    param.set("parame", parameArr);
                    this._TipsMessageMediator.showContent(param);
                    game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.rongyujiesuohuoban);
                };
                /**银币解锁*/
                HuoBanJieSuoMediator.prototype.jiesuohuoban = function () {
                    if (this.needyinbi > parseInt(this._viewUI.money_lab.text)) { // 银币解锁
                        this.jinbiduihuan = new modules.commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
                        var yuanbao = (this.needyinbi - this.yinbinumber) / 10000;
                        var jinbi = (this.needyinbi - this.yinbinumber) / 100;
                        if (yuanbao > parseInt(yuanbao.toFixed(0))) { //银币元宝比例兑换
                            yuanbao = parseInt(yuanbao.toFixed(0)) + 1;
                        }
                        else {
                            yuanbao = parseInt(yuanbao.toFixed(0));
                        }
                        if (jinbi > parseInt(jinbi.toFixed(0))) { //银币金币比例兑换
                            jinbi = parseInt(jinbi.toFixed(0)) + 1;
                        }
                        else {
                            jinbi = parseInt(jinbi.toFixed(0));
                        }
                        this.exchangejinbi = jinbi;
                        this.exchangeyuanbao = yuanbao;
                        this.jinbiduihuan.onShow(false, (this.needyinbi - this.yinbinumber) + "", yuanbao + "", jinbi + "");
                        this.jinbiduihuan.once(modules.commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.buyyinbi);
                        this.jinbiduihuan.once(modules.commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.yuanbaojiesuo);
                        this.jinbiduihuan.once(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.buyjinbi);
                    }
                    else {
                        RequesterProtocols._instance.c2s_CActive_HuoBan(this.huobanid, 1, this.currentselect);
                        this.hide();
                    }
                };
                /**荣誉解锁*/
                HuoBanJieSuoMediator.prototype.rongyujiesuohuoban = function () {
                    if (this.needrongyu > parseInt(this._viewUI.rongyu_lab.text)) { //荣誉是否足够
                        this.tishi(150148);
                    }
                    else {
                        RequesterProtocols._instance.c2s_CActive_HuoBan(this.huobanid, 0, this.currentselect);
                        this.hide();
                    }
                };
                /**
                 * 银币解锁伙伴
                 */
                HuoBanJieSuoMediator.prototype.buyyinbi = function () {
                    if (this.exchangejinbi <= BagModel.getInstance().globalIcon) { //银币是否足够
                        RequesterProtocols._instance.c2s_exchange_currency(2, 1, this.exchangejinbi);
                        modules.bag.models.BagProxy.getInstance().once(modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.yinbijiesuo);
                    }
                    else { //调到其他元宝购买金币界面				
                        this.exchangeyuanbao = (this.exchangejinbi - BagModel.getInstance().globalIcon) / 100;
                        if (this.exchangeyuanbao >= parseInt(this.exchangeyuanbao.toFixed(0))) { //比例兑换
                            this.exchangeyuanbao = parseInt(this.exchangeyuanbao.toFixed(0)) + 1;
                        }
                        else {
                            this.exchangeyuanbao = parseInt(this.exchangeyuanbao.toFixed(0));
                        }
                        this.jinbiduihuan.onShow(true, (this.exchangejinbi - BagModel.getInstance().globalIcon) + "", this.exchangeyuanbao + "");
                    }
                };
                /**银币解锁*/
                HuoBanJieSuoMediator.prototype.yinbijiesuo = function () {
                    RequesterProtocols._instance.c2s_CActive_HuoBan(this.huobanid, 1, this.currentselect);
                    this.tishi(160403);
                    this.hide();
                };
                /**
                 * 元宝解锁伙伴
                 */
                HuoBanJieSuoMediator.prototype.yuanbaojiesuo = function () {
                    if (this.exchangeyuanbao <= BagModel.getInstance().yuanbaoIcon) { //元宝是否足够
                        RequesterProtocols._instance.c2s_exchange_currency(3, 1, this.exchangeyuanbao);
                        modules.bag.models.BagProxy.getInstance().once(modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.yinbijiesuo);
                        RequesterProtocols._instance.c2s_CActive_HuoBan(this.huobanid, 1, this.currentselect);
                    }
                    else { //跳转到充值界面
                        this.jinbiduihuan.hide();
                        modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                        game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);
                    }
                };
                /**
                 * 金币兑换银币
                 */
                HuoBanJieSuoMediator.prototype.buyjinbi = function () {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
                    if (fuShiNum < this.exchangeyuanbao) { //元宝是否够
                        this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                        this._TipsMessageMediator.show();
                        var param = new Dictionary();
                        param.set("contentId", 150506);
                        this._TipsMessageMediator.showContent(param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        RequesterProtocols._instance.c2s_exchange_currency(3, 2, this.exchangeyuanbao);
                    }
                };
                /**充值 */
                HuoBanJieSuoMediator.prototype.goRecharge = function () {
                    this.jinbiduihuan.hide();
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                    game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge); //前往充值界面。关闭当前界
                };
                HuoBanJieSuoMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                /**不足提示*/
                HuoBanJieSuoMediator.prototype.tishi = function (tishiid) {
                    var data = ChatModel.getInstance().chatMessageTips[tishiid];
                    this._viewUI.msgTips_lab.text = data.msg;
                    this._viewUI.msgTips1_img.visible = true;
                    Laya.Tween.to(this._viewUI.msgTips1_img, { y: 450 }, 1000, null, Laya.Handler.create(this, function () {
                        this._viewUI.msgTips1_img.visible = false;
                        this._viewUI.msgTips1_img.x = 180;
                        this._viewUI.msgTips1_img.y = 638;
                    }), null, false);
                };
                /**兑换提示*/
                HuoBanJieSuoMediator.prototype.duihuantishi = function () {
                    this.tishi(160403);
                };
                HuoBanJieSuoMediator.prototype.hide = function () {
                    huoban.models.HuoBanProxy.getInstance().event(huoban.models.JIEMIANCHANGE_EVENT);
                    _super.prototype.hide.call(this);
                };
                HuoBanJieSuoMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return HuoBanJieSuoMediator;
            }(game.modules.UiMediator));
            huoban.HuoBanJieSuoMediator = HuoBanJieSuoMediator;
        })(huoban = modules.huoban || (modules.huoban = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=HuoBanJieSuoMediator.js.map