/**
* name g公会大厅数据表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ClanCFactionLobbyBaseVo = /** @class */ (function () {
                function ClanCFactionLobbyBaseVo() {
                }
                ClanCFactionLobbyBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.levelupcost = data.getUint32();
                    this.costeveryday = data.getUint32();
                    this.downcompensate = data.getUint32();
                    this.othersum = data.getUint32();
                };
                return ClanCFactionLobbyBaseVo;
            }());
            template.ClanCFactionLobbyBaseVo = ClanCFactionLobbyBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ClanCFactionLobbyBaseVo.js.map