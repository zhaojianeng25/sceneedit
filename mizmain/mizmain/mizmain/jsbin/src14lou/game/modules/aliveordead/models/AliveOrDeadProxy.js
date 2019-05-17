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
        var aliveordead;
        (function (aliveordead) {
            var models;
            (function (models) {
                /** 准备下战书成功 */
                models.InvitationLiveDieSuccess = "invitationLiveDieSuccess";
                /** 被下战书 */
                models.InvitationLiveDieOK = "invitationLiveDieOK";
                /** 生死战应战 */
                models.AcceptBattleFirst = "acceptBattleFirst";
                /** 获得生死战观战界面的列表数据 */
                models.GetWatchData = "getWatchData";
                /** 获得生死战排行榜界面的列表数据 */
                models.GetLDRankLstData = "getLDRankLstData";
                /** 某场生死战点赞成功 */
                models.RoseSuccess = "roseSuccess";
                /** 战仙会（生死战）协议处理 proxy */
                var AliveOrDeadProxy = /** @class */ (function (_super) {
                    __extends(AliveOrDeadProxy, _super);
                    function AliveOrDeadProxy() {
                        var _this = _super.call(this) || this;
                        AliveOrDeadProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    AliveOrDeadProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new AliveOrDeadProxy();
                        }
                        return this._instance;
                    };
                    AliveOrDeadProxy.prototype.init = function () {
                        models.AliveOrDeadModel.getInstance();
                        this.addNetworkListener();
                    };
                    /** 添加监听 */
                    AliveOrDeadProxy.prototype.addNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.SInvitationLiveDieBattle, this, this.onSInvitationLiveDieBattle);
                        Network._instance.addHanlder(ProtocolsEnum.SInvitationLiveDieBattleOK, this, this.onSInvitationLiveDieBattleOK);
                        Network._instance.addHanlder(ProtocolsEnum.SAcceptInvitationLiveDieBattle, this, this.onSAcceptInvitationLiveDieBattle);
                        Network._instance.addHanlder(ProtocolsEnum.SAcceptLiveDieBattleFirst, this, this.onSAcceptLiveDieBattleFirst);
                        Network._instance.addHanlder(ProtocolsEnum.SLiveDieBattleWatchView, this, this.onSLiveDieBattleWatchView);
                        Network._instance.addHanlder(ProtocolsEnum.SLiveDieBattleRankView, this, this.onSLiveDieBattleRankView);
                        Network._instance.addHanlder(ProtocolsEnum.SLiveDieBattleGiveRose, this, this.onSLiveDieBattleGiveRose);
                    };
                    /** 点赞成功返回 */
                    AliveOrDeadProxy.prototype.onSLiveDieBattleGiveRose = function (optcode, msg) {
                        this.event(models.RoseSuccess, [msg.vedioid, msg.rosenum, msg.roseflag]);
                    };
                    /** 返回生死战排行榜界面数据 */
                    AliveOrDeadProxy.prototype.onSLiveDieBattleRankView = function (optcode, msg) {
                        models.AliveOrDeadModel.getInstance()._rolefightlist = [];
                        models.AliveOrDeadModel.getInstance()._rolefightlist = msg.rolefightlist;
                        this.event(models.GetLDRankLstData, [msg.rolefightlist]);
                    };
                    /** 返回生死斗观战界面数据 */
                    AliveOrDeadProxy.prototype.onSLiveDieBattleWatchView = function (optcode, msg) {
                        this.event(models.GetWatchData, [msg.rolewatchlist]);
                    };
                    /** 生死战应战 */
                    AliveOrDeadProxy.prototype.onSAcceptLiveDieBattleFirst = function (optcode, msg) {
                        var _app = HudModel.getInstance().useapp;
                        var _npckey = HudModel.getInstance().npckey;
                        var _npcDialog = new modules.commonUI.NpcDialogMediator(_app);
                        var _contain = "";
                        if (msg.hostroleid == 0 && msg.hostroleid == "") { //没人发起决斗邀请
                            _contain = ChatModel.getInstance().chatMessageTips[162129]["msg"];
                            _npcDialog.init(_npckey, [], [], _contain);
                        }
                        else { //有人发起决斗邀请
                            _contain = ChatModel.getInstance().chatMessageTips[162128]["msg"];
                            _contain = _contain.replace("$parameter1$", msg.hostrolename);
                            _npcDialog.init(_npckey, [910105, 910108], [], _contain);
                        }
                        //this.event(models.AcceptBattleFirst, [msg.hostroleid, msg.hostrolename]);
                    };
                    /** 收到确定是否接受战书消息返回 */
                    AliveOrDeadProxy.prototype.onSAcceptInvitationLiveDieBattle = function (optcode, msg) {
                    };
                    /** 收到下战书结果消息返回 */
                    AliveOrDeadProxy.prototype.onSInvitationLiveDieBattleOK = function (optcode, msg) {
                        var _invitationLiveDieOKVo = new models.InvitationLiveDieOKVo();
                        _invitationLiveDieOKVo.sourceid = msg.sourceid;
                        _invitationLiveDieOKVo.sourcename = msg.sourcename;
                        _invitationLiveDieOKVo.selecttype = msg.selecttype;
                        this.event(models.InvitationLiveDieOK, _invitationLiveDieOKVo);
                    };
                    /** 收到下战书消息返回 */
                    AliveOrDeadProxy.prototype.onSInvitationLiveDieBattle = function (optcode, msg) {
                        var _invitationSuccessVo = new models.InvitationSuccessVo();
                        _invitationSuccessVo.objectid = msg.objectid;
                        _invitationSuccessVo.objectname = msg.objectname;
                        _invitationSuccessVo.selecttype = msg.selecttype;
                        _invitationSuccessVo.costmoney = msg.costmoney;
                        this.event(models.InvitationLiveDieSuccess, _invitationSuccessVo);
                    };
                    /** 移除监听 */
                    AliveOrDeadProxy.prototype.removeNetworkListener = function () {
                        Network._instance.removeHanlder(ProtocolsEnum.SInvitationLiveDieBattle, this, this.onSInvitationLiveDieBattle);
                        Network._instance.removeHanlder(ProtocolsEnum.SInvitationLiveDieBattleOK, this, this.onSInvitationLiveDieBattleOK);
                        Network._instance.removeHanlder(ProtocolsEnum.SAcceptInvitationLiveDieBattle, this, this.onSAcceptInvitationLiveDieBattle);
                    };
                    return AliveOrDeadProxy;
                }(hanlder.ProxyBase));
                models.AliveOrDeadProxy = AliveOrDeadProxy;
            })(models = aliveordead.models || (aliveordead.models = {}));
        })(aliveordead = modules.aliveordead || (modules.aliveordead = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=AliveOrDeadProxy.js.map