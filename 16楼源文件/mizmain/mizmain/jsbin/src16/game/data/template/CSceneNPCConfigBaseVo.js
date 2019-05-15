var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CSceneNPCConfigBaseVo = /** @class */ (function () {
                function CSceneNPCConfigBaseVo() {
                }
                CSceneNPCConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.baseid = data.getUint32();
                    this.mapid = data.getUint32();
                    this.posx = data.getUint32();
                    this.posy = data.getUint32();
                    this.dir = data.getUint32();
                    this.talkinterval = data.getUint32();
                    this.talkintervalsays = data.getUTFBytes(data.getUint32());
                    this.talkdistance = data.getUint32();
                    this.talkdistancesays = data.getUTFBytes(data.getUint32());
                    this.talkcharnum = data.getUint32();
                    this.talkcharnumsays = data.getUTFBytes(data.getUint32());
                    this.pacing = data.getUint32();
                    this.movespeed = data.getUint32();
                    this.mask = data.getUint32();
                    this.transparent = data.getUint32();
                };
                return CSceneNPCConfigBaseVo;
            }());
            template.CSceneNPCConfigBaseVo = CSceneNPCConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CSceneNPCConfigBaseVo.js.map