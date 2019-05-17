var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var BuffConfigBaseVo = /** @class */ (function () {
                function BuffConfigBaseVo() {
                    this.specialshow = []; //特殊表现
                }
                BuffConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.inbattle = data.getUint32();
                    this.strshowname = data.getUTFBytes(data.getUint32());
                    this.shapeid = data.getInt32();
                    this.discribe = data.getUTFBytes(data.getUint32());
                    this.effect = data.getUTFBytes(data.getUint32());
                    this.effectsort = data.getUint32();
                    this.wordeffect = data.getUTFBytes(data.getUint32());
                    this.wordsort = data.getUint32();
                    this.cleartype = data.getInt32();
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.specialshow.push(data.getUint32());
                    }
                    this.x = data.getInt32();
                    this.y = data.getInt32();
                    this.scale = data.getFloat64();
                    this.floor = data.getUint32();
                };
                return BuffConfigBaseVo;
            }());
            template.BuffConfigBaseVo = BuffConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=BuffConfigBaseVo.js.map