/**Remind.ui */
// import TeammateViewUI = ui.common.component.TeammateViewUI;
// import wanjiazhuangbeiUI = ui.common.component.wanjiazhuangbeiUI;
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
        var commonUI;
        (function (commonUI) {
            /**银币兑换界面中，使用金币兑换按钮事件*/
            commonUI.USE_GOLD_EXCHANGE_EVENT1 = "useGoldExchangeEvent";
            /**银币兑换界面中，使用符石兑换按钮事件 */
            commonUI.USE_SILVER_EXCHANGE_EVENT1 = "useSilverExchangeEvent";
            /**金币补助界面，使用符石兑换按钮事件 */
            commonUI.USE_YUANBAO_EXCHANGE_EVENT1 = "useYuanBaoExchangeEvent";
            var TeamMateViewMediators = /** @class */ (function (_super) {
                __extends(TeamMateViewMediators, _super);
                function TeamMateViewMediators(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**选中角色的下标 */
                    _this.selectIndex = -1;
                    /**队伍信息 */
                    _this.roleInfo = [];
                    _this._viewUI = new ui.common.component.TeammateViewUI();
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
                TeamMateViewMediators.prototype.onShow = function (xPos, yPos, index, roleinfo) {
                    _super.prototype.show.call(this);
                    this.roleInfo = roleinfo;
                    this.selectIndex = index;
                    this.registerEvent();
                    this.setGroupBtnPos(xPos, yPos);
                    this.chargeIndex(index);
                };
                TeamMateViewMediators.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                TeamMateViewMediators.prototype.getView = function () {
                    return this._viewUI;
                };
                /** 根据传过来的坐标判断按钮的使用 */
                TeamMateViewMediators.prototype.chargeIndex = function (index) {
                    //    let roleid = LoginModel.getInstance().roleDetail.roleid;
                    var capatinId = this.roleInfo[0].roleid;
                    if (index == 0) { /** 对象是队长 部分按钮设为灰色*/
                        this._viewUI.upgradeCaptain_btn.disabled = true;
                        this._viewUI.moveStand_btn.disabled = true;
                        this._viewUI.Command_btn.disabled = true;
                        this._viewUI.leaveTeam_btn.disabled = true;
                        this._viewUI.Command_btn.label = "取消指挥";
                    }
                    else if (index != 0) { /** 对象不是队长，按钮全部正常显示 */
                        this._viewUI.upgradeCaptain_btn.disabled = false;
                        this._viewUI.moveStand_btn.disabled = false;
                        this._viewUI.Command_btn.disabled = false;
                        this._viewUI.leaveTeam_btn.disabled = false;
                        /** 当前指挥的玩家Id，如果是队长则默认为0 */
                        var commanderId = game.modules.team.models.TeamModel.getInstance().commanderRoleid;
                        if (typeof (commanderId) != "undefined" && commanderId != capatinId) {
                            this._viewUI.Command_btn.label = "取消指挥";
                        }
                        else {
                            this._viewUI.Command_btn.label = "委任指挥";
                        }
                    }
                };
                /**
                 * @describe  注册事件
                 */
                TeamMateViewMediators.prototype.registerEvent = function () {
                    /** 发送信息 */
                    this._viewUI.sendMessage_btn.on(LEvent.MOUSE_DOWN, this, this.chatWith);
                    /** 添加为朋友 */
                    this._viewUI.addFriend_btn.on(LEvent.MOUSE_DOWN, this, this.addFriend);
                    /** 升为队长 */
                    this._viewUI.upgradeCaptain_btn.on(LEvent.MOUSE_DOWN, this, this.promotedToCaption);
                    /** 调整站位 */
                    this._viewUI.moveStand_btn.on(LEvent.MOUSE_DOWN, this, this.adjustmentStand);
                    /** 请离队伍 */
                    this._viewUI.leaveTeam_btn.on(LEvent.MOUSE_DOWN, this, this.onPleaseOut);
                    /** 查看装备 */
                    this._viewUI.watchEquip_btn.on(LEvent.MOUSE_DOWN, this, this.onViewEquip);
                    /**委任指挥  */
                    this._viewUI.Command_btn.on(LEvent.MOUSE_DOWN, this, this.setCommander);
                    /** 遮罩层 */
                    this._viewUI.mask_img.on(LEvent.MOUSE_DOWN, this, this.hide);
                    game.modules.team.models.TeamProxy.getInstance().once(game.modules.team.models.REFRESH_VIEW_EQUIP, this, this._OpenEquip);
                };
                /** 查看装备 */
                TeamMateViewMediators.prototype.onViewEquip = function () {
                    var roleid = this.roleInfo[this.selectIndex].roleid;
                    RequesterProtocols._instance.c2s_CGetRoleEquip(roleid, 0);
                    this.hide();
                };
                /** 请离队伍 */
                TeamMateViewMediators.prototype.onPleaseOut = function () {
                    var roleid = this.roleInfo[this.selectIndex].roleid;
                    RequesterProtocols._instance.c2s_CExpelMember(roleid);
                    /** 这里不应该是直接把key remove掉，但是服务端并没对队长更新数据，所以只能客户端自己remove */
                    game.modules.team.models.TeamModel.getInstance().teamMemberBasic.remove(roleid);
                    /** 做数据刷新 */
                    game.modules.team.models.TeamProxy.getInstance().event(game.modules.team.models.REFRESH_FRIEND_ACCEPT_TEAM);
                    this.hide();
                };
                TeamMateViewMediators.prototype._OpenEquip = function () {
                    this.hide();
                    modules.ModuleManager.hide(modules.ModuleNames.Team);
                    LoginModel.getInstance().CommonPage = "team";
                    this._wanjiazhuangbeiUI.onShow();
                };
                /** 调整站位 */
                TeamMateViewMediators.prototype.adjustmentStand = function () {
                    if (this.selectIndex != 0)
                        game.modules.team.models.TeamModel.getInstance().swapPosIndex = this.selectIndex;
                    game.modules.team.models.TeamProxy.getInstance().event(game.modules.team.models.REFRESH_FRIEND_ACCEPT_TEAM);
                    this.hide();
                };
                /** 升为队长 */
                TeamMateViewMediators.prototype.promotedToCaption = function () {
                    var roleid = this.roleInfo[this.selectIndex].roleid;
                    RequesterProtocols._instance.c2s_CSetTeamLeader(roleid);
                    // game.modules.team.models.TeamModel.getInstance().entrustCaptain = roleid;
                    this.hide();
                };
                /** 委任指挥 */
                TeamMateViewMediators.prototype.setCommander = function () {
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
                TeamMateViewMediators.prototype.addFriend = function () {
                    if (this.selectIndex != -1) {
                        var roleid = this.roleInfo[this.selectIndex].roleid;
                        RequesterProtocols._instance.c2s_CRequestAddFriend(roleid);
                    }
                    this.hide();
                };
                /** 聊天 */
                TeamMateViewMediators.prototype.chatWith = function () {
                    modules.ModuleManager.show(modules.ModuleNames.FRIEND, this._app);
                    this.hide();
                    modules.ModuleManager.hide(modules.ModuleNames.Team);
                    LoginModel.getInstance().CommonPage = "team";
                };
                TeamMateViewMediators.prototype.setGroupBtnPos = function (xPos, yPos) {
                    var realX = xPos + 220;
                    var realY = yPos + 320;
                    this._viewUI.groupBtn_btn.pos(realX, realY);
                };
                ////////////////
                ///事件
                ////////////////
                /**
                 * @describe  银币补助界面，点击使用金币代替按钮事件
                 */
                TeamMateViewMediators.prototype.onClickUseGoldBtnEvent = function () {
                    this.event(commonUI.USE_GOLD_EXCHANGE_EVENT);
                };
                /**
                 * @describe  银币补足界面，点击使用符石兑换按钮事件
                 */
                TeamMateViewMediators.prototype.onClickUseYuanBaoOfSilverBtnEvent = function () {
                    this.event(commonUI.USE_SILVER_EXCHANGE_EVENT);
                    this.hide();
                };
                /**
                 * @describe  金币补助界面，点击使用符石兑换按钮事件
                 */
                TeamMateViewMediators.prototype.onClickUseYuanBaoOfGoldBtnEvent = function () {
                    this.event(commonUI.USE_YUANBAO_EXCHANGE_EVENT);
                    this.hide();
                };
                return TeamMateViewMediators;
            }(game.modules.UiMediator));
            commonUI.TeamMateViewMediators = TeamMateViewMediators;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamMateViewMediators.js.map