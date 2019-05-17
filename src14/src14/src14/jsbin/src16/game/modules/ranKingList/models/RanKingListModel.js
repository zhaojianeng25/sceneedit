/**
 * @describe 排行榜类型
 */
var RankType;
(function (RankType) {
    /** 等级排行 */
    RankType[RankType["LEVEL_RANK"] = 1] = "LEVEL_RANK";
    /** 宠物综合能力（评分）排行榜 */
    RankType[RankType["PET_GRADE_RANK"] = 9] = "PET_GRADE_RANK";
    /** 公会排行榜 */
    RankType[RankType["FACTION_RANK"] = 31] = "FACTION_RANK";
    /** 人物综合实力排行榜 */
    RankType[RankType["ROLE_ZONGHE_RANK"] = 32] = "ROLE_ZONGHE_RANK";
    //冰封王座暂时未开放
    // /** 冰封王座单人副本40-49级 */
    // SINGLE_COPY_RANK1 = 21,
    // /** 冰封王座单人副本50-69级 */
    // SINGLE_COPY_RANK2 = 22,
    // /** 冰封王座单人副本70-89级 */
    // SINGLE_COPY_RANK3 = 23,
    // /** 冰封王座单人副本90级 */
    // SINGLE_COPY_RANK4 = 24,
    // /** 冰封王座组队副本50-69级 */
    // TEAM_COPY_RANK1 = 27,
    // /** 冰封王座组队副本70-89级 */
    // TEAM_COPY_RANK2 = 28,
    /** 角色评分  */
    RankType[RankType["ROLE_RANK"] = 38] = "ROLE_RANK";
    /** 战士 云霄殿 */
    RankType[RankType["PROFESSION_WARRIOR_RANK"] = 43] = "PROFESSION_WARRIOR_RANK";
    /** 法师 天雷狱 */
    RankType[RankType["PROFESSION_MAGIC_RANK"] = 44] = "PROFESSION_MAGIC_RANK";
    /** 牧师 无量宫 */
    RankType[RankType["PROFESSION_PRIEST_RANK"] = 45] = "PROFESSION_PRIEST_RANK";
    /** 圣骑 大荒岭 */
    RankType[RankType["PROFESSION_PALADIN_RANK"] = 46] = "PROFESSION_PALADIN_RANK";
    /** 猎人 苍羽宫 */
    RankType[RankType["PROFESSION_HUNTER_RANK"] = 47] = "PROFESSION_HUNTER_RANK";
    /** 德鲁伊 飞雪崖 */
    RankType[RankType["PROFESSION_DRUID_RANK"] = 48] = "PROFESSION_DRUID_RANK";
    /** 公会等级 即帮派等级*/
    RankType[RankType["FACTION_RANK_LEVEL"] = 49] = "FACTION_RANK_LEVEL";
    /** 公会综合实力 即帮派综合实力 */
    RankType[RankType["FACTION_ZONGHE"] = 50] = "FACTION_ZONGHE";
    /** 熔火之心 */
    RankType[RankType["FACTION_MC"] = 51] = "FACTION_MC";
    /** 纳克萨玛斯 */
    RankType[RankType["FACTION_NAXX"] = 52] = "FACTION_NAXX";
    /** 盗贼 七星观 */
    RankType[RankType["PROFESSION_ROGUE_RANK"] = 60] = "PROFESSION_ROGUE_RANK";
    /** 萨满 玄冥池 */
    RankType[RankType["PROFESSION_SAMAN_RANK"] = 61] = "PROFESSION_SAMAN_RANK";
    /** 术士 丹阳观 */
    RankType[RankType["PROFESSION_WARLOCK_RANK"] = 62] = "PROFESSION_WARLOCK_RANK";
    /** 公会副本 即帮派副本 */
    RankType[RankType["FACTION_COPY"] = 70] = "FACTION_COPY";
    /** 5v5竞技场上届初级组，上届精英组 */
    RankType[RankType["PVP5_LAST_GRADE1"] = 81] = "PVP5_LAST_GRADE1";
    /** 5v5竞技场上届中级组，上届神威组 */
    RankType[RankType["PVP5_LAST_GRADE2"] = 82] = "PVP5_LAST_GRADE2";
    /** 5v5竞技场上届高级组，上届王者组 */
    RankType[RankType["PVP5_LAST_GRADE3"] = 83] = "PVP5_LAST_GRADE3";
    /** 5v5竞技场历史初级组，历史精英组 */
    RankType[RankType["PVP5_HISTORY_GRADE1"] = 84] = "PVP5_HISTORY_GRADE1";
    /** 5v5竞技场历史中级组，历史神威组 */
    RankType[RankType["PVP5_HISTORY_GRADE2"] = 85] = "PVP5_HISTORY_GRADE2";
    /** 5v5竞技场历史高级组，历史王者组 */
    RankType[RankType["PVP5_HISTORY_GRADE3"] = 86] = "PVP5_HISTORY_GRADE3";
    /** 红包榜 普通服 */
    RankType[RankType["RED_PACK_1"] = 101] = "RED_PACK_1";
    /** 红包榜 点卡服 */
    RankType[RankType["RED_PACK_2"] = 102] = "RED_PACK_2";
    /** 收花榜 */
    RankType[RankType["FLOWER_RECEIVE"] = 111] = "FLOWER_RECEIVE";
    /** 送花榜 */
    RankType[RankType["FLOWER_GIVE"] = 112] = "FLOWER_GIVE";
    /**
     * 排行榜配置表最多到送花榜为止
     */
    /** 公会战竞赛排名周二那场 */
    RankType[RankType["CLAN_FIGHT_2"] = 120] = "CLAN_FIGHT_2";
    /** 公会战竞赛排名周四那场 */
    RankType[RankType["CLAN_FIGHT_4"] = 121] = "CLAN_FIGHT_4";
    /** 公会战竞赛排名本轮 */
    RankType[RankType["CLAN_FIGHT_WEEK"] = 122] = "CLAN_FIGHT_WEEK";
    /** 公会战历史排名 */
    RankType[RankType["CLAN_FIGHT_HISTROY"] = 123] = "CLAN_FIGHT_HISTROY";
})(RankType || (RankType = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var ranKingList;
        (function (ranKingList) {
            var models;
            (function (models) {
                var RanKingListModel = /** @class */ (function () {
                    function RanKingListModel() {
                        /** 排行榜配置信息  字典 */
                        this.paiHangBangDic = {};
                        /** 统一放各种排行榜列表信息数据 */
                        this.rankListInfoData = [];
                        /** 放榜单上某排名的玩家信息查看数据 */
                        this.zonghepingfen_info = new Dictionary();
                        /** 存放帮派详情数据的数组 */
                        this.clanDetailArr = [];
                        this.Vo_index = [
                            RankType.LEVEL_RANK,
                            RankType.PET_GRADE_RANK,
                            //RankType.FACTION_RANK,
                            RankType.ROLE_ZONGHE_RANK,
                            RankType.ROLE_RANK,
                            RankType.PROFESSION_WARRIOR_RANK,
                            RankType.PROFESSION_MAGIC_RANK,
                            RankType.PROFESSION_PRIEST_RANK,
                            RankType.PROFESSION_PALADIN_RANK,
                            RankType.PROFESSION_HUNTER_RANK,
                            RankType.PROFESSION_DRUID_RANK,
                            RankType.FACTION_RANK_LEVEL,
                            RankType.FACTION_ZONGHE,
                            RankType.FACTION_MC,
                            RankType.FACTION_NAXX,
                            RankType.PROFESSION_ROGUE_RANK,
                            RankType.PROFESSION_SAMAN_RANK,
                            RankType.PROFESSION_WARLOCK_RANK,
                            RankType.FACTION_COPY,
                            RankType.PVP5_LAST_GRADE1,
                            RankType.PVP5_LAST_GRADE2,
                            RankType.PVP5_LAST_GRADE3,
                            RankType.PVP5_HISTORY_GRADE1,
                            RankType.PVP5_HISTORY_GRADE2,
                            RankType.PVP5_HISTORY_GRADE3,
                            RankType.RED_PACK_1,
                            //RankType.RED_PACK_2,
                            RankType.FLOWER_RECEIVE,
                            RankType.FLOWER_GIVE
                        ];
                        RanKingListModel._instance = this;
                    }
                    RanKingListModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new RanKingListModel();
                        }
                        return this._instance;
                    };
                    RanKingListModel.clearModelData = function () {
                        ranKingList.models.RanKingListModel._instance.rankListInfoData = [];
                        ranKingList.models.RanKingListModel._instance.zonghepingfen_info = new Laya.Dictionary();
                        ranKingList.models.RanKingListModel._instance.myRankInfoData = new models.MyRankInfoVo();
                        ranKingList.models.RanKingListModel._instance.lookRoleInfoDat = new models.RankRoleInfoVo();
                        ranKingList.models.RanKingListModel._instance.clanDetailArr = [];
                    };
                    return RanKingListModel;
                }());
                models.RanKingListModel = RanKingListModel;
            })(models = ranKingList.models || (ranKingList.models = {}));
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RanKingListModel.js.map