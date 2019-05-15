var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var RecruitRewardBaseVo = /** @class */ (function () {
                function RecruitRewardBaseVo() {
                }
                RecruitRewardBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.friendnum = data.getUint32();
                    this.items = data.getUTFBytes(data.getUint32());
                    this.text = data.getUTFBytes(data.getUint32());
                };
                return RecruitRewardBaseVo;
            }());
            template.RecruitRewardBaseVo = RecruitRewardBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=RecruitRewardBaseVo.js.map