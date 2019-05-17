/**
* 任务信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var task;
        (function (task) {
            var models;
            (function (models) {
                var ActiveQuestDataVo = /** @class */ (function () {
                    function ActiveQuestDataVo() {
                    }
                    ActiveQuestDataVo.prototype.fromByteArray = function (bytes) {
                        this.questid = bytes.readInt32();
                        this.queststate = bytes.readInt32();
                        this.dstnpckey = bytes.readLong();
                        this.dstnpcid = bytes.readUint32();
                        this.dstmapid = bytes.readUint32();
                        this.dstx = bytes.readInt32();
                        this.dsty = bytes.readInt32();
                        this.dstitemid = bytes.readInt32();
                        this.sumnum = bytes.readInt32();
                        this.npcName = ByteArrayUtils.readUtf16String(bytes);
                        this.rewardexp = bytes.readLong();
                        this.rewardmoney = bytes.readLong();
                        this.rewardsmoney = bytes.readLong();
                        this.rewarditems = [];
                        var rewardsize = ByteArrayUtils.uncompact_uint32(bytes);
                        for (var index = 0; index < rewardsize; index++) {
                            var reward_1 = new models.RewardItemUnitVo();
                            reward_1.fromByteArray(bytes);
                            this.rewarditems.push(reward_1);
                        }
                    };
                    return ActiveQuestDataVo;
                }());
                models.ActiveQuestDataVo = ActiveQuestDataVo;
            })(models = task.models || (task.models = {}));
        })(task = modules.task || (modules.task = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ActiveQuestDataVo.js.map