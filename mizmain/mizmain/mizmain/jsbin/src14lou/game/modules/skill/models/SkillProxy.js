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
* 技能系统的中转服务
*/
/**技能系统枚举 */
var SkillEnum;
(function (SkillEnum) {
    /**炼药成功 */
    SkillEnum[SkillEnum["LIANYAO_SUCCESS"] = 150105] = "LIANYAO_SUCCESS";
    /**活力不足 */
    SkillEnum[SkillEnum["HUOLI_BUZU"] = 150100] = "HUOLI_BUZU";
    /**炼药所需银币 */
    SkillEnum[SkillEnum["LIANYAO_YINBI"] = 6000] = "LIANYAO_YINBI";
    /**药材序号起始 */
    SkillEnum[SkillEnum["DRUG_START"] = 111019] = "DRUG_START";
    /**药材序号结束 */
    SkillEnum[SkillEnum["DRUG_END"] = 111023] = "DRUG_END";
    /**食品序号起始 */
    SkillEnum[SkillEnum["FOOD_START"] = 111004] = "FOOD_START";
    /**食品序号结束 */
    SkillEnum[SkillEnum["FOOD_END"] = 111012] = "FOOD_END";
    /**食品图片序号起始 */
    SkillEnum[SkillEnum["FOOD_IMG_START"] = 20175] = "FOOD_IMG_START";
    /**食品图片序号结束 */
    SkillEnum[SkillEnum["FOOD_IMG_END"] = 20183] = "FOOD_IMG_END";
    /**武器模具序号起始 */
    SkillEnum[SkillEnum["WIQI_START"] = 100100] = "WIQI_START";
    /**武器模具序号结束 */
    SkillEnum[SkillEnum["WIQI_END"] = 100110] = "WIQI_END";
    /**防具模具序号起始 */
    SkillEnum[SkillEnum["FANGJU_START"] = 100115] = "FANGJU_START";
    /**防具模具序号结束 */
    SkillEnum[SkillEnum["FANGJU_END"] = 100125] = "FANGJU_END";
    /**饰品模具序号起始 */
    SkillEnum[SkillEnum["SHIPIN_START"] = 100130] = "SHIPIN_START";
    /**饰品模具序号结束 */
    SkillEnum[SkillEnum["SHIPIN_END"] = 100140] = "SHIPIN_END";
    /**10级 */
    SkillEnum[SkillEnum["TEN_LEVEL"] = 10] = "TEN_LEVEL";
    /**收获解锁等级 */
    SkillEnum[SkillEnum["SHOUHUO_LEVEL"] = 65] = "SHOUHUO_LEVEL";
    /**级 */
    SkillEnum[SkillEnum["JI_TEXT"] = 3] = "JI_TEXT";
    /**变身卡图片序号 */
    SkillEnum[SkillEnum["KAPIAN_IMG"] = 31000] = "KAPIAN_IMG";
    /**收获技能最大级别 */
    SkillEnum[SkillEnum["MAX_SHOUHUO_LEVEL"] = 90] = "MAX_SHOUHUO_LEVEL";
    /**帮贡不足 */
    SkillEnum[SkillEnum["BANGGONG_BUZU"] = 150017] = "BANGGONG_BUZU";
    /**道具不足 */
    SkillEnum[SkillEnum["DAOJU_BUZU"] = 150058] = "DAOJU_BUZU";
    /**生活引导提示 */
    SkillEnum[SkillEnum["YINDAO_TIP"] = 33142] = "YINDAO_TIP";
    /**引导持续时间 */
    SkillEnum[SkillEnum["YINDAO_TIME"] = 3000] = "YINDAO_TIME";
    /**结婚技能图标序号起始 */
    SkillEnum[SkillEnum["MARRY_START"] = 195000] = "MARRY_START";
    /**结婚技能图标序号结束 */
    SkillEnum[SkillEnum["MARRY_END"] = 195003] = "MARRY_END";
    /**云霄殿技能序号起始 */
    SkillEnum[SkillEnum["YUNXIAO_START"] = 110000] = "YUNXIAO_START";
    /**云霄殿技能序号结束 */
    SkillEnum[SkillEnum["YUNXIAO_END"] = 110008] = "YUNXIAO_END";
    /**云霄殿技能格序号起始 */
    SkillEnum[SkillEnum["YUNXIAO_GRID_START"] = 1111] = "YUNXIAO_GRID_START";
    /**云霄殿技能格序号结束 */
    SkillEnum[SkillEnum["YUNXIAO_GRID_END"] = 1119] = "YUNXIAO_GRID_END";
    /**大荒岭技能序号起始 */
    SkillEnum[SkillEnum["DAHUANG_START"] = 120000] = "DAHUANG_START";
    /**大荒岭技能序号结束 */
    SkillEnum[SkillEnum["DAHUANG_END"] = 120008] = "DAHUANG_END";
    /**大荒岭技能格序号起始 */
    SkillEnum[SkillEnum["DAHUANG_GRID_START"] = 1211] = "DAHUANG_GRID_START";
    /**大荒岭技能格序号结束 */
    SkillEnum[SkillEnum["DAHUANG_GRID_END"] = 1219] = "DAHUANG_GRID_END";
    /**苍羽宫技能序号起始 */
    SkillEnum[SkillEnum["CANGYU_START"] = 130000] = "CANGYU_START";
    /**苍羽宫技能序号结束 */
    SkillEnum[SkillEnum["CANGYU_END"] = 130008] = "CANGYU_END";
    /**苍羽宫技能格序号起始 */
    SkillEnum[SkillEnum["CANGYU_GRID_START"] = 1311] = "CANGYU_GRID_START";
    /**苍羽宫技能格序号结束 */
    SkillEnum[SkillEnum["CANGYU_GRID_END"] = 1319] = "CANGYU_GRID_END";
    /**飞雪涯技能序号起始 */
    SkillEnum[SkillEnum["FEIXUE_START"] = 140000] = "FEIXUE_START";
    /**飞雪涯技能序号结束 */
    SkillEnum[SkillEnum["FEIXUE_END"] = 140008] = "FEIXUE_END";
    /**飞雪涯技能格序号起始 */
    SkillEnum[SkillEnum["FEIXUE_GRID_START"] = 1411] = "FEIXUE_GRID_START";
    /**飞雪涯技能格序号结束 */
    SkillEnum[SkillEnum["FEIXUE_GRID_END"] = 1419] = "FEIXUE_GRID_END";
    /**天雷狱技能序号起始 */
    SkillEnum[SkillEnum["TIANLEI_START"] = 150000] = "TIANLEI_START";
    /**天雷狱技能序号结束 */
    SkillEnum[SkillEnum["TIANLEI_END"] = 150008] = "TIANLEI_END";
    /**天雷狱技能格序号起始 */
    SkillEnum[SkillEnum["TIANLEI_GRID_START"] = 1511] = "TIANLEI_GRID_START";
    /**天雷狱技能格序号结束 */
    SkillEnum[SkillEnum["TIANLEI_GRID_END"] = 1519] = "TIANLEI_GRID_END";
    /**无量宫殿技能序号起始 */
    SkillEnum[SkillEnum["WULIANG_START"] = 160000] = "WULIANG_START";
    /**无量宫技能序号结束 */
    SkillEnum[SkillEnum["WULIANG_END"] = 160008] = "WULIANG_END";
    /**无量宫技能格序号起始 */
    SkillEnum[SkillEnum["WULIANG_GRID_START"] = 1611] = "WULIANG_GRID_START";
    /**无量宫技能格序号结束 */
    SkillEnum[SkillEnum["WULIANG_GRID_END"] = 1619] = "WULIANG_GRID_END";
    /**玄冥池技能序号起始 */
    SkillEnum[SkillEnum["XUANMING_START"] = 161000] = "XUANMING_START";
    /**玄冥池技能序号结束 */
    SkillEnum[SkillEnum["XUANMING_END"] = 161008] = "XUANMING_END";
    /**玄冥池技能格序号起始 */
    SkillEnum[SkillEnum["XUANMING_GRID_START"] = 1711] = "XUANMING_GRID_START";
    /**玄冥池技能格序号结束 */
    SkillEnum[SkillEnum["XUANMING_GRID_END"] = 1719] = "XUANMING_GRID_END";
    /**七星观技能序号起始 */
    SkillEnum[SkillEnum["QIXING_START"] = 162000] = "QIXING_START";
    /**七星观技能序号结束 */
    SkillEnum[SkillEnum["QIXING_END"] = 162008] = "QIXING_END";
    /**七星观技能格序号起始 */
    SkillEnum[SkillEnum["QIXING_GRID_START"] = 1811] = "QIXING_GRID_START";
    /**七星观技能格序号结束 */
    SkillEnum[SkillEnum["QIXING_GRID_END"] = 1819] = "QIXING_GRID_END";
    /**丹阳观技能序号起始 */
    SkillEnum[SkillEnum["DANGYANG_START"] = 163000] = "DANGYANG_START";
    /**丹阳观技能序号结束 */
    SkillEnum[SkillEnum["DANGYANG_END"] = 163008] = "DANGYANG_END";
    /**丹阳观技能格序号起始 */
    SkillEnum[SkillEnum["DANGYANG_GRID_START"] = 1911] = "DANGYANG_GRID_START";
    /**丹阳观技能格序号结束 */
    SkillEnum[SkillEnum["DANGYANG_GRID_END"] = 1919] = "DANGYANG_GRID_END";
    /**战斗已经升到最高等级 */
    SkillEnum[SkillEnum["MAX_FIGHT_LEVEL"] = 141236] = "MAX_FIGHT_LEVEL";
    /**解锁 */
    SkillEnum[SkillEnum["UNLOCK"] = 2903] = "UNLOCK";
    /**功效 */
    SkillEnum[SkillEnum["GONGXIA0"] = 11038] = "GONGXIA0";
    /**升级 */
    SkillEnum[SkillEnum["SHENG_JI"] = 1659] = "SHENG_JI";
    /**附魔技能解锁等级 */
    SkillEnum[SkillEnum["UNLOCK_FUMO"] = 40] = "UNLOCK_FUMO";
    /**专精技能 */
    SkillEnum[SkillEnum["ZHUANGJING_TITLE"] = 11258] = "ZHUANGJING_TITLE";
    /**专精技能提示 */
    SkillEnum[SkillEnum["ZHUANGJING_TIP"] = 11259] = "ZHUANGJING_TIP";
    /**属性说明 */
    SkillEnum[SkillEnum["SHUXING_TITLE"] = 11486] = "SHUXING_TITLE";
    /**属性提示 */
    SkillEnum[SkillEnum["SHUXING_TIP"] = 11476] = "SHUXING_TIP";
    /**专精技能学习消耗银币 */
    SkillEnum[SkillEnum["ZHUANGJING_YINBI"] = 20000] = "ZHUANGJING_YINBI";
    /**幻化卡总数 */
    SkillEnum[SkillEnum["HUANHUA_NUM"] = 28] = "HUANHUA_NUM";
    /**人物专精技能序号起始 */
    SkillEnum[SkillEnum["ROLE_ZHUANGJING_START"] = 360011] = "ROLE_ZHUANGJING_START";
    /**人物专精技能序号结束 */
    SkillEnum[SkillEnum["ROLE_ZHUANGJING_END"] = 360015] = "ROLE_ZHUANGJING_END";
    /**宠物专精技能序号起始 */
    SkillEnum[SkillEnum["PET_ZHUANGJING_START"] = 360020] = "PET_ZHUANGJING_START";
    /**宠物专精技能序号结束 */
    SkillEnum[SkillEnum["PET_ZHUANGJING_END"] = 360024] = "PET_ZHUANGJING_END";
    /**变身技能序号起始 */
    SkillEnum[SkillEnum["BIANSHEN_START"] = 360030] = "BIANSHEN_START";
    /**变身技能序号结束 */
    SkillEnum[SkillEnum["BIANSHEN_END"] = 360033] = "BIANSHEN_END";
    /**战斗界面 */
    SkillEnum[SkillEnum["ZHANDOU_KEY"] = 1] = "ZHANDOU_KEY";
    /**生活界面 */
    SkillEnum[SkillEnum["LIFE_KEY"] = 2] = "LIFE_KEY";
    /**专精界面 */
    SkillEnum[SkillEnum["ZHUANGJING_KEY"] = 3] = "ZHUANGJING_KEY";
    /**收获技能制作的变身卡序号起始 */
    SkillEnum[SkillEnum["VCARD_START"] = 100000] = "VCARD_START";
})(SkillEnum || (SkillEnum = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var skill;
        (function (skill) {
            var models;
            (function (models) {
                /**人物信息界面回复 */
                models.SRspRoleInfo_EVENT = "SRspRoleInfo";
                /**转盘开始 */
                models.SBeginSchoolWheel_EVENT = "SBeginSchoolWheel";
                /**服务器：升级到XX级 */
                models.SUpdateInborn_EVENT = "SUpdateInborn";
                /**生活技能升级 */
                models.SUpdateLearnLiveSkill_EVENT = "SUpdateLearnLiveSkill";
                /**返回已经学习的所有修炼技能 */
                models.SRequestParticleSkillList_EVENT = "SRequestParticleSkillList";
                /**如果修炼技能等级有变化会更新 */
                models.SUpdateLearnParticleSkill_EVENT = "SUpdateLearnParticleSkill";
                /**制作食物返回 */
                models.SLiveSkillMakeFood_EVENT = "SLiveSkillMakeFood";
                /**锻造返回 */
                models.SLiveSkillMakeStuff_EVENT = "SLiveSkillMakeStuff";
                /**服务器返回制作变身卡成功 */
                models.SLiveSkillMakeCard_EVENT = "SLiveSkillMakeCard";
                /**制作药品返回 */
                models.SLiveSkillMakeDrug_EVENT = "SLiveSkillMakeDrug";
                /**返回已经学习的所有生活技能 */
                models.SRequestLiveSkillList_EVENT = "SRequestLiveSkillList";
                /** 获得服务端下发的活力不足错误消息 */
                models.EnergyNotEnough_EVENT = "energyNotEnough_event";
                var SkillProxy = /** @class */ (function (_super) {
                    __extends(SkillProxy, _super);
                    function SkillProxy() {
                        var _this = _super.call(this) || this;
                        SkillProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    SkillProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new SkillProxy();
                        }
                        return this._instance;
                    };
                    SkillProxy.prototype.init = function () {
                        SkillProxy.getInstance();
                        this.addNetworkListener();
                        Laya.loader.load("common/data/temp/skill.cschoolskillitem.bin", Handler.create(this, this.onloadedSchoolSkillitemComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/role.acupointlevelup.bin", Handler.create(this, this.onloadedAcupointLevelUpComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/role.acupointinfo.bin", Handler.create(this, this.onloadedAcupointInfoComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/skill.clifeskill.bin", Handler.create(this, this.onloadedLifeSkillComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/skill.cinheritcost.bin", Handler.create(this, this.onloadedInheritCostComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/skill.clifeskillcost.bin", Handler.create(this, this.onloadedLifeSkillCostComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/skill.cparticeskilllevelup.bin", Handler.create(this, this.onloadedParticeSkillLevelupComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/skill.chuanhuause.bin", Handler.create(this, this.onloadedHuanhuaUseComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/skill.chuanhuainfo.bin", Handler.create(this, this.onloadedHuanhuaInfoComplete), null, Loader.BUFFER);
                    };
                    /**j技能显示表 */
                    SkillProxy.prototype.onloadedSchoolSkillitemComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cschoolskillitem.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.SkillModel.getInstance().CSchoolSkillitemBinDic, game.data.template.SchoolSkillitemBaseVo, "id");
                    };
                    /**技能格消耗表 */
                    SkillProxy.prototype.onloadedAcupointLevelUpComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/role.acupointlevelup.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.SkillModel.getInstance().AcupointLevelUpBinDic, game.data.template.AcupointLevelUpBaseVo, "id");
                    };
                    /**技能格信息表 */
                    SkillProxy.prototype.onloadedAcupointInfoComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/role.acupointinfo.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.SkillModel.getInstance().AcupointInfoBinDic, game.data.template.AcupointInfoBaseVo, "id");
                    };
                    /**s生活技能表 */
                    SkillProxy.prototype.onloadedLifeSkillComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.clifeskill.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.SkillModel.getInstance().CLifeSkillBinDic, game.data.template.LifeSkillBaseVo, "id");
                    };
                    /**j继承消耗 */
                    SkillProxy.prototype.onloadedInheritCostComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cinheritcost.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.SkillModel.getInstance().CInheritCostBinDic, game.data.template.InheritCostBaseVo, "id");
                    };
                    /**s生活技能学习消耗 */
                    SkillProxy.prototype.onloadedLifeSkillCostComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.clifeskillcost.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.SkillModel.getInstance().CLifeSkillCostBinDic, game.data.template.LifeSkillCostBaseVo, "id");
                    };
                    /**X修炼技能升级 */
                    SkillProxy.prototype.onloadedParticeSkillLevelupComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cparticeskilllevelup.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.SkillModel.getInstance().CParticeSkillLevelupBinDic, game.data.template.ParticeSkillLevelupBaseVo, "id");
                    };
                    /**h幻化使用配置表 */
                    SkillProxy.prototype.onloadedHuanhuaUseComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.chuanhuause.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.SkillModel.getInstance().CHuanhuaUseBinDic, game.data.template.HuanhuaUseBaseVo, "id");
                    };
                    /**h幻化信息配置表 */
                    SkillProxy.prototype.onloadedHuanhuaInfoComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.chuanhuainfo.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.SkillModel.getInstance().CHuanhuaInfoBinDic, game.data.template.HuanhuaInfoBaseVo, "id");
                    };
                    /**添加监听 */
                    SkillProxy.prototype.addNetworkListener = function () {
                        /**监听战斗技能升级信息 */
                        Network._instance.addHanlder(ProtocolsEnum.SUpdateInborn, this, this.onUpdateInborn);
                        /**监听生活技能升级信息 */
                        Network._instance.addHanlder(ProtocolsEnum.SUpdateLearnLiveSkill, this, this.onUpdateLearnLiveSkil);
                        /**监听请求已学习的专精技能信息 */
                        Network._instance.addHanlder(ProtocolsEnum.SRequestParticleSkillList, this, this.onRequestParticleSkillList);
                        /**监听专精技能升级信息 */
                        Network._instance.addHanlder(ProtocolsEnum.SUpdateLearnParticleSkill, this, this.onUpdateLearnParticleSkill);
                        /**监听烹饪返回 */
                        Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeFood, this, this.onLiveSkillMakeFood);
                        /**监听锻造返回 */
                        Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeStuff, this, this.onLiveSkillMakeStuff);
                        /**监听制作变身卡 */
                        Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeCard, this, this.onLiveSkillMakeCard);
                        /**监听炼金返回 */
                        Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeDrug, this, this.onLiveSkillMakeDrug);
                        /**监听请求已学习的生活技能信息 */
                        Network._instance.addHanlder(ProtocolsEnum.SRequestLiveSkillList, this, this.onRequestLiveSkillList);
                        /** 监听技能系统模块的错误下发 */
                        Network._instance.addHanlder(ProtocolsEnum.SSkillError, this, this.onSkillError);
                    };
                    /**移除监听 */
                    SkillProxy.prototype.removeNetworkListener = function () {
                        Network._instance.removeHanlder(ProtocolsEnum.SUpdateInborn, this, this.onUpdateInborn);
                        Network._instance.removeHanlder(ProtocolsEnum.SUpdateLearnLiveSkill, this, this.onUpdateLearnLiveSkil);
                        Network._instance.removeHanlder(ProtocolsEnum.SRequestParticleSkillList, this, this.onRequestParticleSkillList);
                        Network._instance.removeHanlder(ProtocolsEnum.SUpdateLearnParticleSkill, this, this.onUpdateLearnParticleSkill);
                        Network._instance.removeHanlder(ProtocolsEnum.SLiveSkillMakeFood, this, this.onLiveSkillMakeFood);
                        Network._instance.removeHanlder(ProtocolsEnum.SLiveSkillMakeStuff, this, this.onLiveSkillMakeStuff);
                        Network._instance.removeHanlder(ProtocolsEnum.SLiveSkillMakeCard, this, this.onLiveSkillMakeCard);
                        Network._instance.removeHanlder(ProtocolsEnum.SLiveSkillMakeDrug, this, this.onLiveSkillMakeDrug);
                        Network._instance.removeHanlder(ProtocolsEnum.SRequestLiveSkillList, this, this.onRequestLiveSkillList);
                        Network._instance.removeHanlder(ProtocolsEnum.SSkillError, this, this.onSkillError);
                    };
                    /** 服务器：升级到XX级 */
                    SkillProxy.prototype.onUpdateInborn = function (optcode, msg) {
                        models.SkillModel.getInstance().SUpdateInbornData.set("data", msg);
                        //更新附魔技能的等级
                        var fumo = [FUMO.YUNXIAO_SKILLID, FUMO.DAHUANG_SKILLID, FUMO.CANGYU_SKILLID, FUMO.FEIXUE_SKILLID, FUMO.TIANLEI_SKILLID, FUMO.WULIANG_SKILLID, FUMO.XUANMING_SKILLID, FUMO.QIXING_SKILLID, FUMO.DANYANG_SKILLID];
                        for (var i = 0; i < 9; i++) {
                            if (msg.inborns.get(fumo[i]) != undefined) {
                                game.modules.skill.models.SkillModel.getInstance().makeEnhancementLevel = msg.inborns.get(fumo[i]);
                                game.modules.skill.models.SkillModel.getInstance().EnhancementSkillId = fumo[i];
                            }
                        }
                        this.updateSkillLevel();
                        SkillProxy.getInstance().event(models.SUpdateInborn_EVENT);
                    };
                    /**生活技能升级 */
                    SkillProxy.prototype.onUpdateLearnLiveSkil = function (optcode, msg) {
                        models.SkillModel.getInstance().SUpdateLearnLiveSkillData.set("data", msg);
                        models.SkillModel.getInstance().LiveSkilllevelData.set(msg.skill.id, msg.skill.level); //技能升级第一次的 key value
                        SkillProxy.getInstance().event(models.SUpdateLearnLiveSkill_EVENT);
                    };
                    /**返回已经学习的所有修炼技能 */
                    SkillProxy.prototype.onRequestParticleSkillList = function (optcode, msg) {
                        models.SkillModel.getInstance().SRequestParticleSkillListData.set("data", msg);
                        SkillProxy.getInstance().event(models.SRequestParticleSkillList_EVENT);
                    };
                    /**如果修炼技能等级有变化会更新 */
                    SkillProxy.prototype.onUpdateLearnParticleSkill = function (optcode, msg) {
                        models.SkillModel.getInstance().SUpdateLearnParticleSkillData.set("data", msg);
                        SkillProxy.getInstance().event(models.SUpdateLearnParticleSkill_EVENT);
                    };
                    /**制作食物返回 */
                    SkillProxy.prototype.onLiveSkillMakeFood = function (optcode, msg) {
                        models.SkillModel.getInstance().SLiveSkillMakeFoodData.set("data", msg);
                        SkillProxy.getInstance().event(models.SLiveSkillMakeFood_EVENT);
                    };
                    /**锻造返回 */
                    SkillProxy.prototype.onLiveSkillMakeStuff = function (optcode, msg) {
                        models.SkillModel.getInstance().SLiveSkillMakeStuffData.set("data", msg);
                        SkillProxy.getInstance().event(models.SLiveSkillMakeStuff_EVENT);
                    };
                    /**服务器返回制作变身卡成功 */
                    SkillProxy.prototype.onLiveSkillMakeCard = function (optcode, msg) {
                        models.SkillModel.getInstance().SLiveSkillMakeCardData.set("data", msg);
                        SkillProxy.getInstance().event(models.SLiveSkillMakeCard_EVENT);
                    };
                    /**制作药品返回 */
                    SkillProxy.prototype.onLiveSkillMakeDrug = function (optcode, msg) {
                        models.SkillModel.getInstance().SLiveSkillMakeDrugData.set("data", msg);
                        SkillProxy.getInstance().event(models.SLiveSkillMakeDrug_EVENT);
                    };
                    /**返回已经学习的所有生活技能 */
                    SkillProxy.prototype.onRequestLiveSkillList = function (optcode, msg) {
                        models.SkillModel.getInstance().SRequestLiveSkillListData.set("data", msg);
                        var arr = msg.skilllist;
                        for (var index = 0; index < arr.length; index++) {
                            models.SkillModel.getInstance().LiveSkilllevelData.set(arr[index].id, arr[index].level); //技能所有的的 key value
                        }
                        SkillProxy.getInstance().event(models.SRequestLiveSkillList_EVENT);
                    };
                    /** 技能系统模块错误下发 */
                    SkillProxy.prototype.onSkillError = function (optcode, msg) {
                        switch (msg.skillError) {
                            case SkillError.EnergyNotEnough:
                                this.event(models.EnergyNotEnough_EVENT);
                                break;
                        }
                    };
                    /**技能升级刷新 */
                    SkillProxy.prototype.updateSkillLevel = function () {
                        var data = models.SkillModel.getInstance().SUpdateInbornData.get("data");
                        //0：单个技能升级，1：一键升级
                        switch (data.flag) {
                            case 0:
                                models.SkillModel.getInstance().skillLevelDic.set(data.inborns.keys[0], data.inborns.values[0]);
                                break;
                            case 1:
                                for (var j = 0; j < skill.models.SkillModel.getInstance().skillArr.length; j++) {
                                    for (var i = 0; i < data.inborns.keys.length; i++) {
                                        if (skill.models.SkillModel.getInstance().skillGridArr[j]["id"] == data.inborns.keys[i]) {
                                            skill.models.SkillModel.getInstance().skillLevelDic.set(skill.models.SkillModel.getInstance().skillArr[j]["id"], data.inborns.values[i]);
                                        }
                                    }
                                }
                                break;
                        }
                    };
                    return SkillProxy;
                }(hanlder.ProxyBase));
                models.SkillProxy = SkillProxy;
            })(models = skill.models || (skill.models = {}));
        })(skill = modules.skill || (modules.skill = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SkillProxy.js.map