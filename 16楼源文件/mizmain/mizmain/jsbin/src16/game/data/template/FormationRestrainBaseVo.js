/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var FormationRestrainBaseVo = /** @class */ (function () {
                function FormationRestrainBaseVo() {
                }
                FormationRestrainBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.restrain1 = data.getUTFBytes(data.getUint32());
                    this.restrainArg1 = data.getUTFBytes(data.getUint32());
                    this.restrain2 = data.getUTFBytes(data.getUint32());
                    this.restrainArg2 = data.getUTFBytes(data.getUint32());
                    this.beRestrained1 = data.getUTFBytes(data.getUint32());
                    this.beRestrainedArg1 = data.getUTFBytes(data.getUint32());
                    this.beRestrained2 = data.getUTFBytes(data.getUint32());
                    this.beRestrainedArg2 = data.getUTFBytes(data.getUint32());
                };
                return FormationRestrainBaseVo;
            }());
            template.FormationRestrainBaseVo = FormationRestrainBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=FormationRestrainBaseVo.js.map