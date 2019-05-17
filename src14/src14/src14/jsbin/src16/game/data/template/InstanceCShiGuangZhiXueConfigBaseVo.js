/**
* name 精英副本任务
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var InstanceCShiGuangZhiXueConfigBaseVo = /** @class */ (function () {
                function InstanceCShiGuangZhiXueConfigBaseVo() {
                }
                InstanceCShiGuangZhiXueConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.nfubentasktype = data.getUint32();
                    this.taskpanelefttitle = data.getUTFBytes(data.getUint32());
                    this.taskpanetitle = data.getUTFBytes(data.getUint32());
                    this.taskpanedis = data.getUTFBytes(data.getUint32());
                    this.taskpanedes = data.getUTFBytes(data.getUint32());
                    this.tracetitle = data.getUTFBytes(data.getUint32());
                    this.tracedes = data.getUTFBytes(data.getUint32());
                };
                return InstanceCShiGuangZhiXueConfigBaseVo;
            }());
            template.InstanceCShiGuangZhiXueConfigBaseVo = InstanceCShiGuangZhiXueConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=InstanceCShiGuangZhiXueConfigBaseVo.js.map