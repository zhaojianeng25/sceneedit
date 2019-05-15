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
        var createrole;
        (function (createrole) {
            var models;
            (function (models) {
                /**  */
                models.LOGIN_EVENT2 = "loginEvent2";
                /** 进入创建角色事件 */
                models.LOGIN_EVENT = "loginEvent";
                /** 显示主界面后-活动推送弹窗 */
                models.SHOW_MAIN = "showMain";
                /** 刷新人物个人信息事件 */
                models.SRefreshRoleCurrency_EVENT = "SRefreshRoleCurrency";
                /** 刷新人物货币事件 */
                models.SRefreshCurrency_EVENT = "SRefreshCurrency";
                /** 服务器：刷新所有等级事件 */
                models.SSendInborns_EVENT = "SSendInborns";
                /** 刷新GetItemTips事件 */
                models.GetItemTips_EVENT = "GetItemTips";
                /** 进入场景返回事件 */
                models.ENTER_SCENE_EVENT = "enterScene";
                /** 得到角色随机的名字 */
                models.GET_RANDOM_NAME = "getRandomName";
                /** 创建角色有错误 */
                models.CREATE_ROLE_ERROE = "createRoleError";
                /** 登陆错误信息返回 */
                models.ERROR_INFO = "errorInfo";
                /** 预加载数据处理完毕 */
                models.PRELOAD_END = "preLoadEnd";
                // /** 玩家主动请求返回到登陆界面,界面加载完毕 */
                // export const RETURN_LOGIN_VIEW:string = "returnLoginView";
                // /** 进入游戏场景成功 */
                // export const ENTER_WORLD_SUCCESS:string = "enterWorldSuccess";
                /** 处于连接上服务器的状态 */
                models.BE_IN_CONNECTION_STATE = "beInConnectionState";
                /** 处于没连接上服务器状态 */
                models.BE_IN_NOT_CONNECTION_STATE = "beInNotConnectionState";
                var LoginProxy = /** @class */ (function (_super) {
                    __extends(LoginProxy, _super);
                    function LoginProxy() {
                        var _this = _super.call(this) || this;
                        LoginProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    LoginProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new LoginProxy();
                        }
                        return this._instance;
                    };
                    LoginProxy.prototype.init = function () {
                        models.LoginModel.getInstance();
                        this.addNetworkListener();
                        //加载角色创建配置表
                        Laya.loader.load("common/data/temp/role.createroleconfig.bin", Handler.create(this, this.onloadedCreateRoleConfigComplete), null, Loader.BUFFER);
                        //职业配置表
                        Laya.loader.load("common/data/temp/role.schoolinfo.bin", Handler.create(this, this.onloadedSchoolInfoComplete), null, Loader.BUFFER);
                        //加载NPC配置表
                        Laya.loader.load("common/data/temp/npc.cnpcshape.bin", Handler.create(this, this.onloadedNpcShapeComplete), null, Loader.BUFFER);
                        //加载Json文件
                        Laya.loader.load("common/data/serverconfig.json", Laya.Handler.create(this, this.onJsonLoaded), null, Laya.Loader.JSON);
                    };
                    /**
                     * Json文件加载
                     */
                    LoginProxy.prototype.onJsonLoaded = function () {
                        console.log("服务器Json加载完毕------ completed");
                        var _json = Laya.loader.getRes("common/data/serverconfig.json");
                        models.LoginModel.getInstance().ServerConfig = _json;
                    };
                    /**
                     * 角色创建配置表加载
                     */
                    LoginProxy.prototype.onloadedCreateRoleConfigComplete = function () {
                        console.log("CreateRoleConfig表格加载完毕------ completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/role.createroleconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.LoginModel.getInstance().createRoleConfigBinDic, game.data.template.CreateRoleConfigBaseVo, "id");
                        console.log("onloadedCreateRoleConfigComplete:", models.LoginModel.getInstance().createRoleConfigBinDic);
                    };
                    LoginProxy.prototype.onloadedSchoolInfoComplete = function () {
                        //console.log("schoolinfo表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/role.schoolinfo.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.LoginModel.getInstance().schoolInfo, game.data.template.SchoolInfoBaseVo, "id");
                        console.log("onloadedSchoolInfoComplete:", models.LoginModel.getInstance().schoolInfo);
                    };
                    LoginProxy.prototype.onloadedNpcShapeComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcshape.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.LoginModel.getInstance().cnpcShapeInfo, game.data.template.CNpcShapeBaseVo, "id");
                        console.log("onloadedNpcShapeComplete:", models.LoginModel.getInstance().cnpcShapeInfo);
                    };
                    // 添加监听
                    LoginProxy.prototype.addNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.SOnlineAnnounce, this, this.onlineAnnounce);
                        Network._instance.addHanlder(ProtocolsEnum.SCreateRole, this, this.onCreateRole);
                        Network._instance.addHanlder(ProtocolsEnum.SEnterWorld, this, this.onEnterWorld);
                        Network._instance.addHanlder(ProtocolsEnum.SRoleList, this, this.onRoleList);
                        Network._instance.addHanlder(ProtocolsEnum.SGetItemTips, this, this.onLoginGetItemTips);
                        Network._instance.addHanlder(ProtocolsEnum.SSendInborns, this, this.onSendInborns);
                        Network._instance.addHanlder(ProtocolsEnum.SGiveName, this, this.onSGiveName);
                        //Network._instance.addHanlder(ProtocolsEnum.SRecommendsNames, this, this.onSRecommendsNames);
                        Network._instance.addHanlder(ProtocolsEnum.SCreateRoleError, this, this.onSCreateRoleError);
                        Network._instance.addHanlder(ProtocolsEnum.ErrorInfo, this, this.onErrorInfo);
                        Network._instance.on(LEvent.OPEN, this, this.linkOpen);
                        Network._instance.on(LEvent.CLOSE, this, this.linkClose);
                        Network._instance.on(LEvent.ERROR, this, this.linkError);
                    };
                    /** 连接服务端正常 */
                    LoginProxy.prototype.linkOpen = function () {
                        models.LoginModel.getInstance().linkServerState = LinkState.OPEN;
                        this.event(models.BE_IN_CONNECTION_STATE);
                    };
                    /** 连接服务端关闭 */
                    LoginProxy.prototype.linkClose = function () {
                        models.LoginModel.getInstance().linkServerState = LinkState.CLOSE;
                        this.event(models.BE_IN_NOT_CONNECTION_STATE);
                    };
                    /** 连接服务端错误 */
                    LoginProxy.prototype.linkError = function () {
                        models.LoginModel.getInstance().linkServerState = LinkState.ERROR;
                        this.event(models.BE_IN_NOT_CONNECTION_STATE);
                    };
                    /**
                     * 返回登陆失败的信息
                     */
                    LoginProxy.prototype.onErrorInfo = function (optcode, msg) {
                        LoginProxy.getInstance().event(models.ERROR_INFO, msg.errorCode);
                        if (this.linkState == 1) {
                            Network._instance.event(game.modules.setBasics.models.TYPE_LINK_BROKEN_EVENT);
                        }
                    };
                    /**
                     * 返回服务器对应创建角色时是否符合规定的判断
                     */
                    LoginProxy.prototype.onSCreateRoleError = function (optcode, msg) {
                        LoginProxy.getInstance().event(models.CREATE_ROLE_ERROE, msg.errCode);
                    };
                    // /**
                    //  * 重名时，返回服务器下发的推荐角色名字
                    //  */
                    // private onSRecommendsNames(optcode: number, msg: hanlder.S2C_SRecommendsNames):void{
                    // 	console.log("-----------------------------------------------------msg.recommendNames的内容为：",msg.recommendNames);
                    // }
                    /**
                     * 返回服务器新下发的随机角色名字
                     */
                    LoginProxy.prototype.onSGiveName = function (optcode, msg) {
                        models.LoginModel.getInstance().sGiveName = msg.rolename;
                        LoginProxy.getInstance().event(models.GET_RANDOM_NAME, msg.rolename);
                    };
                    // 移除监听
                    LoginProxy.prototype.removeNetworkListener = function () {
                        //Network._instance.removeHanlder(ProtocolsEnum.SCreateRole, this, this.onCreateRole);
                        //Network._instance.removeHanlder(ProtocolsEnum.SEnterWorld, this, this.onEnterWorld);
                        Network._instance.removeHanlder(ProtocolsEnum.SRoleList, this, this.onRoleList);
                    };
                    LoginProxy.prototype.onlineAnnounce = function (optcode, msg) {
                        if (this.linkState == 1) {
                            RequesterProtocols._instance.c2s_CEnterWorld(models.LoginModel.getInstance().roleInfo.roleId, 2);
                        }
                        else {
                            RequesterProtocols._instance.c2s_CRoleList();
                            this.linkState = 1;
                        }
                        // RequesterProtocols._instance.c2s_CReturnRoleList();
                    };
                    /**获取拍卖行过期毫秒  */
                    LoginProxy.prototype.getisAuctionTime = function () {
                        var currRoleId = models.LoginModel.getInstance().roleDetail.roleid; //角色id
                        var currAccount = models.LoginModel.getInstance().userLoginAccount; //账号
                        var timestring = LocalStorage.getItem(currAccount + currRoleId.toString() + "timeStr");
                        if (timestring) {
                            models.LoginModel.getInstance().isAuctionTime = timestring;
                        }
                    };
                    // 角色列表返回
                    LoginProxy.prototype.onRoleList = function (optcode, msg) {
                        this.linkState = 1;
                        if (msg.roles.length > 0) {
                            var roleInfo = msg.roles[0];
                            var rolesNum = 2;
                            models.LoginModel.getInstance().roleInfo = msg.roles[0];
                            RequesterProtocols._instance.c2s_CEnterWorld(roleInfo.roleId, rolesNum);
                        }
                        else {
                            models.LoginProxy.getInstance().event(models.LOGIN_EVENT);
                        }
                        console.log("onRoleList", optcode, msg);
                        //console.log("onRoleList", msg.prevLoginRoleid);
                        //console.log("onRoleList", msg.prevRoleInBattle);
                        //console.log("onRoleList", msg.roles);
                        //console.log("onRoleList", msg.gacdon);
                    };
                    // 创角返回
                    LoginProxy.prototype.onCreateRole = function (optcode, msg) {
                        //logl("onCreateRole", msg.newRoleInfo);
                        console.log("onCreateRole", msg.newRoleInfo);
                        var rolesNum = 2; //msg.newRoleInfo.length;
                        //发送进入游戏请求
                        models.LoginModel.getInstance().roleInfo = msg.newRoleInfo;
                        RequesterProtocols._instance.c2s_CEnterWorld(msg.newRoleInfo.roleId, rolesNum);
                        LocalStorage.setItem("daowang_userRoleId" + models.LoginModel.getInstance().userLoginAccount, msg.newRoleInfo.roleId + "");
                    };
                    // 进入场景返回
                    LoginProxy.prototype.onEnterWorld = function (optcode, msg) {
                        //console.log("onEnterWorld", msg.mydata);
                        //let roleDetail:RoleDetailVo = new RoleDetailVo();
                        //roleDetail.roleid = msg.mydata.roleid;
                        //roleDetail.pets = msg.mydata.pets;
                        models.LoginModel.getInstance().roleDetail = msg.roleDetail;
                        var _roleDetail;
                        _roleDetail = models.LoginModel.getInstance().roleDetail;
                        /** 仓库名称统一管理 */
                        var _depotName = msg.roleDetail.depotNameInfo;
                        for (var _index in _depotName) {
                            BagModel.getInstance().depotName.set(Number(_index) - 1, _depotName[_index]);
                        }
                        console.log("---------baginfo:", msg.roleDetail.bagInfo);
                        //初始化金币和银币
                        modules.bag.models.BagModel.getInstance().bagMap = msg.roleDetail.bagInfo;
                        var bags = msg.roleDetail.bagInfo[BagTypes.BAG];
                        /** 实例化背包的实际格子 */
                        bagModel.getInstance().actBagNum = bags.capacity;
                        if (bags.currency[MoneyTypes.MoneyType_GoldCoin]) {
                            modules.bag.models.BagModel.getInstance().globalIcon = bags.currency[MoneyTypes.MoneyType_GoldCoin];
                            HudModel.getInstance().goldNum = bags.currency[MoneyTypes.MoneyType_GoldCoin];
                        }
                        if (bags.currency[MoneyTypes.MoneyType_SilverCoin]) {
                            modules.bag.models.BagModel.getInstance().sliverIcon = bags.currency[MoneyTypes.MoneyType_SilverCoin];
                            HudModel.getInstance().sliverNum = bags.currency[MoneyTypes.MoneyType_SilverCoin];
                        }
                        if (bags.currency[MoneyTypes.MoneyType_RongYu])
                            modules.bag.models.BagModel.getInstance().honnorIcon = bags.currency[MoneyTypes.MoneyType_RongYu];
                        if (bags.currency[MoneyTypes.MoneyType_HearthStone])
                            modules.bag.models.BagModel.getInstance().yuanbaoIcon = bags.currency[MoneyTypes.MoneyType_HearthStone];
                        for (var p in msg.roleDetail.pets) {
                            console.log("宠物数据");
                            console.log(msg.roleDetail.pets[p]);
                            game.modules.pet.models.PetModel.getInstance().pets.set(msg.roleDetail.pets[p].key, msg.roleDetail.pets[p]);
                            console.log(p);
                        }
                        this.initSkillArr();
                        this.initShuxing();
                        this.getisAuctionTime();
                    };
                    /**初始化一些公用属性 */
                    LoginProxy.prototype.initShuxing = function () {
                        HudModel.getInstance().levelNum = models.LoginModel.getInstance().roleDetail.level; //等级
                        HudModel.getInstance().expNum = models.LoginModel.getInstance().roleDetail.exp; //经验
                        HudModel.getInstance().hpNum = models.LoginModel.getInstance().roleDetail.hp; //当前生命值
                        HudModel.getInstance().maxHpNum = models.LoginModel.getInstance().roleDetail.maxhp; //生命值
                        HudModel.getInstance().mpNum = models.LoginModel.getInstance().roleDetail.mp; //当前法力值
                        HudModel.getInstance().maxMpNum = models.LoginModel.getInstance().roleDetail.maxmp; //最大法力值
                        HudModel.getInstance().spNum = models.LoginModel.getInstance().roleDetail.sp; //当前愤怒值//
                        HudModel.getInstance().maxSpNum = models.LoginModel.getInstance().roleDetail.maxsp; //最大愤怒值
                        HudModel.getInstance().energyNum = models.LoginModel.getInstance().roleDetail.energy; //活力
                        HudModel.getInstance().enlimitNum = models.LoginModel.getInstance().roleDetail.enlimit; //活力上限
                        HudModel.getInstance().attackNum = models.LoginModel.getInstance().roleDetail.damage; //物理攻击
                        HudModel.getInstance().magicAttackNum = models.LoginModel.getInstance().roleDetail.magicattack; //法术攻击
                        HudModel.getInstance().speedNum = models.LoginModel.getInstance().roleDetail.speed; //速度
                        HudModel.getInstance().defendNum = models.LoginModel.getInstance().roleDetail.defend; //物理防御
                        HudModel.getInstance().magicDefNum = models.LoginModel.getInstance().roleDetail.magicdef; //法术防御
                        HudModel.getInstance().medicalNum = models.LoginModel.getInstance().roleDetail.medical; //治疗强度
                        HudModel.getInstance().phyCritcLevelNum = models.LoginModel.getInstance().roleDetail.phy_critc_level; //物理暴击
                        HudModel.getInstance().antiPhyCritcLevelNum = models.LoginModel.getInstance().roleDetail.anti_phy_critc_level; //物理抗暴
                        HudModel.getInstance().magicCritcLevelNum = models.LoginModel.getInstance().roleDetail.magic_critc_level; //法术暴击
                        HudModel.getInstance().antiMagicCritcLevelNum = models.LoginModel.getInstance().roleDetail.anti_magic_critc_level; //法术抗暴
                        HudModel.getInstance().healCritLevelNum = models.LoginModel.getInstance().roleDetail.heal_critc_level; //治疗暴击
                        HudModel.getInstance().zhiliaojiashenNum = models.LoginModel.getInstance().roleDetail.zhiliaojiashen; //治疗加深
                        HudModel.getInstance().wulichuantouNum = models.LoginModel.getInstance().roleDetail.wulichuantou; //物理穿透
                        HudModel.getInstance().wulidikangNum = models.LoginModel.getInstance().roleDetail.wulidikang; //物理抵抗
                        HudModel.getInstance().fashuchuantouNum = models.LoginModel.getInstance().roleDetail.fashuchuantou; //法术穿透
                        HudModel.getInstance().fashudikangNum = models.LoginModel.getInstance().roleDetail.fashudikang; //法术抵抗
                        HudModel.getInstance().kongzhiJiachengNum = models.LoginModel.getInstance().roleDetail.kongzhijiacheng; //控制加成
                        HudModel.getInstance().kongzhiMianyiNum = models.LoginModel.getInstance().roleDetail.kongzhimianyi; //控制免疫
                        HudModel.getInstance().sealNum = models.LoginModel.getInstance().roleDetail.seal; //控制命中
                        HudModel.getInstance().unSealNum = models.LoginModel.getInstance().roleDetail.unseal; //控制抗性
                        HudModel.getInstance().gonghuiNum = models.LoginModel.getInstance().roleDetail.factionvalue; //公会贡献度
                    };
                    LoginProxy.prototype.onLoginGetItemTips = function (optcode, msg) {
                        var equipTips = StrengTheningModel.getInstance().equipTips;
                        if (equipTips.length > 0) {
                            var packId = -1;
                            var key = -1;
                            var m_i = -1;
                            for (var i = 0; i < equipTips.length; i++) {
                                var packid = equipTips[i].packid; //背包id
                                var keyinpack = equipTips[i].keyinpack; //key
                                if (packid == msg.packid && keyinpack == msg.keyinpack) {
                                    packId = packid;
                                    key = keyinpack;
                                    m_i = i;
                                }
                            }
                            if (packId != -1 && key != -1 && m_i != -1) {
                                if (packId == msg.packid && key == msg.keyinpack) {
                                    StrengTheningModel.getInstance().equipTips[m_i].tips.baseAttr = msg.tips.baseAttr;
                                    StrengTheningModel.getInstance().equipTips[m_i].tips.addAttr = msg.tips.addAttr;
                                    StrengTheningModel.getInstance().equipTips[m_i].tips.skill = msg.tips.skill;
                                    StrengTheningModel.getInstance().equipTips[m_i].tips.effect = msg.tips.effect;
                                    StrengTheningModel.getInstance().equipTips[m_i].tips.diamondID = msg.tips.diamondID;
                                    StrengTheningModel.getInstance().equipTips[m_i].tips.enhancement = msg.tips.enhancement;
                                    StrengTheningModel.getInstance().equipTips[m_i].tips.endure = msg.tips.endure;
                                    StrengTheningModel.getInstance().equipTips[m_i].tips.equipscore = msg.tips.equipscore;
                                    StrengTheningModel.getInstance().equipTips[m_i].tips.isRecover = msg.tips.isRecover;
                                    StrengTheningModel.getInstance().equipTips[m_i].tips.maxendure = msg.tips.maxendure;
                                    StrengTheningModel.getInstance().equipTips[m_i].tips.repairtimes = msg.tips.repairtimes;
                                }
                            }
                            else {
                                StrengTheningModel.getInstance().equipTips.push({ packid: msg.packid, keyinpack: msg.keyinpack, tips: msg.tips });
                            }
                        }
                        else {
                            StrengTheningModel.getInstance().equipTips.push({ packid: msg.packid, keyinpack: msg.keyinpack, tips: msg.tips });
                        }
                        LoginProxy.getInstance().event(models.GetItemTips_EVENT);
                    };
                    //服务器：刷新所有等级
                    LoginProxy.prototype.onSendInborns = function (optcode, msg) {
                        models.LoginModel.getInstance().SSendInbornsData.set("data", msg);
                        //初始化附魔技能的等级
                        var fumo = [FUMO.YUNXIAO_SKILLID, FUMO.DAHUANG_SKILLID, FUMO.CANGYU_SKILLID, FUMO.FEIXUE_SKILLID, FUMO.TIANLEI_SKILLID, FUMO.WULIANG_SKILLID, FUMO.XUANMING_SKILLID, FUMO.QIXING_SKILLID, FUMO.DANYANG_SKILLID];
                        for (var i = 0; i < 9; i++) {
                            if (msg.inborns.get(fumo[i]) != undefined) {
                                game.modules.skill.models.SkillModel.getInstance().makeEnhancementLevel = msg.inborns.get(fumo[i]);
                                game.modules.skill.models.SkillModel.getInstance().EnhancementSkillId = fumo[i];
                            }
                        }
                        this.initLevel();
                        models.LoginProxy.getInstance().event(models.SSendInborns_EVENT);
                    };
                    /**初始化战斗技能相关数组 */
                    LoginProxy.prototype.initSkillArr = function () {
                        var myData = createrole.models.LoginModel.getInstance().roleDetail;
                        var skillObj = modules.skill.models.SkillModel.getInstance().CSchoolSkillitemBinDic;
                        var costObj = modules.skill.models.SkillModel.getInstance().AcupointLevelUpBinDic;
                        var skillGridObj = modules.skill.models.SkillModel.getInstance().AcupointInfoBinDic;
                        modules.skill.models.SkillModel.getInstance().skillArr.length = 0;
                        modules.skill.models.SkillModel.getInstance().skillGridArr.length = 0;
                        modules.skill.models.SkillModel.getInstance().skillImgArr.length = 0;
                        switch (myData["school"]) {
                            case zhiye.yunxiao:
                                for (var i = 110000; i < 110008; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
                                    modules.skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
                                }
                                for (var i = 1111; i < 1119; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
                                }
                                break;
                            case zhiye.dahuang:
                                for (var i = 120000; i < 120008; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
                                    modules.skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
                                }
                                for (var i = 1211; i < 1219; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
                                }
                                break;
                            case zhiye.cangyu:
                                for (var i = 130000; i < 130008; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
                                    modules.skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
                                }
                                for (var i = 1311; i < 1319; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
                                }
                                break;
                            case zhiye.feixue:
                                for (var i = 140000; i < 140008; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
                                    modules.skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
                                }
                                for (var i = 1411; i < 1419; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
                                }
                                break;
                            case zhiye.tianlei:
                                for (var i = 150000; i < 150008; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
                                    modules.skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
                                }
                                for (var i = 1511; i < 1519; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
                                }
                                break;
                            case zhiye.wuliang:
                                for (var i = 160000; i < 160008; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
                                    modules.skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
                                }
                                for (var i = 1611; i < 1619; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
                                }
                                break;
                            case zhiye.xuanming:
                                for (var i = 161000; i < 161008; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
                                    modules.skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
                                }
                                for (var i = 1711; i < 1719; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
                                }
                                break;
                            case zhiye.qixing:
                                for (var i = 162000; i < 162008; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
                                    modules.skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
                                }
                                for (var i = 1811; i < 1819; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
                                }
                                break;
                            case zhiye.danyang:
                                for (var i = 163000; i < 163008; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillArr.push(skillObj[i]);
                                    modules.skill.models.SkillModel.getInstance().skillImgArr.push({ img: "common/icon/skill/" + skillObj[i]["normalIcon"] + ".png" });
                                }
                                for (var i = 1911; i < 1919; i++) {
                                    modules.skill.models.SkillModel.getInstance().skillGridArr.push(skillGridObj[i]);
                                }
                                break;
                        }
                    };
                    /**初始化战斗技能等级 */
                    LoginProxy.prototype.initLevel = function () {
                        var data = createrole.models.LoginModel.getInstance().SSendInbornsData.get("data"); //接受技能等级信息
                        for (var j = 0; j < modules.skill.models.SkillModel.getInstance().skillArr.length; j++) {
                            for (var i = 0; i < data.inborns.keys.length; i++) {
                                if (modules.skill.models.SkillModel.getInstance().skillGridArr[j]["id"] == data.inborns.keys[i]) {
                                    modules.skill.models.SkillModel.getInstance().skillLevelDic.set(modules.skill.models.SkillModel.getInstance().skillArr[j]["id"], data.inborns.values[i]);
                                }
                            }
                        }
                    };
                    return LoginProxy;
                }(hanlder.ProxyBase));
                models.LoginProxy = LoginProxy;
            })(models = createrole.models || (createrole.models = {}));
        })(createrole = modules.createrole || (modules.createrole = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LoginProxy.js.map