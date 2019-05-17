/**messageTips.ui */
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
// import BattleInstructionUI = ui.common.TeamEditCommandUI;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var BattleInstructionMediator = /** @class */ (function (_super) {
                __extends(BattleInstructionMediator, _super);
                function BattleInstructionMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this.content = [{ label: "hhh0" }, { label: "hhh1" }, { label: "hhh2" }, { label: "hhh3" }, { label: "hhh4" }, { label: "添加" },];
                    _this.uiLayer = app.uiRoot.general;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI = new ui.common.TeamEditCommandUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    return _this;
                }
                ////////////////
                ///业务逻辑
                ////////////////
                /**
                 * @describe  显示提示UI
                 * @param
                 *
                 */
                BattleInstructionMediator.prototype.onShow = function () {
                    _super.prototype.show.call(this);
                    this.onLoad();
                };
                BattleInstructionMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                BattleInstructionMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**
                 * @describe
                 * @param  data 提示语句
                 */
                BattleInstructionMediator.prototype.onLoad = function () {
                    this.regestEvent();
                    this.getData();
                    this.InitUI(0);
                    this._viewUI.instruction_img.visible = false;
                };
                BattleInstructionMediator.prototype.regestEvent = function () {
                    // game.modules.chat.models.ChatProxy.getInstance().on(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS,this,this.onShow);
                    this._viewUI.close0_btn.on(LEvent.MOUSE_DOWN, this, this.hideView);
                    this._viewUI.close1_btn.on(LEvent.MOUSE_DOWN, this, this.hideInstruction);
                    this._viewUI.difang_btn.on(LEvent.MOUSE_DOWN, this, this.InitUI, [0]);
                    this._viewUI.wofang_btn.on(LEvent.MOUSE_DOWN, this, this.InitUI, [1]);
                };
                BattleInstructionMediator.prototype.InitUI = function (camp) {
                    if (camp == 0) {
                        this._viewUI.commandList_list.visible = true;
                        this._viewUI.we_commandList_list.visible = false;
                    }
                    else if (camp == 1) {
                        this._viewUI.commandList_list.visible = false;
                        this._viewUI.we_commandList_list.visible = true;
                    }
                };
                ////////////////
                ///UI
                ////////////////
                BattleInstructionMediator.prototype.hideInstruction = function () {
                    if (this._viewUI.instruction_img.visible) {
                        this._viewUI.instruction_img.visible = false;
                    }
                };
                BattleInstructionMediator.prototype.hideView = function () {
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    this.hide();
                };
                BattleInstructionMediator.prototype.getData = function () {
                    this._viewUI.commandList_list.vScrollBarSkin = "";
                    this._viewUI.commandList_list.repeatX = 2;
                    this._viewUI.commandList_list.repeatY = 3;
                    this._viewUI.commandList_list.array = this.content;
                    this._viewUI.commandList_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.commandList_list.scrollBar.elasticDistance = 100;
                    this._viewUI.commandList_list.renderHandler = new Handler(this, this.onRenderBattleInstruction);
                };
                BattleInstructionMediator.prototype.onRenderBattleInstruction = function (cell, index) {
                    if (index > this.content.length - 1)
                        return;
                    var instructipnBtn = cell.getChildByName("command_btn");
                    instructipnBtn.label = this.content[index].label;
                    if (index == this.content.length - 1) {
                        instructipnBtn.on(LEvent.CLICK, this, this.openInstruction);
                    }
                };
                BattleInstructionMediator.prototype.openInstruction = function () {
                    if (!this._viewUI.instruction_img.visible) {
                        this._viewUI.instruction_img.visible = true;
                    }
                };
                return BattleInstructionMediator;
            }(game.modules.UiMediator));
            commonUI.BattleInstructionMediator = BattleInstructionMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BattleInstructionMediator.js.map