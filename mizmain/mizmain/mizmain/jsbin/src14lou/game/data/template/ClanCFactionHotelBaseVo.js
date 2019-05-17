/**
* name g公会旅馆数据表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ClanCFactionHotelBaseVo = /** @class */ (function () {
                function ClanCFactionHotelBaseVo() {
                }
                ClanCFactionHotelBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.levelupcost = data.getUint32();
                    this.peoplemax = data.getUint32();
                    this.apprenticemax = data.getUint32();
                    this.costeveryday = data.getUint32();
                };
                return ClanCFactionHotelBaseVo;
            }());
            template.ClanCFactionHotelBaseVo = ClanCFactionHotelBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ClanCFactionHotelBaseVo.js.map