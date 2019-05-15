/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var RoleRColorConfigBaseVo = /** @class */ (function () {
                function RoleRColorConfigBaseVo() {
                    this.colorlist = [];
                }
                RoleRColorConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.rolepos = data.getUint32();
                    this.modeltype = data.getUint32();
                    this.res = data.getUint32();
                    this.itemcode = data.getUint32();
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        //console.log(data.getUTFBytes(data.getUint32()));
                        this.colorlist.push(data.getUTFBytes(data.getUint32()));
                    }
                    this.itemnum = data.getUint32();
                };
                return RoleRColorConfigBaseVo;
            }());
            template.RoleRColorConfigBaseVo = RoleRColorConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleRColorConfigBaseVo.js.map