/**
* name g公会职务以及权限表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ClanCFactionPositionBaseVo = /** @class */ (function () {
                function ClanCFactionPositionBaseVo() {
                }
                ClanCFactionPositionBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.posname = data.getUTFBytes(data.getUint32());
                    this.poslevel = data.getUint32();
                    this.changefactionname = data.getUint32();
                    this.isrecvxuetu = data.getUint32();
                    this.changeidea = data.getUint32();
                    this.selectchanyao = data.getUint32();
                    this.clearapplylist = data.getUint32();
                    this.renming = data.getUint32();
                    this.jinyan = data.getUint32();
                    this.tichu = data.getUint32();
                    this.qunfa = data.getUint32();
                    this.fenhong = data.getUint32();
                    this.cansai = data.getUint32();
                    this.yaoqing = data.getUint32();
                    this.gonghuipindao = data.getUint32();
                    this.wanchenggonghuirenwu = data.getUint32();
                    this.canyuhuodong = data.getUint32();
                    this.fuli = data.getUint32();
                };
                return ClanCFactionPositionBaseVo;
            }());
            template.ClanCFactionPositionBaseVo = ClanCFactionPositionBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ClanCFactionPositionBaseVo.js.map