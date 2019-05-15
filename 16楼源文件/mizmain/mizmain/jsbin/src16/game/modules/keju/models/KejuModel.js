/** 科举类型 */
var ImpExamType;
(function (ImpExamType) {
    /** 全村统考 */
    ImpExamType[ImpExamType["IMPEXAM_VILL"] = 1] = "IMPEXAM_VILL";
    /** 全省统考 */
    ImpExamType[ImpExamType["IMPEXAM_PROV"] = 2] = "IMPEXAM_PROV";
    /** 全国统考 */
    ImpExamType[ImpExamType["IMPEXAM_STATE"] = 3] = "IMPEXAM_STATE";
    /** 服务器全村统考 */
    ImpExamType[ImpExamType["IMPEXAM_VILL_INSERVER"] = 214] = "IMPEXAM_VILL_INSERVER";
    /** 服务器全省统考 */
    ImpExamType[ImpExamType["IMPEXAM_PROV_INSERVER"] = 215] = "IMPEXAM_PROV_INSERVER";
    /** 服务器全国统考 */
    ImpExamType[ImpExamType["IMPEXAM_STATE_INSERVER"] = 216] = "IMPEXAM_STATE_INSERVER";
})(ImpExamType || (ImpExamType = {}));
;
var ImpExamAssistType;
(function (ImpExamAssistType) {
    /** 不使用协助 */
    ImpExamAssistType[ImpExamAssistType["NOASSIST"] = 0] = "NOASSIST";
    /** 删除一个错误答案 */
    ImpExamAssistType[ImpExamAssistType["DELWRONG"] = 1] = "DELWRONG";
    /** 直接选择正确答案 */
    ImpExamAssistType[ImpExamAssistType["CHORIGHT"] = 2] = "CHORIGHT";
})(ImpExamAssistType || (ImpExamAssistType = {}));
;
/** 科举介绍配置表 */
var kejuIntroduce;
(function (kejuIntroduce) {
    /** 乡试说明 */
    kejuIntroduce[kejuIntroduce["XIANGSHI_INT"] = 11405] = "XIANGSHI_INT";
    /** 会试说明 */
    kejuIntroduce[kejuIntroduce["HUISHI_INT"] = 11436] = "HUISHI_INT";
    /** 殿试说明 */
    kejuIntroduce[kejuIntroduce["DIANSHI_INT"] = 11437] = "DIANSHI_INT";
})(kejuIntroduce || (kejuIntroduce = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var keju;
        (function (keju) {
            var models;
            (function (models) {
                var KejuModel = /** @class */ (function () {
                    function KejuModel() {
                        /** 科举类型 */
                        this.impexamtype = -1;
                        /** 协助类型 */
                        this.assisttype = -1;
                        /** x乡试配置表数据 */
                        this.wisdomtrialVillData = {};
                        /** h会试配置表数据 */
                        this.wisdomtrialProvData = {};
                        /** d殿试配置表数据 */
                        this.wisdomtrialStateData = {};
                        /** 求助次数 */
                        this.helpcnt = 0;
                        /** 当前界面是否打开 */
                        this.isOpen = false;
                        KejuModel._instance = this;
                        this.ExamVill = new Laya.Dictionary();
                        this.ExamProv = new Laya.Dictionary();
                        this.ExamState = new Laya.Dictionary();
                    }
                    KejuModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new KejuModel();
                        }
                        return this._instance;
                    };
                    KejuModel.clearModelData = function () {
                        keju.models.KejuModel._instance.impexamtype = -1;
                        keju.models.KejuModel._instance.ExamVill = new Laya.Dictionary();
                        keju.models.KejuModel._instance.ExamProv = new Laya.Dictionary();
                        keju.models.KejuModel._instance.ExamState = new Laya.Dictionary();
                        keju.models.KejuModel._instance.helpcnt = 0;
                        keju.models.KejuModel._instance.isOpen = false;
                    };
                    /** 当前考试模式下的配置表数据
                     * @param examType 考试类型
                     */
                    KejuModel.prototype.getExamConfigData = function (examType) {
                        var configData;
                        if (examType == ImpExamType.IMPEXAM_VILL || examType == ImpExamType.IMPEXAM_VILL_INSERVER) //
                         {
                            return this.wisdomtrialVillData;
                        }
                        else if (examType == ImpExamType.IMPEXAM_PROV || examType == ImpExamType.IMPEXAM_PROV_INSERVER) {
                            return this.wisdomtrialProvData;
                        }
                        else if (examType == ImpExamType.IMPEXAM_STATE || examType == ImpExamType.IMPEXAM_STATE_INSERVER) {
                            return this.wisdomtrialStateData;
                        }
                        else
                            return null;
                    };
                    /** ABCD选项添加
                     * @param index 下标位
                    */
                    KejuModel.prototype.getchooseIndex = function (index) {
                        switch (index) {
                            case 0:
                                return "A";
                            case 1:
                                return "B";
                            case 2:
                                return "C";
                            case 3:
                                return "D";
                            default:
                                return null;
                        }
                    };
                    return KejuModel;
                }());
                models.KejuModel = KejuModel;
            })(models = keju.models || (keju.models = {}));
        })(keju = modules.keju || (modules.keju = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=KejuModel.js.map