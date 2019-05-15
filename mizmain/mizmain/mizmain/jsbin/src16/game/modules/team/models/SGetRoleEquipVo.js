/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var team;
        (function (team) {
            var models;
            (function (models) {
                var SGetRoleEquipVo = /** @class */ (function () {
                    function SGetRoleEquipVo() {
                    }
                    SGetRoleEquipVo.prototype.fromByteArray = function (bytes) {
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.totalscore = bytes.readUint32();
                        this.equipinfo = new game.modules.bag.models.BagVo;
                        this.equipinfo.fromByteArray(bytes);
                        var tipsSize = ByteArrayUtils.uncompact_uint32(bytes);
                        var tipsVo;
                        this.tips = new Laya.Dictionary();
                        for (var tipsIndex = 0; tipsIndex < tipsSize; tipsIndex++) {
                            tipsVo = new game.modules.strengThening.models.TipsVo();
                            var key = bytes.readUint32();
                            tipsVo.fromByteArray(bytes);
                            this.tips.set(key, tipsVo);
                        }
                        var componentsSize = ByteArrayUtils.uncompact_uint32(bytes);
                        this.components = new Laya.Dictionary();
                        for (var index = 0; index < componentsSize; index++) {
                            this.components.set(bytes.readByte(), bytes.readInt32());
                        }
                        this.profession = bytes.readUint32();
                        this.rolelevel = bytes.readUint32();
                        this.roleid = ByteArrayUtils.readLong(bytes);
                        this.shape = bytes.readUint32();
                    };
                    return SGetRoleEquipVo;
                }());
                models.SGetRoleEquipVo = SGetRoleEquipVo;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SGetRoleEquipVo.js.map