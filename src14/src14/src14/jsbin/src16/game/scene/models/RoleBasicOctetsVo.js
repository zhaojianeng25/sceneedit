/**
* 玩家信息
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var models;
        (function (models) {
            var RoleBasicOctetsVo = /** @class */ (function () {
                function RoleBasicOctetsVo() {
                }
                RoleBasicOctetsVo.prototype.fromByteArray = function (bytes) {
                    this.roleid = bytes.readLong();
                    this.rolename = ByteArrayUtils.readUtf16String(bytes);
                    this.dirandschool = bytes.readByte();
                    this.shape = bytes.readInt32();
                    this.level = bytes.readInt32();
                    this.camp = bytes.readByte();
                    var componentssize = ByteArrayUtils.uncompact_uint32(bytes);
                    this.components = new Laya.Dictionary();
                    for (var index = 0; index < componentssize; index++) {
                        this.components.set(bytes.readByte(), bytes.readInt32());
                    }
                    var datassize = ByteArrayUtils.uncompact_uint32(bytes);
                    this.datas = new Laya.Dictionary();
                    for (var index = 0; index < datassize; index++) {
                        var key = bytes.readByte();
                        var head = ByteArrayUtils.uncompact_uint32(bytes);
                        switch (key) {
                            case DataType.SHOW_PET:
                                var showpet = new models.PeocTestsVo();
                                showpet.fromByteArray(bytes);
                                this.datas.set(key, showpet);
                                break;
                            case DataType.TEAM_INFO:
                                var team = new models.TeamOctetsVo();
                                team.fromByteArray(bytes);
                                this.datas.set(key, team);
                                break;
                            case DataType.TITLE_ID:
                                this.datas.set(key, bytes.readInt32());
                                break;
                            case DataType.TITLE_NAME:
                                this.datas.set(key, ByteArrayUtils.readUtf16String(bytes));
                                break;
                            case DataType.STALL_NAME:
                                this.datas.set(key, ByteArrayUtils.readUtf16String(bytes));
                                break;
                            case DataType.MODEL_TEMPLATE:
                                this.datas.set(key, bytes.readInt32());
                                break;
                            case DataType.HEADRESS_SHAPE:
                                this.datas.set(key, bytes.readInt32());
                                break;
                            case DataType.SCENE_STATE:
                                this.datas.set(key, bytes.readInt32());
                                break;
                            case DataType.ROLE_ACTUALLY_SHAPE:
                                this.datas.set(key, bytes.readInt32());
                                break;
                            case DataType.PLAYING_ACTION:
                                this.datas.set(key, bytes.readByte());
                                break;
                            case DataType.STALL_BOARD:
                                this.datas.set(key, bytes.readByte());
                                break;
                            case DataType.FOOT_LOGO_ID:
                                this.datas.set(key, bytes.readInt32());
                                break;
                            case DataType.AWAKE_STATE:
                                this.datas.set(key, bytes.readInt32());
                                break;
                            case DataType.CRUISE:
                                this.datas.set(key, bytes.readInt32());
                                break;
                            case DataType.EFFECT_EQUIP:
                                this.datas.set(key, bytes.readInt32());
                                break;
                            case DataType.CRUISE2:
                                this.datas.set(key, bytes.readInt32());
                                break;
                            case DataType.CRUISE3:
                                this.datas.set(key, bytes.readInt32());
                                break;
                            default:
                                break;
                        }
                    }
                };
                return RoleBasicOctetsVo;
            }());
            models.RoleBasicOctetsVo = RoleBasicOctetsVo;
        })(models = scene.models || (scene.models = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleBasicOctetsVo.js.map