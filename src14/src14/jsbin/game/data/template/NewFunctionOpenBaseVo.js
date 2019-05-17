/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var NewFunctionOpenBaseVo = /** @class */ (function () {
                function NewFunctionOpenBaseVo() {
                }
                NewFunctionOpenBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.functionname = data.getUTFBytes(data.getUint32());
                    this.needlevel = data.getUint32();
                    this.taskfinish = data.getUTFBytes(data.getUint32());
                    this.icon = data.getUTFBytes(data.getUint32());
                    this.iseffect = data.getUint32();
                    this.site = data.getUint32();
                    this.index = data.getUint32();
                    this.btn = data.getUTFBytes(data.getUint32());
                };
                return NewFunctionOpenBaseVo;
            }());
            template.NewFunctionOpenBaseVo = NewFunctionOpenBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=NewFunctionOpenBaseVo.js.map