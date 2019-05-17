/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ComeFromBaseVo = /** @class */ (function () {
                function ComeFromBaseVo() {
                }
                ComeFromBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.etype = data.getUint32();
                    this.nuiidornpcid = data.getUint32();
                    this.strname = data.getUTFBytes(data.getUint32());
                    this.stricon = data.getUTFBytes(data.getUint32());
                    this.stricon2 = data.getUTFBytes(data.getUint32());
                    this.nparam = data.getUint32();
                };
                return ComeFromBaseVo;
            }());
            template.ComeFromBaseVo = ComeFromBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ComeFromBaseVo.js.map