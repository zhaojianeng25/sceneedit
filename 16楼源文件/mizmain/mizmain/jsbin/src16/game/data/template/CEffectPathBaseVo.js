/**
* name  t特效路径表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CEffectPathBaseVo = /** @class */ (function () {
                function CEffectPathBaseVo() {
                }
                CEffectPathBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.Name = data.getUTFBytes(data.getUint32());
                    this.Patn = data.getUTFBytes(data.getUint32());
                };
                return CEffectPathBaseVo;
            }());
            template.CEffectPathBaseVo = CEffectPathBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CEffectPathBaseVo.js.map