/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PresentConfigPayBaseVo = /** @class */ (function () {
                function PresentConfigPayBaseVo() {
                }
                PresentConfigPayBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.itemid = data.getUint32();
                    this.dutyallow = data.getUint32();
                    this.careerallow = data.getUint32();
                    this.maleallow = data.getUint32();
                    this.clienttip = data.getUint32();
                    this.rewardcfgid = data.getUint32();
                    this.coinreward = data.getFloat64();
                    this.yuanbaoreward = data.getUint32();
                    var itemidsLength = data.getUint32();
                    this.itemids = [];
                    for (var index = 0; index < itemidsLength; index++) {
                        this.itemids.push(data.getUint32());
                    }
                    var itemnumsLength = data.getUint32();
                    this.itemnums = [];
                    for (var index = 0; index < itemnumsLength; index++) {
                        this.itemnums.push(data.getUint32());
                    }
                    var itembindsLength = data.getUint32();
                    this.itembinds = [];
                    for (var index = 0; index < itembindsLength; index++) {
                        this.itembinds.push(data.getUint32());
                    }
                };
                return PresentConfigPayBaseVo;
            }());
            template.PresentConfigPayBaseVo = PresentConfigPayBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PresentConfigPayBaseVo.js.map