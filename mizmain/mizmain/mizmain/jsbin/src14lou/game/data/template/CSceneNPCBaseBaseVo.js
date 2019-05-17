var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CSceneNPCBaseBaseVo = /** @class */ (function () {
                function CSceneNPCBaseBaseVo() {
                    this.chatidlist = []; //chitchat1,chitchat2,chitchat3
                }
                CSceneNPCBaseBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.shapeid = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.type = data.getUint32();
                    this.npcappear = data.getUTFBytes(data.getUint32());
                    this.namnpcdisappeare = data.getUTFBytes(data.getUint32());
                    this.scale = data.getUint32();
                    this.area1colour = data.getUint32();
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.chatidlist.push(data.getUint32());
                    }
                    this.mask = data.getUint32();
                    this.transparent = data.getUint32();
                };
                return CSceneNPCBaseBaseVo;
            }());
            template.CSceneNPCBaseBaseVo = CSceneNPCBaseBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CSceneNPCBaseBaseVo.js.map