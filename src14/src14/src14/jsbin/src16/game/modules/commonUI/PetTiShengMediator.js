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
        var commonUI;
        (function (commonUI) {
            /** 神兽提升 */
            var PetTiShengMediator = /** @class */ (function (_super) {
                __extends(PetTiShengMediator, _super);
                function PetTiShengMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 神兽列表被选中的索引 */
                    _this.shenshouSelectedIndex = -1;
                    _this._viewUI = new ui.common.PetTiShengUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.itemicon_img.skin = "common/icon/item/20073.png";
                    _this._viewUI.itemname_lab.text = BagModel.getInstance().itemAttrData[101422]["name"];
                    _this._viewUI.need_lab.text = "20"; //写死的，不知道从哪个配置表取数据
                    _this.shenshouDic = new Laya.Dictionary();
                    _this.needLevelDic = new Laya.Dictionary();
                    _this._petAttrData = PetModel.getInstance().petCPetAttrData; //宠物数据表
                    _this._shapeCpnfig = modules.createrole.models.LoginModel.getInstance().cnpcShapeInfo; //造型配置表
                    _this._shenshouIncConfig = PetModel.getInstance().petCPetShenShouIncdata; //神兽提升配置表
                    return _this;
                }
                PetTiShengMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.registEvent();
                    this.init(0); //此处填个0是写死默认选中神兽列表的第一位
                };
                /** 初始化 */
                PetTiShengMediator.prototype.init = function (index) {
                    if (!index && this.shenshouSelectedIndex != -1) {
                        index = this.shenshouSelectedIndex;
                    }
                    else {
                        index = 0;
                    }
                    //身上的神兽初始化
                    this.shenshouDic = PetModel.getInstance().getShenshouDatas();
                    if (this.shenshouDic.keys.length == 0) { //身上的神兽没有，弹出tips飘窗
                        var _tipsMsg = ChatModel.getInstance().chatMessageTips[162105]["msg"];
                        modules.chat.models.ChatProxy.getInstance().event(modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, _tipsMsg);
                        this.hide();
                        return;
                    }
                    //列表初始化
                    this.lstInit();
                    this.petLstSelect(index);
                    this._viewUI.pet_list.scrollTo(index);
                };
                /** 神兽列表初始化 */
                PetTiShengMediator.prototype.lstInit = function () {
                    this._viewUI.pet_list.vScrollBarSkin = "";
                    this._viewUI.pet_list.scrollBar.elasticBackTime = 100;
                    this._viewUI.pet_list.scrollBar.elasticDistance = 100;
                    this._viewUI.pet_list.array = this.shenshouDic.keys;
                    this._viewUI.pet_list.renderHandler = new Laya.Handler(this, this.petLstRender);
                    this._viewUI.pet_list.selectHandler = new Laya.Handler(this, this.petLstSelect);
                };
                /** 神兽列表点击 */
                PetTiShengMediator.prototype.petLstSelect = function (index) {
                    if (index == -1)
                        return;
                    var diTu_img = this._viewUI.pet_list.getCell(index).getChildByName("diTu_img");
                    diTu_img.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    if (this.shenshouSelectedImg) {
                        this.shenshouSelectedImg.skin = "common/ui/tongyong/common_list_3textbg.png";
                    }
                    this.shenshouSelectedIndex = index;
                    this.shenshouSelectedImg = diTu_img;
                    //神兽数值初始化
                    this.shenshouInfoInit(index);
                };
                /** 神兽部分信息的数值初始化 */
                PetTiShengMediator.prototype.shenshouInfoInit = function (index) {
                    var _shenshouKey = this.shenshouDic.keys[index];
                    var _shenshouInfo = this.shenshouDic.get(_shenshouKey);
                    if (_shenshouInfo.shenshouinccount == 3) {
                        this._viewUI.addgongji_lab.text = "+ 0";
                        this._viewUI.addfangyu_lab.text = "+ 0";
                        this._viewUI.addtili_lab.text = "+ 0";
                        this._viewUI.addfashu_lab.text = "+ 0";
                        this._viewUI.addspeed_lab.text = "+ 0";
                        this._viewUI.addchengzhang_lab.text = "+ 0";
                    }
                    this._viewUI.yitisheng_lab.text = _shenshouInfo.shenshouinccount.toString();
                    this._viewUI.shengyu_lab.text = (3 - _shenshouInfo.shenshouinccount).toString(); //神兽固定能提升3次
                    this._viewUI.oldgongji_lab.text = _shenshouInfo.attackapt.toString();
                    this._viewUI.oldfangyu_lab.text = _shenshouInfo.defendapt.toString();
                    this._viewUI.oldtili_lab.text = _shenshouInfo.phyforceapt.toString();
                    this._viewUI.oldfashu_lab.text = _shenshouInfo.magicapt.toString();
                    this._viewUI.oldspeed_lab.text = _shenshouInfo.speedapt.toString();
                    this._viewUI.oldchengzhang_lab.text = (_shenshouInfo.growrate / 1000).toString();
                    var needLevels = new Laya.Dictionary();
                    var _incKeys = Object.keys(this._shenshouIncConfig);
                    for (var i = 0; i < _incKeys.length; i++) {
                        var _inc = this._shenshouIncConfig[_incKeys[i]];
                        if (_inc.petid == _shenshouInfo.id) {
                            needLevels.set(_inc.inccount, _inc.inclv);
                            if ((_inc.inccount - 1) == _shenshouInfo.shenshouinccount) {
                                this._viewUI.addgongji_lab.text = "+" + _inc.atkinc.toString();
                                this._viewUI.addfangyu_lab.text = "+" + _inc.definc.toString();
                                this._viewUI.addtili_lab.text = "+" + _inc.hpinc.toString();
                                this._viewUI.addfashu_lab.text = "+" + _inc.mpinc.toString();
                                this._viewUI.addspeed_lab.text = "+" + _inc.spdinc.toString();
                                this._viewUI.addchengzhang_lab.text = "+" + (_inc.attinc / 1000).toString();
                            }
                        }
                    }
                    var _inclv1 = needLevels.get(1);
                    var _inclv2 = needLevels.get(2);
                    var _inclv3 = needLevels.get(3);
                    this._viewUI.tips_lab.text = "该神兽可在" + _inclv1 + "/" + _inclv2 + "/" + _inclv3 + "级提升";
                    this.needLevelDic.set(_shenshouKey, needLevels);
                    var _haveYaoHunYu = BagModel.getInstance().chargeItemNum(101422); //获取人物身上持有的妖魂玉的数量
                    this._viewUI.have_lab.text = _haveYaoHunYu.toString();
                };
                /** 神兽列表渲染 */
                PetTiShengMediator.prototype.petLstRender = function (cell, index) {
                    if (index == -1)
                        return;
                    var diTu_img = cell.getChildByName("diTu_img");
                    diTu_img.skin = "common/ui/tongyong/common_list_3textbg.png";
                    if (this.shenshouSelectedIndex == index) {
                        diTu_img.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    }
                    var peticon_img = cell.getChildByName("peticon_img");
                    var petQuality_img = cell.getChildByName("petQuality_img");
                    var zhenPin_img = cell.getChildByName("zhenPin_img");
                    zhenPin_img.visible = true; //神兽必定为珍品，直接写死显示珍品角标
                    var _shenshouKey = this.shenshouDic.keys[index];
                    var _shenshouInfo = this.shenshouDic.get(_shenshouKey);
                    var _shenshouid = _shenshouInfo.id;
                    var _shapeid = this._petAttrData[_shenshouid]["modelid"];
                    var _shenshouiconid = this._shapeCpnfig[_shapeid]["littleheadID"];
                    peticon_img.skin = "common/icon/avatarpet/" + _shenshouiconid + ".png";
                    petQuality_img.skin = modules.bag.BagSystemModule.getGameItemFrameColorResource(this._petAttrData[_shenshouid]["quality"]);
                    var petname_lab = cell.getChildByName("petname_lab");
                    var petlv_lab = cell.getChildByName("petlv_lab");
                    var skillcount_lab = cell.getChildByName("skillcount_lab");
                    petname_lab.text = _shenshouInfo.name;
                    petlv_lab.text = _shenshouInfo.level + "级";
                    skillcount_lab.text = _shenshouInfo.skills.length.toString();
                };
                /** 注册事件 */
                PetTiShengMediator.prototype.registEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.tisheng_btn.on(LEvent.MOUSE_DOWN, this, this.tisheng);
                    modules.pet.models.PetProxy.getInstance().on(modules.pet.models.SHENSHOU_INC_SUCCESS, this, this.init);
                };
                /** 神宠提升操作 */
                PetTiShengMediator.prototype.tisheng = function () {
                    //判断所要提升的宠物等级是否足够
                    var _shenshouKey = this.shenshouDic.keys[this.shenshouSelectedIndex];
                    var _shenshouInfo = this.shenshouDic.get(_shenshouKey);
                    var _needLevel = this.needLevelDic.get(_shenshouKey).get(_shenshouInfo.shenshouinccount + 1);
                    if (_shenshouInfo.level < _needLevel) {
                        var _str1 = ChatModel.getInstance().chatMessageTips["162107"]["msg"];
                        _str1 = _str1.replace("$parameter1$", _needLevel.toString());
                        game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, _str1);
                        return;
                    }
                    //判断提升所需的道具是否足够
                    var _haveNum = Number(this._viewUI.have_lab.text);
                    var _needNum = Number(this._viewUI.need_lab.text);
                    if (_haveNum < _needNum) { //身上所持有道具不足
                        var _str2 = ChatModel.getInstance().chatMessageTips["162094"]["msg"];
                        _str2 = _str2.replace("$parameter1$", this._viewUI.itemname_lab.text);
                        game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, _str2);
                        return;
                    }
                    RequesterProtocols._instance.c2s_shen_shouyangcheng(_shenshouKey);
                };
                /** 移除事件 */
                PetTiShengMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.tisheng_btn.off(LEvent.MOUSE_DOWN, this, this.tisheng);
                    modules.pet.models.PetProxy.getInstance().off(modules.pet.models.SHENSHOU_INC_SUCCESS, this, this.init);
                };
                PetTiShengMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.removeEvent();
                    this.shenshouSelectedImg = undefined;
                };
                PetTiShengMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return PetTiShengMediator;
            }(game.modules.UiMediator));
            commonUI.PetTiShengMediator = PetTiShengMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetTiShengMediator.js.map