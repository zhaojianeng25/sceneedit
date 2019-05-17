/** 宠物种类图片 */
var PetKind = [
    //野生
    { url: "common/ui/pet/chongwu_yesheng.png", kind: 1 },
    //宝宝
    { url: "common/ui/pet/chongwu_bb.png", kind: 2 },
    //变异
    { url: "common/ui/pet/chongwu_bianyi.png", kind: 3 },
    //神兽
    { url: "common/ui/pet/chongwu_shenshou.png", kind: 4 },
    //灵兽
    { url: "common/ui/pet/baobaolingshou.png", kind: 5 },
    //变异灵兽
    { url: "common/ui/pet/bianyilingshou.png", kind: 6 }
];
/** 宠物栏类型 */
var PetColumnTypes;
(function (PetColumnTypes) {
    /** 人物身上的宠物栏 */
    PetColumnTypes[PetColumnTypes["PET"] = 1] = "PET";
    /** 人物的仓库宠物栏 */
    PetColumnTypes[PetColumnTypes["DEPOT"] = 2] = "DEPOT";
    /** 找宝网寄售宠物栏 */
    PetColumnTypes[PetColumnTypes["XUNBAOSELLPET"] = 3] = "XUNBAOSELLPET";
    /** 找宝网买入宠物栏 */
    PetColumnTypes[PetColumnTypes["XUNBAOBUYPET"] = 4] = "XUNBAOBUYPET";
    /** 拍卖宠物栏 */
    PetColumnTypes[PetColumnTypes["MARKETPET"] = 5] = "MARKETPET";
    /** 黑市宠物栏 */
    PetColumnTypes[PetColumnTypes["BLACKMARKETPET"] = 6] = "BLACKMARKETPET";
    /** 拍卖临时宠物栏 */
    PetColumnTypes[PetColumnTypes["MARKETPETTEMP"] = 7] = "MARKETPETTEMP";
})(PetColumnTypes || (PetColumnTypes = {}));
/** 宠物相关操作出错 */
var PetError;
(function (PetError) {
    /** 未知错误 */
    PetError[PetError["UnkownError"] = -1] = "UnkownError";
    /** key错误。找不到对应宠物 */
    PetError[PetError["KeyNotFound"] = -2] = "KeyNotFound";
    /** 添加宠物，或者存取宠物时，宠物栏已经满了 */
    PetError[PetError["PetcolumnFull"] = -3] = "PetcolumnFull";
    /** 同背包内宠物不能移动 */
    PetError[PetError["WrongDstCol"] = -4] = "WrongDstCol";
    /** 展示宠物不能入仓 */
    PetError[PetError["ShowPetCantMoveErr"] = -5] = "ShowPetCantMoveErr";
    /** 参战宠物不能入仓 */
    PetError[PetError["FightPetCantMoveErr"] = -6] = "FightPetCantMoveErr";
    /** 宠物名称过长 */
    PetError[PetError["PetNameOverLen"] = -7] = "PetNameOverLen";
    /** 宠物名称过短 */
    PetError[PetError["PetNameShotLen"] = -8] = "PetNameShotLen";
    /** 宠物名字非法 */
    PetError[PetError["PetNameInvalid"] = -9] = "PetNameInvalid";
    /** 展示的宠物不能放生 */
    PetError[PetError["ShowPetCantFree"] = -10] = "ShowPetCantFree";
    /** 正在参战的宠物不能放生 */
    PetError[PetError["FightPetCantFree"] = -11] = "FightPetCantFree";
    /** 错误的放生随机码 */
    PetError[PetError["WrongFreeCode"] = -12] = "WrongFreeCode";
    /** 有宠物装备 */
    PetError[PetError["HasEquip"] = -13] = "HasEquip";
})(PetError || (PetError = {}));
/** 宠物种类 */
var PetTypeEnum;
(function (PetTypeEnum) {
    /** 野生 */
    PetTypeEnum[PetTypeEnum["WILD"] = 1] = "WILD";
    /** 宝宝 */
    PetTypeEnum[PetTypeEnum["BABY"] = 2] = "BABY";
    /** 变异 */
    PetTypeEnum[PetTypeEnum["VARIATION"] = 3] = "VARIATION";
    /** 神兽 */
    PetTypeEnum[PetTypeEnum["SACREDANIMAL"] = 4] = "SACREDANIMAL";
})(PetTypeEnum || (PetTypeEnum = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet_1) {
            var models;
            (function (models) {
                /** 存放宠物相关数据 PetModel */
                var PetModel = /** @class */ (function () {
                    function PetModel() {
                        /**数据表*/
                        this.petCPetAttrData = {};
                        /**神兽数据表*/
                        this.petCPetShenShouIncdata = {};
                        /**宠物食品表*/
                        this.petCPetFeedItemListData = {};
                        /**宠物升级经验*/
                        this.petCPetNextExpData = {};
                        /**重置属性*/
                        this.petCPetResetPointConfigData = {};
                        /**仓库扩充价格*/
                        this.petCPetDepotPriceData = {};
                        /**c宠物一级属性转换表*/
                        this.petCPetAttrModDataData = {};
                        /**c宠物套装BUFF表*/
                        this.petEquipSuitBuffData = {};
                        /**C宠物装备精铸表*/
                        this.petEquipHeChengData = {};
                        /**c宠物技能显示表*/
                        this.petSkillConfigData = {};
                        /**宠物认证*/
                        this.petSkillupgradeData = {};
                        /**物品表*/
                        this.petCPetFeedItemAttrData = {};
                        /** 宠物套装Buff配置表 */
                        this.petSuitBuffData = {};
                        /**合宠后查看详情*/
                        this.hechognresultck = 0;
                        /**合宠查看详情*/
                        this.ischakanxq = 0;
                        /** 快捷购买表*/
                        this.cQuickBuyData = {};
                        /**宠物商店数据*/
                        this.cPetShopData = {};
                        /**当前选择tab选项 */
                        this.tabnum = 0;
                        /**选择图鉴的第几项*/
                        this.tujiannum = 0;
                        /**合宠结果*/
                        this.resultkey = -1;
                        /**是否跳到洗练界面 */
                        this.changexilian = -1;
                        /**技能学习界面*/
                        this.studyskill = -1;
                        /** 战斗宠物属性刷新 */
                        this.battlePetAttr = new Laya.Dictionary();
                        /** 可找回珍宠的列表数据 */
                        this.recoverPets = [];
                        PetModel._instance = this;
                        this.petName = "";
                        this.petbasedata = new models.PetInfoVo();
                        this.pets = new Laya.Dictionary();
                        this.currentselect = 0;
                    }
                    PetModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new PetModel();
                        }
                        return this._instance;
                    };
                    PetModel.clearModelData = function () {
                        pet.models.PetModel._instance.petName = "";
                        pet.models.PetModel._instance.pets = new Laya.Dictionary();
                        pet.models.PetModel._instance.petbasedata = new models.PetInfoVo();
                        pet.models.PetModel._instance.petskill = [];
                        pet.models.PetModel._instance.petinitfight = new models.BasicFightPropertiesVo();
                        pet.models.PetModel._instance.petbasicfight = new models.BasicFightPropertiesVo();
                        pet.models.PetModel._instance.currentselect = 0;
                        pet.models.PetModel._instance.hechognresultck = 0;
                        pet.models.PetModel._instance.ischakanxq = 0;
                        pet.models.PetModel._instance.shopinfo = [];
                        pet.models.PetModel._instance.tabnum = 0;
                        pet.models.PetModel._instance.tujiannum = 0;
                        pet.models.PetModel._instance.resultkey = -1;
                        pet.models.PetModel._instance.changexilian = -1;
                        pet.models.PetModel._instance.studyskill = -1;
                        pet.models.PetModel._instance.battlePetAttr = new Laya.Dictionary();
                        pet.models.PetModel._instance.yeShengPet = [];
                        pet.models.PetModel._instance.recoverPets = [];
                    };
                    /**是否是主动技能 参数为宠物key值*/
                    PetModel.prototype.petskilllist = function (petkey) {
                        var zhudonglist = [];
                        var petskey;
                        if (petkey) { //是否有选择其他宠物
                            petskey = petkey;
                        }
                        else { //默认为参战宠物
                            petskey = game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex;
                        }
                        var pet = this.pets.get(petskey);
                        var petskillinfo = pet.skills;
                        for (var index = 0; index < petskillinfo.length; index++) {
                            var petskill = PetModel.getInstance().petSkillConfigData[petskillinfo[index].skillId];
                            if (petskill.skilltype == 2) { //宠物技能类型 1 为被动 2为主动
                                zhudonglist.push(petskillinfo[index]);
                            }
                        }
                        return zhudonglist;
                    };
                    /** 获取宠物的头像图
                     * @param petid 宠物id
                     */
                    PetModel.prototype.getPetAvatarImg = function (petid) {
                        //该宠物基本数据
                        var petBaseData = this.petCPetAttrData[petid];
                        //造型id
                        var petModelId = petBaseData.modelid;
                        //小头像id
                        var avatarId = LoginModel.getInstance().cnpcShapeInfo[petModelId]["littleheadID"];
                        if (avatarId != undefined && avatarId != null) {
                            return "common/icon/avatarpet/" + avatarId + ".png";
                        }
                        else {
                            return null;
                        }
                    };
                    /** 获取宠物的品质边框图
                     * @param petid 宠物id
                     */
                    PetModel.prototype.getPetQualityFrameImg = function (petid) {
                        //该宠物基本数据
                        var petBaseData = this.petCPetAttrData[petid];
                        //品质
                        var petQuality = petBaseData.quality;
                        if (petQuality != undefined && petQuality != null) {
                            return modules.bag.BagSystemModule.getGameItemFrameColorResource(petQuality);
                        }
                        else {
                            return null;
                        }
                    };
                    /** 获取宠物的种类图
                     * @param petKind 宠物的种类
                     */
                    PetModel.prototype.getPetKindImg = function (petKind) {
                        for (var _i = 0, PetKind_1 = PetKind; _i < PetKind_1.length; _i++) {
                            var value = PetKind_1[_i];
                            if (value.kind == petKind) {
                                return value.url;
                            }
                        }
                        return null;
                    };
                    /** 判断是否珍品
                     * @param petid 宠物id
                     */
                    PetModel.prototype.isZhenPin = function (petid) {
                        //该宠物基本数据
                        var petBaseData = this.petCPetAttrData[petid];
                        //是否珍品
                        var unusualid = petBaseData.unusualid;
                        if (unusualid == 1 || unusualid == 2) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    /** 获得玩家角色身上的神兽数据 */
                    PetModel.prototype.getShenshouDatas = function () {
                        var _dic = new Laya.Dictionary();
                        var _petsKeys = this.pets.keys;
                        for (var i = 0; i < _petsKeys.length; i++) {
                            var _pet = this.pets.get(_petsKeys[i]);
                            if (_pet.kind == PetTypeEnum.SACREDANIMAL) {
                                _dic.set(_petsKeys[i], _pet);
                            }
                        }
                        return _dic;
                    };
                    /**中文字符串存放 */
                    PetModel.chineseStr = {
                        /**等级 */
                        dengji: "等级.",
                        /**评价 */
                        pingjia: "评价 "
                    };
                    /**资质枚举*/
                    PetModel.zizhi = {
                        /**体质 */
                        tizhi: 1460,
                        /**速度*/
                        speed: 1480,
                        /**攻击*/
                        attack: 1440,
                        /**法术*/
                        magic: 1470,
                        /**防御*/
                        defence: 1450
                    };
                    /**当前选择的宠物的最大数量 */
                    PetModel.petnum = {
                        /**普宠*/
                        normal: 31,
                        /**灵兽*/
                        lingshou: 13,
                        /**神兽*/
                        shenshou: 7
                    };
                    /**显示第一只宠物的id */
                    PetModel.petid = {
                        /**普宠*/
                        normal: 43000,
                        /**灵兽*/
                        lingshou: 43150,
                        /**神兽*/
                        shenshou: 43194
                    };
                    /**普宠类型 */
                    PetModel.normal = {
                        /**野生 */
                        yesheng: 43000,
                        /**宝宝*/
                        baobao: 43050,
                        /**变异*/
                        bianyi: 43100
                    };
                    /**灵兽类型id*/
                    PetModel.lingshou = {
                        /**宝宝*/
                        baobao: 43150,
                        /**变异*/
                        bianyi: 43172
                    };
                    /**宠物类型*/
                    PetModel.pettype = {
                        /**野生 */
                        yesheng: 0,
                        /**宝宝 */
                        baobao: 1,
                        /**普宠变异*/
                        puchongbianyi: 2,
                        /**神兽 */
                        shenshou: 3,
                        /**灵兽 */
                        lingshou: 4,
                        /**灵兽变异 */
                        bianyi: 5
                    };
                    /**宠物装备id范围 */
                    PetModel.petequipid = {
                        /**宠物装备开始的id */
                        start: 130000,
                        /**宠物装备结束的id*/
                        end: 130099
                    };
                    return PetModel;
                }());
                models.PetModel = PetModel;
            })(models = pet_1.models || (pet_1.models = {}));
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetModel.js.map