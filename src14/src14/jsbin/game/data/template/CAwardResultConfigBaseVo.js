/**
* CAwardResultConfigBaseVO
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CAwardResultConfigBaseVo = /** @class */ (function () {
                function CAwardResultConfigBaseVo() {
                }
                CAwardResultConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.propertyId = data.getUint32();
                    this.result = data.getUTFBytes(data.getUint32());
                };
                return CAwardResultConfigBaseVo;
            }());
            template.CAwardResultConfigBaseVo = CAwardResultConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CAwardResultConfigBaseVo.js.map