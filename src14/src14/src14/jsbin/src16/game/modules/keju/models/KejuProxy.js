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
* name
*/
/** 操作答题确认 */
var OpAnswer;
(function (OpAnswer) {
    /** 愿意参加 */
    OpAnswer[OpAnswer["WillingAttend"] = 0] = "WillingAttend";
    /** 放弃参加 */
    OpAnswer[OpAnswer["GiveUp"] = 1] = "GiveUp";
})(OpAnswer || (OpAnswer = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var keju;
        (function (keju) {
            var models;
            (function (models) {
                /** 进入游戏的时候发起的确认答题框 */
                models.CONFIRM_IMP_EXAM = "confirm_impexam";
                /** 开始考试 */
                models.START_IMP_EXAM = "start_impexam";
                /** 结束考试 */
                models.OVER_IMP_EXAM = "over_impexam";
                /** 使用道具删除错误题目 */
                models.PROP_DELETE_TOPIC = "prop_delete_topic";
                var KejuProxy = /** @class */ (function (_super) {
                    __extends(KejuProxy, _super);
                    function KejuProxy() {
                        var _this = _super.call(this) || this;
                        KejuProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    KejuProxy.prototype.init = function () {
                        this.addNetworkListener();
                        Laya.loader.load("common/data/temp/game.wisdomtrialprov.bin", Handler.create(this, this.onloadedWisdomtrialProvComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/game.wisdomtrialstate.bin", Handler.create(this, this.onloadedWisdomtrialStateComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/game.wisdomtrialvill.bin", Handler.create(this, this.onloadedWisdomtrialVillComplete), null, Loader.BUFFER);
                    };
                    KejuProxy.prototype.addNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.SAttendImpExam, this, this.onSAttendImpExam);
                        Network._instance.addHanlder(ProtocolsEnum.SSendImpExamVill, this, this.onSSendImpExamVill);
                        Network._instance.addHanlder(ProtocolsEnum.SSendImpExamProv, this, this.onSSendImpExamProv);
                        Network._instance.addHanlder(ProtocolsEnum.SImpExamHelp, this, this.onSImpExamHelp);
                        Network._instance.addHanlder(ProtocolsEnum.SSendImpExamState, this, this.onSSendImpExamState);
                        Network._instance.addHanlder(ProtocolsEnum.SSendImpExamStart, this, this.onSSendImpExamStart);
                        Network._instance.addHanlder(ProtocolsEnum.SSendImpExamAssist, this, this.onSSendImpExamAssist);
                    };
                    /** 殿试考试确认 */
                    KejuProxy.prototype.onSSendImpExamStart = function (optcode, msg) {
                        models.KejuModel.getInstance().impexamtype = msg.impexamtype;
                        this.event(models.CONFIRM_IMP_EXAM, models.KejuModel.getInstance().impexamtype);
                    };
                    /** 删除科举错误题目 */
                    KejuProxy.prototype.onSSendImpExamAssist = function (optcode, msg) {
                        models.KejuModel.getInstance().assisttype = msg.assisttype; //协助类型
                        this.event(models.PROP_DELETE_TOPIC);
                    };
                    /** 寻求帮助 */
                    KejuProxy.prototype.onSImpExamHelp = function (optcode, msg) {
                        models.KejuModel.getInstance().helpcnt = msg.helpcnt;
                    };
                    /** 乡试题目 */
                    KejuProxy.prototype.onSSendImpExamVill = function (optcode, msg) {
                        if (msg.isover == 0) { /** 没结束 */
                            models.KejuModel.getInstance().ExamVill.set(msg.impexamdata.questionnum, msg);
                            this.event(models.START_IMP_EXAM);
                        }
                        else
                            this.event(models.OVER_IMP_EXAM, msg.impexamdata.lastright);
                    };
                    /** 会试题目 */
                    KejuProxy.prototype.onSSendImpExamProv = function (optcode, msg) {
                        if (msg.lost == 0) {
                            models.KejuModel.getInstance().ExamProv.set(msg.impexamdata.questionnum, msg);
                            if (models.KejuModel.getInstance().assisttype != -1)
                                models.KejuModel.getInstance().assisttype = -1;
                            this.event(models.START_IMP_EXAM);
                        }
                        else
                            this.event(models.OVER_IMP_EXAM, msg.impexamdata.lastright);
                    };
                    KejuProxy.prototype.onSSendImpExamState = function (optcode, msg) {
                        if (msg.lost == 0) {
                            models.KejuModel.getInstance().ExamState.set(msg.impexamdata.questionnum, msg);
                            this.event(models.START_IMP_EXAM);
                        }
                        else
                            this.event(models.OVER_IMP_EXAM, msg.impexamdata.lastright);
                    };
                    /** 监听科举是否开启 */
                    KejuProxy.prototype.onSAttendImpExam = function (optcode, msg) {
                        models.KejuModel.getInstance().impexamtype = msg.impexamtype;
                        game.modules.activity.models.ActivityProxy._instance.event(game.modules.activity.models.TUISONG_EVENT);
                        // /** 事件监听 */
                        // this.event(CONFIRM_IMP_EXAM,KejuModel.getInstance().impexamtype);
                    };
                    /** 会试表 */
                    KejuProxy.prototype.onloadedWisdomtrialProvComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialprov.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.KejuModel.getInstance().wisdomtrialProvData, WisdomTrialVillBaseVo, "id");
                    };
                    /** 殿试表 */
                    KejuProxy.prototype.onloadedWisdomtrialStateComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialstate.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.KejuModel.getInstance().wisdomtrialStateData, WisdomTrialVillBaseVo, "id");
                    };
                    /** 乡试表 */
                    KejuProxy.prototype.onloadedWisdomtrialVillComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialvill.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.KejuModel.getInstance().wisdomtrialVillData, WisdomTrialVillBaseVo, "id");
                    };
                    KejuProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new KejuProxy();
                        }
                        return this._instance;
                    };
                    return KejuProxy;
                }(hanlder.ProxyBase));
                models.KejuProxy = KejuProxy;
            })(models = keju.models || (keju.models = {}));
        })(keju = modules.keju || (modules.keju = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=KejuProxy.js.map