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
* 选择洗练资质
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var PetSelcetZiZhiMediator = /** @class */ (function (_super) {
                __extends(PetSelcetZiZhiMediator, _super);
                function PetSelcetZiZhiMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**该资质是否满了*/
                    _this.isfull = [0, 0, 0, 0, 0];
                    _this._viewUI = new ui.common.PetSelcetZiZhiUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(_this._app);
                    return _this;
                }
                PetSelcetZiZhiMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
                    this._viewUI.sure_btn.clickHandler = new Laya.Handler(this, this.sureselect);
                    pet.models.PetProxy.getInstance().on(pet.models.REFRESHZIZHI_EVENT, this, this.refrezizhi);
                    this.initbasedata();
                };
                /**初始化数据*/
                PetSelcetZiZhiMediator.prototype.initbasedata = function () {
                    var data = [];
                    var petdata = PetModel.getInstance().petbasedata;
                    var allpetbase = PetModel.getInstance().petCPetAttrData[petdata.id];
                    var low;
                    var up;
                    //random(（最大资质-当前资质）*0.04~（最大资质-当前资质）*0.06) 体质
                    up = Math.floor((allpetbase.phyforceaptmax - petdata.phyforceapt) * 0.06 + 0.5);
                    low = Math.floor((allpetbase.phyforceaptmax - petdata.phyforceapt) * 0.04 + 0.5);
                    up = Math.min(Math.max(up, 1), allpetbase.phyforceaptmax);
                    low = Math.min(Math.max(low, 1), allpetbase.phyforceaptmax);
                    var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11419];
                    if (petdata.phyforceapt == allpetbase.phyforceaptmax) { //是否达到上限
                        data.push({ shuzhi_lab: petdata.phyforceapt + "(+" + 0 + ")", zizhiname_lab: chattext.msg });
                        this.isfull[0] = 0;
                    }
                    else if (up != low) { //是否达到上限
                        data.push({ shuzhi_lab: petdata.phyforceapt + "(+" + low + "~" + up + ")", zizhiname_lab: chattext.msg });
                        this.isfull[0] = 1;
                    }
                    else {
                        data.push({ shuzhi_lab: petdata.phyforceapt + "(+" + up + ")", zizhiname_lab: chattext.msg });
                        this.isfull[0] = 1;
                    }
                    //random(（最大资质-当前资质）*0.04~（最大资质-当前资质）*0.06) 速度
                    up = Math.floor((allpetbase.speedaptmax - petdata.speedapt) * 0.06 + 0.5);
                    low = Math.floor((allpetbase.speedaptmax - petdata.speedapt) * 0.04 + 0.5);
                    up = Math.min(Math.max(up, 1), allpetbase.speedaptmax);
                    low = Math.min(Math.max(low, 1), allpetbase.speedaptmax);
                    chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11421];
                    if (petdata.speedapt == allpetbase.speedaptmax) { //是否达到上限
                        data.push({ shuzhi_lab: petdata.speedapt + "(+" + 0 + ")", zizhiname_lab: chattext.msg });
                        this.isfull[1] = 0;
                    }
                    else if (up != low) { //是否达到上限
                        data.push({ shuzhi_lab: petdata.speedapt + "(+" + low + "~" + up + ")", zizhiname_lab: chattext.msg });
                        this.isfull[1] = 1;
                    }
                    else {
                        data.push({ shuzhi_lab: petdata.speedapt + "(+" + up + ")", zizhiname_lab: chattext.msg });
                        this.isfull[1] = 1;
                    }
                    //random(（最大资质-当前资质）*0.04~（最大资质-当前资质）*0.06) 攻击
                    up = Math.floor((allpetbase.attackaptmax - petdata.attackapt) * 0.06 + 0.5);
                    low = Math.floor((allpetbase.attackaptmax - petdata.attackapt) * 0.04 + 0.5);
                    up = Math.min(Math.max(up, 1), allpetbase.attackaptmax);
                    low = Math.min(Math.max(low, 1), allpetbase.attackaptmax);
                    chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11417];
                    if (petdata.attackapt == allpetbase.attackaptmax) { //是否达到上限
                        data.push({ shuzhi_lab: petdata.attackapt + "(+" + 0 + ")", zizhiname_lab: chattext.msg });
                        this.isfull[2] = 0;
                    }
                    else if (up != low) { //是否达到上限
                        data.push({ shuzhi_lab: petdata.attackapt + "(+" + low + "~" + up + ")", zizhiname_lab: chattext.msg });
                        this.isfull[2] = 1;
                    }
                    else {
                        data.push({ shuzhi_lab: petdata.attackapt + "(+" + up + ")", zizhiname_lab: chattext.msg });
                        this.isfull[2] = 1;
                    }
                    //random(（最大资质-当前资质）*0.04~（最大资质-当前资质）*0.06) 法术
                    up = Math.floor((allpetbase.magicaptmax - petdata.magicapt) * 0.06 + 0.5);
                    low = Math.floor((allpetbase.magicaptmax - petdata.magicapt) * 0.04 + 0.5);
                    up = Math.min(Math.max(up, 1), allpetbase.magicaptmax);
                    low = Math.min(Math.max(low, 1), allpetbase.magicaptmax);
                    chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11420];
                    if (petdata.magicapt == allpetbase.magicaptmax) { //是否达到上限
                        data.push({ shuzhi_lab: petdata.magicapt + "(+" + 0 + ")", zizhiname_lab: chattext.msg });
                        this.isfull[3] = 0;
                    }
                    else if (up != low) { //是否达到上限
                        data.push({ shuzhi_lab: petdata.magicapt + "(+" + low + "~" + up + ")", zizhiname_lab: chattext.msg });
                        this.isfull[3] = 1;
                    }
                    else {
                        data.push({ shuzhi_lab: petdata.magicapt + "(+" + up + ")", zizhiname_lab: chattext.msg });
                        this.isfull[3] = 1;
                    }
                    //random(（最大资质-当前资质）*0.04~（最大资质-当前资质）*0.06) 防御
                    up = Math.floor((allpetbase.defendaptmax - petdata.defendapt) * 0.06 + 0.5);
                    low = Math.floor((allpetbase.defendaptmax - petdata.defendapt) * 0.04 + 0.5);
                    up = Math.min(Math.max(up, 1), allpetbase.defendaptmax);
                    low = Math.min(Math.max(low, 1), allpetbase.defendaptmax);
                    chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11418];
                    if (petdata.defendapt == allpetbase.defendaptmax) { //是否达到上限
                        data.push({ shuzhi_lab: petdata.defendapt + "(+" + 0 + ")", zizhiname_lab: chattext.msg });
                        this.isfull[4] = 0;
                    }
                    else if (up != low) { //是否达到上限
                        data.push({ shuzhi_lab: petdata.defendapt + "(+" + low + "~" + up + ")", zizhiname_lab: chattext.msg });
                        this.isfull[4] = 1;
                    }
                    else {
                        data.push({ shuzhi_lab: petdata.defendapt + "(+" + up + ")", zizhiname_lab: chattext.msg });
                        this.isfull[4] = 1;
                    }
                    var str = "<span style='color:#50321a;fontSize:30;middle-align:center'>请选择</span><span style = 'color:#ee271c;fontSize:30;middle-align:center'>$NAME$</span><span style='color:#50321a;fontSize:30;middle-align:center'>要提升的资质</span>";
                    this._viewUI.zizhi_list.array = data;
                    this._viewUI.zizhi_list.selectHandler = new Laya.Handler(this, this.selectzizhi);
                    this._viewUI.petname_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, petdata.name, 10);
                };
                /**选中资质*/
                PetSelcetZiZhiMediator.prototype.selectzizhi = function (index) {
                    var data = [];
                    for (var index1 = 0; index1 < this._viewUI.zizhi_list.array.length; index1++) {
                        if (index == index1) //是否选中该资质
                            data.push({ diban_img: "common/ui/tongyong/common_list_3textbg2.png" });
                        else
                            data.push({ diban_img: "common/ui/tongyong/common_list_3textbg.png" });
                    }
                    this._viewUI.zizhi_list.array = data;
                };
                PetSelcetZiZhiMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                PetSelcetZiZhiMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**选择要增加的资质*/
                PetSelcetZiZhiMediator.prototype.sureselect = function () {
                    var bag = BagModel.getInstance().bagMap[1];
                    var itemkey = -1;
                    var petdata = game.modules.pet.models.PetModel.getInstance().petbasedata;
                    if (this._viewUI.zizhi_list.selectedIndex == -1) { //满资质时为-1
                        //请选择要提升的资质
                        this.tips.onShow("请选择要提升的资质");
                        return;
                    }
                    //资质是否满或者次数用完
                    if (this.isfull[this._viewUI.zizhi_list.selectedIndex] == 0) {
                        var text = void 0;
                        switch (this._viewUI.zizhi_list.selectedIndex) {
                            case 0:
                                text = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11126]; //体质
                                break;
                            case 1:
                                text = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11127]; //速度
                                break;
                            case 2:
                                text = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11128]; //攻击
                                break;
                            case 3:
                                text = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11129]; //法术
                                break;
                            case 4:
                                text = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11130]; //防御
                                break;
                            default:
                                break;
                        }
                        var arr = [];
                        var item = game.modules.bag.models.BagModel.getInstance().itemAttrData[109002];
                        arr.push(game.modules.pet.models.PetModel.getInstance().petbasedata.name);
                        arr.push(text.msg + "资质");
                        arr.push(item.name);
                        var str = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150069, arr);
                        this.tips.onShow(str);
                        return;
                    }
                    else if (petdata.aptaddcount == 10) {
                        var arr = [];
                        arr.push(game.modules.pet.models.PetModel.getInstance().petbasedata.name);
                        var str = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150071, arr);
                        this.tips.onShow(str);
                        return;
                    }
                    for (var index = 0; index < bag.items.length; index++) {
                        if (bag.items[index].id == 109002) { //是否该道具
                            itemkey = bag.items[index].key;
                            break;
                        }
                    }
                    if (itemkey == -1) { //道具不足
                        var buyinfo = game.modules.pet.models.PetModel.getInstance().cQuickBuyData[109002];
                        this.buykuaijie = new game.modules.commonUI.BuyKuaiJieMediator(this._app);
                        this.buykuaijie.init(buyinfo.goodsid); //商品ID
                        return;
                    }
                    var zizhiArr = [PetModel.zizhi.tizhi, PetModel.zizhi.speed, PetModel.zizhi.attack, PetModel.zizhi.magic, PetModel.zizhi.defence];
                    RequesterProtocols._instance.c2s_pet_aptitudecultivate(PetModel._instance.petbasedata.key, zizhiArr[this._viewUI.zizhi_list.selectedIndex], itemkey); //资质ID + 物品ID
                };
                /**重新刷新资质数值	*/
                PetSelcetZiZhiMediator.prototype.refrezizhi = function (e1, e2) {
                    this.initbasedata();
                    var text;
                    switch (e1) {
                        case 0:
                            text = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11126]; //体质
                            break;
                        case 1:
                            text = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11127]; //速度
                            break;
                        case 2:
                            text = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11128]; //攻击
                            break;
                        case 3:
                            text = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11129]; //法术
                            break;
                        case 4:
                            text = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11130]; //防御
                            break;
                        default:
                            break;
                    }
                    // let arr: Array<string> = []
                    // arr.push(text.msg)
                    // arr.push(e2.toString())
                    // let str: string = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150069, arr)
                    // this.tips.onShow(str)
                };
                return PetSelcetZiZhiMediator;
            }(game.modules.UiMediator));
            pet.PetSelcetZiZhiMediator = PetSelcetZiZhiMediator;
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetSelcetZiZhiMediator.js.map