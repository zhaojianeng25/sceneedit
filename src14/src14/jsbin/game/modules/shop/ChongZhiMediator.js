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
* 充值界面
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var shop;
        (function (shop) {
            var ChongZhiMediator = /** @class */ (function (_super) {
                __extends(ChongZhiMediator, _super);
                function ChongZhiMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    /** 服务器返回的充值列表信息 */
                    _this._goods = [];
                    _this._viewUI = new ui.common.ShopChongZhiUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this._viewUI.left_btn.on(LEvent.MOUSE_DOWN, _this, _this.leftBtn);
                    _this._viewUI.right_btn.on(LEvent.MOUSE_DOWN, _this, _this.rightBtn);
                    _this._viewUI.vip_tab.selectHandler = new Handler(_this, _this.cutView);
                    _this._viewUI.money_list.renderHandler = new Handler(_this, _this.onSelect);
                    _this._viewUI.vipTips_btn1.on(LEvent.MOUSE_DOWN, _this, _this.getTips, [0]);
                    _this._viewUI.vipTips_btn2.on(LEvent.MOUSE_DOWN, _this, _this.getTips, [1]);
                    _this._viewUI.vipTips_btn3.on(LEvent.MOUSE_DOWN, _this, _this.getTips, [2]);
                    return _this;
                }
                /** 初始化界面 */
                ChongZhiMediator.prototype.init = function () {
                    this._goods = ShopModel.getInstance().goods;
                    this.hadFushiNum();
                    this._viewUI.vip_tab.selectedIndex = 0;
                    this.cutView(0);
                    this.chongZhiBox();
                };
                /** 充值按钮监听 */
                ChongZhiMediator.prototype.onSelect = function (cell, index) {
                    var btn = cell.getChildByName("chongZhi_btn");
                    btn.on(LEvent.CLICK, this, this.btnHandler, [cell, index]);
                };
                /** 当前点击的充值按钮 */
                ChongZhiMediator.prototype.btnHandler = function (cell, index) {
                    var _this = this;
                    RequesterProtocols._instance.c2s_CConfirmCharge(this._goods[index].goodid, 1, "T0");
                    game.modules.shop.models.ShopProxy.getInstance().once(game.modules.shop.models.FUSHINUM_EVENT, this, function () {
                        _this.hadFushiNum();
                    });
                };
                /** 充值列表信息加载 */
                ChongZhiMediator.prototype.chongZhiBox = function () {
                    this._viewUI.money_list.vScrollBarSkin = "";
                    this._viewUI.money_list.repeatX = 2;
                    this._viewUI.money_list.scrollBar.elasticBackTime = 500;
                    this._viewUI.money_list.scrollBar.elasticDistance = 20;
                    var skinArr = ["common/ui/shopui/money1.png", "common/ui/shopui/money2.png",
                        "common/ui/shopui/money3.png", "common/ui/shopui/money4.png",
                        "common/ui/shopui/money5.png", "common/ui/shopui/money6.png",
                        "common/ui/shopui/money7.png", "common/ui/shopui/money8.png",];
                    var data = [];
                    for (var i = 0; i < this._goods.length; i++) {
                        var _goodInfo = this._goods[i];
                        var _fushi;
                        var _present;
                        var _presentVisi = true;
                        var _zengSongVisi = true;
                        _fushi = _goodInfo.fushi + "";
                        if (_goodInfo.present == 0) {
                            _presentVisi = false;
                            _zengSongVisi = false;
                        }
                        else {
                            _present = _goodInfo.present + "";
                        }
                        data.push({
                            money_lab1: { text: _fushi },
                            money_lab2: { text: "￥ " + _goodInfo.price },
                            money_lab3: { text: _present, visible: _presentVisi },
                            zengSong_box: { visible: _zengSongVisi },
                            chongZhi_btn: { skin: skinArr[i] }
                        });
                    }
                    this._viewUI.money_list.array = data;
                };
                /** 拥有的元宝数量加载 */
                ChongZhiMediator.prototype.hadFushiNum = function () {
                    var _fushiNum = game.modules.mainhud.models.HudModel.getInstance().fuShiNum;
                    this._viewUI.yuanBaoNum_lab.text = this.setNumStyle(_fushiNum);
                };
                /** 设置元宝数字显示样式 */
                ChongZhiMediator.prototype.setNumStyle = function (num) {
                    var _num = num.toString();
                    var len = _num.length;
                    if (len <= 3 || num == 0)
                        return _num;
                    var r = len % 3;
                    return r > 0 ? _num.slice(0, r) + "," + _num.slice(r, len).match(/\d{3}/g).join(",") : _num.slice(r, len).match(/\d{3}/g).join(",");
                };
                /** 界面切换 */
                ChongZhiMediator.prototype.cutView = function (index) {
                    switch (index) {
                        case 0:
                            this._viewUI.chongZhi_box.visible = true;
                            this._viewUI.teQuan_box.visible = false;
                            break;
                        case 1:
                            RequesterProtocols._instance.c2s_CRequestVipInfo();
                            game.modules.reward.models.RewardProxy.getInstance().once(game.modules.reward.models.VIP_EVENT, this, this.setVipData);
                            break;
                    }
                };
                /** vip信息加载 */
                ChongZhiMediator.prototype.setVipData = function () {
                    var vipInfo = game.modules.reward.models.RewardModel.getInstance().vipInfo;
                    this.vipLevel = vipInfo.viplevel;
                    this.levelNum = vipInfo.viplevel;
                    this.vipExp = vipInfo.vipexp;
                    this._viewUI.chongZhi_box.visible = false;
                    this._viewUI.teQuan_box.visible = true;
                    this.vipBox();
                };
                /** vip信息展示 */
                ChongZhiMediator.prototype.vipBox = function () {
                    var _vipInfoBinDic = ShopModel.getInstance().VipInfoBinDic;
                    var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
                    var skinArr = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                        "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                        "common/ui/tongyong/jinkuang.png"];
                    var _exp;
                    if (this.levelNum == 11) {
                        _exp = _vipInfoBinDic[this.levelNum].exp;
                    }
                    else {
                        _exp = _vipInfoBinDic[this.levelNum + 1].exp;
                    }
                    this._viewUI.tq_lab.text = "贵" + this.levelNum + "特权奖励";
                    this._viewUI.vaiType_lab1.text = "1 " + _vipInfoBinDic[this.levelNum].type1;
                    this._viewUI.vaiType_lab2.text = "2 " + _vipInfoBinDic[this.levelNum].type2;
                    this._viewUI.vaiType_lab3.text = "3 " + _vipInfoBinDic[this.levelNum].type3;
                    if (_vipInfoBinDic[this.levelNum].type3 != "") {
                        this._viewUI.vaiType_lab1.visible = true;
                        this._viewUI.vaiType_lab2.visible = true;
                        this._viewUI.vaiType_lab3.visible = true;
                    }
                    else if (_vipInfoBinDic[this.levelNum].type2 != "") {
                        this._viewUI.vaiType_lab1.visible = true;
                        this._viewUI.vaiType_lab2.visible = true;
                        this._viewUI.vaiType_lab3.visible = false;
                    }
                    else {
                        this._viewUI.vaiType_lab1.visible = true;
                        this._viewUI.vaiType_lab2.visible = false;
                        this._viewUI.vaiType_lab3.visible = false;
                    }
                    if (this.levelNum == 0) {
                        this._viewUI.item_box.visible = false;
                        this._viewUI.left_btn.visible = false;
                        this._viewUI.right_btn.visible = true;
                        this._viewUI.dj1_lab.text = "贵" + this.levelNum;
                        this._viewUI.dj2_lab.visible = true;
                        this._viewUI.dj2_lab.text = "贵" + (this.levelNum + 1);
                    }
                    else if (this.levelNum == 11) {
                        this._viewUI.item_box.visible = true;
                        this._viewUI.left_btn.visible = true;
                        this._viewUI.right_btn.visible = false;
                        this._viewUI.dj1_lab.text = "贵" + this.levelNum;
                        this._viewUI.dj2_lab.visible = false;
                        for (var i = 1; i <= 3; i++) {
                            var num_lab = this._viewUI.item_box.getChildByName("num_lab" + i);
                            var icon_img = this._viewUI.item_box.getChildByName("icon_img" + i);
                            var diban_img = this._viewUI.item_box.getChildByName("diban_img" + i);
                            if (_vipInfoBinDic[this.levelNum].itemcounts[i - 1] <= 1) {
                                num_lab.text = "";
                            }
                            else {
                                num_lab.text = "X" + _vipInfoBinDic[this.levelNum].itemcounts[i - 1];
                            }
                            var _icon = _itemAttrBinDic[_vipInfoBinDic[this.levelNum].itemids[i - 1]].icon;
                            icon_img.skin = shop.models.ShopModel.getInstance().getSrc(_icon);
                            diban_img.skin = skinArr[_itemAttrBinDic[_vipInfoBinDic[this.levelNum].itemids[i - 1]].nquality - 1];
                        }
                    }
                    else {
                        this._viewUI.item_box.visible = true;
                        this._viewUI.left_btn.visible = true;
                        this._viewUI.right_btn.visible = true;
                        this._viewUI.dj1_lab.text = "贵" + this.levelNum;
                        this._viewUI.dj2_lab.visible = true;
                        this._viewUI.dj2_lab.text = "贵" + (this.levelNum + 1);
                        for (var i = 1; i <= 3; i++) {
                            var num_lab = this._viewUI.item_box.getChildByName("num_lab" + i);
                            var icon_img = this._viewUI.item_box.getChildByName("icon_img" + i);
                            var diban_img = this._viewUI.item_box.getChildByName("diban_img" + i);
                            if (_vipInfoBinDic[this.levelNum].itemcounts[i - 1] <= 1) {
                                num_lab.text = "";
                            }
                            else {
                                num_lab.text = "X" + _vipInfoBinDic[this.levelNum].itemcounts[i - 1];
                            }
                            var _icon = _itemAttrBinDic[_vipInfoBinDic[this.levelNum].itemids[i - 1]].icon;
                            icon_img.skin = shop.models.ShopModel.getInstance().getSrc(_icon);
                            diban_img.skin = skinArr[_itemAttrBinDic[_vipInfoBinDic[this.levelNum].itemids[i - 1]].nquality - 1];
                        }
                    }
                    if (this.levelNum < this.vipLevel) {
                        this._viewUI.money_box.visible = true;
                        this._viewUI.jinYan_img.visible = true;
                        this._viewUI.jinYan_lab.text = _exp + "/" + _exp;
                        this._viewUI.jinYan_lab.color = "#efdcdc";
                        this._viewUI.jinYan_lab.align = "center";
                        this._viewUI.num_lab.text = "还需要再充值: 0";
                    }
                    else if (this.levelNum == this.vipLevel && this.vipLevel == 11) {
                        this._viewUI.money_box.visible = false;
                        this._viewUI.jinYan_img.visible = false;
                        this._viewUI.jinYan_lab.text = "累积充值数量: " + this.vipExp;
                        this._viewUI.jinYan_lab.color = "#000000";
                        this._viewUI.jinYan_lab.align = "left";
                    }
                    else {
                        this._viewUI.money_box.visible = true;
                        this._viewUI.jinYan_img.visible = true;
                        this._viewUI.jinYan_lab.text = this.vipExp + "/" + _exp;
                        this._viewUI.jinYan_lab.color = "#efdcdc";
                        this._viewUI.jinYan_lab.align = "center";
                        this._viewUI.num_lab.text = "还需要再充值: " + (_exp - this.vipExp);
                    }
                };
                /** 物品信息弹窗 */
                ChongZhiMediator.prototype.getTips = function (index) {
                    var _vipInfoBinDic = ShopModel.getInstance().VipInfoBinDic;
                    var itemId = _vipInfoBinDic[this.levelNum].itemids[index];
                    var parame = new Dictionary();
                    parame.set("itemId", itemId);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                };
                /** 上一级vip信息查看 */
                ChongZhiMediator.prototype.leftBtn = function () {
                    if (this.levelNum - 1 < 0)
                        return;
                    this.levelNum -= 1;
                    this.vipBox();
                };
                /** 下一级vip信息查看 */
                ChongZhiMediator.prototype.rightBtn = function () {
                    if (this.levelNum + 1 > 12)
                        return;
                    this.levelNum += 1;
                    this.vipBox();
                };
                ChongZhiMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                };
                ChongZhiMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                ChongZhiMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ChongZhiMediator;
            }(game.modules.UiMediator));
            shop.ChongZhiMediator = ChongZhiMediator;
        })(shop = modules.shop || (modules.shop = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ChongZhiMediator.js.map