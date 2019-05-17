/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var GuideCoursePayBaseVo = /** @class */ (function () {
                function GuideCoursePayBaseVo() {
                }
                GuideCoursePayBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.group = data.getUint32();
                    this.style = data.getUint32();
                    this.image = data.getUTFBytes(data.getUint32());
                    this.name = data.getUTFBytes(data.getUint32());
                    this.sort = data.getUint32();
                    this.info = data.getUTFBytes(data.getUint32());
                    this.enterlevel = data.getUint32();
                    this.enter = data.getUint32();
                    this.enterlink = data.getUint32();
                    this.finish = data.getUint32();
                    this.ref1 = data.getUTFBytes(data.getUint32());
                    this.ref2 = data.getUTFBytes(data.getUint32());
                    this.item = data.getUint32();
                    this.itemnum = data.getUint32();
                    var itemiconsLength = data.getUint32();
                    this.itemicons = [];
                    for (var index = 0; index < itemiconsLength; index++) {
                        this.itemicons.push(data.getUint32());
                    }
                    var itemtextsLength = data.getUint32();
                    this.itemtexts = [];
                    for (var index = 0; index < itemtextsLength; index++) {
                        this.itemtexts.push(data.getUTFBytes(data.getUint32()));
                    }
                };
                return GuideCoursePayBaseVo;
            }());
            template.GuideCoursePayBaseVo = GuideCoursePayBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=GuideCoursePayBaseVo.js.map