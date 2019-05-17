/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var models;
        (function (models) {
            var FighterInfoVo = /** @class */ (function () {
                function FighterInfoVo() {
                }
                /////fighterType 战斗单元类型
                /*FIGHTER_ROLE = 1; 		// 角色
                FIGHTER_PET = 2; 			// 宠物
                FIGHTER_PARTNER = 3; 		// 伙伴（玩家自带助战）
                FIGHTER_MONSTER_HIDE = 4; 	// 暗雷野怪（20000~23999）
                FIGHTER_MONSTER_NPC = 5; 	// 战斗npc（24000以上）
                FIGHTER_SYSTEM_PARTNER = 6; // 系统安排的助战*/
                FighterInfoVo.prototype.fromByteArray = function (bytes) {
                    this.fighterType = bytes.readInt32();
                    this.dataID = bytes.readLong();
                    this.fighterName = ByteArrayUtils.readUtf16String(bytes);
                    this.title = ByteArrayUtils.readUtf16String(bytes);
                    this.titleId = bytes.readInt32();
                    this.awakeState = bytes.readInt32();
                    this.index = bytes.readInt32();
                    this.bGM = bytes.readByte();
                    this.maxhp = bytes.readInt32();
                    this.uplimithp = bytes.readInt32();
                    this.hp = bytes.readInt32();
                    this.ep = bytes.readInt32();
                    this.shape = bytes.readInt32();
                    this.subtype = bytes.readInt32();
                    var mapSize = bytes.readUint8();
                    this.components = new Laya.Dictionary();
                    for (var index = 0; index < mapSize; index++) {
                        this.components.set(bytes.readByte(), bytes.readUint32());
                    }
                    mapSize = bytes.readUint8();
                    this.buffs = new Laya.Dictionary();
                    for (var index = 0; index < mapSize; index++) {
                        this.buffs.set(bytes.readUint32(), bytes.readUint32());
                    }
                    this.footLogoId = bytes.readInt32();
                    this.petkeys = [];
                    var petkeysSize = bytes.readUint8();
                    for (var index = 0; index < petkeysSize; index++) {
                        this.petkeys.push(bytes.readInt32());
                    }
                };
                return FighterInfoVo;
            }());
            models.FighterInfoVo = FighterInfoVo;
        })(models = scene.models || (scene.models = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=FighterInfoVo.js.map