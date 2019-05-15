/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var keju;
        (function (keju) {
            var models;
            (function (models) {
                var ImpExamBeanVo = /** @class */ (function () {
                    function ImpExamBeanVo() {
                    }
                    ImpExamBeanVo.prototype.fromByteArray = function (bytes) {
                        this.questionid = bytes.readInt32();
                        this.questionnum = bytes.readInt32();
                        this.righttimes = bytes.readUint32();
                        this.remaintime = ByteArrayUtils.readLong(bytes);
                        this.lastright = bytes.readByte();
                        this.accuexp = bytes.readInt32();
                        this.accumoney = bytes.readInt32();
                        this.delwrongval = bytes.readInt32();
                        this.chorightval = bytes.readInt32();
                        this.helpcnt = bytes.readInt32();
                    };
                    return ImpExamBeanVo;
                }());
                models.ImpExamBeanVo = ImpExamBeanVo;
            })(models = keju.models || (keju.models = {}));
        })(keju = modules.keju || (modules.keju = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ImpExamBeanVo.js.map