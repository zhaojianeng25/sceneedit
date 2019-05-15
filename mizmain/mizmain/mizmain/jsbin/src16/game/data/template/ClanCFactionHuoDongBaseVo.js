/**
* name g公会活动表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ClanCFactionHuoDongBaseVo = /** @class */ (function () {
                function ClanCFactionHuoDongBaseVo() {
                }
                ClanCFactionHuoDongBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.icon = data.getUTFBytes(data.getUint32());
                    this.leveldesc = data.getUTFBytes(data.getUint32());
                    this.opentimedesc = data.getUTFBytes(data.getUint32());
                    this.huodongdesc = data.getUTFBytes(data.getUint32());
                    this.isclicked = data.getUint32();
                };
                return ClanCFactionHuoDongBaseVo;
            }());
            template.ClanCFactionHuoDongBaseVo = ClanCFactionHuoDongBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ClanCFactionHuoDongBaseVo.js.map