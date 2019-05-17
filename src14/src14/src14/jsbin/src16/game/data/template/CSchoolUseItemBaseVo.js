/**
* @Author: LinQiuWen
* @description:
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CSchoolUseItemBaseVo = /** @class */ (function () {
                function CSchoolUseItemBaseVo() {
                }
                CSchoolUseItemBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.nuseitemgroup = data.getUint32();
                    this.nschoolid = data.getUint32();
                    this.nlvmin = data.getUint32();
                    this.nlvmax = data.getUint32();
                    this.nmapid = data.getUint32();
                    this.nposx = data.getUint32();
                    this.nposy = data.getUint32();
                    this.ndis = data.getUint32();
                    this.nrand = data.getUint32();
                    this.nitemid = data.getUint32();
                };
                return CSchoolUseItemBaseVo;
            }());
            template.CSchoolUseItemBaseVo = CSchoolUseItemBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CSchoolUseItemBaseVo.js.map