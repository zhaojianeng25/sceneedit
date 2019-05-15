/**
* RewardType
*/
var rewardBtnType;
(function (rewardBtnType) {
    rewardBtnType[rewardBtnType["SIGNIN"] = 0] = "SIGNIN";
    rewardBtnType[rewardBtnType["CHARGE"] = 1] = "CHARGE";
    rewardBtnType[rewardBtnType["MONTH"] = 2] = "MONTH";
    rewardBtnType[rewardBtnType["SEVENDAY"] = 3] = "SEVENDAY";
    rewardBtnType[rewardBtnType["NEWPLAYER"] = 4] = "NEWPLAYER";
    rewardBtnType[rewardBtnType["PHONE"] = 5] = "PHONE";
    rewardBtnType[rewardBtnType["LEVELUP"] = 6] = "LEVELUP";
})(rewardBtnType || (rewardBtnType = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var reward;
        (function (reward) {
            var models;
            (function (models) {
                var RewardType = /** @class */ (function () {
                    function RewardType() {
                    }
                    return RewardType;
                }());
                models.RewardType = RewardType;
            })(models = reward.models || (reward.models = {}));
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RewardType.js.map