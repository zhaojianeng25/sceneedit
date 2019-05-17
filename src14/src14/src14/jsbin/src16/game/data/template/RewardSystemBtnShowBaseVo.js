/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var RewardSystemBtnShowBaseVo = /** @class */ (function () {
                function RewardSystemBtnShowBaseVo() {
                }
                RewardSystemBtnShowBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.systemname = data.getUTFBytes(data.getUint32());
                    this.bshoweffect = data.getUint32();
                    this.btnimage = data.getUTFBytes(data.getUint32());
                };
                return RewardSystemBtnShowBaseVo;
            }());
            template.RewardSystemBtnShowBaseVo = RewardSystemBtnShowBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=RewardSystemBtnShowBaseVo.js.map