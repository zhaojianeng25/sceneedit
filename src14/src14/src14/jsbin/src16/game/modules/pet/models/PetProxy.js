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
    var modules;
    (function (modules) {
        var pet;
        (function (pet_1) {
            var models;
            (function (models) {
                /**修改名字*/
                models.CHANGEUI_EVENT = "changeui_event";
                /**刷新宠物列表*/
                models.REFRESH_EVENT = "refresh_event";
                /**刷新宠物状态*/
                models.REFRESHSTATE_EVENT = "refreshstate_event";
                /**放生宠物*/
                models.RELEASEPET_EVENT = "release_event";
                /**宠物学习技能*/
                models.STUDYPETSELECT_EVENT = "studypetselect_event";
                /**刷新选中的宠物信息*/
                models.REFRESHSELECT_EVNT = "refreshselect_event";
                /**合宠信息*/
                models.HECHONG_EVENT = "hechong_event";
                /**刷新资质界面*/
                models.REFRESHZIZHI_EVENT = "refreshzizhi_event";
                /**寿命增加*/
                models.REFRESHSHOUMING_EVENT = "refreshshouming_event";
                /**商品价格*/
                models.SHOPPRICE_EVENT = "shopprice_event";
                /**人物身上增加宠物*/
                models.ADD_EVENT = "add_event";
                /**人物身上删除宠物*/
                models.DEL_PET = "del_pet";
                /**获得宠物信息*/
                models.GETPETINFO = "getpetinfo";
                /** 获得珍宠找回列表数据 */
                models.GET_PETRECOVERDATA = "getPetRecoverData";
                /** 找回珍宠成功 */
                models.RECOVER_PET_SUCCESS = "recoverPetSuccess";
                /** 获得所要查看需找回珍宠的信息数据 */
                models.GET_PETRECOVER_INFODATA = "getPetRecoverInfoData";
                /**取消*/
                models.CANCEL = "cancel";
                /**确定*/
                models.QUEDING = "queding";
                /** 装备精铸 */
                models.JINZHURESULT = "jingzhuresult";
                /** 请求仓库数据返回 */
                models.GET_PET_DEPOT_DATA = "getPetDepotData";
                /** 宠物相关操作出错 */
                models.GET_PetError = "getPetError";
                /** 宠物仓库增加了宠物 */
                models.DEPOT_ADD_PET = "depotGetPet";
                /** 宠物仓库减少了宠物 */
                models.DEPOT_REMOVE_PET = "depotRemovePet";
                /** 刷新宠物仓库最大容量 */
                models.NewPetDepotMaxNum = "newPetDepotMaxNum";
                /**宠物成功洗练飘窗 */
                models.XILIAN_PET_BAY = "xilianpetbay";
                /** 神兽提升成功 */
                models.SHENSHOU_INC_SUCCESS = "shenShouIncSuccess";
                /** 宠物相关协议 PetProxy */
                var PetProxy = /** @class */ (function (_super) {
                    __extends(PetProxy, _super);
                    function PetProxy() {
                        var _this = _super.call(this) || this;
                        _this.xiliankey = 0; /**洗练完后宠物保存的KEY*/
                        PetProxy._instance = _this;
                        _this.addNetworkListener();
                        Laya.loader.load("common/data/temp/pet.cpetattr.bin", Handler.create(_this, _this.onloadedPetCPetAttrComplete), null, Loader.BUFFER); //宠物数据表
                        Laya.loader.load("common/data/temp/pet.cshenshouinc.bin", Handler.create(_this, _this.onloadedPetCShenShouIncComplete), null, Loader.BUFFER); //神兽提升表	
                        Laya.loader.load("common/data/temp/pet.cpetfeeditemlist.bin", Handler.create(_this, _this.onloadedPetCPetFeedItemListComplete), null, Loader.BUFFER); //培养道具
                        Laya.loader.load("common/data/temp/pet.cpetnextexp.bin", Handler.create(_this, _this.onloadedPetCPetNextExpComplete), null, Loader.BUFFER); //宠物升级所需经验
                        Laya.loader.load("common/data/temp/pet.cpetresetpointconfig.bin", Handler.create(_this, _this.onloadedPetCPetResetPointConfigComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/pet.cpetdepotprice.bin", Handler.create(_this, _this.onloadedPetCPetDepotPriceComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/pet.cpetattrmoddata.bin", Handler.create(_this, _this.onloadedPetCPetDepotPriceComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/item.cpetequipsuitbuff.bin", Handler.create(_this, _this.onloadedPetEquipSuitBuffComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/item.cpetequiphecheng.bin", Handler.create(_this, _this.onloadedPetEquipHeChengComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/skill.cpetskillconfig.bin", Handler.create(_this, _this.onloadedPetSkillConfigComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/skill.cpetskillupgrade.bin", Handler.create(_this, _this.onloadedPetSkillupgradeComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/pet.cpetfeeditemattr.bin", Handler.create(_this, _this.onloadedPetCPetFeedItemAttrComplete), null, Loader.BUFFER); //宠物食品
                        Laya.loader.load("common/data/temp/shop.cquickbuy.bin", Handler.create(_this, _this.onloadedCQuickBuyComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/shop.cpetshop.bin", Handler.create(_this, _this.onloadedCPetShopComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/item.cpetequipsuitbuff.bin", Handler.create(_this, _this.onloadedCPetEquipSuitBuffComplete), null, Loader.BUFFER); //宠物套装buff配置表
                        return _this;
                    }
                    /** 加载宠物套装buff配置表 */
                    PetProxy.prototype.onloadedCPetEquipSuitBuffComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetequipsuitbuff.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.PetModel.getInstance().petSuitBuffData, game.data.template.PetEquipSuitBuffBaseVo, "id");
                    };
                    PetProxy.prototype.addNetworkListener = function () {
                        /**合宠	*/
                        Network._instance.addHanlder(ProtocolsEnum.SPetSynthesize, this, this.PetSynthesize);
                        /**刷新宠物信息*/
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshPetInfo, this, this.petinfo);
                        /**增加宠物栏*/
                        Network._instance.addHanlder(ProtocolsEnum.SAddPetToColumn, this, this.addpetcolumn);
                        /**移除宠物*/
                        Network._instance.addHanlder(ProtocolsEnum.SRemovePetFromCol, this, this.removepetcol);
                        /**刷新宠物经验*/
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshPetExp, this, this.currentpetexp);
                        /**刷新出战宠物*/
                        Network._instance.addHanlder(ProtocolsEnum.SSetFightPet, this, this.currentfightpet);
                        /**刷新重置宠物*/
                        Network._instance.addHanlder(ProtocolsEnum.SSetFightPetRest, this, this.restpet);
                        /**获取仓库宠物信息*/
                        Network._instance.addHanlder(ProtocolsEnum.SGetPetcolumnInfo, this, this.getpetcolumninfo);
                        /**宠物提示信息*/
                        Network._instance.addHanlder(ProtocolsEnum.SPetError, this, this.peterr);
                        /**宠物更改名字*/
                        Network._instance.addHanlder(ProtocolsEnum.SModPetName, this, this.modpetname);
                        /**宠物战斗位置*/
                        Network._instance.addHanlder(ProtocolsEnum.SPetGossip, this, this.petGossip);
                        /**刷新宠物技能*/
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshPetSkill, this, this.RefreshPetSkill);
                        /**展示宠物信息	*/
                        Network._instance.addHanlder(ProtocolsEnum.SShowPetInfo, this, this.ShowPetInfo);
                        /**刷新仓库宠物信息*/
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshPetColumnCapacity, this, this.RefreshPetColumnCapacity);
                        /**刷新宠物评分*/
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshPetScore, this, this.RefreshPetScore);
                        /**设置宠物自动加点*/
                        Network._instance.addHanlder(ProtocolsEnum.SPetSetAutoAddPoint, this, this.PetSetAutoAddPoint);
                        /**洗宠	*/
                        Network._instance.addHanlder(ProtocolsEnum.SPetWash, this, this.PetWash);
                        /**技能认证*/
                        Network._instance.addHanlder(ProtocolsEnum.SPetSkillCertification, this, this.PetSkillCertification);
                        /**资质培养*/
                        Network._instance.addHanlder(ProtocolsEnum.SPetAptitudeCultivate, this, this.PetAptitudeCultivate);
                        /**宠物信息*/
                        Network._instance.addHanlder(ProtocolsEnum.SGetPetInfo, this, this.GetPetInfo);
                        /**找回宠物列表*/
                        Network._instance.addHanlder(ProtocolsEnum.SPetRecoverList, this, this.PetRecoverList);
                        /**找回宠物*/
                        Network._instance.addHanlder(ProtocolsEnum.SPetRecover, this, this.PetRecover);
                        /**找回宠物信息	*/
                        Network._instance.addHanlder(ProtocolsEnum.SRecoverPetInfo, this, this.RecoverPetInfo);
                        /**刷新宠物数据*/
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshPetData, this, this.RefreshPetData);
                        /**商店价格*/
                        Network._instance.addHanlder(ProtocolsEnum.SResponseShopPrice, this, this.ShopPrice);
                        /**宠物装备合成*/
                        Network._instance.addHanlder(ProtocolsEnum.SHeChengPetEquip, this, this.jingzhuzhuangbei);
                    };
                    /**商店价格*/
                    PetProxy.prototype.ShopPrice = function (optcode, msg) {
                        models.PetModel._instance.shopinfo = msg.goodsList;
                        for (var GoodsIndex = 0; GoodsIndex < msg.goodsList.length; GoodsIndex++) { /** 数据存放在model,方便取用 */
                            bagModel.getInstance().getGoods.set(msg.goodsList[GoodsIndex].goodsid, msg.goodsList[GoodsIndex]);
                        }
                        models.PetProxy.getInstance().event(models.SHOPPRICE_EVENT);
                    };
                    /**移除宠物*/
                    PetProxy.prototype.removepetcol = function (optcode, msg) {
                        console.log("删除宠物");
                        if (msg.columnid == PetColumnTypes.PET) {
                            var bag_1 = game.modules.bag.models.BagModel.getInstance().bagMap[9];
                            var baginfo = bag_1.get(msg.petkey);
                            if (baginfo) {
                                bag_1.remove(msg.petkey);
                            }
                            models.PetModel.getInstance().pets.remove(msg.petkey);
                            models.PetProxy.getInstance().event(models.DEL_PET);
                        }
                        else if (msg.columnid == PetColumnTypes.DEPOT) {
                            this.event(models.DEPOT_REMOVE_PET, msg.petkey);
                        }
                    };
                    /**增加宠物栏*/
                    PetProxy.prototype.addpetcolumn = function (optcode, msg) {
                        //增加宠物
                        console.log("增加宠物" + msg);
                        if (msg.columnid == PetColumnTypes.PET) { //增加宠物 
                            var petinfo = msg.petdata;
                            models.PetModel.getInstance().pets.set(petinfo.key, petinfo);
                            models.PetProxy.getInstance().event(models.ADD_EVENT);
                            if (petinfo.key == models.PetModel.getInstance().resultkey) {
                                models.PetModel.getInstance().resultkey = -1;
                                models.PetProxy.getInstance().event(models.HECHONG_EVENT, petinfo.key);
                            }
                        }
                        else if (msg.columnid == PetColumnTypes.DEPOT) {
                            this.event(models.DEPOT_ADD_PET, msg.petdata);
                        }
                    };
                    PetProxy.prototype.PetSynthesize = function (optcode, msg) {
                        console.log("合成宠物");
                        var pet = game.modules.pet.models.PetModel.getInstance().pets.get(msg.petkey);
                        if (pet) {
                            models.PetModel.getInstance().resultkey = -1;
                            models.PetProxy.getInstance().event(models.HECHONG_EVENT, msg.petkey);
                        }
                        else {
                            models.PetModel.getInstance().resultkey = msg.petkey;
                        }
                    };
                    /**刷新宠物信息*/
                    PetProxy.prototype.petinfo = function (optcode, msg) {
                        console.log("刷新宠物数据" + this.xiliankey);
                        this.xiliankey = msg.petinfo.key;
                        var petinfo = msg.petinfo;
                        models.PetModel.getInstance().pets.set(this.xiliankey, msg.petinfo);
                        models.PetModel.getInstance().petbasedata = msg.petinfo;
                        models.PetModel.getInstance().petbasicfight = models.PetModel.getInstance().petbasedata.bfp;
                        console.log(msg.petinfo);
                        models.PetProxy.getInstance().event(models.REFRESH_EVENT);
                        if (petinfo.shenshouinccount > 0) {
                            models.PetProxy.getInstance().event(models.SHENSHOU_INC_SUCCESS);
                        }
                    };
                    /**刷新宠物经验*/
                    PetProxy.prototype.currentpetexp = function (optcode, msg) {
                        var petinfo = models.PetModel.getInstance().pets.get(msg.petkey);
                        petinfo.exp = msg.curexp;
                        models.PetModel.getInstance().pets.set(msg.petkey, petinfo);
                    };
                    /**刷新出战宠物*/
                    PetProxy.prototype.currentfightpet = function (optcode, msg) {
                        LoginModel.getInstance().roleDetail.petIndex = msg.petkey;
                        //检查身上是否持有该要被设为出战的宠物
                        this.reCheckIsHavePet(msg.petkey);
                    };
                    /** 检查玩家身上的宠物栏是否有该要被设为出战的宠物 */
                    PetProxy.prototype.reCheckIsHavePet = function (petKey) {
                        var _pets = models.PetModel.getInstance().pets;
                        var _petsKeys = _pets.keys;
                        var _isHavePet = false;
                        for (var i = 0; i < _petsKeys.length; i++) {
                            if (petKey == _petsKeys[i]) {
                                this.dispatchSetFightPetMsg();
                                _isHavePet = true;
                                break;
                            }
                        }
                        if (!_isHavePet) {
                            //若没有持有该宠物，等待直到增加了该要被设为出战的宠物
                            this.once(models.ADD_EVENT, this, this.reCheckIsHavePet, [petKey]);
                        }
                    };
                    /** 派发设置出战宠物的消息 */
                    PetProxy.prototype.dispatchSetFightPetMsg = function () {
                        models.PetProxy.getInstance().event(models.REFRESHSTATE_EVENT);
                    };
                    /**获取仓库宠物信息*/
                    PetProxy.prototype.getpetcolumninfo = function (optcode, msg) {
                        switch (msg.columnid) {
                            case PetColumnTypes.DEPOT:
                                this.event(models.GET_PET_DEPOT_DATA, [msg.pets, msg.colunmSize]);
                                break;
                        }
                        console.log("刷新宠物数据4");
                    };
                    /**宠物提示信息*/
                    PetProxy.prototype.peterr = function (optcode, msg) {
                        this.event(models.GET_PetError, msg.peterror);
                        console.log("错误信息：" + msg.peterror);
                    };
                    /**宠物更改名字*/
                    PetProxy.prototype.modpetname = function (optcode, msg) {
                        console.log("修改宠物名字");
                        var petinfo = models.PetModel.getInstance().pets.get(msg.petkey);
                        petinfo.name = msg.petname;
                        models.PetModel.getInstance().pets.set(msg.petkey, petinfo);
                        models.PetProxy.getInstance().event(models.REFRESH_EVENT);
                    };
                    /**宠物战斗位置*/
                    PetProxy.prototype.petGossip = function (optcode, msg) {
                        console.log("刷新宠物数据5");
                    };
                    /**刷新宠物技能*/
                    PetProxy.prototype.RefreshPetSkill = function (optcode, msg) {
                        var petinfo = models.PetModel.getInstance().pets.get(msg.petkey);
                        petinfo.skills = msg.skills;
                        models.PetModel.getInstance().petbasedata = petinfo;
                        models.PetModel.getInstance().pets.set(msg.petkey, petinfo);
                        models.PetModel.getInstance().petskill = msg.skills;
                        models.PetProxy.getInstance().event(models.REFRESH_EVENT);
                    };
                    /**展示宠物信息	*/
                    PetProxy.prototype.ShowPetInfo = function (optcode, msg) {
                        console.log("刷新宠物数据7");
                        console.log(msg.petdata);
                    };
                    /**服务器向客户端刷新宠物栏的最大容量 */
                    PetProxy.prototype.RefreshPetColumnCapacity = function (optcode, msg) {
                        switch (msg.columnid) {
                            case PetColumnTypes.DEPOT:
                                this.event(models.NewPetDepotMaxNum, msg.capacity);
                                break;
                        }
                        console.log("刷新宠物数据8");
                    };
                    /**刷新宠物评分*/
                    PetProxy.prototype.RefreshPetScore = function (optcode, msg) {
                        console.log("宠物评分刷新");
                        var petinfo = models.PetModel.getInstance().pets.get(msg.petkey);
                        if (petinfo != null) { //宠物信息是否为空
                            petinfo.petscore = msg.petscore;
                            petinfo.petbasescore = msg.petbasescore;
                            models.PetModel.getInstance().petbasedata = petinfo;
                            models.PetModel.getInstance().pets.set(msg.petkey, petinfo);
                            models.PetProxy.getInstance().event(models.REFRESH_EVENT);
                        }
                    };
                    /**设置宠物自动加点*/
                    PetProxy.prototype.PetSetAutoAddPoint = function (optcode, msg) {
                        console.log("宠物自动加点方案");
                        var petinfo = models.PetModel.getInstance().pets.get(msg.petkey);
                        petinfo.autoaddcons = msg.cons;
                        petinfo.autoaddiq = msg.iq;
                        petinfo.autoaddstr = msg.str;
                        petinfo.autoaddendu = msg.endu;
                        petinfo.autoaddagi = msg.agi;
                        models.PetModel.getInstance().pets.set(msg.petkey, petinfo);
                        models.PetProxy.getInstance().event(models.REFRESH_EVENT); //刷新宠物
                    };
                    /**洗练宠物*/
                    PetProxy.prototype.PetWash = function (optcode, msg) {
                        console.log("洗练宠物:" + msg.petkey);
                        this.xiliankey = msg.petkey;
                        models.PetProxy.getInstance().event(models.XILIAN_PET_BAY); //宠物洗练成功
                    };
                    /**宠物技能认证*/
                    PetProxy.prototype.PetSkillCertification = function (optcode, msg) {
                        console.log("宠物技能认证");
                        var petinfo = models.PetModel.getInstance().pets.get(msg.petkey);
                        for (var p in models.PetModel._instance.petskill) {
                            if (models.PetModel._instance.petskill[p].skillId == msg.skillId) { //是否有该技能
                                models.PetModel._instance.petskill[p].certification = msg.isconfirm;
                            }
                        }
                        petinfo.skills = models.PetModel._instance.petskill;
                        models.PetModel._instance.pets.set(msg.petkey, petinfo);
                        models.PetProxy.getInstance().event(models.REFRESH_EVENT); //刷新宠物
                    };
                    /**刷新资质界面*/
                    PetProxy.prototype.PetAptitudeCultivate = function (optcode, msg) {
                        var data = [];
                        var zizhiid = [1460, 1480, 1440, 1470, 1450];
                        var num;
                        var petinfo = models.PetModel.getInstance().pets.get(msg.petkey);
                        for (var index = 0; index < 5; index++) {
                            if (zizhiid[index] == msg.aptid) { //是否有响应的资质
                                num = index;
                                break;
                            }
                        }
                        switch (num) { //0为体质 1 速度 2攻击 3法术 4防御
                            case 0:
                                petinfo.phyforceapt = msg.aptvalue;
                                break;
                            case 1:
                                petinfo.speedapt = msg.aptvalue;
                                break;
                            case 2:
                                petinfo.attackapt = msg.aptvalue;
                                break;
                            case 3:
                                petinfo.magicapt = msg.aptvalue;
                                break;
                            case 4:
                                petinfo.defendapt = msg.aptvalue;
                                break;
                            default:
                                break;
                        }
                        models.PetModel.getInstance().pets.set(msg.petkey, petinfo);
                        models.PetProxy.getInstance().event(models.REFRESHZIZHI_EVENT, [num, msg.aptvalue]); //刷新资质界面
                    };
                    /**宠物信息*/
                    PetProxy.prototype.GetPetInfo = function (optcode, msg) {
                        models.PetProxy.getInstance().event(models.GETPETINFO, [msg.petinfo]);
                    };
                    /** 获得找回珍宠的列表 */
                    PetProxy.prototype.PetRecoverList = function (optcode, msg) {
                        models.PetModel.getInstance().recoverPets = [];
                        models.PetModel.getInstance().recoverPets = msg.pets;
                        this.event(models.GET_PETRECOVERDATA, [msg.pets]);
                    };
                    /** 找回宠物 */
                    PetProxy.prototype.PetRecover = function (optcode, msg) {
                        this.event(models.RECOVER_PET_SUCCESS, [msg.petId, msg.uniqId]);
                    };
                    /** 查看所要找回宠物的信息	*/
                    PetProxy.prototype.RecoverPetInfo = function (optcode, msg) {
                        this.event(models.GET_PETRECOVER_INFODATA, [msg.petInfo]);
                    };
                    /**重置属性*/
                    PetProxy.prototype.restpet = function (optcode, msg) {
                        LoginModel.getInstance().roleDetail.petIndex = -1;
                        models.PetProxy.getInstance().event(models.REFRESHSTATE_EVENT);
                    };
                    /**刷新宠物数据data*/
                    PetProxy.prototype.RefreshPetData = function (optcode, msg) {
                        console.log("刷新宠物数据data");
                        var petinfo = models.PetModel.getInstance().pets.get(msg.petkey);
                        if (msg.datas.get(1360) != null) { //生命数据
                            petinfo.life = msg.datas.get(1360);
                        }
                        else {
                            var bft = new game.modules.pet.models.BasicFightPropertiesVo();
                            var jy = models.PetModel.getInstance().petCPetNextExpData[msg.datas.get(1230)];
                            for (var p in msg.datas.keys) {
                                switch (msg.datas.keys[p]) {
                                    case 10:
                                        petinfo.bfp.cons = msg.datas.get(10); //体质
                                        break;
                                    case 20:
                                        petinfo.bfp.iq = msg.datas.get(20); //智力
                                        break;
                                    case 30:
                                        petinfo.bfp.str = msg.datas.get(30); //力量
                                        break;
                                    case 40:
                                        petinfo.bfp.endu = msg.datas.get(40); //耐力
                                        break;
                                    case 50:
                                        petinfo.bfp.agi = msg.datas.get(50); //敏捷
                                        break;
                                    case 70:
                                        petinfo.maxhp = msg.datas.get(70); //最大生命值
                                        break;
                                    case 80:
                                        petinfo.hp = msg.datas.get(80); //当前生命值
                                        break;
                                    case 90:
                                        petinfo.maxmp = msg.datas.get(90); //最大MP
                                        petinfo.maxmp = parseInt(petinfo.maxmp.toFixed(0));
                                        break;
                                    case 100:
                                        petinfo.mp = msg.datas.get(100); //当前MP
                                        break;
                                    case 130:
                                        petinfo.attack = msg.datas.get(130); //攻击
                                        break;
                                    case 140:
                                        petinfo.defend = msg.datas.get(140); //防御
                                        break;
                                    case 150:
                                        petinfo.magicattack = msg.datas.get(150); //法术攻击
                                        break;
                                    case 160:
                                        petinfo.magicdef = msg.datas.get(160); //法术防御
                                        break;
                                    case 200:
                                        petinfo.speed = msg.datas.get(200); //速度
                                        break;
                                    case 1400:
                                        petinfo.point = msg.datas.get(1400); //剩余潜力点
                                        break;
                                    case 1230:
                                        petinfo.level = msg.datas.get(1230); //等级
                                        break;
                                    default:
                                        break;
                                }
                            }
                            if (jy != null) { //经验是否为空
                                petinfo.nexp = jy.exp;
                            }
                        }
                        models.PetModel.getInstance().pets.set(msg.petkey, petinfo);
                        models.PetModel.getInstance().petbasedata = petinfo;
                        models.PetModel.getInstance().petbasicfight = petinfo.bfp;
                        models.PetProxy.getInstance().event(models.REFRESHSHOUMING_EVENT);
                    };
                    /**精铸结果返回*/
                    PetProxy.prototype.jingzhuzhuangbei = function (optcode, msg) {
                        if (msg.getitemid == 0) { //精铸失败
                            models.PetProxy.getInstance().event(models.JINZHURESULT, [0]);
                        }
                        else {
                            models.PetProxy.getInstance().event(models.JINZHURESULT, [1]);
                        }
                    };
                    /**宠物商店数据*/
                    PetProxy.prototype.onloadedCPetShopComplete = function () {
                        console.log("CPetShop表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cpetshop.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.PetModel.getInstance().cPetShopData, game.data.template.CPetShopBaseVo, "id");
                        // console.log("RoleRColorModel.configData:",this.cPetShopData);
                    };
                    //c宠物物品表
                    PetProxy.prototype.onloadedPetCPetFeedItemAttrComplete = function () {
                        console.log("PetCPetFeedItemAttr表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetfeeditemattr.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.PetModel.getInstance().petCPetFeedItemAttrData, game.data.template.PetCPetFeedItemAttrBaseVo, "id");
                        //	console.log("petCPetFeedItemAttrData:",this.petCPetFeedItemAttrData);
                    };
                    PetProxy.prototype.onloadedPetSkillupgradeComplete = function () {
                        console.log("PetSkillupgradeData表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cpetskillupgrade.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.PetModel.getInstance().petSkillupgradeData, game.data.template.PetSkillupgradeBaseVo, "id");
                        //	console.log("PetSkillupgradeData:", this.petSkillupgradeData);
                    };
                    PetProxy.prototype.onloadedPetSkillConfigComplete = function () {
                        console.log("PetSkillConfigData表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cpetskillconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.PetModel.getInstance().petSkillConfigData, game.data.template.PetSkillConfigBaseVo, "id");
                        //	console.log("PetSkillConfigData:", this.petSkillConfigData);
                    };
                    PetProxy.prototype.onloadedPetEquipHeChengComplete = function () {
                        console.log("PetEquipHeChengData表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetequiphecheng.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.PetModel.getInstance().petEquipHeChengData, game.data.template.PetEquipHeChengBaseVo, "id");
                        //console.log("PetEquipHeChengData:", this.petEquipHeChengData);
                    };
                    PetProxy.prototype.onloadedPetEquipSuitBuffComplete = function () {
                        console.log("PetEquipSuitBuffData表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetequipsuitbuff.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.PetModel.getInstance().petEquipSuitBuffData, game.data.template.PetEquipSuitBuffBaseVo, "id");
                        //	console.log("PetEquipSuitBuffData:", this.petEquipSuitBuffData);
                    };
                    //c宠物一级属性转换表
                    PetProxy.prototype.onloadedPetCPetAttrModDataComplete = function () {
                        console.log("PetCPetAttrModData表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetattrmoddata.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.PetModel.getInstance().petCPetAttrModDataData, game.data.template.PetCPetAttrModDataBaseVo, "id");
                        //console.log("petCPetAttrModDataData:",this.petCPetAttrModDataData);
                    };
                    //c宠物仓库扩充价格
                    PetProxy.prototype.onloadedPetCPetDepotPriceComplete = function () {
                        console.log("PetCPetDepotPrice表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetdepotprice.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.PetModel.getInstance().petCPetDepotPriceData, game.data.template.PetCPetDepotPriceBaseVo, "id");
                        //	console.log("petCPetDepotPriceData:",this.petCPetDepotPriceData);
                    };
                    //c宠物属性重置消耗
                    PetProxy.prototype.onloadedPetCPetResetPointConfigComplete = function () {
                        console.log("PetCPetResetPointConfig表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetresetpointconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.PetModel.getInstance().petCPetResetPointConfigData, game.data.template.PetCPetResetPointConfigBaseVo, "id");
                    };
                    //c宠物基本数据
                    PetProxy.prototype.onloadedPetCPetAttrComplete = function () {
                        console.log("PetCPetAttr表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetattr.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.PetModel.getInstance().petCPetAttrData, game.data.template.PetCPetAttrBaseVo, "id");
                        console.log("petCPetAttrData:", models.PetModel.getInstance().petCPetAttrData);
                    };
                    //c宠物灵兽提升
                    PetProxy.prototype.onloadedPetCShenShouIncComplete = function () {
                        console.log("PetCShenShouInc表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cshenshouinc.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.PetModel.getInstance().petCPetShenShouIncdata, game.data.template.PetCShenShouIncBaseVo, "id");
                        console.log("PetCShenShouIncData:", models.PetModel.getInstance().petCPetShenShouIncdata);
                    };
                    //c宠物培养显示表
                    PetProxy.prototype.onloadedPetCPetFeedItemListComplete = function () {
                        console.log("PetCPetFeedItemList表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetfeeditemlist.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.PetModel.getInstance().petCPetFeedItemListData, game.data.template.PetCPetFeedItemListBaseVo, "id");
                        console.log("petCPetFeedItemListData:", models.PetModel.getInstance().petCPetFeedItemListData);
                    };
                    //c宠物升级经验表
                    PetProxy.prototype.onloadedPetCPetNextExpComplete = function () {
                        console.log("PetCPetNextExp表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetnextexp.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.PetModel.getInstance().petCPetNextExpData, game.data.template.PetCPetNextExpBaseVo, "id");
                        //console.log("petCPetNextExpData:",this.petCPetNextExpData);
                    };
                    PetProxy.prototype.onloadedCQuickBuyComplete = function () {
                        console.log("CQuickBuy表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cquickbuy.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.PetModel.getInstance().cQuickBuyData, game.data.template.CQuickBuyBaseVo, "id");
                        // console.log("RoleRColorModel.configData:",this.cQuickBuyData);
                    };
                    PetProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new PetProxy();
                        }
                        return this._instance;
                    };
                    return PetProxy;
                }(hanlder.ProxyBase));
                models.PetProxy = PetProxy;
            })(models = pet_1.models || (pet_1.models = {}));
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetProxy.js.map