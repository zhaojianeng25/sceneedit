/**
* name g公会福利表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ClanCFactionFuLiBaseVo = /** @class */ (function () {
                function ClanCFactionFuLiBaseVo() {
                }
                ClanCFactionFuLiBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.icon = data.getUTFBytes(data.getUint32());
                    this.desc = data.getUTFBytes(data.getUint32());
                    this.isgive = data.getUint32();
                };
                return ClanCFactionFuLiBaseVo;
            }());
            template.ClanCFactionFuLiBaseVo = ClanCFactionFuLiBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ClanCFactionFuLiBaseVo.js.map