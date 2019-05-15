/**
* name 称谓表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CTitleConfigBaseVo = /** @class */ (function () {
                function CTitleConfigBaseVo() {
                }
                CTitleConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.titlename = data.getUTFBytes(data.getUint32());
                    this.availtime = data.getUint32();
                    this.category = data.getUTFBytes(data.getUint32());
                    this.species = data.getUTFBytes(data.getUint32());
                    this.description = data.getUTFBytes(data.getUint32());
                    this.fontcolor = data.getUTFBytes(data.getUint32());
                    this.gettype = data.getUTFBytes(data.getUint32());
                };
                return CTitleConfigBaseVo;
            }());
            template.CTitleConfigBaseVo = CTitleConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CTitleConfigBaseVo.js.map