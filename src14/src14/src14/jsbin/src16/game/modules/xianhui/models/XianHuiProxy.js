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
* XianHuiProxy
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var xianhui;
        (function (xianhui) {
            var models;
            (function (models) {
                /** 刷新3v3证道战信息 */
                models.REFRESH_PVP3_EVENT = "refreshPVP3Event";
                /** 刷新3v3证道战战况 */
                models.REFRESH_PVP3BATTLE_EVENT = "refreshPVP3BattleEvent";
                /** 刷新3v3证道战排行 */
                models.REFRESH_PVP3RANKING_EVENT = "refreshPVP3RankingEvent";
                /** 刷新3v3匹配准备状态 */
                models.REFRESH_MATCHSTATE_EVENT = "refreshMatchStateEvent";
                /** 刷新5v5证道战信息 */
                models.REFRESH_PVP5_EVENT = "refreshPVP5Event";
                /** 刷新5v5证道战战况 */
                models.REFRESH_PVP5BATTLE_EVENT = "refreshPVP5BattleEvent";
                /** 刷新5v5证道战排行 */
                models.REFRESH_PVP5RANKING_EVENT = "refreshPVP5RankingEvent";
                /** 刷新5v5匹配准备状态 */
                models.REFRESH_MATCHSTATE2_EVENT = "refreshMatchState2Event";
                /** 刷新匹配结果 */
                models.REFRESH_MATCHRESULE_EVENT = "refreshMatchResultEvent";
                var XianHuiProxy = /** @class */ (function (_super) {
                    __extends(XianHuiProxy, _super);
                    function XianHuiProxy() {
                        var _this = _super.call(this) || this;
                        XianHuiProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    XianHuiProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new XianHuiProxy();
                        }
                        return this._instance;
                    };
                    XianHuiProxy.prototype.init = function () {
                        models.XianHuiModel.getInstance();
                        this.addNetworkListener();
                    };
                    /** 添加监听 */
                    XianHuiProxy.prototype.addNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.SPvP3MyInfo, this, this.onPvP3MyInfo);
                        Network._instance.addHanlder(ProtocolsEnum.SPvP3BattleInfo, this, this.onPvP3BattleInfo);
                        Network._instance.addHanlder(ProtocolsEnum.SPvP3RankingList, this, this.onPvP3RankingList);
                        Network._instance.addHanlder(ProtocolsEnum.SPvP3MatchResult, this, this.onPvP3MatchResult);
                        Network._instance.addHanlder(ProtocolsEnum.SPvP3ReadyFight, this, this.onPvP3ReadyFight);
                        Network._instance.addHanlder(ProtocolsEnum.SPvP5MyInfo, this, this.onPvP5MyInfo);
                        Network._instance.addHanlder(ProtocolsEnum.SPvP5BattleInfo, this, this.onPvP5BattleInfo);
                        Network._instance.addHanlder(ProtocolsEnum.SPvP5RankingList, this, this.onPvP5RankingList);
                        Network._instance.addHanlder(ProtocolsEnum.SPvP5MatchResult, this, this.onSPvP5MatchResult);
                        Network._instance.addHanlder(ProtocolsEnum.SPvP5ReadyFight, this, this.onSPvP5ReadyFight);
                    };
                    /** pvp5准备状态 1-准备 */
                    XianHuiProxy.prototype.onSPvP5ReadyFight = function (optcode, msg) {
                        // this.event(REFRESH_MATCHSTATE2_EVENT);
                    };
                    /** pvp5匹配结果 */
                    XianHuiProxy.prototype.onSPvP5MatchResult = function (optcode, msg) {
                        this.event(models.REFRESH_MATCHRESULE_EVENT, [msg.targets]);
                    };
                    /** pvp5排行 */
                    XianHuiProxy.prototype.onPvP5RankingList = function (optcode, msg) {
                        models.XianHuiModel.getInstance().roleScores1 = msg.roleScores1;
                        models.XianHuiModel.getInstance().roleScores2 = msg.roleScores2;
                        models.XianHuiModel.getInstance().myScore = msg.myScore;
                        this.event(models.REFRESH_PVP5RANKING_EVENT);
                    };
                    /** pvp5战况 */
                    XianHuiProxy.prototype.onPvP5BattleInfo = function (optcode, msg) {
                        var PvP5BattleInfoVo = new models.PvP5BattleInfoVo();
                        PvP5BattleInfoVo.ismine = msg.ismine;
                        PvP5BattleInfoVo.msgId = msg.msgId;
                        PvP5BattleInfoVo.parameters = msg.parameters;
                        //存储全部战况
                        if (!models.XianHuiModel.getInstance().PvP5BattleInfos.get(0)) {
                            models.XianHuiModel.getInstance().PvP5BattleInfos.set(0, [PvP5BattleInfoVo]);
                        }
                        else {
                            models.XianHuiModel.getInstance().PvP5BattleInfos.get(0).push(PvP5BattleInfoVo);
                        }
                        //存储自信相关战况
                        if (msg.ismine == 1) {
                            if (!models.XianHuiModel.getInstance().PvP5BattleInfos.get(1)) {
                                models.XianHuiModel.getInstance().PvP5BattleInfos.set(1, [PvP5BattleInfoVo]);
                            }
                            else {
                                models.XianHuiModel.getInstance().PvP5BattleInfos.get(1).push(PvP5BattleInfoVo);
                            }
                        }
                        this.event(models.REFRESH_PVP5BATTLE_EVENT);
                    };
                    /** pvp5信息 */
                    XianHuiProxy.prototype.onPvP5MyInfo = function (optcode, msg) {
                        var PvP5MyInfo = new models.PvP5MyInfoVo();
                        PvP5MyInfo.firstwin = msg.firstwin;
                        PvP5MyInfo.fivefight = msg.fivefight;
                        PvP5MyInfo.battlenum = msg.battlenum;
                        PvP5MyInfo.winnum = msg.winnum;
                        PvP5MyInfo.combowinnum = msg.combowinnum;
                        PvP5MyInfo.score = msg.score;
                        PvP5MyInfo.camp = msg.camp;
                        PvP5MyInfo.waitstarttime = msg.waitstarttime;
                        models.XianHuiModel.getInstance().PvP5MyInfo = PvP5MyInfo;
                        this.event(models.REFRESH_PVP5_EVENT);
                    };
                    /** pvp3准备状态 1-准备 */
                    XianHuiProxy.prototype.onPvP3ReadyFight = function (optcode, msg) {
                        this.event(models.REFRESH_MATCHSTATE_EVENT, [msg.ready]);
                    };
                    /** pvp3匹配结果 */
                    XianHuiProxy.prototype.onPvP3MatchResult = function (optcode, msg) {
                        this.event(models.REFRESH_MATCHRESULE_EVENT, [msg.targets]);
                    };
                    /** pvp3排行 */
                    XianHuiProxy.prototype.onPvP3RankingList = function (optcode, msg) {
                        models.XianHuiModel.getInstance().history = msg.history;
                        models.XianHuiModel.getInstance().PvP3Ranking.set(msg.history, [msg.roleScores, msg.myScore]);
                        this.event(models.REFRESH_PVP3RANKING_EVENT);
                    };
                    /** pvp3战况 */
                    XianHuiProxy.prototype.onPvP3BattleInfo = function (optcode, msg) {
                        var PvP3BattleInfoVo = new models.PvP3BattleInfoVo();
                        PvP3BattleInfoVo.ismine = msg.ismine;
                        PvP3BattleInfoVo.msgId = msg.msgId;
                        PvP3BattleInfoVo.parameters = msg.parameters;
                        //存储全部战况
                        if (!models.XianHuiModel.getInstance().PvP3BattleInfos.get(0)) {
                            models.XianHuiModel.getInstance().PvP3BattleInfos.set(0, [PvP3BattleInfoVo]);
                        }
                        else {
                            models.XianHuiModel.getInstance().PvP3BattleInfos.get(0).push(PvP3BattleInfoVo);
                        }
                        //存储自信相关战况
                        if (msg.ismine == 1) {
                            if (!models.XianHuiModel.getInstance().PvP3BattleInfos.get(1)) {
                                models.XianHuiModel.getInstance().PvP3BattleInfos.set(1, [PvP3BattleInfoVo]);
                            }
                            else {
                                models.XianHuiModel.getInstance().PvP3BattleInfos.get(1).push(PvP3BattleInfoVo);
                            }
                        }
                        this.event(models.REFRESH_PVP3BATTLE_EVENT);
                    };
                    /** pvp3信息 */
                    XianHuiProxy.prototype.onPvP3MyInfo = function (optcode, msg) {
                        var PvP3MyInfo = new models.PvP3MyInfoVo();
                        PvP3MyInfo.firstwin = msg.firstwin;
                        PvP3MyInfo.tenfight = msg.tenfight;
                        PvP3MyInfo.eightwin = msg.eightwin;
                        PvP3MyInfo.battlenum = msg.battlenum;
                        PvP3MyInfo.winnum = msg.winnum;
                        PvP3MyInfo.combowinnum = msg.combowinnum;
                        PvP3MyInfo.score = msg.score;
                        PvP3MyInfo.ready = msg.ready;
                        models.XianHuiModel.getInstance().PvP3MyInfo = PvP3MyInfo;
                        this.event(models.REFRESH_PVP3_EVENT);
                    };
                    return XianHuiProxy;
                }(hanlder.ProxyBase));
                models.XianHuiProxy = XianHuiProxy;
            })(models = xianhui.models || (xianhui.models = {}));
        })(xianhui = modules.xianhui || (modules.xianhui = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=XianHuiProxy.js.map