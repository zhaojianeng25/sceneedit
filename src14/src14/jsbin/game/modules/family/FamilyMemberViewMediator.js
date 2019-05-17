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
        var family;
        (function (family) {
            /** 帮派成员界面 */
            var FamilyMemberViewMediator = /** @class */ (function (_super) {
                __extends(FamilyMemberViewMediator, _super);
                function FamilyMemberViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**职业配置表 */
                    _this.schoolInfo = LoginModel.getInstance().schoolInfo;
                    /**权限表 */
                    _this.clanCFactionPositionData = family.models.FamilyModel.getInstance().clanCFactionPositionData;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    /**客户端信息提示表 */
                    _this.chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
                    /**小键盘输如的数字 */
                    _this.totalNum = "";
                    /**自动加入等级 还是 申请等级   false:自动加入  true:申请登记 */
                    _this.agreeLvOrApplyLv = false;
                    /**保存切换数据的index */
                    _this.changeMemberIndex = 0;
                    _this._viewUI = new ui.common.FamilyChengYuanUI();
                    _this._app = app;
                    _this.isCenter = false;
                    _this._viewUI.fireMember_img.visible = false;
                    _this.bangpaiMenbersDic = new Laya.Dictionary();
                    _this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(_this._app);
                    _this._viewUI.familyEvent_list.renderHandler = new Handler(_this, _this.eventSelect);
                    _this._ContactCharacterMediator = new game.modules.friend.ContactCharacterMediator(_this._viewUI, app);
                    return _this;
                }
                /**显示红点 */
                FamilyMemberViewMediator.prototype.showRedDot = function (redtips) {
                    var keys = redtips.keys;
                    if (redtips.get(keys[0]) == 1) {
                        this._viewUI.hongdian_img.visible = true;
                        if (this._viewUI.memberBtn_tab.selectedIndex == 1) { //需要显示红点时，还处在帮派申请列表页面的话，需要重新刷新下该数据
                            this.TabSelect(1); //重新刷新下帮派成员列表
                        }
                    }
                    else {
                        this._viewUI.hongdian_img.visible = false;
                    }
                };
                /**选择显示成员列表、申请列表、还是事件列表*/
                FamilyMemberViewMediator.prototype.TabSelect = function (index) {
                    this._viewUI.member_view.selectedIndex = index;
                    switch (index) {
                        case 0:
                            this.showMember(); //显示成员列表
                            break;
                        case 1:
                            this.CRequestApplyList(); //显示申请列表
                            break;
                        case 2:
                            this.CRequestEventInfo(); //显示事件列表
                            break;
                    }
                };
                /**成员列表 */
                FamilyMemberViewMediator.prototype.showMember = function () {
                    var memberlist = family.models.FamilyModel.getInstance().memberlist;
                    for (var i_1 = 0; i_1 < memberlist.length; i_1++) {
                        this.bangpaiMenbersDic.set(memberlist[i_1]["roleid"], memberlist[i_1]);
                    }
                    family.models.FamilyModel.getInstance().menmbersInfoDic = this.bangpaiMenbersDic;
                    if (memberlist.length > 0) {
                        this._viewUI.member_list.visible = true;
                        var memberListArr = [];
                        for (var i = 0; i < memberlist.length; i++) {
                            var rolename = memberlist[i].rolename;
                            var rolelevel = memberlist[i].rolelevel;
                            var school = memberlist[i].school;
                            var position = memberlist[i].position;
                            var preweekcontribution = memberlist[i].preweekcontribution;
                            var weekcontribution = memberlist[i].weekcontribution;
                            var historycontribution = memberlist[i].historycontribution;
                            var weekaid = memberlist[i].weekaid;
                            var historyaid = memberlist[i].historyaid;
                            var claninstnum = memberlist[i].claninstnum;
                            var clanfightnum = memberlist[i].clanfightnum;
                            var jointime = memberlist[i].jointime; //加入时间毫秒
                            var lastonlinetime = memberlist[i].lastonlinetime; //离线时间
                            var fightvalue = memberlist[i].fightvalue;
                            var shapeid = memberlist[i].shapeid;
                            var roleid = memberlist[i].roleid;
                            var isbannedtalk = memberlist[i].isbannedtalk;
                            var m_position = this.clanCFactionPositionData[position].posname;
                            var m_school = this.schoolInfo[school].name;
                            memberListArr.push({
                                roleName_lab: rolename, roleLv_lab: rolelevel, roleZhiYe_lab: m_school, roleZhiWu_lab: m_position,
                                roleLastDkp_lab: preweekcontribution, roleNowDkp_lab: weekcontribution, roleHistoryDkp_lab: historycontribution,
                                roleNowAssis_lab: weekaid, roleHistoryAssis_lab: historyaid, familyFuBen_lab: claninstnum, clanfightnum_label: clanfightnum,
                                jointime_label: jointime, lastonlinetime_label: lastonlinetime, fightvalue_label: fightvalue, position: position,
                                shapeid: shapeid, roleid: roleid, isbannedtalk: isbannedtalk
                            });
                        }
                        SaleModel._instance.showList(this._viewUI.member_list, memberListArr);
                        SaleModel._instance.showList(this._viewUI.secondMember_list, memberListArr);
                        SaleModel._instance.showList(this._viewUI.thirdMember_list, memberListArr);
                        this._viewUI.member_list.selectHandler = new Handler(this, this.memberListSelect, [memberListArr]);
                        this._viewUI.thirdMember_list.renderHandler = new Handler(this, this.thirdMemberListRender, [memberListArr]);
                        this.isCanSendNews(memberlist);
                    }
                    else {
                        this._viewUI.member_list.visible = false;
                    }
                    this._viewUI.right_btn.on(LEvent.MOUSE_DOWN, this, this.chengeRightMemberList);
                    this._viewUI.left_btn.on(LEvent.MOUSE_DOWN, this, this.chengeLeftMemberList);
                };
                /**点击右箭头按钮 */
                FamilyMemberViewMediator.prototype.chengeRightMemberList = function () {
                    this.changeMemberIndex += 1;
                    if (this.changeMemberIndex >= 2) {
                        this._viewUI.right_btn.visible = false;
                        this._viewUI.left_btn.visible = true;
                    }
                    this.changeMemberList();
                };
                /**点击左箭头按钮 */
                FamilyMemberViewMediator.prototype.chengeLeftMemberList = function () {
                    this.changeMemberIndex -= 1;
                    if (this.changeMemberIndex <= 0) {
                        this._viewUI.right_btn.visible = true;
                        this._viewUI.left_btn.visible = false;
                    }
                    this.changeMemberList();
                };
                FamilyMemberViewMediator.prototype.changeMemberList = function () {
                    this._viewUI.memberlist_vstack.selectedIndex = this.changeMemberIndex;
                };
                /**成员列表 */
                FamilyMemberViewMediator.prototype.memberListSelect = function (memberListArr, index) {
                    if (this._viewUI.member_list.selectedIndex != -1) {
                        var roleid = memberListArr[index].roleid;
                        var m_roleid = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;
                        if (m_roleid != roleid) { //是否是本人
                            this.showContact(index);
                        }
                        this._viewUI.member_list.selectedIndex = -1;
                    }
                };
                FamilyMemberViewMediator.prototype.thirdMemberListRender = function (memberListArr, cell, index) {
                    var jointimelabel = cell.getChildByName("jointime_label");
                    var lastonlinetimelabel = cell.getChildByName("lastonlinetime_label");
                    var jointime = memberListArr[index].jointime_label;
                    var lastonlinetime = memberListArr[index].lastonlinetime_label;
                    if (lastonlinetime == 0) {
                        lastonlinetimelabel.text = this.cstringResConfigData[354].msg;
                    }
                    else {
                        lastonlinetimelabel.text = this.time2date(lastonlinetime);
                    }
                    jointimelabel.text = this.time2day(jointime);
                };
                /**时间戳转换为天数 */
                FamilyMemberViewMediator.prototype.time2day = function (time) {
                    var day = 24 * 60 * 60;
                    var days = Math.floor(time / day);
                    return days + this.cstringResConfigData[317].msg;
                };
                /**时间戳转换为日期 */
                FamilyMemberViewMediator.prototype.time2date = function (time) {
                    var mytime = new Date(time * 1000);
                    var y = mytime.getFullYear();
                    var m = mytime.getMonth() + 1;
                    var d = mytime.getDate();
                    return y + "-" + m + "-" + d;
                };
                /**显示人物弹窗界面 */
                FamilyMemberViewMediator.prototype.showContact = function (index) {
                    this._FamilyContactCharacterViewMediator = new family.FamilyContactCharacterViewMediator(this._viewUI, this._app, index);
                };
                /**申请列表 */
                FamilyMemberViewMediator.prototype.showApply = function () {
                    var applylist = family.models.FamilyModel.getInstance().applylist;
                    if (applylist.length > 0) {
                        this._viewUI.hongdian_img.visible = true;
                        this._viewUI.noInfo_box.visible = false;
                        this._viewUI.apply_list.visible = true;
                        family.models.FamilyProxy._instance.event(family.models.isShowFamilyRedDot, 1);
                        var applyArr = [];
                        for (var i = 0; i < applylist.length; i++) {
                            var roleid = applylist[i].roleid;
                            var rolename = applylist[i].rolename;
                            var rolelevel = applylist[i].rolelevel;
                            var roleschool = applylist[i].roleschool;
                            var fightvalue = applylist[i].fightvalue;
                            var m_school = this.schoolInfo[roleschool].name;
                            var m_school_img = "common/ui/havefamily/" + roleschool + ".png";
                            applyArr.push({
                                applyId_lab: roleid, applyName_lab: rolename, applyLv_lab: rolelevel,
                                applyBattle_lab: fightvalue, applyZhiYe_lab: m_school, school_img: m_school_img
                            });
                        }
                        SaleModel._instance.showList(this._viewUI.apply_list, applyArr);
                        this._viewUI.apply_list.renderHandler = new Handler(this, this.applyListRender, [applyArr]);
                    }
                    else {
                        this._viewUI.noInfo_box.visible = true;
                        this._viewUI.apply_list.visible = false;
                        this._viewUI.hongdian_img.visible = false;
                        family.models.FamilyProxy._instance.event(family.models.isShowFamilyRedDot, 0);
                    }
                    this.showOpenAutoJoinClan();
                };
                FamilyMemberViewMediator.prototype.applyListRender = function (applyArr, cell, index) {
                    var agreeBtn = cell.getChildByName("agree_btn");
                    var refuseBtn = cell.getChildByName("refuse_btn");
                    var chatBtn = cell.getChildByName("chat_btn");
                    agreeBtn.on(LEvent.MOUSE_DOWN, this, this.onAgreeBtn, [applyArr, index]);
                    refuseBtn.on(LEvent.MOUSE_DOWN, this, this.onRefuseBtn, [applyArr, index]);
                    chatBtn.on(LEvent.MOUSE_DOWN, this, this.contactPlayer);
                };
                /**显示自动加入的数据 */
                FamilyMemberViewMediator.prototype.showOpenAutoJoinClan = function () {
                    var OpenAutoJoinClan = family.models.FamilyModel.getInstance().OpenAutoJoinClan;
                    var clanInfo = family.models.FamilyModel.getInstance().clanInfo;
                    if (clanInfo.length <= 0) {
                        return;
                    }
                    var autostate = clanInfo[0].autostate;
                    if (autostate == 1) {
                        this._viewUI.autoAccept_check.selected = true;
                    }
                    else {
                        this._viewUI.autoAccept_check.selected = false;
                    }
                    var requestlevel = clanInfo[0].requestlevel;
                    this._viewUI.agreeLv_btn.label = requestlevel;
                    var applylevel = clanInfo[0].applylevel;
                    this._viewUI.applyLv_btn.label = applylevel;
                };
                /**
                 * 能否群发消息
                 */
                FamilyMemberViewMediator.prototype.isCanSendNews = function (memberlist) {
                    var mroleid = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;
                    for (var i = 0; i < memberlist.length; i++) {
                        var memberRoleid = memberlist[i].roleid;
                        if (mroleid == memberRoleid) {
                            var position = memberlist[i].position;
                            var qunfa = this.clanCFactionPositionData[position].qunfa;
                            if (qunfa != 1) { //不能群发消息
                                this._viewUI.familyQunFa_btn.disabled = true;
                            }
                            else {
                                this._viewUI.familyQunFa_btn.disabled = false;
                            }
                        }
                    }
                };
                /**同意申请 */
                FamilyMemberViewMediator.prototype.onAgreeBtn = function (applyArr, index) {
                    var position = family.models.FamilyModel.getInstance().myclanInfo[0].position;
                    if (position <= 3) { //权限表中没有找到对应的字段，策划说先设置1、2、3
                        var roleid = applyArr[index].applyId_lab;
                        this.CAcceptOrRefuseApply(roleid, AcceptOrRefuseApply.accept);
                    }
                    else {
                        this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[150127].msg);
                    }
                };
                /**拒绝申请 */
                FamilyMemberViewMediator.prototype.onRefuseBtn = function (applyArr, index) {
                    var position = family.models.FamilyModel.getInstance().myclanInfo[0].position;
                    if (position <= 3) { //权限表中没有找到对应的字段，策划说先设置1、2、3
                        var roleid = applyArr[index].applyId_lab;
                        this.CAcceptOrRefuseApply(roleid, AcceptOrRefuseApply.refuse);
                    }
                    else {
                        this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[150127].msg);
                    }
                };
                /**公会事件 */
                FamilyMemberViewMediator.prototype.clanEvent = function () {
                    var eventList = family.models.FamilyModel.getInstance().eventlist;
                    var data = [];
                    this.eventArr = [];
                    for (var i = eventList.length - 1; i >= 0; i--) {
                        if (eventList.length - 20 > 0 && i <= eventList.length - 1 - 20)
                            break;
                        var clanEventInfo = eventList[i];
                        this.eventArr.push(clanEventInfo);
                        data.push({
                            time_lab: { text: clanEventInfo.eventtime },
                        });
                    }
                    SaleModel._instance.showList(this._viewUI.familyEvent_list, data);
                    for (var j = 0; j < this.eventArr.length; j++) {
                        var clanEventInfo = this.eventArr[j];
                        var html = this._viewUI.familyEvent_list.getCell(j).getChildByName("familyEvent_html");
                        var bai_img = this._viewUI.familyEvent_list.getCell(j).getChildByName("bai_img");
                        var hui_img = this._viewUI.familyEvent_list.getCell(j).getChildByName("hui_img");
                        html.innerHTML = clanEventInfo.eventinfo;
                        if (j % 2 == 0 || j == 0) {
                            bai_img.visible = true;
                            hui_img.visible = false;
                        }
                        else {
                            bai_img.visible = false;
                            hui_img.visible = true;
                        }
                    }
                };
                FamilyMemberViewMediator.prototype.eventSelect = function (cell, index) {
                    var btn = cell.getChildByName("event_btn");
                    btn.on(LEvent.MOUSE_DOWN, this, this.onSelect, [cell, index]);
                };
                FamilyMemberViewMediator.prototype.onSelect = function (cell, index, e) {
                    var clanEventInfo = this.eventArr[index];
                    console.log("-------公会事件clanEventInfo.eventvalue：", clanEventInfo.eventvalue);
                    console.log("-------公会事件clanEventInfo.eventtype", clanEventInfo.eventtype);
                    if (clanEventInfo.eventtype > 5)
                        return; //小于5的事件有人物
                    // for (var i: number = 0; i < this.bangpaiMenbersDic.keys.length; i++) {
                    //     var m_roleid = this.bangpaiMenbersDic.values[i].roleid;
                    //     if (m_roleid == clanEventInfo.eventvalue) {
                    //请求玩家信息
                    RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(clanEventInfo.eventvalue);
                    //客户端请求其他玩家的组队情况
                    RequesterProtocols._instance.c2s_CReqRoleTeamState(clanEventInfo.eventvalue);
                    var isFriendFlag = FriendModel.getInstance().isMyFriend(clanEventInfo.eventvalue);
                    // let xPos = e.currentTarget.mouseX;
                    // let yPos = e.currentTarget.mouseY;
                    this._ContactCharacterMediator.onShow(40, 70, isFriendFlag);
                    //     }
                    // }
                };
                /**公会邀请 */
                FamilyMemberViewMediator.prototype.invitation = function () {
                    this._FamilyInvitationViewMediator = new family.FamilyInvitationViewMediator(this._app);
                    this._FamilyInvitationViewMediator.show();
                    modules.ModuleManager.hide(modules.ModuleNames.haveFamily);
                };
                /**
                 * 弹劾会长
                 */
                FamilyMemberViewMediator.prototype.impeachment = function () {
                    this._FamilyImpeachmentViewMediator = new family.FamilyImpeachmentViewMediator(this._app);
                    this._FamilyImpeachmentViewMediator.show();
                    modules.ModuleManager.hide(modules.ModuleNames.haveFamily);
                };
                /**
                 * 公会列表
                 */
                FamilyMemberViewMediator.prototype.showClanList = function () {
                    modules.ModuleManager.hide(modules.ModuleNames.haveFamily);
                    modules.ModuleManager.show(modules.ModuleNames.Family, this._app);
                    LoginModel.getInstance().CommonPage = modules.ModuleNames.haveFamily;
                };
                /**
                 * 离开公会
                 * @describe 需要判断角色是否为帮主
                 *          是帮主的话，还需判断是否有副帮主存在
                 *          若不存在，需弹出提示——你必须任命一名帮主或者副帮主才可退出帮派
                 */
                FamilyMemberViewMediator.prototype.leaveClan = function () {
                    var _roleid = LoginModel.getInstance().roleDetail.roleid; //获取要当前要退出帮派的角色id
                    var _roleposition = this.bangpaiMenbersDic.get(_roleid)["position"]; //获取该角色在帮派中的职位
                    var _isHave = false; //用作判断是否有副帮主
                    //遍历，寻找是否存在副帮主
                    for (var i = 0; i < this.bangpaiMenbersDic.keys.length; i++) {
                        if (this.bangpaiMenbersDic.get(this.bangpaiMenbersDic.keys[i])["position"] == ClanPositionType.ClanViceMaster) {
                            _isHave = true;
                        }
                    }
                    var _memberlist = family.models.FamilyModel.getInstance().memberlist;
                    if (_roleposition == ClanPositionType.ClanMaster && !_isHave && _memberlist.length > 1) {
                        var _param = new Laya.Dictionary();
                        _param.set("contentId", 150141);
                        var _tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, _param);
                        return;
                    }
                    var param = new Dictionary();
                    param.set("contentId", 150140);
                    this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                    this._TipsMessageMediator.show();
                    this._TipsMessageMediator.showContent(param);
                    game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.okLeavelClan);
                };
                /**确定离开公会 */
                FamilyMemberViewMediator.prototype.okLeavelClan = function () {
                    this.CLeaveClan();
                };
                /** 离开帮派领地 */
                FamilyMemberViewMediator.prototype.leaveClanTerritory = function () {
                    game.modules.mainhud.models.HudModel._instance.useapp = this._app;
                    game.modules.mainhud.models.HudModel._instance.getpost(1651); //跳转到济世镇
                    var mainUnit = this._app.sceneObjectMgr.mainUnit;
                    RequesterProtocols._instance.c2s_req_goto(1651, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
                    game.modules.autohangup.models.AutoHangUpModel.getInstance().notaketimer = 0;
                };
                /**离开成功 */
                FamilyMemberViewMediator.prototype.sleavelClan = function () {
                    var _sceneid = game.modules.mainhud.models.HudModel.getInstance().sceneid;
                    //判断玩家当前角色是否还在帮派领地
                    if (_sceneid = 1711) {
                        this.leaveClanTerritory();
                    }
                    modules.ModuleManager.hide(modules.ModuleNames.haveFamily);
                };
                /**群发消息 */
                FamilyMemberViewMediator.prototype.SendNews = function () {
                    this._FamilySendNewsViewMediator = new family.FamilySendNewsViewMediator(this._viewUI, this._app);
                    this._FamilySendNewsViewMediator.show();
                };
                /**清除申请列表 */
                FamilyMemberViewMediator.prototype.clearApplyList = function () {
                    this.CClearApplyList();
                };
                /**自动入会 */
                FamilyMemberViewMediator.prototype.AutoAccept = function () {
                    var agreeLevel = this._viewUI.agreeLv_btn.label;
                    var applyLevel = this._viewUI.applyLv_btn.label;
                    var requestlevel = parseInt(agreeLevel);
                    var applylevel = parseInt(applyLevel);
                    var autostate = 0;
                    if (this._viewUI.autoAccept_check.selected) {
                        autostate = 1;
                    }
                    this.COpenAutoJoinClan(autostate, requestlevel, applylevel);
                };
                /**申请等级 */
                FamilyMemberViewMediator.prototype.onapplyLvBtn = function () {
                    this.agreeLvOrApplyLv = true;
                    this.showXiaoJianPan();
                };
                /**自动加入等级 */
                FamilyMemberViewMediator.prototype.agreeLvBtn = function () {
                    this.agreeLvOrApplyLv = false;
                    this.showXiaoJianPan();
                };
                /**小键盘 */
                FamilyMemberViewMediator.prototype.showXiaoJianPan = function () {
                    this.totalNum = "";
                    this._XiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
                    this._XiaoJianPanMediator.onShow(150, 800);
                    game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, this, this.getNumber);
                };
                /** 点击键盘数字*/
                FamilyMemberViewMediator.prototype.getNumber = function (num) {
                    var isSetAgree = false;
                    if (num == -2) { //点击了ok
                        if (this.totalNum == "" || this.totalNum.charAt(0) == "0") {
                            this.totalNum = "1";
                        }
                    }
                    if (num == -1) { //点击了删除
                        this.totalNum = this.totalNum.substring(0, this.totalNum.length - 1);
                        if (this.totalNum.length <= 0) {
                            this.totalNum = "0";
                        }
                    }
                    var btn = null;
                    if (this.agreeLvOrApplyLv) {
                        btn = this._viewUI.applyLv_btn;
                    }
                    else {
                        btn = this._viewUI.agreeLv_btn;
                        isSetAgree = true;
                    }
                    if (num >= 0) {
                        var oneChar = this.totalNum.charAt(0);
                        if (oneChar != '0') {
                            this.totalNum += num;
                        }
                        else {
                            this.totalNum = num;
                        }
                    }
                    if (this.totalNum.length <= 2) {
                        btn.label = "";
                        btn.label = this.totalNum;
                    }
                    else {
                        btn.label = 99 + "";
                        this.totalNum = 99 + "";
                    }
                    //改变数值并关闭窗口需要发送协议通知自动审批的等级变化
                    if (num == -2) {
                        var agreeLevel = parseInt(this._viewUI.agreeLv_btn.label);
                        var applylevel = parseInt(this._viewUI.applyLv_btn.label);
                        if (isSetAgree) {
                            if (parseInt(this.totalNum) < applylevel) {
                                btn.label = applylevel;
                                agreeLevel = applylevel;
                            }
                        }
                        else {
                            if (parseInt(this.totalNum) > agreeLevel) {
                                this._viewUI.agreeLv_btn.label = this.totalNum;
                                agreeLevel = applylevel;
                            }
                        }
                        this.COpenAutoJoinClan(family.models.FamilyModel.getInstance().clanInfo[0].autostate, agreeLevel, applylevel);
                    }
                };
                /**选择踢人原因 */
                FamilyMemberViewMediator.prototype.showFireMemberReason = function (fireArr) {
                    var roleid = fireArr.get("roleid");
                    var roleName = fireArr.get("roleName");
                    var tishi = this.chatMessageTips[145117].msg;
                    var m_tishi = tishi.replace("$parameter1$", roleName);
                    this._viewUI.fire_laebl.innerHTML = m_tishi;
                    this._viewUI.fireMember_img.visible = true;
                    this._viewUI.okFire_btn.on(LEvent.MOUSE_DOWN, this, this.fireMember, [roleid]);
                    this._viewUI.cancelFire_btn.on(LEvent.MOUSE_DOWN, this, this.onCancelBtn);
                    this._viewUI.fireClose_btn.on(LEvent.MOUSE_DOWN, this, this.onCancelBtn);
                };
                /**踢人 */
                FamilyMemberViewMediator.prototype.fireMember = function (roleid) {
                    var reasontype = this._viewUI.reasontype_redio.selectedIndex + 1;
                    this.CFireMember(roleid, reasontype);
                    this.onCancelBtn();
                };
                /**点击取消 */
                FamilyMemberViewMediator.prototype.onCancelBtn = function () {
                    this._viewUI.fireMember_img.visible = false;
                };
                /**说明 */
                FamilyMemberViewMediator.prototype.showDsecTips = function () {
                    var parameArr = new Dictionary();
                    parameArr.set("title", 11285);
                    parameArr.set("contentId", 11176);
                    var myClanInfo = family.models.FamilyModel.getInstance().myclanInfo;
                    var rolefreezedcontribution = myClanInfo[0].rolefreezedcontribution;
                    var parame = [rolefreezedcontribution];
                    parameArr.set("parame", parame);
                    this.tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parameArr);
                };
                /**联系玩家 */
                FamilyMemberViewMediator.prototype.contactPlayer = function () {
                    this.FriendSystemModule = new game.modules.friend.FriendSystemModule(this._app);
                    this.FriendSystemModule.show();
                    family.models.FamilyProxy._instance.event(family.models.CloseModule);
                };
                /********************************************************************************************************************/
                /**刷新成员列表 */
                FamilyMemberViewMediator.prototype.CRefreshMemberList = function () {
                    RequesterProtocols._instance.c2s_CRefreshMemberList();
                };
                /**申请成员列表 */
                FamilyMemberViewMediator.prototype.CRequestApplyList = function () {
                    RequesterProtocols._instance.c2s_CRequestApplyList();
                };
                /**公会事件列表 */
                FamilyMemberViewMediator.prototype.CRequestEventInfo = function () {
                    RequesterProtocols._instance.c2s_CRequestEventInfo();
                };
                /**
                 * 同意或者拒绝申请
                 * @param applyroleid   id
                 * @param accept  0拒绝,1接受
                 */
                FamilyMemberViewMediator.prototype.CAcceptOrRefuseApply = function (applyroleid, accept) {
                    RequesterProtocols._instance.c2s_CAcceptOrRefuseApply(applyroleid, accept);
                };
                /**主动离开公会 */
                FamilyMemberViewMediator.prototype.CLeaveClan = function () {
                    RequesterProtocols._instance.c2s_CLeaveClan();
                };
                /**清除申请列表 */
                FamilyMemberViewMediator.prototype.CClearApplyList = function () {
                    RequesterProtocols._instance.c2s_CClearApplyList();
                };
                /**是否开启自动接收入会 */
                FamilyMemberViewMediator.prototype.COpenAutoJoinClan = function (autostate, requestlevel, applylevel) {
                    RequesterProtocols._instance.c2s_COpenAutoJoinClan(autostate, requestlevel, applylevel);
                };
                /**
                 * 踢人
                 * @param memberroleid
                 * @param reasontype
                 */
                FamilyMemberViewMediator.prototype.CFireMember = function (memberroleid, reasontype) {
                    RequesterProtocols._instance.c2s_CFireMember(memberroleid, reasontype);
                };
                FamilyMemberViewMediator.prototype.show = function () {
                    this.registeredListener();
                    this.CRefreshMemberList();
                    _super.prototype.show.call(this);
                };
                /** 注册事件监听 */
                FamilyMemberViewMediator.prototype.registeredListener = function () {
                    family.models.FamilyProxy._instance.on(family.models.SRefreshMemberList, this, this.showMember);
                    family.models.FamilyProxy._instance.on(family.models.SRequestApply, this, this.showApply);
                    family.models.FamilyProxy._instance.on(family.models.CRequestEventInfo, this, this.clanEvent);
                    family.models.FamilyProxy._instance.on(family.models.SLeaveClan, this, this.sleavelClan);
                    family.models.FamilyProxy._instance.on(family.models.showFireMemberReason, this, this.showFireMemberReason);
                    family.models.FamilyProxy._instance.on(family.models.SClanRedTip, this, this.showRedDot);
                    this._viewUI.familyyaoqing_btn.on(LEvent.MOUSE_DOWN, this, this.invitation);
                    this._viewUI.memberBtn_tab.selectHandler = new Handler(this, this.TabSelect);
                    this._viewUI.tanHe_btn.on(LEvent.MOUSE_DOWN, this, this.impeachment);
                    this._viewUI.familyLieBiao_btn.on(LEvent.MOUSE_DOWN, this, this.showClanList);
                    this._viewUI.familyQuit_btn.on(LEvent.MOUSE_DOWN, this, this.leaveClan);
                    this._viewUI.familyQunFa_btn.on(LEvent.MOUSE_DOWN, this, this.SendNews);
                    this._viewUI.qingKong_btn.on(LEvent.MOUSE_DOWN, this, this.clearApplyList);
                    this._viewUI.refresh_btn.on(LEvent.MOUSE_DOWN, this, this.CRequestApplyList);
                    this._viewUI.autoAccept_check.clickHandler = new Handler(this, this.AutoAccept);
                    this._viewUI.applyLv_btn.on(LEvent.MOUSE_DOWN, this, this.onapplyLvBtn);
                    this._viewUI.agreeLv_btn.on(LEvent.MOUSE_DOWN, this, this.agreeLvBtn);
                    this._viewUI.familyShuoMing_btn.on(LEvent.MOUSE_DOWN, this, this.showDsecTips);
                };
                FamilyMemberViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                FamilyMemberViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilyMemberViewMediator;
            }(game.modules.UiMediator));
            family.FamilyMemberViewMediator = FamilyMemberViewMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyMemberViewMediator.js.map