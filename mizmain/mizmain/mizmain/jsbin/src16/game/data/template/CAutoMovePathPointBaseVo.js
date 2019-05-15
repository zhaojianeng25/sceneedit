/**
* name  x巡游配置/x巡游路径子地图表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CAutoMovePathPointBaseVo = /** @class */ (function () {
                function CAutoMovePathPointBaseVo() {
                    this.points = []; //寻路点1,寻路点2,寻路点3,寻路点4,寻路点5,寻路点6,寻路点7,寻路点8,寻路点9,寻路点10,寻路点11,寻路点12,寻路点13,寻路点14,寻路点15,寻路点16,寻路点17,寻路点18,寻路点19,寻路点20	
                }
                CAutoMovePathPointBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.ridename = data.getUTFBytes(data.getUint32());
                    this.effectname = data.getUTFBytes(data.getUint32());
                    this.cameraz = data.getUint32();
                    this.speed = data.getUint32();
                    this.paths = data.getUint32();
                    this.pointcount = data.getUint32();
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.points.push(data.getUTFBytes(data.getUint32()));
                        // console.log(data.getUTFBytes(data.getUint32()));				
                    }
                };
                return CAutoMovePathPointBaseVo;
            }());
            template.CAutoMovePathPointBaseVo = CAutoMovePathPointBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CAutoMovePathPointBaseVo.js.map