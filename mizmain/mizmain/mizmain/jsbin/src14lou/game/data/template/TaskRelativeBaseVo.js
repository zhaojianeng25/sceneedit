/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var TaskRelativeBaseVo = /** @class */ (function () {
                function TaskRelativeBaseVo() {
                }
                TaskRelativeBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.task = data.getUTFBytes(data.getUint32());
                    this.bCanSale = data.getUint32();
                    this.dbCanSale = data.getUint32();
                    this.readtime = data.getUint32();
                    this.readtext = data.getUTFBytes(data.getUint32());
                    this.usemap = data.getUint32();
                    this.ltx = data.getUint32();
                    this.lty = data.getUint32();
                    this.rbx = data.getUint32();
                    this.rby = data.getUint32();
                    this.caiji = data.getUint32();
                    this.neffectid = data.getUint32();
                    this.treasure = data.getUint32();
                    this.nroleeffectid = data.getUint32();
                    this.neffectposx = data.getUint32();
                    this.neffectposy = data.getUint32();
                };
                return TaskRelativeBaseVo;
            }());
            template.TaskRelativeBaseVo = TaskRelativeBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=TaskRelativeBaseVo.js.map