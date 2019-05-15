/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var SchoolSkillitemBaseVo = /** @class */ (function () {
                function SchoolSkillitemBaseVo() {
                }
                SchoolSkillitemBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.skillname = data.getUTFBytes(data.getUint32());
                    this.skillabbrname = data.getUTFBytes(data.getUint32());
                    this.skillsort = data.getUint32();
                    this.sType = data.getUTFBytes(data.getUint32());
                    this.paramA = data.getFloat64();
                    this.paramB = data.getFloat64();
                    this.costA = data.getUTFBytes(data.getUint32());
                    this.paramC = data.getFloat64();
                    this.paramD = data.getFloat64();
                    this.costB = data.getUTFBytes(data.getUint32());
                    this.costTypeA = data.getUint32();
                    this.costTypeB = data.getUint32();
                    this.normalIcon = data.getUint32();
                    var levellimitLength = data.getUint32();
                    this.levellimit = [];
                    for (var index = 0; index < levellimitLength; index++) {
                        this.levellimit.push(data.getUint32());
                    }
                    this.leveldescribezero = data.getUTFBytes(data.getUint32());
                    var leveldescribeLength = data.getUint32();
                    this.leveldescribe = [];
                    for (var index = 0; index < leveldescribeLength; index++) {
                        this.leveldescribe.push(data.getUTFBytes(data.getUint32()));
                    }
                    this.skilldescribe = data.getUTFBytes(data.getUint32());
                    var skilldescribelistLength = data.getUint32();
                    this.skilldescribelist = [];
                    for (var index = 0; index < skilldescribelistLength; index++) {
                        this.skilldescribelist.push(data.getUTFBytes(data.getUint32()));
                    }
                    this.targettype = data.getUint32();
                    this.bCanUseInBattle = data.getUint32();
                    this.effectid = data.getUint32();
                    this.skillScript = data.getUTFBytes(data.getUint32());
                    this.frienddegree = data.getUint32();
                };
                return SchoolSkillitemBaseVo;
            }());
            template.SchoolSkillitemBaseVo = SchoolSkillitemBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=SchoolSkillitemBaseVo.js.map