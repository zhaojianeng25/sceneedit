/**修改宗旨权限 */
var ClanPermissions;
(function (ClanPermissions) {
    /**可以修改 */
    ClanPermissions[ClanPermissions["OK"] = 1] = "OK";
    /**不可以 */
    ClanPermissions[ClanPermissions["NO"] = 0] = "NO";
})(ClanPermissions || (ClanPermissions = {}));
/**公会建筑 */
var clanHouse;
(function (clanHouse) {
    /**大厅 */
    clanHouse[clanHouse["BuildDating"] = 1] = "BuildDating";
    /**金库 */
    clanHouse[clanHouse["BuildJinKu"] = 2] = "BuildJinKu";
    /**药房 */
    clanHouse[clanHouse["BuildYaoFang"] = 3] = "BuildYaoFang";
    /**旅店 */
    clanHouse[clanHouse["BuildLvDian"] = 4] = "BuildLvDian";
})(clanHouse || (clanHouse = {}));
/**同意或者拒绝 */
var AcceptOrRefuseApply;
(function (AcceptOrRefuseApply) {
    AcceptOrRefuseApply[AcceptOrRefuseApply["refuse"] = 0] = "refuse";
    AcceptOrRefuseApply[AcceptOrRefuseApply["accept"] = 1] = "accept";
})(AcceptOrRefuseApply || (AcceptOrRefuseApply = {}));
/**性别 */
var Sex;
(function (Sex) {
    /** 男女通用 客户端用 */
    Sex[Sex["ManOrWomen"] = 0] = "ManOrWomen";
    /**男的 */
    Sex[Sex["man"] = 1] = "man";
    /**女的 */
    Sex[Sex["woman"] = 2] = "woman";
    /**不分男女的 服务端用*/
    Sex[Sex["allman"] = -1] = "allman";
})(Sex || (Sex = {}));
/**弹劾类型 */
var Cmdtype;
(function (Cmdtype) {
    /**请求弹劾界面 */
    Cmdtype[Cmdtype["requestView"] = 0] = "requestView";
    /**发起弹劾 */
    Cmdtype[Cmdtype["requestImp"] = 1] = "requestImp";
    /**响应弹劾 */
    Cmdtype[Cmdtype["responseImp"] = 2] = "responseImp";
})(Cmdtype || (Cmdtype = {}));
/**门派类型 */
var schooleType;
(function (schooleType) {
    /**云霄 */
    schooleType[schooleType["yunxiao"] = 11] = "yunxiao";
    /**大荒 */
    schooleType[schooleType["dahuang"] = 12] = "dahuang";
    /**苍羽 */
    schooleType[schooleType["cangyu"] = 13] = "cangyu";
    /**飞雪 */
    schooleType[schooleType["feixue"] = 14] = "feixue";
    /**天雷 */
    schooleType[schooleType["tianlei"] = 15] = "tianlei";
    /**无量 */
    schooleType[schooleType["wuliang"] = 16] = "wuliang";
    /**玄冥 */
    schooleType[schooleType["xuanming"] = 17] = "xuanming";
    /**七星 */
    schooleType[schooleType["qixing"] = 18] = "qixing";
    /**丹阳 */
    schooleType[schooleType["danyang"] = 19] = "danyang";
})(schooleType || (schooleType = {}));
/**禁言 */
var Bannedtalk;
(function (Bannedtalk) {
    /**禁言 */
    Bannedtalk[Bannedtalk["BanTalk"] = 1] = "BanTalk";
    /**取消禁言 */
    Bannedtalk[Bannedtalk["BanTalkCancel"] = 2] = "BanTalkCancel";
})(Bannedtalk || (Bannedtalk = {}));
/** 帮派职位 */
var ClanPositionType;
(function (ClanPositionType) {
    /** 会长 */
    ClanPositionType[ClanPositionType["ClanMaster"] = 1] = "ClanMaster";
    /** 副会长 */
    ClanPositionType[ClanPositionType["ClanViceMaster"] = 2] = "ClanViceMaster";
    /** 第一军团长 */
    ClanPositionType[ClanPositionType["ClanArmyGroup1"] = 3] = "ClanArmyGroup1";
    /** 第二军团长 */
    ClanPositionType[ClanPositionType["ClanArmyGroup2"] = 4] = "ClanArmyGroup2";
    /** 第三军团长 */
    ClanPositionType[ClanPositionType["ClanArmyGroup3"] = 5] = "ClanArmyGroup3";
    /** 第四军团长 */
    ClanPositionType[ClanPositionType["ClanArmyGroup4"] = 6] = "ClanArmyGroup4";
    /** 第一军团精英 */
    ClanPositionType[ClanPositionType["ClanArmyGroupElite1"] = 7] = "ClanArmyGroupElite1";
    /** 第二军团精英 */
    ClanPositionType[ClanPositionType["ClanArmyGroupElite2"] = 8] = "ClanArmyGroupElite2";
    /** 第三军团精英 */
    ClanPositionType[ClanPositionType["ClanArmyGroupElite3"] = 9] = "ClanArmyGroupElite3";
    /** 第四军团精英 */
    ClanPositionType[ClanPositionType["ClanArmyGroupElite4"] = 10] = "ClanArmyGroupElite4";
    /** 成员 */
    ClanPositionType[ClanPositionType["ClanMember"] = 11] = "ClanMember";
})(ClanPositionType || (ClanPositionType = {}));
/** 帮派权限等级 */
var ClanPosLevel;
(function (ClanPosLevel) {
    /** 等级一（会长，即帮主） */
    ClanPosLevel[ClanPosLevel["LEVEL1"] = 1] = "LEVEL1";
    /** 等级一（副会长，即副帮主） */
    ClanPosLevel[ClanPosLevel["LEVEL2"] = 2] = "LEVEL2";
    /** 等级一（军团长，即堂主） */
    ClanPosLevel[ClanPosLevel["LEVEL3"] = 3] = "LEVEL3";
    /** 等级四（精英、成员） */
    ClanPosLevel[ClanPosLevel["LEVEL4"] = 4] = "LEVEL4";
})(ClanPosLevel || (ClanPosLevel = {}));
/** 帮派福利中药房产药倍率 */
var ProduceDrugRate;
(function (ProduceDrugRate) {
    /** 正常产药 */
    ProduceDrugRate[ProduceDrugRate["SELECT_BASE"] = 0] = "SELECT_BASE";
    /** 双倍产药 */
    ProduceDrugRate[ProduceDrugRate["SELECT_DOUBLE"] = 1] = "SELECT_DOUBLE";
    /** 三倍产药 */
    ProduceDrugRate[ProduceDrugRate["SELECT_THREE"] = 2] = "SELECT_THREE";
})(ProduceDrugRate || (ProduceDrugRate = {}));
/** 捐赠符文的方式 */
var FuWenSeletType;
(function (FuWenSeletType) {
    /** 活力 */
    FuWenSeletType[FuWenSeletType["HuoLi"] = 0] = "HuoLi";
    /** 符文道具 */
    FuWenSeletType[FuWenSeletType["FuWen"] = 1] = "FuWen";
})(FuWenSeletType || (FuWenSeletType = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var models;
            (function (models) {
                /** FamilyModel 帮派相关数据存储 */
                var FamilyModel = /** @class */ (function () {
                    function FamilyModel() {
                        /**加入帮派界面返回的公会列表 */
                        this.clanlist = new Dictionary();
                        /**搜索公会返回的数据 */
                        this.searchClanlist = [];
                        /**加入帮派界面 当前选择公会 服务端返回公会宗旨 */
                        /**id */
                        this.clanid = 0;
                        /**公会宗旨 */
                        this.clanaim = "";
                        /**公会曾用名 */
                        this.oldclanname = "";
                        /**申请过的公会列表 */
                        this.applyClanList = new Dictionary();
                        /**有公会 返回的数据 */
                        this.clanInfo = [];
                        /**当前玩家有工会时的数据 */
                        this.myclanInfo = [];
                        /**当前玩家的公会职位 */
                        this.RefreshPosition = new Dictionary();
                        /**公会权限表 */
                        this.clanCFactionPositionData = {};
                        /**公会大厅数据表 */
                        this.clanCFactionLobbyData = {};
                        /**g公会大厅金库数据表 */
                        this.clanCFactionGoldBankData = {};
                        /**g公会旅馆数据表 */
                        this.clanCFactionHotelData = {};
                        /**g公会药房数据表 */
                        this.clanCFactionDrugStoreData = {};
                        /**y药品购买配置 */
                        this.clanCFactionYaoFangData = {};
                        /**g公会活动表 */
                        this.clanCFactionHuoDongData = {};
                        /**公会副本参数 */
                        this.instanceCInstaceConfigData = {};
                        /**公会福利表 */
                        this.clanCFactionFuLiData = {};
                        /**g公会符文配置 */
                        this.clanCRuneSetData = {};
                        /**成员列表 */
                        this.memberlist = [];
                        /**申请列表 */
                        this.applylist = [];
                        /**公会事件 */
                        this.eventlist = [];
                        /**公会邀请数据 */
                        this.invitationroleinfolist = [];
                        /**公会邀请加入数据返回 */
                        this.ClanInvitation = new Dictionary();
                        /**自动入会数据 */
                        this.OpenAutoJoinClan = new Dictionary();
                        /**返回请求符文界面数据 */
                        this.runerequestinfolist = new Dictionary();
                        /**符文统计 */
                        this.runecountinfolist = [];
                        /**药房信息 */
                        this.pharmacyInfo = new Dictionary();
                        /**公会分红 */
                        this.bonus = 0;
                        /**公会对战列表 */
                        this.ClanFightList = new Dictionary();
                        /** 存放帮派成员信息的字典（用帮派成员id作为key） */
                        this.menmbersInfoDic = new Laya.Dictionary();
                        /** 帮派当前的子界面选择 */
                        this.clanCurrenTabNum = -1;
                        /** 当前玩家角色在帮派中的信息数据 */
                        this._selfInClanInfo = new models.ClanMemberVo();
                        FamilyModel._instance = this;
                    }
                    FamilyModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new FamilyModel();
                        }
                        return this._instance;
                    };
                    FamilyModel.clearModelData = function () {
                        family.models.FamilyModel._instance.clanlist = new Laya.Dictionary();
                        family.models.FamilyModel._instance.searchClanlist = [];
                        family.models.FamilyModel._instance.clanid = 0;
                        family.models.FamilyModel._instance.clanaim = "";
                        family.models.FamilyModel._instance.oldclanname = "";
                        family.models.FamilyModel._instance.applyClanList = new Laya.Dictionary();
                        family.models.FamilyModel._instance.clanInfo = [];
                        family.models.FamilyModel._instance.myclanInfo = [];
                        family.models.FamilyModel._instance.RefreshPosition = new Laya.Dictionary();
                        family.models.FamilyModel._instance.memberlist = [];
                        family.models.FamilyModel._instance.applylist = [];
                        family.models.FamilyModel._instance.eventlist = [];
                        family.models.FamilyModel._instance.invitationroleinfolist = [];
                        family.models.FamilyModel._instance.ClanInvitation = new Laya.Dictionary();
                        family.models.FamilyModel._instance.OpenAutoJoinClan = new Laya.Dictionary();
                        family.models.FamilyModel._instance.runerequestinfolist = new Laya.Dictionary();
                        family.models.FamilyModel._instance.runecountinfolist = [];
                        family.models.FamilyModel._instance.pharmacyInfo = new Laya.Dictionary();
                        family.models.FamilyModel._instance.bonus = 0;
                        family.models.FamilyModel._instance.ClanFightList = new Laya.Dictionary();
                        family.models.FamilyModel._instance.menmbersInfoDic = new Laya.Dictionary();
                        family.models.FamilyModel._instance.clanCurrenTabNum = -1;
                        family.models.FamilyModel._instance._selfInClanInfo = new models.ClanMemberVo();
                    };
                    /**
                    * 显示拥有的钱
                    */
                    FamilyModel.prototype.showMoney = function (money) {
                        var str;
                        if (!isNaN(money)) {
                            str = game.utils.MoneyU.number2Thousands(money);
                        }
                        else {
                            str = "0";
                        }
                        // label.text = str;
                        return str;
                    };
                    /**活动打开或者是传送 */
                    FamilyModel.activityOpenOrTransfer = {
                        open: "打开",
                        transfer: "传送"
                    };
                    return FamilyModel;
                }());
                models.FamilyModel = FamilyModel;
            })(models = family.models || (family.models = {}));
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyModel.js.map