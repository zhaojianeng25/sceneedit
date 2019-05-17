/**Remind.ui */
// import JinBiBuZuUI = ui.common.component.JinBiBuZuUI;
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
            /**银币兑换界面中，使用金币兑换按钮事件*/
            commonUI.USE_GOLD_EXCHANGE_EVENT = "useGoldExchangeEvent";
            /**银币兑换界面中，使用符石兑换按钮事件 */
            commonUI.USE_SILVER_EXCHANGE_EVENT = "useSilverExchangeEvent";
            /**金币补助界面，使用符石兑换按钮事件 */
            commonUI.USE_YUANBAO_EXCHANGE_EVENT = "useYuanBaoExchangeEvent";
            var JinBiBuZuViewMediator = /** @class */ (function (_super) {
                __extends(JinBiBuZuViewMediator, _super);
                function JinBiBuZuViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI = new ui.common.component.JinBiBuZuUI();
                    _this._viewUI.mouseThrough = false;
                    _this.isCenter = true;
                    return _this;
                }
                ////////////////
                ///业务逻辑
                ////////////////
                /**
                 * @describe  显示提示UI
                 * @param isShowGold   是否显示金币不足界面 true：不显示金币不足界面 false: 显示银币不足界面
                 * @param needMoney 还需要多少钱（不够多少钱）
                 * @param yuanBaoNumber 还需要钱换算成仙晶（元宝）的数量
                 * @param goldNumber 还需要钱换算成金币的数量
                 */
                JinBiBuZuViewMediator.prototype.onShow = function (isShowGold, needMoney, yuanBaoNumber, goldNumber) {
                    this.onLoad(isShowGold, needMoney, yuanBaoNumber, goldNumber);
                    _super.prototype.show.call(this);
                };
                JinBiBuZuViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                JinBiBuZuViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**
                 * @describe  开始加载
                 * @param prompt   提示语句
                 */
                JinBiBuZuViewMediator.prototype.onLoad = function (isShowGold, needMoney, YuanBaoNumber, goldNumber) {
                    this._viewUI.gold_box.visible = false;
                    this._viewUI.silver_box.visible = false;
                    if (isShowGold) { //显示金币不足界面
                        this._viewUI.gold_box.visible = true;
                        this.setLackGoldNumber(needMoney);
                        this.setYuanBaoOfGoldNumber(YuanBaoNumber);
                    }
                    else {
                        this._viewUI.silver_box.visible = true;
                        this.setLackSilverNumber(needMoney);
                        this.setGoldNumber(goldNumber);
                        this.setYuanBaoNumber(YuanBaoNumber);
                    }
                    this.redJInBiYunBaoBuZu(YuanBaoNumber, goldNumber); // 判断一下金币 和元宝是否显示红色按钮
                    this.registerEvent(needMoney, YuanBaoNumber, goldNumber);
                };
                /**
                 * @describe  注册事件
                 */
                JinBiBuZuViewMediator.prototype.registerEvent = function (needMoney, YuanBaoNumber, goldNumber) {
                    this._viewUI.useGold_btn.on(LEvent.MOUSE_DOWN, this, this.onClickUseGoldBtnEvent, [needMoney, YuanBaoNumber, goldNumber]);
                    this._viewUI.useYuanBaoOfSilver_btn.on(LEvent.MOUSE_DOWN, this, this.onClickUseYuanBaoOfSilverBtnEvent);
                    this._viewUI.useYuanBaoOfGold_btn.on(LEvent.MOUSE_DOWN, this, this.onClickUseYuanBaoOfGoldBtnEvent);
                    this._viewUI.close_btn.on(LEvent.CLICK, this, this.hide);
                    this._viewUI.mengban_img.visible = true;
                };
                ////////////////
                ///UI
                ////////////////
                /**
                 * @describe   兑换金币界面，设置需要金币数量
                 * @param   num     数量
                 */
                JinBiBuZuViewMediator.prototype.setLackGoldNumber = function (num) {
                    this._viewUI.lackGloalNumber_lab.text = num;
                };
                /**
                 * @describe  兑换金币界面，设置使用符石的数量
                 * @param num   数量
                 */
                JinBiBuZuViewMediator.prototype.setYuanBaoOfGoldNumber = function (num) {
                    this._viewUI.yuanBaoOfGoldNumber_lab.text = num;
                };
                /**
                 * @describe   兑换银币界面，设置需要银币数量
                 * @param   num     数量
                 */
                JinBiBuZuViewMediator.prototype.setLackSilverNumber = function (num) {
                    this._viewUI.lackSilverNumber_lab.text = num;
                };
                /**
                 * @describe  兑换银币界面，设置使用符石兑换的数量
                 * @param num 数量
                 */
                JinBiBuZuViewMediator.prototype.setYuanBaoNumber = function (num) {
                    this._viewUI.yuanBaoNumber_lab.text = num;
                };
                /**
                 * @describe  兑换银币界面，设置可以代替的金币数量
                 * @param num   数量
                 */
                JinBiBuZuViewMediator.prototype.setGoldNumber = function (num) {
                    if (typeof (num) != "undefined") {
                        this._viewUI.goldNumber_lab.text = num;
                    }
                };
                ////////////////
                ///事件
                ////////////////
                /**
                 * @describe  银币补助界面，点击使用金币代替按钮事件
                 */
                JinBiBuZuViewMediator.prototype.onClickUseGoldBtnEvent = function (needMoney, YuanBaoNumber, goldNumber) {
                    var globalIcon = game.modules.bag.models.BagModel._instance.globalIcon; //金币
                    if (globalIcon < goldNumber) {
                        this.onLoad(true, goldNumber, YuanBaoNumber, goldNumber);
                    }
                    else {
                        modules.bag.models.BagProxy.getInstance().once(modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.sendEvent);
                        RequesterProtocols._instance.c2s_exchange_currency(2, 1, goldNumber);
                        this.hide();
                    }
                    // this.hide();
                };
                /** 派发事件消息 */
                JinBiBuZuViewMediator.prototype.sendEvent = function () {
                    this.event(commonUI.USE_GOLD_EXCHANGE_EVENT);
                };
                /**
                * @describe  金币元宝不足，设置按钮显示红色的
                * @param YuanBaoNumber 元宝
                * @param goldNumber 金币
                */
                JinBiBuZuViewMediator.prototype.redJInBiYunBaoBuZu = function (YuanBaoNumber, goldNumber) {
                    var yuanbao = game.modules.bag.models.BagModel._instance.yuanbaoIcon; //元宝
                    var global = game.modules.bag.models.BagModel._instance.globalIcon; //金币
                    if (YuanBaoNumber > yuanbao) {
                        this._viewUI.yuanBaoNumber_lab.stroke = 4;
                        this._viewUI.yuanBaoNumber_lab.strokeColor = "#FF2800";
                    }
                    else {
                        this._viewUI.yuanBaoNumber_lab.stroke = 1;
                        this._viewUI.yuanBaoNumber_lab.strokeColor = "#ffffff";
                    }
                    if (goldNumber > global) {
                        this._viewUI.goldNumber_lab.stroke = 4;
                        this._viewUI.goldNumber_lab.strokeColor = "#FF2800";
                    }
                    else {
                        this._viewUI.goldNumber_lab.stroke = 1;
                        this._viewUI.goldNumber_lab.strokeColor = "#ffffff";
                    }
                };
                /**
                 * @describe  银币补足界面，点击使用符石兑换按钮事件
                 */
                JinBiBuZuViewMediator.prototype.onClickUseYuanBaoOfSilverBtnEvent = function () {
                    this.event(commonUI.USE_SILVER_EXCHANGE_EVENT);
                    this.hide();
                };
                /**
                 * @describe  金币补助界面，点击使用符石兑换按钮事件
                 */
                JinBiBuZuViewMediator.prototype.onClickUseYuanBaoOfGoldBtnEvent = function () {
                    this.event(commonUI.USE_YUANBAO_EXCHANGE_EVENT);
                    this.hide();
                };
                return JinBiBuZuViewMediator;
            }(game.modules.UiMediator));
            commonUI.JinBiBuZuViewMediator = JinBiBuZuViewMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=JinBiBuZuViewMediator.js.map