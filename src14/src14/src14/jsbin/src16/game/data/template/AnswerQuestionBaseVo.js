/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var AnswerQuestionBaseVo = /** @class */ (function () {
                function AnswerQuestionBaseVo() {
                }
                AnswerQuestionBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.topic = data.getUint32();
                    this.step = data.getUint32();
                    this.title = data.getUTFBytes(data.getUint32());
                    this.object1 = data.getUTFBytes(data.getUint32());
                    this.image1 = data.getUint32();
                    this.icon1 = data.getUint32();
                    this.object2 = data.getUTFBytes(data.getUint32());
                    this.image2 = data.getUint32();
                    this.icon2 = data.getUint32();
                    this.object3 = data.getUTFBytes(data.getUint32());
                    this.image3 = data.getUint32();
                    this.icon3 = data.getUint32();
                    this.trueanswer = data.getUint32();
                    this.truereward = data.getUint32();
                    this.falsereward = data.getUint32();
                };
                return AnswerQuestionBaseVo;
            }());
            template.AnswerQuestionBaseVo = AnswerQuestionBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=AnswerQuestionBaseVo.js.map