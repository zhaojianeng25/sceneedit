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
        var strengThening;
        (function (strengThening) {
            /** 强化系统模块 */
            var StrengTheningModule = /** @class */ (function (_super) {
                __extends(StrengTheningModule, _super);
                function StrengTheningModule(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.StrengTheningMainUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._StrengTheningMakeViewMediator = new strengThening.StrengTheningMakeViewMediator(_this._viewUI, _this._app);
                    _this._StrengTheningInsertViewMediator = new strengThening.StrengTheningInsertViewMediator(_this._viewUI, _this._app);
                    _this._StrengTheningCompoundViewMediator = new strengThening.StrengTheningCompoundViewMediator(_this._viewUI, _this._app);
                    _this._StrengTheningFixViewMediator = new strengThening.StrengTheningFixViewMediator(_this._viewUI, _this._app);
                    _this._viewUI.m_tab.selectHandler = new Handler(_this, _this.onMtab);
                    _this._viewUI.close_btn.on(LEvent.CLICK, _this, _this.onCloseBtn);
                    strengThening.models.StrengTheningProxy.getInstance().on(strengThening.models.insertRedDot, _this, _this.showInsertRedDot);
                    return _this;
                }
                /**显示镶嵌红点 */
                StrengTheningModule.prototype.showInsertRedDot = function (state) {
                    if (state == 0) {
                        this._viewUI.insertPoint_img.visible = false;
                    }
                    else {
                        this._viewUI.insertPoint_img.visible = true;
                    }
                };
                /**关闭界面 */
                StrengTheningModule.prototype.onCloseBtn = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    this.hideInterface();
                };
                /**选择显示打造界面、镶嵌界面、合成界面、修理揭秘那 */
                StrengTheningModule.prototype.onMtab = function (index) {
                    switch (index) {
                        case 0:
                            this.onMakeBtn(); //打造界面
                            break;
                        case 1:
                            this.onInsertBtn(); // 镶嵌界面
                            break;
                        case 2:
                            this.onCompoundBtn(); //合成界面
                            break;
                        case 3:
                            this.onFixBtn(); //修理界面
                            break;
                    }
                };
                /**镶嵌 */
                StrengTheningModule.prototype.onInsertBtn = function () {
                    game.modules.strengThening.models.StrengTheningModel._instance.tabNum = 1;
                    this._StrengTheningInsertViewMediator.show();
                    this._StrengTheningMakeViewMediator.hide();
                    this._StrengTheningCompoundViewMediator.hide();
                    this._StrengTheningFixViewMediator.hide();
                };
                /**打造 */
                StrengTheningModule.prototype.onMakeBtn = function () {
                    game.modules.strengThening.models.StrengTheningModel._instance.tabNum = 0;
                    this._StrengTheningMakeViewMediator.show();
                    this._StrengTheningInsertViewMediator.hide();
                    this._StrengTheningCompoundViewMediator.hide();
                    this._StrengTheningFixViewMediator.hide();
                };
                /**合成 */
                StrengTheningModule.prototype.onCompoundBtn = function () {
                    game.modules.strengThening.models.StrengTheningModel._instance.tabNum = 2;
                    this._StrengTheningCompoundViewMediator.show();
                    this._StrengTheningMakeViewMediator.hide();
                    this._StrengTheningInsertViewMediator.hide();
                    this._StrengTheningFixViewMediator.hide();
                };
                /**修理 */
                StrengTheningModule.prototype.onFixBtn = function () {
                    game.modules.strengThening.models.StrengTheningModel._instance.tabNum = 3;
                    this._StrengTheningFixViewMediator.show();
                    this._StrengTheningCompoundViewMediator.hide();
                    this._StrengTheningMakeViewMediator.hide();
                    this._StrengTheningInsertViewMediator.hide();
                };
                StrengTheningModule.prototype.onShow = function (event) {
                    this.show();
                    this._viewUI.m_tab.selectedIndex = strengThening.models.StrengTheningModel.getInstance().tabNum;
                    this.onMtab(strengThening.models.StrengTheningModel.getInstance().tabNum);
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                StrengTheningModule.prototype.hide = function () {
                    strengThening.models.StrengTheningModel.getInstance().tabNum = 0;
                    if (LoginModel.getInstance().transferInterface != "") {
                        // ModuleManager.show(LoginModel.getInstance().transferInterface, this._app);
                        // LoginModel.getInstance().CommonPage = "";
                    }
                    else if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    _super.prototype.hide.call(this);
                };
                StrengTheningModule.prototype.hideInterface = function () {
                    strengThening.models.StrengTheningModel.getInstance().tabNum = 0;
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    _super.prototype.hide.call(this);
                };
                StrengTheningModule.prototype.getView = function () {
                    return this._viewUI;
                };
                return StrengTheningModule;
            }(game.modules.ModuleMediator));
            strengThening.StrengTheningModule = StrengTheningModule;
        })(strengThening = modules.strengThening || (modules.strengThening = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=StrengTheningModule.js.map