/**
* name <!-- 角色基础战斗属性 -->
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var roleinfo;
        (function (roleinfo) {
            var models;
            (function (models) {
                var RoleBasicFightPropertiesVo = /** @class */ (function () {
                    function RoleBasicFightPropertiesVo() {
                    }
                    RoleBasicFightPropertiesVo.prototype.fromByteArray = function (bytes) {
                        this.cons = bytes.readShort();
                        this.iq = bytes.readShort();
                        this.str = bytes.readShort();
                        this.endu = bytes.readShort();
                        this.agi = bytes.readShort();
                        this.cons_save = new Laya.Dictionary();
                        var cons_saveSize = bytes.readUint8();
                        for (var index = 0; index < cons_saveSize; index++) {
                            this.cons_save.set(bytes.readInt32(), bytes.readInt32());
                        }
                        this.iq_save = new Laya.Dictionary();
                        var iq_saveSize = bytes.readUint8();
                        for (var index = 0; index < iq_saveSize; index++) {
                            this.iq_save.set(bytes.readInt32(), bytes.readInt32());
                        }
                        this.str_save = new Laya.Dictionary();
                        var str_saveSize = bytes.readUint8();
                        for (var index = 0; index < str_saveSize; index++) {
                            this.str_save.set(bytes.readInt32(), bytes.readInt32());
                        }
                        this.endu_save = new Laya.Dictionary();
                        var endu_saveSize = bytes.readUint8();
                        for (var index = 0; index < endu_saveSize; index++) {
                            this.endu_save.set(bytes.readInt32(), bytes.readInt32());
                        }
                        this.agi_save = new Laya.Dictionary();
                        var agi_saveSize = bytes.readUint8();
                        for (var index = 0; index < agi_saveSize; index++) {
                            this.agi_save.set(bytes.readInt32(), bytes.readInt32());
                        }
                    };
                    return RoleBasicFightPropertiesVo;
                }());
                models.RoleBasicFightPropertiesVo = RoleBasicFightPropertiesVo;
            })(models = roleinfo.models || (roleinfo.models = {}));
        })(roleinfo = modules.roleinfo || (modules.roleinfo = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleBasicFightPropertiesVo.js.map