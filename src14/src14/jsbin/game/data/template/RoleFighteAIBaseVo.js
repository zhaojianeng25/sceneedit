/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var RoleFighteAIBaseVo = /** @class */ (function () {
                function RoleFighteAIBaseVo() {
                }
                RoleFighteAIBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.school = data.getUint32();
                    this.ai = data.getUint32();
                    this.skill = data.getUint32();
                    this.level = data.getUint32();
                    this.param = data.getUint32();
                    this.desc = data.getUTFBytes(data.getUint32());
                };
                return RoleFighteAIBaseVo;
            }());
            template.RoleFighteAIBaseVo = RoleFighteAIBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleFighteAIBaseVo.js.map