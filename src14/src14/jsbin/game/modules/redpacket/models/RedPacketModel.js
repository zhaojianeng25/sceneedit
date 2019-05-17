/**
* name
*/
/** 红包类型 */
var RedPackType;
(function (RedPackType) {
    /** 世界红包 */
    RedPackType[RedPackType["TYPE_WORLD"] = 1] = "TYPE_WORLD";
    /** 帮派红包 */
    RedPackType[RedPackType["TYPE_CLAN"] = 2] = "TYPE_CLAN";
    /** 队伍红包 */
    RedPackType[RedPackType["TYPE_TEAM"] = 3] = "TYPE_TEAM";
})(RedPackType || (RedPackType = {}));
;
/** 红包状态 */
var RedPackState;
(function (RedPackState) {
    /** 可以抢红包 */
    RedPackState[RedPackState["STATE_CANGET"] = 0] = "STATE_CANGET";
    /** 已经领取红包 */
    RedPackState[RedPackState["STATE_HAVE"] = 1] = "STATE_HAVE";
    /** 红包已经抢光 */
    RedPackState[RedPackState["STATE_NONE"] = 2] = "STATE_NONE";
})(RedPackState || (RedPackState = {}));
;
/** 玩家的红包记录状态 */
var RedPackRecordState;
(function (RedPackRecordState) {
    /** 发出的红包 */
    RedPackRecordState[RedPackRecordState["SEND_RED_PACK"] = 1] = "SEND_RED_PACK";
    /** 收到的红包 */
    RedPackRecordState[RedPackRecordState["RECEIVED_RED_PACK"] = 0] = "RECEIVED_RED_PACK";
})(RedPackRecordState || (RedPackRecordState = {}));
;
/** 抢红包是否成功 */
var SuccessFlag;
(function (SuccessFlag) {
    /** 失败 */
    SuccessFlag[SuccessFlag["FAILE"] = 0] = "FAILE";
    /** 成功 */
    SuccessFlag[SuccessFlag["SUCCESS"] = 1] = "SUCCESS";
})(SuccessFlag || (SuccessFlag = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var redPacket;
        (function (redPacket) {
            var models;
            (function (models) {
                var RedPacketModel = /** @class */ (function () {
                    function RedPacketModel() {
                        this.redPackDic = {};
                        /** 红包历史里记录下的红包记录信息数据，用于红包历史里的列表 */
                        this.redpack_record = [];
                        /** 红包的信息数据，用于红包界面的列表 */
                        this.redpack_infoList = [];
                        /** 红包被领取的记录信息数据，用于红包领取记录的列表 */
                        this.redpack_roleHisInfoList = [];
                        /** 红包被领取的历史信息数据 */
                        this.redPack_HisView_info = new Dictionary();
                        this.redPack_get_info = [];
                        /** 红包历史界面信息数据 */
                        this.redPack_roleRecordViewVo = [];
                        /** 推送红包消息的信息 */
                        this.redPack_roletip_info = [];
                        /** 上线推送红包消息的列表信息 */
                        this.redPack_roletip_listInfo = [];
                        /** 存放过期的红包数据 */
                        this.expiredRedPackData = [];
                        RedPacketModel._instance = this;
                    }
                    RedPacketModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new RedPacketModel();
                        }
                        return this._instance;
                    };
                    RedPacketModel.clearModelData = function () {
                        redPacket.models.RedPacketModel._instance.redpack_record = [];
                        redPacket.models.RedPacketModel._instance.redpack_infoList = [];
                        redPacket.models.RedPacketModel._instance.redpack_roleHisInfoList = [];
                        redPacket.models.RedPacketModel._instance.redpack_SR_num = new models.SRRedPackNumVo();
                        redPacket.models.RedPacketModel._instance.redPack_HisView_info = new Laya.Dictionary();
                        redPacket.models.RedPacketModel._instance.redPack_get_info = [];
                        redPacket.models.RedPacketModel._instance.redPack_roleRecordViewVo = [];
                        redPacket.models.RedPacketModel._instance.redPack_roletip_info = [];
                        redPacket.models.RedPacketModel._instance.redPack_roletip_listInfo = [];
                        redPacket.models.RedPacketModel._instance.expiredRedPackData = [];
                    };
                    /** 给其他地方提供抢红包的接口 */
                    RedPacketModel.prototype.qiangRedPack = function (redpacktype, redpackid) {
                        RequesterProtocols._instance.c2s_CGetRedPack(redpacktype, redpackid);
                    };
                    return RedPacketModel;
                }());
                models.RedPacketModel = RedPacketModel;
            })(models = redPacket.models || (redPacket.models = {}));
        })(redPacket = modules.redPacket || (modules.redPacket = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RedPacketModel.js.map