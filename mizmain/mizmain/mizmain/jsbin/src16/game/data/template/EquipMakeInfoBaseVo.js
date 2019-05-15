/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var EquipMakeInfoBaseVo = /** @class */ (function () {
                function EquipMakeInfoBaseVo() {
                }
                EquipMakeInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.nlevel = data.getUint32();
                    this.type = data.getUint32();
                    this.tuzhiid = data.getUint32();
                    this.tuzhinum = data.getUint32();
                    this.hantieid = data.getUint32();
                    this.hantienum = data.getUint32();
                    this.zhizaofuid = data.getUint32();
                    this.zhizaofunum = data.getUint32();
                    this.qianghuaid = data.getUint32();
                    this.qianghuanum = data.getUint32();
                    this.moneynum = data.getUint32();
                    this.moneytype = data.getUint32();
                    this.chanchuequipid = data.getUint32();
                    var vptdazhaoidLength = data.getUint32();
                    this.vptdazhaoid = [];
                    for (var index = 0; index < vptdazhaoidLength; index++) {
                        this.vptdazhaoid.push(data.getUint32());
                    }
                    var vptdazhaorateLength = data.getUint32();
                    this.vptdazhaorate = [];
                    for (var index = 0; index < vptdazhaorateLength; index++) {
                        this.vptdazhaorate.push(data.getUint32());
                    }
                    var vqhdazhaoidLength = data.getUint32();
                    this.vqhdazhaoid = [];
                    for (var index = 0; index < vqhdazhaoidLength; index++) {
                        this.vqhdazhaoid.push(data.getUint32());
                    }
                    var vqhdazhaorateLength = data.getUint32();
                    this.vqhdazhaorate = [];
                    for (var index = 0; index < vqhdazhaorateLength; index++) {
                        this.vqhdazhaorate.push(data.getUint32());
                    }
                    var vcailiaotieLength = data.getUint32();
                    this.vcailiaotie = [];
                    for (var index = 0; index < vcailiaotieLength; index++) {
                        this.vcailiaotie.push(data.getUint32());
                    }
                    var vcailiaotienumLength = data.getUint32();
                    this.vcailiaotienum = [];
                    for (var index = 0; index < vcailiaotienumLength; index++) {
                        this.vcailiaotienum.push(data.getUint32());
                    }
                    var vcailiaozhizaofuLength = data.getUint32();
                    this.vcailiaozhizaofu = [];
                    for (var index = 0; index < vcailiaozhizaofuLength; index++) {
                        this.vcailiaozhizaofu.push(data.getUint32());
                    }
                    var vcailiaozhizaofunumLength = data.getUint32();
                    this.vcailiaozhizaofunum = [];
                    for (var index = 0; index < vcailiaozhizaofunumLength; index++) {
                        this.vcailiaozhizaofunum.push(data.getUint32());
                    }
                };
                return EquipMakeInfoBaseVo;
            }());
            template.EquipMakeInfoBaseVo = EquipMakeInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipMakeInfoBaseVo.js.map