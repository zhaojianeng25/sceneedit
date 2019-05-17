/**
* 邮件信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var friend;
        (function (friend) {
            var models;
            (function (models) {
                var MailInfoVo = /** @class */ (function () {
                    function MailInfoVo() {
                    }
                    MailInfoVo.prototype.fromByteArray = function (bytes) {
                        this.kind = bytes.readByte();
                        this.id = bytes.readLong();
                        this.readflag = bytes.readByte();
                        this.time = ByteArrayUtils.readUtf16String(bytes);
                        this.title = ByteArrayUtils.readUtf16String(bytes);
                        this.contentid = bytes.readInt32();
                        this.content = ByteArrayUtils.readUtf16String(bytes);
                        this.awardid = bytes.readInt32();
                        this.items = new Laya.Dictionary();
                        var mapSize = bytes.readUint8();
                        for (var index = 0; index < mapSize; index++) {
                            this.items.set(bytes.readUint32(), bytes.readUint32());
                        }
                        this.awardexp = bytes.readLong();
                        this.awardfushi = bytes.readLong();
                        this.awardgold = bytes.readLong();
                        this.awardmoney = bytes.readLong();
                        this.awardvipexp = bytes.readLong();
                        this.awardtianticoin = bytes.readLong();
                        this.npcid = bytes.readInt32();
                    };
                    return MailInfoVo;
                }());
                models.MailInfoVo = MailInfoVo;
            })(models = friend.models || (friend.models = {}));
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MailInfoVo.js.map