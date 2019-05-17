var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CRideItemBaseVo = /** @class */ (function () {
                function CRideItemBaseVo() {
                }
                CRideItemBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.rideid = data.getUint32();
                };
                return CRideItemBaseVo;
            }());
            template.CRideItemBaseVo = CRideItemBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CRideItemBaseVo.js.map