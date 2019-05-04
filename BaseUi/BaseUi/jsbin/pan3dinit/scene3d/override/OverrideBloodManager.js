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
var scene3d;
(function (scene3d) {
    var me;
    (function (me) {
        var ExpTextJumpUiDrawAndRefreash256 = /** @class */ (function (_super) {
            __extends(ExpTextJumpUiDrawAndRefreash256, _super);
            function ExpTextJumpUiDrawAndRefreash256() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ExpTextJumpUiDrawAndRefreash256.prototype.drawTxtBydigitalAndtext = function ($vo) {
                var rec = this.parent.uiAtlas.getRec(this.textureStr);
                var ctx = Pan3d.me.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                var picid = $vo.type;
                var $width = 50;
                var $height = 25;
                var txtcolor;
                if ($vo.type == Pan3d.me.TextJumpType.EXPERIENCE) {
                    txtcolor = Pan3d.me.ArtFont.num54;
                }
                var distion = Pan3d.me.ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
                distion += $width;
                Pan3d.me.UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new Pan3d.me.Rectangle(rec.pixelWitdh - distion, rec.pixelHeight - $height, $width, $height), Pan3d.me.UIData.publicUi);
                Pan3d.me.ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, rec.pixelWitdh - distion + $width + 2, rec.pixelHeight - $height);
                Pan3d.me.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
                return distion;
            };
            return ExpTextJumpUiDrawAndRefreash256;
        }(Pan3d.me.ExpTextJumpUiDrawAndRefreash));
        me.ExpTextJumpUiDrawAndRefreash256 = ExpTextJumpUiDrawAndRefreash256;
    })(me = scene3d.me || (scene3d.me = {}));
})(scene3d || (scene3d = {}));
(function (scene3d) {
    var me;
    (function (me) {
        var OverrideBloodManager = /** @class */ (function (_super) {
            __extends(OverrideBloodManager, _super);
            function OverrideBloodManager() {
                var _this = _super.call(this) || this;
                _this._jumpText256_256 = new Pan3d.me.AlphaUiContianer(scene3d.me.ExpTextJumpUiDrawAndRefreash256, new Pan3d.me.Rectangle(0, 0, 256, 256), 2);
                _this.uiContianerItem.push(_this._jumpText256_256);
                return _this;
            }
            OverrideBloodManager.getInstance = function () {
                if (!Pan3d.me.BloodManager._instance) {
                    console.log("一定要到这里--->复写飘字");
                    Pan3d.me.BloodManager._instance = new OverrideBloodManager();
                }
                return Pan3d.me.BloodManager._instance;
            };
            OverrideBloodManager.prototype.setExpJump256_256Num = function ($textJumpUiVo) {
                this._jumpText256_256.showTemp($textJumpUiVo);
                console.log($textJumpUiVo);
            };
            return OverrideBloodManager;
        }(Pan3d.me.BloodManager));
        me.OverrideBloodManager = OverrideBloodManager;
    })(me = scene3d.me || (scene3d.me = {}));
})(scene3d || (scene3d = {}));
//# sourceMappingURL=OverrideBloodManager.js.map