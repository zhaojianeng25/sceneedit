/**
* name
*/
var TipsMsgType;
(function (TipsMsgType) {
    /** 透明框提示 */
    TipsMsgType[TipsMsgType["TIPS_POPMSG"] = 1] = "TIPS_POPMSG";
    /** npc对话框提示 */
    TipsMsgType[TipsMsgType["TIPS_NPCTALK"] = 2] = "TIPS_NPCTALK";
    /** 消息频道提示 */
    TipsMsgType[TipsMsgType["TIPS_MSG_CHANNEL"] = 3] = "TIPS_MSG_CHANNEL";
    /** 系统公告提示 */
    TipsMsgType[TipsMsgType["TIPS_SYSBOARD"] = 4] = "TIPS_SYSBOARD";
    /** 确认框提示 */
    TipsMsgType[TipsMsgType["TIPS_CONFIRM"] = 5] = "TIPS_CONFIRM";
    /** 公会频道提示 */
    TipsMsgType[TipsMsgType["TIPS_CLAN"] = 7] = "TIPS_CLAN";
    /** 当前频道提示 */
    TipsMsgType[TipsMsgType["TIPS_CUR_CHANNEL"] = 8] = "TIPS_CUR_CHANNEL";
    /** 世界频道提示 */
    TipsMsgType[TipsMsgType["TIPS_WORLD"] = 9] = "TIPS_WORLD";
    /** 队伍频道提示 */
    TipsMsgType[TipsMsgType["TIPS_TEAM_CHANNEL"] = 13] = "TIPS_TEAM_CHANNEL";
    /** 职业频道提示 */
    TipsMsgType[TipsMsgType["TIPS_PRO_CHANNEL"] = 14] = "TIPS_PRO_CHANNEL";
    /** 系统频道提示 */
    TipsMsgType[TipsMsgType["TIPS_SYS_CHANNEL"] = 15] = "TIPS_SYS_CHANNEL";
    /** 跑马灯提示 */
    TipsMsgType[TipsMsgType["TIPS_ROLE_CHANNEL"] = 18] = "TIPS_ROLE_CHANNEL";
    /** 不在综合频道显示只在聊天频道 */
    TipsMsgType[TipsMsgType["TIPS_IN_CHAT_VIEW"] = -15] = "TIPS_IN_CHAT_VIEW";
})(TipsMsgType || (TipsMsgType = {}));
var InterfaceSwitch;
(function (InterfaceSwitch) {
    /** 频道接收 */
    InterfaceSwitch[InterfaceSwitch["INTERFACE_OPEN"] = 1] = "INTERFACE_OPEN";
    /** 频道关闭 */
    InterfaceSwitch[InterfaceSwitch["INTERFACE_CLOSE"] = 0] = "INTERFACE_CLOSE";
})(InterfaceSwitch || (InterfaceSwitch = {}));
var ChannelType;
(function (ChannelType) {
    /** 当前频道 */
    ChannelType[ChannelType["CHANNEL_CURRENT"] = 1] = "CHANNEL_CURRENT";
    /** 队伍频道 */
    ChannelType[ChannelType["CHANNEL_TEAM"] = 2] = "CHANNEL_TEAM";
    /** 职业频道 */
    ChannelType[ChannelType["CHANNEL_PROFESSION"] = 3] = "CHANNEL_PROFESSION";
    /** 公会频道 */
    ChannelType[ChannelType["CHANNEL_CLAN"] = 4] = "CHANNEL_CLAN";
    /** 世界频道 */
    ChannelType[ChannelType["CHANNEL_WORLD"] = 5] = "CHANNEL_WORLD";
    /** 系统频道 */
    ChannelType[ChannelType["CHANNEL_SYSTEM"] = 6] = "CHANNEL_SYSTEM";
    /** 消息频道 */
    ChannelType[ChannelType["CHANNEL_MESSAGE"] = 7] = "CHANNEL_MESSAGE";
    /** 气泡消息 */
    ChannelType[ChannelType["CHANNEL_BUBBLE"] = 8] = "CHANNEL_BUBBLE";
    /** 滑动消息 */
    ChannelType[ChannelType["CHANNEL_SLIDE"] = 9] = "CHANNEL_SLIDE";
    /** 跨服天梯消息 */
    ChannelType[ChannelType["CHANNEL_CROSS_TT"] = 10] = "CHANNEL_CROSS_TT";
    /** 跨服房间消息 */
    ChannelType[ChannelType["CHANNEL_CROSS_ROOM"] = 11] = "CHANNEL_CROSS_ROOM";
    /** 组队申请频道 */
    ChannelType[ChannelType["CHANNEL_TEAM_APPLY"] = 14] = "CHANNEL_TEAM_APPLY";
})(ChannelType || (ChannelType = {}));
var ChatMsgId;
(function (ChatMsgId) {
    /** 请不要说话太快 */
    ChatMsgId[ChatMsgId["CHAT_SPEED_LIMIT"] = 0] = "CHAT_SPEED_LIMIT";
    /** 你还没有队伍 */
    ChatMsgId[ChatMsgId["CANNOT_USE_TEAM_CHANNEL"] = 140498] = "CANNOT_USE_TEAM_CHANNEL";
    /** 每隔N秒才能在世界频道发言 */
    ChatMsgId[ChatMsgId["CHAT_WORLD_CHANNEL_TIME_LIMIT"] = 140500] = "CHAT_WORLD_CHANNEL_TIME_LIMIT";
    /** 等级不足N级不能在世界频道发言 */
    ChatMsgId[ChatMsgId["CHAT_WORLD_CHANNEL_LEVEL_LIMIT"] = 140501] = "CHAT_WORLD_CHANNEL_LEVEL_LIMIT";
    /** 未加入公会,不能使用公会频道 */
    ChatMsgId[ChatMsgId["CANNOT_USE_FACTION_CHANNEL"] = 141053] = "CANNOT_USE_FACTION_CHANNEL";
    /** 每隔N秒才能在组队申请频道发言 */
    ChatMsgId[ChatMsgId["CHAT_TEAM_APPLY_CHANNEL_TIME_LIMIT"] = 150028] = "CHAT_TEAM_APPLY_CHANNEL_TIME_LIMIT";
    /**  等级不足N级不能在职业频道发言 */
    ChatMsgId[ChatMsgId["CHAT_SCHOOL_CHANNEL_LEVEL_LIMIT"] = 160471] = "CHAT_SCHOOL_CHANNEL_LEVEL_LIMIT";
    /** 等级不足N级不能在当前频道发言 */
    ChatMsgId[ChatMsgId["CHAT_CURRENT_CHANNEL_LEVEL_LIMIT"] = 142924] = "CHAT_CURRENT_CHANNEL_LEVEL_LIMIT";
    /** 每隔N秒才能在天梯频道发言 */
    ChatMsgId[ChatMsgId["CHAT_CROSSTT_CHANNEL_TIME_LIMIT"] = 172103] = "CHAT_CROSSTT_CHANNEL_TIME_LIMIT";
})(ChatMsgId || (ChatMsgId = {}));
/** 点击查看在聊天框里某条消息信息的类型 */
var DisplayType;
(function (DisplayType) {
    DisplayType[DisplayType["DISPLAY_ITEM"] = 1] = "DISPLAY_ITEM";
    DisplayType[DisplayType["DISPLAY_PET"] = 2] = "DISPLAY_PET";
    DisplayType[DisplayType["DISPLAY_TASK"] = 8] = "DISPLAY_TASK";
    DisplayType[DisplayType["DISPLAY_TEAM_APPLY"] = 9] = "DISPLAY_TEAM_APPLY";
    DisplayType[DisplayType["DISPLAY_ROLL_ITEM"] = 11] = "DISPLAY_ROLL_ITEM";
    DisplayType[DisplayType["DISPLAY_ACTIVITY_ANSWER"] = 12] = "DISPLAY_ACTIVITY_ANSWER";
    DisplayType[DisplayType["DISPLAY_LIVEDIE"] = 13] = "DISPLAY_LIVEDIE";
    DisplayType[DisplayType["DISPLAY_BATTLE"] = 14] = "DISPLAY_BATTLE";
    DisplayType[DisplayType["DISPLAY_SACE_ROLE"] = 15] = "DISPLAY_SACE_ROLE";
    DisplayType[DisplayType["DISPLAY_CROSS_TT"] = 16] = "DISPLAY_CROSS_TT";
    DisplayType[DisplayType["DISPLAY_CROSS_ROOM"] = 17] = "DISPLAY_CROSS_ROOM";
})(DisplayType || (DisplayType = {}));
/** 任务类型（商店id，成就类型的时候是完成时间）*/
var ShopId;
(function (ShopId) {
    /** 主线任务 */
    ShopId[ShopId["MAIN_MISSION"] = 1] = "MAIN_MISSION";
    /** 循环任务 */
    ShopId[ShopId["CYCLIC_TASK"] = 2] = "CYCLIC_TASK";
    /** 暗夜马戏团任务（天机仙令任务） */
    ShopId[ShopId["ANYE_TASK"] = 3] = "ANYE_TASK";
})(ShopId || (ShopId = {}));
var ChannelSet;
(function (ChannelSet) {
    /** 世界频道 */
    ChannelSet[ChannelSet["SET_WORLD_CHANNEL"] = 12] = "SET_WORLD_CHANNEL";
    /** 帮派频道 */
    ChannelSet[ChannelSet["SET_FAMILY_CHANNEL"] = 13] = "SET_FAMILY_CHANNEL";
    /** 门派频道 */
    ChannelSet[ChannelSet["SET_SECTS_CHANNEL"] = 14] = "SET_SECTS_CHANNEL";
    /** 当前频道 */
    ChannelSet[ChannelSet["SET_CURRENT_CHANNEL"] = 15] = "SET_CURRENT_CHANNEL";
    /** 队伍频道 */
    ChannelSet[ChannelSet["SET_TEAM_CHANNEL"] = 16] = "SET_TEAM_CHANNEL";
    /** 组队频道 */
    ChannelSet[ChannelSet["SET_ZUDUI_CHANNEL"] = 29] = "SET_ZUDUI_CHANNEL";
})(ChannelSet || (ChannelSet = {}));
/** 聊天消息的功能类型 */
var FunModelType;
(function (FunModelType) {
    /** 任务求助道具功能 */
    FunModelType[FunModelType["FUN_TASKITEM"] = 1] = "FUN_TASKITEM";
    /** 生死战公会频道分享 */
    FunModelType[FunModelType["FUN_DIELIVE_CLAN"] = 2] = "FUN_DIELIVE_CLAN";
    /** 生死战世界频道分享 */
    FunModelType[FunModelType["FUN_DIELIVE_WORLD"] = 3] = "FUN_DIELIVE_WORLD";
    /** 求助 */
    FunModelType[FunModelType["QIU_ZHU"] = 4] = "QIU_ZHU";
})(FunModelType || (FunModelType = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var chat;
        (function (chat) {
            var models;
            (function (models) {
                var ChatModel = /** @class */ (function () {
                    function ChatModel() {
                        /** 屏蔽字 */
                        this.chatConfigBinDic = {};
                        /** 客户端提示信息表/客户端提示 */
                        this.chatMessageTips = {};
                        this.chatQuickChat = {};
                        /** 队伍频道数据 */
                        this.teamMsgList = [];
                        // //系统消息数据
                        this.systemMsgList = [];
                        // //系统消息数据
                        this.SystemMsgList = [];
                        // //世界频道数据
                        this.wordChatList = [];
                        // //当前频道数据
                        this.nowChatList = [];
                        // //职业频道数据
                        this.zhiYeChatList = [];
                        // //帮派频道数据
                        this.familyChatList = [];
                        // //组队频道数据
                        this.zuDuiChatList = [];
                        // //所有频道数据
                        this.allChatList = [];
                        // 聊天数据<频道，消息>
                        this.chatMessageMap = [];
                        // 聊天Tips数据存储
                        this.chatTips = [];
                        /** 聊天限制的条目 */
                        this.chatLimitNum = 30;
                        /** 锁定视角接收数据 */
                        this.lockData = 0;
                        /** 初始化频道 */
                        this.Firstchannel = -1;
                        /** 战斗结束弹窗 key:id  values:弹窗内容 */
                        this.battleEndTips = new Laya.Dictionary;
                        /** 战斗奖励结算存储 */
                        this.battleEndTipsArray = [];
                        ChatModel._instance = this;
                        this.initChatMessageMap();
                        this.chatList = new Laya.Dictionary();
                        this.specialChannelData = new Laya.Dictionary();
                    }
                    ChatModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new ChatModel();
                        }
                        return this._instance;
                    };
                    ChatModel.clearModelData = function () {
                        chat.models.ChatModel._instance.teamMsgList = [];
                        chat.models.ChatModel._instance.systemMsgList = [];
                        chat.models.ChatModel._instance.SystemMsgList = [];
                        chat.models.ChatModel._instance.wordChatList = [];
                        chat.models.ChatModel._instance.nowChatList = [];
                        chat.models.ChatModel._instance.zhiYeChatList = [];
                        chat.models.ChatModel._instance.familyChatList = [];
                        chat.models.ChatModel._instance.zuDuiChatList = [];
                        chat.models.ChatModel._instance.allChatList = [];
                        chat.models.ChatModel._instance.chatMessageMap = [];
                        chat.models.ChatModel._instance.chatTips = [];
                        chat.models.ChatModel._instance.chatList = new Laya.Dictionary();
                        chat.models.ChatModel._instance.chatMessageNotify = new models.ChatMessageNotifyVo();
                        chat.models.ChatModel._instance.chatLimitNum = 30;
                        chat.models.ChatModel._instance.viewItemId = 0;
                        chat.models.ChatModel._instance.lockData = 0;
                        chat.models.ChatModel._instance.lastCurrentImg = new Laya.Image();
                        chat.models.ChatModel._instance.lastWorldImg = new Laya.Image();
                        chat.models.ChatModel._instance.lastTeamImg = new Laya.Image();
                        chat.models.ChatModel._instance.lastFamilyImg = new Laya.Image();
                        chat.models.ChatModel._instance.lastZhiYeImg = new Laya.Image();
                        chat.models.ChatModel._instance.lastSystemImg = new Laya.Image();
                        chat.models.ChatModel._instance.lastZuDuiImg = new Laya.Image();
                        chat.models.ChatModel._instance.Firstchannel = -1;
                        chat.models.ChatModel._instance.specialChannelData = new Laya.Dictionary();
                        chat.models.ChatModel._instance.battleEndTips = new Laya.Dictionary;
                    };
                    /** 初始化聊天频道容器 */
                    ChatModel.prototype.initChatMessageMap = function () {
                        ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_CURRENT] = [];
                        ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_TEAM] = [];
                        ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_PROFESSION] = [];
                        ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_CLAN] = [];
                        ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_WORLD] = [];
                        ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_SYSTEM] = [];
                        ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_MESSAGE] = [];
                        ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_BUBBLE] = [];
                        ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_SLIDE] = [];
                        ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_CROSS_TT] = [];
                        ChatModel._instance.chatMessageMap[ChannelType.CHANNEL_TEAM_APPLY] = [];
                    };
                    /** 取ChannelType类型 */
                    ChatModel.prototype.getChannelBack = function () {
                        return ChannelType;
                    };
                    /** 插入聊天消息 */
                    ChatModel.prototype.insertChatMessage = function (message) {
                        switch (message.messagetype) {
                            case ChannelType.CHANNEL_CURRENT:
                                if (this.nowChatList.length > this.chatLimitNum)
                                    this.nowChatList.shift();
                                this.nowChatList.push(message);
                                this.chatList.set(ChannelType.CHANNEL_CURRENT, this.nowChatList);
                                break;
                            case ChannelType.CHANNEL_TEAM:
                                if (this.teamMsgList.length > this.chatLimitNum)
                                    this.teamMsgList.shift();
                                this.teamMsgList.push(message);
                                this.chatList.set(ChannelType.CHANNEL_TEAM, this.teamMsgList);
                                break;
                            case ChannelType.CHANNEL_PROFESSION:
                                if (this.zhiYeChatList.length > this.chatLimitNum)
                                    this.zhiYeChatList.shift();
                                this.zhiYeChatList.push(message);
                                this.chatList.set(ChannelType.CHANNEL_PROFESSION, this.zhiYeChatList);
                                break;
                            case ChannelType.CHANNEL_CLAN:
                                if (this.familyChatList.length > this.chatLimitNum)
                                    this.familyChatList.shift();
                                this.familyChatList.push(message);
                                this.chatList.set(ChannelType.CHANNEL_CLAN, this.familyChatList);
                                break;
                            case ChannelType.CHANNEL_WORLD:
                                if (this.wordChatList.length > this.chatLimitNum)
                                    this.wordChatList.shift();
                                this.wordChatList.push(message);
                                this.chatList.set(ChannelType.CHANNEL_WORLD, this.wordChatList);
                                break;
                            case ChannelType.CHANNEL_SYSTEM:
                                this.SystemMsgList.push(message);
                                this.chatList.set(ChannelType.CHANNEL_SYSTEM, this.SystemMsgList);
                                break;
                            case ChannelType.CHANNEL_TEAM_APPLY:
                                if (this.zuDuiChatList.length > this.chatLimitNum)
                                    this.zuDuiChatList.shift();
                                this.zuDuiChatList.push(message);
                                this.chatList.set(ChannelType.CHANNEL_TEAM_APPLY, this.zuDuiChatList);
                                break;
                            default:
                                break;
                        }
                    };
                    /** 判断是否是屏蔽字
                     * @param str 判断的字符串
                     */
                    ChatModel.prototype.judgeBanWords = function (str) {
                        for (var index = 1; index < Object.keys(this.chatConfigBinDic).length; index++) {
                            if (str.search(this.chatConfigBinDic[index].tips) == -1)
                                return false;
                        }
                        return true;
                    };
                    //图文混排格式替换
                    ChatModel.prototype.getFaceHtmlText = function (data) {
                        var newMsg = "";
                        for (var faceIndex = 0; faceIndex < 54; faceIndex++) {
                            data =
                                data.replace("@" + faceIndex + "@", "<img src ='ui/liaotian/1384592709_" + (faceIndex + 1) + ".png' style = 'width:50px;valign:center; height:50px' ></img>"); //
                        }
                        return data;
                    };
                    /**
                 * 申请事件按钮属性
                 * @param apply_btn 按钮对象
                 * @param color     按钮颜色
                 */
                    ChatModel.prototype.SetBtnAtribute = function (apply_btn, color) {
                        apply_btn.width = 110;
                        apply_btn.height = 24;
                        apply_btn.skin = "";
                        apply_btn.labelSize = 24;
                        apply_btn.labelAlign = "left";
                        apply_btn.labelColors = color;
                    };
                    /**
                     * 显示科举求助
                     * @param question 题目Id
                     * @param examtype 科举类型
                     */
                    ChatModel.prototype.onShowKejuTitle = function (question, examtype, rolename, roleid, app) {
                        /** 角色Id */
                        var roleId = LoginModel.getInstance().roleDetail.roleid;
                        /** 自己不能回答自己的问题 */
                        if (roleid == roleId) {
                            var DisappearMessageTipsMediator_1 = new game.modules.commonUI.DisappearMessageTipsMediator(app);
                            var prompt_1 = HudModel.getInstance().promptAssembleBack(PromptExplain.CANNO_ANSWER_SELF);
                            DisappearMessageTipsMediator_1.onShow(prompt_1);
                            return;
                        }
                        var KejuHelpMediator = modules.keju.KejuHelpMediator.getInstance(app);
                        KejuHelpMediator.onShow(question, examtype, rolename);
                        modules.ModuleManager.hide(modules.ModuleNames.Chat);
                    };
                    /**
                     * 天机仙令求助信息点击响应
                     * @param tasktype 天机仙令任务类型
                     * @param targetid 目标id
                     * @param taskid 天机仙令任务id
                     * @param useapp
                     * @param useUI
                     * @param helperid 发布求助的角色id(或是协助完成的角色id)
                     * @param taskpos 天机仙令任务栏位
                     */
                    ChatModel.prototype.responseTJXLHelp = function (tasktype, targetid, taskid, useapp, useUI, helperid, taskpos) {
                        /** 目标数量 */
                        var ownedTargetNum; //用string类型来存数据，为了做判断时，能让0这个数值通过
                        /** 商店类型 */
                        var shoptype;
                        switch (tasktype) {
                            case TaskType.Item:
                                //获取拥有目标道具数量
                                ownedTargetNum = game.modules.bag.models.BagModel._instance.chargeItemNum(targetid).toString();
                                shoptype = modules.tianjixianling.models.TianJiXianLingModel.getInstance().getShopType(targetid); //获得商店类型
                                break;
                            case TaskType.Pet:
                                //获取拥有目标宠物数量
                                ownedTargetNum = modules.tianjixianling.models.TianJiXianLingModel.getInstance().checkOwnPetNum(targetid).toString();
                                shoptype = shopType.PET_SHOP;
                                break;
                            case TaskType.NPC:
                                if (helperid) {
                                    RequesterProtocols._instance.c2s_CRequestJoinTeam(helperid); //发布这条求助信息之前会创建队伍，所以发布求助者角色id就是队长角色id
                                }
                                else {
                                    console.log("-----------------------------------没有有效的队伍的队长角色id！---------------------------");
                                }
                                break;
                        }
                        if (ownedTargetNum) {
                            if (helperid == LoginModel.getInstance().roleDetail.roleid) { //如果协助完成的角色id就是本人角色id
                                //弹出提示飘窗
                                var bayWindow = new modules.commonUI.DisappearMessageTipsMediator(useapp);
                                //提示语句为：自己不可以帮助自己完成任务
                                var prompt = chat.models.ChatModel.getInstance().chatMessageTips["166082"]["msg"];
                                bayWindow.onShow(prompt);
                                return;
                            }
                            if (Number(ownedTargetNum) == 0) { //如果无该目标道具					
                                HudModel.getInstance().useapp = useapp;
                                HudModel.getInstance().directOpenShop(targetid, shoptype); //打开相应能购买到该目标道具的商店
                            }
                            else { //有满足任务要求数量的目标道具
                                var _tempTargetIdArray = [targetid];
                                modules.tianjixianling.models.TianJiXianLingModel.getInstance().completedTaskRoleId = helperid;
                                modules.tianjixianling.models.TianJiXianLingModel.getInstance().taskPos = taskpos;
                                HudModel.getInstance().tjxlData = [];
                                var _dstitemnum = 1;
                                HudModel.getInstance().tjxlData.push({ id: taskid, dstitemnum: _dstitemnum });
                                modules.tianjixianling.models.TianJiXianLingModel.getInstance().submitTarget(_tempTargetIdArray, taskid, useapp, useUI); //上交目标道具
                            }
                        }
                    };
                    return ChatModel;
                }());
                models.ChatModel = ChatModel;
            })(models = chat.models || (chat.models = {}));
        })(chat = modules.chat || (modules.chat = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ChatModel.js.map