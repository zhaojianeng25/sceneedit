/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PracticeItemExpBaseVo = /** @class */ (function () {
                function PracticeItemExpBaseVo() {
                }
                PracticeItemExpBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.exp = data.getUint32();
                };
                return PracticeItemExpBaseVo;
            }());
            template.PracticeItemExpBaseVo = PracticeItemExpBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PracticeItemExpBaseVo.js.map