var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CHeroBaseInfoBaseVo = /** @class */ (function () {
                function CHeroBaseInfoBaseVo() {
                    this.skillid = []; //技能1,技能2,技能3,技能4,技能5,技能6,技能7,技能8
                    this.day7_money = []; //7天花费1,7天花费2
                    this.day30_money = []; //30天花费1,30天花费2
                    this.forever_money = []; //永久花费1,永久花费2
                }
                CHeroBaseInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.type = data.getUint32();
                    this.acttype = data.getUint32();
                    this.school = data.getUint32();
                    this.shapeid = data.getUint32();
                    this.headid = data.getUint32();
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.skillid.push(data.getUint32());
                    }
                    this.first_skill = data.getUint32();
                    listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.day7_money.push(data.getUint32());
                    }
                    listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.day30_money.push(data.getUint32());
                    }
                    listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.forever_money.push(data.getUint32());
                    }
                    this.scalefactor = data.getFloat64();
                };
                return CHeroBaseInfoBaseVo;
            }());
            template.CHeroBaseInfoBaseVo = CHeroBaseInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CHeroBaseInfoBaseVo.js.map