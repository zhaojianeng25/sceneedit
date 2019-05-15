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
// import TeammateMainViewUI = ui.common.component.TeammateMainViewUI;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var TeamViewMainMediators = /** @class */ (function (_super) {
                __extends(TeamViewMainMediators, _super);
                function TeamViewMainMediators(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**选中角色的下标 */
                    _this.selectIndex = -1;
                    _this.roleInfo = [];
                    _this._viewUI = new ui.common.component.TeammateMainViewUI();
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
                TeamViewMainMediators.prototype.onShow = function (xPos, yPos, index, roleinfo) {
                    _super.prototype.show.call(this);
                    this.roleInfo = roleinfo;
                    this.selectIndex = index;
                    this.registerEvent();
                    this.setGroupBtnPos(xPos, yPos);
                };
                TeamViewMainMediators.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                TeamViewMainMediators.prototype.getView = function () {
                    return this._viewUI;
                };
                /**
                 * @describe  注册事件
                 */
                TeamViewMainMediators.prototype.registerEvent = function () {
                    /** 发送信息 */
                    this._viewUI.sendMessage_btn.on(LEvent.MOUSE_DOWN, this, this.chatWith);
                    /** 添加为朋友 */
                    this._viewUI.addFriend_btn.on(LEvent.MOUSE_DOWN, this, this.addFriend);
                    /** 查看装备 */
                    this._viewUI.watchEquip_btn.on(LEvent.MOUSE_DOWN, this, this.onViewEquip);
                    this._viewUI.mask_img.on(LEvent.MOUSE_DOWN, this, this.hide);
                    game.modules.team.models.TeamProxy.getInstance().once(game.modules.team.models.REFRESH_VIEW_EQUIP, this, this._OpenEquip);
                };
                /** 查看装备 */
                TeamViewMainMediators.prototype.onViewEquip = function () {
                    var roleid = this.roleInfo[this.selectIndex].roleid;
                    RequesterProtocols._instance.c2s_CGetRoleEquip(roleid, 0);
                    this.hide();
                };
                TeamViewMainMediators.prototype._OpenEquip = function () {
                    this.hide();
                    this._wanjiazhuangbeiUI.onShow();
                };
                /** 调整站位 */
                TeamViewMainMediators.prototype.adjustmentStand = function () {
                    if (this.selectIndex != 0)
                        game.modules.team.models.TeamModel.getInstance().swapPosIndex = this.selectIndex;
                    game.modules.team.models.TeamProxy.getInstance().event(game.modules.team.models.REFRESH_FRIEND_ACCEPT_TEAM);
                    this.hide();
                };
                /** 升为队长 */
                TeamViewMainMediators.prototype.promotedToCaption = function () {
                    var roleid = this.roleInfo[this.selectIndex].roleid;
                    RequesterProtocols._instance.c2s_CSetTeamLeader(roleid);
                    // game.modules.team.models.TeamModel.getInstance().entrustCaptain = roleid;
                    this.hide();
                };
                /** 委任指挥 */
                TeamViewMainMediators.prototype.setCommander = function () {
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
                TeamViewMainMediators.prototype.addFriend = function () {
                    if (this.selectIndex != -1) {
                        var roleid = this.roleInfo[this.selectIndex].roleid;
                        RequesterProtocols._instance.c2s_CRequestAddFriend(roleid);
                    }
                    this.hide();
                };
                /** 聊天 */
                TeamViewMainMediators.prototype.chatWith = function () {
                    modules.ModuleManager.show(modules.ModuleNames.FRIEND, this._app);
                    this.hide();
                };
                TeamViewMainMediators.prototype.setGroupBtnPos = function (xPos, yPos) {
                    var realX = 295;
                    var realY = 815;
                    this._viewUI.groupBtn_btn.pos(realX, realY);
                };
                ////////////////
                ///事件
                ////////////////
                /**
                 * @describe  银币补助界面，点击使用金币代替按钮事件
                 */
                TeamViewMainMediators.prototype.onClickUseGoldBtnEvent = function () {
                    this.event(commonUI.USE_GOLD_EXCHANGE_EVENT);
                };
                /**
                 * @describe  银币补足界面，点击使用符石兑换按钮事件
                 */
                TeamViewMainMediators.prototype.onClickUseYuanBaoOfSilverBtnEvent = function () {
                    this.event(commonUI.USE_SILVER_EXCHANGE_EVENT);
                    this.hide();
                };
                /**
                 * @describe  金币补助界面，点击使用符石兑换按钮事件
                 */
                TeamViewMainMediators.prototype.onClickUseYuanBaoOfGoldBtnEvent = function () {
                    this.event(commonUI.USE_YUANBAO_EXCHANGE_EVENT);
                    this.hide();
                };
                return TeamViewMainMediators;
            }(game.modules.UiMediator));
            commonUI.TeamViewMainMediators = TeamViewMainMediators;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamViewMainMediators.js.map