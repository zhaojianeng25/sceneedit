/** 道具安全锁状态类型 */
var GoodLockState;
(function (GoodLockState) {
    /** 关闭 */
    GoodLockState[GoodLockState["CLOSE"] = 0] = "CLOSE";
    /** 开启 */
    GoodLockState[GoodLockState["OPEN"] = 1] = "OPEN";
})(GoodLockState || (GoodLockState = {}));
;
/** 离线类型 */
var OffLineType;
(function (OffLineType) {
    /** 主动下线，退出游戏 */
    OffLineType[OffLineType["OFFLINE"] = 1] = "OFFLINE";
    /** 被动断线 */
    OffLineType[OffLineType["LINK_BROKEN"] = 2] = "LINK_BROKEN";
    /** 返回人物选择界面 */
    OffLineType[OffLineType["CHOSEE_ROLE"] = 3] = "CHOSEE_ROLE";
    /** 返回登录界面 */
    OffLineType[OffLineType["RETURN_LOGIN"] = 4] = "RETURN_LOGIN";
})(OffLineType || (OffLineType = {}));
;
/** 系统设置类型 */
var SysConfigType;
(function (SysConfigType) {
    /** 音乐 */
    SysConfigType[SysConfigType["Music"] = 1] = "Music";
    /** 音量 */
    SysConfigType[SysConfigType["Volume"] = 2] = "Volume";
    /** 音效 */
    SysConfigType[SysConfigType["SoundSpecEffect"] = 3] = "SoundSpecEffect";
    /** 场景特效 */
    SysConfigType[SysConfigType["SceneEffect"] = 4] = "SceneEffect";
    /** 设置同屏最大显示人数 */
    SysConfigType[SysConfigType["MaxScreenShowNum"] = 5] = "MaxScreenShowNum";
    /** 画面刷新频率 */
    SysConfigType[SysConfigType["ScreenRefresh"] = 6] = "ScreenRefresh";
    /** 自动语音--公会频道 */
    SysConfigType[SysConfigType["AutoVoiceGang"] = 7] = "AutoVoiceGang";
    /** 自动语音--世界频道 */
    SysConfigType[SysConfigType["AutoVoiceWorld"] = 8] = "AutoVoiceWorld";
    /** 自动语音--组队频道 */
    SysConfigType[SysConfigType["AutoVoiceTeam"] = 9] = "AutoVoiceTeam";
    /** 自动语音--职业频道 */
    SysConfigType[SysConfigType["AutoVoiceSchool"] = 10] = "AutoVoiceSchool";
    /** 拒绝好友邀请 */
    SysConfigType[SysConfigType["RefuseFriend"] = 11] = "RefuseFriend";
    /** 世界频道 */
    SysConfigType[SysConfigType["WorldChannel"] = 12] = "WorldChannel";
    /** 公会频道 */
    SysConfigType[SysConfigType["GangChannel"] = 13] = "GangChannel";
    /** 职业频道 */
    SysConfigType[SysConfigType["SchoolChannel"] = 14] = "SchoolChannel";
    /** 当前频道 */
    SysConfigType[SysConfigType["CurrentChannel"] = 15] = "CurrentChannel";
    /** 组队频道 */
    SysConfigType[SysConfigType["TeamChannel"] = 16] = "TeamChannel";
    /** PVPNotify */
    SysConfigType[SysConfigType["PVPNotify"] = 17] = "PVPNotify";
    /** 好友聊天记录加密 */
    SysConfigType[SysConfigType["friendchatencrypt"] = 18] = "friendchatencrypt";
    /** 只接受好友消息 */
    SysConfigType[SysConfigType["friendmessage"] = 19] = "friendmessage";
    /** rolePointAdd */
    SysConfigType[SysConfigType["rolePointAdd"] = 20] = "rolePointAdd";
    /** petPointAdd */
    SysConfigType[SysConfigType["petPointAdd"] = 21] = "petPointAdd";
    /** skillPointAdd */
    SysConfigType[SysConfigType["skillPointAdd"] = 22] = "skillPointAdd";
    /** huoyueduAdd */
    SysConfigType[SysConfigType["huoyueduAdd"] = 23] = "huoyueduAdd";
    /** zhenfaAdd */
    SysConfigType[SysConfigType["zhenfaAdd"] = 24] = "zhenfaAdd";
    /** 技能开放 */
    SysConfigType[SysConfigType["skillopen"] = 25] = "skillopen";
    /** 公会开放 */
    SysConfigType[SysConfigType["factionopen"] = 26] = "factionopen";
    /** 宠物开放 */
    SysConfigType[SysConfigType["petopen"] = 27] = "petopen";
    /** 助战开放 */
    SysConfigType[SysConfigType["patopen"] = 28] = "patopen";
    /** 组队频道 */
    SysConfigType[SysConfigType["zuduichannel"] = 29] = "zuduichannel";
    /** 挂机开放 */
    SysConfigType[SysConfigType["guajiopen"] = 30] = "guajiopen";
    /** 指引开放 */
    SysConfigType[SysConfigType["zhiyinopen"] = 31] = "zhiyinopen";
    /** 活动开放 */
    SysConfigType[SysConfigType["huodongopen"] = 32] = "huodongopen";
    /** 切磋 */
    SysConfigType[SysConfigType["refuseqiecuo"] = 33] = "refuseqiecuo";
    /** 推送巨龙护卫 */
    SysConfigType[SysConfigType["ts_julonghuwei"] = 34] = "ts_julonghuwei";
    /** 推送巨龙军团 */
    SysConfigType[SysConfigType["ts_julongjuntuan"] = 35] = "ts_julongjuntuan";
    /** 推送冠军试炼 */
    SysConfigType[SysConfigType["ts_guanjunshilian"] = 36] = "ts_guanjunshilian";
    /** 推送人文探索 */
    SysConfigType[SysConfigType["ts_renwentansuo"] = 37] = "ts_renwentansuo";
    /** 推送1v1 */
    SysConfigType[SysConfigType["ts_1v1"] = 38] = "ts_1v1";
    /** 推送工会副本 */
    SysConfigType[SysConfigType["ts_gonghuifuben"] = 39] = "ts_gonghuifuben";
    /** 推送3v3 */
    SysConfigType[SysConfigType["ts_3v3"] = 40] = "ts_3v3";
    /** 推送智慧试炼 */
    SysConfigType[SysConfigType["ts_zhihuishilian"] = 41] = "ts_zhihuishilian";
    /** 拒绝公会邀请 */
    SysConfigType[SysConfigType["refuseclan"] = 42] = "refuseclan";
    /** 拒绝别人查看装备 */
    SysConfigType[SysConfigType["refuseotherseeequip"] = 43] = "refuseotherseeequip";
    /** 录屏功能 */
    SysConfigType[SysConfigType["screenrecord"] = 44] = "screenrecord";
    /** 装备耐久 */
    SysConfigType[SysConfigType["equipendure"] = 45] = "equipendure";
    /** 工会战 */
    SysConfigType[SysConfigType["ts_gonghuizhan"] = 46] = "ts_gonghuizhan";
    /** ROLL点设置 */
    SysConfigType[SysConfigType["rolldianshezhi"] = 47] = "rolldianshezhi";
    /** 界面简化 */
    SysConfigType[SysConfigType["framesimplify"] = 48] = "framesimplify";
})(SysConfigType || (SysConfigType = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var setBasics;
        (function (setBasics) {
            var models;
            (function (models) {
                /** 系统设置的models */
                var SetBasicsModel = /** @class */ (function () {
                    function SetBasicsModel() {
                        /** 道具安全锁信息 */
                        this.itemLockInfo = new models.ItemLockInfoVo();
                        SetBasicsModel._instance = this;
                        this.SysConfigDic = new Laya.Dictionary(); //key：参考SysConfigType，即系统设置类型枚举类，value:0--关闭；1--开启。除了设置同屏最大人数是50与10
                        this.resetSysConfigDic = new Laya.Dictionary();
                        this._isRrturnLoginflag = false;
                    }
                    SetBasicsModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new SetBasicsModel();
                        }
                        return this._instance;
                    };
                    SetBasicsModel.clearModelData = function () {
                        setBasics.models.SetBasicsModel._instance.itemLockInfo = new models.ItemLockInfoVo();
                        setBasics.models.SetBasicsModel._instance.SysConfigDic = new Laya.Dictionary();
                        setBasics.models.SetBasicsModel._instance.resetSysConfigDic = new Laya.Dictionary();
                        setBasics.models.SetBasicsModel._instance.setLineConfig = new Laya.Dictionary();
                    };
                    return SetBasicsModel;
                }());
                models.SetBasicsModel = SetBasicsModel;
            })(models = setBasics.models || (setBasics.models = {}));
        })(setBasics = modules.setBasics || (modules.setBasics = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SetBasicsModel.js.map