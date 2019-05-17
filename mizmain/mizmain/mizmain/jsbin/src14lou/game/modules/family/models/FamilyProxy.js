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
            var models;
            (function (models) {
                /**打开公会列表 */
                models.SOpenClanList = "SOpenClanList";
                /**公会宗旨返回 */
                models.SClanAim = "SClanAim";
                /**公会申请 */
                models.SApplyClanList = "SApplyClanList";
                /**公会查询 */
                models.SSearchClan = "SSearchClan";
                /**打开公会 */
                models.SOpenClan = "SOpenClan";
                /**修改公会宗旨 */
                models.SChangeClanAim = "SChangeClanAim";
                /**修改公会名称 */
                models.SChangeClanName = "SChangeClanName";
                /**关闭界面 */
                models.CloseModule = "CloseModule";
                /**公会升级 */
                models.SClanLevelup = "SClanLevelup";
                /**刷新成员列表 */
                models.SRefreshMemberList = "SRefreshMemberList";
                /**请求加入公会 */
                models.SRequestApply = "SRequestApply";
                /**公会事件 */
                models.CRequestEventInfo = "CRequestEventInfo";
                /**公会邀请 */
                models.SClanInvitationView = "SClanInvitationView";
                /**公会邀请加入 */
                models.SClanInvitation = "SClanInvitation";
                /** 弹劾界面返回*/
                models.SRequestImpeachMentView = "SRequestImpeachMentView";
                /**移除主界面的tips */
                models.removeMainTips = "removeMainTips";
                /**离开公会 */
                models.SLeaveClan = "SLeaveClan";
                /**显示提出公会原因 */
                models.showFireMemberReason = "showFireMemberReason";
                /**符文请求信息 */
                models.SRequestRuneInfo = "SRequestRuneInfo";
                /**返回请求符文界面 */
                models.SRuneRequestView = "SRuneRequestView";
                /**符文统计 */
                models.SRequestRuneCount = "SRequestRuneCount";
                /**药房信息 */
                models.SOpenClanMedic = "SOpenClanMedic";
                /**返回修改产药倍数 */
                models.SRequestSelectType = "SRequestSelectType";
                /**查询公会分红 */
                models.SBonusQuery = "SBonusQuery";
                /**返回对战列表 */
                models.SGetClanFightList = "SGetClanFightList";
                /**公会竞技  下次清零时间 */
                models.SGetClearTime = "SGetClearTime";
                /**显示红点 */
                models.isShowFamilyRedDot = "isShowFamilyRedDot";
                /**是否有红点 */
                models.SClanRedTip = "SClanRedTip";
                /**关闭申请加入公会界面 */
                models.CloseJoinView = "CloseJoinView";
                /** familyProxy 帮派的相关协议*/
                var FamilyProxy = /** @class */ (function (_super) {
                    __extends(FamilyProxy, _super);
                    function FamilyProxy() {
                        var _this = _super.call(this) || this;
                        FamilyProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    FamilyProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new FamilyProxy();
                        }
                        return this._instance;
                    };
                    FamilyProxy.prototype.init = function () {
                        models.FamilyModel.getInstance();
                        this.addNetworkListener();
                        Laya.loader.load("common/data/temp/clan.cfactionposition.bin", Handler.create(this, this.onloadedClanCFactionPositionComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/clan.cfactionlobby.bin", Handler.create(this, this.onloadedClanCFactionLobbyComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/clan.cfactiongoldbank.bin", Handler.create(this, this.onloadedClanClanCFactionGoldBankComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/clan.cfactionhotel.bin", Handler.create(this, this.onloadedClanCFactionHotelComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/clan.cfactiondrugstore.bin", Handler.create(this, this.onloadedClanCFactionDrugStoreComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/clan.cfactionfuli.bin", Handler.create(this, this.onloadedClanCFactionFuLiComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/clan.cruneset.bin", Handler.create(this, this.onloadedClanCRuneSetComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/clan.cfactionyaofang.bin", Handler.create(this, this.onloadedClanCFactionYaoFangComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/clan.cfactionhuodong.bin", Handler.create(this, this.onloadedClanCFactionHuoDongComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/instance.cinstaceconfig.bin", Handler.create(this, this.onloadedInstanceCInstaceConfigComplete), null, Loader.BUFFER);
                    };
                    //g公会职务以及权限表
                    FamilyProxy.prototype.onloadedClanCFactionPositionComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionposition.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.FamilyModel.getInstance().clanCFactionPositionData, game.data.template.ClanCFactionPositionBaseVo, "id");
                    };
                    //g公会大厅数据表
                    FamilyProxy.prototype.onloadedClanCFactionLobbyComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionlobby.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.FamilyModel.getInstance().clanCFactionLobbyData, game.data.template.ClanCFactionLobbyBaseVo, "id");
                    };
                    //g公会大厅金库数据表
                    FamilyProxy.prototype.onloadedClanClanCFactionGoldBankComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactiongoldbank.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.FamilyModel.getInstance().clanCFactionGoldBankData, game.data.template.ClanCFactionGoldBankBaseVo, "id");
                    };
                    //g公会旅馆数据表
                    FamilyProxy.prototype.onloadedClanCFactionHotelComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionhotel.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.FamilyModel.getInstance().clanCFactionHotelData, game.data.template.ClanCFactionHotelBaseVo, "id");
                    };
                    //g公会药房数据表
                    FamilyProxy.prototype.onloadedClanCFactionDrugStoreComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactiondrugstore.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.FamilyModel.getInstance().clanCFactionDrugStoreData, game.data.template.ClanCFactionDrugStoreBaseVo, "id");
                    };
                    //g公会福利表
                    FamilyProxy.prototype.onloadedClanCFactionFuLiComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionfuli.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.FamilyModel.getInstance().clanCFactionFuLiData, game.data.template.ClanCFactionFuLiBaseVo, "id");
                    };
                    //g公会符文配置
                    FamilyProxy.prototype.onloadedClanCRuneSetComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cruneset.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.FamilyModel.getInstance().clanCRuneSetData, game.data.template.ClanCRuneSetBaseVo, "id");
                    };
                    //y药品购买配置
                    FamilyProxy.prototype.onloadedClanCFactionYaoFangComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionyaofang.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.FamilyModel.getInstance().clanCFactionYaoFangData, game.data.template.ClanCFactionYaoFangBaseVo, "id");
                    };
                    //g公会活动表
                    FamilyProxy.prototype.onloadedClanCFactionHuoDongComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionhuodong.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.FamilyModel.getInstance().clanCFactionHuoDongData, game.data.template.ClanCFactionHuoDongBaseVo, "id");
                    };
                    //公会副本参数
                    FamilyProxy.prototype.onloadedInstanceCInstaceConfigComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/instance.cinstaceconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.FamilyModel.getInstance().instanceCInstaceConfigData, game.data.template.InstanceCInstaceConfigBaseVo, "id");
                    };
                    FamilyProxy.prototype.addNetworkListener = function () {
                        /**服务端响应客户端请求公会列表协议：没有加入公会 */
                        Network._instance.addHanlder(ProtocolsEnum.SOpenClanList, this, this.onSOpenClanList);
                        /**服务端返回公会宗旨 */
                        Network._instance.addHanlder(ProtocolsEnum.SClanAim, this, this.onSClanAim);
                        /**返回申请过的公会列表 */
                        Network._instance.addHanlder(ProtocolsEnum.SApplyClanList, this, this.onSApplyClanList);
                        /**取消公会申请返回 */
                        Network._instance.addHanlder(ProtocolsEnum.SCancelApplyClan, this, this.onSCancelApplyClan);
                        /**搜索公会返回 */
                        Network._instance.addHanlder(ProtocolsEnum.SSearchClan, this, this.onSSearchClan);
                        /**有工会登陆返回公会信息 */
                        Network._instance.addHanlder(ProtocolsEnum.SOpenClan, this, this.onSOpenClan);
                        /**公会职位返回 */
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshPosition, this, this.onSRefreshPosition);
                        /**修改宗旨返回 */
                        Network._instance.addHanlder(ProtocolsEnum.SChangeClanAim, this, this.onSChangeClanAim);
                        /**修改名称返回 */
                        Network._instance.addHanlder(ProtocolsEnum.SChangeClanName, this, this.onSChangeClanName);
                        /**升级 */
                        Network._instance.addHanlder(ProtocolsEnum.SClanLevelup, this, this.onSClanLevelup);
                        /**成员列表 */
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshMemberList, this, this.onSRefreshMemberList);
                        /**申请列表 */
                        Network._instance.addHanlder(ProtocolsEnum.SRequestApply, this, this.onSRequestApply);
                        /**公会事件 */
                        Network._instance.addHanlder(ProtocolsEnum.SRequestEventInfo, this, this.onSRequestEventInfo);
                        /**申请拒绝返回 */
                        Network._instance.addHanlder(ProtocolsEnum.SRefuseApply, this, this.onSRefuseApply);
                        /**申请同意返回 */
                        Network._instance.addHanlder(ProtocolsEnum.SAcceptApply, this, this.onSAcceptApply);
                        /**公会邀请 */
                        Network._instance.addHanlder(ProtocolsEnum.SClanInvitationView, this, this.onSClanInvitationView);
                        /**公会邀请加入 */
                        Network._instance.addHanlder(ProtocolsEnum.SClanInvitation, this, this.onSClanInvitation);
                        /**搜索好成功 */
                        Network._instance.addHanlder(ProtocolsEnum.SRequestSearchRole, this, this.onSRequestSearchRole);
                        /**弹劾界面返回 */
                        Network._instance.addHanlder(ProtocolsEnum.SRequestImpeachMentView, this, this.onSRequestImpeachMentView);
                        /**主动离开公会 */
                        Network._instance.addHanlder(ProtocolsEnum.SLeaveClan, this, this.onSLeaveClan);
                        /**是否开启自动接收入会 */
                        Network._instance.addHanlder(ProtocolsEnum.SOpenAutoJoinClan, this, this.onSOpenAutoJoinClan);
                        /**禁言 */
                        Network._instance.addHanlder(ProtocolsEnum.SBannedtalk, this, this.onSBannedtalk);
                        /**踢人 */
                        Network._instance.addHanlder(ProtocolsEnum.SFireMember, this, this.onSFireMember);
                        /**符文请求信息 */
                        Network._instance.addHanlder(ProtocolsEnum.SRequestRuneInfo, this, this.onSRequestRuneInfo);
                        /**返回请求符文界面 */
                        Network._instance.addHanlder(ProtocolsEnum.SRuneRequestView, this, this.onSRuneRequestView);
                        /**请求符文 */
                        Network._instance.addHanlder(ProtocolsEnum.SRuneRequest, this, this.onSRuneRequest);
                        /** 符文统计 */
                        Network._instance.addHanlder(ProtocolsEnum.SRequestRuneCount, this, this.onSRequestRuneCount);
                        /** 药房信息 */
                        Network._instance.addHanlder(ProtocolsEnum.SOpenClanMedic, this, this.onSOpenClanMedic);
                        /** 返回购买药房的药品 */
                        Network._instance.addHanlder(ProtocolsEnum.SBuyMedic, this, this.onSBuyMedic);
                        /** 返回修改产药倍数 */
                        Network._instance.addHanlder(ProtocolsEnum.SRequestSelectType, this, this.onSRequestSelectType);
                        /** 查询公会分红 */
                        Network._instance.addHanlder(ProtocolsEnum.SBonusQuery, this, this.onSBonusQuery);
                        /** 领取公会分红 */
                        Network._instance.addHanlder(ProtocolsEnum.SGrabBonus, this, this.onSGrabBonus);
                        /**************************************** */
                        /** 公会竞技  下次清零时间 */
                        Network._instance.addHanlder(ProtocolsEnum.SGetClearTime, this, this.onSGetClearTime);
                        /** 返回对战列表 */
                        Network._instance.addHanlder(ProtocolsEnum.SGetClanFightList, this, this.onSGetClanFightList);
                        /** 是否有红点 */
                        Network._instance.addHanlder(ProtocolsEnum.SClanRedTip, this, this.onSClanRedTip);
                    };
                    FamilyProxy.prototype.onSOpenClanList = function (optcode, msg) {
                        models.FamilyModel.getInstance().clanlist.set(msg.currpage, msg.clanlist);
                        models.FamilyProxy._instance.event(models.SOpenClanList);
                    };
                    FamilyProxy.prototype.onSClanAim = function (optcode, msg) {
                        models.FamilyModel.getInstance().clanid = msg.clanid;
                        models.FamilyModel.getInstance().clanaim = msg.clanaim;
                        models.FamilyModel.getInstance().oldclanname = msg.oldclanname;
                        FamilyProxy._instance.event(models.SClanAim);
                    };
                    FamilyProxy.prototype.onSApplyClanList = function (optcode, msg) {
                        models.FamilyModel.getInstance().applyClanList.set(msg.roleid, msg.applyClanList);
                        FamilyProxy._instance.event(models.SApplyClanList);
                    };
                    FamilyProxy.prototype.onSCancelApplyClan = function (optcode, msg) {
                        var applyClanList = models.FamilyModel.getInstance().applyClanList;
                        var applyClanListKeys = applyClanList.keys;
                        var applyList = applyClanList.get(applyClanListKeys[0]);
                        for (var i = 0; i < applyList.length; i++) {
                            var clankey = applyList[i].clankey; //公会key
                            if (msg.clanid == clankey) {
                                applyList[i].applystate = 0; //申请状态 0取消  1申请中
                            }
                        }
                        models.FamilyModel.getInstance().applyClanList.set(applyClanListKeys[0], applyList);
                        FamilyProxy._instance.event(models.SApplyClanList);
                    };
                    FamilyProxy.prototype.onSSearchClan = function (optcode, msg) {
                        if (msg.clanSummaryInfo[0].clanmastername != undefined) {
                            models.FamilyModel.getInstance().searchClanlist = msg.clanSummaryInfo;
                        }
                        else {
                            models.FamilyModel.getInstance().searchClanlist = [];
                        }
                        FamilyProxy._instance.event(models.SSearchClan);
                    };
                    FamilyProxy.prototype.onSOpenClan = function (optcode, msg) {
                        var clanInfo = [];
                        clanInfo.push({
                            index: msg.index, clanname: msg.clanname, clanid: msg.clanid, clanlevel: msg.clanlevel, membersnum: msg.membersnum, clanmaster: msg.clanmaster,
                            masterid: msg.masterid, vicemasterid: msg.vicemasterid, clancreator: msg.clancreator, clanaim: msg.clanaim, memberlist: msg.memberlist, money: msg.money,
                            house: msg.house, oldclanname: msg.oldclanname, clancreatorid: msg.clancreatorid, autostate: msg.autostate, requestlevel: msg.requestlevel,
                            applylevel: msg.applylevel, costeverymoney: msg.costeverymoney, costmax: msg.costmax, claninstservice: msg.claninstservice
                        });
                        models.FamilyModel.getInstance().clanInfo = clanInfo;
                        var roleid = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;
                        var memberlist = msg.memberlist;
                        for (var i in memberlist) {
                            var m_roleid = memberlist[i].roleid;
                            if (m_roleid == roleid) {
                                game.modules.family.models.FamilyModel.getInstance().myclanInfo = [];
                                game.modules.family.models.FamilyModel.getInstance().myclanInfo.push(memberlist[i]);
                            }
                        }
                        game.modules.mainhud.models.HudModel.getInstance().clankey = msg.clanid;
                        game.modules.mainhud.models.HudModel.getInstance().clanname = msg.clanname;
                        FamilyProxy._instance.event(models.SOpenClan);
                    };
                    FamilyProxy.prototype.onSRefreshPosition = function (optcode, msg) {
                        models.FamilyModel.getInstance().RefreshPosition.set(msg.roleid, msg.position);
                        var memberlist = models.FamilyModel.getInstance().memberlist;
                        for (var i = 0; i < memberlist.length; i++) {
                            var roleid = memberlist[i].roleid;
                            if (roleid == msg.roleid) {
                                memberlist[i].position = msg.position;
                            }
                        }
                        models.FamilyModel.getInstance().memberlist = memberlist;
                        models.FamilyProxy._instance.event(models.SRefreshMemberList);
                    };
                    FamilyProxy.prototype.onSChangeClanAim = function (optcode, msg) {
                        FamilyProxy._instance.event(models.SChangeClanAim, msg.newaim);
                    };
                    FamilyProxy.prototype.onSChangeClanName = function (optcode, msg) {
                        FamilyProxy._instance.event(models.SChangeClanName, msg.newname);
                    };
                    FamilyProxy.prototype.onSClanLevelup = function (optcode, msg) {
                        // FamilyProxy._instance.event(SChangeClanName, msg.newname);
                        var clanInfo = models.FamilyModel.getInstance().clanInfo;
                        var house = clanInfo[0].house;
                        var change = msg.change;
                        var keys = change.keys;
                        for (var i = 0; i < keys.length; i++) {
                            var value = change.get(keys[i]);
                            if (keys[i] == 1) {
                                models.FamilyModel.getInstance().clanInfo[0].clanlevel = value;
                            }
                            else {
                                house.set(keys[i], value);
                            }
                        }
                        models.FamilyModel.getInstance().clanInfo[0].house = house;
                        models.FamilyModel.getInstance().clanInfo[0].money = msg.money;
                        models.FamilyModel.getInstance().clanInfo[0].costmax = msg.costmax;
                        FamilyProxy._instance.event(models.SClanLevelup);
                    };
                    FamilyProxy.prototype.onSRefreshMemberList = function (optcode, msg) {
                        models.FamilyModel.getInstance().memberlist = msg.memberlist;
                        models.FamilyProxy._instance.event(models.SRefreshMemberList);
                    };
                    FamilyProxy.prototype.onSRequestApply = function (optcode, msg) {
                        models.FamilyModel.getInstance().applylist = msg.applylist;
                        models.FamilyProxy._instance.event(models.SRequestApply);
                    };
                    FamilyProxy.prototype.onSRequestEventInfo = function (optcode, msg) {
                        models.FamilyModel.getInstance().eventlist = msg.eventlist;
                        models.FamilyProxy._instance.event(models.CRequestEventInfo);
                    };
                    FamilyProxy.prototype.onSRefuseApply = function (optcode, msg) {
                        var applylist = models.FamilyModel.getInstance().applylist;
                        for (var i = 0; i < applylist.length; i++) {
                            var roleid = applylist[i].roleid;
                            if (roleid == msg.applyroleid) {
                                applylist.splice(i, 1);
                            }
                        }
                        models.FamilyModel.getInstance().applylist = applylist;
                        models.FamilyProxy._instance.event(models.SRequestApply);
                    };
                    FamilyProxy.prototype.onSAcceptApply = function (optcode, msg) {
                        var memberlist = models.FamilyModel.getInstance().memberlist;
                        memberlist.push(msg.memberinfo[0]);
                        models.FamilyModel.getInstance().memberlist = memberlist;
                        models.FamilyProxy._instance.event(models.SRefreshMemberList);
                        var applylist = models.FamilyModel.getInstance().applylist;
                        for (var i = 0; i < applylist.length; i++) {
                            var roleid = applylist[i].roleid;
                            if (roleid == msg.memberinfo[0].roleid) {
                                applylist.splice(i, 1);
                            }
                        }
                        models.FamilyModel.getInstance().applylist = applylist;
                        models.FamilyProxy._instance.event(models.SRequestApply);
                    };
                    FamilyProxy.prototype.onSClanInvitationView = function (optcode, msg) {
                        models.FamilyModel.getInstance().invitationroleinfolist = msg.invitationroleinfolist;
                        models.FamilyProxy.getInstance().event(models.SClanInvitationView);
                    };
                    FamilyProxy.prototype.onSClanInvitation = function (optcode, msg) {
                        var ClanInvitation = new Dictionary();
                        ClanInvitation.set("hostroleid", msg.hostroleid);
                        ClanInvitation.set("hostrolename", msg.hostrolename);
                        var _flag = modules.friend.models.FriendModel.getInstance().isMyBlackList(0, msg.hostrolename); //判断邀请入帮派的角色名字是否是玩家自己黑名单存在
                        if (_flag)
                            return;
                        ClanInvitation.set("clanlevel", msg.clanlevel);
                        ClanInvitation.set("clannname", msg.clannname);
                        ClanInvitation.set("invitetype", msg.invitetype);
                        models.FamilyModel.getInstance().ClanInvitation = ClanInvitation;
                        models.FamilyProxy._instance.event(models.SClanInvitation);
                    };
                    FamilyProxy.prototype.onSRequestSearchRole = function (optcode, msg) {
                        models.FamilyModel.getInstance().invitationroleinfolist = msg.invitationroleinfolist;
                        models.FamilyProxy.getInstance().event(models.SClanInvitationView);
                    };
                    FamilyProxy.prototype.onSRequestImpeachMentView = function (optcode, msg) {
                        var RequestImpeachMent = new Dictionary();
                        RequestImpeachMent.set("impeachstate", msg.impeachstate);
                        RequestImpeachMent.set("maxnum", msg.maxnum);
                        RequestImpeachMent.set("impeachname", msg.impeachname);
                        RequestImpeachMent.set("impeachtime", msg.impeachtime);
                        RequestImpeachMent.set("curnum", msg.curnum);
                        models.FamilyProxy._instance.event(models.SRequestImpeachMentView, RequestImpeachMent);
                    };
                    FamilyProxy.prototype.onSLeaveClan = function (optcode, msg) {
                        var roleid = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;
                        if (roleid == msg.memberid) {
                            game.modules.mainhud.models.HudModel.getInstance().clankey = 0;
                            game.modules.mainhud.models.HudModel.getInstance().clanname = "";
                            models.FamilyProxy.getInstance().event(models.SLeaveClan);
                        }
                    };
                    FamilyProxy.prototype.onSOpenAutoJoinClan = function (optcode, msg) {
                        var clanInfo = models.FamilyModel.getInstance().clanInfo;
                        clanInfo[0].autostate = msg.autostate;
                        clanInfo[0].requestlevel = msg.requestlevel;
                        clanInfo[0].applylevel = msg.applylevel;
                    };
                    FamilyProxy.prototype.onSBannedtalk = function (optcode, msg) {
                        var memberlist = models.FamilyModel.getInstance().memberlist;
                        for (var i = 0; i < memberlist.length; i++) {
                            var roleid = memberlist[i].roleid;
                            if (roleid == msg.memberid) {
                                memberlist[i].isbannedtalk = msg.flag;
                            }
                        }
                        models.FamilyModel.getInstance().memberlist = memberlist;
                    };
                    FamilyProxy.prototype.onSFireMember = function (optcode, msg) {
                        var memberlist = models.FamilyModel.getInstance().memberlist;
                        for (var i = 0; i < memberlist.length; i++) {
                            var roleid = memberlist[i].roleid;
                            if (roleid == msg.memberroleid) {
                                memberlist.splice(i, 1);
                            }
                        }
                        models.FamilyProxy._instance.event(models.SRefreshMemberList);
                        var m_roleid = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid; //当前玩家id
                        if (m_roleid == msg.memberroleid) {
                            game.modules.mainhud.models.HudModel.getInstance().clankey = 0;
                            game.modules.mainhud.models.HudModel.getInstance().clanname = "";
                            models.FamilyProxy.getInstance().event(models.SLeaveClan);
                        }
                    };
                    FamilyProxy.prototype.onSRequestRuneInfo = function (optcode, msg) {
                        var requestRuneInfo = new Dictionary();
                        requestRuneInfo.set("requestnum", msg.requestnum);
                        requestRuneInfo.set("useenergy", msg.useenergy);
                        requestRuneInfo.set("runeinfolist", msg.runeinfolist);
                        models.FamilyProxy._instance.event(models.SRequestRuneInfo, requestRuneInfo);
                    };
                    FamilyProxy.prototype.onSRuneRequestView = function (optcode, msg) {
                        var runerequestinfolist = new Dictionary();
                        runerequestinfolist.set("requestnum", msg.requestnum);
                        runerequestinfolist.set("runerequestinfolist", msg.runerequestinfolist);
                        models.FamilyModel.getInstance().runerequestinfolist = runerequestinfolist;
                        models.FamilyProxy._instance.event(models.SRuneRequestView);
                    };
                    FamilyProxy.prototype.onSRuneRequest = function (optcode, msg) {
                        var runerequestinfolist = new Dictionary();
                        runerequestinfolist.set("requestnum", msg.requestnum);
                        runerequestinfolist.set("runerequestinfolist", msg.runerequestinfolist);
                        models.FamilyModel.getInstance().runerequestinfolist = runerequestinfolist;
                        models.FamilyProxy._instance.event(models.SRuneRequestView);
                    };
                    FamilyProxy.prototype.onSRequestRuneCount = function (optcode, msg) {
                        models.FamilyModel.getInstance().runecountinfolist = msg.runecountinfolist;
                        models.FamilyProxy._instance.event(models.SRequestRuneCount);
                    };
                    FamilyProxy.prototype.onSOpenClanMedic = function (optcode, msg) {
                        var pharmacyInfo = new Dictionary();
                        pharmacyInfo.set("selecttype", msg.selecttype);
                        pharmacyInfo.set("buyitemnum", msg.buyitemnum);
                        pharmacyInfo.set("medicitemlist", msg.medicitemlist);
                        models.FamilyModel.getInstance().pharmacyInfo = pharmacyInfo;
                        models.FamilyProxy._instance.event(models.SOpenClanMedic);
                    };
                    FamilyProxy.prototype.onSBuyMedic = function (optcode, msg) {
                        var pharmacyInfo = models.FamilyModel.getInstance().pharmacyInfo;
                        pharmacyInfo.set("buyitemnum", msg.buyitemnum);
                        var medicitemlist = pharmacyInfo.get("medicitemlist");
                        for (var i = 0; i < medicitemlist.length; i++) {
                            if (medicitemlist[i].itemid == msg.itemid) {
                                medicitemlist[i].itemnum = msg.itemnum;
                            }
                        }
                        pharmacyInfo.set("medicitemlist", medicitemlist);
                        models.FamilyProxy._instance.event(models.SOpenClanMedic);
                    };
                    FamilyProxy.prototype.onSRequestSelectType = function (optcode, msg) {
                        models.FamilyProxy._instance.event(models.SRequestSelectType, msg.selecttype);
                    };
                    FamilyProxy.prototype.onSBonusQuery = function (optcode, msg) {
                        models.FamilyModel.getInstance().bonus = msg.bonus;
                        models.FamilyProxy._instance.event(models.SBonusQuery);
                    };
                    FamilyProxy.prototype.onSGrabBonus = function (optcode, msg) {
                        models.FamilyModel.getInstance().bonus = 0;
                        models.FamilyProxy._instance.event(models.SBonusQuery);
                    };
                    FamilyProxy.prototype.onSGetClearTime = function (optcode, msg) {
                        models.FamilyProxy._instance.event(models.SGetClearTime, msg.cleartime);
                    };
                    FamilyProxy.prototype.onSGetClanFightList = function (optcode, msg) {
                        var ClanFightList = new Dictionary();
                        ClanFightList.set("clanfightlist", msg.clanfightlist);
                        ClanFightList.set("curweek", msg.curweek);
                        ClanFightList.set("over", msg.over);
                        models.FamilyModel.getInstance().ClanFightList = ClanFightList;
                        models.FamilyProxy._instance.event(models.SGetClanFightList);
                    };
                    FamilyProxy.prototype.onSClanRedTip = function (optcode, msg) {
                        models.FamilyProxy._instance.event(models.SClanRedTip, [msg.redtips]);
                    };
                    return FamilyProxy;
                }(hanlder.ProxyBase));
                models.FamilyProxy = FamilyProxy;
            })(models = family.models || (family.models = {}));
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyProxy.js.map