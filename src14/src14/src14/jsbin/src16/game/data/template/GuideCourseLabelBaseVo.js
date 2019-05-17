/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var GuideCourseLabelBaseVo = /** @class */ (function () {
                function GuideCourseLabelBaseVo() {
                }
                GuideCourseLabelBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.level = data.getUint32();
                };
                return GuideCourseLabelBaseVo;
            }());
            template.GuideCourseLabelBaseVo = GuideCourseLabelBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=GuideCourseLabelBaseVo.js.map