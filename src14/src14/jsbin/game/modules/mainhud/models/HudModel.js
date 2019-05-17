var ConfirmWindowType;
(function (ConfirmWindowType) {
    /**确认邀请事件 */
    ConfirmWindowType[ConfirmWindowType["CONFIRM_INVITE"] = 1] = "CONFIRM_INVITE";
    /**确认队伍的归队 */
    ConfirmWindowType[ConfirmWindowType["CONFIRM_BACKTEAM"] = 2] = "CONFIRM_BACKTEAM";
    /** 同意邀请并进行申请 */
    ConfirmWindowType[ConfirmWindowType["AGREE_RESPONSE"] = 3] = "AGREE_RESPONSE";
})(ConfirmWindowType || (ConfirmWindowType = {}));
/** 弹框语句说明 客户端提示表 */
var PromptExplain;
(function (PromptExplain) {
    /**邀请玩家进入组队 */
    PromptExplain[PromptExplain["INVITE_JOIN_TEAM"] = 420000] = "INVITE_JOIN_TEAM";
    /**同意 */
    PromptExplain[PromptExplain["AGREE"] = 420002] = "AGREE";
    /**拒绝 */
    PromptExplain[PromptExplain["REJECT"] = 420001] = "REJECT";
    /**召唤玩家归队 */
    PromptExplain[PromptExplain["CAME_BACK_TEAM"] = 420003] = "CAME_BACK_TEAM";
    /**回归队伍 */
    PromptExplain[PromptExplain["RETURN_TO_RANKS"] = 420004] = "RETURN_TO_RANKS";
    /**暂离队伍 */
    PromptExplain[PromptExplain["TEMPORARY_TO_TEAM"] = 420005] = "TEMPORARY_TO_TEAM";
    /**升为队长 */
    PromptExplain[PromptExplain["RISE_TO_CAPTAIN"] = 420006] = "RISE_TO_CAPTAIN";
    /**召回队员 */
    PromptExplain[PromptExplain["RECALL_PLAYER"] = 420007] = "RECALL_PLAYER";
    PromptExplain[PromptExplain["CREATE_TEAM_REPLY"] = 420008] = "CREATE_TEAM_REPLY";
    PromptExplain[PromptExplain["ENSURE"] = 420009] = "ENSURE";
    PromptExplain[PromptExplain["LEADER_MEMBER_NUM"] = 420010] = "LEADER_MEMBER_NUM";
    PromptExplain[PromptExplain["CONFIRM_DROP"] = 140402] = "CONFIRM_DROP";
    PromptExplain[PromptExplain["INPUT_MAX_LIMIT"] = 160044] = "INPUT_MAX_LIMIT";
    PromptExplain[PromptExplain["FULL_OF_BAG"] = 120057] = "FULL_OF_BAG";
    PromptExplain[PromptExplain["SALE_FULL_TIMES"] = 150505] = "SALE_FULL_TIMES";
    PromptExplain[PromptExplain["CHARGE_TIPS"] = 150506] = "CHARGE_TIPS";
    PromptExplain[PromptExplain["BUY_SUCCESS"] = 142587] = "BUY_SUCCESS";
    PromptExplain[PromptExplain["FUSHI_NOT_ENOUGH"] = 142686] = "FUSHI_NOT_ENOUGH";
    PromptExplain[PromptExplain["UPLIMIT_SH"] = 160013] = "UPLIMIT_SH";
    PromptExplain[PromptExplain["UPLIMIT_SC"] = 160014] = "UPLIMIT_SC";
    PromptExplain[PromptExplain["COMLE_MAIN_PET_TASK"] = 170037] = "COMLE_MAIN_PET_TASK";
    PromptExplain[PromptExplain["TUI_SONG"] = 160357] = "TUI_SONG";
    PromptExplain[PromptExplain["NO_TARGET"] = 150023] = "NO_TARGET";
    PromptExplain[PromptExplain["ACHI_LEVELlIMIT"] = 160352] = "ACHI_LEVELlIMIT";
    PromptExplain[PromptExplain["SHORTAGEOF_GOLD_COINS"] = 160118] = "SHORTAGEOF_GOLD_COINS";
    PromptExplain[PromptExplain["APPLICATION_FOR_ADMISSION"] = 144817] = "APPLICATION_FOR_ADMISSION";
    PromptExplain[PromptExplain["RIGHT_ANSWER"] = 160414] = "RIGHT_ANSWER";
    PromptExplain[PromptExplain["ERROR_ANSWER"] = 160415] = "ERROR_ANSWER";
    PromptExplain[PromptExplain["NO_FAMILY"] = 150027] = "NO_FAMILY";
    PromptExplain[PromptExplain["CANNO_ANSWER_SELF"] = 190029] = "CANNO_ANSWER_SELF";
    PromptExplain[PromptExplain["QUCUO_NO_ENOUGH"] = 190030] = "QUCUO_NO_ENOUGH";
    PromptExplain[PromptExplain["QUCUO_IMPERIAL_USE"] = 178004] = "QUCUO_IMPERIAL_USE";
    PromptExplain[PromptExplain["ZHENZHI_NO_ENOUGH"] = 190031] = "ZHENZHI_NO_ENOUGH";
    PromptExplain[PromptExplain["ZHENZHI_IMPERIAL_USE"] = 178005] = "ZHENZHI_IMPERIAL_USE";
    PromptExplain[PromptExplain["COMBAT_ASSISTANCE_UPLIMIT"] = 150001] = "COMBAT_ASSISTANCE_UPLIMIT";
    PromptExplain[PromptExplain["NO_EQUIP_STUNT"] = 150082] = "NO_EQUIP_STUNT";
    PromptExplain[PromptExplain["NEXT_ROUND_MANUAL"] = 150221] = "NEXT_ROUND_MANUAL";
    PromptExplain[PromptExplain["BANGPAI_ZIJIN_UP"] = 160069] = "BANGPAI_ZIJIN_UP";
    PromptExplain[PromptExplain["ACTIVITY_LEVEL_LIMIT"] = 160011] = "ACTIVITY_LEVEL_LIMIT";
    PromptExplain[PromptExplain["SHANGJIA_LIMIT"] = 420035] = "SHANGJIA_LIMIT";
    PromptExplain[PromptExplain["GUAJI_LITTLE_LEVEL"] = 150149] = "GUAJI_LITTLE_LEVEL";
    PromptExplain[PromptExplain["GUAJI_BIG_LEVEL"] = 150150] = "GUAJI_BIG_LEVEL";
    PromptExplain[PromptExplain["CHARACTER_IS_TOO_LONG"] = 150170] = "CHARACTER_IS_TOO_LONG";
    PromptExplain[PromptExplain["REPLACE_GEM_IN_NEWEQUIP"] = 420036] = "REPLACE_GEM_IN_NEWEQUIP";
    PromptExplain[PromptExplain["TEAMMEMBER_TEMPROARILY_PART"] = 141199] = "TEAMMEMBER_TEMPROARILY_PART";
    PromptExplain[PromptExplain["TEAMMEMBER_REGRESSION"] = 162023] = "TEAMMEMBER_REGRESSION";
    PromptExplain[PromptExplain["IN_TEAM_GROUP"] = 150030] = "IN_TEAM_GROUP";
    PromptExplain[PromptExplain["IN_TEAM_GROUP_CAPTAIN_OPERATE"] = 141216] = "IN_TEAM_GROUP_CAPTAIN_OPERATE";
    PromptExplain[PromptExplain["LACK_OF_MATERIAL"] = 168004] = "LACK_OF_MATERIAL";
    PromptExplain[PromptExplain["NEXT_ROUND_AUTO"] = 420039] = "NEXT_ROUND_AUTO";
    PromptExplain[PromptExplain["LACK_OF_ITEM"] = 150020] = "LACK_OF_ITEM";
    PromptExplain[PromptExplain["LACK_OF_VITALITY"] = 150100] = "LACK_OF_VITALITY";
    PromptExplain[PromptExplain["DONATION_REQUEST"] = 160369] = "DONATION_REQUEST";
    PromptExplain[PromptExplain["DONATION_RESPOND"] = 160370] = "DONATION_RESPOND";
    PromptExplain[PromptExplain["SHENSHOU_CANT_FREE"] = 162116] = "SHENSHOU_CANT_FREE";
    PromptExplain[PromptExplain["FIGHT_CANT_FREE"] = 150040] = "FIGHT_CANT_FREE";
    PromptExplain[PromptExplain["ZHUENGBEI_CANT_FREE"] = 191055] = "ZHUENGBEI_CANT_FREE";
    PromptExplain[PromptExplain["DEPOT_HOUSE_UNLOCK"] = 162143] = "DEPOT_HOUSE_UNLOCK";
    PromptExplain[PromptExplain["MARKET_TIME_ITEM"] = 160447] = "MARKET_TIME_ITEM";
    PromptExplain[PromptExplain["FLAGS_ITEM"] = 420042] = "FLAGS_ITEM";
    PromptExplain[PromptExplain["NOT_SELECT_ITEM"] = 190018] = "NOT_SELECT_ITEM";
    PromptExplain[PromptExplain["ATTENTION_WIN"] = 190015] = "ATTENTION_WIN";
    PromptExplain[PromptExplain["CANCEL_ATTENTION"] = 190016] = "CANCEL_ATTENTION";
    PromptExplain[PromptExplain["GetYINBI"] = 140984] = "GetYINBI";
    PromptExplain[PromptExplain["HECHONG_CONDITION"] = 150054] = "HECHONG_CONDITION";
    PromptExplain[PromptExplain["FRONT_NO_PARTNER"] = 160018] = "FRONT_NO_PARTNER";
    PromptExplain[PromptExplain["BEHIND_NO_PARTNER"] = 160019] = "BEHIND_NO_PARTNER";
    PromptExplain[PromptExplain["AUCTION_DISPACK"] = 160057] = "AUCTION_DISPACK";
    PromptExplain[PromptExplain["PK_INVITATION"] = 160422] = "PK_INVITATION";
})(PromptExplain || (PromptExplain = {}));
/** 程序内字符串表的提示语句 */
var Intra_ProgramString;
(function (Intra_ProgramString) {
    /** 科举乡试已经开始，您是否参加？ */
    Intra_ProgramString[Intra_ProgramString["XIANG_START"] = 11412] = "XIANG_START";
    /** 科举会试已经开始，您是否参加？ */
    Intra_ProgramString[Intra_ProgramString["HUI_START"] = 11413] = "HUI_START";
    /** 科举殿试已经开始，您是否参加？ */
    Intra_ProgramString[Intra_ProgramString["DIAN_START"] = 11414] = "DIAN_START";
    /** 有推送活动已经开始，您是否参加？ */
    Intra_ProgramString[Intra_ProgramString["ACT_START"] = 420033] = "ACT_START";
    /** 你确定要逃跑么？ */
    Intra_ProgramString[Intra_ProgramString["ESCAPE_CONFIRM"] = 1435] = "ESCAPE_CONFIRM";
    /** 确定 */
    Intra_ProgramString[Intra_ProgramString["ENSURE"] = 1556] = "ENSURE";
    /** 取消 */
    Intra_ProgramString[Intra_ProgramString["CANCLE"] = 2036] = "CANCLE";
})(Intra_ProgramString || (Intra_ProgramString = {}));
/** 获取活动推送信息 */
var TuiSongMessage;
(function (TuiSongMessage) {
    /** 是否开启活动推送 */
    TuiSongMessage[TuiSongMessage["ISOPEN"] = 0] = "ISOPEN";
    /** 是否已经推送完毕 */
    TuiSongMessage[TuiSongMessage["ISTUISONG"] = 1] = "ISTUISONG";
    /** 活动id */
    TuiSongMessage[TuiSongMessage["ACTID"] = 2] = "ACTID";
})(TuiSongMessage || (TuiSongMessage = {}));
/** 售卖类型 */
var SellType;
(function (SellType) {
    /** NPC普通商店 */
    SellType[SellType["NPC_GENERAL_STORE"] = 1] = "NPC_GENERAL_STORE";
    /** 商会 */
    SellType[SellType["SHANGHUI_STORE"] = 2] = "SHANGHUI_STORE";
    /** 摆摊（拍卖） */
    SellType[SellType["SALE_STORE"] = 3] = "SALE_STORE";
    /** 商城 */
    SellType[SellType["SHANGCHENG_STORE"] = 4] = "SHANGCHENG_STORE";
})(SellType || (SellType = {}));
/**商店类型 */
var shopType;
(function (shopType) {
    /**药品商店 */
    shopType[shopType["DRUG_SHOP"] = 1] = "DRUG_SHOP";
    /**酒馆老板 */
    shopType[shopType["BAR_SHOP"] = 2] = "BAR_SHOP";
    /**兵器铺 */
    shopType[shopType["WEAPON_SHOP"] = 3] = "WEAPON_SHOP";
    /**宠物店 */
    shopType[shopType["PET_SHOP"] = 4] = "PET_SHOP";
    /**商会 */
    shopType[shopType["SHANGHUI_SHOP"] = 5] = "SHANGHUI_SHOP";
    /**商城 */
    shopType[shopType["MALL_SHOP"] = 6] = "MALL_SHOP";
    /**声望 */
    shopType[shopType["PRESTIGE_SHOP"] = 7] = "PRESTIGE_SHOP";
    /**功勋值 */
    shopType[shopType["CREDIT_SHOP"] = 8] = "CREDIT_SHOP";
    /**节日积分 */
    shopType[shopType["FEAST_SHOP"] = 9] = "FEAST_SHOP";
    /**良师值 */
    shopType[shopType["MASTER_SHOP"] = 10] = "MASTER_SHOP";
    /**神兽商店 */
    shopType[shopType["DIVINE_SHOP"] = 11] = "DIVINE_SHOP";
    /**天梯（60-69） */
    shopType[shopType["LADDER1_SHOP"] = 12] = "LADDER1_SHOP";
    /**天梯（60-69） */
    shopType[shopType["LADDER2_SHOP"] = 13] = "LADDER2_SHOP";
    /**天梯（70-89） */
    shopType[shopType["LADDER3_SHOP"] = 14] = "LADDER3_SHOP";
    /**天梯（70-89） */
    shopType[shopType["LADDER4_SHOP"] = 15] = "LADDER4_SHOP";
    /**天梯（90-109） */
    shopType[shopType["LADDER5_SHOP"] = 16] = "LADDER5_SHOP";
    /**天梯（90-109） */
    shopType[shopType["LADDER6_SHOP"] = 17] = "LADDER6_SHOP";
    /** 拍卖行 */
    shopType[shopType["SALE_STORE"] = 18] = "SALE_STORE";
})(shopType || (shopType = {}));
/**人物属性 */
var shuxing;
(function (shuxing) {
    /**体质 */
    shuxing[shuxing["CONS"] = 10] = "CONS";
    /**智力 */
    shuxing[shuxing["IQ"] = 20] = "IQ";
    /**力量 */
    shuxing[shuxing["STR"] = 30] = "STR";
    /**耐力 */
    shuxing[shuxing["ENDU"] = 40] = "ENDU";
    /**敏捷 */
    shuxing[shuxing["AGI"] = 50] = "AGI";
    /**最大生命 */
    shuxing[shuxing["MAX_HP"] = 60] = "MAX_HP";
    /**当前生命上限（小于等于最大生命上限） */
    shuxing[shuxing["UP_LIMITED_HP"] = 70] = "UP_LIMITED_HP";
    /**当前生命 */
    shuxing[shuxing["HP"] = 80] = "HP";
    /**最大法力 */
    shuxing[shuxing["MAX_MP"] = 90] = "MAX_MP";
    /**当前法力 */
    shuxing[shuxing["MP"] = 100] = "MP";
    /**最大怒气 */
    shuxing[shuxing["MAX_SP"] = 110] = "MAX_SP";
    /**怒气 */
    shuxing[shuxing["SP"] = 120] = "SP";
    /**物理攻击 */
    shuxing[shuxing["ATTACK"] = 130] = "ATTACK";
    /**物理防御 */
    shuxing[shuxing["DEFEND"] = 140] = "DEFEND";
    /**法术攻击 */
    shuxing[shuxing["MAGIC_ATTACK"] = 150] = "MAGIC_ATTACK";
    /**法术防御 */
    shuxing[shuxing["MAGIC_DEF"] = 160] = "MAGIC_DEF";
    /**治疗强度 */
    shuxing[shuxing["MEDICAL"] = 170] = "MEDICAL";
    /**控制命中 */
    shuxing[shuxing["SEAL"] = 180] = "SEAL";
    /**控制抗性 */
    shuxing[shuxing["UNSEAL"] = 190] = "UNSEAL";
    /**速度 */
    shuxing[shuxing["SPEED"] = 200] = "SPEED";
    /**命中值 */
    shuxing[shuxing["HIT_RATE"] = 210] = "HIT_RATE";
    /**躲避值 */
    shuxing[shuxing["DODGE_RATE"] = 220] = "DODGE_RATE";
    /**物理暴击 */
    shuxing[shuxing["PHY_CRITC_LEVEL"] = 230] = "PHY_CRITC_LEVEL";
    /**物理抗暴 */
    shuxing[shuxing["ANTI_PHY_CRITC_LEVEL"] = 240] = "ANTI_PHY_CRITC_LEVEL";
    /**物理暴击程度（初始为200%,即2倍普通伤害） */
    shuxing[shuxing["PHY_CRIT_PCT"] = 250] = "PHY_CRIT_PCT";
    /**法术暴击 */
    shuxing[shuxing["MAGIC_CRITC_LEVEL"] = 260] = "MAGIC_CRITC_LEVEL";
    /**法术抗暴 */
    shuxing[shuxing["ANTI_MAGIC_CRITC_LEVEL"] = 270] = "ANTI_MAGIC_CRITC_LEVEL";
    /**魔法暴击程度（初始为200%） */
    shuxing[shuxing["MAGIC_CRIT_PCT"] = 280] = "MAGIC_CRIT_PCT";
    /**治疗暴击 */
    shuxing[shuxing["HEAL_CRIT_LEVEL"] = 290] = "HEAL_CRIT_LEVEL";
    /**治疗暴击程度 */
    shuxing[shuxing["HEAL_CRIT_PCT"] = 300] = "HEAL_CRIT_PCT";
    /**当前体力 */
    shuxing[shuxing["PHFORCE"] = 450] = "PHFORCE";
    /**经验 */
    shuxing[shuxing["EXP"] = 470] = "EXP";
    /**下级经验 */
    shuxing[shuxing["NEXP"] = 480] = "NEXP";
    /**人气值 */
    shuxing[shuxing["RENQI"] = 610] = "RENQI";
    /**职业贡献度 */
    shuxing[shuxing["SCHOOLFUND"] = 850] = "SCHOOLFUND";
    /**物理穿透 */
    shuxing[shuxing["WULI_CHUANTOU"] = 950] = "WULI_CHUANTOU";
    /**物理抵抗 */
    shuxing[shuxing["WULI_DIKANG"] = 960] = "WULI_DIKANG";
    /**法术穿透 */
    shuxing[shuxing["FASHU_CHUANTOU"] = 970] = "FASHU_CHUANTOU";
    /**法术抵抗 */
    shuxing[shuxing["FASHU_DIKANG"] = 980] = "FASHU_DIKANG";
    /**治疗加深 */
    shuxing[shuxing["ZHILIAO_JIASHEN"] = 990] = "ZHILIAO_JIASHEN";
    /**技能效果点 */
    shuxing[shuxing["EFFECT_POINT"] = 1010] = "EFFECT_POINT";
    /**临时怒气 */
    shuxing[shuxing["TEMP_SP"] = 1020] = "TEMP_SP";
    /**师徒声望 */
    shuxing[shuxing["MASTER_REPUTATION"] = 1080] = "MASTER_REPUTATION";
    /**宠物资质上限 */
    shuxing[shuxing["PET_XUEMAI_MAX"] = 1150] = "PET_XUEMAI_MAX";
    /**宠物低级技能数 */
    shuxing[shuxing["PET_LOW_SKILL"] = 1170] = "PET_LOW_SKILL";
    /**宠物高级技能数 */
    shuxing[shuxing["PET_HIGH_SKILL"] = 1180] = "PET_HIGH_SKILL";
    /**宠物超级技能数 */
    shuxing[shuxing["PET_SUPER_SKILL"] = 1190] = "PET_SUPER_SKILL";
    /**等级*/
    shuxing[shuxing["LEVEL"] = 1230] = "LEVEL";
    /**宠物寿命*/
    shuxing[shuxing["PET_LIFE"] = 1360] = "PET_LIFE";
    /**活跃度幸运星*/
    shuxing[shuxing["ACTIVESTAR"] = 1380] = "ACTIVESTAR";
    /**潜能*/
    shuxing[shuxing["POINT"] = 1400] = "POINT";
    /**气力值*/
    shuxing[shuxing["QILIZHI"] = 1410] = "QILIZHI";
    /**气力值上限*/
    shuxing[shuxing["QILIZHI_LIMIT"] = 1420] = "QILIZHI_LIMIT";
    /**宠物出战等级*/
    shuxing[shuxing["PET_FIGHT_LEVEL"] = 1430] = "PET_FIGHT_LEVEL";
    /**宠物攻击资质*/
    shuxing[shuxing["PET_ATTACK_APT"] = 1440] = "PET_ATTACK_APT";
    /**宠物防御资质*/
    shuxing[shuxing["PET_DEFEND_APT"] = 1450] = "PET_DEFEND_APT";
    /**宠物体力资质*/
    shuxing[shuxing["PET_PHYFORCE_APT"] = 1460] = "PET_PHYFORCE_APT";
    /**宠物法力资质*/
    shuxing[shuxing["PET_MAGIC_APT"] = 1470] = "PET_MAGIC_APT";
    /**宠物速度资质*/
    shuxing[shuxing["PET_SPEED_APT"] = 1480] = "PET_SPEED_APT";
    /**宠物躲闪资质*/
    shuxing[shuxing["PET_DODGE_APT"] = 1490] = "PET_DODGE_APT";
    /**宠物成长率*/
    shuxing[shuxing["PET_GROW_RATE"] = 1500] = "PET_GROW_RATE";
    /**活力上限 */
    shuxing[shuxing["ENLIMIT"] = 1520] = "ENLIMIT";
    /**体力上限 */
    shuxing[shuxing["PFLIMIT"] = 1530] = "PFLIMIT";
    /**宠物大小1-4 */
    shuxing[shuxing["PET_SCALE"] = 1810] = "PET_SCALE";
    /**活跃度值 */
    shuxing[shuxing["ACTIVENESS"] = 1820] = "ACTIVENESS";
    /**暴击抗性等级 */
    shuxing[shuxing["ANTI_CRIT_LEVEL"] = 2090] = "ANTI_CRIT_LEVEL";
    /**控制加成 */
    shuxing[shuxing["KONGZHI_JIACHENG"] = 2130] = "KONGZHI_JIACHENG";
    /**控制免疫 */
    shuxing[shuxing["KONGZHI_MIANYI"] = 2140] = "KONGZHI_MIANYI";
    /**当前活力 */
    shuxing[shuxing["ENERGY"] = 3010] = "ENERGY";
})(shuxing || (shuxing = {}));
/**主界面按钮坐标 */
var pos;
(function (pos) {
    pos[pos["XPOS_1"] = 525] = "XPOS_1";
    pos[pos["XPOS_2"] = 422] = "XPOS_2";
    pos[pos["XPOS_3"] = 314] = "XPOS_3";
    pos[pos["XPOS_4"] = 210] = "XPOS_4";
    pos[pos["XPOS_5"] = 105] = "XPOS_5";
    pos[pos["YPOS_1"] = -11] = "YPOS_1";
    pos[pos["YPOS_2"] = 104] = "YPOS_2";
    pos[pos["YPOS_3"] = 217] = "YPOS_3";
    pos[pos["YPOS_4"] = 336] = "YPOS_4";
})(pos || (pos = {}));
/** 功能解锁等级 */
var unlock;
(function (unlock) {
    /**初始等级 */
    unlock[unlock["START_LEVEL"] = 1] = "START_LEVEL";
    /**技能解锁等级 */
    unlock[unlock["SKILL_LEVEL"] = 14] = "SKILL_LEVEL";
    /**帮派解锁等级 */
    unlock[unlock["BANGPAI_LEVEL"] = 16] = "BANGPAI_LEVEL";
    /**助战解锁等级 */
    unlock[unlock["ZHUZHAN_LEVEL"] = 17] = "ZHUZHAN_LEVEL";
    /**活动解锁等级 */
    unlock[unlock["ACTIVITY_LEVEL"] = 19] = "ACTIVITY_LEVEL";
    /**挂机解锁等级 */
    unlock[unlock["GUAJI_LEVEL"] = 25] = "GUAJI_LEVEL";
    /**排行解锁等级 */
    unlock[unlock["PAIHANG_LEVEL"] = 31] = "PAIHANG_LEVEL";
    /**强化解锁等级 */
    unlock[unlock["QIANGHUA_LEVEL"] = 32] = "QIANGHUA_LEVEL";
    /**经验加成图片 */
    unlock[unlock["EXPUP_LEVEL"] = 35] = "EXPUP_LEVEL";
})(unlock || (unlock = {}));
/**人物通货 */
var RoleCurrency;
(function (RoleCurrency) {
    /**公会DKP */
    RoleCurrency[RoleCurrency["GUILD_DKP"] = 1] = "GUILD_DKP";
    /**公会贡献 */
    RoleCurrency[RoleCurrency["GUILD_DED"] = 2] = "GUILD_DED";
    /**良师值 */
    RoleCurrency[RoleCurrency["TEACHER_SCORE"] = 3] = "TEACHER_SCORE";
    /**活动积分 */
    RoleCurrency[RoleCurrency["ACTIVE_SCORE"] = 4] = "ACTIVE_SCORE";
    /**荣誉值 */
    RoleCurrency[RoleCurrency["HONOR_SCORE"] = 5] = "HONOR_SCORE";
    /**声望值 */
    RoleCurrency[RoleCurrency["POP_SCORE"] = 6] = "POP_SCORE";
    /**好友积分 */
    RoleCurrency[RoleCurrency["FRIEND_SCORE"] = 7] = "FRIEND_SCORE";
    /**职业贡献 */
    RoleCurrency[RoleCurrency["PROF_CONTR"] = 9] = "PROF_CONTR";
    /**信用点 */
    RoleCurrency[RoleCurrency["EREDITPOINT_SCORE"] = 10] = "EREDITPOINT_SCORE";
    /**天梯币 */
    RoleCurrency[RoleCurrency["TIANTI_COIN"] = 11] = "TIANTI_COIN";
    /**巧匠值 */
    RoleCurrency[RoleCurrency["QIAO_JIANG"] = 12] = "QIAO_JIANG";
})(RoleCurrency || (RoleCurrency = {}));
/**引导相关枚举 */
var YinDaoEnum;
(function (YinDaoEnum) {
    /**一级引导提示 */
    YinDaoEnum[YinDaoEnum["RENWU_YINDAO_TIP"] = 31001] = "RENWU_YINDAO_TIP";
    /**日常副本引导提示 */
    YinDaoEnum[YinDaoEnum["RICHANG_YINDAO_TIP"] = 33004] = "RICHANG_YINDAO_TIP";
    /**技能引导提示 */
    YinDaoEnum[YinDaoEnum["SKILL_YINDAO_TIP"] = 33140] = "SKILL_YINDAO_TIP";
    /**背包引导提示 */
    YinDaoEnum[YinDaoEnum["BAG_YINDAO_TIP"] = 31043] = "BAG_YINDAO_TIP";
    /**宠物引导提示 */
    YinDaoEnum[YinDaoEnum["PET_YINDAO_TIP"] = 33150] = "PET_YINDAO_TIP";
    /**装备引导穿戴提示 */
    YinDaoEnum[YinDaoEnum["CHUANDAI_YINDAO_TIP"] = 31044] = "CHUANDAI_YINDAO_TIP";
    /**宠物加点引导提示 */
    YinDaoEnum[YinDaoEnum["PETPOINT_YINDAO_TIP"] = 33150] = "PETPOINT_YINDAO_TIP";
    /**组队引导提示 */
    YinDaoEnum[YinDaoEnum["ZUIDUI_YINDAO_TIP"] = 33005] = "ZUIDUI_YINDAO_TIP";
    /**自动匹配引导提示 */
    YinDaoEnum[YinDaoEnum["PIPEI_YINDAO_TIP"] = 33007] = "PIPEI_YINDAO_TIP";
    /**重置引导 */
    YinDaoEnum[YinDaoEnum["RESET_YINDAO"] = 0] = "RESET_YINDAO";
    /**一级引导 */
    YinDaoEnum[YinDaoEnum["RENWU_YINDAO"] = 1] = "RENWU_YINDAO";
    /**日常副本引导 */
    YinDaoEnum[YinDaoEnum["RICHANG_YINDAO"] = 2] = "RICHANG_YINDAO";
    /**便捷组队引导 */
    YinDaoEnum[YinDaoEnum["ZUIDUI_YINDAO"] = 3] = "ZUIDUI_YINDAO";
    /**选择日常副本引导 */
    YinDaoEnum[YinDaoEnum["CHOOSE_RICHANG_YINDAO"] = 4] = "CHOOSE_RICHANG_YINDAO";
    /**自动匹配引导 */
    YinDaoEnum[YinDaoEnum["PIPEI_YINDAO"] = 5] = "PIPEI_YINDAO";
    /**宠物头像点击引导 */
    YinDaoEnum[YinDaoEnum["CLICK_PET_YINDAO"] = 6] = "CLICK_PET_YINDAO";
    /**宠物加点方案引导 */
    YinDaoEnum[YinDaoEnum["PET_FANGAN_YINDAO"] = 7] = "PET_FANGAN_YINDAO";
    /**技能引导 */
    YinDaoEnum[YinDaoEnum["SKILL_YINDAO"] = 8] = "SKILL_YINDAO";
    /**生活技能点击引导 */
    YinDaoEnum[YinDaoEnum["LIFESKILL_YINDAO"] = 9] = "LIFESKILL_YINDAO";
    /**显示生活技能提示引导 */
    YinDaoEnum[YinDaoEnum["LIFESKILL_TIP_YINDAO"] = 10] = "LIFESKILL_TIP_YINDAO";
    /**专精技能点击引导 */
    YinDaoEnum[YinDaoEnum["ZHUANJING_CLICK_YINDAO"] = 11] = "ZHUANJING_CLICK_YINDAO";
    /**背包引导 */
    YinDaoEnum[YinDaoEnum["BAG_YINDAO"] = 12] = "BAG_YINDAO";
    /**装备穿戴引导起始序号 */
    YinDaoEnum[YinDaoEnum["CHUANDAI_YINDAO"] = 100000] = "CHUANDAI_YINDAO";
})(YinDaoEnum || (YinDaoEnum = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var mainhud;
        (function (mainhud) {
            var models;
            (function (models) {
                var HudModel = /** @class */ (function () {
                    function HudModel() {
                        this.cNPCConfigData = {};
                        /** NPC对白配置 */
                        this.cNpcChatData = {};
                        /** NPC服务总表 */
                        this.cnpcServerConfigData = {};
                        /** NPC服务映射表 */
                        this.CNpcServiceMappingData = {};
                        this.cNPCInfoData = {};
                        /**F服务器经验限制表 */
                        this.cserviceexpconfigData = {};
                        /**箭头效果 */
                        this.carroweffectData = {};
                        /** 符石(元宝数量) */
                        this.fuShiNum = 0;
                        /**金币数量 */
                        this.goldNum = 0;
                        /**银币数量 */
                        this.sliverNum = 0;
                        /**职业贡献数量 */
                        this.zhiyeNum = 0;
                        /**荣誉值数量 */
                        this.rongyuNum = 0;
                        /**声望数量 */
                        this.shengwangNum = 0;
                        /**节日积分数量 */
                        this.jieriNum = 0;
                        /**良师值数量 */
                        this.liangshiNum = 0;
                        /**信用点数量 */
                        this.xinyongNum = 0;
                        /** 公会dkp*/
                        this.dkpNum = 0;
                        /** 公会贡献*/
                        this.gonghuiNum = 0;
                        /** 活动积分*/
                        this.activeNum = 0;
                        /** 好友积分*/
                        this.friendNum = 0;
                        /** 天梯币*/
                        this.tiantiNum = 0;
                        /** 巧匠值*/
                        this.qiaojiangNum = 0;
                        /**体质 */
                        this.tizhiNum = 0;
                        /**智力 */
                        this.zhiliNum = 0;
                        /**力量 */
                        this.liliangNum = 0;
                        /**耐力 */
                        this.nailiNum = 0;
                        /**敏捷 */
                        this.minjieNum = 0;
                        /**最大生命 */
                        this.maxHpNum = 0;
                        /**当前生命上限（小于等于最大生命上限） */
                        this.limitedHpNum = 0;
                        /**当前生命 */
                        this.hpNum = 0;
                        /**最大法力 */
                        this.maxMpNum = 0;
                        /**当前法力 */
                        this.mpNum = 0;
                        /**最大怒气 */
                        this.maxSpNum = 0;
                        /**怒气 */
                        this.spNum = 0;
                        /**物理攻击 */
                        this.attackNum = 0;
                        /**物理防御 */
                        this.defendNum = 0;
                        /**法术攻击 */
                        this.magicAttackNum = 0;
                        /**法术防御 */
                        this.magicDefNum = 0;
                        /**治疗强度 */
                        this.medicalNum = 0;
                        /**控制命中 */
                        this.sealNum = 0;
                        /**控制抗性 */
                        this.unSealNum = 0;
                        /**速度 */
                        this.speedNum = 0;
                        /**命中值 */
                        this.hitRateNum = 0;
                        /**躲避值 */
                        this.dodgeRateNum = 0;
                        /**物理暴击 */
                        this.phyCritcLevelNum = 0;
                        /**物理抗暴 */
                        this.antiPhyCritcLevelNum = 0;
                        /**物理暴击程度（初始为200%,即2倍普通伤害） */
                        this.phyCritPct = 0;
                        /**法术暴击 */
                        this.magicCritcLevelNum = 0;
                        /**法术抗暴 */
                        this.antiMagicCritcLevelNum = 0;
                        /**魔法暴击程度（初始为200%） */
                        this.magicCritPctNum = 0;
                        /**治疗暴击 */
                        this.healCritLevelNum = 0;
                        /**治疗暴击程度 */
                        this.healCritPctNum = 0;
                        /**当前体力 */
                        this.phforceNum = 0;
                        /**经验 */
                        this.expNum = 0;
                        /**下级经验 */
                        this.nexpNum = 0;
                        /**人气值 */
                        this.renqiNum = 0;
                        /**职业贡献度 */
                        this.schoolfundNum = 0;
                        /**物理穿透 */
                        this.wulichuantouNum = 0;
                        /**物理抵抗 */
                        this.wulidikangNum = 0;
                        /**法术穿透 */
                        this.fashuchuantouNum = 0;
                        /**法术抵抗 */
                        this.fashudikangNum = 0;
                        /**治疗加深 */
                        this.zhiliaojiashenNum = 0;
                        /**技能效果点 */
                        this.effectPointNum = 0;
                        /**临时怒气 */
                        this.tempSpNum = 0;
                        /**师徒声望 */
                        this.masterReputationNum = 0;
                        /**宠物资质上限 */
                        this.petXuemaiMaxNum = 0;
                        /**宠物低级技能数 */
                        this.petLowSkillNum = 0;
                        /**宠物高级技能数 */
                        this.petHighSkillNum = 0;
                        /**宠物超级技能数 */
                        this.petSuperSkillNum = 0;
                        /**等级 */
                        this.levelNum = 0;
                        /**宠物寿命 */
                        this.petLifenNum = 0;
                        /**活跃度幸运星 */
                        this.activeStarNum = 0;
                        /**潜能 */
                        this.pointNum = 0;
                        /**气力值 */
                        this.qilizhiNum = 0;
                        /**气力值上限 */
                        this.qilizhiLimitNum = 0;
                        /**宠物出战等级 */
                        this.petFightLevelNum = 0;
                        /**宠物攻击资质 */
                        this.petAttackAptNum = 0;
                        /**宠物防御资质 */
                        this.petDefendAptNum = 0;
                        /**宠物体力资质 */
                        this.petPhyforceAptNum = 0;
                        /**宠物法力资质 */
                        this.petMagicAptNum = 0;
                        /**宠物速度资质 */
                        this.petSpeedAptNum = 0;
                        /**宠物躲闪资质 */
                        this.petDodgeAptNum = 0;
                        /**宠物成长率 */
                        this.petGrowRateNum = 0;
                        /**活力上限 */
                        this.enlimitNum = 0;
                        /**体力上限 */
                        this.pflimitNum = 0;
                        /**宠物大小1-4 */
                        this.petScaleNum = 0;
                        /**活跃度值 */
                        this.activenessNum = 0;
                        /**暴击抗性等级 */
                        this.antiCritLevelNum = 0;
                        /**控制加成 */
                        this.kongzhiJiachengNum = 0;
                        /**控制免疫 */
                        this.kongzhiMianyiNum = 0;
                        /**当前活力 */
                        this.energyNum = 0;
                        /**是否开启监听宠物 */
                        this.isListenerPetInfo = false;
                        /**是否有公会 大于0则是有公会 */
                        this.clankey = 0;
                        /**公会名称 */
                        this.clanname = "";
                        /**服务器等级 */
                        this.serverLevel = 0;
                        /**服务器开启新等级剩余天数 */
                        this.newleveldays = 0;
                        /** 战斗时存储的技能 */
                        this.battleSkill = -1;
                        /** 战斗时存储的技能-宠物 */
                        this.battleSkill_pet = -1;
                        /**巡逻状态*/
                        this.taskxl = 0;
                        /**进入游戏后，有做任务才能刷新特效或者新任务才能刷新 */
                        this.joingame = 0;
                        /**模型和任务一起刷完之后才算全部加载完成 2为两个都加载完毕 */
                        this.isrefreshall = 0;
                        /** 目标id */
                        this.itemid = 0; //天机需要的道具
                        /** 商店类型 */
                        this.shoptype = 0; //天机需要的类型
                        /** 主线是否隐藏了主界面 */
                        this.hideMain = false;
                        /** 挂机输赢 */
                        this.HangUpWin = true;
                        /** 判断是否在匹配组队 */
                        this.isMatch = false;
                        /** 存放上交对象天机仙令任务数据 */
                        this.tjxlData = [];
                        /** 被观战的战斗id */
                        this.watchedBattleId = 0;
                        /** 帮派求助倒计时 */
                        this.qiuzhuBP = 0;
                        /** 全服求助倒计时 */
                        this.qiuzhuQF = 0;
                        HudModel._instance = this;
                        this.pos = new Vector2();
                        this.SRefreshUserExpData = new Laya.Dictionary();
                        this.desnpc = new Vector2();
                        this.SExpMessageTipsData = new Laya.Dictionary();
                    }
                    HudModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new HudModel();
                        }
                        return this._instance;
                    };
                    HudModel.clearModelData = function () {
                        mainhud.models.HudModel._instance.SExpMessageTipsData = new Laya.Dictionary();
                        mainhud.models.HudModel._instance.sceneid = 0;
                        mainhud.models.HudModel._instance.movesceneid = 0;
                        mainhud.models.HudModel._instance.pos = new Vector2();
                        mainhud.models.HudModel._instance.mapname = "";
                        mainhud.models.HudModel._instance.SRefreshUserExpData = new Laya.Dictionary();
                        mainhud.models.HudModel._instance.fuShiNum = 0;
                        mainhud.models.HudModel._instance.goldNum = 0;
                        mainhud.models.HudModel._instance.sliverNum = 0;
                        mainhud.models.HudModel._instance.zhiyeNum = 0;
                        mainhud.models.HudModel._instance.rongyuNum = 0;
                        mainhud.models.HudModel._instance.shengwangNum = 0;
                        mainhud.models.HudModel._instance.jieriNum = 0;
                        mainhud.models.HudModel._instance.liangshiNum = 0;
                        mainhud.models.HudModel._instance.xinyongNum = 0;
                        mainhud.models.HudModel._instance.dkpNum = 0;
                        mainhud.models.HudModel._instance.gonghuiNum = 0;
                        mainhud.models.HudModel._instance.activeNum = 0;
                        mainhud.models.HudModel._instance.friendNum = 0;
                        mainhud.models.HudModel._instance.tiantiNum = 0;
                        mainhud.models.HudModel._instance.qiaojiangNum = 0;
                        mainhud.models.HudModel._instance.tizhiNum = 0;
                        mainhud.models.HudModel._instance.zhiliNum = 0;
                        mainhud.models.HudModel._instance.liliangNum = 0;
                        mainhud.models.HudModel._instance.nailiNum = 0;
                        mainhud.models.HudModel._instance.minjieNum = 0;
                        mainhud.models.HudModel._instance.maxHpNum = 0;
                        mainhud.models.HudModel._instance.limitedHpNum = 0;
                        mainhud.models.HudModel._instance.hpNum = 0;
                        mainhud.models.HudModel._instance.maxMpNum = 0;
                        mainhud.models.HudModel._instance.mpNum = 0;
                        mainhud.models.HudModel._instance.maxSpNum = 0;
                        mainhud.models.HudModel._instance.spNum = 0;
                        mainhud.models.HudModel._instance.attackNum = 0;
                        mainhud.models.HudModel._instance.defendNum = 0;
                        mainhud.models.HudModel._instance.magicAttackNum = 0;
                        mainhud.models.HudModel._instance.magicDefNum = 0;
                        mainhud.models.HudModel._instance.medicalNum = 0;
                        mainhud.models.HudModel._instance.sealNum = 0;
                        mainhud.models.HudModel._instance.unSealNum = 0;
                        mainhud.models.HudModel._instance.speedNum = 0;
                        mainhud.models.HudModel._instance.hitRateNum = 0;
                        mainhud.models.HudModel._instance.dodgeRateNum = 0;
                        mainhud.models.HudModel._instance.phyCritcLevelNum = 0;
                        mainhud.models.HudModel._instance.antiPhyCritcLevelNum = 0;
                        mainhud.models.HudModel._instance.phyCritPct = 0;
                        mainhud.models.HudModel._instance.magicCritcLevelNum = 0;
                        mainhud.models.HudModel._instance.antiMagicCritcLevelNum = 0;
                        mainhud.models.HudModel._instance.magicCritPctNum = 0;
                        mainhud.models.HudModel._instance.healCritLevelNum = 0;
                        mainhud.models.HudModel._instance.healCritPctNum = 0;
                        mainhud.models.HudModel._instance.phforceNum = 0;
                        mainhud.models.HudModel._instance.expNum = 0;
                        mainhud.models.HudModel._instance.nexpNum = 0;
                        mainhud.models.HudModel._instance.renqiNum = 0;
                        mainhud.models.HudModel._instance.schoolfundNum = 0;
                        mainhud.models.HudModel._instance.wulichuantouNum = 0;
                        mainhud.models.HudModel._instance.wulidikangNum = 0;
                        mainhud.models.HudModel._instance.fashuchuantouNum = 0;
                        mainhud.models.HudModel._instance.fashudikangNum = 0;
                        mainhud.models.HudModel._instance.zhiliaojiashenNum = 0;
                        mainhud.models.HudModel._instance.effectPointNum = 0;
                        mainhud.models.HudModel._instance.tempSpNum = 0;
                        mainhud.models.HudModel._instance.masterReputationNum = 0;
                        mainhud.models.HudModel._instance.petXuemaiMaxNum = 0;
                        mainhud.models.HudModel._instance.petLowSkillNum = 0;
                        mainhud.models.HudModel._instance.petHighSkillNum = 0;
                        mainhud.models.HudModel._instance.petSuperSkillNum = 0;
                        mainhud.models.HudModel._instance.levelNum = 0;
                        mainhud.models.HudModel._instance.petLifenNum = 0;
                        mainhud.models.HudModel._instance.activeStarNum = 0;
                        mainhud.models.HudModel._instance.pointNum = 0;
                        mainhud.models.HudModel._instance.qilizhiNum = 0;
                        mainhud.models.HudModel._instance.qilizhiLimitNum = 0;
                        mainhud.models.HudModel._instance.petFightLevelNum = 0;
                        mainhud.models.HudModel._instance.petAttackAptNum = 0;
                        mainhud.models.HudModel._instance.petDefendAptNum = 0;
                        mainhud.models.HudModel._instance.petPhyforceAptNum = 0;
                        mainhud.models.HudModel._instance.petMagicAptNum = 0;
                        mainhud.models.HudModel._instance.petSpeedAptNum = 0;
                        mainhud.models.HudModel._instance.petDodgeAptNum = 0;
                        mainhud.models.HudModel._instance.petGrowRateNum = 0;
                        mainhud.models.HudModel._instance.enlimitNum = 0;
                        mainhud.models.HudModel._instance.pflimitNum = 0;
                        mainhud.models.HudModel._instance.petScaleNum = 0;
                        mainhud.models.HudModel._instance.activenessNum = 0;
                        mainhud.models.HudModel._instance.antiCritLevelNum = 0;
                        mainhud.models.HudModel._instance.kongzhiJiachengNum = 0;
                        mainhud.models.HudModel._instance.kongzhiMianyiNum = 0;
                        mainhud.models.HudModel._instance.energyNum = 0;
                        mainhud.models.HudModel._instance.isListenerPetInfo = false;
                        mainhud.models.HudModel._instance.clankey = 0;
                        mainhud.models.HudModel._instance.clanname = "";
                        mainhud.models.HudModel._instance.serverLevel = 0;
                        mainhud.models.HudModel._instance.newleveldays = 0;
                        mainhud.models.HudModel._instance.yindaoId;
                        mainhud.models.HudModel._instance.battleSkill = -1;
                        mainhud.models.HudModel._instance.battleSkill_pet = -1;
                        mainhud.models.HudModel._instance.jumpmapid = 0;
                        mainhud.models.HudModel._instance.desnpc = new Vector2();
                        mainhud.models.HudModel._instance.npcid = 0;
                        mainhud.models.HudModel._instance.eventid = 0;
                        mainhud.models.HudModel._instance.taskid = 0;
                        mainhud.models.HudModel._instance.useitemid = 0;
                        mainhud.models.HudModel._instance.tasktype = -1;
                        mainhud.models.HudModel._instance.npckey = 0;
                        mainhud.models.HudModel._instance.taskxl = 0;
                        mainhud.models.HudModel._instance.joingame = 0;
                        mainhud.models.HudModel._instance.isrefreshall = 0;
                        mainhud.models.HudModel._instance.itemid = 0;
                        mainhud.models.HudModel._instance.shoptype = 0;
                        mainhud.models.HudModel._instance.hideMain = false;
                        mainhud.models.HudModel._instance.isMatch = false;
                        mainhud.models.HudModel._instance.tjxlData = [];
                        mainhud.models.HudModel._instance.watchedBattleId = 0;
                        mainhud.models.HudModel._instance.qiuzhuBP = 0;
                        mainhud.models.HudModel._instance.qiuzhuQF = 0;
                    };
                    /** 提示语句组装返回 */
                    HudModel.prototype.promptAssembleBack = function (promptId, param) {
                        var promptData = ChatModel.getInstance().chatMessageTips[promptId].msg;
                        if (typeof (param) != "undefined") { /** 这里将参数一一替换 */
                            for (var paramIndex = 0; paramIndex < param.length; paramIndex++) {
                                if (typeof (param[paramIndex]) == "undefined") { /** 如果是undefined则特殊处理数据 */
                                    promptData = promptData.replace("$parameter" + [(paramIndex + 1)] + "$", " ");
                                }
                                else
                                    promptData = promptData.replace("$parameter" + [(paramIndex + 1)] + "$", param[paramIndex]);
                            }
                        }
                        promptData = this.promptSpecialProcess(promptData);
                        return promptData;
                    };
                    /** 对参数替换完的提示语句再次特殊处理 */
                    HudModel.prototype.promptSpecialProcess = function (promptData) {
                        if (promptData.indexOf("<P t=") != -1 && promptData.indexOf("</P>") != -1) { //特殊处理类似为消息id为162099，消息内容为<span style='color:#00c6ff;fontSize:24'>$parameter1$</span><span style='fontSize:24'>接受了</span><span style='color:#00c6ff;fontSize:24'>$parameter2$</span><span style='fontSize:24'>的挑战，一场为了荣耀和尊严的战斗正式开始。</span><P t="查看" type="13" key="$parameter3$</P>
                            var target_1 = '<P t=';
                            var targetIndex_1 = promptData.indexOf(target_1);
                            var target_2 = '</P>';
                            var targetIndex_2 = promptData.indexOf(target_2);
                            var targetStr = promptData.substring(targetIndex_1, targetIndex_2 + target_2.length); //截取出类似这种<P t="查看" type="13" key="$parameter3$</P>字符串
                            if (targetStr.indexOf(DisplayType.DISPLAY_LIVEDIE.toString())) { //如果是生死战的链接
                                var target_3 = '<P t="';
                                var targetIndex_3 = targetStr.indexOf(target_3);
                                var target_4 = '" type="';
                                var targetIndex_4 = targetStr.indexOf(target_4);
                                var clickTarget = targetStr.substring(targetIndex_3 + target_3.length, targetIndex_4); //所要点击的目标
                                var target_5 = 'key="';
                                var targetIndex_5 = targetStr.indexOf(target_5);
                                var target_6 = '</P>';
                                var targetIndex_6 = targetStr.indexOf(target_6);
                                this.watchedBattleId = Number(targetStr.substring(targetIndex_5 + target_5.length, targetIndex_6)); //获得能被观战的战斗id
                                var _needStr = "<span style='color:#13ff00;fontSize:24;underline:false' href='onClickTarget'>" + "[" + clickTarget + "]" + "</span>";
                                promptData = promptData.replace(targetStr, _needStr);
                            }
                        }
                        promptData = FriendModel.getInstance().replaceSpecialMsgContentText(promptData);
                        return promptData;
                    };
                    /**任务语句组装返回*/
                    HudModel.prototype.taskAssembleBack = function (promptData, param, type) {
                        if (typeof (param) != "undefined") { /** 这里将参数一一替换 */
                            switch (type) {
                                case 1:
                                    promptData = promptData.replace("$name$", param);
                                    break;
                                case 2:
                                    promptData = promptData.replace("$number$", param);
                                    promptData = promptData.replace("$Number$", param);
                                    break;
                                case 3:
                                    promptData = promptData.replace("$MapName$", param);
                                    break;
                                case 4:
                                    promptData = promptData.replace("$NPCName$", param);
                                    break;
                                case 5:
                                    promptData = promptData.replace("$PetName$", param);
                                    break;
                                case 6:
                                    promptData = promptData.replace("$ItemName$", param);
                                    break;
                                case 7:
                                    promptData = promptData.replace("$Number1$", param);
                                    break;
                                case 8:
                                    promptData = promptData.replace("$Number2$", param);
                                    break;
                                case 9:
                                    promptData = promptData.replace("$Number3$", param);
                                    break;
                                case 10:
                                    promptData = promptData.replace("$NAME$", param);
                                    break;
                                case 11:
                                    promptData = promptData.replace("$parameter1$", param);
                                    break;
                                case 12:
                                    promptData = promptData.replace("$dot$", param);
                                    break;
                                case 13:
                                    promptData = promptData.replace("$parameter2$", param);
                                    break;
                                case 14:
                                    promptData = promptData.replace("$Number4$", param);
                                    break;
                                case 15:
                                    promptData = promptData.replace("$mapName10$", param);
                                    break;
                                case 16:
                                    promptData = promptData.replace("$time$", param);
                                    break;
                                default:
                                    break;
                            }
                        }
                        return promptData;
                    };
                    /**
                     * 判断是否显示聊天内容
                     * @param type 频道类型
                     */
                    HudModel.prototype.whertherShow = function (type) {
                        var SysConfigDic = game.modules.setBasics.models.SetBasicsModel.getInstance().SysConfigDic;
                        if (type == ChannelType.CHANNEL_CLAN) { /** 帮派消息 */
                            var familySet = SysConfigDic.get(ChannelSet.SET_FAMILY_CHANNEL);
                            if (familySet == InterfaceSwitch.INTERFACE_CLOSE)
                                return false;
                            return true;
                        }
                        else if (type == ChannelType.CHANNEL_CURRENT) { /** 当前频道 */
                            var currentSet = SysConfigDic.get(ChannelSet.SET_CURRENT_CHANNEL);
                            if (currentSet == InterfaceSwitch.INTERFACE_CLOSE)
                                return false;
                            return true;
                        }
                        else if (type == ChannelType.CHANNEL_PROFESSION) { /** 门派消息 */
                            var sectsSet = SysConfigDic.get(ChannelSet.SET_SECTS_CHANNEL);
                            if (sectsSet == InterfaceSwitch.INTERFACE_CLOSE)
                                return false;
                            return true;
                        }
                        else if (type == ChannelType.CHANNEL_TEAM) { /** 队伍消息 */
                            var teamSet = SysConfigDic.get(ChannelSet.SET_TEAM_CHANNEL);
                            if (teamSet == InterfaceSwitch.INTERFACE_CLOSE)
                                return false;
                            return true;
                        }
                        else if (type == ChannelType.CHANNEL_WORLD) { /** 世界频道 */
                            var worldSet = SysConfigDic.get(ChannelSet.SET_WORLD_CHANNEL);
                            if (worldSet == InterfaceSwitch.INTERFACE_CLOSE)
                                return false;
                            return true;
                        }
                        else if (type == ChannelType.TEAM_APPLY) { /** 组队申请 */
                            var zuduiSet = SysConfigDic.get(ChannelSet.SET_ZUDUI_CHANNEL);
                            if (zuduiSet == InterfaceSwitch.INTERFACE_CLOSE)
                                return false;
                            return true;
                        }
                    };
                    HudModel.prototype.getpost = function (mapid) {
                        var MapData = MapModel.getInstance().WorldMapConfigData[mapid];
                        var mainUnit = this.useapp.sceneObjectMgr.mainUnit;
                        var x, y;
                        x = (Math.random() * (MapData.bottomx - MapData.topx) + MapData.topx);
                        y = (Math.random() * (MapData.bottomy - MapData.topy) + MapData.topy);
                        mainUnit.SetPosX(x);
                        mainUnit.SetPosY(y);
                        mainUnit.SetPos(x, y);
                    };
                    /**任务执行 */
                    HudModel.prototype.taskstart = function () {
                        game.scene.models.SceneProxy.getInstance().event(game.scene.models.NPC_SELECT, ["", 0]);
                        game.scene.models.SceneProxy.getInstance().event(game.scene.models.ROLE_SELECT, ["", 0]);
                        var role = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
                        var team = role.rolebasicOctets.datas.get(2);
                        if (team) {
                            if (team.teamindexstate > 0) { //在队伍中 暂离的话值为负数
                                if ((team.teamindexstate >> 4) != 1) { //141216
                                    var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[PromptExplain.IN_TEAM_GROUP_CAPTAIN_OPERATE];
                                    this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this.useapp);
                                    this.tips.onShow(chattext.msg);
                                    return;
                                }
                            }
                        }
                        if (this.jumpmapid != 0 && (this.tasktype != 22 || (this.desnpc.x != 0 && this.desnpc.y != 0)) && this.tasktype != 90 && this.tasktype != 80) {
                            if (this.jumpmapid == 1711) { //帮派地图ID，需要帮派系统才能判断
                                if (this.clankey == 0) { //无工会
                                    return;
                                }
                                if (game.modules.mainhud.models.HudModel.getInstance().sceneid != this.jumpmapid) {
                                    this.getpost(this.jumpmapid);
                                    var mainUnit = this.useapp.sceneObjectMgr.mainUnit;
                                    game.scene.models.SceneProxy.getInstance().once(game.scene.models.AUTO_MOVE, this, this.changjing);
                                    RequesterProtocols._instance.c2s_CEnterClanMap();
                                }
                                else {
                                    this.automove();
                                }
                            }
                            //如果需要跳转地图则先跳转再移动，若在同一个地图则直接移动
                            else if (game.modules.mainhud.models.HudModel.getInstance().sceneid != this.jumpmapid) {
                                this.getpost(this.jumpmapid);
                                var mainUnit = this.useapp.sceneObjectMgr.mainUnit;
                                game.scene.models.SceneProxy.getInstance().once(game.scene.models.AUTO_MOVE, this, this.changjing);
                                RequesterProtocols._instance.c2s_req_goto(this.jumpmapid, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
                            }
                            else { //同地图，若npcid有，则直接找寻地图NPC
                                this.automove();
                            }
                        }
                        else { //不需要跳转地图，需要打开界面的
                            if (this.tasktype == 58) { //等级限制
                                modules.ModuleManager.show(modules.ModuleNames.ACTIVITY, this.useapp);
                            }
                            else if (this.tasktype == 80) { //学习技能
                                modules.ModuleManager.show(modules.ModuleNames.SKILL, this.useapp);
                            }
                            else if (this.eventid == 500101) { //帮派建立
                                //提示弹窗
                                if (this.clankey == 0) { //弹出未建帮派的提示框
                                    var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[145077];
                                    this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this.useapp);
                                    this.tips.onShow(chattext.msg);
                                }
                            }
                            else if (this.eventid == 1080000) { //暗夜任务
                                modules.ModuleManager.show(modules.ModuleNames.TIAN_JI_XIAN_LING, this.useapp);
                            }
                            else if (this.eventid == 500502) { //宝石合成
                                modules.ModuleManager.show(modules.ModuleNames.STRENG_THENING, this.useapp);
                            }
                            else if (this.eventid == 500504) { //宝石镶嵌
                                modules.ModuleManager.show(modules.ModuleNames.STRENG_THENING, this.useapp);
                            }
                            else if (this.eventid >= 2100202 && this.eventid <= 2511202) { //天机仙令
                                this.automove();
                            }
                            else if (this.eventid < 190000 && this.eventid > 180000) { //主线任务,是否使用道具  战斗和使用道具的判断
                                this.directuse();
                            }
                            else if (this.eventid >= 1010000 && this.eventid <= 1150005) { //门派任务or 推荐任务 循环任务
                                //当地图ID为零需要跳转地图时
                                var schoolinfo = Taskmodels.getInstance().cRepeatTaskData[this.eventid];
                                if (schoolinfo.etasktype == 5) { //购买宠物
                                    var info = Taskmodels.getInstance().schooltask.get(schoolinfo.eactivetype);
                                    if (info.queststate != 3) { //如果没有该宠物则将NPCid改为灵兽异人
                                        this.npcid = 19040;
                                    }
                                    var npcinfo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[this.npcid];
                                    if (game.modules.mainhud.models.HudModel.getInstance().sceneid != npcinfo.mapid) {
                                        this.getpost(npcinfo.mapid);
                                        var mainUnit = this.useapp.sceneObjectMgr.mainUnit;
                                        game.scene.models.SceneProxy.getInstance().once(game.scene.models.AUTO_MOVE, this, this.changjing);
                                        RequesterProtocols._instance.c2s_req_goto(npcinfo.mapid, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
                                    }
                                    else {
                                        this.automove(); //同地图就直接行走
                                    }
                                }
                                else if (schoolinfo.etasktype == 1) { //送信
                                    var npcinfo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[this.npcid];
                                    if (game.modules.mainhud.models.HudModel.getInstance().sceneid != npcinfo.mapid) {
                                        game.scene.models.SceneProxy.getInstance().once(game.scene.models.AUTO_MOVE, this, this.changjing);
                                        RequesterProtocols._instance.c2s_req_goto(npcinfo.mapid, parseInt(npcinfo.xPos.toFixed(0)), parseInt(npcinfo.yPos.toFixed(0)));
                                    }
                                    else {
                                        this.automove();
                                    }
                                }
                                else if (schoolinfo.etasktype == 4) { //购买药材 						
                                    var info = Taskmodels.getInstance().schooltask.get(schoolinfo.eactivetype);
                                    if (info.queststate != 3) { //药店老板
                                        switch (info.questtype) {
                                            case 1060002:
                                                this.npcid = 19037;
                                                break;
                                            case 1060004:
                                                this.npcid = 19037;
                                                break;
                                            case 1060005:
                                                this.npcid = 19041;
                                                break;
                                            case 1060007:
                                                this.npcid = 19039;
                                                break;
                                            case 1060009: //拍卖界面
                                                this.npcid = 0;
                                                modules.ModuleManager.show(modules.ModuleNames.SALE, this.useapp);
                                                break;
                                            case 1060014: //拍卖界面
                                                this.npcid = 0;
                                                modules.ModuleManager.show(modules.ModuleNames.SALE, this.useapp);
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    if (this.npcid == 0)
                                        return;
                                    var npcinfo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[this.npcid];
                                    if (game.modules.mainhud.models.HudModel.getInstance().sceneid != npcinfo.mapid) {
                                        game.scene.models.SceneProxy.getInstance().once(game.scene.models.AUTO_MOVE, this, this.changjing);
                                        RequesterProtocols._instance.c2s_req_goto(npcinfo.mapid, parseInt(npcinfo.xPos.toFixed(0)), parseInt(npcinfo.yPos.toFixed(0)));
                                    }
                                    else {
                                        this.automove();
                                    }
                                }
                                else if (schoolinfo.etasktype == 9) { //挑战
                                    var info = Taskmodels.getInstance().schooltask.get(schoolinfo.eactivetype);
                                    var npcinfo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[this.npcid];
                                    if (game.modules.mainhud.models.HudModel.getInstance().sceneid != npcinfo.mapid) {
                                        game.scene.models.SceneProxy.getInstance().once(game.scene.models.AUTO_MOVE, this, this.changjing);
                                        RequesterProtocols._instance.c2s_req_goto(npcinfo.mapid, parseInt(npcinfo.xPos.toFixed(0)), parseInt(npcinfo.yPos.toFixed(0)));
                                    }
                                    else {
                                        this.automove();
                                    }
                                }
                            }
                        }
                    };
                    /** 场景加载完毕*/
                    HudModel.prototype.changjing = function () {
                        game.modules.mainhud.models.HudProxy.getInstance().once(game.modules.mainhud.models.CHNANGJING_PRO, this, this.automove);
                    };
                    /**自动行走 */
                    HudModel.prototype.automove = function () {
                        if (this.npcid == 0) { // 需区分主线和推荐任务		
                            this.useapp.sceneObjectMgr.mainUnit.goto(this.desnpc.x, this.desnpc.y);
                            if ((this.taskid >= 180000 && this.taskid <= 190000) || (this.taskid >= 500101 && this.taskid <= 600078)) { //主线 支线					
                                var maininfo = Taskmodels.getInstance().missionCMainMissionInfoData[this.taskid];
                                if (maininfo.MissionType == 56) { //区域触发/护送
                                    if (this.jumpmapid >= 1801 && this.jumpmapid <= 1830) {
                                        this.useapp.sceneObjectMgr.mainUnit.xunluo = 1;
                                    }
                                    else {
                                        this.useapp.sceneObjectMgr.mainUnit.autowalk = 1;
                                    }
                                    if (this.desnpc.x == game.modules.mainhud.models.HudModel.getInstance().pos.x && this.desnpc.y == game.modules.mainhud.models.HudModel.getInstance().pos.y) {
                                        this.talkdialog(this.taskid);
                                    }
                                    else {
                                        game.scene.models.SceneProxy.getInstance().once(game.scene.models.MOVE_STOP, this, this.talkdialog, [this.taskid]);
                                        console.log("-------------------move 3");
                                        RequesterProtocols._instance.c2s_role_move(this.useapp.sceneObjectMgr.mainUnit.pos, this.desnpc, game.modules.mainhud.models.HudModel.getInstance().movesceneid);
                                    }
                                }
                                else if (maininfo.MissionType == 22) {
                                    this.useapp.sceneObjectMgr.mainUnit.autowalk = 1;
                                    if (this.desnpc.x == game.modules.mainhud.models.HudModel.getInstance().pos.x && this.desnpc.y == game.modules.mainhud.models.HudModel.getInstance().pos.y) {
                                        this.useapp.sceneObjectMgr.mainUnit.stopwalk = 1;
                                        this.directuse();
                                    }
                                    else {
                                        console.log("-------------------move 4");
                                        RequesterProtocols._instance.c2s_role_move(this.useapp.sceneObjectMgr.mainUnit.pos, this.desnpc, game.modules.mainhud.models.HudModel.getInstance().movesceneid);
                                        game.scene.models.SceneProxy.getInstance().once(game.scene.models.MOVE_STOP, this, this.directuse);
                                    }
                                }
                                else if (maininfo.MissionType == 60) {
                                    this.useapp.sceneRoot.hangup = 1;
                                    this.taskxl = 1; //巡逻状态
                                    this.useapp.sceneObjectMgr.mainUnit.xunluo = 1;
                                }
                            }
                            else if (this.taskid >= 2100202 && this.taskid <= 2511202) {
                                this.useapp.sceneRoot.hangup = 1;
                                this.taskxl = 1; //巡逻状态
                                this.useapp.sceneObjectMgr.mainUnit.xunluo = 1;
                            }
                            else {
                                var info = Taskmodels.getInstance().schooltask.get(this.taskid);
                                var taskrepeat = game.modules.task.models.TaskModel.getInstance().cRepeatTaskData[info.questtype];
                                if (taskrepeat.etasktype == 2) { //使用道具						
                                    if (this.desnpc.x == game.modules.mainhud.models.HudModel.getInstance().pos.x && this.desnpc.y == game.modules.mainhud.models.HudModel.getInstance().pos.y) {
                                        this.useitem();
                                    }
                                    else {
                                        this.useapp.sceneObjectMgr.mainUnit.autowalk = 1;
                                        game.scene.models.SceneProxy.getInstance().once(game.scene.models.MOVE_STOP, this, this.useitem);
                                    }
                                }
                                else if (taskrepeat.etasktype == 6 || taskrepeat.etasktype == 3) {
                                    this.useapp.sceneObjectMgr.mainUnit.xunluo = 1;
                                    this.useapp.sceneRoot.hangup = 1;
                                    this.taskxl = 1; //巡逻状态										
                                }
                            }
                        }
                        else { //	有目标NPC，寻找NPC，跳至NPC所在的地图			
                            for (var key in game.scene.models.SceneModel.getInstance().npclist.keys) {
                                var npcinfo = game.scene.models.SceneModel.getInstance().npclist.get(game.scene.models.SceneModel.getInstance().npclist.keys[key]);
                                if (npcinfo.id == this.npcid) {
                                    game.scene.models.SceneProxy.getInstance().event(game.scene.models.NPC_SELECT, [npcinfo.npckey, 1]);
                                    if (Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.x - parseInt(npcinfo.pos.x.toFixed(0))) < 1 && Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.y - parseInt(npcinfo.pos.y.toFixed(0))) < 1) {
                                        //若是在该NPC点则直接进行对话
                                        this.useapp.sceneObjectMgr.mainUnit.stopwalk = 1;
                                        this.movestop(npcinfo.id, npcinfo.npckey);
                                    }
                                    else { //若不在NPC附近直接开始行走
                                        this.useapp.sceneObjectMgr.mainUnit.autowalk = 1;
                                        console.log("-------------------move 5");
                                        RequesterProtocols._instance.c2s_role_move(this.useapp.sceneObjectMgr.mainUnit.pos, npcinfo.pos, game.modules.mainhud.models.HudModel.getInstance().movesceneid);
                                        game.scene.models.SceneProxy.getInstance().once(game.scene.models.MOVE_STOP, this, this.movestop, [npcinfo.id, npcinfo.npckey]);
                                        this.useapp.sceneObjectMgr.mainUnit.goto(parseInt(npcinfo.pos.x.toFixed(0)), parseInt(npcinfo.pos.y.toFixed(0)));
                                    }
                                    break;
                                }
                            }
                        }
                    };
                    /**直接使用 */
                    HudModel.prototype.directuse = function () {
                        if ((this.desnpc.x == game.modules.mainhud.models.HudModel.getInstance().pos.x && this.desnpc.y == game.modules.mainhud.models.HudModel.getInstance().pos.y) || this.npcid == 0) {
                            this.UseItem = new game.modules.commonUI.UseToRemindCardMediator(this.useapp);
                            var schoolinfo = Taskmodels.getInstance().missionCMainMissionInfoData[this.eventid];
                            this.useitemid = this.getEquipItemIdForSex(schoolinfo.ActiveInfoUseItemID);
                            var _ActiveInfoUseItemID = this.getEquipItemIdForSex(schoolinfo.ActiveInfoUseItemID);
                            game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.USEITEM, this, this.useitems);
                            var strinfo = void 0;
                            if (this.tasktype == 22) {
                                strinfo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[2668];
                            }
                            else if (this.tasktype == 90) {
                                strinfo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[2666];
                            }
                            this.UseItem.hide();
                            this.UseItem.init(_ActiveInfoUseItemID, strinfo.msg);
                        }
                    };
                    /** 区分男女角色来获取所使用的武器道具id */
                    HudModel.prototype.getEquipItemIdForSex = function (activeInfoUseItemID) {
                        var _equipId = 0;
                        var _index = activeInfoUseItemID.indexOf(";");
                        if (_index == -1) {
                            _equipId = Number(activeInfoUseItemID);
                            return _equipId;
                        }
                        var _roleShape = LoginModel.getInstance().roleDetail.shape; //获取当前玩家角色的人物模型
                        var _createRoleConfigBinDic = LoginModel.getInstance().createRoleConfigBinDic; //获得创建角色配置表
                        var _sex = _createRoleConfigBinDic[_roleShape]["sex"]; //获取性别
                        if (_sex == RoleSex.MAN) { //如果性别为男的
                            _equipId = Number(activeInfoUseItemID.substring(0, _index));
                        }
                        else { //如果性别为女的
                            _equipId = Number(activeInfoUseItemID.substring(_index + 1, activeInfoUseItemID.length));
                        }
                        return _equipId;
                    };
                    /**主线区域触发护送 */
                    HudModel.prototype.talkdialog = function (taskid) {
                        if (taskid != this.taskid)
                            return;
                        if (this.desnpc.x == game.modules.mainhud.models.HudModel.getInstance().pos.x && this.desnpc.y == game.modules.mainhud.models.HudModel.getInstance().pos.y) {
                            this.useapp.sceneObjectMgr.mainUnit.stopwalk = 1;
                            var maininfo = Taskmodels.getInstance().missionCMainMissionInfoData[this.taskid];
                            if (maininfo.ProcessBarText) {
                                this.makepro = new game.modules.commonUI.MakeProgressMediator(this.useapp);
                                this.makepro.init(null, maininfo.ProcessBarText);
                                game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.MAKESUCCESS, this, this.makesucess);
                            }
                            else {
                                modules.ModuleManager.hide(modules.ModuleNames.MAIN_MENU);
                                this.hideMain = true;
                                models.HudProxy.getInstance().event(models.OPEN_EVENT);
                                this.dialog = new game.modules.commonUI.JuQingMediator(this.useapp);
                                this.dialog.init(this.taskid, 0, maininfo.ScenarioInfoFinishConversationList, maininfo.ScenarioInfoFinishNpcID);
                            }
                        }
                    };
                    /**使用模型道具*/
                    HudModel.prototype.useitem = function () {
                        if (this.desnpc.x == game.modules.mainhud.models.HudModel.getInstance().pos.x && this.desnpc.y == game.modules.mainhud.models.HudModel.getInstance().pos.y) {
                            if (this.UseItem)
                                this.UseItem.hide();
                            //道具使用
                            this.useapp.sceneObjectMgr.mainUnit.stopwalk = 1;
                            var info = Taskmodels.getInstance().schooltask.get(this.taskid);
                            this.useitemid = info.dstitemid;
                            this.UseItem = new game.modules.commonUI.UseToRemindCardMediator(this.useapp);
                            var strinfo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[2668];
                            this.UseItem.init(this.useitemid, strinfo.msg);
                            game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.USEITEM, this, this.useitems);
                        }
                    };
                    HudModel.prototype.useitems = function () {
                        if (this.useitemid >= 110000 && this.useitemid < 111000) {
                            game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.MAKESUCCESS, this, this.makesucess);
                            this.makepro = new game.modules.commonUI.MakeProgressMediator(this.useapp);
                            this.makepro.init(this.useitemid);
                        }
                        else {
                            var baginfo = game.modules.bag.models.BagModel.getInstance().bagMap[1];
                            for (var index = 0; index < baginfo.items.length; index++) {
                                var iteminfo = baginfo.items[index];
                                if (iteminfo.id == this.useitemid) {
                                    if (this.tasktype == 22) //道具
                                        RequesterProtocols._instance.c2s_CAppend_Item(iteminfo.key, 0, game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
                                    else if (this.tasktype == 90) { //装备
                                        var equipinfo = StrengTheningModel.getInstance().equipEffectData[iteminfo.id];
                                        RequesterProtocols._instance.c2s_CPutOn_Equip(iteminfo.key, equipinfo.eequiptype);
                                    }
                                }
                            }
                        }
                    };
                    /**进度条制作*/
                    HudModel.prototype.makesucess = function (issucess) {
                        if (issucess == 1) { //制作成功
                            var itemid = void 0;
                            if (this.taskid >= 180000 && this.taskid <= 190000) { //主线
                                var info = Taskmodels.getInstance().missionCMainMissionInfoData[this.taskid];
                                itemid = this.getEquipItemIdForSex(info.ActiveInfoUseItemID);
                            }
                            else { //推荐任务
                                var info = Taskmodels.getInstance().schooltask.get(this.taskid);
                                itemid = info.dstitemid;
                            }
                            if (itemid == 0) {
                                this.dialog = new game.modules.commonUI.JuQingMediator(this.useapp);
                                this.dialog.init(this.taskid, 0);
                            }
                            else {
                                var baginfo = game.modules.bag.models.BagModel.getInstance().bagMap[5];
                                for (var index = 0; index < baginfo.items.length; index++) {
                                    var iteminfo = baginfo.items[index];
                                    if (iteminfo.id == itemid) {
                                        RequesterProtocols._instance.c2s_CAppend_Item(iteminfo.key, 0, game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
                                        break;
                                    }
                                }
                            }
                        }
                    };
                    /**角色停止后与NPC交流*/
                    HudModel.prototype.movestop = function (npcid, npckey) {
                        if (this.useapp.sceneRoot.istask == 0 || this.useapp.sceneRoot.istask == 1)
                            return;
                        var npcinfo = game.scene.models.SceneModel.getInstance().npclist.get(npckey);
                        if (npcinfo) {
                            if (Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.x - parseInt(npcinfo.pos.x.toFixed(0))) < 1 && Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.y - parseInt(npcinfo.pos.y.toFixed(0))) < 1) {
                                RequesterProtocols._instance.c2s_visit_npc(npckey);
                                this.useapp.sceneObjectMgr.mainUnit.stopwalk = 1;
                                game.scene.models.SceneProxy.getInstance().once(game.scene.models.NPC_DIALOG, this, this.initnpc);
                                console.log("-------------------move 6");
                                RequesterProtocols._instance.c2s_role_move(this.useapp.sceneObjectMgr.mainUnit.target, this.useapp.sceneObjectMgr.mainUnit.target, game.modules.mainhud.models.HudModel.getInstance().movesceneid);
                            }
                        }
                    };
                    /**NPC数据*/
                    HudModel.prototype.initnpc = function (npckey, services, scenarioquests) {
                        this.npckey = npckey;
                        var npc = game.scene.models.SceneModel.getInstance().npclist.get(npckey);
                        var npcinfo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[npc.id];
                        if (this.taskid > 180000 && this.taskid < 190000 && scenarioquests && scenarioquests[0] > 180000 && scenarioquests[0] < 190000) { //主线  
                            //若是战斗的则先进入NPC对话框再进入剧情狂
                            var maininfo = Taskmodels.getInstance().missionCMainMissionInfoData[this.taskid];
                            if (maininfo.MissionType == 40 || maininfo.MissionType == 12) {
                                this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
                                this.npcui.init(npckey, services, scenarioquests, null, null, null, maininfo.BattlePreString);
                            }
                            else {
                                modules.ModuleManager.hide(modules.ModuleNames.MAIN_MENU);
                                this.hideMain = true;
                                models.HudProxy.getInstance().event(models.OPEN_EVENT);
                                this.dialog = new game.modules.commonUI.JuQingMediator(this.useapp);
                                this.dialog.init(scenarioquests[0], npckey);
                            }
                        }
                        else if (this.taskid > 500000 && this.taskid < 600000) { //支线
                            var task_1 = Taskmodels.getInstance().accepttask.get(this.taskid);
                            if (task_1.missionstatus == 3) { //任务完成
                                this.dialog = new game.modules.commonUI.JuQingMediator(this.useapp);
                                this.dialog.init(this.taskid, npckey);
                            }
                            else { //任务未完成
                                this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
                                this.npcui.init(npckey, services, scenarioquests);
                            }
                        }
                        else if (this.taskid >= 1010000 && this.taskid <= 1200000) { //推荐任务or可接任务
                            //判断下任务类型				
                            var info = Taskmodels.getInstance().schooltask.get(this.taskid);
                            var acceptableid = 0;
                            if (info) { //推荐
                                var task_2 = game.modules.task.models.TaskModel.getInstance().cRepeatTaskData[info.questtype];
                                if (task_2.etasktype == 1) { //送信聊天
                                    //循环任务对话配置表
                                    var curnum = void 0;
                                    for (var index = 0; index < services.length; index++) {
                                        if (services[index] == 100035 || services[index] == 100183) { //自动完成
                                            curnum = index;
                                            break;
                                        }
                                    }
                                    var talkinfo = game.modules.task.models.TaskModel.getInstance().cRepeatTaskChatData[task_2.nnpcchatid];
                                    this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
                                    this.npcui.init(npckey, services, scenarioquests, talkinfo.strmsg, null, curnum + scenarioquests.length);
                                }
                                else if (task_2.etasktype == 5) { //寻找宠物	任务结束后对话类型8
                                    var curnum = void 0;
                                    game.modules.task.models.TaskModel.getInstance().chattype = 8;
                                    this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
                                    this.npcui.init(npckey, services, scenarioquests, "petshop", info.dstitemid, 0 + scenarioquests.length);
                                }
                                else if (task_2.etasktype == 4) { //寻找药品
                                    this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
                                    this.npcui.init(npckey, services, scenarioquests, "yaopin", info.dstitemid, 0 + scenarioquests.length);
                                }
                                else if (task_2.etasktype == 7 || task_2.etasktype == 9) { //切磋
                                    this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
                                    this.npcui.init(npckey, services, scenarioquests);
                                }
                            }
                            else { //可接任务
                                this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
                                this.npcui.init(npckey, services, scenarioquests);
                            }
                        }
                        else { //通用NPC对话
                            this.dialog = new game.modules.commonUI.JuQingMediator(this.useapp);
                            this.dialog.init(this.taskid, npckey);
                        }
                    };
                    //** 不属于任务的跳转//
                    HudModel.prototype.jumpmap = function (mapid, npcid, itemid, shoptype) {
                        if (itemid) {
                            this.itemid = itemid;
                            this.shoptype = shoptype;
                        }
                        else {
                            this.itemid = 0;
                            this.shoptype = 0;
                        }
                        if (game.modules.mainhud.models.HudModel.getInstance().sceneid != mapid) {
                            this.getpost(mapid);
                            var mainUnit = this.useapp.sceneObjectMgr.mainUnit;
                            game.scene.models.SceneProxy.getInstance().once(game.scene.models.AUTO_MOVE, this, this.findnpc, [npcid]);
                            RequesterProtocols._instance.c2s_req_goto(mapid, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
                        }
                        else {
                            this.findnpc(npcid);
                        }
                    };
                    /**寻找NPC*/
                    HudModel.prototype.findnpc = function (npcid) {
                        this.useapp.sceneObjectMgr.mainUnit.autowalk = 1;
                        for (var key in game.scene.models.SceneModel.getInstance().npclist.keys) {
                            var _npclist = game.scene.models.SceneModel.getInstance().npclist;
                            var npcinfo = _npclist.get(_npclist.keys[key]);
                            if (npcinfo.id == npcid) {
                                if (Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.x - parseInt(npcinfo.pos.x.toFixed(0))) < 1 && Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.y - parseInt(npcinfo.pos.y.toFixed(0))) < 1) {
                                    //若是在该NPC点则直接进行对话
                                    this.movestops(npcinfo.id, npcinfo.npckey);
                                }
                                else {
                                    console.log("-------------------move 7");
                                    console.log("-------自动寻路坐标：", this.useapp.sceneObjectMgr.mainUnit.pos);
                                    console.log("-------自动寻路坐标：", npcinfo.pos);
                                    RequesterProtocols._instance.c2s_role_move(this.useapp.sceneObjectMgr.mainUnit.pos, npcinfo.pos, game.modules.mainhud.models.HudModel.getInstance().movesceneid);
                                    game.scene.models.SceneProxy.getInstance().once(game.scene.models.MOVE_STOP, this, this.movestops, [npcinfo.id, npcinfo.npckey]);
                                    this.useapp.sceneObjectMgr.mainUnit.goto(parseInt(npcinfo.pos.x.toFixed(0)), parseInt(npcinfo.pos.y.toFixed(0)));
                                }
                                break;
                            }
                        }
                    };
                    /**人物停止移动*/
                    HudModel.prototype.movestops = function (npcid, npckey) {
                        this.useapp.sceneObjectMgr.mainUnit.stopwalk = 1;
                        if (this.useapp.sceneRoot.istask == 0 || this.useapp.sceneRoot.istask == 1) //判断停止时是有任务点击触发还是点击场景触发
                            return;
                        var _npclist = game.scene.models.SceneModel.getInstance().npclist;
                        var npcinfo = _npclist.get(npckey);
                        console.log("-------自动寻路坐标x：", game.modules.mainhud.models.HudModel.getInstance().pos.x);
                        console.log("-------自动寻路坐标x：", parseInt(npcinfo.pos.x.toFixed(0)));
                        console.log("-------自动寻路坐标x：", Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.x - parseInt(npcinfo.pos.x.toFixed(0))));
                        console.log("-------自动寻路坐标y：", Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.y - parseInt(npcinfo.pos.y.toFixed(0))));
                        if (npcinfo) {
                            if (Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.x - parseInt(npcinfo.pos.x.toFixed(0))) < 1 && Math.abs(game.modules.mainhud.models.HudModel.getInstance().pos.y - parseInt(npcinfo.pos.y.toFixed(0))) < 1) {
                                RequesterProtocols._instance.c2s_visit_npc(npckey);
                                game.scene.models.SceneProxy.getInstance().once(game.scene.models.NPC_DIALOG, this, this.initnpcs);
                                console.log("-------------------move 8");
                                RequesterProtocols._instance.c2s_role_move(this.useapp.sceneObjectMgr.mainUnit.target, this.useapp.sceneObjectMgr.mainUnit.target, game.modules.mainhud.models.HudModel.getInstance().movesceneid);
                            }
                        }
                    };
                    /**访问NPC*/
                    HudModel.prototype.initnpcs = function (npckey, services, scenarioquests) {
                        this.npcui = new game.modules.commonUI.NpcDialogMediator(this.useapp);
                        if (this.itemid != 0) {
                            this.directOpenShop(this.itemid, this.shoptype);
                        }
                        else {
                            this.npcui.init(npckey, services, scenarioquests);
                        }
                    };
                    /**
                     * 不通过NPC打开不同类型的商店
                     * @param itemid 目标id
                     * @param shoptype 目标所能被购买到的商店的类型
                     */
                    HudModel.prototype.directOpenShop = function (itemid, shoptype) {
                        switch (shoptype) {
                            case shopType.DRUG_SHOP: //药品商店
                                var _yaopinShop = new game.modules.roleinfo.RoleShopMediator(this.useapp, shopType.DRUG_SHOP);
                                _yaopinShop.onShow(itemid);
                                break;
                            case shopType.BAR_SHOP: //酒馆
                                var _jiuguan = new game.modules.roleinfo.RoleShopMediator(this.useapp, shopType.BAR_SHOP);
                                _jiuguan.onShow(itemid);
                                break;
                            case shopType.WEAPON_SHOP: //兵器铺（装备商店）
                                var _bingqipu = new game.modules.roleinfo.RoleShopMediator(this.useapp, shopType.WEAPON_SHOP);
                                _bingqipu.onShow(itemid);
                                break;
                            case shopType.PET_SHOP: //宠物商店
                                var _petshop = new game.modules.commonUI.PetShopMediator(this.useapp);
                                _petshop.init(itemid, 1);
                                break;
                            case shopType.SHANGHUI_SHOP: //商会
                                modules.shop.models.ShopModel.getInstance().itemId = itemid;
                                modules.ModuleManager.show(modules.ModuleNames.SHOP, this.useapp);
                                break;
                            case shopType.MALL_SHOP: //商城
                                modules.shop.models.ShopModel.getInstance().scItemId = itemid;
                                modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.SHANGCHANG, this.useapp);
                                break;
                            case shopType.SALE_STORE: //拍卖行
                                modules.ModuleManager.show(modules.ModuleNames.SALE, this.useapp);
                                modules.sale.models.SaleModel.getInstance().saleTargetId = itemid;
                                game.modules.sale.models.SaleProxy._instance.event(game.modules.sale.models.SearchItemResult);
                                break;
                        }
                    };
                    /** 设置特殊按钮位置信息
                     * @param lastword 组装语句最后一个子节点长度-1
                     * @param apply_btn 组装语句按钮
                     * @param chatContent 组装语句富文本框
                     * @param speakForYourself 是否是自己发
                     */
                    HudModel.prototype.setApplyBtnPos = function (lastword, apply_btn, content) {
                        apply_btn.x = content._childs[lastword]._text.words[content._childs[lastword]._text.words.length - 1]._x + content._childs[lastword]._text.words[content._childs[lastword]._text.words.length - 1]._w + content.x;
                        // apply_btn.y = content.y + content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._y;
                        var contentwidth = content._childs[lastword]._text.words[content._childs[lastword]._text.words.length - 1]._x + content._childs[lastword]._text.words[content._childs[lastword]._text.words.length - 1]._w + apply_btn.width; //加入按钮后的实际宽度
                        /** 判断按钮显示位置，是否需要换行 */
                        if (contentwidth > content.width) {
                            var hang = content.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
                            { /** 换行处理 */
                                content.contextHeight = content.contextHeight + apply_btn.height + content.style.leading;
                                apply_btn.x = content.x;
                                apply_btn.y = content.y + (content.style.leading + 24) * hang;
                            }
                        }
                        else { /** 不需要特殊处理 */
                            apply_btn.y = content.y + content._childs[lastword]._text.words[content._childs[lastword]._text.words.length - 1]._y;
                        }
                    };
                    /**
                     * 申请组队事件
                     * @param leaderid 队长Id
                     */
                    HudModel.prototype.onApplyJoinTeam = function (leaderid) {
                        RequesterProtocols._instance.c2s_CRequestJoinTeam(leaderid);
                    };
                    /** 点击红包
                     * @param data 所需参数
                    */
                    HudModel.prototype.onRedPacketEvent = function (data) {
                        modules.redPacket.models.RedPacketModel.getInstance().qiangRedPack(data[3], data[2]);
                    };
                    /** 获取聊天频道的资源
                     * @param logo 设置的ui
                     * @param messageType 频道类型
                    */
                    HudModel.prototype.getChannelImg = function (logo, messageType) {
                        switch (messageType) {
                            case 1: //当前频道
                                logo.skin = "ui/liaotian/liaotian_dangqian.png";
                                break;
                            case 2: //队伍频道
                                logo.skin = "ui/liaotian/liaotian_duiwu.png";
                                break;
                            case 3: //职业频道
                                logo.skin = "ui/liaotian/liaotian_zhiye.png";
                                break;
                            case 4: //公会频道
                                logo.skin = "ui/liaotian/liaotian_gonghui.png";
                                break;
                            case 5: //世界频道
                                logo.skin = "ui/liaotian/liaotian_shijie.png";
                                break;
                            case 6: //系统频道
                                logo.skin = "ui/liaotian/liaotian_xitong.png";
                                break;
                            case 7: //消息频道
                                break;
                            case 14: //组队申请频道 
                                logo.skin = "ui/liaotian/yijianhanhua.png";
                                break;
                            default: //默认是系统频道
                                logo.skin = "ui/liaotian/liaotian_xitong.png";
                                break;
                        }
                    };
                    /** 判断当前是否处于队伍中 状态为正常
                     * @param _teamflag 是否处于队伍中
                    */
                    HudModel.prototype.chargeInGroup = function (_teamflag) {
                        if (_teamflag === void 0) { _teamflag = true; }
                        var roleid = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;
                        var role = game.scene.models.SceneModel.getInstance().rolelist.get(roleid);
                        var team = role.rolebasicOctets.datas.get(2);
                        var leaderid = TeamModel.getInstance().teamMemberBasic.keys[0];
                        if (!_teamflag) {
                            if (team)
                                return false;
                        }
                        //如果是队长
                        if (roleid == leaderid)
                            return false;
                        if (team) {
                            if (team.teamindexstate > 0) { //在队伍中 暂离的话值为负数
                                if ((team.teamindexstate >> 4) != 1) { //141216
                                    return true;
                                }
                            }
                        }
                        return false;
                    };
                    /** 是否处于挂机地图 */
                    HudModel.InHandUpMap = function () {
                        return game.modules.mainhud.models.HudModel.getInstance().sceneid >= 1801
                            && game.modules.mainhud.models.HudModel.getInstance().sceneid <= 1830;
                    };
                    return HudModel;
                }());
                models.HudModel = HudModel;
            })(models = mainhud.models || (mainhud.models = {}));
        })(mainhud = modules.mainhud || (modules.mainhud = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=HudModel.js.map