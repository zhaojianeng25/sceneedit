/**
* @Author: LinQiuWen
* @description:循环任务/x循环任务配置表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CRepeatTaskBaseVo = /** @class */ (function () {
                function CRepeatTaskBaseVo() {
                }
                CRepeatTaskBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.eactivetype = data.getUint32();
                    this.etasktype = data.getUint32();
                    this.ngroupid = data.getUint32();
                    this.strtypename = data.getUTFBytes(data.getUint32());
                    this.strtaskname = data.getUTFBytes(data.getUint32());
                    this.strtasktitle = data.getUTFBytes(data.getUint32());
                    this.strtaskdes = data.getUTFBytes(data.getUint32());
                    this.strtasktitletrack = data.getUTFBytes(data.getUint32());
                    this.strtaskdestrack = data.getUTFBytes(data.getUint32());
                    this.nflytype = data.getUint32();
                    this.nautodone = data.getUint32();
                    this.nacceptchatid = data.getUint32();
                    this.nnpcchatid = data.getUint32();
                    this.ncommitchatid = data.getUint32();
                    this.nacceptnpcid = data.getUint32();
                    this.ntwodone = data.getUint32();
                };
                return CRepeatTaskBaseVo;
            }());
            template.CRepeatTaskBaseVo = CRepeatTaskBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CRepeatTaskBaseVo.js.map