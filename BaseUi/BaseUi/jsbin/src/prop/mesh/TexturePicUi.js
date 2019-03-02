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
var prop;
(function (prop) {
    var TextureManager = Pan3d.TextureManager;
    var TimeUtil = Pan3d.TimeUtil;
    var UIManager = Pan3d.UIManager;
    var Disp2DBaseText = Pan3d.Disp2DBaseText;
    var UIAtlas = Pan3d.UIAtlas;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIConatiner = Pan3d.UIConatiner;
    var Scene_data = Pan3d.Scene_data;
    var TexturePicIMeshVo = /** @class */ (function (_super) {
        __extends(TexturePicIMeshVo, _super);
        function TexturePicIMeshVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(TexturePicIMeshVo.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (value) {
                this._url = value;
                this.needDraw = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TexturePicIMeshVo.prototype, "imagepic", {
            set: function (img) {
                var rec = this.textLabelUIDisp2D.parent.uiAtlas.getRec(this.textLabelUIDisp2D.ui.skinName);
                var $ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                $ctx.clearRect(0, 0, rec.pixelWitdh, rec.pixelHeight);
                $ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                TextureManager.getInstance().updateTexture(this.textLabelUIDisp2D.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, $ctx);
                console.log(this.ui);
            },
            enumerable: true,
            configurable: true
        });
        TexturePicIMeshVo.prototype.destory = function () {
            this.pos = null;
            this._url = null;
            this.needDraw = null;
            this.clear = true;
        };
        return TexturePicIMeshVo;
    }(Pan3d.baseMeshVo));
    var TexturePicUIDisp2D = /** @class */ (function (_super) {
        __extends(TexturePicUIDisp2D, _super);
        function TexturePicUIDisp2D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TexturePicUIDisp2D.prototype.makeData = function () {
            if (this._data) {
                this.labelNameMeshVo = this.data;
                this.ui.width = 64;
                this.ui.height = 64;
                this.lastKey = this.labelNameMeshVo.url;
                if (this.labelNameMeshVo.url) {
                    var $img = TextureManager.getInstance().getImgResByurl(Scene_data.fileRoot + this.labelNameMeshVo.url);
                    if ($img) {
                        var rec = this.parent.uiAtlas.getRec(this.textureStr);
                        this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                        this.parent.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                        TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, this.parent.uiAtlas.ctx);
                    }
                    else {
                        this.parent.uiAtlas.upDataPicToTexture(this.labelNameMeshVo.url, this.textureStr);
                    }
                }
                else {
                    this.parent.uiAtlas.clearCtxTextureBySkilname(this.textureStr);
                }
                this.labelNameMeshVo.needDraw = false;
            }
        };
        return TexturePicUIDisp2D;
    }(Disp2DBaseText));
    prop.TexturePicUIDisp2D = TexturePicUIDisp2D;
    var TextureContext = /** @class */ (function (_super) {
        __extends(TextureContext, _super);
        function TextureContext() {
            var _this = _super.call(this) || this;
            _this.tempUiName = "tempui";
            _this._bRender = new UIRenderComponent();
            _this.addRender(_this._bRender);
            _this._bRender.uiAtlas = new UIAtlas();
            var $uiAtlas = _this._bRender.uiAtlas;
            $uiAtlas.configData = [];
            $uiAtlas.configData.push($uiAtlas.getObject(_this.tempUiName, 0, 0, 128, 128, 128, 128));
            _this.ui = _this._bRender.creatBaseComponent(_this.tempUiName);
            _this.ui.width = 64;
            _this.ui.height = 64;
            _this.addChild(_this.ui);
            _this._bRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(128, 128, false);
            _this._bRender.uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture(_this._bRender.uiAtlas.ctx);
            return _this;
            //  this.ui.uiRender.uiAtlas.upDataPicToTexture("b.jpg", this.ui.skinName);
        }
        return TextureContext;
    }(UIConatiner));
    prop.TextureContext = TextureContext;
    var TexturePicUi = /** @class */ (function (_super) {
        __extends(TexturePicUi, _super);
        function TexturePicUi() {
            var _this = _super.call(this) || this;
            _this.$dulbelClikTm = 0;
            _this.initView();
            _this.resize();
            return _this;
        }
        TexturePicUi.prototype.initView = function () {
            this.addEvets();
        };
        TexturePicUi.prototype.butClik = function (evt) {
            //console.log(TimeUtil.getTimer(), this.$dulbelClikTm)
            var _this = this;
            if (TimeUtil.getTimer() < this.$dulbelClikTm) {
                console.log(this.suffix);
                this._inputHtmlSprite = document.createElement('input');
                this._inputHtmlSprite.setAttribute('id', '_ef');
                this._inputHtmlSprite.setAttribute('type', 'file');
                this._inputHtmlSprite.setAttribute("style", 'visibility:hidden');
                this._inputHtmlSprite.click();
                this._inputHtmlSprite.value;
                this._inputHtmlSprite.addEventListener("change", function (cevt) { _this.changeFile(cevt); });
            }
            this.$dulbelClikTm = TimeUtil.getTimer() + 1000;
        };
        TexturePicUi.prototype.testSuffix = function (value) {
            var tempItem = this.suffix.split("|");
            for (var i = 0; i < tempItem.length; i++) {
                if (value.indexOf(tempItem[i]) != -1) {
                    return true;
                }
            }
            return false;
        };
        TexturePicUi.prototype.changeFile = function (evt) {
            for (var i = 0; i < this._inputHtmlSprite.files.length && i < 1; i++) {
                var simpleFile = this._inputHtmlSprite.files[i];
                //if (!/image\/\w+/.test(simpleFile.type)) {
                //    alert("请确保文件类型为图像类型");
                //}
                console.log(this.testSuffix(simpleFile.name));
                if (this.testSuffix(simpleFile.name)) {
                    var $reflectionEvet = new prop.ReflectionEvet(prop.ReflectionEvet.CHANGE_DATA);
                    $reflectionEvet.data = simpleFile;
                    this.dispatchEvent($reflectionEvet);
                }
                else {
                    alert("请确保文件类型 " + this.suffix);
                }
            }
            this._inputHtmlSprite = null;
        };
        Object.defineProperty(TexturePicUi.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (value) {
                this._url = value;
                var picUrl = this._url;
                if (value.indexOf(".texture") != -1) {
                    picUrl = "icon/marterial_64x.png";
                }
                var $img = TextureManager.getInstance().getImgResByurl(Scene_data.fileRoot + picUrl);
                var $uiRender = this.textureContext.ui.uiRender;
                if ($img) {
                    var rec = $uiRender.uiAtlas.getRec(this.textureContext.ui.skinName);
                    $uiRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                    $uiRender.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                    TextureManager.getInstance().updateTexture($uiRender.uiAtlas.texture, rec.pixelX, rec.pixelY, $uiRender.uiAtlas.ctx);
                }
                else {
                    this.textureContext.ui.uiRender.uiAtlas.upDataPicToTexture(picUrl, this.textureContext.ui.skinName);
                }
            },
            enumerable: true,
            configurable: true
        });
        return TexturePicUi;
    }(prop.BaseMeshUi));
    prop.TexturePicUi = TexturePicUi;
})(prop || (prop = {}));
//# sourceMappingURL=TexturePicUi.js.map