/**
* name g公会战
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ClanCClanFightBaseVo = /** @class */ (function () {
                function ClanCClanFightBaseVo() {
                }
                ClanCClanFightBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.mapid = data.getUint32();
                    this.x1 = data.getUint32();
                    this.y1 = data.getUint32();
                    this.x2 = data.getUint32();
                    this.y2 = data.getUint32();
                    this.outmapid = data.getUint32();
                    this.outx1 = data.getUint32();
                    this.outy1 = data.getUint32();
                };
                return ClanCClanFightBaseVo;
            }());
            template.ClanCClanFightBaseVo = ClanCClanFightBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ClanCClanFightBaseVo.js.map