/**
* @Author: LinQiuWen
* @description:
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var AddPointResetItemConfigBaseVo = /** @class */ (function () {
                function AddPointResetItemConfigBaseVo() {
                }
                AddPointResetItemConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getInt32();
                    this.type = data.getInt32();
                    this.tizhi = data.getInt32();
                    this.moli = data.getInt32();
                    this.liliang = data.getInt32();
                    this.naili = data.getInt32();
                    this.minjie = data.getInt32();
                };
                return AddPointResetItemConfigBaseVo;
            }());
            template.AddPointResetItemConfigBaseVo = AddPointResetItemConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=AddPointResetItemConfigBaseVo.js.map