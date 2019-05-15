/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var TasktrackingorderBaseVo = /** @class */ (function () {
                function TasktrackingorderBaseVo() {
                }
                TasktrackingorderBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.mintaskid = data.getUint32();
                    this.maxtaskid = data.getUint32();
                    this.priority = data.getUint32();
                };
                return TasktrackingorderBaseVo;
            }());
            template.TasktrackingorderBaseVo = TasktrackingorderBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=TasktrackingorderBaseVo.js.map