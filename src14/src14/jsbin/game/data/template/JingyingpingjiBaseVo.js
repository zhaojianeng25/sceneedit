/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var JingyingpingjiBaseVo = /** @class */ (function () {
                function JingyingpingjiBaseVo() {
                }
                JingyingpingjiBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.level = data.getUTFBytes(data.getUint32());
                    this.minround = data.getUint32();
                    this.maxround = data.getUint32();
                    this.exppersent = data.getUint32();
                    this.tubiaolujing = data.getUTFBytes(data.getUint32());
                };
                return JingyingpingjiBaseVo;
            }());
            template.JingyingpingjiBaseVo = JingyingpingjiBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=JingyingpingjiBaseVo.js.map