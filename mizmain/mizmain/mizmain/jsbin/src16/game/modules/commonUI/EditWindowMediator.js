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
// import EditWindow = ui.common.component.EditWindowUI;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var EditWindowMediator = /** @class */ (function (_super) {
                __extends(EditWindowMediator, _super);
                function EditWindowMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI = new ui.common.component.EditWindowUI();
                    _this.DisappearMessageTipsMediator = new commonUI.DisappearMessageTipsMediator(app);
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
                EditWindowMediator.prototype.onShow = function (targetName, minlevel, maxlevel) {
                    this.targetName = targetName;
                    this.minLevel = minlevel;
                    this.maxLevel = maxlevel;
                    this.registEvent();
                    this.iniUI();
                    _super.prototype.show.call(this);
                };
                EditWindowMediator.prototype.hide = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    _super.prototype.hide.call(this);
                };
                EditWindowMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**
                 * @describe   初始化ui控件
                 *
                 */
                EditWindowMediator.prototype.iniUI = function () {
                    this.refreshUI();
                    this._viewUI.text_Input.multiline = true;
                    this._viewUI.text_Input.maxChars = 24;
                    this._viewUI.text_Input.prompt = "点击这里输入消息内容";
                    this._viewUI.text_Input.promptColor = "#ffffff";
                };
                /** 每次点击刷新单选框*/
                EditWindowMediator.prototype.refreshUI = function () {
                    this._viewUI.zuDui_checkBox.selected = false;
                    this._viewUI.current_checkBox.selected = false;
                    this._viewUI.family_checkBox.selected = false;
                };
                /** 注册事件 和通信事件 */
                EditWindowMediator.prototype.registEvent = function () {
                    this._viewUI.closeBtn_btn.on(LEvent.MOUSE_DOWN, this, this.closeEditWindow);
                    this._viewUI.zuDui_checkBox.on(LEvent.MOUSE_DOWN, this, this.onTeamCheckBox);
                    this._viewUI.family_checkBox.on(LEvent.MOUSE_DOWN, this, this.onTeamCheckBox);
                    this._viewUI.current_checkBox.on(LEvent.MOUSE_DOWN, this, this.onTeamCheckBox);
                    this._viewUI.clear_btn.on(LEvent.MOUSE_DOWN, this, this.clearChars);
                    this._viewUI.sendBtn_btn.on(LEvent.MOUSE_DOWN, this, this.sendContent);
                    game.modules.team.models.TeamProxy.getInstance().on(game.modules.team.models.ONE_KEY_YELL_SUCC, this, this.hide);
                };
                /** 发送事件 */
                EditWindowMediator.prototype.sendContent = function () {
                    var channel = -1;
                    var inputText = this._viewUI.text_Input.text;
                    switch (true) {
                        case this._viewUI.zuDui_checkBox.selected:
                            channel = ChannelType.TEAM_APPLY;
                            break;
                        case this._viewUI.current_checkBox.selected:
                            channel = ChannelType.CURRENR_CHANNEL;
                            break;
                        case this._viewUI.family_checkBox.selected:
                            channel = ChannelType.FAMILY_CHANNEL;
                            break;
                        default: break;
                    }
                    if (channel != -1) {
                        //<RQ t="[精英副本-废矿(30级)（1/5），等级32-36开组了!" teamid="266241" c="ff50321a"></RQ><T t="成败在此以刺激]" c="ff50321a"></T><R t="[申请加入]" leaderid="4280321" c="FFFFFF00"></R>
                        var realInput = "<span style='color:#f6f6f4;fontSize:24'>" + this.targetName + "</span>";
                        var teamdata = TeamModel.getInstance().TeamRoleInfoStorage;
                        var SCreateTeamVo = TeamModel.getInstance().screateTeam;
                        var teamid = SCreateTeamVo.teamid;
                        realInput += "<span style='color:#f6f6f4;fontSize:24'>(" + teamdata.length + "/5)</span>";
                        realInput += "<span style='color:#f6f6f4;fontSize:24'>等级" + this.minLevel + "-" + this.maxLevel + "开组了</span>";
                        realInput += "<span style='color:#f6f6f4;fontSize:24'>" + inputText + "</span>";
                        realInput += "<span style='color:#f6f6f4;fontSize:24'>[申请加入]" + teamdata[0].roleid + "</span>";
                        var data_1 = this.targetName + "#," + teamdata.length + "#," + this.minLevel + "#," + this.maxLevel + "#," + inputText + "#," + teamdata[0].roleid + "#," + teamid;
                        RequesterProtocols._instance.c2s_COneKeyTeamMatch(channel, data_1);
                    }
                    else {
                        var data_2 = "请选择输入频道";
                        this.DisappearMessageTipsMediator.onShow(data_2);
                    }
                };
                /** 清空字符串 */
                EditWindowMediator.prototype.clearChars = function () {
                    this._viewUI.text_Input.text = "";
                };
                /** 点击组队复选框 */
                EditWindowMediator.prototype.onTeamCheckBox = function () {
                    this.refreshUI();
                };
                EditWindowMediator.prototype.closeEditWindow = function () {
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    this.hide();
                };
                ////////////////
                ///UI
                ////////////////
                EditWindowMediator.prototype.hideTips = function () {
                };
                return EditWindowMediator;
            }(game.modules.UiMediator));
            commonUI.EditWindowMediator = EditWindowMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=EditWindowMediator.js.map