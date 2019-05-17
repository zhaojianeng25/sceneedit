var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CLuaTestBaseVo = /** @class */ (function () {
                function CLuaTestBaseVo() {
                    this.skillid = []; //技能1,技能2,技能3,技能4,技能5,技能6,技能7,技能8
                }
                CLuaTestBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.skillid.push(data.getUint32());
                    }
                };
                return CLuaTestBaseVo;
            }());
            template.CLuaTestBaseVo = CLuaTestBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CLuaTestBaseVo.js.map