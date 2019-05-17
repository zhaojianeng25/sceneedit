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
                var TeamApplyBasicVo = /** @class */ (function () {
                    // <variable name="roleid" type="long"/>
                    // <variable name="rolename" type="string"/>
                    // <variable name="level" type="int"/>
                    // <variable name="school" type="int"/>
                    // <variable name="title" type="string"/>
                    // <variable name="shape" type="int"/> 增加外形 by changhao
                    // <variable name="components" type="map" key="byte" value="int"/>	角色换装信息key值参考SpriteComponents的枚举，value为0代表脱下某件换装
                    function TeamApplyBasicVo() {
                    }
                    TeamApplyBasicVo.prototype.fromByteArray = function (bytes) {
                        this.roleid = ByteArrayUtils.readLong(bytes);
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.level = bytes.readUint32();
                        this.school = bytes.readUint32();
                        this.title = ByteArrayUtils.readUtf16String(bytes);
                        this.shape = bytes.readUint32();
                        var componentsSize = ByteArrayUtils.uncompact_uint32(bytes);
                        this.components = new Laya.Dictionary();
                        for (var componentsIndex = 0; componentsIndex < componentsSize; componentsIndex++) {
                            this.components.set(bytes.readByte(), bytes.readUint32());
                        }
                    };
                    return TeamApplyBasicVo;
                }());
                models.TeamApplyBasicVo = TeamApplyBasicVo;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamApplyBasicVo.js.map