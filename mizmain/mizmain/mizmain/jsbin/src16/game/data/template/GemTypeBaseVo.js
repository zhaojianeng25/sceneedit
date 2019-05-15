/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var GemTypeBaseVo = /** @class */ (function () {
                function GemTypeBaseVo() {
                }
                GemTypeBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.strname = data.getUTFBytes(data.getUint32());
                    this.nicon = data.getUint32();
                    this.stradddes = data.getUTFBytes(data.getUint32());
                    this.nitemid = data.getUint32();
                };
                return GemTypeBaseVo;
            }());
            template.GemTypeBaseVo = GemTypeBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=GemTypeBaseVo.js.map