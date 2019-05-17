var game;
(function (game) {
    var modules;
    (function (modules) {
        var redPacket;
        (function (redPacket) {
            var models;
            (function (models) {
                /**  玩家每天发送红包数量VO */
                var SRRedPackNumVo = /** @class */ (function () {
                    function SRRedPackNumVo() {
                    }
                    SRRedPackNumVo.prototype.fromByteArray = function (bytes) {
                        this.modeltype = bytes.readInt32();
                        this.redpacksendnum = bytes.readInt32();
                        this.redpackreceivenum = bytes.readInt32();
                        this.redpackreceivefushinum = bytes.readInt32();
                    };
                    return SRRedPackNumVo;
                }());
                models.SRRedPackNumVo = SRRedPackNumVo;
            })(models = redPacket.models || (redPacket.models = {}));
        })(redPacket = modules.redPacket || (modules.redPacket = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SRRedPackNumVo.js.map