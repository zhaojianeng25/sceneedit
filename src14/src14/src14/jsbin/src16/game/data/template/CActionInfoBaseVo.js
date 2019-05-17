var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CActionInfoBaseVo = /** @class */ (function () {
                function CActionInfoBaseVo() {
                }
                CActionInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.model = data.getUTFBytes(data.getUint32());
                    this.weapon = data.getUint32();
                    this.attack = data.getUTFBytes(data.getUint32());
                    this.magic = data.getUTFBytes(data.getUint32());
                    this.attacked = data.getUTFBytes(data.getUint32());
                    this.dying = data.getUTFBytes(data.getUint32());
                    this.death = data.getUTFBytes(data.getUint32());
                    this.defence = data.getUTFBytes(data.getUint32());
                    this.run = data.getUTFBytes(data.getUint32());
                    this.battlestand = data.getUTFBytes(data.getUint32());
                    this.stand = data.getUTFBytes(data.getUint32());
                    this.ridrun = data.getUTFBytes(data.getUint32());
                    this.ridstand = data.getUTFBytes(data.getUint32());
                };
                return CActionInfoBaseVo;
            }());
            template.CActionInfoBaseVo = CActionInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CActionInfoBaseVo.js.map