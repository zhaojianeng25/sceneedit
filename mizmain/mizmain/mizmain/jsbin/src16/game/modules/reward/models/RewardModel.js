var game;
(function (game) {
    var modules;
    (function (modules) {
        var reward;
        (function (reward) {
            var models;
            (function (models) {
                var RewardModel = /** @class */ (function () {
                    function RewardModel() {
                        /** 签到奖励 */
                        this.qianDaoJiangLiBinDic = {};
                        /** 首充奖励*/
                        this.shouChongLiBaoBinDic = {};
                        /** 月卡奖励 */
                        this.monthCardConfigBinDic = {};
                        /** 七日签到 */
                        this.loginawardBinDic = {};
                        /** 新手奖励 */
                        this.onLineGiftBinDic = {};
                        /** 升级礼包 */
                        this.presentConfigBinDic = {};
                        /** 手机绑定 */
                        this.bindTelAwardBinDic = {};
                        /** 升级礼包通过角色赋值 */
                        this.presentConfigBinDicAtDutyallow = new Laya.Dictionary;
                        /**红点状态map */
                        this.pointDic = new Laya.Dictionary;
                        this.rewardType = new Laya.Dictionary;
                        RewardModel._instance = this;
                        // RewardProxy.getInstance();
                        var rewardName = ["每日签到", "贵礼包", "月卡奖励", "七日签到", "新手奖励", "手机关联", "升级礼包"];
                        var skinArr = ["common/ui/reward/richang.png",
                            "common/ui/reward/zuanshibao.png", "common/ui/reward/zuanshibao.png",
                            "common/ui/reward/mingke.png", "common/ui/reward/zuanshdiai.png",
                            "common/ui/reward/zuanshibao.png", "common/ui/reward/zuanshibao.png"];
                        for (var i = 0; i < 7; i++) {
                            var _rewardType = new models.RewardType();
                            _rewardType.type = i;
                            _rewardType.isShow = 1;
                            _rewardType.name = rewardName[i];
                            _rewardType.skin = skinArr[i];
                            this.rewardType.set(i, _rewardType);
                            this.pointDic.set(i, 0);
                        }
                    }
                    RewardModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new RewardModel();
                        }
                        return this._instance;
                    };
                    RewardModel.clearModelData = function () {
                        reward.models.RewardModel._instance.regData = new models.RegDataVo();
                        reward.models.RewardModel._instance.vipInfo = new models.VipInfoVo();
                        reward.models.RewardModel._instance.monthCard = new models.MonthCardVo();
                        reward.models.RewardModel._instance.mulDayLogin = new models.MulDayLoginVo();
                        reward.models.RewardModel._instance.bindTel = new models.BindTelVo();
                        reward.models.RewardModel._instance.status = 0;
                        reward.models.RewardModel._instance.bindTelStatus = 0;
                        reward.models.RewardModel._instance.bindTelTime = 0;
                        reward.models.RewardModel._instance.finishTimePoint = 0;
                        reward.models.RewardModel._instance.state = 0;
                        reward.models.RewardModel._instance.awardid = 0;
                        reward.models.RewardModel._instance.endtime = 0;
                        reward.models.RewardModel._instance.pointDic = new Laya.Dictionary();
                    };
                    return RewardModel;
                }());
                models.RewardModel = RewardModel;
            })(models = reward.models || (reward.models = {}));
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RewardModel.js.map