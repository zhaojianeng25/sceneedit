/**
*  循环任务信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var task;
        (function (task) {
            var models;
            (function (models) {
                var SRefreshSpecialQuestVo = /** @class */ (function () {
                    function SRefreshSpecialQuestVo() {
                    }
                    SRefreshSpecialQuestVo.prototype.fromByteArray = function (bytes) {
                        this.questid = bytes.readUint32();
                        this.queststate = bytes.readUint32();
                        this.round = bytes.readUint32();
                        this.sumnum = bytes.readUint32();
                        this.questtype = bytes.readUint32();
                        this.dstmapid = bytes.readUint32();
                        this.dstnpckey = bytes.readLong();
                        this.dstnpcname = ByteArrayUtils.readUtf16String(bytes);
                        this.dstnpcid = bytes.readUint32();
                        this.dstitemid = bytes.readUint32();
                        this.dstitemnum = bytes.readUint32();
                        this.dstitemid2 = bytes.readUint32();
                        this.dstitemidnum2 = bytes.readUint32();
                        this.dstx = bytes.readUint32();
                        this.dsty = bytes.readUint32();
                        this.validtime = bytes.readLong();
                        this.islogin = bytes.readUint32();
                    };
                    return SRefreshSpecialQuestVo;
                }());
                models.SRefreshSpecialQuestVo = SRefreshSpecialQuestVo;
            })(models = task.models || (task.models = {}));
        })(task = modules.task || (modules.task = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SRefreshSpecialQuestVo.js.map