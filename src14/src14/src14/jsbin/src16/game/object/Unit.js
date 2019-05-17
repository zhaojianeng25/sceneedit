var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var object;
    (function (object) {
        var MOVE_STATUS_MOVE = 1;
        //--停止状态
        var MOVE_STATUS_IDLE = 2;
        //--活着
        var LIVE_STATUS_OK = 1;
        //--已经死亡了
        var LIVE_STATU_DIE = 2;
        //--刚出生状态，保护一下
        var LIVE_STATUS_BORN = 3;
        //--移动速度的单位
        var SPEED_UNIT = 18;
        var Unit = /** @class */ (function (_super) {
            __extends(Unit, _super);
            function Unit() {
                var _this = _super.call(this) || this;
                _this.isother = 0;
                //判断是否与NPC对话
                _this.istalk = 0;
                _this.isaddeffect = 0; //是否加过特效
                ///////// 事件回调定义结束 //////
                //当前坐标
                _this.pos = new Vector2();
                //当前朝向
                _this.ori = new Vector2();
                //面向哪里,仅客户端关心
                _this.faceToward = 0;
                //移动目标点
                _this.target = new Vector2();
                //移动到目标点的时长
                _this.targetTimer = 0;
                //NPCkey
                _this.npckey = 0;
                //NPCid
                _this.npcid = 0;
                //移动速度,单位为每s移动格子数
                _this._speed = 0;
                _this._speed_byte = 0;
                //重现时间 仅客户端使用
                _this._reappearTime = 0;
                //是否需要显示名字和血条
                _this.needShowName = true;
                //是否需要显示怒气条
                _this.needShowAnger = false;
                //说话失效时间
                _this.sayFailTime = 0;
                // buff设置透明
                _this.isBuffAlpha = false;
                _this.visible = true;
                // 主人名称
                _this._masterName = '';
                //是否是队长
                _this.iscaptain = 0;
                //设置武器
                _this.WeaponNum = 0;
                /** 设置职业 */
                _this.school = -1;
                /** 设置造型 */
                _this.shape = -1;
                //角色在场景状态
                _this.rolestateInScene = 0;
                /**染色*/
                _this.isranse = 0;
                /**是否在可见场景中*/
                _this.islook = 0;
                /**可接任务图标 1为可接 3为完成 4为未完成*/
                _this.isaccpet = 0;
                /**升级特效*/
                _this.islevelup = 0;
                /**NPC选中特效*/
                _this.isnpcselect = 0;
                /**商店光标*/
                _this.isshop = 0;
                /**宠物商店光标*/
                _this.ispetshop = 0;
                /**掌门*/
                _this.ischief = 0;
                /**藏宝图*/
                _this.isbaotu = 0;
                /**比武场*/
                _this.isbiwu = 0;
                /**屠魔试炼*/
                _this.istumo = 0;
                /**帮派副本*/
                _this.isfamilyfuben = 0;
                /**悬赏*/
                _this.isxuanshang = 0;
                /**战斗*/
                _this.isbattle = 0;
                /**主线*/
                _this.iszhuxian = 0;
                /**副本*/
                _this.iscarbon = 0;
                /**乱世降妖*/
                _this.iswelfare = 0;
                /**福利*/
                _this.isdemon = 0;
                /**自动寻路 */
                _this.isautowalk = 0;
                /**自动巡逻 */
                _this.isxunluo = 0;
                /**停止移动 */
                _this.isstopwalk = 0;
                /**特效次数*/
                _this.iscount = 0;
                _this._moveDelay = false;
                _this._level = 0;
                // 血量
                _this._hp = 0;
                // 最大血量
                _this._maxHp = 0;
                // 怒气
                _this._anger = 0;
                // 最大怒气
                _this._maxAnger = 0;
                // 目标位置X
                _this._targetPosX = 0;
                // 目标位置X
                _this._targetPosY = 0;
                // 精灵类型id
                _this._typeid = 0;
                // npc标识
                _this._npcFlag = 0;
                // 模板id
                _this._entryid = 0;
                // 玄兽品质
                _this._quality = 0;
                _this._isRobot = false;
                // 主人OID
                _this._masterOid = 0;
                // 当前生存状态
                _this._liveStatus = 0;
                _this._isDied = false;
                _this.scale = 1; //形象缩放
                _this.high = 0; //形象所处高度(3d)
                //坐骑模板id
                _this._mountid = 0;
                // 显示的衣服
                _this._showCoat = 0;
                // 显示的武器
                _this._showWeapon = 0;
                // 显示的翅膀
                _this._showWings = 0;
                //攻击模式
                _this._attackMode = 0;
                //性别
                _this._sex = 0;
                // 是否挂机保护
                _this._isGuajibaohu = false;
                _this._isPlayer = false;
                _this._isGameObject = false;
                _this._isTeleteport = false;
                _this._isMonster = false;
                _this._isBoss = false;
                _this._isNpc = false;
                _this._isPet = false;
                // 地图id
                _this._mapid = 0;
                _this._buffMgr = new ClientBuffMgr(_this);
                //更新完毕之后
                _this._after_update = _this.onUpdate;
                return _this;
            }
            Object.defineProperty(Unit.prototype, "hiding", {
                get: function () {
                    return this._buffMgr.hiding;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "speed", {
                get: function () {
                    return this._speed;
                },
                set: function (v) {
                    if (v == this._speed_byte) {
                        return;
                    }
                    this._speed_byte = v;
                    this.SetSpeed(v);
                    this._speed = SPEED_UNIT * v / 255;
                    if (this.HasTarget()) {
                        this.updateTargetTowardAndTimer();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "toward", {
                get: function () {
                    return this._toward;
                },
                set: function (newToward) {
                    this._toward = this.faceToward = newToward;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "buffMgr", {
                get: function () {
                    return this._buffMgr;
                },
                enumerable: true,
                configurable: true
            });
            // 去哪儿
            Unit.prototype.goto = function (x, y) {
                this.SetTargetPosX(x);
                this.SetTargetPosY(y);
                if (this.onTargetPosChange)
                    this.onTargetPosChange(this, x, y);
                return true;
            };
            //当对象更新发生时
            Unit.prototype.onUpdate = function (flags, mask, strmask) {
                var isNew = flags & core.obj.OBJ_OPT_NEW;
                // buff更新一下
                this._buffMgr.onUpdate(isNew != 0, mask);
                var byte0Update = mask.GetBit(object.UnitField.UNIT_INT_BYTE0);
                // Unit坐标发生变化
                if (isNew) {
                    if ((mask.GetBit(object.UnitField.UNIT_INT_POS_X) || mask.GetBit(object.UnitField.UNIT_INT_POS_Y))) {
                        this.SetPos(this.GetPosX(), this.GetPosY());
                    }
                    //移动状态
                    this.moveStatus = MOVE_STATUS_IDLE;
                    //如果是创建包 朝向设置下
                    if (byte0Update) {
                        this.SetToward2(this.GetToward());
                    }
                }
                // 血量
                if (isNew || mask.GetBit(object.UnitField.UNIT_INT_HP)) {
                    this._hp = this.GetHp();
                }
                // 总血量
                if (isNew || mask.GetBit(object.UnitField.UNIT_INT_MAX_HP)) {
                    this._maxHp = this.GetMaxHp();
                }
                if (isNew || byte0Update) {
                    // 2移动速度
                    this.speed = this.GetSpeed();
                    // 3生存状态
                    var oldLiveStatus = this._liveStatus;
                    this.liveStatus = this.GetLiveStatus();
                    if (!isNew && oldLiveStatus != this._liveStatus && this._liveStatus == object.UnitField.LIVE_STATUS_OK) {
                        // 复活的话满血一下
                        this.hp = this._maxHp;
                    }
                }
                var levelUpdate = mask.GetBit(object.UnitField.UNIT_INT_LEVEL);
                if (isNew || levelUpdate) {
                    this._level = this.GetLevel();
                }
                // 非创建包并且等级发生变化
                if (!isNew && levelUpdate) {
                    // 需要满血一下
                    this.hp = this._maxHp;
                }
                // 实例id (地图id所以需要在前面)
                if (isNew || strmask.GetBit(object.UnitField.UNIT_STR_INSTANCE_I_D)) {
                    this.instanceid = this.GetInstanceID();
                }
                //目标点变化
                if (isNew || mask.GetBit(object.UnitField.UNIT_INT_TARGET_POS)) {
                    this._targetPosX = this.GetTargetPosX();
                    this._targetPosY = this.GetTargetPosY();
                    if (this.onTargetPosChange) {
                        this.onTargetPosChange(this, this._targetPosX, this._targetPosY);
                    }
                }
                //变化（0精灵类型ID1坐骑模板2攻击模式3性别）
                var byte1Update = mask.GetBit(object.UnitField.UNIT_INT_BYTE1);
                // 是否是go
                if (isNew || byte1Update) {
                    //0精灵类型                  
                    this.typeid = this.GetTypeId();
                    //1坐骑模板
                    this.mountid = this.GetMount();
                    //2攻击模式
                    this.attackMode = this.GetAttackMode();
                    //3性别
                    this.sex = this.GetSex();
                }
                //NPC标志0-怪物，1-NPC，2-游戏对象
                var npcByteUpdae = mask.GetBit(object.UnitField.UNIT_INT_NPC_BYTE);
                if (isNew || npcByteUpdae) {
                    this.npcFlag = this.GetNpcFlag();
                }
                // 主人oid
                if (isNew || mask.GetBit(object.UnitField.UNIT_INT_MASTER_OID)) {
                    this.masterOid = this.GetMasterOid();
                }
                // 模板id
                if (isNew || mask.GetBit(object.UnitField.UNIT_INT_ENTRY)) {
                    this.entryid = this.GetEntry();
                }
                // 武器、衣服、翅膀显示
                var showUpdate = mask.GetBits(object.UnitField.UNIT_INT_SHOW_WEAPON, 3);
                if (isNew || showUpdate) {
                    this._showWeapon = this.GetShowWeapon();
                    this._showCoat = this.GetShowCoat();
                }
                // 装备发生变化
                if (isNew
                    || showUpdate // 武器、衣服、翅膀显示
                ) {
                    if (this.onAvatarChange)
                        this.onAvatarChange();
                }
                // bit位
                if (isNew || mask.GetBit(object.UnitField.UNIT_INT_FLAG)) {
                    this._isGuajibaohu = this.GetFlag(object.UnitField.UNIT_BIT_GUAJIBAOHU);
                    if (this.onRedWaring) {
                        this.onRedWaring(this.GetFlag(object.UnitField.UNIT_BIT_IS_SPELL_CASTING));
                    }
                }
                // 主人名称
                if (isNew || strmask.GetBit(object.UnitField.UNIT_STR_MASTER_NAME)) {
                    this._masterName = this.GetMasterName();
                    this.checkName();
                }
            };
            Unit.prototype.fristUpdate = function () {
            };
            Unit.prototype.setVisible = function (v) {
                this.visible = v;
            };
            Unit.prototype.isVisible = function () {
                return this.visible;
            };
            Object.defineProperty(Unit.prototype, "masterName", {
                get: function () {
                    return this._masterName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "unitName", {
                set: function (v) {
                    this._unitName = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "captain", {
                get: function () {
                    return this.iscaptain;
                },
                set: function (num) {
                    this.iscaptain = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "Weapon", {
                get: function () {
                    return this.WeaponNum;
                },
                set: function (num) {
                    this.WeaponNum = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "School", {
                get: function () {
                    return this.school;
                },
                set: function (num) {
                    this.school = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "Shape", {
                get: function () {
                    return this.shape;
                },
                set: function (num) {
                    this.shape = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "roleState", {
                get: function () {
                    return this.rolestateInScene;
                },
                set: function (num) {
                    this.rolestateInScene = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "ranse", {
                get: function () {
                    return this.isranse;
                },
                set: function (num) {
                    this.isranse = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "look", {
                get: function () {
                    return this.islook;
                },
                set: function (num) {
                    this.islook = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "accpet", {
                get: function () {
                    return this.isaccpet;
                },
                set: function (num) {
                    this.isaccpet = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "levelup", {
                get: function () {
                    return this.islevelup;
                },
                set: function (num) {
                    this.islevelup = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "npcselect", {
                get: function () {
                    return this.isnpcselect;
                },
                set: function (num) {
                    this.isnpcselect = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "shop", {
                get: function () {
                    return this.isshop;
                },
                set: function (num) {
                    this.isshop = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "petshop", {
                get: function () {
                    return this.ispetshop;
                },
                set: function (num) {
                    this.ispetshop = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "chief", {
                get: function () {
                    return this.ischief;
                },
                set: function (num) {
                    this.ischief = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "baotu", {
                get: function () {
                    return this.isbaotu;
                },
                set: function (num) {
                    this.isbaotu = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "biwu", {
                get: function () {
                    return this.isbiwu;
                },
                set: function (num) {
                    this.isbiwu = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "tumo", {
                get: function () {
                    return this.istumo;
                },
                set: function (num) {
                    this.istumo = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "familyfuben", {
                get: function () {
                    return this.isfamilyfuben;
                },
                set: function (num) {
                    this.isfamilyfuben = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "xuanshang", {
                get: function () {
                    return this.isxuanshang;
                },
                set: function (num) {
                    this.isxuanshang = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "battle", {
                get: function () {
                    return this.isbattle;
                },
                set: function (num) {
                    this.isbattle = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "zhuxian", {
                get: function () {
                    return this.iszhuxian;
                },
                set: function (num) {
                    this.iszhuxian = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "carbon", {
                get: function () {
                    return this.iscarbon;
                },
                set: function (num) {
                    this.iscarbon = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "welfare", {
                get: function () {
                    return this.iswelfare;
                },
                set: function (num) {
                    this.iswelfare = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "demon", {
                get: function () {
                    return this.isdemon;
                },
                set: function (num) {
                    this.isdemon = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "autowalk", {
                get: function () {
                    return this.isautowalk;
                },
                set: function (num) {
                    this.isautowalk = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "xunluo", {
                get: function () {
                    return this.isxunluo;
                },
                set: function (num) {
                    this.isxunluo = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "stopwalk", {
                get: function () {
                    return this.isstopwalk;
                },
                set: function (num) {
                    this.isstopwalk = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "count", {
                get: function () {
                    return this.iscount;
                },
                set: function (num) {
                    this.iscount = num;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "appellation", {
                get: function () {
                    return this._appellation;
                },
                set: function (_v) {
                    this._appellation = _v;
                },
                enumerable: true,
                configurable: true
            });
            //重载名字
            Unit.prototype.SetName = function (value, needUpdate) {
                if (needUpdate === void 0) { needUpdate = false; }
                this._unitName = value;
                if (needUpdate)
                    this.checkName();
            };
            Unit.prototype.GetName = function () {
                return this._unitName && this._unitName.length > 0 ? this._unitName : _super.prototype.GetName.call(this);
            };
            Unit.prototype.checkName = function () {
                var name = this._unitName;
                if (!name || !name.length) {
                    name = _super.prototype.GetName.call(this);
                }
                if (this._isPlayer || this._isRobot) {
                    // 如果是玩家
                    name = EnumToString.getPlayerName(name, true);
                }
                else if (this._isPet) {
                    if (this._masterName) {
                        //宠物名字特别处理 主人Oid
                        var masterName = EnumToString.getPlayerName(this._masterName, true);
                        name = StringU.substitute("【{0}】{1}", masterName, name);
                    }
                }
                else if (this._typeid == object.UnitField.TYPE_ID_CREATURE) {
                    if (this._level > 0 && !this._isNpc) {
                        // 普通怪物标明等级
                        name = StringU.substitute("{0}({1}级)", name, this._level);
                    }
                }
                else { //NPC
                }
                this._name = name;
            };
            Unit.prototype.SetPos = function (x, y) {
                this.pos.x = x;
                this.pos.y = y;
                this.SetPosX(x);
                this.SetPosY(y);
                //console.log("Unit SetPos:", this._unitName, this.pos.x, this.pos.y);
            };
            //设置目标点位置
            Unit.prototype.SetTarget = function (x, y) {
                if (x && y) {
                    this.target.x = x;
                    this.target.y = y;
                }
            };
            //删除目标点
            Unit.prototype.DeleteTarget = function () {
                this.target.set(Vector2.zero);
                this.targetTimer = 0;
            };
            //目标点不等于00点,说明是有目标的
            Unit.prototype.HasTarget = function () {
                return !this.target.equal(Vector2.zero);
            };
            //取得两个对象之间的距离
            Unit.prototype.Distance = function (other) {
                return this.pos.dist(other.pos);
            };
            // --设置朝向,使用补间还是立即模式
            Unit.prototype.SetToward2 = function (toward, immediately) {
                // --如果设置朝向没有传入新方向则从下标读取, 客户端专用
                if (!toward) {
                    toward = _super.prototype.GetToward.call(this);
                    if (this.toward == toward) {
                        return true;
                    }
                }
                else {
                    _super.prototype.SetToward.call(this, toward);
                }
                //toward = Math.abs((toward - 8)%8);
                this.toward = toward;
                this.ori.fromToward(toward);
                return true;
            };
            Unit.prototype.SetMoveStatus = function (s) {
                if (s) {
                    _super.prototype.SetMoveStatus.call(this, s);
                    this.moveStatus = s;
                }
                else {
                    this.moveStatus = _super.prototype.GetMoveStatus.call(this);
                }
            };
            Object.defineProperty(Unit.prototype, "isMoving", {
                //是否移动状态
                get: function () {
                    return this.moveStatus == MOVE_STATUS_MOVE;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 面朝对象
             */
            Unit.prototype.faceTarget = function (unit) {
                if (!unit) {
                    return;
                }
                var faceOri = Vector2.sub(null, unit.pos, this.pos);
                //得到8方向朝向
                this.faceToward = faceOri.getToward();
            };
            //通过路径进行移动
            Unit.prototype.MoveToPath = function (path, now_pos) {
                var move_path_pos = -1;
                var allpost = [];
                // if(path.length == 4 )
                // {
                // 	let x = ( path[2] -path[0] )/4;
                // 		x = ( x > -1 && x <= 0 ) || ( x >= 0 && x < 1) ? 0 : x
                // 	let y = ( path[3] -path[1] )/4;
                // 		y = ( y > -1 && y <= 0 ) || ( y >= 0 && y < 1) ? 0 : y
                // 	for (var _index = 1; _index < 4; _index++) 
                // 	{
                // 		path.splice(path.length -2,0,(path[0]+_index*x))
                // 		path.splice(path.length -2,0,(path[1]+_index*y))
                // 	}
                // }
                for (var pos_1 = now_pos; pos_1 < path.length; pos_1 += 2) {
                    if (this.MoveTo(path[pos_1], path[pos_1 + 1]) == false) {
                        move_path_pos = pos_1;
                        var poss = new Vector2();
                        poss.x = path[pos_1];
                        poss.y = path[pos_1 + 1];
                        if (this.isother == 1) { /**1为玩家自己*/
                            // Laya.timer.once(250,this,this.check_move,[poss])
                            RequesterProtocols._instance.c2s_check_move(poss, [], game.modules.mainhud.models.HudModel.getInstance().movesceneid);
                        }
                    }
                }
                //已经到达目的地了
                if (move_path_pos == -1) {
                    this.movePath && (this.movePath.length = 0);
                    if (this.isother == 1) { /**1为玩家自己*/
                        game.scene.models.SceneProxy.getInstance().event(game.scene.models.MOVE_STOP);
                        RequesterProtocols._instance.c2s_role_stop(allpost, this.target, game.modules.mainhud.models.HudModel.getInstance().movesceneid);
                        // if(AutoHangUpModels.getInstance().)
                        if (this.istalk == 0) { //点击位置为非NPC
                            this.istalk = 3;
                            game.modules.mainhud.models.HudModel.getInstance().autobatt.stop();
                            game.modules.mainhud.models.HudModel.getInstance().autobatt.init();
                        }
                    }
                    else {
                        return false;
                    }
                    return true;
                }
                this.movePath = path;
                this.move_path_pos = move_path_pos;
                return false;
            };
            Unit.prototype.check_move = function (poss) {
                RequesterProtocols._instance.c2s_check_move(poss, [], game.modules.mainhud.models.HudModel.getInstance().movesceneid);
            };
            Unit.prototype.MoveTo = function (x, y) {
                //如果移动距离太近,瞬间就到了
                this.SetTarget(x, y);
                if (Math.floor(this.pos.x) == x && Math.floor(this.pos.y) == y) {
                    return true;
                }
                // --设置为移动状态
                this.SetMoveStatus(MOVE_STATUS_MOVE);
                // //计算移动方向,TODO:这里要根据情况做寻路
                // Vector2.sub(this.ori, this.target, this.pos).normalize();
                // this.toward = this.ori.getToward();
                // // this.SetToward(this.toward);
                // //移动到目标点需要的秒数
                // let dist: number = this.target.dist(this.pos);
                // this.targetTimer = dist / this.speed;
                this.updateTargetTowardAndTimer();
                return false;
            };
            Unit.prototype.updateTargetTowardAndTimer = function () {
                //计算移动方向,TODO:这里要根据情况做寻路
                Vector2.sub(this.ori, this.target, this.pos).normalize();
                this.toward = this.ori.getToward();
                // this.SetToward(this.toward);
                //移动到目标点需要的秒数
                var dist = this.target.dist(this.pos);
                this.targetTimer = dist / this.speed;
            };
            Unit.prototype.MoveStop = function (toward, x, y) {
                this.SetMoveStatus(MOVE_STATUS_IDLE);
                this.DeleteTarget();
                if (x && y) {
                    Vector2.temp.x = x;
                    Vector2.temp.y = y;
                    if (this.pos.dist(Vector2.temp) > 1.5) {
                        this.SetPos(x, y);
                    }
                }
                if (toward) {
                    this.SetToward2(toward, true);
                }
            };
            Unit.lerp = function (p0, p1, t) {
                return p0 * (1 - t) + p1 * t;
            };
            Unit.prototype.UpdateLocal = function (deltaTime) {
                // --如果已经到达目标点则返回true
                var arriveTarget = true;
                // 有目标点才需要执行以下逻辑
                if (this.HasTarget()) {
                    if (this.targetTimer < deltaTime)
                        deltaTime = this.targetTimer;
                    //定时器心跳
                    this.targetTimer -= deltaTime;
                    //目标定时器到了,说明到站了
                    arriveTarget = this.targetTimer < 0.001;
                    //如果已经到达目标点，则设置为目标点，否则根据时间角度计算距离
                    if (arriveTarget) {
                        this.SetPos(this.target.x, this.target.y);
                    }
                    else {
                        // --速度乘以时间得到距离再乘以单位向量得到位移向量 再加上要追赶的距离
                        var offset = this.speed * deltaTime;
                        this.pos.add(this.ori.normalize().mul(offset));
                        this.userData && this.userData.pos.set(this.pos);
                    }
                    // logd("UpdateLocal", this.pos.x, this.pos.y);
                }
                return arriveTarget;
            };
            Object.defineProperty(Unit.prototype, "moveDelay", {
                set: function (v) {
                    this._moveDelay = v;
                },
                enumerable: true,
                configurable: true
            });
            Unit.prototype.Update = function (deltaTime) {
                if (this.moveStatus == MOVE_STATUS_MOVE && !this._moveDelay) {
                    var dtime = deltaTime;
                    while (dtime && this.movePath && this.movePath.length != 0) {
                        if (this.UpdateLocal(dtime)) {
                            dtime = Math.abs(this.targetTimer);
                            this.MoveToPath(this.movePath, this.move_path_pos + 2);
                        }
                        else {
                            break;
                        }
                    }
                    if (this.movePath && this.movePath.length == 0) {
                        // console.log("人物停止移动");
                        this.MoveStop();
                    }
                }
                //生存状态 客户端模拟
                if (this._reappearTime > 0 && this._reappearTime <= Laya.timer.currTimer)
                    this.setLiveFlag(false);
            };
            Object.defineProperty(Unit.prototype, "level", {
                get: function () {
                    return this._level;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "hp", {
                get: function () {
                    return this._hp;
                },
                set: function (v) {
                    if (v < 0) {
                        v == 0;
                    }
                    this._hp = v;
                    this.SetHp(v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "maxHp", {
                get: function () {
                    return this._maxHp;
                },
                set: function (v) {
                    this._maxHp = v;
                    this.SetMaxHp(v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "anger", {
                get: function () {
                    return this._anger;
                },
                set: function (v) {
                    if (v < 0) {
                        v == 0;
                    }
                    this._anger = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "maxAnger", {
                get: function () {
                    return this._maxAnger;
                },
                set: function (v) {
                    this._maxAnger = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "targetPosX", {
                get: function () {
                    return this._targetPosX;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "targetPosY", {
                get: function () {
                    return this._targetPosY;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "typeid", {
                get: function () {
                    return this._typeid;
                },
                set: function (v) {
                    this._typeid = v;
                    this._isPlayer = v == object.UnitField.TYPE_ID_PLAYER;
                    this.isGameObject = v == object.UnitField.TYPE_ID_GAMEOBJ;
                    this.checkIsNpc();
                    this.checkIsMonster();
                    this.checkIsBoss();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "npcFlag", {
                get: function () {
                    return this._npcFlag;
                },
                set: function (v) {
                    this._npcFlag = v;
                    this.checkIsNpc();
                    this.checkIsTeleteport();
                    this.checkIsMonster();
                    this.checkIsBoss();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "entryid", {
                get: function () {
                    return this._entryid;
                },
                set: function (v) {
                    this._entryid = v;
                    this._isRobot = (Unit.ROBOT_TEMP_ID_LIST.indexOf(v) != -1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "quality", {
                get: function () {
                    return this._quality;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "isRobot", {
                //机器人
                get: function () {
                    return this._isRobot;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "masterOid", {
                get: function () {
                    return this._masterOid;
                },
                set: function (v) {
                    this._masterOid = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "liveStatus", {
                set: function (v) {
                    if (v == this._liveStatus) {
                        return;
                    }
                    this._liveStatus = v;
                    this._isDied = (v == object.UnitField.LIVE_STATU_DIE);
                    this.SetLiveStatus(v);
                    if (this.onLiveStatusChange)
                        this.onLiveStatusChange(v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "isDied", {
                //是否死亡
                get: function () {
                    return this._isDied;
                },
                enumerable: true,
                configurable: true
            });
            //设置生存状态 隐藏状态 特殊接口 特殊使用
            Unit.prototype.setLiveFlag = function (isDied, time) {
                if (isDied === void 0) { isDied = true; }
                if (time === void 0) { time = 0; }
                var status;
                if (isDied) {
                    status = object.UnitField.LIVE_STATU_DIE;
                    time = time > 0 ? time : 2000;
                    this._reappearTime = Laya.timer.currTimer + time;
                }
                else {
                    status = object.UnitField.LIVE_STATUS_OK;
                    this._reappearTime = 0;
                }
                this.liveStatus = status;
                this._isDied = isDied;
            };
            Object.defineProperty(Unit.prototype, "mountid", {
                get: function () {
                    return this._mountid;
                },
                set: function (v) {
                    if (v == this._mountid) {
                        return;
                    }
                    this._mountid = v;
                    this.SetMount(v);
                    if (this.onAvatarChange)
                        this.onAvatarChange();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "isRiding", {
                //是否处于坐骑状态
                get: function () {
                    return this._mountid > 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "showCoat", {
                get: function () {
                    return this._showCoat;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "showWeapon", {
                get: function () {
                    return this._showWeapon;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "showWings", {
                get: function () {
                    return this._showWings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "attackMode", {
                get: function () {
                    return this._attackMode;
                },
                set: function (v) {
                    this._attackMode = v;
                    this.SetAttackMode(v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "sex", {
                get: function () {
                    return this._sex;
                },
                set: function (v) {
                    this._sex = v;
                    this.SetSex(v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "isGuajibaohu", {
                get: function () {
                    return this._isGuajibaohu;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "isPlayer", {
                //玩家对象
                get: function () {
                    return this._isPlayer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "isGameObject", {
                //是否游戏对象
                get: function () {
                    return this._isGameObject;
                },
                set: function (v) {
                    this._isGameObject = v;
                    this.checkIsTeleteport();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "isTeleteport", {
                //是否传送点
                get: function () {
                    return this._isTeleteport;
                },
                enumerable: true,
                configurable: true
            });
            Unit.prototype.checkIsTeleteport = function () {
                this._isTeleteport = this._isGameObject && this._npcFlag == 1;
            };
            Object.defineProperty(Unit.prototype, "isMonster", {
                //是否怪物
                get: function () {
                    return this._isMonster;
                },
                enumerable: true,
                configurable: true
            });
            Unit.prototype.checkIsMonster = function () {
                this._isMonster = (this._typeid == object.UnitField.TYPE_ID_CREATURE && this._npcFlag != 2);
            };
            Object.defineProperty(Unit.prototype, "isBoss", {
                //是否boss
                get: function () {
                    return this._isBoss;
                },
                enumerable: true,
                configurable: true
            });
            Unit.prototype.checkIsBoss = function () {
                this._isBoss = (this._typeid == object.UnitField.TYPE_ID_CREATURE && this._npcFlag == 1);
            };
            Object.defineProperty(Unit.prototype, "isNpc", {
                //是否npc
                get: function () {
                    return this._isNpc;
                },
                enumerable: true,
                configurable: true
            });
            Unit.prototype.checkIsNpc = function () {
                this._isNpc = (this._typeid == object.UnitField.TYPE_ID_CREATURE && this._npcFlag == 2);
            };
            Object.defineProperty(Unit.prototype, "isPet", {
                //是否宠物
                get: function () {
                    return this._isPet;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "isCanAttackType", {
                //该类型是否可以被攻击
                get: function () {
                    var isCanAttackPet = this.isPet;
                    return !this.isNpc && !this.isGameObject && !isCanAttackPet;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "isCanMountUp", {
                //是否可以上坐骑
                get: function () {
                    var lockUp = this.buffMgr.lockMountUp;
                    return !lockUp;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "instanceid", {
                get: function () {
                    return this._instanceid;
                },
                set: function (v) {
                    this._instanceid = v;
                    this.checkMapid();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "mapid", {
                get: function () {
                    return this._mapid;
                },
                enumerable: true,
                configurable: true
            });
            Unit.prototype.checkMapid = function () {
                var value = parseInt(this._instanceid);
                if (value) {
                    this._mapid = value;
                }
                else {
                    var value_1 = this._instanceid;
                    if (!value_1 || !value_1.length) {
                        this._mapid = 0;
                    }
                    else {
                        var values = value_1.split(";");
                        if (values && values.length > 1) {
                            this._mapid = values[1];
                        }
                        else {
                            this._mapid = 0;
                        }
                    }
                }
            };
            Unit.prototype.dispose = function () {
                this._buffMgr.dispose();
                this._buffMgr = null;
                this.onLiveStatusChange = null;
                this.onTargetPosChange = null;
                this._unitName = null;
                this.scale = 1;
                this.high = 0;
                _super.prototype.dispose.call(this);
            };
            //对象类型
            Unit.TYPE_PLAYER = 0; //玩家
            Unit.TYPE_CREATURE = 1; //生物
            Unit.TYPE_GAMEOBJECT = 2; //游戏对象
            //生物类型
            Unit.CREATURE_TYPE_MONSTER = 0; //怪物
            Unit.CREATURE_TYPE_BOSS = 1; //boss
            Unit.CREATURE_TYPE_NPC = 2; //NPC
            Unit.CREATURE_TYPE_ELITE = 3; //精英
            Unit.CREATURE_TYPE_SMALL_BOSS = 4; //野外小boss
            //游戏对象类型
            Unit.TYPE_GAMEOBJ_NORMAL = 0; //采集
            Unit.TYPE_CGAMEOBJ_TELEPORT = 1; //传送点
            //机器人模板id
            Unit.ROBOT_TEMP_ID_LIST = [];
            return Unit;
        }(object.UnitField));
        object.Unit = Unit;
    })(object = game.object || (game.object = {}));
})(game || (game = {}));
//# sourceMappingURL=Unit.js.map