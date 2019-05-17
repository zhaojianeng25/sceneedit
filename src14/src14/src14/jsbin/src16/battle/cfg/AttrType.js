var battle;
(function (battle) {
    /**
     * 属性定义 不要擅自在此加名称与ID，如果要加一个新的属性和ID，先与策划商量，以免冲突
    */
    var AttrType = /** @class */ (function () {
        function AttrType() {
        }
        AttrType.CONS = 10; // 体质
        AttrType.IQ = 20; // 智力
        AttrType.STR = 30; // 力量
        AttrType.ENDU = 40; // 耐力
        AttrType.AGI = 50; // 敏捷
        AttrType.MAX_HP = 60; // 最大生命上限
        AttrType.UP_LIMITED_HP = 70; // 当前生命上限（小于等于最大生命上限）
        AttrType.HP = 80; // 当前生命
        AttrType.SPIRIT = 90; // 灵力
        AttrType.MAX_MP = 90; // 最大法力
        AttrType.MP = 100; // 当前法力
        AttrType.MAX_SP = 110; // 最大怒气
        AttrType.SP = 120; // 怒气
        AttrType.ATTACK = 130; // 攻击
        AttrType.DEFEND = 140; // 防御
        AttrType.MAGIC_ATTACK = 150; // 法术攻击力
        AttrType.MAGIC_DEF = 160; // 法术防御力
        AttrType.MEDICAL = 170; // 治疗强度
        AttrType.SEAL = 180; // 控制命中
        AttrType.UNSEAL = 190; // 控制抗性
        AttrType.SPEED = 200; // 速度
        AttrType.HIT_RATE = 210; // 命中值
        AttrType.DODGE_RATE = 220; // 躲避值
        AttrType.PHY_CRIT_PCT = 250; // 物理暴击程度（初始为200%,即2倍普通伤害）
        AttrType.MAGIC_CRIT_PCT = 280; // 魔法暴击程度（初始为200%）
        AttrType.PHY_CRITC_LEVEL = 230; // 物理暴击等级
        AttrType.ANTI_PHY_CRITC_LEVEL = 240; // 物理抗性等级
        AttrType.MAGIC_CRITC_LEVEL = 260; // 魔法暴击等级
        AttrType.ANTI_MAGIC_CRITC_LEVEL = 270; // 魔法抗性等级
        AttrType.HEAL_CRIT_LEVEL = 290; // 治疗暴击等级
        AttrType.HEAL_CRIT_PCT = 300; // 治疗暴击程度
        AttrType.PHFORCE = 450; // 当前体力
        AttrType.EXP = 470; // 经验
        AttrType.NEXP = 480; // 升级经验
        AttrType.RENQI = 610; // 人气值
        AttrType.SCHOOLFUND = 850; // 职业贡献度
        AttrType.WULI_CHUANTOU = 950; // 物理穿透
        AttrType.WULI_DIKANG = 960; // 物理抵抗
        AttrType.FASHU_CHUANTOU = 970; // 法术穿透
        AttrType.FASHU_DIKANG = 980; // 法术抵抗
        AttrType.ZHILIAO_JIASHEN = 990; // 治疗加深
        AttrType.EFFECT_POINT = 1010; // 技能效果点
        AttrType.TEMP_SP = 1020; // 临时怒气
        AttrType.MASTER_REPUTATION = 1080; // 师徒声望
        AttrType.PET_XUEMAI_MAX = 1150; // 宠物资质上限
        AttrType.PET_LOW_SKILL = 1170; // 宠物低级技能数
        AttrType.PET_HIGH_SKILL = 1180; // 宠物高级技能数
        AttrType.PET_SUPER_SKILL = 1190; // 宠物超级技能数
        AttrType.LEVEL = 1230; // 等级
        AttrType.PET_LIFE = 1360; // 宠物寿命
        AttrType.ACTIVESTAR = 1380; // 活跃度幸运星
        AttrType.POINT = 1400; // 潜能
        AttrType.QILIZHI = 1410; // 气力值
        AttrType.QILIZHI_LIMIT = 1420; // 气力值上限
        AttrType.PET_XUE_MAI_LEVEL = 1430; // 资质星级
        AttrType.PET_FIGHT_LEVEL = 1430; // 宠物出战等级
        AttrType.PET_ATTACK_APT = 1440; // 宠物攻击资质
        AttrType.PET_DEFEND_APT = 1450; // 宠物防御资质
        AttrType.PET_PHYFORCE_APT = 1460; // 宠物体力资质
        AttrType.PET_MAGIC_APT = 1470; // 宠物法力资质
        AttrType.PET_SPEED_APT = 1480; // 宠物速度资质
        AttrType.PET_DODGE_APT = 1490; // 宠物躲闪资质
        AttrType.PET_GROW_RATE = 1500; // 宠物成长率
        AttrType.ENLIMIT = 1520; // 活力上限
        AttrType.PFLIMIT = 1530; // 体力上限
        AttrType.PET_SCALE = 1810; // 宠物大小 1-4
        AttrType.ACTIVENESS = 1820; // 活跃度值
        AttrType.ANTI_CRIT_LEVEL = 2090; // 暴击抗性等级
        AttrType.KONGZHI_JIACHENG = 2130; // 控制加成
        AttrType.KONGZHI_MIANYI = 2140; // 控制免疫
        AttrType.ENERGY = 3010; // 当前活力
        return AttrType;
    }());
})(battle || (battle = {}));
//# sourceMappingURL=AttrType.js.map