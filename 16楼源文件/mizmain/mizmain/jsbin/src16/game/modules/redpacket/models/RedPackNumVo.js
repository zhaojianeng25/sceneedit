/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var redPacket;
        (function (redPacket) {
            var models;
            (function (models) {
                var RedPackNumVo = /** @class */ (function () {
                    function RedPackNumVo() {
                    }
                    RedPackNumVo.prototype.fromByteArray = function (bytes) {
                        this.modeltype = bytes.readInt32();
                        this.redpacksendnum = bytes.readInt32();
                        this.redpackreceivenum = bytes.readInt32();
                        this.redpackreceivefushinum = bytes.readInt32();
                    };
                    return RedPackNumVo;
                }());
                models.RedPackNumVo = RedPackNumVo;
            })(models = redPacket.models || (redPacket.models = {}));
        })(redPacket = modules.redPacket || (modules.redPacket = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RedPackNumVo.js.map