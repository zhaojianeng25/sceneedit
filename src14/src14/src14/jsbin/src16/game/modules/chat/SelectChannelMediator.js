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
// import SelectChannelUI = ui.common.XuanZePingDaoUI;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var chat;
        (function (chat) {
            var SelectChannelMediator = /** @class */ (function (_super) {
                __extends(SelectChannelMediator, _super);
                function SelectChannelMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI = new ui.common.XuanZePingDaoUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    return _this;
                }
                SelectChannelMediator.getInstance = function (app) {
                    if (!this._instance) {
                        this._instance = new SelectChannelMediator(app);
                    }
                    return this._instance;
                };
                ////////////////
                ///业务逻辑
                ////////////////
                /**
                 * @describe
                 * @param
                 *
                 */
                SelectChannelMediator.prototype.onShow = function () {
                    _super.prototype.show.call(this);
                    this.regestEvent();
                    this.refreshUI();
                };
                SelectChannelMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                SelectChannelMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                SelectChannelMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /** 刷新UI */
                SelectChannelMediator.prototype.refreshUI = function () {
                    this.SysConfigDic = game.modules.setBasics.models.SetBasicsModel.getInstance().SysConfigDic;
                    this.currentSet = this.SysConfigDic.get(ChannelSet.SET_CURRENT_CHANNEL);
                    this.teamSet = this.SysConfigDic.get(ChannelSet.SET_TEAM_CHANNEL);
                    this.sectsSet = this.SysConfigDic.get(ChannelSet.SET_SECTS_CHANNEL);
                    this.familySet = this.SysConfigDic.get(ChannelSet.SET_FAMILY_CHANNEL);
                    this.worldSet = this.SysConfigDic.get(ChannelSet.SET_WORLD_CHANNEL);
                    this.zuduiSet = this.SysConfigDic.get(ChannelSet.SET_ZUDUI_CHANNEL);
                    if (this.currentSet != null && this.currentSet == 1 && this._viewUI.current_checkBox.selected == false) {
                        this._viewUI.current_checkBox.selected = true;
                    }
                    else if (this._viewUI.current_checkBox.selected && this.currentSet == 0) {
                        this._viewUI.current_checkBox.selected = false;
                    }
                    if (this.teamSet != null && this.teamSet == 1 && this._viewUI.team_checkBox.selected == false) {
                        this._viewUI.team_checkBox.selected = true;
                    }
                    else if (this._viewUI.team_checkBox.selected && this.teamSet == 0) {
                        this._viewUI.team_checkBox.selected = false;
                    }
                    if (this.sectsSet != null && this.sectsSet == 1 && this._viewUI.sects_checkBox.selected == false) {
                        this._viewUI.sects_checkBox.selected = true;
                    }
                    else if (this._viewUI.sects_checkBox.selected && this.sectsSet == 0) {
                        this._viewUI.sects_checkBox.selected = false;
                    }
                    if (this.familySet != null && this.familySet == 1 && this._viewUI.family_checkBox.selected == false) {
                        this._viewUI.family_checkBox.selected = true;
                    }
                    else if (this._viewUI.family_checkBox.selected && this.familySet == 0) {
                        this._viewUI.family_checkBox.selected = false;
                    }
                    if (this.worldSet != null && this.worldSet == 1 && this._viewUI.world_checkBox.selected == false) {
                        this._viewUI.world_checkBox.selected = true;
                    }
                    else if (this._viewUI.world_checkBox.selected && this.worldSet == 0) {
                        this._viewUI.world_checkBox.selected = false;
                    }
                    if (this.zuduiSet != null && this.zuduiSet == 1 && this._viewUI.zuDui_checkBox.selected == false) {
                        this._viewUI.zuDui_checkBox.selected = true;
                    }
                    else if (this._viewUI.zuDui_checkBox.selected && this.zuduiSet == 0) {
                        this._viewUI.zuDui_checkBox.selected = false;
                    }
                };
                /** 注册事件和通讯事件监听 */
                SelectChannelMediator.prototype.regestEvent = function () {
                    this._viewUI.confirm_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.close_bth.on(LEvent.MOUSE_DOWN, this, this.hide);
                    // this._viewUI.world_checkBox.on(LEvent.MOUSE_DOWN,this,this.controlWorldMsg,[this._viewUI.world_checkBox]);
                    this._viewUI.world_checkBox.clickHandler = new Laya.Handler(this, this.controlWorldMsg);
                    this._viewUI.family_checkBox.clickHandler = new Laya.Handler(this, this.controlFamilyMsg);
                    this._viewUI.sects_checkBox.clickHandler = new Laya.Handler(this, this.controlSectsMsg);
                    this._viewUI.current_checkBox.clickHandler = new Laya.Handler(this, this.controlCurrentMsg);
                    this._viewUI.team_checkBox.clickHandler = new Laya.Handler(this, this.controlTeamMsg);
                    this._viewUI.zuDui_checkBox.clickHandler = new Laya.Handler(this, this.controlZuDuiMsg);
                    // this._viewUI.family_checkBox.on(LEvent.MOUSE_DOWN,this,this.controlFamilyMsg,[this._viewUI.family_checkBox]);
                    // this._viewUI.sects_checkBox.on(LEvent.MOUSE_DOWN,this,this.controlSectsMsg,[this._viewUI.sects_checkBox]);
                    // this._viewUI.current_checkBox.on(LEvent.MOUSE_DOWN,this,this.controlCurrentMsg,[this._viewUI.current_checkBox]);
                    // this._viewUI.team_checkBox.on(LEvent.MOUSE_DOWN,this,this.controlTeamMsg,[this._viewUI.team_checkBox]);
                    // this._viewUI.zuDui_checkBox.on(LEvent.MOUSE_DOWN,this,this.controlZuDuiMsg,[this._viewUI.zuDui_checkBox]);
                };
                /** 世界频道设置
                 * @param 0 关闭接收 @param 1 打开接收
                */
                SelectChannelMediator.prototype.controlWorldMsg = function () {
                    var dictionary;
                    dictionary = new Laya.Dictionary();
                    if (this.worldSet == 1) { /** 选中按钮 发送协议——》取消*/
                        dictionary.set(ChannelSet.SET_WORLD_CHANNEL, 0);
                        RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
                    }
                    else if (this.worldSet == 0) { /** 取消选中 */
                        dictionary.set(ChannelSet.SET_WORLD_CHANNEL, 1);
                        RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
                    }
                    /** 通讯事件 */
                    modules.setBasics.models.SetBasicsProxy.getInstance().once(modules.setBasics.models.GET_RESET_SYSCONFIG_INFO_EVENT, this, this.refreshUI);
                };
                /** 帮派频道设置
                 * @param 0 关闭接收 @param 1 打开接收
                */
                SelectChannelMediator.prototype.controlFamilyMsg = function (box) {
                    var dictionary;
                    dictionary = new Laya.Dictionary();
                    if (this.familySet == 1) { /** 选中按钮 发送协议*/
                        dictionary.set(ChannelSet.SET_FAMILY_CHANNEL, 0);
                        RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
                    }
                    else if (this.familySet == 0) { /** 取消选中 */
                        dictionary.set(ChannelSet.SET_FAMILY_CHANNEL, 1);
                        RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
                    }
                    /** 通讯事件 */
                    modules.setBasics.models.SetBasicsProxy.getInstance().once(modules.setBasics.models.GET_RESET_SYSCONFIG_INFO_EVENT, this, this.refreshUI);
                };
                /** 门派频道设置
                 * @param 0 关闭接收 @param 1 打开接收
                */
                SelectChannelMediator.prototype.controlSectsMsg = function (box) {
                    var dictionary;
                    dictionary = new Laya.Dictionary();
                    if (this.sectsSet == 1) { /** 选中按钮 发送协议*/
                        dictionary.set(ChannelSet.SET_SECTS_CHANNEL, 0);
                        RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
                    }
                    else if (this.sectsSet == 0) { /** 取消选中 */
                        dictionary.set(ChannelSet.SET_SECTS_CHANNEL, 1);
                        RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
                    }
                    /** 通讯事件 */
                    modules.setBasics.models.SetBasicsProxy.getInstance().once(modules.setBasics.models.GET_RESET_SYSCONFIG_INFO_EVENT, this, this.refreshUI);
                };
                /** 当前频道设置
                 * @param 0 关闭接收 @param 1 打开接收
                */
                SelectChannelMediator.prototype.controlCurrentMsg = function (box) {
                    var dictionary;
                    dictionary = new Laya.Dictionary();
                    if (this.currentSet == 1) { /** 选中按钮 发送协议*/
                        dictionary.set(ChannelSet.SET_CURRENT_CHANNEL, 0);
                        RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
                    }
                    else if (this.currentSet == 0) { /** 取消选中 */
                        dictionary.set(ChannelSet.SET_CURRENT_CHANNEL, 1);
                        RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
                    }
                    /** 通讯事件 */
                    modules.setBasics.models.SetBasicsProxy.getInstance().once(modules.setBasics.models.GET_RESET_SYSCONFIG_INFO_EVENT, this, this.refreshUI);
                };
                /** 队伍频道设置
                 * @param 0 关闭接收 @param 1 打开接收
                */
                SelectChannelMediator.prototype.controlTeamMsg = function (box) {
                    var dictionary;
                    dictionary = new Laya.Dictionary();
                    if (this.teamSet == 1) { /** 选中按钮 发送协议*/
                        dictionary.set(ChannelSet.SET_TEAM_CHANNEL, 0);
                        RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
                    }
                    else if (this.teamSet == 0) { /** 取消选中 */
                        dictionary.set(ChannelSet.SET_TEAM_CHANNEL, 1);
                        RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
                    }
                    /** 通讯事件 */
                    modules.setBasics.models.SetBasicsProxy.getInstance().once(modules.setBasics.models.GET_RESET_SYSCONFIG_INFO_EVENT, this, this.refreshUI);
                };
                /** 组队频道设置
                 * @param 0 关闭接收 @param 1 打开接收
                */
                SelectChannelMediator.prototype.controlZuDuiMsg = function (box) {
                    var dictionary;
                    dictionary = new Laya.Dictionary();
                    if (this.zuduiSet == 1) { /** 选中按钮 发送协议*/
                        dictionary.set(ChannelSet.SET_ZUDUI_CHANNEL, 0);
                        RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
                    }
                    else if (this.zuduiSet == 0) { /** 取消选中 */
                        dictionary.set(ChannelSet.SET_ZUDUI_CHANNEL, 1);
                        RequesterProtocols._instance.c2s_CResetSysConfig(dictionary);
                    }
                    /** 通讯事件 */
                    modules.setBasics.models.SetBasicsProxy.getInstance().once(modules.setBasics.models.GET_RESET_SYSCONFIG_INFO_EVENT, this, this.refreshUI);
                };
                return SelectChannelMediator;
            }(game.modules.UiMediator));
            chat.SelectChannelMediator = SelectChannelMediator;
        })(chat = modules.chat || (modules.chat = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SelectChannelMediator.js.map