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
var ItemLockInfoVo = game.modules.setBasics.models.ItemLockInfoVo;
/**
* 系统设置主界面
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var setBasics;
        (function (setBasics) {
            var SetBasicsMediator = /** @class */ (function (_super) {
                __extends(SetBasicsMediator, _super);
                function SetBasicsMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 同屏NPC列表 */
                    _this.npclist = [];
                    /** 道具安全锁信息 */
                    _this.goodLockInfo = new ItemLockInfoVo();
                    /** 系统设置属性加点字典 */
                    _this._sysConfigDic = new Laya.Dictionary();
                    /** 当前是哪个设置选项正在更改 */
                    _this.currSysConfigType = -1;
                    _this._viewUI = new ui.common.SetJiChuUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._shiGuangZhiXueBinDic = ActivityModel.getInstance().ShiGuangZhiXueBinDic;
                    return _this;
                }
                SetBasicsMediator.prototype.show = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                    this._viewUI.closeFuBen_btn.visible = false;
                    this._loginModel = game.modules.createrole.models.LoginModel.getInstance();
                    _super.prototype.show.call(this);
                    this._initUI();
                    this.registerEvent();
                };
                ////////////////
                ///事件
                ////////////////
                /**注册事件
                 * @describe  UI的事件监听注册与消息监听注册
                 */
                SetBasicsMediator.prototype.registerEvent = function () {
                    var _this = this;
                    //UI事件
                    ////无请求的UI
                    this._viewUI.btnClose.on(LEvent.CLICK, this, this.hide);
                    this._viewUI.yinyue_CBox.on(LEvent.CLICK, this, this.controlMusic);
                    this._viewUI.yinxiao_CBox.on(LEvent.CLICK, this, this.controlSoundEffect);
                    this.yinliang_slider.changeHandler = new Laya.Handler(this, this.controlVolume);
                    this.yinliang_slider.on(LEvent.MOUSE_UP, this, this.controlVolumeRequester);
                    //this._viewUI.refreshHZ_radio.on(LEvent.CLICK,this,this.controlFPS);
                    this._viewUI.scenseEffect_radio.on(LEvent.CLICK, this, this.controlScenseEffect);
                    //this._viewUI.jianhua_CBox.on(LEvent.CLICK,this,this.controlSimplify);
                    //this._viewUI.btnAnQuan.on(LEvent.CLICK,this,this.controlCellphoneSafe);
                    this._viewUI.btnFanHui.on(LEvent.CLICK, this, this.controlReturnLogin);
                    this._viewUI.btnFuBen.on(LEvent.CLICK, this, this._initAutoEnterFuBenList);
                    this._viewUI.autoGuaJi_radio.on(LEvent.CLICK, this, this.changeAutoGuaJi);
                    ////有请求的UI
                    this._viewUI.TongPin_radio.on(LEvent.CLICK, this, this.controlTongPing);
                    //this._viewUI.itemLock_radio.on(LEvent.CLICK,this,this.controlItemLock);
                    this._viewUI.qiecuo_CBox.on(LEvent.CLICK, this, this.controlPK);
                    this._viewUI.zhuangbei_CBox.on(LEvent.CLICK, this, this.controlLookEquip);
                    this._viewUI.zudui_CBox.on(LEvent.CLICK, this, this.controlTeamInvite);
                    this._viewUI.bangpai_CBox.on(LEvent.CLICK, this, this.controlBangpaiInvite);
                    this._viewUI.saizi_CBox.on(LEvent.CLICK, this, this.controlRoll);
                    //消息事件
                    modules.chat.models.ChatProxy.getInstance().on(modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, this, this.show_Msg);
                    game.scene.models.SceneProxy.getInstance().on(game.scene.models.MODEL_CELAR, this, this.removeUserScreen);
                    game.scene.models.SceneProxy.getInstance().on(game.scene.models.MODEL_CREATE, this, this.addUserScreen);
                    // models.SetBasicsProxy.getInstance().on(models.OPEN_GOOD_LOCKS_EVENT,this,this.openGoodLocks);
                    // models.SetBasicsProxy.getInstance().on(models.CLOSE_GOOD_LOCKS_EVENT,this,this.closeGoodLocks);
                    // models.SetBasicsProxy.getInstance().on(models.OPEN_GOOD_LOCKS_FAIL_EVENT,this,this.openGoodLocksFail);
                    // models.SetBasicsProxy.getInstance().on(models.CLOSE_GOOD_LOCKS_FAIL_EVENT,this,this.closeGoodLocksFail);
                    // models.SetBasicsProxy.getInstance().on(models.GET_GOOD_LOCK_INFO,this,this.getGoodLockInfo);
                    modules.tips.models.TipsProxy.getInstance().once(modules.tips.models.TIPS_ON_OK, this, this.returnToLogin);
                    setBasics.models.SetBasicsProxy.getInstance().on(setBasics.models.TYPE_RETURN_LOGIN_EVENT, this, this.showLogin);
                    setBasics.models.SetBasicsProxy.getInstance().on(setBasics.models.GET_RESET_SYSCONFIG_INFO_EVENT, this, this.reSetSystemOption);
                    setBasics.models.SetBasicsProxy.getInstance().on(setBasics.models.GET_SetLineConfig, this, this.setLineConfig);
                    this._viewUI.closeFuBen_btn.on(LEvent.MOUSE_DOWN, this, function () {
                        console.log("---系统设置", _this._viewUI.closeFuBen_btn.visible);
                        _this._viewUI.autoEnterFUBen_lst.visible = false;
                        _this._viewUI.closeFuBen_btn.visible = false;
                    });
                };
                /** 重新设置系统设置的选项
                 * @param sysconfigmap 系统配置属性字典
                 */
                SetBasicsMediator.prototype.reSetSystemOption = function (sysconfigmap) {
                    this.setSystemConfig(sysconfigmap);
                    this._initOption(sysconfigmap);
                };
                /** 设置游戏系统，改变游戏的表现
                 * @param sysconfigmap 系统配置属性字典
                 */
                SetBasicsMediator.prototype.setSystemConfig = function (sysconfigmap) {
                    switch (this.currSysConfigType) {
                        case SysConfigType.Music:
                            //设置音乐
                            sysconfigmap.get(SysConfigType.Music) == 1 ? this._app.sceneRoot.playSceneMusic() : this._app.sceneRoot.stopSceneMusic();
                            break;
                        case SysConfigType.SoundSpecEffect:
                            //设置音效
                            sysconfigmap.get(SysConfigType.SoundSpecEffect) == 1 ? this._app.sceneRoot.playSceneSound() : Laya.SoundManager.stopAllSound();
                            break;
                        case SysConfigType.Volume:
                            //设置音量
                            var _volume = sysconfigmap.get(SysConfigType.Volume) / 200;
                            Laya.SoundManager.setMusicVolume(_volume);
                            //Laya.SoundManager.setSoundVolume(_volume);
                            break;
                    }
                };
                /** 设置自动进入副本选项 */
                SetBasicsMediator.prototype.setLineConfig = function (configmap) {
                };
                /**
                 * 改变是否自动挂机的标识
                 */
                SetBasicsMediator.prototype.changeAutoGuaJi = function () {
                    switch (this._viewUI.autoGuaJi_radio.selectedIndex) {
                        case 0: //开启
                            game.modules.mainhud.models.HudModel.getInstance().autobatt.init();
                            game.modules.autohangup.models.AutoHangUpModel.getInstance().isstar = 1;
                            LocalStorage.setItem("isstarAutoGuaJi" + this.roleId, 1 + "");
                            break;
                        case 1: //关闭
                            game.modules.mainhud.models.HudModel.getInstance().autobatt.stop();
                            game.modules.autohangup.models.AutoHangUpModel.getInstance().isstar = 0;
                            LocalStorage.setItem("isstarAutoGuaJi" + this.roleId, 0 + "");
                            game.modules.autohangup.models.AutoHangUpModel.getInstance().notaketimer = 0;
                            break;
                    }
                };
                /**
                 * 初始化自动进入副本列表信息
                 */
                SetBasicsMediator.prototype._initAutoEnterFuBenList = function () {
                    var rolelevel = HudModel.getInstance().levelNum;
                    if (rolelevel < 30) {
                        var parame = ChatModel.getInstance().chatMessageTips[191039]["msg"];
                        this.show_Msg(parame);
                    }
                    switch (this._viewUI.autoEnterFUBen_lst.visible) {
                        case false:
                            this._viewUI.closeFuBen_btn.visible = true;
                            this._viewUI.autoEnterFUBen_lst.visible = true;
                            break;
                        case true:
                            this._viewUI.autoEnterFUBen_lst.visible = false;
                            break;
                    }
                    this.JingYingFuBenArr = [];
                    var dicKeys = Object.keys(this._shiGuangZhiXueBinDic);
                    for (var i = 0; i < dicKeys.length; i++) {
                        if (this._shiGuangZhiXueBinDic[dicKeys[i]]["enterLevel"] < rolelevel) {
                            this.JingYingFuBenArr.push({ name: this._shiGuangZhiXueBinDic[dicKeys[i]]["name"], enterLevel: this._shiGuangZhiXueBinDic[dicKeys[i]]["enterLevel"] });
                        }
                    }
                    this._viewUI.autoEnterFUBen_lst.array = this.JingYingFuBenArr;
                    this._viewUI.autoEnterFUBen_lst.renderHandler = new Handler(this, this.onRender);
                    this._viewUI.autoEnterFUBen_lst.y = this._viewUI.btnGroup_box.y + this._viewUI.btnFuBen.y - 70 * this.JingYingFuBenArr.length;
                };
                /** 渲染自动进入副本列表的选项 */
                SetBasicsMediator.prototype.onRender = function (cell, index) {
                    var fuben_lab = cell.getChildByName("fuben_lab");
                    fuben_lab.text = this.JingYingFuBenArr[index]["name"];
                    var isAuto_CBox = cell.getChildByName("isAuto_CBox");
                    isAuto_CBox.on(LEvent.CLICK, this, this.onCSetLineConfig, [index, this.JingYingFuBenArr[index]["enterLevel"]]);
                };
                /** 请求设置自动进入副本的选项 */
                SetBasicsMediator.prototype.onCSetLineConfig = function (index, configIndex) {
                    var configmap = new Laya.Dictionary();
                    var dicKeys = Object.keys(this._shiGuangZhiXueBinDic);
                    var isAuto_CBox = this._viewUI.autoEnterFUBen_lst.getCell(index).getChildByName("isAuto_CBox");
                    for (var i = 0; i < dicKeys.length; i++) {
                        if (this._shiGuangZhiXueBinDic[dicKeys[i]]["enterLevel"] == configIndex && isAuto_CBox.selected == true) {
                            configmap.set(this._shiGuangZhiXueBinDic[dicKeys[i]]["enterLevel"], 1);
                        }
                        else {
                            configmap.set(this._shiGuangZhiXueBinDic[dicKeys[i]]["enterLevel"], 0);
                        }
                    }
                    RequesterProtocols._instance.c2s_CSetLineConfig(configmap);
                };
                /**
                 * 初始化系统设置界面选项，只是改变UI表现
                 * @param dicdata 系统配置属性字典数据
                 */
                SetBasicsMediator.prototype._initOption = function (dicdata) {
                    if (!dicdata) {
                        this._sysConfigDic = setBasics.models.SetBasicsModel._instance.SysConfigDic;
                    }
                    else {
                        var _sysConfigDic1 = dicdata;
                        var _sysConfigDic2 = setBasics.models.SetBasicsModel._instance.SysConfigDic;
                        for (var i = 0; i < _sysConfigDic1.keys.length; i++) {
                            _sysConfigDic2.set(_sysConfigDic1.keys[i], _sysConfigDic1.get(_sysConfigDic1.keys[i]));
                        }
                        this._sysConfigDic = _sysConfigDic2;
                    }
                    if (this.currSysConfigType == -1) {
                        this.noneC_initOption();
                        this.haveC_initOption();
                    }
                    else {
                        this.chanfeSystemOption();
                    }
                };
                /** 更改系统设置界面UI的选项 */
                SetBasicsMediator.prototype.chanfeSystemOption = function () {
                    switch (this.currSysConfigType) {
                        case SysConfigType.Music:
                            //设置音乐是否被选中
                            this._sysConfigDic.get(SysConfigType.Music) == 1 ? this._viewUI.yinyue_CBox.selected = true : this._viewUI.yinyue_CBox.selected = false;
                            break;
                        case SysConfigType.SoundSpecEffect:
                            //设置音效是否被选中
                            this._sysConfigDic.get(SysConfigType.SoundSpecEffect) == 1 ? this._viewUI.yinxiao_CBox.selected = true : this._viewUI.yinxiao_CBox.selected = false;
                            break;
                        case SysConfigType.Volume:
                            //设置音量滚动条的值
                            var _volumeValue = this._sysConfigDic.get(SysConfigType.Volume);
                            this.yinliang_slider.value = _volumeValue;
                            break;
                    }
                };
                /**
                 * 显示登录界面
                 * 先隐藏主界面
                 * 销毁当前场景以及玩家角色
                 */
                SetBasicsMediator.prototype.showLogin = function (ext) {
                    //移除主界面
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.MAINHUD_UI_HIDE);
                    console.log("SetBasicsMediator--------------------------ext = " + ext);
                    //window.location.reload();
                    this.hide();
                    // this._serverSelectMediator = new modules.createrole.ServerSelectMediator(this._app);
                    // this._serverSelectMediator.show();
                    // Browser.window.location.reload();//就是F5的效果
                };
                /**
                 * 返回登录操作
                 */
                SetBasicsMediator.prototype.returnToLogin = function () {
                    RequesterProtocols._instance.c2s_CReturnToLogin();
                    //RequesterProtocols._instance.c2s_CRoleOffline();
                };
                /**
                 * 控制返回登录
                 */
                SetBasicsMediator.prototype.controlReturnLogin = function () {
                    var parame = new Laya.Dictionary();
                    parame.set("contentId", 160016);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, parame);
                };
                // /**
                //  * 获取道具安全锁信息
                //  */
                // private getGoodLockInfo(info:any):void{
                //     this.goodLockInfo = info;
                //     //得到道具安全锁密码
                //     this.itemLockPassword = this.goodLockInfo.password;
                //     //获取是否开启了道具安全锁
                //     this.isOpenSafeLock = this.goodLockInfo.isOpenSafeLock;
                //     //控制道具安全锁选项
                //     switch(this.isOpenSafeLock){
                //         case GoodLockState.CLOSE:
                //             this._viewUI.itemLock_radio.selectedIndex = 1;
                //             break;
                //         case GoodLockState.OPEN:
                //             this._viewUI.itemLock_radio.selectedIndex = 0;
                //             break;
                //     } 
                // }
                // /**
                //  * 关闭道具安全锁失败
                //  */
                // private closeGoodLocksFail():void{
                //     this._viewUI.itemLock_radio.selectedIndex = 0;
                // }
                // /**
                //  * 开启道具安全锁失败
                //  */
                // private openGoodLocksFail():void{
                //     this._viewUI.itemLock_radio.selectedIndex = 1;
                // }
                /**
                 * 消息飘窗
                 */
                SetBasicsMediator.prototype.show_Msg = function (msg) {
                    this._disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                    this._disappearMessageTipsMediator.onShow(msg);
                };
                // /**
                //  * 关闭道具安全锁
                //  */
                // private closeGoodLocks():void{
                //     this._viewUI.itemLock_radio.selectedIndex = 1;
                // }
                // /**
                //  * 开启道具安全锁
                //  */
                // private openGoodLocks():void{
                //     this._viewUI.itemLock_radio.selectedIndex = 0;
                // }
                /**
                 * 获取同屏人物列表，以及NPC列表
                 */
                SetBasicsMediator.prototype.addUserScreen = function (rolelist, npclist) {
                    this.rolelist = rolelist;
                    this.npclist = npclist;
                    console.log("---------------------获取同屏人物列表，以及NPC列表!--------------------");
                };
                /**
                 * 获取同屏角色信息
                 */
                SetBasicsMediator.prototype.removeUserScreen = function (roleinfo) {
                    this.roleinfo = roleinfo;
                    console.log("---------------------获取同屏角色信息!--------------------");
                };
                /**
                 * 控制手机安全
                 */
                SetBasicsMediator.prototype.controlCellphoneSafe = function () {
                    this.hide();
                    this._telphoneSafeMediator = new setBasics.TelphoneSafeMediator(this._app);
                    this._telphoneSafeMediator.show();
                };
                /**
                 * 控制同屏显示人数
                 * @describe 选择索引为0，开启多人（50个）数同屏；选择索引为1，开启一般（10个）人数同屏
                 *          都发起CSetMaxScreenShowNum请求，发送参数为maxscreenshownum
                 *          相关接口暂未实现，等待完善
                 */
                SetBasicsMediator.prototype.controlTongPing = function () {
                    this.currSysConfigType = SysConfigType.MaxScreenShowNum;
                    switch (this._viewUI.TongPin_radio.selectedIndex) {
                        case 0:
                            RequesterProtocols._instance.c2s_CSetMaxScreenShowNum(50);
                            break;
                        case 1:
                            RequesterProtocols._instance.c2s_CSetMaxScreenShowNum(10);
                            break;
                    }
                };
                // /**
                //  * 控制道具安全锁
                //  * @describe 客户端先判断当前是否有道具安全锁，如果没有就不能点击选项，并弹出提示“请先设置道具安全锁！”的飘窗
                //  *          选择索引为0，开启道具安全锁，发起请求；选择索引为1，则弹窗，要求输入密码，发起请求后接着弹出温馨提示的窗口
                //  *          开启请求是COpenGoodLocks;关闭请求是CCloseGoodLocks
                //  */
                // private controlItemLock():void{
                //     switch(this._viewUI.itemLock_radio.selectedIndex){
                //         case 0:
                //             RequesterProtocols._instance.c2s_COpenGoodLocks();
                //             //如果没有设置道具安全锁，则不能鼠标点击道具安全锁RadioGroup
                //             if(!this.itemLockPassword || this.itemLockPassword == "" || this.itemLockPassword == undefined ){
                //                 this._viewUI.itemLock_radio.selectedIndex = 1;
                //             }
                //             break;
                //         case 1:
                //             if(this.isOpenSafeLock == GoodLockState.OPEN){
                //                 RequesterProtocols._instance.c2s_CCloseGoodLocks(this.itemLockPassword,GoodLockState.CLOSE);
                //             }
                //             break;
                //     }
                // }
                /**
                 * 控制是否拒绝切磋
                 * @describe 选中则开启拒绝状态，没选中则关闭拒绝状态
                 *          都发起请求CResetSysConfig；发送参数sysconfigmap:any；SysConfigType.refuseqiecuo为是否拒绝切磋，没勾等于0，勾上等于1
                 */
                SetBasicsMediator.prototype.controlPK = function () {
                    this.currSysConfigType = SysConfigType.refuseqiecuo;
                    switch (this._viewUI.qiecuo_CBox.selected) {
                        case false:
                            this._sysConfigDic.set(SysConfigType.refuseqiecuo, 0);
                            RequesterProtocols._instance.c2s_CResetSysConfig(this._sysConfigDic);
                            break;
                        case true:
                            this._sysConfigDic.set(SysConfigType.refuseqiecuo, 1);
                            RequesterProtocols._instance.c2s_CResetSysConfig(this._sysConfigDic);
                            break;
                    }
                };
                /**
                 * 控制是否拒绝装备查看
                 * @describe 选中则开启拒绝状态，没选中则关闭拒绝状态
                 *          都发起请求CResetSysConfig；发送参数sysconfigmap:any；SysConfigType.refuseotherseeequip为是否拒绝装备查看，没勾等于0，勾上等于1
                 */
                SetBasicsMediator.prototype.controlLookEquip = function () {
                    this.currSysConfigType = SysConfigType.refuseotherseeequip;
                    switch (this._viewUI.zhuangbei_CBox.selected) {
                        case false:
                            this._sysConfigDic.set(SysConfigType.refuseotherseeequip, 0);
                            RequesterProtocols._instance.c2s_CResetSysConfig(this._sysConfigDic);
                            break;
                        case true:
                            this._sysConfigDic.set(SysConfigType.refuseotherseeequip, 1);
                            RequesterProtocols._instance.c2s_CResetSysConfig(this._sysConfigDic);
                            break;
                    }
                };
                /**
                 * 控制是否拒绝组队邀请
                 * @describe 选中则开启拒绝状态，没选中则关闭拒绝状态
                 *          都发起请求CResetSysConfig；发送参数sysconfigmap:any；SysConfigType.RefuseFriend为是否拒绝组队邀请，没勾等于0，勾上等于1
                 */
                SetBasicsMediator.prototype.controlTeamInvite = function () {
                    this.currSysConfigType = SysConfigType.RefuseFriend;
                    switch (this._viewUI.zudui_CBox.selected) {
                        case false:
                            this._sysConfigDic.set(SysConfigType.RefuseFriend, 0);
                            RequesterProtocols._instance.c2s_CResetSysConfig(this._sysConfigDic);
                            break;
                        case true:
                            this._sysConfigDic.set(SysConfigType.RefuseFriend, 1);
                            RequesterProtocols._instance.c2s_CResetSysConfig(this._sysConfigDic);
                            break;
                    }
                };
                /**
                 * 控制是否拒绝帮派邀请
                 * @describe 选中则开启拒绝状态，没选中则关闭拒绝状态
                 *          都发起请求CResetSysConfig；发送参数sysconfigmap:any；SysConfigType.refuseclan为是否拒绝帮派邀请，没勾等于0，勾上等于1
                 */
                SetBasicsMediator.prototype.controlBangpaiInvite = function () {
                    this.currSysConfigType = SysConfigType.refuseclan;
                    switch (this._viewUI.bangpai_CBox.selected) {
                        case false:
                            this._sysConfigDic.set(SysConfigType.refuseclan, 0);
                            RequesterProtocols._instance.c2s_CResetSysConfig(this._sysConfigDic);
                            break;
                        case true:
                            this._sysConfigDic.set(SysConfigType.refuseclan, 1);
                            RequesterProtocols._instance.c2s_CResetSysConfig(this._sysConfigDic);
                            break;
                    }
                };
                /**
                 * 控制是否只Roll可用装备
                 * @describe 选中则开启拒绝状态，没选中则关闭拒绝状态
                 */
                SetBasicsMediator.prototype.controlRoll = function () {
                    this.currSysConfigType = SysConfigType.rolldianshezhi;
                    switch (this._viewUI.saizi_CBox.selected) {
                        case false:
                            this._sysConfigDic.set(SysConfigType.rolldianshezhi, 0);
                            RequesterProtocols._instance.c2s_CResetSysConfig(this._sysConfigDic);
                            break;
                        case true:
                            this._sysConfigDic.set(SysConfigType.rolldianshezhi, 1);
                            RequesterProtocols._instance.c2s_CResetSysConfig(this._sysConfigDic);
                            break;
                    }
                };
                /**
                 * 控制音乐
                 * @describe 选中则开启音乐，没选中则关闭音乐
                 */
                SetBasicsMediator.prototype.controlMusic = function () {
                    this.currSysConfigType = SysConfigType.Music;
                    switch (this._viewUI.yinyue_CBox.selected) {
                        case false:
                            this._sysConfigDic.set(SysConfigType.Music, 0);
                            RequesterProtocols._instance.c2s_CResetSysConfig(this._sysConfigDic);
                            //LocalStorage.setItem("yinyueSwitch"+this.roleId, 0+"");
                            break;
                        case true:
                            this._sysConfigDic.set(SysConfigType.Music, 1);
                            RequesterProtocols._instance.c2s_CResetSysConfig(this._sysConfigDic);
                            //LocalStorage.setItem("yinyueSwitch"+this.roleId, 1+"");
                            break;
                    }
                };
                /**
                 * 控制音效
                 * @describe 选中则开启音效，没选中则关闭音效
                 */
                SetBasicsMediator.prototype.controlSoundEffect = function () {
                    this.currSysConfigType = SysConfigType.SoundSpecEffect;
                    switch (this._viewUI.yinxiao_CBox.selected) {
                        case false:
                            this._sysConfigDic.set(SysConfigType.SoundSpecEffect, 0);
                            RequesterProtocols._instance.c2s_CResetSysConfig(this._sysConfigDic);
                            //LocalStorage.setItem("yinxiaoSwitch"+this.roleId, 0+"");
                            break;
                        case true:
                            this._sysConfigDic.set(SysConfigType.SoundSpecEffect, 1);
                            RequesterProtocols._instance.c2s_CResetSysConfig(this._sysConfigDic);
                            //LocalStorage.setItem("yinxiaoSwitch"+this.roleId, 1+"");
                            break;
                    }
                };
                /**
                 * 控制音量
                 * @describe 根据音量进度条的值来调节音量大小
                 * @param value 当前slider value值
                 */
                SetBasicsMediator.prototype.controlVolume = function (value) {
                    this.currSysConfigType = SysConfigType.Volume;
                    this.yinliang_slider.value = value;
                    this._sysConfigDic.set(SysConfigType.Volume, value);
                };
                /* 音量修改请求协议***/
                SetBasicsMediator.prototype.controlVolumeRequester = function () {
                    RequesterProtocols._instance.c2s_CResetSysConfig(this._sysConfigDic);
                };
                // /**
                //  * 控制画面刷新频率
                //  * @describe 选0则开启高，选中1则开启一般
                //  */
                // private controlFPS():void{
                //     switch(this._viewUI.refreshHZ_radio.selectedIndex){
                //         case 0:
                //             console.log("开启高画面刷新!");
                //             break;
                //         case 1:
                //             console.log("开启一般画面刷新!");
                //             break;
                //     }
                // }        
                /**
                 * 控制场景特效
                 * @describe 选0则开启高，选中1则开启关
                 */
                SetBasicsMediator.prototype.controlScenseEffect = function () {
                    this.currSysConfigType = SysConfigType.SceneEffect;
                    switch (this._viewUI.scenseEffect_radio.selectedIndex) {
                        case 0:
                            console.log("开场景特效!");
                            break;
                        case 1:
                            console.log("关场景特效!");
                            break;
                    }
                };
                // /**
                //  * 控制简化主界面
                //  * @describe 选中则开启简化，没选中则关闭简化
                //  */
                // private controlSimplify():void{
                //     switch(this._viewUI.jianhua_CBox.selected){
                //         case false:
                //             console.log("关闭简化!");
                //             break;
                //         case true:
                //             console.log("开启简化!");
                //             break;
                //     }
                // }
                /**
                 * 初始化系统设置
                 * @describe  初始化系统设置的信息与一些选项状态
                 */
                SetBasicsMediator.prototype._initUI = function () {
                    var shapeId = _LoginModel.getInstance().cnpcShapeInfo[this._loginModel.roleDetail.shape];
                    this._viewUI.roleIcon_img.skin = "common/icon/avatarrole/" + shapeId.littleheadID + ".png";
                    this._viewUI.zhanghao_lab.text = this._loginModel.roleDetail.rolename;
                    this.roleId = this._loginModel.roleDetail.roleid;
                    this._viewUI.id_lab.text = this.roleId.toString();
                    this._viewUI.fuwuqi_lab.text = "测试服"; //后续有待提供相关接口，来获取到当前玩家角色所在的服务器
                    var _school = this._loginModel.roleDetail.school;
                    var _schoolInfoVo = LoginModel.getInstance().schoolInfo[_school];
                    this._viewUI.menpai_lab.text = _schoolInfoVo.name;
                    this._viewUI.level_lab.text = modules.mainhud.models.HudModel.getInstance().levelNum.toString();
                    this.yinliang_slider = this._viewUI.yinliang_slider;
                    this.yinliang_slider.tick = 1;
                    this._initOption();
                };
                /**
                 * 客户端音乐、音效与音量的选项初始化
                 * @describe
                 */
                SetBasicsMediator.prototype.noneC_initOption = function () {
                    //设置音乐是否被选中
                    this._sysConfigDic.get(SysConfigType.Music) == 1 ? this._viewUI.yinyue_CBox.selected = true : this._viewUI.yinyue_CBox.selected = false;
                    //设置音效是否被选中
                    this._sysConfigDic.get(SysConfigType.SoundSpecEffect) == 1 ? this._viewUI.yinxiao_CBox.selected = true : this._viewUI.yinxiao_CBox.selected = false;
                    //设置音量滚动条的值
                    var _volumeValue = this._sysConfigDic.get(SysConfigType.Volume);
                    this.yinliang_slider.value = _volumeValue;
                    //画面刷新频率
                    // switch(this._sysConfigDic.get(SysConfigType.ScreenRefresh)){
                    //     case 0:
                    //         this._viewUI.refreshHZ_radio.selectedIndex = 0;
                    //         break;
                    //     case 1:
                    //         this._viewUI.refreshHZ_radio.selectedIndex = 1;
                    //         break;
                    // }
                    //场景特效
                    switch (this._sysConfigDic.get(SysConfigType.SceneEffect)) {
                        case 0:
                            this._viewUI.scenseEffect_radio.selectedIndex = 0;
                            break;
                        case 1:
                            this._viewUI.scenseEffect_radio.selectedIndex = 1;
                            break;
                    }
                    // //简化
                    // switch(this._sysConfigDic.get(SysConfigType.framesimplify)){
                    //     case 0:
                    //         this._viewUI.jianhua_CBox.selected =false;
                    //         break;
                    //     case 1:
                    //         this._viewUI.jianhua_CBox.selected =true;
                    //         break;
                    // }
                    //是否自动挂机
                    var _isstar = LocalStorage.getItem("isstarAutoGuaJi" + this.roleId);
                    if (_isstar) {
                        switch (Number(_isstar)) {
                            case 0: //关闭
                                this._viewUI.autoGuaJi_radio.selectedIndex = 1;
                                break;
                            case 1: //开启
                                this._viewUI.autoGuaJi_radio.selectedIndex = 0;
                                break;
                        }
                    }
                    else {
                        switch (game.modules.autohangup.models.AutoHangUpModel.getInstance().isstar) {
                            case 0: //关闭
                                this._viewUI.autoGuaJi_radio.selectedIndex = 1;
                                break;
                            case 1: //开启
                                this._viewUI.autoGuaJi_radio.selectedIndex = 0;
                                break;
                        }
                    }
                };
                /**
                 * 客户端发起请求的选项初始化
                 * @describe
                 */
                SetBasicsMediator.prototype.haveC_initOption = function () {
                    //同屏
                    var _maxScreenShowNum = this._sysConfigDic.get(SysConfigType.MaxScreenShowNum);
                    var screenShowNumFlag = 1;
                    if (_maxScreenShowNum > 0 || _maxScreenShowNum < 10 || _maxScreenShowNum == 10) {
                        screenShowNumFlag = 1;
                    }
                    else if (_maxScreenShowNum > 10 || _maxScreenShowNum < 50 || _maxScreenShowNum == 50) {
                        screenShowNumFlag = 0;
                    }
                    switch (screenShowNumFlag) {
                        case 0:
                            this._viewUI.TongPin_radio.selectedIndex = 0;
                            break;
                        case 1:
                            this._viewUI.TongPin_radio.selectedIndex = 1;
                            break;
                    }
                    //拒绝切磋
                    switch (this._sysConfigDic.get(SysConfigType.refuseqiecuo)) {
                        case 0:
                            this._viewUI.qiecuo_CBox.selected = false;
                            break;
                        case 1:
                            this._viewUI.qiecuo_CBox.selected = true;
                            break;
                    }
                    //拒绝查看装备
                    switch (this._sysConfigDic.get(SysConfigType.refuseotherseeequip)) {
                        case 0:
                            this._viewUI.zhuangbei_CBox.selected = false;
                            break;
                        case 1:
                            this._viewUI.zhuangbei_CBox.selected = true;
                            break;
                    }
                    //拒绝组队邀请
                    switch (this._sysConfigDic.get(SysConfigType.RefuseFriend)) {
                        case 0:
                            this._viewUI.zudui_CBox.selected = false;
                            break;
                        case 1:
                            this._viewUI.zudui_CBox.selected = true;
                            break;
                    }
                    //拒绝公会邀请
                    switch (this._sysConfigDic.get(SysConfigType.refuseclan)) {
                        case 0:
                            this._viewUI.bangpai_CBox.selected = false;
                            break;
                        case 1:
                            this._viewUI.bangpai_CBox.selected = true;
                            break;
                    }
                    //只Roll可用的装备
                    switch (this._sysConfigDic.get(SysConfigType.rolldianshezhi)) {
                        case 0:
                            this._viewUI.saizi_CBox.selected = false;
                            break;
                        case 1:
                            this._viewUI.saizi_CBox.selected = true;
                            break;
                    }
                };
                SetBasicsMediator.prototype.hide = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    _super.prototype.hide.call(this);
                    this.removeEvent();
                };
                /**
                 * 移除事件
                 */
                SetBasicsMediator.prototype.removeEvent = function () {
                    this._viewUI.btnClose.off(LEvent.CLICK, this, this.hide);
                    this._viewUI.yinyue_CBox.off(LEvent.CLICK, this, this.controlMusic);
                    this._viewUI.yinxiao_CBox.off(LEvent.CLICK, this, this.controlSoundEffect);
                    this._viewUI.scenseEffect_radio.off(LEvent.CLICK, this, this.controlScenseEffect);
                    this._viewUI.btnFanHui.off(LEvent.CLICK, this, this.controlReturnLogin);
                    this._viewUI.btnFuBen.off(LEvent.CLICK, this, this._initAutoEnterFuBenList);
                    this._viewUI.autoGuaJi_radio.off(LEvent.CLICK, this, this.changeAutoGuaJi);
                    this._viewUI.TongPin_radio.off(LEvent.CLICK, this, this.controlTongPing);
                    this._viewUI.qiecuo_CBox.off(LEvent.CLICK, this, this.controlPK);
                    this._viewUI.zhuangbei_CBox.off(LEvent.CLICK, this, this.controlLookEquip);
                    this._viewUI.zudui_CBox.off(LEvent.CLICK, this, this.controlTeamInvite);
                    this._viewUI.bangpai_CBox.off(LEvent.CLICK, this, this.controlBangpaiInvite);
                    this._viewUI.saizi_CBox.off(LEvent.CLICK, this, this.controlRoll);
                    modules.chat.models.ChatProxy.getInstance().off(modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, this, this.show_Msg);
                    game.scene.models.SceneProxy.getInstance().off(game.scene.models.MODEL_CELAR, this, this.removeUserScreen);
                    game.scene.models.SceneProxy.getInstance().off(game.scene.models.MODEL_CREATE, this, this.addUserScreen);
                    modules.tips.models.TipsProxy.getInstance().off(modules.tips.models.TIPS_ON_OK, this, this.returnToLogin);
                    setBasics.models.SetBasicsProxy.getInstance().off(setBasics.models.TYPE_RETURN_LOGIN_EVENT, this, this.showLogin);
                    setBasics.models.SetBasicsProxy.getInstance().off(setBasics.models.GET_RESET_SYSCONFIG_INFO_EVENT, this, this.haveC_initOption);
                };
                SetBasicsMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return SetBasicsMediator;
            }(game.modules.UiMediator));
            setBasics.SetBasicsMediator = SetBasicsMediator;
        })(setBasics = modules.setBasics || (modules.setBasics = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SetBasicsMediator.js.map