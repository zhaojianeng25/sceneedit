/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var FormationbaseConfigBaseVo = /** @class */ (function () {
                function FormationbaseConfigBaseVo() {
                    this.formation = []; //己方一,己方二,己方三,己方四,己方五,己方六,己方七,己方八,己方九,己方十,己方十一,己方十二,己方十三,己方十四,敌方十五,敌方十六,敌方十七,敌方十八,敌方十九,敌方二十,敌方二十一,敌方二十二,敌方二十三,敌方二十四,敌方二十五,敌方二十六,敌方二十七,敌方二十八
                }
                FormationbaseConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.imagepath = data.getUTFBytes(data.getUint32());
                    this.icon = data.getUint32();
                    this.describe = data.getUTFBytes(data.getUint32());
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.formation.push(data.getUint32());
                    }
                    this.des = data.getUTFBytes(data.getUint32());
                    this.fear1 = data.getUTFBytes(data.getUint32());
                    this.fear2 = data.getUTFBytes(data.getUint32());
                    this.path = data.getUTFBytes(data.getUint32());
                    this.bookid = data.getUint32();
                    this.bookaddexp = data.getUint32();
                };
                return FormationbaseConfigBaseVo;
            }());
            template.FormationbaseConfigBaseVo = FormationbaseConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=FormationbaseConfigBaseVo.js.map