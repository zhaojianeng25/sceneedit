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
var game;
(function (game) {
    var object;
    (function (object) {
        ////////////////////////全局定义///////////////////////////////////
        var GlobalDef = /** @class */ (function () {
            function GlobalDef() {
            }
            GlobalDef.TYPE_GLOBAL = "global"; //世界对象guid前缀
            GlobalDef.TYPE_JJC = "jjc"; //竞技场对象guid前缀
            GlobalDef.TYPE_GANG = "gang"; //帮派对象guid前缀
            GlobalDef.TYPE_PLAYER = "playerdata"; //玩家对象guid前缀
            GlobalDef.TYPE_PLATDATA = "platdata"; //平台数据对象guid前缀
            GlobalDef.TYPE_QUEST = "quest"; //任务对象guid前缀
            GlobalDef.TYPE_ITEM = "item"; //物品对象guid前缀
            GlobalDef.TYPE_MAIL = "mail"; //邮件对象guid前缀
            GlobalDef.TYPE_SOCIAL = "social"; //社交对象guid前缀
            GlobalDef.TYPE_CLIENTDATA = "clientdata"; //远程存储对象guid前缀
            GlobalDef.TYPE_MAP = "m"; //地图对象guid前缀
            GlobalDef.TYPE_UNIT = "u"; //unit对象guid前缀
            GlobalDef.TYPE_LOOTS = "l"; //loots对象guid前缀
            GlobalDef.TYPE_TANSFER_PLAYER = "createplayer"; //传送创建包玩家对象guid前缀
            GlobalDef.TYPE_PLAYER_ATTR = "playerattr"; //玩家属性更新包对象guid前缀
            GlobalDef.TYPE_PLAYER_QUERY = "queryplayer"; //玩家信息查询
            GlobalDef.TYPE_POST_INFO = "globalpostinfo"; //定时推送功能
            GlobalDef.TYPE_WUJIANG = "wujiang"; //武将对象GUID前缀
            GlobalDef.TYPE_EQUIP = "equip"; //装备对象GUID前缀
            GlobalDef.TYPE_PLAYGANG = "playgang"; //玩家家族对象GUID前缀
            GlobalDef.SERVER_TYPE_GAME = 1; //游戏服
            GlobalDef.SERVER_TYPE_BATTLE = 2; //战斗服
            GlobalDef.SERVER_TYPE_ALL = 100; //任意服，不能写在配置文件里
            GlobalDef.CHAT_TYPE_WORLD = 0; //世界聊天
            GlobalDef.CHAT_TYPE_GANG = 1; //行会聊天
            GlobalDef.CHAT_TYPE_NEAR = 2; //附近聊天
            GlobalDef.CHAT_TYPE_SYSTEM = 3; //系统信息
            GlobalDef.CHAT_TYPE_NOTICE = 4; //通知信息
            GlobalDef.CHAT_TYPE_MARQUEE = 5; //跑马灯信息
            GlobalDef.CHAT_TYPE_POPUP = 6; //弹窗信息
            GlobalDef.CHAT_TYPE_LOCAL = 7; //本服聊天
            GlobalDef.CHAT_TYPE_HONGBAO = 8; //红包信息
            GlobalDef.CHAT_TYPE_DANMU = 9; //弹幕
            GlobalDef.CHAT_TYPE_SONGHUA = 10; //送花
            GlobalDef.CHAT_TYPE_ALL = 11; //全部
            GlobalDef.INSTANCE_TYPE_NONE = 0; //不是副本
            GlobalDef.INSTANCE_TYPE_ACTIVITY = 1; //活动副本
            GlobalDef.INSTANCE_TYPE_SINGLE = 2; //单人副本
            GlobalDef.INSTANCE_TYPE_GANG = 3; //帮派副本
            GlobalDef.KUAFU_TYPE_1V1 = 1; //跨服1v1
            GlobalDef.KUAFU_TYPE_WODI = 2; //跨服卧底
            GlobalDef.KUAFU_TYPE_XIANGUO = 3; //跨服仙果
            GlobalDef.KUAFU_TYPE_BOSS = 4; //跨服boss
            GlobalDef.RANK_TYPE_FORCE = 0; //战力榜
            GlobalDef.RANK_TYPE_STAR = 1; //星星榜
            GlobalDef.MAX_RANK_TYPE = 2; //最大排行榜
            GlobalDef.WUJIANG_OBJECT_COUNT = 5; //武将对象个数
            GlobalDef.OBJECT_MAX_WUJIANG_COUNT = 200; //单BINLOG最大武将
            GlobalDef.MAX_WUJIANG_INT_ATTR_INDEX = 50; //每个武将最大占用数字下标
            return GlobalDef;
        }());
        object.GlobalDef = GlobalDef;
        ////////////////////////////////////////////////////////////////
        //GlobalPostInfo def
        ////////////////////////////////////////////////////////////////
        var GlobalPostInfoField = /** @class */ (function (_super) {
            __extends(GlobalPostInfoField, _super);
            function GlobalPostInfoField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GlobalPostInfoField.prototype.GetGlobalPostInfoType = function (index) {
                return this.GetUInt32(GlobalPostInfoField.GLOBALPOSTINFO_INT_GLOBAL_POST_INFO_TYPE + index * 2);
            };
            GlobalPostInfoField.prototype.SetGlobalPostInfoType = function (index, val) {
                this.SetUInt32(GlobalPostInfoField.GLOBALPOSTINFO_INT_GLOBAL_POST_INFO_TYPE + index * 2, val);
            };
            GlobalPostInfoField.prototype.GetGlobalPostInfoTime = function (index) {
                return this.GetUInt32(GlobalPostInfoField.GLOBALPOSTINFO_INT_GLOBAL_POST_INFO_TIME + index * 2);
            };
            GlobalPostInfoField.prototype.SetGlobalPostInfoTime = function (index, val) {
                this.SetUInt32(GlobalPostInfoField.GLOBALPOSTINFO_INT_GLOBAL_POST_INFO_TIME + index * 2, val);
            };
            //////////////////////////////////////str function
            GlobalPostInfoField.prototype.GetGlobalPostInfoGuid = function (index) {
                return this.GetStr(GlobalPostInfoField.GLOBALPOSTINFO_STR_GLOBAL_POST_INFO_GUID + index * 2);
            };
            GlobalPostInfoField.prototype.SetGlobalPostInfoGuid = function (index, val) {
                this.SetStr(GlobalPostInfoField.GLOBALPOSTINFO_STR_GLOBAL_POST_INFO_GUID + index * 2, val);
            };
            GlobalPostInfoField.prototype.GetGlobalPostInfoInfo = function (index) {
                return this.GetStr(GlobalPostInfoField.GLOBALPOSTINFO_STR_GLOBAL_POST_INFO_INFO + index * 2);
            };
            GlobalPostInfoField.prototype.SetGlobalPostInfoInfo = function (index, val) {
                this.SetStr(GlobalPostInfoField.GLOBALPOSTINFO_STR_GLOBAL_POST_INFO_INFO + index * 2, val);
            };
            // define
            GlobalPostInfoField.MAX_POST_COUNT = 1000; //最大推送数量
            // int field
            GlobalPostInfoField.GLOBALPOSTINFO_INT_GLOBAL_POST_INFO_TYPE = 0; //类型
            GlobalPostInfoField.GLOBALPOSTINFO_INT_GLOBAL_POST_INFO_TIME = 1; //推送时间
            // string field
            GlobalPostInfoField.GLOBALPOSTINFO_STR_GLOBAL_POST_INFO_GUID = 0; //玩家guid
            GlobalPostInfoField.GLOBALPOSTINFO_STR_GLOBAL_POST_INFO_INFO = 1; //要推送的信息
            return GlobalPostInfoField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.GlobalPostInfoField = GlobalPostInfoField;
        //GangOther def
        ////////////////////////////////////////////////////////////////
        var GangOtherField = /** @class */ (function (_super) {
            __extends(GangOtherField, _super);
            function GangOtherField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            // string field
            GangOtherField.prototype.GetFbCreature = function (offset) {
                return this.GetUInt16(GangOtherField.GANGOTHER_INT_FB_CREATURE + Math.floor(offset / 2), offset % 2);
            };
            GangOtherField.prototype.SetFbCreature = function (offset, val) {
                this.SetUInt16(GangOtherField.GANGOTHER_INT_FB_CREATURE + Math.floor(offset / 2), offset % 2, val);
            };
            GangOtherField.prototype.GetFbByte = function (offset) {
                return this.GetByte(GangOtherField.GANGOTHER_INT_FB_BYTE, offset);
            };
            GangOtherField.prototype.SetFbByte = function (offset, val) {
                this.SetByte(GangOtherField.GANGOTHER_INT_FB_BYTE, offset, val);
            };
            //当前攻打章节
            GangOtherField.prototype.GetCurChapter = function () {
                return this.GetByte(GangOtherField.GANGOTHER_INT_FB_BYTE, 0);
            };
            GangOtherField.prototype.SetCurChapter = function (val) {
                this.SetByte(GangOtherField.GANGOTHER_INT_FB_BYTE, 0, val);
            };
            //当前攻打关卡
            GangOtherField.prototype.GetCurGuan = function () {
                return this.GetByte(GangOtherField.GANGOTHER_INT_FB_BYTE, 1);
            };
            GangOtherField.prototype.SetCurGuan = function (val) {
                this.SetByte(GangOtherField.GANGOTHER_INT_FB_BYTE, 1, val);
            };
            //历史最高章节
            GangOtherField.prototype.GetMaxChapter = function () {
                return this.GetByte(GangOtherField.GANGOTHER_INT_FB_BYTE, 2);
            };
            GangOtherField.prototype.SetMaxChapter = function (val) {
                this.SetByte(GangOtherField.GANGOTHER_INT_FB_BYTE, 2, val);
            };
            //0最高1最高少一章
            GangOtherField.prototype.GetFbResetType = function () {
                return this.GetByte(GangOtherField.GANGOTHER_INT_FB_BYTE, 3);
            };
            GangOtherField.prototype.SetFbResetType = function (val) {
                this.SetByte(GangOtherField.GANGOTHER_INT_FB_BYTE, 3, val);
            };
            GangOtherField.prototype.GetFbByte2 = function (offset) {
                return this.GetByte(GangOtherField.GANGOTHER_INT_FB_BYTE2, offset);
            };
            GangOtherField.prototype.SetFbByte2 = function (offset, val) {
                this.SetByte(GangOtherField.GANGOTHER_INT_FB_BYTE2, offset, val);
            };
            //今日开始章节
            GangOtherField.prototype.GetTodayChapterBegin = function () {
                return this.GetByte(GangOtherField.GANGOTHER_INT_FB_BYTE2, 0);
            };
            GangOtherField.prototype.SetTodayChapterBegin = function (val) {
                this.SetByte(GangOtherField.GANGOTHER_INT_FB_BYTE2, 0, val);
            };
            GangOtherField.prototype.GetBzU16 = function (index) {
                return this.GetUInt32(GangOtherField.GANGOTHER_INT_BZ_U16 + index * 3);
            };
            GangOtherField.prototype.SetBzU16 = function (index, val) {
                this.SetUInt32(GangOtherField.GANGOTHER_INT_BZ_U16 + index * 3, val);
            };
            GangOtherField.prototype.GetBzCount1 = function (offset) {
                return this.GetByte(GangOtherField.GANGOTHER_INT_BZ_COUNT1, offset);
            };
            GangOtherField.prototype.SetBzCount1 = function (offset, val) {
                this.SetByte(GangOtherField.GANGOTHER_INT_BZ_COUNT1, offset, val);
            };
            GangOtherField.prototype.GetBzCount2 = function (offset) {
                return this.GetByte(GangOtherField.GANGOTHER_INT_BZ_COUNT2, offset);
            };
            GangOtherField.prototype.SetBzCount2 = function (offset, val) {
                this.SetByte(GangOtherField.GANGOTHER_INT_BZ_COUNT2, offset, val);
            };
            GangOtherField.prototype.GetBzZhanwei = function (offset) {
                return this.GetByte(GangOtherField.GANGOTHER_INT_BZ_ZHANWEI + Math.floor(offset / 4), offset % 4);
            };
            GangOtherField.prototype.SetBzZhanwei = function (offset, val) {
                this.SetByte(GangOtherField.GANGOTHER_INT_BZ_ZHANWEI + Math.floor(offset / 4), offset % 4, val);
            };
            GangOtherField.prototype.GetXsItemIdx = function (offset) {
                return this.GetUInt16(GangOtherField.GANGOTHER_INT_XS_ITEM_IDX + Math.floor(offset / 2), offset % 2);
            };
            GangOtherField.prototype.SetXsItemIdx = function (offset, val) {
                this.SetUInt16(GangOtherField.GANGOTHER_INT_XS_ITEM_IDX + Math.floor(offset / 2), offset % 2, val);
            };
            GangOtherField.prototype.GetXsItemCount = function (offset) {
                return this.GetUInt16(GangOtherField.GANGOTHER_INT_XS_ITEM_COUNT + Math.floor(offset / 2), offset % 2);
            };
            GangOtherField.prototype.SetXsItemCount = function (offset, val) {
                this.SetUInt16(GangOtherField.GANGOTHER_INT_XS_ITEM_COUNT + Math.floor(offset / 2), offset % 2, val);
            };
            GangOtherField.prototype.GetSpellLv = function (offset) {
                return this.GetByte(GangOtherField.GANGOTHER_INT_SPELL_LV + Math.floor(offset / 4), offset % 4);
            };
            GangOtherField.prototype.SetSpellLv = function (offset, val) {
                this.SetByte(GangOtherField.GANGOTHER_INT_SPELL_LV + Math.floor(offset / 4), offset % 4, val);
            };
            // define
            GangOtherField.MAX_GANG_SPELL_TYPE = 9; //技能类型
            // int field
            GangOtherField.GANGOTHER_INT_FB_CREATURE = 0; //军团六个怪的血量万分比
            GangOtherField.GANGOTHER_INT_FB_BYTE = 3; //0当前解锁章节 1当前解锁军团 2历史最高章节 3重置方式
            GangOtherField.GANGOTHER_INT_FB_BYTE2 = 4; //0今日开始章节 给玩家记领奖用
            GangOtherField.GANGOTHER_INT_BZ_U16 = 5; //关卡信息=（章节-1）*4+关卡 最多二十个关卡
            GangOtherField.GANGOTHER_INT_BZ_COUNT1 = 6; //宝藏奖励数量1
            GangOtherField.GANGOTHER_INT_BZ_COUNT2 = 7; //宝藏奖励数量2
            GangOtherField.GANGOTHER_INT_BZ_ZHANWEI = 8; //宝藏奖励占位
            GangOtherField.GANGOTHER_INT_XS_ITEM_IDX = 65; //限时商店商品索引
            GangOtherField.GANGOTHER_INT_XS_ITEM_COUNT = 68; //商品份数
            GangOtherField.GANGOTHER_INT_SPELL_LV = 71; //帮派技能等级
            return GangOtherField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.GangOtherField = GangOtherField;
        //GlobalObject def
        ////////////////////////////////////////////////////////////////
        var GlobalObjectField = /** @class */ (function (_super) {
            __extends(GlobalObjectField, _super);
            function GlobalObjectField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            // string field
            GlobalObjectField.prototype.GetGangId = function () {
                return this.GetUInt32(GlobalObjectField.GLOBALOBJECT_INT_GANG_ID);
            };
            GlobalObjectField.prototype.SetGangId = function (val) {
                this.SetUInt32(GlobalObjectField.GLOBALOBJECT_INT_GANG_ID, val);
            };
            GlobalObjectField.prototype.GetResetTime = function (index) {
                return this.GetUInt32(GlobalObjectField.GLOBALOBJECT_INT_RESET_TIME + index);
            };
            GlobalObjectField.prototype.SetResetTime = function (index, val) {
                this.SetUInt32(GlobalObjectField.GLOBALOBJECT_INT_RESET_TIME + index, val);
            };
            // define
            // int field
            GlobalObjectField.GLOBALOBJECT_INT_GANG_ID = 0; //帮派ID自增字段
            GlobalObjectField.GLOBALOBJECT_INT_RESET_TIME = 1; //重置的时间
            return GlobalObjectField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.GlobalObjectField = GlobalObjectField;
        //PlayerAttr def
        ////////////////////////////////////////////////////////////////
        var PlayerAttrField = /** @class */ (function (_super) {
            __extends(PlayerAttrField, _super);
            function PlayerAttrField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return PlayerAttrField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.PlayerAttrField = PlayerAttrField;
        //Unit def
        ////////////////////////////////////////////////////////////////
        var UnitField = /** @class */ (function (_super) {
            __extends(UnitField, _super);
            function UnitField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UnitField.prototype.GetPosX = function () {
                return this.GetFloat(UnitField.UNIT_INT_POS_X);
            };
            UnitField.prototype.SetPosX = function (val) {
                this.SetFloat(UnitField.UNIT_INT_POS_X, val);
            };
            UnitField.prototype.GetPosY = function () {
                return this.GetFloat(UnitField.UNIT_INT_POS_Y);
            };
            UnitField.prototype.SetPosY = function (val) {
                this.SetFloat(UnitField.UNIT_INT_POS_Y, val);
            };
            UnitField.prototype.GetTargetPos = function (offset) {
                return this.GetUInt16(UnitField.UNIT_INT_TARGET_POS, offset);
            };
            UnitField.prototype.SetTargetPos = function (offset, val) {
                this.SetUInt16(UnitField.UNIT_INT_TARGET_POS, offset, val);
            };
            //目标X轴
            UnitField.prototype.GetTargetPosX = function () {
                return this.GetUInt16(UnitField.UNIT_INT_TARGET_POS, 0);
            };
            UnitField.prototype.SetTargetPosX = function (val) {
                this.SetUInt16(UnitField.UNIT_INT_TARGET_POS, 0, val);
            };
            //目标Y轴
            UnitField.prototype.GetTargetPosY = function () {
                return this.GetUInt16(UnitField.UNIT_INT_TARGET_POS, 1);
            };
            UnitField.prototype.SetTargetPosY = function (val) {
                this.SetUInt16(UnitField.UNIT_INT_TARGET_POS, 1, val);
            };
            UnitField.prototype.GetByte0 = function (offset) {
                return this.GetByte(UnitField.UNIT_INT_BYTE0, offset);
            };
            UnitField.prototype.SetByte0 = function (offset, val) {
                this.SetByte(UnitField.UNIT_INT_BYTE0, offset, val);
            };
            //移动状态
            UnitField.prototype.GetMoveStatus = function () {
                return this.GetByte(UnitField.UNIT_INT_BYTE0, 0);
            };
            UnitField.prototype.SetMoveStatus = function (val) {
                this.SetByte(UnitField.UNIT_INT_BYTE0, 0, val);
            };
            //朝向
            UnitField.prototype.GetToward = function () {
                return this.GetByte(UnitField.UNIT_INT_BYTE0, 1);
            };
            UnitField.prototype.SetToward = function (val) {
                this.SetByte(UnitField.UNIT_INT_BYTE0, 1, val);
            };
            //速度
            UnitField.prototype.GetSpeed = function () {
                return this.GetByte(UnitField.UNIT_INT_BYTE0, 2);
            };
            UnitField.prototype.SetSpeed = function (val) {
                this.SetByte(UnitField.UNIT_INT_BYTE0, 2, val);
            };
            //生存状态
            UnitField.prototype.GetLiveStatus = function () {
                return this.GetByte(UnitField.UNIT_INT_BYTE0, 3);
            };
            UnitField.prototype.SetLiveStatus = function (val) {
                this.SetByte(UnitField.UNIT_INT_BYTE0, 3, val);
            };
            UnitField.prototype.GetByte1 = function (offset) {
                return this.GetByte(UnitField.UNIT_INT_BYTE1, offset);
            };
            UnitField.prototype.SetByte1 = function (offset, val) {
                this.SetByte(UnitField.UNIT_INT_BYTE1, offset, val);
            };
            //精灵类型ID
            UnitField.prototype.GetTypeId = function () {
                return this.GetByte(UnitField.UNIT_INT_BYTE1, 0);
            };
            UnitField.prototype.SetTypeId = function (val) {
                this.SetByte(UnitField.UNIT_INT_BYTE1, 0, val);
            };
            //坐骑模板
            UnitField.prototype.GetMount = function () {
                return this.GetByte(UnitField.UNIT_INT_BYTE1, 1);
            };
            UnitField.prototype.SetMount = function (val) {
                this.SetByte(UnitField.UNIT_INT_BYTE1, 1, val);
            };
            //攻击模式
            UnitField.prototype.GetAttackMode = function () {
                return this.GetByte(UnitField.UNIT_INT_BYTE1, 2);
            };
            UnitField.prototype.SetAttackMode = function (val) {
                this.SetByte(UnitField.UNIT_INT_BYTE1, 2, val);
            };
            //性别
            UnitField.prototype.GetSex = function () {
                return this.GetByte(UnitField.UNIT_INT_BYTE1, 3);
            };
            UnitField.prototype.SetSex = function (val) {
                this.SetByte(UnitField.UNIT_INT_BYTE1, 3, val);
            };
            UnitField.prototype.GetMaxHp = function () {
                return this.GetUInt32(UnitField.UNIT_INT_MAX_HP);
            };
            UnitField.prototype.SetMaxHp = function (val) {
                this.SetUInt32(UnitField.UNIT_INT_MAX_HP, val);
            };
            UnitField.prototype.GetHp = function () {
                return this.GetUInt32(UnitField.UNIT_INT_HP);
            };
            UnitField.prototype.SetHp = function (val) {
                this.SetUInt32(UnitField.UNIT_INT_HP, val);
            };
            UnitField.prototype.GetEntry = function () {
                return this.GetUInt32(UnitField.UNIT_INT_ENTRY);
            };
            UnitField.prototype.SetEntry = function (val) {
                this.SetUInt32(UnitField.UNIT_INT_ENTRY, val);
            };
            UnitField.prototype.GetNpcByte = function (offset) {
                return this.GetByte(UnitField.UNIT_INT_NPC_BYTE, offset);
            };
            UnitField.prototype.SetNpcByte = function (offset, val) {
                this.SetByte(UnitField.UNIT_INT_NPC_BYTE, offset, val);
            };
            //NPC标志0-怪物，1-NPC，2-游戏对象
            UnitField.prototype.GetNpcFlag = function () {
                return this.GetByte(UnitField.UNIT_INT_NPC_BYTE, 0);
            };
            UnitField.prototype.SetNpcFlag = function (val) {
                this.SetByte(UnitField.UNIT_INT_NPC_BYTE, 0, val);
            };
            UnitField.prototype.GetShowWeapon = function () {
                return this.GetUInt32(UnitField.UNIT_INT_SHOW_WEAPON);
            };
            UnitField.prototype.SetShowWeapon = function (val) {
                this.SetUInt32(UnitField.UNIT_INT_SHOW_WEAPON, val);
            };
            UnitField.prototype.GetShowCoat = function () {
                return this.GetUInt32(UnitField.UNIT_INT_SHOW_COAT);
            };
            UnitField.prototype.SetShowCoat = function (val) {
                this.SetUInt32(UnitField.UNIT_INT_SHOW_COAT, val);
            };
            UnitField.prototype.GetForce = function () {
                return this.GetUInt32(UnitField.UNIT_INT_FORCE);
            };
            UnitField.prototype.SetForce = function (val) {
                this.SetUInt32(UnitField.UNIT_INT_FORCE, val);
            };
            UnitField.prototype.GetBuffId = function (offset) {
                return this.GetInt16(UnitField.UNIT_INT_BUFF_ID + Math.floor(offset / 2), offset % 2);
            };
            UnitField.prototype.SetBuffId = function (offset, val) {
                this.SetInt16(UnitField.UNIT_INT_BUFF_ID + Math.floor(offset / 2), offset % 2, val);
            };
            UnitField.prototype.GetBuffTm = function (index) {
                return this.GetUInt32(UnitField.UNIT_INT_BUFF_TM + index);
            };
            UnitField.prototype.SetBuffTm = function (index, val) {
                this.SetUInt32(UnitField.UNIT_INT_BUFF_TM + index, val);
            };
            UnitField.prototype.GetBuffData = function (index) {
                return this.GetUInt32(UnitField.UNIT_INT_BUFF_DATA + index);
            };
            UnitField.prototype.SetBuffData = function (index, val) {
                this.SetUInt32(UnitField.UNIT_INT_BUFF_DATA + index, val);
            };
            UnitField.prototype.GetBuffLv = function (offset) {
                return this.GetInt16(UnitField.UNIT_INT_BUFF_LV + Math.floor(offset / 2), offset % 2);
            };
            UnitField.prototype.SetBuffLv = function (offset, val) {
                this.SetInt16(UnitField.UNIT_INT_BUFF_LV + Math.floor(offset / 2), offset % 2, val);
            };
            UnitField.prototype.GetBuffGiver = function (index) {
                return this.GetUInt32(UnitField.UNIT_INT_BUFF_GIVER + index);
            };
            UnitField.prototype.SetBuffGiver = function (index, val) {
                this.SetUInt32(UnitField.UNIT_INT_BUFF_GIVER + index, val);
            };
            UnitField.prototype.GetGoFlags = function (offset) {
                return this.GetBit(UnitField.UNIT_INT_GO_FLAGS, offset);
            };
            UnitField.prototype.SetGoFlags = function (offset, val) {
                this.SetBit(UnitField.UNIT_INT_GO_FLAGS, offset, val);
            };
            UnitField.prototype.GetGoData = function (index) {
                return this.GetInt32(UnitField.UNIT_INT_GO_DATA + index);
            };
            UnitField.prototype.SetGoData = function (index, val) {
                this.SetInt32(UnitField.UNIT_INT_GO_DATA + index, val);
            };
            UnitField.prototype.GetLevel = function () {
                return this.GetInt32(UnitField.UNIT_INT_LEVEL);
            };
            UnitField.prototype.SetLevel = function (val) {
                this.SetInt32(UnitField.UNIT_INT_LEVEL, val);
            };
            UnitField.prototype.GetMasterOid = function () {
                return this.GetInt32(UnitField.UNIT_INT_MASTER_OID);
            };
            UnitField.prototype.SetMasterOid = function (val) {
                this.SetInt32(UnitField.UNIT_INT_MASTER_OID, val);
            };
            UnitField.prototype.GetFlag = function (offset) {
                return this.GetBit(UnitField.UNIT_INT_FLAG, offset);
            };
            UnitField.prototype.SetFlag = function (offset, val) {
                this.SetBit(UnitField.UNIT_INT_FLAG, offset, val);
            };
            //////////////////////////////////////str function
            UnitField.prototype.GetName = function () {
                return this.GetStr(UnitField.UNIT_STR_NAME);
            };
            UnitField.prototype.SetName = function (val) {
                this.SetStr(UnitField.UNIT_STR_NAME, val);
            };
            UnitField.prototype.GetInstanceID = function () {
                return this.GetStr(UnitField.UNIT_STR_INSTANCE_I_D);
            };
            UnitField.prototype.SetInstanceID = function (val) {
                this.SetStr(UnitField.UNIT_STR_INSTANCE_I_D, val);
            };
            UnitField.prototype.GetMasterName = function () {
                return this.GetStr(UnitField.UNIT_STR_MASTER_NAME);
            };
            UnitField.prototype.SetMasterName = function (val) {
                this.SetStr(UnitField.UNIT_STR_MASTER_NAME, val);
            };
            UnitField.prototype.GetGangGuid = function () {
                return this.GetStr(UnitField.UNIT_STR_GANG_GUID);
            };
            UnitField.prototype.SetGangGuid = function (val) {
                this.SetStr(UnitField.UNIT_STR_GANG_GUID, val);
            };
            UnitField.prototype.GetGangName = function () {
                return this.GetStr(UnitField.UNIT_STR_GANG_NAME);
            };
            UnitField.prototype.SetGangName = function (val) {
                this.SetStr(UnitField.UNIT_STR_GANG_NAME, val);
            };
            // define
            UnitField.ATTR_HP = 1; //生命
            UnitField.ATTR_MP = 2; //魔法
            UnitField.ATTR_ATK = 3; //攻击
            UnitField.ATTR_DEF = 4; //防御
            UnitField.MAX_ATTR = 5; //最大属性值
            UnitField.MAX_BUFF = 12; //最大buff数量
            UnitField.TYPE_ID_PLAYER = 0; //玩家
            UnitField.TYPE_ID_CREATURE = 1; //生物
            UnitField.TYPE_ID_GAMEOBJ = 2; //游戏对象
            UnitField.TYPE_ID_LOOTS = 3; //战利品对象
            UnitField.ATTACK_MODE_HEPING = 0; //和平
            UnitField.ATTACK_MODE_HANGHUI = 1; //行会
            UnitField.ATTACK_MODE_ALL = 2; //全体
            UnitField.MAX_ATTACK_MODE = 3; //最大攻击模式类型
            UnitField.LIVE_STATUS_OK = 0; //活着
            UnitField.LIVE_STATU_DIE = 1; //死了
            UnitField.HIT_NOMAL = 1; //普通
            UnitField.HIT_CRIT = 2; //暴击
            UnitField.HIT_MISS = 3; //闪避
            UnitField.HIT_ZHILIAO = 4; //治疗
            UnitField.UNIT_BIT_GUAJIBAOHU = 0; //是否挂机保护
            UnitField.UNIT_BIT_IS_LIMIT_CAST = 1; //是否限制施法
            UnitField.UNIT_BIT_IS_LIMIT_MOVE = 2; //是否限制移动
            UnitField.UNIT_BIT_IS_SPELL_CASTING = 3; //施法中
            UnitField.UNIT_BIT_IS_PKING = 4; //pk状态
            // int field
            UnitField.UNIT_INT_POS_X = 0; //X坐标
            UnitField.UNIT_INT_POS_Y = 1; //Y坐标
            UnitField.UNIT_INT_TARGET_POS = 2; //目标点
            UnitField.UNIT_INT_BYTE0 = 3; //0.移动状态 1.朝向 2.速度 3.生存状态
            UnitField.UNIT_INT_BYTE1 = 4; //0.精灵类型ID 1.坐骑模板 2.攻击模式 3.性别
            UnitField.UNIT_INT_MAX_HP = 5; //最大血量
            UnitField.UNIT_INT_HP = 6; //当前血量
            UnitField.UNIT_INT_ENTRY = 7; //生物模板ID
            UnitField.UNIT_INT_NPC_BYTE = 8; //0.NPC标志 1.预留 2.预留 3.预留
            UnitField.UNIT_INT_SHOW_WEAPON = 9; //武器显示
            UnitField.UNIT_INT_SHOW_COAT = 10; //衣服显示
            UnitField.UNIT_INT_FORCE = 11; //战斗力	
            UnitField.UNIT_INT_BUFF_ID = 12; //BUFFID16位
            UnitField.UNIT_INT_BUFF_TM = 18; //BUFF持续时间32位
            UnitField.UNIT_INT_BUFF_DATA = 30; //BUFF预留值32位
            UnitField.UNIT_INT_BUFF_LV = 42; //BUFF等级16位
            UnitField.UNIT_INT_BUFF_GIVER = 48; //BUFF释放者OID~跨图不能带走~~
            UnitField.UNIT_INT_GO_FLAGS = 60; //游戏对象的一些标识位
            UnitField.UNIT_INT_GO_DATA = 61; //动态数据字段,目前保留为4个int
            UnitField.UNIT_INT_LEVEL = 65; //等级
            UnitField.UNIT_INT_MASTER_OID = 66; //主人的ID
            UnitField.UNIT_INT_FLAG = 67; //bit位
            // string field
            UnitField.UNIT_STR_NAME = 0; //玩家名字
            UnitField.UNIT_STR_INSTANCE_I_D = 1; //地图实例ID
            UnitField.UNIT_STR_MASTER_NAME = 2; //主人名字
            UnitField.UNIT_STR_GANG_GUID = 3; //帮派GUID
            UnitField.UNIT_STR_GANG_NAME = 4; //帮派名字
            return UnitField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.UnitField = UnitField;
        //Item def
        ////////////////////////////////////////////////////////////////
        var ItemField = /** @class */ (function (_super) {
            __extends(ItemField, _super);
            function ItemField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            // string field
            ItemField.prototype.GetItemEntry = function (index) {
                return this.GetUInt32(ItemField.ITEM_INT_ITEM_ENTRY + index * 5);
            };
            ItemField.prototype.SetItemEntry = function (index, val) {
                this.SetUInt32(ItemField.ITEM_INT_ITEM_ENTRY + index * 5, val);
            };
            ItemField.prototype.GetFailTime = function (index) {
                return this.GetUInt32(ItemField.ITEM_INT_FAIL_TIME + index * 5);
            };
            ItemField.prototype.SetFailTime = function (index, val) {
                this.SetUInt32(ItemField.ITEM_INT_FAIL_TIME + index * 5, val);
            };
            ItemField.prototype.GetFlag = function (offset) {
                return this.GetBit(ItemField.ITEM_INT_FLAG, offset);
            };
            ItemField.prototype.SetFlag = function (offset, val) {
                this.SetBit(ItemField.ITEM_INT_FLAG, offset, val);
            };
            ItemField.prototype.GetItemByte = function (offset) {
                return this.GetByte(ItemField.ITEM_INT_ITEM_BYTE, offset);
            };
            ItemField.prototype.SetItemByte = function (offset, val) {
                this.SetByte(ItemField.ITEM_INT_ITEM_BYTE, offset, val);
            };
            ItemField.prototype.GetTtemInt16 = function (offset) {
                return this.GetUInt16(ItemField.ITEM_INT_TTEM_INT16, offset);
            };
            ItemField.prototype.SetTtemInt16 = function (offset, val) {
                this.SetUInt16(ItemField.ITEM_INT_TTEM_INT16, offset, val);
            };
            //叠加数
            ItemField.prototype.GetCount = function (index) {
                return this.GetUInt16(ItemField.ITEM_INT_TTEM_INT16 + index * 5, 0);
            };
            ItemField.prototype.SetCount = function (index, val) {
                this.SetUInt16(ItemField.ITEM_INT_TTEM_INT16 + index * 5, 0, val);
            };
            // define
            ItemField.BAG_TYPE_PACK = 0; //道具背包
            ItemField.BAG_TYPE_BOX = 1; //宝箱背包
            ItemField.BAG_TYPE_EQUIP_CHIP = 2; //装备碎片背包
            ItemField.BAG_TYPE_WJ_CHIP = 3; //武将碎片
            ItemField.MAX_BAG_TYPE = 4; //背包最大枚举
            ItemField.MAX_BAG_SIZE_0 = 1000; //最大装备容量
            ItemField.MAX_BAG_SIZE_1 = 1200; //最大宝箱容量
            ItemField.MAX_BAG_SIZE_2 = 1500; //最大装备碎片容量
            ItemField.MAX_BAG_SIZE_3 = 1800; //最大武将碎片容量
            ItemField.ITEM_TYPE_BOX = 0; //宝箱
            ItemField.ITEM_TYPE_ITEM = 1; //普通道具
            ItemField.ITEM_TYPE_EQUIP_CHIP = 2; //装备碎片
            ItemField.ITEM_TYPE_BAOWU_CHIP = 3; //宝物碎片
            ItemField.ITEM_TYPE_WJ_CHIP = 4; //武将碎片
            ItemField.ITEM_TYPE_EQUIP = 5; //装备
            ItemField.ITEM_TYPE_BAOWU = 6; //宝物
            ItemField.ITEM_TYPE_WJ = 7; //武将
            ItemField.ITEM_TYPE_CHOSSE_BOX = 8; //四选一箱子
            ItemField.MAX_ITEM_INT = 5; //物品binlog的int最大部分
            ItemField.ITEM_OPT_SELL = 1; //出售
            ItemField.ITEM_OPT_DUMP = 2; //丢弃
            ItemField.ITEM_OPT_USE = 3; //使用
            // int field
            ItemField.ITEM_INT_ITEM_ENTRY = 0; //物品ID
            ItemField.ITEM_INT_FAIL_TIME = 1; //失效时间
            ItemField.ITEM_INT_FLAG = 2; //物品bit位
            ItemField.ITEM_INT_ITEM_BYTE = 3; //物品byte位
            ItemField.ITEM_INT_TTEM_INT16 = 4; //物品int16位
            return ItemField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.ItemField = ItemField;
        //GlobalConfig def
        ////////////////////////////////////////////////////////////////
        var GlobalConfigField = /** @class */ (function (_super) {
            __extends(GlobalConfigField, _super);
            function GlobalConfigField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GlobalConfigField.prototype.GetOpenTime = function () {
                return this.GetUInt32(GlobalConfigField.GLOBALCONFIG_INT_OPEN_TIME);
            };
            GlobalConfigField.prototype.SetOpenTime = function (val) {
                this.SetUInt32(GlobalConfigField.GLOBALCONFIG_INT_OPEN_TIME, val);
            };
            GlobalConfigField.prototype.GetMergeTime = function () {
                return this.GetUInt32(GlobalConfigField.GLOBALCONFIG_INT_MERGE_TIME);
            };
            GlobalConfigField.prototype.SetMergeTime = function (val) {
                this.SetUInt32(GlobalConfigField.GLOBALCONFIG_INT_MERGE_TIME, val);
            };
            GlobalConfigField.prototype.GetSyncLogTime = function () {
                return this.GetUInt32(GlobalConfigField.GLOBALCONFIG_INT_SYNC_LOG_TIME);
            };
            GlobalConfigField.prototype.SetSyncLogTime = function (val) {
                this.SetUInt32(GlobalConfigField.GLOBALCONFIG_INT_SYNC_LOG_TIME, val);
            };
            GlobalConfigField.prototype.GetMergeEndTime = function () {
                return this.GetUInt32(GlobalConfigField.GLOBALCONFIG_INT_MERGE_END_TIME);
            };
            GlobalConfigField.prototype.SetMergeEndTime = function (val) {
                this.SetUInt32(GlobalConfigField.GLOBALCONFIG_INT_MERGE_END_TIME, val);
            };
            //////////////////////////////////////str function
            GlobalConfigField.prototype.GetMergeToServerName = function () {
                return this.GetStr(GlobalConfigField.GLOBALCONFIG_STR_MERGE_TO_SERVER_NAME);
            };
            GlobalConfigField.prototype.SetMergeToServerName = function (val) {
                this.SetStr(GlobalConfigField.GLOBALCONFIG_STR_MERGE_TO_SERVER_NAME, val);
            };
            GlobalConfigField.prototype.Get___YuLiu = function (index) {
                return this.GetStr(GlobalConfigField.GLOBALCONFIG_STR_YU_LIU + index);
            };
            GlobalConfigField.prototype.Set___YuLiu = function (index, val) {
                this.SetStr(GlobalConfigField.GLOBALCONFIG_STR_YU_LIU + index, val);
            };
            GlobalConfigField.prototype.GetServerName = function (index) {
                return this.GetStr(GlobalConfigField.GLOBALCONFIG_STR_SERVER_NAME + index);
            };
            GlobalConfigField.prototype.SetServerName = function (index, val) {
                this.SetStr(GlobalConfigField.GLOBALCONFIG_STR_SERVER_NAME + index, val);
            };
            // define
            // int field
            GlobalConfigField.GLOBALCONFIG_INT_OPEN_TIME = 0; //开服时间
            GlobalConfigField.GLOBALCONFIG_INT_MERGE_TIME = 1; //合服时间
            GlobalConfigField.GLOBALCONFIG_INT_SYNC_LOG_TIME = 2; //日志同步时间
            GlobalConfigField.GLOBALCONFIG_INT_MERGE_END_TIME = 3; //合服结束时间
            // string field
            GlobalConfigField.GLOBALCONFIG_STR_MERGE_TO_SERVER_NAME = 0; //合并到哪个服
            GlobalConfigField.GLOBALCONFIG_STR_YU_LIU = 1; //预留的一堆下标，往这里插入下标的时候，注意修改占位
            GlobalConfigField.GLOBALCONFIG_STR_SERVER_NAME = 100; //第一个是主服的服务器名，后面的都是合并过来的服务器
            return GlobalConfigField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.GlobalConfigField = GlobalConfigField;
        //Quest def
        ////////////////////////////////////////////////////////////////
        var QuestField = /** @class */ (function (_super) {
            __extends(QuestField, _super);
            function QuestField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            // string field
            QuestField.prototype.GetQuestId = function (index) {
                return this.GetUInt32(QuestField.QUEST_INT_QUEST_ID + index);
            };
            QuestField.prototype.SetQuestId = function (index, val) {
                this.SetUInt32(QuestField.QUEST_INT_QUEST_ID + index, val);
            };
            QuestField.prototype.GetQuestStatus = function (offset) {
                return this.GetByte(QuestField.QUEST_INT_QUEST_STATUS + Math.floor(offset / 4), offset % 4);
            };
            QuestField.prototype.SetQuestStatus = function (offset, val) {
                this.SetByte(QuestField.QUEST_INT_QUEST_STATUS + Math.floor(offset / 4), offset % 4, val);
            };
            QuestField.prototype.GetProgress = function (offset) {
                return this.GetInt16(QuestField.QUEST_INT_PROGRESS + Math.floor(offset / 2), offset % 2);
            };
            QuestField.prototype.SetProgress = function (offset, val) {
                this.SetInt16(QuestField.QUEST_INT_PROGRESS + Math.floor(offset / 2), offset % 2, val);
            };
            QuestField.prototype.GetComplete = function (offset) {
                return this.GetBit(QuestField.QUEST_INT_COMPLETE, offset);
            };
            QuestField.prototype.SetComplete = function (offset, val) {
                this.SetBit(QuestField.QUEST_INT_COMPLETE, offset, val);
            };
            // define
            QuestField.QUEST_STATUS_NONE = 0; //未完成
            QuestField.QUEST_STATUS_COMPLETE = 1; //待完成
            QuestField.MAX_QUEST_SLOT = 12; //任务槽大小
            // int field
            QuestField.QUEST_INT_QUEST_ID = 0; //任务ID
            QuestField.QUEST_INT_QUEST_STATUS = 12; //状态
            QuestField.QUEST_INT_PROGRESS = 15; //任务进度
            QuestField.QUEST_INT_COMPLETE = 21; //任务完成标志
            return QuestField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.QuestField = QuestField;
        //ItemBonus def
        ////////////////////////////////////////////////////////////////
        var ItemBonusField = /** @class */ (function (_super) {
            __extends(ItemBonusField, _super);
            function ItemBonusField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            // string field
            ItemBonusField.prototype.GetItemEntry = function () {
                return this.GetUInt32(ItemBonusField.ITEMBONUS_INT_ITEM_ENTRY);
            };
            ItemBonusField.prototype.SetItemEntry = function (val) {
                this.SetUInt32(ItemBonusField.ITEMBONUS_INT_ITEM_ENTRY, val);
            };
            ItemBonusField.prototype.GetCount = function () {
                return this.GetUInt32(ItemBonusField.ITEMBONUS_INT_COUNT);
            };
            ItemBonusField.prototype.SetCount = function (val) {
                this.SetUInt32(ItemBonusField.ITEMBONUS_INT_COUNT, val);
            };
            ItemBonusField.prototype.GetItemType = function () {
                return this.GetUInt32(ItemBonusField.ITEMBONUS_INT_ITEM_TYPE);
            };
            ItemBonusField.prototype.SetItemType = function (val) {
                this.SetUInt32(ItemBonusField.ITEMBONUS_INT_ITEM_TYPE, val);
            };
            // define
            // int field
            ItemBonusField.ITEMBONUS_INT_ITEM_ENTRY = 0; //物品ID
            ItemBonusField.ITEMBONUS_INT_COUNT = 1; //数量
            ItemBonusField.ITEMBONUS_INT_ITEM_TYPE = 2; //获取类型
            return ItemBonusField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.ItemBonusField = ItemBonusField;
        //Map def
        ////////////////////////////////////////////////////////////////
        var MapField = /** @class */ (function (_super) {
            __extends(MapField, _super);
            function MapField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MapField.prototype.GetMapID = function () {
                return this.GetUInt32(MapField.MAP_INT_MAP_I_D);
            };
            MapField.prototype.SetMapID = function (val) {
                this.SetUInt32(MapField.MAP_INT_MAP_I_D, val);
            };
            MapField.prototype.GetMapByte = function (offset) {
                return this.GetByte(MapField.MAP_INT_MAP_BYTE, offset);
            };
            MapField.prototype.SetMapByte = function (offset, val) {
                this.SetByte(MapField.MAP_INT_MAP_BYTE, offset, val);
            };
            //地图状态
            MapField.prototype.GetMapState = function () {
                return this.GetByte(MapField.MAP_INT_MAP_BYTE, 0);
            };
            MapField.prototype.SetMapState = function (val) {
                this.SetByte(MapField.MAP_INT_MAP_BYTE, 0, val);
            };
            MapField.prototype.GetMapIntData = function (index) {
                return this.GetUInt32(MapField.MAP_INT_MAP_INT_DATA + index);
            };
            MapField.prototype.SetMapIntData = function (index, val) {
                this.SetUInt32(MapField.MAP_INT_MAP_INT_DATA + index, val);
            };
            //////////////////////////////////////str function
            MapField.prototype.GetInstanceID = function () {
                return this.GetStr(MapField.MAP_STR_INSTANCE_I_D);
            };
            MapField.prototype.SetInstanceID = function (val) {
                this.SetStr(MapField.MAP_STR_INSTANCE_I_D, val);
            };
            MapField.prototype.GetTeleportPar = function () {
                return this.GetStr(MapField.MAP_STR_TELEPORT_PAR);
            };
            MapField.prototype.SetTeleportPar = function (val) {
                this.SetStr(MapField.MAP_STR_TELEPORT_PAR, val);
            };
            MapField.prototype.GetMapStrData = function (index) {
                return this.GetStr(MapField.MAP_STR_MAP_STR_DATA + index);
            };
            MapField.prototype.SetMapStrData = function (index, val) {
                this.SetStr(MapField.MAP_STR_MAP_STR_DATA + index, val);
            };
            // define
            // int field
            MapField.MAP_INT_MAP_I_D = 0; //地图模板ID
            MapField.MAP_INT_MAP_BYTE = 1; //0.地图状态
            MapField.MAP_INT_MAP_INT_DATA = 2; //我说它是啥就是啥
            // string field
            MapField.MAP_STR_INSTANCE_I_D = 0; //地图实例ID
            MapField.MAP_STR_TELEPORT_PAR = 1; //地图传送参数
            MapField.MAP_STR_MAP_STR_DATA = 2; //我说它是啥就是啥
            return MapField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.MapField = MapField;
        //QueryPlayer def
        ////////////////////////////////////////////////////////////////
        var QueryPlayerField = /** @class */ (function (_super) {
            __extends(QueryPlayerField, _super);
            function QueryPlayerField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            QueryPlayerField.prototype.GetEquip = function (index) {
                return this.GetUInt32(QueryPlayerField.QUERYPLAYER_INT_EQUIP + index);
            };
            QueryPlayerField.prototype.SetEquip = function (index, val) {
                this.SetUInt32(QueryPlayerField.QUERYPLAYER_INT_EQUIP + index, val);
            };
            //////////////////////////////////////str function
            QueryPlayerField.prototype.GetName = function () {
                return this.GetStr(QueryPlayerField.QUERYPLAYER_STR_NAME);
            };
            QueryPlayerField.prototype.SetName = function (val) {
                this.SetStr(QueryPlayerField.QUERYPLAYER_STR_NAME, val);
            };
            // define
            // int field
            QueryPlayerField.QUERYPLAYER_INT_EQUIP = 0; //装备模板
            // string field
            QueryPlayerField.QUERYPLAYER_STR_NAME = 0; //名字
            return QueryPlayerField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.QueryPlayerField = QueryPlayerField;
        //CreatePlayer def
        ////////////////////////////////////////////////////////////////
        var CreatePlayerField = /** @class */ (function (_super) {
            __extends(CreatePlayerField, _super);
            function CreatePlayerField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CreatePlayerField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.CreatePlayerField = CreatePlayerField;
        //QueryBigDtFight def
        ////////////////////////////////////////////////////////////////
        var QueryBigDtFightField = /** @class */ (function (_super) {
            __extends(QueryBigDtFightField, _super);
            function QueryBigDtFightField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            QueryBigDtFightField.prototype.GetForce = function () {
                return this.GetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_FORCE);
            };
            QueryBigDtFightField.prototype.SetForce = function (val) {
                this.SetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_FORCE, val);
            };
            QueryBigDtFightField.prototype.GetShowCoat = function () {
                return this.GetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_SHOW_COAT);
            };
            QueryBigDtFightField.prototype.SetShowCoat = function (val) {
                this.SetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_SHOW_COAT, val);
            };
            QueryBigDtFightField.prototype.GetShowWeapon = function () {
                return this.GetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_SHOW_WEAPON);
            };
            QueryBigDtFightField.prototype.SetShowWeapon = function (val) {
                this.SetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_SHOW_WEAPON, val);
            };
            QueryBigDtFightField.prototype.GetWingsLevel = function () {
                return this.GetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_WINGS_LEVEL);
            };
            QueryBigDtFightField.prototype.SetWingsLevel = function (val) {
                this.SetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_WINGS_LEVEL, val);
            };
            //////////////////////////////////////str function
            QueryBigDtFightField.prototype.GetName = function () {
                return this.GetStr(QueryBigDtFightField.QUERYBIGDTFIGHT_STR_NAME);
            };
            QueryBigDtFightField.prototype.SetName = function (val) {
                this.SetStr(QueryBigDtFightField.QUERYBIGDTFIGHT_STR_NAME, val);
            };
            // define
            // int field
            QueryBigDtFightField.QUERYBIGDTFIGHT_INT_FORCE = 0; //战斗力
            QueryBigDtFightField.QUERYBIGDTFIGHT_INT_SHOW_COAT = 1; //衣服
            QueryBigDtFightField.QUERYBIGDTFIGHT_INT_SHOW_WEAPON = 2; //武器
            QueryBigDtFightField.QUERYBIGDTFIGHT_INT_WINGS_LEVEL = 3; //翅膀
            // string field
            QueryBigDtFightField.QUERYBIGDTFIGHT_STR_NAME = 0; //名字
            return QueryBigDtFightField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.QueryBigDtFightField = QueryBigDtFightField;
        //QueryBigDt def
        ////////////////////////////////////////////////////////////////
        var QueryBigDtField = /** @class */ (function (_super) {
            __extends(QueryBigDtField, _super);
            function QueryBigDtField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            QueryBigDtField.prototype.GetForce = function () {
                return this.GetUInt32(QueryBigDtField.QUERYBIGDT_INT_FORCE);
            };
            QueryBigDtField.prototype.SetForce = function (val) {
                this.SetUInt32(QueryBigDtField.QUERYBIGDT_INT_FORCE, val);
            };
            //////////////////////////////////////str function
            QueryBigDtField.prototype.GetName = function () {
                return this.GetStr(QueryBigDtField.QUERYBIGDT_STR_NAME);
            };
            QueryBigDtField.prototype.SetName = function (val) {
                this.SetStr(QueryBigDtField.QUERYBIGDT_STR_NAME, val);
            };
            // define
            // int field
            QueryBigDtField.QUERYBIGDT_INT_FORCE = 0; //战斗力
            // string field
            QueryBigDtField.QUERYBIGDT_STR_NAME = 0; //名字
            return QueryBigDtField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.QueryBigDtField = QueryBigDtField;
        //PlayerData def
        ////////////////////////////////////////////////////////////////
        var PlayerDataField = /** @class */ (function (_super) {
            __extends(PlayerDataField, _super);
            function PlayerDataField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            PlayerDataField.prototype.GetRegTime = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_REG_TIME);
            };
            PlayerDataField.prototype.SetRegTime = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_REG_TIME, val);
            };
            PlayerDataField.prototype.GetLastLoginTime = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_LOGIN_TIME);
            };
            PlayerDataField.prototype.SetLastLoginTime = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_LOGIN_TIME, val);
            };
            PlayerDataField.prototype.GetOnlineTime = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_ONLINE_TIME);
            };
            PlayerDataField.prototype.SetOnlineTime = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_ONLINE_TIME, val);
            };
            PlayerDataField.prototype.GetFirstRechargeTime = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_FIRST_RECHARGE_TIME);
            };
            PlayerDataField.prototype.SetFirstRechargeTime = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_FIRST_RECHARGE_TIME, val);
            };
            PlayerDataField.prototype.GetFirstRechargeMoney = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_FIRST_RECHARGE_MONEY);
            };
            PlayerDataField.prototype.SetFirstRechargeMoney = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_FIRST_RECHARGE_MONEY, val);
            };
            PlayerDataField.prototype.GetByte0 = function (offset) {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE0, offset);
            };
            PlayerDataField.prototype.SetByte0 = function (offset, val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE0, offset, val);
            };
            //0头像ID
            PlayerDataField.prototype.GetHead = function () {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE0, 0);
            };
            PlayerDataField.prototype.SetHead = function (val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE0, 0, val);
            };
            //1头像框ID
            PlayerDataField.prototype.GetHeadFrame = function () {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE0, 1);
            };
            PlayerDataField.prototype.SetHeadFrame = function (val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE0, 1, val);
            };
            //性别0男1女
            PlayerDataField.prototype.GetSex = function () {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE0, 2);
            };
            PlayerDataField.prototype.SetSex = function (val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE0, 2, val);
            };
            PlayerDataField.prototype.GetByte1 = function (offset) {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE1, offset);
            };
            PlayerDataField.prototype.SetByte1 = function (offset, val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE1, offset, val);
            };
            PlayerDataField.prototype.GetByte2 = function (offset) {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE2, offset);
            };
            PlayerDataField.prototype.SetByte2 = function (offset, val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE2, offset, val);
            };
            //vip等级
            PlayerDataField.prototype.GetVipLevel = function () {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE2, 0);
            };
            PlayerDataField.prototype.SetVipLevel = function (val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE2, 0, val);
            };
            //低级免费招募次数
            PlayerDataField.prototype.GetLowZhaomuTimes = function () {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE2, 1);
            };
            PlayerDataField.prototype.SetLowZhaomuTimes = function (val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE2, 1, val);
            };
            //高级免费招募次数
            PlayerDataField.prototype.GetHighZhaomuTimes = function () {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE2, 2);
            };
            PlayerDataField.prototype.SetHighZhaomuTimes = function (val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE2, 2, val);
            };
            //十次必出当前次数
            PlayerDataField.prototype.GetTenZhaomuTimes = function () {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE2, 3);
            };
            PlayerDataField.prototype.SetTenZhaomuTimes = function (val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE2, 3, val);
            };
            PlayerDataField.prototype.GetPU160 = function (offset) {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_P_U160, offset);
            };
            PlayerDataField.prototype.SetPU160 = function (offset, val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_P_U160, offset, val);
            };
            //体力
            PlayerDataField.prototype.GetPower = function () {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_P_U160, 0);
            };
            PlayerDataField.prototype.SetPower = function (val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_P_U160, 0, val);
            };
            //精力
            PlayerDataField.prototype.GetJingli = function () {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_P_U160, 1);
            };
            PlayerDataField.prototype.SetJingli = function (val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_P_U160, 1, val);
            };
            PlayerDataField.prototype.GetForce = function () {
                return this.GetInt32(PlayerDataField.PLAYERDATA_INT_FORCE);
            };
            PlayerDataField.prototype.SetForce = function (val) {
                this.SetInt32(PlayerDataField.PLAYERDATA_INT_FORCE, val);
            };
            PlayerDataField.prototype.GetMoneyGold = function () {
                return this.GetInt32(PlayerDataField.PLAYERDATA_INT_MONEY_GOLD);
            };
            PlayerDataField.prototype.SetMoneyGold = function (val) {
                this.SetInt32(PlayerDataField.PLAYERDATA_INT_MONEY_GOLD, val);
            };
            PlayerDataField.prototype.GetMoneySilver = function () {
                return this.GetInt32(PlayerDataField.PLAYERDATA_INT_MONEY_SILVER);
            };
            PlayerDataField.prototype.SetMoneySilver = function (val) {
                this.SetInt32(PlayerDataField.PLAYERDATA_INT_MONEY_SILVER, val);
            };
            PlayerDataField.prototype.GetZeroResetTime = function () {
                return this.GetInt32(PlayerDataField.PLAYERDATA_INT_ZERO_RESET_TIME);
            };
            PlayerDataField.prototype.SetZeroResetTime = function (val) {
                this.SetInt32(PlayerDataField.PLAYERDATA_INT_ZERO_RESET_TIME, val);
            };
            PlayerDataField.prototype.GetGmRechargeId = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_GM_RECHARGE_ID);
            };
            PlayerDataField.prototype.SetGmRechargeId = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_GM_RECHARGE_ID, val);
            };
            PlayerDataField.prototype.GetLastRechargeTime = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_RECHARGE_TIME);
            };
            PlayerDataField.prototype.SetLastRechargeTime = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_RECHARGE_TIME, val);
            };
            PlayerDataField.prototype.GetLastConsumeTime = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_CONSUME_TIME);
            };
            PlayerDataField.prototype.SetLastConsumeTime = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_CONSUME_TIME, val);
            };
            PlayerDataField.prototype.GetIsFcm = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_IS_FCM);
            };
            PlayerDataField.prototype.SetIsFcm = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_IS_FCM, val);
            };
            PlayerDataField.prototype.GetFcmOnlineTime = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_FCM_ONLINE_TIME);
            };
            PlayerDataField.prototype.SetFcmOnlineTime = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_FCM_ONLINE_TIME, val);
            };
            PlayerDataField.prototype.GetShutUpEndTime = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_SHUT_UP_END_TIME);
            };
            PlayerDataField.prototype.SetShutUpEndTime = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_SHUT_UP_END_TIME, val);
            };
            PlayerDataField.prototype.GetLastAddPower = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_ADD_POWER);
            };
            PlayerDataField.prototype.SetLastAddPower = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_ADD_POWER, val);
            };
            PlayerDataField.prototype.GetLastAddJingli = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_ADD_JINGLI);
            };
            PlayerDataField.prototype.SetLastAddJingli = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_ADD_JINGLI, val);
            };
            PlayerDataField.prototype.GetShengWang = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_SHENG_WANG);
            };
            PlayerDataField.prototype.SetShengWang = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_SHENG_WANG, val);
            };
            PlayerDataField.prototype.GetZhanGong = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_ZHAN_GONG);
            };
            PlayerDataField.prototype.SetZhanGong = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_ZHAN_GONG, val);
            };
            PlayerDataField.prototype.GetShenHun = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_SHEN_HUN);
            };
            PlayerDataField.prototype.SetShenHun = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_SHEN_HUN, val);
            };
            PlayerDataField.prototype.GetJiangHun = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_JIANG_HUN);
            };
            PlayerDataField.prototype.SetJiangHun = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_JIANG_HUN, val);
            };
            PlayerDataField.prototype.GetWeiMing = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_WEI_MING);
            };
            PlayerDataField.prototype.SetWeiMing = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_WEI_MING, val);
            };
            PlayerDataField.prototype.GetZhengTaoLing = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_ZHENG_TAO_LING);
            };
            PlayerDataField.prototype.SetZhengTaoLing = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_ZHENG_TAO_LING, val);
            };
            PlayerDataField.prototype.GetZhenWei = function (offset) {
                return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_ZHEN_WEI + Math.floor(offset / 2), offset % 2);
            };
            PlayerDataField.prototype.SetZhenWei = function (offset, val) {
                this.SetUInt16(PlayerDataField.PLAYERDATA_INT_ZHEN_WEI + Math.floor(offset / 2), offset % 2, val);
            };
            PlayerDataField.prototype.GetYuanJun = function (offset) {
                return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_YUAN_JUN + Math.floor(offset / 2), offset % 2);
            };
            PlayerDataField.prototype.SetYuanJun = function (offset, val) {
                this.SetUInt16(PlayerDataField.PLAYERDATA_INT_YUAN_JUN + Math.floor(offset / 2), offset % 2, val);
            };
            PlayerDataField.prototype.GetTuJIanBonus = function (offset) {
                return this.GetBit(PlayerDataField.PLAYERDATA_INT_TU_J_IAN_BONUS, offset);
            };
            PlayerDataField.prototype.SetTuJIanBonus = function (offset, val) {
                this.SetBit(PlayerDataField.PLAYERDATA_INT_TU_J_IAN_BONUS, offset, val);
            };
            PlayerDataField.prototype.GetCurFuBenId = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_CUR_FU_BEN_ID);
            };
            PlayerDataField.prototype.SetCurFuBenId = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_CUR_FU_BEN_ID, val);
            };
            PlayerDataField.prototype.GetTotalStars = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_TOTAL_STARS);
            };
            PlayerDataField.prototype.SetTotalStars = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_TOTAL_STARS, val);
            };
            PlayerDataField.prototype.GetZxFuBenTimes = function (offset) {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_ZX_FU_BEN_TIMES + Math.floor(offset / 4), offset % 4);
            };
            PlayerDataField.prototype.SetZxFuBenTimes = function (offset, val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_ZX_FU_BEN_TIMES + Math.floor(offset / 4), offset % 4, val);
            };
            PlayerDataField.prototype.GetZxFuBenStars = function (offset) {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_ZX_FU_BEN_STARS + Math.floor(offset / 4), offset % 4);
            };
            PlayerDataField.prototype.SetZxFuBenStars = function (offset, val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_ZX_FU_BEN_STARS + Math.floor(offset / 4), offset % 4, val);
            };
            PlayerDataField.prototype.GetZxFuBenResetTimes = function (offset) {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_ZX_FU_BEN_RESET_TIMES + Math.floor(offset / 4), offset % 4);
            };
            PlayerDataField.prototype.SetZxFuBenResetTimes = function (offset, val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_ZX_FU_BEN_RESET_TIMES + Math.floor(offset / 4), offset % 4, val);
            };
            PlayerDataField.prototype.GetRcFuBenTimes = function (offset) {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_RC_FU_BEN_TIMES + Math.floor(offset / 4), offset % 4);
            };
            PlayerDataField.prototype.SetRcFuBenTimes = function (offset, val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_RC_FU_BEN_TIMES + Math.floor(offset / 4), offset % 4, val);
            };
            PlayerDataField.prototype.GetRcFuBenDifficulty = function (offset) {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_RC_FU_BEN_DIFFICULTY + Math.floor(offset / 4), offset % 4);
            };
            PlayerDataField.prototype.SetRcFuBenDifficulty = function (offset, val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_RC_FU_BEN_DIFFICULTY + Math.floor(offset / 4), offset % 4, val);
            };
            PlayerDataField.prototype.GetRcFuBenResetTimes = function (offset) {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_RC_FU_BEN_RESET_TIMES + Math.floor(offset / 4), offset % 4);
            };
            PlayerDataField.prototype.SetRcFuBenResetTimes = function (offset, val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_RC_FU_BEN_RESET_TIMES + Math.floor(offset / 4), offset % 4, val);
            };
            PlayerDataField.prototype.GetBossAward = function (offset) {
                return this.GetBit(PlayerDataField.PLAYERDATA_INT_BOSS_AWARD, offset);
            };
            PlayerDataField.prototype.SetBossAward = function (offset, val) {
                this.SetBit(PlayerDataField.PLAYERDATA_INT_BOSS_AWARD, offset, val);
            };
            PlayerDataField.prototype.GetChapterAward = function (offset) {
                return this.GetBit(PlayerDataField.PLAYERDATA_INT_CHAPTER_AWARD, offset);
            };
            PlayerDataField.prototype.SetChapterAward = function (offset, val) {
                this.SetBit(PlayerDataField.PLAYERDATA_INT_CHAPTER_AWARD, offset, val);
            };
            PlayerDataField.prototype.GetJjcRank = function (offset) {
                return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK, offset);
            };
            PlayerDataField.prototype.SetJjcRank = function (offset, val) {
                this.SetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK, offset, val);
            };
            //竞技场当前排名
            PlayerDataField.prototype.GetJjcCurRank = function () {
                return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK, 0);
            };
            PlayerDataField.prototype.SetJjcCurRank = function (val) {
                this.SetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK, 0, val);
            };
            //竞技场历史最佳排名
            PlayerDataField.prototype.GetJjcBestRank = function () {
                return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK, 1);
            };
            PlayerDataField.prototype.SetJjcBestRank = function (val) {
                this.SetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK, 1, val);
            };
            PlayerDataField.prototype.GetJjcStore = function (offset) {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_JJC_STORE + Math.floor(offset / 4), offset % 4);
            };
            PlayerDataField.prototype.SetJjcStore = function (offset, val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_JJC_STORE + Math.floor(offset / 4), offset % 4, val);
            };
            PlayerDataField.prototype.GetJjcTimesLog = function (index) {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_JJC_TIMES_LOG + index);
            };
            PlayerDataField.prototype.SetJjcTimesLog = function (index, val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_JJC_TIMES_LOG + index, val);
            };
            PlayerDataField.prototype.GetJjcRankLog = function (offset) {
                return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK_LOG + Math.floor(offset / 2), offset % 2);
            };
            PlayerDataField.prototype.SetJjcRankLog = function (offset, val) {
                this.SetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK_LOG + Math.floor(offset / 2), offset % 2, val);
            };
            PlayerDataField.prototype.GetJjcResultLog = function (offset) {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_JJC_RESULT_LOG + Math.floor(offset / 4), offset % 4);
            };
            PlayerDataField.prototype.SetJjcResultLog = function (offset, val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_JJC_RESULT_LOG + Math.floor(offset / 4), offset % 4, val);
            };
            PlayerDataField.prototype.GetJjcTargetLog = function (offset) {
                return this.GetByte(PlayerDataField.PLAYERDATA_INT_JJC_TARGET_LOG + Math.floor(offset / 4), offset % 4);
            };
            PlayerDataField.prototype.SetJjcTargetLog = function (offset, val) {
                this.SetByte(PlayerDataField.PLAYERDATA_INT_JJC_TARGET_LOG + Math.floor(offset / 4), offset % 4, val);
            };
            PlayerDataField.prototype.GetJjcLogFlag = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_JJC_LOG_FLAG);
            };
            PlayerDataField.prototype.SetJjcLogFlag = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_JJC_LOG_FLAG, val);
            };
            PlayerDataField.prototype.GetPU161 = function (offset) {
                return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U161, offset);
            };
            PlayerDataField.prototype.SetPU161 = function (offset, val) {
                this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U161, offset, val);
            };
            //暗雷战斗场数
            PlayerDataField.prototype.GetHudDarkCount = function () {
                return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U161, 0);
            };
            PlayerDataField.prototype.SetHudDarkCount = function (val) {
                this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U161, 0, val);
            };
            //击败关卡boss数量
            PlayerDataField.prototype.GetHudBossCount = function () {
                return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U161, 1);
            };
            PlayerDataField.prototype.SetHudBossCount = function (val) {
                this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U161, 1, val);
            };
            PlayerDataField.prototype.GetPU162 = function (offset) {
                return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U162, offset);
            };
            PlayerDataField.prototype.SetPU162 = function (offset, val) {
                this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U162, offset, val);
            };
            //今日击败野外boss数量
            PlayerDataField.prototype.GetHudSBossCount = function () {
                return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U162, 0);
            };
            PlayerDataField.prototype.SetHudSBossCount = function (val) {
                this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U162, 0, val);
            };
            //可领取奖励的小关卡id
            PlayerDataField.prototype.GetHudPartBonusId = function () {
                return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U162, 1);
            };
            PlayerDataField.prototype.SetHudPartBonusId = function (val) {
                this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U162, 1, val);
            };
            PlayerDataField.prototype.GetHudDarkTime = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_HUD_DARK_TIME);
            };
            PlayerDataField.prototype.SetHudDarkTime = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_HUD_DARK_TIME, val);
            };
            PlayerDataField.prototype.GetOffLineTime = function () {
                return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_OFF_LINE_TIME);
            };
            PlayerDataField.prototype.SetOffLineTime = function (val) {
                this.SetUInt32(PlayerDataField.PLAYERDATA_INT_OFF_LINE_TIME, val);
            };
            PlayerDataField.prototype.GetPU163 = function (offset) {
                return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U163, offset);
            };
            PlayerDataField.prototype.SetPU163 = function (offset, val) {
                this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U163, offset, val);
            };
            //通关小关卡id
            PlayerDataField.prototype.GetHudPartId = function () {
                return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U163, 0);
            };
            PlayerDataField.prototype.SetHudPartId = function (val) {
                this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U163, 0, val);
            };
            //可领取奖励的地图id
            PlayerDataField.prototype.GetHudMapBonusId = function () {
                return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U163, 1);
            };
            PlayerDataField.prototype.SetHudMapBonusId = function (val) {
                this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U163, 1, val);
            };
            //////////////////////////////////////str function
            PlayerDataField.prototype.GetName = function () {
                return this.GetStr(PlayerDataField.PLAYERDATA_STR_NAME);
            };
            PlayerDataField.prototype.SetName = function (val) {
                this.SetStr(PlayerDataField.PLAYERDATA_STR_NAME, val);
            };
            PlayerDataField.prototype.GetCreateIP = function () {
                return this.GetStr(PlayerDataField.PLAYERDATA_STR_CREATE_I_P);
            };
            PlayerDataField.prototype.SetCreateIP = function (val) {
                this.SetStr(PlayerDataField.PLAYERDATA_STR_CREATE_I_P, val);
            };
            PlayerDataField.prototype.GetRechargeId = function (index) {
                return this.GetStr(PlayerDataField.PLAYERDATA_STR_RECHARGE_ID + index);
            };
            PlayerDataField.prototype.SetRechargeId = function (index, val) {
                this.SetStr(PlayerDataField.PLAYERDATA_STR_RECHARGE_ID + index, val);
            };
            PlayerDataField.prototype.GetJjcNameLog = function (index) {
                return this.GetStr(PlayerDataField.PLAYERDATA_STR_JJC_NAME_LOG + index);
            };
            PlayerDataField.prototype.SetJjcNameLog = function (index, val) {
                this.SetStr(PlayerDataField.PLAYERDATA_STR_JJC_NAME_LOG + index, val);
            };
            // define
            PlayerDataField.MAX_SPELL = 30; //最大技能槽数量
            PlayerDataField.MAX_SPELL_WEAR = 3; //最大可以技能
            PlayerDataField.SEX_MAN = 1; //男
            PlayerDataField.SEX_WOMAN = 2; //女
            PlayerDataField.SEX_GAY = 3; //无
            PlayerDataField.MONEY_TYPE_GOLD = 0; //元宝
            PlayerDataField.MONEY_TYPE_SILVER = 1; //银两
            PlayerDataField.PLAYER_MAX_LEVEL = 120; //玩家最大等级
            PlayerDataField.ONLINE_STATUS_OFFLINE = 0; //离线状态
            PlayerDataField.ONLINE_STATUS_ONLINE = 1; //在线状态
            PlayerDataField.ONLINE_STATUS_PLUGIN = 2; //离线挂机状态
            PlayerDataField.JJC_CUR_RANK = 1; //竞技场当前排名
            PlayerDataField.JJC_BEST_RANK = 2; //竞技场历史最佳排名
            PlayerDataField.GOLD_ENTRY = 6; //元宝的模板id
            PlayerDataField.SILVER_ENTRY = 7; //银子的模板id
            // int field
            PlayerDataField.PLAYERDATA_INT_REG_TIME = 0; //玩家创建时间
            PlayerDataField.PLAYERDATA_INT_LAST_LOGIN_TIME = 1; //最后一次登录时间
            PlayerDataField.PLAYERDATA_INT_ONLINE_TIME = 2; //在线时长，分钟
            PlayerDataField.PLAYERDATA_INT_FIRST_RECHARGE_TIME = 3; //首充时间
            PlayerDataField.PLAYERDATA_INT_FIRST_RECHARGE_MONEY = 4; //首充金额
            PlayerDataField.PLAYERDATA_INT_BYTE0 = 5; //0头像ID 1头像框ID 2性别
            PlayerDataField.PLAYERDATA_INT_BYTE1 = 6; // 
            PlayerDataField.PLAYERDATA_INT_BYTE2 = 7; //0.vip等级 1. LowZhaomuTimes2.HighZhaomuTimes 3.十次必出统计
            PlayerDataField.PLAYERDATA_INT_P_U160 = 8; //0.体力
            PlayerDataField.PLAYERDATA_INT_FORCE = 9; //总战力？先放着不确定要不要
            PlayerDataField.PLAYERDATA_INT_MONEY_GOLD = 10; //元宝
            PlayerDataField.PLAYERDATA_INT_MONEY_SILVER = 11; //银两
            PlayerDataField.PLAYERDATA_INT_ZERO_RESET_TIME = 12; //12点重置时间
            PlayerDataField.PLAYERDATA_INT_GM_RECHARGE_ID = 13; //@充值用的自增id
            PlayerDataField.PLAYERDATA_INT_LAST_RECHARGE_TIME = 14; //最后一次充值时间
            PlayerDataField.PLAYERDATA_INT_LAST_CONSUME_TIME = 15; //最后一次消费时间
            PlayerDataField.PLAYERDATA_INT_IS_FCM = 16; //是否防沉迷
            PlayerDataField.PLAYERDATA_INT_FCM_ONLINE_TIME = 17; //防沉迷在线时长，分钟
            PlayerDataField.PLAYERDATA_INT_SHUT_UP_END_TIME = 18; //禁言截止时间
            PlayerDataField.PLAYERDATA_INT_LAST_ADD_POWER = 19; //最后加体力的时间
            PlayerDataField.PLAYERDATA_INT_LAST_ADD_JINGLI = 20; //最后加体力的时间
            PlayerDataField.PLAYERDATA_INT_SHENG_WANG = 21; //声望
            PlayerDataField.PLAYERDATA_INT_ZHAN_GONG = 22; //战功
            PlayerDataField.PLAYERDATA_INT_SHEN_HUN = 23; //神魂
            PlayerDataField.PLAYERDATA_INT_JIANG_HUN = 24; //将魂
            PlayerDataField.PLAYERDATA_INT_WEI_MING = 25; //威名
            PlayerDataField.PLAYERDATA_INT_ZHENG_TAO_LING = 26; //征讨令
            PlayerDataField.PLAYERDATA_INT_ZHEN_WEI = 27; //六个上阵的武将index
            PlayerDataField.PLAYERDATA_INT_YUAN_JUN = 30; //八个援军武将index
            PlayerDataField.PLAYERDATA_INT_TU_J_IAN_BONUS = 34; //图鉴奖励
            PlayerDataField.PLAYERDATA_INT_CUR_FU_BEN_ID = 38; //玩家当前副本通关id
            PlayerDataField.PLAYERDATA_INT_TOTAL_STARS = 39; //玩家副本星星数
            PlayerDataField.PLAYERDATA_INT_ZX_FU_BEN_TIMES = 40; //挑战次数
            PlayerDataField.PLAYERDATA_INT_ZX_FU_BEN_STARS = 540; //星星数
            PlayerDataField.PLAYERDATA_INT_ZX_FU_BEN_RESET_TIMES = 1040; //重置次数
            PlayerDataField.PLAYERDATA_INT_RC_FU_BEN_TIMES = 1540; //挑战次数
            PlayerDataField.PLAYERDATA_INT_RC_FU_BEN_DIFFICULTY = 1545; //通关难度
            PlayerDataField.PLAYERDATA_INT_RC_FU_BEN_RESET_TIMES = 1550; //重置次数
            PlayerDataField.PLAYERDATA_INT_BOSS_AWARD = 1555; //小boss奖励
            PlayerDataField.PLAYERDATA_INT_CHAPTER_AWARD = 1618; //章节奖励
            PlayerDataField.PLAYERDATA_INT_JJC_RANK = 1637; //0.竞技场当前排名 1.竞技场历史最佳排名
            PlayerDataField.PLAYERDATA_INT_JJC_STORE = 1638; //竞技场道具购买次数
            PlayerDataField.PLAYERDATA_INT_JJC_TIMES_LOG = 1663; //挑战时间
            PlayerDataField.PLAYERDATA_INT_JJC_RANK_LOG = 1683; //排名影响
            PlayerDataField.PLAYERDATA_INT_JJC_RESULT_LOG = 1693; //挑战结果
            PlayerDataField.PLAYERDATA_INT_JJC_TARGET_LOG = 1698; //挑战|被战
            PlayerDataField.PLAYERDATA_INT_JJC_LOG_FLAG = 1703; //挑战记录游标
            PlayerDataField.PLAYERDATA_INT_P_U161 = 1704; //0.暗雷战斗场数 1.击败关卡boss数量
            PlayerDataField.PLAYERDATA_INT_P_U162 = 1705; //0.今日击败野外boss数量 1.已经领取奖励的关卡id
            PlayerDataField.PLAYERDATA_INT_HUD_DARK_TIME = 1706; //最后一次暗雷战斗时间
            PlayerDataField.PLAYERDATA_INT_OFF_LINE_TIME = 1707; //离线时间戳
            PlayerDataField.PLAYERDATA_INT_P_U163 = 1708; //0.通关小关卡id 1.可领取奖励的地图id
            // string field
            PlayerDataField.PLAYERDATA_STR_NAME = 0; //玩家名字
            PlayerDataField.PLAYERDATA_STR_CREATE_I_P = 1; //玩家创建角色IP
            PlayerDataField.PLAYERDATA_STR_RECHARGE_ID = 2; //已充值ID
            PlayerDataField.PLAYERDATA_STR_JJC_NAME_LOG = 12; //挑战对手玩家名称
            return PlayerDataField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.PlayerDataField = PlayerDataField;
        //PlatData def
        ////////////////////////////////////////////////////////////////
        var PlatDataField = /** @class */ (function (_super) {
            __extends(PlatDataField, _super);
            function PlatDataField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            //////////////////////////////////////str function
            PlatDataField.prototype.GetPlatData = function () {
                return this.GetStr(PlatDataField.PLATDATA_STR_PLAT_DATA);
            };
            PlatDataField.prototype.SetPlatData = function (val) {
                this.SetStr(PlatDataField.PLATDATA_STR_PLAT_DATA, val);
            };
            // define
            // int field
            // string field
            PlatDataField.PLATDATA_STR_PLAT_DATA = 0; //平台数据
            return PlatDataField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.PlatDataField = PlatDataField;
        //Mail def
        ////////////////////////////////////////////////////////////////
        var MailField = /** @class */ (function (_super) {
            __extends(MailField, _super);
            function MailField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MailField.prototype.GetMaxMailId = function () {
                return this.GetUInt32(MailField.MAIL_INT_MAX_MAIL_ID);
            };
            MailField.prototype.SetMaxMailId = function (val) {
                this.SetUInt32(MailField.MAIL_INT_MAX_MAIL_ID, val);
            };
            MailField.prototype.GetMailByte = function (offset) {
                return this.GetByte(MailField.MAIL_INT_MAIL_BYTE, offset);
            };
            MailField.prototype.SetMailByte = function (offset, val) {
                this.SetByte(MailField.MAIL_INT_MAIL_BYTE, offset, val);
            };
            //邮件状态
            MailField.prototype.GetMailState = function (index) {
                return this.GetByte(MailField.MAIL_INT_MAIL_BYTE + index * 19, 0);
            };
            MailField.prototype.SetMailState = function (index, val) {
                this.SetByte(MailField.MAIL_INT_MAIL_BYTE + index * 19, 0, val);
            };
            MailField.prototype.GetMailExp = function (index) {
                return this.GetUInt32(MailField.MAIL_INT_MAIL_EXP + index * 19);
            };
            MailField.prototype.SetMailExp = function (index, val) {
                this.SetUInt32(MailField.MAIL_INT_MAIL_EXP + index * 19, val);
            };
            MailField.prototype.GetMailCopper = function (index) {
                return this.GetUInt32(MailField.MAIL_INT_MAIL_COPPER + index * 19);
            };
            MailField.prototype.SetMailCopper = function (index, val) {
                this.SetUInt32(MailField.MAIL_INT_MAIL_COPPER + index * 19, val);
            };
            MailField.prototype.GetMailGoldBind = function (index) {
                return this.GetUInt32(MailField.MAIL_INT_MAIL_GOLD_BIND + index * 19);
            };
            MailField.prototype.SetMailGoldBind = function (index, val) {
                this.SetUInt32(MailField.MAIL_INT_MAIL_GOLD_BIND + index * 19, val);
            };
            MailField.prototype.GetMailGold = function (index) {
                return this.GetUInt32(MailField.MAIL_INT_MAIL_GOLD + index * 19);
            };
            MailField.prototype.SetMailGold = function (index, val) {
                this.SetUInt32(MailField.MAIL_INT_MAIL_GOLD + index * 19, val);
            };
            MailField.prototype.GetMailBeginTime = function (index) {
                return this.GetUInt32(MailField.MAIL_INT_MAIL_BEGIN_TIME + index * 19);
            };
            MailField.prototype.SetMailBeginTime = function (index, val) {
                this.SetUInt32(MailField.MAIL_INT_MAIL_BEGIN_TIME + index * 19, val);
            };
            MailField.prototype.GetMailEndTime = function (index) {
                return this.GetUInt32(MailField.MAIL_INT_MAIL_END_TIME + index * 19);
            };
            MailField.prototype.SetMailEndTime = function (index, val) {
                this.SetUInt32(MailField.MAIL_INT_MAIL_END_TIME + index * 19, val);
            };
            MailField.prototype.GetAttachEntry1 = function (index) {
                return this.GetUInt32(MailField.MAIL_INT_ATTACH_ENTRY1 + index * 19);
            };
            MailField.prototype.SetAttachEntry1 = function (index, val) {
                this.SetUInt32(MailField.MAIL_INT_ATTACH_ENTRY1 + index * 19, val);
            };
            MailField.prototype.GetAttachByte1 = function (offset) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE1, offset);
            };
            MailField.prototype.SetAttachByte1 = function (offset, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE1, offset, val);
            };
            //绑定状态
            MailField.prototype.GetAttachBind1 = function (index) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE1 + index * 19, 0);
            };
            MailField.prototype.SetAttachBind1 = function (index, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE1 + index * 19, 0, val);
            };
            //附件数量
            MailField.prototype.GetAttachCount1 = function (index) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE1 + index * 19, 1);
            };
            MailField.prototype.SetAttachCount1 = function (index, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE1 + index * 19, 1, val);
            };
            MailField.prototype.GetAttachEntry2 = function (index) {
                return this.GetUInt32(MailField.MAIL_INT_ATTACH_ENTRY2 + index * 19);
            };
            MailField.prototype.SetAttachEntry2 = function (index, val) {
                this.SetUInt32(MailField.MAIL_INT_ATTACH_ENTRY2 + index * 19, val);
            };
            MailField.prototype.GetAttachByte2 = function (offset) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE2, offset);
            };
            MailField.prototype.SetAttachByte2 = function (offset, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE2, offset, val);
            };
            //绑定状态
            MailField.prototype.GetAttachBind2 = function (index) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE2 + index * 19, 0);
            };
            MailField.prototype.SetAttachBind2 = function (index, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE2 + index * 19, 0, val);
            };
            //附件数量
            MailField.prototype.GetAttachCount2 = function (index) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE2 + index * 19, 1);
            };
            MailField.prototype.SetAttachCount2 = function (index, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE2 + index * 19, 1, val);
            };
            MailField.prototype.GetAttachEntry3 = function (index) {
                return this.GetUInt32(MailField.MAIL_INT_ATTACH_ENTRY3 + index * 19);
            };
            MailField.prototype.SetAttachEntry3 = function (index, val) {
                this.SetUInt32(MailField.MAIL_INT_ATTACH_ENTRY3 + index * 19, val);
            };
            MailField.prototype.GetAttachByte3 = function (offset) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE3, offset);
            };
            MailField.prototype.SetAttachByte3 = function (offset, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE3, offset, val);
            };
            //绑定状态
            MailField.prototype.GetAttachBind3 = function (index) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE3 + index * 19, 0);
            };
            MailField.prototype.SetAttachBind3 = function (index, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE3 + index * 19, 0, val);
            };
            //附件数量
            MailField.prototype.GetAttachCount3 = function (index) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE3 + index * 19, 1);
            };
            MailField.prototype.SetAttachCount3 = function (index, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE3 + index * 19, 1, val);
            };
            MailField.prototype.GetAttachEntry4 = function (index) {
                return this.GetUInt32(MailField.MAIL_INT_ATTACH_ENTRY4 + index * 19);
            };
            MailField.prototype.SetAttachEntry4 = function (index, val) {
                this.SetUInt32(MailField.MAIL_INT_ATTACH_ENTRY4 + index * 19, val);
            };
            MailField.prototype.GetAttachByte4 = function (offset) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE4, offset);
            };
            MailField.prototype.SetAttachByte4 = function (offset, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE4, offset, val);
            };
            //绑定状态
            MailField.prototype.GetAttachBind4 = function (index) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE4 + index * 19, 0);
            };
            MailField.prototype.SetAttachBind4 = function (index, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE4 + index * 19, 0, val);
            };
            //附件数量
            MailField.prototype.GetAttachCount4 = function (index) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE4 + index * 19, 1);
            };
            MailField.prototype.SetAttachCount4 = function (index, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE4 + index * 19, 1, val);
            };
            MailField.prototype.GetAttachEntry5 = function (index) {
                return this.GetUInt32(MailField.MAIL_INT_ATTACH_ENTRY5 + index * 19);
            };
            MailField.prototype.SetAttachEntry5 = function (index, val) {
                this.SetUInt32(MailField.MAIL_INT_ATTACH_ENTRY5 + index * 19, val);
            };
            MailField.prototype.GetAttachByte5 = function (offset) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE5, offset);
            };
            MailField.prototype.SetAttachByte5 = function (offset, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE5, offset, val);
            };
            //绑定状态
            MailField.prototype.GetAttachBind5 = function (index) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE5 + index * 19, 0);
            };
            MailField.prototype.SetAttachBind5 = function (index, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE5 + index * 19, 0, val);
            };
            //附件数量
            MailField.prototype.GetAttachCount5 = function (index) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE5 + index * 19, 1);
            };
            MailField.prototype.SetAttachCount5 = function (index, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE5 + index * 19, 1, val);
            };
            MailField.prototype.GetAttachEntry6 = function (index) {
                return this.GetUInt32(MailField.MAIL_INT_ATTACH_ENTRY6 + index * 19);
            };
            MailField.prototype.SetAttachEntry6 = function (index, val) {
                this.SetUInt32(MailField.MAIL_INT_ATTACH_ENTRY6 + index * 19, val);
            };
            MailField.prototype.GetAttachByte6 = function (offset) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE6, offset);
            };
            MailField.prototype.SetAttachByte6 = function (offset, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE6, offset, val);
            };
            //绑定状态
            MailField.prototype.GetAttachBind6 = function (index) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE6 + index * 19, 0);
            };
            MailField.prototype.SetAttachBind6 = function (index, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE6 + index * 19, 0, val);
            };
            //附件数量
            MailField.prototype.GetAttachCount6 = function (index) {
                return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE6 + index * 19, 1);
            };
            MailField.prototype.SetAttachCount6 = function (index, val) {
                this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE6 + index * 19, 1, val);
            };
            //////////////////////////////////////str function
            MailField.prototype.GetSender = function (index) {
                return this.GetStr(MailField.MAIL_STR_SENDER + index * 3);
            };
            MailField.prototype.SetSender = function (index, val) {
                this.SetStr(MailField.MAIL_STR_SENDER + index * 3, val);
            };
            MailField.prototype.GetTitle = function (index) {
                return this.GetStr(MailField.MAIL_STR_TITLE + index * 3);
            };
            MailField.prototype.SetTitle = function (index, val) {
                this.SetStr(MailField.MAIL_STR_TITLE + index * 3, val);
            };
            MailField.prototype.GetDetail = function (index) {
                return this.GetStr(MailField.MAIL_STR_DETAIL + index * 3);
            };
            MailField.prototype.SetDetail = function (index, val) {
                this.SetStr(MailField.MAIL_STR_DETAIL + index * 3, val);
            };
            // define
            MailField.MAIL_STATE_NEW = 0; //新邮件
            MailField.MAIL_STATE_OPEN = 1; //已读邮件
            MailField.MAIL_STATE_NULL = 2; //已读空邮件
            MailField.MAX_MAIL = 100; //最大邮件数量
            // int field
            MailField.MAIL_INT_MAX_MAIL_ID = 0; //最大邮件ID
            MailField.MAIL_INT_MAIL_BYTE = 1; //0邮件状态
            MailField.MAIL_INT_MAIL_EXP = 2; //经验
            MailField.MAIL_INT_MAIL_COPPER = 3; //铜钱
            MailField.MAIL_INT_MAIL_GOLD_BIND = 4; //绑元
            MailField.MAIL_INT_MAIL_GOLD = 5; //元宝
            MailField.MAIL_INT_MAIL_BEGIN_TIME = 6; //邮件开始时间
            MailField.MAIL_INT_MAIL_END_TIME = 7; //邮件结束时间
            MailField.MAIL_INT_ATTACH_ENTRY1 = 8; //附件ID
            MailField.MAIL_INT_ATTACH_BYTE1 = 9; //0是否绑定1数量
            MailField.MAIL_INT_ATTACH_ENTRY2 = 10; //附件ID
            MailField.MAIL_INT_ATTACH_BYTE2 = 11; //0是否绑定1数量
            MailField.MAIL_INT_ATTACH_ENTRY3 = 12; //附件ID
            MailField.MAIL_INT_ATTACH_BYTE3 = 13; //0是否绑定1数量
            MailField.MAIL_INT_ATTACH_ENTRY4 = 14; //附件ID
            MailField.MAIL_INT_ATTACH_BYTE4 = 15; //0是否绑定1数量
            MailField.MAIL_INT_ATTACH_ENTRY5 = 16; //附件ID
            MailField.MAIL_INT_ATTACH_BYTE5 = 17; //0是否绑定1数量
            MailField.MAIL_INT_ATTACH_ENTRY6 = 18; //附件ID
            MailField.MAIL_INT_ATTACH_BYTE6 = 19; //0是否绑定1数量
            // string field
            MailField.MAIL_STR_SENDER = 0; //邮件标题
            MailField.MAIL_STR_TITLE = 1; //邮件标题
            MailField.MAIL_STR_DETAIL = 2; //邮件内容
            return MailField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.MailField = MailField;
        //Equip def
        ////////////////////////////////////////////////////////////////
        var EquipField = /** @class */ (function (_super) {
            __extends(EquipField, _super);
            function EquipField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            // string field
            EquipField.prototype.GetEquipEntry = function (index) {
                return this.GetUInt32(EquipField.EQUIP_INT_EQUIP_ENTRY + index * 10);
            };
            EquipField.prototype.SetEquipEntry = function (index, val) {
                this.SetUInt32(EquipField.EQUIP_INT_EQUIP_ENTRY + index * 10, val);
            };
            EquipField.prototype.GetEquipFailTime = function (index) {
                return this.GetUInt32(EquipField.EQUIP_INT_EQUIP_FAIL_TIME + index * 10);
            };
            EquipField.prototype.SetEquipFailTime = function (index, val) {
                this.SetUInt32(EquipField.EQUIP_INT_EQUIP_FAIL_TIME + index * 10, val);
            };
            EquipField.prototype.GetEquipFlag = function (offset) {
                return this.GetBit(EquipField.EQUIP_INT_EQUIP_FLAG, offset);
            };
            EquipField.prototype.SetEquipFlag = function (offset, val) {
                this.SetBit(EquipField.EQUIP_INT_EQUIP_FLAG, offset, val);
            };
            EquipField.prototype.GetEquipByte = function (offset) {
                return this.GetByte(EquipField.EQUIP_INT_EQUIP_BYTE, offset);
            };
            EquipField.prototype.SetEquipByte = function (offset, val) {
                this.SetByte(EquipField.EQUIP_INT_EQUIP_BYTE, offset, val);
            };
            EquipField.prototype.GetEquipUint16 = function (offset) {
                return this.GetUInt16(EquipField.EQUIP_INT_EQUIP_UINT16, offset);
            };
            EquipField.prototype.SetEquipUint16 = function (offset, val) {
                this.SetUInt16(EquipField.EQUIP_INT_EQUIP_UINT16, offset, val);
            };
            //强化等级
            EquipField.prototype.GetEquipStrongLv = function (index) {
                return this.GetUInt16(EquipField.EQUIP_INT_EQUIP_UINT16 + index * 10, 0);
            };
            EquipField.prototype.SetEquipStrongLv = function (index, val) {
                this.SetUInt16(EquipField.EQUIP_INT_EQUIP_UINT16 + index * 10, 0, val);
            };
            //精炼等级
            EquipField.prototype.GetEquipJinglianLv = function (index) {
                return this.GetUInt16(EquipField.EQUIP_INT_EQUIP_UINT16 + index * 10, 1);
            };
            EquipField.prototype.SetEquipJinglianLv = function (index, val) {
                this.SetUInt16(EquipField.EQUIP_INT_EQUIP_UINT16 + index * 10, 1, val);
            };
            EquipField.prototype.GetEquipStrongExp = function (index) {
                return this.GetUInt32(EquipField.EQUIP_INT_EQUIP_STRONG_EXP + index * 10);
            };
            EquipField.prototype.SetEquipStrongExp = function (index, val) {
                this.SetUInt32(EquipField.EQUIP_INT_EQUIP_STRONG_EXP + index * 10, val);
            };
            EquipField.prototype.GetEquipJinglianExp = function (index) {
                return this.GetUInt32(EquipField.EQUIP_INT_EQUIP_JINGLIAN_EXP + index * 10);
            };
            EquipField.prototype.SetEquipJinglianExp = function (index, val) {
                this.SetUInt32(EquipField.EQUIP_INT_EQUIP_JINGLIAN_EXP + index * 10, val);
            };
            // define
            EquipField.EQUIP_POS_WEAPON = 0; //武器
            EquipField.EQUIP_POS_TOUKUI = 1; //头盔
            EquipField.EQUIP_POS_YAODAI = 2; //腰带
            EquipField.EQUIP_POS_COAT = 3; //衣服
            EquipField.EQUIP_POS_BAOWU_GONG = 4; //攻击宝物
            EquipField.EQUIP_POS_BAOWU_FANG = 5; //防御宝物
            EquipField.MAX_EQUIP = 6; //装备位置
            EquipField.EQUIP_BAG_TYPE_WEAR = 0; //装备装备
            EquipField.EQUIP_BAG_TYPE_PACK = 1; //装备背包
            EquipField.MAX_EQUIP_BAG_TYPE = 2; //装备背包最大枚举
            EquipField.MAX_EQUIP_BAG_SIZE_0 = 100; //装备格装备
            EquipField.MAX_EQUIP_BAG_SIZE_1 = 1000; //背包装备
            EquipField.MAX_EQUIP_POS = 10; //一个武将位的最大装备数
            EquipField.MAX_EQUIP_INT = 10; //物品binlog的int最大部分
            EquipField.EQUIPMENT_OPT_WEAR = 1; //穿戴
            EquipField.EQUIPMENT_OPT_DUMP = 2; //卸下
            // int field
            EquipField.EQUIP_INT_EQUIP_ENTRY = 0; //装备模板ID
            EquipField.EQUIP_INT_EQUIP_FAIL_TIME = 1; //失效时间
            EquipField.EQUIP_INT_EQUIP_FLAG = 2; //装备bit位
            EquipField.EQUIP_INT_EQUIP_BYTE = 3; //装备byte位
            EquipField.EQUIP_INT_EQUIP_UINT16 = 4; //装备int16位
            EquipField.EQUIP_INT_EQUIP_STRONG_EXP = 5; //强化经验
            EquipField.EQUIP_INT_EQUIP_JINGLIAN_EXP = 6; //精炼经验
            return EquipField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.EquipField = EquipField;
        //Jjc def
        ////////////////////////////////////////////////////////////////
        var JjcField = /** @class */ (function (_super) {
            __extends(JjcField, _super);
            function JjcField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            JjcField.prototype.GetJjcForce = function (index) {
                return this.GetUInt32(JjcField.JJC_INT_JJC_FORCE + index);
            };
            JjcField.prototype.SetJjcForce = function (index, val) {
                this.SetUInt32(JjcField.JJC_INT_JJC_FORCE + index, val);
            };
            JjcField.prototype.GetJjcHead = function (offset) {
                return this.GetByte(JjcField.JJC_INT_JJC_HEAD + Math.floor(offset / 4), offset % 4);
            };
            JjcField.prototype.SetJjcHead = function (offset, val) {
                this.SetByte(JjcField.JJC_INT_JJC_HEAD + Math.floor(offset / 4), offset % 4, val);
            };
            JjcField.prototype.GetJjcLv = function (offset) {
                return this.GetUInt16(JjcField.JJC_INT_JJC_LV + Math.floor(offset / 2), offset % 2);
            };
            JjcField.prototype.SetJjcLv = function (offset, val) {
                this.SetUInt16(JjcField.JJC_INT_JJC_LV + Math.floor(offset / 2), offset % 2, val);
            };
            //////////////////////////////////////str function
            JjcField.prototype.GetJjcGuid = function (index) {
                return this.GetStr(JjcField.JJC_STR_JJC_GUID + index);
            };
            JjcField.prototype.SetJjcGuid = function (index, val) {
                this.SetStr(JjcField.JJC_STR_JJC_GUID + index, val);
            };
            JjcField.prototype.GetJjcName = function (index) {
                return this.GetStr(JjcField.JJC_STR_JJC_NAME + index);
            };
            JjcField.prototype.SetJjcName = function (index, val) {
                this.SetStr(JjcField.JJC_STR_JJC_NAME + index, val);
            };
            JjcField.prototype.GetJjcFightStr = function (index) {
                return this.GetStr(JjcField.JJC_STR_JJC_FIGHT_STR + index);
            };
            JjcField.prototype.SetJjcFightStr = function (index, val) {
                this.SetStr(JjcField.JJC_STR_JJC_FIGHT_STR + index, val);
            };
            // define
            JjcField.MAX_SHOW_RANK = 5000; //最大显示排名
            JjcField.MAX_TRUE_RANK = 500; //最大真实排名
            // int field
            JjcField.JJC_INT_JJC_FORCE = 0; //战斗力
            JjcField.JJC_INT_JJC_HEAD = 500; //竞技场头像
            JjcField.JJC_INT_JJC_LV = 625; //竞技场等级
            // string field
            JjcField.JJC_STR_JJC_GUID = 0; //竞技场guid
            JjcField.JJC_STR_JJC_NAME = 500; //竞技场名字
            JjcField.JJC_STR_JJC_FIGHT_STR = 1000; //战斗串
            return JjcField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.JjcField = JjcField;
        //GangMain def
        ////////////////////////////////////////////////////////////////
        var GangMainField = /** @class */ (function (_super) {
            __extends(GangMainField, _super);
            function GangMainField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GangMainField.prototype.GetGangByte = function (offset) {
                return this.GetByte(GangMainField.GANGMAIN_INT_GANG_BYTE, offset);
            };
            GangMainField.prototype.SetGangByte = function (offset, val) {
                this.SetByte(GangMainField.GANGMAIN_INT_GANG_BYTE, offset, val);
            };
            //帮派等级
            GangMainField.prototype.GetLevel = function () {
                return this.GetByte(GangMainField.GANGMAIN_INT_GANG_BYTE, 0);
            };
            GangMainField.prototype.SetLevel = function (val) {
                this.SetByte(GangMainField.GANGMAIN_INT_GANG_BYTE, 0, val);
            };
            //帮派当前人数
            GangMainField.prototype.GetMembersCount = function () {
                return this.GetByte(GangMainField.GANGMAIN_INT_GANG_BYTE, 1);
            };
            GangMainField.prototype.SetMembersCount = function (val) {
                this.SetByte(GangMainField.GANGMAIN_INT_GANG_BYTE, 1, val);
            };
            //动态信息游标
            GangMainField.prototype.GetDynamicInfoIndex = function () {
                return this.GetByte(GangMainField.GANGMAIN_INT_GANG_BYTE, 2);
            };
            GangMainField.prototype.SetDynamicInfoIndex = function (val) {
                this.SetByte(GangMainField.GANGMAIN_INT_GANG_BYTE, 2, val);
            };
            GangMainField.prototype.GetCreateTime = function () {
                return this.GetUInt32(GangMainField.GANGMAIN_INT_CREATE_TIME);
            };
            GangMainField.prototype.SetCreateTime = function (val) {
                this.SetUInt32(GangMainField.GANGMAIN_INT_CREATE_TIME, val);
            };
            GangMainField.prototype.GetExp = function () {
                return this.GetUInt32(GangMainField.GANGMAIN_INT_EXP);
            };
            GangMainField.prototype.SetExp = function (val) {
                this.SetUInt32(GangMainField.GANGMAIN_INT_EXP, val);
            };
            GangMainField.prototype.GetNeedForce = function () {
                return this.GetDouble(GangMainField.GANGMAIN_INT_NEED_FORCE);
            };
            GangMainField.prototype.SetNeedForce = function (val) {
                this.SetDouble(GangMainField.GANGMAIN_INT_NEED_FORCE, val);
            };
            GangMainField.prototype.GetForce = function () {
                return this.GetDouble(GangMainField.GANGMAIN_INT_FORCE);
            };
            GangMainField.prototype.SetForce = function (val) {
                this.SetDouble(GangMainField.GANGMAIN_INT_FORCE, val);
            };
            GangMainField.prototype.GetJxJindu = function () {
                return this.GetUInt32(GangMainField.GANGMAIN_INT_JX_JINDU);
            };
            GangMainField.prototype.SetJxJindu = function (val) {
                this.SetUInt32(GangMainField.GANGMAIN_INT_JX_JINDU, val);
            };
            GangMainField.prototype.GetResetTime = function () {
                return this.GetUInt32(GangMainField.GANGMAIN_INT_RESET_TIME);
            };
            GangMainField.prototype.SetResetTime = function (val) {
                this.SetUInt32(GangMainField.GANGMAIN_INT_RESET_TIME, val);
            };
            GangMainField.prototype.GetMemberByte = function (offset) {
                return this.GetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE, offset);
            };
            GangMainField.prototype.SetMemberByte = function (offset, val) {
                this.SetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE, offset, val);
            };
            //在线情况
            GangMainField.prototype.GetMemberOnline = function (index) {
                return this.GetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE + index * 7, 0);
            };
            GangMainField.prototype.SetMemberOnline = function (index, val) {
                this.SetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE + index * 7, 0, val);
            };
            //职位
            GangMainField.prototype.GetMemberZhiWei = function (index) {
                return this.GetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE + index * 7, 1);
            };
            GangMainField.prototype.SetMemberZhiWei = function (index, val) {
                this.SetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE + index * 7, 1, val);
            };
            //头像
            GangMainField.prototype.GetMemberHead = function (index) {
                return this.GetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE + index * 7, 2);
            };
            GangMainField.prototype.SetMemberHead = function (index, val) {
                this.SetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE + index * 7, 2, val);
            };
            //vip等级
            GangMainField.prototype.GetMemberVip = function (index) {
                return this.GetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE + index * 7, 2);
            };
            GangMainField.prototype.SetMemberVip = function (index, val) {
                this.SetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE + index * 7, 2, val);
            };
            GangMainField.prototype.GetMemberDevote = function (index) {
                return this.GetUInt32(GangMainField.GANGMAIN_INT_MEMBER_DEVOTE + index * 7);
            };
            GangMainField.prototype.SetMemberDevote = function (index, val) {
                this.SetUInt32(GangMainField.GANGMAIN_INT_MEMBER_DEVOTE + index * 7, val);
            };
            GangMainField.prototype.GetMemberLevel = function (index) {
                return this.GetUInt32(GangMainField.GANGMAIN_INT_MEMBER_LEVEL + index * 7);
            };
            GangMainField.prototype.SetMemberLevel = function (index, val) {
                this.SetUInt32(GangMainField.GANGMAIN_INT_MEMBER_LEVEL + index * 7, val);
            };
            GangMainField.prototype.GetMemberTodayJx = function (index) {
                return this.GetUInt32(GangMainField.GANGMAIN_INT_MEMBER_TODAY_JX + index * 7);
            };
            GangMainField.prototype.SetMemberTodayJx = function (index, val) {
                this.SetUInt32(GangMainField.GANGMAIN_INT_MEMBER_TODAY_JX + index * 7, val);
            };
            GangMainField.prototype.GetMemberTotalJx = function (index) {
                return this.GetUInt32(GangMainField.GANGMAIN_INT_MEMBER_TOTAL_JX + index * 7);
            };
            GangMainField.prototype.SetMemberTotalJx = function (index, val) {
                this.SetUInt32(GangMainField.GANGMAIN_INT_MEMBER_TOTAL_JX + index * 7, val);
            };
            GangMainField.prototype.GetMemberForce = function () {
                return this.GetDouble(GangMainField.GANGMAIN_INT_MEMBER_FORCE);
            };
            GangMainField.prototype.SetMemberForce = function (val) {
                this.SetDouble(GangMainField.GANGMAIN_INT_MEMBER_FORCE, val);
            };
            GangMainField.prototype.GetMemberJoinTime = function (index) {
                return this.GetUInt32(GangMainField.GANGMAIN_INT_MEMBER_JOIN_TIME + index * 7);
            };
            GangMainField.prototype.SetMemberJoinTime = function (index, val) {
                this.SetUInt32(GangMainField.GANGMAIN_INT_MEMBER_JOIN_TIME + index * 7, val);
            };
            GangMainField.prototype.GetZhanWei = function (index) {
                return this.GetUInt32(GangMainField.GANGMAIN_INT_ZHAN_WEI + index);
            };
            GangMainField.prototype.SetZhanWei = function (index, val) {
                this.SetUInt32(GangMainField.GANGMAIN_INT_ZHAN_WEI + index, val);
            };
            //////////////////////////////////////str function
            GangMainField.prototype.GetName = function () {
                return this.GetStr(GangMainField.GANGMAIN_STR_NAME);
            };
            GangMainField.prototype.SetName = function (val) {
                this.SetStr(GangMainField.GANGMAIN_STR_NAME, val);
            };
            GangMainField.prototype.GetMasterName = function () {
                return this.GetStr(GangMainField.GANGMAIN_STR_MASTER_NAME);
            };
            GangMainField.prototype.SetMasterName = function (val) {
                this.SetStr(GangMainField.GANGMAIN_STR_MASTER_NAME, val);
            };
            GangMainField.prototype.GetMasterGuid = function () {
                return this.GetStr(GangMainField.GANGMAIN_STR_MASTER_GUID);
            };
            GangMainField.prototype.SetMasterGuid = function (val) {
                this.SetStr(GangMainField.GANGMAIN_STR_MASTER_GUID, val);
            };
            GangMainField.prototype.GetNotice = function () {
                return this.GetStr(GangMainField.GANGMAIN_STR_NOTICE);
            };
            GangMainField.prototype.SetNotice = function (val) {
                this.SetStr(GangMainField.GANGMAIN_STR_NOTICE, val);
            };
            GangMainField.prototype.GetDynamicInfo = function (index) {
                return this.GetStr(GangMainField.GANGMAIN_STR_DYNAMIC_INFO + index);
            };
            GangMainField.prototype.SetDynamicInfo = function (index, val) {
                this.SetStr(GangMainField.GANGMAIN_STR_DYNAMIC_INFO + index, val);
            };
            GangMainField.prototype.GetMemberName = function (index) {
                return this.GetStr(GangMainField.GANGMAIN_STR_MEMBER_NAME + index * 2);
            };
            GangMainField.prototype.SetMemberName = function (index, val) {
                this.SetStr(GangMainField.GANGMAIN_STR_MEMBER_NAME + index * 2, val);
            };
            GangMainField.prototype.GetMemberGuid = function (index) {
                return this.GetStr(GangMainField.GANGMAIN_STR_MEMBER_GUID + index * 2);
            };
            GangMainField.prototype.SetMemberGuid = function (index, val) {
                this.SetStr(GangMainField.GANGMAIN_STR_MEMBER_GUID + index * 2, val);
            };
            GangMainField.prototype.GetStrZhanWei = function (index) {
                return this.GetStr(GangMainField.GANGMAIN_STR_STR_ZHAN_WEI + index);
            };
            GangMainField.prototype.SetStrZhanWei = function (index, val) {
                this.SetStr(GangMainField.GANGMAIN_STR_STR_ZHAN_WEI + index, val);
            };
            // define
            GangMainField.GANG_MEMBER = 0; //成员
            GangMainField.GANG_FUHUIZHANG = 1; //副会长
            GangMainField.GANG_HUIZHANG = 2; //会长
            GangMainField.DYNAMIC_JOIN = 0; //加入
            GangMainField.DYNAMIC_EXIT = 1; //退出
            GangMainField.LOW_JUAN_TYPE = 1; //普通捐献
            GangMainField.HIGH_JUAN_TYPE = 2; //高级捐选
            GangMainField.SUPER_JUAN_TYPE = 3; //顶级捐献
            GangMainField.GANG_LOG_TYPE_JOIN = 1; //加入帮派
            GangMainField.GANG_LOG_TYPE_QUIT = 2; //退出帮派
            GangMainField.GANG_LOG_TYPE_ZHIWEI = 3; //职位更变
            GangMainField.GANG_LOG_TYPE_JUANXIAN = 4; //帮派捐献
            // int field
            GangMainField.GANGMAIN_INT_GANG_BYTE = 0; // 0等级 1当前人数 2动态信息游标
            GangMainField.GANGMAIN_INT_CREATE_TIME = 1; //创建时间
            GangMainField.GANGMAIN_INT_EXP = 2; //帮派经验
            GangMainField.GANGMAIN_INT_NEED_FORCE = 3; //入帮战力门槛
            GangMainField.GANGMAIN_INT_FORCE = 5; //帮派总战力
            GangMainField.GANGMAIN_INT_JX_JINDU = 7; //捐献进度
            GangMainField.GANGMAIN_INT_RESET_TIME = 8; //重置时间
            GangMainField.GANGMAIN_INT_MEMBER_BYTE = 9; //0在线 1职务 2 头像 3VIP等级
            GangMainField.GANGMAIN_INT_MEMBER_DEVOTE = 10; //最大贡献
            GangMainField.GANGMAIN_INT_MEMBER_LEVEL = 11; //等级
            GangMainField.GANGMAIN_INT_MEMBER_TODAY_JX = 12; //今日捐献
            GangMainField.GANGMAIN_INT_MEMBER_TOTAL_JX = 13; //累计捐献
            GangMainField.GANGMAIN_INT_MEMBER_FORCE = 14; //成员战斗力
            GangMainField.GANGMAIN_INT_MEMBER_JOIN_TIME = 15; //入帮时间
            GangMainField.GANGMAIN_INT_ZHAN_WEI = 16; //成员信息占位
            // string field
            GangMainField.GANGMAIN_STR_NAME = 0; //帮派名称
            GangMainField.GANGMAIN_STR_MASTER_NAME = 1; //帮主名称
            GangMainField.GANGMAIN_STR_MASTER_GUID = 2; //帮主GUID
            GangMainField.GANGMAIN_STR_NOTICE = 3; //帮派公告
            GangMainField.GANGMAIN_STR_DYNAMIC_INFO = 4; //帮派动态信息
            GangMainField.GANGMAIN_STR_MEMBER_NAME = 24; //成员名称
            GangMainField.GANGMAIN_STR_MEMBER_GUID = 25; //成员GUID
            GangMainField.GANGMAIN_STR_STR_ZHAN_WEI = 26; //str成员信息占位
            return GangMainField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.GangMainField = GangMainField;
        //WuJiang def
        ////////////////////////////////////////////////////////////////
        var WuJiangField = /** @class */ (function (_super) {
            __extends(WuJiangField, _super);
            function WuJiangField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            // string field
            WuJiangField.prototype.GetByte0 = function (offset) {
                return this.GetByte(WuJiangField.WUJIANG_INT_BYTE0, offset);
            };
            WuJiangField.prototype.SetByte0 = function (offset, val) {
                this.SetByte(WuJiangField.WUJIANG_INT_BYTE0, offset, val);
            };
            //是不是主武将0不是1是
            WuJiangField.prototype.GetIsMainWujiang = function (index) {
                return this.GetByte(WuJiangField.WUJIANG_INT_BYTE0 + index * 50, 0);
            };
            WuJiangField.prototype.SetIsMainWujiang = function (index, val) {
                this.SetByte(WuJiangField.WUJIANG_INT_BYTE0 + index * 50, 0, val);
            };
            //突破等级
            WuJiangField.prototype.GetTupoLevel = function (index) {
                return this.GetByte(WuJiangField.WUJIANG_INT_BYTE0 + index * 50, 1);
            };
            WuJiangField.prototype.SetTupoLevel = function (index, val) {
                this.SetByte(WuJiangField.WUJIANG_INT_BYTE0 + index * 50, 1, val);
            };
            WuJiangField.prototype.GetWjEntry = function (index) {
                return this.GetUInt32(WuJiangField.WUJIANG_INT_WJ_ENTRY + index * 50);
            };
            WuJiangField.prototype.SetWjEntry = function (index, val) {
                this.SetUInt32(WuJiangField.WUJIANG_INT_WJ_ENTRY + index * 50, val);
            };
            WuJiangField.prototype.GetWU160 = function (offset) {
                return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U160, offset);
            };
            WuJiangField.prototype.SetWU160 = function (offset, val) {
                this.SetUInt16(WuJiangField.WUJIANG_INT_W_U160, offset, val);
            };
            //武将等级
            WuJiangField.prototype.GetWjLevel = function (index) {
                return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U160 + index * 50, 0);
            };
            WuJiangField.prototype.SetWjLevel = function (index, val) {
                this.SetUInt16(WuJiangField.WUJIANG_INT_W_U160 + index * 50, 0, val);
            };
            //天命等级
            WuJiangField.prototype.GetTmLevel = function (index) {
                return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U160 + index * 50, 1);
            };
            WuJiangField.prototype.SetTmLevel = function (index, val) {
                this.SetUInt16(WuJiangField.WUJIANG_INT_W_U160 + index * 50, 1, val);
            };
            WuJiangField.prototype.GetExp = function (index) {
                return this.GetUInt32(WuJiangField.WUJIANG_INT_EXP + index * 50);
            };
            WuJiangField.prototype.SetExp = function (index, val) {
                this.SetUInt32(WuJiangField.WUJIANG_INT_EXP + index * 50, val);
            };
            WuJiangField.prototype.GetWU161 = function (offset) {
                return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U161, offset);
            };
            WuJiangField.prototype.SetWU161 = function (offset, val) {
                this.SetUInt16(WuJiangField.WUJIANG_INT_W_U161, offset, val);
            };
            //培养丹使用数量
            WuJiangField.prototype.GetCultureCount = function (index) {
                return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U161 + index * 50, 0);
            };
            WuJiangField.prototype.SetCultureCount = function (index, val) {
                this.SetUInt16(WuJiangField.WUJIANG_INT_W_U161 + index * 50, 0, val);
            };
            WuJiangField.prototype.GetWU162 = function (offset) {
                return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U162, offset);
            };
            WuJiangField.prototype.SetWU162 = function (offset, val) {
                this.SetUInt16(WuJiangField.WUJIANG_INT_W_U162, offset, val);
            };
            //觉醒等级
            WuJiangField.prototype.GetJxLevel = function (index) {
                return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U162 + index * 50, 0);
            };
            WuJiangField.prototype.SetJxLevel = function (index, val) {
                this.SetUInt16(WuJiangField.WUJIANG_INT_W_U162 + index * 50, 0, val);
            };
            //觉醒星级
            WuJiangField.prototype.GetJxStar = function (index) {
                return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U162 + index * 50, 1);
            };
            WuJiangField.prototype.SetJxStar = function (index, val) {
                this.SetUInt16(WuJiangField.WUJIANG_INT_W_U162 + index * 50, 1, val);
            };
            WuJiangField.prototype.GetAtkPeiyang = function (index) {
                return this.GetUInt32(WuJiangField.WUJIANG_INT_ATK_PEIYANG + index * 50);
            };
            WuJiangField.prototype.SetAtkPeiyang = function (index, val) {
                this.SetUInt32(WuJiangField.WUJIANG_INT_ATK_PEIYANG + index * 50, val);
            };
            WuJiangField.prototype.GetHpPeiyang = function (index) {
                return this.GetUInt32(WuJiangField.WUJIANG_INT_HP_PEIYANG + index * 50);
            };
            WuJiangField.prototype.SetHpPeiyang = function (index, val) {
                this.SetUInt32(WuJiangField.WUJIANG_INT_HP_PEIYANG + index * 50, val);
            };
            WuJiangField.prototype.GetDefPeiyang = function (index) {
                return this.GetUInt32(WuJiangField.WUJIANG_INT_DEF_PEIYANG + index * 50);
            };
            WuJiangField.prototype.SetDefPeiyang = function (index, val) {
                this.SetUInt32(WuJiangField.WUJIANG_INT_DEF_PEIYANG + index * 50, val);
            };
            WuJiangField.prototype.GetMagicDefPeiyang = function (index) {
                return this.GetUInt32(WuJiangField.WUJIANG_INT_MAGIC_DEF_PEIYANG + index * 50);
            };
            WuJiangField.prototype.SetMagicDefPeiyang = function (index, val) {
                this.SetUInt32(WuJiangField.WUJIANG_INT_MAGIC_DEF_PEIYANG + index * 50, val);
            };
            WuJiangField.prototype.GetWU163 = function (offset) {
                return this.GetInt16(WuJiangField.WUJIANG_INT_W_U163, offset);
            };
            WuJiangField.prototype.SetWU163 = function (offset, val) {
                this.SetInt16(WuJiangField.WUJIANG_INT_W_U163, offset, val);
            };
            //觉醒等级
            WuJiangField.prototype.GetCurAtkPeiyang = function (index) {
                return this.GetInt16(WuJiangField.WUJIANG_INT_W_U163 + index * 50, 0);
            };
            WuJiangField.prototype.SetCurAtkPeiyang = function (index, val) {
                this.SetInt16(WuJiangField.WUJIANG_INT_W_U163 + index * 50, 0, val);
            };
            //觉醒星级
            WuJiangField.prototype.GetCurHpPeiyang = function (index) {
                return this.GetInt16(WuJiangField.WUJIANG_INT_W_U163 + index * 50, 1);
            };
            WuJiangField.prototype.SetCurHpPeiyang = function (index, val) {
                this.SetInt16(WuJiangField.WUJIANG_INT_W_U163 + index * 50, 1, val);
            };
            WuJiangField.prototype.GetWU164 = function (offset) {
                return this.GetInt16(WuJiangField.WUJIANG_INT_W_U164, offset);
            };
            WuJiangField.prototype.SetWU164 = function (offset, val) {
                this.SetInt16(WuJiangField.WUJIANG_INT_W_U164, offset, val);
            };
            //觉醒等级
            WuJiangField.prototype.GetCurDefPeiyang = function (index) {
                return this.GetInt16(WuJiangField.WUJIANG_INT_W_U164 + index * 50, 0);
            };
            WuJiangField.prototype.SetCurDefPeiyang = function (index, val) {
                this.SetInt16(WuJiangField.WUJIANG_INT_W_U164 + index * 50, 0, val);
            };
            //觉醒星级
            WuJiangField.prototype.GetCurMagicDefPeiyang = function (index) {
                return this.GetInt16(WuJiangField.WUJIANG_INT_W_U164 + index * 50, 1);
            };
            WuJiangField.prototype.SetCurMagicDefPeiyang = function (index, val) {
                this.SetInt16(WuJiangField.WUJIANG_INT_W_U164 + index * 50, 1, val);
            };
            // define
            WuJiangField.HP = 1; //血量
            WuJiangField.ATK = 2; //物理攻击
            WuJiangField.MAGIC_ATTACK = 3; //魔法攻击
            WuJiangField.DEF = 4; //物理防御
            WuJiangField.MAGIC_DEF = 5; //魔法防御
            WuJiangField.CRIT = 6; //暴击	
            WuJiangField.CRIT_DEF = 7; //抗暴击
            WuJiangField.HIT = 8; //命中
            WuJiangField.EVA = 9; //闪避
            WuJiangField.DAMGE_BONUS = 10; //伤害加成
            WuJiangField.DAMGE_REDUCE = 11; //免伤
            WuJiangField.FACTION_DAMGE_BONUS = 12; //阵营伤害加成
            WuJiangField.FACTION_DAMGE_REDUCE = 13; //阵营免伤
            WuJiangField.PVP_DAMGE_BONUS = 14; //PVP伤害加成
            WuJiangField.PVP_DAMGE_REDUCE = 15; //PVP免伤
            WuJiangField.MIE_WEI = 16; //灭魏
            WuJiangField.KANG_WEI = 17; //抗魏
            WuJiangField.MIE_SHU = 18; //灭蜀
            WuJiangField.KANG_SHU = 19; //抗蜀
            WuJiangField.MIE_WU = 20; //灭吴
            WuJiangField.KANG_WU = 21; //抗吴
            WuJiangField.MIE_QUN = 22; //灭群
            WuJiangField.KANG_QUN = 23; //抗群
            WuJiangField.ZHAOMU_LOW = 0; //普通招募
            WuJiangField.ZHAOMU_HIGH = 1; //高级招募
            WuJiangField.MAX_ZHEN_WEI = 6; //最大阵位
            WuJiangField.MAX_YUAN_JUN = 8; //最大援军
            // int field
            WuJiangField.WUJIANG_INT_BYTE0 = 0; //0主将标志1突破等级
            WuJiangField.WUJIANG_INT_WJ_ENTRY = 1; //武将模板ID
            WuJiangField.WUJIANG_INT_W_U160 = 2; //0.武将等级 1.天命等级
            WuJiangField.WUJIANG_INT_EXP = 3; //当前经验
            WuJiangField.WUJIANG_INT_W_U161 = 4; //0.培养丹使用数量 
            WuJiangField.WUJIANG_INT_W_U162 = 5; //0.觉醒等级 1.觉醒星级
            WuJiangField.WUJIANG_INT_ATK_PEIYANG = 6; //攻击培养值
            WuJiangField.WUJIANG_INT_HP_PEIYANG = 7; //生命培养值
            WuJiangField.WUJIANG_INT_DEF_PEIYANG = 8; //防御培养值
            WuJiangField.WUJIANG_INT_MAGIC_DEF_PEIYANG = 9; //法防培养值
            WuJiangField.WUJIANG_INT_W_U163 = 10; //当前攻击培养值 当前生命培养值
            WuJiangField.WUJIANG_INT_W_U164 = 11; //当前防御培养值 当前法防培养值
            return WuJiangField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.WuJiangField = WuJiangField;
        //Social def
        ////////////////////////////////////////////////////////////////
        var SocialField = /** @class */ (function (_super) {
            __extends(SocialField, _super);
            function SocialField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SocialField.prototype.GetEnemyVal = function (index) {
                return this.GetUInt32(SocialField.SOCIAL_INT_ENEMY_VAL + index);
            };
            SocialField.prototype.SetEnemyVal = function (index, val) {
                this.SetUInt32(SocialField.SOCIAL_INT_ENEMY_VAL + index, val);
            };
            SocialField.prototype.GetEnemyHead = function (offset) {
                return this.GetByte(SocialField.SOCIAL_INT_ENEMY_HEAD + Math.floor(offset / 4), offset % 4);
            };
            SocialField.prototype.SetEnemyHead = function (offset, val) {
                this.SetByte(SocialField.SOCIAL_INT_ENEMY_HEAD + Math.floor(offset / 4), offset % 4, val);
            };
            SocialField.prototype.GetEnemyLevel = function (index) {
                return this.GetUInt32(SocialField.SOCIAL_INT_ENEMY_LEVEL + index);
            };
            SocialField.prototype.SetEnemyLevel = function (index, val) {
                this.SetUInt32(SocialField.SOCIAL_INT_ENEMY_LEVEL + index, val);
            };
            SocialField.prototype.GetEnemyForce = function (index) {
                return this.GetUInt32(SocialField.SOCIAL_INT_ENEMY_FORCE + index);
            };
            SocialField.prototype.SetEnemyForce = function (index, val) {
                this.SetUInt32(SocialField.SOCIAL_INT_ENEMY_FORCE + index, val);
            };
            SocialField.prototype.GetEnemyState = function (index) {
                return this.GetUInt32(SocialField.SOCIAL_INT_ENEMY_STATE + index);
            };
            SocialField.prototype.SetEnemyState = function (index, val) {
                this.SetUInt32(SocialField.SOCIAL_INT_ENEMY_STATE + index, val);
            };
            SocialField.prototype.GetFriendHead = function (offset) {
                return this.GetByte(SocialField.SOCIAL_INT_FRIEND_HEAD + Math.floor(offset / 4), offset % 4);
            };
            SocialField.prototype.SetFriendHead = function (offset, val) {
                this.SetByte(SocialField.SOCIAL_INT_FRIEND_HEAD + Math.floor(offset / 4), offset % 4, val);
            };
            SocialField.prototype.GetFriendLevel = function (index) {
                return this.GetUInt32(SocialField.SOCIAL_INT_FRIEND_LEVEL + index);
            };
            SocialField.prototype.SetFriendLevel = function (index, val) {
                this.SetUInt32(SocialField.SOCIAL_INT_FRIEND_LEVEL + index, val);
            };
            SocialField.prototype.GetFriendState = function (offset) {
                return this.GetByte(SocialField.SOCIAL_INT_FRIEND_STATE + Math.floor(offset / 4), offset % 4);
            };
            SocialField.prototype.SetFriendState = function (offset, val) {
                this.SetByte(SocialField.SOCIAL_INT_FRIEND_STATE + Math.floor(offset / 4), offset % 4, val);
            };
            SocialField.prototype.GetFriendForce = function (index) {
                return this.GetUInt32(SocialField.SOCIAL_INT_FRIEND_FORCE + index);
            };
            SocialField.prototype.SetFriendForce = function (index, val) {
                this.SetUInt32(SocialField.SOCIAL_INT_FRIEND_FORCE + index, val);
            };
            //////////////////////////////////////str function
            SocialField.prototype.GetEnemyName = function (index) {
                return this.GetStr(SocialField.SOCIAL_STR_ENEMY_NAME + index);
            };
            SocialField.prototype.SetEnemyName = function (index, val) {
                this.SetStr(SocialField.SOCIAL_STR_ENEMY_NAME + index, val);
            };
            SocialField.prototype.GetEnemyGuid = function (index) {
                return this.GetStr(SocialField.SOCIAL_STR_ENEMY_GUID + index);
            };
            SocialField.prototype.SetEnemyGuid = function (index, val) {
                this.SetStr(SocialField.SOCIAL_STR_ENEMY_GUID + index, val);
            };
            SocialField.prototype.GetFriendName = function (index) {
                return this.GetStr(SocialField.SOCIAL_STR_FRIEND_NAME + index);
            };
            SocialField.prototype.SetFriendName = function (index, val) {
                this.SetStr(SocialField.SOCIAL_STR_FRIEND_NAME + index, val);
            };
            SocialField.prototype.GetFriendGuid = function (index) {
                return this.GetStr(SocialField.SOCIAL_STR_FRIEND_GUID + index);
            };
            SocialField.prototype.SetFriendGuid = function (index, val) {
                this.SetStr(SocialField.SOCIAL_STR_FRIEND_GUID + index, val);
            };
            // define
            SocialField.MAX_ENEMY = 100; //最大仇人数量
            SocialField.MAX_FRIEND = 100; //最大好友数量
            // int field
            SocialField.SOCIAL_INT_ENEMY_VAL = 0; //仇恨值
            SocialField.SOCIAL_INT_ENEMY_HEAD = 100; //仇人头像
            SocialField.SOCIAL_INT_ENEMY_LEVEL = 125; //仇人等级
            SocialField.SOCIAL_INT_ENEMY_FORCE = 225; //仇人战斗力
            SocialField.SOCIAL_INT_ENEMY_STATE = 325; //仇人战斗力
            SocialField.SOCIAL_INT_FRIEND_HEAD = 425; //好友头像
            SocialField.SOCIAL_INT_FRIEND_LEVEL = 450; //好友等级
            SocialField.SOCIAL_INT_FRIEND_STATE = 550; //好友状态
            SocialField.SOCIAL_INT_FRIEND_FORCE = 575; //好友战斗力
            // string field
            SocialField.SOCIAL_STR_ENEMY_NAME = 0; //仇人名字
            SocialField.SOCIAL_STR_ENEMY_GUID = 100; //仇人guid
            SocialField.SOCIAL_STR_FRIEND_NAME = 200; //好友名字
            SocialField.SOCIAL_STR_FRIEND_GUID = 300; //好友guid
            return SocialField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.SocialField = SocialField;
        //Loots def
        ////////////////////////////////////////////////////////////////
        var LootsField = /** @class */ (function (_super) {
            __extends(LootsField, _super);
            function LootsField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            // define
            LootsField.LOOT_FIELD_BEGIN = 4; //个体开始的下标
            LootsField.LOOT_ENTRY = 0; //模板
            LootsField.LOOT_COUNT = 1; //数量
            LootsField.LOOT_OWNER = 2; //所有者
            LootsField.MAX_LOOT_FIELD = 3; //个体下标数量
            LootsField.LOOT_WIDTH = 2; //单个战利品宽度
            LootsField.LOOTS_WIDTH = 10; //掉落对象宽度
            return LootsField;
        }(core.obj.GuidObject)); ////////////////////////////////////////////////////////////////
        object.LootsField = LootsField;
        //PlayGang def
        ////////////////////////////////////////////////////////////////
        var PlayGangField = /** @class */ (function (_super) {
            __extends(PlayGangField, _super);
            function PlayGangField() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            PlayGangField.prototype.GetGangGongXian = function () {
                return this.GetUInt32(PlayGangField.PLAYGANG_INT_GANG_GONG_XIAN);
            };
            PlayGangField.prototype.SetGangGongXian = function (val) {
                this.SetUInt32(PlayGangField.PLAYGANG_INT_GANG_GONG_XIAN, val);
            };
            PlayGangField.prototype.GetGangSpellLv = function (offset) {
                return this.GetByte(PlayGangField.PLAYGANG_INT_GANG_SPELL_LV + Math.floor(offset / 4), offset % 4);
            };
            PlayGangField.prototype.SetGangSpellLv = function (offset, val) {
                this.SetByte(PlayGangField.PLAYGANG_INT_GANG_SPELL_LV + Math.floor(offset / 4), offset % 4, val);
            };
            PlayGangField.prototype.GetJlMall = function (offset) {
                return this.GetBit(PlayGangField.PLAYGANG_INT_JL_MALL, offset);
            };
            PlayGangField.prototype.SetJlMall = function (offset, val) {
                this.SetBit(PlayGangField.PLAYGANG_INT_JL_MALL, offset, val);
            };
            PlayGangField.prototype.GetXsMall = function (offset) {
                return this.GetByte(PlayGangField.PLAYGANG_INT_XS_MALL + Math.floor(offset / 4), offset % 4);
            };
            PlayGangField.prototype.SetXsMall = function (offset, val) {
                this.SetByte(PlayGangField.PLAYGANG_INT_XS_MALL + Math.floor(offset / 4), offset % 4, val);
            };
            PlayGangField.prototype.GetDjMallCount = function (offset) {
                return this.GetByte(PlayGangField.PLAYGANG_INT_DJ_MALL_COUNT + Math.floor(offset / 4), offset % 4);
            };
            PlayGangField.prototype.SetDjMallCount = function (offset, val) {
                this.SetByte(PlayGangField.PLAYGANG_INT_DJ_MALL_COUNT + Math.floor(offset / 4), offset % 4, val);
            };
            PlayGangField.prototype.GetFbByte = function (offset) {
                return this.GetByte(PlayGangField.PLAYGANG_INT_FB_BYTE, offset);
            };
            PlayGangField.prototype.SetFbByte = function (offset, val) {
                this.SetByte(PlayGangField.PLAYGANG_INT_FB_BYTE, offset, val);
            };
            //0今日副本次数
            PlayGangField.prototype.GetFbTimes = function () {
                return this.GetByte(PlayGangField.PLAYGANG_INT_FB_BYTE, 0);
            };
            PlayGangField.prototype.SetFbTimes = function (val) {
                this.SetByte(PlayGangField.PLAYGANG_INT_FB_BYTE, 0, val);
            };
            //1今日购买次数
            PlayGangField.prototype.GetFbBuyTimes = function () {
                return this.GetByte(PlayGangField.PLAYGANG_INT_FB_BYTE, 1);
            };
            PlayGangField.prototype.SetFbBuyTimes = function (val) {
                this.SetByte(PlayGangField.PLAYGANG_INT_FB_BYTE, 1, val);
            };
            //2今日捐献次数
            PlayGangField.prototype.GetJuanXianTimes = function () {
                return this.GetByte(PlayGangField.PLAYGANG_INT_FB_BYTE, 2);
            };
            PlayGangField.prototype.SetJuanXianTimes = function (val) {
                this.SetByte(PlayGangField.PLAYGANG_INT_FB_BYTE, 2, val);
            };
            PlayGangField.prototype.GetFbChapterBonus = function (offset) {
                return this.GetBit(PlayGangField.PLAYGANG_INT_FB_CHAPTER_BONUS, offset);
            };
            PlayGangField.prototype.SetFbChapterBonus = function (offset, val) {
                this.SetBit(PlayGangField.PLAYGANG_INT_FB_CHAPTER_BONUS, offset, val);
            };
            PlayGangField.prototype.GetJinDuBonus = function (offset) {
                return this.GetBit(PlayGangField.PLAYGANG_INT_JIN_DU_BONUS, offset);
            };
            PlayGangField.prototype.SetJinDuBonus = function (offset, val) {
                this.SetBit(PlayGangField.PLAYGANG_INT_JIN_DU_BONUS, offset, val);
            };
            PlayGangField.prototype.GetFbBzBonus = function (offset) {
                return this.GetBit(PlayGangField.PLAYGANG_INT_FB_BZ_BONUS, offset);
            };
            PlayGangField.prototype.SetFbBzBonus = function (offset, val) {
                this.SetBit(PlayGangField.PLAYGANG_INT_FB_BZ_BONUS, offset, val);
            };
            PlayGangField.prototype.GetGangExitTime = function () {
                return this.GetUInt32(PlayGangField.PLAYGANG_INT_GANG_EXIT_TIME);
            };
            PlayGangField.prototype.SetGangExitTime = function (val) {
                this.SetUInt32(PlayGangField.PLAYGANG_INT_GANG_EXIT_TIME, val);
            };
            //////////////////////////////////////str function
            PlayGangField.prototype.GetGangID = function () {
                return this.GetStr(PlayGangField.PLAYGANG_STR_GANG_I_D);
            };
            PlayGangField.prototype.SetGangID = function (val) {
                this.SetStr(PlayGangField.PLAYGANG_STR_GANG_I_D, val);
            };
            // define
            // int field
            PlayGangField.PLAYGANG_INT_GANG_GONG_XIAN = 0; //帮派贡献
            PlayGangField.PLAYGANG_INT_GANG_SPELL_LV = 1; //帮派技能等级
            PlayGangField.PLAYGANG_INT_JL_MALL = 4; //奖励商品终身限购标志
            PlayGangField.PLAYGANG_INT_XS_MALL = 5; //限时商品购买数量
            PlayGangField.PLAYGANG_INT_DJ_MALL_COUNT = 7; //道具商店购买数量
            PlayGangField.PLAYGANG_INT_FB_BYTE = 11; //0今日副本次数 1今日购买次数
            PlayGangField.PLAYGANG_INT_FB_CHAPTER_BONUS = 12; //副本通关奖励领取标志
            PlayGangField.PLAYGANG_INT_JIN_DU_BONUS = 16; //今日进度领取
            PlayGangField.PLAYGANG_INT_FB_BZ_BONUS = 17; //今日宝藏领取标志 开始章节在帮派
            PlayGangField.PLAYGANG_INT_GANG_EXIT_TIME = 25; //退出帮派时间
            // string field
            PlayGangField.PLAYGANG_STR_GANG_I_D = 0; //帮派GUID
            return PlayGangField;
        }(core.obj.GuidObject));
        object.PlayGangField = PlayGangField;
    })(object = game.object || (game.object = {}));
})(game || (game = {}));
//# sourceMappingURL=define_fields.js.map