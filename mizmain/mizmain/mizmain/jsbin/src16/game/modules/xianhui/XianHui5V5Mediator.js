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
* 战仙会5v5
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var xianhui;
        (function (xianhui) {
            var XianHui5V5Mediator = /** @class */ (function (_super) {
                __extends(XianHui5V5Mediator, _super);
                function XianHui5V5Mediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 战况信息 */
                    _this.battleInfos = [];
                    _this._viewUI = new ui.common.ZhanXianHui5V5UI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    xianhui.models.XianHuiProxy._instance.on(xianhui.models.REFRESH_PVP5_EVENT, _this, _this.init);
                    xianhui.models.XianHuiProxy._instance.on(xianhui.models.REFRESH_PVP5BATTLE_EVENT, _this, _this.getBattleInfo);
                    xianhui.models.XianHuiProxy._instance.on(xianhui.models.REFRESH_PVP5RANKING_EVENT, _this, _this.showRanking);
                    _this._viewUI.battles_list.renderHandler = new Handler(_this, _this.battleHandler);
                    _this._viewUI.battles_check.on(LEvent.CLICK, _this, _this.getBattleInfo);
                    _this._viewUI.firstwin_img.on(LEvent.CLICK, _this, _this.getReward, [0]);
                    _this._viewUI.fivefight_img.on(LEvent.CLICK, _this, _this.getReward, [1]);
                    return _this;
                }
                /** 获取时间 */
                XianHui5V5Mediator.prototype.getTime = function (startTime) {
                    var date = new Date();
                    var date2 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 23:00:00";
                    var endTime = new Date(date2).getTime();
                    var time = endTime - startTime;
                    var m = time / 1000 / 60 % 60;
                    var s = time / 1000 % 60;
                    if (time <= 0) {
                        this._viewUI.time_lab.text = "00:00";
                    }
                    else {
                        this.timeM = Math.floor(m);
                        this.timeS = Math.ceil(s);
                        Laya.timer.loop(1000, this, this.showTime);
                    }
                    this.init();
                    RequesterProtocols._instance.c2s_CPvP5MyInfo();
                    RequesterProtocols._instance.c2s_CPvP5RankingList();
                    _super.prototype.show.call(this);
                };
                /** 定时器刷新时间显示 */
                XianHui5V5Mediator.prototype.showTime = function () {
                    var m = this.timeM + "";
                    var s = this.timeS + "";
                    if (this.timeM < 10) {
                        m = "0" + this.timeM;
                    }
                    else if (this.timeM <= 0) {
                        m = "00";
                    }
                    if (this.timeS < 10) {
                        s = "0" + this.timeS;
                    }
                    else if (this.timeS <= 0) {
                        s = "00";
                    }
                    this._viewUI.time_lab.text = m + ":" + s;
                    if (this.timeM <= 0 && this.timeS <= 0) {
                        Laya.timer.clear(this, this.showTime);
                        return;
                    }
                    this.timeS -= 1;
                    if (this.timeS < 0) {
                        this.timeM -= 1;
                        this.timeS = 59;
                    }
                };
                XianHui5V5Mediator.prototype.init = function () {
                    this._viewUI.firstwin_img.skin = "common/ui/tongyong/baoxiang1.png";
                    this._viewUI.fivefight_img.skin = "common/ui/tongyong/baoxiang1.png";
                    this._viewUI.rankingFirst_list.visible = false;
                    this._viewUI.leimao_box.visible = false;
                    this._viewUI.rankingNum1_lab.text = "";
                    this._viewUI.name1_lab.text = "";
                    this._viewUI.jifen1_lab.text = "";
                    this._viewUI.zhanli1_lab.text = "";
                    this._viewUI.rankingTwo_list.visible = false;
                    this._viewUI.shuanglang_box.visible = false;
                    this._viewUI.rankingNum2_lab.text = "";
                    this._viewUI.name2_lab.text = "";
                    this._viewUI.jifen2_lab.text = "";
                    this._viewUI.zhanli2_lab.text = "";
                    if (xianhui.models.XianHuiModel._instance.PvP5MyInfo) {
                        if (xianhui.models.XianHuiModel._instance.PvP5MyInfo.firstwin == 2)
                            this._viewUI.firstwin_img.skin = "common/ui/tongyong/baoxiang0.png";
                        if (xianhui.models.XianHuiModel._instance.PvP5MyInfo.fivefight == 2)
                            this._viewUI.fivefight_img.skin = "common/ui/tongyong/baoxiang0.png";
                        this.showRanking();
                    }
                    this.getBattleInfo();
                };
                /** 显示排行榜 */
                XianHui5V5Mediator.prototype.showRanking = function () {
                    console.log("----5v5---Scores----", xianhui.models.XianHuiModel._instance.roleScores1);
                    console.log("----5v5---Scores----", xianhui.models.XianHuiModel._instance.roleScores2);
                    console.log("----5v5---Scores----", xianhui.models.XianHuiModel._instance.myScore);
                    this.setRank1();
                    this.setRank2();
                };
                /** 雷毛排行榜信息 */
                XianHui5V5Mediator.prototype.setRank1 = function () {
                    //自己的名次
                    var myScore = xianhui.models.XianHuiModel._instance.myScore;
                    if (!myScore || !xianhui.models.XianHuiModel._instance.PvP5MyInfo)
                        return;
                    this._viewUI.rankingFirst_list.height = 189;
                    if (xianhui.models.XianHuiModel._instance.PvP5MyInfo.camp == 0) {
                        this._viewUI.rankingFirst_list.height = 141;
                        this._viewUI.leimao_box.visible = true;
                        this._viewUI.rankingNum1_lab.text = myScore.index <= 0 ? "未上榜" : myScore.index + "";
                        this._viewUI.name1_lab.text = game.modules.createrole.models.LoginModel.getInstance().roleDetail.rolename + "";
                        this._viewUI.jifen1_lab.text = myScore.score + "";
                        this._viewUI.zhanli1_lab.text = myScore.winnum + "/" + myScore.battlenum;
                    }
                    //排行数据
                    var roleScores = xianhui.models.XianHuiModel._instance.roleScores1;
                    if (!roleScores || roleScores.length <= 0)
                        return;
                    this._viewUI.rankingFirst_list.visible = true;
                    var data = [];
                    for (var i = 0; i < roleScores.length; i++) {
                        var tubiaoVisi = false;
                        var tubiaoSkin = "common/ui/paihangbang/diyiditu.png";
                        var rankingNumVisi = true;
                        var rankingNum = i + 1 + "";
                        var ditu1Visi = false;
                        var ditu2Visi = false;
                        if (i < 3) {
                            tubiaoVisi = true;
                            rankingNumVisi = false;
                            if (i == 1)
                                tubiaoSkin = "common/ui/paihangbang/dierditu.png";
                            if (i == 2)
                                tubiaoSkin = "common/ui/paihangbang/disanditu.png";
                        }
                        if (i == 0 || i % 2 == 0) {
                            ditu1Visi = true;
                        }
                        else {
                            ditu2Visi = true;
                        }
                        data.push({
                            tubiao_img: { visible: tubiaoVisi, skin: tubiaoSkin },
                            rankingNum_lab: { visible: rankingNumVisi, text: rankingNum },
                            name_lab: { text: roleScores[i].rolename },
                            jifen_lab: { text: roleScores[i].score },
                            shenglv_lab: { text: roleScores[i].winnum + "/" + roleScores[i].battlenum },
                            ditu1_img: { visible: ditu1Visi },
                            ditu2_img: { visible: ditu2Visi }
                        });
                    }
                    this._viewUI.rankingFirst_list.array = data;
                    this._viewUI.rankingFirst_list.repeatX = 1;
                };
                /** 双狼排行榜信息 */
                XianHui5V5Mediator.prototype.setRank2 = function () {
                    //自己的名次
                    var myScore = xianhui.models.XianHuiModel._instance.myScore;
                    if (!myScore || !xianhui.models.XianHuiModel._instance.PvP5MyInfo)
                        return;
                    this._viewUI.rankingTwo_list.height = 189;
                    if (xianhui.models.XianHuiModel._instance.PvP5MyInfo.camp == 1) {
                        this._viewUI.rankingTwo_list.height = 141;
                        this._viewUI.shuanglang_box.visible = true;
                        this._viewUI.rankingNum2_lab.text = myScore.index <= 0 ? "未上榜" : myScore.index + "";
                        this._viewUI.name2_lab.text = game.modules.createrole.models.LoginModel.getInstance().roleDetail.rolename + "";
                        this._viewUI.jifen2_lab.text = myScore.score + "";
                        this._viewUI.zhanli2_lab.text = myScore.winnum + "/" + myScore.battlenum;
                    }
                    //排行数据
                    var roleScores = xianhui.models.XianHuiModel._instance.roleScores2;
                    if (!roleScores || roleScores.length <= 0)
                        return;
                    this._viewUI.rankingTwo_list.visible = true;
                    var data = [];
                    for (var i = 0; i < roleScores.length; i++) {
                        var tubiaoVisi = false;
                        var tubiaoSkin = "common/ui/paihangbang/diyiditu.png";
                        var rankingNumVisi = true;
                        var rankingNum = i + 1 + "";
                        var ditu1Visi = false;
                        var ditu2Visi = false;
                        if (i < 3) {
                            tubiaoVisi = true;
                            rankingNumVisi = false;
                            if (i == 1)
                                tubiaoSkin = "common/ui/paihangbang/dierditu.png";
                            if (i == 2)
                                tubiaoSkin = "common/ui/paihangbang/disanditu.png";
                        }
                        if (i == 0 || i % 2 == 0) {
                            ditu1Visi = true;
                        }
                        else {
                            ditu2Visi = true;
                        }
                        data.push({
                            tubiao_img: { visible: tubiaoVisi, skin: tubiaoSkin },
                            rankingNum_lab: { visible: rankingNumVisi, text: rankingNum },
                            name_lab: { text: roleScores[i].rolename },
                            jifen_lab: { text: roleScores[i].score },
                            shenglv_lab: { text: roleScores[i].winnum + "/" + roleScores[i].battlenum },
                            ditu1_img: { visible: ditu1Visi },
                            ditu2_img: { visible: ditu2Visi }
                        });
                    }
                    this._viewUI.rankingTwo_list.array = data;
                    this._viewUI.rankingTwo_list.repeatX = 1;
                };
                /** 获取战况信息 */
                XianHui5V5Mediator.prototype.getBattleInfo = function () {
                    this._viewUI.battles_list.visible = false;
                    var arr = [];
                    if (this._viewUI.battles_check.selected) { //只显示自己的战况
                        arr = xianhui.models.XianHuiModel.getInstance().PvP5BattleInfos.get(1);
                    }
                    else {
                        arr = xianhui.models.XianHuiModel.getInstance().PvP5BattleInfos.get(0);
                    }
                    this.battleInfos = [];
                    if (arr && arr.length > 0) {
                        //反转数据的顺序
                        for (var i = arr.length - 1; i >= 0; i--) {
                            this.battleInfos.push(arr[i]);
                        }
                        this._viewUI.battles_list.visible = true;
                        this._viewUI.battles_list.array = this.battleInfos;
                        this._viewUI.battles_list.vScrollBarSkin = "";
                    }
                };
                /** 战况渲染 */
                XianHui5V5Mediator.prototype.battleHandler = function (cell, index) {
                    var battleHtml = cell.getChildByName("battleinfo_html");
                    if (this.battleInfos.length > 0 && this.battleInfos[index]) {
                        battleHtml.innerHTML = HudModel._instance.promptAssembleBack(this.battleInfos[index].msgId, this.battleInfos[index].parameters);
                    }
                };
                /** 获取奖励 */
                XianHui5V5Mediator.prototype.getReward = function (index) {
                    if (!xianhui.models.XianHuiModel.getInstance().PvP5MyInfo)
                        return;
                    switch (index) {
                        case 0: //首胜奖励
                            if (xianhui.models.XianHuiModel.getInstance().PvP5MyInfo.firstwin != 1)
                                return;
                            RequesterProtocols._instance.c2s_CPvP5OpenBox(1);
                            this._viewUI.firstwin_img.skin = "common/ui/tongyong/baoxiang0.png";
                            break;
                        case 1: //五战奖励
                            if (xianhui.models.XianHuiModel.getInstance().PvP5MyInfo.fivefight != 1)
                                return;
                            RequesterProtocols._instance.c2s_CPvP5OpenBox(2);
                            this._viewUI.fivefight_img.skin = "common/ui/tongyong/baoxiang0.png";
                            break;
                    }
                };
                XianHui5V5Mediator.prototype.show = function () {
                    RequesterProtocols._instance.c2s_CGameTime();
                    modules.mainhud.models.HudProxy.getInstance().once(modules.mainhud.models.SERVER_TIME, this, this.getTime);
                    // RequesterProtocols._instance.c2s_CPvP5ReadyFight(1);
                };
                XianHui5V5Mediator.prototype.hide = function () {
                    Laya.timer.clear(this, this.showTime);
                    _super.prototype.hide.call(this);
                    game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                XianHui5V5Mediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return XianHui5V5Mediator;
            }(game.modules.UiMediator));
            xianhui.XianHui5V5Mediator = XianHui5V5Mediator;
        })(xianhui = modules.xianhui || (modules.xianhui = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=XianHui5V5Mediator.js.map