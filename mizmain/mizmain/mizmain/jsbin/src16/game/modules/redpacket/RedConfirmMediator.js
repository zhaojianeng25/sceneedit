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
 * 发送红包确认界面
 */ var game;
(function (game) {
    var modules;
    (function (modules) {
        var redPacket;
        (function (redPacket) {
            var RedConfirmMediator = /** @class */ (function (_super) {
                __extends(RedConfirmMediator, _super);
                function RedConfirmMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.RedConfirmUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                RedConfirmMediator.prototype.show_UI = function (modeltype, redPack_money, redPack_number, redPack_JiYu) {
                    this.redPack_modeltype = modeltype;
                    this.redPack_money_text = redPack_money;
                    this.redPack_number_text = redPack_number;
                    this.redPack_JiYu_text = redPack_JiYu;
                    this.show();
                };
                RedConfirmMediator.prototype.show = function () {
                    this._init_UI();
                    _super.prototype.show.call(this);
                    this._viewUI.close_btn.on(LEvent.MOUSE_UP, this, this.back_redPackSend);
                };
                RedConfirmMediator.prototype._init_UI = function () {
                    this._init_label();
                    this._init_btn();
                };
                RedConfirmMediator.prototype._init_btn = function () {
                    this._viewUI.reset_btn.on(LEvent.CLICK, this, this.back_redPackSend);
                    this._viewUI.confirm_btn.on(LEvent.CLICK, this, this.send_redPack);
                };
                //发送红包，并给服务器发送数据
                RedConfirmMediator.prototype.send_redPack = function () {
                    var fushinum = Number(this.redPack_money_text);
                    var redpacknum = Number(this.redPack_number_text);
                    RequesterProtocols._instance.c2s_CSendRedPack(this.redPack_modeltype, fushinum, redpacknum, this.redPack_JiYu_text);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this.app);
                        LoginModel.getInstance().CommonPage == "";
                    }
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    this.hide();
                };
                //返回红包的发送界面
                RedConfirmMediator.prototype.back_redPackSend = function () {
                    //this.redPackSendUI.visible = true;
                    this._redPacketSendMediator = new redPacket.RedPacketSendMediator(this._app);
                    this._redPacketSendMediator.showUI(this.redPack_modeltype);
                    this.hide();
                };
                RedConfirmMediator.prototype._init_label = function () {
                    this._viewUI.hongBaoMoney_lab.text = this.redPack_money_text;
                    this._viewUI.hongBaoNumber_lab.text = this.redPack_number_text;
                    this._viewUI.hongBaoJiYu_output.text = this.redPack_JiYu_text;
                };
                RedConfirmMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this._viewUI.close_btn.off(LEvent.MOUSE_UP, this, this.back_redPackSend);
                    this._viewUI.reset_btn.off(LEvent.CLICK, this, this.back_redPackSend);
                    this._viewUI.confirm_btn.off(LEvent.CLICK, this, this.send_redPack);
                };
                RedConfirmMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return RedConfirmMediator;
            }(game.modules.UiMediator));
            redPacket.RedConfirmMediator = RedConfirmMediator;
        })(redPacket = modules.redPacket || (modules.redPacket = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RedConfirmMediator.js.map