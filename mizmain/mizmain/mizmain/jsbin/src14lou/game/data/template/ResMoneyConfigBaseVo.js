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
            var ResMoneyConfigBaseVo = /** @class */ (function () {
                function ResMoneyConfigBaseVo() {
                }
                ResMoneyConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.resmoney = data.getUint32();
                    this.nextexp = data.getUint32();
                    data.getUint32();
                    //this.nextexp = data.getFloat64();       
                    this.petfightnum = data.getUint32();
                    this.addpointschemenum = data.getUint32();
                    this.shengwangmax = data.getUint32();
                };
                return ResMoneyConfigBaseVo;
            }());
            template.ResMoneyConfigBaseVo = ResMoneyConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ResMoneyConfigBaseVo.js.map