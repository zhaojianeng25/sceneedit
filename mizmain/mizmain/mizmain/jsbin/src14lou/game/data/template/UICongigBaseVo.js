/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var UICongigBaseVo = /** @class */ (function () {
                function UICongigBaseVo() {
                }
                UICongigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.layoutname = data.getUTFBytes(data.getUint32());
                    this.ngongnengid = data.getUint32();
                };
                return UICongigBaseVo;
            }());
            template.UICongigBaseVo = UICongigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=UICongigBaseVo.js.map