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
/**Remind.ui */
// import TeammateViewUI = ui.common.component.TeammateViewUI;
// import wanjiazhuangbeiUI = ui.common.component.wanjiazhuangbeiUI;
// import TeammateMyselfViewUI = ui.common.component.TeammateMyselfViewUI;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var TeamViewMyselfMediators = /** @class */ (function (_super) {
                __extends(TeamViewMyselfMediators, _super);
                function TeamViewMyselfMediators(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**选中角色的下标 */
                    _this.selectIndex = -1;
                    /**队伍信息 */
                    _this.roleInfo = [];
                    /** 队员处于离队 */
                    _this.inLeaveState = false;
                    _this._viewUI = new ui.common.component.TeammateMyselfViewUI();
                    _this.uiLayer = app.uiRoot.general;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    return _this;
                    // this._wanjiazhuangbeiUI = new ViewEquipMediator(app.uiRoot.general,this._app);
                }
                ////////////////
                ///业务逻辑
                ////////////////
                /**
                 * @describe  显示提示UI
                 * @param xPos   x轴位置 @param yPos   y轴位置 @param index   队伍中该对象的位置
                 *
                 */
                TeamViewMyselfMediators.prototype.onShow = function (xPos, yPos, index, roleinfo) {
                    _super.prototype.show.call(this);
                    this.roleInfo = roleinfo;
                    this.selectIndex = index;
                    this.registerEvent();
                    this.setGroupBtnPos(xPos, yPos);
                    this.chargeIndex(index);
                };
                TeamViewMyselfMediators.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                TeamViewMyselfMediators.prototype.getView = function () {
                    return this._viewUI;
                };
                /** 根据传过来的坐标判断按钮的使用 */
                TeamViewMyselfMediators.prototype.chargeIndex = function (index) {
                    //    let roleid = LoginModel.getInstance().roleDetail.roleid;
                    var capatinId = this.roleInfo[0].roleid;
                    var teamMemberStateKeys = TeamModel.getInstance().updateMemberState.keys;
                    var tempot = HudModel.getInstance().promptAssembleBack(PromptExplain.TEMPORARY_TO_TEAM);
                    if (teamMemberStateKeys.length != 0) { /** 队员状态需要更新 */
                        for (var teamMemberStateKeysIndex = 0; teamMemberStateKeysIndex < teamMemberStateKeys.length; teamMemberStateKeysIndex++) {
                            var teamMemberState = TeamModel.getInstance().updateMemberState.get(teamMemberStateKeys[teamMemberStateKeysIndex]);
                            if (teamMemberState == TeamMemberState.eTeamAbsent && this.roleInfo[index].roleid == teamMemberStateKeys[teamMemberStateKeysIndex]) { /** 队员是暂离状态 */
                                var tempots = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.RETURN_TO_RANKS);
                                this._viewUI.LeaveSoon_btn.label = tempots;
                                this.inLeaveState = true;
                            }
                            else if (teamMemberState == TeamMemberState.eTeamNormal && this.roleInfo[index].roleid == teamMemberStateKeys[teamMemberStateKeysIndex]) { /** 归队状态 */
                                this._viewUI.LeaveSoon_btn.label = tempot;
                                this.inLeaveState = false;
                            }
                        }
                    }
                    else {
                        var roleid = this.roleInfo[index].roleid;
                        var teamMemberBasic = TeamModel.getInstance().teamMemberBasic.get(roleid);
                        if (teamMemberBasic && teamMemberBasic.state == TeamMemberState.eTeamAbsent) {
                            var tempots = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.RETURN_TO_RANKS);
                            this._viewUI.LeaveSoon_btn.label = tempots;
                            TeamModel.getInstance().updateMemberState.set(this.roleInfo[index].roleid, this.roleInfo[index].state);
                            this.inLeaveState = true;
                        }
                        else {
                            this._viewUI.LeaveSoon_btn.label = tempot;
                            this.inLeaveState = false;
                        }
                    }
                };
                /**
                 * @describe  注册事件
                 */
                TeamViewMyselfMediators.prototype.registerEvent = function () {
                    /** 离开队伍 */
                    this._viewUI.leaveTeam_btn.on(LEvent.MOUSE_DOWN, this, this.onLeaveTeam);
                    /** 暂离队伍 */
                    this._viewUI.LeaveSoon_btn.on(LEvent.MOUSE_DOWN, this, this.onLeaveSoon);
                    /** 遮罩层 */
                    this._viewUI.mask_img.on(LEvent.MOUSE_DOWN, this, this.hide);
                };
                /** 暂离队伍 */
                TeamViewMyselfMediators.prototype.onLeaveSoon = function () {
                    if (!this.inLeaveState) { /** 离队请求 */
                        RequesterProtocols._instance.c2s_CAbsentReturnTeam(TeamMemberApply.LEAVE_SOON);
                        this.hide();
                    }
                    else { /** 归队请求 */
                        RequesterProtocols._instance.c2s_CAbsentReturnTeam(TeamMemberState.eTeamAbsent);
                        this.hide();
                    }
                };
                /** 离开队伍 */
                TeamViewMyselfMediators.prototype.onLeaveTeam = function () {
                    RequesterProtocols._instance.c2s_CQuitTeam();
                    this.hide();
                };
                TeamViewMyselfMediators.prototype._OpenEquip = function () {
                    this.hide();
                };
                /** 调整站位 */
                TeamViewMyselfMediators.prototype.adjustmentStand = function () {
                    if (this.selectIndex != 0)
                        game.modules.team.models.TeamModel.getInstance().swapPosIndex = this.selectIndex;
                    game.modules.team.models.TeamProxy.getInstance().event(game.modules.team.models.REFRESH_FRIEND_ACCEPT_TEAM);
                    this.hide();
                };
                /** 升为队长 */
                TeamViewMyselfMediators.prototype.promotedToCaption = function () {
                    var roleid = this.roleInfo[this.selectIndex].roleid;
                    RequesterProtocols._instance.c2s_CSetTeamLeader(roleid);
                    // game.modules.team.models.TeamModel.getInstance().entrustCaptain = roleid;
                    this.hide();
                };
                /** 委任指挥 */
                TeamViewMyselfMediators.prototype.setCommander = function () {
                    /** 指挥者Id */
                    var commanderId = game.modules.team.models.TeamModel.getInstance().commanderRoleid;
                    /** 队长Id */
                    var capatinId = this.roleInfo[0].roleid;
                    /** 选中的角色Id */
                    var roleid = this.roleInfo[this.selectIndex].roleid;
                    /** 如果指挥的玩家存在并且不是队长 (取消指挥) */
                    if (typeof (commanderId) != "undefined" && commanderId != capatinId) {
                        RequesterProtocols._instance.c2s_CSetCommander(1, capatinId);
                    }
                    else { /** 委任指挥 */
                        RequesterProtocols._instance.c2s_CSetCommander(0, roleid);
                    }
                    this.hide();
                };
                /** 结为好友 */
                TeamViewMyselfMediators.prototype.addFriend = function () {
                    if (this.selectIndex != -1) {
                        var roleid = this.roleInfo[this.selectIndex].roleid;
                        RequesterProtocols._instance.c2s_CRequestAddFriend(roleid);
                    }
                    this.hide();
                };
                /** 聊天 */
                TeamViewMyselfMediators.prototype.chatWith = function () {
                    modules.ModuleManager.show(modules.ModuleNames.FRIEND, this._app);
                    this.hide();
                    modules.ModuleManager.hide(modules.ModuleNames.Team);
                    LoginModel.getInstance().CommonPage = "team";
                };
                TeamViewMyselfMediators.prototype.setGroupBtnPos = function (xPos, yPos) {
                    var realX = 295;
                    var realY = 880;
                    this._viewUI.groupBtn_btn.pos(realX, realY);
                };
                ////////////////
                ///事件
                ////////////////
                /**
                 * @describe  银币补助界面，点击使用金币代替按钮事件
                 */
                TeamViewMyselfMediators.prototype.onClickUseGoldBtnEvent = function () {
                    this.event(commonUI.USE_GOLD_EXCHANGE_EVENT);
                };
                /**
                 * @describe  银币补足界面，点击使用符石兑换按钮事件
                 */
                TeamViewMyselfMediators.prototype.onClickUseYuanBaoOfSilverBtnEvent = function () {
                    this.event(commonUI.USE_SILVER_EXCHANGE_EVENT);
                    this.hide();
                };
                /**
                 * @describe  金币补助界面，点击使用符石兑换按钮事件
                 */
                TeamViewMyselfMediators.prototype.onClickUseYuanBaoOfGoldBtnEvent = function () {
                    this.event(commonUI.USE_YUANBAO_EXCHANGE_EVENT);
                    this.hide();
                };
                return TeamViewMyselfMediators;
            }(game.modules.UiMediator));
            commonUI.TeamViewMyselfMediators = TeamViewMyselfMediators;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamViewMyselfMediators.js.map