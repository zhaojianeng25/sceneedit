/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var GemEffectBaseVo = /** @class */ (function () {
                function GemEffectBaseVo() {
                }
                GemEffectBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    var equiptypeLength = data.getUint32();
                    this.equiptype = [];
                    for (var index = 0; index < equiptypeLength; index++) {
                        this.equiptype.push(data.getUint32());
                    }
                    var effecttypeLength = data.getUint32();
                    this.effecttype = [];
                    for (var index = 0; index < effecttypeLength; index++) {
                        this.effecttype.push(data.getUint32());
                    }
                    var effectLength = data.getUint32();
                    this.effect = [];
                    for (var index = 0; index < effectLength; index++) {
                        this.effect.push(data.getUint32());
                    }
                    this.tipsicon = data.getUTFBytes(data.getUint32());
                    this.tipsemotion = data.getUint32();
                    this.genegemid = data.getUint32();
                    this.successrate = data.getUint32();
                    this.bCanSale = data.getUint32();
                    this.dbCanSale = data.getUint32();
                    this.effectdes = data.getUTFBytes(data.getUint32());
                    this.inlaypos = data.getUTFBytes(data.getUint32());
                    this.inlayeffect = data.getUTFBytes(data.getUint32());
                    this.ngemtype = data.getUint32();
                    this.treasure = data.getUint32();
                    this.level = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.ncanfenjie = data.getUint32();
                    this.nfenjieid = data.getUint32();
                    this.nfenjienum = data.getUint32();
                };
                return GemEffectBaseVo;
            }());
            template.GemEffectBaseVo = GemEffectBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=GemEffectBaseVo.js.map