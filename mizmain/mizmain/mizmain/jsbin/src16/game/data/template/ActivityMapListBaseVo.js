/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ActivityMapListBaseVo = /** @class */ (function () {
                function ActivityMapListBaseVo() {
                }
                ActivityMapListBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.levelmin = data.getUint32();
                    this.levelmax = data.getUint32();
                    this.mapid = data.getUint32();
                };
                return ActivityMapListBaseVo;
            }());
            template.ActivityMapListBaseVo = ActivityMapListBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ActivityMapListBaseVo.js.map