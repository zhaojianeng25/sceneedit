/**
* name
*/
var ByteArrayUtils = game.utils.ByteArrayUtils;
var RoleRColorModel = game.modules.roleRColor.models.RoleRColorModel;
var RoleRColorConfigBaseVo = game.data.template.RoleRColorConfigBaseVo;
var CScheculedActivityBaseVo = game.data.template.CScheculedActivityBaseVo;
var CcheculedActivityBaseVo = game.data.template.CcheculedActivityBaseVo; //d定时活动配置表
var CScheculedActivitypayBaseVo = game.data.template.CScheculedActivitypayBaseVo; //d定时活动配置表for点卡服
var CbattlelistBaseVo = game.data.template.CbattlelistBaseVo; //z战斗信息表_练功区特殊_9xxx
var CbiaoqingBaseVo = game.data.template.CbiaoqingBaseVo; //b表情配置
var CBanWordsBaseVo = game.data.template.CBanWordsBaseVo; //l聊天屏蔽字
var CquickchatBaseVo = game.data.template.CquickchatBaseVo; //l聊天常用语
var CchatColorConfigBaseVo = game.data.template.CchatColorConfigBaseVo; //Y颜色转换表
var CTitleConfigBaseVo = game.data.template.CTitleConfigBaseVo; //称谓表
var CCommonBaseVo = game.data.template.CCommonBaseVo; //t通用配置表
var CAddressProvinceBaseVo = game.data.template.CAddressProvinceBaseVo; //d地理位置表
var CAddressCountryBaseVo = game.data.template.CAddressCountryBaseVo; //d地理位置市表
var CAutoMovePathBaseVo = game.data.template.CAutoMovePathBaseVo; //x巡游配置/x巡游路径总表
var CAutoMovePathPointBaseVo = game.data.template.CAutoMovePathPointBaseVo; //x巡游配置/x巡游路径子地图表
var CMessageTipBaseVo = game.data.template.CMessageTipBaseVo; //客户端提示信息表/客户端提示
var CStringResBaseVo = game.data.template.CStringResBaseVo; //客户端提示信息表/程序内字符串
var CEffectPathBaseVo = game.data.template.CEffectPathBaseVo; //t特效路径表
var CEffectPathNoneDramaBaseVo = game.data.template.CEffectPathNoneDramaBaseVo; //t特效路径表_非剧情
var MissionCMainMissionInfoBaseVo = game.data.template.MissionCMainMissionInfoBaseVo;
var PetCPetAttrBaseVo = game.data.template.PetCPetAttrBaseVo;
var PetCPetAttrModDataBaseVo = game.data.template.PetCPetAttrModDataBaseVo;
var PetCPetNextExpBaseVo = game.data.template.PetCPetNextExpBaseVo;
var PetCPetResetPointConfigBaseVo = game.data.template.PetCPetResetPointConfigBaseVo;
var PetCPetFeedItemListBaseVo = game.data.template.PetCPetFeedItemListBaseVo;
var PetCPetDepotPriceBaseVo = game.data.template.PetCPetDepotPriceBaseVo;
var PetCPetFeedItemAttrBaseVo = game.data.template.PetCPetFeedItemAttrBaseVo;
var PetCFoodItemAttrBaseVo = game.data.template.PetCFoodItemAttrBaseVo;
var PetCShenShouIncBaseVo = game.data.template.PetCShenShouIncBaseVo;
var InstanceCInstaceConfigBaseVo = game.data.template.InstanceCInstaceConfigBaseVo;
var InstanceCBingFengWangZuoMapBaseVo = game.data.template.InstanceCBingFengWangZuoMapBaseVo;
var InstanceCShiGuangZhiXueConfigBaseVo = game.data.template.InstanceCShiGuangZhiXueConfigBaseVo;
var InstanceCShiGuangZhiXueNpcBaseVo = game.data.template.InstanceCShiGuangZhiXueNpcBaseVo;
var InstanceCParnterNpcConfigBaseVo = game.data.template.InstanceCParnterNpcConfigBaseVo;
var InstanceCEnChouLuNewConfigBaseVo = game.data.template.InstanceCEnChouLuNewConfigBaseVo;
var ClanCFactionYaoFangBaseVo = game.data.template.ClanCFactionYaoFangBaseVo;
var ClanCFactionLobbyBaseVo = game.data.template.ClanCFactionLobbyBaseVo;
var ClanCFactionGoldBankBaseVo = game.data.template.ClanCFactionGoldBankBaseVo;
var ClanCFactionHotelBaseVo = game.data.template.ClanCFactionHotelBaseVo;
var ClanCFactionDrugStoreBaseVo = game.data.template.ClanCFactionDrugStoreBaseVo;
var ClanCFactionPositionBaseVo = game.data.template.ClanCFactionPositionBaseVo;
var ClanCFactionFuLiBaseVo = game.data.template.ClanCFactionFuLiBaseVo;
var ClanCRuneSetBaseVo = game.data.template.ClanCRuneSetBaseVo;
var ClanCFactionHuoDongBaseVo = game.data.template.ClanCFactionHuoDongBaseVo;
var ClanCClanFightBaseVo = game.data.template.ClanCClanFightBaseVo;
var FriendGiveItemBaseVo = game.data.template.FriendGiveItemBaseVo;
var FriendGiveGiftBaseVo = game.data.template.FriendGiveGiftBaseVo;
var RecruitRewardBaseVo = game.data.template.RecruitRewardBaseVo;
var MyRecruitBaseVo = game.data.template.MyRecruitBaseVo;
var MyRecruitPayBaseVo = game.data.template.MyRecruitPayBaseVo;
var RecruitRewardPayBaseVo = game.data.template.RecruitRewardPayBaseVo;
var RecruitPathBaseVo = game.data.template.RecruitPathBaseVo;
var MarryConfBaseVo = game.data.template.MarryConfBaseVo;
var ZhenFaEffectBaseVo = game.data.template.ZhenFaEffectBaseVo;
var TeamListInfoBaseVo = game.data.template.TeamListInfoBaseVo;
var DTeamListInfoBaseVo = game.data.template.DTeamListInfoBaseVo;
var EffectConfigBaseVo = game.data.template.EffectConfigBaseVo;
var ColorEffectBaseVo = game.data.template.ColorEffectBaseVo;
var UseItemEffectBaseVo = game.data.template.UseItemEffectBaseVo;
var TongPingSettingBaseVo = game.data.template.TongPingSettingBaseVo;
var TuiSongSettingBaseVo = game.data.template.TuiSongSettingBaseVo;
var FPSSettingBaseVo = game.data.template.FPSSettingBaseVo;
var StepLoadTexSettingBaseVo = game.data.template.StepLoadTexSettingBaseVo;
var PCountFPSSettingBaseVo = game.data.template.PCountFPSSettingBaseVo;
var BattleCommandBaseVo = game.data.template.BattleCommandBaseVo;
var ResolutionBaseVo = game.data.template.ResolutionBaseVo;
var GameconfigBaseVo = game.data.template.GameconfigBaseVo;
var GameconfigResetBaseVo = game.data.template.GameconfigResetBaseVo;
var GengXinGongGaoBaseVo = game.data.template.GengXinGongGaoBaseVo;
var BuffConfigBaseVo = game.data.template.BuffConfigBaseVo;
var CAwardResultConfigBaseVo = game.data.template.CAwardResultConfigBaseVo;
var CAwardConfigBaseVo = game.data.template.CAwardConfigBaseVo;
var CEventConfigBaseVo = game.data.template.CEventConfigBaseVo; //CLoginTips  CLoginTipsBaseVo
var CLoginTipsBaseVo = game.data.template.CLoginTipsBaseVo;
var CLoginImagesBaseVo = game.data.template.CLoginImagesBaseVo;
var CExitgameBaseVo = game.data.template.CExitgameBaseVo;
var CTriggerConditionBaseVo = game.data.template.CTriggerConditionBaseVo;
var CNpcServiceMappingBaseVo = game.data.template.CNpcServiceMappingBaseVo;
var CNPCConfigBaseVo = game.data.template.CNPCConfigBaseVo;
var CNPCInfoBaseVo = game.data.template.CNPCInfoBaseVo;
var CNpcChatBaseVo = game.data.template.CNpcChatBaseVo;
var CNpcServerConfigBaseVo = game.data.template.CNpcServerConfigBaseVo;
var CMonsterConfigBaseVo = game.data.template.CMonsterConfigBaseVo;
var CHeroBaseInfoBaseVo = game.data.template.CHeroBaseInfoBaseVo;
var CLuaTestBaseVo = game.data.template.CLuaTestBaseVo;
var CNpcShapeBaseVo = game.data.template.CNpcShapeBaseVo;
var CNpcInAllBaseVo = game.data.template.CNpcInAllBaseVo;
var CSceneNPCConfigBaseVo = game.data.template.CSceneNPCConfigBaseVo;
var CSceneNPCBaseBaseVo = game.data.template.CSceneNPCBaseBaseVo;
var CActionInfoBaseVo = game.data.template.CActionInfoBaseVo;
var CRideBaseVo = game.data.template.CRideBaseVo;
var CRideItemBaseVo = game.data.template.CRideItemBaseVo;
var CLeitaiLevelBaseVo = game.data.template.CLeitaiLevelBaseVo;
var CJingjiRandomRoleBaseVo = game.data.template.CJingjiRandomRoleBaseVo;
var CJingjiRandomChatBaseVo = game.data.template.CJingjiRandomChatBaseVo;
// ----------------------------------------Item系列49----------------------------------------
var ItemAttrBaseVo = game.data.template.ItemAttrBaseVo;
var ItemAttr_PointCardBaseVo = game.data.template.ItemAttr_PointCardBaseVo;
var EquipIteminfoBaseVo = game.data.template.EquipIteminfoBaseVo;
var EquipAddattributelibBaseVo = game.data.template.EquipAddattributelibBaseVo;
var EquipAddattributerandomlibBaseVo = game.data.template.EquipAddattributerandomlibBaseVo;
var AttributeDesConfigBaseVo = game.data.template.AttributeDesConfigBaseVo;
var ItemTypeBaseVo = game.data.template.ItemTypeBaseVo;
var EquipMakeInfoBaseVo = game.data.template.EquipMakeInfoBaseVo;
var PetItemEffectBaseVo = game.data.template.PetItemEffectBaseVo;
var PetItemEffect_PointCardBaseVo = game.data.template.PetItemEffect_PointCardBaseVo;
var FoodAndDrugEffectBaseVo = game.data.template.FoodAndDrugEffectBaseVo;
var FightDrugTypeBaseVo = game.data.template.FightDrugTypeBaseVo;
var FoodAndDrugEffect_PointCardBaseVo = game.data.template.FoodAndDrugEffect_PointCardBaseVo;
var ItembuffidsBaseVo = game.data.template.ItembuffidsBaseVo;
var GemEffectBaseVo = game.data.template.GemEffectBaseVo;
var GemEffect_PointCardBaseVo = game.data.template.GemEffect_PointCardBaseVo;
var GemTypeBaseVo = game.data.template.GemTypeBaseVo;
var GroceryEffectBaseVo = game.data.template.GroceryEffectBaseVo;
var GroceryEffect_PointCardBaseVo = game.data.template.GroceryEffect_PointCardBaseVo;
var EquipEffectBaseVo = game.data.template.EquipEffectBaseVo;
var EquipEffect_PointCardBaseVo = game.data.template.EquipEffect_PointCardBaseVo;
var TaskRelativeBaseVo = game.data.template.TaskRelativeBaseVo;
var TaskRelative_PointCardBaseVo = game.data.template.TaskRelative_PointCardBaseVo;
var EquipItemAttrBaseVo = game.data.template.EquipItemAttrBaseVo;
var EquipItemAttr_PointCardBaseVo = game.data.template.EquipItemAttr_PointCardBaseVo;
var PointCardEquipGemBaseVo = game.data.template.PointCardEquipGemBaseVo;
var ItemBuffBaseVo = game.data.template.ItemBuffBaseVo;
var PresentConfigBaseVo = game.data.template.PresentConfigBaseVo;
var PresentConfigPayBaseVo = game.data.template.PresentConfigPayBaseVo;
var ItemTypeNameListBaseVo = game.data.template.ItemTypeNameListBaseVo;
var OnLineGiftBaseVo = game.data.template.OnLineGiftBaseVo;
var PetEquipSuitBuffBaseVo = game.data.template.PetEquipSuitBuffBaseVo;
var PetEquipHeChengBaseVo = game.data.template.PetEquipHeChengBaseVo;
var EquipCombinBaseVo = game.data.template.EquipCombinBaseVo; //2张共用
var ItemUseTipBaseVo = game.data.template.ItemUseTipBaseVo;
var DepottableBaseVo = game.data.template.DepottableBaseVo;
var BagTableBaseVo = game.data.template.BagTableBaseVo;
var ItemToItemBaseVo = game.data.template.ItemToItemBaseVo;
var EquipPosNameBaseVo = game.data.template.EquipPosNameBaseVo;
var ComeFromBaseVo = game.data.template.ComeFromBaseVo;
var FoodAndDrugFormulaBaseVo = game.data.template.FoodAndDrugFormulaBaseVo;
var FumoEffectFormulaBaseVo = game.data.template.FumoEffectFormulaBaseVo;
var DashiSpaceGiftBaseVo = game.data.template.DashiSpaceGiftBaseVo;
var EquipRefineInfoBaseVo = game.data.template.EquipRefineInfoBaseVo;
var EquipRefineInfo_PointCardBaseVo = game.data.template.EquipRefineInfo_PointCardBaseVo;
var EquipRefineSkillInfoBaseVo = game.data.template.EquipRefineSkillInfoBaseVo;
var EquipRefineSkillInfo_PointCardBaseVo = game.data.template.EquipRefineSkillInfo_PointCardBaseVo;
var ExpFactorItemInfoBaseVo = game.data.template.ExpFactorItemInfoBaseVo;
// ----------------------------------------Skill系列21----------------------------------------
var FriendSkillBaseVo = game.data.template.FriendSkillBaseVo;
var EquipSkillBaseVo = game.data.template.EquipSkillBaseVo;
var EquipSkillInfoBaseVo = game.data.template.EquipSkillInfoBaseVo;
var SchoolSkillitemBaseVo = game.data.template.SchoolSkillitemBaseVo;
var PetSkillupgradeBaseVo = game.data.template.PetSkillupgradeBaseVo;
var PetSkillEffectBaseVo = game.data.template.PetSkillEffectBaseVo;
var SkillitemBaseVo = game.data.template.SkillitemBaseVo;
var SchoolSkillBaseVo = game.data.template.SchoolSkillBaseVo;
var PetSkillConfigBaseVo = game.data.template.PetSkillConfigBaseVo;
var SBLevelLimitBaseVo = game.data.template.SBLevelLimitBaseVo;
var SkillTypeConfigBaseVo = game.data.template.SkillTypeConfigBaseVo;
var SkillConfigBaseVo = game.data.template.SkillConfigBaseVo;
var LifeSkillBaseVo = game.data.template.LifeSkillBaseVo;
var LifeSkillCostBaseVo = game.data.template.LifeSkillCostBaseVo;
var LifeSkillCostPayBaseVo = game.data.template.LifeSkillCostPayBaseVo;
var ParticeSkillLevelupBaseVo = game.data.template.ParticeSkillLevelupBaseVo;
var PointCardParticeSkillLevelupBaseVo = game.data.template.PointCardParticeSkillLevelupBaseVo;
var PracticeItemExpBaseVo = game.data.template.PracticeItemExpBaseVo;
var HuanhuaInfoBaseVo = game.data.template.HuanhuaInfoBaseVo;
var HuanhuaUseBaseVo = game.data.template.HuanhuaUseBaseVo;
var InheritCostBaseVo = game.data.template.InheritCostBaseVo;
// ----------------------------------------Mission系列23----------------------------------------
var ShiGuangZhiXueConfigBaseVo = game.data.template.ShiGuangZhiXueConfigBaseVo;
var AcceptableTaskBaseVo = game.data.template.AcceptableTaskBaseVo;
var ArrowEffectBaseVo = game.data.template.ArrowEffectBaseVo;
var ArrowEffectSimpBaseVo = game.data.template.ArrowEffectSimpBaseVo;
var ActiveGiftBoxBaseVo = game.data.template.ActiveGiftBoxBaseVo;
var PointCardActiveGiftBox = game.data.template.PointCardActiveGiftBox;
var JingyingConfigBaseVo = game.data.template.JingyingConfigBaseVo;
var JingyingrenwuTaskBaseVo = game.data.template.JingyingrenwuTaskBaseVo;
var JingyingpingjiBaseVo = game.data.template.JingyingpingjiBaseVo;
var TasktrackingorderBaseVo = game.data.template.TasktrackingorderBaseVo;
var TikuBaseVo = game.data.template.TikuBaseVo;
var ActivityQuestionBaseVo = game.data.template.ActivityQuestionBaseVo;
var TaskNodeBaseVo = game.data.template.TaskNodeBaseVo;
var ActivityNewBaseVo = game.data.template.ActivityNewBaseVo;
var ActivityNewpayBaseVo = game.data.template.ActivityNewpayBaseVo;
var ActivityMapListBaseVo = game.data.template.ActivityMapListBaseVo;
var WeekListBaseVo = game.data.template.WeekListBaseVo;
var NewFunctionOpenBaseVo = game.data.template.NewFunctionOpenBaseVo;
var UICongigBaseVo = game.data.template.UICongigBaseVo;
var GuideCourseBaseVo = game.data.template.GuideCourseBaseVo;
var GuideCoursePayBaseVo = game.data.template.GuideCoursePayBaseVo;
var GuideCourseLabelBaseVo = game.data.template.GuideCourseLabelBaseVo;
var AnswerQuestionBaseVo = game.data.template.AnswerQuestionBaseVo;
// lqw
/**
* @Author: LinQiuWen
* @description:类的导入
*/
var SchoolInfoBaseVo = game.data.template.SchoolInfoBaseVo;
var CreateRoleConfigBaseVo = game.data.template.CreateRoleConfigBaseVo;
var AttrModDataBaseVo = game.data.template.AttrModDataBaseVo;
var ResMoneyConfigBaseVo = game.data.template.ResMoneyConfigBaseVo;
var SchoolMasterSkillInfoBaseVo = game.data.template.SchoolMasterSkillInfoBaseVo;
var AcupointInfoBaseVo = game.data.template.AcupointInfoBaseVo;
var AcupointLevelUpBaseVo = game.data.template.AcupointLevelUpBaseVo;
var AcupointLevelUpPayBaseVo = game.data.template.AcupointLevelUpPayBaseVo;
var SkillAcupointConfigBaseVo = game.data.template.SkillAcupointConfigBaseVo;
var SkillInfoConfigBaseVo = game.data.template.SkillInfoConfigBaseVo;
var CaddpointchangeBaseVo = game.data.template.CaddpointchangeBaseVo;
var AddPointResetItemConfigBaseVo = game.data.template.AddPointResetItemConfigBaseVo;
var EquipEffectConfigBaseVo = game.data.template.EquipEffectConfigBaseVo;
var ServiceLevelConfigBaseVo = game.data.template.ServiceLevelConfigBaseVo;
var ServiceExpConfigBaseVo = game.data.template.ServiceExpConfigBaseVo;
// game.xml
var ThreePvpWhiteMenuBaseVo = game.data.template.ThreePvpWhiteMenuBaseVo;
var CloginawardBaseVo = game.data.template.CloginawardBaseVo;
var BindTelAwardBaseVo = game.data.template.BindTelAwardBaseVo;
var PointCardBindTelAwardBaseVo = game.data.template.PointCardBindTelAwardBaseVo;
var WisdomTrialVillBaseVo = game.data.template.WisdomTrialVillBaseVo;
var ActivityAwardBaseVo = game.data.template.ActivityAwardBaseVo;
var CshouchonglibaoBaseVo = game.data.template.CshouchonglibaoBaseVo;
var CqiandaojiangliBaseVo = game.data.template.CqiandaojiangliBaseVo;
var CpaihangbangBaseVo = game.data.template.CpaihangbangBaseVo;
var CDeathNoteBaseVo = game.data.template.CDeathNoteBaseVo;
var CNotifyConfigBaseVo = game.data.template.CNotifyConfigBaseVo;
var CSchoolWheelBaseVo = game.data.template.CSchoolWheelBaseVo;
var CShareConfigBaseVo = game.data.template.CShareConfigBaseVo;
var CWinFrameSizeBaseVo = game.data.template.CWinFrameSizeBaseVo;
var CTTInfoBaseVo = game.data.template.CTTInfoBaseVo;
var CChangeSchoolCostBaseVo = game.data.template.CChangeSchoolCostBaseVo;
var CSpecialQuestConfigBaseVo = game.data.template.CSpecialQuestConfigBaseVo;
var CSchoolTaskBaseVo = game.data.template.CSchoolTaskBaseVo;
var CSchoolUseItemBaseVo = game.data.template.CSchoolUseItemBaseVo;
var CCircTaskItemCollectBaseVo = game.data.template.CCircTaskItemCollectBaseVo;
var CRepeatTaskBaseVo = game.data.template.CRepeatTaskBaseVo;
var CRepeatTaskChatBaseVo = game.data.template.CRepeatTaskChatBaseVo;
var CCircTaskItemFindBaseVo = game.data.template.CCircTaskItemFindBaseVo;
var CCircTaskPatrolBaseVo = game.data.template.CCircTaskPatrolBaseVo;
var CCircTaskPetCatchBaseVo = game.data.template.CCircTaskPetCatchBaseVo;
var CRenXingCircTaskCostBaseVo = game.data.template.CRenXingCircTaskCostBaseVo;
var CFubenTaskBaseVo = game.data.template.CFubenTaskBaseVo;
var CAnYeMaXiTuanConfBaseVo = game.data.template.CAnYeMaXiTuanConfBaseVo;
// shop.xml
var CGoodsBaseVo = game.data.template.CGoodsBaseVo;
var DCGoodsBaseVo = game.data.template.DCGoodsBaseVo;
var CMallShopBaseVo = game.data.template.CMallShopBaseVo;
var DCMallShopBaseVo = game.data.template.DCMallShopBaseVo;
var CPetShopBaseVo = game.data.template.CPetShopBaseVo;
var CNpcSaleBaseVo = game.data.template.CNpcSaleBaseVo;
var CCurrencyIconPathBaseVo = game.data.template.CCurrencyIconPathBaseVo;
var CCommerceFirstMenuBaseVo = game.data.template.CCommerceFirstMenuBaseVo;
var CCommerceSecondMenuBaseVo = game.data.template.CCommerceSecondMenuBaseVo;
var CMarketFirstTableBaseVo = game.data.template.CMarketFirstTableBaseVo;
var CMarketSecondTableBaseVo = game.data.template.CMarketSecondTableBaseVo;
var CMarketThreeTableBaseVo = game.data.template.CMarketThreeTableBaseVo;
var CQuickBuyBaseVo = game.data.template.CQuickBuyBaseVo;
var CShenShouShopBaseVo = game.data.template.CShenShouShopBaseVo;
var CMallShopTabNameBaseVo = game.data.template.CMallShopTabNameBaseVo;
//ljm
var AddCashluaBaseVo = game.data.template.AddCashluaBaseVo;
var ChargeReturnProfitBaseVo = game.data.template.ChargeReturnProfitBaseVo;
var RewardSystemBtnShowBaseVo = game.data.template.RewardSystemBtnShowBaseVo;
var VipInfoBaseVo = game.data.template.VipInfoBaseVo;
var RedPackConfigBaseVo = game.data.template.RedPackConfigBaseVo;
var BankConfigBaseVo = game.data.template.BankConfigBaseVo;
var CommonDayPayBaseVo = game.data.template.CommonDayPayBaseVo;
var MonthCardConfigBaseVo = game.data.template.MonthCardConfigBaseVo;
var FreeDisRewardConfigBaseVo = game.data.template.FreeDisRewardConfigBaseVo;
var QQGiftConfigBaseVo = game.data.template.QQGiftConfigBaseVo;
var HolidayGiftConfigBaseVo = game.data.template.HolidayGiftConfigBaseVo;
var GuoQingHuoYueGiftConfigBaseVo = game.data.template.GuoQingHuoYueGiftConfigBaseVo;
var GuoQingChargeGiftConfigBaseVo = game.data.template.GuoQingChargeGiftConfigBaseVo;
var HolidayTypeBaseVo = game.data.template.HolidayTypeBaseVo;
var HydReChargeRewardDataBaseVo = game.data.template.HydReChargeRewardDataBaseVo;
var HydScoreBaseVo = game.data.template.HydScoreBaseVo;
var MapConfigBaseVo = game.data.template.MapConfigBaseVo;
var MineAreainfoBaseVo = game.data.template.MineAreainfoBaseVo;
var ShowAreainfoBaseVo = game.data.template.ShowAreainfoBaseVo;
var WorldMapConfigBaseVo = game.data.template.WorldMapConfigBaseVo;
var WorldMapSmallHeadConfigBaseVo = game.data.template.WorldMapSmallHeadConfigBaseVo;
var ItemToPosBaseVo = game.data.template.ItemToPosBaseVo;
var StageInfoBaseVo = game.data.template.StageInfoBaseVo;
var SkillInfoBaseVo = game.data.template.SkillInfoBaseVo;
var BattleBackGroundBaseVo = game.data.template.BattleBackGroundBaseVo;
var FormationbaseConfigBaseVo = game.data.template.FormationbaseConfigBaseVo;
var FormationRestrainBaseVo = game.data.template.FormationRestrainBaseVo;
var BattleAIConfigBaseVo = game.data.template.BattleAIConfigBaseVo;
var RoleFighteAIBaseVo = game.data.template.RoleFighteAIBaseVo;
var game;
(function (game) {
    var data;
    (function (data_1) {
        var ProjTemplate = /** @class */ (function () {
            function ProjTemplate() {
            }
            ProjTemplate.loadTemplates = function () {
                //Laya.loader.load("common/data/temp/role.crolercolorconfig.bin",Handler.create(this,this.onloadedRoleRColorConfigComplete),null,Loader.BUFFER);
                //Laya.loader.load("common/data/temp/role.crolercolorconfig.bin",Handler.create(this,this.onloadedRoleRColorConfigComplete),null,Loader.BUFFER);
                //Laya.loader.load("common/data/temp/role.crolercolorconfig.bin",Handler.create(this,this.onloadedRoleRColorConfigComplete),null,Loader.BUFFER);
                //Laya.loader.load("common/data/temp/role.crolercolorconfig.bin",Handler.create(this,this.onloadedRoleRColorConfigComplete),null,Loader.BUFFER);
                //Laya.loader.load("common/data/temp/role.crolercolorconfig.bin",Handler.create(this,this.onloadedRoleRColorConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/role.crolercolorconfig.bin",Handler.create(this,this.onloadedRoleRColorConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/timer.cscheculedactivity.bin",Handler.create(this,this.onloadedCScheculedActivityConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/timer.ccheculedactivity.bin",Handler.create(this,this.onloadedCcheCuledActivityConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/timer.cscheculedactivitypay.bin",Handler.create(this,this.onloadedCScheculedActivitypayConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/gm.cbattlelist.bin",Handler.create(this,this.onloadedCbattlelistConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/chat.cbiaoqing.bin",Handler.create(this,this.onloadedCbiaoqingConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/chat.cbanwords.bin",Handler.create(this,this.onloadedCBanWordsConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/chat.cquickchat.bin",Handler.create(this,this.onloadedCquickchatConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/chat.cchatcolorconfig.bin",Handler.create(this,this.onloadedCchatColorConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/title.ctitleconfig.bin",Handler.create(this,this.onloadedCTitleConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/common.ccommon.bin",Handler.create(this,this.onloadedCCommonConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/common.caddressprovince.bin",Handler.create(this,this.onloadedCAddressProvinceConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/common.caddresscountry.bin",Handler.create(this,this.onloadedCAddressCountryConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/move.cautomovepath.bin",Handler.create(this,this.onloadedCAutoMovePathConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/move.cautomovepathpoint.bin",Handler.create(this,this.onloadedCAutoMovePathPointConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/message.cmessagetip.bin",Handler.create(this,this.onloadedCMessageTipConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/message.cstringres.bin",Handler.create(this,this.onloadedCStringResConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/EffectPath.ceffectpath.bin",Handler.create(this,this.onloadedCEffectPathConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/EffectPath.ceffectpathnonedrama.bin",Handler.create(this,this.onloadedCEffectPathNoneDramaConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/mission.cmainmissioninfo.bin",Handler.create(this,this.onloadedMissionCMainMissionInfoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/pet.cpetattr.bin",Handler.create(this,this.onloadedPetCPetAttrComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/pet.cpetattrmoddata.bin",Handler.create(this,this.onloadedPetCPetAttrModDataComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/pet.cpetnextexp.bin",Handler.create(this,this.onloadedPetCPetNextExpComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/pet.cpetresetpointconfig.bin",Handler.create(this,this.onloadedPetCPetResetPointConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/pet.cpetfeeditemlist.bin",Handler.create(this,this.onloadedPetCPetFeedItemListComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/pet.cpetdepotprice.bin",Handler.create(this,this.onloadedPetCPetDepotPriceComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/pet.cpetfeeditemattr.bin",Handler.create(this,this.onloadedPetCPetFeedItemAttrComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/pet.cpetfeeditemattr_pointcard.bin",Handler.create(this,this.onloadedPetCPetFeedItemAttr_PointCardComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/pet.cfooditemattr.bin",Handler.create(this,this.onloadedPetCFoodItemAttrComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/pet.cfooditemattr_pointcard.bin",Handler.create(this,this.onloadedPetCFoodItemAttr_PointCardComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/pet.cshenshouinc.bin",Handler.create(this,this.onloadedPetCShenShouIncComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/ainstance.cinstaceconfig.bin",Handler.create(this,this.onloadedInstanceCInstaceConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/ainstance.cbingfengwangzuomap.bin",Handler.create(this,this.onloadedInstanceCBingFengWangZuoMapComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/ainstance.cshiguangzhixueconfig.bin",Handler.create(this,this.onloadedInstanceCShiGuangZhiXueConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/ainstance.cshiguangzhixuenpc.bin",Handler.create(this,this.onloadedInstanceCShiGuangZhiXueNpcComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/ainstance.cparnternpcconfig.bin",Handler.create(this,this.onloadedInstanceCParnterNpcConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/ainstance.cenchoulunewconfig.bin",Handler.create(this,this.onloadedInstanceCEnChouLuNewConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/clan.cfactionyaofang.bin",Handler.create(this,this.onloadedClanCFactionYaoFangComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/clan.cfactionlobby.bin",Handler.create(this,this.onloadedClanCFactionLobbyComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/clan.cfactiongoldbank.bin",Handler.create(this,this.onloadedClanClanCFactionGoldBankComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/clan.cfactionhotel.bin",Handler.create(this,this.onloadedClanCFactionHotelComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/clan.cfactiondrugstore.bin",Handler.create(this,this.onloadedClanCFactionDrugStoreComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/clan.cfactionposition.bin",Handler.create(this,this.onloadedClanCFactionPositionComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/clan.cfactionfuli.bin",Handler.create(this,this.onloadedClanCFactionFuLiComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/clan.cruneset.bin",Handler.create(this,this.onloadedClanCRuneSetComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/clan.cfactionhuodong.bin",Handler.create(this,this.onloadedClanCFactionHuoDongComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/clan.cclanfight.bin",Handler.create(this,this.onloadedClanCClanFightComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/friends.cfriendgiveitem.bin",Handler.create(this,this.onloadedFriendGiveItemComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/friends.cfriendgivegift.bin",Handler.create(this,this.onloadedFriendGiveGiftComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/friends.crecruitreward.bin",Handler.create(this,this.onloadedRecruitRewardComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/friends.cmyrecruit.bin",Handler.create(this,this.onloadedMyRecruitComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/friends.cmyrecruitpay.bin",Handler.create(this,this.onloadedMyRecruitPayComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/friends.crecruitrewardpay.bin",Handler.create(this,this.onloadedRecruitRewardPayComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/friends.crecruitpath.bin",Handler.create(this,this.onloadedRecruitPathComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/friends.cmarryconf.bin",Handler.create(this,this.onloadedMarryConfComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/team.czhenfaeffect.bin",Handler.create(this,this.onloadedZhenFaEffectComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/team.cteamlistinfo.bin",Handler.create(this,this.onloadedTeamListInfoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/team.dcteamlistinfo.bin",Handler.create(this,this.onloadedDTeamListInfoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/effect.ceffectconfig.bin",Handler.create(this,this.onloadedEffectConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/effect.ccoloreffect.bin",Handler.create(this,this.onloadedColorEffectComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/effect.cuseitemeffect.bin",Handler.create(this,this.onloadedUseItemEffectComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/SysConfig.ctongpingsetting.bin",Handler.create(this,this.onloadedTongPingSettingComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/SysConfig.ctuisongsetting.bin",Handler.create(this,this.onloadedTuiSongSettingComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/SysConfig.cfpssetting.bin",Handler.create(this,this.onloadedFPSSettingComplete),null,Loader.BUFFER);		
                // Laya.loader.load("common/data/temp/SysConfig.csteploadtexsetting.bin",Handler.create(this,this.onloadedStepLoadTexSettingComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/SysConfig.cpcountfpssetting.bin",Handler.create(this,this.onloadedPCountFPSSettingComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/SysConfig.cbattlecommand.bin",Handler.create(this,this.onloadedBattleCommandComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/SysConfig.resolution.bin",Handler.create(this,this.onloadedResolutionComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/SysConfig.cgameconfig.bin",Handler.create(this,this.onloadedGameconfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/SysConfig.cgameconfigreset.bin",Handler.create(this,this.onloadedGameconfigResetComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/SysConfig.cgengxingonggao.bin",Handler.create(this,this.onloadedGengXinGongGaoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/buff.cbuffconfig.bin",Handler.create(this,this.onloadedBuffConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/treasuremap.cawardresultconfig.bin",Handler.create(this,this.onloadedCAwardResultConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/treasuremap.cawardresultconfigpay.bin",Handler.create(this,this.onloadedCAwardResultConfigPayComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/treasuremap.cawardConfig.bin",Handler.create(this,this.onloadedCAwardConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/treasuremap.cawardConfigPay.bin",Handler.create(this,this.onloadedCAwardConfigPayComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/treasuremap.ceventConfig.bin",Handler.create(this,this.onloadedCEventConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/treasuremap.ceventConfigpay.bin",Handler.create(this,this.onloadedCEventConfigpayComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/login.cloginTips.bin",Handler.create(this,this.onloadedCLoginTipsComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/login.cloginTipsDianKa.bin",Handler.create(this,this.onloadedCLoginTipsDianKaComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/login.cloginImages.bin",Handler.create(this,this.onloadedCLoginImagesComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/login.cexitgame.bin",Handler.create(this,this.onloadedCExitgameComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/triggers.ctriggerCondition.bin",Handler.create(this,this.onloadedCTriggerConditionDataComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.cnpcservicemapping.bin",Handler.create(this,this.onloadedCNpcServiceMappingComplete),null,Loader.BUFFER); 
                // Laya.loader.load("common/data/temp/npc.cnpcconfig.bin", Handler.create(this, this.onloadedCNPCConfigComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.cnpcinfo.bin", Handler.create(this, this.onloadedcNPCInfoComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.cnpcchat.bin", Handler.create(this, this.onloadedcNpcChatComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.cnpcserverconfig.bin", Handler.create(this, this.onloadedcNpcServerConfigComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.cmonsterconfig.bin", Handler.create(this, this.onloadedcMonsterConfigComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.cherobaseinfo.bin", Handler.create(this, this.onloadedcHeroBaseInfoComplete), null, Loader.BUFFER); 
                // Laya.loader.load("common/data/temp/npc.cluatest.bin", Handler.create(this, this.onloadedcCLuaTestComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.cnpcshape.bin", Handler.create(this, this.onloadedcCNpcShapeComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.cnpcinall.bin", Handler.create(this, this.onloadedcCNpcInAllComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.cscenenpcconfig.bin", Handler.create(this, this.onloadedcCSceneNPCConfigComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.cscenenpcbase.bin", Handler.create(this, this.onloadedCSceneNPCBaseComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.cactioninfo.bin", Handler.create(this, this.onloadedCActionInfoComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.cnpcshape.bin", Handler.create(this, this.onloadedCrideComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.crideitem.bin", Handler.create(this, this.onloadedCrideItemComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.cleitailevel.bin", Handler.create(this, this.onloadedCLeitaiLevelComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.cjingjirandomrole.bin", Handler.create(this, this.onloadedCJingjiRandomRoleComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/npc.cjingjirandomchat.bin", Handler.create(this, this.onloadedCJingjiRandomChatComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/role.crolercolorconfig.bin", Handler.create(this, this.onloadedRoleRColorConfigComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.citemattr.bin", Handler.create(this, this.onloadedItemAttrComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.citemattr_pointcard.bin", Handler.create(this, this.onloadedItemAttr_PointCardComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cequipiteminfo.bin", Handler.create(this, this.onloadedEquipIteminfoComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cequipaddattributelib.bin", Handler.create(this, this.onloadedEquipAddattributelibComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cequipaddattributerandomlib.bin", Handler.create(this, this.onloadedEquipAddattributerandomlibComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cattributedesconfig.bin", Handler.create(this, this.onloadedAttributeDesConfigComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.citemtype.bin", Handler.create(this, this.onloadedItemTypeComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cequipmakeinfo.bin", Handler.create(this, this.onloadedEquipMakeInfoComplete), null, Loader.BUFFER);								
                // Laya.loader.load("common/data/temp/item.cpetitemeffect.bin", Handler.create(this, this.onloadedPetItemEffectComplete), null, Loader.BUFFER);											
                // Laya.loader.load("common/data/temp/item.cpetitemeffect_pointcard.bin", Handler.create(this, this.onloadedPetItemEffect_PointCardtComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.cfoodanddrugeffect.bin", Handler.create(this, this.onloadedFoodAndDrugEffectComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.cfightdrugtype.bin", Handler.create(this, this.onloadedFightDrugTypeComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.cfoodanddrugeffect_pointcard.bin", Handler.create(this, this.onloadedFoodAndDrugEffect_PointCardComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.citembuffids.bin", Handler.create(this, this.onloadedItembuffidsComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.cgemeffect.bin", Handler.create(this, this.onloadedGemEffectComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.cgemeffect_pointcard.bin", Handler.create(this, this.onloadedGemEffect_PointCardComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.cgemtype.bin", Handler.create(this, this.onloadedGemTypeComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.cgroceryeffect.bin", Handler.create(this, this.onloadedGroceryEffectComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.cgroceryeffect_pointcard.bin", Handler.create(this, this.onloadedGroceryEffect_PointCardComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.cequipeffect.bin", Handler.create(this, this.onloadedEquipEffectComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.cequipeffect_pointcard.bin", Handler.create(this, this.onloadedEquipEffect_PointCardComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.ctaskrelative.bin", Handler.create(this, this.onloadedTaskRelativeComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.ctaskrelative_pointcard.bin", Handler.create(this, this.onloadedTaskRelative_PointCardComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.cequipitemattr.bin", Handler.create(this, this.onloadedEquipItemAttrComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.cequipitemattr_pointcard.bin", Handler.create(this, this.onloadedEquipItemAttr_PointCardComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.cpointcardequipgem.bin", Handler.create(this, this.onloadedPointCardEquipGemComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.citembuff.bin", Handler.create(this, this.onloadedItemBuffComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.cpresentconfig.bin", Handler.create(this, this.onloadedPresentConfigComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.cpresentconfigpay.bin", Handler.create(this, this.onloadedPresentConfigPayComplete), null, Loader.BUFFER);														
                // Laya.loader.load("common/data/temp/item.citemtypenamelist.bin", Handler.create(this, this.onloadedItemTypeNameListComplete), null, Loader.BUFFER);										
                // Laya.loader.load("common/data/temp/item.conlinegift.bin", Handler.create(this, this.onloadedonlinegiftComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cpetequipsuitbuff.bin", Handler.create(this, this.onloadedPetEquipSuitBuffComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cpetequiphecheng.bin", Handler.create(this, this.onloadedPetEquipHeChengComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cequipcombin.bin", Handler.create(this, this.onloadedCequipCombinComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.dcequipcombin.bin", Handler.create(this, this.onloadedDcequipCombinComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.citemusetip.bin", Handler.create(this, this.onloadedItemUseTipComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cdepottable.bin", Handler.create(this, this.onloadedDepottableComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cbagtable.bin", Handler.create(this, this.onloadedBagTableComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.citemtoitem.bin", Handler.create(this, this.onloadedItemToItemComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cequipposname.bin", Handler.create(this, this.onloadedEquipPosNameComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.ccomefrom.bin", Handler.create(this, this.onloadedComeFromComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cfoodanddrugformula.bin", Handler.create(this, this.onloadedFoodAndDrugFormulaComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cfumoeffectformula.bin", Handler.create(this, this.onloadedFumoEffectFormulaComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cdashispacegift.bin", Handler.create(this, this.onloadedDashiSpaceGiftComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cequiprefineinfo.bin", Handler.create(this, this.onloadedEquipRefineInfoComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cequiprefineinfo_pointcard.bin", Handler.create(this, this.onloadedEquipRefineInfo_PointCardComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cequiprefineskillinfo.bin", Handler.create(this, this.onloadedEquipRefineSkillInfoDataComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cequiprefineskillinfo_pointcard.bin", Handler.create(this, this.onloadedEquipRefineSkillInfo_PointCardComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/item.cexpfactoriteminfo.bin", Handler.create(this, this.onloadedExpFactorItemInfoComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.cfriendskill.bin", Handler.create(this, this.onloadedFriendSkillComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.cequipskill.bin", Handler.create(this, this.onloadedEquipSkillComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.cequipskillinfo.bin", Handler.create(this, this.onloadedEquipSkillInfoComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.cschoolskillitem.bin", Handler.create(this, this.onloadedSchoolSkillitemComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.cpetskillupgrade.bin", Handler.create(this, this.onloadedPetSkillupgradeComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.cpetskilleffect.bin", Handler.create(this, this.onloadedPetSkillEffectComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.cskillitem.bin", Handler.create(this, this.onloadedSkillitemComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.cschoolskill.bin", Handler.create(this, this.onloadedSchoolSkillComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.cpetskillconfig.bin", Handler.create(this, this.onloadedPetSkillConfigComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.csblevellimit.bin", Handler.create(this, this.onloadedSBLevelLimitComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.cskilltypeconfig.bin", Handler.create(this, this.onloadedSkillTypeConfigComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.cskillconfig.bin", Handler.create(this, this.onloadedSkillConfigComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.clifeskill.bin", Handler.create(this, this.onloadedLifeSkillComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.clifeskillcost.bin", Handler.create(this, this.onloadedLifeSkillCostComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.clifeskillcostpay.bin", Handler.create(this, this.onloadedLifeSkillCostPayComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.cparticeskilllevelup.bin", Handler.create(this, this.onloadedParticeSkillLevelupComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.cpointcardparticeskilllevelup.bin", Handler.create(this, this.onloadedPointCardParticeSkillLevelupComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.cpracticeitemexp.bin", Handler.create(this, this.onloadedPracticeItemExpComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.chuanhuainfo.bin", Handler.create(this, this.onloadedHuanhuaInfoComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.chuanhuause.bin", Handler.create(this, this.onloadedHuanhuaUseComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/skill.cinheritcost.bin", Handler.create(this, this.onloadedInheritCostComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/mission.cshiguangzhixueconfig.bin", Handler.create(this, this.onloadedShiGuangZhiXueConfigComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/mission.cacceptabletask.bin", Handler.create(this, this.onloadedAcceptableTaskComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/mission.carroweffect.bin", Handler.create(this, this.onloadedArrowEffectComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/mission.carroweffectsimp.bin", Handler.create(this, this.onloadedArrowEffectSimpComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/mission.cactivegiftbox.bin", Handler.create(this, this.onloadedActiveGiftBoxComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/mission.cpointcardactivegiftbox.bin", Handler.create(this, this.onloadedPointCardActiveGiftBoxComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/mission.cjingyingconfig.bin", Handler.create(this, this.onloadedJingyingConfigComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/mission.cjingyingrenwutask.bin", Handler.create(this, this.onloadedJingyingrenwuTaskComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/mission.cjingyingpingji.bin", Handler.create(this, this.onloadedJingyingpingjiComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/mission.ctasktrackingorder.bin", Handler.create(this, this.onloadedTasktrackingorderComplete), null, Loader.BUFFER);
                // Laya.loader.load("common/data/temp/mission.ctiku.bin", Handler.create(this, this.onloadedTikuComplete), null, Loader.BUFFER);			
                // Laya.loader.load("common/data/temp/mission.cactivityquestion.bin", Handler.create(this, this.onloadedActivityQuestionComplete), null, Loader.BUFFER);			
                // Laya.loader.load("common/data/temp/mission.ctasknode.bin", Handler.create(this, this.onloadedTaskNodeComplete), null, Loader.BUFFER);			
                // Laya.loader.load("common/data/temp/mission.cactivitynew.bin", Handler.create(this, this.onloadedActivityNewComplete), null, Loader.BUFFER);			
                // Laya.loader.load("common/data/temp/mission.cactivitynewpay.bin", Handler.create(this, this.onloadedActivityNewpayComplete), null, Loader.BUFFER);			
                // Laya.loader.load("common/data/temp/mission.cactivitymaplist.bin", Handler.create(this, this.onloadedActivityMapListComplete), null, Loader.BUFFER);			
                // Laya.loader.load("common/data/temp/mission.cweeklist.bin", Handler.create(this, this.onloadedWeekListComplete), null, Loader.BUFFER);			
                // Laya.loader.load("common/data/temp/mission.cnewfunctionopen.bin", Handler.create(this, this.onloadedNewFunctionOpenComplete), null, Loader.BUFFER);			
                // Laya.loader.load("common/data/temp/mission.cuicongig.bin", Handler.create(this, this.onloadedUICongigComplete), null, Loader.BUFFER);			
                // Laya.loader.load("common/data/temp/mission.cguidecourse.bin", Handler.create(this, this.onloadedGuideCourseComplete), null, Loader.BUFFER);			
                // Laya.loader.load("common/data/temp/mission.cguidecoursepay.bin", Handler.create(this, this.onloadedGuideCoursePayComplete), null, Loader.BUFFER);			
                // Laya.loader.load("common/data/temp/mission.cguidecourselabel.bin", Handler.create(this, this.onloadedGuideCourseLabelComplete), null, Loader.BUFFER);			
                // Laya.loader.load("common/data/temp/mission.answerquestion.bin", Handler.create(this, this.onloadedAnswerQuestionComplete), null, Loader.BUFFER);
                // /**
                // * @Author: LinQiuWen
                // * @description:加载数据
                // */
                // Laya.loader.load("common/data/temp/role.crolercolorconfig.bin",Handler.create(this,this.onloadedRoleRColorConfigComplete),null,Loader.BUFFER);
                // // role.xml
                // Laya.loader.load("common/data/temp/role.schoolinfo.bin",Handler.create(this,this.onloadedSchoolInfoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/role.createroleconfig.bin",Handler.create(this,this.onloadedCreateRoleConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/role.cattrmoddata.bin",Handler.create(this,this.onloadedAttrModDataComplete),null,Loader.BUFFER);	//数据不对
                // Laya.loader.load("common/data/temp/role.cresmoneyconfig.bin",Handler.create(this,this.onloadedResMoneyConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/role.schoolmasterskillinfo.bin",Handler.create(this,this.onloadedSchoolMasterSkillInfoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/role.acupointinfo.bin",Handler.create(this,this.onloadedAcupointInfoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/role.acupointlevelup.bin",Handler.create(this,this.onloadedAcupointLevelUpComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/role.acupointleveluppay.bin",Handler.create(this,this.onloadedAcupointLevelUpPayComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/role.skillacupointconfig.bin",Handler.create(this,this.onloadedSkillAcupointConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/role.skillinfoconfig.bin",Handler.create(this,this.onloadedSkillInfoConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/role.caddpointchange.bin",Handler.create(this,this.onloadedCaddpointchangeComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/role.caddpointresetitemconfig.bin",Handler.create(this,this.onloadedAddPointResetItemConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/role.cequipeffectconfig.bin",Handler.create(this,this.onloadedEquipEffectConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/role.cservicelevelconfig.bin",Handler.create(this,this.onloadedServiceLevelConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/role.cserviceexpconfig.bin",Handler.create(this,this.onloadedServiceExpConfigComplete),null,Loader.BUFFER);
                // /**game.xml */
                // Laya.loader.load("common/data/temp/game.threepvpwhitemenu.bin",Handler.create(this,this.onloadedThreePvpWhiteMenuComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cloginaward.bin",Handler.create(this,this.onloadedCloginawardComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cbindtelaward.bin",Handler.create(this,this.onloadedBindTelAwardComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cpointcardbindtelaward.bin",Handler.create(this,this.onloadedPointCardBindTelAwardComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.wisdomtrialvill.bin",Handler.create(this,this.onloadedWisdomTrialVillComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.wisdomtrialstate.bin",Handler.create(this,this.onloadedWisdomTrialStateComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.wisdomtrialvillpay.bin",Handler.create(this,this.onloadedWisdomTrialVillPayComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.wisdomtrialprovpay.bin",Handler.create(this,this.onloadedWisdomTrialProvPayComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.wisdomtrialstatepay.bin",Handler.create(this,this.onloadedWisdomTrialStatePayComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cactivityaward.bin.bin",Handler.create(this,this.onloadedActivityAwardComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cshouchonglibao.bin",Handler.create(this,this.onloadedCshouchonglibaoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cshouchonglibaopay.bin",Handler.create(this,this.onloadedCshouchonglibaopayComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cqiandaojiangli.bin",Handler.create(this,this.onloadedCqiandaojiangliComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cpaihangbang.bin",Handler.create(this,this.onloadedCpaihangbangComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cdeathnote.bin",Handler.create(this,this.onloadedCDeathNoteComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cnotifyconfig.bin",Handler.create(this,this.onloadedCNotifyConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cschoolwheel.bin",Handler.create(this,this.onloadedCSchoolWheelComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cshareconfig.bin",Handler.create(this,this.onloadedCShareConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cshareconfigpay.bin",Handler.create(this,this.onloadedCShareConfigPayComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cwinframesize.bin",Handler.create(this,this.onloadedCWinFrameSizeComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cttinfo.bin",Handler.create(this,this.onloadedCTTInfoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cttinfodk.bin",Handler.create(this,this.onloadedCTTInfoDKComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/game.cchangeschoolcost.bin",Handler.create(this,this.onloadedCChangeSchoolCostComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/circletask.cspecialquestconfig.bin",Handler.create(this,this.onloadedCSpecialQuestConfigComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/circletask.cschooltask.bin",Handler.create(this,this.onloadedCSchoolTaskComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/circletask.cschooluseitem.bin",Handler.create(this,this.onloadedCSchoolUseItemComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/circletask.cCircTaskItemCollect.bin",Handler.create(this,this.onloadedCCircTaskItemCollectComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/circletask.crepeattask.bin",Handler.create(this,this.onloadedCRepeatTaskComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/circletask.crepeattaskchat.bin",Handler.create(this,this.onloadedCRepeatTaskChatComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/circletask.ccirctaskitemfind.bin",Handler.create(this,this.onloadedCCircTaskItemFindComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/circletask.ccirctaskpatrol.bin",Handler.create(this,this.onloadedCCircTaskPatrolComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/circletask.ccirctaskpetcatch.bin",Handler.create(this,this.onloadedCCircTaskPetCatchComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/circletask.crenxingcirctaskcost.bin",Handler.create(this,this.onloadedCRenXingCircTaskCostComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/circletask.cfubentask.bin",Handler.create(this,this.onloadedCFubenTaskComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/circletask.canyemaxituanconf.bin",Handler.create(this,this.onloadedCAnYeMaXiTuanConfComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.cgoods.bin",Handler.create(this,this.onloadedCGoodsComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.dcgoods.bin",Handler.create(this,this.onloadedDCGoodsComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.cmallshop.bin",Handler.create(this,this.onloadedCMallShopComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.dcmallshop.bin",Handler.create(this,this.onloadedDCMallShopComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.cpetshop.bin",Handler.create(this,this.onloadedCPetShopComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.cnpcsale.bin",Handler.create(this,this.onloadedCNpcSaleComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.dcnpcsale.bin",Handler.create(this,this.onloadedDCNpcSaleComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.ccurrencyiconpath.bin",Handler.create(this,this.onloadedCCurrencyIconPathComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.ccommercefirstmenu.bin",Handler.create(this,this.onloadedCCommerceFirstMenuComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.dccommercefirstmenu.bin",Handler.create(this,this.onloadedDCCommerceFirstMenuComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.ccommercesecondmenu.bin",Handler.create(this,this.onloadedCCommerceSecondMenuComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.dccommercesecondmenu.bin",Handler.create(this,this.onloadedDCCommerceSecondMenuComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.cmarketfirsttable.bin",Handler.create(this,this.onloadedCMarketFirstTableComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.dcmarketfirsttable.bin",Handler.create(this,this.onloadedDCMarketFirstTableComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.cmarketsecondtable.bin",Handler.create(this,this.onloadedCMarketSecondTableComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.dcmarketsecondtable.bin",Handler.create(this,this.onloadedDCMarketSecondTableComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.cmarketthreetable.bin",Handler.create(this,this.onloadedCMarketThreeTableComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.dcmarketthreetable.bin",Handler.create(this,this.onloadedDCMarketThreeTableComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.cquickbuy.bin",Handler.create(this,this.onloadedCQuickBuyComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.cquickbuypay.bin",Handler.create(this,this.onloadedCQuickBuyPayComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.cshenshoushop.bin",Handler.create(this,this.onloadedCShenShouShopComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.cmallshoptabname.bin",Handler.create(this,this.onloadedCMallShopTabNameComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/shop.dcmallshoptabname.bin",Handler.create(this,this.onloadedDCMallShopTabNameComplete),null,Loader.BUFFER);
                // //ljm
                // Laya.loader.load("common/data/temp/fushi.caddcashlua.bin",Handler.create(this,this.onloadedAddCashluaComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.caddcashpcardlua.bin",Handler.create(this,this.onloadedAddCashluaComplete1),null,Loader.BUFFER);  
                // Laya.loader.load("common/data/temp/fushi.cchargereturnprofit.bin",Handler.create(this,this.onloadedChargereturnProfitComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.crewardsystembtnshow.bin",Handler.create(this,this.onloadedRewardSystemBtnShowComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.cvipinfo.bin",Handler.create(this,this.onloadedVipInfoBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.credpackconfig.bin",Handler.create(this,this.onloadedRedPackConfigBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.cbankconfig.bin",Handler.create(this,this.onloadedBankConfigBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.ccommondaypay.bin",Handler.create(this,this.onloadedCommonDayPayBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.cmonthcardconfig.bin",Handler.create(this,this.onloadedMonthCardConfigBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.cfreedisrewardconfig.bin",Handler.create(this,this.onloadedFreeDisRewardConfigBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.cfreedisrewardconfigpay.bin",Handler.create(this,this.onloadedFreeDisRewardConfigpayBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.cqqgiftconfig.bin",Handler.create(this,this.onloadedQQGiftConfigBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.cqqgiftconfigpay.bin",Handler.create(this,this.onloadedQQGiftConfigPayBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.cholidaygiftconfig.bin",Handler.create(this,this.onloadedHolidayGiftConfigBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.cholidaygiftconfigpay.bin",Handler.create(this,this.onloadedHolidayGiftConfigPayBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.cguoqinghuoyuegiftconfigpay.bin",Handler.create(this,this.onloadedGuoQingHuoYueGiftConfigPayBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.cguoqingchargegiftconfig.bin",Handler.create(this,this.onloadedGuoQingChargeGiftConfigBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.cguoqingchargegiftconfigpay.bin",Handler.create(this,this.onloadedGuoQingChargeGiftConfigPayBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.cholidaytype.bin",Handler.create(this,this.onloadedHolidayTypeBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/fushi.cholidaytypepay.bin",Handler.create(this,this.onloadedHolidayTypePayBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/activity.chydrechargerewarddata.bin",Handler.create(this,this.onloadedHydReChargeRewardDataBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/activity.chydrechargerewarddatadk.bin",Handler.create(this,this.onloadedHydReChargeRewardDataDKBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/activity.chydscore.bin",Handler.create(this,this.onloadedHydScoreBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/activity.chydscoredk.bin",Handler.create(this,this.onloadedHydScoreDKBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/map.cmapconfig.bin",Handler.create(this,this.onloadedMapConfigBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/map.cmineareainfo.bin",Handler.create(this,this.onloadedMineAreainfoBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/map.cshowareainfo.bin",Handler.create(this,this.onloadedShowAreainfoBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/map.cworldmapconfig.bin",Handler.create(this,this.onloadedWorldMapConfigBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/map.cworldmapsmallheadconfig.bin",Handler.create(this,this.onloadedWorldMapSmallHeadConfigBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/map.citemtopos.bin",Handler.create(this,this.onloadedItemToPosBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/battle.cstageinfo.bin",Handler.create(this,this.onloadedStageInfoBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/battle.cstageinfo2.bin",Handler.create(this,this.onloadedStageInfo2BaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/battle.cskillinfo.bin",Handler.create(this,this.onloadedSkillInfoBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/battle.cbattlebackground.bin",Handler.create(this,this.onloadedBattleBackGroundBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/battle.cbattlebackmusic.bin",Handler.create(this,this.onloadedBattleBackMusicBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/battle.cformationbaseconfig.bin",Handler.create(this,this.onloadedFormationbaseConfigBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/battle.cformationrestrain.bin",Handler.create(this,this.onloadedFormationRestrainBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/battle.cbattleaiconfig.bin",Handler.create(this,this.onloadedBattleAIConfigBaseVoComplete),null,Loader.BUFFER);
                // Laya.loader.load("common/data/temp/battle.crolefighteai.bin",Handler.create(this,this.onloadedRoleFighteAIBaseVoComplete),null,Loader.BUFFER);
            };
            ProjTemplate.onloadedRoleRColorConfigComplete = function () {
                console.log("RoleRColorConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.crolercolorconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.roleRColorModelConfigData, RoleRColorConfigBaseVo, "id");
                // console.log("RoleRColorModel.configData:",this.roleRColorModelConfigData);
            };
            ProjTemplate.onloadedCScheculedActivityConfigComplete = function () {
                console.log("CScheculedActivity表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/timer.cscheculedactivity.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cscheculedActivityConfigData, CScheculedActivityBaseVo, "id");
                // console.log("RoleRColorModel.configData:",this.cscheculedActivityConfigData);
            };
            ProjTemplate.onloadedCcheCuledActivityConfigComplete = function () {
                console.log("CcheculedActivity表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/timer.ccheculedactivity.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.ccheculedActivityConfigData, CcheculedActivityBaseVo, "id");
                // console.log("RoleRColorModel.configData:",this.ccheculedActivityConfigData);
            };
            ProjTemplate.onloadedCScheculedActivitypayConfigComplete = function () {
                console.log("CScheculedActivitypay表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/timer.cscheculedactivitypay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cscheculedActivitypayConfigData, CScheculedActivitypayBaseVo, "id");
                //console.log("RoleRColorModel.configData:",this.cscheculedActivitypayConfigData);
            };
            ProjTemplate.onloadedCbattlelistConfigComplete = function () {
                console.log("Cbattlelist表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/gm.cbattlelist.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cbattlelistConfigData, CbattlelistBaseVo, "id");
                //console.log("RoleRColorModel.configData:",this.cbattlelistConfigData);
            };
            ProjTemplate.onloadedCbiaoqingConfigComplete = function () {
                console.log("Cbiaoqing表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/chat.cbiaoqing.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cbiaoqingConfigData, CbiaoqingBaseVo, "id");
                //console.log("RoleRColorModel.configData:",this.cbiaoqingConfigData);
            };
            ProjTemplate.onloadedCBanWordsConfigComplete = function () {
                console.log("CBanWords表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/chat.cbanwords.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cbanWordsConfigData, CBanWordsBaseVo, "id");
                //console.log("RoleRColorModel.configData:",this.cbanWordsConfigData);
            };
            ProjTemplate.onloadedCquickchatConfigComplete = function () {
                console.log("Cquickchat表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/chat.cquickchat.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cquickchatConfigData, CquickchatBaseVo, "id");
                //	console.log("RoleRColorModel.configData:",this.cquickchatConfigData);
            };
            ProjTemplate.onloadedCchatColorConfigComplete = function () {
                console.log("CchatColor表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/chat.cchatcolorconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cchatColorConfigData, CchatColorConfigBaseVo, "id");
                //console.log("RoleRColorModel.configData:",this.cchatColorConfigData);
            };
            ProjTemplate.onloadedCTitleConfigComplete = function () {
                console.log("CTitle表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/title.ctitleconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.ctitleConfigData, CTitleConfigBaseVo, "id");
                //console.log("RoleRColorModel.configData:",this.ctitleConfigData);
            };
            ProjTemplate.onloadedCCommonConfigComplete = function () {
                console.log("CCommon表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/common.ccommon.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.ccommonConfigData, CCommonBaseVo, "id");
                //console.log("RoleRColorModel.configData:",this.ccommonConfigData);
            };
            ProjTemplate.onloadedCAddressProvinceConfigComplete = function () {
                console.log("CAddressProvince表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/common.caddressprovince.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.caddressProvinceConfigData, CAddressProvinceBaseVo, "id");
                //console.log("RoleRColorModel.configData:",this.caddressProvinceConfigData);
            };
            ProjTemplate.onloadedCAddressCountryConfigComplete = function () {
                console.log("CAddressCountry表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/common.caddresscountry.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.caddressCountryConfigData, CAddressCountryBaseVo, "id");
                //console.log("RoleRColorModel.configData:",this.caddressCountryConfigData);
            };
            ProjTemplate.onloadedCAutoMovePathConfigComplete = function () {
                console.log("CAutoMovePath表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/move.cautomovepath.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cautoMovePathConfigData, CAutoMovePathBaseVo, "id");
                //	console.log("RoleRColorModel.configData:",this.cautoMovePathConfigData);
            };
            ProjTemplate.onloadedCAutoMovePathPointConfigComplete = function () {
                console.log("CAutoMovePathPoint表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/move.cautomovepathpoint.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cautoMovePathPointConfigData, CAutoMovePathPointBaseVo, "id");
                //	console.log("RoleRColorModel.configData:",this.cautoMovePathPointConfigData);
            };
            ProjTemplate.onloadedCMessageTipConfigComplete = function () {
                console.log("CMessageTip表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/message.cmessagetip.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cmessageTipConfigData, CMessageTipBaseVo, "id");
                //	console.log("RoleRColorModel.configData:",this.cmessageTipConfigData);
            };
            ProjTemplate.onloadedCStringResConfigComplete = function () {
                console.log("CStringRes表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/message.cstringres.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cstringResConfigData, CStringResBaseVo, "id");
                //	console.log("RoleRColorModel.configData:",this.cstringResConfigData);
            };
            ProjTemplate.onloadedCEffectPathConfigComplete = function () {
                console.log("CEffectPath表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/EffectPath.ceffectpath.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.ceffectPathConfigData, CEffectPathBaseVo, "id");
                //console.log("RoleRColorModel.configData:",this.ceffectPathConfigData);
            };
            ProjTemplate.onloadedCEffectPathNoneDramaConfigComplete = function () {
                console.log("CEffectPathNoneDrama表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/EffectPath.ceffectpathnonedrama.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.ceffectPathNoneDramaConfigData, CEffectPathNoneDramaBaseVo, "id");
                //	console.log("RoleRColorModel.configData:",this.ceffectPathNoneDramaConfigData);
            };
            //z主任务配置
            ProjTemplate.onloadedMissionCMainMissionInfoComplete = function () {
                console.log("MissionCMainMissionInfo表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cmainmissioninfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.missionCMainMissionInfoData, MissionCMainMissionInfoBaseVo, "id");
                //console.log("missionCMainMissionInfoData:",this.missionCMainMissionInfoData);
            };
            //c宠物基本数据
            ProjTemplate.onloadedPetCPetAttrComplete = function () {
                console.log("PetCPetAttr表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetattr.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petCPetAttrData, PetCPetAttrBaseVo, "id");
                //console.log("petCPetAttrData:",this.petCPetAttrData);
            };
            //c宠物一级属性转换表
            ProjTemplate.onloadedPetCPetAttrModDataComplete = function () {
                console.log("PetCPetAttrModData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetattrmoddata.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petCPetAttrModDataData, PetCPetAttrModDataBaseVo, "id");
                //console.log("petCPetAttrModDataData:",this.petCPetAttrModDataData);
            };
            //c宠物升级经验表
            ProjTemplate.onloadedPetCPetNextExpComplete = function () {
                console.log("PetCPetNextExp表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetnextexp.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petCPetNextExpData, PetCPetNextExpBaseVo, "id");
                //console.log("petCPetNextExpData:",this.petCPetNextExpData);
            };
            //c宠物属性重置消耗
            ProjTemplate.onloadedPetCPetResetPointConfigComplete = function () {
                console.log("PetCPetResetPointConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetresetpointconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petCPetResetPointConfigData, PetCPetResetPointConfigBaseVo, "id");
                //	console.log("petCPetResetPointConfigData:",this.petCPetResetPointConfigData);
            };
            //c宠物培养显示表
            ProjTemplate.onloadedPetCPetFeedItemListComplete = function () {
                console.log("PetCPetFeedItemList表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetfeeditemlist.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petCPetFeedItemListData, PetCPetFeedItemListBaseVo, "id");
                //	console.log("petCPetFeedItemListData:",this.petCPetFeedItemListData);
            };
            //c宠物仓库扩充价格
            ProjTemplate.onloadedPetCPetDepotPriceComplete = function () {
                console.log("PetCPetDepotPrice表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetdepotprice.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petCPetDepotPriceData, PetCPetDepotPriceBaseVo, "id");
                //	console.log("petCPetDepotPriceData:",this.petCPetDepotPriceData);
            };
            //c宠物物品表
            ProjTemplate.onloadedPetCPetFeedItemAttrComplete = function () {
                console.log("PetCPetFeedItemAttr表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetfeeditemattr.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petCPetFeedItemAttrData, PetCPetFeedItemAttrBaseVo, "id");
                //	console.log("petCPetFeedItemAttrData:",this.petCPetFeedItemAttrData);
            };
            //DMT3宠物物品表
            ProjTemplate.onloadedPetCPetFeedItemAttr_PointCardComplete = function () {
                console.log("PetCPetFeedItemAttr_PointCard表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetfeeditemattr_pointcard.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petCPetFeedItemAttr_PointCardData, PetCPetFeedItemAttrBaseVo, "id");
                //	console.log("petCPetFeedItemAttr_PointCardData:",this.petCPetFeedItemAttr_PointCardData);
            };
            //s食品表
            ProjTemplate.onloadedPetCFoodItemAttrComplete = function () {
                console.log("PetCFoodItemAttr表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cfooditemattr.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petCFoodItemAttrData, PetCFoodItemAttrBaseVo, "id");
                //console.log("petCFoodItemAttrData:",this.petCFoodItemAttrData);
            };
            //DMT3食品表
            ProjTemplate.onloadedPetCFoodItemAttr_PointCardComplete = function () {
                console.log("PetCFoodItemAttr_PointCard表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cfooditemattr_pointcard.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petCFoodItemAttr_PointCardData, PetCFoodItemAttrBaseVo, "id");
                //	console.log("petCFoodItemAttr_PointCardData:",this.petCFoodItemAttr_PointCardData);
            };
            //c宠物灵兽提升
            ProjTemplate.onloadedPetCShenShouIncComplete = function () {
                console.log("PetCShenShouInc表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cshenshouinc.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petCShenShouIncData, PetCShenShouIncBaseVo, "id");
                //	console.log("petCShenShouIncData:",this.petCShenShouIncData);
            };
            //公会副本参数
            ProjTemplate.onloadedInstanceCInstaceConfigComplete = function () {
                console.log("InstanceCInstaceConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/instance.cinstaceconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.instanceCInstaceConfigData, InstanceCInstaceConfigBaseVo, "id");
                //	console.log("instanceCInstaceConfigData:",this.instanceCInstaceConfigData);
            };
            //b冰静态地图
            ProjTemplate.onloadedInstanceCBingFengWangZuoMapComplete = function () {
                console.log("InstanceCBingFengWangZuoMap表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/instance.cbingfengwangzuomap.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.instanceCBingFengWangZuoMapData, InstanceCBingFengWangZuoMapBaseVo, "id");
                //	console.log("instanceCBingFengWangZuoMapData:",this.instanceCBingFengWangZuoMapData);
            };
            //精英副本任务
            ProjTemplate.onloadedInstanceCShiGuangZhiXueConfigComplete = function () {
                console.log("InstanceCShiGuangZhiXueConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/instance.cshiguangzhixueconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.instanceCShiGuangZhiXueConfigData, InstanceCShiGuangZhiXueConfigBaseVo, "id");
                //console.log("instanceCShiGuangZhiXueConfigData:",this.instanceCShiGuangZhiXueConfigData);
            };
            //精英副本刷新
            ProjTemplate.onloadedInstanceCShiGuangZhiXueNpcComplete = function () {
                console.log("InstanceCShiGuangZhiXueNpc表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/instance.cshiguangzhixuenpc.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.instanceCShiGuangZhiXueNpcData, InstanceCShiGuangZhiXueNpcBaseVo, "id");
                console.log("instanceCShiGuangZhiXueNpcData:", this.instanceCShiGuangZhiXueNpcData);
            };
            //z战斗NPC_协战_28xxx
            ProjTemplate.onloadedInstanceCParnterNpcConfigComplete = function () {
                console.log("InstanceCParnterNpcConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/instance.cparnternpcconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.instanceCParnterNpcConfigData, InstanceCParnterNpcConfigBaseVo, "id");
                //console.log("instanceCParnterNpcConfigData:",this.instanceCParnterNpcConfigData);
            };
            //b冰封王座配置表新
            ProjTemplate.onloadedInstanceCEnChouLuNewConfigComplete = function () {
                console.log("InstanceCEnChouLuNewConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/instance.cenchoulunewconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.instanceCEnChouLuNewConfigData, InstanceCEnChouLuNewConfigBaseVo, "id");
                //	console.log("instanceCEnChouLuNewConfigData:",this.instanceCEnChouLuNewConfigData);
            };
            //y药品购买配置
            ProjTemplate.onloadedClanCFactionYaoFangComplete = function () {
                console.log("ClanCFactionYaoFang表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionyaofang.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.clanCFactionYaoFangData, ClanCFactionYaoFangBaseVo, "id");
                //	console.log("clanCFactionYaoFangData:",this.clanCFactionYaoFangData);
            };
            //g公会大厅数据表
            ProjTemplate.onloadedClanCFactionLobbyComplete = function () {
                console.log("ClanCFactionLobby表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionlobby.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.clanCFactionLobbyData, ClanCFactionLobbyBaseVo, "id");
                //	console.log("clanCFactionLobbyData:",this.clanCFactionLobbyData);
            };
            //g公会大厅数据表
            ProjTemplate.onloadedClanClanCFactionGoldBankComplete = function () {
                console.log("ClanCFactionGoldBank表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactiongoldbank.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.clanCFactionGoldBankData, ClanCFactionGoldBankBaseVo, "id");
                //	console.log("clanCFactionGoldBankData:",this.clanCFactionGoldBankData);
            };
            //g公会旅馆数据表
            ProjTemplate.onloadedClanCFactionHotelComplete = function () {
                console.log("ClanCFactionHotel表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionhotel.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.clanCFactionHotelData, ClanCFactionHotelBaseVo, "id");
                //	console.log("clanCFactionHotelData:",this.clanCFactionHotelData);
            };
            //g公会药房数据表
            ProjTemplate.onloadedClanCFactionDrugStoreComplete = function () {
                console.log("ClanCFactionDrugStore表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactiondrugstore.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.clanCFactionDrugStoreData, ClanCFactionDrugStoreBaseVo, "id");
                //	console.log("clanCFactionDrugStoreData:",this.clanCFactionDrugStoreData);
            };
            //g公会职务以及权限表
            ProjTemplate.onloadedClanCFactionPositionComplete = function () {
                console.log("ClanCFactionPosition表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionposition.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.clanCFactionPositionData, ClanCFactionPositionBaseVo, "id");
                //	console.log("clanCFactionPositionData:",this.clanCFactionPositionData);
            };
            //g公会福利表
            ProjTemplate.onloadedClanCFactionFuLiComplete = function () {
                console.log("ClanCFactionFuLi表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionfuli.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.clanCFactionFuLiData, ClanCFactionFuLiBaseVo, "id");
                //	console.log("clanCFactionFuLiData:",this.clanCFactionFuLiData);
            };
            //g公会符文配置
            ProjTemplate.onloadedClanCRuneSetComplete = function () {
                console.log("ClanCRuneSet表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cruneset.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.clanCRuneSetData, ClanCRuneSetBaseVo, "id");
                //	console.log("clanCRuneSetData:",this.clanCRuneSetData);
            };
            //g公会活动表
            ProjTemplate.onloadedClanCFactionHuoDongComplete = function () {
                console.log("ClanCFactionHuoDong表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionhuodong.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.clanCFactionHuoDongData, ClanCFactionHuoDongBaseVo, "id");
                //	console.log("clanCFactionHuoDongData:",this.clanCFactionHuoDongData);
            };
            //工会战
            ProjTemplate.onloadedClanCClanFightComplete = function () {
                console.log("ClanCClanFight表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/clan.cclanfight.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.clanCClanFightData, ClanCClanFightBaseVo, "id");
                //	console.log("clanCClanFightData:",this.clanCClanFightData);
            };
            //c持续性buff表
            ProjTemplate.onloadedBuffConfigComplete = function () {
                console.log("BuffConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/buff.cbuffconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.BuffConfigData, BuffConfigBaseVo, "id");
                //	console.log("BuffConfig.configData:",this.BuffConfigData);
            };
            //g更新公告
            ProjTemplate.onloadedGengXinGongGaoComplete = function () {
                console.log("GengXinGongGao表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.cgengxingonggao.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.GengXinGongGaoData, GengXinGongGaoBaseVo, "id");
                //	console.log("GengXinGongGao.configData:",this.GengXinGongGaoData);
            };
            //x系统设置重置表
            ProjTemplate.onloadedGameconfigResetComplete = function () {
                console.log("GameconfigReset表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.cgameconfigreset.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.GameconfigResetData, GameconfigResetBaseVo, "id");
                //	console.log("GameconfigReset.configData:",this.GameconfigResetData);
            };
            //x系统设置配置表
            ProjTemplate.onloadedGameconfigComplete = function () {
                console.log("Gameconfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.cgameconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.GameconfigData, GameconfigBaseVo, "id");
                //	console.log("Gameconfig.configData:",this.GameconfigData);
            };
            //f分辨率配置
            ProjTemplate.onloadedResolutionComplete = function () {
                console.log("Resolution表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.resolution.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.ResolutionData, ResolutionBaseVo, "id");
                //	console.log("Resolution.configData:",this.ResolutionData);
            };
            //BattleCommand
            ProjTemplate.onloadedBattleCommandComplete = function () {
                console.log("BattleCommand表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.cbattlecommand.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.BattleCommandData, BattleCommandBaseVo, "id");
                //	console.log("BattleCommand.configData:",this.BattleCommandData);
            };
            //t同屏人数自适应配置
            ProjTemplate.onloadedPCountFPSSettingComplete = function () {
                console.log("PCountFPSSetting表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.cpcountfpssetting.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.PCountFPSSettingData, PCountFPSSettingBaseVo, "id");
                //	console.log("PCountFPSSetting.configData:",this.PCountFPSSettingData);
            };
            //m每帧单步加载纹理
            ProjTemplate.onloadedStepLoadTexSettingComplete = function () {
                console.log("StepLoadTexSetting表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.csteploadtexsetting.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.StepLoadTexSettingData, StepLoadTexSettingBaseVo, "id");
                //console.log("StepLoadTexSetting.configData:",this.StepLoadTexSettingData);
            };
            //h画面刷新频率机型适配表
            ProjTemplate.onloadedFPSSettingComplete = function () {
                console.log("FPSSetting表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.cfpssetting.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.FPSSettingData, FPSSettingBaseVo, "id");
                //	console.log("FPSSetting.configData:",this.FPSSettingData);
            };
            //推送提醒配置表
            ProjTemplate.onloadedTuiSongSettingComplete = function () {
                console.log("TuiSongSetting表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.ctuisongsetting.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.TuiSongSettingData, TuiSongSettingBaseVo, "id");
                //	console.log("TuiSongSetting.configData:",this.TuiSongSettingData);
            };
            //t同屏显示人数机型适配表
            ProjTemplate.onloadedTongPingSettingComplete = function () {
                console.log("TongPingSetting表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.ctongpingsetting.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.TongPingSettingData, TongPingSettingBaseVo, "id");
                //	console.log("TongPingSetting.configData:",this.TongPingSettingData);
            };
            //d道具使用粒子轨迹配置
            ProjTemplate.onloadedUseItemEffectComplete = function () {
                console.log("UseItemEffect表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/effect.cuseitemeffect.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.UseItemEffectData, UseItemEffectBaseVo, "id");
                //	console.log("UseItemEffect.configData:",this.UseItemEffectData);
            };
            //s特效数字表
            ProjTemplate.onloadedColorEffectComplete = function () {
                console.log("ColorEffect表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/effect.ccoloreffect.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.ColorEffectData, ColorEffectBaseVo, "id");
                console.log("ColorEffect.configData:", this.ColorEffectData);
            };
            //s属性效果id表
            ProjTemplate.onloadedEffectConfigComplete = function () {
                console.log("EffectConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/effect.ceffectconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.EffectConfigData, EffectConfigBaseVo, "id");
                //	console.log("EffectConfig.configData:",this.EffectConfigData);
            };
            //队伍列表信息for点卡服
            ProjTemplate.onloadedDTeamListInfoComplete = function () {
                console.log("DCTeamListInfo表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/team.dcteamlistinfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.DTeamListInfoData, DTeamListInfoBaseVo, "id");
                //	console.log("DCTeamListInfo.configData:",this.DTeamListInfoData);
            };
            //队伍列表信息
            ProjTemplate.onloadedTeamListInfoComplete = function () {
                console.log("TeamListInfo表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/team.cteamlistinfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.TeamListInfoData, TeamListInfoBaseVo, "id");
                //console.log("TeamListInfo.configData:",this.TeamListInfoData);
            };
            //z光环效果配置表
            ProjTemplate.onloadedZhenFaEffectComplete = function () {
                console.log("ZhenFaEffect表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/team.czhenfaeffect.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.ZhenFaEffectData, ZhenFaEffectBaseVo, "id");
                //console.log("ZhenFaEffect.configData:",this.ZhenFaEffectData);
            };
            //h好友赠送道具
            ProjTemplate.onloadedFriendGiveItemComplete = function () {
                console.log("FriendGiveItem表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/friends.cfriendgiveitem.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.FriendGiveItemData, FriendGiveItemBaseVo, "id");
                //	console.log("FriendGiveItem.configData:",this.FriendGiveItemData);
            };
            //h好友赠送礼物
            ProjTemplate.onloadedFriendGiveGiftComplete = function () {
                console.log("FriendGiveGift表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/friends.cfriendgivegift.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.FriendGiveGiftData, FriendGiveGiftBaseVo, "id");
                //	console.log("FriendGiveGift.configData:",this.FriendGiveGiftData);
            };
            //招募奖励
            ProjTemplate.onloadedRecruitRewardComplete = function () {
                console.log("CRecruitReward表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/friends.crecruitreward.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.RecruitRewardData, RecruitRewardBaseVo, "id");
                //console.log("CRecruitReward.configData:",this.RecruitRewardData);
            };
            //我的招募奖励
            ProjTemplate.onloadedMyRecruitComplete = function () {
                console.log("CMyRecruit表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/friends.cmyrecruit.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.MyRecruitData, MyRecruitBaseVo, "id");
                //	console.log("CMyRecruit.configData:",this.MyRecruitData);
            };
            //D点卡服表格/z招募点卡服/我的招募奖励点卡服
            ProjTemplate.onloadedMyRecruitPayComplete = function () {
                console.log("CMyRecruitPay表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/friends.cmyrecruitpay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.MyRecruitPayData, MyRecruitPayBaseVo, "id");
                //	console.log("CMyRecruitPay.configData:",this.MyRecruitPayData);
            };
            //D点卡服表格/z招募点卡服/招募奖励点卡服
            ProjTemplate.onloadedRecruitRewardPayComplete = function () {
                console.log("CRecruitRewardPay表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/friends.crecruitrewardpay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.RecruitRewardPayData, RecruitRewardPayBaseVo, "id");
                //	console.log("CRecruitRewardPay.configData:",this.RecruitRewardPayData);
            };
            //Z招募/招募请求地址
            ProjTemplate.onloadedRecruitPathComplete = function () {
                console.log("RecruitPath表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/friends.crecruitpath.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.RecruitPathData, RecruitPathBaseVo, "id");
                //	console.log("RecruitPath.configData:",this.RecruitPathData);
            };
            //婚礼特效配置表
            ProjTemplate.onloadedMarryConfComplete = function () {
                console.log("MarryConf表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/friends.cmarryconf.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.MarryConfData, MarryConfBaseVo, "id");
                //	console.log("MarryConf.configData:",this.MarryConfData);
            };
            ProjTemplate.onloadedCAwardResultConfigComplete = function () {
                console.log("CAwardResultConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/treasuremap.cawardresultconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cawardResultConfigData, CAwardResultConfigBaseVo, "id");
                //console.log("cawardResultModel.configData:", this.cawardResultConfigData);
            };
            ProjTemplate.onloadedCAwardResultConfigPayComplete = function () {
                console.log("AwardResultConfigPay表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/treasuremap.cawardresultconfigpay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cawardresultconfigpayData, CAwardResultConfigBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.cawardresultconfigpayData);
            };
            ProjTemplate.onloadedCAwardConfigComplete = function () {
                console.log("AwardConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/treasuremap.cawardConfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cawardConfigData, CAwardConfigBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.cawardConfigData);
            };
            ProjTemplate.onloadedCAwardConfigPayComplete = function () {
                console.log("AwardConfigPAY表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/treasuremap.cawardConfigPay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cawardConfigpayData, CAwardConfigBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.cawardConfigpayData);
            };
            //k开奖配置文件/k开奖事件表
            ProjTemplate.onloadedCEventConfigComplete = function () {
                console.log("EventConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/treasuremap.ceventConfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.ceventConfigData, CEventConfigBaseVo, "id");
                //	console.log("cawardresultconfigpaModel.configData:", this.ceventConfigData);
            };
            //D点卡服表格/k开奖配置文件/k开奖事件表
            ProjTemplate.onloadedCEventConfigpayComplete = function () {
                console.log("EventConfigPay表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/treasuremap.ceventConfigpay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.ceventConfigpayData, CEventConfigBaseVo, "id");
                //	console.log("cawardresultconfigpaModel.configData:", this.ceventConfigpayData);
            };
            //onloadedCLoginTipsComplete
            ProjTemplate.onloadedCLoginTipsComplete = function () {
                console.log("CLoginTips表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/login.cloginTips.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cloginTipsData, CLoginTipsBaseVo, "id");
                //	console.log("cawardresultconfigpaModel.configData:", this.cloginTipsData);
            };
            //onloadedCLoginTipsDianKaComplete
            ProjTemplate.onloadedCLoginTipsDianKaComplete = function () {
                console.log("CLoginTipsDianKa表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/login.cloginTipsDianKa.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cloginTipsDianKaData, CLoginTipsBaseVo, "id");
                //	console.log("cawardresultconfigpaModel.configData:", this.cloginTipsDianKaData);
            };
            ProjTemplate.onloadedCLoginImagesComplete = function () {
                console.log("CLoginImages表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/login.cloginImages.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cloginImagesData, CLoginImagesBaseVo, "id");
                //	console.log("cawardresultconfigpaModel.configData:", this.cloginImagesData);
            };
            //onloadedCExitgameComplete
            ProjTemplate.onloadedCExitgameComplete = function () {
                console.log("CExitgame表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/login.cexitgame.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cexitgameData, CExitgameBaseVo, "id");
                //	console.log("cawardresultconfigpaModel.configData:", this.cexitgameData);
            };
            //onloadedCTriggerConditionDataComplete y隐藏剧情配置表
            ProjTemplate.onloadedCTriggerConditionDataComplete = function () {
                console.log("CTriggerCondition表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/triggers.ctriggerCondition.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.ctriggerConditionData, CTriggerConditionBaseVo, "id");
                //	console.log("cawardresultconfigpaModel.configData:", this.ctriggerConditionData);
            };
            //onloadedCNpcServiceMappingDataDataComplete
            ProjTemplate.onloadedCNpcServiceMappingComplete = function () {
                console.log("CNpcServiceMapping表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcservicemapping.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cnpcServiceMappingData, CNpcServiceMappingBaseVo, "id");
                //	console.log("cawardresultconfigpaModel.configData:", this.cnpcServiceMappingData);
            };
            // onloadedCNPCConfigComplete NPC-复合/npc
            ProjTemplate.onloadedCNPCConfigComplete = function () {
                console.log("CNPCConfigNPC-复合/npc表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cNPCConfigData, CNPCConfigBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.cNPCConfigData);
            };
            ProjTemplate.onloadedcNPCInfoComplete = function () {
                console.log("cNPCInfoNPC-复合/npc表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcinfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cNPCInfoData, CNPCInfoBaseVo, "id");
                //	console.log("cawardresultconfigpaModel.configData:", this.cNPCInfoData);
            };
            // cNpcChat npc对白配置
            ProjTemplate.onloadedcNpcChatComplete = function () {
                console.log("cNPCInfoNPC-复合/npc对白配置 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcchat.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cNpcChatData, CNpcChatBaseVo, "id");
                //	console.log("cawardresultconfigpaModel.configData:", this.cNpcChatData);
            };
            //onloadedcNpcServerConfig
            ProjTemplate.onloadedcNpcServerConfigComplete = function () {
                console.log("cNPCInfoNPC-复合/npc对白配置 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcserverconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cnpcServerConfigData, CNpcServerConfigBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.cnpcServerConfigData);
            };
            ProjTemplate.onloadedcMonsterConfigComplete = function () {
                console.log("cNPCInfoNPC-复合/npc对白配置 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cmonsterconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cmonsterConfigData, CMonsterConfigBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.cmonsterConfigData);
            };
            ProjTemplate.onloadedcHeroBaseInfoComplete = function () {
                console.log("CHeroBaseInfo-h伙伴系统/h伙伴信息配置表 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cherobaseinfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cheroBaseInfoData, CHeroBaseInfoBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.cheroBaseInfoData);
            };
            //onloadedcCLuaTestComplete
            ProjTemplate.onloadedcCLuaTestComplete = function () {
                console.log("CHeroBaseInfo-h伙伴系统/h伙伴信息配置表 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cluatest.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cluaTestData, CLuaTestBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.cluaTestData);
            };
            ProjTemplate.onloadedcCNpcShapeComplete = function () {
                console.log("CHeroBaseInfo/z造型对应表 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcshape.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cnpcShapeData, CNpcShapeBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.cnpcShapeData);
            };
            //CNpcInAll
            ProjTemplate.onloadedcCNpcInAllComplete = function () {
                console.log("CHeroBaseInfo/z造型对应表 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcinall.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cnpcInAllData, CNpcInAllBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.cnpcInAllData);
            };
            //onloadedcCSceneNPCConfigComplete
            ProjTemplate.onloadedcCSceneNPCConfigComplete = function () {
                console.log("CSceneNPCConfig/z造型对应表 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cscenenpcconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.csceneNPCConfigData, CSceneNPCConfigBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.csceneNPCConfigData);
            };
            // csceneNPCBaseData   onloadedcsceneNPCBaseComplete
            ProjTemplate.onloadedCSceneNPCBaseComplete = function () {
                console.log("CSceneNPCConfig/z装饰NPC/z装饰npc基础信息 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cscenenpcbase.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.csceneNPCBaseData, CSceneNPCBaseBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.csceneNPCBaseData);
            };
            //onloadedCActionInfoComplete
            ProjTemplate.onloadedCActionInfoComplete = function () {
                console.log("CActionInfo/z主角模型对照表 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cactioninfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cactionInfoData, CActionInfoBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.cactionInfoData);
            };
            //onloadedCrideComplete
            ProjTemplate.onloadedCrideComplete = function () {
                console.log("CRIDE/z主角模型对照表 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcshape.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.crideData, CRideBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.crideData);
            };
            ProjTemplate.onloadedCrideItemComplete = function () {
                console.log("CRideItem/z坐骑/z坐骑道具配置表 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.crideitem.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.crideItemData, CRideItemBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.crideItemData);
            };
            //onloadedCLeitaiLevelComplete
            ProjTemplate.onloadedCLeitaiLevelComplete = function () {
                console.log("CLeitaiLevel/l擂台等级分段 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cleitailevel.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cleitaiLevelData, CLeitaiLevelBaseVo, "id");
                //	console.log("cawardresultconfigpaModel.configData:", this.cleitaiLevelData);
            };
            //CJingjiRandomRoleBaseVo
            ProjTemplate.onloadedCJingjiRandomRoleComplete = function () {
                console.log("PVP/j竞技场匹配表 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cjingjirandomrole.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cjingjiRandomRoleData, CJingjiRandomRoleBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.cjingjiRandomRoleData);
            };
            //onloadedCJingjiRandomChatComplete
            ProjTemplate.onloadedCJingjiRandomChatComplete = function () {
                console.log("PVP/竞技场loading completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cjingjirandomchat.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cjingjiRandomChatData, CJingjiRandomChatBaseVo, "id");
                //console.log("cawardresultconfigpaModel.configData:", this.cjingjiRandomChatData);
            };
            ProjTemplate.onloadedAnswerQuestionComplete = function () {
                console.log("AnswerQuestionData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.answerquestion.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.answerQuestionData, AnswerQuestionBaseVo, "id");
                //console.log("AnswerQuestionData:", this.answerQuestionData);
            };
            ProjTemplate.onloadedGuideCourseLabelComplete = function () {
                console.log("GuideCourseLabelData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cguidecourselabel.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.guideCourseLabelData, GuideCourseLabelBaseVo, "id");
                //	console.log("GuideCourseLabelData:", this.guideCourseLabelData);
            };
            ProjTemplate.onloadedGuideCoursePayComplete = function () {
                console.log("GuideCoursePayData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cguidecoursepay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.guideCoursePayData, GuideCoursePayBaseVo, "id");
                //	console.log("GuideCoursePayData:", this.guideCoursePayData);
            };
            ProjTemplate.onloadedGuideCourseComplete = function () {
                console.log("GuideCourseData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cguidecourse.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.guideCourseData, GuideCourseBaseVo, "id");
                //	console.log("GuideCourseData:", this.guideCourseData);
            };
            ProjTemplate.onloadedUICongigComplete = function () {
                console.log("UICongigData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cuicongig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.uiCongigData, UICongigBaseVo, "id");
                //	console.log("UICongigData:", this.uiCongigData);
            };
            ProjTemplate.onloadedNewFunctionOpenComplete = function () {
                console.log("NewFunctionOpenData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cnewfunctionopen.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.newFunctionOpenData, NewFunctionOpenBaseVo, "id");
                //console.log("NewFunctionOpenData:", this.newFunctionOpenData);
            };
            ProjTemplate.onloadedWeekListComplete = function () {
                console.log("WeekListData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cweeklist.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.weekListData, WeekListBaseVo, "id");
                //	console.log("WeekListData:", this.weekListData);
            };
            ProjTemplate.onloadedActivityMapListComplete = function () {
                console.log("ActivityMapListData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivitymaplist.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.activityMapListData, ActivityMapListBaseVo, "id");
                //	console.log("ActivityMapListData:", this.activityMapListData);
            };
            ProjTemplate.onloadedActivityNewpayComplete = function () {
                console.log("ActivityNewpayData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivitynewpay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.activityNewpayData, ActivityNewpayBaseVo, "id");
                //console.log("ActivityNewpayData:", this.activityNewpayData);
            };
            ProjTemplate.onloadedActivityNewComplete = function () {
                console.log("ActivityNewData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivitynew.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.activityNewData, ActivityNewBaseVo, "id");
                //	console.log("ActivityNewData:", this.activityNewData);
            };
            ProjTemplate.onloadedTaskNodeComplete = function () {
                console.log("TaskNodeData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.ctasknode.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.taskNodeData, TaskNodeBaseVo, "id");
                //	console.log("TaskNodeData:", this.taskNodeData);
            };
            ProjTemplate.onloadedActivityQuestionComplete = function () {
                console.log("ActivityQuestionData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivityquestion.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.activityQuestionData, ActivityQuestionBaseVo, "id");
                //console.log("ActivityQuestionData:", this.activityQuestionData);
            };
            ProjTemplate.onloadedTikuComplete = function () {
                console.log("TikuData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.ctiku.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.tikuData, TikuBaseVo, "id");
                //console.log("TikuData:", this.tikuData);
            };
            ProjTemplate.onloadedTasktrackingorderComplete = function () {
                console.log("TasktrackingorderData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.ctasktrackingorder.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.tasktrackingorderData, TasktrackingorderBaseVo, "id");
                //console.log("TasktrackingorderData:", this.tasktrackingorderData);
            };
            ProjTemplate.onloadedJingyingpingjiComplete = function () {
                console.log("JingyingpingjiData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cjingyingpingji.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.jingyingpingjiData, JingyingpingjiBaseVo, "id");
                //console.log("JingyingpingjiData:", this.jingyingpingjiData);
            };
            ProjTemplate.onloadedJingyingrenwuTaskComplete = function () {
                console.log("JingyingrenwuTaskData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cjingyingrenwutask.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.jingyingrenwuTaskData, JingyingrenwuTaskBaseVo, "id");
                //console.log("JingyingrenwuTaskData:", this.jingyingrenwuTaskData);
            };
            ProjTemplate.onloadedJingyingConfigComplete = function () {
                console.log("JingyingConfigData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cjingyingconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.jingyingConfigData, JingyingConfigBaseVo, "id");
                //	console.log("JingyingConfigData:", this.jingyingConfigData);
            };
            ProjTemplate.onloadedPointCardActiveGiftBoxComplete = function () {
                console.log("PointCardActiveGiftBoxData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cpointcardactivegiftbox.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.pointCardActiveGiftBoxData, ActiveGiftBoxBaseVo, "id");
                //console.log("PointCardActiveGiftBoxData:", this.pointCardActiveGiftBoxData);
            };
            ProjTemplate.onloadedActiveGiftBoxComplete = function () {
                console.log("ActiveGiftBoxData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivegiftbox.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.activeGiftBoxData, ActiveGiftBoxBaseVo, "id");
                //console.log("ActiveGiftBoxData:", this.activeGiftBoxData);
            };
            ProjTemplate.onloadedArrowEffectSimpComplete = function () {
                console.log("ArrowEffectSimpData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.carroweffectsimp.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.arrowEffectSimpData, ArrowEffectSimpBaseVo, "id");
                //console.log("ArrowEffectSimpData:", this.arrowEffectSimpData);
            };
            ProjTemplate.onloadedArrowEffectComplete = function () {
                console.log("ArrowEffectData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.carroweffect.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.arrowEffectData, ArrowEffectBaseVo, "id");
                //console.log("ArrowEffectData:", this.arrowEffectData);
            };
            ProjTemplate.onloadedAcceptableTaskComplete = function () {
                console.log("AcceptableTaskData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cacceptabletask.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.acceptableTaskData, AcceptableTaskBaseVo, "id");
                //console.log("AcceptableTaskData:", this.acceptableTaskData);
            };
            ProjTemplate.onloadedShiGuangZhiXueConfigComplete = function () {
                console.log("ShiGuangZhiXueConfigData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cshiguangzhixueconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.shiGuangZhiXueConfigData, ShiGuangZhiXueConfigBaseVo, "id");
                //	console.log("ShiGuangZhiXueConfigData:", this.shiGuangZhiXueConfigData);
            };
            ProjTemplate.onloadedInheritCostComplete = function () {
                console.log("InheritCostData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cinheritcost.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.inheritCostData, InheritCostBaseVo, "id");
                //	console.log("InheritCostData:", this.inheritCostData);
            };
            ProjTemplate.onloadedHuanhuaUseComplete = function () {
                console.log("HuanhuaUseData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.chuanhuause.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.huanhuaUseData, HuanhuaUseBaseVo, "id");
                //console.log("HuanhuaUseData:", this.huanhuaUseData);
            };
            ProjTemplate.onloadedHuanhuaInfoComplete = function () {
                console.log("HuanhuaInfoData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.chuanhuainfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.huanhuaInfoData, HuanhuaInfoBaseVo, "id");
                //console.log("HuanhuaInfoData:", this.huanhuaInfoData);
            };
            ProjTemplate.onloadedPracticeItemExpComplete = function () {
                console.log("PracticeItemExpData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cpracticeitemexp.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.practiceItemExpData, PracticeItemExpBaseVo, "id");
                //console.log("PracticeItemExpData:", this.practiceItemExpData);
            };
            ProjTemplate.onloadedPointCardParticeSkillLevelupComplete = function () {
                console.log("PointCardParticeSkillLevelupData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cpointcardparticeskilllevelup.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.pointCardParticeSkillLevelupData, PointCardParticeSkillLevelupBaseVo, "id");
                //	console.log("PointCardParticeSkillLevelupData:", this.pointCardParticeSkillLevelupData);
            };
            ProjTemplate.onloadedParticeSkillLevelupComplete = function () {
                console.log("LifeSkillCostPayData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cparticeskilllevelup.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.particeSkillLevelupData, ParticeSkillLevelupBaseVo, "id");
                //	console.log("ParticeSkillLevelupData:", this.particeSkillLevelupData);
            };
            ProjTemplate.onloadedLifeSkillCostPayComplete = function () {
                console.log("LifeSkillCostPayData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.clifeskillcostpay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.lifeSkillCostPayData, LifeSkillCostPayBaseVo, "id");
                //	console.log("LifeSkillCostPayData:", this.lifeSkillCostPayData);
            };
            ProjTemplate.onloadedLifeSkillCostComplete = function () {
                console.log("LifeSkillCostData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.clifeskillcost.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.lifeSkillCostData, LifeSkillCostBaseVo, "id");
                //	console.log("LifeSkillCostData:", this.lifeSkillCostData);
            };
            ProjTemplate.onloadedLifeSkillComplete = function () {
                console.log("LifeSkillData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.clifeskill.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.lifeSkillData, LifeSkillBaseVo, "id");
                //	console.log("LifeSkillData:", this.lifeSkillData);
            };
            ProjTemplate.onloadedSkillConfigComplete = function () {
                console.log("SkillConfigData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cskillconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.skillConfigData, SkillConfigBaseVo, "id");
                //	console.log("SkillConfigData:", this.skillConfigData);
            };
            ProjTemplate.onloadedSkillTypeConfigComplete = function () {
                console.log("SkillTypeConfigData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cskilltypeconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.skillTypeConfigData, SkillTypeConfigBaseVo, "id");
                //	console.log("SkillTypeConfigData:", this.skillTypeConfigData);
            };
            ProjTemplate.onloadedSBLevelLimitComplete = function () {
                console.log("SBLevelLimitData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.csblevellimit.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.sbLevelLimitData, SBLevelLimitBaseVo, "id");
                //	console.log("SBLevelLimitData:", this.sbLevelLimitData);
            };
            ProjTemplate.onloadedPetSkillConfigComplete = function () {
                console.log("PetSkillConfigData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cpetskillconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petSkillConfigData, PetSkillConfigBaseVo, "id");
                //	console.log("PetSkillConfigData:", this.petSkillConfigData);
            };
            ProjTemplate.onloadedSchoolSkillComplete = function () {
                console.log("SchoolSkillData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cschoolskill.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.schoolSkillData, SchoolSkillBaseVo, "id");
                //	console.log("SchoolSkillData:", this.schoolSkillData);
            };
            ProjTemplate.onloadedSkillitemComplete = function () {
                console.log("SkillitemData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cskillitem.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.skillitemData, SkillitemBaseVo, "id");
                //	console.log("SkillitemData:", this.skillitemData);
            };
            ProjTemplate.onloadedPetSkillEffectComplete = function () {
                console.log("PetSkillEffectData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cpetskilleffect.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petSkillEffectData, PetSkillEffectBaseVo, "id");
                //console.log("PetSkillEffectData:", this.petSkillEffectData);
            };
            ProjTemplate.onloadedPetSkillupgradeComplete = function () {
                console.log("PetSkillupgradeData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cpetskillupgrade.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petSkillupgradeData, PetSkillupgradeBaseVo, "id");
                //	console.log("PetSkillupgradeData:", this.petSkillupgradeData);
            };
            ProjTemplate.onloadedSchoolSkillitemComplete = function () {
                console.log("SchoolSkillitemData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cschoolskillitem.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.schoolSkillitemData, SchoolSkillitemBaseVo, "id");
                //	console.log("SchoolSkillitemData:", this.schoolSkillitemData);
            };
            ProjTemplate.onloadedEquipSkillInfoComplete = function () {
                console.log("EquipSkillInfoData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cequipskillinfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipSkillInfoData, EquipSkillInfoBaseVo, "id");
                //	console.log("EquipSkillInfoData:", this.equipSkillInfoData);
            };
            ProjTemplate.onloadedEquipSkillComplete = function () {
                console.log("EquipSkillData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cequipskill.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipSkillData, EquipSkillBaseVo, "id");
                //	console.log("EquipSkillData:", this.equipSkillData);
            };
            ProjTemplate.onloadedFriendSkillComplete = function () {
                console.log("FriendSkillData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cfriendskill.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.friendSkillData, FriendSkillBaseVo, "id");
                //	console.log("FriendSkillData:", this.friendSkillData);
            };
            ProjTemplate.onloadedExpFactorItemInfoComplete = function () {
                console.log("ExpFactorItemInfoData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cexpfactoriteminfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.expFactorItemInfoData, ExpFactorItemInfoBaseVo, "id");
                //	console.log("ExpFactorItemInfoData:", this.expFactorItemInfoData);
            };
            ProjTemplate.onloadedEquipRefineSkillInfo_PointCardComplete = function () {
                console.log("EquipRefineSkillInfo_PointCardData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequiprefineskillinfo_pointcard.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipRefineSkillInfo_PointCardData, EquipRefineSkillInfo_PointCardBaseVo, "id");
                //console.log("EquipRefineSkillInfo_PointCardData:", this.equipRefineSkillInfo_PointCardData);
            };
            ProjTemplate.onloadedEquipRefineSkillInfoDataComplete = function () {
                console.log("EquipRefineInfo_PointCardData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequiprefineskillinfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipRefineSkillInfoData, EquipRefineSkillInfoBaseVo, "id");
                //console.log("EquipRefineSkillInfoData:", this.equipRefineSkillInfoData);
            };
            ProjTemplate.onloadedEquipRefineInfo_PointCardComplete = function () {
                console.log("EquipRefineInfo_PointCardData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequiprefineinfo_pointcard.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipRefineInfo_PointCardData, EquipRefineInfo_PointCardBaseVo, "id");
                //	console.log("EquipRefineInfo_PointCardData:", this.equipRefineInfo_PointCardData);
            };
            ProjTemplate.onloadedEquipRefineInfoComplete = function () {
                console.log("EquipRefineInfoData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequiprefineinfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipRefineInfoData, EquipRefineInfoBaseVo, "id");
                //	console.log("EquipRefineInfoData:", this.equipRefineInfoData);
            };
            ProjTemplate.onloadedDashiSpaceGiftComplete = function () {
                console.log("DashiSpaceGiftData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cdashispacegift.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.dashiSpaceGiftData, DashiSpaceGiftBaseVo, "id");
                //	console.log("DashiSpaceGiftData:", this.dashiSpaceGiftData);
            };
            ProjTemplate.onloadedFumoEffectFormulaComplete = function () {
                console.log("FumoEffectFormulaData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cfumoeffectformula.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.fumoEffectFormulaData, FumoEffectFormulaBaseVo, "id");
                //	console.log("FumoEffectFormulaData:", this.fumoEffectFormulaData);
            };
            ProjTemplate.onloadedFoodAndDrugFormulaComplete = function () {
                console.log("FoodAndDrugFormulaData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cfoodanddrugformula.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.foodAndDrugFormulaData, FoodAndDrugFormulaBaseVo, "id");
                //	console.log("FoodAndDrugFormulaData:", this.foodAndDrugFormulaData);
            };
            ProjTemplate.onloadedComeFromComplete = function () {
                console.log("ComeFromData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.ccomefrom.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.comeFromData, ComeFromBaseVo, "id");
                //console.log("ComeFromData:", this.comeFromData);
            };
            ProjTemplate.onloadedEquipPosNameComplete = function () {
                console.log("EquipPosNameData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipposname.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipPosNameData, EquipPosNameBaseVo, "id");
                //console.log("EquipPosNameData:", this.equipPosNameData);
            };
            ProjTemplate.onloadedItemToItemComplete = function () {
                console.log("ItemToItemData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.citemtoitem.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.itemToItemData, ItemToItemBaseVo, "id");
                //console.log("ItemToItemData:", this.itemToItemData);
            };
            ProjTemplate.onloadedBagTableComplete = function () {
                console.log("BagTableData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cbagtable.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.bagTableData, BagTableBaseVo, "id");
                //console.log("BagTableData:", this.bagTableData);
            };
            ProjTemplate.onloadedDepottableComplete = function () {
                console.log("DepottableData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cdepottable.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.depottableData, DepottableBaseVo, "id");
                //	console.log("DepottableData:", this.depottableData);
            };
            ProjTemplate.onloadedItemUseTipComplete = function () {
                console.log("ItemUseTipData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.citemusetip.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.itemUseTipData, ItemUseTipBaseVo, "id");
                //console.log("ItemUseTipData:", this.itemUseTipData);
            };
            ProjTemplate.onloadedDcequipCombinComplete = function () {
                console.log("DcEquipCombinData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.dcequipcombin.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.dcequipCombinData, EquipCombinBaseVo, "id");
                //console.log("DcEquipCombinData:", this.dcequipCombinData);
            };
            ProjTemplate.onloadedCequipCombinComplete = function () {
                console.log("cEquipCombinBaseVo表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipcombin.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cequipCombinData, EquipCombinBaseVo, "id");
                //console.log("cEquipCombinBaseVo:", this.cequipCombinData);
            };
            ProjTemplate.onloadedPetEquipHeChengComplete = function () {
                console.log("PetEquipHeChengData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetequiphecheng.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petEquipHeChengData, PetEquipHeChengBaseVo, "id");
                //console.log("PetEquipHeChengData:", this.petEquipHeChengData);
            };
            ProjTemplate.onloadedPetEquipSuitBuffComplete = function () {
                console.log("PetEquipSuitBuffData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetequipsuitbuff.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petEquipSuitBuffData, PetEquipSuitBuffBaseVo, "id");
                //	console.log("PetEquipSuitBuffData:", this.petEquipSuitBuffData);
            };
            ProjTemplate.onloadedonlinegiftComplete = function () {
                console.log("OnLineGiftData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.conlinegift.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.onLineGiftData, OnLineGiftBaseVo, "id");
                //	console.log("OnLineGiftData:", this.onLineGiftData);
            };
            ProjTemplate.onloadedItemTypeNameListComplete = function () {
                console.log("ItemTypeNameListData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.citemtypenamelist.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.itemTypeNameListData, ItemTypeNameListBaseVo, "id");
                //	console.log("ItemTypeNameListData:", this.itemTypeNameListData);
            };
            ProjTemplate.onloadedPresentConfigPayComplete = function () {
                console.log("PresentConfigPayData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cpresentconfigpay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.presentConfigPayData, PresentConfigPayBaseVo, "id");
                //	console.log("PresentConfigPayData:", this.presentConfigPayData);
            };
            ProjTemplate.onloadedPresentConfigComplete = function () {
                console.log("PresentConfigData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cpresentconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.presentConfigData, PresentConfigBaseVo, "id");
                //	console.log("PresentConfigData:", this.presentConfigData);
            };
            ProjTemplate.onloadedItemBuffComplete = function () {
                console.log("ItemBuffData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.citembuff.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.itemBuffData, ItemBuffBaseVo, "id");
                //	console.log("ItemBuffData:", this.itemBuffData);
            };
            ProjTemplate.onloadedPointCardEquipGemComplete = function () {
                console.log("PointCardEquipGemData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cpointcardequipgem.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.pointCardEquipGemData, PointCardEquipGemBaseVo, "id");
                //		console.log("PointCardEquipGemData:", this.pointCardEquipGemData);
            };
            ProjTemplate.onloadedEquipItemAttr_PointCardComplete = function () {
                console.log("EquipItemAttrData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipitemattr_pointcard.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipItemAttr_PointCardData, EquipItemAttr_PointCardBaseVo, "id");
                //	console.log("EquipItemAttr_PointCardData:", this.equipItemAttr_PointCardData);
            };
            ProjTemplate.onloadedEquipItemAttrComplete = function () {
                console.log("EquipItemAttrData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipitemattr.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipItemAttrData, EquipItemAttrBaseVo, "id");
                //	console.log("EquipItemAttrData:", this.equipItemAttrData);
            };
            ProjTemplate.onloadedTaskRelative_PointCardComplete = function () {
                console.log("TaskRelative_PointCardData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.ctaskrelative_pointcard.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.taskRelative_PointCardData, TaskRelative_PointCardBaseVo, "id");
                //	console.log("TaskRelative_PointCardData:", this.taskRelative_PointCardData);
            };
            ProjTemplate.onloadedTaskRelativeComplete = function () {
                console.log("TaskRelativeData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.ctaskrelative.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.taskRelativeData, TaskRelativeBaseVo, "id");
                //	console.log("TaskRelativeData:", this.taskRelativeData);
            };
            ProjTemplate.onloadedEquipEffect_PointCardComplete = function () {
                console.log("EquipEffect_PointCardData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipeffect_pointcard.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipEffect_PointCardData, EquipEffect_PointCardBaseVo, "id");
                //	console.log("EquipEffect_PointCardData:", this.equipEffect_PointCardData);
            };
            ProjTemplate.onloadedEquipEffectComplete = function () {
                console.log("EquipEffectData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipeffect.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipEffectData, EquipEffectBaseVo, "id");
                //	console.log("EquipEffectData:", this.equipEffectData);
            };
            ProjTemplate.onloadedGroceryEffect_PointCardComplete = function () {
                console.log("GroceryEffect_PointCardData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cgroceryeffect_pointcard.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.groceryEffect_PointCardData, GroceryEffect_PointCardBaseVo, "id");
                //	console.log("GroceryEffect_PointCardData:", this.groceryEffect_PointCardData);
            };
            ProjTemplate.onloadedGroceryEffectComplete = function () {
                console.log("GroceryEffectData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cgroceryeffect.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.groceryEffectData, GroceryEffectBaseVo, "id");
                //	console.log("GroceryEffectData:", this.groceryEffectData);
            };
            ProjTemplate.onloadedGemTypeComplete = function () {
                console.log("GemTypeData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cgemtype.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.gemTypeData, GemTypeBaseVo, "id");
                //	console.log("GemTypeData:", this.gemTypeData);
            };
            ProjTemplate.onloadedGemEffect_PointCardComplete = function () {
                console.log("GemEffect_PointCardData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cgemeffect_pointcard.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.gemEffect_PointCardData, GemEffect_PointCardBaseVo, "id");
                //	console.log("GemEffect_PointCardData:", this.gemEffect_PointCardData);
            };
            ProjTemplate.onloadedGemEffectComplete = function () {
                console.log("GemEffectData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cgemeffect.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.gemEffectData, GemEffectBaseVo, "id");
                //console.log("GemEffectData:", this.gemEffectData);
            };
            ProjTemplate.onloadedItembuffidsComplete = function () {
                console.log("ItembuffidsData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.citembuffids.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.itembuffidsData, ItembuffidsBaseVo, "id");
                //console.log("ItembuffidsData:", this.itembuffidsData);
            };
            ProjTemplate.onloadedFoodAndDrugEffect_PointCardComplete = function () {
                console.log("FoodAndDrugEffect_PointCardData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cfoodanddrugeffect_pointcard.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.foodAndDrugEffect_PointCardData, FoodAndDrugEffect_PointCardBaseVo, "id");
                //	console.log("FoodAndDrugEffect_PointCardData:", this.foodAndDrugEffect_PointCardData);
            };
            ProjTemplate.onloadedFightDrugTypeComplete = function () {
                console.log("FightDrugTypeData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cfightdrugtype.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.fightDrugTypeData, FightDrugTypeBaseVo, "id");
                //console.log("FightDrugTypeData:", this.fightDrugTypeData);
            };
            ProjTemplate.onloadedFoodAndDrugEffectComplete = function () {
                console.log("FoodAndDrugEffectData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cfoodanddrugeffect.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.foodAndDrugEffectData, FoodAndDrugEffectBaseVo, "id");
                //console.log("FoodAndDrugEffectData:", this.foodAndDrugEffectData);
            };
            ProjTemplate.onloadedPetItemEffect_PointCardtComplete = function () {
                console.log("PetItemEffect_PointCardData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetitemeffect_pointcard.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petItemEffect_PointCardData, PetItemEffect_PointCardBaseVo, "id");
                //	console.log("PetItemEffect_PointCardData:", this.petItemEffect_PointCardData);
            };
            ProjTemplate.onloadedPetItemEffectComplete = function () {
                console.log("PetItemEffectData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetitemeffect.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.petItemEffectData, PetItemEffectBaseVo, "id");
                //	console.log("PetItemEffectData:", this.petItemEffectData);
            };
            ProjTemplate.onloadedEquipMakeInfoComplete = function () {
                console.log("EquipMakeInfoData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipmakeinfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipMakeInfoData, EquipMakeInfoBaseVo, "id");
                //	console.log("EquipMakeInfoData:", this.equipMakeInfoData);
            };
            ProjTemplate.onloadedItemTypeComplete = function () {
                console.log("ItemTypeData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.citemtype.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.itemTypeData, ItemTypeBaseVo, "id");
                //console.log("ItemTypeData:", this.itemTypeData);
            };
            ProjTemplate.onloadedAttributeDesConfigComplete = function () {
                console.log("AttributeDesConfigData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cattributedesconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.attributeDesConfigData, AttributeDesConfigBaseVo, "id");
                //console.log("AttributeDesConfigData:", this.attributeDesConfigData);
            };
            ProjTemplate.onloadedEquipAddattributerandomlibComplete = function () {
                console.log("EquipAddattributerandomlibData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipaddattributerandomlib.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipAddattributerandomlibData, EquipAddattributerandomlibBaseVo, "id");
                //	console.log("EquipAddattributerandomlibData:", this.equipAddattributerandomlibData);
            };
            ProjTemplate.onloadedEquipAddattributelibComplete = function () {
                console.log("EquipAddattributelibData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipaddattributelib.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipAddattributelibData, EquipAddattributelibBaseVo, "id");
                //	console.log("EquipAddattributelibData:", this.equipAddattributelibData);
            };
            ProjTemplate.onloadedEquipIteminfoComplete = function () {
                console.log("EquipIteminfoData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipiteminfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipIteminfoData, EquipIteminfoBaseVo, "id");
                //	console.log("EquipIteminfoData:", this.equipIteminfoData);
            };
            ProjTemplate.onloadedItemAttr_PointCardComplete = function () {
                console.log("ItemAttr_PointCard表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.citemattr_pointcard.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.itemAttr_PointCardData, ItemAttr_PointCardBaseVo, "id");
                //console.log("Itemattr_PointCardData:", this.itemAttr_PointCardData);
            };
            ProjTemplate.onloadedItemAttrComplete = function () {
                console.log("ItemAttr表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/item.citemattr.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                //ByteArrayUtils.FillList(data, size, this.itemAttrData, ItemAttrBaseVo, "id");
                //console.log("ItemattrData:", this.itemAttrData);
            };
            /**
                * @Author: LinQiuWen
                * @description:onLoad函数
                */
            //SchoolInfo
            ProjTemplate.onloadedSchoolInfoComplete = function () {
                console.log("SchoolInfo表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.schoolinfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.schoolInfoData, SchoolInfoBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.schoolInfoData);
            };
            //CreateRoleConfig
            ProjTemplate.onloadedCreateRoleConfigComplete = function () {
                console.log("CreateRoleConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.createroleconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.createRoleConfigData, CreateRoleConfigBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.createRoleConfigData);
            };
            //AttrModData
            ProjTemplate.onloadedAttrModDataComplete = function () {
                console.log("attrModData表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.cattrmoddata.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.attrModData, AttrModDataBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.attrModData);
            };
            // //resMoneyConfig
            ProjTemplate.onloadedResMoneyConfigComplete = function () {
                console.log("resMoneyConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.cresmoneyconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.resMoneyConfigData, ResMoneyConfigBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.resMoneyConfigData);
            };
            //SchoolMasterSkillInfo
            ProjTemplate.onloadedSchoolMasterSkillInfoComplete = function () {
                console.log("SchoolMasterSkillInfo表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.schoolmasterskillinfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.schoolMasterSkillInfoData, SchoolMasterSkillInfoBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.schoolMasterSkillInfoData);
            };
            //AcupointInfoBaseVo
            ProjTemplate.onloadedAcupointInfoComplete = function () {
                console.log("AcupointInfo表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.acupointinfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.acupointInfoData, AcupointInfoBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.acupointInfoData);
            };
            // AcupointLevelUpBaseVo
            ProjTemplate.onloadedAcupointLevelUpComplete = function () {
                console.log("AcupointLevelUp表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.acupointlevelup.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.acupointLevelUpData, AcupointLevelUpBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.acupointLevelUpData);
            };
            // AcupointLevelUpPayBaseVo
            ProjTemplate.onloadedAcupointLevelUpPayComplete = function () {
                console.log("AcupointLevelUpPay表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.acupointleveluppay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.acupointLevelUpPayData, AcupointLevelUpPayBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.acupointLevelUpPayData);
            };
            ProjTemplate.onloadedSkillAcupointConfigComplete = function () {
                console.log("SkillAcupointConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.skillacupointconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.skillAcupointConfigData, SkillAcupointConfigBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.skillAcupointConfigData);
            };
            ProjTemplate.onloadedSkillInfoConfigComplete = function () {
                console.log("SkillInfoConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.skillinfoconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.skillInfoConfigData, SkillInfoConfigBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.skillInfoConfigData);
            };
            ProjTemplate.onloadedCaddpointchangeComplete = function () {
                console.log("Caddpointchange表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.caddpointchange.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.caddpointchangeData, CaddpointchangeBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.caddpointchangeData);
            };
            // AddPointResetItemConfigBaseVo
            ProjTemplate.onloadedAddPointResetItemConfigComplete = function () {
                console.log("AddPointResetItemConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.caddpointresetitemconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.addPointResetItemConfigData, AddPointResetItemConfigBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.addPointResetItemConfigData);
            };
            ProjTemplate.onloadedEquipEffectConfigComplete = function () {
                console.log("EquipEffectConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.cequipeffectconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.equipEffectConfigData, EquipEffectConfigBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.equipEffectConfigData);
            };
            // ServiceLevelConfigBaseVo
            ProjTemplate.onloadedServiceLevelConfigComplete = function () {
                console.log("ServiceLevelConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.cservicelevelconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.serviceLevelConfigData, ServiceLevelConfigBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.serviceLevelConfigData);
            };
            // ServiceExpConfigBaseVo
            ProjTemplate.onloadedServiceExpConfigComplete = function () {
                console.log("ServiceExpConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/role.cserviceexpconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.serviceExpConfigData, ServiceExpConfigBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.serviceExpConfigData);
            };
            ProjTemplate.onloadedThreePvpWhiteMenuComplete = function () {
                console.log("ThreePvpWhiteMenu表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.threepvpwhitemenu.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.threePvpWhiteMenuData, ThreePvpWhiteMenuBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.threePvpWhiteMenuData);
            };
            ProjTemplate.onloadedCloginawardComplete = function () {
                console.log("Cloginaward表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cloginaward.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cloginawardData, CloginawardBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cloginawardData);
            };
            ProjTemplate.onloadedBindTelAwardComplete = function () {
                console.log("CBindTelAward表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cbindtelaward.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.bindTelAwardData, BindTelAwardBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.bindTelAwardData);
            };
            //PointCardBindTelAwardBaseVo
            ProjTemplate.onloadedPointCardBindTelAwardComplete = function () {
                console.log("PointCardBindTelAward表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cpointcardbindtelaward.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.pointCardBindTelAwardData, PointCardBindTelAwardBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.pointCardBindTelAwardData);
            };
            //WisdomTrialVillBaseVo
            ProjTemplate.onloadedWisdomTrialVillComplete = function () {
                console.log("WisdomTrialVill表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialvill.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.wisdomTrialVillData, WisdomTrialVillBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.wisdomTrialVillData);
            };
            // WisdomTrialState
            ProjTemplate.onloadedWisdomTrialStateComplete = function () {
                console.log("WisdomTrialState表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialstate.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.wisdomTrialStateData, WisdomTrialVillBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.wisdomTrialStateData);
            };
            // WisdomTrialVillPay
            ProjTemplate.onloadedWisdomTrialVillPayComplete = function () {
                console.log("WisdomTrialVillPay表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialvillpay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.wisdomTrialVillPayData, WisdomTrialVillBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.wisdomTrialVillPayData);
            };
            // WisdomTrialProvPay
            ProjTemplate.onloadedWisdomTrialProvPayComplete = function () {
                console.log("WisdomTrialProvPay表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialprovpay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.wisdomTrialProvPayData, WisdomTrialVillBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.wisdomTrialProvPayData);
            };
            // WisdomTrialStatePay
            ProjTemplate.onloadedWisdomTrialStatePayComplete = function () {
                console.log("WisdomTrialStatePay表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialstatepay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.wisdomTrialStatePayData, WisdomTrialVillBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.wisdomTrialStatePayData);
            };
            // CActivityAwardBaseVo
            ProjTemplate.onloadedActivityAwardComplete = function () {
                console.log("CActivityAward表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cactivityaward.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.activityAwardBaseVoData, ActivityAwardBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.activityAwardBaseVoData);
            };
            // CshouchonglibaoBaseVo
            ProjTemplate.onloadedCshouchonglibaoComplete = function () {
                console.log("Cshouchonglibao表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cshouchonglibao.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cshouchonglibaoData, CshouchonglibaoBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cshouchonglibaoData);
            };
            // Cshouchonglibaopay
            ProjTemplate.onloadedCshouchonglibaopayComplete = function () {
                console.log("Cshouchonglibaopay表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cshouchonglibaopay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cshouchonglibaopayData, CshouchonglibaoBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cshouchonglibaopayData);
            };
            // CqiandaojiangliBaseVo
            ProjTemplate.onloadedCqiandaojiangliComplete = function () {
                console.log("Cqiandaojiangli表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cqiandaojiangli.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cqiandaojiangliData, CqiandaojiangliBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cqiandaojiangliData);
            };
            // CpaihangbangBaseVo
            ProjTemplate.onloadedCpaihangbangComplete = function () {
                console.log("Cpaihangbang表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cpaihangbang.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cpaihangbangData, CpaihangbangBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cpaihangbangData);
            };
            // CDeathNoteBaseVo
            ProjTemplate.onloadedCDeathNoteComplete = function () {
                console.log("CDeathNote表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cdeathnote.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cdeathNoteData, CDeathNoteBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cdeathNoteData);
            };
            // CNotifyConfigBaseVo
            ProjTemplate.onloadedCNotifyConfigComplete = function () {
                console.log("CNotifyConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cnotifyconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cnotifyConfigData, CNotifyConfigBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cnotifyConfigData);
            };
            // CSchoolWheelBaseVo
            ProjTemplate.onloadedCSchoolWheelComplete = function () {
                console.log("CSchoolWheel表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cschoolwheel.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cschoolWheelData, CSchoolWheelBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cschoolWheelData);
            };
            // CShareConfigBaseVo
            ProjTemplate.onloadedCShareConfigComplete = function () {
                console.log("CShareConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cshareconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cshareConfigData, CShareConfigBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cshareConfigData);
            };
            // CShareConfigPay
            ProjTemplate.onloadedCShareConfigPayComplete = function () {
                console.log("CShareConfigPay表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cshareconfigpay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cshareConfigPayData, CShareConfigBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cshareConfigPayData);
            };
            // CWinFrameSizeBaseVo
            ProjTemplate.onloadedCWinFrameSizeComplete = function () {
                console.log("CWinFrameSize表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cwinframesize.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cwinFrameSizeData, CWinFrameSizeBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cwinFrameSizeData);
            };
            // CTTInfoBaseVo
            ProjTemplate.onloadedCTTInfoComplete = function () {
                console.log("CTTInfo表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cttinfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cTTInfoData, CTTInfoBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cTTInfoData);
            };
            // CTTInfoDK
            ProjTemplate.onloadedCTTInfoDKComplete = function () {
                console.log("CTTInfoDK表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cttinfodk.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cTTInfoDKData, CTTInfoBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cTTInfoDKData);
            };
            ProjTemplate.onloadedCChangeSchoolCostComplete = function () {
                console.log("CChangeSchoolCost表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cchangeschoolcost.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cChangeSchoolCostData, CChangeSchoolCostBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cChangeSchoolCostData);
            };
            /**circletask */
            // CSpecialQuestConfigBaseVo
            ProjTemplate.onloadedCSpecialQuestConfigComplete = function () {
                console.log("CSpecialQuestConfig表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.cspecialquestconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cSpecialQuestConfigData, CSpecialQuestConfigBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cSpecialQuestConfigData);
            };
            // CSchoolTaskBaseVo
            ProjTemplate.onloadedCSchoolTaskComplete = function () {
                console.log("CSchoolTask表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.cschooltask.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cSchoolTaskData, CSchoolTaskBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cSchoolTaskData);
            };
            // CSchoolUseItemBaseVo
            ProjTemplate.onloadedCSchoolUseItemComplete = function () {
                console.log("CSchoolUseItem表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.cschooluseitem.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cSchoolUseItemData, CSchoolUseItemBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cSchoolUseItemData);
            };
            // CCircTaskItemCollectBaseVo
            ProjTemplate.onloadedCCircTaskItemCollectComplete = function () {
                console.log("CCircTaskItemCollect表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.cCircTaskItemCollect.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cCircTaskItemCollectData, CCircTaskItemCollectBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cCircTaskItemCollectData);
            };
            // CRepeatTaskBaseVo
            ProjTemplate.onloadedCRepeatTaskComplete = function () {
                console.log("CRepeatTask表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.crepeattask.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cRepeatTaskData, CRepeatTaskBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cRepeatTaskData);
            };
            // CRepeatTaskChatBaseVo
            ProjTemplate.onloadedCRepeatTaskChatComplete = function () {
                console.log("CRepeatTaskChat表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.crepeattaskchat.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cRepeatTaskChatData, CRepeatTaskChatBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cRepeatTaskChatData);
            };
            // CCircTaskItemFindBaseVo
            ProjTemplate.onloadedCCircTaskItemFindComplete = function () {
                console.log("CCircTaskItemFind表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.ccirctaskitemfind.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cCircTaskItemFindData, CCircTaskItemFindBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cCircTaskItemFindData);
            };
            // CCircTaskPatrolBaseVo
            ProjTemplate.onloadedCCircTaskPatrolComplete = function () {
                console.log("CCircTaskPatrol表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.ccirctaskpatrol.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cCircTaskPatrolData, CCircTaskPatrolBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cCircTaskPatrolData);
            };
            // CCircTaskPetCatchBaseVo
            ProjTemplate.onloadedCCircTaskPetCatchComplete = function () {
                console.log("CCircTaskPetCatch表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.ccirctaskpetcatch.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cCircTaskPetCatchData, CCircTaskPetCatchBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cCircTaskPetCatchData);
            };
            // CRenXingCircTaskCostBaseVo
            ProjTemplate.onloadedCRenXingCircTaskCostComplete = function () {
                console.log("CRenXingCircTaskCost表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.crenxingcirctaskcost.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cRenXingCircTaskCostData, CRenXingCircTaskCostBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cRenXingCircTaskCostData);
            };
            // CFubenTaskBaseVo
            ProjTemplate.onloadedCFubenTaskComplete = function () {
                console.log("CFubenTask表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.cfubentask.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cFubenTaskData, CFubenTaskBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cFubenTaskData);
            };
            // CAnYeMaXiTuanConfBaseVo
            ProjTemplate.onloadedCAnYeMaXiTuanConfComplete = function () {
                console.log("CAnYeMaXiTuanConf表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.canyemaxituanconf.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cAnYeMaXiTuanConfData, CAnYeMaXiTuanConfBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cAnYeMaXiTuanConfData);
            };
            // CGoodsBaseVo
            ProjTemplate.onloadedCGoodsComplete = function () {
                console.log("CGoods表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cgoods.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cGoodsData, CGoodsBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cGoodsData);
            };
            // DCGoodsBaseVo
            ProjTemplate.onloadedDCGoodsComplete = function () {
                console.log("DCGoods表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.dcgoods.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.dCGoodsData, DCGoodsBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.dCGoodsData);
            };
            // CMallShopBaseVo
            ProjTemplate.onloadedCMallShopComplete = function () {
                console.log("CMallShop表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmallshop.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cMallShopData, CMallShopBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cMallShopData);
            };
            // DCMallShopBaseVo
            ProjTemplate.onloadedDCMallShopComplete = function () {
                console.log("DCMallShop表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.dcmallshop.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.dCMallShopData, DCMallShopBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.dCMallShopData);
            };
            // CPetShopBaseVo
            ProjTemplate.onloadedCPetShopComplete = function () {
                console.log("CPetShop表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cpetshop.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cPetShopData, CPetShopBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cPetShopData);
            };
            // CNpcSaleBaseVo
            ProjTemplate.onloadedCNpcSaleComplete = function () {
                console.log("CNpcSale表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cnpcsale.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cNpcSaleData, CNpcSaleBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cNpcSaleData);
            };
            // dCNpcSale集成CNpcSaleBaseVo
            // DCNpcSale
            ProjTemplate.onloadedDCNpcSaleComplete = function () {
                console.log("DCNpcSale表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.dcnpcsale.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.dCNpcSaleData, CNpcSaleBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.dCNpcSaleData);
            };
            // CCurrencyIconPathBaseVo
            ProjTemplate.onloadedCCurrencyIconPathComplete = function () {
                console.log("CCurrencyIconPath表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.ccurrencyiconpath.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cCurrencyIconPathData, CCurrencyIconPathBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cCurrencyIconPathData);
            };
            // CCommerceFirstMenu
            ProjTemplate.onloadedCCommerceFirstMenuComplete = function () {
                console.log("CCommerceFirstMenu表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.ccommercefirstmenu.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cCommerceFirstMenuData, CCommerceFirstMenuBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cCommerceFirstMenuData);
            };
            // dCCommerceFirstMenu		
            ProjTemplate.onloadedDCCommerceFirstMenuComplete = function () {
                console.log("dCCommerceFirstMenu表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.dccommercefirstmenu.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.dCCommerceFirstMenuData, CCommerceFirstMenuBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.dCCommerceFirstMenuData);
            };
            // CCommerceSecondMenu
            ProjTemplate.onloadedCCommerceSecondMenuComplete = function () {
                console.log("CCommerceSecondMenu表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.ccommercesecondmenu.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cCommerceSecondMenuData, CCommerceSecondMenuBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cCommerceSecondMenuData);
            };
            // DCCommerceSecondMenu
            ProjTemplate.onloadedDCCommerceSecondMenuComplete = function () {
                console.log("DCCommerceSecondMenu表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.dccommercesecondmenu.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.dCCommerceSecondMenuData, CCommerceSecondMenuBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.dCCommerceSecondMenuData);
            };
            // CMarketFirstTable
            ProjTemplate.onloadedCMarketFirstTableComplete = function () {
                console.log("CMarketFirstTable表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmarketfirsttable.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cMarketFirstTableData, CMarketFirstTableBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cMarketFirstTableData);
            };
            // DCMarketFirstTable
            ProjTemplate.onloadedDCMarketFirstTableComplete = function () {
                console.log("DCMarketFirstTable表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.dcmarketfirsttable.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.dCMarketFirstTableData, CMarketFirstTableBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.dCMarketFirstTableData);
            };
            // CMarketSecondTable
            ProjTemplate.onloadedCMarketSecondTableComplete = function () {
                console.log("CMarketSecondTable表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmarketsecondtable.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cMarketSecondTableData, CMarketSecondTableBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cMarketSecondTableData);
            };
            // DCMarketSecondTable
            ProjTemplate.onloadedDCMarketSecondTableComplete = function () {
                console.log("DCMarketSecondTable表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.dcmarketsecondtable.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.dCMarketSecondTableData, CMarketSecondTableBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.dCMarketSecondTableData);
            };
            // CMarketThreeTableBaseVo
            ProjTemplate.onloadedCMarketThreeTableComplete = function () {
                console.log("CMarketThreeTable表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmarketthreetable.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cMarketThreeTableData, CMarketThreeTableBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cMarketThreeTableData);
            };
            // DCMarketThreeTable
            ProjTemplate.onloadedDCMarketThreeTableComplete = function () {
                console.log("DCMarketThreeTable表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.dcmarketthreetable.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.dCMarketThreeTableData, CMarketThreeTableBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.dCMarketThreeTableData);
            };
            // CQuickBuy
            ProjTemplate.onloadedCQuickBuyComplete = function () {
                console.log("CQuickBuy表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cquickbuy.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cQuickBuyData, CQuickBuyBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cQuickBuyData);
            };
            // CQuickBuyPay
            ProjTemplate.onloadedCQuickBuyPayComplete = function () {
                console.log("CQuickBuyPay表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cquickbuypay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cQuickBuyPayData, CQuickBuyBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cQuickBuyPayData);
            };
            // CShenShouShop
            ProjTemplate.onloadedCShenShouShopComplete = function () {
                console.log("CShenShouShop表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cshenshoushop.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cShenShouShopData, CShenShouShopBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cShenShouShopData);
            };
            ProjTemplate.onloadedCMallShopTabNameComplete = function () {
                console.log("CMallShopTabName表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmallshoptabname.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.cMallShopTabNameData, CMallShopTabNameBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.cMallShopTabNameData);
            };
            // DCMallShopTabName
            ProjTemplate.onloadedDCMallShopTabNameComplete = function () {
                console.log("DCMallShopTabName表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.dcmallshoptabname.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.dCMallShopTabNameData, CMallShopTabNameBaseVo, "id");
                console.log("RoleRColorModel.configData:", this.dCMallShopTabNameData);
            };
            //ljm
            //c充值配置表
            ProjTemplate.onloadedAddCashluaComplete = function () {
                console.log("AddCashlua表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.caddcashlua.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.AddCashluaData, AddCashluaBaseVo, "id");
                console.log("AddCashlua.configData:", this.AddCashluaData);
            };
            //c充值配置表/點卡服
            ProjTemplate.onloadedAddCashluaComplete1 = function () {
                console.log("AddCashlua表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.caddcashpcardlua.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.AddCashluaData, AddCashluaBaseVo, "id");
                console.log("AddCashlua.configData:", this.AddCashluaData);
            };
            //c充值返利表
            ProjTemplate.onloadedChargereturnProfitComplete = function () {
                console.log("ChargereturnProfit表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cchargereturnprofit.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.ChargeReturnProfitData, ChargeReturnProfitBaseVo, "id");
                console.log("ChargereturnProfit.configData:", this.ChargeReturnProfitData);
            };
            //J奖励系统表
            ProjTemplate.onloadedRewardSystemBtnShowComplete = function () {
                console.log("ChargereturnProfit表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.crewardsystembtnshow.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.RewardSystemBtnShowData, RewardSystemBtnShowBaseVo, "id");
                console.log("crewardsystembtnshow.configData:", this.RewardSystemBtnShowData);
            };
            //VIP
            ProjTemplate.onloadedVipInfoBaseVoComplete = function () {
                console.log("cvipinfo表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cvipinfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.VipInfoData, VipInfoBaseVo, "id");
                console.log("cvipinfo.configData:", this.VipInfoData);
            };
            //H红包配置表
            ProjTemplate.onloadedRedPackConfigBaseVoComplete = function () {
                console.log("credpackconfig 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.credpackconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.RedPackConfigData, RedPackConfigBaseVo, "id");
                console.log("credpackconfig.configData:", this.RedPackConfigData);
            };
            //D点卡服表格/钱庄配置表
            ProjTemplate.onloadedBankConfigBaseVoComplete = function () {
                console.log("cbankconfig 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cbankconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.BankConfigData, BankConfigBaseVo, "id");
                console.log("cbankconfig.configData:", this.BankConfigData);
            };
            //D点卡服表格/t通用点卡服配置表
            ProjTemplate.onloadedCommonDayPayBaseVoComplete = function () {
                console.log("ccommondaypay 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.ccommondaypay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.CommonDayPayData, CommonDayPayBaseVo, "id");
                console.log("ccommondaypay.configData:", this.CommonDayPayData);
            };
            //月卡奖励表
            ProjTemplate.onloadedMonthCardConfigBaseVoComplete = function () {
                console.log("cmonthcardconfig 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cmonthcardconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.MonthCardConfigData, MonthCardConfigBaseVo, "id");
                console.log("cmonthcardconfig.configData:", this.MonthCardConfigData);
            };
            //自由分配礼包配置表
            ProjTemplate.onloadedFreeDisRewardConfigBaseVoComplete = function () {
                console.log("cfreedisrewardconfig 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cfreedisrewardconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.FreeDisRewardConfigData, FreeDisRewardConfigBaseVo, "id");
                console.log("cfreedisrewardconfig.configData:", this.FreeDisRewardConfigData);
            };
            //D点卡服表格/DMT3自由分配礼包配置表
            ProjTemplate.onloadedFreeDisRewardConfigpayBaseVoComplete = function () {
                console.log("cfreedisrewardconfigpay 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cfreedisrewardconfigpay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.FreeDisRewardConfigData, FreeDisRewardConfigBaseVo, "id");
                console.log("cfreedisrewardconfigpay.configData:", this.FreeDisRewardConfigData);
            };
            //f福利奖励/QQ奖励表
            ProjTemplate.onloadedQQGiftConfigBaseVoComplete = function () {
                console.log("cqqgiftconfig 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cqqgiftconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.QQGiftConfigData, QQGiftConfigBaseVo, "id");
                console.log("cqqgiftconfig.configData:", this.QQGiftConfigData);
            };
            //D点卡服表格/DMT3QQ奖励表
            ProjTemplate.onloadedQQGiftConfigPayBaseVoComplete = function () {
                console.log("cqqgiftconfigpay 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cqqgiftconfigpay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.QQGiftConfigData, QQGiftConfigBaseVo, "id");
                console.log("cqqgiftconfigpay.configData:", this.QQGiftConfigData);
            };
            //f福利奖励/节日奖励表
            ProjTemplate.onloadedHolidayGiftConfigBaseVoComplete = function () {
                console.log("cholidaygiftconfig 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cholidaygiftconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.HolidayGiftConfigData, HolidayGiftConfigBaseVo, "id");
                console.log("cholidaygiftconfig.configData:", this.HolidayGiftConfigData);
            };
            //D点卡服表格/DMT3节日奖励表
            ProjTemplate.onloadedHolidayGiftConfigPayBaseVoComplete = function () {
                console.log("cholidaygiftconfigpay 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cholidaygiftconfigpay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.HolidayGiftConfigData, HolidayGiftConfigBaseVo, "id");
                console.log("cholidaygiftconfigpay.configData:", this.HolidayGiftConfigData);
            };
            //f福利奖励/节日活跃度奖励表
            ProjTemplate.onloadedGuoQingHuoYueGiftConfigBaseVoComplete = function () {
                console.log("cguoqinghuoyuegiftconfig 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cguoqinghuoyuegiftconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.GuoQingHuoYueGiftConfigData, GuoQingHuoYueGiftConfigBaseVo, "id");
                console.log("cguoqinghuoyuegiftconfig.configData:", this.GuoQingHuoYueGiftConfigData);
            };
            //D点卡服表格/DMT3节日活跃度奖励表
            ProjTemplate.onloadedGuoQingHuoYueGiftConfigPayBaseVoComplete = function () {
                console.log("cguoqinghuoyuegiftconfigpay 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cguoqinghuoyuegiftconfigpay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.GuoQingHuoYueGiftConfigData, GuoQingHuoYueGiftConfigBaseVo, "id");
                console.log("cguoqinghuoyuegiftconfigpay.configData:", this.GuoQingHuoYueGiftConfigData);
            };
            //f福利奖励/节日充值奖励表
            ProjTemplate.onloadedGuoQingChargeGiftConfigBaseVoComplete = function () {
                console.log("cguoqingchargegiftconfig 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cguoqingchargegiftconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.GuoQingChargeGiftConfigData, GuoQingChargeGiftConfigBaseVo, "id");
                console.log("cguoqingchargegiftconfig.configData:", this.GuoQingChargeGiftConfigData);
            };
            //D点卡服表格/DMT3节日充值奖励表
            ProjTemplate.onloadedGuoQingChargeGiftConfigPayBaseVoComplete = function () {
                console.log("cguoqingchargegiftconfigpay 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cguoqingchargegiftconfigpay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.GuoQingChargeGiftConfigData, GuoQingChargeGiftConfigBaseVo, "id");
                console.log("cguoqingchargegiftconfigpay.configData:", this.GuoQingChargeGiftConfigData);
            };
            //f福利奖励/节日活动类型表
            ProjTemplate.onloadedHolidayTypeBaseVoComplete = function () {
                console.log("cholidaytype 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cholidaytype.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.HolidayTypeData, HolidayTypeBaseVo, "id");
                console.log("cholidaytype.configData:", this.HolidayTypeData);
            };
            //D点卡服表格/DMT3节日活动类型表
            ProjTemplate.onloadedHolidayTypePayBaseVoComplete = function () {
                console.log("cholidaytypepay 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cholidaytypepay.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.HolidayTypeData, HolidayTypeBaseVo, "id");
                console.log("cholidaytypepay.configData:", this.HolidayTypeData);
            };
            //f福利奖励/节日分档充值礼包
            ProjTemplate.onloadedHydReChargeRewardDataBaseVoComplete = function () {
                console.log("chydrechargerewarddata 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/activity.chydrechargerewarddata.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.HydReChargeRewardDataData, HydReChargeRewardDataBaseVo, "id");
                console.log("chydrechargerewarddata.configData:", this.HydReChargeRewardDataData);
            };
            //D点卡服表格/点卡服节日分档充值礼包
            ProjTemplate.onloadedHydReChargeRewardDataDKBaseVoComplete = function () {
                console.log("chydrechargerewarddatadk 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/activity.chydrechargerewarddatadk.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.HydReChargeRewardDataData, HydReChargeRewardDataBaseVo, "id");
                console.log("chydrechargerewarddatadk.configData:", this.HydReChargeRewardDataData);
            };
            //f福利奖励/节日积分收集表
            ProjTemplate.onloadedHydScoreBaseVoComplete = function () {
                console.log("chydscore 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/activity.chydscore.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.HydScoreData, HydScoreBaseVo, "id");
                console.log("chydscore.configData:", this.HydScoreData);
            };
            //D点卡服表格/点卡服节日积分收集表
            ProjTemplate.onloadedHydScoreDKBaseVoComplete = function () {
                console.log("chydscoredk 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/activity.chydscoredk.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.HydScoreData, HydScoreBaseVo, "id");
                console.log("chydscoredk.configData:", this.HydScoreData);
            };
            //d地图
            ProjTemplate.onloadedMapConfigBaseVoComplete = function () {
                console.log("cmapconfig 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/map.cmapconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.MapConfigData, MapConfigBaseVo, "id");
                console.log("cmapconfig.configData:", this.MapConfigData);
            };
            //a暗雷区域描述
            ProjTemplate.onloadedMineAreainfoBaseVoComplete = function () {
                console.log("cmineareainfo 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/map.cmineareainfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.MineAreainfoData, MineAreainfoBaseVo, "id");
                console.log("cmineareainfo.configData:", this.MineAreainfoData);
            };
            //m明雷区域描述
            ProjTemplate.onloadedShowAreainfoBaseVoComplete = function () {
                console.log("cshowareainfo 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/map.cshowareainfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.ShowAreainfoData, ShowAreainfoBaseVo, "id");
                console.log("cshowareainfo.configData:", this.ShowAreainfoData);
            };
            //s世界地图配置
            ProjTemplate.onloadedWorldMapConfigBaseVoComplete = function () {
                console.log("cworldmapconfig 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/map.cworldmapconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.WorldMapConfigData, WorldMapConfigBaseVo, "id");
                console.log("cworldmapconfig.configData:", this.WorldMapConfigData);
            };
            //s世界地图小头像
            ProjTemplate.onloadedWorldMapSmallHeadConfigBaseVoComplete = function () {
                console.log("cworldmapsmallheadconfig 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/map.cworldmapsmallheadconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.WorldMapSmallHeadConfigData, WorldMapSmallHeadConfigBaseVo, "id");
                console.log("cworldmapsmallheadconfig.configData:", this.WorldMapSmallHeadConfigData);
            };
            //x循环任务/d道具随机使用坐标生成表
            ProjTemplate.onloadedItemToPosBaseVoComplete = function () {
                console.log("citemtopos 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/map.citemtopos.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.ItemToPosData, ItemToPosBaseVo, "id");
                console.log("citemtopos.configData:", this.ItemToPosData);
            };
            //技能相关表/j技能阶段表
            ProjTemplate.onloadedStageInfoBaseVoComplete = function () {
                console.log("cstageinfo 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cstageinfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.StageInfoData, StageInfoBaseVo, "id");
                console.log("cstageinfo.configData:", this.StageInfoData);
            };
            //技能相关表/j技能阶段表_远程
            ProjTemplate.onloadedStageInfo2BaseVoComplete = function () {
                console.log("cstageinfo2 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cstageinfo2.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.StageInfoData, StageInfoBaseVo, "id");
                console.log("cstageinfo2.configData:", this.StageInfoData);
            };
            //技能相关表/j技能阶段串联表
            ProjTemplate.onloadedSkillInfoBaseVoComplete = function () {
                console.log("cskillinfo 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cskillinfo.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.SkillInfoData, SkillInfoBaseVo, "id");
                console.log("cskillinfo.configData:", this.SkillInfoData);
            };
            //z战斗底图表
            ProjTemplate.onloadedBattleBackGroundBaseVoComplete = function () {
                console.log("cbattlebackground 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cbattlebackground.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.BattleBackGroundData, BattleBackGroundBaseVo, "id");
                console.log("cbattlebackground.configData:", this.BattleBackGroundData);
            };
            //z战斗背景音乐表
            ProjTemplate.onloadedBattleBackMusicBaseVoComplete = function () {
                console.log("cbattlebackmusic 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cbattlebackmusic.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.BattleBackGroundData, BattleBackGroundBaseVo, "id");
                console.log("cbattlebackmusic.configData:", this.BattleBackGroundData);
            };
            //光环表
            ProjTemplate.onloadedFormationbaseConfigBaseVoComplete = function () {
                console.log("cformationbaseconfig 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cformationbaseconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.FormationbaseConfigData, FormationbaseConfigBaseVo, "id");
                console.log("cformationbaseconfig.configData:", this.FormationbaseConfigData);
            };
            //光环表
            ProjTemplate.onloadedFormationRestrainBaseVoComplete = function () {
                console.log("cformationrestrain 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cformationrestrain.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.FormationRestrainData, FormationRestrainBaseVo, "id");
                console.log("cformationrestrain.configData:", this.FormationRestrainData);
            };
            //z战斗AI/AI动作表
            ProjTemplate.onloadedBattleAIConfigBaseVoComplete = function () {
                console.log("cbattleaiconfig 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cbattleaiconfig.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.BattleAIConfigData, BattleAIConfigBaseVo, "id");
                console.log("cbattleaiconfig.configData:", this.BattleAIConfigData);
            };
            //挂机设置
            ProjTemplate.onloadedRoleFighteAIBaseVoComplete = function () {
                console.log("crolefighteai 表格加载完毕 completed");
                var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.crolefighteai.bin");
                var data = new Byte(arrayBuffer);
                var size = this.readDataHead(data);
                ByteArrayUtils.FillList(data, size, this.RoleFighteAIData, RoleFighteAIBaseVo, "id");
                console.log("crolefighteai.configData:", this.RoleFighteAIData);
            };
            ProjTemplate.readDataHead = function (data) {
                //console.log("readDataHead data:",data,data.pos,data.length);
                data.pos = 0;
                //console.log("readDataHead data:",data,data.pos,data.length);
                var itemCount = 0;
                var type = data.getUint32();
                //console.log("type:",type);
                var size = data.getUint32();
                //console.log("size:",size);
                var version1 = data.getUint16();
                //console.log("version1:",version1);
                itemCount = data.getUint16();
                //console.log("itemCount:",itemCount);
                var colCheckNumber = data.getUint32();
                //console.log("colCheckNumber:",colCheckNumber);
                return itemCount;
            };
            Object.defineProperty(ProjTemplate, "data", {
                /*static setData(v:Object){
                    ProjTemplate._data = v;
                }*/
                get: function () {
                    return ProjTemplate._data;
                },
                enumerable: true,
                configurable: true
            });
            ProjTemplate._data = {};
            ProjTemplate.roleRColorModelConfigData = {};
            ProjTemplate.cscheculedActivityConfigData = {};
            ProjTemplate.ccheculedActivityConfigData = {};
            ProjTemplate.cscheculedActivitypayConfigData = {};
            ProjTemplate.cbattlelistConfigData = {};
            ProjTemplate.cbiaoqingConfigData = {};
            ProjTemplate.cbanWordsConfigData = {};
            ProjTemplate.cquickchatConfigData = {};
            ProjTemplate.cchatColorConfigData = {};
            ProjTemplate.ctitleConfigData = {};
            ProjTemplate.ccommonConfigData = {};
            ProjTemplate.caddressProvinceConfigData = {};
            ProjTemplate.caddressCountryConfigData = {};
            ProjTemplate.cautoMovePathConfigData = {};
            ProjTemplate.cautoMovePathPointConfigData = {};
            ProjTemplate.cmessageTipConfigData = {};
            ProjTemplate.cstringResConfigData = {};
            ProjTemplate.ceffectPathConfigData = {};
            ProjTemplate.ceffectPathNoneDramaConfigData = {};
            ProjTemplate.missionCMainMissionInfoData = {};
            ProjTemplate.petCPetAttrData = {};
            ProjTemplate.petCPetAttrModDataData = {};
            ProjTemplate.petCPetNextExpData = {};
            ProjTemplate.petCPetResetPointConfigData = {};
            ProjTemplate.petCPetFeedItemListData = {};
            ProjTemplate.petCPetDepotPriceData = {};
            ProjTemplate.petCPetFeedItemAttrData = {};
            ProjTemplate.petCPetFeedItemAttr_PointCardData = {};
            ProjTemplate.petCFoodItemAttrData = {};
            ProjTemplate.petCFoodItemAttr_PointCardData = {};
            ProjTemplate.petCShenShouIncData = {};
            ProjTemplate.instanceCInstaceConfigData = {};
            ProjTemplate.instanceCBingFengWangZuoMapData = {};
            ProjTemplate.instanceCShiGuangZhiXueConfigData = {};
            ProjTemplate.instanceCShiGuangZhiXueNpcData = {};
            ProjTemplate.instanceCParnterNpcConfigData = {};
            ProjTemplate.instanceCEnChouLuNewConfigData = {};
            ProjTemplate.clanCFactionYaoFangData = {};
            ProjTemplate.clanCFactionLobbyData = {};
            ProjTemplate.clanCFactionGoldBankData = {};
            ProjTemplate.clanCFactionHotelData = {};
            ProjTemplate.clanCFactionDrugStoreData = {};
            ProjTemplate.clanCFactionPositionData = {};
            ProjTemplate.clanCFactionFuLiData = {};
            ProjTemplate.clanCRuneSetData = {};
            ProjTemplate.clanCFactionHuoDongData = {};
            ProjTemplate.clanCClanFightData = {};
            ProjTemplate.FriendGiveItemData = {};
            ProjTemplate.FriendGiveGiftData = {};
            ProjTemplate.RecruitRewardData = {};
            ProjTemplate.RecruitRewardPayData = {};
            ProjTemplate.MyRecruitData = {};
            ProjTemplate.MyRecruitPayData = {};
            ProjTemplate.RecruitPathData = {};
            ProjTemplate.MarryConfData = {};
            ProjTemplate.ZhenFaEffectData = {};
            ProjTemplate.TeamListInfoData = {};
            ProjTemplate.DTeamListInfoData = {};
            ProjTemplate.EffectConfigData = {};
            ProjTemplate.ColorEffectData = {};
            ProjTemplate.UseItemEffectData = {};
            ProjTemplate.TongPingSettingData = {};
            ProjTemplate.TuiSongSettingData = {};
            ProjTemplate.FPSSettingData = {};
            ProjTemplate.StepLoadTexSettingData = {};
            ProjTemplate.PCountFPSSettingData = {};
            ProjTemplate.BattleCommandData = {};
            ProjTemplate.ResolutionData = {};
            ProjTemplate.GameconfigData = {};
            ProjTemplate.GameconfigResetData = {};
            ProjTemplate.GengXinGongGaoData = {};
            ProjTemplate.BuffConfigData = {};
            ProjTemplate.cawardResultConfigData = {};
            ProjTemplate.cawardresultconfigpayData = {};
            ProjTemplate.roleRColorModelConfigData3 = {};
            ProjTemplate.roleRColorModelConfigData4 = {};
            ProjTemplate.cawardConfigData = {};
            ProjTemplate.cawardConfigpayData = {};
            ProjTemplate.ceventConfigData = {};
            ProjTemplate.ceventConfigpayData = {};
            ProjTemplate.cloginTipsData = {};
            ProjTemplate.cloginTipsDianKaData = {};
            ProjTemplate.cloginImagesData = {};
            ProjTemplate.cexitgameData = {};
            ProjTemplate.ctriggerConditionData = {};
            ProjTemplate.cnpcServiceMappingData = {};
            ProjTemplate.cNPCConfigData = {};
            ProjTemplate.cNPCInfoData = {};
            ProjTemplate.cNpcChatData = {};
            ProjTemplate.cnpcServerConfigData = {};
            ProjTemplate.cmonsterConfigData = {};
            ProjTemplate.cheroBaseInfoData = {};
            ProjTemplate.cluaTestData = {};
            ProjTemplate.cnpcShapeData = {};
            ProjTemplate.cnpcInAllData = {};
            ProjTemplate.csceneNPCConfigData = {};
            ProjTemplate.csceneNPCBaseData = {};
            ProjTemplate.cactionInfoData = {};
            ProjTemplate.crideData = {};
            ProjTemplate.crideItemData = {};
            ProjTemplate.cleitaiLevelData = {};
            ProjTemplate.cjingjiRandomRoleData = {};
            ProjTemplate.cjingjiRandomChatData = {};
            // public static roleRColorModelConfigData2:Object = {};
            // public static roleRColorModelConfigData3:Object = {};
            // public static roleRColorModelConfigData4:Object = {};
            ProjTemplate.itemAttrData = {};
            ProjTemplate.itemAttr_PointCardData = {};
            ProjTemplate.equipIteminfoData = {};
            ProjTemplate.equipAddattributelibData = {};
            ProjTemplate.equipAddattributerandomlibData = {};
            ProjTemplate.attributeDesConfigData = {};
            ProjTemplate.itemTypeData = {};
            ProjTemplate.equipMakeInfoData = {};
            ProjTemplate.petItemEffectData = {};
            ProjTemplate.petItemEffect_PointCardData = {};
            ProjTemplate.foodAndDrugEffectData = {};
            ProjTemplate.fightDrugTypeData = {};
            ProjTemplate.foodAndDrugEffect_PointCardData = {};
            ProjTemplate.itembuffidsData = {};
            ProjTemplate.gemEffectData = {};
            ProjTemplate.gemEffect_PointCardData = {};
            ProjTemplate.gemTypeData = {};
            ProjTemplate.groceryEffectData = {};
            ProjTemplate.groceryEffect_PointCardData = {};
            ProjTemplate.equipEffectData = {};
            ProjTemplate.equipEffect_PointCardData = {};
            ProjTemplate.taskRelativeData = {};
            ProjTemplate.taskRelative_PointCardData = {};
            ProjTemplate.equipItemAttrData = {};
            ProjTemplate.equipItemAttr_PointCardData = {};
            ProjTemplate.pointCardEquipGemData = {};
            ProjTemplate.itemBuffData = {};
            ProjTemplate.presentConfigData = {};
            ProjTemplate.presentConfigPayData = {};
            ProjTemplate.itemTypeNameListData = {};
            ProjTemplate.onLineGiftData = {};
            ProjTemplate.petEquipSuitBuffData = {};
            ProjTemplate.petEquipHeChengData = {};
            ProjTemplate.cequipCombinData = {};
            ProjTemplate.dcequipCombinData = {};
            ProjTemplate.itemUseTipData = {};
            ProjTemplate.depottableData = {};
            ProjTemplate.bagTableData = {};
            ProjTemplate.itemToItemData = {};
            ProjTemplate.equipPosNameData = {};
            ProjTemplate.comeFromData = {};
            ProjTemplate.foodAndDrugFormulaData = {};
            ProjTemplate.fumoEffectFormulaData = {};
            ProjTemplate.dashiSpaceGiftData = {};
            ProjTemplate.equipRefineInfoData = {};
            ProjTemplate.equipRefineInfo_PointCardData = {};
            ProjTemplate.equipRefineSkillInfoData = {};
            ProjTemplate.equipRefineSkillInfo_PointCardData = {};
            ProjTemplate.expFactorItemInfoData = {};
            ProjTemplate.friendSkillData = {};
            ProjTemplate.equipSkillData = {};
            ProjTemplate.equipSkillInfoData = {};
            ProjTemplate.schoolSkillitemData = {};
            ProjTemplate.petSkillupgradeData = {};
            ProjTemplate.petSkillEffectData = {};
            ProjTemplate.skillitemData = {};
            ProjTemplate.schoolSkillData = {};
            ProjTemplate.petSkillConfigData = {};
            ProjTemplate.sbLevelLimitData = {};
            ProjTemplate.skillTypeConfigData = {};
            ProjTemplate.skillConfigData = {};
            ProjTemplate.lifeSkillData = {};
            ProjTemplate.lifeSkillCostData = {};
            ProjTemplate.lifeSkillCostPayData = {};
            ProjTemplate.particeSkillLevelupData = {};
            ProjTemplate.pointCardParticeSkillLevelupData = {};
            ProjTemplate.practiceItemExpData = {};
            ProjTemplate.huanhuaInfoData = {};
            ProjTemplate.huanhuaUseData = {};
            ProjTemplate.inheritCostData = {};
            ProjTemplate.shiGuangZhiXueConfigData = {};
            ProjTemplate.acceptableTaskData = {};
            ProjTemplate.arrowEffectData = {};
            ProjTemplate.arrowEffectSimpData = {};
            ProjTemplate.activeGiftBoxData = {};
            ProjTemplate.pointCardActiveGiftBoxData = {};
            ProjTemplate.jingyingConfigData = {};
            ProjTemplate.jingyingrenwuTaskData = {};
            ProjTemplate.jingyingpingjiData = {};
            ProjTemplate.tasktrackingorderData = {};
            ProjTemplate.tikuData = {};
            ProjTemplate.activityQuestionData = {};
            ProjTemplate.taskNodeData = {};
            ProjTemplate.activityNewData = {};
            ProjTemplate.activityNewpayData = {};
            ProjTemplate.activityMapListData = {};
            ProjTemplate.weekListData = {};
            ProjTemplate.newFunctionOpenData = {};
            ProjTemplate.uiCongigData = {};
            ProjTemplate.guideCourseData = {};
            ProjTemplate.guideCoursePayData = {};
            ProjTemplate.guideCourseLabelData = {};
            ProjTemplate.answerQuestionData = {};
            /**
                * @Author: LinQiuWen
                * @description:申明变量
                */
            //role.xml
            ProjTemplate.schoolInfoData = {};
            ProjTemplate.createRoleConfigData = {};
            ProjTemplate.attrModData = {};
            ProjTemplate.resMoneyConfigData = {};
            ProjTemplate.schoolMasterSkillInfoData = {};
            ProjTemplate.acupointInfoData = {};
            ProjTemplate.acupointLevelUpData = {};
            ProjTemplate.acupointLevelUpPayData = {};
            ProjTemplate.skillAcupointConfigData = {};
            ProjTemplate.skillInfoConfigData = {};
            ProjTemplate.caddpointchangeData = {};
            ProjTemplate.addPointResetItemConfigData = {};
            ProjTemplate.equipEffectConfigData = {};
            ProjTemplate.serviceLevelConfigData = {};
            ProjTemplate.serviceExpConfigData = {};
            //game.xml
            ProjTemplate.threePvpWhiteMenuData = {};
            ProjTemplate.cloginawardData = {};
            ProjTemplate.bindTelAwardData = {};
            ProjTemplate.pointCardBindTelAwardData = {};
            ProjTemplate.wisdomTrialVillData = {};
            ProjTemplate.wisdomTrialProvData = {};
            ProjTemplate.wisdomTrialStateData = {};
            ProjTemplate.wisdomTrialVillPayData = {};
            ProjTemplate.wisdomTrialProvPayData = {};
            ProjTemplate.wisdomTrialStatePayData = {};
            ProjTemplate.activityAwardBaseVoData = {};
            ProjTemplate.cshouchonglibaoData = {};
            ProjTemplate.cshouchonglibaopayData = {};
            ProjTemplate.cqiandaojiangliData = {};
            ProjTemplate.cpaihangbangData = {};
            ProjTemplate.cdeathNoteData = {};
            ProjTemplate.cnotifyConfigData = {};
            ProjTemplate.cschoolWheelData = {};
            ProjTemplate.cshareConfigData = {};
            ProjTemplate.cshareConfigPayData = {};
            ProjTemplate.cwinFrameSizeData = {};
            ProjTemplate.cTTInfoData = {};
            ProjTemplate.cTTInfoDKData = {};
            ProjTemplate.cChangeSchoolCostData = {};
            //circletask.xml
            ProjTemplate.cSpecialQuestConfigData = {};
            ProjTemplate.cSchoolTaskData = {};
            ProjTemplate.cSchoolUseItemData = {};
            ProjTemplate.cCircTaskItemCollectData = {};
            ProjTemplate.cRepeatTaskData = {};
            ProjTemplate.cRepeatTaskChatData = {};
            ProjTemplate.cCircTaskItemFindData = {};
            ProjTemplate.cCircTaskPatrolData = {};
            ProjTemplate.cCircTaskPetCatchData = {};
            ProjTemplate.cRenXingCircTaskCostData = {};
            ProjTemplate.cFubenTaskData = {};
            ProjTemplate.cAnYeMaXiTuanConfData = {};
            //shop.xml
            ProjTemplate.cGoodsData = {};
            ProjTemplate.dCGoodsData = {};
            ProjTemplate.cMallShopData = {};
            ProjTemplate.dCMallShopData = {};
            ProjTemplate.cPetShopData = {};
            ProjTemplate.cNpcSaleData = {};
            ProjTemplate.dCNpcSaleData = {};
            ProjTemplate.cCurrencyIconPathData = {};
            ProjTemplate.cCommerceFirstMenuData = {};
            ProjTemplate.dCCommerceFirstMenuData = {};
            ProjTemplate.cCommerceSecondMenuData = {};
            ProjTemplate.dCCommerceSecondMenuData = {};
            ProjTemplate.cMarketFirstTableData = {};
            ProjTemplate.dCMarketFirstTableData = {};
            ProjTemplate.cMarketSecondTableData = {};
            ProjTemplate.dCMarketSecondTableData = {};
            ProjTemplate.cMarketThreeTableData = {};
            ProjTemplate.dCMarketThreeTableData = {};
            ProjTemplate.cQuickBuyData = {};
            ProjTemplate.cQuickBuyPayData = {};
            ProjTemplate.cShenShouShopData = {};
            ProjTemplate.cMallShopTabNameData = {};
            ProjTemplate.dCMallShopTabNameData = {};
            //ljm
            ProjTemplate.AddCashluaData = {};
            ProjTemplate.ChargeReturnProfitData = {};
            ProjTemplate.RewardSystemBtnShowData = {};
            ProjTemplate.VipInfoData = {};
            ProjTemplate.RedPackConfigData = {};
            ProjTemplate.BankConfigData = {};
            ProjTemplate.CommonDayPayData = {};
            ProjTemplate.MonthCardConfigData = {};
            ProjTemplate.FreeDisRewardConfigData = {};
            ProjTemplate.QQGiftConfigData = {};
            ProjTemplate.HolidayGiftConfigData = {};
            ProjTemplate.GuoQingHuoYueGiftConfigData = {};
            ProjTemplate.GuoQingChargeGiftConfigData = {};
            ProjTemplate.HolidayTypeData = {};
            ProjTemplate.HydReChargeRewardDataData = {};
            ProjTemplate.HydScoreData = {};
            ProjTemplate.MapConfigData = {};
            ProjTemplate.MineAreainfoData = {};
            ProjTemplate.ShowAreainfoData = {};
            ProjTemplate.WorldMapConfigData = {};
            ProjTemplate.WorldMapSmallHeadConfigData = {};
            ProjTemplate.ItemToPosData = {};
            ProjTemplate.StageInfoData = {};
            ProjTemplate.SkillInfoData = {};
            ProjTemplate.BattleBackGroundData = {};
            ProjTemplate.FormationbaseConfigData = {};
            ProjTemplate.FormationRestrainData = {};
            ProjTemplate.BattleAIConfigData = {};
            ProjTemplate.RoleFighteAIData = {};
            return ProjTemplate;
        }());
        data_1.ProjTemplate = ProjTemplate;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ProjTemplate.js.map