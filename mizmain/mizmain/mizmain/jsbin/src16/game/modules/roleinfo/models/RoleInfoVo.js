/**
* 人物基础属性
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var roleinfo;
        (function (roleinfo) {
            var models;
            (function (models) {
                var RoleInfoVo = /** @class */ (function () {
                    function RoleInfoVo() {
                    }
                    RoleInfoVo.prototype.parse = function (data) {
                        this.id = data.getUint32();
                        this.type = data.getUint32();
                        this.tizhi = data.getUint32();
                        this.moli = data.getUint32();
                        this.liliang = data.getUint32();
                        this.naili = data.getUint32();
                        this.minjie = data.getUint32();
                    };
                    return RoleInfoVo;
                }());
                models.RoleInfoVo = RoleInfoVo;
            })(models = roleinfo.models || (roleinfo.models = {}));
        })(roleinfo = modules.roleinfo || (modules.roleinfo = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleInfoVo.js.map