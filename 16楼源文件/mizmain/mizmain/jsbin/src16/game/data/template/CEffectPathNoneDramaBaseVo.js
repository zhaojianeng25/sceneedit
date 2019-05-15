/**
* name  t特效路径表_非剧情
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CEffectPathNoneDramaBaseVo = /** @class */ (function () {
                function CEffectPathNoneDramaBaseVo() {
                }
                CEffectPathNoneDramaBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.Path = data.getUTFBytes(data.getUint32());
                };
                return CEffectPathNoneDramaBaseVo;
            }());
            template.CEffectPathNoneDramaBaseVo = CEffectPathNoneDramaBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CEffectPathNoneDramaBaseVo.js.map