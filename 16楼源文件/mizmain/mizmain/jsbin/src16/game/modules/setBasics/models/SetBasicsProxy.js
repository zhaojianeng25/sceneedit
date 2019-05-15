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
        var setBasics;
        (function (setBasics) {
            var models;
            (function (models) {
                /** 设置道具安全锁密码成功事件 */
                models.SET_PASSWORD_SUCCESS_EVENT = "setPasswordSuccess";
                /** 设置道具安全锁密码成功事件 */
                models.RESET_PASSWORD_SUCCESS_EVENT = "resetPasswordSuccess";
                /** 设置道具安全锁密码成功事件 */
                models.DEL_PASSWORD_SUCCESS_EVENT = "delPasswordSuccess";
                /** 开启道具安全锁事件 */
                models.OPEN_GOOD_LOCKS_EVENT = "openGoodLocks";
                /** 开启道具安全锁事件 */
                models.CLOSE_GOOD_LOCKS_EVENT = "closeGoodLocks";
                /** 开启道具安全锁失败事件 */
                models.OPEN_GOOD_LOCKS_FAIL_EVENT = "openGoodLocksfail";
                /** 开启道具安全锁失败事件 */
                models.CLOSE_GOOD_LOCKS_FAIL_EVENT = "closeGoodLocksfail";
                /** 获取到道具安全锁信息 */
                models.GET_GOOD_LOCK_INFO = "getGoodLockInfo";
                /** 主动下线，退出游戏事件 */
                models.TYPE_OFFLINE_EVENT = "offLine";
                /** 被动断线事件 */
                models.TYPE_LINK_BROKEN_EVENT = "lineBroken";
                /** 被动断线窗口返回服务器列表事件 */
                models.TYPE_LINK_BROKEN_BACK_EVENT = "lineBrokenBack";
                /** 返回人物选择界面事件 */
                models.TYPE_CHOSEE_ROLE_EVENT = "choseeRole";
                /** 返回登录界面事件 */
                models.TYPE_RETURN_LOGIN_EVENT = "returnLogin";
                /** 收到最新系统设置的信息事件 */
                models.GET_SYSCONFIG_INFO_EVENT = "getSysConfigInfo";
                /** 收到重新设置的最新系统设置的信息事件 */
                models.GET_RESET_SYSCONFIG_INFO_EVENT = "getResetSysConfigInfo";
                /** 得到设置自动进入副本选项成功消息 */
                models.GET_SetLineConfig = "getSetLineConfig";
                var SetBasicsProxy = /** @class */ (function (_super) {
                    __extends(SetBasicsProxy, _super);
                    function SetBasicsProxy() {
                        var _this = _super.call(this) || this;
                        SetBasicsProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    SetBasicsProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new SetBasicsProxy();
                        }
                        return this._instance;
                    };
                    SetBasicsProxy.prototype.init = function (app) {
                        if (app) {
                            this.useapp = app;
                        }
                        models.SetBasicsModel.getInstance();
                        this.addNetworkListener();
                    };
                    /**
                     * 添加监听
                     */
                    SetBasicsProxy.prototype.addNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.SSetPassword, this, this.getSSetPassword);
                        Network._instance.addHanlder(ProtocolsEnum.SResetPassword, this, this.getSResetPassword);
                        Network._instance.addHanlder(ProtocolsEnum.SDelPassword, this, this.getSDelPassword);
                        Network._instance.addHanlder(ProtocolsEnum.SOpenGoodLocks, this, this.getSOpenGoodLocks);
                        Network._instance.addHanlder(ProtocolsEnum.SCloseGoodLocks, this, this.getSCloseGoodLocks);
                        Network._instance.addHanlder(ProtocolsEnum.SGetGoodLocksInfo, this, this.getSGetGoodLocksInfo);
                        Network._instance.addHanlder(ProtocolsEnum.SReturnLogin, this, this.getSReturnLogin);
                        //Network._instance.addHanlder(ProtocolsEnum.SRoleOffline,this,this.getSRoleOffline);
                        Network._instance.addHanlder(ProtocolsEnum.SGetSysConfig, this, this.getSGetSysConfig);
                        Network._instance.addHanlder(ProtocolsEnum.SResetSysConfig, this, this.getSResetSysConfig);
                        Network._instance.addHanlder(ProtocolsEnum.SSetLineConfig, this, this.getSSetLineConfig);
                    };
                    /** 收到设置自动进入副本选项成功消息返回 */
                    SetBasicsProxy.prototype.getSSetLineConfig = function (optcode, msg) {
                        models.SetBasicsModel.getInstance().setLineConfig = new Laya.Dictionary();
                        models.SetBasicsModel.getInstance().setLineConfig = msg.configmap;
                        SetBasicsProxy.getInstance().event(models.GET_SetLineConfig, msg.configmap);
                    };
                    /**
                     * 收到重新设置后的最新系统设置信息
                     */
                    SetBasicsProxy.prototype.getSResetSysConfig = function (optcode, msg) {
                        // SetBasicsModel._instance.resetSysConfigDic = msg.sysconfigmap;
                        var _key = msg.sysconfigmap.keys;
                        var _value = msg.sysconfigmap.values;
                        for (var i = 0; i < _key.length; i++) {
                            models.SetBasicsModel._instance.SysConfigDic.set(_key[i], _value[i]);
                        }
                        SetBasicsProxy.getInstance().event(models.GET_RESET_SYSCONFIG_INFO_EVENT, msg.sysconfigmap);
                    };
                    /**
                     * 收到最新系统设置信息
                     */
                    SetBasicsProxy.prototype.getSGetSysConfig = function (optcode, msg) {
                        models.SetBasicsModel._instance.SysConfigDic = msg.sysconfigmap;
                        console.log(models.SetBasicsModel._instance.SysConfigDic);
                        SetBasicsProxy.getInstance().event(models.GET_SYSCONFIG_INFO_EVENT);
                        this.initSetBasicsConfig(msg.sysconfigmap);
                    };
                    /**
                     *
                     */
                    SetBasicsProxy.prototype.initSetBasicsConfig = function (dicmap) {
                        //设置音乐
                        dicmap.get(SysConfigType.Music) == 1 ? this.useapp.sceneRoot.playSceneMusic() : this.useapp.sceneRoot.stopSceneMusic(); //
                        dicmap.get(SysConfigType.Music) == 1 ? models.SetBasicsModel.getInstance().isCloseMusic = false : models.SetBasicsModel.getInstance().isCloseMusic = true;
                        //设置音效
                        dicmap.get(SysConfigType.SoundSpecEffect) == 1 ? this.useapp.sceneRoot.playSceneSound() : Laya.SoundManager.stopAllSound();
                        //设置音量
                        var _volume = dicmap.get(SysConfigType.Volume) / 200;
                        Laya.SoundManager.setMusicVolume(_volume);
                        //Laya.SoundManager.setSoundVolume(_volume);
                        // //是否自动挂机
                        // var _isstar = LocalStorage.getItem("isstarAutoGuaJi" + _roleId);
                        // if (_isstar) {
                        //     switch (Number(_isstar)) {
                        //         case 0://关闭
                        //             game.modules.autohangup.models.AutoHangUpModel.getInstance().isstar = 0;
                        //             break;
                        //         case 1://开启
                        //             game.modules.autohangup.models.AutoHangUpModel.getInstance().isstar = 1;
                        //             break;
                        //     }
                        // }
                    };
                    /**
                     * 收到通知客户端返回登录界面
                     */
                    SetBasicsProxy.prototype.getSReturnLogin = function (optcode, msg) {
                        console.log("---------------------msg.reason = " + msg.reason);
                        // switch(msg.reason){
                        //     case OffLineType.OFFLINE:
                        //         SetBasicsProxy.getInstance().event(models.TYPE_OFFLINE_EVENT,[msg.ext]);
                        //         break;
                        //     case OffLineType.LINK_BROKEN:
                        //         SetBasicsProxy.getInstance().event(models.TYPE_LINK_BROKEN_EVENT,[msg.ext]);
                        //         break;
                        //     case OffLineType.CHOSEE_ROLE:
                        //         SetBasicsProxy.getInstance().event(models.TYPE_CHOSEE_ROLE_EVENT,[msg.ext]);
                        //         break;
                        //     case OffLineType.RETURN_LOGIN:
                        //         SetBasicsProxy.getInstance().event(models.TYPE_RETURN_LOGIN_EVENT,[msg.ext]);
                        //         break;
                        // }
                        models.SetBasicsModel._instance._isRrturnLoginflag = true;
                        SetBasicsProxy.getInstance().event(models.TYPE_RETURN_LOGIN_EVENT, [msg.ext]);
                    };
                    /**
                     * 收到了道具安全锁信息的消息
                     */
                    SetBasicsProxy.prototype.getSGetGoodLocksInfo = function (optcode, msg) {
                        var info = new models.ItemLockInfoVo();
                        info.password = msg.password;
                        info.forceDelPdTime = msg.forceDelPdTime;
                        info.forceDelEndTime = msg.forceDelEndTime;
                        info.isFistLoginOfDay = msg.isFistLoginOfDay;
                        info.errorTimes = msg.errorTimes;
                        info.lockEndTime = msg.lockEndTime;
                        info.isOpenSafeLock = msg.isOpenSafeLock;
                        models.SetBasicsModel._instance.itemLockInfo = info;
                        SetBasicsProxy.getInstance().event(models.GET_GOOD_LOCK_INFO, [info]);
                    };
                    /**
                     * 收到了关闭道具安全锁的消息
                     */
                    SetBasicsProxy.prototype.getSCloseGoodLocks = function (optcode, msg) {
                        if (msg.status == 1) { //收到设置成功的消息                
                            SetBasicsProxy.getInstance().event(models.CLOSE_GOOD_LOCKS_EVENT);
                        }
                        else if (msg.status == 0) {
                            SetBasicsProxy.getInstance().event(models.CLOSE_GOOD_LOCKS_FAIL_EVENT);
                        }
                    };
                    /**
                     * 收到了开启道具安全锁的消息
                     */
                    SetBasicsProxy.prototype.getSOpenGoodLocks = function (optcode, msg) {
                        if (msg.status == 1) { //收到设置成功的消息                
                            SetBasicsProxy.getInstance().event(models.OPEN_GOOD_LOCKS_EVENT);
                        }
                        else if (msg.status == 0) {
                            SetBasicsProxy.getInstance().event(models.OPEN_GOOD_LOCKS_FAIL_EVENT);
                        }
                    };
                    /**
                     * 收到了解除道具安全锁的消息
                     */
                    SetBasicsProxy.prototype.getSDelPassword = function (optcode, msg) {
                        if (msg.status == 1) { //收到设置成功的消息                
                            SetBasicsProxy.getInstance().event(models.DEL_PASSWORD_SUCCESS_EVENT);
                        }
                    };
                    /**
                     * 收到了重新设置了道具安全锁的消息
                     */
                    SetBasicsProxy.prototype.getSResetPassword = function (optcode, msg) {
                        if (msg.status == 1) { //收到设置成功的消息                
                            SetBasicsProxy.getInstance().event(models.RESET_PASSWORD_SUCCESS_EVENT);
                        }
                    };
                    /**
                     * 收到了设置了道具安全锁的消息
                     */
                    SetBasicsProxy.prototype.getSSetPassword = function (optcode, msg) {
                        if (msg.status == 1) { //收到设置成功的消息                
                            SetBasicsProxy.getInstance().event(models.SET_PASSWORD_SUCCESS_EVENT);
                        }
                    };
                    return SetBasicsProxy;
                }(hanlder.ProxyBase));
                models.SetBasicsProxy = SetBasicsProxy;
            })(models = setBasics.models || (setBasics.models = {}));
        })(setBasics = modules.setBasics || (modules.setBasics = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SetBasicsProxy.js.map