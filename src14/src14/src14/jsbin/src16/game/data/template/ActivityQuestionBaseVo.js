/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ActivityQuestionBaseVo = /** @class */ (function () {
                function ActivityQuestionBaseVo() {
                }
                ActivityQuestionBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.questionid = data.getUint32();
                    this.step = data.getUint32();
                    this.question = data.getUTFBytes(data.getUint32());
                    this.answer1 = data.getUTFBytes(data.getUint32());
                    this.answer2 = data.getUTFBytes(data.getUint32());
                    this.answer3 = data.getUTFBytes(data.getUint32());
                    this.rightrewardid = data.getUint32();
                    this.errorrewardid = data.getUint32();
                };
                return ActivityQuestionBaseVo;
            }());
            template.ActivityQuestionBaseVo = ActivityQuestionBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ActivityQuestionBaseVo.js.map