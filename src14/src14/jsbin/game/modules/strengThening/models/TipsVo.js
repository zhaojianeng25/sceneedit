/**
* 物品的tips
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var strengThening;
        (function (strengThening) {
            var models;
            (function (models) {
                var TipsVo = /** @class */ (function () {
                    function TipsVo() {
                    }
                    TipsVo.prototype.fromByteArray = function (bytes) {
                        var head = ByteArrayUtils.uncompact_uint32(bytes);
                        var mapSize = bytes.readUint32();
                        this.baseAttr = new Laya.Dictionary();
                        for (var index = 0; index < mapSize; index++) {
                            this.baseAttr.set(bytes.readUint32(), bytes.readUint32());
                        }
                        mapSize = bytes.readUint32();
                        this.addAttr = new Laya.Dictionary();
                        if (mapSize > 0) {
                            for (var index = 0; index < mapSize; index++) {
                                this.addAttr.set(bytes.readUint32(), bytes.readInt32());
                            }
                        }
                        this.skill = bytes.readUint32();
                        this.effect = bytes.readUint32();
                        var arraySize = bytes.readUint32();
                        this.diamondID = new Array();
                        if (arraySize > 0) {
                            for (var index = 0; index < arraySize; index++) {
                                this.diamondID.push(bytes.readUint32());
                            }
                        }
                        this.endure = bytes.readUint32();
                        this.maxendure = bytes.readUint32();
                        this.repairtimes = bytes.readUint32();
                        this.equipscore = bytes.readUint32();
                        var utf16StringLength = ByteArrayUtils.uncompact_uint32(bytes);
                        var arrayBuffer = bytes.buffer.slice(bytes.position, bytes.position + utf16StringLength);
                        this.utf16String = ByteArrayUtils.utf16ToUtf8FromByte(arrayBuffer);
                        bytes.position = bytes.position + utf16StringLength;
                        arraySize = bytes.readUint32();
                        this.enhancement = new Array();
                        var subSize;
                        for (var index = 0; index < arraySize; index++) {
                            subSize = bytes.readUint32();
                            var enhancementAttr = new Laya.Dictionary();
                            for (var index = 0; index < arraySize; index++) {
                                enhancementAttr.set(bytes.readUint32(), bytes.readUint32());
                            }
                            var enhancementtime = bytes.readLong();
                            this.enhancement.push({ enhancementAttr: enhancementAttr, enhancementtime: enhancementtime });
                        }
                        this.isRecover = bytes.readBoolean();
                    };
                    return TipsVo;
                }());
                models.TipsVo = TipsVo;
            })(models = strengThening.models || (strengThening.models = {}));
        })(strengThening = modules.strengThening || (modules.strengThening = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TipsVo.js.map