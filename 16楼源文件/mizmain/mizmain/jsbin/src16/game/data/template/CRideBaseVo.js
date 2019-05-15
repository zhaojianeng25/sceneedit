//CRideBaseVo.ts
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CRideBaseVo = /** @class */ (function () {
                function CRideBaseVo() {
                }
                CRideBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.ridemodel = data.getUint32();
                    this.speed = data.getUint32();
                    this.effectId = data.getUint32();
                    this.effectPosX = data.getUint32();
                    this.effectPosY = data.getUint32();
                };
                return CRideBaseVo;
            }());
            template.CRideBaseVo = CRideBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CRideBaseVo.js.map