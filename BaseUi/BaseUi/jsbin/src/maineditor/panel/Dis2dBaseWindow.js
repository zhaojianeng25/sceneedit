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
var maineditor;
(function (maineditor) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var Rectangle = Pan3d.Rectangle;
    var UIManager = Pan3d.UIManager;
    var UIData = Pan3d.UIData;
    var UIAtlas = Pan3d.UIAtlas;
    var TextureManager = Pan3d.TextureManager;
    var Dis2dBaseWindow = /** @class */ (function (_super) {
        __extends(Dis2dBaseWindow, _super);
        function Dis2dBaseWindow($classVo, $rect, $num) {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.creatBaseRender();
            _this.addRender(_this._baseRender);
            _this.mathSize($rect, $num);
            _this.initData($classVo, $rect, $num);
            return _this;
        }
        Dis2dBaseWindow.prototype.creatBaseRender = function () {
            this._baseRender = new UIRenderComponent;
        };
        //显示单元类, 尺寸，数量
        Dis2dBaseWindow.prototype.initData = function ($classVo, $rect, $num) {
            this._voNum = Math.floor($num);
            this._voRect = $rect;
            var kkwA = Math.pow(2, Math.ceil(Math.log($rect.x * $rect.width) / Math.log(2)));
            var kkhB = Math.pow(2, Math.ceil(Math.log($rect.x * $rect.width) / Math.log(2)));
            this._textureRect = new Rectangle(0, 0, kkwA, kkhB);
            this._baseRender.uiAtlas = new UIAtlas();
            var $uiAtlas = this._baseRender.uiAtlas;
            $uiAtlas.configData = new Array();
            $uiAtlas.ctx = UIManager.getInstance().getContext2D(this._textureRect.width, this._textureRect.height, false);
            $uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture($uiAtlas.ctx);
            this.makeBaseUi($classVo);
            ;
        };
        Dis2dBaseWindow.prototype.mathSize = function ($rect, $num) {
            $rect.x = 0;
            $rect.y = 0;
            while ($rect.x * $rect.y < $num) {
                if ($rect.x * $rect.width > $rect.y * $rect.height) {
                    $rect.y++;
                }
                else {
                    $rect.x++;
                }
            }
        };
        //根据数量创建单元格UICompenent 并存在数组中，待需要时应用
        Dis2dBaseWindow.prototype.makeBaseUi = function ($classVo) {
            var $uiAtlas = this._baseRender.uiAtlas;
            this._uiItem = new Array();
            this._lostItem = new Array();
            for (var i = 0; i < this._voRect.x; i++) {
                for (var j = 0; j < this._voRect.y; j++) {
                    var $disp2DBaseText = new $classVo();
                    this._uiItem.push($disp2DBaseText);
                    $disp2DBaseText.parent = this._baseRender;
                    $disp2DBaseText.voRect = this._voRect;
                    $disp2DBaseText.textureStr = "id_" + i + "_" + j;
                    $uiAtlas.configData.push($uiAtlas.getObject($disp2DBaseText.textureStr, i * this._voRect.width, j * this._voRect.height, this._voRect.width, this._voRect.height, this._textureRect.width, this._textureRect.height));
                    $disp2DBaseText.ui = this._baseRender.creatBaseComponent($disp2DBaseText.textureStr);
                }
            }
        };
        //找到可用的单元 找到后赋值并添加ui到显示队列
        Dis2dBaseWindow.prototype.showTemp = function ($data) {
            this.clearLostItem();
            var empty;
            //找到上一个数据和现在是一样的对象.避免重复更新纹理
            for (var j = 0; j < this._uiItem.length; j++) {
                if (this._uiItem[j].data == null && this._uiItem[j].isEqualLastKey($data)) {
                    empty = this._uiItem[j];
                    break;
                }
            }
            if (!empty) {
                for (var i = 0; i < this._uiItem.length; i++) {
                    if (this._uiItem[i].data == null) {
                        empty = this._uiItem[i];
                        break;
                    }
                }
            }
            if (empty) {
                empty.data = $data;
                this.addChild(empty.ui);
            }
            else {
                this._lostItem.push($data);
            }
            return empty;
        };
        Dis2dBaseWindow.prototype.clearLostItem = function () {
            for (var i = (this._lostItem.length - 1); i > 0; i--) {
                if (this._lostItem[i].clear) {
                    this._lostItem.splice(i, 1);
                }
            }
        };
        Dis2dBaseWindow.prototype.playLost = function () {
            if (this._lostItem.length) {
                this.showTemp(this._lostItem.pop());
            }
        };
        Dis2dBaseWindow.prototype.clearOneTemp = function () {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (!this._uiItem[i].data) {
                    return;
                }
            }
            this._lostItem.length = 0;
            this.clearTemp(this._uiItem[0].data);
        };
        //清理单元内的内容并需要将对象移出显示队例
        Dis2dBaseWindow.prototype.clearTemp = function ($data) {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data == $data) {
                    this._uiItem[i].data = null;
                    this.removeChild(this._uiItem[i].ui);
                    break;
                }
            }
            this.playLost();
        };
        Dis2dBaseWindow.prototype.getVoByData = function (value) {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data == value) {
                    return this._uiItem[i];
                }
            }
        };
        Dis2dBaseWindow.prototype.getVoByUi = function ($ui) {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    if (this._uiItem[i].ui == $ui) {
                        return this._uiItem[i];
                    }
                }
            }
        };
        Dis2dBaseWindow.prototype.clearAll = function () {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    this.clearTemp(this._uiItem[i].data);
                }
            }
        };
        Dis2dBaseWindow.prototype.update = function (t) {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    this._uiItem[i].update();
                }
            }
            /*
            if (this.getUiItemLen() <( this._uiItem.length-1)) {
                this.playLost()
            }
            */
        };
        Dis2dBaseWindow.prototype.getUiItemLen = function () {
            var $num = 0;
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    $num++;
                }
            }
            return $num;
        };
        return Dis2dBaseWindow;
    }(base.BaseWindow));
    maineditor.Dis2dBaseWindow = Dis2dBaseWindow;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=Dis2dBaseWindow.js.map