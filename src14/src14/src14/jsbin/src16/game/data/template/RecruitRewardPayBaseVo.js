var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var RecruitRewardPayBaseVo = /** @class */ (function () {
                function RecruitRewardPayBaseVo() {
                }
                RecruitRewardPayBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.friendnum = data.getUint32();
                    this.items = data.getUTFBytes(data.getUint32());
                    this.text = data.getUTFBytes(data.getUint32());
                };
                return RecruitRewardPayBaseVo;
            }());
            template.RecruitRewardPayBaseVo = RecruitRewardPayBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=RecruitRewardPayBaseVo.js.map