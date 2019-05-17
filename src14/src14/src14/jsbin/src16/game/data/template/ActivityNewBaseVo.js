/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ActivityNewBaseVo = /** @class */ (function () {
                function ActivityNewBaseVo() {
                }
                ActivityNewBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.type = data.getUint32();
                    this.level = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.leveltext = data.getUTFBytes(data.getUint32());
                    this.unleveltext = data.getUTFBytes(data.getUint32());
                    this.maxlevel = data.getUint32();
                    this.text = data.getUTFBytes(data.getUint32());
                    this.times = data.getUTFBytes(data.getUint32());
                    this.isshowmaxnum = data.getUint32();
                    this.maxnum = data.getInt32();
                    this.maxact = data.getFloat64();
                    this.link = data.getUint32();
                    this.linkid1 = data.getUint32();
                    this.linkid2 = data.getUint32();
                    this.sort = data.getUint32();
                    this.timetext = data.getUTFBytes(data.getUint32());
                    this.activitylv = data.getUTFBytes(data.getUint32());
                    this.markid = data.getUTFBytes(data.getUint32());
                    this.imgid = data.getUint32();
                    this.getfoodid1 = data.getUint32();
                    this.getfoodid2 = data.getUint32();
                    this.getfoodid3 = data.getUint32();
                    this.getfoodid4 = data.getUint32();
                    this.getfoodid5 = data.getUint32();
                    this.protext = data.getUTFBytes(data.getUint32());
                    this.actid = data.getUTFBytes(data.getUint32());
                    this.starttuijian = data.getUint32();
                    this.actvalue = data.getFloat64();
                    this.serversend = data.getUint32();
                    this.infinitenum = data.getUint32();
                    this.isopen = data.getUint32();
                    this.linkredpackdis = data.getUint32();
                    this.serverid = data.getUTFBytes(data.getUint32());
                };
                return ActivityNewBaseVo;
            }());
            template.ActivityNewBaseVo = ActivityNewBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ActivityNewBaseVo.js.map