var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var models;
            (function (models) {
                /** 宠物详情数据 */
                var PetInfoVo = /** @class */ (function () {
                    function PetInfoVo() {
                    }
                    PetInfoVo.prototype.fromByteArray = function (bytes) {
                        this.id = bytes.readInt32();
                        this.key = bytes.readInt32();
                        this.name = ByteArrayUtils.readUtf16String(bytes);
                        this.level = bytes.readInt32();
                        this.useLevel = bytes.readInt32();
                        this.xuemai = bytes.readInt32();
                        this.gengu = bytes.readInt32();
                        this.colour = bytes.readInt32();
                        this.hp = bytes.readInt32();
                        this.maxhp = bytes.readInt32();
                        this.mp = bytes.readInt32();
                        this.maxmp = bytes.readInt32();
                        this.attack = bytes.readInt32();
                        this.defend = bytes.readInt32();
                        this.speed = bytes.readInt32();
                        this.magicattack = bytes.readInt32();
                        this.magicdef = bytes.readInt32();
                        this.scale = bytes.readByte();
                        this.initbfp = new models.BasicFightPropertiesVo();
                        this.initbfp.fromByteArray(bytes);
                        this.bfp = new models.BasicFightPropertiesVo();
                        this.bfp.fromByteArray(bytes);
                        this.point = bytes.readInt16();
                        this.autoaddcons = bytes.readByte();
                        this.autoaddiq = bytes.readByte();
                        this.autoaddstr = bytes.readByte();
                        this.autoaddendu = bytes.readByte();
                        this.autoaddagi = bytes.readByte();
                        this.pointresetcount = bytes.readInt16();
                        this.exp = bytes.readLong();
                        this.nexp = bytes.readLong();
                        this.attackapt = bytes.readInt32();
                        this.defendapt = bytes.readInt32();
                        this.phyforceapt = bytes.readInt32();
                        this.magicapt = bytes.readInt32();
                        this.speedapt = bytes.readInt32();
                        this.dodgeapt = bytes.readInt32();
                        this.growrate = bytes.readFloat();
                        this.life = bytes.readInt32();
                        this.kind = bytes.readInt32();
                        this.skills = [];
                        var skillsSize = bytes.readUint8();
                        var petskill;
                        for (var index = 0; index < skillsSize; index++) {
                            petskill = new models.PetSkillVo();
                            petskill.fromByteArray(bytes);
                            this.skills.push(petskill);
                        }
                        var mapSize = bytes.readUint8();
                        this.skillexpires = new Laya.Dictionary();
                        for (var index = 0; index < mapSize; index++) {
                            this.skillexpires.set(bytes.readInt32(), bytes.readLong());
                        }
                        this.flag = bytes.readByte();
                        this.timeout = bytes.readLong();
                        this.ownerid = bytes.readLong();
                        this.ownername = ByteArrayUtils.readUtf16String(bytes);
                        this.rank = bytes.readInt32();
                        this.starId = bytes.readInt16();
                        this.practiseTimes = bytes.readInt16();
                        var mapSize1 = bytes.readUint8();
                        this.zizhi = new Laya.Dictionary();
                        for (var index = 0; index < mapSize1; index++) {
                            this.zizhi.set(bytes.readInt32(), bytes.readInt32());
                        }
                        this.changeGengu = bytes.readInt32();
                        this.skill_grids = bytes.readInt32();
                        this.aptaddcount = bytes.readByte();
                        this.growrateaddcount = bytes.readByte();
                        this.washcount = bytes.readInt16();
                        this.petscore = bytes.readInt32();
                        this.petbasescore = bytes.readInt32();
                        this.petdye1 = bytes.readInt32();
                        this.petdye2 = bytes.readInt32();
                        this.shenshouinccount = bytes.readInt32();
                        this.marketfreezeexpire = bytes.readLong();
                    };
                    return PetInfoVo;
                }());
                models.PetInfoVo = PetInfoVo;
            })(models = pet.models || (pet.models = {}));
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetInfoVo.js.map