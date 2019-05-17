/**
* name  x巡游配置/x巡游路径总表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CAutoMovePathBaseVo = /** @class */ (function () {
                function CAutoMovePathBaseVo() {
                }
                CAutoMovePathBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.paths = data.getUTFBytes(data.getUint32());
                };
                return CAutoMovePathBaseVo;
            }());
            template.CAutoMovePathBaseVo = CAutoMovePathBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CAutoMovePathBaseVo.js.map