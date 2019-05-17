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
var _loginModel = game.modules.createrole.models.LoginModel;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var redPacket;
        (function (redPacket) {
            var models;
            (function (models) {
                /** 在红包历史记录里查看红包领取记录事件 */
                models.LOOK_RECORD_EVENT = "loRecordEvent";
                /** 在红包界面查看红包领取记录事件 */
                models.SEE_RECORD_EVENT = "seeRecordEvent";
                /** 查看个人历史红包记录事件 */
                models.ROLE_REDPACK_RECORD_EVENT = "roleRedPackRecordEvent";
                /** 抢红包成功事件 */
                models.GET_REDPACK_SUCCESS = "getRedPackSuccess";
                /** 发送红包成功事件 */
                models.SEND_REDPACK_SUCCESS = "sendRedPackSuccess";
                /** 当前没有红包发送事件 */
                models.NONE_REDPACK = "noneRedPack";
                /** 请求红包界面事件 */
                models.SEND_REDPACK_VIEW = "sendRendPackView";
                /** 推送红包消息事件 */
                models.NOTICE_REPACK_EVENT = "noticeRedPack";
                /** 个人红包历史为空事件 */
                models.NONE_REDPACK_HIS = "noneRedPackHis";
                var RedPacketProxy = /** @class */ (function (_super) {
                    __extends(RedPacketProxy, _super);
                    function RedPacketProxy() {
                        var _this = _super.call(this) || this;
                        RedPacketProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    RedPacketProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new RedPacketProxy();
                        }
                        return this._instance;
                    };
                    RedPacketProxy.prototype.init = function () {
                        models.RedPacketModel.getInstance();
                        this.addNetworkListener();
                        //加载H红包配置表
                        Laya.loader.load("common/data/temp/fushi.credpackconfig.bin", Handler.create(this, this.onloadedRedPackComplete), null, Loader.BUFFER);
                    };
                    RedPacketProxy.prototype.onloadedRedPackComplete = function () {
                        console.log("credpackconfig表格加载完毕------ completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.credpackconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.RedPacketModel.getInstance().redPackDic, game.data.template.RedPackConfigBaseVo, "id");
                        console.log("成功把红包配置表信息放进字典:", models.RedPacketModel.getInstance().redPackDic);
                    };
                    /**
                     * @describe  添加监听
                     */
                    RedPacketProxy.prototype.addNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.SSendRedPack, this, this.onSGetSendRedPackMsg); //监听服务器下发红包发送成功的消息
                        Network._instance.addHanlder(ProtocolsEnum.SSendRedPackView, this, this.onSGetRedPackViewInfo); //监听服务器下发红包界面下发信息
                        Network._instance.addHanlder(ProtocolsEnum.SSendRedPackHisView, this, this.onSGetRedPackHisViewInfo); //监听服务器下发的红包被领取历史记录
                        Network._instance.addHanlder(ProtocolsEnum.SGetRedPack, this, this.onSGetGetRedPackMsg); //监听服务器下发的抢红包成功的消息
                        Network._instance.addHanlder(ProtocolsEnum.SSendRedPackRoleRecordView, this, this.onSGetRedPackRecordInfo); //监听服务器下发的个人红包历史记录
                        Network._instance.addHanlder(ProtocolsEnum.SNoticeRedPack, this, this.onSGetNoticeRedPackInfo); //监听服务器下发的推送红包消息
                        Network._instance.addHanlder(ProtocolsEnum.SNoticeRedPackList, this, this.onSGetNoticeRedPackListInfo); //监听服务器下发的上线推送红包消息
                    };
                    /**
                     * @describe  移除所有的监听
                     */
                    RedPacketProxy.prototype.removeNetworkListener = function () {
                        Network._instance.removeHanlder(ProtocolsEnum.SSendRedPack, this, this.onSGetSendRedPackMsg);
                        Network._instance.removeHanlder(ProtocolsEnum.SSendRedPackView, this, this.onSGetRedPackViewInfo);
                        Network._instance.removeHanlder(ProtocolsEnum.SSendRedPackHisView, this, this.onSGetRedPackHisViewInfo);
                        Network._instance.removeHanlder(ProtocolsEnum.SGetRedPack, this, this.onSGetGetRedPackMsg);
                        Network._instance.removeHanlder(ProtocolsEnum.SSendRedPackRoleRecordView, this, this.onSGetRedPackRecordInfo);
                        Network._instance.removeHanlder(ProtocolsEnum.SNoticeRedPack, this, this.onSGetNoticeRedPackInfo);
                        Network._instance.removeHanlder(ProtocolsEnum.SNoticeRedPackList, this, this.onSGetNoticeRedPackListInfo);
                    };
                    /**
                     * @describe  存放推送红包消息数据
                     */
                    RedPacketProxy.prototype.onSGetNoticeRedPackInfo = function (optcode, msg) {
                        var _infoVo = [];
                        _infoVo = msg.redpackroletip;
                        models.RedPacketModel._instance.redPack_roletip_info = _infoVo;
                        var modeltype = _infoVo["modeltype"];
                        var redpackid = _infoVo["redpackid"];
                        var rolename = _infoVo["rolename"];
                        RedPacketProxy.getInstance().event(models.NOTICE_REPACK_EVENT, [rolename, redpackid, modeltype]);
                    };
                    /**
                     * @describe  存放上线推送红包消息数据
                     */
                    RedPacketProxy.prototype.onSGetNoticeRedPackListInfo = function (optcode, msg) {
                        var infoList = new Array();
                        infoList = msg.redpackroletiplist;
                        if (!infoList || infoList.length == 0) {
                            return;
                        }
                        models.RedPacketModel._instance.redPack_roletip_listInfo = infoList;
                    };
                    /**
                     * @describe  存放抢红包数据
                     */
                    RedPacketProxy.prototype.onSGetGetRedPackMsg = function (optcode, msg) {
                        console.log(".......................抢红包成功返回！.......................");
                        var modeltype = msg.modeltype;
                        var redpackid = msg.redpackid;
                        var state = msg.state;
                        var successflag = msg.successflag;
                        var fushinum = msg.fushinum;
                        var _infoVo = [];
                        _infoVo["modeltype"] = modeltype;
                        _infoVo["redpackid"] = redpackid;
                        _infoVo["state"] = state;
                        _infoVo["successflag"] = successflag;
                        _infoVo["fushinum"] = fushinum;
                        models.RedPacketModel._instance.redPack_get_info = _infoVo;
                        RedPacketProxy.getInstance().event(models.GET_REDPACK_SUCCESS, [successflag, redpackid, state]);
                    };
                    RedPacketProxy.prototype.onSGetSendRedPackMsg = function (optcode, msg) {
                        console.log(".......................请求发送红包成功返回.......................");
                        RedPacketProxy.getInstance().event(models.SEND_REDPACK_SUCCESS);
                    };
                    /**
                     * 存放红包界面信息数据
                     * @param optcode
                     * @param msg
                     */
                    RedPacketProxy.prototype.onSGetRedPackViewInfo = function (optcode, msg) {
                        console.log(".......................请求红包界面返回.......................");
                        var infoList = new Array();
                        infoList = msg.redpackinfolist;
                        if (!infoList || infoList.length == 0) {
                            RedPacketProxy.getInstance().event(models.NONE_REDPACK);
                            return;
                        }
                        models.RedPacketModel._instance.redpack_infoList = [];
                        models.RedPacketModel._instance.redpack_infoList = infoList;
                        models.RedPacketModel._instance.redpack_SR_num = msg.daysrnum;
                        RedPacketProxy.getInstance().event(models.SEND_REDPACK_VIEW);
                    };
                    RedPacketProxy.prototype.onSGetRedPackHisViewInfo = function (optcode, msg) {
                        console.log(".......................请求红包被领取记录返回.......................");
                        var infoList = new Array();
                        infoList = msg.redpackrolehisinfolist;
                        if (!infoList || infoList.length == 0)
                            return;
                        models.RedPacketModel._instance.redpack_roleHisInfoList = [];
                        models.RedPacketModel._instance.redpack_roleHisInfoList = infoList;
                        var modeltype = msg.modeltype;
                        var redpackid = msg.redpackid;
                        var redpackdes = msg.redpackdes;
                        var redpackallnum = msg.redpackallnum;
                        var redpackallmoney = msg.redpackallmoney;
                        var time = msg.time;
                        var _infoVo = [];
                        _infoVo["modeltype"] = modeltype;
                        _infoVo["redpackid"] = redpackid;
                        _infoVo["redpackdes"] = redpackdes;
                        _infoVo["redpackallnum"] = redpackallnum;
                        _infoVo["redpackallmoney"] = redpackallmoney;
                        _infoVo["time"] = time;
                        models.RedPacketModel._instance.redPack_HisView_info.set(redpackid, _infoVo);
                        RedPacketProxy.getInstance().event(models.LOOK_RECORD_EVENT, redpackid);
                        RedPacketProxy.getInstance().event(models.SEE_RECORD_EVENT, redpackid);
                    };
                    RedPacketProxy.prototype.onSGetRedPackRecordInfo = function (optcode, msg) {
                        console.log(".......................请求个人红包历史记录返回.......................");
                        var redpack_rolerecord = new Array();
                        redpack_rolerecord = msg.redpackrolerecord;
                        if (!redpack_rolerecord || redpack_rolerecord.length == 0) {
                            RedPacketProxy.getInstance().event(models.NONE_REDPACK_HIS);
                            return;
                        }
                        models.RedPacketModel._instance.redpack_record = [];
                        models.RedPacketModel._instance.redpack_record = redpack_rolerecord;
                        var _infoVo = [];
                        _infoVo["modeltype"] = msg.modeltype;
                        _infoVo["firstpageflag"] = msg.firstpageflag;
                        _infoVo["redpackallnum"] = msg.redpackallnum;
                        _infoVo["redpackallmoney"] = msg.redpackallmoney;
                        _infoVo["redpackallfushi"] = msg.redpackallfushi;
                        models.RedPacketModel._instance.redPack_roleRecordViewVo = _infoVo;
                        RedPacketProxy.getInstance().event(models.ROLE_REDPACK_RECORD_EVENT, [msg.modeltype, redpack_rolerecord]);
                    };
                    return RedPacketProxy;
                }(hanlder.ProxyBase));
                models.RedPacketProxy = RedPacketProxy;
            })(models = redPacket.models || (redPacket.models = {}));
        })(redPacket = modules.redPacket || (modules.redPacket = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RedPacketProxy.js.map