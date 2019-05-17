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
* 通用地板
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var PetModule = /** @class */ (function (_super) {
                __extends(PetModule, _super);
                function PetModule(app) {
                    var _this = _super.call(this) || this;
                    /**记录当前选中的属性面板次数 */
                    _this.selectedNum = 0;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.PetGongYongDiBanUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.petAttriButeNewMediator = new pet.PetAttriButeNewMediator(_this._viewUI);
                    _this.petAttriButeNewMediator.app = app;
                    _this.petLianChongMediator = new pet.PetLianChongMediator(_this._viewUI);
                    _this.petLianChongMediator.app = app;
                    _this.petTuJianMediator = new pet.PetTuJianMediator(_this._viewUI);
                    _this.petTuJianMediator.app = app;
                    _this.petPeiYangMediator = new pet.PetPeiYangMediator(_this._viewUI);
                    _this.petPeiYangMediator.app = app;
                    _this._viewUI.button_tab.selectHandler = new Laya.Handler(_this, _this.onselects);
                    _this._viewUI.close_btn.clickHandler = new Laya.Handler(_this, _this.close);
                    _this._viewUI.petbk_img.on(LEvent.MOUSE_UP, _this, _this.hidedata);
                    _this.accept();
                    _this.init();
                    return _this;
                }
                PetModule.getInstance = function (app) {
                    if (!this._instance) {
                        this._instance = new PetModule(app);
                    }
                    return this._instance;
                };
                /**修改名字*/
                PetModule.prototype.accept = function () {
                    pet.models.PetProxy.getInstance().on(pet.models.CHANGEUI_EVENT, this, this.change);
                };
                /**切换界面*/
                PetModule.prototype.change = function (e) {
                    this._viewUI.button_tab.selectedIndex = 2;
                };
                /**隐藏提示框*/
                PetModule.prototype.hidedata = function () {
                    switch (this._viewUI.button_tab.selectedIndex) { // 0属性界面 1为炼宠界面 2为培养界面
                        case 0:
                            this.petAttriButeNewMediator.hidedata();
                            break;
                        case 1:
                            this.petLianChongMediator.hidedata();
                            break;
                        case 2:
                            this.petPeiYangMediator.hidedata();
                            break;
                        default:
                            break;
                    }
                };
                /**初始化数据*/
                PetModule.prototype.init = function () {
                    var top;
                    PetModel.getInstance().petbasedata = PetModel.getInstance().pets.get(PetModel.getInstance().pets.keys[0]);
                    PetModel.getInstance().petskill = PetModel.getInstance().petbasedata.skills;
                    PetModel.getInstance().petinitfight = PetModel.getInstance().petbasedata.initbfp;
                    PetModel.getInstance().petbasicfight = PetModel.getInstance().petbasedata.bfp;
                };
                /**选择显示哪个窗口*/
                PetModule.prototype.onselects = function (index) {
                    if (index != -1) { //关闭界面是为-1
                        PetModel.getInstance().tabnum = index;
                    }
                    switch (index) { //0属性界面 1炼宠界面 2培养界面 3图鉴界面
                        case 0:
                            var isxuanzhe = this.judgepet();
                            if (isxuanzhe) {
                                this.onselects(3);
                                return;
                            }
                            this.petAttriButeNewMediator.show();
                            this.petLianChongMediator.hide();
                            this.petPeiYangMediator.hide();
                            this.petTuJianMediator.hide();
                            break;
                        case 1:
                            var isxuanzhe = this.judgepet();
                            if (isxuanzhe) {
                                this.onselects(3);
                                return;
                            }
                            this.petAttriButeNewMediator.hide();
                            this.petLianChongMediator.show();
                            this.petPeiYangMediator.hide();
                            this.petTuJianMediator.hide();
                            break;
                        case 2:
                            var isxuanzhe = this.judgepet();
                            if (isxuanzhe) {
                                this.onselects(3);
                                return;
                            }
                            this.petAttriButeNewMediator.hide();
                            this.petLianChongMediator.hide();
                            this.petPeiYangMediator.show();
                            this.petTuJianMediator.hide();
                            break;
                        case 3:
                            this.petAttriButeNewMediator.hide();
                            this.petLianChongMediator.hide();
                            this.petPeiYangMediator.hide();
                            this.petTuJianMediator.show();
                            break;
                        default:
                            break;
                    }
                };
                PetModule.prototype.onShow = function (event) {
                    _super.prototype.onShow.call(this, event);
                    //通知主界面开启蒙版
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                    if (this._viewUI.button_tab.selectedIndex == PetModel.getInstance().tabnum) { //当前选择的界面
                        this._viewUI.button_tab.selectedIndex = 0;
                        PetModel.getInstance().tabnum = 0;
                    }
                    else {
                        this._viewUI.button_tab.selectedIndex = PetModel.getInstance().tabnum;
                    }
                };
                /**判断宠物为空 */
                PetModule.prototype.judgepet = function () {
                    if (PetModel.getInstance().pets.keys.length == 0) {
                        this._viewUI.button_tab.selectedIndex = 3;
                        this.selectedNum++;
                        if (this.selectedNum >= 2) {
                            var prompt_1 = HudModel.getInstance().promptAssembleBack(420037);
                            var disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                            disappearMsgTips.onShow(prompt_1);
                        }
                    }
                    return PetModel.getInstance().pets.keys.length == 0 ? true : false;
                };
                PetModule.prototype.hide = function () {
                    this._viewUI.button_tab.selectedIndex = -1;
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    _super.prototype.hide.call(this);
                };
                PetModule.prototype.getView = function () {
                    return this._viewUI;
                };
                /**关闭宠物界面*/
                PetModule.prototype.close = function () {
                    _super.prototype.hide.call(this);
                    //通知主界面关闭黑色蒙版
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    this.petAttriButeNewMediator.hide();
                    this.petLianChongMediator.hide();
                    this.petPeiYangMediator.hide();
                    this.petTuJianMediator.hide();
                    PetModel._instance.tabnum = 0;
                    PetModel._instance.changexilian = -1;
                    this._viewUI.button_tab.selectedIndex = -1;
                    if (LoginModel.getInstance().CommonPage != "") { //是否从其他界面跳转过来
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                return PetModule;
            }(game.modules.ModuleMediator));
            pet.PetModule = PetModule;
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetModule.js.map