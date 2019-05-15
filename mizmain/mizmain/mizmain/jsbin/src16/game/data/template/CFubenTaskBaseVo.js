/**
* @Author: LinQiuWen
* @description:CFubenTaskBaseVo.ts
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CFubenTaskBaseVo = /** @class */ (function () {
                function CFubenTaskBaseVo() {
                }
                CFubenTaskBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.nfubentasktype = data.getUint32();
                    this.taskpanelefttitle = data.getUTFBytes(data.getUint32());
                    this.taskpanetitle = data.getUTFBytes(data.getUint32());
                    this.taskpanedis = data.getUTFBytes(data.getUint32());
                    this.taskpanedes = data.getUTFBytes(data.getUint32());
                    this.tracetitle = data.getUTFBytes(data.getUint32());
                    this.tracedes = data.getUTFBytes(data.getUint32());
                };
                return CFubenTaskBaseVo;
            }());
            template.CFubenTaskBaseVo = CFubenTaskBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CFubenTaskBaseVo.js.map