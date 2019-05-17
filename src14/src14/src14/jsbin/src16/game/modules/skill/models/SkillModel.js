/**生活技能 */
var lifeSkill;
(function (lifeSkill) {
    /**锻炼 */
    lifeSkill[lifeSkill["DUANLIAN"] = 320103] = "DUANLIAN";
    /**观想 */
    lifeSkill[lifeSkill["GUANXIANG"] = 320104] = "GUANXIANG";
    /**烹饪 */
    lifeSkill[lifeSkill["PENGREN"] = 310201] = "PENGREN";
    /**炼金 */
    lifeSkill[lifeSkill["LIANJIN"] = 310101] = "LIANJIN";
    /**锻造 */
    lifeSkill[lifeSkill["DUANZAO"] = 300101] = "DUANZAO";
    /**裁缝 */
    lifeSkill[lifeSkill["CAIFENG"] = 300201] = "CAIFENG";
    /**珠宝 */
    lifeSkill[lifeSkill["ZHUBAO"] = 300301] = "ZHUBAO";
    /**收获 */
    lifeSkill[lifeSkill["SHOUHUO"] = 320105] = "SHOUHUO";
})(lifeSkill || (lifeSkill = {}));
/**职业序号 */
var zhiye;
(function (zhiye) {
    /**云霄殿 */
    zhiye[zhiye["yunxiao"] = 11] = "yunxiao";
    /**大荒岭 */
    zhiye[zhiye["dahuang"] = 12] = "dahuang";
    /**苍羽宫 */
    zhiye[zhiye["cangyu"] = 13] = "cangyu";
    /**飞雪崖 */
    zhiye[zhiye["feixue"] = 14] = "feixue";
    /**天雷狱 */
    zhiye[zhiye["tianlei"] = 15] = "tianlei";
    /**无量宫 */
    zhiye[zhiye["wuliang"] = 16] = "wuliang";
    /**玄冥池 */
    zhiye[zhiye["xuanming"] = 17] = "xuanming";
    /**七星观 */
    zhiye[zhiye["qixing"] = 18] = "qixing";
    /**丹阳观 */
    zhiye[zhiye["danyang"] = 19] = "danyang";
})(zhiye || (zhiye = {}));
/**药品 */
var drug;
(function (drug) {
    /**仙露酒 */
    drug[drug["XIANLUJIU"] = 111012] = "XIANLUJIU";
    /**洗尘丹 */
    drug[drug["XICHENDAN"] = 111015] = "XICHENDAN";
    /**还命药 */
    drug[drug["HUANMINGYAO"] = 111016] = "HUANMINGYAO";
    /**聚灵浆 */
    drug[drug["JULINGJIANG"] = 111014] = "JULINGJIANG";
    /**血气丹 */
    drug[drug["XUEQIDAN"] = 111013] = "XUEQIDAN";
    /**破妄尘 */
    drug[drug["POWANGCHEN"] = 111018] = "POWANGCHEN";
    /**仙露酒图片 */
    drug[drug["XIANLUJIU_IMG"] = 20183] = "XIANLUJIU_IMG";
    /**洗尘丹图片 */
    drug[drug["XICHENDAN_IMG"] = 20186] = "XICHENDAN_IMG";
    /**还命药图片 */
    drug[drug["HUANMINGYAO_IMG"] = 20187] = "HUANMINGYAO_IMG";
    /**聚灵浆图片 */
    drug[drug["JULINGJIANG_IMG"] = 20185] = "JULINGJIANG_IMG";
    /**血气丹图片 */
    drug[drug["XUEQIDAN_IMG"] = 20184] = "XUEQIDAN_IMG";
    /**破妄尘图片 */
    drug[drug["POWANGCHEN_IMG"] = 20189] = "POWANGCHEN_IMG";
})(drug || (drug = {}));
var dazao;
(function (dazao) {
    /**武器模具图片 */
    dazao[dazao["WUQI_IMG"] = 20011] = "WUQI_IMG";
    /**防具模具图片 */
    dazao[dazao["FANGJU_IMG"] = 20012] = "FANGJU_IMG";
    /**饰品模具图片 */
    dazao[dazao["SHIPIN_IMG"] = 20013] = "SHIPIN_IMG";
})(dazao || (dazao = {}));
/**附魔技能格id */
var FUMO;
(function (FUMO) {
    /**生命附魔卷轴-云霄殿 */
    FUMO[FUMO["YUNXIAO_SKILLID"] = 1117] = "YUNXIAO_SKILLID";
    /**速度附魔卷轴-大荒岭 */
    FUMO[FUMO["DAHUANG_SKILLID"] = 1217] = "DAHUANG_SKILLID";
    /**愤怒附魔卷轴-苍羽宫 */
    FUMO[FUMO["CANGYU_SKILLID"] = 1317] = "CANGYU_SKILLID";
    /**法防附魔卷轴-飞雪崖 */
    FUMO[FUMO["FEIXUE_SKILLID"] = 1417] = "FEIXUE_SKILLID";
    /**物攻附魔卷轴-天雷狱 */
    FUMO[FUMO["TIANLEI_SKILLID"] = 1517] = "TIANLEI_SKILLID";
    /**法攻附魔卷轴-无量宫 */
    FUMO[FUMO["WULIANG_SKILLID"] = 1617] = "WULIANG_SKILLID";
    /**控制附魔卷轴-玄冥池 */
    FUMO[FUMO["XUANMING_SKILLID"] = 1717] = "XUANMING_SKILLID";
    /**治疗附魔卷轴-七星观 */
    FUMO[FUMO["QIXING_SKILLID"] = 1817] = "QIXING_SKILLID";
    /**物防附魔卷轴-丹阳观 */
    FUMO[FUMO["DANYANG_SKILLID"] = 1917] = "DANYANG_SKILLID";
})(FUMO || (FUMO = {}));
/** 附魔卷轴类型 */
var ENHANCEMENT_TYPE;
(function (ENHANCEMENT_TYPE) {
    /** 生命(凌云注灵卷) */
    ENHANCEMENT_TYPE[ENHANCEMENT_TYPE["LIVE_SKILL_ENHANCEMENT_TYPE_HP"] = 1] = "LIVE_SKILL_ENHANCEMENT_TYPE_HP";
    /** 物攻(炼狱注灵卷) */
    ENHANCEMENT_TYPE[ENHANCEMENT_TYPE["LIVE_SKILL_ENHANCEMENT_TYPE_PY_ATT"] = 2] = "LIVE_SKILL_ENHANCEMENT_TYPE_PY_ATT";
    /** 法攻(上古注灵卷) */
    ENHANCEMENT_TYPE[ENHANCEMENT_TYPE["LIVE_SKILL_ENHANCEMENT_TYPE_IMAGE_ATT"] = 3] = "LIVE_SKILL_ENHANCEMENT_TYPE_IMAGE_ATT";
    /** 物防(魔王注灵卷) */
    ENHANCEMENT_TYPE[ENHANCEMENT_TYPE["LIVE_SKILL_ENHANCEMENT_TYPE_PHY_DEF"] = 4] = "LIVE_SKILL_ENHANCEMENT_TYPE_PHY_DEF";
    /** 法防(碧雪注灵卷) */
    ENHANCEMENT_TYPE[ENHANCEMENT_TYPE["LIVE_SKILL_ENHANCEMENT_TYPE_IMAGE_DEF"] = 5] = "LIVE_SKILL_ENHANCEMENT_TYPE_IMAGE_DEF";
    /** 愤怒(苍穹注灵卷) */
    ENHANCEMENT_TYPE[ENHANCEMENT_TYPE["LIVE_SKILL_ENHANCEMENT_TYPE_ANGER"] = 6] = "LIVE_SKILL_ENHANCEMENT_TYPE_ANGER";
    /** 治疗(星辰注灵卷) */
    ENHANCEMENT_TYPE[ENHANCEMENT_TYPE["LIVE_SKILL_ENHANCEMENT_TYPE_HEAL"] = 7] = "LIVE_SKILL_ENHANCEMENT_TYPE_HEAL";
    /** 控制(神魔注灵卷) */
    ENHANCEMENT_TYPE[ENHANCEMENT_TYPE["LIVE_SKILL_ENHANCEMENT_TYPE_CONTROL"] = 8] = "LIVE_SKILL_ENHANCEMENT_TYPE_CONTROL";
    /** 速度(洪荒注灵卷) */
    ENHANCEMENT_TYPE[ENHANCEMENT_TYPE["LIVE_SKILL_ENHANCEMENT_TYPE_SPEED"] = 9] = "LIVE_SKILL_ENHANCEMENT_TYPE_SPEED";
})(ENHANCEMENT_TYPE || (ENHANCEMENT_TYPE = {}));
/** 服务器返回技能系统的Error信息 */
var SkillError;
(function (SkillError) {
    /** 该技能不属于你的职业 */
    SkillError[SkillError["WrongSchool"] = 1] = "WrongSchool";
    /** 人物等级不够,不能领悟主技能 */
    SkillError[SkillError["MainSBCantLearn"] = 2] = "MainSBCantLearn";
    /** 依赖的技能等级不够,不能领悟 */
    SkillError[SkillError["SBCantLearn"] = 3] = "SBCantLearn";
    /** 当前技能已学到最高等级,不能继续学习 */
    SkillError[SkillError["MainSBLimit"] = 4] = "MainSBLimit";
    /** 请先升级主技能 */
    SkillError[SkillError["SBLimit"] = 5] = "SBLimit";
    /** 当前经验不足,不能学习 */
    SkillError[SkillError["SBExpLimit"] = 6] = "SBExpLimit";
    /** 当前金钱不足,不能学习 */
    SkillError[SkillError["SBMoneyLimit"] = 7] = "SBMoneyLimit";
    /** 当前行动力不足,不能学习 */
    SkillError[SkillError["SBActivityLimit"] = 8] = "SBActivityLimit";
    /** 未知错误 */
    SkillError[SkillError["UnkownError"] = 9] = "UnkownError";
    /** 生活技能ID错误 */
    SkillError[SkillError["LiveSkillIdError"] = 10] = "LiveSkillIdError";
    /** 金钱不足 */
    SkillError[SkillError["MoneyNotEnough"] = 11] = "MoneyNotEnough";
    /** 公会贡献不足 */
    SkillError[SkillError["ContributeNotEnough"] = 12] = "ContributeNotEnough";
    /** 等级不够不能学习 */
    SkillError[SkillError["LevelNotEnough"] = 13] = "LevelNotEnough";
    /** 需要公会(帮派) */
    SkillError[SkillError["NeedFaction"] = 14] = "NeedFaction";
    /** 技能已经最大了 */
    SkillError[SkillError["SkillMaxLimit"] = 15] = "SkillMaxLimit";
    /** 道具不存在 */
    SkillError[SkillError["ItemNotExist"] = 16] = "ItemNotExist";
    /** 一个道具不能炼药 */
    SkillError[SkillError["OneStuffCannot"] = 17] = "OneStuffCannot";
    /** 技能等级不足 */
    SkillError[SkillError["SkillLevelNotEnough"] = 18] = "SkillLevelNotEnough";
    /** 没有可以烹饪的食物 */
    SkillError[SkillError["NoCookingFood"] = 19] = "NoCookingFood";
    /** 活力不足 */
    SkillError[SkillError["EnergyNotEnough"] = 20] = "EnergyNotEnough";
})(SkillError || (SkillError = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var skill;
        (function (skill) {
            var models;
            (function (models) {
                /**
             * 技能系统数据存放类
             */
                var SkillModel = /** @class */ (function () {
                    function SkillModel() {
                        /**j技能显示表 */
                        this.CSchoolSkillitemBinDic = {};
                        /**技能格消耗表 */
                        this.AcupointLevelUpBinDic = {};
                        /**技能格信息表 */
                        this.AcupointInfoBinDic = {};
                        /**s生活技能表 */
                        this.CLifeSkillBinDic = {};
                        /**j继承消耗 */
                        this.CInheritCostBinDic = {};
                        /**s生活技能学习消耗 */
                        this.CLifeSkillCostBinDic = {};
                        /**X修炼技能升级 */
                        this.CParticeSkillLevelupBinDic = {};
                        /**h幻化使用配置表 */
                        this.CHuanhuaUseBinDic = {};
                        /**h幻化信息配置表 */
                        this.CHuanhuaInfoBinDic = {};
                        /**制作附魔卷轴等级字典key:"data",value:服务器返回的信息 */
                        this.makeEnhancementLevel = 0;
                        /**制作附魔卷轴技能格id字典key:"data",value:服务器返回的信息 */
                        this.EnhancementSkillId = 0;
                        /**当前的子界面选择 */
                        this.currenTabNum = 1;
                        /** 是否从帮派福利点击生活技能跳转 */
                        this.isFromClanWelfareJump = false;
                        /** 是否自动添加炼金所需的药材 */
                        this.isAutoAddNeedDrug = false;
                        SkillModel._instance = this;
                        this.SRspRoleInfoData = new Laya.Dictionary();
                        this.SRetRolePropData = new Laya.Dictionary();
                        this.SBeginSchoolWheelData = new Laya.Dictionary();
                        this.SUpdateInbornData = new Laya.Dictionary();
                        this.SUpdateLearnLiveSkillData = new Laya.Dictionary();
                        this.SRequestParticleSkillListData = new Laya.Dictionary();
                        this.SUpdateLearnParticleSkillData = new Laya.Dictionary();
                        this.SLiveSkillMakeFoodData = new Laya.Dictionary();
                        this.SLiveSkillMakeStuffData = new Laya.Dictionary();
                        this.SLiveSkillMakeCardData = new Laya.Dictionary();
                        this.SLiveSkillMakeDrugData = new Laya.Dictionary();
                        this.SRequestLiveSkillListData = new Laya.Dictionary();
                        this.LiveSkilllevelData = new Laya.Dictionary();
                        this.skillArr = new Array();
                        this.skillImgArr = new Array();
                        this.skillGridArr = new Array();
                        this.skillLevelDic = new Laya.Dictionary();
                    }
                    SkillModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new SkillModel();
                        }
                        return this._instance;
                    };
                    SkillModel.clearModelData = function () {
                        skill.models.SkillModel._instance.SRspRoleInfoData = new Laya.Dictionary();
                        skill.models.SkillModel._instance.SRetRolePropData = new Laya.Dictionary();
                        skill.models.SkillModel._instance.SBeginSchoolWheelData = new Laya.Dictionary();
                        skill.models.SkillModel._instance.SUpdateInbornData = new Laya.Dictionary();
                        skill.models.SkillModel._instance.SUpdateLearnLiveSkillData = new Laya.Dictionary();
                        skill.models.SkillModel._instance.SRequestParticleSkillListData = new Laya.Dictionary();
                        skill.models.SkillModel._instance.SUpdateLearnParticleSkillData = new Laya.Dictionary();
                        skill.models.SkillModel._instance.SLiveSkillMakeFoodData = new Laya.Dictionary();
                        skill.models.SkillModel._instance.SLiveSkillMakeStuffData = new Laya.Dictionary();
                        skill.models.SkillModel._instance.SLiveSkillMakeCardData = new Laya.Dictionary();
                        skill.models.SkillModel._instance.SLiveSkillMakeDrugData = new Laya.Dictionary();
                        skill.models.SkillModel._instance.SRequestLiveSkillListData = new Laya.Dictionary();
                        skill.models.SkillModel._instance.skillArr = new Array();
                        skill.models.SkillModel._instance.skillImgArr = new Array();
                        skill.models.SkillModel._instance.skillGridArr = new Array();
                        skill.models.SkillModel._instance.skillLevelDic = new Laya.Dictionary();
                        skill.models.SkillModel._instance.isFromClanWelfareJump = false;
                        skill.models.SkillModel._instance.isAutoAddNeedDrug = false;
                    };
                    /**  */
                    SkillModel.prototype.getEquipPosType = function (tempType) {
                        var _pos = -1;
                        switch (tempType) {
                            case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_HP:
                                _pos = EquipType.CLOTHES; //给衣服附魔生命
                                break;
                            case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_PY_ATT:
                                _pos = EquipType.ARMS; //给武器附魔物攻
                                break;
                            case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_IMAGE_ATT:
                                _pos = EquipType.NECKLACE; //给项链附魔法攻
                                break;
                            case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_PHY_DEF:
                                _pos = EquipType.HELMET; //给头盔附魔物防
                                break;
                            case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_IMAGE_DEF:
                                _pos = EquipType.SHOES; //给鞋子附魔魔防
                                break;
                            case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_ANGER:
                                _pos = EquipType.BELT; //给腰带附魔愤怒
                                break;
                            case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_HEAL:
                                _pos = EquipType.ARMS; //给武器附魔治疗
                                break;
                            case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_CONTROL:
                                _pos = EquipType.CLOTHES; //给衣服附魔控制
                                break;
                            case ENHANCEMENT_TYPE.LIVE_SKILL_ENHANCEMENT_TYPE_SPEED:
                                _pos = EquipType.SHOES; //给鞋子附魔速度
                                break;
                        }
                        return _pos;
                    };
                    /**中文字符串存放 */
                    SkillModel.chineseStr = {
                        /**等级 */
                        dengji: "等级.",
                        /**40级解锁 */
                        forty_jiesuo: "40级解锁",
                        /**50级解锁 */
                        fifty_jiesuo: "50级解锁",
                        /**级解锁 */
                        level_jiesuo: "级解锁",
                        /**到达 */
                        dadao: "达到",
                        /**红色 */
                        red: "#ff2800",
                        /**棕色 */
                        brown: "#50321a",
                        /**绿色 */
                        green: "#13ff00",
                        /**好友度解锁 */
                        haoyoudu_unlock: "好友度解锁",
                        /**不带#号的红色 */
                        red_two: "ff2800",
                        /**不带#好的绿色 */
                        green_two: "13ff00",
                    };
                    return SkillModel;
                }());
                models.SkillModel = SkillModel;
            })(models = skill.models || (skill.models = {}));
        })(skill = modules.skill || (modules.skill = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SkillModel.js.map