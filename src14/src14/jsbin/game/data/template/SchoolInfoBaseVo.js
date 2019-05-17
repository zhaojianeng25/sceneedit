/**
* @Author: LinQiuWen
* @description:z职业配置表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var SchoolInfoBaseVo = /** @class */ (function () {
                function SchoolInfoBaseVo() {
                    this.addpoint = []; //推荐体1,推荐智1,推荐力1,推荐耐1,推荐敏1
                    this.addpoint2 = []; //推荐体2,推荐智2,推荐力2,推荐耐2,推荐敏2
                    this.addpoint3 = []; //推荐体3,推荐智3,推荐力3,推荐耐3,推荐敏3
                }
                SchoolInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.englishName = data.getUTFBytes(data.getUint32());
                    this.describe = data.getUTFBytes(data.getUint32());
                    this.schoolicon = data.getUTFBytes(data.getUint32());
                    this.schoolback = data.getUTFBytes(data.getUint32());
                    this.schoolmapid = data.getUint32();
                    this.schooljobmapid = data.getUint32();
                    this.scheme = data.getUTFBytes(data.getUint32());
                    this.explain = data.getUTFBytes(data.getUint32());
                    var addpointLength = data.getUint32();
                    for (var index = 0; index < addpointLength; index++) {
                        this.addpoint.push(data.getUint32());
                    }
                    this.scheme2 = data.getUTFBytes(data.getUint32());
                    this.explain2 = data.getUTFBytes(data.getUint32());
                    var addpoint2Length = data.getUint32();
                    for (var index = 0; index < addpoint2Length; index++) {
                        this.addpoint2.push(data.getUint32());
                    }
                    this.scheme3 = data.getUTFBytes(data.getUint32());
                    this.explain3 = data.getUTFBytes(data.getUint32());
                    var addpoint3Length = data.getUint32();
                    for (var index = 0; index < addpoint3Length; index++) {
                        this.addpoint3.push(data.getUint32());
                    }
                    this.schooliconpath = data.getUTFBytes(data.getUint32());
                    this.jobtype = data.getUint32();
                    this.normalbtnimage = data.getUTFBytes(data.getUint32());
                    this.pushbtnimage = data.getUTFBytes(data.getUint32());
                    this.schoolpicpath = data.getUTFBytes(data.getUint32());
                };
                return SchoolInfoBaseVo;
            }());
            template.SchoolInfoBaseVo = SchoolInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=SchoolInfoBaseVo.js.map