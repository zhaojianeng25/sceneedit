/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var TaskNodeBaseVo = /** @class */ (function () {
                function TaskNodeBaseVo() {
                }
                TaskNodeBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.text = data.getUTFBytes(data.getUint32());
                    var taskIDLength = data.getUint32();
                    this.taskID = [];
                    for (var index = 0; index < taskIDLength; index++) {
                        this.taskID.push(data.getUTFBytes(data.getUint32()));
                    }
                };
                return TaskNodeBaseVo;
            }());
            template.TaskNodeBaseVo = TaskNodeBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=TaskNodeBaseVo.js.map