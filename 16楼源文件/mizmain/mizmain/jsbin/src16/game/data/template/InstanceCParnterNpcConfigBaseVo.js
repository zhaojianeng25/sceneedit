/**
* name z战斗NPC_协战_28xxx
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var InstanceCParnterNpcConfigBaseVo = /** @class */ (function () {
                function InstanceCParnterNpcConfigBaseVo() {
                }
                InstanceCParnterNpcConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.schoolid = data.getUint32();
                    this.type = data.getUint32();
                    this.modelid = data.getUint32();
                    this.serverid = data.getUint32();
                    this.bufferid = data.getUint32();
                    this.follownpcid = data.getUint32();
                    this.jiadian = data.getUTFBytes(data.getUint32());
                    this.skillname = data.getUTFBytes(data.getUint32());
                    this.roleintro = data.getUTFBytes(data.getUint32());
                };
                return InstanceCParnterNpcConfigBaseVo;
            }());
            template.InstanceCParnterNpcConfigBaseVo = InstanceCParnterNpcConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=InstanceCParnterNpcConfigBaseVo.js.map