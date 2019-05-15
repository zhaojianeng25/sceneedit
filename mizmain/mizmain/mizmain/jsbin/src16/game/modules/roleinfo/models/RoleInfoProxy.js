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
/**角色系统枚举 */
var RoleEnum;
(function (RoleEnum) {
    /**永久称谓 */
    RoleEnum[RoleEnum["PERMANENT_TITLE"] = 11470] = "PERMANENT_TITLE";
    /**隐藏称谓 */
    RoleEnum[RoleEnum["HIDE_TITLE"] = 11325] = "HIDE_TITLE";
    /**称谓描述 */
    RoleEnum[RoleEnum["TITLE_DESCRIBE"] = 11326] = "TITLE_DESCRIBE";
    /**时间毫秒数 */
    RoleEnum[RoleEnum["TIME_MILLISCOND"] = 1000] = "TIME_MILLISCOND";
    /**打工消耗活力 */
    RoleEnum[RoleEnum["WORK_COST"] = 100] = "WORK_COST";
    /**没有附魔技能消耗活力 */
    RoleEnum[RoleEnum["NO_SKILL_COST"] = 0] = "NO_SKILL_COST";
    /**人物属性界面key */
    RoleEnum[RoleEnum["SHUXING_KEY"] = 1] = "SHUXING_KEY";
    /**人物信息界面key */
    RoleEnum[RoleEnum["XINXI_KEY"] = 2] = "XINXI_KEY";
    /**人物加点界面key */
    RoleEnum[RoleEnum["JIADIAN_KEY"] = 3] = "JIADIAN_KEY";
    /**加点说明*/
    RoleEnum[RoleEnum["JIADIAN_EXPLAIN"] = 11796] = "JIADIAN_EXPLAIN";
    /**加点提示 */
    RoleEnum[RoleEnum["JIADIAN_TIP"] = 420014] = "JIADIAN_TIP";
    /**属性滑动条宽度 */
    RoleEnum[RoleEnum["SLIDER_WIDTH"] = 163] = "SLIDER_WIDTH";
    /**基础属性条值 */
    RoleEnum[RoleEnum["BASIC_VALUE"] = 0.16666666666666666] = "BASIC_VALUE";
    /**升级属性点加上基本属性点 */
    RoleEnum[RoleEnum["SHUING_POINT"] = 6] = "SHUING_POINT";
    /**元宝兑换银币 */
    RoleEnum[RoleEnum["YUANBAO_YINBI"] = 10000] = "YUANBAO_YINBI";
    /**金币兑换银币 */
    RoleEnum[RoleEnum["JINBI_YINBI"] = 100] = "JINBI_YINBI";
    /**仙晶不足提示 */
    RoleEnum[RoleEnum["XIANJIN_TIP"] = 150506] = "XIANJIN_TIP";
    /**首次切换方案 */
    RoleEnum[RoleEnum["FIRST_SWITCH"] = 150011] = "FIRST_SWITCH";
    /**切换方案提示 */
    RoleEnum[RoleEnum["SWITCH_TIP"] = 150012] = "SWITCH_TIP";
    /**人物基础生命 */
    RoleEnum[RoleEnum["BASIC_LIFE"] = 212] = "BASIC_LIFE";
    /**人物基础物攻 */
    RoleEnum[RoleEnum["BASIC_ATTACK"] = 100] = "BASIC_ATTACK";
    /**人物基础法力 */
    RoleEnum[RoleEnum["BASIC_MP"] = 206] = "BASIC_MP";
    /**人物基础法攻 */
    RoleEnum[RoleEnum["BASIC_MAGIC_ATTACK"] = 82] = "BASIC_MAGIC_ATTACK";
    /**人物基础物防 */
    RoleEnum[RoleEnum["BASIC_DEFEND"] = 53] = "BASIC_DEFEND";
    /**人物基础速度 */
    RoleEnum[RoleEnum["BASIC_SPEED"] = 31] = "BASIC_SPEED";
    /**人物基础法防 */
    RoleEnum[RoleEnum["BASIC_MAGIC_DEF"] = 42] = "BASIC_MAGIC_DEF";
    /**声望值 */
    RoleEnum[RoleEnum["SHENGWANG_TITLE"] = 11277] = "SHENGWANG_TITLE";
    /**声望提示 */
    RoleEnum[RoleEnum["SHENGWANG_TIP"] = 11795] = "SHENGWANG_TIP";
    /**援助声望上限 */
    RoleEnum[RoleEnum["MAX_YUANZHU"] = 2000] = "MAX_YUANZHU";
    /**荣誉值 */
    RoleEnum[RoleEnum["RONGYU_TITLE"] = 11278] = "RONGYU_TITLE";
    /**荣誉提示 */
    RoleEnum[RoleEnum["RONGYU_TIP"] = 11793] = "RONGYU_TIP";
    /**门派贡献 */
    RoleEnum[RoleEnum["SCHOOL_TITLE"] = 11352] = "SCHOOL_TITLE";
    /**门派贡献提示 */
    RoleEnum[RoleEnum["SCHOOL_TIP"] = 11792] = "SCHOOL_TIP";
    /**声望商店 */
    RoleEnum[RoleEnum["SHENGWANG_SHOP"] = 1] = "SHENGWANG_SHOP";
    /**荣誉商店 */
    RoleEnum[RoleEnum["RONGYU_SHOP"] = 2] = "RONGYU_SHOP";
    /**每日限购数量 */
    RoleEnum[RoleEnum["LIMIT_NUM"] = 10] = "LIMIT_NUM";
    /**转盘花费门派贡献 */
    RoleEnum[RoleEnum["COST_SCHOOL_NUM"] = 60] = "COST_SCHOOL_NUM";
    /**体质 */
    RoleEnum[RoleEnum["TIZHI"] = 2186] = "TIZHI";
    /**智力 */
    RoleEnum[RoleEnum["ZHILI"] = 2188] = "ZHILI";
    /**力量 */
    RoleEnum[RoleEnum["LILIANG"] = 2185] = "LILIANG";
    /**耐力 */
    RoleEnum[RoleEnum["NAILI"] = 2189] = "NAILI";
    /**敏捷 */
    RoleEnum[RoleEnum["MINJIE"] = 2187] = "MINJIE";
    /**重置全属性 */
    RoleEnum[RoleEnum["RESET_ALL"] = 10022] = "RESET_ALL";
    /**药品商店 */
    RoleEnum[RoleEnum["DRUG_SHOP"] = 1] = "DRUG_SHOP";
    /**小键盘输入最大值 */
    RoleEnum[RoleEnum["MAXINPUT_VALUE"] = 99] = "MAXINPUT_VALUE";
    /**无帮派 */
    RoleEnum[RoleEnum["NO_FACTION"] = 11290] = "NO_FACTION";
    /**公会地图id */
    RoleEnum[RoleEnum["GONGHUI_MAP"] = 1711] = "GONGHUI_MAP";
    /**信用度 */
    RoleEnum[RoleEnum["CREDIT_LINE"] = 11619] = "CREDIT_LINE";
    /**信用度提示 */
    RoleEnum[RoleEnum["CREDIT_LINE_TIP"] = 11620] = "CREDIT_LINE_TIP";
    /**生命储备 */
    RoleEnum[RoleEnum["HP_STORE"] = 500009] = "HP_STORE";
    /**魔法储备 */
    RoleEnum[RoleEnum["MP_STORE"] = 500010] = "MP_STORE";
    /**最大储备值 */
    RoleEnum[RoleEnum["MAX_STORE_VALUE"] = 100000] = "MAX_STORE_VALUE";
    /**援助战斗 */
    RoleEnum[RoleEnum["YUANZHU_ZHANDOU"] = 11313] = "YUANZHU_ZHANDOU";
    /**援助战斗提示 */
    RoleEnum[RoleEnum["YUANZHU_ZHANDOU_TIP"] = 11301] = "YUANZHU_ZHANDOU_TIP";
    /**援助物品 */
    RoleEnum[RoleEnum["YUANZHU_WUPIN"] = 11473] = "YUANZHU_WUPIN";
    /**援助物品提示 */
    RoleEnum[RoleEnum["YUANZHU_WUPIN_TIP"] = 11471] = "YUANZHU_WUPIN_TIP";
    /**求助物品 */
    RoleEnum[RoleEnum["QIUZHU_WUPIN"] = 11474] = "QIUZHU_WUPIN";
    /**求助物品提示 */
    RoleEnum[RoleEnum["QIUZHU_WUPIN_TIP"] = 11472] = "QIUZHU_WUPIN_TIP";
    /**声望商店序号 */
    RoleEnum[RoleEnum["SHENGWANG_SHOP_ID"] = 7] = "SHENGWANG_SHOP_ID";
    /**荣誉商店序号 */
    RoleEnum[RoleEnum["RONGYU_SHOP_ID"] = 8] = "RONGYU_SHOP_ID";
    /**购买类型 */
    RoleEnum[RoleEnum["BUY_TYPE"] = 6] = "BUY_TYPE";
    /**酒馆序号 */
    RoleEnum[RoleEnum["JIUGUAN_SHOP_ID"] = 2] = "JIUGUAN_SHOP_ID";
})(RoleEnum || (RoleEnum = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var roleinfo;
        (function (roleinfo) {
            var models;
            (function (models) {
                /**人物信息界面回复 */
                models.SRspRoleInfo_EVENT = "SRspRoleInfo";
                /**转盘开始 */
                models.SBeginSchoolWheel_EVENT = "SBeginSchoolWheel";
                /**刷新人物加点后的加点面板数值 */
                models.SRefreshPointType_EVENT = "SRefreshPointType";
                /**打工赚钱返回 */
                models.SLiveSkillMakeFarm_EVENT = "SLiveSkillMakeFarm";
                /**制作附魔道具返回 */
                models.SLiveSkillMakeEnhancement_EVENT = "SLiveSkillMakeEnhancement";
                /**商品限购次数查询 */
                models.SQueryLimit_EVENT = "SQueryLimit";
                /**援助统计面板 */
                models.SReqHelpCountView_EVENT = "SReqHelpCountView";
                /**援助声望当前值 */
                models.SSendHelpSW_EVENT = "SSendHelpSW";
                /**返回人物切换加点方案次数 */
                models.SReqPointSchemeTime_EVENT = "SReqPointSchemeTime";
                /**服务器回复角色盈福经验 */
                models.SApplyYingFuExprience_EVENT = "SApplyYingFuExprience";
                /** 打开遮罩 */
                models.OPEN_ZHEZHAO = "OpenZheZhao";
                /** 打开遮罩 */
                models.CLOSE_ZHEZHAO = "CloseZheZhao";
                /** 角色系统的中转服务Proxy*/
                var RoleInfoProxy = /** @class */ (function (_super) {
                    __extends(RoleInfoProxy, _super);
                    function RoleInfoProxy() {
                        var _this = _super.call(this) || this;
                        RoleInfoProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    RoleInfoProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new RoleInfoProxy();
                        }
                        return this._instance;
                    };
                    RoleInfoProxy.prototype.init = function () {
                        RoleInfoProxy.getInstance();
                        this.addNetworkListener();
                        Laya.loader.load("common/data/temp/role.caddpointresetitemconfig.bin", Handler.create(this, this.onloadedAddPointResetItemConfigComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/role.cresmoneyconfig.bin", Handler.create(this, this.onloadedCResMoneyConfigComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/role.cattrmoddata.bin", Handler.create(this, this.onloadedCAttrModDataComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/shop.cnpcsale.bin", Handler.create(this, this.onloadedCNpcSaleComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/game.cschoolwheel.bin", Handler.create(this, this.onloadedCSchoolWheelComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/title.ctitleconfig.bin", Handler.create(this, this.onloadedCTitleComplete), null, Loader.BUFFER); /** 称谓表 */
                        Laya.loader.load("common/data/temp/role.caddpointchange.bin", Handler.create(this, this.onloadedCaddpointchangeComplete), null, Loader.BUFFER);
                    };
                    /**j加点方案切换消耗 */
                    RoleInfoProxy.prototype.onloadedCaddpointchangeComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/role.caddpointchange.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.RoleInfoModel.getInstance().CaddpointchangeDic, game.data.template.CaddpointchangeBaseVo, "id");
                    };
                    /**x洗点道具配置表 */
                    RoleInfoProxy.prototype.onloadedAddPointResetItemConfigComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/role.caddpointresetitemconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.RoleInfoModel.getInstance().addPointResetItemConfigBinDic, game.data.template.AddPointResetItemConfigBaseVo, "id");
                    };
                    /**s升级经验限制表 */
                    RoleInfoProxy.prototype.onloadedCResMoneyConfigComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/role.cresmoneyconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.RoleInfoModel.getInstance().CResMoneyConfigBinDic, game.data.template.ResMoneyConfigBaseVo, "id");
                    };
                    /**y一级属性转换表 */
                    RoleInfoProxy.prototype.onloadedCAttrModDataComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/role.cattrmoddata.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.RoleInfoModel.getInstance().CAttrModDataBinDic, game.data.template.AttrModDataBaseVo, "id");
                    };
                    /**NPCMT3买卖物品表 */
                    RoleInfoProxy.prototype.onloadedCNpcSaleComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/shop.cnpcsale.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.RoleInfoModel.getInstance().CNpcSaleBinDic, game.data.template.CNpcSaleBaseVo, "id");
                    };
                    /**z职业转盘表 */
                    RoleInfoProxy.prototype.onloadedCSchoolWheelComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cschoolwheel.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.RoleInfoModel.getInstance().CSchoolWheelBinDic, game.data.template.CSchoolWheelBaseVo, "id");
                    };
                    /**c称谓表 */
                    RoleInfoProxy.prototype.onloadedCTitleComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/title.ctitleconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.RoleInfoModel.getInstance().CRoleTitleBinDic, game.data.template.CTitleConfigBaseVo, "id");
                    };
                    /**添加监听 */
                    RoleInfoProxy.prototype.addNetworkListener = function () {
                        //监听人物信息界面生命储备和魔法储备的变化值
                        Network._instance.addHanlder(ProtocolsEnum.SRspRoleInfo, this, this.onRspRoleInfo);
                        //监听职业贡献转盘开始消息
                        Network._instance.addHanlder(ProtocolsEnum.SBeginSchoolWheel, this, this.onBeginSchoolWheel);
                        //监听人物加点后的加点面板值
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshPointType, this, this.onRefreshDian);
                        //监听打工返回
                        Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeFarm, this, this.onLiveSkillMakeFarm);
                        //监听制作附魔道具返回
                        Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeEnhancement, this, this.onLiveSkillMakeEnhancement);
                        //监听商品限购次数改变
                        Network._instance.addHanlder(ProtocolsEnum.SQueryLimit, this, this.onQueryLimit);
                        //监听援助统计面板值
                        Network._instance.addHanlder(ProtocolsEnum.SReqHelpCountView, this, this.onReqHelpCountView);
                        //监听援助声望值
                        Network._instance.addHanlder(ProtocolsEnum.SSendHelpSW, this, this.onSendHelpSW);
                        //监听人物加点方案切换次数
                        Network._instance.addHanlder(ProtocolsEnum.SReqPointSchemeTime, this, this.onReqPointSchemeTime);
                        //监听角色盈福经验
                        Network._instance.addHanlder(ProtocolsEnum.SApplyYingFuExprience, this, this.onApplyYingFuExprience);
                        //使用称谓返回
                        Network._instance.addHanlder(ProtocolsEnum.SOnTitle, this, this.onSOnTitle);
                        //移除称谓返回
                        Network._instance.addHanlder(ProtocolsEnum.SOffTitle, this, this.onSOffTitle);
                    };
                    /**移除监听 */
                    RoleInfoProxy.prototype.removeNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.SRspRoleInfo, this, this.onRspRoleInfo);
                        Network._instance.addHanlder(ProtocolsEnum.SBeginSchoolWheel, this, this.onBeginSchoolWheel);
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshPointType, this, this.onRefreshDian);
                        Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeFarm, this, this.onLiveSkillMakeFarm);
                        Network._instance.addHanlder(ProtocolsEnum.SLiveSkillMakeEnhancement, this, this.onLiveSkillMakeEnhancement);
                        Network._instance.addHanlder(ProtocolsEnum.SQueryLimit, this, this.onQueryLimit);
                        Network._instance.addHanlder(ProtocolsEnum.SReqHelpCountView, this, this.onReqHelpCountView);
                        Network._instance.addHanlder(ProtocolsEnum.SSendHelpSW, this, this.onSendHelpSW);
                        Network._instance.addHanlder(ProtocolsEnum.SReqPointSchemeTime, this, this.onReqPointSchemeTime);
                        Network._instance.addHanlder(ProtocolsEnum.SApplyYingFuExprience, this, this.onApplyYingFuExprience);
                    };
                    /** 服务器返回佩戴的称号 */
                    RoleInfoProxy.prototype.onSOnTitle = function (optcode, msg) {
                        var OnTitle = new Laya.Dictionary;
                        var roleTitle = new Laya.Dictionary;
                        /** key 角色id value 称谓id */
                        roleTitle.set(msg.roleid, msg.titleid);
                        OnTitle.set("OnTitle", roleTitle);
                        game.scene.models.SceneProxy.getInstance().event(game.scene.models.TEAM_STATE, OnTitle);
                    };
                    /** 服务器返回删除称谓 */
                    RoleInfoProxy.prototype.onSOffTitle = function (optcode, msg) {
                        var OnTitle = new Laya.Dictionary;
                        var roleTitle = new Laya.Dictionary;
                        /** key 角色id value 称谓id */
                        roleTitle.set(msg.roleid, -1);
                        OnTitle.set("OnTitle", roleTitle);
                        game.scene.models.SceneProxy.getInstance().event(game.scene.models.TEAM_STATE, OnTitle);
                    };
                    /**服务器回复角色盈福经验 */
                    RoleInfoProxy.prototype.onApplyYingFuExprience = function (optcode, msg) {
                        models.RoleInfoModel.getInstance().SApplyYingFuExprience = msg.exprience;
                        RoleInfoProxy.getInstance().event(models.SApplyYingFuExprience_EVENT);
                    };
                    /**人物信息界面回复 */
                    RoleInfoProxy.prototype.onRspRoleInfo = function (optcode, msg) {
                        models.RoleInfoModel.getInstance().SRspRoleInfoData.set("data", msg);
                        RoleInfoProxy.getInstance().event(models.SRspRoleInfo_EVENT);
                    };
                    /**转盘开始 */
                    RoleInfoProxy.prototype.onBeginSchoolWheel = function (optcode, msg) {
                        models.RoleInfoModel.getInstance().SBeginSchoolWheelData.set("data", msg);
                        RoleInfoProxy.getInstance().event(models.SBeginSchoolWheel_EVENT);
                    };
                    /**刷新人物加点后的加点面板数值 */
                    RoleInfoProxy.prototype.onRefreshDian = function (optcode, msg) {
                        models.RoleInfoModel.getInstance().SRefreshPointTypeData.set("data", msg);
                        RoleInfoProxy.getInstance().event(models.SRefreshPointType_EVENT);
                    };
                    /**打工赚钱返回 */
                    RoleInfoProxy.prototype.onLiveSkillMakeFarm = function (optcode, msg) {
                        models.RoleInfoModel.getInstance().SLiveSkillMakeFarmData.set("data", msg);
                        RoleInfoProxy.getInstance().event(models.SLiveSkillMakeFarm_EVENT, msg.addgold);
                    };
                    /**制作附魔道具返回 */
                    RoleInfoProxy.prototype.onLiveSkillMakeEnhancement = function (optcode, msg) {
                        models.RoleInfoModel.getInstance().SLiveSkillMakeEnhancementData.set("data", msg);
                        RoleInfoProxy.getInstance().event(models.SLiveSkillMakeEnhancement_EVENT);
                    };
                    /**商品限购次数查询 */
                    RoleInfoProxy.prototype.onQueryLimit = function (optcode, msg) {
                        models.RoleInfoModel.getInstance().SQueryLimitData.set("data", msg);
                        RoleInfoProxy.getInstance().event(models.SQueryLimit_EVENT);
                    };
                    /**援助统计面板 */
                    RoleInfoProxy.prototype.onReqHelpCountView = function (optcode, msg) {
                        models.RoleInfoModel.getInstance().SReqHelpCountViewData.set("data", msg);
                        RoleInfoProxy.getInstance().event(models.SReqHelpCountView_EVENT);
                    };
                    /**援助声望当前值 */
                    RoleInfoProxy.prototype.onSendHelpSW = function (optcode, msg) {
                        models.RoleInfoModel.getInstance().SSendHelpSWData.set("data", msg);
                        RoleInfoProxy.getInstance().event(models.SSendHelpSW_EVENT);
                    };
                    /**返回人物切换加点方案次数 */
                    RoleInfoProxy.prototype.onReqPointSchemeTime = function (optcode, msg) {
                        models.RoleInfoModel.getInstance().SReqPointSchemeTimeData.set("data", msg);
                        RoleInfoProxy.getInstance().event(models.SReqPointSchemeTime_EVENT);
                    };
                    return RoleInfoProxy;
                }(hanlder.ProxyBase));
                models.RoleInfoProxy = RoleInfoProxy;
            })(models = roleinfo.models || (roleinfo.models = {}));
        })(roleinfo = modules.roleinfo || (modules.roleinfo = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleInfoProxy.js.map