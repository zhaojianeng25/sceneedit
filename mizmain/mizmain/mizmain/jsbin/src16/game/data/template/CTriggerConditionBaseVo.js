var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CTriggerConditionBaseVo = /** @class */ (function () {
                function CTriggerConditionBaseVo() {
                    this.params = []; //参数1,参数2,参数3,参数4,参数5
                }
                CTriggerConditionBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.type = data.getUint32();
                    this.school = data.getUint32();
                    this.level = data.getUint32();
                    this.quest = data.getUint32();
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.params.push(data.getUint32());
                    }
                    this.spot = data.getUint32();
                    this.taskiprgbartimed = data.getUint32();
                    this.prgbartext = data.getUTFBytes(data.getUint32());
                };
                return CTriggerConditionBaseVo;
            }());
            template.CTriggerConditionBaseVo = CTriggerConditionBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CTriggerConditionBaseVo.js.map