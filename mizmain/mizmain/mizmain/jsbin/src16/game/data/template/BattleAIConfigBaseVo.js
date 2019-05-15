/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var BattleAIConfigBaseVo = /** @class */ (function () {
                function BattleAIConfigBaseVo() {
                }
                BattleAIConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.talkinfo = data.getUTFBytes(data.getUint32());
                    this.talkshow = data.getUint32();
                    this.tipsinfo = data.getUTFBytes(data.getUint32());
                    this.appearchange = data.getUint32();
                    this.playeffect = data.getUTFBytes(data.getUint32());
                    this.playsound = data.getUint32();
                    this.changeground = data.getUint32();
                    this.changegroundeffect = data.getUint32();
                    this.speak = data.getUTFBytes(data.getUint32());
                    this.speakshow = data.getUint32();
                    this.speaktime = data.getUTFBytes(data.getUint32());
                    this.effectid = data.getUint32();
                };
                return BattleAIConfigBaseVo;
            }());
            template.BattleAIConfigBaseVo = BattleAIConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=BattleAIConfigBaseVo.js.map