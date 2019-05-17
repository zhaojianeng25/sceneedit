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
        var family;
        (function (family) {
            /** 创建公会 */
            var FamilyCreatViewMediator = /** @class */ (function (_super) {
                __extends(FamilyCreatViewMediator, _super);
                function FamilyCreatViewMediator(app) {
                    var _this = _super.call(this) || this;
                    /**客户端信息提示表 */
                    _this.chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.FamilyBuildUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.close);
                    _this._viewUI.cos_btn.on(LEvent.MOUSE_DOWN, _this, _this.createFamily);
                    return _this;
                }
                /**
                 * 创建公会
                 */
                FamilyCreatViewMediator.prototype.createFamily = function () {
                    var familyname = this._viewUI.familyname_input.text;
                    var familyzongzhi = this._viewUI.familyzongzhi_input.text;
                    var globalIcon = game.modules.bag.models.BagModel._instance.globalIcon;
                    if (globalIcon < 10000) {
                        this.jinbiduihuan = new modules.commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
                        var yinbi = 10000 - globalIcon;
                        var yuanbao = yinbi / 100;
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
                        this.jinbiduihuan.onShow(true, yinbi + "", yuanbao + "", jinbi + "");
                        this.jinbiduihuan.once(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [yuanbao, familyname, familyzongzhi]);
                    }
                    else {
                        this.CCreateClan(familyname, familyzongzhi);
                        game.modules.createrole.models.LoginModel.getInstance().CommonPage = "";
                        family.models.FamilyProxy._instance.event(family.models.CloseJoinView);
                    }
                };
                /**仙晶兑换 */
                FamilyCreatViewMediator.prototype.goCharge = function (yuanbao, familyname, familyzongzhi) {
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
                        modules.bag.models.BagProxy.getInstance().once(modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.judgeGoldIsEnough);
                        RequesterProtocols._instance.c2s_exchange_currency(3, 2, yuanbao);
                    }
                };
                /**创建帮派 */
                FamilyCreatViewMediator.prototype.create = function (familyname, familyzongzhi) {
                    this.CCreateClan(familyname, familyzongzhi);
                };
                /**前往充值界面 */
                FamilyCreatViewMediator.prototype.goRecharge = function () {
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                    game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge); //前往充值界面。关闭当前界面
                    this.hide();
                };
                /**
                 * 关闭创建公会界面
                 */
                FamilyCreatViewMediator.prototype.close = function () {
                    var CommonPage = game.modules.createrole.models.LoginModel.getInstance().CommonPage;
                    if (CommonPage != "") {
                        modules.ModuleManager.show(CommonPage, this._app);
                        game.modules.createrole.models.LoginModel.getInstance().CommonPage = "";
                    }
                    this.hide();
                };
                /**
                 * 客户端请求创建公会
                 * @param clanname 公会名字
                 * @param clanaim 公会宗旨（公告）
                 */
                FamilyCreatViewMediator.prototype.CCreateClan = function (clanname, clanaim) {
                    modules.chat.models.ChatProxy.getInstance().once(modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, this, this.showDisTipsMsg);
                    RequesterProtocols._instance.c2s_CCreateClan(clanname, clanaim);
                };
                /** 显示提示信息 */
                FamilyCreatViewMediator.prototype.showDisTipsMsg = function (msg) {
                    if (msg == ChatModel.getInstance().chatMessageTips[145068]["msg"]) {
                        this.hide();
                        return;
                    }
                    var _DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    _DisappearMessageTipsMediator.onShow(msg);
                };
                FamilyCreatViewMediator.prototype.show = function () {
                    this.judgeGoldIsEnough();
                    _super.prototype.show.call(this);
                };
                /** 判断金币是否足够 */
                FamilyCreatViewMediator.prototype.judgeGoldIsEnough = function () {
                    var globalIcon = game.modules.bag.models.BagModel._instance.globalIcon;
                    if (globalIcon < 10000) {
                        this._viewUI.cos_btn.labelStrokeColor = "#ff0000";
                    }
                    else {
                        this._viewUI.cos_btn.labelStrokeColor = "#50321a";
                    }
                };
                FamilyCreatViewMediator.prototype.hide = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    _super.prototype.hide.call(this);
                };
                FamilyCreatViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilyCreatViewMediator;
            }(game.modules.ModuleMediator));
            family.FamilyCreatViewMediator = FamilyCreatViewMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyCreatViewMediator.js.map