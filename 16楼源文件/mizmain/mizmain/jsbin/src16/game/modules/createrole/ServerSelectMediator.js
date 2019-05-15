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
 * 选择登录的服务器
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var createrole;
        (function (createrole) {
            var ServerSelectMediator = /** @class */ (function (_super) {
                __extends(ServerSelectMediator, _super);
                function ServerSelectMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 判断是否有更改账号 */
                    _this.isChangeAccount = false;
                    /** 判断是否登录失败 */
                    _this.isLogin = false;
                    /** 判断点击进入按钮是否被点击 */
                    _this.isClicked = false;
                    _this._viewUI = new ui.common.LoginServerSelectUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    //this.isCenter = true;
                    _this.serverConfig = createrole.models.LoginModel.getInstance().ServerConfig;
                    createrole.models.LoginProxy.getInstance().on(createrole.models.LOGIN_EVENT2, _this, _this.onEnter);
                    return _this;
                }
                /**
                 * 界面初始化
                 */
                ServerSelectMediator.prototype._init_UI = function (type, btn) {
                    if (!btn) {
                        //服务器列表数据初始化
                        this.serverDataInit(type);
                        //当前服务器UI初始化
                        this.currServerUI_init();
                    }
                    //服务器列表初始化
                    this._serverListInit(type);
                };
                /**
                 * 服务器列表数据初始化
                 * @describe 把玩家最近登录过的服务器放到服务器列表数据的第一个
                 */
                ServerSelectMediator.prototype.serverDataInit = function (type) {
                    var isSelectIndex = LocalStorage.getItem("user_recentLoginServerIndex");
                    var _judge = modules.setBasics.models.SetBasicsModel._instance._isRrturnLoginflag;
                    if (_judge)
                        return;
                    if (Object.keys(this.serverConfig).length == 0) {
                        console.log("读取服务器json文件失败，请检查json是否正确书写或者读取方式是否又出错");
                        return;
                    }
                    if (this.isLogin) {
                        this.isLogin = false;
                        return;
                    }
                    if (isSelectIndex && isSelectIndex != null) {
                        var _tempData;
                        _tempData = this.serverConfig["" + type][0];
                        var _currServer = createrole.models.LoginModel.getInstance().currServer; //若排序过就不再排序
                        if (_currServer == _tempData)
                            return;
                        this.serverConfig["" + type][0] = this.serverConfig["" + type][isSelectIndex];
                        this.serverConfig["" + type][isSelectIndex] = _tempData;
                    }
                };
                /**
                 * 当前服务器UI初始化
                 */
                ServerSelectMediator.prototype.currServerUI_init = function () {
                    var _ip = createrole.models.LoginModel.getInstance().currServer.ip;
                    if (!_ip) {
                        var currSelectIndex = LocalStorage.getItem("user_recentLoginServerIndex");
                        if (currSelectIndex != null && currSelectIndex) { //如果有值，也间接表示服务器列表数据次序已经重新初始化，0，也就是第一位就是要显示的最近一次所登陆过的服务器
                            this._viewUI.currServer_box.visible = true;
                            this._viewUI.Server_imag.visible = false;
                            this._viewUI.serverName_lab.text = this.serverConfig["" + ServerAarea.ORDINARY][0]["name"];
                            createrole.models.LoginModel.getInstance().currServer = this.serverConfig["" + ServerAarea.ORDINARY][0];
                            // this.showStateImag(this.serverConfig["" + ServerAarea.ORDINARY][0]["serverstate"], this._viewUI.isSelect_img);
                            ////////////////断开临时连接服务器////////////////////////
                            // Network._instance.cleanSocket();
                            Browser.window.server = this.serverConfig["" + ServerAarea.ORDINARY][0]["ip"];
                            ////////////////重新最近一次连接服务器///////////////////////
                            // Network._instance.connectByUrl(Browser.window.server);
                            // console.log("-----------------------------------------Browser.window.server是：", Browser.window.server);
                            if (this.lastSelect) {
                                this.currServerBg = this.lastSelect;
                            }
                        }
                        else {
                            this._viewUI.currServer_box.visible = true;
                            this._viewUI.Server_imag.visible = false;
                            this._viewUI.isSelect_img.skin = "common/ui/createrole/server.png";
                        }
                    }
                    else {
                        this._viewUI.serverName_lab.text = createrole.models.LoginModel.getInstance().currServer.name;
                        this.showStateImag(createrole.models.LoginModel.getInstance().currServer.serverstate, this._viewUI.isSelect_img);
                    }
                };
                /**
                 * 服务器列表初始化
                 */
                ServerSelectMediator.prototype._serverListInit = function (type) {
                    this.currListData = this.serverConfig["" + type];
                    var dataSize;
                    dataSize = Object.keys(this.serverConfig["" + type]).length;
                    this._viewUI.server_list.array = this.serverConfig["" + type];
                    this._viewUI.server_list.repeatX = 1;
                    this._viewUI.server_list.repeatY = dataSize;
                    if (this._viewUI.server_list.array.length <= 8) {
                        this._viewUI.server_list.repeatY = 8;
                    }
                    this._viewUI.server_list.vScrollBarSkin = '';
                    this._viewUI.server_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.server_list.scrollBar.elasticDistance = 100;
                    this._viewUI.server_list.renderHandler = new Laya.Handler(this, this.onListRender);
                    this._viewUI.server_list.selectHandler = new Laya.Handler(this, this.onselectRender);
                };
                /**
                 * 服务器被选中响应渲染
                 * @param index
                 */
                ServerSelectMediator.prototype.onselectRender = function (index) {
                    if (index != -1) {
                        this.tempServer = this.currListData[index];
                    }
                    var serverBg_img = this._viewUI.server_list.getCell(index).getChildByName("serverBg_img");
                    serverBg_img.skin = "common/ui/createrole/common_list_3textbg2.png";
                    if (this.lastSelect) {
                        this.lastSelect.skin = "common/ui/createrole/common_list_3textbg.png";
                    }
                    this.lastSelect = serverBg_img;
                };
                /**
                 * 服务器列表数据渲染
                 * @param cell
                 * @param index
                 */
                ServerSelectMediator.prototype.onListRender = function (cell, index) {
                    if (index < 0 || index >= this._viewUI.server_list.array.length) {
                        return;
                    }
                    var serverBg_img = cell.getChildByName("serverBg_img");
                    serverBg_img.skin = "common/ui/createrole/common_list_3textbg.png";
                    if (this.lastSelect == serverBg_img) {
                        this.lastSelect.skin = "common/ui/createrole/common_list_3textbg2.png";
                    }
                    var serverName_lab = cell.getChildByName("serverName_lab");
                    var serverInfo_lab = cell.getChildByName("serverInfo_lab");
                    var mark_img = cell.getChildByName("mark_img");
                    serverName_lab.text = this.currListData[index]["name"];
                    serverInfo_lab.text = this.currListData[index]["info"];
                    var light_img = this._viewUI.server_list.getCell(index).getChildByName("light_img");
                    this.showStateImag(this.currListData[index]["serverstate"], light_img);
                    if (this.currListData[index]["isNew"]) {
                        mark_img.visible = true;
                    }
                    else {
                        mark_img.visible = false;
                    }
                };
                /**
                 * 根据服务器的状态进行显示不同状态图片
                 */
                ServerSelectMediator.prototype.showStateImag = function (type, img) {
                    switch (type) {
                        case ServerState.BUSY:
                            img.skin = "common/ui/createrole/red.png";
                            break;
                        case ServerState.GOOD:
                            img.skin = "common/ui/createrole/yello.png";
                            break;
                        case ServerState.EXCELLENT:
                            img.skin = "common/ui/createrole/green.png";
                            break;
                        case ServerState.MAINTAIN:
                            img.skin = "common/ui/createrole/server.png";
                            break;
                    }
                };
                /**
                 * 移除场景
                 */
                ServerSelectMediator.prototype.removeScene = function () {
                    // this._sceneObjMgr = this._app.sceneObjectMgr;
                    var _mapInfo = this._app.sceneObjectMgr.mapInfo;
                    var _mainUnit = this._app.sceneObjectMgr.mainUnit;
                    //释放旧的地图对象
                    if (_mapInfo) {
                        this._app.sceneObjectMgr.ReleaseObject(_mapInfo);
                    }
                    //释放主玩家unit
                    if (_mainUnit) {
                        this._app.sceneObjectMgr.ReleaseObject(_mainUnit);
                    }
                };
                ServerSelectMediator.prototype.show = function () {
                    if (createrole.models.LoginModel.getInstance().isBreakLink) {
                        createrole.models.LoginModel.getInstance().isBreakLink = false;
                        return;
                    }
                    this.registerEvent();
                    this._init_UI(ServerAarea.ORDINARY);
                    _super.prototype.show.call(this);
                };
                /**
                 * 注册事件
                 */
                ServerSelectMediator.prototype.registerEvent = function () {
                    //按钮点击事件监听
                    this._viewUI.recommend_btn.on(LEvent.CLICK, this, this._init_UI, [ServerAarea.RECOMMEND, this._viewUI.recommend_btn]);
                    this._viewUI.currently_btn.on(LEvent.CLICK, this, this._init_UI, [ServerAarea.ORDINARY, this._viewUI.currently_btn]);
                    this._viewUI.close_btn.on(LEvent.MOUSE_UP, this, this.onReturn);
                    this._viewUI.confirm_btn.on(LEvent.CLICK, this, this.onConfirm);
                    this._viewUI.return_btn.on(LEvent.CLICK, this, this.onReturn);
                    this._viewUI.enter_btn.on(LEvent.CLICK, this, this.enterBtnClicked);
                    //图片点击事件监听
                    this._viewUI.selectServer_img.on(LEvent.CLICK, this, this.onSelectServer);
                    this._viewUI.change_img.on(LEvent.CLICK, this, this.onChange);
                    //消息监听事件
                    createrole.models.LoginProxy.getInstance().on(createrole.models.ERROR_INFO, this, this.errorLogin);
                    createrole.models.LoginProxy.getInstance().on(createrole.models.BE_IN_CONNECTION_STATE, this, this.changeCurrServerStateImg);
                    createrole.models.LoginProxy.getInstance().on(createrole.models.BE_IN_NOT_CONNECTION_STATE, this, this.showTipsMsg);
                    //setBasics.models.SetBasicsProxy.getInstance().on(setBasics.models.TYPE_RETURN_LOGIN_EVENT,this,this.removeScene);
                };
                /** 点击进入按钮被点击 */
                ServerSelectMediator.prototype.enterBtnClicked = function () {
                    this.isClicked = true;
                    this.reConnectUrl();
                };
                /** 更改当前显示服务器状态的图片 */
                ServerSelectMediator.prototype.changeCurrServerStateImg = function () {
                    this.showStateImag(createrole.models.LoginModel.getInstance().currServer.serverstate, this._viewUI.isSelect_img);
                    this.closeTimer();
                    if (this.isClicked) {
                        Laya.timer.once(1000, this, this.onEnter);
                        this.isClicked = false;
                    }
                };
                /** 关闭定时器 */
                ServerSelectMediator.prototype.closeTimer = function () {
                    Laya.timer.clear(this, this.reConnectUrl);
                };
                /** 显示提示飘窗 */
                ServerSelectMediator.prototype.showTipsMsg = function () {
                    this._viewUI.isSelect_img.skin = "common/ui/createrole/server.png";
                    var _tipsMsg = ChatModel.getInstance().chatMessageTips[420045]["msg"];
                    this.show_Msg(_tipsMsg);
                    this.openTimer();
                    this.isClicked = false;
                };
                /** 开启一次性延时定时器(延迟15秒) */
                ServerSelectMediator.prototype.openTimer = function () {
                    Laya.timer.once(15000, this, this.reConnectUrl);
                };
                /** 重新连接服务器 */
                ServerSelectMediator.prototype.reConnectUrl = function () {
                    Network._instance.connectByUrl(Browser.window.server);
                };
                /**
                 * 登陆错误
                 */
                ServerSelectMediator.prototype.errorLogin = function () {
                    var msg = "<span style='color:#f6f6f4;fontSize:24'>登陆失败（失败原因未知，暂以此替代！）</span>";
                    this.show_Msg(msg);
                    this.isLogin = true;
                    this.show();
                };
                /**
                 * 切换账号
                 */
                ServerSelectMediator.prototype.onChange = function () {
                    this._loginViewMediator = new createrole.LoginViewMediator(this._app);
                    this._loginViewMediator.show();
                    this.hide();
                };
                /**
                 * 进入游戏
                 */
                ServerSelectMediator.prototype.onEnter = function () {
                    var _linkState = LoginModel.getInstance().linkServerState;
                    if (_linkState == LinkState.CLOSE || _linkState == LinkState.ERROR || _linkState == undefined) {
                        this.showTipsMsg();
                        return;
                    }
                    this.isChangeAccount = createrole.models.LoginModel.getInstance().isAccountChanged;
                    //var _judgeFlag = setBasics.models.SetBasicsModel._instance._isRrturnLoginflag;
                    if (this._viewUI.isSelect_img.skin == "common/ui/createrole/red.png") { //如果服务器爆满，弹出提示窗口
                        this.show_Msg(modules.chat.models.ChatModel._instance.chatMessageTips[190065].msg);
                    }
                    else if (this._viewUI.isSelect_img.skin == "common/ui/createrole/server.png") { //如果服务处于维护状态
                        this.show_Msg(modules.chat.models.ChatModel._instance.chatMessageTips[144483].msg);
                    }
                    else {
                        RequesterProtocols._instance.c2s_login(LoginModel.getInstance().userLoginAccount, LoginModel.getInstance().userLoginPassword); //登录
                        this.isChangeAccount = false;
                        this.hide();
                    }
                };
                /**
                 * 弹出消息气泡飘窗
                 */
                ServerSelectMediator.prototype.show_Msg = function (msg) {
                    this._disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                    this._disappearMessageTipsMediator.onShow(msg);
                };
                /**
                 * 选择服务器界面UI出现
                 */
                ServerSelectMediator.prototype.onSelectServer = function () {
                    this.closeTimer();
                    this._viewUI.Server_imag.visible = true;
                    this._viewUI.currServer_box.visible = false;
                };
                /**
                 * 确定选择服务器
                 */
                ServerSelectMediator.prototype.onConfirm = function () {
                    if (this.tempServer) {
                        createrole.models.LoginModel.getInstance().currServer = this.tempServer;
                        LocalStorage.setItem("user_recentLoginServerIndex", this.tempServer["index"]);
                        var _linkState = LoginModel.getInstance().linkServerState;
                        if (_linkState == LinkState.OPEN) {
                            ////////////////断开连接服务器////////////////////////
                            Network._instance.cleanSocket();
                        }
                        Browser.window.server = this.tempServer.ip;
                        ////////////////重新连接服务器///////////////////////
                        Network._instance.connectByUrl(Browser.window.server);
                        this.currServerBg = this.lastSelect;
                    }
                    this.currServerUI_init();
                    this._viewUI.Server_imag.visible = false;
                    this._viewUI.currServer_box.visible = true;
                };
                /**
                 * 返回前一个界面
                 */
                ServerSelectMediator.prototype.onReturn = function () {
                    var _linkState = LoginModel.getInstance().linkServerState;
                    if (_linkState == LinkState.CLOSE || _linkState == LinkState.ERROR || _linkState == undefined) {
                        this.openTimer();
                    }
                    this.currServerUI_init();
                    if (this.lastSelect) {
                        // this.lastSelect.scaleX = 1;
                        // this.lastSelect.scaleY = 1;
                        // this.currServerBg.scaleX = 0.95;
                        // this.currServerBg.scaleY = 0.95;
                        this.lastSelect = this.currServerBg;
                    }
                    this._viewUI.Server_imag.visible = false;
                    this._viewUI.currServer_box.visible = true;
                };
                ServerSelectMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    createrole.models.LoginProxy.getInstance().off(createrole.models.BE_IN_CONNECTION_STATE, this, this.changeCurrServerStateImg);
                    createrole.models.LoginProxy.getInstance().off(createrole.models.BE_IN_NOT_CONNECTION_STATE, this, this.showTipsMsg);
                };
                ServerSelectMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ServerSelectMediator;
            }(game.modules.UiMediator));
            createrole.ServerSelectMediator = ServerSelectMediator;
        })(createrole = modules.createrole || (modules.createrole = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ServerSelectMediator.js.map