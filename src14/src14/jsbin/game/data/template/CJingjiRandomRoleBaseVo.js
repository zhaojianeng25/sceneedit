//CJingjiRandomRoleBaseVo
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CJingjiRandomRoleBaseVo = /** @class */ (function () {
                function CJingjiRandomRoleBaseVo() {
                }
                CJingjiRandomRoleBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.nheadid = data.getUint32();
                    this.njobid = data.getUint32();
                };
                return CJingjiRandomRoleBaseVo;
            }());
            template.CJingjiRandomRoleBaseVo = CJingjiRandomRoleBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CJingjiRandomRoleBaseVo.js.map