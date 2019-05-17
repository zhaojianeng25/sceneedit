/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var TikuBaseVo = /** @class */ (function () {
                function TikuBaseVo() {
                }
                TikuBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.question = data.getUTFBytes(data.getUint32());
                    this.answer1 = data.getUTFBytes(data.getUint32());
                    this.answer2 = data.getUTFBytes(data.getUint32());
                    this.answer3 = data.getUTFBytes(data.getUint32());
                    this.answer4 = data.getUTFBytes(data.getUint32());
                    this.titlestr = data.getUTFBytes(data.getUint32());
                };
                return TikuBaseVo;
            }());
            template.TikuBaseVo = TikuBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=TikuBaseVo.js.map