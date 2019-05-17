//CNPCConfigBaseVo
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CNPCConfigBaseVo = /** @class */ (function () {
                function CNPCConfigBaseVo() {
                    this.chitchatidlist = []; //chitchat1,chitchat2,chitchat3,chitchat4,chitchat5
                    this.voices = []; //声音1,声音2,声音3,声音4
                }
                CNPCConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    // this.bodytype = data.getUint32();
                    this.bodytype = data.getFloat64();
                    this.npctype = data.getUint32();
                    this.modelID = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.minimapquery = data.getUTFBytes(data.getUint32());
                    this.minimapshow = data.getUTFBytes(data.getUint32());
                    this.foottitle = data.getUTFBytes(data.getUint32());
                    this.headtitle = data.getUTFBytes(data.getUint32());
                    this.title = data.getUTFBytes(data.getUint32());
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.chitchatidlist.push(data.getUint32());
                    }
                    this.area1colour = data.getUint32();
                    this.area2colour = data.getUint32();
                    this.mapid = data.getUint32();
                    this.xPos = data.getUint32();
                    this.yPos = data.getUint32();
                    this.hide = data.getUint32();
                    // let length: number = data.getUint32();
                    listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.voices.push(data.getUTFBytes(data.getUint32()));
                    }
                    this.ndir = data.getUint32();
                    this.nstate = data.getUint32();
                    this.time = data.getUint32();
                };
                return CNPCConfigBaseVo;
            }());
            template.CNPCConfigBaseVo = CNPCConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CNPCConfigBaseVo.js.map