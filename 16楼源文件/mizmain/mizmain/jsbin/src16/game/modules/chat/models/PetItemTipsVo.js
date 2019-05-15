/**
*
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var chat;
        (function (chat) {
            var models;
            (function (models) {
                var PetItemTipsVo = /** @class */ (function () {
                    function PetItemTipsVo() {
                    }
                    PetItemTipsVo.prototype.fromByteArray = function (bytes) {
                        this.id = bytes.readInt32();
                        this.key = bytes.readInt32();
                        this.name = ByteArrayUtils.readUtf16String(bytes);
                        this.level = bytes.readInt32();
                        this.useLevel = bytes.readInt32();
                        this.xuemai = bytes.readInt32();
                        this.gengu = bytes.readInt32();
                        this.colour = bytes.readInt32();
                        this.hp = bytes.readInt32();
                        this.maxhp = bytes.readInt32();
                        this.mp = bytes.readInt32();
                        this.maxmp = bytes.readInt32();
                        this.attack = bytes.readInt32();
                        this.defend = bytes.readInt32();
                        this.speed = bytes.readInt32();
                        this.magicattack = bytes.readInt32();
                        this.magicdef = bytes.readInt32();
                        this.scale = bytes.readByte();
                        this.initbfp = new game.modules.pet.models.BasicFightPropertiesVo();
                        this.initbfp.fromByteArray(bytes);
                        this.bfp = new game.modules.pet.models.BasicFightPropertiesVo();
                        this.bfp.fromByteArray(bytes);
                        this.point = bytes.readInt16();
                        this.autoaddcons = bytes.readByte();
                        this.autoaddiq = bytes.readByte();
                        this.autoaddstr = bytes.readByte();
                        this.autoaddendu = bytes.readByte();
                        this.autoaddagi = bytes.readByte();
                        this.pointresetcount = bytes.readInt16();
                        this.exp = bytes.readLong();
                        this.nexp = bytes.readLong();
                        this.attackapt = bytes.readInt32();
                        this.defendapt = bytes.readInt32();
                        this.phyforceapt = bytes.readInt32();
                        this.magicapt = bytes.readInt32();
                        this.speedapt = bytes.readInt32();
                        this.dodgeapt = bytes.readInt32();
                        this.growrate = bytes.readFloat();
                        this.life = bytes.readInt32();
                        this.kind = bytes.readInt32();
                    };
                    return PetItemTipsVo;
                }());
                models.PetItemTipsVo = PetItemTipsVo;
            })(models = chat.models || (chat.models = {}));
        })(chat = modules.chat || (modules.chat = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetItemTipsVo.js.map