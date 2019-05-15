/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var EquipRefineInfo_PointCardBaseVo = /** @class */ (function () {
                function EquipRefineInfo_PointCardBaseVo() {
                }
                EquipRefineInfo_PointCardBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.cailiaoid = data.getUint32();
                    this.cailiaonum = data.getUint32();
                    this.moneytype = data.getUint32();
                    this.moneynum = data.getUint32();
                    this.allcailiaoid = data.getUint32();
                    this.allcailiaonum = data.getUint32();
                    this.allmoneytype = data.getUint32();
                    this.allmoneynum = data.getUint32();
                    var refineid1Length = data.getUint32();
                    this.refineid1 = [];
                    for (var index = 0; index < refineid1Length; index++) {
                        this.refineid1.push(data.getUTFBytes(data.getUint32()));
                    }
                    var refinerate1Length = data.getUint32();
                    this.refinerate1 = [];
                    for (var index = 0; index < refinerate1Length; index++) {
                        this.refinerate1.push(data.getUTFBytes(data.getUint32()));
                    }
                    var refineid2Length = data.getUint32();
                    this.refineid2 = [];
                    for (var index = 0; index < refineid2Length; index++) {
                        this.refineid2.push(data.getUTFBytes(data.getUint32()));
                    }
                    var refinerate2Length = data.getUint32();
                    this.refinerate2 = [];
                    for (var index = 0; index < refinerate2Length; index++) {
                        this.refinerate2.push(data.getUTFBytes(data.getUint32()));
                    }
                    var refineid3Length = data.getUint32();
                    this.refineid3 = [];
                    for (var index = 0; index < refineid3Length; index++) {
                        this.refineid3.push(data.getUTFBytes(data.getUint32()));
                    }
                    var refinerate3Length = data.getUint32();
                    this.refinerate3 = [];
                    for (var index = 0; index < refinerate3Length; index++) {
                        this.refinerate3.push(data.getUTFBytes(data.getUint32()));
                    }
                };
                return EquipRefineInfo_PointCardBaseVo;
            }());
            template.EquipRefineInfo_PointCardBaseVo = EquipRefineInfo_PointCardBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipRefineInfo_PointCardBaseVo.js.map