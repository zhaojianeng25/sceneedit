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
* 点击成员显示成员头像 和 按钮
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var FamilyContactCharacterViewMediator = /** @class */ (function (_super) {
                __extends(FamilyContactCharacterViewMediator, _super);
                function FamilyContactCharacterViewMediator(uiLayer, app, index, xpos, ypos) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**权限表 */
                    _this.clanCFactionPositionData = family.models.FamilyModel.getInstance().clanCFactionPositionData;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    /**禁言角色id */
                    _this.BanTalkroleId = -1;
                    /**是否禁言 */
                    _this.BanTalkFlag = -1;
                    _this._viewUI = new ui.common.FamilyContactCharacterUI();
                    _this._app = app;
                    _this.isCenter = false;
                    _this._viewUI.listimg_img.visible = false;
                    _this._viewUI.close_img.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.TIPS_ON_OK, _this, _this.okTips);
                    _this.show();
                    _this.showThisView(index);
                    if (xpos && ypos) {
                        _this._viewUI.view_box.x = xpos + 240;
                        _this._viewUI.view_box.y = ypos + 600;
                    }
                    return _this;
                }
                /**显示人物 */
                FamilyContactCharacterViewMediator.prototype.showThisView = function (index) {
                    this.BanTalkFlag = -1;
                    this.BanTalkroleId = -1;
                    var memberlist = family.models.FamilyModel.getInstance().memberlist;
                    if (!memberlist || memberlist.length == 0) {
                        var clanInfo = family.models.FamilyModel.getInstance().clanInfo[0];
                        memberlist = clanInfo.memberlist;
                    }
                    var _membersInfoDic = family.models.FamilyModel.getInstance().menmbersInfoDic;
                    /** 当前角色id */
                    var _currRoleId = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;
                    var _currRolePosition = _membersInfoDic.get(_currRoleId)["position"];
                    /** 当前角色，就是正在查看帮派其它成员信息的角色，其所拥有的帮派权限等级 */
                    var _currRole_poslevel = this.clanCFactionPositionData[_currRolePosition].poslevel;
                    /** 被查看角色id */
                    var memberArr = _membersInfoDic.get(_membersInfoDic.keys[index]);
                    var roleid = memberArr.roleid;
                    var rolePosition = _membersInfoDic.get(roleid)["position"]; //获得被查看角色的帮派权限
                    var isbannedtalk = memberArr.isbannedtalk; //是否禁言
                    var rolename = memberArr.rolename; //名称
                    var lastonlinetime = memberArr.lastonlinetime; //是否在线
                    var rolelevel = memberArr.rolelevel; //等级
                    var shapeid = memberArr.shapeid; //头像id
                    if (_currRole_poslevel != ClanPosLevel.LEVEL4) { //是否是帮派权限4
                        this._viewUI.moreBtn_box.visible = true;
                        this._viewUI.view_box.height = 540;
                        this._viewUI.bg_img.height = 540;
                    }
                    else {
                        this._viewUI.moreBtn_box.visible = false;
                        this._viewUI.view_box.height = 350;
                        this._viewUI.bg_img.height = 350;
                    }
                    this.BanTalkroleId = roleid;
                    if (isbannedtalk == 0 || isbannedtalk == 2) { //禁言
                        this._viewUI.jinyan_btn.label = this.cstringResConfigData[11293].msg;
                        this._viewUI.jinyan_btn.on(LEvent.MOUSE_DOWN, this, this.jinYanMember, [rolename, Bannedtalk.BanTalk]);
                        this.BanTalkFlag = Bannedtalk.BanTalk;
                    }
                    else if (isbannedtalk == 1) { //取消禁言
                        this._viewUI.jinyan_btn.label = this.cstringResConfigData[11294].msg;
                        this._viewUI.jinyan_btn.on(LEvent.MOUSE_DOWN, this, this.jinYanMember, [rolename, Bannedtalk.BanTalkCancel]);
                        this.BanTalkFlag = Bannedtalk.BanTalkCancel;
                    }
                    if (lastonlinetime > 0) { //是否在线
                        this._viewUI.online_label.text = this.cstringResConfigData[353].msg;
                    }
                    else {
                        this._viewUI.online_label.text = this.cstringResConfigData[354].msg;
                    }
                    this._viewUI.name_label.text = rolename;
                    this._viewUI.level_label.text = rolelevel;
                    this._viewUI.icon_img.skin = "common/icon/avatarrole/3000" + shapeid + ".png";
                    this._viewUI.zhuchu_btn.on(LEvent.MOUSE_DOWN, this, this.zhuChuMember, [roleid, rolename]);
                    this._viewUI.renming_btn.on(LEvent.MOUSE_DOWN, this, this.renMingMember, [roleid, _currRolePosition, rolePosition]);
                    this._viewUI.showEquip_btn.on(LEvent.MOUSE_DOWN, this, this.onEquipBtn, [roleid]);
                    this._viewUI.addFriend_btn.on(LEvent.MOUSE_DOWN, this, this.addFriend, [roleid]);
                    this._viewUI.chat_btn.on(LEvent.MOUSE_DOWN, this, this.showChat, [roleid]);
                };
                /** 聊天 */
                FamilyContactCharacterViewMediator.prototype.showChat = function (roleid) {
                    var _this = this;
                    this.hide();
                    RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(roleid);
                    game.modules.friend.models.FriendProxy.getInstance().once(game.modules.friend.models.SRequestUpdateRoleInfo_EVENT, this, function () {
                        var data = game.modules.friend.models.FriendModel.getInstance().SRequestUpdateRoleInfoData.get("data");
                        modules.ModuleManager.hide(modules.ModuleNames.haveFamily);
                        var isFriendFlag = FriendModel.getInstance().isMyFriend(roleid);
                        game.modules.friend.models.FriendProxy.getInstance().event(game.modules.friend.models.transMessage_EVENT, [data.FriendInfoBean]);
                        modules.ModuleManager.show(modules.ModuleNames.FRIEND, _this._app);
                    });
                };
                /**逐出 */
                FamilyContactCharacterViewMediator.prototype.zhuChuMember = function (roleid, roleName) {
                    this._viewUI.listimg_img.visible = false;
                    this.hide();
                    var fireArr = new Dictionary();
                    fireArr.set("roleid", roleid);
                    fireArr.set("roleName", roleName);
                    family.models.FamilyProxy._instance.event(family.models.showFireMemberReason, fireArr);
                };
                /**任命
                 * @param roleid 被任命帮派成员id
                 * @param currrolePosition 任命帮派成员的角色帮派职位
                 * @param rolePosition 被任命帮派成员的帮派职位
                 */
                FamilyContactCharacterViewMediator.prototype.renMingMember = function (roleid, currrolePosition, rolePosition) {
                    this._viewUI.listimg_img.visible = true;
                    var positionDicKeys = Object.keys(this.clanCFactionPositionData);
                    var _poslevel = this.clanCFactionPositionData[currrolePosition].poslevel;
                    var positionBtnArr = [];
                    switch (currrolePosition) {
                        case ClanPositionType.ClanMaster:
                            for (var i = ClanPositionType.ClanMaster; i <= positionDicKeys.length; i++) {
                                positionBtnArr = this.positionOper(i, positionBtnArr);
                            }
                            break;
                        case ClanPositionType.ClanViceMaster:
                            for (var i = ClanPositionType.ClanViceMaster; i <= positionDicKeys.length; i++) {
                                if (this.clanCFactionPositionData[i].poslevel != _poslevel) {
                                    positionBtnArr = this.positionOper(i, positionBtnArr);
                                }
                            }
                            break;
                        case ClanPositionType.ClanArmyGroup1:
                            if (rolePosition == ClanPositionType.ClanArmyGroupElite1 || rolePosition == ClanPositionType.ClanMember) {
                                positionBtnArr = this.positionOper(ClanPositionType.ClanArmyGroupElite1, positionBtnArr);
                                positionBtnArr = this.positionOper(ClanPositionType.ClanMember, positionBtnArr);
                            }
                            else {
                                this.showDisapperMsgTips(150127);
                                return;
                            }
                            break;
                        case ClanPositionType.ClanArmyGroup2:
                            if (rolePosition == ClanPositionType.ClanArmyGroupElite2 || rolePosition == ClanPositionType.ClanMember) {
                                positionBtnArr = this.positionOper(ClanPositionType.ClanArmyGroupElite2, positionBtnArr);
                                positionBtnArr = this.positionOper(ClanPositionType.ClanMember, positionBtnArr);
                            }
                            else {
                                this.showDisapperMsgTips(150127);
                                return;
                            }
                            break;
                        case ClanPositionType.ClanArmyGroup3:
                            if (rolePosition == ClanPositionType.ClanArmyGroupElite3 || rolePosition == ClanPositionType.ClanMember) {
                                positionBtnArr = this.positionOper(ClanPositionType.ClanArmyGroupElite3, positionBtnArr);
                                positionBtnArr = this.positionOper(ClanPositionType.ClanMember, positionBtnArr);
                            }
                            else {
                                this.showDisapperMsgTips(150127);
                                return;
                            }
                            break;
                        case ClanPositionType.ClanArmyGroup4:
                            if (rolePosition == ClanPositionType.ClanArmyGroupElite4 || rolePosition == ClanPositionType.ClanMember) {
                                positionBtnArr = this.positionOper(ClanPositionType.ClanArmyGroupElite4, positionBtnArr);
                                positionBtnArr = this.positionOper(ClanPositionType.ClanMember, positionBtnArr);
                            }
                            else {
                                this.showDisapperMsgTips(150127);
                                return;
                            }
                            break;
                    }
                    var positionBtnList = this._viewUI.positionBtn_list;
                    this._viewUI.listimg_img.height = positionBtnList.getCell(0).height * positionBtnArr.length;
                    positionBtnList.height = positionBtnList.getCell(0).height * positionBtnArr.length;
                    positionBtnList.repeatY = positionBtnArr.length;
                    SaleModel._instance.showList(positionBtnList, positionBtnArr);
                    // positionBtnList.selectHandler = new Handler(this, this.positionListSelect, [roleid, positionBtnArr]);
                    positionBtnList.renderHandler = new Handler(this, this.onSelect, [roleid, positionBtnArr]);
                };
                /** 任命职位选中 */
                FamilyContactCharacterViewMediator.prototype.onSelect = function (roleid, positionBtnArr, cell, index) {
                    var btn = cell.getChildByName("position_btn");
                    btn.on(LEvent.MOUSE_DOWN, this, this.positionListSelect, [roleid, positionBtnArr, index]);
                };
                /** 显示提示消息飘窗 */
                FamilyContactCharacterViewMediator.prototype.showDisapperMsgTips = function (msgid) {
                    var msg = ChatModel.getInstance().chatMessageTips[msgid]["msg"];
                    var disMsgTips = new modules.commonUI.DisappearMessageTipsMediator(this._app);
                    disMsgTips.onShow(msg);
                };
                /** 职位数据操作 */
                FamilyContactCharacterViewMediator.prototype.positionOper = function (position, arr) {
                    var posname = this.clanCFactionPositionData[position].posname;
                    var id = this.clanCFactionPositionData[position].id;
                    arr.push({ position_btn: posname, id: id });
                    return arr;
                };
                /**任命 */
                FamilyContactCharacterViewMediator.prototype.positionListSelect = function (roleid, positionBtnArr, index) {
                    var positionId = positionBtnArr[index].id;
                    if (positionId == ClanPositionType.ClanMaster) {
                        var _parame = new Laya.Dictionary();
                        _parame.set("contentId", 150139);
                        modules.tips.models.TipsProxy.getInstance().once(modules.tips.models.TIPS_ON_OK, this, this.CChangePosition, [roleid, positionId]);
                        var _tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, _parame);
                        return;
                    }
                    this.CChangePosition(roleid, positionId);
                };
                /**禁言 */
                FamilyContactCharacterViewMediator.prototype.jinYanMember = function (roleName, flag) {
                    this._viewUI.listimg_img.visible = false;
                    if (flag == 0 || flag == 2) {
                        this.isBannedtalkTips(11296, roleName);
                    }
                    else if (flag == 1) {
                        this.isBannedtalkTips(11295, roleName);
                    }
                };
                /**是否确定 禁言/解除禁言 tips */
                FamilyContactCharacterViewMediator.prototype.isBannedtalkTips = function (contentId, roleName) {
                    var param = new Dictionary();
                    param.set("contentId", contentId);
                    var paramArr = [roleName];
                    param.set("parame", paramArr);
                    this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                    this._TipsMessageMediator.show();
                    this._TipsMessageMediator.showContent(param);
                };
                /**确定禁言 */
                FamilyContactCharacterViewMediator.prototype.okTips = function () {
                    this.hide();
                    this.CBannedtalk(this.BanTalkroleId, this.BanTalkFlag);
                };
                /**点击查看装备 */
                FamilyContactCharacterViewMediator.prototype.onEquipBtn = function (roleid) {
                    this._viewUI.listimg_img.visible = false;
                    this.CGetRoleEquip(roleid, 0);
                    game.modules.team.models.TeamProxy.getInstance().once(game.modules.team.models.REFRESH_VIEW_EQUIP, this, this.showEquip);
                };
                /**显示装备 */
                FamilyContactCharacterViewMediator.prototype.showEquip = function () {
                    this._wanjiazhuangbeiUI = new game.modules.commonUI.ViewEquipMediator(this._app);
                    this._wanjiazhuangbeiUI.onShow();
                };
                /**加为好友 */
                FamilyContactCharacterViewMediator.prototype.addFriend = function (roleid) {
                    this._viewUI.listimg_img.visible = false;
                    this.hide();
                    this.CRequestAddFriend(roleid);
                };
                /************************************************************************************************************************** */
                /**
                 * 禁言
                 * @param memberid 角色id
                 * @param flag 操作标示：1禁言  2解禁
                 */
                FamilyContactCharacterViewMediator.prototype.CBannedtalk = function (memberid, flag) {
                    RequesterProtocols._instance.c2s_CBannedtalk(memberid, flag);
                };
                /**
                 * 更改职务
                 * @param memberroleid 公会成员的id
                 * @param position 申请的新职位
                 */
                FamilyContactCharacterViewMediator.prototype.CChangePosition = function (memberroleid, position) {
                    RequesterProtocols._instance.c2s_CChangePosition(memberroleid, position);
                    this.hide();
                };
                /**
                 * 查看装备
                */
                FamilyContactCharacterViewMediator.prototype.CGetRoleEquip = function (roleid, sendmsg) {
                    RequesterProtocols._instance.c2s_CGetRoleEquip(roleid, sendmsg);
                };
                /**加为好友 */
                FamilyContactCharacterViewMediator.prototype.CRequestAddFriend = function (roleId) {
                    RequesterProtocols._instance.c2s_CRequestAddFriend(roleId);
                };
                FamilyContactCharacterViewMediator.prototype.offListener = function () {
                    game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_OK, this, this.okTips);
                };
                FamilyContactCharacterViewMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                FamilyContactCharacterViewMediator.prototype.hide = function () {
                    this.offListener();
                    _super.prototype.hide.call(this);
                };
                FamilyContactCharacterViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilyContactCharacterViewMediator;
            }(game.modules.UiMediator));
            family.FamilyContactCharacterViewMediator = FamilyContactCharacterViewMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyContactCharacterViewMediator.js.map