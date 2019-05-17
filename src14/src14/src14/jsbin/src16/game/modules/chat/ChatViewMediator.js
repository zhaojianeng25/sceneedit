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
* name
*/
var ChatModel = game.modules.chat.models.ChatModel;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var chat;
        (function (chat) {
            var ChatViewMediator = /** @class */ (function (_super) {
                __extends(ChatViewMediator, _super);
                function ChatViewMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    // data : Array<any> = [];
                    /** 屏蔽字 */
                    _this.shield_word = [];
                    /** 任务 */
                    _this.task = [];
                    /** 未有聊天内容时的输入 */
                    _this.nohistory = [{ context: "您還沒有發言哦，趕緊去發言吧~" }];
                    /** 历时输入 */
                    _this.historyInput = [];
                    /** 表情数据 */
                    _this.faceList = [];
                    /** 物品数据 */
                    _this.itemList = [];
                    /** 宠物数据 */
                    _this.petLits = [];
                    /** 常用语 */
                    _this.quickChat = [];
                    /** 当前频道 */
                    _this.channel = 1;
                    /** 初始化判断 */
                    _this.flag = true;
                    /** DisplayInfo 聊天有特殊格式时存储的数据 */
                    _this.displayInfo = [];
                    /** 当前聊天字体的颜色 */
                    _this.color = "#000000";
                    /** 角色信息 */
                    _this.roleinfo = [];
                    /** 初始化标志 */
                    _this.initFlag = false;
                    /** 判断当前频道是否有值 */
                    _this.channelFlag = false;
                    _this._viewUI = new ui.common.ChatUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.isCenter = true;
                    _this.unlock();
                    _this._loginModel = game.modules.createrole.models.LoginModel.getInstance();
                    //this.onList();
                    _this._viewUI.input_txtinput.maxChars = 80;
                    _this._viewUI.input_txtinput.on(Laya.Event.KEY_DOWN, _this, _this.keydown);
                    return _this;
                }
                /** 键盘落下监听-判断输入是否超过限制 */
                ChatViewMediator.prototype.keydown = function () {
                    if (this._viewUI.input_txtinput.text.length >= 80) {
                        var promot = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.CHARACTER_IS_TOO_LONG);
                        game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, promot);
                    }
                };
                ChatViewMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    //初始化界面ui信息
                    this.px = this._viewUI.msgTips1_img.x;
                    this.py = this._viewUI.msgTips1_img.y;
                    chat.models.ChatProxy.getInstance().event(chat.models.OPEN_MAINHUD_PET_LISTEN);
                    //按钮点击事件
                    this.onBtn();
                    this.channelType = ChatModel.getInstance().getChannelBack();
                    /** 初始化频道频道 */
                    this._initChannel();
                    this.closeChatContent(this._viewUI.tabBtn_tab.selectedIndex);
                    this.banWords = chat.models.ChatModel.getInstance().chatConfigBinDic;
                    if (this.initFlag) {
                        console.log("已经初始化该界面，数据不在重复配置！");
                    }
                    else {
                        this.initData();
                    }
                };
                /** 初始化数据 */
                ChatViewMediator.prototype.initData = function () {
                    this.initFlag = true;
                    var objKeys = chat.models.ChatModel.getInstance().chatQuickChat;
                    for (var i = 1; i <= Object.keys(objKeys).length; i++) {
                        this.quickChat.push(chat.models.ChatModel.getInstance().chatQuickChat[i].tips);
                    }
                    for (var a = 1; a < 33; a++) {
                        this.shield_word.push(this.banWords[a].tips);
                    }
                    //表情素材加载
                    for (var a = 1; a <= 53; a++) {
                        this.faceList.push({ url: "ui/liaotian/1384592709_" + a + ".png" });
                    }
                    var roleIcon = this._loginModel.cnpcShapeInfo;
                    for (var index in roleIcon) {
                        this.roleinfo.push(roleIcon[index].littleheadID);
                    }
                };
                /** 初始化频道选择 */
                ChatViewMediator.prototype._initChannel = function () {
                    if (ChatModel.getInstance().Firstchannel != -1) {
                        this._viewUI.tabBtn_tab.selectedIndex = ChatModel.getInstance().Firstchannel;
                        // if (this._viewUI.tabBtn_tab.selectedIndex == 1) {/** 选中的是第一个标签 即世界频道 */
                        // 	this.channel = ChannelType.CHANNEL_WORLD;
                        // } else if (this._viewUI.tabBtn_tab.selectedIndex == 4) {/** 选中的是第四个标签 即工会频道 */
                        // 	this.channel = ChannelType.CHANNEL_CLAN;
                        // }
                        switch (this._viewUI.tabBtn_tab.selectedIndex) {
                            case 0: //系统频道
                                this.channel = ChannelType.CHANNEL_SYSTEM;
                                break;
                            case 1: //世界频道
                                this.channel = ChannelType.CHANNEL_WORLD;
                                break;
                            case 2: //当前频道
                                this.channel = ChannelType.CHANNEL_CURRENT;
                                break;
                            case 3: //职业频道
                                this.channel = ChannelType.CHANNEL_PROFESSION;
                                break;
                            case 4: //公会频道
                                this.channel = ChannelType.CHANNEL_CLAN;
                                break;
                            case 5: //队伍频道
                                this.channel = ChannelType.CHANNEL_TEAM;
                                break;
                            case 6: //组队频道
                                this.channel = ChannelType.CHANNEL_TEAM_APPLY;
                                break;
                        }
                        ChatModel.getInstance().Firstchannel = -1;
                    }
                };
                //所有按钮的点击事件初始化
                ChatViewMediator.prototype.onBtn = function () {
                    this._viewUI.changecolor_btn.on(LEvent.MOUSE_DOWN, this, this.changeColor);
                    this._viewUI.face_btn.on(LEvent.MOUSE_DOWN, this, this.openFace);
                    this._viewUI.close1_btn.on(LEvent.MOUSE_DOWN, this, this.closeTiaoSe);
                    this._viewUI.close2_btn.on(LEvent.MOUSE_DOWN, this, this.closeFace);
                    this._viewUI.send_btn.on(LEvent.MOUSE_UP, this, this.sendChat);
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.tabBtn_tab.selectHandler = new Handler(this, this.closeChatContent);
                    this._viewUI.lock_btn.on(LEvent.CLICK, this, this.onLock);
                    this._viewUI.unreadMsg_img.on(LEvent.MOUSE_DOWN, this, this.onUpdMsg);
                    chat.models.ChatProxy.getInstance().on(chat.models.SHOW_ITEM_TIPS, this, this._ShowTips);
                    chat.models.ChatProxy.getInstance().on(chat.models.VIWE_OTHER_ITEM, this, this._ViewOtherItem);
                    chat.models.ChatProxy.getInstance().on(chat.models.VIWE_SHARE_TASK, this, this._ViewShareTask);
                    modules.pet.models.PetProxy.getInstance().on(modules.pet.models.GETPETINFO, this, this.OpPetInfo);
                    // chat.models.ChatProxy.getInstance().on(chat.models.SYS_MSG_IN_CHANNEL, this, this.refreshSysMsg);
                };
                /** 刷新系统消息在频道中的表现 */
                ChatViewMediator.prototype.refreshSysMsg = function (channel) {
                    switch (channel) {
                        case ChannelType.CHANNEL_WORLD:
                            this.getWorldChatData(true, channel);
                            break;
                        case ChannelType.CHANNEL_TEAM:
                            this.getTeamChatData(true, channel);
                            break;
                        case ChannelType.CHANNEL_CLAN:
                            this.getFamilyChatData(true, channel);
                            break;
                        default:
                            break;
                    }
                };
                /** 更新数据 */
                ChatViewMediator.prototype.onUpdMsg = function () {
                    this.onLock();
                    var flag = false;
                    switch (this.channel) {
                        case this.channel = this.channelType.CHANNEL_SYSTEM:
                            this.unlock();
                            this.showSystem(this.channel, flag);
                            break;
                        case this.channel = this.channelType.CHANNEL_WORLD:
                            this.unlock();
                            this.showWorld(this.channel, flag);
                            break;
                        case this.channel = this.channelType.CHANNEL_CURRENT:
                            this.unlock();
                            this.showNow(this.channel, flag);
                            break;
                        case this.channel = this.channelType.CHANNEL_PROFESSION:
                            this.unlock();
                            this.showZhiYe(this.channel, flag);
                            break;
                        case this.channel = this.channelType.CHANNEL_CLAN:
                            this.unlock();
                            this.showFamily(this.channel, flag);
                            break;
                        case this.channel = this.channelType.CHANNEL_TEAM:
                            this.unlock();
                            this.showTeam(this.channel, flag);
                            break;
                        case this.channel = this.channelType.CHANNEL_TEAM_APPLY:
                            this.unlock();
                            this.showZuzDui(this.channel, flag);
                            break;
                        default: break;
                    }
                };
                /** 频道切换时要解锁 */
                ChatViewMediator.prototype.unlock = function () {
                    /** 如果开锁就关闭 ，否则不操作*/
                    if (this.flag) {
                        this._viewUI.clsoeLock.play(null, false);
                        this.flag = false;
                        this._viewUI.unreadMsg_img.visible = false;
                        ChatModel.getInstance().lockData = 0;
                    }
                };
                /** 打开任务说明
                 * @param displayInfo models.DisplayInfoVo
                */
                ChatViewMediator.prototype._ViewShareTask = function (displayInfo) {
                    this.TaskDescriberMediators = game.modules.commonUI.TaskDescriberMediators.getInstance(this._app);
                    this.TaskDescriberMediators.onShow(displayInfo);
                };
                /**
                 * 打开宠物详情界面
                 * @param petinfo 宠物详情
                 * @param nowPage 存储的当前页码
                 */
                ChatViewMediator.prototype.OpPetInfo = function (petinfo, nowPage) {
                    var isShowInStage = _super.prototype.isShow.call(this);
                    this.PetXiangQingMediator = new game.modules.pet.PetXiangQingMediator(this._app);
                    this.PetXiangQingMediator.init(petinfo);
                    LoginModel.getInstance().CommonPage = "liaotian";
                    this.hide();
                };
                /** 查看别人的Tips */
                ChatViewMediator.prototype._ViewOtherItem = function (viewUI, app) {
                    var parame;
                    if (ChatModel.getInstance().viewItemId != 0) {
                        var ItemId = ChatModel.getInstance().viewItemId;
                        var obj = BagModel.getInstance().getItemAttrData(ItemId);
                        parame = new Laya.Dictionary();
                        try {
                            var equipType = StrengTheningModel.getInstance().equipEffectData[ItemId].eequiptype;
                        }
                        catch (error) {
                            equipType = -1;
                        }
                        parame.set("itemId", ItemId);
                        parame.set("key", ChatModel.getInstance().chatTips[ChatModel.getInstance().chatTips.length - 1].uniqid);
                        parame.set("packid", -1);
                        parame.set("outbattleuse", obj.outbattleuse); //("packid",1)
                        parame.set("shopid", obj.bCanSaleToNpc);
                        parame.set("number", 1);
                        parame.set("equiptype", equipType);
                        var isShow = true;
                        if (!viewUI) {
                            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, isShow);
                        }
                        else { /** 方便主界面调用 */
                            this._tipsModule = new game.modules.tips.tipsModule(viewUI, app, TIPS_TYPE.BAG, parame, isShow);
                        }
                    }
                };
                /** 显示背包道具Tips */
                ChatViewMediator.prototype._ShowTips = function () {
                    var parame;
                    var selectItem = this.getItemBack();
                    if (selectItem) {
                        parame = new Laya.Dictionary();
                        var obj = BagModel.getInstance().getItemAttrData(selectItem.id);
                        try {
                            var equipType = StrengTheningModel.getInstance().equipEffectData[selectItem.id].eequiptype;
                        }
                        catch (error) {
                            equipType = -1;
                        }
                        parame.set("itemId", selectItem.id);
                        parame.set("key", selectItem.key);
                        parame.set("packid", 1);
                        parame.set("outbattleuse", obj.outbattleuse); //("packid",1)
                        parame.set("shopid", obj.bCanSaleToNpc);
                        parame.set("number", selectItem.number);
                        parame.set("equiptype", equipType);
                        var isShow = true;
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, isShow);
                    }
                };
                /**根据 item key 获取选中的道具信息 */
                ChatViewMediator.prototype.getItemBack = function (chatkey, fromBag) {
                    var TipsLength = ChatModel.getInstance().chatTips.length;
                    var key;
                    if (chatkey) {
                        key = chatkey;
                    }
                    else {
                        key = ChatModel.getInstance().chatTips[TipsLength - 1].uniqid;
                    }
                    if (!fromBag) {
                        for (var itemListIndex = 0; itemListIndex < this.itemList.length; itemListIndex++) {
                            if (this.itemList[itemListIndex].key == key) {
                                return this.itemList[itemListIndex];
                            }
                        }
                    }
                    else {
                        var itemList = bagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
                        for (var itemListIndex = 0; itemListIndex < itemList.length; itemListIndex++) {
                            if (itemList[itemListIndex].key == key) {
                                return itemList[itemListIndex];
                            }
                        }
                    }
                    return false;
                };
                /** 聊天频道点击显示物品的Tips */
                ChatViewMediator.prototype.showItemTips = function (displayinfo, fromBag, app, viewUI) {
                    var chatkey = displayinfo.uniqid;
                    var item;
                    if (!fromBag) {
                        item = this.getItemBack(chatkey);
                    }
                    else {
                        item = this.getItemBack(chatkey, fromBag);
                    }
                    if (item) {
                        var parame = void 0;
                        parame = new Laya.Dictionary();
                        var obj = BagModel.getInstance().getItemAttrData(item.id);
                        try {
                            var equipType = StrengTheningModel.getInstance().equipEffectData[item.id].eequiptype;
                        }
                        catch (error) {
                            equipType = -1;
                        }
                        parame.set("itemId", item.id);
                        parame.set("key", item.key);
                        parame.set("packid", 1);
                        parame.set("outbattleuse", obj.outbattleuse); //("packid",1)
                        parame.set("shopid", obj.bCanSaleToNpc);
                        parame.set("number", item.number);
                        parame.set("equiptype", equipType);
                        var isShow = true;
                        if (!app) {
                            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, isShow);
                        }
                        else {
                            this._tipsModule = new game.modules.tips.tipsModule(viewUI, app, TIPS_TYPE.BAG, parame, isShow);
                        }
                    }
                };
                /** Lock按钮 */
                ChatViewMediator.prototype.onLock = function () {
                    if (!this.flag) { /** 左关-->右开 */
                        this._viewUI.opLock.play(null, false);
                        this.flag = true;
                    }
                    else if (this.flag) { /** 开-->关 */
                        this._viewUI.clsoeLock.play(null, false);
                        this.flag = false;
                        this.scrollViwe();
                    }
                };
                /** 聊天数据滚动 */
                ChatViewMediator.prototype.scrollViwe = function () {
                    if (this.chatData == null)
                        return;
                    switch (this.channel) {
                        case this.channelType.CHANNEL_WORLD:
                            this._viewUI.worldChatList_panel.scrollTo(null, this.scrollY);
                            break;
                        case this.channelType.CHANNEL_CURRENT:
                            this._viewUI.chatlist_panel.scrollTo(null, this.scrollY);
                            break;
                        case this.channelType.CHANNEL_PROFESSION:
                            this._viewUI.zhiYeChatList_panel.scrollTo(null, this.scrollY);
                            break;
                        case this.channelType.CHANNEL_CLAN:
                            this._viewUI.familyChatList_panel.scrollTo(null, this.scrollY);
                            break;
                        case this.channelType.CHANNEL_TEAM:
                            this._viewUI.teamChatList_panel.scrollTo(null, this.scrollY);
                            break;
                        default:
                            break;
                    }
                };
                /** tab组件自按钮点击
                 * @param key tab组件下标
                 */
                ChatViewMediator.prototype.closeChatContent = function (key) {
                    this._viewUI.chatlist_panel.visible = false;
                    this._viewUI.worldChatList_panel.visible = false;
                    this._viewUI.zhiYeChatList_panel.visible = false;
                    this._viewUI.familyChatList_panel.visible = false;
                    this._viewUI.teamChatList_panel.visible = false;
                    this._viewUI.nofamily_label.visible = false;
                    this._viewUI.systemMsg_list.visible = false;
                    this._viewUI.othersChat_list.visible = false;
                    this._viewUI.zuduiList_panel.visible = false;
                    var flag = false;
                    switch (key) {
                        case 0:
                            this.channel = this.channelType.CHANNEL_SYSTEM;
                            this.unlock();
                            this.showSystem(this.channel, flag);
                            break;
                        case 1:
                            this.channel = this.channelType.CHANNEL_WORLD;
                            this.unlock();
                            this.showWorld(this.channel, flag);
                            break;
                        case 2:
                            this.channel = this.channelType.CHANNEL_CURRENT;
                            this.unlock();
                            this.showNow(this.channel, flag);
                            break;
                        case 3:
                            this.channel = this.channelType.CHANNEL_PROFESSION;
                            this.unlock();
                            this.showZhiYe(this.channel, flag);
                            break;
                        case 4:
                            this.channel = this.channelType.CHANNEL_CLAN;
                            this.unlock();
                            this.showFamily(this.channel, flag);
                            break;
                        case 5:
                            this.channel = this.channelType.CHANNEL_TEAM;
                            this.unlock();
                            this.showTeam(this.channel, flag);
                            break;
                        case 6:
                            this.channel = this.channelType.CHANNEL_TEAM_APPLY;
                            this.unlock();
                            this.showZuzDui(this.channel, flag);
                            break;
                        default: break;
                    }
                };
                /** 系统界面
                 * @param channel 频道
                 * @param flag 是否显示
                 */
                ChatViewMediator.prototype.showSystem = function (channel, flag) {
                    this.closeTips();
                    this._viewUI.systemTips_lab.visible = true;
                    this.chatData = ChatModel.getInstance().systemMsgList;
                    this.getSystemData(flag);
                };
                /** 世界频道界面
                 * @param channel 频道
                 * @param flag 是否显示
                 */
                ChatViewMediator.prototype.showWorld = function (channel, flag) {
                    this.closeTips();
                    this._viewUI.input_img.visible = true;
                    this.chatData = ChatModel.getInstance().chatList.get(channel);
                    if (this.chatData != null)
                        this._viewUI.worldChatList_panel.visible = true;
                    this.getWorldChatData(flag);
                };
                /** 当前界面
                 * @param channel 频道
                 * @param flag 是否显示
                 */
                ChatViewMediator.prototype.showNow = function (channel, flag) {
                    console.log("showNow....channel...." + channel);
                    this.closeTips();
                    this._viewUI.input_img.visible = true;
                    this.chatData = ChatModel.getInstance().chatList.get(channel);
                    if (this.chatData != null)
                        this._viewUI.chatlist_panel.visible = true;
                    this.getChatData(flag);
                };
                /** 职业频道界面
                 * @param channel 频道
                 * @param flag 是否显示
                 */
                ChatViewMediator.prototype.showZhiYe = function (channel, flag) {
                    console.log("showZhiYe....channel...." + channel);
                    this.closeTips();
                    this._viewUI.input_img.visible = true;
                    this.chatData = ChatModel.getInstance().chatList.get(channel);
                    if (this.chatData != null)
                        this._viewUI.zhiYeChatList_panel.visible = true;
                    this.getZhiYeChatData(flag);
                };
                /** 帮派频道界面
                 * @param channel 频道
                 * @param flag 是否显示
                 */
                ChatViewMediator.prototype.showFamily = function (channel, flag) {
                    this.closeTips();
                    var clankey = game.modules.mainhud.models.HudModel._instance.clankey;
                    if (clankey > 0) { //有工会
                        this._viewUI.nofamily_label.visible = false;
                    }
                    else { //没有公会
                        this._viewUI.nofamily_label.visible = true;
                    }
                    this._viewUI.input_img.visible = true;
                    this.chatData = ChatModel.getInstance().chatList.get(channel);
                    if (this.chatData != null)
                        this._viewUI.familyChatList_panel.visible = true;
                    this.getFamilyChatData(flag);
                    this._viewUI.goFamily_btn.on(LEvent.MOUSE_DOWN, this, this.goFamily);
                };
                /** 队伍组队界面
                 * @param channel 频道
                 * @param flag 是否显示
                 */
                ChatViewMediator.prototype.showTeam = function (channel, flag) {
                    this.closeTips();
                    this._viewUI.input_img.visible = true;
                    this.chatData = ChatModel.getInstance().chatList.get(channel);
                    if (this.chatData != null)
                        this._viewUI.teamChatList_panel.visible = true;
                    this.getTeamChatData(flag);
                };
                /** 组队界面
                 * @param channel 频道
                 * @param flag 是否显示
                 */
                ChatViewMediator.prototype.showZuzDui = function (channel, flag) {
                    this.closeTips();
                    this._viewUI.duiwuTips_lab.visible = true;
                    this._viewUI.input_img.visible = false;
                    this.chatData = ChatModel.getInstance().chatList.get(channel);
                    if (this.chatData != null)
                        this._viewUI.zuduiList_panel.visible = true;
                    this.getZuDuiChatData(flag);
                };
                /** 跳往帮派界面 */
                ChatViewMediator.prototype.goFamily = function () {
                    modules.ModuleManager.show(modules.ModuleNames.Family, this._app);
                    this.hide();
                };
                /** 渲染系统消息 */
                ChatViewMediator.prototype.showSystemRender = function (index, panel) {
                    if (index < 0 || index > (this.chatData.length - 1))
                        return;
                    var systemhtml = new Laya.HTMLDivElement;
                    var channer_img = new Laya.Image;
                    var channer_lab = new Laya.Label;
                    channer_lab.x = 13;
                    channer_lab.y = 6;
                    channer_lab.color = "#ea0f0a";
                    channer_lab.fontSize = 15;
                    channer_lab.width = 30;
                    channer_lab.height = 15;
                    channer_lab.text = "系统";
                    channer_img.x = 0;
                    channer_img.y = 0;
                    channer_img.skin = "common/ui/liaotian/liaotian_pindaodiban.png";
                    channer_img.addChild(channer_lab);
                    systemhtml.x = 58;
                    systemhtml.y = 0;
                    systemhtml.width = 351;
                    var mainImg = new Laya.Image;
                    mainImg.x = 0;
                    mainImg.y = 0;
                    mainImg.width = 420;
                    mainImg.height = 50;
                    mainImg.addChild(channer_img);
                    mainImg.addChild(systemhtml);
                    var msgId = this.chatData[index].messageid;
                    var parameters = this.chatData[index].parameters;
                    var data = HudModel.getInstance().promptAssembleBack(msgId, parameters);
                    var times = 0;
                    do {
                        times = data.indexOf("#f6f6f4");
                        data = data.replace("#f6f6f4", "#000000");
                    } while (times != -1);
                    systemhtml.innerHTML = data;
                    /** 设置位置 */
                    if (ChatModel.getInstance().lastSystemImg == null)
                        mainImg.y = 1;
                    else
                        mainImg.y = ChatModel.getInstance().lastSystemImg.y + ChatModel.getInstance().lastSystemImg.height;
                    mainImg.height = (systemhtml.contextHeight + 5);
                    /** 存储位置信息 */
                    ChatModel.getInstance().lastSystemImg = mainImg;
                    // mainImg.skin = "common/ui/liaotian/liaotian_pindaodiban.png"
                    panel.addChild(mainImg);
                };
                /** 发送聊天信息 */
                ChatViewMediator.prototype.sendChat = function () {
                    if (this._viewUI.input_txtinput.text != "") {
                        this.repstr = this._viewUI.input_txtinput.text;
                        /** 关键字屏蔽 */
                        for (var i = 0; i < this.shield_word.length; i++) {
                            var index = this.repstr.search(this.shield_word[i]);
                            if (index != -1) {
                                this.repstr = this.repstr.replace(this.shield_word[i], "**");
                            }
                        }
                        this.historyMsg = this.repstr;
                        var msg = this.repstr;
                        msg = this.color + "*split" + msg;
                        //发送消息请求
                        var isChenkGMCmd = this.chenkGMCmd(this.repstr, this.repstr);
                        if (isChenkGMCmd)
                            return;
                        this.sendMsg(this.channel, msg, this.repstr, this.displayInfo, 0, 0);
                        this.color = "#000000";
                    }
                    else {
                        this.tipsTweenTo("输入点内容再发送吧！");
                    }
                };
                /** 发送聊天协议
                 * @param channel 频道
                 * @param msg 消息串
                 * @param repMsg 消息串
                 * @param displayInfo
                 * @param funType 任务类型
                 * @param TaskId 任务Id
                */
                ChatViewMediator.prototype.sendMsg = function (channel, msg, repMsg, displayInfo, funType, TaskId) {
                    var splitmsg = msg.split("*split");
                    if (splitmsg.length == 2) {
                        /** 如果分享道具被修改，将displayinfo置空 */
                        if (displayInfo.length != 0 && displayInfo[0].displaytype != DisplayType.DISPLAY_TASK && splitmsg[1] != this.shareItem)
                            displayInfo = [];
                    }
                    else {
                        if (displayInfo.length != 0 && displayInfo[0].displaytype != DisplayType.DISPLAY_TASK && msg != this.shareItem)
                            displayInfo = [];
                    }
                    RequesterProtocols._instance.c2s_CTransChatMessage2Serv(this.channel, msg, repMsg, displayInfo, funType, TaskId);
                    this.shareItem = "";
                };
                /** 确认是否是GM命令
                 * @param msg 聊天内容
                 * @param pureMsg 特殊的格式
                 */
                ChatViewMediator.prototype.chenkGMCmd = function (msg, pureMsg) {
                    var GMflag = false;
                    var flag = msg.search("//");
                    if (flag != -1) {
                        if (pureMsg.search("bgm") != -1) {
                            GMflag = true;
                        }
                        else if (pureMsg.search("ssz") != -1) {
                            GMflag = true;
                        }
                        else if (pureMsg.search("ssg") != -1) {
                            GMflag = true;
                        }
                        else if (pureMsg.search("ssgw") != -1) {
                            GMflag = true;
                        }
                        else if (pureMsg.search("ssb") != -1) {
                            GMflag = true;
                        }
                        else {
                            RequesterProtocols._instance.c2s_CSendCommand(msg);
                            GMflag = true;
                        }
                    }
                    return GMflag;
                };
                /** 提示信息缓动
                 * @param data 弹窗消息
                 */
                ChatViewMediator.prototype.tipsTweenTo = function (data) {
                    var terminalY = 300;
                    this._viewUI.msgTips1_img.visible = true;
                    this._viewUI.msgTips_lab.visible = true;
                    this._viewUI.msgTips_lab.innerHTML = data;
                    Laya.Tween.to(this._viewUI.msgTips1_img, { y: terminalY }, 500, null, Laya.Handler.create(this, function () { this._viewUI.msgTips1_img.visible = false; this._viewUI.msgTips1_img.x = this.px; this._viewUI.msgTips1_img.y = this.py; }), null, false);
                };
                /**
                 * 判断当前的锁定视角
                 * @param panel Laya.Panel
                 */
                ChatViewMediator.prototype.chargeLockView = function (panel) {
                    if (!this.flag) { /** 锁关闭 第一视角*/
                        panel.scrollTo(null, this.scrollY);
                        this._viewUI.unreadMsg_img.visible = false;
                        ChatModel.getInstance().lockData = 0;
                    }
                    else if (this.flag && this.scrollY > 674) //674为父节点显示的高度
                     { /** 锁打开 不接受最新数据 */
                        this._viewUI.unreadMsg_img.visible = true;
                        ChatModel.getInstance().lockData = ChatModel.getInstance().lockData + 1;
                        this._viewUI.unreadMsg_lab.text = "未读消息" + ChatModel.getInstance().lockData + "条";
                    }
                };
                /**
                 * 滚动panel窗口的时候
                 * @param panel Laya.Panel
                 */
                ChatViewMediator.prototype.onScrollPanel = function (panel) {
                    var val = panel.vScrollBar.value;
                    var max = panel.vScrollBar.max;
                    var ratio = val / max;
                    if (ratio < 1) { /** 中间或前面 */
                        if (!this.flag) {
                            this._viewUI.opLock.play(null, false);
                            this.flag = true;
                        }
                    }
                    else if (ratio >= 1) { /** 最低端 */
                        if (this.flag)
                            this.onUpdMsg();
                    }
                };
                /** 当前窗口
                 * @param isUpdata 是否刷新
                */
                ChatViewMediator.prototype.getChatData = function (isUpdata, channel) {
                    if (channel === void 0) { channel = -1; }
                    /** 消息下发时，将displayinfo清空 */
                    this.displayInfo = [];
                    //如果传过来的频道与当前频道不一致返回
                    if (channel != -1 && channel != this.channel)
                        return;
                    this.chatData = ChatModel.getInstance().chatList.get(this.channel);
                    if (this.chatData == null)
                        return;
                    // console.trace("--this.chatData----"+this.chatData[this.chatData.length-1]);
                    var roleid = LoginModel.getInstance().roleDetail.roleid;
                    var length = this.chatData.length;
                    console.log("this.chatData.length--...---" + this.chatData.length);
                    //判断自己的记录并将记录保存在指定存放历史记录的数组里
                    if (this.chatData[length - 1].roleid == roleid) {
                        this.historyInput.push({ context: this.historyMsg });
                    }
                    this.repstr = "";
                    if (!isUpdata || !this.channelFlag) {
                        this._viewUI.chatlist_panel.visible = true;
                        this.channelFlag = true;
                    }
                    this._viewUI.chatlist_panel.vScrollBarSkin = "";
                    this._viewUI.input_txtinput.text = "";
                    //   this._viewUI.chatlist_panel.repeatY =this.chatData.length;			
                    //   this._viewUI.chatlist_panel.array = this.chatData;
                    this._viewUI.chatlist_panel.vScrollBar.elasticDistance = 10;
                    this._viewUI.chatlist_panel.vScrollBar.elasticBackTime = 200;
                    this.roleId = roleid;
                    //    }
                    //this._viewUI.chatlist_panel.renderHandler = new Handler(this,this.onRenderChatItem);
                    this._viewUI.chatlist_panel.vScrollBar.on(LEvent.END, this, this.onScrollPanel, [this._viewUI.chatlist_panel]);
                    // if ((this._viewUI.chatlist_panel.numChildren - 2) < this.chatData.length)
                    // 	this.onRenderChatItem(this.chatData.length - 1, this._viewUI.chatlist_panel, this.channel);
                    if (this._viewUI.chatlist_panel.numChildren - 2 < this.chatData.length) {
                        var num = this._viewUI.chatlist_panel.numChildren - 2;
                        for (var _index = num; _index < this.chatData.length; _index++) {
                            this.onRenderChatItem(_index, this._viewUI.chatlist_panel, this.channel);
                        }
                    }
                    this.chargeLockView(this._viewUI.chatlist_panel);
                };
                /** 世界窗口
                 * @param isUpdata 是否刷新显示
                 */
                ChatViewMediator.prototype.getWorldChatData = function (isUpdata, channel) {
                    if (channel === void 0) { channel = -1; }
                    /** 消息下发时，将displayinfo清空 */
                    this.displayInfo = [];
                    //如果传过来的频道与当前频道不一致返回
                    if (channel != -1 && channel != this.channel)
                        return;
                    this.chatData = ChatModel.getInstance().chatList.get(this.channel);
                    if (this.chatData == null)
                        return;
                    var roleid = this._loginModel.roleDetail.roleid;
                    var length = this.chatData.length;
                    //判断自己的记录并将记录保存在指定存放历史记录的数组里
                    if (this.chatData[length - 1].roleid == roleid) {
                        this.historyInput.push({ context: this.historyMsg });
                    }
                    this.repstr = "";
                    if (!isUpdata)
                        this._viewUI.worldChatList_panel.visible = true;
                    this._viewUI.worldChatList_panel.vScrollBarSkin = "";
                    this._viewUI.input_txtinput.text = "";
                    this._viewUI.worldChatList_panel.vScrollBar.elasticBackTime = 10;
                    this._viewUI.worldChatList_panel.vScrollBar.elasticDistance = 200;
                    this.roleId = roleid;
                    this._viewUI.worldChatList_panel.vScrollBar.on(LEvent.END, this, this.onScrollPanel, [this._viewUI.worldChatList_panel]);
                    // if ((this._viewUI.worldChatList_panel.numChildren - 2) < this.chatData.length)
                    // 	this.onRenderChatItem(this.chatData.length - 1, this._viewUI.worldChatList_panel, this.channel);
                    if (this._viewUI.worldChatList_panel.numChildren - 2 < this.chatData.length) {
                        var num = this._viewUI.worldChatList_panel.numChildren - 2;
                        for (var _index = num; _index < this.chatData.length; _index++) {
                            this.onRenderChatItem(_index, this._viewUI.worldChatList_panel, this.channel);
                        }
                    }
                    this.chargeLockView(this._viewUI.worldChatList_panel);
                };
                /** 职业窗口
                 * @param isUpdata 是否刷新显示
                */
                ChatViewMediator.prototype.getZhiYeChatData = function (isUpdata, channel) {
                    if (channel === void 0) { channel = -1; }
                    /** 消息下发时，将displayinfo清空 */
                    this.displayInfo = [];
                    //如果传过来的频道与当前频道不一致返回
                    if (channel != -1 && channel != this.channel)
                        return;
                    this.chatData = ChatModel.getInstance().chatList.get(this.channel);
                    if (this.chatData == null)
                        return;
                    var roleid = this._loginModel.roleDetail.roleid;
                    var roleIcon = this._loginModel.createRoleConfigBinDic;
                    var length = this.chatData.length;
                    //判断自己的记录并将记录保存在指定存放历史记录的数组里
                    if (this.chatData[length - 1].roleid == roleid) {
                        this.historyInput.push({ context: this.historyMsg });
                    }
                    this.repstr = "";
                    if (!isUpdata)
                        this._viewUI.zhiYeChatList_panel.visible = true;
                    this._viewUI.zhiYeChatList_panel.vScrollBarSkin = "";
                    this._viewUI.input_txtinput.text = "";
                    this._viewUI.zhiYeChatList_panel.vScrollBar.elasticBackTime = 10;
                    this._viewUI.zhiYeChatList_panel.vScrollBar.elasticDistance = 200;
                    this.roleId = roleid;
                    this._viewUI.zhiYeChatList_panel.vScrollBar.on(LEvent.END, this, this.onScrollPanel, [this._viewUI.zhiYeChatList_panel]);
                    // if ((this._viewUI.zhiYeChatList_panel.numChildren - 2) < this.chatData.length)
                    // 	this.onRenderChatItem(this.chatData.length - 1, this._viewUI.zhiYeChatList_panel, this.channel);
                    if (this._viewUI.zhiYeChatList_panel.numChildren - 2 < this.chatData.length) {
                        var num = this._viewUI.zhiYeChatList_panel.numChildren - 2;
                        for (var _index = num; _index < this.chatData.length; _index++) {
                            this.onRenderChatItem(_index, this._viewUI.zhiYeChatList_panel, this.channel);
                        }
                    }
                    //保持输入的值在第一视角
                    this.chargeLockView(this._viewUI.zhiYeChatList_panel);
                };
                /** 帮会窗口
                 * @param isUpdata 是否刷新显示
                 */
                ChatViewMediator.prototype.getFamilyChatData = function (isUpdata, channel) {
                    if (channel === void 0) { channel = -1; }
                    /** 消息下发时，将displayinfo清空 */
                    this.displayInfo = [];
                    //如果传过来的频道与当前频道不一致返回
                    if (channel != -1 && channel != this.channel)
                        return;
                    this.chatData = ChatModel.getInstance().chatList.get(this.channel);
                    if (this.chatData == null)
                        return;
                    var roleid = this._loginModel.roleDetail.roleid;
                    var roleIcon = this._loginModel.createRoleConfigBinDic;
                    var length = this.chatData.length;
                    //判断自己的记录并将记录保存在指定存放历史记录的数组里
                    if (this.chatData[length - 1].roleid == roleid) {
                        this.historyInput.push({ context: this.historyMsg });
                    }
                    this.repstr = "";
                    if (!isUpdata)
                        this._viewUI.familyChatList_panel.visible = true;
                    this._viewUI.familyChatList_panel.vScrollBarSkin = "";
                    this._viewUI.input_txtinput.text = "";
                    this._viewUI.familyChatList_panel.vScrollBar.elasticBackTime = 10;
                    this._viewUI.familyChatList_panel.vScrollBar.elasticDistance = 200;
                    this.roleId = roleid;
                    this._viewUI.familyChatList_panel.vScrollBar.on(LEvent.END, this, this.onScrollPanel, [this._viewUI.familyChatList_panel]);
                    // if ((this._viewUI.familyChatList_panel.numChildren - 2) < this.chatData.length)
                    // 	this.onRenderChatItem(this.chatData.length - 1, this._viewUI.familyChatList_panel, this.channel);
                    if (this._viewUI.familyChatList_panel.numChildren - 2 < this.chatData.length) {
                        var num = this._viewUI.familyChatList_panel.numChildren - 2;
                        for (var _index = num; _index < this.chatData.length; _index++) {
                            this.onRenderChatItem(_index, this._viewUI.familyChatList_panel, this.channel);
                        }
                    }
                    //保持输入的值在第一视角
                    this.chargeLockView(this._viewUI.familyChatList_panel);
                };
                /** 队伍窗口
                 * @param isUpdata 是否刷新显示
                */
                ChatViewMediator.prototype.getTeamChatData = function (isUpdata, channel) {
                    if (channel === void 0) { channel = -1; }
                    /** 消息下发时，将displayinfo清空 */
                    this.displayInfo = [];
                    //如果传过来的频道与当前频道不一致返回
                    if (channel != -1 && channel != this.channel)
                        return;
                    this.chatData = ChatModel.getInstance().chatList.get(this.channel);
                    if (this.chatData == null)
                        return;
                    var roleid = this._loginModel.roleDetail.roleid;
                    var roleIcon = this._loginModel.createRoleConfigBinDic;
                    var length = this.chatData.length;
                    //判断自己的记录并将记录保存在指定存放历史记录的数组里
                    if (this.chatData[length - 1].roleid == roleid) {
                        this.historyInput.push({ context: this.historyMsg });
                    }
                    this.repstr = "";
                    if (!isUpdata)
                        this._viewUI.teamChatList_panel.visible = true;
                    this._viewUI.teamChatList_panel.vScrollBarSkin = "";
                    this._viewUI.input_txtinput.text = "";
                    this._viewUI.teamChatList_panel.vScrollBar.elasticBackTime = 10;
                    this._viewUI.teamChatList_panel.vScrollBar.elasticDistance = 200;
                    this.roleId = roleid;
                    this._viewUI.teamChatList_panel.vScrollBar.on(LEvent.END, this, this.onScrollPanel, [this._viewUI.teamChatList_panel]);
                    // if ((this._viewUI.teamChatList_panel.numChildren - 2) < this.chatData.length)
                    // 	this.onRenderChatItem(this.chatData.length - 1, this._viewUI.teamChatList_panel, this.channel);
                    if (this._viewUI.teamChatList_panel.numChildren - 2 < this.chatData.length) {
                        var num = this._viewUI.teamChatList_panel.numChildren - 2;
                        for (var _index = num; _index < this.chatData.length; _index++) {
                            this.onRenderChatItem(_index, this._viewUI.teamChatList_panel, this.channel);
                        }
                    }
                    //保持输入的值在第一视角
                    this.chargeLockView(this._viewUI.teamChatList_panel);
                };
                /** 组队窗口
                 * @param isUpdata 是否刷新显示
                 */
                ChatViewMediator.prototype.getZuDuiChatData = function (isUpdata, channel) {
                    if (channel === void 0) { channel = -1; }
                    /** 消息下发时，将displayinfo清空 */
                    this.displayInfo = [];
                    //如果传过来的频道与当前频道不一致返回
                    if (channel != -1 && channel != this.channel)
                        return;
                    this.chatData = ChatModel.getInstance().chatList.get(this.channel);
                    if (this.chatData == null)
                        return;
                    if (!isUpdata)
                        this._viewUI.zuduiList_panel.visible = true;
                    this._viewUI.zuduiList_panel.vScrollBarSkin = "";
                    this._viewUI.input_txtinput.text = "";
                    var roleid = this._loginModel.roleDetail.roleid;
                    this.roleId = roleid;
                    this._viewUI.zuduiList_panel.vScrollBar.elasticBackTime = 10;
                    this._viewUI.zuduiList_panel.vScrollBar.elasticDistance = 200;
                    this._viewUI.zuduiList_panel.vScrollBar.on(LEvent.END, this, this.onScrollPanel, [this._viewUI.zuduiList_panel]);
                    // if ((this._viewUI.zuduiList_panel.numChildren - 2) < this.chatData.length)
                    // 	this.onRenderChatItem(this.chatData.length - 1, this._viewUI.zuduiList_panel, this.channel);
                    if (this._viewUI.zuduiList_panel.numChildren - 2 < this.chatData.length) {
                        var num = this._viewUI.zuduiList_panel.numChildren - 2;
                        for (var _index = num; _index < this.chatData.length; _index++) {
                            this.onRenderChatItem(_index, this._viewUI.zuduiList_panel, this.channel);
                        }
                    }
                    //保持输入的值在第一视角
                    this.chargeLockView(this._viewUI.zuduiList_panel);
                };
                /** 系统数据下发
                 * @param isUpdata 是否刷新显示
                 */
                ChatViewMediator.prototype.getSystemData = function (isUpdata) {
                    this.chatData = ChatModel.getInstance().systemMsgList;
                    console.log("systemData-----" + this.chatData);
                    if (this.chatData.length == 0)
                        return;
                    if (!isUpdata || this.channel == ChannelType.CHANNEL_SYSTEM)
                        this._viewUI.systemMsg_list.visible = true;
                    this._viewUI.systemMsg_list.vScrollBarSkin = "";
                    this._viewUI.systemMsg_list.vScrollBar.elasticBackTime = 200;
                    this._viewUI.systemMsg_list.vScrollBar.elasticDistance = 100;
                    // this._viewUI.systemMsg_list.renderHandler = new Handler(this,this.showSystemRender);
                    if (this._viewUI.systemMsg_list.numChildren - 1 < this.chatData.length) {
                        var num = this._viewUI.systemMsg_list.numChildren - 1;
                        for (var _index = num; _index < this.chatData.length; _index++) {
                            this.showSystemRender(_index, this._viewUI.systemMsg_list);
                        }
                    }
                };
                /** 关闭标签 */
                ChatViewMediator.prototype.closeTips = function () {
                    this._viewUI.systemTips_lab.visible = false;
                    this._viewUI.duiwuTips_lab.visible = false;
                    this._viewUI.input_img.visible = false;
                };
                /** 聊天记录渲染 */
                ChatViewMediator.prototype.onRenderChatItem = function (index, list, channel) {
                    // this._viewUI.otherChatLogo_img.visible = false;
                    if (typeof (this.chatData[index].roleid) == "number") { /** 存储正常聊天信息 */
                        var roleid = this.roleId;
                        if (index < 0 || index > this.chatData.length)
                            return;
                        console.log("index----" + index);
                        var shape = this.chatData[index].shapeid;
                        // let shape = this.roleinfo[id];
                        var otherChat = new Laya.Image; //cell.getChildByName("otherChatLogo_img") as Laya.Image;
                        /** 是否是智慧试炼求助 */
                        var iskejuHelp = false;
                        /** 是否是组队喊话 */
                        var isTeamYell = false;
                        /** 是否是天机仙令 */
                        var isTianJI = false;
                        /** 是否是求助 */
                        var isQiuZhu = false;
                        /** 这里切割字符串，包含颜色和聊天内容 */
                        var arr = this.chatData[index].message.split("*split");
                        /** 切割主线求助信息 */
                        var qiuZhu = this.chatData[index].message.split("*qz");
                        /** 组队喊话切割 */
                        var teamyell = this.chatData[index].message.split("#,");
                        /** 智慧试炼求助切割->帮派频道 */
                        var kejuHelp = this.chatData[index].message.split(",fq,");
                        /** 天机仙令求助信息 */
                        var tianji = this.chatData[index].message.split("^");
                        /** 天机仙令任务类型 */
                        var tasktype = -1;
                        var apply_btn = new Laya.Button;
                        var apply_btn2 = new Laya.Button;
                        if (teamyell && teamyell.length == 7) { /** 是队伍的一键喊话信息 添加申请按钮 */
                            isTeamYell = true;
                            ChatModel.getInstance().SetBtnAtribute(apply_btn, "#888817");
                            apply_btn.label = "[申请加入]";
                        }
                        else if (kejuHelp && kejuHelp.length == 4) {
                            iskejuHelp = true;
                            ChatModel.getInstance().SetBtnAtribute(apply_btn, "#ff6600");
                            apply_btn.label = "[回答问题]";
                        }
                        else if (tianji && (tianji.length == 8 || tianji.length == 2)) {
                            isTianJI = true;
                            ChatModel.getInstance().SetBtnAtribute(apply_btn, "#ff6600");
                            var taskid = tianji[0];
                            tasktype = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlConfig[taskid].tasktype;
                            if (tasktype == TaskType.Item || tasktype == TaskType.Pet)
                                apply_btn.label = "[帮助完成]";
                            else if (tasktype == TaskType.NPC)
                                apply_btn.label = "[申请加入]";
                        }
                        else if (qiuZhu && qiuZhu.length > 1) {
                            isQiuZhu = true;
                            ChatModel.getInstance().SetBtnAtribute(apply_btn, "#888817");
                            ChatModel.getInstance().SetBtnAtribute(apply_btn2, "#ff6600");
                            apply_btn.label = qiuZhu[1];
                            apply_btn2.label = "[申请加入]";
                        }
                        /** 这里开始添加ui */
                        /** 父节点 */
                        var subject_img = new Laya.Image;
                        subject_img.height = 81;
                        subject_img.width = 429;
                        /** 背景头像 */
                        var weChat = new Laya.Image;
                        subject_img.addChild(weChat);
                        weChat.skin = "common/ui/tongyong/dikuangda.png";
                        weChat.height = 60;
                        weChat.width = 60;
                        weChat.visible = true;
                        /** 名称 */
                        var we_playerName = new Laya.Label; //cell.getChildByName("weChatLogo_img").getChildByName("playerName") as Label;
                        subject_img.addChild(we_playerName);
                        we_playerName.height = 29;
                        we_playerName.width = 146;
                        we_playerName.color = "#8d2222";
                        we_playerName.valign = "middle";
                        we_playerName.align = "center";
                        we_playerName.font = "SimHei";
                        we_playerName.fontSize = 25;
                        we_playerName.text = this.chatData[index].rolename;
                        /** 聊天富文本框衔接聊天内容 */
                        var chatContent = new Laya.HTMLDivElement;
                        chatContent.visible = true;
                        /** 聊天背景衔接富文本框 */
                        var we_img = new Laya.Image;
                        we_img.skin = "common/ui/tongyong/banzi7.png";
                        we_img.height = 35;
                        we_img.width = 266;
                        subject_img.addChild(we_img);
                        subject_img.addChild(chatContent);
                        /** 箭头 */
                        var arrow_img = new Laya.Image; //cell.getChildByName("weChatLogo_img").getChildByName("weChat_img") as Laya.Image;
                        subject_img.addChild(arrow_img);
                        arrow_img.skin = "common/ui/liaotian/liaotian_kuang2_arrow.png";
                        var wechannel_img = new Laya.Image; //cell.getChildByName("weChatLogo_img").getChildByName("weChat_img") as Laya.Image;
                        subject_img.addChild(wechannel_img);
                        wechannel_img.skin = "common/ui/liaotian/liaotian_pindaodiban.png";
                        /** 频道 */
                        var weChannel_lab = new Laya.Label; //cell.getChildByName("weChatLogo_img").getChildByName("playerName") as Label;
                        wechannel_img.addChild(weChannel_lab);
                        /** 选择频道 */
                        this.changeChannelAndColor(weChannel_lab);
                        /** 角色头像信息 */
                        var roleLogo = new Laya.Image;
                        subject_img.addChild(roleLogo);
                        roleLogo.skin = "icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png";
                        roleLogo.height = 54;
                        roleLogo.width = 54;
                        weChannel_lab.fontSize = 20;
                        we_playerName.text = this.chatData[index].rolename;
                        if (this.chatData[index].roleid == roleid) { //我们自己的聊天
                            weChat.x = 352;
                            weChat.y = 5;
                            we_playerName.x = 133;
                            we_playerName.y = 4;
                            chatContent.x = 80;
                            chatContent.y = 46;
                            we_img.x = 337;
                            we_img.y = 38;
                            we_img.anchorX = 1;
                            we_img.anchorY = 0;
                            arrow_img.x = 337;
                            arrow_img.y = 47;
                            wechannel_img.x = 277;
                            wechannel_img.y = 5;
                            weChannel_lab.x = 8;
                            weChannel_lab.y = 4;
                            roleLogo.x = 355;
                            roleLogo.y = 8;
                            if (isTeamYell) {
                                /** 是队伍喊话信息 特殊处理数据 */
                                var html_1 = "<span style='font:24px ;color:#000000'>[ " + teamyell[0] + "</span>";
                                html_1 += "<span style='color:#000000;fontSize:24'>(" + teamyell[1] + "/5),</span>";
                                html_1 += "<span style='color:#000000;fontSize:24'>等级" + teamyell[2] + "-" + teamyell[3] + "开组了! </span>";
                                html_1 += "<span style='color:#000000;fontSize:24'>" + teamyell[4] + " ]</span>";
                                // html += "<span style='color:#888817;fontSize:24'> [申请加入] </span>";
                                chatContent.style.leading = 3;
                                chatContent.innerHTML = html_1;
                                subject_img.addChild(apply_btn);
                            }
                            else if (iskejuHelp) {
                                /** 智慧试炼求助 */
                                var questionId = Number(kejuHelp[0]); //题目Id
                                var examtype = kejuHelp[3];
                                var data_1 = KejuModel.getInstance().getExamConfigData(examtype);
                                var html_2 = "<span style='font:24px ;color:#ff6600'>" + data_1[questionId].name + "</span>";
                                chatContent.style.leading = 3;
                                chatContent.innerHTML = html_2;
                                subject_img.addChild(apply_btn);
                            }
                            else if (isTianJI) {
                                /** 天机仙令寻求帮助 */
                                var rolename = this.chatData[index].rolename;
                                var html_3 = "<span style='font:24px ;color:#0066ff'>" + rolename + "</span>";
                                html_3 += "<span style='font:24px ;color:#000000'>发布了任务求助信息</span>";
                                var taskId = tianji[0];
                                var taskname = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlConfig[taskId].strtasknameui;
                                html_3 += "<span style='font:24px ;color:#33cc00'>" + taskname + "</span>";
                                if (tasktype != -1 && tasktype == TaskType.Pet) //需求
                                 {
                                    html_3 += "<span style='font:24px ;color:#000000'>需求</span>";
                                    var targetId = tianji[6];
                                    var targetNum = tianji[7];
                                    var petName = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[targetId].name;
                                    html_3 += "<span style='font:24px ;color:#33cc00'>" + petName + "x" + targetNum + "</span>";
                                    chatContent.innerHTML = html_3;
                                    HudModel.getInstance().setApplyBtnPos(4, apply_btn, chatContent);
                                }
                                else if (tasktype != -1 && tasktype == TaskType.Item) {
                                    html_3 += "<span style='font:24px ;color:#000000'>需求</span>";
                                    var targetId = tianji[6];
                                    var targetNum = tianji[7];
                                    var itemName = game.modules.bag.models.BagModel.getInstance().itemAttrData[targetId].name;
                                    html_3 += "<span style='font:24px ;color:#33cc00'>" + itemName + "x" + targetNum + "</span>";
                                    chatContent.innerHTML = html_3;
                                    HudModel.getInstance().setApplyBtnPos(4, apply_btn, chatContent);
                                }
                                else if (tasktype != -1 && tasktype == TaskType.NPC) {
                                    chatContent.innerHTML = html_3;
                                    HudModel.getInstance().setApplyBtnPos(2, apply_btn, chatContent);
                                }
                                chatContent.style.leading = 3;
                                subject_img.addChild(apply_btn);
                            }
                            else if (isQiuZhu) {
                                we_img.addChild(apply_btn);
                                we_img.addChild(apply_btn2);
                                apply_btn.labelAlign = "center";
                                apply_btn2.labelAlign = "center";
                                var width = apply_btn.label.length - apply_btn2.label.length <= 0 ? 0 : (apply_btn.label.length - apply_btn2.label.length) * 20;
                                apply_btn.width += width;
                                chatContent.visible = false;
                                apply_btn.x = 5;
                                apply_btn2.x = apply_btn.width;
                                apply_btn.on(LEvent.CLICK, this, this.otherOnItem, [this.chatData[index].displayinfos[0]]);
                                apply_btn2.on(LEvent.CLICK, this, this.onApplyTeam, [this.chatData[index].roleid]);
                                we_img.width = apply_btn.width + apply_btn2.width + 15;
                            }
                            else if (arr.length == 2) { /** 正常输入聊天记录 */
                                var facehtml = arr[1];
                                if ((arr[1].indexOf("@") != -1)) {
                                    facehtml = ChatModel.getInstance().getFaceHtmlText(arr[1]);
                                }
                                chatContent.innerHTML = "<span style='font:24px ;color:" + arr[0] + "'>" + facehtml + "</span>";
                            }
                            else { /** 任务时直接请求 */
                                chatContent.innerHTML = "<span style='font:24px '>" + this.chatData[index].message + "</span>";
                            }
                            /** 改变富文本坐标，多还少补！！！ */
                            chatContent.width = 245;
                            var cha = 245 - chatContent.contextWidth;
                            cha = parseInt(cha.toFixed(0));
                            if (cha != 0) {
                                /** 之前在这对富文本框的宽度重新处理，但是如果末尾出现字母时会自动换行，所以这里不对宽度处理 */
                                chatContent.x += cha;
                                if (isTeamYell) { /** 组队邀请格式 */
                                    var lastwordXpos = chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._x + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._w;
                                    var lastwordYpos = chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._y + 1;
                                    this.setApplyBtnPos(3, apply_btn, chatContent, true);
                                    // apply_btn.x = lastwordXpos + chatContent.x;
                                    // let contentwidth = lastwordXpos + apply_btn.width; //加入按钮后的实际宽度
                                    // if (contentwidth > chatContent.contextWidth) {
                                    // 	let hang = chatContent.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
                                    // 	/** 按钮宽110，超过一半就换行 */
                                    // 	if (contentwidth - 55 <= chatContent.contextWidth) { /** 处理不换行 */
                                    // 		let x = contentwidth - chatContent.contextWidth;
                                    // 		let cha = Math.floor(x / hang);
                                    // 		chatContent.width = chatContent.width + cha;
                                    // 		chatContent.x = chatContent.x - cha;
                                    // 		let xs = chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._x + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._w;
                                    // 		apply_btn.x = xs + chatContent.x;
                                    // 		apply_btn.y = chatContent.y + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._y + 1;
                                    // 	} else {/** 换行处理 */
                                    // 		chatContent.contextHeight = chatContent.contextHeight + apply_btn.height + chatContent.style.leading;
                                    // 		apply_btn.x = chatContent.x;
                                    // 		apply_btn.y = chatContent.y + (chatContent.style.leading + 24) * hang;
                                    // 	}
                                    // } else {
                                    // 	apply_btn.y = chatContent.y + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._y + 1;
                                    // }
                                    chatContent.on(LEvent.CLICK, this, this.onRequestTeamInfo, [teamyell[6]]);
                                    apply_btn.on(LEvent.CLICK, this, this.onApplyTeam, [teamyell[5]]);
                                }
                                else if (iskejuHelp) { /** 科举 */
                                    var lastwordXpos = chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._x + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._w;
                                    var lastwordYpos = chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._y + 1;
                                    this.setApplyBtnPos(0, apply_btn, chatContent, true);
                                    // apply_btn.x = lastwordXpos + chatContent.x;
                                    // let contentwidth = lastwordXpos + apply_btn.width; //加入按钮后的实际宽度
                                    // if (contentwidth > chatContent.contextWidth) {
                                    // 	let hang = chatContent.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
                                    // 	/** 按钮宽110，超过一半就换行 */
                                    // 	if (contentwidth - 55 <= chatContent.contextWidth) { /** 处理不换行 */
                                    // 		let x = contentwidth - chatContent.contextWidth;
                                    // 		let cha = Math.floor(x / hang);
                                    // 		chatContent.width = chatContent.width + cha;
                                    // 		chatContent.x = chatContent.x - cha;
                                    // 		let xs = chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._x + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._w;
                                    // 		apply_btn.x = xs + chatContent.x;
                                    // 		apply_btn.y = chatContent.y + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._y + 1;
                                    // 	} else {/** 换行处理 */
                                    // 		chatContent.contextHeight = chatContent.contextHeight + apply_btn.height + chatContent.style.leading;
                                    // 		apply_btn.x = chatContent.x;
                                    // 		apply_btn.y = chatContent.y + (chatContent.style.leading + 24) * hang;
                                    // 	}
                                    // } else {
                                    // 	apply_btn.y = chatContent.y + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._y + 1;
                                    // }
                                    apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().onShowKejuTitle, [kejuHelp[0], kejuHelp[3], kejuHelp[1], kejuHelp[2], this._app]);
                                }
                                else if (isTianJI) {
                                    /** 天机仙令 */
                                    // let lastwordXpos = chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._x + chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._w;
                                    // let lastwordYpos = chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._y;
                                    if (tasktype == TaskType.Item || tasktype == TaskType.Pet) {
                                        apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, tianji[6], tianji[0], this._app, this._viewUI, this.chatData[index].roleid, tianji[4]]);
                                        this.setApplyBtnPos(4, apply_btn, chatContent, true);
                                    }
                                    else if (tasktype == TaskType.NPC) {
                                        apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, 0, 0, this._app, this._viewUI, this.chatData[index].roleid]);
                                        this.setApplyBtnPos(2, apply_btn, chatContent, true);
                                    }
                                }
                            }
                        }
                        else { /** 其他人的聊天数据 */
                            weChat.x = 4;
                            weChat.y = 5;
                            roleLogo.x = 7;
                            roleLogo.y = 8;
                            we_playerName.x = 127;
                            we_playerName.y = 4;
                            chatContent.x = 90;
                            chatContent.y = 49;
                            we_img.x = 82;
                            we_img.y = 43;
                            we_img.anchorX = 0;
                            we_img.anchorY = 0;
                            arrow_img.x = 81;
                            arrow_img.y = 68;
                            arrow_img.rotation = 180;
                            wechannel_img.x = 68;
                            wechannel_img.y = 5;
                            weChannel_lab.x = 8;
                            weChannel_lab.y = 4;
                            /** 改变富文本坐标，多还少补！！！ */
                            chatContent.width = 245;
                            if (isTeamYell) { /** 是队伍喊话信息 特殊处理数据 */
                                var html_4 = "<span style='font:24px ;color:#000000'>[ " + teamyell[0] + "</span>";
                                html_4 += "<span style='color:#000000;fontSize:24'>(" + teamyell[1] + "/5),</span>";
                                html_4 += "<span style='color:#000000;fontSize:24'>等级" + teamyell[2] + "-" + teamyell[3] + "开组了! </span>";
                                html_4 += "<span style='color:#000000;fontSize:24'>" + teamyell[4] + " ]</span>";
                                chatContent.style.leading = 3;
                                chatContent.innerHTML = html_4;
                                subject_img.addChild(apply_btn);
                                var lastwordXpos = chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._x + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._w;
                                var lastwordYpos = chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._y + 3;
                                this.setApplyBtnPos(3, apply_btn, chatContent, false);
                                // apply_btn.x = lastwordXpos + chatContent.x;
                                // apply_btn.on(LEvent.MOUSE_DOWN, this, this.onApplyTeam, [teamyell[5]]);
                                // let contentwidth = lastwordXpos + apply_btn.width; //加入按钮后的实际宽度
                                // /** 判断按钮显示位置，是否需要换行 */
                                // if (contentwidth > chatContent.contextWidth) {
                                // 	let hang = chatContent.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
                                // 	/** 按钮宽110，超过一半就换行 */
                                // 	if (contentwidth - 55 <= chatContent.contextWidth) { /** 处理不换行 */
                                // 		let x = contentwidth - chatContent.contextWidth;
                                // 		let cha = Math.floor(x / hang);
                                // 		chatContent.width = chatContent.width + cha;
                                // 		// chatContent.x = chatContent.x - cha;
                                // 		let xs = chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._x + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._w;
                                // 		apply_btn.x = xs + chatContent.x;
                                // 		apply_btn.y = chatContent.y + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._y + 3;
                                // 	} else {/** 换行处理 */
                                // 		chatContent.contextHeight = chatContent.contextHeight + apply_btn.height + chatContent.style.leading;
                                // 		apply_btn.x = chatContent.x;
                                // 		apply_btn.y = chatContent.y + (chatContent.style.leading + 24) * hang + 3;
                                // 	}
                                // } else {/** 不需要特殊处理 */
                                // 	apply_btn.y = chatContent.y + chatContent._childs[3]._text.words[chatContent._childs[3]._text.words.length - 1]._y + 3;
                                // }
                            }
                            else if (iskejuHelp) { /** 智慧试炼求助 */
                                var questionId = Number(kejuHelp[0]); //题目Id
                                var examtype = kejuHelp[3];
                                var data_2 = KejuModel.getInstance().getExamConfigData(examtype);
                                var html_5 = "<span style='font:24px ;color:#ff6600'>" + data_2[questionId].name + "</span>";
                                chatContent.style.leading = 3;
                                chatContent.innerHTML = html_5;
                                subject_img.addChild(apply_btn);
                                var lastwordXpos = chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._x + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._w;
                                var lastwordYpos = chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._y + 3;
                                this.setApplyBtnPos(0, apply_btn, chatContent, false);
                                // apply_btn.x = lastwordXpos + chatContent.x;
                                // // apply_btn.y = chatContent.y + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length-1]._y +1;
                                // apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().onShowKejuTitle, [kejuHelp[0], kejuHelp[3], kejuHelp[1], kejuHelp[2], this._app]);
                                // let contentwidth = lastwordXpos + apply_btn.width; //加入按钮后的实际宽度
                                // /** 判断按钮显示位置，是否需要换行 */
                                // if (contentwidth > chatContent.contextWidth) {
                                // 	let hang = chatContent.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
                                // 	/** 按钮宽110，超过一半就换行 */
                                // 	if (contentwidth - 55 <= chatContent.contextWidth) { /** 处理不换行 */
                                // 		let x = contentwidth - chatContent.contextWidth;
                                // 		let cha = Math.floor(x / hang);
                                // 		chatContent.width = chatContent.width + cha;
                                // 		// chatContent.x = chatContent.x - cha;
                                // 		let xs = chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._x + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._w;
                                // 		apply_btn.x = xs + chatContent.x;
                                // 		apply_btn.y = chatContent.y + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._y + 3;
                                // 	} else {/** 换行处理 */
                                // 		chatContent.contextHeight = chatContent.contextHeight + apply_btn.height + chatContent.style.leading;
                                // 		apply_btn.x = chatContent.x;
                                // 		apply_btn.y = chatContent.y + (chatContent.style.leading + 24) * hang + 3;
                                // 	}
                                // } else {/** 不需要特殊处理 */
                                // 	apply_btn.y = chatContent.y + chatContent._childs[0]._text.words[chatContent._childs[0]._text.words.length - 1]._y + 3;
                                // }
                            }
                            else if (isTianJI) { /** 天机仙令 */
                                var rolename = this.chatData[index].rolename;
                                var taskId = tianji[0];
                                var taskname = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlConfig[taskId].strtasknameui;
                                var html_6 = "<span style='font:24px ;color:#0066ff'>" + rolename + "</span>";
                                html_6 += "<span style='font:24px ;color:#000000'>发布了任务求助信息</span>";
                                html_6 += "<span style='font:24px ;color:#33cc00'>" + taskname + "</span>";
                                if (tasktype != -1 && tasktype == TaskType.Pet) //需求
                                 {
                                    html_6 += "<span style='font:24px ;color:#000000'>需求</span>";
                                    var targetId = tianji[6];
                                    var targetNum = tianji[7];
                                    var petName = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[targetId].name;
                                    html_6 += "<span style='font:24px ;color:#33cc00'>" + petName + "x" + targetNum + "</span>";
                                    chatContent.innerHTML = html_6;
                                    // HudModel.getInstance().setApplyBtnPos(4, apply_btn, chatContent);
                                    this.setApplyBtnPos(4, apply_btn, chatContent, false);
                                    apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, tianji[6], tianji[0], this._app, this._viewUI, this.chatData[index].roleid, tianji[4]]);
                                }
                                else if (tasktype != -1 && tasktype == TaskType.Item) {
                                    html_6 += "<span style='font:24px ;color:#000000'>需求</span>";
                                    var targetId = tianji[6];
                                    var targetNum = tianji[7];
                                    var itemName = game.modules.bag.models.BagModel.getInstance().itemAttrData[targetId].name;
                                    html_6 += "<span style='font:24px ;color:#33cc00'>" + itemName + "x" + targetNum + "</span>";
                                    chatContent.innerHTML = html_6;
                                    this.setApplyBtnPos(4, apply_btn, chatContent, false);
                                    apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, tianji[6], tianji[0], this._app, this._viewUI, this.chatData[index].roleid, tianji[4]]);
                                }
                                else if (tasktype != -1 && tasktype == TaskType.NPC) {
                                    chatContent.innerHTML = html_6;
                                    this.setApplyBtnPos(2, apply_btn, chatContent, false);
                                    apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, 0, 0, this._app, this._viewUI, this.chatData[index].roleid]);
                                }
                                chatContent.style.leading = 3;
                                subject_img.addChild(apply_btn);
                                // let lastwordXpos = chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._x + chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._w;
                                // let lastwordYpos = chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._y;
                                // this.setApplyBtnPos(4, apply_btn, chatContent,false);
                            }
                            else if (isQiuZhu) {
                                we_img.addChild(apply_btn);
                                we_img.addChild(apply_btn2);
                                apply_btn.labelAlign = "center";
                                apply_btn2.labelAlign = "center";
                                var width = apply_btn.label.length - apply_btn2.label.length <= 0 ? 0 : (apply_btn.label.length - apply_btn2.label.length) * 20;
                                apply_btn.width += width;
                                chatContent.visible = false;
                                apply_btn.x = 5;
                                apply_btn2.x = apply_btn.width;
                                apply_btn.on(LEvent.CLICK, this, this.otherOnItem, [this.chatData[index].displayinfos[0]]);
                                apply_btn2.on(LEvent.CLICK, this, this.onApplyTeam, [this.chatData[index].roleid]);
                                we_img.width = apply_btn.width + apply_btn2.width + 15;
                            }
                            else if (arr.length == 2) {
                                var facehtml = arr[1];
                                if ((arr[1].indexOf("@") != -1)) {
                                    facehtml = ChatModel.getInstance().getFaceHtmlText(arr[1]);
                                }
                                chatContent.innerHTML = "<span style='font:24px ;color:" + arr[0] + "'>" + facehtml + "</span>";
                                // let facehtml = ChatModel.getInstance().getFaceHtmlText(arr[1]);
                                // chatContent.innerHTML = "<span style='font:24px ;color:" + arr[0] + "; SimHei'> " + facehtml + "</span>";
                            }
                            else { //没明白这是干什么 if (index != this.chatData.length - 1) 
                                chatContent.innerHTML = "<span style='font:24px ; SimHei'> " + this.chatData[index].message + "</span>";
                            }
                        }
                        if (isTeamYell) {
                            //   chatContent.on(LEvent.MOUSE_DOWN,this,this.show)
                            chatContent.on(LEvent.CLICK, this, this.onRequestTeamInfo, [teamyell[6]]);
                            apply_btn.on(LEvent.CLICK, this, this.onApplyTeam, [teamyell[5]]);
                        }
                        else if (this.chatData[index].displayinfos.length != 0 && this.chatData[index].displayinfos[0].displaytype == DisplayType.DISPLAY_ITEM) { /**自己的 道具请求tips */
                            // let key = this.chatData[index].displayinfos[0].uniqid;
                            // let item = this.getItemBack(key);
                            // let obj = BagModel.getInstance().getItemAttrData(item.id);
                            // let quality = obj.nquality;
                            // if(quality != 1)
                            // {
                            // 	let color = this.judgeColor(quality);
                            // 	we_chatContent.innerHTML = "<span style='font:24px ;color:"+color+"'>"+this.chatData[index].message+"</span>";
                            // }
                            if (this.chatData[index].roleid == LoginModel.getInstance().roleDetail.roleid)
                                chatContent.on(LEvent.CLICK, this, this.showItemTips, [this.chatData[index].displayinfos[0]]);
                            else
                                chatContent.on(LEvent.CLICK, this, this.otherOnItem, [this.chatData[index].displayinfos[0], arr[1]]);
                        }
                        else if (this.chatData[index].displayinfos.length != 0) { /** 宠物信息或任务请求 */
                            chatContent.on(LEvent.CLICK, this, this.otherOnItem, [this.chatData[index].displayinfos[0], this.chatData[index].message]);
                        }
                        /** 存在的表情数 */
                        // let imgTimes = facehtml.split("<img").length-1  ;
                        chatContent.style.align = "left";
                        chatContent.style.leading = 3;
                        if (!isQiuZhu) {
                            we_img.height = chatContent.contextHeight + 25;
                            we_img.width = chatContent.contextWidth + 25;
                        }
                        if (we_img.height > 50) { /** 位置重新处理 */
                            subject_img.height += (we_img.height - 35);
                        }
                        switch (channel) {
                            case ChannelType.CURRENR_CHANNEL:
                                if (ChatModel.getInstance().lastCurrentImg == null)
                                    subject_img.y = 1;
                                else
                                    subject_img.y = ChatModel.getInstance().lastCurrentImg.y + ChatModel.getInstance().lastCurrentImg.height + 5;
                                ChatModel.getInstance().lastCurrentImg = subject_img;
                                break;
                            case ChannelType.WORLD_CHANNEL:
                                if (ChatModel.getInstance().lastWorldImg == null)
                                    subject_img.y = 1;
                                else
                                    subject_img.y = ChatModel.getInstance().lastWorldImg.y + ChatModel.getInstance().lastWorldImg.height + 5;
                                ChatModel.getInstance().lastWorldImg = subject_img;
                                break;
                            case ChannelType.FAMILY_CHANNEL:
                                if (ChatModel.getInstance().lastFamilyImg == null)
                                    subject_img.y = 1;
                                else
                                    subject_img.y = ChatModel.getInstance().lastFamilyImg.y + ChatModel.getInstance().lastFamilyImg.height + 5;
                                ChatModel.getInstance().lastFamilyImg = subject_img;
                                break;
                            case ChannelType.CHANNEL_PROFESSION:
                                if (ChatModel.getInstance().lastZhiYeImg == null)
                                    subject_img.y = 1;
                                else
                                    subject_img.y = ChatModel.getInstance().lastZhiYeImg.y + ChatModel.getInstance().lastZhiYeImg.height + 5;
                                ChatModel.getInstance().lastZhiYeImg = subject_img;
                                break;
                            case ChannelType.CHANNEL_TEAM:
                                if (ChatModel.getInstance().lastTeamImg == null)
                                    subject_img.y = 1;
                                else
                                    subject_img.y = ChatModel.getInstance().lastTeamImg.y + ChatModel.getInstance().lastTeamImg.height + 5;
                                ChatModel.getInstance().lastTeamImg = subject_img;
                                break;
                            case ChannelType.CHANNEL_TEAM_APPLY:
                                if (ChatModel.getInstance().lastZuDuiImg == null)
                                    subject_img.y = 1;
                                else
                                    subject_img.y = ChatModel.getInstance().lastZuDuiImg.y + ChatModel.getInstance().lastZuDuiImg.height + 5;
                                ChatModel.getInstance().lastZuDuiImg = subject_img;
                                break;
                            default:
                                break;
                        }
                        list.addChild(subject_img);
                        /** 滚动条信息 */
                        this.scrollY = subject_img.y + subject_img.height;
                        if (!this.flag) {
                            /** 重新设置滚动条 */
                            list.vScrollBar.setScroll(0, this.scrollY, this.scrollY);
                            list.scrollTo(null, this.scrollY);
                        }
                    }
                    else { /** 组队或红包消息 */
                        var html = new Laya.HTMLDivElement;
                        var channer_img = new Laya.Image;
                        var channer_lab = new Laya.Label;
                        var clickbtn = new Laya.Button;
                        var param = ChatModel.getInstance().specialChannelData.get(this.chatData[index].roleid);
                        if (typeof (this.chatData[index].roleid) == "string") {
                            clickbtn.label = "[抢红包]";
                            clickbtn.skin = "";
                        }
                        channer_lab.x = 13;
                        channer_lab.y = 6;
                        channer_lab.fontSize = 15;
                        channer_lab.width = 30;
                        channer_lab.height = 15;
                        channer_img.x = 0;
                        channer_img.y = 0;
                        channer_img.skin = "common/ui/liaotian/liaotian_pindaodiban.png";
                        html.x = 58;
                        html.y = 0;
                        html.width = 300;
                        var mainImg = new Laya.Image;
                        mainImg.x = 0;
                        mainImg.y = 0;
                        mainImg.width = 420;
                        mainImg.height = 50;
                        channer_img.addChild(channer_lab);
                        mainImg.addChild(channer_img);
                        mainImg.addChild(html);
                        mainImg.addChild(clickbtn);
                        var data = this.chatData[index].message;
                        var times = 0;
                        do {
                            times = data.indexOf("#f6f6f4");
                            data = data.replace("#f6f6f4", "#000000");
                            data = data.replace("undefined", " ");
                        } while (times != -1);
                        var x = void 0;
                        /** 是否是未定义的空字符串 */
                        var isundefined = this.chatData[index].message.search("undefined");
                        html.innerHTML = data;
                        mainImg.height = (html.contextHeight);
                        html.style.leading = 4;
                        if (html.contextHeight == 24) {
                            clickbtn.x = html.x + html.contextWidth + 2;
                            clickbtn.y = html.y + 3;
                        }
                        else { /** 第二行 */
                            html.width = 351;
                            var x_1;
                            if (isundefined != -1) {
                                /** 换行后的实际宽度 */
                                x_1 = html._childs[1]._text.words[html._childs[1]._text.words.length - 1]._x + html._childs[1]._text.words[html._childs[1]._text.words.length - 1]._w;
                            }
                            else
                                x_1 = html._childs[2]._text.words[html._childs[2]._text.words.length - 1]._x + html._childs[2]._text.words[html._childs[2]._text.words.length - 1]._w;
                            clickbtn.x = html.x + x_1 + 2;
                            clickbtn.y = html.y + (html.contextHeight / 2) + 3;
                        }
                        html.style.leading = 2;
                        clickbtn.mouseEnabled = true;
                        clickbtn.labelSize = 20;
                        clickbtn.labelColors = "#008000";
                        clickbtn.width = 72;
                        clickbtn.height = 15;
                        clickbtn.on(LEvent.MOUSE_DOWN, this, this.onEvent, [param]);
                        switch (Number(this.chatData[index].messagetype)) {
                            case ChannelType.CHANNEL_WORLD:
                                channer_lab.text = "世界";
                                channer_lab.color = "#00FF00";
                                /** 设置位置 */
                                if (ChatModel.getInstance().lastWorldImg == null)
                                    mainImg.y = 1;
                                else
                                    mainImg.y = ChatModel.getInstance().lastWorldImg.y + ChatModel.getInstance().lastWorldImg.height + 7;
                                /** 存储位置信息 */
                                ChatModel.getInstance().lastWorldImg = mainImg;
                                break;
                            case ChannelType.CHANNEL_TEAM:
                                channer_lab.text = "队伍";
                                channer_lab.color = "#FFFFFF";
                                if (ChatModel.getInstance().lastTeamImg == null)
                                    mainImg.y = 1;
                                else
                                    mainImg.y = ChatModel.getInstance().lastTeamImg.y + ChatModel.getInstance().lastTeamImg.height + 7;
                                ChatModel.getInstance().lastTeamImg = mainImg;
                                break;
                            case ChannelType.CHANNEL_CLAN:
                                channer_lab.text = "帮派";
                                channer_lab.color = "#FFFF00";
                                if (ChatModel.getInstance().lastFamilyImg == null)
                                    mainImg.y = 1;
                                else
                                    mainImg.y = ChatModel.getInstance().lastFamilyImg.y + ChatModel.getInstance().lastFamilyImg.height + 7;
                                ChatModel.getInstance().lastFamilyImg = mainImg;
                                break;
                            default: break;
                        }
                        list.addChild(mainImg);
                        this.scrollY = mainImg.y + mainImg.height;
                        if (!this.flag) {
                            list.vScrollBar.setScroll(0, this.scrollY, this.scrollY);
                            list.scrollTo(null, this.scrollY);
                        }
                    }
                };
                /** 点击富文本显示该角色队伍信息 */
                ChatViewMediator.prototype.onRequestTeamInfo = function (teamid) {
                    RequesterProtocols._instance.c2s_COneKeyApplyTeamInfo(teamid);
                    modules.team.models.TeamProxy.getInstance().once(modules.team.models.ONE_KEY_TEAMINFO, this, this.onShowTeamInfo);
                };
                /** 队伍情况界面 */
                ChatViewMediator.prototype.onShowTeamInfo = function (teaminfo) {
                    var _memberlist = teaminfo.get("memberlist");
                    var TeamInfoMediator = new modules.team.TeamInfoMediator(this._app);
                    TeamInfoMediator.onshow(_memberlist);
                };
                /** 设置特殊按钮位置信息
                 * @param lastword 组装语句最后一个子节点长度-1
                 * @param apply_btn 组装语句按钮
                 * @param chatContent 组装语句富文本框
                 * @param speakForYourself 是否是自己发
                 */
                ChatViewMediator.prototype.setApplyBtnPos = function (lastword, apply_btn, chatContent, speakForYourself) {
                    chatContent;
                    apply_btn.x = chatContent.x + chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._x + chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._w;
                    var contentwidth = chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._x + chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._w + apply_btn.width; //加入按钮后的实际宽度
                    if (contentwidth > chatContent.contextWidth) {
                        var hang = chatContent.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
                        /** 按钮宽110，超过一半就换行 */
                        if (contentwidth - 55 <= chatContent.contextWidth) { /** 处理不换行 */
                            var x = contentwidth - chatContent.contextWidth;
                            var cha = Math.floor(x / hang);
                            // chatContent.width = chatContent.width + cha;
                            chatContent.contextWidth = chatContent.contextWidth + cha;
                            if (speakForYourself)
                                chatContent.x = chatContent.x - cha;
                            // let xs = chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._x + chatContent._childs[4]._text.words[chatContent._childs[4]._text.words.length - 1]._w;
                            apply_btn.x = chatContent.x + chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._x + chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._w;
                            apply_btn.y = chatContent.y + chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._y;
                        }
                        else { /** 换行处理 */
                            chatContent.contextHeight = chatContent.contextHeight + apply_btn.height + chatContent.style.leading;
                            apply_btn.x = chatContent.x;
                            apply_btn.y = chatContent.y + (chatContent.style.leading + 24) * hang;
                        }
                    }
                    else {
                        apply_btn.y = chatContent.y + chatContent._childs[lastword]._text.words[chatContent._childs[lastword]._text.words.length - 1]._y;
                    }
                };
                /**
                 * 申请组队事件
                 * @param leaderid 队长Id
                 */
                ChatViewMediator.prototype.onApplyTeam = function (leaderid) {
                    RequesterProtocols._instance.c2s_CRequestJoinTeam(leaderid);
                };
                /** 抢红包事件 */
                ChatViewMediator.prototype.onEvent = function (data) {
                    modules.redPacket.models.RedPacketModel.getInstance().qiangRedPack(data[3], data[2]);
                    modules.ModuleManager.hide(modules.ModuleNames.Chat);
                };
                /** 其他人点击的道具分享 */
                ChatViewMediator.prototype.otherOnItem = function (displayinfo, ItemName) {
                    // e.stopPropagation();
                    if (displayinfo.displaytype == DisplayType.DISPLAY_ITEM) { /** 道具相关 */
                        ItemName = ItemName.replace("[", "");
                        ItemName = ItemName.replace("]", "");
                        var itemID = void 0;
                        var itemAttrData = BagModel.getInstance().itemAttrData;
                        for (var itemId in itemAttrData) {
                            if (itemAttrData[itemId].name == ItemName) {
                                itemID = itemAttrData[itemId].id;
                                break;
                            }
                        }
                        if (itemID != 0) {
                            ChatModel.getInstance().viewItemId = itemID;
                        }
                        RequesterProtocols._instance.c2s_CChatItemTips(displayinfo);
                    }
                    else if (displayinfo.displaytype == DisplayType.DISPLAY_PET) { /** 宠物相关 */
                        RequesterProtocols._instance.c2s_get_petinfo(displayinfo.roleid, displayinfo.uniqid);
                    }
                    else if (displayinfo.displaytype == DisplayType.DISPLAY_TASK) { /** 任务相关 */
                        RequesterProtocols._instance.c2s_CChatItemTips(displayinfo);
                    }
                };
                /** 调色板组件 */
                ChatViewMediator.prototype.changeColor = function () {
                    if (this._viewUI.tiaosePanel_img.visible == false) {
                        this._viewUI.tiaosePanel_img.visible = true;
                        this._viewUI.content_img.visible = false;
                    }
                    this._viewUI.resetColor_img.on(LEvent.MOUSE_DOWN, this, this.changeToColor, ["resert"]);
                    this._viewUI.pink_img.on(LEvent.MOUSE_DOWN, this, this.changeToColor, ["pink"]);
                    this._viewUI.darkBlue_img.on(LEvent.MOUSE_DOWN, this, this.changeToColor, ["blue"]);
                    this._viewUI.green_img.on(LEvent.MOUSE_DOWN, this, this.changeToColor, ["green"]);
                    this._viewUI.yellow_img.on(LEvent.MOUSE_DOWN, this, this.changeToColor, ["yellow"]);
                    this._viewUI.red_img.on(LEvent.MOUSE_DOWN, this, this.changeToColor, ["red"]);
                };
                /** 文本框颜色调整
                 * @param color 颜色
                 */
                ChatViewMediator.prototype.changeToColor = function (color) {
                    switch (color) {
                        case "resert":
                            this.color = "#000000";
                            break;
                        case "pink":
                            this.color = "#FFCCCC";
                            break;
                        case "blue":
                            this.color = "#0000FF";
                            break;
                        case "green":
                            this.color = "#00FF00";
                            break;
                        case "yellow":
                            this.color = "#FFFF00";
                            break;
                        case "red":
                            this.color = "#FF0000";
                            break;
                        default:
                            break;
                    }
                    this.closeTiaoSe();
                };
                /** 根据物品的品质取得不同颜色
                 * @param quality 品质
                 */
                ChatViewMediator.prototype.judgeColor = function (quality) {
                    if (quality == 2) {
                        return "#9F35FF";
                    }
                    else if (quality == 3) {
                        return "#921AFF";
                    }
                    else if (quality == 4) {
                        return "#EA0000";
                    }
                };
                /** 开启表情 */
                ChatViewMediator.prototype.openFace = function () {
                    if (this._viewUI.content_img.visible == false) {
                        this._viewUI.content_img.visible = true;
                        this._viewUI.tiaosePanel_img.visible = false;
                    }
                    else
                        return;
                    for (var i = 1; i <= 6; i++) {
                        var btn = this._viewUI.getChildByName("chat_img").getChildByName("content_img").getChildByName("facebox_box").getChildByName("facebtn" + [i] + "_btn");
                        var name = "facebtn" + [i] + "_btn";
                        btn.on(LEvent.MOUSE_UP, this, this.opFaceContent, [name]);
                    }
                    this.Face();
                };
                /** 聊天表情的初始化
                 * @param name 聊天表情模块名称
                 */
                ChatViewMediator.prototype.opFaceContent = function (name) {
                    for (var i = 1; i <= 6; i++) {
                        var img = this._viewUI.getChildByName("chat_img").getChildByName("content_img").getChildByName("facebox_box").getChildByName("facebtn" + [i] + "_btn").getChildByName("state" + [i] + "_img");
                        img.visible = false;
                    }
                    switch (name) {
                        case "facebtn1_btn": //表情 
                            this.Face();
                            break;
                        case "facebtn2_btn": //常用语
                            this._viewUI.state2_img.visible = true;
                            this._viewUI.contentlist1_list.visible = true;
                            this._viewUI.contentlist2_list.visible = false;
                            this._viewUI.contentlist3_list.visible = false;
                            this._viewUI.contentlist4_list.visible = false;
                            this._viewUI.contentlist5_list.visible = false;
                            this._viewUI.face_list.visible = false;
                            this.CommonLanguage();
                            break;
                        case "facebtn3_btn": //任务
                            this._viewUI.state3_img.visible = true;
                            this._viewUI.contentlist1_list.visible = false;
                            this._viewUI.contentlist2_list.visible = true;
                            this._viewUI.contentlist3_list.visible = false;
                            this._viewUI.contentlist4_list.visible = false;
                            this._viewUI.contentlist5_list.visible = false;
                            this._viewUI.face_list.visible = false;
                            this.Task();
                            break;
                        case "facebtn4_btn": //历史输入
                            this._viewUI.state4_img.visible = true;
                            this._viewUI.contentlist1_list.visible = false;
                            this._viewUI.contentlist2_list.visible = false;
                            this._viewUI.contentlist3_list.visible = true;
                            this._viewUI.contentlist4_list.visible = false;
                            this._viewUI.contentlist5_list.visible = false;
                            this._viewUI.face_list.visible = false;
                            this.HistoryInput();
                            break;
                        case "facebtn5_btn": // 物品分享
                            this._viewUI.state5_img.visible = true;
                            this._viewUI.contentlist1_list.visible = false;
                            this._viewUI.contentlist2_list.visible = false;
                            this._viewUI.contentlist3_list.visible = false;
                            this._viewUI.contentlist4_list.visible = true;
                            this._viewUI.contentlist5_list.visible = false;
                            this._viewUI.face_list.visible = false;
                            this.Item();
                            break;
                        case "facebtn6_btn": //宠物分享
                            this._viewUI.state6_img.visible = true;
                            this._viewUI.contentlist1_list.visible = false;
                            this._viewUI.contentlist2_list.visible = false;
                            this._viewUI.contentlist3_list.visible = false;
                            this._viewUI.contentlist4_list.visible = false;
                            this._viewUI.contentlist5_list.visible = true;
                            this._viewUI.face_list.visible = false;
                            this.Pet();
                            break;
                        default:
                            break;
                    }
                };
                /**
                 * 计算页数
                 * @param pageNum 每页显示的数量  @param 数据源长度 @param ratio 滚动条比例 @param reCalucate 重新计算规则
                 */
                ChatViewMediator.prototype.calculationNumPage = function (pageNum, length, ratio, reCalucate) {
                    if (ratio === void 0) { ratio = 0; }
                    if (reCalucate === void 0) { reCalucate = true; }
                    /** 总页码 */
                    var totalPage = Math.ceil(length / pageNum);
                    /** 总共5个小球 */
                    var allBall = 5;
                    if (reCalucate) {
                        for (var pageIndex = 1; pageIndex <= allBall; pageIndex++) { /** 先隐藏所有 */
                            var indexBall = this._viewUI.content_img.getChildByName("darkball" + pageIndex + "_img");
                            indexBall.visible = false;
                        }
                        for (var nowpage = 1; nowpage <= totalPage; nowpage++) { /** 显示 */
                            var nowBall = this._viewUI.content_img.getChildByName("darkball" + nowpage + "_img");
                            var greenBall = nowBall.getChildByName("greenball" + nowpage + "_img");
                            if (nowBall) {
                                nowBall.visible = true;
                                //除第一个其他隐藏
                                if (nowpage == 1)
                                    greenBall.visible = true;
                                else
                                    greenBall.visible = false;
                            }
                        }
                    }
                    if (ratio && ratio != 0) {
                        var ball = Math.ceil(totalPage * ratio);
                        for (var index = 1; index <= totalPage; index++) {
                            var allball = this._viewUI.content_img.getChildByName("darkball" + index + "_img").getChildByName("greenball" + index + "_img");
                            if (allball)
                                allball.visible = false;
                        }
                        if (ball <= 0)
                            ball = 1;
                        if (ball > totalPage)
                            ball = totalPage;
                        var nowball = this._viewUI.content_img.getChildByName("darkball" + ball + "_img").getChildByName("greenball" + ball + "_img");
                        if (nowball)
                            nowball.visible = true;
                    }
                };
                /**
                 * 滑动到指定页码
                 * @param viewNum 单页的数量 @param datasourceLength 数据源长度 @param list 指定ui
                 */
                ChatViewMediator.prototype.countCurrentPage = function (viewNum, datasourceLength, list) {
                    var val = list.scrollBar.value;
                    var max = list.scrollBar.max;
                    var ratio = max == 0 ? 0 : val / max;
                    /** 首先计算页数 */
                    this.calculationNumPage(viewNum, datasourceLength, ratio, false);
                };
                /** 表情界面 */
                ChatViewMediator.prototype.Face = function () {
                    /** 首先计算页数 */
                    this.calculationNumPage(35, this.faceList.length, 0, true);
                    this._viewUI.state1_img.visible = true;
                    this._viewUI.contentlist1_list.visible = false;
                    this._viewUI.contentlist2_list.visible = false;
                    this._viewUI.contentlist3_list.visible = false;
                    this._viewUI.contentlist4_list.visible = false;
                    this._viewUI.contentlist5_list.visible = false;
                    this._viewUI.face_list.visible = true;
                    var face = 0;
                    this._viewUI.face_list.hScrollBarSkin = "";
                    if (this.faceList.length <= 7) {
                        this._viewUI.face_list.repeatX = this.faceList.length;
                        this._viewUI.face_list.repeatY = 1;
                    }
                    else {
                        this._viewUI.face_list.repeatX = this.faceList.length;
                        this._viewUI.face_list.repeatY = 5;
                    }
                    this._viewUI.face_list.array = this.faceList;
                    this._viewUI.face_list.spaceX = 22;
                    this._viewUI.face_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.face_list.scrollBar.elasticDistance = 100;
                    this._viewUI.face_list.scrollBar.changeHandler = new Laya.Handler(this, this.countCurrentPage, [35, this.faceList.length, this._viewUI.face_list]); //on(LEvent.BLUR, this, this.countCurrentPage, [35, this.faceList.length, this._viewUI.face_list]);
                    this._viewUI.face_list.on(LEvent.MOUSE_WHEEL, this, this.countCurrentPage, [35, this.faceList.length, this._viewUI.face_list]);
                    this._viewUI.face_list.renderHandler = new Handler(this, this.onContentListRender, [face]);
                };
                /** 常用语 */
                ChatViewMediator.prototype.CommonLanguage = function () {
                    /** 首先计算页数 */
                    this.calculationNumPage(8, this.quickChat.length, 0, true);
                    var commonLanageArg = 1;
                    this._viewUI.contentlist1_list.hScrollBarSkin = "";
                    this._viewUI.contentlist1_list.repeatX = this.quickChat.length;
                    this._viewUI.contentlist1_list.array = this.quickChat;
                    this._viewUI.contentlist1_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.contentlist1_list.scrollBar.elasticDistance = 100;
                    this._viewUI.contentlist1_list.scrollBar.changeHandler = new Handler(this, this.countCurrentPage, [8, this.quickChat.length, this._viewUI.contentlist1_list]);
                    this._viewUI.contentlist1_list.renderHandler = new Handler(this, this.onContentListRender, [commonLanageArg], false);
                    this._viewUI.contentlist1_list.on(LEvent.MOUSE_WHEEL, this, this.countCurrentPage, [8, this.quickChat.length, this._viewUI.contentlist1_list]);
                };
                /** 任务 */
                ChatViewMediator.prototype.Task = function () {
                    var taskArg = 2;
                    this._viewUI.contentlist2_list.hScrollBarSkin = "";
                    var accepttask = Taskmodels.getInstance().accepttask;
                    var schooltask = Taskmodels.getInstance().schooltask;
                    var maintask = Taskmodels.getInstance().maintask;
                    /** 每次点击清空数据 */
                    this.task = [];
                    for (var accepttaskIndex = 0; accepttaskIndex < accepttask.keys.length; accepttaskIndex++) { /** 存推荐任务的 key 任务iD */
                        this.task.push(accepttask.keys[accepttaskIndex]);
                    }
                    for (var schooltaskIndex = 0; schooltaskIndex < schooltask.keys.length; schooltaskIndex++) { /** 存师门任务的 value 任务iD */
                        this.task.push(Taskmodels.getInstance().schooltask.keys[schooltaskIndex]);
                    }
                    for (var maintaskIndex = 0; maintaskIndex < maintask.keys.length; maintaskIndex++) { /** 存主任务的 key 任务iD */
                        this.task.push(maintask.keys[maintaskIndex]);
                    }
                    /** 首先计算页数 */
                    this.calculationNumPage(8, this.task.length, 0, true);
                    this._viewUI.contentlist2_list.repeatX = this.task.length;
                    this._viewUI.contentlist2_list.array = this.task;
                    this._viewUI.contentlist2_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.contentlist2_list.scrollBar.elasticDistance = 100;
                    this._viewUI.contentlist2_list.scrollBar.changeHandler = new Laya.Handler(this, this.countCurrentPage, [8, this.task.length, this._viewUI.contentlist2_list]);
                    this._viewUI.contentlist2_list.on(LEvent.MOUSE_WHEEL, this, this.countCurrentPage, [8, this.task.length, this._viewUI.contentlist2_list]);
                    this._viewUI.contentlist2_list.renderHandler = new Handler(this, this.onContentListRender, [taskArg]);
                };
                /** 宠物 */
                ChatViewMediator.prototype.Pet = function () {
                    var petKeys = PetModel.getInstance().pets.keys;
                    if (petKeys.length <= 0) {
                        this._viewUI.contentlist5_list.visible = false;
                        return;
                    }
                    else {
                        this.petLits = [];
                        for (var petKey = 0; petKey < petKeys.length; petKey++) {
                            this.petLits.push(PetModel.getInstance().pets.get(petKeys[petKey]));
                        }
                    }
                    var petArg = 5;
                    this._viewUI.contentlist5_list.hScrollBarSkin = "";
                    /** 首先计算页数 */
                    this.calculationNumPage(4, this.petLits.length, 0, true);
                    if (this.petLits.length <= 2) {
                        this._viewUI.contentlist5_list.repeatX = this.petLits.length;
                        this._viewUI.contentlist5_list.repeatY = 1;
                    }
                    else {
                        this._viewUI.contentlist5_list.repeatX = this.petLits.length;
                        this._viewUI.contentlist5_list.repeatY = 2;
                    }
                    this._viewUI.contentlist5_list.array = this.petLits;
                    this._viewUI.contentlist5_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.contentlist5_list.scrollBar.elasticDistance = 10;
                    this._viewUI.contentlist5_list.scrollBar.changeHandler = new Laya.Handler(this, this.countCurrentPage, [4, this.petLits.length, this._viewUI.contentlist5_list]);
                    this._viewUI.contentlist5_list.on(LEvent.MOUSE_WHEEL, this, this.countCurrentPage, [4, this.petLits.length, this._viewUI.contentlist5_list]);
                    this._viewUI.contentlist5_list.renderHandler = new Handler(this, this.onContentListRender, [petArg]);
                };
                /** 背包道具 */
                ChatViewMediator.prototype.Item = function () {
                    this.itemList = bagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
                    if (this.itemList.length <= 0) {
                        this._viewUI.contentlist4_list.visible = false;
                        return;
                    }
                    var itemArg = 4;
                    /** 首先计算页数 */
                    this.calculationNumPage(24, this.itemList.length, 0, true);
                    this._viewUI.contentlist4_list.hScrollBarSkin = "";
                    if (this.itemList.length <= 6) {
                        this._viewUI.contentlist4_list.repeatX = this.itemList.length;
                        this._viewUI.contentlist4_list.repeatY = 1;
                    }
                    else {
                        this._viewUI.contentlist4_list.repeatX = this.itemList.length;
                        this._viewUI.contentlist4_list.repeatY = 4;
                    }
                    this._viewUI.contentlist4_list.array = this.itemList;
                    this._viewUI.contentlist4_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.contentlist4_list.scrollBar.elasticDistance = 10;
                    this._viewUI.contentlist4_list.scrollBar.changeHandler = new Laya.Handler(this, this.countCurrentPage, [24, this.itemList.length, this._viewUI.contentlist4_list]);
                    this._viewUI.contentlist4_list.on(LEvent.MOUSE_WHEEL, this, this.countCurrentPage, [24, this.itemList.length, this._viewUI.contentlist4_list]);
                    this._viewUI.contentlist4_list.renderHandler = new Handler(this, this.onContentListRender, [itemArg]);
                };
                /** 历时输入 */
                ChatViewMediator.prototype.HistoryInput = function () {
                    var historyInputArg = 3;
                    this._viewUI.contentlist3_list.hScrollBarSkin = "";
                    if (this.historyInput != null) {
                        this._viewUI.contentlist3_list.repeatX = this.historyInput.length;
                        this._viewUI.contentlist3_list.array = this.historyInput;
                    }
                    else {
                        this._viewUI.contentlist3_list.repeatX = this.nohistory.length;
                        this._viewUI.contentlist3_list.array = this.nohistory;
                    }
                    /** 首先计算页数 */
                    this.calculationNumPage(8, this.historyInput.length, 0, true);
                    this._viewUI.contentlist3_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.contentlist3_list.scrollBar.elasticDistance = 100;
                    this._viewUI.contentlist3_list.scrollBar.changeHandler = new Laya.Handler(this, this.countCurrentPage, [8, this.historyInput.length, this._viewUI.contentlist3_list]);
                    this._viewUI.contentlist3_list.on(LEvent.MOUSE_WHEEL, this, this.countCurrentPage, [8, this.historyInput.length, this._viewUI.contentlist3_list]);
                    this._viewUI.contentlist3_list.renderHandler = new Handler(this, this.onContentListRender, [historyInputArg]);
                };
                /** 频道颜色 */
                ChatViewMediator.prototype.changeChannelAndColor = function (channelLab) {
                    switch (this.channel) {
                        case this.channelType.CHANNEL_WORLD:
                            channelLab.text = "世界";
                            channelLab.color = "#00FF00";
                            break;
                        case this.channelType.CHANNEL_CURRENT:
                            channelLab.text = "当前";
                            channelLab.color = "#FFFFFF";
                            break;
                        case this.channelType.CHANNEL_PROFESSION:
                            channelLab.text = "职业";
                            channelLab.color = "#87CEFA";
                            break;
                        case this.channelType.CHANNEL_CLAN:
                            channelLab.text = "工会";
                            channelLab.color = "#FFFF00";
                            break;
                        case this.channelType.CHANNEL_TEAM:
                            channelLab.text = "队伍";
                            channelLab.color = "#FFFFFF";
                            break;
                        case this.channelType.CHANNEL_TEAM_APPLY:
                            channelLab.text = "组队";
                            channelLab.color = "#ffffff";
                            break;
                        default:
                            break;
                    }
                };
                /** 聊天表情渲染
                 * @param 模块下标
                 */
                ChatViewMediator.prototype.onContentListRender = function (arg, cell, index) {
                    switch (arg) {
                        case 0:
                            // console.trace("聊天表情渲染index----"+index);
                            var img = cell.getChildByName("faceimg_img");
                            img.skin = this.faceList[index].url;
                            img.on(Laya.Event.CLICK, this, this.onFaceClick, ["@" + index + "@"]);
                            break;
                        case 1:
                            var contentbox1_lab = cell.getChildByName("contentbox1_img").getChildByName("contentbox1_lab");
                            contentbox1_lab.text = this.quickChat[index];
                            contentbox1_lab.on(LEvent.CLICK, this, this.getCommonInput, [contentbox1_lab.text]);
                            break;
                        case 2: /** 任务点击 */
                            var contentbox2_lab = cell.getChildByName("contentbox2_img").getChildByName("contentbox2_lab");
                            var taskType = void 0;
                            if (this.task[index] >= 1010000 && this.task[index] <= 2000000) { /** 师门任务 */
                                // let info:CRepeatTaskBaseVo = game.modules.task.models.TaskModel.getInstance().cRepeatTaskData[this.task[index]];
                                var info = Taskmodels.getInstance().schooltask.get(this.task[index]);
                                var schoolinfo = Taskmodels.getInstance().cRepeatTaskData[info.questtype];
                                var titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(schoolinfo.strtasktitletrack, info.round, 2);
                                var allcount = game.modules.task.models.TaskModel.getInstance().cSchoolTaskData[schoolinfo.nacceptchatid];
                                if (allcount) {
                                    titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(titleinfo, allcount.maxnum, 7);
                                    contentbox2_lab.text = titleinfo;
                                }
                                taskType = 2;
                            }
                            else {
                                var info = game.modules.task.models.TaskModel.getInstance().missionCMainMissionInfoData[this.task[index]];
                                contentbox2_lab.text = info.MissionName;
                                taskType = 1;
                            }
                            contentbox2_lab.on(LEvent.MOUSE_DOWN, this, this.onTask, [index, contentbox2_lab.text, taskType, this.task[index]]);
                            break;
                        case 3: //历史输入
                            var contentbox3_lab = cell.getChildByName("contentbox3_img").getChildByName("contentbox3_lab");
                            if (this.historyInput != null) {
                                contentbox3_lab.text = this.historyInput[index].context;
                                contentbox3_lab.on(LEvent.CLICK, this, this.getHistoryInput, [contentbox3_lab.text]);
                            }
                            else
                                contentbox3_lab.text = this.nohistory[index].context;
                            break;
                        case 4: //物品渲染
                            if (index > this.itemList.length)
                                return;
                            var id = this.itemList[index].id;
                            var itemDatas = BagModel.getInstance().getItemAttrData(id);
                            var itemName = itemDatas.name;
                            var gameItemBgImg = cell.getChildByName("gameItemBg_img");
                            var gameItemImg = cell.getChildByName("gameItem_Img");
                            var gameItemNumberLabel = cell.getChildByName("gameItemNumber_lab");
                            if (itemDatas != null) {
                                var str = this.itemList[index].number > 1 ? this.itemList[index].number.toString() : "";
                                gameItemNumberLabel.visible = true;
                                gameItemBgImg.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(itemDatas.nquality);
                                gameItemImg.skin = "common/icon/item/" + itemDatas.icon + ".png";
                                gameItemNumberLabel.changeText(str);
                                var type_1 = 1;
                                var shopId = 0;
                                // let displayInfo :models.DisplayInfoVo;
                                /** 道具分享发送 */
                                gameItemBgImg.on(LEvent.MOUSE_UP, this, this.onItem, [itemName, this.itemList[index].key, type_1, shopId, id]); //[0,"","",displayInfo,0,0]
                            }
                            else {
                                gameItemBgImg.skin = "";
                                gameItemImg.skin = "";
                                gameItemNumberLabel.visible = false;
                            }
                            break;
                        case 5: //宠物数据
                            if (index > this.petLits.length)
                                return;
                            var petAttr = PetModel.getInstance().petCPetAttrData;
                            var shapeId = LoginModel.getInstance().cnpcShapeInfo;
                            var petName = cell.getChildByName("contentbox3_img").getChildByName("petName_lab");
                            var petlevel = cell.getChildByName("contentbox3_img").getChildByName("petLevel_lab");
                            var petScore = cell.getChildByName("contentbox3_img").getChildByName("petScore_lab");
                            var petIcon = cell.getChildByName("contentbox3_img").getChildByName("petBg_img").getChildByName("pet_img");
                            var petQuality = cell.getChildByName("contentbox3_img").getChildByName("petBg_img");
                            var petId = this.petLits[index].id;
                            petName.color = petAttr[petId].colour;
                            var Quality = petAttr[petId].quality;
                            var modelid = petAttr[petId].modelid;
                            petName.text = this.petLits[index].name;
                            petlevel.text = this.petLits[index].level;
                            petScore.text = this.petLits[index].petscore;
                            var littleShapeId = LoginModel.getInstance().cnpcShapeInfo[modelid];
                            petIcon.skin = "common/icon/avatarpet/" + littleShapeId.littleheadID + ".png";
                            petQuality.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(Quality);
                            var type = 2;
                            petIcon.on(LEvent.MOUSE_DOWN, this, this.onItem, [this.petLits[index].name, this.petLits[index].key, type, petId]);
                            break;
                        default:
                            break;
                    }
                };
                /** 点击物品
                 * @param ItemName 物品名称
                 * @param key 物品的Key
                 * @param type 类型
                 * @param petId 宠物ID
                 */
                ChatViewMediator.prototype.onItem = function (ItemName, key, type, petId, itemId) {
                    if (itemId === void 0) { itemId = 0; }
                    var shareItem = "[" + ItemName + "]";
                    this._viewUI.input_txtinput.text = shareItem;
                    if (itemId != 0 && type == 1) //道具
                     {
                        this.color = BagModel.getInstance().itemAttrData[itemId].colour;
                    }
                    else if (type == 2) //宠物
                     {
                        var sss = PetModel.getInstance().petCPetAttrData;
                        this.color = "#" + PetModel.getInstance().petCPetAttrData[petId].colour;
                    }
                    this.shareItem = shareItem;
                    var disPlayInfo;
                    disPlayInfo = new chat.models.DisplayInfoVo();
                    disPlayInfo.displaytype = type;
                    disPlayInfo.roleid = this._loginModel.roleDetail.roleid;
                    disPlayInfo.shopid = petId;
                    disPlayInfo.counterid = 1;
                    disPlayInfo.uniqid = key;
                    disPlayInfo.teamid = 0;
                    disPlayInfo.crosstt = 0;
                    disPlayInfo.serverid = 0;
                    this.displayInfo = [];
                    this.displayInfo.push(disPlayInfo);
                    if (type == 1)
                        RequesterProtocols._instance.c2s_CChatItemTips(disPlayInfo);
                };
                /** 表情点击 */
                ChatViewMediator.prototype.onFaceClick = function (str) {
                    this.closeFace();
                    this._viewUI.input_txtinput.text += str;
                };
                /** 点击任务栏
                 * @param index 下标
                 * @param taskTitle 任务名称
                 * @param tasktype 任务类型
                 * @param taskid 任务Id
                 */
                ChatViewMediator.prototype.onTask = function (index, taskTitle, tasktype, taskid) {
                    var format = "#000000*split";
                    this.historyMsg = taskTitle;
                    taskTitle = format + "[" + taskTitle + "]";
                    var disPlayInfo;
                    disPlayInfo = new chat.models.DisplayInfoVo();
                    disPlayInfo.displaytype = DisplayType.DISPLAY_TASK;
                    disPlayInfo.roleid = this._loginModel.roleDetail.roleid;
                    disPlayInfo.shopid = tasktype;
                    disPlayInfo.counterid = 1;
                    disPlayInfo.uniqid = taskid;
                    disPlayInfo.teamid = 0; /** 任务类型为师门时，这里 */
                    disPlayInfo.crosstt = 0;
                    disPlayInfo.serverid = 0;
                    this.displayInfo = [];
                    this.displayInfo.push(disPlayInfo);
                    this.sendMsg(this.channel, taskTitle, taskTitle, this.displayInfo, 0, 0);
                    this._viewUI.content_img.visible = false;
                };
                /** 获取历史输入数据
                 * @param historyInput 输入字符串
                 */
                ChatViewMediator.prototype.getHistoryInput = function (historyInput) {
                    this._viewUI.input_txtinput.text = historyInput;
                    this.closeFace();
                };
                /** 获取常用聊天数据
                 * @param commonInput 输入字符串
                 */
                ChatViewMediator.prototype.getCommonInput = function (commonInput) {
                    this._viewUI.input_txtinput.text = commonInput;
                    this.closeFace();
                };
                /** 关闭调色组件 */
                ChatViewMediator.prototype.closeTiaoSe = function () {
                    this._viewUI.tiaosePanel_img.visible = false;
                };
                /** 关闭表情 */
                ChatViewMediator.prototype.closeFace = function () {
                    this._viewUI.content_img.visible = false;
                    for (var i = 1; i <= 6; i++) {
                        var img = this._viewUI.getChildByName("chat_img").getChildByName("content_img").getChildByName("facebox_box").getChildByName("facebtn" + [i] + "_btn").getChildByName("state" + [i] + "_img");
                        img.visible = false;
                    }
                };
                ChatViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    /** 移除侦听 */
                    chat.models.ChatProxy.getInstance().off(chat.models.SHOW_ITEM_TIPS, this, this._ShowTips);
                    chat.models.ChatProxy.getInstance().off(chat.models.VIWE_OTHER_ITEM, this, this._ViewOtherItem);
                    // chat.models.ChatProxy.getInstance().off(chat.models.VIWE_SHARE_TASK,this,this._ViewShareTask);
                    modules.pet.models.PetProxy.getInstance().off(modules.pet.models.GETPETINFO, this, this.OpPetInfo);
                    chat.models.ChatProxy.getInstance().event(chat.models.CLOSE_MAINHUD_PET_LISTEN);
                    if (LoginModel.getInstance().CommonPage == "keju") {
                        LoginModel.getInstance().CommonPage = "";
                        var KejuModule = game.modules.keju.KejuModule.getInstance(this._app);
                        KejuModule.show();
                    }
                };
                ChatViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                ChatViewMediator.LOGIN_EVENT = "loginEvent";
                return ChatViewMediator;
            }(game.modules.UiMediator));
            chat.ChatViewMediator = ChatViewMediator;
        })(chat = modules.chat || (modules.chat = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ChatViewMediator.js.map