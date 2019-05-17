//CNPCInfoBaseVo
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CNPCInfoBaseVo = /** @class */ (function () {
                function CNPCInfoBaseVo() {
                }
                CNPCInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.npctype = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.mapid = data.getUint32();
                    this.hide = data.getUint32();
                    this.namecolour = data.getUTFBytes(data.getUint32());
                    this.bordercolour = data.getUTFBytes(data.getUint32());
                    this.showInMiniMap = data.getUint32();
                    this.showinserver = data.getUint32();
                };
                return CNPCInfoBaseVo;
            }());
            template.CNPCInfoBaseVo = CNPCInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CNPCInfoBaseVo.js.map