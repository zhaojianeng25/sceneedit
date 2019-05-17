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
        var friend;
        (function (friend) {
            /** 人物弹窗类  */
            var ContactCharacterMediator = /** @class */ (function (_super) {
                __extends(ContactCharacterMediator, _super);
                function ContactCharacterMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /** 场景角色状态 */
                    _this.rolestate = 0;
                    _this._viewUI = new ui.common.component.ContactCharacterUI();
                    _this._app = app;
                    _this._JuBaoMediator = new friend.JuBaoMediator(_this._viewUI);
                    _this.isCenter = false;
                    return _this;
                }
                /**注册事件监听 */
                ContactCharacterMediator.prototype.eventListener = function () {
                    //监听装备刷新事件
                    game.modules.team.models.TeamProxy.getInstance().once(game.modules.team.models.REFRESH_VIEW_EQUIP, this, this._OpenEquip);
                    //监听玩家请求的其他玩家的组队情况
                    friend.models.FriendProxy.getInstance().on(friend.models.SAnswerRoleTeamState_EVENT, this, this.onAnswerRoleTeamState);
                    //监听玩家信息变化
                    friend.models.FriendProxy.getInstance().on(friend.models.SRequestUpdateRoleInfo_EVENT, this, this.onRequestUpdateRoleInfo);
                };
                /**返回玩家信息 */
                ContactCharacterMediator.prototype.onRequestUpdateRoleInfo = function (e) {
                    var _school = modules.createrole.models.LoginModel.getInstance().schoolInfo; //z职业配置表中的内容            
                    var data = friend.models.FriendModel.getInstance().SRequestUpdateRoleInfoData.get("data");
                    this._viewUI.name_lab.text = data.FriendInfoBean.name; //名字
                    this._viewUI.level_lab.text = data.FriendInfoBean.roleLevel.toString(); //等级
                    this._viewUI.touXiang_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + data.FriendInfoBean.shape) + ".png"; //头像
                    this.setFriendZhiyeImg(data.FriendInfoBean.school); //职业图标
                    this._viewUI.account_lab.text = data.FriendInfoBean.roleId.toString(); //账号id
                    this._viewUI.menPaiName_lab.text = _school[data.FriendInfoBean.school]["name"]; //职业名
                    //是否有帮派
                    this.onUpdataClanInfo(data.FriendInfoBean, false);
                    var roledata = [data.FriendInfoBean.roleId, data.FriendInfoBean.name, data.FriendInfoBean.roleLevel, data.FriendInfoBean.shape, this._viewUI.tubiao_img.skin, data.FriendInfoBean.online]; //当前好友的信息
                    this._viewUI.watchEquip_btn.on(LEvent.MOUSE_DOWN, this, this.watchEquip, [data.FriendInfoBean.roleId]);
                    this._viewUI.giveGift_btn.on(LEvent.MOUSE_DOWN, this, this.giveGift, [roledata]);
                    this._viewUI.tipOff_btn.on(LEvent.MOUSE_DOWN, this, this.tipOff, [data.FriendInfoBean.name]);
                    this._viewUI.fight_btn.on(LEvent.MOUSE_DOWN, this, this.fight, [data.FriendInfoBean.roleId]);
                    this._viewUI.transMessage_btn.on(LEvent.MOUSE_DOWN, this, this.transMessage, [data.FriendInfoBean]);
                };
                /** 刷新查看人物属性时所显示的帮派相关信息
                 * @param data 角色信息数据
                 * @param isLevelRank 判断是否从等级排行榜而来的
                 */
                ContactCharacterMediator.prototype.onUpdataClanInfo = function (data, isLevelRank) {
                    // let currRoleLevel = HudModel.getInstance().levelNum;//获得人物角色当前等级
                    // if(currRoleLevel < unlock.BANGPAI_LEVEL) {
                    //     this._viewUI.inviteMeet_btn.visible = false;
                    //     this._viewUI.fight_btn.y = 183;
                    //     return;
                    // }
                    // else{
                    //     this._viewUI.inviteMeet_btn.visible = true;
                    //     this._viewUI.fight_btn.y = 245;
                    // }
                    var roleid;
                    if (isLevelRank) {
                        roleid = data.roleid;
                    }
                    else {
                        roleid = data.roleId;
                    }
                    if (data.factionname != "" && data.factionname != undefined) {
                        this._viewUI.inviteMeet_btn.label = "申请入会";
                        this._viewUI.isBangPai_lab.text = data.factionname; //帮派名
                        this._viewUI.inviteMeet_btn.off(LEvent.MOUSE_DOWN, this, this.inviteMeet);
                        this._viewUI.inviteMeet_btn.on(LEvent.MOUSE_DOWN, this, this.applyJiaRuClan, [data.factionid]);
                    }
                    else {
                        this._viewUI.inviteMeet_btn.label = "邀请入会";
                        this._viewUI.isBangPai_lab.text = modules.tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.NOTHING].msg;
                        this._viewUI.inviteMeet_btn.off(LEvent.MOUSE_DOWN, this, this.applyJiaRuClan);
                        this._viewUI.inviteMeet_btn.on(LEvent.MOUSE_DOWN, this, this.inviteMeet, [roleid]);
                    }
                };
                /** 专门处理排行榜那边等级榜查看玩家信息所返回的玩家信息 */
                ContactCharacterMediator.prototype.onUpdataRoleInfo = function (roleInfoData, onLine) {
                    var _school = modules.createrole.models.LoginModel.getInstance().schoolInfo; //z职业配置表中的内容  
                    this._viewUI.name_lab.text = roleInfoData.rolename;
                    this._viewUI.level_lab.text = roleInfoData.level;
                    this._viewUI.touXiang_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + roleInfoData.shape) + ".png"; //头像
                    this.setFriendZhiyeImg(roleInfoData.school); //职业图标
                    this._viewUI.account_lab.text = roleInfoData.roleid.toString(); //账号id
                    this._viewUI.menPaiName_lab.text = _school[roleInfoData.school]["name"]; //职业名
                    this.onUpdataClanInfo(roleInfoData, true);
                    var _roledata = [roleInfoData.roleid, roleInfoData.rolename, roleInfoData.level, roleInfoData.shape, this._viewUI.tubiao_img.skin, onLine];
                    this._viewUI.watchEquip_btn.on(LEvent.MOUSE_DOWN, this, this.watchEquip, [roleInfoData.roleid]);
                    this._viewUI.giveGift_btn.on(LEvent.MOUSE_DOWN, this, this.giveGift, [_roledata]);
                    this._viewUI.tipOff_btn.on(LEvent.MOUSE_DOWN, this, this.tipOff, [roleInfoData.rolename]);
                    this._viewUI.fight_btn.on(LEvent.MOUSE_DOWN, this, this.fight, [roleInfoData.roleid]);
                    this._viewUI.transMessage_btn.on(LEvent.MOUSE_DOWN, this, this.transMessage, [roleInfoData]);
                };
                /**返回玩家请求的其他玩家的组队情况 */
                ContactCharacterMediator.prototype.onAnswerRoleTeamState = function (e) {
                    var data = friend.models.FriendModel.getInstance().SAnswerRoleTeamStateData.get("data");
                    //根据组队状态显示不同按钮文本
                    switch (data.teamstate) {
                        case FriendEnum.NO_TEAM:
                            this._viewUI.inviteTeam_btn.label = modules.tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.INVITE_TEAM].msg;
                            break;
                        case FriendEnum.HAVE_TEAM:
                            this._viewUI.inviteTeam_btn.label = modules.tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.APPLY_TEAM].msg;
                            break;
                    }
                    this._viewUI.inviteTeam_btn.on(LEvent.MOUSE_DOWN, this, this.inviteTeam, [data.teamstate, data.roleid]);
                };
                /**发送消息
                 * @param roleInfoData 角色信息数据
                 */
                ContactCharacterMediator.prototype.transMessage = function (roleInfoData) {
                    modules.ModuleManager.show(modules.ModuleNames.FRIEND, this._app);
                    //发送消息事件
                    friend.models.FriendProxy.getInstance().event(friend.models.transMessage_EVENT, [roleInfoData]);
                    this._viewUI.role_box.visible = false;
                    this._viewUI.yincang_box.visible = false;
                };
                /**邀请入队 */
                ContactCharacterMediator.prototype.inviteTeam = function (key, id) {
                    switch (key) {
                        case FriendEnum.NO_TEAM:
                            RequesterProtocols._instance.c2s_CCreateTeam(); //角色请求建立队伍
                            RequesterProtocols._instance.c2s_CInviteJoinTeam(id, 0); //邀请对方组队
                            break;
                        case FriendEnum.HAVE_TEAM:
                            RequesterProtocols._instance.c2s_CRequestJoinTeam(id); //申请入队
                            break;
                    }
                    this._viewUI.role_box.visible = false;
                    this._viewUI.yincang_box.visible = false;
                };
                /**打开查看装备界面 */
                ContactCharacterMediator.prototype._OpenEquip = function () {
                    this._ViewEquipMediator = new game.modules.commonUI.ViewEquipMediator(this._app);
                    this._ViewEquipMediator.onShow();
                };
                /**注册事件 */
                ContactCharacterMediator.prototype.registerEvent = function () {
                    this._viewUI.yincang_box.on(LEvent.MOUSE_DOWN, this, this.hide);
                };
                /**初始化*/
                ContactCharacterMediator.prototype.onShow = function (xPos, yPos, key, state) {
                    if (state === void 0) { state = 0; }
                    this.show();
                    this.registerEvent();
                    this.eventListener();
                    this._viewUI.role_box.visible = true;
                    this._viewUI.yincang_box.visible = true;
                    this._viewUI.role_box.x = xPos + 245;
                    this._viewUI.role_box.y = yPos + 150;
                    this.rolestate = state;
                    //区分是否是好友
                    if (key == FriendEnum.FRIEND_KEY)
                        this._viewUI.addFriend_btn.label = modules.tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.DELETE_FRIEND].msg;
                    else
                        this._viewUI.addFriend_btn.label = modules.tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.ADD_FRIEND].msg;
                    if (state && state == 1)
                        this._viewUI.fight_btn.label = modules.tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.WATCH_FIGHT].msg;
                    else
                        this._viewUI.fight_btn.label = modules.tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.COMPAR_FIGCHT].msg;
                    this._viewUI.addFriend_btn.on(LEvent.MOUSE_DOWN, this, this.addFriend, [key]);
                };
                /** 申请入会 */
                ContactCharacterMediator.prototype.applyJiaRuClan = function (clanid) {
                    RequesterProtocols._instance.c2s_CApplyClan(clanid);
                    this._viewUI.role_box.visible = false;
                    this._viewUI.yincang_box.visible = false;
                };
                /**邀请入会 */
                ContactCharacterMediator.prototype.inviteMeet = function (id) {
                    RequesterProtocols._instance.c2s_CClanInvitation(id);
                    this._viewUI.role_box.visible = false;
                    this._viewUI.yincang_box.visible = false;
                };
                /**切磋 */
                ContactCharacterMediator.prototype.fight = function (id) {
                    if (this.rolestate == 1) {
                        RequesterProtocols._instance.c2s_CSendWatchBattle(id);
                    }
                    else {
                        RequesterProtocols._instance.c2s_CInvitationPlayPK(id);
                        this._viewUI.role_box.visible = false;
                        this._viewUI.yincang_box.visible = false;
                    }
                };
                /**举报 */
                ContactCharacterMediator.prototype.tipOff = function (name) {
                    this._JuBaoMediator.onShow(name);
                    this._viewUI.role_box.visible = false;
                    this._viewUI.yincang_box.visible = false;
                };
                /**赠送礼物 */
                ContactCharacterMediator.prototype.giveGift = function (data) {
                    this._viewUI.role_box.visible = false;
                    this._viewUI.yincang_box.visible = false;
                    modules.ModuleManager.hide(modules.ModuleNames.FRIEND);
                    var _GiveGiftViewMediator = new friend.GiveGiftViewMediator(this._app);
                    _GiveGiftViewMediator.onShow(data);
                    LoginModel.getInstance().CommonPage = modules.ModuleNames.FRIEND;
                };
                /** 查看装备*/
                ContactCharacterMediator.prototype.watchEquip = function (id) {
                    RequesterProtocols._instance.c2s_CGetRoleEquip(id, 0);
                    this._viewUI.role_box.visible = false;
                    this._viewUI.yincang_box.visible = false;
                };
                /**添加好友 */
                ContactCharacterMediator.prototype.addFriend = function (key) {
                    var id = parseInt(this._viewUI.account_lab.text);
                    if (key == FriendEnum.FRIEND_KEY)
                        RequesterProtocols._instance.c2s_CBreakOffRelation(id); //发送删除好友请求
                    else
                        RequesterProtocols._instance.c2s_CRequestAddFriend(id); //发送添加好友请求
                    this._viewUI.role_box.visible = false;
                    this._viewUI.yincang_box.visible = false;
                };
                /**设置好友职业图标 */
                ContactCharacterMediator.prototype.setFriendZhiyeImg = function (school) {
                    //根据职业设置职业图标
                    switch (school) {
                        case zhiye.yunxiao:
                            this._viewUI.tubiao_img.skin = "common/ui/tongyong/11.png";
                            break;
                        case zhiye.dahuang:
                            this._viewUI.tubiao_img.skin = "common/ui/tongyong/12.png";
                            break;
                        case zhiye.cangyu:
                            this._viewUI.tubiao_img.skin = "common/ui/tongyong/13.png";
                            break;
                        case zhiye.feixue:
                            this._viewUI.tubiao_img.skin = "common/ui/tongyong/14.png";
                            break;
                        case zhiye.tianlei:
                            this._viewUI.tubiao_img.skin = "common/ui/tongyong/15.png";
                            break;
                        case zhiye.wuliang:
                            this._viewUI.tubiao_img.skin = "common/ui/tongyong/16.png";
                            break;
                        case zhiye.xuanming:
                            this._viewUI.tubiao_img.skin = "common/ui/tongyong/17.png";
                            break;
                        case zhiye.qixing:
                            this._viewUI.tubiao_img.skin = "common/ui/tongyong/18.png";
                            break;
                        case zhiye.danyang:
                            this._viewUI.tubiao_img.skin = "common/ui/tongyong/19.png";
                            break;
                    }
                };
                ContactCharacterMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                ContactCharacterMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                ContactCharacterMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ContactCharacterMediator;
            }(game.modules.UiMediator));
            friend.ContactCharacterMediator = ContactCharacterMediator;
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ContactCharacterMediator.js.map