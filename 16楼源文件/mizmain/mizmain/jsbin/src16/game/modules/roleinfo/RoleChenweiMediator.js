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
        var roleinfo;
        (function (roleinfo) {
            var RoleChenweiMediator = /** @class */ (function (_super) {
                __extends(RoleChenweiMediator, _super);
                function RoleChenweiMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.RoleChenweiUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this.isCenter = true;
                    _this._app = app;
                    _this.initialize();
                    _this.registerEvent();
                    return _this;
                }
                /**初始化 */
                RoleChenweiMediator.prototype.initialize = function () {
                    this.chengweiNameArr = new Array();
                    this.chengweiIdArr = new Array();
                    this.myData = modules.createrole.models.LoginModel.getInstance().roleDetail;
                    this.RoleTitleObj = game.modules.roleinfo.models.RoleInfoModel.getInstance().CRoleTitleBinDic;
                };
                /**注册点击监听 */
                RoleChenweiMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.yincang_btn.on(LEvent.MOUSE_DOWN, this, this.clickYincang);
                    this._viewUI.queding_btn.on(LEvent.MOUSE_DOWN, this, this.clickQueding);
                };
                RoleChenweiMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                };
                /**初始化 */
                RoleChenweiMediator.prototype.init = function () {
                    this.chengweiIdArr.length = 0;
                    this.chengweiNameArr.length = 0;
                    //判断是否有称谓，显示不同内容
                    if (this.myData.titles.keys.length > 0) {
                        this._viewUI.moren_box.visible = false;
                        this._viewUI.chengwei_box.visible = true;
                        for (var i = 0; i < this.myData.titles.keys.length; i++) {
                            this.chengweiIdArr.push(this.myData.titles.values[i].titleid);
                        }
                        for (var i = 0; i < this.chengweiIdArr.length; i++) {
                            this.chengweiNameArr.push(this.RoleTitleObj[this.chengweiIdArr[i]].titlename);
                        }
                        this.getListData();
                    }
                    else {
                        this._viewUI.moren_box.visible = true;
                        this._viewUI.chengwei_box.visible = false;
                    }
                };
                /**初始化称谓列表 */
                RoleChenweiMediator.prototype.getListData = function () {
                    this._viewUI.chengwei_list.vScrollBarSkin = "";
                    this._viewUI.chengwei_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.chengwei_list.scrollBar.elasticDistance = 50;
                    this._viewUI.chengwei_list.array = this.chengweiNameArr;
                    this._viewUI.chengwei_list.repeatY = this.chengweiNameArr.length;
                    this._viewUI.chengwei_list.renderHandler = new Handler(this, this.onRender);
                    this._viewUI.chengwei_list.selectHandler = new Handler(this, this.onSelect);
                    this._viewUI.chengwei_list.selectedIndex = -1;
                };
                /**渲染称谓列表 */
                RoleChenweiMediator.prototype.onRender = function (cell, index) {
                    var chengweiBtn = cell.getChildByName("chengwei_btn");
                    chengweiBtn.label = this.chengweiNameArr[index];
                    //选中按钮变色
                    if (index != this.selectNum) {
                        chengweiBtn.skin = "common/ui/tongyong/btn1.png";
                    }
                };
                /**处理称谓列表点击 */
                RoleChenweiMediator.prototype.onSelect = function (index) {
                    if (index != -1) {
                        this.selectNum = index;
                        var chengweiBtn = this._viewUI.chengwei_list.getCell(index).getChildByName("chengwei_btn");
                        //点击更换按钮图片
                        chengweiBtn.skin = "common/ui/tongyong/btn2.png";
                        this._viewUI.yincang_btn.skin = "common/ui/tongyong/btn1.png";
                        this._viewUI.chengweiName_tet.text = this.RoleTitleObj[this.chengweiIdArr[index]].description; //称谓描述
                        this._viewUI.fangshi_tet.text = this.RoleTitleObj[this.chengweiIdArr[index]].gettype; //获得方式
                        //获取称谓到期时间
                        var time = this.getTime(this.RoleTitleObj[this.chengweiIdArr[index]].availtime);
                        //如果时间为0，是永久称谓，否则为限时称谓
                        if (time == 0) {
                            this._viewUI.time_tet.text = modules.tips.models.TipsModel.getInstance().cstringResConfigData[RoleEnum.PERMANENT_TITLE].msg; //称谓时限
                            this._viewUI.limitTime_tet.visible = false;
                        }
                        else {
                            this._viewUI.time_tet.text = time; //称谓时限
                            this._viewUI.limitTime_tet.visible = true;
                        }
                        this._viewUI.chengwei_list.selectedIndex = -1;
                    }
                };
                /**隐藏按钮点击事件 */
                RoleChenweiMediator.prototype.clickYincang = function () {
                    this.selectNum = -1;
                    //将没选中列表按钮皮肤替换
                    for (var i = 0; i < this.chengweiNameArr.length; i++) {
                        if (i != this.selectNum) {
                            var chengweiBtn = this._viewUI.chengwei_list.getCell(i).getChildByName("chengwei_btn");
                            chengweiBtn.skin = "common/ui/tongyong/btn1.png";
                        }
                    }
                    this._viewUI.yincang_btn.skin = "common/ui/tongyong/btn2.png";
                    this._viewUI.chengweiName_tet.text = modules.tips.models.TipsModel.getInstance().cstringResConfigData[RoleEnum.HIDE_TITLE].msg; //称谓描述
                    this._viewUI.fangshi_tet.text = modules.tips.models.TipsModel.getInstance().cstringResConfigData[RoleEnum.TITLE_DESCRIBE].msg; //获得方式
                    this._viewUI.time_tet.text = "";
                    this._viewUI.limitTime_tet.visible = false;
                };
                /**确定按钮点击事件 */
                RoleChenweiMediator.prototype.clickQueding = function () {
                    //根据列表选择下标发送协议，-1，代表卸下称谓，其他下标为佩戴称谓不同称谓
                    if (this.selectNum == -1) {
                        RequesterProtocols._instance.c2s_COffTitle(); //客户端请求卸下称谓
                        LoginModel.getInstance().roleDetail.title = -1;
                    }
                    else {
                        RequesterProtocols._instance.c2s_COnTitle(this.chengweiIdArr[this.selectNum]); //客户端请求佩戴称谓（根据下标去称谓数组中找到对应称谓id）
                        LoginModel.getInstance().roleDetail.title = this.chengweiIdArr[this.selectNum];
                    }
                    this.hide();
                };
                /**计算称谓到期时间
                 * time:配置表中的称谓持续时间
                 */
                RoleChenweiMediator.prototype.getTime = function (time) {
                    //根据配置表中的期限时间来计算，-1代表永久称谓，返回0，如果不为-1，根据传入的毫秒数计算出到期时间
                    if (time != -1) {
                        var nowtime = new Date().getTime(); //获取当前时间的毫秒数
                        var newtime = new Date(nowtime + time * RoleEnum.TIME_MILLISCOND); //将当前时间毫秒数加上配置表中的时间毫秒数，得到过期时间
                        var str1 = "-";
                        var strMonth = (newtime.getMonth() + 1).toString();
                        var strDate = (newtime.getDate()).toString();
                        if (parseInt(strMonth) >= 1 && parseInt(strMonth) <= 9) {
                            strMonth = "0" + strMonth;
                        }
                        if (parseInt(strDate) >= 1 && parseInt(strDate) <= 9) {
                            strDate = "0" + strDate;
                        }
                        var currentdate = newtime.getFullYear() + str1 + strMonth + str1 + strDate;
                        return currentdate;
                    }
                    else
                        return 0;
                };
                RoleChenweiMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    roleinfo.models.RoleInfoModel.getInstance().currentKey = 1;
                    modules.ModuleManager.show(modules.ModuleNames.ROLE_Info, this._app);
                };
                RoleChenweiMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return RoleChenweiMediator;
            }(game.modules.UiMediator));
            roleinfo.RoleChenweiMediator = RoleChenweiMediator;
        })(roleinfo = modules.roleinfo || (modules.roleinfo = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleChenweiMediator.js.map