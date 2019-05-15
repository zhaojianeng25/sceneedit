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
            /** 人物加点类 */
            var RoleJiadianMediator = /** @class */ (function (_super) {
                __extends(RoleJiadianMediator, _super);
                function RoleJiadianMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this._viewUI = new ui.common.RoleJiadianUI();
                    _this._apps = RoleInfoModel.getInstance().appBase;
                    _this._RoleResetAttrMediator = new roleinfo.RoleResetAttrMediator(_this._apps);
                    _this._JinBiBuZuViewMediator = new modules.commonUI.JinBiBuZuViewMediator(_this._viewUI, _this._apps);
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this.initialize();
                    _this.init();
                    _this.registerEvent();
                    _this.eventListener();
                    return _this;
                }
                /**注册事件监听 */
                RoleJiadianMediator.prototype.eventListener = function () {
                    roleinfo.models.RoleInfoProxy.getInstance().on(roleinfo.models.SRefreshPointType_EVENT, this, this.onRefreshDian);
                    roleinfo.models.RoleInfoProxy.getInstance().on(roleinfo.models.SReqPointSchemeTime_EVENT, this, this.onReqPointSchemeTime);
                    modules.mainhud.models.HudProxy.getInstance().on(modules.mainhud.models.SRefreshRoleData_EVENT, this, this.onRefreshRoleData);
                };
                /**初始化 */
                RoleJiadianMediator.prototype.initialize = function () {
                    this.tizhiNum = 0;
                    this.liliangNum = 0;
                    this.minjieNum = 0;
                    this.zhiliNum = 0;
                    this.nailiNum = 0;
                    this.iswash = 0;
                    this.arr = [roleinfo.models.RoleInfoModel.chineseStr.fangan_one, roleinfo.models.RoleInfoModel.chineseStr.fangan_two, roleinfo.models.RoleInfoModel.chineseStr.fangan_three];
                    this.resObj = RoleInfoModel.getInstance().CResMoneyConfigBinDic;
                    this.point = new Laya.Dictionary();
                };
                /**注册点击监听 */
                RoleJiadianMediator.prototype.registerEvent = function () {
                    this._viewUI.fangan_btn.on(LEvent.MOUSE_DOWN, this, this.shouFangan);
                    this._viewUI.kaiqi_btn.on(LEvent.MOUSE_DOWN, this, this.kaiFangan);
                    this._viewUI.xidian_btn.on(LEvent.MOUSE_DOWN, this, this.showXidian);
                    this._viewUI.queding_btn.on(LEvent.MOUSE_DOWN, this, this.jiaDian);
                    this._viewUI.jiaTizhi_btn.on(LEvent.MOUSE_DOWN, this, this.jiaTizhi);
                    this._viewUI.jianTizhi_btn.on(LEvent.MOUSE_DOWN, this, this.jianTizhi);
                    this._viewUI.jiaLiliang_btn.on(LEvent.MOUSE_DOWN, this, this.jiaLiliang);
                    this._viewUI.jianLiliang_btn.on(LEvent.MOUSE_DOWN, this, this.jianLiliang);
                    this._viewUI.jiaMinjie_btn.on(LEvent.MOUSE_DOWN, this, this.jiaMinjie);
                    this._viewUI.jianMinjie_btn.on(LEvent.MOUSE_DOWN, this, this.jianMinjie);
                    this._viewUI.jiaZhili_btn.on(LEvent.MOUSE_DOWN, this, this.jiaZhili);
                    this._viewUI.jianZhili_btn.on(LEvent.MOUSE_DOWN, this, this.jianZhili);
                    this._viewUI.jiaNaili_btn.on(LEvent.MOUSE_DOWN, this, this.jiaNaili);
                    this._viewUI.jianNaili_btn.on(LEvent.MOUSE_DOWN, this, this.jianNaili);
                    this._viewUI.yincang_box.on(LEvent.MOUSE_DOWN, this, this.hideFangan);
                    this._viewUI.tuijian_btn.on(LEvent.MOUSE_DOWN, this, this.showTishi);
                };
                /** 进行判断能否修改人物属性点 */
                RoleJiadianMediator.prototype.isCanModifyRolePoints = function () {
                    //还有多少潜力点能够用来加属性点
                    var _points = Number(this._viewUI.qianli_tet.text);
                    if (_points > 0) {
                        this._viewUI.py_slider.mouseEnabled = true;
                        this._viewUI.iq_slider.mouseEnabled = true;
                        this._viewUI.str_slider.mouseEnabled = true;
                        this._viewUI.endu_slider.mouseEnabled = true;
                        this._viewUI.speed_slider.mouseEnabled = true;
                    }
                    else {
                        this._viewUI.py_slider.mouseEnabled = false;
                        this._viewUI.iq_slider.mouseEnabled = false;
                        this._viewUI.str_slider.mouseEnabled = false;
                        this._viewUI.endu_slider.mouseEnabled = false;
                        this._viewUI.speed_slider.mouseEnabled = false;
                    }
                };
                /**显示弹窗信息 */
                RoleJiadianMediator.prototype.showTishi = function () {
                    var param = new Dictionary();
                    param.set("title", RoleEnum.JIADIAN_EXPLAIN);
                    param.set("contentId", RoleEnum.JIADIAN_TIP);
                    var school = modules.createrole.models.LoginModel.getInstance().schoolInfo; //z职业配置表中的内容
                    var mydata = modules.createrole.models.LoginModel.getInstance().roleDetail; //人物登录属性
                    var levlel = HudModel.getInstance().levelNum;
                    var scheme = [school[mydata.school]["scheme"], school[mydata.school]["scheme2"], school[mydata.school]["scheme3"]]; //推荐方案
                    var explain = [school[mydata.school]["explain"], school[mydata.school]["explain2"], school[mydata.school]["explain3"]]; //描述
                    var numDic = new Laya.Dictionary();
                    var strDic = new Laya.Dictionary();
                    var tuijianDic = new Laya.Dictionary();
                    //将从配置表中读出的推荐方案中的数字和文字分开
                    for (var i = 0; i < scheme.length; i++) {
                        var shuxing = scheme[i];
                        var numArr = [];
                        var strArr = [];
                        for (var j = 0; j < shuxing.length; j++) {
                            if (shuxing[j] > 0 && shuxing[j] < 9) {
                                numArr.push(shuxing[j]);
                                numDic.set(i, numArr);
                            }
                            else {
                                if (shuxing[j + 1] > 0 && shuxing[j + 1] < 9)
                                    continue;
                                else if (shuxing[j + 1] != undefined)
                                    strArr.push(shuxing[j] + shuxing[j + 1]);
                                strDic.set(i, strArr);
                            }
                        }
                    }
                    //重新组装推荐方案
                    for (var i = 0; i < scheme.length; i++) {
                        var numArr = [];
                        var strArr = [];
                        var tuijiannum = [];
                        numArr = numDic.get(i);
                        strArr = strDic.get(i);
                        for (var j = 0; j < numArr.length; j++) {
                            tuijiannum.push(strArr[j] + ":" + (numArr[j] * levlel));
                        }
                        tuijianDic.set(i, tuijiannum);
                    }
                    var tuijian = roleinfo.models.RoleInfoModel.chineseStr.tuijian_jiadian;
                    var str = "<br>";
                    for (var i = 0; i < scheme.length; i++) {
                        str += "<span style='color:#13ff00;fontSize:24'>" + scheme[i] + "</span>" + "&nbsp;&nbsp;" + "<span style='color:#f6f6f4;fontSize:24'>" + explain[i] + "</span><br>" + "<span style='color:#f6f6f4;fontSize:24'>" + tuijian + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "<span style='color:#f6f6f4;fontSize:24'>" + tuijianDic.get(i) + "</span><br>";
                    }
                    var arr = [this.allocaTiZhi, this.allocaZhiLi, this.allocaLiLiang, this.allocaNaiLi, this.allocaMinJie, str];
                    param.set("parame", arr);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._apps, TIPS_TYPE.CLIENTMESSAGE, param);
                };
                /**初始化界面数据*/
                RoleJiadianMediator.prototype.init = function () {
                    this.myData = modules.createrole.models.LoginModel.getInstance().roleDetail;
                    this._viewUI.hp_tet.text = this.myData.maxhp.toString(); //生命值
                    this._viewUI.mp_tet.text = this.myData.maxmp.toString(); //魔法值
                    this._viewUI.damage_tet.text = this.myData.damage.toString(); //物理攻击
                    this._viewUI.magicattack_tet.text = this.myData.magicattack.toString(); //法术攻击
                    this._viewUI.speed_tet.text = this.myData.speed.toString(); //速度
                    this._viewUI.defend_tet.text = this.myData.defend.toString(); //物理防御
                    this._viewUI.magicdef_tet.text = this.myData.magicdef.toString(); //法术防御
                    this._viewUI.fangan_btn.label = roleinfo.models.RoleInfoModel.chineseStr.fangan + this.myData.pointscheme; //当前加点方案
                    this.currentPointscheme = this.myData.pointscheme; //加点方案
                    this._viewUI.qianli_tet.text = this.myData.point.get(this.myData.pointscheme); //潜力点
                    this.isCanModifyRolePoints();
                    for (var i = 1; i < 4; i++) {
                        this.point.set(i, this.myData.point.get(i));
                    } //潜力点数组
                    this.tempQianliNum = this.myData.point.get(this.myData.pointscheme); //临时潜力点
                    this._viewUI.tizhi_tet.text = this.myData.bfp["cons"]; //体质
                    this._viewUI.liliang_tet.text = this.myData.bfp["str"]; //力量
                    this._viewUI.minjie_tet.text = this.myData.bfp["agi"]; //敏捷
                    this._viewUI.zhili_tet.text = this.myData.bfp["iq"]; //智力
                    this._viewUI.naili_tet.text = this.myData.bfp["endu"]; //耐力
                    this.currentTiZhi = this.myData.bfp["cons"]; //目前体质
                    this.currentLiLiang = this.myData.bfp["str"]; //目前力量
                    this.currentMinJie = this.myData.bfp["agi"]; //目前敏捷
                    this.currentZhiLi = this.myData.bfp["iq"]; //目前智力
                    this.currentNaiLi = this.myData.bfp["endu"]; //目前耐力
                    this.allocaTiZhi = this.myData.bfp["cons_save"].get(this.myData.pointscheme); //已分配体质
                    this.allocaLiLiang = this.myData.bfp["str_save"].get(this.myData.pointscheme); //已分配力量
                    this.allocaMinJie = this.myData.bfp["agi_save"].get(this.myData.pointscheme); //已分配敏捷
                    this.allocaZhiLi = this.myData.bfp["iq_save"].get(this.myData.pointscheme); //已分配智力
                    this.allocaNaiLi = this.myData.bfp["endu_save"].get(this.myData.pointscheme); //已分配耐力
                    this.resNum = this.resObj[this.myData.level].addpointschemenum; //已开启加点方案数目
                    this._viewUI.addlift_lab.text = "";
                    this._viewUI.addattack_lab.text = "";
                    this._viewUI.addspeed_lab.text = "";
                    this._viewUI.addmagic_lab.text = "";
                    this._viewUI.addmagicatt_lab.text = "";
                    this._viewUI.addattdefen_lab.text = "";
                    this._viewUI.addmagicdef_lab.text = "";
                    this.initUiNum();
                };
                /**如果这些属性在界面打开之前有变化，重新初始化这些属性 */
                RoleJiadianMediator.prototype.initShuxing = function () {
                    if (HudModel.getInstance().maxHpNum != 0)
                        this._viewUI.hp_tet.text = HudModel.getInstance().maxHpNum.toString(); //生命值
                    if (HudModel.getInstance().attackNum != 0)
                        this._viewUI.damage_tet.text = HudModel.getInstance().attackNum.toString(); //物理攻击
                    if (HudModel.getInstance().magicDefNum != 0)
                        this._viewUI.magicdef_tet.text = HudModel.getInstance().magicDefNum.toString(); //法术防御
                    if (HudModel.getInstance().speedNum != 0)
                        this._viewUI.speed_tet.text = HudModel.getInstance().speedNum.toString(); //速度
                    if (HudModel.getInstance().maxMpNum != 0)
                        this._viewUI.mp_tet.text = HudModel.getInstance().maxMpNum.toString(); //魔法值
                    if (HudModel.getInstance().magicAttackNum != 0)
                        this._viewUI.magicattack_tet.text = HudModel.getInstance().magicAttackNum.toString(); //法术攻击
                    if (HudModel.getInstance().defendNum != 0)
                        this._viewUI.defend_tet.text = HudModel.getInstance().defendNum.toString(); //物理防御
                    if (HudModel.getInstance().levelNum != 0)
                        this.resNum = this.resObj[HudModel.getInstance().levelNum].addpointschemenum; //加点方案数
                };
                /**初始化加点属性 */
                RoleJiadianMediator.prototype.initPoint = function () {
                    var data = roleinfo.models.RoleInfoModel.getInstance().SRefreshPointTypeData.get("data");
                    if (data != undefined) {
                        this._viewUI.fangan_btn.label = roleinfo.models.RoleInfoModel.chineseStr.fangan + data.pointscheme; //加点方案
                        this.currentPointscheme = data.pointscheme; //加点方案
                        this._viewUI.qianli_tet.text = data.point.get(data.pointscheme); //潜力点				
                        this.isCanModifyRolePoints();
                        for (var i = 1; i < 4; i++) {
                            this.point.set(i, data.point.get(i));
                        } //潜力点数组
                        this.tempQianliNum = data.point.get(data.pointscheme); //临时潜力点
                        this._viewUI.tizhi_tet.text = data.bfp["cons"]; //体质
                        this._viewUI.liliang_tet.text = data.bfp["str"]; //力量
                        this._viewUI.minjie_tet.text = data.bfp["agi"]; //敏捷
                        this._viewUI.zhili_tet.text = data.bfp["iq"]; //智力
                        this._viewUI.naili_tet.text = data.bfp["endu"]; //耐力
                        this.currentTiZhi = data.bfp["cons"]; //目前体质
                        this.currentLiLiang = data.bfp["str"]; //目前力量
                        this.currentMinJie = data.bfp["agi"]; //目前敏捷
                        this.currentZhiLi = data.bfp["iq"]; //目前智力
                        this.currentNaiLi = data.bfp["endu"]; //目前耐力
                        this.allocaTiZhi = data.bfp["cons_save"].get(data.pointscheme); //已分配体质
                        this.allocaLiLiang = data.bfp["str_save"].get(data.pointscheme); //已分配力量
                        this.allocaMinJie = data.bfp["agi_save"].get(data.pointscheme); //已分配敏捷
                        this.allocaZhiLi = data.bfp["iq_save"].get(data.pointscheme); //已分配智力
                        this.allocaNaiLi = data.bfp["endu_save"].get(data.pointscheme); //已分配耐力
                    }
                };
                /**初始化滑动栏 */
                RoleJiadianMediator.prototype.initUiNum = function () {
                    //体质
                    this._viewUI.py_progressbar.value = RoleEnum.BASIC_VALUE; //基础黄条值
                    this._viewUI.cons_img.width = this.allocaTiZhi / (HudModel.getInstance().levelNum * RoleEnum.SHUING_POINT) * RoleEnum.SLIDER_WIDTH; //手动分配属性点图片长度 公式：已分配属性/（人物等级*每级基础属性点）* 滑动条宽度
                    this._viewUI.py_slider.max = HudModel.getInstance().levelNum * RoleEnum.SHUING_POINT; //滑动条最大值
                    this._viewUI.cons_img.x = RoleEnum.BASIC_VALUE * RoleEnum.SLIDER_WIDTH; //手动分配属性点图片起始x值 ,公式：基础黄条值 * 滑动条宽度
                    this.tempTiZhi = this.currentTiZhi;
                    this._viewUI.py_slider.value = this.currentTiZhi; //滑动条目前值
                    this._viewUI.py_slider.min = 0; //滑动条最小值
                    var consimg = this._viewUI.py_slider.getChildAt(0);
                    consimg.alpha = 0;
                    var consimg1 = this._viewUI.py_slider.getChildAt(1);
                    consimg1.alpha = 0;
                    this._viewUI.py_slider.changeHandler = new Laya.Handler(this, this.changevalueTizhi);
                    //力量
                    this._viewUI.str_progressbar.value = RoleEnum.BASIC_VALUE; //基础黄条值
                    this._viewUI.str_img.width = this.allocaLiLiang / (HudModel.getInstance().levelNum * RoleEnum.SHUING_POINT) * RoleEnum.SLIDER_WIDTH; //手动分配属性点图片长度 公式：已分配属性/（人物等级*每级基础属性点）* 滑动条宽度
                    this._viewUI.str_slider.max = HudModel.getInstance().levelNum * RoleEnum.SHUING_POINT; //滑动条最大值
                    this._viewUI.str_img.x = RoleEnum.BASIC_VALUE * RoleEnum.SLIDER_WIDTH; //手动分配属性点图片起始x值 ,公式：基础黄条值 * 滑动条宽度
                    this.tempLiLiang = this.currentLiLiang;
                    this._viewUI.str_slider.value = this.currentLiLiang; //滑动条目前值
                    this._viewUI.str_slider.min = 0; //滑动条最小值
                    var strimg = this._viewUI.str_slider.getChildAt(0);
                    strimg.alpha = 0;
                    var strimg1 = this._viewUI.str_slider.getChildAt(1);
                    strimg1.alpha = 0;
                    this._viewUI.str_slider.changeHandler = new Laya.Handler(this, this.changevalueLiliang);
                    //敏捷
                    this._viewUI.speed_progressbar.value = RoleEnum.BASIC_VALUE; //基础黄条值
                    this._viewUI.speed_img.width = this.allocaMinJie / (HudModel.getInstance().levelNum * RoleEnum.SHUING_POINT) * RoleEnum.SLIDER_WIDTH; //手动分配属性点图片长度 公式：已分配属性/（人物等级*每级基础属性点）* 滑动条宽度
                    this._viewUI.speed_slider.max = HudModel.getInstance().levelNum * RoleEnum.SHUING_POINT; //滑动条最大值
                    this._viewUI.speed_img.x = RoleEnum.BASIC_VALUE * RoleEnum.SLIDER_WIDTH; //手动分配属性点图片起始x值 ,公式：基础黄条值 * 滑动条宽度
                    this.tempMinJie = this.currentMinJie;
                    this._viewUI.speed_slider.value = this.currentMinJie; //滑动条目前值
                    this._viewUI.speed_slider.min = 0; //滑动条最小值
                    var speedimg = this._viewUI.speed_slider.getChildAt(0);
                    speedimg.alpha = 0;
                    var speedimg1 = this._viewUI.speed_slider.getChildAt(1);
                    speedimg1.alpha = 0;
                    this._viewUI.speed_slider.changeHandler = new Laya.Handler(this, this.changevalueMinjie);
                    //智力
                    this._viewUI.iq_progressbar.value = RoleEnum.BASIC_VALUE; //基础黄条值
                    this._viewUI.iq_img.width = this.allocaZhiLi / (HudModel.getInstance().levelNum * RoleEnum.SHUING_POINT) * RoleEnum.SLIDER_WIDTH; //手动分配属性点图片长度 公式：已分配属性/（人物等级*每级基础属性点）* 滑动条宽度
                    this._viewUI.iq_slider.max = HudModel.getInstance().levelNum * RoleEnum.SHUING_POINT; //滑动条最大值
                    this._viewUI.iq_img.x = RoleEnum.BASIC_VALUE * RoleEnum.SLIDER_WIDTH; //手动分配属性点图片起始x值 ,公式：基础黄条值 * 滑动条宽度
                    this.tempZhiLi = this.currentZhiLi;
                    this._viewUI.iq_slider.value = this.currentZhiLi; //滑动条目前值
                    this._viewUI.iq_slider.min = 0; //滑动条最小值
                    var iqimg = this._viewUI.iq_slider.getChildAt(0);
                    iqimg.alpha = 0;
                    var iqimg1 = this._viewUI.iq_slider.getChildAt(1);
                    iqimg1.alpha = 0;
                    this._viewUI.iq_slider.changeHandler = new Laya.Handler(this, this.changevalueZhili);
                    //耐力
                    this._viewUI.endu_progressbar.value = RoleEnum.BASIC_VALUE; //基础黄条值
                    this._viewUI.endu_img.width = this.allocaNaiLi / (HudModel.getInstance().levelNum * RoleEnum.SHUING_POINT) * RoleEnum.SLIDER_WIDTH; //手动分配属性点图片长度 公式：已分配属性/（人物等级*每级基础属性点）* 滑动条宽度
                    this._viewUI.endu_slider.max = HudModel.getInstance().levelNum * RoleEnum.SHUING_POINT; //滑动条最大值
                    this._viewUI.endu_img.x = RoleEnum.BASIC_VALUE * RoleEnum.SLIDER_WIDTH; //手动分配属性点图片起始x值 ,公式：基础黄条值 * 滑动条宽度
                    this.tempNaiLi = this.currentNaiLi;
                    this._viewUI.endu_slider.value = this.currentNaiLi; //滑动条目前值
                    this._viewUI.endu_slider.min = 0; //滑动条最小值
                    var enduimg = this._viewUI.endu_slider.getChildAt(0);
                    enduimg.alpha = 0;
                    var enduimg1 = this._viewUI.endu_slider.getChildAt(1);
                    enduimg1.alpha = 0;
                    this._viewUI.endu_slider.changeHandler = new Laya.Handler(this, this.changevalueNaili);
                };
                /**刷新人物加点后的加点面板数值 */
                RoleJiadianMediator.prototype.onRefreshDian = function (e) {
                    var data = roleinfo.models.RoleInfoModel.getInstance().SRefreshPointTypeData.get("data");
                    this.currentPointscheme = data.pointscheme; //加点方案
                    this._viewUI.currentFangan_box.visible = true;
                    this._viewUI.xinFangan_box.visible = false;
                    this._viewUI.qianli_tet.text = data.point.get(data.pointscheme); //潜力点
                    for (var i = 1; i < 4; i++) {
                        this.point.set(i, data.point.get(i));
                    } //潜力点数组
                    this.tempQianliNum = data.point.get(data.pointscheme); //临时潜力点
                    this._viewUI.tizhi_tet.text = data.bfp["cons"]; //体质
                    this._viewUI.liliang_tet.text = data.bfp["str"]; //力量
                    this._viewUI.minjie_tet.text = data.bfp["agi"]; //敏捷
                    this._viewUI.zhili_tet.text = data.bfp["iq"]; //智力
                    this._viewUI.naili_tet.text = data.bfp["endu"]; //耐力
                    this.currentTiZhi = data.bfp["cons"]; //目前体质
                    this.currentLiLiang = data.bfp["str"]; //目前力量
                    this.currentMinJie = data.bfp["agi"]; //目前敏捷
                    this.currentZhiLi = data.bfp["iq"]; //目前智力
                    this.currentNaiLi = data.bfp["endu"]; //目前耐力
                    this.allocaTiZhi = data.bfp["cons_save"].get(data.pointscheme); //已分配体质
                    this.allocaLiLiang = data.bfp["str_save"].get(data.pointscheme); //已分配力量
                    this.allocaMinJie = data.bfp["agi_save"].get(data.pointscheme); //已分配敏捷
                    this.allocaZhiLi = data.bfp["iq_save"].get(data.pointscheme); //已分配智力
                    this.allocaNaiLi = data.bfp["endu_save"].get(data.pointscheme); //已分配耐力
                    //重置加点，恢复到未加点状态
                    this.tizhiNum = 0;
                    this.liliangNum = 0;
                    this.minjieNum = 0;
                    this.zhiliNum = 0;
                    this.nailiNum = 0;
                    this._viewUI.tizhiNum_tet.text = "";
                    this._viewUI.liliangNum_tet.text = "";
                    this._viewUI.minjieNum_tet.text = "";
                    this._viewUI.zhiliNum_tet.text = "";
                    this._viewUI.nailiNum_tet.text = "";
                    this._viewUI.jianTizhi_btn.skin = "common/ui/roleinfo/renwu_jianhao2.png";
                    this._viewUI.jianLiliang_btn.skin = "common/ui/roleinfo/renwu_jianhao2.png";
                    this._viewUI.jianMinjie_btn.skin = "common/ui/roleinfo/renwu_jianhao2.png";
                    this._viewUI.jianZhili_btn.skin = "common/ui/roleinfo/renwu_jianhao2.png";
                    this._viewUI.jianNaili_btn.skin = "common/ui/roleinfo/renwu_jianhao2.png";
                    this._viewUI.queding_btn.disabled = true;
                    this._viewUI.addlift_lab.text = "";
                    this._viewUI.addattack_lab.text = "";
                    this._viewUI.addspeed_lab.text = "";
                    this._viewUI.addmagic_lab.text = "";
                    this._viewUI.addmagicatt_lab.text = "";
                    this._viewUI.addattdefen_lab.text = "";
                    this._viewUI.addmagicdef_lab.text = "";
                    this.initUiNum();
                    this._enableUI();
                };
                /**刷新人物属性 */
                RoleJiadianMediator.prototype.onRefreshRoleData = function (e) {
                    this._viewUI.hp_tet.text = HudModel.getInstance().maxHpNum.toString(); //生命值
                    this._viewUI.damage_tet.text = HudModel.getInstance().attackNum.toString(); //物理攻击
                    this._viewUI.magicdef_tet.text = HudModel.getInstance().magicDefNum.toString(); //法术防御
                    this._viewUI.speed_tet.text = HudModel.getInstance().speedNum.toString(); //速度
                    this._viewUI.mp_tet.text = HudModel.getInstance().maxMpNum.toString(); //魔法值
                    this._viewUI.magicattack_tet.text = HudModel.getInstance().magicAttackNum.toString(); //法术攻击
                    this._viewUI.defend_tet.text = HudModel.getInstance().defendNum.toString(); //物理防御
                    this.resNum = this.resObj[HudModel.getInstance().levelNum].addpointschemenum; //加点方案数
                };
                /**滑动体质栏 */
                RoleJiadianMediator.prototype.changevalueTizhi = function () {
                    if (this.iswash == 1) {
                        return;
                    }
                    //下限
                    if (this._viewUI.py_slider.value < this.currentTiZhi) {
                        this._viewUI.py_slider.value = this.currentTiZhi;
                    }
                    //上限
                    if (this._viewUI.py_slider.value > this.currentTiZhi + this.tempQianliNum + this.tizhiNum) {
                        this._viewUI.py_slider.value = this.currentTiZhi + this.tempQianliNum + this.tizhiNum;
                    }
                    //已分配属性长度 公式：（滑动条当前值 - 等级）/（等级 * 人物升级获得属性点 ） * 滑动条宽度
                    this._viewUI.cons_img.width = (this._viewUI.py_slider.value - HudModel.getInstance().levelNum) / (HudModel.getInstance().levelNum * RoleEnum.SHUING_POINT) * RoleEnum.SLIDER_WIDTH;
                    //临时潜力点 
                    if (this._viewUI.py_slider.value > this.tempTiZhi) {
                        //向右拖动滑动条，临时潜力点减少 公式：当前临时潜力点- （滑动条当前值-临时分配属性点）
                        this.tempQianliNum -= (this._viewUI.py_slider.value - this.tempTiZhi);
                    }
                    else if (this._viewUI.py_slider.value < this.tempTiZhi) {
                        //向左拖动滑动条，临时潜力点增加 公式：当前临时潜力点 + （临时分配属性点-滑动条当前值）
                        this.tempQianliNum += (this.tempTiZhi - this._viewUI.py_slider.value);
                    }
                    this.tempTiZhi = this._viewUI.py_slider.value;
                    this._viewUI.tizhi_tet.text = this.tempTiZhi.toString();
                    this.tizhiNum = this._viewUI.py_slider.value - this.currentTiZhi; //体质加点 公式：滑动条当前值 - 已分配属性点
                    this._viewUI.qianli_tet.text = this.tempQianliNum.toString(); //当前潜力
                    if (this.tizhiNum == 0) {
                        this._viewUI.tizhiNum_tet.text = "";
                    }
                    else {
                        this._viewUI.tizhiNum_tet.text = "+" + this.tizhiNum;
                    }
                    this.renderBtn();
                    this.preview();
                };
                /**滑动力量栏 */
                RoleJiadianMediator.prototype.changevalueLiliang = function () {
                    if (this.iswash == 1) {
                        return;
                    }
                    //下限		
                    if (this._viewUI.str_slider.value < this.currentLiLiang) {
                        this._viewUI.str_slider.value = this.currentLiLiang;
                    }
                    //上限
                    if (this._viewUI.str_slider.value > this.currentLiLiang + this.tempQianliNum + this.liliangNum) {
                        this._viewUI.str_slider.value = this.currentLiLiang + this.tempQianliNum + this.liliangNum;
                    }
                    //已分配属性长度公式：（滑动条当前值 - 等级）/（等级 * 人物升级获得属性点 ） * 滑动条宽度	
                    this._viewUI.str_img.width = (this._viewUI.str_slider.value - HudModel.getInstance().levelNum) / (HudModel.getInstance().levelNum * RoleEnum.SHUING_POINT) * RoleEnum.SLIDER_WIDTH;
                    //临时潜力点
                    if (this._viewUI.str_slider.value > this.tempLiLiang) {
                        //向右拖动滑动条，临时潜力点减少 公式：当前临时潜力点- （滑动条当前值-临时分配属性点）
                        this.tempQianliNum -= (this._viewUI.str_slider.value - this.tempLiLiang);
                    }
                    else if (this._viewUI.str_slider.value < this.tempLiLiang) {
                        //向左拖动滑动条，临时潜力点增加 公式：当前临时潜力点 + （临时分配属性点-滑动条当前值）
                        this.tempQianliNum += (this.tempLiLiang - this._viewUI.str_slider.value);
                    }
                    this.tempLiLiang = this._viewUI.str_slider.value;
                    this._viewUI.liliang_tet.text = this.tempLiLiang.toString();
                    this.liliangNum = this._viewUI.str_slider.value - this.currentLiLiang; //力量加点 公式：滑动条当前值 - 已分配属性点
                    this._viewUI.qianli_tet.text = this.tempQianliNum.toString(); //当前潜力
                    if (this.liliangNum == 0) {
                        this._viewUI.liliangNum_tet.text = "";
                    }
                    else {
                        this._viewUI.liliangNum_tet.text = "+" + this.liliangNum;
                    }
                    this.renderBtn();
                    this.preview();
                };
                /**滑动敏捷栏 */
                RoleJiadianMediator.prototype.changevalueMinjie = function () {
                    if (this.iswash == 1) {
                        return;
                    }
                    //下限	
                    if (this._viewUI.speed_slider.value < this.currentMinJie) {
                        this._viewUI.speed_slider.value = this.currentMinJie;
                    }
                    //上限
                    if (this._viewUI.speed_slider.value > this.currentMinJie + this.tempQianliNum + this.minjieNum) {
                        this._viewUI.speed_slider.value = this.currentMinJie + this.tempQianliNum + this.minjieNum;
                    }
                    //已分配属性长度 公式：（滑动条当前值 - 等级）/（等级 * 人物升级获得属性点 ） * 滑动条宽度			
                    this._viewUI.speed_img.width = (this._viewUI.speed_slider.value - HudModel.getInstance().levelNum) / (HudModel.getInstance().levelNum * RoleEnum.SHUING_POINT) * RoleEnum.SLIDER_WIDTH;
                    //临时潜力点
                    if (this._viewUI.speed_slider.value > this.tempMinJie) {
                        //向右拖动滑动条，临时潜力点减少 公式：当前临时潜力点- （滑动条当前值-临时分配属性点）
                        this.tempQianliNum -= (this._viewUI.speed_slider.value - this.tempMinJie);
                    }
                    else if (this._viewUI.speed_slider.value < this.tempMinJie) {
                        //向左拖动滑动条，临时潜力点增加 公式：当前临时潜力点 + （临时分配属性点-滑动条当前值）
                        this.tempQianliNum += (this.tempMinJie - this._viewUI.speed_slider.value);
                    }
                    this.tempMinJie = this._viewUI.speed_slider.value;
                    this._viewUI.minjie_tet.text = this.tempMinJie.toString();
                    this.minjieNum = this._viewUI.speed_slider.value - this.currentMinJie; //敏捷加点 公式：滑动条当前值 - 已分配属性点
                    this._viewUI.qianli_tet.text = this.tempQianliNum.toString(); //当前潜力
                    if (this.minjieNum == 0) {
                        this._viewUI.minjieNum_tet.text = "";
                    }
                    else {
                        this._viewUI.minjieNum_tet.text = "+" + this.minjieNum;
                    }
                    this.renderBtn();
                    this.preview();
                };
                /**滑动智力栏 */
                RoleJiadianMediator.prototype.changevalueZhili = function () {
                    if (this.iswash == 1) {
                        return;
                    }
                    //下限
                    if (this._viewUI.iq_slider.value < this.currentZhiLi) {
                        this._viewUI.iq_slider.value = this.currentZhiLi;
                    }
                    //上限
                    if (this._viewUI.iq_slider.value > this.currentZhiLi + this.tempQianliNum + this.zhiliNum) {
                        this._viewUI.iq_slider.value = this.currentZhiLi + this.tempQianliNum + this.zhiliNum;
                    }
                    //已分配属性长度 公式：（滑动条当前值 - 等级）/（等级 * 人物升级获得属性点 ） * 滑动条宽度
                    this._viewUI.iq_img.width = (this._viewUI.iq_slider.value - HudModel.getInstance().levelNum) / (HudModel.getInstance().levelNum * RoleEnum.SHUING_POINT) * RoleEnum.SLIDER_WIDTH;
                    //临时潜力点
                    if (this._viewUI.iq_slider.value > this.tempZhiLi) {
                        //向右拖动滑动条，临时潜力点减少 公式：当前临时潜力点- （滑动条当前值-临时分配属性点）
                        this.tempQianliNum -= (this._viewUI.iq_slider.value - this.tempZhiLi);
                    }
                    else if (this._viewUI.iq_slider.value < this.tempZhiLi) {
                        //向左拖动滑动条，临时潜力点增加 公式：当前临时潜力点 + （临时分配属性点-滑动条当前值）
                        this.tempQianliNum += (this.tempZhiLi - this._viewUI.iq_slider.value);
                    }
                    this.tempZhiLi = this._viewUI.iq_slider.value;
                    this._viewUI.zhili_tet.text = this.tempZhiLi.toString();
                    this.zhiliNum = this._viewUI.iq_slider.value - this.currentZhiLi; //智力加点 公式：滑动条当前值 - 已分配属性点
                    this._viewUI.qianli_tet.text = this.tempQianliNum.toString(); //当前潜力
                    if (this.zhiliNum == 0) {
                        this._viewUI.zhiliNum_tet.text = "";
                    }
                    else {
                        this._viewUI.zhiliNum_tet.text = "+" + this.zhiliNum;
                    }
                    this.renderBtn();
                    this.preview();
                };
                /**滑动耐力栏  */
                RoleJiadianMediator.prototype.changevalueNaili = function () {
                    if (this.iswash == 1) {
                        return;
                    }
                    //下限
                    if (this._viewUI.endu_slider.value < this.currentNaiLi) {
                        this._viewUI.endu_slider.value = this.currentNaiLi;
                    }
                    //上限
                    if (this._viewUI.endu_slider.value > this.currentNaiLi + this.tempQianliNum + this.nailiNum) {
                        this._viewUI.endu_slider.value = this.currentNaiLi + this.tempQianliNum + this.nailiNum;
                    }
                    //已分配属性长度 公式：（滑动条当前值 - 等级）/（等级 * 人物升级获得属性点 ） * 滑动条宽度
                    this._viewUI.endu_img.width = (this._viewUI.endu_slider.value - HudModel.getInstance().levelNum) / (HudModel.getInstance().levelNum * RoleEnum.SHUING_POINT) * RoleEnum.SLIDER_WIDTH;
                    //临时潜力点
                    if (this._viewUI.endu_slider.value > this.tempNaiLi) {
                        //向右拖动滑动条，临时潜力点减少 公式：当前临时潜力点- （滑动条当前值-临时分配属性点）
                        this.tempQianliNum -= (this._viewUI.endu_slider.value - this.tempNaiLi);
                    }
                    else if (this._viewUI.endu_slider.value < this.tempNaiLi) {
                        //向左拖动滑动条，临时潜力点增加 公式：当前临时潜力点 + （临时分配属性点-滑动条当前值）
                        this.tempQianliNum += (this.tempNaiLi - this._viewUI.endu_slider.value);
                    }
                    this.tempNaiLi = this._viewUI.endu_slider.value;
                    this._viewUI.naili_tet.text = this.tempNaiLi.toString();
                    this.nailiNum = this._viewUI.endu_slider.value - this.currentNaiLi; //耐力加点 公式：滑动条当前值 - 已分配属性点
                    this._viewUI.qianli_tet.text = this.tempQianliNum.toString(); //当前潜力
                    if (this.nailiNum == 0) {
                        this._viewUI.nailiNum_tet.text = "";
                    }
                    else {
                        this._viewUI.nailiNum_tet.text = "+" + this.nailiNum;
                    }
                    this.renderBtn();
                    this.preview();
                };
                RoleJiadianMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.initShuxing();
                    this.initPoint();
                    this.key = true;
                };
                RoleJiadianMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.key = false;
                };
                RoleJiadianMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                RoleJiadianMediator.prototype.showXidian = function () {
                    this._RoleResetAttrMediator.show();
                    modules.ModuleManager.hide(modules.ModuleNames.ROLE_Info);
                };
                /**关闭方案列表 */
                RoleJiadianMediator.prototype.hideFangan = function () {
                    this._viewUI.fangan_box.visible = false;
                    this._viewUI.yincang_box.visible = false;
                };
                /**显示方案列表 */
                RoleJiadianMediator.prototype.shouFangan = function () {
                    this._viewUI.fangan_box.visible = true;
                    this._viewUI.yincang_box.visible = true;
                    this.getListData();
                };
                /**初始化方案列表 */
                RoleJiadianMediator.prototype.getListData = function () {
                    this._viewUI.fangan_list.vScrollBarSkin = "";
                    this._viewUI.fangan_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.fangan_list.scrollBar.elasticDistance = 50;
                    this._viewUI.fangan_list.repeatY = this.arr.length;
                    this._viewUI.fangan_list.array = this.arr;
                    this._viewUI.fangan_list.renderHandler = new Handler(this, this.onRender);
                    this._viewUI.fangan_list.selectHandler = new Handler(this, this.onSelect);
                    this._viewUI.fangan_list.selectedIndex = -1;
                };
                /**处理方案列表点击 */
                RoleJiadianMediator.prototype.onSelect = function (index) {
                    if (index != -1) {
                        this.selectNum = index;
                        var btn = this._viewUI.fangan_list.getCell(index).getChildByName("fangan");
                        //如果点击的是未开启方案，关闭方案列表
                        if (this.resNum < index + 1) {
                            this._viewUI.fangan_box.visible = false;
                            return;
                        }
                        var data = roleinfo.models.RoleInfoModel.getInstance().SRefreshPointTypeData.get("data");
                        if (data != null) {
                            this._viewUI.tizhi_tet.text = HudModel.getInstance().levelNum + data.bfp["cons_save"].get(index + 1); //体质
                            this._viewUI.liliang_tet.text = HudModel.getInstance().levelNum + data.bfp["str_save"].get(index + 1); //力量
                            this._viewUI.minjie_tet.text = HudModel.getInstance().levelNum + data.bfp["agi_save"].get(index + 1); //敏捷
                            this._viewUI.zhili_tet.text = HudModel.getInstance().levelNum + data.bfp["iq_save"].get(index + 1); //智力
                            this._viewUI.naili_tet.text = HudModel.getInstance().levelNum + data.bfp["endu_save"].get(index + 1); //耐力
                            this.currentTiZhi = HudModel.getInstance().levelNum + data.bfp["cons_save"].get(index + 1); //目前体质
                            this.currentLiLiang = HudModel.getInstance().levelNum + data.bfp["str_save"].get(index + 1); //目前力量
                            this.currentMinJie = HudModel.getInstance().levelNum + data.bfp["agi_save"].get(index + 1); //目前敏捷
                            this.currentZhiLi = HudModel.getInstance().levelNum + data.bfp["iq_save"].get(index + 1); //目前智力
                            this.currentNaiLi = HudModel.getInstance().levelNum + data.bfp["endu_save"].get(index + 1); //目前耐力
                            this.allocaTiZhi = data.bfp["cons_save"].get(index + 1); //已分配体质
                            this.allocaLiLiang = data.bfp["str_save"].get(index + 1); //已分配力量
                            this.allocaMinJie = data.bfp["agi_save"].get(index + 1); //已分配敏捷
                            this.allocaZhiLi = data.bfp["iq_save"].get(index + 1); //已分配智力
                            this.allocaNaiLi = data.bfp["endu_save"].get(index + 1); //已分配耐力
                            this.tempQianliNum = data.point.get(index + 1); //潜力
                        }
                        else {
                            this._viewUI.tizhi_tet.text = HudModel.getInstance().levelNum + this.myData.bfp["cons_save"].get(index + 1); //体质
                            this._viewUI.liliang_tet.text = HudModel.getInstance().levelNum + this.myData.bfp["str_save"].get(index + 1); //力量
                            this._viewUI.minjie_tet.text = HudModel.getInstance().levelNum + this.myData.bfp["agi_save"].get(index + 1); //敏捷
                            this._viewUI.zhili_tet.text = HudModel.getInstance().levelNum + this.myData.bfp["iq_save"].get(index + 1); //智力
                            this._viewUI.naili_tet.text = HudModel.getInstance().levelNum + this.myData.bfp["endu_save"].get(index + 1); //耐力
                            this.currentTiZhi = HudModel.getInstance().levelNum + this.myData.bfp["cons_save"].get(index + 1); //目前体质
                            this.currentLiLiang = HudModel.getInstance().levelNum + this.myData.bfp["str_save"].get(index + 1); //目前力量
                            this.currentMinJie = HudModel.getInstance().levelNum + this.myData.bfp["agi_save"].get(index + 1); //目前敏捷
                            this.currentZhiLi = HudModel.getInstance().levelNum + this.myData.bfp["iq_save"].get(index + 1); //目前智力
                            this.currentNaiLi = HudModel.getInstance().levelNum + this.myData.bfp["endu_save"].get(index + 1); //目前耐力
                            this.allocaTiZhi = this.myData.bfp["cons_save"].get(index + 1); //已分配体质
                            this.allocaLiLiang = this.myData.bfp["str_save"].get(index + 1); //已分配力量
                            this.allocaMinJie = this.myData.bfp["agi_save"].get(index + 1); //已分配敏捷
                            this.allocaZhiLi = this.myData.bfp["iq_save"].get(index + 1); //已分配智力
                            this.allocaNaiLi = this.myData.bfp["endu_save"].get(index + 1); //已分配耐力
                            this.tempQianliNum = this.myData.point.get(index + 1); //潜力
                        }
                        if (this.currentPointscheme != index + 1) {
                            //当前选中方案为未开启方案
                            this._disableUI(index);
                        }
                        else {
                            //当前选中方案为已开启方案
                            this._enableUI();
                        }
                        this._viewUI.fangan_btn.label = roleinfo.models.RoleInfoModel.chineseStr.fangan + (index + 1); //加点方案
                        this.hideFangan();
                        this.tizhiNum = 0;
                        this.liliangNum = 0;
                        this.minjieNum = 0;
                        this.zhiliNum = 0;
                        this.nailiNum = 0;
                        this._viewUI.tizhiNum_tet.text = "";
                        this._viewUI.liliangNum_tet.text = "";
                        this._viewUI.minjieNum_tet.text = "";
                        this._viewUI.zhiliNum_tet.text = "";
                        this._viewUI.nailiNum_tet.text = "";
                        this._viewUI.jianTizhi_btn.skin = "common/ui/roleinfo/renwu_jianhao2.png";
                        this._viewUI.jianLiliang_btn.skin = "common/ui/roleinfo/renwu_jianhao2.png";
                        this._viewUI.jianMinjie_btn.skin = "common/ui/roleinfo/renwu_jianhao2.png";
                        this._viewUI.jianZhili_btn.skin = "common/ui/roleinfo/renwu_jianhao2.png";
                        this._viewUI.jianNaili_btn.skin = "common/ui/roleinfo/renwu_jianhao2.png";
                        this._viewUI.queding_btn.disabled = true;
                        this._viewUI.addlift_lab.text = "";
                        this._viewUI.addattack_lab.text = "";
                        this._viewUI.addspeed_lab.text = "";
                        this._viewUI.addmagic_lab.text = "";
                        this._viewUI.addmagicatt_lab.text = "";
                        this._viewUI.addattdefen_lab.text = "";
                        this._viewUI.addmagicdef_lab.text = "";
                        if (this.resNum > 1) {
                            this.initUiNum();
                            this.updateShuxing();
                        }
                        this._viewUI.fangan_list.selectedIndex = -1;
                    }
                };
                /** 设置部分ui不可选择
                 * @param index fanganlist选择方案
                */
                RoleJiadianMediator.prototype._disableUI = function (index) {
                    this._viewUI.currentFangan_box.visible = false;
                    this._viewUI.xinFangan_box.visible = true;
                    this._viewUI.xinQianli_tet.text = this.point.get(index + 1);
                    this.iswash = 1;
                    this._viewUI.py_slider.mouseEnabled = false;
                    this._viewUI.iq_slider.mouseEnabled = false;
                    this._viewUI.str_slider.mouseEnabled = false;
                    this._viewUI.endu_slider.mouseEnabled = false;
                    this._viewUI.speed_slider.mouseEnabled = false;
                    this._viewUI.jiaTizhi_btn.mouseEnabled = false;
                    this._viewUI.jiaLiliang_btn.mouseEnabled = false;
                    this._viewUI.jiaMinjie_btn.mouseEnabled = false;
                    this._viewUI.jiaZhili_btn.mouseEnabled = false;
                    this._viewUI.jiaNaili_btn.mouseEnabled = false;
                };
                /** 设置UI可选择 */
                RoleJiadianMediator.prototype._enableUI = function () {
                    this._viewUI.currentFangan_box.visible = true;
                    this._viewUI.xinFangan_box.visible = false;
                    this.iswash = 0;
                    this._viewUI.py_slider.mouseEnabled = true;
                    this._viewUI.iq_slider.mouseEnabled = true;
                    this._viewUI.str_slider.mouseEnabled = true;
                    this._viewUI.endu_slider.mouseEnabled = true;
                    this._viewUI.speed_slider.mouseEnabled = true;
                    this._viewUI.jiaTizhi_btn.mouseEnabled = true;
                    this._viewUI.jiaLiliang_btn.mouseEnabled = true;
                    this._viewUI.jiaMinjie_btn.mouseEnabled = true;
                    this._viewUI.jiaZhili_btn.mouseEnabled = true;
                    this._viewUI.jiaNaili_btn.mouseEnabled = true;
                };
                /**渲染方案列表 */
                RoleJiadianMediator.prototype.onRender = function (cell, index) {
                    if (index > this.arr.length)
                        return;
                    var nameLab = cell.getChildByName("fangan");
                    nameLab.skin = "common/ui/tongyong/huangdi60.png";
                    nameLab.label = this.arr[index];
                    //如果是未开启方案，显示为灰色
                    if (this.resNum < index + 1) {
                        nameLab.skin = "common/ui/tongyong/hui63.png";
                        nameLab.label = roleinfo.models.RoleInfoModel.chineseStr.unlock_level;
                    }
                };
                /**确认切换方案 */
                RoleJiadianMediator.prototype.okTips = function () {
                    if (this.key) {
                        //如果银币不够
                        if (this.needMoney > HudModel.getInstance().sliverNum) {
                            var duihuanMoney = this.needMoney - HudModel.getInstance().sliverNum; //需要兑换的钱
                            this._JinBiBuZuViewMediator.onShow(false, duihuanMoney.toString(), Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI).toString(), Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI).toString());
                            this._JinBiBuZuViewMediator.once(modules.commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
                            this._JinBiBuZuViewMediator.once(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
                            this._JinBiBuZuViewMediator.once(modules.commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.jinbiDuihuan);
                        }
                        else
                            RequesterProtocols._instance.c2s_CChangePointScheme(this.selectNum + 1); //客户端请求切换加点方案
                    }
                };
                /**金币兑换银币成功 */
                RoleJiadianMediator.prototype.jinbiDuihuan = function () {
                    //金币数量足够兑换银币，直接切换方案
                    RequesterProtocols._instance.c2s_CChangePointScheme(this.selectNum + 1); //客户端请求切换加点方案
                };
                /**仙晶兑换 */
                RoleJiadianMediator.prototype.goCharge = function (yuanbao) {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
                    //如果元宝不够
                    if (fuShiNum < yuanbao) {
                        this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._apps);
                        this._TipsMessageMediator.show();
                        var param = new Dictionary();
                        param.set("contentId", RoleEnum.XIANJIN_TIP);
                        this._TipsMessageMediator.showContent(param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        RequesterProtocols._instance.c2s_exchange_currency(3, 2, yuanbao);
                    }
                };
                /**通过元宝购买物品 */
                RoleJiadianMediator.prototype.buySliverFromYuanBao = function (yuanbao) {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
                    //如果元宝不够
                    if (fuShiNum < yuanbao) {
                        this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._apps);
                        this._TipsMessageMediator.show();
                        var param = new Dictionary();
                        param.set("contentId", RoleEnum.XIANJIN_TIP);
                        this._TipsMessageMediator.showContent(param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        RequesterProtocols._instance.c2s_exchange_currency(3, 1, yuanbao);
                        //元宝数量足够兑换银币，直接切换方案
                        RequesterProtocols._instance.c2s_CChangePointScheme(this.selectNum + 1); //客户端请求切换加点方案
                    }
                };
                /**充值 */
                RoleJiadianMediator.prototype.goRecharge = function () {
                    this._JinBiBuZuViewMediator.hide();
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, RoleInfoModel.getInstance().appBase);
                    game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge); //前往充值界面。关闭当前界
                };
                /**返回人物切换加点方案次数 */
                RoleJiadianMediator.prototype.onReqPointSchemeTime = function (e) {
                    var data = roleinfo.models.RoleInfoModel.getInstance().SReqPointSchemeTimeData.get("data");
                    var param = new Dictionary();
                    var jiadianObj = RoleInfoModel.getInstance().CaddpointchangeDic;
                    var qiehuanNum = data.schemetimes + 1; //加点方案切换次数
                    //切换次数大于5次，当成5
                    if (qiehuanNum > 5)
                        qiehuanNum = 5;
                    //schemetimes为切换次数，0代表当日首次切换方案
                    if (data.schemetimes == 0) {
                        param.set("contentId", RoleEnum.FIRST_SWITCH);
                    }
                    else {
                        this.needMoney = jiadianObj[qiehuanNum]["consume"];
                        var arr = [this.needMoney];
                        param.set("contentId", RoleEnum.SWITCH_TIP);
                        param.set("parame", arr);
                    }
                    this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._apps);
                    this._TipsMessageMediator.show();
                    this._TipsMessageMediator.showContent(param);
                    modules.tips.models.TipsProxy.getInstance().once(modules.tips.models.TIPS_ON_OK, this, this.okTips);
                };
                /**开启新方案 */
                RoleJiadianMediator.prototype.kaiFangan = function () {
                    RequesterProtocols._instance.c2s_CReqPointSchemeTime(); //请求人物切换加点方案次数
                };
                /**加点 */
                RoleJiadianMediator.prototype.jiaDian = function () {
                    //客户端请求加点
                    var cons;
                    var iq;
                    var str;
                    var agi;
                    var endu;
                    cons = this.tizhiNum; //体质
                    iq = this.zhiliNum; //智力
                    str = this.liliangNum; //力量
                    agi = this.minjieNum; //敏捷
                    endu = this.nailiNum; //耐力
                    RequesterProtocols._instance.c2s_CAddPointToAttr(cons, iq, str, agi, endu); //客户端请求属性加点
                };
                /**预览属性加成
                 * 公式：属性加点 * 一级属性转化表中影响到的对应属性
                 * 比如 1体质 = 8生命，最大生命 = 体质加点 * 8
                 */
                RoleJiadianMediator.prototype.preview = function () {
                    var data = RoleInfoModel.getInstance().CAttrModDataBinDic;
                    if (this.tizhiNum == 0) {
                        this._viewUI.addlift_lab.text = "";
                        this._viewUI.addspeed_lab.text = "";
                        this._viewUI.addmagicdef_lab.text = "";
                    }
                    if (this.liliangNum == 0) {
                        this._viewUI.addattack_lab.text = "";
                        this._viewUI.addspeed_lab.text = "";
                        this._viewUI.addmagicdef_lab.text = "";
                    }
                    if (this.minjieNum == 0) {
                        this._viewUI.addspeed_lab.text = "";
                    }
                    if (this.zhiliNum == 0) {
                        this._viewUI.addmagic_lab.text = "";
                        this._viewUI.addmagicatt_lab.text = "";
                        this._viewUI.addmagicdef_lab.text = "";
                    }
                    if (this.nailiNum == 0) {
                        this._viewUI.addattdefen_lab.text = "";
                        this._viewUI.addspeed_lab.text = "";
                        this._viewUI.addmagicdef_lab.text = "";
                    }
                    if (this.tizhiNum > 0) {
                        this._viewUI.addlift_lab.text = "+" + data[shuxing.MAX_HP]["consfactor"] * this.tizhiNum; //最大生命 
                    }
                    if (this.liliangNum > 0) {
                        this._viewUI.addattack_lab.text = "+" + data[shuxing.ATTACK]["strfactor"] * this.liliangNum; //物攻
                    }
                    if (this.zhiliNum > 0) {
                        this._viewUI.addmagic_lab.text = "+" + data[shuxing.MAX_MP]["iqfactor"] * this.zhiliNum; //最大法力
                        this._viewUI.addmagicatt_lab.text = "+" + data[shuxing.MAGIC_ATTACK]["iqfactor"] * this.zhiliNum; //法攻
                    }
                    if (this.nailiNum > 0) {
                        this._viewUI.addattdefen_lab.text = "+" + Math.floor(data[shuxing.DEFEND]["endufactor"] * this.nailiNum); //物防
                    }
                    this._viewUI.addspeed_lab.text = "+" + (Math.floor(data[shuxing.SPEED]["consfactor"] * this.tizhiNum) + Math.floor(data[shuxing.SPEED]["strfactor"] * this.liliangNum) + Math.floor(data[shuxing.SPEED]["endufactor"] * this.nailiNum) + Math.floor(data[shuxing.SPEED]["agifactor"] * this.minjieNum)); //速度
                    this._viewUI.addmagicdef_lab.text = "+" + (Math.floor(data[shuxing.MAGIC_DEF]["consfactor"] * this.tizhiNum) + Math.floor(data[shuxing.MAGIC_DEF]["strfactor"] * this.liliangNum) + Math.floor(data[shuxing.MAGIC_DEF]["iqfactor"] * this.zhiliNum) + Math.floor(data[shuxing.MAGIC_DEF]["endufactor"] * this.nailiNum)); //法防
                    //如果加成值为0，不显示
                    if (this._viewUI.addlift_lab.text == "+0")
                        this._viewUI.addlift_lab.text = "";
                    if (this._viewUI.addattack_lab.text == "+0")
                        this._viewUI.addattack_lab.text = "";
                    if (this._viewUI.addspeed_lab.text == "+0")
                        this._viewUI.addspeed_lab.text = "";
                    if (this._viewUI.addmagic_lab.text == "+0")
                        this._viewUI.addmagic_lab.text = "";
                    if (this._viewUI.addmagicatt_lab.text == "+0")
                        this._viewUI.addmagicatt_lab.text = "";
                    if (this._viewUI.addattdefen_lab.text == "+0")
                        this._viewUI.addattdefen_lab.text = "";
                    if (this._viewUI.addmagicdef_lab.text == "+0")
                        this._viewUI.addmagicdef_lab.text = "";
                };
                /**根据方案刷新面板属性
                 * 公式：已分配属性点 * 一级属性转化表中影响到的对应属性 + 人物基础属性
                 */
                RoleJiadianMediator.prototype.updateShuxing = function () {
                    var data = RoleInfoModel.getInstance().CAttrModDataBinDic;
                    if (this.currentTiZhi > 0) {
                        this._viewUI.hp_tet.text = "" + (data[shuxing.MAX_HP]["consfactor"] * this.currentTiZhi + RoleEnum.BASIC_LIFE); //最大生命
                    }
                    if (this.currentLiLiang > 0) {
                        this._viewUI.damage_tet.text = "" + (data[shuxing.ATTACK]["strfactor"] * this.currentLiLiang + RoleEnum.BASIC_ATTACK); //物攻
                    }
                    if (this.currentZhiLi > 0) {
                        this._viewUI.mp_tet.text = "" + (data[shuxing.MAX_MP]["iqfactor"] * this.currentZhiLi + RoleEnum.BASIC_MP); //最大法力
                        this._viewUI.magicattack_tet.text = "" + (data[shuxing.MAGIC_ATTACK]["iqfactor"] * this.currentZhiLi + RoleEnum.BASIC_MAGIC_ATTACK); //法攻
                    }
                    if (this.currentNaiLi > 0) {
                        this._viewUI.defend_tet.text = "" + Math.floor(data[shuxing.DEFEND]["endufactor"] * this.currentNaiLi + RoleEnum.BASIC_DEFEND); //物防
                    }
                    this._viewUI.speed_tet.text = "" + (Math.floor(data[shuxing.SPEED]["consfactor"] * this.currentTiZhi) + Math.floor(data[shuxing.SPEED]["strfactor"] * this.currentLiLiang) + Math.floor(data[shuxing.SPEED]["endufactor"] * this.currentNaiLi) + Math.floor(data[shuxing.SPEED]["agifactor"] * this.currentMinJie) + RoleEnum.BASIC_SPEED); //速度
                    this._viewUI.magicdef_tet.text = "" + (Math.floor(data[shuxing.MAGIC_DEF]["consfactor"] * this.currentTiZhi) + Math.floor(data[shuxing.MAGIC_DEF]["strfactor"] * this.currentLiLiang) + Math.floor(data[shuxing.MAGIC_DEF]["iqfactor"] * this.currentZhiLi) + Math.floor(data[shuxing.MAGIC_DEF]["endufactor"] * this.currentNaiLi) + RoleEnum.BASIC_MAGIC_DEF); //法防
                };
                /**渲染按钮状态 */
                RoleJiadianMediator.prototype.renderBtn = function () {
                    //潜力点为0
                    if (this.tempQianliNum == 0) {
                        this._viewUI.jiaTizhi_btn.skin = "common/ui/roleinfo/renwu_jiahao2.png";
                        this._viewUI.jiaLiliang_btn.skin = "common/ui/roleinfo/renwu_jiahao2.png";
                        this._viewUI.jiaMinjie_btn.skin = "common/ui/roleinfo/renwu_jiahao2.png";
                        this._viewUI.jiaZhili_btn.skin = "common/ui/roleinfo/renwu_jiahao2.png";
                        this._viewUI.jiaNaili_btn.skin = "common/ui/roleinfo/renwu_jiahao2.png";
                    }
                    if (this.tempQianliNum > 0) {
                        this._viewUI.jiaTizhi_btn.skin = "common/ui/roleinfo/renwu_jiahao1.png";
                        this._viewUI.jiaLiliang_btn.skin = "common/ui/roleinfo/renwu_jiahao1.png";
                        this._viewUI.jiaMinjie_btn.skin = "common/ui/roleinfo/renwu_jiahao1.png";
                        this._viewUI.jiaZhili_btn.skin = "common/ui/roleinfo/renwu_jiahao1.png";
                        this._viewUI.jiaNaili_btn.skin = "common/ui/roleinfo/renwu_jiahao1.png";
                    }
                    if (this.tizhiNum > 0 || this.liliangNum > 0 || this.minjieNum > 0 || this.zhiliNum > 0 || this.nailiNum > 0) {
                        this._viewUI.queding_btn.disabled = false;
                        if (this.tizhiNum > 0)
                            this._viewUI.jianTizhi_btn.skin = "common/ui/roleinfo/renwu_jianhao1.png";
                        if (this.liliangNum > 0)
                            this._viewUI.jianLiliang_btn.skin = "common/ui/roleinfo/renwu_jianhao1.png";
                        if (this.minjieNum > 0)
                            this._viewUI.jianMinjie_btn.skin = "common/ui/roleinfo/renwu_jianhao1.png";
                        if (this.zhiliNum > 0)
                            this._viewUI.jianZhili_btn.skin = "common/ui/roleinfo/renwu_jianhao1.png";
                        if (this.nailiNum > 0)
                            this._viewUI.jianNaili_btn.skin = "common/ui/roleinfo/renwu_jianhao1.png";
                    }
                    //没有分配任何属性点，确认按钮不可点击
                    if (this.tizhiNum == 0 && this.liliangNum == 0 && this.minjieNum == 0 && this.zhiliNum == 0 && this.nailiNum == 0) {
                        this._viewUI.queding_btn.disabled = true;
                    }
                    //没有分配属性，对应的减属性按钮颜色为灰色
                    if (this.tizhiNum == 0 || this.liliangNum == 0 || this.minjieNum == 0 || this.zhiliNum == 0 || this.nailiNum == 0) {
                        if (this.tizhiNum == 0)
                            this._viewUI.jianTizhi_btn.skin = "common/ui/roleinfo/renwu_jianhao2.png";
                        if (this.liliangNum == 0)
                            this._viewUI.jianLiliang_btn.skin = "common/ui/roleinfo/renwu_jianhao2.png";
                        if (this.minjieNum == 0)
                            this._viewUI.jianMinjie_btn.skin = "common/ui/roleinfo/renwu_jianhao2.png";
                        if (this.zhiliNum == 0)
                            this._viewUI.jianZhili_btn.skin = "common/ui/roleinfo/renwu_jianhao2.png";
                        if (this.nailiNum == 0)
                            this._viewUI.jianNaili_btn.skin = "common/ui/roleinfo/renwu_jianhao2.png";
                    }
                };
                /**体质加 */
                RoleJiadianMediator.prototype.jiaTizhi = function () {
                    //如果有可分配潜力点
                    if (this.tempQianliNum > 0) {
                        this.tempTiZhi++;
                        this._viewUI.tizhi_tet.text = this.tempTiZhi.toString();
                        this.tizhiNum++;
                        this._viewUI.tizhiNum_tet.text = "+" + this.tizhiNum;
                        this.tempQianliNum--;
                        this._viewUI.qianli_tet.text = this.tempQianliNum.toString();
                        this.renderBtn();
                        this.preview();
                        this._viewUI.py_slider.value++;
                    }
                };
                /**力量加 */
                RoleJiadianMediator.prototype.jiaLiliang = function () {
                    //如果有可分配潜力点
                    if (this.tempQianliNum > 0) {
                        this.tempLiLiang++;
                        this._viewUI.liliang_tet.text = this.tempLiLiang.toString();
                        this.liliangNum++;
                        this._viewUI.liliangNum_tet.text = "+" + this.liliangNum;
                        this.tempQianliNum--;
                        this._viewUI.qianli_tet.text = this.tempQianliNum.toString();
                        this.renderBtn();
                        this.preview();
                        this._viewUI.str_slider.value++;
                    }
                };
                /**敏捷加 */
                RoleJiadianMediator.prototype.jiaMinjie = function () {
                    //如果有可分配潜力点
                    if (this.tempQianliNum > 0) {
                        this.tempMinJie++;
                        this._viewUI.minjie_tet.text = this.tempMinJie.toString();
                        this.minjieNum++;
                        this._viewUI.minjieNum_tet.text = "+" + this.minjieNum;
                        this.tempQianliNum--;
                        this._viewUI.qianli_tet.text = this.tempQianliNum.toString();
                        this.renderBtn();
                        this.preview();
                        this._viewUI.speed_slider.value++;
                    }
                };
                /**智力加 */
                RoleJiadianMediator.prototype.jiaZhili = function () {
                    //如果有可分配潜力点
                    if (this.tempQianliNum > 0) {
                        this.tempZhiLi++;
                        this._viewUI.zhili_tet.text = this.tempZhiLi.toString();
                        this.zhiliNum++;
                        this._viewUI.zhiliNum_tet.text = "+" + this.zhiliNum;
                        this.tempQianliNum--;
                        this._viewUI.qianli_tet.text = this.tempQianliNum.toString();
                        this.renderBtn();
                        this.preview();
                        this._viewUI.iq_slider.value++;
                    }
                };
                /**耐力加 */
                RoleJiadianMediator.prototype.jiaNaili = function () {
                    //如果有可分配潜力点
                    if (this.tempQianliNum > 0) {
                        this.tempNaiLi++;
                        this._viewUI.naili_tet.text = this.tempNaiLi.toString();
                        this.nailiNum++;
                        this._viewUI.nailiNum_tet.text = "+" + this.nailiNum;
                        this.tempQianliNum--;
                        this._viewUI.qianli_tet.text = this.tempQianliNum.toString();
                        this.renderBtn();
                        this.preview();
                        this._viewUI.endu_slider.value++;
                    }
                };
                /**体质减 */
                RoleJiadianMediator.prototype.jianTizhi = function () {
                    //如果有已分配的属性点
                    if (this.tizhiNum > 0) {
                        this.tempTiZhi--;
                        this._viewUI.tizhi_tet.text = this.tempTiZhi.toString();
                        this.tizhiNum--;
                        if (this.tizhiNum == 0) {
                            this._viewUI.tizhiNum_tet.text = "";
                        }
                        else {
                            this._viewUI.tizhiNum_tet.text = "+" + this.tizhiNum;
                        }
                        this.tempQianliNum++;
                        this._viewUI.qianli_tet.text = this.tempQianliNum.toString();
                        this.renderBtn();
                        this.preview();
                        this._viewUI.py_slider.value--;
                    }
                };
                /**力量减 */
                RoleJiadianMediator.prototype.jianLiliang = function () {
                    //如果有已分配的属性点
                    if (this.liliangNum > 0) {
                        this.tempLiLiang--;
                        this._viewUI.liliang_tet.text = this.tempLiLiang.toString();
                        this.liliangNum--;
                        if (this.liliangNum == 0) {
                            this._viewUI.liliangNum_tet.text = "";
                        }
                        else {
                            this._viewUI.liliangNum_tet.text = "+" + this.liliangNum;
                        }
                        this.tempQianliNum++;
                        this._viewUI.qianli_tet.text = this.tempQianliNum.toString();
                        this.renderBtn();
                        this.preview();
                        this._viewUI.str_slider.value--;
                    }
                };
                /**敏捷减 */
                RoleJiadianMediator.prototype.jianMinjie = function () {
                    //如果有已分配的属性点
                    if (this.minjieNum > 0) {
                        this.tempMinJie--;
                        this._viewUI.minjie_tet.text = this.tempMinJie.toString();
                        this.minjieNum--;
                        if (this.minjieNum == 0) {
                            this._viewUI.minjieNum_tet.text = "";
                        }
                        else {
                            this._viewUI.minjieNum_tet.text = "+" + this.minjieNum;
                        }
                        this.tempQianliNum++;
                        this._viewUI.qianli_tet.text = this.tempQianliNum.toString();
                        this.renderBtn();
                        this.preview();
                        this._viewUI.speed_slider.value--;
                    }
                };
                /**智力减 */
                RoleJiadianMediator.prototype.jianZhili = function () {
                    //如果有已分配的属性点
                    if (this.zhiliNum > 0) {
                        this.tempZhiLi--;
                        this._viewUI.zhili_tet.text = this.tempZhiLi.toString();
                        this.zhiliNum--;
                        if (this.zhiliNum == 0) {
                            this._viewUI.zhiliNum_tet.text = "";
                        }
                        else {
                            this._viewUI.zhiliNum_tet.text = "+" + this.zhiliNum;
                        }
                        this.tempQianliNum++;
                        this._viewUI.qianli_tet.text = this.tempQianliNum.toString();
                        this.renderBtn();
                        this.preview();
                        this._viewUI.iq_slider.value--;
                    }
                };
                /**耐力减 */
                RoleJiadianMediator.prototype.jianNaili = function () {
                    //如果有已分配的属性点
                    if (this.nailiNum > 0) {
                        this.tempNaiLi--;
                        this._viewUI.naili_tet.text = this.tempNaiLi.toString();
                        this.nailiNum--;
                        if (this.nailiNum == 0) {
                            this._viewUI.nailiNum_tet.text = "";
                        }
                        else {
                            this._viewUI.nailiNum_tet.text = "+" + this.nailiNum;
                        }
                        this.tempQianliNum++;
                        this._viewUI.qianli_tet.text = this.tempQianliNum.toString();
                        this.renderBtn();
                        this.preview();
                        this._viewUI.endu_slider.value--;
                    }
                };
                return RoleJiadianMediator;
            }(game.modules.UiMediator));
            roleinfo.RoleJiadianMediator = RoleJiadianMediator;
        })(roleinfo = modules.roleinfo || (modules.roleinfo = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleJiadianMediator.js.map