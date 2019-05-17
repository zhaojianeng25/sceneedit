var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CNpcShapeBaseVo = /** @class */ (function () {
                function CNpcShapeBaseVo() {
                    this.part0 = []; //部件1
                    this.part1 = []; //部件2
                    this.part2 = []; //部件3
                }
                CNpcShapeBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.shape = data.getUTFBytes(data.getUint32());
                    this.roleimage = data.getUTFBytes(data.getUint32());
                    this.headID = data.getUint32();
                    this.littleheadID = data.getUint32();
                    this.mapheadID = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.dir = data.getUint32();
                    this.hitmove = data.getUint32();
                    this.shadow = data.getUint32();
                    this.attack = data.getUTFBytes(data.getUint32());
                    this.magic = data.getUTFBytes(data.getUint32());
                    this.nearorfar = data.getUint32(); //是否yuanc
                    this.shadertype = data.getUint32(); //是否
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.part0.push(data.getUint32());
                    }
                    listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.part1.push(data.getUint32());
                    }
                    listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.part2.push(data.getUint32());
                    }
                    this.showWeaponId = data.getUint32();
                    this.showHorseShape = data.getUint32();
                };
                return CNpcShapeBaseVo;
            }());
            template.CNpcShapeBaseVo = CNpcShapeBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CNpcShapeBaseVo.js.map