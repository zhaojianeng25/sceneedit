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
* 角色系统底板类
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var roleinfo;
        (function (roleinfo) {
            var ButtonType;
            (function (ButtonType) {
                /**属性按钮 */
                ButtonType[ButtonType["shuxing_btn"] = 1] = "shuxing_btn";
                /**信息按钮 */
                ButtonType[ButtonType["xinxi_btn"] = 2] = "xinxi_btn";
                /**加点按钮 */
                ButtonType[ButtonType["jiadian_btn"] = 3] = "jiadian_btn";
            })(ButtonType || (ButtonType = {}));
            var RoleInfoModule = /** @class */ (function (_super) {
                __extends(RoleInfoModule, _super);
                function RoleInfoModule(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.RoleDibanUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    RoleInfoModel.getInstance().appBase = _this._app;
                    //人物属性界面
                    _this._RoleShuxinMediator = new roleinfo.RoleShuxinMediator(_this._viewUI);
                    //人物信息界面
                    _this._RoleXinxiMediator = new roleinfo.RoleXinxiMediator(_this._viewUI);
                    //人物加点界面
                    _this._RoleJiadianMediator = new roleinfo.RoleJiadianMediator(_this._viewUI);
                    _this.registerEvent();
                    return _this;
                }
                RoleInfoModule.prototype.show = function () {
                    _super.prototype.show.call(this);
                    //通知主界面开启蒙版
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                RoleInfoModule.prototype.onShow = function (event) {
                    this._app.uiRoot.closeLoadProgress();
                    this.show();
                    this.switchButton(roleinfo.models.RoleInfoModel.getInstance().currentKey);
                    this.switchChildUI(roleinfo.models.RoleInfoModel.getInstance().currentKey);
                };
                RoleInfoModule.prototype.getView = function () {
                    return this._viewUI;
                };
                RoleInfoModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this._RoleShuxinMediator.hide();
                    this._RoleXinxiMediator.hide();
                    this._RoleJiadianMediator.hide();
                    roleinfo.models.RoleInfoModel.getInstance().currentKey = RoleEnum.SHUXING_KEY; //打开角色系统，显示属性界面
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                /**注册点击事件 */
                RoleInfoModule.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.clickCloseBtnEvent);
                    this._viewUI.shuxin_btn.on(LEvent.MOUSE_DOWN, this, this.clickShuxinBtnEvent);
                    this._viewUI.xinxi_btn.on(LEvent.MOUSE_DOWN, this, this.clickXinxiBtnEvent);
                    this._viewUI.jiadian_btn.on(LEvent.MOUSE_DOWN, this, this.clickJiadianBtnEvent);
                };
                /**点击关闭按钮 */
                RoleInfoModule.prototype.clickCloseBtnEvent = function () {
                    //通知主界面关闭蒙版
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    this.hide();
                };
                /**点击属性按钮 */
                RoleInfoModule.prototype.clickShuxinBtnEvent = function () {
                    if (!this._viewUI.shuxin_btn.selected) {
                        this.switchButton(ButtonType.shuxing_btn);
                        this.switchChildUI(ButtonType.shuxing_btn);
                    }
                };
                /**点击信息按钮 */
                RoleInfoModule.prototype.clickXinxiBtnEvent = function () {
                    if (!this._viewUI.xinxi_btn.selected) {
                        this.switchButton(ButtonType.xinxi_btn);
                        this.switchChildUI(ButtonType.xinxi_btn);
                    }
                };
                /**点击加点按钮 */
                RoleInfoModule.prototype.clickJiadianBtnEvent = function () {
                    if (!this._viewUI.jiadian_btn.selected) {
                        this.switchButton(ButtonType.jiadian_btn);
                        this.switchChildUI(ButtonType.jiadian_btn);
                    }
                };
                /**
                 * 点击一个按钮后，其余按钮的状态
                 * @param index : button的类型
                 */
                RoleInfoModule.prototype.switchButton = function (index) {
                    //初始化button的select状态
                    this._viewUI.shuxin_btn.selected = false;
                    this._viewUI.xinxi_btn.selected = false;
                    this._viewUI.jiadian_btn.selected = false;
                    switch (index) {
                        case ButtonType.shuxing_btn:
                            this._viewUI.shuxin_btn.selected = true;
                            break;
                        case ButtonType.xinxi_btn:
                            this._viewUI.xinxi_btn.selected = true;
                            break;
                        case ButtonType.jiadian_btn:
                            this._viewUI.jiadian_btn.selected = true;
                            break;
                        default:
                            console.log("RoleInfoModule.switchButton error");
                    }
                };
                /**
                 * 切换子界面
                 * @param index : button的类型
                 */
                RoleInfoModule.prototype.switchChildUI = function (index) {
                    switch (index) {
                        case ButtonType.shuxing_btn:
                            this._RoleShuxinMediator.show();
                            this._RoleXinxiMediator.hide();
                            this._RoleJiadianMediator.hide();
                            break;
                        case ButtonType.xinxi_btn:
                            this._RoleShuxinMediator.hide();
                            this._RoleXinxiMediator.show();
                            this._RoleJiadianMediator.hide();
                            break;
                        case ButtonType.jiadian_btn:
                            this._RoleShuxinMediator.hide();
                            this._RoleXinxiMediator.hide();
                            this._RoleJiadianMediator.show();
                            break;
                        default:
                            console.log("RoleInfoModule.switchChildUI error");
                    }
                };
                return RoleInfoModule;
            }(game.modules.ModuleMediator));
            roleinfo.RoleInfoModule = RoleInfoModule;
        })(roleinfo = modules.roleinfo || (modules.roleinfo = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleInfoModule.js.map