/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var EquipItemAttrBaseVo = /** @class */ (function () {
                function EquipItemAttrBaseVo() {
                }
                EquipItemAttrBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.addhpmax = data.getUint32();
                    this.addmpmax = data.getUint32();
                    this.addwaigongshuanghai = data.getUint32();
                    this.addniegongshanghai = data.getUint32();
                    this.addniegongdefence = data.getUint32();
                    this.addwaigongdefence = data.getUint32();
                    this.addmingzhong = data.getUint32();
                    this.addduoshan = data.getUint32();
                    this.addspeed = data.getUint32();
                    this.addfengyin = data.getUint32();
                    this.fengyinkangxing = data.getUint32();
                    this.equipqianzhui = data.getUint32();
                    var appendAttridLength = data.getUint32();
                    this.appendAttrid = [];
                    for (var index = 0; index < appendAttridLength; index++) {
                        this.appendAttrid.push(data.getUint32());
                    }
                    var appendAttrValueLength = data.getUint32();
                    this.appendAttrValue = [];
                    for (var index = 0; index < appendAttrValueLength; index++) {
                        this.appendAttrValue.push(data.getUint32());
                    }
                    var roleNeedLength = data.getUint32();
                    this.roleNeed = [];
                    for (var index = 0; index < roleNeedLength; index++) {
                        this.roleNeed.push(data.getUint32());
                    }
                    this.saleratio = data.getUint32();
                    this.naijiuratio = data.getUint32();
                    this.cuilianlv = data.getUint32();
                    this.naijiumax = data.getUint32();
                    this.ptxlfailrate = data.getUint32();
                    this.ptxlcailiaoid = data.getUint32();
                    this.ptxlcailiaonum = data.getUint32();
                    var commonidlistLength = data.getUint32();
                    this.commonidlist = [];
                    for (var index = 0; index < commonidlistLength; index++) {
                        this.commonidlist.push(data.getUint32());
                    }
                    var commonnumlistLength = data.getUint32();
                    this.commonnumlist = [];
                    for (var index = 0; index < commonnumlistLength; index++) {
                        this.commonnumlist.push(data.getUint32());
                    }
                    this.tsxlcailiaoid = data.getUint32();
                    this.tsxlcailiaonum = data.getUint32();
                    this.ptxlmoneynum = data.getUint32();
                    this.ptxlmoneytype = data.getUint32();
                    this.tsxlmoneynum = data.getUint32();
                    this.tsxlmoneytype = data.getUint32();
                    this.gemsLevel = data.getUint32();
                    this.hols = data.getUint32();
                    var vgemboxlevelLength = data.getUint32();
                    this.vgemboxlevel = [];
                    for (var index = 0; index < vgemboxlevelLength; index++) {
                        this.vgemboxlevel.push(data.getUint32());
                    }
                    var gemsLength = data.getUint32();
                    this.gems = [];
                    for (var index = 0; index < gemsLength; index++) {
                        this.gems.push(data.getUint32());
                    }
                    this.needSex = data.getUint32();
                    this.equipcolor = data.getUint32();
                    this.suiting = data.getUint32();
                    this.skillid = data.getUTFBytes(data.getUint32());
                    this.effectid = data.getUTFBytes(data.getUint32());
                    this.jianding = data.getUint32();
                    this.specialAttr = data.getUint32();
                    this.baseAttrId = data.getUint32();
                    this.randomAttrId = data.getUTFBytes(data.getUint32());
                    this.randomSkillId = data.getUint32();
                    this.randomEffectId = data.getUint32();
                    var vgemtypeLength = data.getUint32();
                    this.vgemtype = [];
                    for (var index = 0; index < vgemtypeLength; index++) {
                        this.vgemtype.push(data.getUint32());
                    }
                    this.eequiptype = data.getUint32();
                    this.treasureScore = data.getUint32();
                    this.nautoeffect = data.getUint32();
                    this.ncanfenjie = data.getUint32();
                };
                return EquipItemAttrBaseVo;
            }());
            template.EquipItemAttrBaseVo = EquipItemAttrBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipItemAttrBaseVo.js.map