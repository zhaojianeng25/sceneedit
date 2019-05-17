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
var onLineType;
(function (onLineType) {
    onLineType[onLineType["onLine"] = 1] = "onLine";
    onLineType[onLineType["noOnLine"] = 2] = "noOnLine";
})(onLineType || (onLineType = {}));
var jumpType;
(function (jumpType) {
    jumpType[jumpType["FROM_TEAM"] = 1] = "FROM_TEAM";
})(jumpType || (jumpType = {}));
/**Remind.ui */
// import InviteFriendsUI = ui.common.component.TeamInviteFriendsUI;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            /**打开队伍*/
            commonUI.OPEN_TEAM = "openTeamEvent";
            /**左边按钮接受的事件 */
            commonUI.LEFT_BUTTON_EVENT1 = "leftButtonEvent";
            var InviteFriendsMediator = /** @class */ (function (_super) {
                __extends(InviteFriendsMediator, _super);
                function InviteFriendsMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /** 我的好友_帮派成员列表 */
                    _this.myFriends_Sider = [];
                    /** 角色基本数据用来取icon */
                    _this.roleinfo = [];
                    _this.uiLayer = app.uiRoot.general;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI = new ui.common.component.TeamInviteFriendsUI();
                    _this._viewUI.mouseThrough = true;
                    // 默认居中
                    _this.isCenter = true;
                    return _this;
                }
                InviteFriendsMediator.getInstance = function (uiLayer, app) {
                    if (!this._instance) {
                        this._instance = new InviteFriendsMediator(uiLayer, app);
                    }
                    return this._instance;
                };
                /**  */
                InviteFriendsMediator.prototype.onShow = function (type) {
                    this.invite_type = type;
                    this.onLoad();
                    _super.prototype.show.call(this);
                };
                InviteFriendsMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                InviteFriendsMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**
                 * @describe  开始加载
                 * @param prompt   提示语句
                 */
                InviteFriendsMediator.prototype.onLoad = function () {
                    this.RenameUI();
                    this.myFriends_Sider = [];
                    this.roleinfo = [];
                    this.registEvent();
                    if (this.invite_type == InviteType.INVITE_FRIEND) {
                        /** 好友的数据 */
                        var data = game.modules.friend.models.FriendModel.getInstance().SFriendsInfoInitData.get("data");
                        for (var online = 0; online < data.friends.length; online++) {
                            if (data.friends[online].online = 1) {
                                this.myFriends_Sider.push((data.friends[online]));
                            }
                        }
                    }
                    else if (this.invite_type == InviteType.INVITE_FAMILY) {
                        /** 成员数据 */
                        var memberlist = game.modules.family.models.FamilyModel.getInstance().memberlist;
                        var roleid = LoginModel.getInstance().roleDetail.roleid;
                        for (var _index = 0; _index < memberlist.length; _index++) {
                            var lastonlinetime = memberlist[_index].lastonlinetime; //离线时间
                            var inviteId = memberlist[_index].roleid;
                            if (lastonlinetime == 0 && roleid != inviteId) //只存放在线并且不是自己的成员
                                this.myFriends_Sider.push(memberlist[_index]);
                        }
                    }
                    if (this.myFriends_Sider.length == 0) {
                        this.UI_Switch(onLineType.noOnLine);
                        return;
                    }
                    this.UI_Switch(onLineType.onLine);
                    var roleIcon = _LoginModel.getInstance().cnpcShapeInfo;
                    this.schoolInfo = _LoginModel.getInstance().schoolInfo;
                    for (var index in roleIcon) {
                        this.roleinfo.push(roleIcon[index].littleheadID);
                    }
                    this.refreshMyfriend();
                };
                /** ui重新命名 */
                InviteFriendsMediator.prototype.RenameUI = function () {
                    if (this.invite_type == InviteType.INVITE_FRIEND) {
                        this._viewUI.title_lab.text = "邀请好友";
                        this._viewUI.invite_lab.text = "暂时没有好友在线";
                    }
                    else if (this.invite_type == InviteType.INVITE_FAMILY) {
                        this._viewUI.title_lab.text = "邀请帮派成员";
                        this._viewUI.invite_lab.text = "暂时没有成员在线";
                    }
                };
                /** 在没有在线好友的情况下执行 */
                InviteFriendsMediator.prototype.UI_Switch = function (type) {
                    if (type == onLineType.noOnLine) {
                        this._viewUI.friendsNoOnline_box.visible = true;
                        this._viewUI.myFriend_list.visible = false;
                    }
                    else if (type == onLineType.onLine) {
                        this._viewUI.friendsNoOnline_box.visible = false;
                        this._viewUI.myFriend_list.visible = true;
                    }
                };
                /** 刷新好友数据 */
                InviteFriendsMediator.prototype.refreshMyfriend = function () {
                    this._viewUI.myFriend_list.vScrollBarSkin = "";
                    this._viewUI.myFriend_list.repeatY = this.myFriends_Sider.length;
                    this._viewUI.myFriend_list.array = this.myFriends_Sider;
                    this._viewUI.myFriend_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.myFriend_list.scrollBar.elasticDistance = 100;
                    this._viewUI.myFriend_list.renderHandler = new Handler(this, this.onRendemyFriends_Sider);
                    //   this._viewUI.myFriend_list.scrollTo(this.currentFirstSelectIndex);
                };
                /** 好友数据渲染 */
                InviteFriendsMediator.prototype.onRendemyFriends_Sider = function (cell, index) {
                    if (index > this.myFriends_Sider.length - 1)
                        return;
                    var roleName = cell.getChildByName("roleInfo_img").getChildByName("friendsName_lab"); //
                    var roleLevel = cell.getChildByName("roleInfo_img").getChildByName("friendsLv_lab");
                    var friendsSect = cell.getChildByName("roleInfo_img").getChildByName("friendsSect_lab");
                    var invite_btn = cell.getChildByName("roleInfo_img").getChildByName("invite_btn");
                    var roleLogo_img = cell.getChildByName("roleInfo_img").getChildByName("roleLogo_img");
                    var roleId;
                    if (this.invite_type == InviteType.INVITE_FRIEND) {
                        var shape = this.myFriends_Sider[index].FriendInfoBean.shape;
                        // let shapeId = this.roleinfo[shape];
                        roleName.text = this.myFriends_Sider[index].FriendInfoBean.name;
                        roleLevel.text = this.myFriends_Sider[index].FriendInfoBean.roleLevel;
                        var school = this.myFriends_Sider[index].FriendInfoBean.school;
                        friendsSect.text = this.schoolInfo[school].name;
                        roleLogo_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png";
                        roleId = this.myFriends_Sider[index].FriendInfoBean.roleId;
                    }
                    else if (this.invite_type == InviteType.INVITE_FAMILY) {
                        var shape = this.myFriends_Sider[index].shapeid;
                        //  let shapeId = this.roleinfo[shape];
                        roleName.text = this.myFriends_Sider[index].rolename;
                        roleLevel.text = this.myFriends_Sider[index].rolelevel;
                        var school = this.myFriends_Sider[index].school;
                        friendsSect.text = this.schoolInfo[school].name;
                        roleLogo_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png";
                        roleId = this.myFriends_Sider[index].roleid;
                    }
                    invite_btn.on(LEvent.MOUSE_DOWN, this, this.onInvite, [roleId]);
                };
                /** 邀请好友点击事件 */
                InviteFriendsMediator.prototype.onInvite = function (roleId) {
                    if (roleId != 0) {
                        RequesterProtocols._instance.c2s_CInviteJoinTeam(roleId, 0);
                    }
                };
                /** 按钮的注册事件 */
                InviteFriendsMediator.prototype.registEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this._CloseBtn);
                };
                InviteFriendsMediator.prototype._CloseBtn = function () {
                    // if(this.jump_page == jumpType.FROM_TEAM)
                    // this.event(OPEN_TEAM);
                    var moduleName = LoginModel.getInstance().CommonPage;
                    if (moduleName && moduleName != "") {
                        modules.ModuleManager.show(moduleName, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    this.hide();
                };
                return InviteFriendsMediator;
            }(game.modules.UiMediator));
            commonUI.InviteFriendsMediator = InviteFriendsMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=InviteFriendsMediator.js.map