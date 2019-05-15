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
var pan;
(function (pan) {
    var AlphaUiContianer = Pan3d.AlphaUiContianer;
    var Rectangle = Pan3d.Rectangle;
    var BloodManager = Pan3d.BloodManager;
    var PanBloodManager = /** @class */ (function (_super) {
        __extends(PanBloodManager, _super);
        function PanBloodManager() {
            var _this = _super.call(this) || this;
            //飘字层级调整
            var count = 0;
            var item;
            for (var i = 0; i < _this.uiContianerItem.length - count; i++) {
                if (_this.uiContianerItem[i] instanceof AlphaUiContianer) {
                    item = _this.uiContianerItem[i];
                    _this.uiContianerItem.splice(i, 1);
                    _this.uiContianerItem.push(item);
                    count++;
                    i--;
                }
            }
            //添加大飘字
            _this._jumpText256_256 = new AlphaUiContianer(TextJumpUiDrawAndRefreash256, new Rectangle(0, 0, 256, 256), 2);
            _this.uiContianerItem.push(_this._jumpText256_256);
            return _this;
        }
        PanBloodManager.getInstance = function () {
            if (!BloodManager._instance)
                BloodManager._instance = new PanBloodManager();
            return BloodManager._instance;
        };
        PanBloodManager.prototype.setExpJump256_256Num = function ($textJumpUiVo) {
            this._jumpText256_256.showTemp($textJumpUiVo);
        };
        return PanBloodManager;
    }(BloodManager));
    pan.PanBloodManager = PanBloodManager;
    var TextJumpUiDrawAndRefreash256 = /** @class */ (function (_super) {
        __extends(TextJumpUiDrawAndRefreash256, _super);
        function TextJumpUiDrawAndRefreash256() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextJumpUiDrawAndRefreash256.prototype.drawTxtBydigitalAndtext = function ($vo) {
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 92;
            var $height = 50;
            var $offsetX = 0;
            var $offsetY = 0;
            var txtcolor;
            if ($vo.type == Pan3d.TextJumpType.ATTACKREDUCE) {
                picid = Pan3d.TextJumpType.ATTACKADD;
                txtcolor = Pan3d.ArtFont.num53;
            }
            else if ($vo.type == Pan3d.TextJumpType.ATTACKADD) {
                txtcolor = Pan3d.ArtFont.num54;
            }
            else if ($vo.type == Pan3d.TextJumpType.EXPERIENCE) {
                txtcolor = Pan3d.ArtFont.num54;
                // } else if ($vo.type == Pan3d.TextJumpType.CRIT) {
                //     txtcolor = Pan3d.ArtFont.num55;
                //     $width = 215;
                //     $height = 128;
                //     $offsetX = -95;
                //     $offsetY = 50;
                // } else if ($vo.type == Pan3d.TextJumpType.CRITUP) {
                //     picid -= 10;
                //     txtcolor = Pan3d.ArtFont.num55;
                //     $width = 215;
                //     $height = 128;
                //     $offsetX = -95;
                //     $offsetY = 50;
                // }
                var distion = Pan3d.ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
                distion += $width;
                Pan3d.UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new Pan3d.Rectangle(rec.pixelWitdh - distion - $offsetX, rec.pixelHeight - $height, $width, $height), Pan3d.UIData.publicUi);
                Pan3d.ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, rec.pixelWitdh - distion + $width + 2, rec.pixelHeight - $height + $offsetY, BloodMgrDef.TEXT_INTERVAL);
                Pan3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
                return distion;
            }
        };
        return TextJumpUiDrawAndRefreash256;
    }(Pan3d.TextJumpUiDrawAndRefreash));
    pan.TextJumpUiDrawAndRefreash256 = TextJumpUiDrawAndRefreash256;
    /**3D场景贴图配置：血条、飘字*/
    var BloodMgrDef = /** @class */ (function () {
        function BloodMgrDef() {
        }
        /**飘字动画更新*/
        BloodMgrDef.changeRules = function (textJump, vo, time) {
            var v2d = textJump.Vector3DToVector2D(new Pan3d.Vector3D(vo.pos.x, vo.pos.y, vo.pos.z));
            var info = [1, 130, -115, 256, 50]; //scale、x、y、width、height
            // if(vo.type == Pan3d.TextJumpType.CRIT || vo.type == Pan3d.TextJumpType.CRIT){
            //     info = [1,130,256-115,256,256];
            // }
            var rules = this.getCenterRules(60 * (time - vo.starttime) / 1000);
            if (rules) {
                var ui_1 = textJump.ui;
                ui_1.x = v2d.x + info[0] * (info[1] - info[3] / 2);
                ui_1.y = v2d.y + info[0] * (info[2] - info[4]);
                ui_1.width = info[0] * info[3];
                ui_1.height = info[0] * info[4];
                ui_1.width *= rules[1];
                ui_1.height *= rules[1];
                ui_1.alpha = rules[2];
            }
        };
        //获取中点动画数据[上移位置，缩放，透明度]
        BloodMgrDef.getCenterRules = function (frame) {
            if (frame < 10) {
                return [0, 0.1 * frame, 1];
            }
            if (frame < 35) {
                return [0, 1, 1];
            }
            var offset = frame - 35;
            var alpha = 1 - offset * 0.1;
            if (alpha < 0)
                alpha = 0;
            return [0, 1, alpha];
        };
        /**飘字数字间隔*/
        BloodMgrDef.TEXT_INTERVAL = 5;
        return BloodMgrDef;
    }());
    pan.BloodMgrDef = BloodMgrDef;
})(pan || (pan = {}));
//# sourceMappingURL=PanBloodManager.js.map