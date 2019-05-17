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
* 手机关联验证
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var reward;
        (function (reward) {
            var BindTelMediator = /** @class */ (function (_super) {
                __extends(BindTelMediator, _super);
                function BindTelMediator(app) {
                    var _this = _super.call(this) || this;
                    _this._viewUI = new ui.common.component.PhoneAssociationUI();
                    _this.uiLayer = app.uiRoot.general;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, function () {
                        modules.ModuleManager.jumpPage(modules.ModuleNames.REWARD, null, _this._app);
                        _this.hide();
                    });
                    _this._viewUI.getPin_btn.on(LEvent.MOUSE_DOWN, _this, _this.getPin);
                    _this._viewUI.PhoneAssociation_btn.on(LEvent.MOUSE_DOWN, _this, _this.PhoneAssociation);
                    return _this;
                }
                /** 手机格式验证 */
                BindTelMediator.prototype.getPin = function () {
                    var tel = this._viewUI.phoneNumber_textinput.text;
                    if (!(/^1[34578]\d{9}$/.test(tel))) {
                        //提示手机格式不正确
                        return;
                    }
                    RequesterProtocols._instance.c2s_CGetCheckCode(parseInt(tel));
                    RewardProxy.getInstance().on(reward.models.FINISHTIME_EVENT, this, function () {
                        //验证码倒计时完成时间点
                    });
                };
                /** 手机关联按钮 */
                BindTelMediator.prototype.PhoneAssociation = function () {
                    var tel = parseInt(this._viewUI.phoneNumber_textinput.text);
                    var code = this._viewUI.pin_textinput.text;
                    RequesterProtocols._instance.c2s_CBindTel(tel, code);
                    RewardProxy.getInstance().on(reward.models.BINDTEL_EVENT, this, function () {
                        //确认关联手机返回状态1成功0失败
                        var state = 1;
                        if (state != 0) {
                        }
                    });
                };
                BindTelMediator.prototype.onShow = function () {
                    _super.prototype.show.call(this);
                };
                BindTelMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                BindTelMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                BindTelMediator.prototype.jumpPage = function (index) {
                    this.show();
                };
                BindTelMediator.PHONEASSOCIATION_EVENT = "phoneAssociationEvent";
                return BindTelMediator;
            }(game.modules.ModuleMediator));
            reward.BindTelMediator = BindTelMediator;
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BindTelMediator.js.map