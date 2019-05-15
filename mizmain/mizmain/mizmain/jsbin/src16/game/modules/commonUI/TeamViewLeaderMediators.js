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
// import TeammateLeaderViewUI = ui.common.component.TeammateLeaderViewUI;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var TeamViewLeaderMediators = /** @class */ (function (_super) {
                __extends(TeamViewLeaderMediators, _super);
                function TeamViewLeaderMediators(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**选中角色的下标 */
                    _this.selectIndex = -1;
                    /**队伍信息 */
                    _this.roleInfo = [];
                    _this.isInAbsent = false;
                    _this._viewUI = new ui.common.component.TeammateLeaderViewUI();
                    _this.uiLayer = app.uiRoot.general;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._wanjiazhuangbeiUI = new commonUI.ViewEquipMediator(_this._app);
                    return _this;
                }
                ////////////////
                ///业务逻辑
                ////////////////
                /**
                 * @describe  显示提示UI
                 * @param xPos   x轴位置 @param yPos   y轴位置 @param index   队伍中该对象的位置
                 *
                 */
                TeamViewLeaderMediators.prototype.onShow = function (xPos, yPos, index, roleinfo) {
                    _super.prototype.show.call(this);
                    this.roleInfo = roleinfo;
                    this.selectIndex = index;
                    this.registerEvent();
                    this.setGroupBtnPos(xPos, yPos);
                    this.chargeMemberState(index);
                };
                TeamViewLeaderMediators.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                TeamViewLeaderMediators.prototype.getView = function () {
                    return this._viewUI;
                };
                /**
                 * @describe  注册事件
                 */
                TeamViewLeaderMediators.prototype.registerEvent = function () {
                    /** 发送信息 */
                    this._viewUI.sendMessage_btn.on(LEvent.MOUSE_DOWN, this, this.chatWith);
                    /** 添加为朋友 */
                    this._viewUI.addFriend_btn.on(LEvent.MOUSE_DOWN, this, this.addFriend);
                    /** 升为队长 */
                    this._viewUI.upgradeCaptain_btn.on(LEvent.MOUSE_DOWN, this, this.promotedToCaption);
                    /** 请离队伍 */
                    this._viewUI.leaveTeam_btn.on(LEvent.MOUSE_DOWN, this, this.onPleaseOut);
                    /** 查看装备 */
                    this._viewUI.watchEquip_btn.on(LEvent.MOUSE_DOWN, this, this.onViewEquip);
                    /** 遮罩层 */
                    this._viewUI.mask_img.on(LEvent.MOUSE_DOWN, this, this.hide);
                    game.modules.team.models.TeamProxy.getInstance().once(game.modules.team.models.REFRESH_VIEW_EQUIP, this, this._OpenEquip);
                };
                /** 判断队员的状态 */
                TeamViewLeaderMediators.prototype.chargeMemberState = function (index) {
                    var teamMemberStateKeys = TeamModel.getInstance().updateMemberState.keys;
                    var tempot = HudModel.getInstance().promptAssembleBack(PromptExplain.RISE_TO_CAPTAIN);
                    if (teamMemberStateKeys.length != 0) { /** 队员状态需要更新 */
                        for (var teamMemberStateKeysIndex = 0; teamMemberStateKeysIndex < teamMemberStateKeys.length; teamMemberStateKeysIndex++) {
                            var teamMemberState = TeamModel.getInstance().updateMemberState.get(teamMemberStateKeys[teamMemberStateKeysIndex]);
                            if (teamMemberState == TeamMemberState.eTeamAbsent && this.roleInfo[index].roleid == teamMemberStateKeys[teamMemberStateKeysIndex]) { /** 队员是暂离状态 */
                                var tempots = HudModel.getInstance().promptAssembleBack(PromptExplain.RECALL_PLAYER);
                                this._viewUI.upgradeCaptain_btn.label = tempots;
                                this.isInAbsent = true;
                            }
                            else if (teamMemberState == TeamMemberState.eTeamNormal && this.roleInfo[index].roleid == teamMemberStateKeys[teamMemberStateKeysIndex]) { /** 归队状态 */
                                this._viewUI.upgradeCaptain_btn.label = tempot;
                                this.isInAbsent = false;
                            }
                        }
                    }
                    else {
                        var roleid = this.roleInfo[index].roleid;
                        var teamMemberBasic = TeamModel.getInstance().teamMemberBasic.get(roleid);
                        if (teamMemberBasic && teamMemberBasic.state == TeamMemberState.eTeamAbsent) {
                            var tempots = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.RETURN_TO_RANKS);
                            this._viewUI.upgradeCaptain_btn.label = tempots;
                            TeamModel.getInstance().updateMemberState.set(this.roleInfo[index].roleid, this.roleInfo[index].state);
                            this.isInAbsent = true;
                        }
                        else {
                            this._viewUI.upgradeCaptain_btn.label = tempot;
                            this.isInAbsent = false;
                        }
                    }
                };
                /** 查看装备 */
                TeamViewLeaderMediators.prototype.onViewEquip = function () {
                    var roleid = this.roleInfo[this.selectIndex].roleid;
                    RequesterProtocols._instance.c2s_CGetRoleEquip(roleid, 0);
                    this.hide();
                };
                /** 请离队伍 */
                TeamViewLeaderMediators.prototype.onPleaseOut = function () {
                    var roleid = this.roleInfo[this.selectIndex].roleid;
                    RequesterProtocols._instance.c2s_CExpelMember(roleid);
                    this.hide();
                };
                TeamViewLeaderMediators.prototype._OpenEquip = function () {
                    this.hide();
                    this._wanjiazhuangbeiUI.onShow();
                };
                /** 调整站位 */
                TeamViewLeaderMediators.prototype.adjustmentStand = function () {
                    if (this.selectIndex != 0)
                        game.modules.team.models.TeamModel.getInstance().swapPosIndex = this.selectIndex;
                    game.modules.team.models.TeamProxy.getInstance().event(game.modules.team.models.REFRESH_FRIEND_ACCEPT_TEAM);
                    this.hide();
                };
                /** 升为队长 */
                TeamViewLeaderMediators.prototype.promotedToCaption = function () {
                    var roleid = this.roleInfo[this.selectIndex].roleid;
                    if (!this.isInAbsent) { /** 队员正常，队长执行升为队长功能 */
                        RequesterProtocols._instance.c2s_CSetTeamLeader(roleid);
                    }
                    else if (this.isInAbsent) { /** 队员处于离队状态，队长可以执行召回队员的功能 */
                        RequesterProtocols._instance.c2s_CCallbackMember(roleid);
                    }
                    this.hide();
                };
                /** 委任指挥 */
                TeamViewLeaderMediators.prototype.setCommander = function () {
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
                TeamViewLeaderMediators.prototype.addFriend = function () {
                    if (this.selectIndex != -1) {
                        var roleid = this.roleInfo[this.selectIndex].roleid;
                        RequesterProtocols._instance.c2s_CRequestAddFriend(roleid);
                    }
                    this.hide();
                };
                /** 聊天 */
                TeamViewLeaderMediators.prototype.chatWith = function () {
                    modules.ModuleManager.show(modules.ModuleNames.FRIEND, this._app);
                    this.hide();
                };
                TeamViewLeaderMediators.prototype.setGroupBtnPos = function (xPos, yPos) {
                    var realX = 295;
                    var realY = 705;
                    this._viewUI.groupBtn_btn.pos(realX, realY);
                };
                ////////////////
                ///事件
                ////////////////
                /**
                 * @describe  银币补助界面，点击使用金币代替按钮事件
                 */
                TeamViewLeaderMediators.prototype.onClickUseGoldBtnEvent = function () {
                    this.event(commonUI.USE_GOLD_EXCHANGE_EVENT);
                };
                /**
                 * @describe  银币补足界面，点击使用符石兑换按钮事件
                 */
                TeamViewLeaderMediators.prototype.onClickUseYuanBaoOfSilverBtnEvent = function () {
                    this.event(commonUI.USE_SILVER_EXCHANGE_EVENT);
                    this.hide();
                };
                /**
                 * @describe  金币补助界面，点击使用符石兑换按钮事件
                 */
                TeamViewLeaderMediators.prototype.onClickUseYuanBaoOfGoldBtnEvent = function () {
                    this.event(commonUI.USE_YUANBAO_EXCHANGE_EVENT);
                    this.hide();
                };
                return TeamViewLeaderMediators;
            }(game.modules.UiMediator));
            commonUI.TeamViewLeaderMediators = TeamViewLeaderMediators;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamViewLeaderMediators.js.map