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
var materialui;
(function (materialui) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIConatiner = Pan3d.UIConatiner;
    var UIAtlas = Pan3d.UIAtlas;
    var MaterialCavasPanel = /** @class */ (function (_super) {
        __extends(MaterialCavasPanel, _super);
        function MaterialCavasPanel() {
            var _this = _super.call(this) || this;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._bottomRender.uiAtlas = new UIAtlas();
            _this._bottomRender.uiAtlas.setInfo("ui/materialmenu/materialmenu.txt", "ui/materialmenu/materialmenu.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        MaterialCavasPanel.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas;
            this.a_base_bg = this.addEvntBut("a_base_bg", this._bottomRender);
            this.a_save_but = this.addEvntBut("a_save_but", this._topRender);
            this.a_compile_but = this.addEvntBut("a_compile_but", this._topRender);
            this.uiLoadComplete = true;
            this.resize();
        };
        MaterialCavasPanel.prototype.butClik = function (evt) {
            if (this.perent) {
                // (<Panel>this.perent).removeUIContainer(this)
            }
            switch (evt.target) {
                case this.a_compile_but:
                    materialui.MaterialModel.getInstance().selectFileById(6);
                    break;
                case this.a_save_but:
                    materialui.MaterialModel.getInstance().selectFileById(5);
                    break;
                default:
                    break;
            }
        };
        MaterialCavasPanel.prototype.resize = function () {
            if (this.perent && this.uiLoadComplete) {
                var rect = this.perent.rect;
                this.a_base_bg.x = rect.x;
                this.a_base_bg.width = rect.width;
                this.a_base_bg.y = 25;
                this.a_base_bg.height = 30;
                this.a_save_but.x = rect.x + rect.width - 100;
                this.a_save_but.y = this.a_base_bg.y;
                this.a_compile_but.x = this.a_save_but.x + 50;
                this.a_compile_but.y = this.a_base_bg.y;
            }
            _super.prototype.resize.call(this);
        };
        return MaterialCavasPanel;
    }(UIConatiner));
    materialui.MaterialCavasPanel = MaterialCavasPanel;
})(materialui || (materialui = {}));
//# sourceMappingURL=MaterialCavasPanel.js.map