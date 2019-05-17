/**
* @Author: LinQiuWen
* @description:j角色创建配置
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CreateRoleConfigBaseVo = /** @class */ (function () {
                function CreateRoleConfigBaseVo() {
                    this.schools = []; // 职业1ID,职业2ID,职业3ID
                    this.weapons = []; //默认武器1ID,默认武器2ID,默认武器3ID
                }
                CreateRoleConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.sex = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.englishname = data.getUTFBytes(data.getUint32());
                    this.describe = data.getUTFBytes(data.getUint32());
                    var schoolsLength = data.getUint32();
                    for (var index = 0; index < schoolsLength; index++) {
                        this.schools.push(data.getUint32());
                    }
                    var weaponsLength = data.getUint32();
                    for (var index = 0; index < weaponsLength; index++) {
                        this.weapons.push(data.getUint32());
                    }
                    this.model = data.getUint32();
                    this.roleimage = data.getUTFBytes(data.getUint32());
                    this.schoolimg1 = data.getUTFBytes(data.getUint32());
                    this.schoolimg2 = data.getUTFBytes(data.getUint32());
                    this.schoolimg3 = data.getUTFBytes(data.getUint32());
                    this.diwenimg1 = data.getUTFBytes(data.getUint32());
                    this.diwenimg2 = data.getUTFBytes(data.getUint32());
                    this.diwenimg3 = data.getUTFBytes(data.getUint32());
                    this.headimg = data.getUTFBytes(data.getUint32());
                    this.surebtnimg = data.getUTFBytes(data.getUint32());
                    this.returnimg = data.getUTFBytes(data.getUint32());
                    this.leftbtnimg = data.getUTFBytes(data.getUint32());
                    this.rightbtnimg = data.getUTFBytes(data.getUint32());
                    this.bgimg = data.getUTFBytes(data.getUint32());
                    this.bgbandimg = data.getUTFBytes(data.getUint32());
                    this.effectOnTop = data.getUTFBytes(data.getUint32());
                    this.effectOnBottom = data.getUTFBytes(data.getUint32());
                    this.xuanzezhiyeimg = data.getUTFBytes(data.getUint32());
                    this.pagedotimg = data.getUTFBytes(data.getUint32());
                    this.smallflag = data.getUTFBytes(data.getUint32());
                    this.flageffect = data.getUTFBytes(data.getUint32());
                    this.spine = data.getUTFBytes(data.getUint32());
                    this.topflag = data.getUTFBytes(data.getUint32());
                    this.halficon = data.getUTFBytes(data.getUint32());
                };
                return CreateRoleConfigBaseVo;
            }());
            template.CreateRoleConfigBaseVo = CreateRoleConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CreateRoleConfigBaseVo.js.map