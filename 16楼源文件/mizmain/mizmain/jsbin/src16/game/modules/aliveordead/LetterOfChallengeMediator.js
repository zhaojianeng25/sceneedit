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
        var aliveordead;
        (function (aliveordead) {
            /** 战仙会（生死斗）的下战书界面 */
            var LetterOfChallengeMediator = /** @class */ (function (_super) {
                __extends(LetterOfChallengeMediator, _super);
                function LetterOfChallengeMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.ChallengeToUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                LetterOfChallengeMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.registerEvent();
                    this.init();
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                /** 界面的初始化 */
                LetterOfChallengeMediator.prototype.init = function () {
                    this._viewUI.determine_btn.mouseEnabled = false;
                    this._viewUI.determine_btn.gray = true;
                    this._viewUI.battleWith_rag.selectedIndex = 0;
                };
                /** 事件注册 */
                LetterOfChallengeMediator.prototype.registerEvent = function () {
                    //UI控件事件监听
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.roleNameOrRoleId_txtinput.on(LEvent.INPUT, this, this.changeBtn);
                    this._viewUI.determine_btn.on(LEvent.MOUSE_DOWN, this, this.determine);
                    this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    //消息事件监听
                    aliveordead.models.AliveOrDeadProxy.getInstance().on(aliveordead.models.InvitationLiveDieSuccess, this, this.showConfirmUI);
                    aliveordead.models.AliveOrDeadProxy.getInstance().on(aliveordead.models.InvitationLiveDieOK, this, this.hide);
                };
                /** 确认下战书 */
                LetterOfChallengeMediator.prototype.confirmInvitation = function () {
                    var yinBiNum = BagModel.getInstance().sliverIcon; //获取银币数量
                    if (yinBiNum < this._invitationSuccessVo.costmoney) { //不能支付下战书所需花费的银币
                        /** 需要兑换的银币 */
                        var duihuanMoney = this._invitationSuccessVo.costmoney - yinBiNum;
                        /** 兑换所需的仙晶 */
                        var _needFuShi = void 0;
                        if ((Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI) - HudModel.getInstance().fuShiNum) <= 0) {
                            _needFuShi = Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI);
                        }
                        else {
                            _needFuShi = (Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI) - HudModel.getInstance().fuShiNum);
                        }
                        /** 兑换所需的金币 */
                        var _needGold = void 0;
                        if ((Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI) - HudModel.getInstance().goldNum) <= 0) {
                            _needGold = Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI);
                        }
                        else {
                            _needGold = (Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI) - HudModel.getInstance().goldNum);
                        }
                        var _jinBiBuZu = new modules.commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
                        _jinBiBuZu.onShow(false, duihuanMoney.toString(), _needFuShi.toString(), _needGold.toString());
                        _jinBiBuZu.once(modules.commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.yuanBaoDuiHuanYinBi, [_needFuShi]);
                        _jinBiBuZu.once(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.yuanBaoDuiHuanJinBi, [_needFuShi]);
                    }
                    else {
                        RequesterProtocols._instance.c2s_CInvitationLiveDieBattleOK(this._invitationSuccessVo.objectid, this._invitationSuccessVo.selecttype);
                    }
                    this.hide();
                };
                /**仙晶兑换金币 */
                LetterOfChallengeMediator.prototype.yuanBaoDuiHuanJinBi = function (yuanbao) {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
                    if (fuShiNum < yuanbao) {
                        var param = new Dictionary();
                        param.set("contentId", RoleEnum.XIANJIN_TIP);
                        var _tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        RequesterProtocols._instance.c2s_exchange_currency(3, 2, yuanbao);
                    }
                };
                /** 元宝兑换银币 */
                LetterOfChallengeMediator.prototype.yuanBaoDuiHuanYinBi = function (yuanbao) {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
                    if (fuShiNum < yuanbao) {
                        var param = new Dictionary();
                        param.set("contentId", RoleEnum.XIANJIN_TIP);
                        var _tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        RequesterProtocols._instance.c2s_exchange_currency(3, 1, yuanbao);
                    }
                };
                /**充值 */
                LetterOfChallengeMediator.prototype.goRecharge = function () {
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                    game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge); //前往充值界面。关闭当前界
                };
                /** 显示确认界面 */
                LetterOfChallengeMediator.prototype.showConfirmUI = function (vo) {
                    this._invitationSuccessVo = vo;
                    var parame = new Laya.Dictionary();
                    parame.set("contentId", 162070);
                    parame.set("parame", [vo.objectname, vo.costmoney.toString()]);
                    modules.tips.models.TipsProxy.getInstance().once(modules.tips.models.TIPS_ON_OK, this, this.confirmInvitation);
                    var _tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, parame);
                };
                /** 确定下战书 */
                LetterOfChallengeMediator.prototype.determine = function () {
                    var txtStr = this._viewUI.roleNameOrRoleId_txtinput.text;
                    var _selecttype = LiveDeadSelectType.OnePerson;
                    if (this._viewUI.battleWith_rag.selectedIndex == 1) {
                        _selecttype = LiveDeadSelectType.MultiplePerson;
                    }
                    RequesterProtocols._instance.c2s_CInvitationLiveDieBattle(txtStr, _selecttype);
                };
                /** 更改按钮状态
                 * @describe 以防玩家没输入任何名字或者id就下战书
                 */
                LetterOfChallengeMediator.prototype.changeBtn = function () {
                    if (this._viewUI.roleNameOrRoleId_txtinput.text == "") {
                        this._viewUI.determine_btn.mouseEnabled = false;
                        this._viewUI.determine_btn.gray = true;
                    }
                    else {
                        this._viewUI.determine_btn.mouseEnabled = true;
                        this._viewUI.determine_btn.gray = false;
                    }
                };
                LetterOfChallengeMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.removeEvent();
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                /** 移除事件 */
                LetterOfChallengeMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.roleNameOrRoleId_txtinput.off(LEvent.INPUT, this, this.changeBtn);
                    this._viewUI.determine_btn.off(LEvent.MOUSE_DOWN, this, this.determine);
                    this._viewUI.cancel_btn.off(LEvent.MOUSE_DOWN, this, this.hide);
                    aliveordead.models.AliveOrDeadProxy.getInstance().off(aliveordead.models.InvitationLiveDieSuccess, this, this.showConfirmUI);
                    aliveordead.models.AliveOrDeadProxy.getInstance().off(aliveordead.models.InvitationLiveDieOK, this, this.hide);
                };
                LetterOfChallengeMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return LetterOfChallengeMediator;
            }(game.modules.UiMediator));
            aliveordead.LetterOfChallengeMediator = LetterOfChallengeMediator;
        })(aliveordead = modules.aliveordead || (modules.aliveordead = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LetterOfChallengeMediator.js.map