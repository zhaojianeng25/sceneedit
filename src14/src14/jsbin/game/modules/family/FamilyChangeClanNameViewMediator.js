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
* 修改公会名称
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var FamilyChangeClanNameViewMediator = /** @class */ (function (_super) {
                __extends(FamilyChangeClanNameViewMediator, _super);
                function FamilyChangeClanNameViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this._viewUI = new ui.common.FamilyChangeClanNameUI();
                    _this._app = app;
                    _this.isCenter = false;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    return _this;
                }
                /**显示改名花费 */
                FamilyChangeClanNameViewMediator.prototype.showChangeNameCost = function (oldName) {
                    var yuanbao = game.modules.bag.models.BagModel._instance.yuanbaoIcon;
                    this._viewUI.mYuanbao_label.text = yuanbao + "";
                    this._viewUI.oldName_label.text = oldName;
                    this._viewUI.cos_btn.on(LEvent.MOUSE_DOWN, this, this.changeClanName, [yuanbao]);
                };
                /**改名 */
                FamilyChangeClanNameViewMediator.prototype.changeClanName = function (yuanbao) {
                    var newName = this._viewUI.familyname_input.text;
                    if (newName != "") {
                        if (yuanbao < 100) {
                            this.goCharge();
                        }
                        else {
                            this.CChangeClanName(newName);
                        }
                    }
                };
                /**仙晶兑换 */
                FamilyChangeClanNameViewMediator.prototype.goCharge = function () {
                    this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                    this._TipsMessageMediator.show();
                    var param = new Dictionary();
                    param.set("contentId", 150506);
                    this._TipsMessageMediator.showContent(param);
                    game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                };
                /**前往充值 */
                FamilyChangeClanNameViewMediator.prototype.goRecharge = function () {
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                    game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge); //前往充值界面。关闭当前界面
                    family.models.FamilyProxy._instance.event(family.models.CloseModule);
                    this.hide();
                };
                FamilyChangeClanNameViewMediator.prototype.CChangeClanName = function (newName) {
                    this.hide();
                    RequesterProtocols._instance.c2s_CChangeClanName(newName);
                };
                FamilyChangeClanNameViewMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                FamilyChangeClanNameViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                FamilyChangeClanNameViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilyChangeClanNameViewMediator;
            }(game.modules.UiMediator));
            family.FamilyChangeClanNameViewMediator = FamilyChangeClanNameViewMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyChangeClanNameViewMediator.js.map