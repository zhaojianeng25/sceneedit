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
* 帮派系统
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var FamilyModule = /** @class */ (function (_super) {
                __extends(FamilyModule, _super);
                function FamilyModule(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.FamilySystemUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._FamilyInfoViewMediator = new family.FamilyInfoViewMediator(_this._viewUI, _this._app);
                    _this._FamilyMemberViewMediator = new family.FamilyMemberViewMediator(_this._viewUI, _this._app);
                    _this._FamilyWelfareViewMediator = new family.FamilyWelfareViewMediator(_this._viewUI, _this._app);
                    _this._FamilyActivityViewMediator = new family.FamilyActivityViewMediator(_this._viewUI, _this._app);
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this._viewUI.familyBtn_tab.selectHandler = new Handler(_this, _this.onFamilyBtn);
                    family.models.FamilyProxy._instance.on(family.models.CloseModule, _this, _this.hide);
                    family.models.FamilyProxy._instance.on(family.models.isShowFamilyRedDot, _this, _this.isShowFamilyRedDot);
                    family.models.FamilyProxy._instance.on(family.models.SClanRedTip, _this, _this.showRedDot);
                    return _this;
                }
                /**是否显示公会红点 */
                FamilyModule.prototype.isShowFamilyRedDot = function (state) {
                    if (state == 0) {
                        this._viewUI.familyHongdian_img.visible = false;
                    }
                    else {
                        this._viewUI.familyHongdian_img.visible = true;
                    }
                };
                /**根据协议返回显示红点 */
                FamilyModule.prototype.showRedDot = function (redtips) {
                    var keys = redtips.keys;
                    if (redtips.get(keys[0]) == 1) {
                        this._viewUI.familyHongdian_img.visible = true; //显示
                    }
                    else {
                        this._viewUI.familyHongdian_img.visible = false; //关闭
                    }
                };
                /**选择显示公会信息界面、公会成员界面、福利界面、活动界面 */
                FamilyModule.prototype.onFamilyBtn = function (index) {
                    switch (index) {
                        case 0:
                            this.FamilyInfo(); //公会信息界面
                            break;
                        case 1:
                            this.FamilyMember(); //成员界面
                            break;
                        case 2:
                            this.FamilyWelfare(); //福利界面
                            break;
                        case 3:
                            this.FamilyActivity(); //活动界面
                            break;
                    }
                };
                /**
                 * 帮派信息
                 */
                FamilyModule.prototype.FamilyInfo = function () {
                    this._FamilyInfoViewMediator.show();
                    this._FamilyMemberViewMediator.hide();
                    this._FamilyWelfareViewMediator.hide();
                    this._FamilyActivityViewMediator.hide();
                };
                /**成员 */
                FamilyModule.prototype.FamilyMember = function () {
                    this._FamilyInfoViewMediator.hide();
                    this._FamilyMemberViewMediator.show();
                    this._FamilyWelfareViewMediator.hide();
                    this._FamilyActivityViewMediator.hide();
                };
                /**福利 */
                FamilyModule.prototype.FamilyWelfare = function () {
                    this._FamilyInfoViewMediator.hide();
                    this._FamilyMemberViewMediator.hide();
                    this._FamilyWelfareViewMediator.show();
                    this._FamilyActivityViewMediator.hide();
                };
                /**活动 */
                FamilyModule.prototype.FamilyActivity = function () {
                    this._FamilyInfoViewMediator.hide();
                    this._FamilyMemberViewMediator.hide();
                    this._FamilyWelfareViewMediator.hide();
                    this._FamilyActivityViewMediator.show();
                };
                /**移除主界面tips监听 */
                FamilyModule.prototype.offMainEvent = function () {
                    family.models.FamilyProxy._instance.event(family.models.removeMainTips);
                };
                FamilyModule.prototype.onShow = function (event) {
                    this.offMainEvent();
                    this.show();
                    this._viewUI.familyBtn_tab.selectedIndex = 0;
                    var _clanCurrenTabNum = family.models.FamilyModel.getInstance().clanCurrenTabNum;
                    if (_clanCurrenTabNum != -1) {
                        this._viewUI.familyBtn_tab.selectedIndex = _clanCurrenTabNum;
                        family.models.FamilyModel.getInstance().clanCurrenTabNum = -1;
                    }
                    else {
                        this._FamilyInfoViewMediator.show();
                    }
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                FamilyModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                FamilyModule.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilyModule;
            }(game.modules.ModuleMediator));
            family.FamilyModule = FamilyModule;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyModule.js.map