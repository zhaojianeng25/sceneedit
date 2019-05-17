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
var game;
(function (game) {
    var modules;
    (function (modules) {
        var reward;
        (function (reward) {
            var models;
            (function (models) {
                /**每日签到信息*/
                models.REGDATA_EVENT = "regDataEvent";
                /**月卡信息*/
                models.MONTH_EVENT = "monthEvent";
                /**vip奖励领取状态*/
                models.VIP_EVENT = "vipEvent";
                /**七日签到领取*/
                models.MULDAY_EVENT = "mulDayEvent";
                /**领取手机关联奖励*/
                models.GETBINDTEL_EVENT = "getBindTelEvent";
                models.BINDTELAWARD_EVENT = "bindTelAwardEvent";
                models.BINDTEL_EVENT = "bindTelEvent";
                /**手机验证码*/
                models.FINISHTIME_EVENT = "finishTimePointEvent";
                /**首充领取状态*/
                models.STATE_EVENT = "stateEvent";
                /**新手奖励事件*/
                models.TIMEAWARD_EVENT = "timeArardEvent";
                /**新手礼包红点*/
                models.NEWPLAYERPOINT_EVENT = "newplayerPoint";
                /**新手礼包领取 */
                models.NEWPLAYERGET_EVENT = "newplayerGet";
                /**每日签到领取 */
                models.EVERYDAY_EVENT = "everyDay";
                /**七日签到领取*/
                models.SEVENDAY_EVENT = "sevenDay";
                /**奖励系统红点 */
                models.REWARDPOINT_EVENT = "rewardPoint";
                /**升级礼包领取 */
                models.LEVELUP_EVENT = "levelup";
                models.REFRESH = "refresh";
                var RewardProxy = /** @class */ (function (_super) {
                    __extends(RewardProxy, _super);
                    function RewardProxy() {
                        var _this = _super.call(this) || this;
                        RewardProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    RewardProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new RewardProxy();
                        }
                        return this._instance;
                    };
                    RewardProxy.prototype.init = function () {
                        models.RewardModel.getInstance();
                        this.addNetworkListener();
                        //每日签到
                        Laya.loader.load("common/data/temp/game.cqiandaojiangli.bin", Handler.create(this, this.onloadedQianDaoJiangLiComplete), null, Loader.BUFFER);
                        //首充礼包
                        Laya.loader.load("common/data/temp/game.cshouchonglibao.bin", Handler.create(this, this.onloadedShouChongLiBaoComplete), null, Loader.BUFFER);
                        //月卡奖励
                        Laya.loader.load("common/data/temp/fushi.cmonthcardconfig.bin", Handler.create(this, this.onloadedMonthCardConfigComplete), null, Loader.BUFFER);
                        //七日签到
                        Laya.loader.load("common/data/temp/game.cloginaward.bin", Handler.create(this, this.onloadedLoginAwardComplete), null, Loader.BUFFER);
                        //新手奖励
                        Laya.loader.load("common/data/temp/item.conlinegift.bin", Handler.create(this, this.onloadedOnLineGiftComplete), null, Loader.BUFFER);
                        //升级大礼包
                        Laya.loader.load("common/data/temp/item.cpresentconfig.bin", Handler.create(this, this.onloadedPresentConfigComplete), null, Loader.BUFFER);
                        //手机绑定
                        Laya.loader.load("common/data/temp/game.cbindtelaward.bin", Handler.create(this, this.onloadedBindTelAwardComplete), null, Loader.BUFFER);
                    };
                    RewardProxy.prototype.onloadedBindTelAwardComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cbindtelaward.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.RewardModel._instance.bindTelAwardBinDic, game.data.template.BindTelAwardBaseVo, "id");
                        // console.log("onloadedBindTelAwardComplete:",RewardModel._instance.bindTelAwardBinDic);
                    };
                    RewardProxy.prototype.onloadedPresentConfigComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cpresentconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.RewardModel._instance.presentConfigBinDic, game.data.template.PresentConfigBaseVo, "id");
                        data.pos = 0;
                        size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillMap(data, size, models.RewardModel._instance.presentConfigBinDicAtDutyallow, game.data.template.PresentConfigBaseVo, "dutyallow");
                        console.log("presentConfigBinDicAtDutyallow:", models.RewardModel._instance.presentConfigBinDicAtDutyallow);
                    };
                    RewardProxy.prototype.onloadedOnLineGiftComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.conlinegift.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.RewardModel._instance.onLineGiftBinDic, game.data.template.OnLineGiftBaseVo, "id");
                        // console.log("onloadedOnLineGiftComplete:",RewardModel._instance.onLineGiftBinDic);
                    };
                    RewardProxy.prototype.onloadedLoginAwardComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cloginaward.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.RewardModel._instance.loginawardBinDic, game.data.template.CloginawardBaseVo, "id");
                        // console.log("onloadedLoginAwardComplete:",RewardModel._instance.loginawardBinDic);
                    };
                    RewardProxy.prototype.onloadedMonthCardConfigComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cmonthcardconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.RewardModel._instance.monthCardConfigBinDic, game.data.template.MonthCardConfigBaseVo, "id");
                        // console.log("onloadedMonthCardConfigComplete:",RewardModel._instance.monthCardConfigBinDic);
                    };
                    RewardProxy.prototype.onloadedShouChongLiBaoComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cshouchonglibao.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.RewardModel._instance.shouChongLiBaoBinDic, game.data.template.CshouchonglibaoBaseVo, "id");
                        // console.log("onloadedShouchonglibaoComplete:",RewardModel._instance.shouChongLiBaoBinDic);
                    };
                    RewardProxy.prototype.onloadedQianDaoJiangLiComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cqiandaojiangli.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.RewardModel._instance.qianDaoJiangLiBinDic, game.data.template.CqiandaojiangliBaseVo, "id");
                        // console.log("onloadedQianDaoJiangLiComplete:",RewardModel._instance.qianDaoJiangLiBinDic);
                    };
                    // 添加监听
                    RewardProxy.prototype.addNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.SQueryRegData, this, this.onQueryRegData);
                        Network._instance.addHanlder(ProtocolsEnum.SSendVipInfo, this, this.onSendVipInfo);
                        Network._instance.addHanlder(ProtocolsEnum.SMonthCard, this, this.onMonthCard);
                        Network._instance.addHanlder(ProtocolsEnum.SMulDayLogin, this, this.onMulDayLogin);
                        Network._instance.addHanlder(ProtocolsEnum.SGetBindTel, this, this.onGetBindTel);
                        Network._instance.addHanlder(ProtocolsEnum.SGetBindTelAward, this, this.onGetBindTelAward);
                        Network._instance.addHanlder(ProtocolsEnum.SBindTel, this, this.onBindTel);
                        Network._instance.addHanlder(ProtocolsEnum.SCheckCodeFinishTime, this, this.onCheckCodeFinishTime);
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshChargeState, this, this.onRefreshChargeState);
                        Network._instance.addHanlder(ProtocolsEnum.SGetTimeAward, this, this.onGetTimeAward);
                    };
                    // 移除监听
                    RewardProxy.prototype.removeNetworkListener = function () {
                        Network._instance.removeHanlder(ProtocolsEnum.SQueryRegData, this, this.onQueryRegData);
                        Network._instance.removeHanlder(ProtocolsEnum.SSendVipInfo, this, this.onSendVipInfo);
                        Network._instance.removeHanlder(ProtocolsEnum.SMonthCard, this, this.onMonthCard);
                        Network._instance.removeHanlder(ProtocolsEnum.SMulDayLogin, this, this.onMulDayLogin);
                        Network._instance.removeHanlder(ProtocolsEnum.SGetBindTel, this, this.onGetBindTel);
                        Network._instance.removeHanlder(ProtocolsEnum.SGetBindTelAward, this, this.onGetBindTelAward);
                        Network._instance.removeHanlder(ProtocolsEnum.SBindTel, this, this.onBindTel);
                        Network._instance.removeHanlder(ProtocolsEnum.SCheckCodeFinishTime, this, this.onCheckCodeFinishTime);
                        Network._instance.removeHanlder(ProtocolsEnum.SRefreshChargeState, this, this.onRefreshChargeState);
                        Network._instance.removeHanlder(ProtocolsEnum.SGetTimeAward, this, this.onGetTimeAward);
                    };
                    RewardProxy.prototype.onGetTimeAward = function (optcode, msg) {
                        var date = new Date();
                        models.RewardModel.getInstance().awardid = msg.awardid;
                        models.RewardModel.getInstance().endtime = date.getTime() + msg.waittime;
                        this.newplayerTime = msg.waittime;
                        if (msg.waittime == 0) {
                            models.RewardModel.getInstance().pointDic.set(4, 1);
                            RewardProxy.getInstance().event(models.NEWPLAYERPOINT_EVENT); //发送新手礼包红点事件
                        }
                        else {
                            Laya.timer.loop(1000, this, this.onLoop);
                        }
                        if (msg.awardid == -1) {
                            RewardProxy.getInstance().event(models.REFRESH);
                        }
                        else {
                            RewardProxy.getInstance().event(models.TIMEAWARD_EVENT);
                        }
                    };
                    /**奖励领取定时器 */
                    RewardProxy.prototype.onLoop = function () {
                        this.newplayerTime -= 1000;
                        if (this.newplayerTime <= 0) {
                            models.RewardModel.getInstance().pointDic.set(4, 1);
                            RewardProxy.getInstance().event(models.NEWPLAYERPOINT_EVENT); //发送新手礼包红点事件
                            Laya.timer.clear(this, this.onLoop);
                        }
                    };
                    RewardProxy.prototype.onRefreshChargeState = function (optcode, msg) {
                        models.RewardModel.getInstance().state = msg.state;
                        console.log("---------首充奖励领取状态：", msg.state);
                        RewardProxy.getInstance().event(models.STATE_EVENT);
                    };
                    RewardProxy.prototype.onCheckCodeFinishTime = function (optcode, msg) {
                        models.RewardModel.getInstance().finishTimePoint = msg.finishTimePoint;
                        console.log("-------验证码---", msg.finishTimePoint);
                        RewardProxy.getInstance().event(models.FINISHTIME_EVENT);
                    };
                    RewardProxy.prototype.onBindTel = function (optcode, msg) {
                        models.RewardModel.getInstance().bindTelStatus = msg.status;
                        models.RewardModel.getInstance().bindTelTime = msg.bindTelTime;
                        console.log("-------手机奖励相关1---", msg.status);
                        RewardProxy.getInstance().event(models.BINDTEL_EVENT);
                    };
                    RewardProxy.prototype.onGetBindTelAward = function (optcode, msg) {
                        models.RewardModel.getInstance().status = msg.status;
                        console.log("-------手机奖励相关2---", msg.status);
                        RewardProxy.getInstance().event(models.BINDTELAWARD_EVENT);
                    };
                    RewardProxy.prototype.onGetBindTel = function (optcode, msg) {
                        var bindTel = new models.BindTelVo();
                        bindTel.tel = msg.tel;
                        bindTel.createDate = msg.createDate;
                        bindTel.isFistLoginOfDay = msg.isFistLoginOfDay;
                        bindTel.isGetBindTelAward = msg.isGetBindTelAward;
                        bindTel.isBindTelAgain = msg.isBindTelAgain;
                        bindTel.bindTelTime = msg.bindTelTime;
                        console.log("-------手机绑定相关1", msg.tel);
                        console.log("-------手机绑定相关2", msg.createDate);
                        console.log("-------手机绑定相关3", msg.isFistLoginOfDay);
                        console.log("-------手机绑定相关4", msg.isGetBindTelAward);
                        console.log("-------手机绑定相关5", msg.isBindTelAgain);
                        console.log("-------手机绑定相关6", msg.bindTelTime);
                        models.RewardModel.getInstance().bindTel = bindTel;
                        RewardProxy.getInstance().event(models.GETBINDTEL_EVENT);
                    };
                    RewardProxy.prototype.onMulDayLogin = function (optcode, msg) {
                        var mulDayLogin = new models.MulDayLoginVo();
                        mulDayLogin.logindays = msg.logindays;
                        mulDayLogin.rewardmap = msg.rewardmap;
                        console.log("-------------七日签到累积登陆天数", mulDayLogin.logindays);
                        console.log("-------------七日签到累积登陆map:", mulDayLogin.rewardmap);
                        //根据奖励领取情况判断是否取消红点
                        for (var i = 0; i < 8; i++) {
                            if (msg.rewardmap.get(i) == 0) {
                                models.RewardModel.getInstance().pointDic.set(3, 1);
                                break;
                            }
                            else
                                models.RewardModel.getInstance().pointDic.set(3, 0);
                        }
                        var key = models.RewardModel.getInstance().pointDic.get(3);
                        if (key != 1) {
                            RewardProxy.getInstance().event(models.SEVENDAY_EVENT);
                        }
                        models.RewardModel.getInstance().mulDayLogin = mulDayLogin;
                        RewardProxy.getInstance().event(models.MULDAY_EVENT);
                    };
                    RewardProxy.prototype.onMonthCard = function (optcode, msg) {
                        var monthCard = new models.MonthCardVo();
                        monthCard.endtime = msg.endtime;
                        monthCard.grab = msg.grab;
                        console.log("-------月卡msg.endtime", msg.endtime);
                        console.log("-------月卡msg.grab", msg.grab);
                        models.RewardModel.getInstance().monthCard = monthCard;
                        RewardProxy.getInstance().event(models.MONTH_EVENT);
                    };
                    RewardProxy.prototype.onSendVipInfo = function (optcode, msg) {
                        var vipInfo = new models.VipInfoVo();
                        vipInfo.vipexp = msg.vipexp;
                        vipInfo.viplevel = msg.viplevel;
                        vipInfo.bounus = msg.bounus;
                        vipInfo.gotbounus = msg.gotbounus;
                        vipInfo.viprights = msg.viprights;
                        console.log("-------------vip相关-可领奖励:", vipInfo);
                        console.log("-------------vip相关-可领奖励:", msg.bounus);
                        console.log("-------------vip相关-已领奖励:", msg.gotbounus);
                        models.RewardModel.getInstance().vipInfo = vipInfo;
                        RewardProxy.getInstance().event(models.VIP_EVENT);
                    };
                    RewardProxy.prototype.onQueryRegData = function (optcode, msg) {
                        var regData = new models.RegDataVo();
                        regData.month = msg.month;
                        regData.times = msg.times;
                        regData.suppregtimes = msg.suppregtimes;
                        regData.cansuppregtimes = msg.cansuppregtimes;
                        regData.suppregdays = msg.suppregdays;
                        regData.rewardflag = msg.rewardflag;
                        /**每日签到 */
                        if (msg.rewardflag == 0) {
                            models.RewardModel.getInstance().pointDic.set(0, 1);
                        }
                        models.RewardModel.getInstance().regData = regData;
                        RewardProxy.getInstance().event(models.REGDATA_EVENT);
                    };
                    return RewardProxy;
                }(hanlder.ProxyBase));
                models.RewardProxy = RewardProxy;
            })(models = reward.models || (reward.models = {}));
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RewardProxy.js.map