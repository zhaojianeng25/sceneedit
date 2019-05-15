/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var AcceptableTaskBaseVo = /** @class */ (function () {
                function AcceptableTaskBaseVo() {
                }
                AcceptableTaskBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.minilevel = data.getUint32();
                    this.destnpcid = data.getUint32();
                    this.miniicon = data.getUTFBytes(data.getUint32());
                    this.name = data.getUTFBytes(data.getUint32());
                    this.aim = data.getUTFBytes(data.getUint32());
                    this.discribe = data.getUTFBytes(data.getUint32());
                    this.rewardtext = data.getUTFBytes(data.getUint32());
                    this.expreward = data.getUint32();
                    this.moneyreward = data.getUint32();
                    this.rmoneyreward = data.getUint32();
                    var itemsrewardLength = data.getUint32();
                    this.itemsreward = [];
                    for (var index = 0; index < itemsrewardLength; index++) {
                        this.itemsreward.push(data.getUint32());
                    }
                    this.reputationreward = data.getUint32();
                };
                return AcceptableTaskBaseVo;
            }());
            template.AcceptableTaskBaseVo = AcceptableTaskBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=AcceptableTaskBaseVo.js.map