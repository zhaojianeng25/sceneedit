/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var JingyingrenwuTaskBaseVo = /** @class */ (function () {
                function JingyingrenwuTaskBaseVo() {
                }
                JingyingrenwuTaskBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.ntasktypeid = data.getUint32();
                    this.nfubenid = data.getUint32();
                    this.taskname = data.getUTFBytes(data.getUint32());
                    this.tasklevel = data.getUTFBytes(data.getUint32());
                    this.tasktext = data.getUTFBytes(data.getUint32());
                    this.taskready = data.getUint32();
                    this.nleveltype = data.getUint32();
                    this.minlevel = data.getUint32();
                    this.maxlevel = data.getUint32();
                    this.ndifficult = data.getUint32();
                    this.strkaiqitime = data.getUTFBytes(data.getUint32());
                    this.strkaishitime = data.getUTFBytes(data.getUint32());
                    this.strjieshutime = data.getUTFBytes(data.getUint32());
                    this.nlunhuantype = data.getUint32();
                    this.turngroup = data.getUint32();
                    this.turnid = data.getUint32();
                    this.awardtype = data.getUint32();
                    this.awardtime = data.getUint32();
                    this.nshowtype = data.getUint32();
                    this.strbgname = data.getUTFBytes(data.getUint32());
                    this.nbossid = data.getUint32();
                    this.strdes = data.getUTFBytes(data.getUint32());
                };
                return JingyingrenwuTaskBaseVo;
            }());
            template.JingyingrenwuTaskBaseVo = JingyingrenwuTaskBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=JingyingrenwuTaskBaseVo.js.map