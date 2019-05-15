/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var createrole;
        (function (createrole) {
            var models;
            (function (models) {
                var RoleInfoVo = /** @class */ (function () {
                    function RoleInfoVo() {
                    }
                    RoleInfoVo.prototype.fromByteArray = function (bytes) {
                        this.roleId = bytes.readLong();
                        //this.roleName = bytes.readString();
                        //this.roleName = bytes.readUTFBytes(bytes.readUint8());
                        /*var utf16StringLength:number = ByteArrayUtils.uncompact_uint32(bytes);
                        var arrayBuffer:ArrayBuffer = bytes.buffer.slice(bytes.position, bytes.position + utf16StringLength);
                        this.roleName = ByteArrayUtils.utf16ToUtf8FromByte(arrayBuffer);
                        console.log("RoleInfoVo utfx.UTF16toUTF8:", this.roleName);
                        bytes.position = bytes.position + utf16StringLength;*/
                        this.roleName = ByteArrayUtils.readUtf16String(bytes);
                        this.school = bytes.readUint32();
                        this.shape = bytes.readUint32();
                        this.level = bytes.readUint32();
                        this.components = new Laya.Dictionary();
                        var componentSize = bytes.readUint8();
                        for (var index = 0; index < componentSize; index++) {
                            this.components.set(bytes.readUint8(), bytes.readUint32());
                        }
                        this.roleCreateTime = bytes.readLong();
                        this.forbidTime = bytes.readLong();
                        this.forbidReason = bytes.readUint32();
                        console.log("RoleInfoVo fromByteArray", this);
                    };
                    return RoleInfoVo;
                }());
                models.RoleInfoVo = RoleInfoVo;
            })(models = createrole.models || (createrole.models = {}));
        })(createrole = modules.createrole || (modules.createrole = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleInfoVo.js.map