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
var LoginModel = game.modules.createrole.models.LoginModel;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var createrole;
        (function (createrole) {
            /** 登陆账号界面 */
            var LoginViewMediator = /** @class */ (function (_super) {
                __extends(LoginViewMediator, _super);
                function LoginViewMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.LoginUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                    //this.isCenter = true;
                }
                LoginViewMediator.prototype.enterLogin = function (e) {
                    if (this.lastAccount && this.lastAccount != this._viewUI.account_txt.text) {
                        LoginModel.getInstance().isAccountChanged = true;
                    }
                    LoginModel.getInstance().userLoginAccount = this._viewUI.account_txt.text;
                    LoginModel.getInstance().userLoginPassword = this._viewUI.password_txt.text;
                    var _ip = createrole.models.LoginModel.getInstance().currServer.ip;
                    if (!_ip) {
                        this._serverSelectMediator = new createrole.ServerSelectMediator(this._app);
                        this._serverSelectMediator.show();
                    }
                    else {
                        this._flag = true;
                    }
                    //如果是从选择服务器界面中切换账号跳转到此界面，就需要如下判断
                    if (this._flag) {
                        this._serverSelectMediator = new createrole.ServerSelectMediator(this._app);
                        this._serverSelectMediator.show();
                    }
                    this.judgeHisAccount();
                    LocalStorage.setItem("daowang_userLoginAccount", this._viewUI.account_txt.text);
                    LocalStorage.setItem("daowang_userLoginAccountPassword", this._viewUI.password_txt.text);
                    //let userRoleId:number = parseInt(LocalStorage.getItem("daowang_userRoleId" + this._viewUI.account_txt.text));
                    //RequesterProtocols._instance.c2s_login(this._viewUI.account_txt.text, this._viewUI.password_txt.text);//登录
                    this.lastAccount = this._viewUI.account_txt.text;
                    this.hide();
                };
                /**
                 * 判断历史账号
                 */
                LoginViewMediator.prototype.judgeHisAccount = function () {
                    //获取有几个账号登陆过的计数
                    var countAccount = LocalStorage.getItem("countAccount");
                    var _count;
                    //如果该计数有值或者不为空或者不为零
                    if (countAccount && countAccount != "" && countAccount != "0") {
                        //就将计数number化
                        _count = Number(countAccount);
                    }
                    else { //没有，就重新写一个计数值到本地存储
                        LocalStorage.setItem("countAccount", "1");
                        //保存账号和密码到本地存储里
                        LocalStorage.setItem("hisAccount" + 1, this._viewUI.account_txt.text);
                        LocalStorage.setItem("hisPassword" + 1, this._viewUI.password_txt.text);
                        return;
                    }
                    //如果当前账号与本地存储里的历史账号相同，则返回
                    for (var i = 1; i < _count + 1; i++) {
                        var _hisAccount = LocalStorage.getItem("hisAccount" + i);
                        if (_hisAccount == this._viewUI.account_txt.text)
                            return;
                    }
                    if (countAccount && countAccount != "" && countAccount != "0") {
                        //在原有记录过有几个账号登陆过的计数上加一
                        _count += 1;
                        LocalStorage.setItem("countAccount", _count + "");
                        LocalStorage.setItem("hisAccount" + _count, this._viewUI.account_txt.text);
                        LocalStorage.setItem("hisPassword" + _count, this._viewUI.password_txt.text);
                    }
                    //如果超过十个记录数，则本地删除最旧的那个账号
                    if (_count > 10) {
                        for (var i = 1; i < _count; i++) { //进行数据的覆盖,达到删除最旧的那个账号
                            LocalStorage.setItem("hisAccount" + i, LocalStorage.getItem("hisAccount" + (i + 1)));
                            LocalStorage.setItem("hisPassword" + i, LocalStorage.getItem("hisPassword" + (i + 1)));
                        }
                        //本地移除最后一个记录数的账号
                        LocalStorage.removeItem("hisAccount" + _count);
                        LocalStorage.removeItem("hisPassword" + _count);
                        //将记录数减一，一并存储到本地
                        _count -= 1;
                        LocalStorage.setItem("countAccount", _count + "");
                    }
                };
                LoginViewMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    //console.log("LoginViewMediator show");
                    //this.layout();
                    var userAccount = LocalStorage.getItem("daowang_userLoginAccount");
                    var userAccountpassword = LocalStorage.getItem("daowang_userLoginAccountPassword");
                    var userRoleId = LocalStorage.getItem("daowang_userRoleId");
                    if (userAccount && userAccount != "") {
                        this._viewUI.account_txt.text = userAccount;
                    }
                    if (userAccountpassword && userAccountpassword != "") {
                        this._viewUI.password_txt.text = userAccountpassword;
                    }
                    console.log("userAccount userAccountpassword userRoleId", userAccount, userAccountpassword, userRoleId);
                    this.registerEvent();
                    this.initHisAccount();
                };
                ////////////////
                ///事件
                ////////////////
                /**注册事件
                 * @describe  UI的事件监听注册与消息监听注册
                 */
                LoginViewMediator.prototype.registerEvent = function () {
                    //按钮事件
                    this._viewUI.enter_btn.on(LEvent.MOUSE_DOWN, this, this.enterLogin);
                    this._viewUI.selectAccount_btn.on(LEvent.CLICK, this, this.showHisAccountLst);
                    //消息事件
                    createrole.models.LoginProxy.getInstance().on(createrole.models.LOGIN_EVENT, this, this.onHide);
                    createrole.models.LoginProxy.getInstance().on(createrole.models.PRELOAD_END, this, this.onHide);
                    //图片
                    this._viewUI.hideBg_img.on(LEvent.CLICK, this, this.onHideLst);
                };
                /**
                 * 隐藏历史账号列表
                 */
                LoginViewMediator.prototype.onHideLst = function () {
                    if (this._viewUI.hisAccout_lst.visible) {
                        this._viewUI.hisAccout_lst.visible = false;
                        this._viewUI.hideBg_img.mouseThrough = true;
                    }
                };
                /**
                 * 隐藏该界面
                 */
                LoginViewMediator.prototype.onHide = function () {
                    if (this) {
                        this.hide();
                    }
                };
                /**
                 * 显示历史账号列表
                 */
                LoginViewMediator.prototype.showHisAccountLst = function () {
                    //获取有几个账号登陆过的计数
                    var countAccount = LocalStorage.getItem("countAccount");
                    //如果该计数有值或者不为空
                    if (countAccount && countAccount != "" && countAccount != "0") {
                        //就显示历史账号列表
                        this._viewUI.hisAccout_lst.visible = true;
                        this._viewUI.hideBg_img.mouseThrough = false;
                    }
                };
                /**
                 * 初始化历史账号
                 */
                LoginViewMediator.prototype.initHisAccount = function () {
                    //获取有几个账号登陆过的计数
                    var countAccount = LocalStorage.getItem("countAccount");
                    var _count;
                    //如果该计数有值或者不为空
                    if (countAccount && countAccount != "" && countAccount != "0") {
                        //就将该计数number化
                        _count = Number(countAccount);
                    }
                    else { //否则就返回
                        return;
                    }
                    //获取有效的账号计数后，把个个历史账号放入临时数组
                    //将最新的账号放在数组的第一个，最旧的那个账号放到数组最后一个
                    //密码同理
                    this._tempHisAccount = [];
                    this._tempHisPassword = [];
                    for (var i = _count; i > 0; i--) {
                        this._tempHisAccount.push(LocalStorage.getItem("hisAccount" + i));
                        this._tempHisPassword.push(LocalStorage.getItem("hisPassword" + i));
                    }
                    //临时数组存放完历史账号数据后，初始化历史账号列表
                    this._viewUI.hisAccout_lst.array = this._tempHisAccount;
                    if (_count >= 4) {
                        this._viewUI.hisAccout_lst.repeatY = 4;
                    }
                    else {
                        this._viewUI.hisAccout_lst.repeatY = _count;
                    }
                    this._viewUI.hisAccout_lst.vScrollBarSkin = "";
                    this._viewUI.hisAccout_lst.renderHandler = new Handler(this, this.onHisAccountLst);
                };
                /**
                 * 渲染历史账号列表的单元格
                 */
                LoginViewMediator.prototype.onHisAccountLst = function (cell, index) {
                    if (index < 0 || index >= this._tempHisAccount.length)
                        return;
                    var account_lab = cell.getChildByName("account_lab");
                    var labBg_img = cell.getChildByName("labBg_img");
                    var delete_btn = cell.getChildByName("delete_btn");
                    account_lab.text = this._tempHisAccount[index];
                    labBg_img.on(LEvent.CLICK, this, this.replaceAccount, [index]);
                    delete_btn.on(LEvent.CLICK, this, this.deleteHisAccount, [index]);
                };
                /**
                 * 把所选择的历史账号替换到当前显示账号
                 */
                LoginViewMediator.prototype.replaceAccount = function (index) {
                    var _tempAccount = this._tempHisAccount[index];
                    var _tempPassword = this._tempHisPassword[index];
                    //隐藏历史账号列表
                    this.onHideLst();
                    //本地存储要做调整，替换之前显示的当前账号变为最新的历史账号，其它历史账号依次调整
                    for (var i = index; i > 0; i--) {
                        if (this._tempHisAccount[i - 1]) {
                            this._tempHisAccount[i] = this._tempHisAccount[i - 1];
                            this._tempHisPassword[i] = this._tempHisPassword[i - 1];
                        }
                    }
                    this._tempHisAccount[0] = _tempAccount;
                    this._tempHisPassword[0] = _tempPassword;
                    var _count = Number(LocalStorage.getItem("countAccount"));
                    //根据调整后的临时数组，重新写入本地存储
                    for (var i = 0; i < this._tempHisAccount.length; i++) {
                        LocalStorage.setItem("hisAccount" + _count, this._tempHisAccount[i]);
                        LocalStorage.setItem("hisPassword" + _count, this._tempHisPassword[i]);
                        _count--;
                    }
                    //UI上重新显示所选择的账号密码(防止引用传递带来错误)
                    this.showSelected(_tempAccount, _tempPassword);
                    //重新初始化
                    this.initHisAccount();
                };
                /**
                 * 显示所选择的账号密码
                 */
                LoginViewMediator.prototype.showSelected = function (_tempAccount, _tempPassword) {
                    this._viewUI.account_txt.text = _tempAccount;
                    this._viewUI.password_txt.text = _tempPassword;
                };
                /**
                 * 删除历史账号
                 */
                LoginViewMediator.prototype.deleteHisAccount = function (index) {
                    //被删除的账号，对其相应下标的数组数据重新赋值后一位的值
                    //数值覆盖，达到删除的效果
                    //数组存放数据的次序与本地存储次序相对应
                    for (var i = index; i < this._tempHisAccount.length; i++) {
                        this._tempHisAccount[i] = this.getNextValue(this._tempHisAccount[i + 1]);
                        this._tempHisPassword[i] = this.getNextValue(this._tempHisPassword[i + 1]);
                    }
                    //然后数组中最后一位出栈
                    this._tempHisAccount.pop();
                    this._tempHisPassword.pop();
                    var _count = Number(LocalStorage.getItem("countAccount"));
                    //删除最后一位的数据
                    LocalStorage.removeItem("hisAccount" + _count);
                    LocalStorage.removeItem("hisPassword" + _count);
                    _count--;
                    LocalStorage.setItem("countAccount", _count + "");
                    if (_count == 0) {
                        this.onHideLst();
                        return;
                    }
                    //根据调整后的临时数组，重新写入本地存储
                    for (var i = 0; i < this._tempHisAccount.length; i++) {
                        LocalStorage.setItem("hisAccount" + _count, this._tempHisAccount[i]);
                        LocalStorage.setItem("hisPassword" + _count, this._tempHisPassword[i]);
                        _count--;
                    }
                    //重新初始化
                    this.initHisAccount();
                };
                /**
                 * 获取数组中下一个的值
                 */
                LoginViewMediator.prototype.getNextValue = function (value) {
                    if (!value)
                        return null;
                    return value;
                };
                LoginViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                LoginViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return LoginViewMediator;
            }(game.modules.UiMediator));
            createrole.LoginViewMediator = LoginViewMediator;
        })(createrole = modules.createrole || (modules.createrole = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LoginViewMediator.js.map