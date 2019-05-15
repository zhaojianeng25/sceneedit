/**
* name g公会符文配置
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ClanCRuneSetBaseVo = /** @class */ (function () {
                function ClanCRuneSetBaseVo() {
                }
                ClanCRuneSetBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.desc = data.getUTFBytes(data.getUint32());
                };
                return ClanCRuneSetBaseVo;
            }());
            template.ClanCRuneSetBaseVo = ClanCRuneSetBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ClanCRuneSetBaseVo.js.map