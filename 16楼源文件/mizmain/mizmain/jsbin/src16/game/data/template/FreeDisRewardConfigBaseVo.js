/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var FreeDisRewardConfigBaseVo = /** @class */ (function () {
                function FreeDisRewardConfigBaseVo() {
                    this.itemids = []; //道具1,道具2,道具3,道具4,道具5,道具6
                }
                FreeDisRewardConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    var rewarditems = data.getUint32();
                    for (var index = 0; index < rewarditems; index++) {
                        this.itemids.push(data.getUint32());
                    }
                    this.num = data.getUint32();
                };
                return FreeDisRewardConfigBaseVo;
            }());
            template.FreeDisRewardConfigBaseVo = FreeDisRewardConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=FreeDisRewardConfigBaseVo.js.map