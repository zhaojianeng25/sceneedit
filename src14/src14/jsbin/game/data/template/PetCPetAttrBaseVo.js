/**
* name c宠物基本数据
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PetCPetAttrBaseVo = /** @class */ (function () {
                function PetCPetAttrBaseVo() {
                    this.growrate = new Array();
                    this.addpoint = new Array();
                    this.skillid = new Array();
                    this.skillrate = new Array();
                    this.isbindskill = new Array();
                }
                PetCPetAttrBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.colour = data.getUTFBytes(data.getUint32());
                    this.quality = data.getUint32();
                    this.unusualid = data.getUint32();
                    this.modelid = data.getUint32();
                    this.whethershow = data.getUint32();
                    this.kind = data.getUint32();
                    this.uselevel = data.getUint32();
                    this.takelevel = data.getUint32();
                    this.area1colour = data.getUint32();
                    this.area2colour = data.getUint32();
                    this.life = data.getUint32();
                    this.attackaptmin = data.getUint32();
                    this.attackaptmax = data.getUint32();
                    this.defendaptmin = data.getUint32();
                    this.defendaptmax = data.getUint32();
                    this.phyforceaptmin = data.getUint32();
                    this.phyforceaptmax = data.getUint32();
                    this.magicaptmin = data.getUint32();
                    this.magicaptmax = data.getUint32();
                    this.speedaptmin = data.getUint32();
                    this.speedaptmax = data.getUint32();
                    var listCount1 = data.getUint32();
                    for (var index = 0; index < listCount1; index++) {
                        this.growrate.push(data.getUint32());
                    }
                    var listCount2 = data.getUint32();
                    for (var index = 0; index < listCount2; index++) {
                        this.addpoint.push(data.getUint32());
                    }
                    var listCount3 = data.getUint32();
                    for (var index = 0; index < listCount3; index++) {
                        this.skillid.push(data.getUint32());
                    }
                    var listCount4 = data.getUint32();
                    for (var index = 0; index < listCount4; index++) {
                        this.skillrate.push(data.getUint32());
                    }
                    this.washitemid = data.getUint32();
                    this.washitemnum = data.getUint32();
                    this.washnewpetid = data.getUTFBytes(data.getUint32());
                    this.certificationcost = data.getUint32();
                    this.cancelcertificationcost = data.getUint32();
                    this.thewildid = data.getUint32();
                    this.thebabyid = data.getUint32();
                    this.thebianyiid = data.getUint32();
                    this.bornmapid = data.getUint32();
                    this.bornmapdes = data.getUTFBytes(data.getUint32());
                    this.treasureScore = data.getUint32();
                    this.nshoptype = data.getUint32();
                    this.nshopnpcid = data.getUint32();
                    this.treasureskillnums = data.getUint32();
                    this.nskillnumfull = data.getUint32();
                    this.dyelist = data.getUTFBytes(data.getUint32());
                    this.marketfreezetime = data.getUint32();
                    var listCount5 = data.getUint32();
                    for (var index = 0; index < listCount5; index++) {
                        this.isbindskill.push(data.getUint32());
                    }
                    this.pointcardisshow = data.getUint32();
                    this.pointcardbornmapid = data.getUint32();
                    this.pointcardbornmapdes = data.getUTFBytes(data.getUint32());
                };
                return PetCPetAttrBaseVo;
            }());
            template.PetCPetAttrBaseVo = PetCPetAttrBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PetCPetAttrBaseVo.js.map