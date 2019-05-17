/**
 * 角色id
 */
var RoleType;
(function (RoleType) {
    /** 人男 */
    RoleType[RoleType["RENNAN"] = 1] = "RENNAN";
    /** 人女 */
    RoleType[RoleType["RENNV"] = 2] = "RENNV";
    /** 仙男 */
    RoleType[RoleType["XIANNAN"] = 3] = "XIANNAN";
    /** 仙女 */
    RoleType[RoleType["XIANNV"] = 4] = "XIANNV";
    /** 魔男 */
    RoleType[RoleType["MONAN"] = 5] = "MONAN";
    /** 魔女 */
    RoleType[RoleType["MONV"] = 6] = "MONV";
})(RoleType || (RoleType = {}));
;
/**
 * 角色性别
 */
var RoleSex;
(function (RoleSex) {
    /** 男 */
    RoleSex[RoleSex["MAN"] = 1] = "MAN";
    /** 女 */
    RoleSex[RoleSex["WOMAN"] = 2] = "WOMAN";
})(RoleSex || (RoleSex = {}));
;
/**
 * 创建角色判断类型
 */
var CreateErrCode;
(function (CreateErrCode) {
    /** 成功 */
    CreateErrCode[CreateErrCode["CREATE_OK"] = 1] = "CREATE_OK";
    /** 失败 */
    CreateErrCode[CreateErrCode["CREATE_ERROR"] = 2] = "CREATE_ERROR";
    /** 名称不合法 */
    CreateErrCode[CreateErrCode["CREATE_INVALID"] = 3] = "CREATE_INVALID";
    /** 重名 */
    CreateErrCode[CreateErrCode["CREATE_DUPLICATED"] = 4] = "CREATE_DUPLICATED";
    /** 创建的新角色数量过多 */
    CreateErrCode[CreateErrCode["CREATE_OVERCOUNT"] = 5] = "CREATE_OVERCOUNT";
    /** 角色名过长 */
    CreateErrCode[CreateErrCode["CREATE_OVERLEN"] = 6] = "CREATE_OVERLEN";
    /** 角色名过短 */
    CreateErrCode[CreateErrCode["CREATE_SHORTLEN"] = 7] = "CREATE_SHORTLEN";
    /** GM禁止 */
    CreateErrCode[CreateErrCode["CREATE_CREATE_GM_FORBID"] = 8] = "CREATE_CREATE_GM_FORBID";
})(CreateErrCode || (CreateErrCode = {}));
;
/**
 * 大区类型
 */
var ServerAarea;
(function (ServerAarea) {
    /** 推荐区 */
    ServerAarea[ServerAarea["RECOMMEND"] = 1] = "RECOMMEND";
    /** 普通区 */
    ServerAarea[ServerAarea["ORDINARY"] = 2] = "ORDINARY";
    /** 最近登录的区 */
    ServerAarea[ServerAarea["RECENT"] = 3] = "RECENT";
})(ServerAarea || (ServerAarea = {}));
;
/**
 * 服务器状态
 */
var ServerState;
(function (ServerState) {
    /** 繁忙 */
    ServerState[ServerState["BUSY"] = 1] = "BUSY";
    /** 良好 */
    ServerState[ServerState["GOOD"] = 2] = "GOOD";
    /** 极佳 */
    ServerState[ServerState["EXCELLENT"] = 3] = "EXCELLENT";
    /** 维护 */
    ServerState[ServerState["MAINTAIN"] = 4] = "MAINTAIN";
})(ServerState || (ServerState = {}));
/**
 * 连接服务器状态
 */
var LinkState;
(function (LinkState) {
    /** 连接上 */
    LinkState[LinkState["OPEN"] = 0] = "OPEN";
    /** 关闭了连接 */
    LinkState[LinkState["CLOSE"] = 2] = "CLOSE";
    /** 连接出错了 */
    LinkState[LinkState["ERROR"] = 3] = "ERROR";
})(LinkState || (LinkState = {}));
/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var createrole;
        (function (createrole) {
            var models;
            (function (models) {
                var LoginModel = /** @class */ (function () {
                    function LoginModel() {
                        /** 存放各种职业信息数据 */
                        this.schoolInfo = {};
                        /** 存放各种NPC的模型信息数据 */
                        this.cnpcShapeInfo = {};
                        /** 存放角色创建所需要的数据 */
                        this.createRoleConfigBinDic = {};
                        /** 存放某个页面，多用于几个页面之间的切换 */
                        this.CommonPage = "";
                        /** 服务器界面的配置 */
                        this.ServerConfig = {};
                        /** 当前玩家所选择的服务器 */
                        this.currServer = new models.ServerVo();
                        /** 用于判断登陆界面是否改变过 */
                        this.isAccountChanged = false;
                        /** 用于判断当前是重连的登陆请求还是正常的登陆请求 */
                        this.isBreakLink = false;
                        /** 中转页面 */
                        this.transferInterface = "";
                        /** 登陆后判断主界面加载进度条是否结束 */
                        this.isMainInit = false;
                        /** 拍卖行成功上架七天是否显示 时间*/
                        this.isAuctionTime = "";
                        /** 连接服务端的状态 */
                        this.linkServerState = LinkState.CLOSE;
                        LoginModel._instance = this;
                        //LoginProxy.getInstance().;
                        //LoginProxy._instance
                        this.SSendInbornsData = new Laya.Dictionary();
                    }
                    LoginModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new LoginModel();
                        }
                        return this._instance;
                    };
                    LoginModel.clearModelData = function () {
                        createrole.models.LoginModel._instance.userLoginAccount = "";
                        createrole.models.LoginModel._instance.userLoginPassword = "";
                        createrole.models.LoginModel._instance.roleInfo = new models.RoleInfoVo();
                        createrole.models.LoginModel._instance.roleDetail = new models.RoleDetailVo();
                        createrole.models.LoginModel._instance.SSendInbornsData = new Laya.Dictionary();
                        createrole.models.LoginModel._instance.CommonPage = "";
                        createrole.models.LoginModel._instance.sGiveName = "";
                        createrole.models.LoginModel._instance.currServer = new models.ServerVo();
                        createrole.models.LoginModel._instance.isAccountChanged = false;
                        createrole.models.LoginModel._instance.isBreakLink = false;
                        createrole.models.LoginModel._instance.transferInterface = "";
                        createrole.models.LoginModel._instance.isMainInit = false;
                        createrole.models.LoginModel._instance.isAuctionTime = "";
                        createrole.models.LoginModel._instance.linkServerState = LinkState.CLOSE;
                    };
                    /** 获取动作时间 */
                    LoginModel.getActionTime = function (roleType, action) {
                        switch (roleType) {
                            case RoleType.RENNAN: //人男
                                if (action == "jump_01")
                                    return (42 / 30 * 1000);
                                else if (action == "jump_02")
                                    return (46 / 30 * 1000);
                                else if (action == "rest_01")
                                    return (169 / 30 * 1000);
                                else if (action == "rest_02")
                                    return (125 / 30 * 1000);
                                else if (action == "rest_03")
                                    return (127 / 30 * 1000);
                                else if (action == "stand")
                                    return (40 / 30 * 1000);
                                else if (action == "stand_02")
                                    return (40 / 30 * 1000);
                                break;
                            case RoleType.RENNV: //人女
                                if (action == "jump_01")
                                    return (45 / 30 * 1000);
                                else if (action == "jump_02")
                                    return (35 / 30 * 1000);
                                else if (action == "rest_01")
                                    return (106 / 30 * 1000);
                                else if (action == "rest_02")
                                    return (130 / 30 * 1000);
                                else if (action == "rest_03")
                                    return (130 / 30 * 1000);
                                else if (action == "stand")
                                    return (40 / 30 * 1000);
                                else if (action == "stand_02")
                                    return (40 / 30 * 1000);
                                break;
                            case RoleType.XIANNAN:
                                if (action == "jump_01")
                                    return (46 / 30 * 1000);
                                else if (action == "jump_02")
                                    return (35 / 30 * 1000);
                                else if (action == "rest_01")
                                    return (114 / 30 * 1000);
                                else if (action == "rest_02")
                                    return (170 / 30 * 1000);
                                else if (action == "rest_03")
                                    return (114 / 30 * 1000);
                                else if (action == "stand")
                                    return (40 / 30 * 1000);
                                else if (action == "stand_02")
                                    return (40 / 30 * 1000);
                                break;
                            case RoleType.XIANNV:
                                if (action == "jump_01")
                                    return (50 / 30 * 1000);
                                else if (action == "jump_02")
                                    return (40 / 30 * 1000);
                                else if (action == "rest_01")
                                    return (162 / 30 * 1000);
                                else if (action == "rest_02")
                                    return (141 / 30 * 1000);
                                else if (action == "rest_03")
                                    return (144 / 30 * 1000);
                                else if (action == "stand")
                                    return (40 / 30 * 1000);
                                else if (action == "stand_02")
                                    return (40 / 30 * 1000);
                                break;
                            case RoleType.MONAN:
                                if (action == "jump_01")
                                    return (30 / 30 * 1000);
                                else if (action == "jump_02")
                                    return (26 / 30 * 1000);
                                else if (action == "rest_01")
                                    return (125 / 30 * 1000);
                                else if (action == "rest_02")
                                    return (149 / 30 * 1000);
                                else if (action == "rest_03")
                                    return (166 / 30 * 1000);
                                else if (action == "stand")
                                    return (40 / 30 * 1000);
                                else if (action == "stand_02")
                                    return (40 / 30 * 1000);
                                break;
                            case RoleType.MONV:
                                if (action == "jump_01")
                                    return (32 / 30 * 1000);
                                else if (action == "jump_02")
                                    return (34 / 30 * 1000);
                                else if (action == "rest_01")
                                    return (133 / 30 * 1000);
                                else if (action == "rest_02")
                                    return (136 / 30 * 1000);
                                else if (action == "rest_03")
                                    return (130 / 30 * 1000);
                                else if (action == "stand")
                                    return (40 / 30 * 1000);
                                else if (action == "stand_02")
                                    return (40 / 30 * 1000);
                                break;
                            default:
                                break;
                        }
                    };
                    /** 获取职业武器 */
                    LoginModel.getweapon = function (roleType, weapon) {
                        switch (roleType) {
                            case RoleType.RENNAN:
                                if (weapon == "weapon_dao")
                                    return 5001008; //5001001 5001010
                                else if (weapon == "weapon_qian")
                                    return 5008010; //5008001  5008010
                                else if (weapon == "weapon_bi")
                                    return 5000003; //5000001 5000010
                                break;
                            case RoleType.RENNV:
                                if (weapon == "weapon_jian")
                                    return 5005010; //5005001 5005010
                                else if (weapon == "weapon_qin")
                                    return 5004005; //5003001 5004010
                                else if (weapon == "weapon_kuilei")
                                    return 5003010;
                                break;
                            case RoleType.XIANNAN:
                                if (weapon == "weapon_fu")
                                    return 5006006; //5006001 5006010
                                else if (weapon == "weapon_bi")
                                    return 5000007;
                                else if (weapon == "weapon_qian")
                                    return 5008010;
                                break;
                            case RoleType.XIANNV:
                                if (weapon == "weapon_shanzi")
                                    return 5007006; //5007001 5007010
                                else if (weapon == "weapon_qin")
                                    return 5004009; //
                                else if (weapon == "weapon_fazhan")
                                    return 5002002;
                                break;
                            case RoleType.MONAN:
                                if (weapon == "weapon_jian")
                                    return 5005007;
                                else if (weapon == "weapon_fu")
                                    return 5006005;
                                else if (weapon == "weapon_kuilei")
                                    return 5003010;
                                break;
                            case RoleType.MONV:
                                if (weapon == "weapon_fazhan")
                                    return 5002010;
                                else if (weapon == "weapon_shanzi")
                                    return 5007010;
                                else if (weapon == "weapon_dao")
                                    return 5001010;
                                break;
                            default:
                                break;
                        }
                    };
                    /** 获取职业武器名称孔 */
                    LoginModel.getweaponName = function (roleType) {
                        switch (roleType) {
                            // case RoleType.RENNAN:
                            // return ["weapon_dao","weapon_qian","weapon_bi"]
                            // case RoleType.RENNV:
                            // return ["weapon_jian","weapon_qin","weapon_kuilei"]
                            // case RoleType.XIANNAN:
                            // return ["weapon_qian","weapon_bi","weapon_fu"]
                            // case RoleType.XIANNV:
                            // return ["weapon_shanzi","weapon_fazhan","weapon_qin"]
                            // case RoleType.MONAN:
                            // return ["weapon_kuilei","weapon_jian","weapon_fu"]
                            // case RoleType.MONV:
                            // return ["weapon_fazhan","weapon_shanzi","weapon_qin"]
                            case RoleType.RENNAN:
                                return ["weapon_dao", "weapon_qian", "weapon_bi"];
                            case RoleType.RENNV:
                                return ["weapon_jian", "weapon_kuilei", "weapon_qin"];
                            case RoleType.XIANNAN:
                                return ["weapon_bi", "weapon_fu", "weapon_qian"];
                            case RoleType.XIANNV:
                                return ["weapon_fazhan", "weapon_qin", "weapon_shanzi"];
                            case RoleType.MONAN:
                                return ["weapon_jian", "weapon_kuilei", "weapon_fu"];
                            case RoleType.MONV:
                                return ["weapon_dao", "weapon_fazhan", "weapon_shanzi"];
                            default:
                                return [];
                        }
                    };
                    /** 根据职业和性别获取不同的武器 */
                    LoginModel.getweaponBySchool = function (school, sex) {
                        switch (school) {
                            case zhiye.yunxiao:
                                if (sex == RoleSex.MAN)
                                    return "weapon_dao";
                                else if (sex == RoleSex.WOMAN)
                                    return "weapon_jian";
                            case zhiye.dahuang:
                                if (sex == RoleSex.MAN)
                                    return "weapon_qian";
                                else if (sex == RoleSex.WOMAN)
                                    return "weapon_qin";
                            case zhiye.cangyu:
                                if (sex == RoleSex.MAN)
                                    return "weapon_qian";
                                else if (sex == RoleSex.WOMAN)
                                    return "weapon_shanzi";
                            case zhiye.feixue:
                                if (sex == RoleSex.MAN)
                                    return "weapon_bi";
                                else if (sex == RoleSex.WOMAN)
                                    return "weapon_fazhan";
                            case zhiye.tianlei:
                                if (sex == RoleSex.MAN)
                                    return "weapon_kuilei";
                                else if (sex == RoleSex.WOMAN)
                                    return "weapon_fazhan";
                            case zhiye.wuliang:
                                if (sex == RoleSex.MAN)
                                    return "weapon_jian";
                                else if (sex == RoleSex.WOMAN)
                                    return "weapon_shanzi";
                            case zhiye.xuanming:
                                if (sex == RoleSex.MAN)
                                    return "weapon_bi";
                                else if (sex == RoleSex.WOMAN)
                                    return "weapon_kuilei";
                            case zhiye.qixing:
                                if (sex == RoleSex.MAN)
                                    return "weapon_fu";
                                else if (sex == RoleSex.WOMAN)
                                    return "weapon_qin";
                            case zhiye.danyang:
                                if (sex == RoleSex.MAN)
                                    return "weapon_fu";
                                else if (sex == RoleSex.WOMAN)
                                    return "weapon_qin";
                            default:
                                return "";
                        }
                    };
                    return LoginModel;
                }());
                models.LoginModel = LoginModel;
            })(models = createrole.models || (createrole.models = {}));
        })(createrole = modules.createrole || (modules.createrole = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LoginModel.js.map