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
* 通用小键盘
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var tips;
        (function (tips) {
            var XiaoJianPanMediator = /** @class */ (function (_super) {
                __extends(XiaoJianPanMediator, _super);
                function XiaoJianPanMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this._viewUI = new ui.common.component.XiaoJianPanUI();
                    _this.isCenter = false;
                    _this._viewUI.mouseThrough = true;
                    _this.initNumList();
                    return _this;
                }
                /**
                 * 初始化键盘数字
                 */
                XiaoJianPanMediator.prototype.initNumList = function () {
                    var numArr = [];
                    for (var i = 1; i <= 9; i++) {
                        numArr.push({ num_btn: i });
                    }
                    var numlist = this._viewUI.num_list;
                    numlist.array = numArr;
                    numlist.repeatX = 3;
                    numlist.repeatY = 3;
                    this._viewUI.ok_btn.on(LEvent.MOUSE_DOWN, this, this.onOkBtn);
                    this._viewUI.zero_btn.on(LEvent.MOUSE_DOWN, this, this.onZeroBtn);
                    this._viewUI.delete_btn.on(LEvent.MOUSE_DOWN, this, this.onDeleteBtn);
                    this._viewUI.yincang_box.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.num_list.selectHandler = new Handler(this, this.numListSelect);
                };
                /**
                 * 隐藏小键盘
                 * @describe 鼠标点击空白处，隐藏小键盘
                 */
                XiaoJianPanMediator.prototype.onHide = function () {
                    this.hide();
                };
                /**
                 * 点击键盘数字
                 * @param index
                 */
                XiaoJianPanMediator.prototype.numListSelect = function (index) {
                    if (this._viewUI.num_list.selectedIndex != -1) {
                        var cell = this._viewUI.num_list.getCell(index);
                        var num_btn = cell.getChildByName("num_btn");
                        var num = num_btn.label;
                        this.sendNum(num);
                        this._viewUI.num_list.selectedIndex = -1;
                    }
                };
                /**
                 * 点击0
                 */
                XiaoJianPanMediator.prototype.onZeroBtn = function () {
                    this.sendNum(0);
                };
                /**
                 * 点击删除
                 */
                XiaoJianPanMediator.prototype.onDeleteBtn = function () {
                    this.sendNum(-1);
                };
                /**
                 * 发送数据
                 */
                XiaoJianPanMediator.prototype.sendNum = function (num) {
                    tips.models.TipsProxy.getInstance().event(tips.models.ON_KRYBOARD, num);
                };
                /**
                 * 点击ok
                 */
                XiaoJianPanMediator.prototype.onOkBtn = function () {
                    this.hide();
                };
                /**
                 * @describe 输入x，y的值，再根据UI来进行小键盘UI位置的调整
                 * @param x
                 * @param y
                 * @param UI
                 */
                XiaoJianPanMediator.prototype.show = function (x, y, UI) {
                    if (x != null && y != null) {
                        if (UI != null) {
                            if (UI = ui.common.RedEnvelopeUI) { //如果是发送红包界面的UI
                                this._viewUI.bg_img.x = x;
                                this._viewUI.bg_img.y = y - this._viewUI.bg_img.height;
                            }
                        }
                    }
                    _super.prototype.show.call(this);
                };
                /**设置小键盘出现位置 */
                XiaoJianPanMediator.prototype.onShow = function (x, y) {
                    _super.prototype.show.call(this);
                    if (x != null && y != null) {
                        this._viewUI.bg_img.x = x;
                        this._viewUI.bg_img.y = y;
                    }
                };
                /**
                 * 获取购售商品数据
                 * @param type  1商品限购次数查询  2商品限售次数查询
                 * @param arr  查询商品id
                 */
                XiaoJianPanMediator.prototype.getgoodsLimit = function (type, arr) {
                    RequesterProtocols._instance.c2s_query_limit(type, arr);
                };
                XiaoJianPanMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.sendNum(-2);
                };
                XiaoJianPanMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return XiaoJianPanMediator;
            }(game.modules.UiMediator));
            tips.XiaoJianPanMediator = XiaoJianPanMediator;
        })(tips = modules.tips || (modules.tips = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=XiaoJianPanMediator.js.map