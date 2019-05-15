var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ResolutionBaseVo = /** @class */ (function () {
                function ResolutionBaseVo() {
                    this.positionsByresolution = []; //点位1,点位2,点位3,点位4,点位5,点位6,点位7,点位8,点位9,点位10,点位11,点位12,点位13,点位14,点位15,点位16,点位17,点位18,点位19,点位20,点位21,点位22,点位23,点位24,点位25,点位26,点位27,点位28
                    this.positionsBywatch = []; //观战点位1,观战点位2,观战点位3,观战点位4,观战点位5,观战点位6,观战点位7,观战点位8,观战点位9,观战点位10
                }
                ResolutionBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.number = data.getUint32();
                    this.longa = data.getUint32();
                    this.wide = data.getUint32();
                    this.description = data.getUTFBytes(data.getUint32());
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.positionsByresolution.push(data.getUTFBytes(data.getUint32()));
                        //console.log(data.getUTFBytes(data.getUint32()));				
                    }
                    var listCount1 = data.getUint32();
                    for (var index = 0; index < listCount1; index++) {
                        this.positionsBywatch.push(data.getUTFBytes(data.getUint32()));
                        //console.log(data.getUTFBytes(data.getUint32()));				
                    }
                    this.positionsByme = data.getUTFBytes(data.getUint32());
                    this.positionsBytarget = data.getUTFBytes(data.getUint32());
                };
                return ResolutionBaseVo;
            }());
            template.ResolutionBaseVo = ResolutionBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ResolutionBaseVo.js.map