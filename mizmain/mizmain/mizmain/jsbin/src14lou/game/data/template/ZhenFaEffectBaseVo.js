var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ZhenFaEffectBaseVo = /** @class */ (function () {
                function ZhenFaEffectBaseVo() {
                    //  public actionid:number;
                    this.descirbe = []; //描述1,描述2,描述3,描述4,描述5,描述6,描述7,描述8,描述9,描述10
                }
                ZhenFaEffectBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.zhenfaid = data.getUint32();
                    this.zhenfaLv = data.getUint32();
                    this.needexp = data.getUint32();
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.descirbe.push(data.getUTFBytes(data.getUint32()));
                    }
                };
                return ZhenFaEffectBaseVo;
            }());
            template.ZhenFaEffectBaseVo = ZhenFaEffectBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ZhenFaEffectBaseVo.js.map