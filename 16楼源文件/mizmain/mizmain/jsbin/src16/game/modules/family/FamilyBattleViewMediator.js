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
* 竞技排名
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var FamilyBattleViewMediator = /** @class */ (function (_super) {
                __extends(FamilyBattleViewMediator, _super);
                function FamilyBattleViewMediator(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.FamilyBattleUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.selectbtn_tab.selectHandler = new Handler(_this, _this.dataRequest);
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this._viewUI.tishi_btn.on(LEvent.MOUSE_DOWN, _this, _this.showTips);
                    _this._viewUI.battle_btn.on(LEvent.MOUSE_DOWN, _this, _this.onBattle);
                    _this.dataRequest(0);
                    _this.CGetClearTime();
                    return _this;
                }
                /**显示弹窗 */
                FamilyBattleViewMediator.prototype.showTips = function () {
                    var parameArr = new Dictionary();
                    parameArr.set("contentId", 11605);
                    this.tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parameArr);
                };
                FamilyBattleViewMediator.prototype.dataRequest = function (index) {
                    this._viewUI.list_vstack.selectedIndex = index;
                    switch (index) {
                        case 0:
                            this.DuiZhenTab();
                            break;
                        case 1:
                            this.JingSaiRank();
                            break;
                        case 2:
                            this.liShiZhanJi();
                            break;
                    }
                };
                /**
                 * 对阵表
                 */
                FamilyBattleViewMediator.prototype.DuiZhenTab = function () {
                    this._viewUI.duizhan_list.visible = false;
                    this._viewUI.timeOne_btn.on(LEvent.MOUSE_DOWN, this, this.duizhanTimeListSelect, [0]);
                    this._viewUI.timeTwo_btn.on(LEvent.MOUSE_DOWN, this, this.duizhanTimeListSelect, [1]);
                    this.duizhanTimeListSelect(0);
                };
                /**对阵表选择 */
                FamilyBattleViewMediator.prototype.duizhanTimeListSelect = function (which) {
                    this.CGetClanFightList(-1, which);
                    family.models.FamilyProxy._instance.on(family.models.SGetClanFightList, this, this.showDuiZhanList);
                };
                /**显示对阵列表 */
                FamilyBattleViewMediator.prototype.showDuiZhanList = function () {
                    var ClanFightList = family.models.FamilyModel.getInstance().ClanFightList;
                    var m_clanfightlist = ClanFightList.get("clanfightlist");
                    var duizhenArr = [];
                    if (m_clanfightlist.length > 0) {
                        this._viewUI.duizhan_list.visible = true;
                        for (var i = 0; i < m_clanfightlist.length; i++) {
                            var clanid1 = m_clanfightlist[i].clanid1;
                            var clanname1 = m_clanfightlist[i].clanname1;
                            var clanid2 = m_clanfightlist[i].clanid2;
                            var clanname2 = m_clanfightlist[i].clanname2;
                            duizhenArr.push({ clanIdOne_label: clanid1, clanNameOne_label: clanname1, clanNameTwo_label: clanname2, clanIdTwo_label: clanid2 });
                        }
                        SaleModel._instance.showList(this._viewUI.duizhan_list, duizhenArr);
                    }
                };
                /**
                 * 竞赛排名
                 */
                FamilyBattleViewMediator.prototype.JingSaiRank = function () {
                    this._viewUI.jingsai1_btn.on(LEvent.MOUSE_DOWN, this, this.onjingsaiBtn, [0, RankType.CLAN_FIGHT_2]);
                    this._viewUI.jingsai2_btn.on(LEvent.MOUSE_DOWN, this, this.onjingsaiBtn, [0, RankType.CLAN_FIGHT_4]);
                    this._viewUI.tongji_btn.on(LEvent.MOUSE_DOWN, this, this.onjingsaiBtn, [1, RankType.CLAN_FIGHT_WEEK]);
                    this._viewUI.jingSaiRank_list.visible = false;
                    this._viewUI.tongji_list.visible = false;
                    this.onjingsaiBtn(0, RankType.CLAN_FIGHT_2);
                };
                /**点击竞赛按钮 */
                FamilyBattleViewMediator.prototype.onjingsaiBtn = function (index, ranktype) {
                    this._viewUI.jingSaiList_vstack.selectedIndex = index;
                    this.CRequestRankList(ranktype, 0);
                    game.modules.ranKingList.models.RanKingListProxy.getInstance().once(game.modules.ranKingList.models.GET_RANKLIST_INFODATA_EVENT, this, this.showJingSaiList);
                };
                /**显示竞赛列表 */
                FamilyBattleViewMediator.prototype.showJingSaiList = function (ranktype, hasMore) {
                    var rankListInfoData = game.modules.ranKingList.models.RanKingListModel._instance.rankListInfoData;
                    if (rankListInfoData.length > 0) { //有竞赛信息
                        if (ranktype == RankType.CLAN_FIGHT_2 || ranktype == RankType.CLAN_FIGHT_4) { //公会战周2和周4那场
                            this._viewUI.jingSaiRank_list.visible = true;
                            var jingsaiArr = [];
                            for (var i = 0; i < rankListInfoData.length; i++) {
                                var rank = rankListInfoData[i].rank;
                                var clanname = rankListInfoData[i].clanname;
                                var clanlevel = rankListInfoData[i].clanlevel;
                                var scroe = rankListInfoData[i].scroe;
                                jingsaiArr.push({ rank: rank, clanName: clanname, clanLevel: clanlevel, clanJifen: scroe });
                            }
                            SaleModel._instance.showList(this._viewUI.jingSaiRank_list, jingsaiArr);
                        }
                        else if (ranktype == RankType.CLAN_FIGHT_WEEK) { //公会战本轮竞赛排名
                            var tongjiArr = [];
                            this._viewUI.tongji_list.visible = true;
                            for (var i = 0; i < rankListInfoData.length; i++) {
                                var rank = rankListInfoData[i].rank;
                                var clanname = rankListInfoData[i].clanname;
                                var fightcount = rankListInfoData[i].fightcount;
                                var wincount = rankListInfoData[i].wincount;
                                var scroe = rankListInfoData[i].scroe;
                                var winRate = (wincount / fightcount).toFixed(2);
                                tongjiArr.push({ rank: rank, clanName: clanname, canZhanNum: fightcount, score: scroe, winRate: winRate });
                            }
                            SaleModel._instance.showList(this._viewUI.tongji_list, tongjiArr);
                        }
                    }
                };
                /**
                 * 历史战绩
                 */
                FamilyBattleViewMediator.prototype.liShiZhanJi = function () {
                    this._viewUI.clanHistroyRank_list.visible = false;
                    this.CRequestRankList(RankType.CLAN_FIGHT_HISTROY, 0);
                    game.modules.ranKingList.models.RanKingListProxy.getInstance().once(game.modules.ranKingList.models.GET_RANKLIST_INFODATA_EVENT, this, this.showClanFightHistroyRank);
                };
                /**公会战历史排名 */
                FamilyBattleViewMediator.prototype.showClanFightHistroyRank = function (ranktype, hasMore) {
                    var rankListInfoData = game.modules.ranKingList.models.RanKingListModel._instance.rankListInfoData;
                    if (rankListInfoData.length > 0) { /**是否有信息 */
                        var FightHistroyArr = [];
                        this._viewUI.clanHistroyRank_list.visible = true;
                        for (var i = 0; i < rankListInfoData.length; i++) {
                            var rank = rankListInfoData[i].rank;
                            var clanname = rankListInfoData[i].clanname;
                            var fightcount = rankListInfoData[i].fightcount;
                            var wincount = rankListInfoData[i].wincount;
                            var scroe = rankListInfoData[i].scroe;
                            var clanlevel = rankListInfoData[i].clanlevel;
                            var winRate = (wincount / fightcount).toFixed(2);
                            FightHistroyArr.push({ rank: rank, clanname: clanname, clanLevel: clanlevel, fightcount: fightcount, wincount: wincount, scroe: scroe, winRate: winRate });
                        }
                        SaleModel._instance.showList(this._viewUI.clanHistroyRank_list, FightHistroyArr);
                    }
                };
                /**显示清除时间 */
                FamilyBattleViewMediator.prototype.showClearTime = function (clearTime) {
                    this._viewUI.clearTime_label.text = this.time2date(clearTime);
                };
                /**转换时间 */
                FamilyBattleViewMediator.prototype.time2date = function (time) {
                    var mytime = new Date(time);
                    var y = mytime.getFullYear();
                    var m = mytime.getMonth() + 1;
                    var d = mytime.getDate();
                    return m + "月" + d + "日";
                };
                FamilyBattleViewMediator.prototype.onBattle = function () {
                    this.CNpcService(139, 910030);
                    this.hide();
                };
                /**
                 * 下次清零时间
                 */
                FamilyBattleViewMediator.prototype.CGetClearTime = function () {
                    RequesterProtocols._instance.c2s_CGetClearTime();
                    family.models.FamilyProxy._instance.on(family.models.SGetClearTime, this, this.showClearTime);
                };
                /**得到对战列表 */
                FamilyBattleViewMediator.prototype.CGetClanFightList = function (whichweek, which) {
                    RequesterProtocols._instance.c2s_CGetClanFightList(whichweek, which);
                };
                /**请求竞技排名 */
                FamilyBattleViewMediator.prototype.CRequestRankList = function (ranktype, page) {
                    RequesterProtocols._instance.c2s_request_ranklist(ranktype, page);
                };
                /**通用向服务器发送NPC服务消息（不带参数） */
                FamilyBattleViewMediator.prototype.CNpcService = function (npckey, serviceid) {
                    RequesterProtocols._instance.c2s_npc_service(npckey, serviceid);
                };
                FamilyBattleViewMediator.prototype.onShow = function (event) {
                    this.show();
                };
                FamilyBattleViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                FamilyBattleViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilyBattleViewMediator;
            }(game.modules.ModuleMediator));
            family.FamilyBattleViewMediator = FamilyBattleViewMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyBattleViewMediator.js.map